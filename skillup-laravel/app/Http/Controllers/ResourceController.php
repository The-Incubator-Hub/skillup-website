<?php

namespace App\Http\Controllers;

use App\Models\Content\Downloadable;
use App\Models\Content\Lead;
use App\Models\Content\ResourceCategory;
use App\Models\Operations\FormSubmission;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ResourceController extends Controller
{
    public function index()
    {
        $categories = ResourceCategory::with(['downloadables' => function ($query) {
            $query->where('status', 'published');
        }])->get();

        return Inertia::render('Public/Resources/Index', [
            'categories' => $categories,
        ]);
    }

    public function show(string $slug)
    {
        $downloadable = Downloadable::with('category')
            ->where('slug', $slug)
            ->where('status', 'published')
            ->firstOrFail();

        $relatedResources = Downloadable::with('category')
            ->where('resource_category_id', $downloadable->resource_category_id)
            ->where('id', '!=', $downloadable->id)
            ->where('status', 'published')
            ->latest()
            ->limit(3)
            ->get();

        return Inertia::render('Public/Resources/Show', [
            'resource' => $downloadable,
            'relatedResources' => $relatedResources,
        ]);
    }

    public function download(Request $request, string $slug)
    {
        $downloadable = Downloadable::where('slug', $slug)
            ->where('status', 'published')
            ->firstOrFail();

        $request->validate([
            'email' => 'required|email|max:255',
            'name' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:255',
        ]);

        if (! Storage::disk('public')->exists($downloadable->file_path)) {
            abort(404, 'Resource file not found.');
        }

        $lead = Lead::create([
            'email' => $request->input('email'),
            'name' => $request->input('name'),
            'phone' => $request->input('phone'),
            'type' => 'downloadable_resource',
            'metadata' => [
                'downloadable_id' => $downloadable->id,
                'downloadable_title' => $downloadable->title,
            ],
        ]);

        FormSubmission::create([
            'user_id' => $request->user()?->id,
            'lead_id' => $lead->id,
            'form_key' => 'downloadable_resource',
            'source_url' => $request->headers->get('referer'),
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'phone' => $request->input('phone'),
            'subject' => 'Resource download: '.$downloadable->title,
            'payload' => [
                'downloadable_id' => $downloadable->id,
                'downloadable_title' => $downloadable->title,
            ],
        ]);

        $downloadable->increment('download_count');

        return Storage::disk('public')->download($downloadable->file_path);
    }
}
