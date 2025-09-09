<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Models\Conversation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MessageController extends Controller
{
    public function store(Request $request, Conversation $conversation)
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json(['error' => 'Unauthenticated'], 401);
        }

        if (!$conversation->participants()->where('user_id', $user->id)->exists()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'body' => 'required|string|max:1000',
        ]);

        $message = $conversation->messages()->create([
            'body' => $validated['body'],
            'user_id' => $user->id,
        ]);

        $messageData = [
            'id' => $message->id,
            'body' => $message->body,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
            ],
            'created_at' => $message->created_at->toDateTimeString(),
        ];

        // Wrap the message data in a 'message' key
        broadcast(new MessageSent($conversation->id, ['message' => $messageData]));

        return response()->json([
            'message' => $messageData
        ]);
    }
}
