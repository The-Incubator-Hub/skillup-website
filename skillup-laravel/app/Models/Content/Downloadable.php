<?php

namespace App\Models\Content;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Downloadable extends Model
{
    protected $fillable = [
        'resource_category_id',
        'title',
        'slug',
        'description',
        'file_path',
        'cover_image',
        'download_count',
        'status',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(ResourceCategory::class, 'resource_category_id');
    }
}
