<?php

namespace App\Http\Controllers;

use App\Enums\ProgramEditionStatus;
use App\Models\Programs\Program;
use App\Models\Programs\ProgramEdition;
use App\Models\Programs\ProgramEditionTrack;
use App\Services\Discounts\DiscountEligibilityService;
use Inertia\Inertia;
use Inertia\Response;

class ProgramController extends Controller
{
    public function index(): Response
    {
        $programs = Program::query()
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->get()
            ->map(fn (Program $program) => [
                'slug' => $program->slug,
                'name' => $program->name,
                'tagline' => $program->tagline,
                'description' => $program->description,
                'currentEdition' => $this->editionSummary($program->currentEdition()),
            ]);

        return Inertia::render('Public/Programs/Index', ['programs' => $programs]);
    }

    public function show(Program $program): Response
    {
        abort_unless($program->is_active, 404);

        $edition = $program->currentEdition();

        abort_unless($edition, 404);

        return $this->renderEdition($program, $edition);
    }

    public function showEdition(Program $program, string $editionSlug): Response
    {
        $edition = $program->editions()
            ->where('slug', $editionSlug)
            ->whereIn('status', ProgramEditionStatus::publicValues())
            ->firstOrFail();

        return $this->renderEdition($program, $edition);
    }

    private function renderEdition(Program $program, ProgramEdition $edition): Response
    {
        $edition->load(['tracks.product.defaultPrice']);

        $discounts = app(DiscountEligibilityService::class);

        $tracks = $edition->tracks->map(function (ProgramEditionTrack $track) use ($discounts) {
            $price = $track->product?->defaultPrice;
            $amount = $price ? (float) $price->amount : null;
            $discounted = null;

            if ($track->product && $amount !== null) {
                $result = $discounts->validate('preview@skillup.internal', $track->product, $amount);

                if ($result->valid && $result->discountAmount > 0) {
                    $discounted = max(0, $amount - $result->discountAmount);
                }
            }

            return [
                'id' => $track->id,
                'name' => $track->name,
                'slug' => $track->slug,
                'ageMin' => $track->age_min,
                'ageMax' => $track->age_max,
                'summary' => $track->summary,
                'curriculum' => $track->curriculum,
                'capacity' => $track->capacity,
                'seatsRemaining' => $track->seatsRemaining(),
                'isFull' => $track->isFull(),
                'currency' => $price?->currency,
                'amount' => $amount,
                'discountedAmount' => $discounted,
            ];
        });

        return Inertia::render('Public/Programs/Show', [
            'program' => [
                'slug' => $program->slug,
                'name' => $program->name,
                'tagline' => $program->tagline,
            ],
            'edition' => [
                'slug' => $edition->slug,
                'year' => $edition->year,
                'title' => $edition->title,
                'theme' => $edition->theme,
                'status' => $edition->status->value,
                'acceptsRegistrations' => $edition->status->acceptsRegistrations(),
                'startsOn' => $edition->starts_on?->toDateString(),
                'endsOn' => $edition->ends_on?->toDateString(),
                'scheduleText' => $edition->schedule_text,
                'venueName' => $edition->venue_name,
                'venueAddress' => $edition->venue_address,
                'venueMapUrl' => $edition->venue_map_url,
                'deliveryMode' => $edition->delivery_mode,
                'ageReferenceDate' => $edition->ageReferenceDate()->toDateString(),
                'content' => $edition->content ?? [],
                'contactWhatsapp' => $edition->contact_whatsapp,
                'contactEmail' => $edition->contact_email,
                'heroImagePath' => $edition->hero_image_path,
                'seoTitle' => $edition->seo_title ?? $edition->title,
                'seoDescription' => $edition->seo_description,
            ],
            'tracks' => $tracks,
            'archiveEditions' => $program->editions()
                ->whereKeyNot($edition->id)
                ->whereIn('status', [ProgramEditionStatus::Completed->value, ProgramEditionStatus::Archived->value])
                ->get(['slug', 'year', 'title'])
                ->map(fn ($past) => ['slug' => $past->slug, 'year' => $past->year, 'title' => $past->title]),
        ]);
    }

    /**
     * @return array<string, mixed>|null
     */
    private function editionSummary(?ProgramEdition $edition): ?array
    {
        if (! $edition) {
            return null;
        }

        return [
            'slug' => $edition->slug,
            'year' => $edition->year,
            'title' => $edition->title,
            'status' => $edition->status->value,
            'startsOn' => $edition->starts_on?->toDateString(),
            'venueName' => $edition->venue_name,
        ];
    }
}
