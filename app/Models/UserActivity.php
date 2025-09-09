<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserActivity extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'minutes_online',
        'last_activity_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'last_activity_at' => 'datetime',
    ];

    /**
     * Get the user that owns the activity record.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Scope a query to get activities within the last 7 days.
     */
    public function scopeLastWeek($query)
    {
        return $query->where('created_at', '>=', now()->subDays(6)->startOfDay());
    }

    /**
     * Get total minutes online for a specific date.
     */
    public static function getTotalMinutesForDate($userId, $date)
    {
        return self::where('user_id', $userId)
            ->whereDate('created_at', $date)
            ->sum('minutes_online');
    }
}
