<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Transaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'tx_ref',
        'flw_transaction_id',
        'amount',
        'currency',
        'status',
        'email',
        'meta',
        'verified_at',
    ];

    protected $casts = [
        'meta' => 'array',
        'verified_at' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
