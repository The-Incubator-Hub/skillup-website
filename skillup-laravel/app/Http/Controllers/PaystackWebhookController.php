<?php

namespace App\Http\Controllers;

use App\Enums\WebhookEventStatus;
use App\Models\Catalog\PaymentWebhookEvent;
use App\Services\Payments\PaymentService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Throwable;

class PaystackWebhookController extends Controller
{
    public function __invoke(Request $request, PaymentService $payments): JsonResponse
    {
        $rawPayload = $request->getContent();
        $signature = (string) $request->header('x-paystack-signature');
        $secret = (string) config('services.paystack.webhook_secret');

        if ($secret !== '' && ! hash_equals(hash_hmac('sha512', $rawPayload, $secret), $signature)) {
            return response()->json(['message' => 'Invalid signature'], 401);
        }

        $payload = $request->json()->all();
        $event = (string) data_get($payload, 'event');
        $reference = (string) data_get($payload, 'data.reference');
        $eventKey = $event.':'.($reference ?: data_get($payload, 'data.id', sha1($rawPayload)));
        $payloadHash = hash('sha256', $rawPayload);

        $existing = PaymentWebhookEvent::query()
            ->where('payload_hash', $payloadHash)
            ->orWhere(fn ($query) => $query->where('provider', 'paystack')->where('event_key', $eventKey))
            ->first();

        if ($existing) {
            return response()->json(['message' => 'Duplicate webhook ignored']);
        }

        $webhook = PaymentWebhookEvent::create([
            'provider' => 'paystack',
            'event' => $event,
            'event_key' => $eventKey,
            'reference' => $reference ?: null,
            'signature' => $signature ?: null,
            'payload_hash' => $payloadHash,
            'payload' => $payload,
        ]);

        try {
            if ($event === 'charge.success' && $reference !== '') {
                $payments->verifyPaystackReference($reference);
            }

            $webhook->update([
                'status' => $event === 'charge.success' ? WebhookEventStatus::Processed : WebhookEventStatus::Ignored,
                'processed_at' => now(),
            ]);
        } catch (Throwable $exception) {
            $webhook->update([
                'status' => WebhookEventStatus::Failed,
                'error' => $exception->getMessage(),
            ]);
        }

        return response()->json(['message' => 'Webhook accepted']);
    }
}
