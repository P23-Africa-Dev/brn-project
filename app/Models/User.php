<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'profile_picture',
        'company_name',
        'company_description',
        'industry',
        'categories',
        'great_at',
        'can_help_with',

        'phone',
        'linkedin',
        'country',
        'position',
        'years_of_operation',
        'number_of_employees',
        'selected_outcome',
        'goals',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    public function getProfilePictureAttribute($value)
    {
        if (!$value) {
            return '/images/no-user-dp.png';
        }

        if (str_starts_with($value, 'http')) {
            return $value;
        }

        return asset('storage/' . $value);
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'categories' => 'array',
            'great_at' => 'array',
            'can_help_with' => 'array',
        ];
    }

    // public function conversations()
    // {
    //     return $this->belongsToMany(Conversation::class)
    //         ->withTimestamps()
    //         ->orderByPivot('created_at', 'desc');
    // }

    public function conversations()
    {
        return $this->belongsToMany(\App\Models\Conversation::class, 'conversation_user');
    }

    public function messages()
    {
        return $this->hasMany(\App\Models\Message::class);
    }

    public function connections()
    {
        return $this->hasMany(\App\Models\Connection::class, 'user_id');
    }

    public function connectedWith()
    {
        return $this->hasMany(\App\Models\Connection::class, 'connected_user_id');
    }
}
