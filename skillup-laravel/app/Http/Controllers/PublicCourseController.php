<?php

namespace App\Http\Controllers;

use App\Models\Catalog\Cohort;
use App\Models\Catalog\Product;
use App\Models\Catalog\ProductMedia;
use App\Models\Catalog\ProductPrice;
use App\Models\Catalog\Track;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class PublicCourseController extends Controller
{
    public function index(): Response
    {
        $products = Product::published()
            ->whereHas('track', fn ($query) => $query->published())
            ->with($this->productRelations())
            ->orderBy('sort_order')
            ->orderBy('title')
            ->get();

        $tracks = Track::published()
            ->with([
                'levels',
                'products' => fn ($query) => $query
                    ->published()
                    ->with($this->productRelations())
                    ->orderBy('sort_order')
                    ->orderBy('title'),
            ])
            ->orderBy('sort_order')
            ->orderBy('title')
            ->get();

        return Inertia::render('Public/Courses/Index', [
            'products' => $products->map(fn (Product $product) => $this->formatProduct($product))->values(),
            'tracks' => $tracks->map(fn (Track $track) => $this->formatTrack($track))->values(),
        ]);
    }

    public function showTrack(string $trackSlug): Response
    {
        $track = Track::published()
            ->where('slug', $trackSlug)
            ->with([
                'levels',
                'products' => fn ($query) => $query
                    ->published()
                    ->with($this->productRelations())
                    ->orderBy('sort_order')
                    ->orderBy('title'),
            ])
            ->firstOrFail();

        return Inertia::render('Public/Courses/Show', [
            'trackSlug' => $track->slug,
            'track' => $this->formatTrack($track),
        ]);
    }

    public function showProduct(string $trackSlug, string $productSlug): Response
    {
        $product = Product::published()
            ->where('slug', $productSlug)
            ->whereHas('track', fn ($query) => $query->published()->where('slug', $trackSlug))
            ->with($this->productRelations())
            ->firstOrFail();

        return Inertia::render('Public/Courses/Product', [
            'product' => $this->formatProduct($product),
        ]);
    }

    /**
     * @return array<int|string, mixed>
     */
    private function productRelations(): array
    {
        return [
            'track',
            'level',
            'cohort',
            'media',
            'defaultPrice' => fn ($query) => $query->active(),
            'paymentPlans' => fn ($query) => $query->where('is_active', true)->orderBy('deposit_amount'),
            'primaryMoodleMapping',
        ];
    }

    /**
     * @return array<string, mixed>
     */
    private function formatTrack(Track $track): array
    {
        $products = $track->relationLoaded('products') ? $track->products : collect();
        $levels = $products->isNotEmpty()
            ? $products->pluck('level.name')->filter()->unique()->values()
            : ($track->relationLoaded('levels') ? $track->levels->pluck('name')->filter()->values() : collect());

        return [
            'id' => $track->id,
            'slug' => $track->slug,
            'title' => $track->title,
            'category' => $this->trackCategory($track->phase),
            'level' => $this->levelLabel($levels),
            'duration' => $this->trackDuration($products),
            'price' => $this->trackPrice($products),
            'image' => $this->mediaUrl(null, $track),
            'summary' => $track->summary,
            'description' => $track->description,
            'outcomes' => $track->outcomes ?? [],
            'tools' => $track->tools ?? [],
            'products' => $products->map(fn (Product $product) => $this->formatProduct($product))->values(),
        ];
    }

    /**
     * @return array<string, mixed>
     */
    private function formatProduct(Product $product): array
    {
        $media = $product->relationLoaded('media')
            ? ($product->media->firstWhere('is_primary', true) ?? $product->media->first())
            : null;
        $price = $product->defaultPrice;
        $cohort = $product->cohort;

        return [
            'id' => $product->id,
            'uuid' => $product->uuid,
            'title' => $product->title,
            'slug' => $product->slug,
            'subtitle' => $product->subtitle,
            'summary' => $product->subtitle ?: Str::limit((string) $product->description, 150),
            'description' => $product->description,
            'trackSlug' => $product->track?->slug,
            'trackTitle' => $product->track?->title,
            'level' => $product->level?->name ?? 'Self-paced',
            'category' => $product->track ? $this->trackCategory($product->track->phase) : 'Course',
            'deliveryMode' => Str::headline((string) $product->delivery_mode),
            'duration' => $this->durationFromCohort($cohort),
            'price' => $price ? $this->money($price) : 'Waitlist',
            'amount' => $price?->amount,
            'currency' => $price?->currency,
            'image' => $this->mediaUrl($media, $product->track),
            'outcomes' => $product->outcomes ?? [],
            'syllabus' => $product->syllabus ?? [],
            'requirements' => $product->requirements ?? [],
            'tools' => $product->track?->tools ?? [],
            'seats' => $this->seatsLabel($product, $cohort),
            'url' => $product->track ? route('courses.products.show', [$product->track->slug, $product->slug]) : route('courses.index'),
            'trackUrl' => $product->track ? route('courses.show', $product->track->slug) : route('courses.index'),
            'cohort' => $cohort ? [
                'title' => $cohort->title,
                'status' => Str::headline($cohort->status->value),
                'startsAt' => $cohort->starts_at?->toFormattedDateString(),
                'enrollmentClosesAt' => $cohort->enrollment_closes_at?->toFormattedDateString(),
            ] : null,
            'paymentPlans' => $product->paymentPlans->map(fn ($plan) => [
                'name' => $plan->name,
                'description' => $plan->description,
                'deposit' => $this->moneyAmount($plan->currency, $plan->deposit_amount),
                'installment' => $this->moneyAmount($plan->currency, $plan->installment_amount),
                'installmentsCount' => $plan->installments_count,
                'interval' => Str::headline($plan->interval),
            ])->values(),
        ];
    }

    private function mediaUrl(?ProductMedia $media, ?Track $track): string
    {
        $path = $media?->url ?: $media?->path ?: $track?->image_path;

        if (blank($path)) {
            return '/images/skill_up.png';
        }

        if (Str::startsWith($path, ['http://', 'https://', '/'])) {
            return $path;
        }

        return Storage::disk($media?->disk ?: 'public')->url($path);
    }

    private function trackCategory(?string $phase): string
    {
        return $phase === 'launch' ? 'Launch track' : Str::headline((string) $phase);
    }

    /**
     * @param  Collection<int, Product>  $products
     */
    private function trackDuration(Collection $products): string
    {
        $durations = $products
            ->map(fn (Product $product) => $this->durationFromCohort($product->cohort))
            ->filter()
            ->unique()
            ->values();

        return $durations->first() ?? 'TBA';
    }

    private function durationFromCohort(?Cohort $cohort): string
    {
        if (! $cohort?->starts_at || ! $cohort?->ends_at) {
            return 'TBA';
        }

        $weeks = max(1, (int) ceil($cohort->starts_at->diffInDays($cohort->ends_at, true) / 7));

        if ($weeks >= 8) {
            return (int) round($weeks / 4).' months';
        }

        return $weeks.' weeks';
    }

    /**
     * @param  Collection<int, mixed>  $levels
     */
    private function levelLabel(Collection $levels): string
    {
        if ($levels->isEmpty()) {
            return 'Coming soon';
        }

        if ($levels->count() === 1) {
            return (string) $levels->first();
        }

        return $levels->first().' to '.$levels->last();
    }

    /**
     * @param  Collection<int, Product>  $products
     */
    private function trackPrice(Collection $products): string
    {
        $prices = $products
            ->map(fn (Product $product) => $product->defaultPrice)
            ->filter()
            ->sortBy(fn (ProductPrice $price) => (float) $price->amount)
            ->values();

        return $prices->isNotEmpty() ? $this->money($prices->first()) : 'Waitlist';
    }

    private function seatsLabel(Product $product, ?Cohort $cohort): string
    {
        if ($product->unlimited_enrollment) {
            return 'Unlimited seats';
        }

        $cap = $product->enrollment_cap;

        if (! $cap) {
            return 'Limited seats';
        }

        $remaining = max(0, $cap - (int) ($cohort?->enrolled_count ?? 0));

        return $remaining.' of '.$cap.' seats left';
    }

    private function money(ProductPrice $price): string
    {
        return $this->moneyAmount($price->currency, $price->amount);
    }

    private function moneyAmount(string $currency, string|float|int|null $amount): string
    {
        if ($amount === null) {
            return $currency.' 0';
        }

        $value = (float) $amount;
        $decimals = floor($value) === $value ? 0 : 2;

        return $currency.' '.number_format($value, $decimals);
    }
}
