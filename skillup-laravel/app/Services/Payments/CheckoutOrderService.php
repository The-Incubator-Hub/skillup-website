<?php

namespace App\Services\Payments;

use App\Enums\OrderStatus;
use App\Enums\PaymentStatus;
use App\Models\Catalog\Order;
use App\Models\Catalog\Product;
use App\Models\Catalog\ProductPaymentPlan;
use App\Services\Discounts\DiscountEligibilityService;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class CheckoutOrderService
{
    public function __construct(
        private readonly DiscountEligibilityService $discounts,
        private readonly PaymentService $payments,
    ) {}

    /**
     * @param  array<string, mixed>  $data
     */
    public function create(Product $product, array $data): Order
    {
        $product->loadMissing(['defaultPrice', 'paymentPlans', 'cohort']);
        $price = $product->defaultPrice;

        if (! $price || ! $price->is_active) {
            throw ValidationException::withMessages(['product' => 'This course is not currently available for checkout.']);
        }

        return DB::transaction(function () use ($product, $price, $data) {
            $subtotal = (float) $price->amount;
            $customer = [
                'name' => $data['name'],
                'email' => $data['email'],
                'phone' => $data['phone'] ?? null,
            ];

            $order = Order::create([
                'user_id' => auth()->id(),
                'status' => OrderStatus::PendingPayment,
                'payment_status' => PaymentStatus::Pending,
                'currency' => $price->currency,
                'subtotal' => $subtotal,
                'discount_total' => 0,
                'tax_total' => 0,
                'total' => $subtotal,
                'amount_paid' => 0,
                'balance_due' => $subtotal,
                'payment_provider' => 'paystack',
                'metadata' => array_merge([
                    'customer' => $customer,
                    'checkout' => [
                        'payment_mode' => $data['payment_mode'],
                    ],
                ], $data['extra_metadata'] ?? []),
            ]);

            $order->items()->create([
                'product_id' => $product->id,
                'product_price_id' => $price->id,
                'product_title' => $product->title,
                'quantity' => 1,
                'unit_amount' => $subtotal,
                'discount_amount' => 0,
                'total' => $subtotal,
                'metadata' => [
                    'track_id' => $product->track_id,
                    'course_level_id' => $product->course_level_id,
                    'cohort_id' => $product->cohort_id,
                ],
            ]);

            $attemptDiscount = filled($data['discount_code'] ?? null);

            if (! $attemptDiscount && ($data['auto_discount'] ?? false)) {
                $attemptDiscount = $this->discounts->validate(
                    $data['email'],
                    $product,
                    $subtotal,
                    null,
                    auth()->user(),
                    ($data['payment_mode'] ?? 'full') === 'installment',
                )->valid;
            }

            if ($attemptDiscount) {
                $redemption = $this->discounts->lockForCheckout(
                    $order,
                    $product,
                    $data['email'],
                    $subtotal,
                    $data['discount_code'] ?? null,
                    auth()->user(),
                    ($data['payment_mode'] ?? 'full') === 'installment',
                );

                $order->items()->update([
                    'discount_amount' => $redemption->discount_amount,
                    'total' => $redemption->total_after_discount,
                ]);
                $order->refresh();
            }

            if (($data['payment_mode'] ?? 'full') === 'installment') {
                $productPaymentPlan = ProductPaymentPlan::query()
                    ->where('product_id', $product->id)
                    ->where('is_active', true)
                    ->find($data['product_payment_plan_id'] ?? null);

                if (! $productPaymentPlan) {
                    throw ValidationException::withMessages(['product_payment_plan_id' => 'Select a valid payment plan.']);
                }

                $this->payments->createInstallmentSchedule($order->fresh(), $productPaymentPlan);
            }

            $this->payments->createInvoice($order->fresh());

            return $order->fresh(['items.product', 'paymentPlan.installments', 'invoices']);
        });
    }
}
