<?php

namespace App\Http\Controllers;

use App\Models\Content\Event;
use App\Notifications\EventRegisteredNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Notification;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class EventController extends Controller
{
    public function index()
    {
        $events = Event::where('status', '!=', 'cancelled')
            ->orderBy('starts_at', 'asc')
            ->get();

        return Inertia::render('Public/Events/Index', [
            'events' => $events,
        ]);
    }

    public function show(string $slug)
    {
        $event = Event::where('slug', $slug)->firstOrFail();

        return Inertia::render('Public/Events/Show', [
            'event' => $event,
        ]);
    }

    public function register(Request $request, string $slug)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:50',
        ]);

        [$event, $registration] = DB::transaction(function () use ($slug, $validated) {
            $event = Event::where('slug', $slug)
                ->lockForUpdate()
                ->firstOrFail();

            if ($event->status !== 'upcoming') {
                throw ValidationException::withMessages([
                    'message' => 'Registrations are only allowed for upcoming events.',
                ]);
            }

            $currentRegistrations = $event->registrations()->count();

            if ($event->registration_limit !== null && $currentRegistrations >= $event->registration_limit) {
                throw ValidationException::withMessages([
                    'message' => 'This event has reached its registration limit.',
                ]);
            }

            if ($event->registrations()->where('email', $validated['email'])->exists()) {
                throw ValidationException::withMessages([
                    'email' => 'You have already registered for this event.',
                ]);
            }

            $registration = $event->registrations()->create([
                'user_id' => auth()->id(),
                'name' => $validated['name'],
                'email' => $validated['email'],
                'phone' => $validated['phone'] ?? null,
            ]);

            $event->refreshRegisteredCount();

            return [$event->refresh(), $registration];
        });

        // Dispatch email notification to the registrant
        try {
            Notification::route('mail', $validated['email'])
                ->notify(new EventRegisteredNotification($event, $registration));
        } catch (\Exception $e) {
            // Log but don't crash
            logger()->error('Failed to send event registration email: ' . $e->getMessage());
        }

        return redirect()->back()->with('success', 'You have successfully registered for the event!');
    }
}
