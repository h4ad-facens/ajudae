<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Ong extends Model
{
    use SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'color',
        'image',
        'name',
        'email',
        'whatsapp',
        'userId',
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
        'userId',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [];

    /**
     * Get the user that owns the ong.
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'userId', 'id');
    }
}
