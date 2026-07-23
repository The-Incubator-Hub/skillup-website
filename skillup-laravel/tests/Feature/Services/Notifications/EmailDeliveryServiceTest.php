<?php

namespace Tests\Feature\Services\Notifications;

use App\Models\Notifications\EmailMessage;
use App\Models\Notifications\EmailDeliveryLog;
use App\Services\Notifications\EmailDeliveryService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Mail;
use Tests\TestCase;

class EmailDeliveryServiceTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        config(['services.zeptomail.api_key' => 'test-key']);
        config(['services.zeptomail.from_address' => 'test@example.com']);
        config(['services.zeptomail.base_url' => 'https://api.zeptomail.com/v1.1']);
    }

    public function test_it_sends_email_via_zeptomail_successfully()
    {
        Http::fake([
            'https://api.zeptomail.com/v1.1/email' => Http::response(['data' => [['message_id' => '12345']]], 200)
        ]);

        $message = EmailMessage::create([
            'recipient_email' => 'user@example.com',
            'subject' => 'Test Subject',
            'body_html' => '<p>Test Body</p>',
            'status' => 'pending',
        ]);

        $service = new EmailDeliveryService();
        $result = $service->send($message);

        $this->assertTrue($result);
        $this->assertEquals('sent', $message->fresh()->status);
        
        $log = EmailDeliveryLog::where('email_message_id', $message->id)->first();
        $this->assertNotNull($log);
        $this->assertEquals('zeptomail', $log->provider);
        $this->assertEquals('success', $log->status);
        $this->assertEquals('12345', $log->provider_message_id);
    }

    public function test_it_falls_back_to_ses_when_zeptomail_fails()
    {
        Http::fake([
            'https://api.zeptomail.com/v1.1/email' => Http::response(['error' => 'API Error'], 500)
        ]);

        Mail::fake();

        $message = EmailMessage::create([
            'recipient_email' => 'user@example.com',
            'subject' => 'Test Subject',
            'body_html' => '<p>Test Body</p>',
            'status' => 'pending',
        ]);

        $service = new EmailDeliveryService();
        $result = $service->send($message);

        $this->assertTrue($result);
        $this->assertEquals('fallback_sent', $message->fresh()->status);

        // Verify two logs were created
        $logs = EmailDeliveryLog::where('email_message_id', $message->id)->orderBy('attempt_number')->get();
        $this->assertCount(2, $logs);

        // First log should be failed zeptomail
        $this->assertEquals('zeptomail', $logs[0]->provider);
        $this->assertEquals('failed', $logs[0]->status);
        $this->assertEquals(1, $logs[0]->attempt_number);

        // Second log should be successful ses
        $this->assertEquals('ses', $logs[1]->provider);
        $this->assertEquals('success', $logs[1]->status);
        $this->assertEquals(2, $logs[1]->attempt_number);
    }

    public function test_ses_mailer_can_be_resolved()
    {
        $mailer = app('mail.manager')->mailer('ses');
        $this->assertNotNull($mailer);
    }
}
