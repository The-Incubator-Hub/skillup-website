<?php

namespace App\Models\Content;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ResourceCategory extends Model
{
    protected $fillable = ['name', 'slug'];

    public function downloadables(): HasMany
    {
        return $this->hasMany(Downloadable::class);
    }
}
