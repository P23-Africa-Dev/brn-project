<?php

namespace App\Models;

use App\Models\Traits\HasEncryptedId;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Conversation extends Model
{
    use HasEncryptedId;

    protected $fillable = ['title', 'last_message_at'];
    
    protected $appends = ['encrypted_id'];

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

        public function user()
    {
        return $this->belongsTo(User::class);
    }
}
