<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CheckoutDiscountController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\PaystackWebhookController;
use App\Http\Controllers\PublicCourseController;
use App\Http\Controllers\DiscourseSsoController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\ResourceController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\FutureModuleController;
use App\Http\Controllers\LeadController;
use App\Http\Controllers\DeploymentHealthController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/healthz', [DeploymentHealthController::class, 'live'])->name('deployment.live');
Route::get('/readyz', [DeploymentHealthController::class, 'ready'])->name('deployment.ready');

Route::get('/', function () {
    $hasFaqs = \Illuminate\Support\Facades\Schema::hasTable('faqs');
    $hasTestimonials = \Illuminate\Support\Facades\Schema::hasTable('testimonials');
    $hasPartners = \Illuminate\Support\Facades\Schema::hasTable('partners');
    $hasPosts = \Illuminate\Support\Facades\Schema::hasTable('posts');

    return Inertia::render('Public/Home', [
        'faqs' => $hasFaqs ? \App\Models\Content\Faq::orderBy('sort_order', 'asc')->get() : collect(),
        'testimonials' => $hasTestimonials ? \App\Models\Content\Testimonial::where('is_featured', true)->get() : collect(),
        'partners' => $hasPartners ? \App\Models\Content\Partner::where('is_active', true)->get() : collect(),
        'recentPosts' => $hasPosts ? \App\Models\Content\Post::with('category')
            ->where('status', 'published')
            ->where('published_at', '<=', now())
            ->orderBy('published_at', 'desc')
            ->limit(3)
            ->get() : collect()
    ]);
})->name('home');
Route::get('/about', fn () => Inertia::render('Public/About'))->name('about');
Route::get('/contact', fn () => Inertia::render('Public/Contact'))->name('contact');
Route::get('/community', fn () => Inertia::render('Public/Community'))->name('community');
Route::get('/corporate', fn () => Inertia::render('Public/Corporate'))->name('corporate');
Route::get('/schools', [FutureModuleController::class, 'show'])->defaults('key', 'school_youth_program')->name('future.schools');
Route::get('/career-center', [FutureModuleController::class, 'show'])->defaults('key', 'career_center')->name('future.career-center');
Route::get('/jobs', [FutureModuleController::class, 'show'])->defaults('key', 'job_board')->name('future.jobs');
Route::get('/employer', [FutureModuleController::class, 'show'])->defaults('key', 'employer_portal')->name('future.employer');
Route::get('/alumni', [FutureModuleController::class, 'show'])->defaults('key', 'alumni_directory')->name('future.alumni');
Route::get('/certificates/verify', [FutureModuleController::class, 'show'])->defaults('key', 'certificate_builder_verification')->name('future.certificates.verify');
Route::get('/ambassadors', [FutureModuleController::class, 'show'])->defaults('key', 'ambassador_referral_program')->name('future.ambassadors');
Route::get('/courses', [PublicCourseController::class, 'index'])->name('courses.index');
Route::get('/courses/{trackSlug}/{productSlug}', [PublicCourseController::class, 'showProduct'])->name('courses.products.show');
Route::get('/courses/{trackSlug}', [PublicCourseController::class, 'showTrack'])->name('courses.show');
Route::post('/checkout/discount/validate', [CheckoutDiscountController::class, 'validateDiscount'])->name('checkout.discount.validate');
Route::get('/checkout/failed', [CheckoutController::class, 'failed'])->name('checkout.status.failed');
Route::get('/checkout/paystack/callback', [CheckoutController::class, 'paystackCallback'])->name('checkout.paystack.callback');
Route::get('/checkout/{product:slug}', [CheckoutController::class, 'details'])->name('checkout.details');
Route::post('/checkout/{product:slug}/review', [CheckoutController::class, 'store'])->name('checkout.store');
Route::get('/checkout/orders/{order:uuid}/review', [CheckoutController::class, 'review'])->name('checkout.orders.review');
Route::post('/checkout/orders/{order:uuid}/pay', [CheckoutController::class, 'pay'])->name('checkout.orders.pay');
Route::get('/checkout/orders/{order:uuid}/processing', [CheckoutController::class, 'processing'])->name('checkout.orders.processing');
Route::get('/checkout/orders/{order:uuid}/success', [CheckoutController::class, 'success'])->name('checkout.orders.success');
Route::get('/checkout/orders/{order:uuid}/pending', [CheckoutController::class, 'pending'])->name('checkout.orders.pending');
Route::get('/checkout/orders/{order:uuid}/failed', [CheckoutController::class, 'failed'])->name('checkout.orders.failed');
Route::post('/webhooks/paystack', PaystackWebhookController::class)->name('webhooks.paystack');

Route::get('/discourse/sso', [DiscourseSsoController::class, 'sso'])
    ->middleware(['auth'])
    ->name('discourse.sso');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Blog
Route::get('/blog', [BlogController::class, 'index'])->name('blog.index');
Route::get('/blog/{slug}', [BlogController::class, 'show'])->name('blog.show');

// Resources
Route::get('/resources', [ResourceController::class, 'index'])->name('resources.index');
Route::get('/resources/{slug}', [ResourceController::class, 'show'])->name('resources.show');
Route::post('/resources/{slug}/download', [ResourceController::class, 'download'])->name('resources.download');

// Events
Route::get('/events', [EventController::class, 'index'])->name('events.index');
Route::get('/events/{slug}', [EventController::class, 'show'])->name('events.show');
Route::post('/events/{slug}/register', [EventController::class, 'register'])->name('events.register');

// Lead Capture Forms
Route::post('/leads/newsletter', [LeadController::class, 'storeNewsletter'])->name('leads.newsletter');
Route::post('/leads/contact', [LeadController::class, 'storeContact'])->name('leads.contact');
Route::post('/leads/corporate', [LeadController::class, 'storeCorporate'])->name('leads.corporate');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
