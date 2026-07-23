<?php

namespace App\Http\Controllers;

use App\Models\Content\Lead;
use App\Models\Operations\FormSubmission;
use App\Notifications\NewLeadNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Notification;

class LeadController extends Controller
{
    public function storeNewsletter(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email|max:255',
        ]);

        $lead = Lead::create([
            'email' => $validated['email'],
            'type' => 'newsletter',
        ]);

        $this->recordFormSubmission($request, $lead, 'newsletter', [
            'email' => $validated['email'],
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Thank you for subscribing to our newsletter!',
        ]);
    }

    public function storeContact(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:50',
            'message' => 'required|string|max:2000',
        ]);

        $lead = Lead::create([
            'email' => $validated['email'],
            'name' => $validated['name'],
            'phone' => $validated['phone'],
            'type' => 'contact_page',
            'metadata' => [
                'message' => $validated['message'],
            ],
        ]);

        $this->recordFormSubmission($request, $lead, 'contact_page', [
            ...$validated,
            'subject' => 'Contact page message',
        ]);

        $this->notifyAdmin($lead);

        return response()->json([
            'success' => true,
            'message' => 'Your message has been sent successfully. We will get back to you shortly!',
        ]);
    }

    public function storeCorporate(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'company_name' => 'required|string|max:255',
            'employee_count' => 'nullable|string|max:50',
            'message' => 'required|string|max:2000',
        ]);

        $lead = Lead::create([
            'email' => $validated['email'],
            'name' => $validated['name'],
            'type' => 'corporate_inquiry',
            'metadata' => [
                'company_name' => $validated['company_name'],
                'employee_count' => $validated['employee_count'] ?? null,
                'message' => $validated['message'],
            ],
        ]);

        $this->recordFormSubmission($request, $lead, 'corporate_inquiry', [
            ...$validated,
            'subject' => 'Corporate training inquiry',
        ]);

        $this->notifyAdmin($lead);

        return response()->json([
            'success' => true,
            'message' => 'Your corporate inquiry has been submitted. Our team will contact you soon!',
        ]);
    }

    protected function notifyAdmin(Lead $lead)
    {
        $adminEmail = config('mail.admin_notification_email') 
            ?? env('ADMIN_NOTIFICATION_EMAIL') 
            ?? config('mail.from.address');

        if ($adminEmail) {
            try {
                Notification::route('mail', $adminEmail)
                    ->notify(new NewLeadNotification($lead));
            } catch (\Exception $e) {
                logger()->error('Failed to send admin lead notification email: ' . $e->getMessage());
            }
        }
    }

    /**
     * @param array<string, mixed> $payload
     */
    protected function recordFormSubmission(Request $request, Lead $lead, string $formKey, array $payload): void
    {
        FormSubmission::create([
            'user_id' => $request->user()?->id,
            'lead_id' => $lead->id,
            'form_key' => $formKey,
            'source_url' => $request->headers->get('referer'),
            'name' => $payload['name'] ?? null,
            'email' => $payload['email'] ?? $lead->email,
            'phone' => $payload['phone'] ?? null,
            'subject' => $payload['subject'] ?? null,
            'message' => $payload['message'] ?? null,
            'payload' => $payload,
        ]);
    }
}
