<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Cause extends Model
{
    use SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'categories',
        'description',
        'expiresAt',
        'ongId',
    ];

    /**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
    public $timestamps = true;

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [];

    /**
     * The attributes that should be guarded from fill and other fillable fields.
     *
     * @var array
     */
    protected $guarded = [
        'ongId',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'expiresAt' => 'datetime',
    ];

    /**
     * Get the ong that owns the cause.
     */
    public function ong()
    {
        return $this->belongsTo(Ong::class, 'ongId', 'id');
    }
}
