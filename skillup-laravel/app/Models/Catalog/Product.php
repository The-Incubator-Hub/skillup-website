<?php

namespace App\Models\Catalog;

use App\Enums\ProductStatus;
use Database\Factories\Catalog\ProductFactory;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Str;

class Product extends Model
{
    /** @use HasFactory<ProductFactory> */
    use HasFactory;

    protected $fillable = [
        'uuid',
        'track_id',
        'course_level_id',
        'cohort_id',
        'title',
        'slug',
        'subtitle',
        'description',
        'outcomes',
        'syllabus',
        'requirements',
        'status',
        'delivery_mode',
        'enrollment_cap',
        'unlimited_enrollment',
        'published_at',
        'is_featured',
        'sort_order',
        'metadata',
    ];

    protected function casts(): array
    {
        return [
            'status' => ProductStatus::class,
            'outcomes' => 'array',
            'syllabus' => 'array',
            'requirements' => 'array',
            'unlimited_enrollment' => 'boolean',
            'published_at' => 'datetime',
            'is_featured' => 'boolean',
            'metadata' => 'array',
        ];
    }

    protected static function booted(): void
    {
        static::creating(function (Product $product) {
            $product->uuid ??= (string) Str::uuid();
        });
    }

    public function scopePublished(Builder $query): Builder
    {
        return $query
            ->where('status', ProductStatus::Published->value)
            ->whereNotNull('published_at')
            ->where('published_at', '<=', now());
    }

    /**
     * @return array<int, string>
     */
    public function missingPublicationFields(): array
    {
        $missing = [];

        foreach ([
            'title' => 'title',
            'slug' => 'slug',
            'track_id' => 'track',
            'course_level_id' => 'level',
            'description' => 'description',
            'outcomes' => 'outcomes',
            'syllabus' => 'syllabus',
        ] as $attribute => $label) {
            if (blank($this->{$attribute})) {
                $missing[] = $label;
            }
        }

        if (! $this->unlimited_enrollment && blank($this->enrollment_cap)) {
            $missing[] = 'enrollment cap';
        }

        if (! $this->defaultPrice()->where('is_active', true)->exists()) {
            $missing[] = 'active default price';
        }

        return $missing;
    }

    public function canBePublished(): bool
    {
        return $this->missingPublicationFields() === [];
    }

    public function publish(): bool
    {
        if (! $this->canBePublished()) {
            return false;
        }

        return $this->forceFill([
            'status' => ProductStatus::Published,
            'published_at' => $this->published_at ?? now(),
        ])->save();
    }

    public function track(): BelongsTo
    {
        return $this->belongsTo(Track::class);
    }

    public function level(): BelongsTo
    {
        return $this->belongsTo(CourseLevel::class, 'course_level_id');
    }

    public function cohort(): BelongsTo
    {
        return $this->belongsTo(Cohort::class);
    }

    public function media(): HasMany
    {
        return $this->hasMany(ProductMedia::class)->orderBy('sort_order');
    }

    public function prices(): HasMany
    {
        return $this->hasMany(ProductPrice::class);
    }

    public function defaultPrice(): HasOne
    {
        return $this->hasOne(ProductPrice::class)->where('is_default', true);
    }

    public function paymentPlans(): HasMany
    {
        return $this->hasMany(ProductPaymentPlan::class);
    }

    public function visibilityRules(): HasMany
    {
        return $this->hasMany(ProductVisibilityRule::class);
    }

    public function moodleMappings(): HasMany
    {
        return $this->hasMany(ProductMoodleMapping::class);
    }

    public function primaryMoodleMapping(): HasOne
    {
        return $this->hasOne(ProductMoodleMapping::class)->where('is_primary', true);
    }

    public function orderItems(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

    public function enrollments(): HasMany
    {
        return $this->hasMany(Enrollment::class);
    }
}
