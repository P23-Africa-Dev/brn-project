<?php

use App\Models\Conversation;
use Illuminate\Support\Facades\Broadcast;

// Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
//     return (int) $user->id === (int) $id;
// });

Broadcast::channel('conversation.{conversationId}', function ($user, $conversationId) {
    // return false to deny subscription; presence channels expect user array on success
    $isParticipant = Conversation::where('id', $conversationId)
        ->whereHas('participants', fn($q) => $q->where('user_id', $user->id))
        ->exists();

    return $isParticipant ? ['id' => $user->id, 'name' => $user->name] : false;
});

// Broadcast::channel('conversation.{conversationId}', function ($user, $conversationId) {
//     return Conversation::find($conversationId)
//         ->participants()
//         ->where('user_id', $user->id)
//         ->exists();
// });