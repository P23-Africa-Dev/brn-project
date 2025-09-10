<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Conversation extends Model
{
    protected $fillable = ['title', 'last_message_at'];

    // public function participants(): BelongsToMany
    // {
    //     return $this->belongsToMany(User::class, 'conversation_user');
    // }

    public function participants()
    {
        return $this->belongsToMany(User::class, 'conversation_user')
            ->select('users.id', 'users.name', 'users.email') // explicitly from users
            ->withTimestamps();
    }


    public function messages(): HasMany
    {
        return $this->hasMany(Message::class)->orderBy('created_at');
    }

    public function lastMessage()
    {
        return $this->hasOne(Message::class)->latestOfMany();
    }
}
