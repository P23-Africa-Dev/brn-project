<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Models\Conversation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MessageController extends Controller
{
    public function store(Request $request, string $encryptedId)
    {
        $user = $request->user();
        if (!$user) {
            return response()->json(['error' => 'Unauthenticated'], 401);
        }

        $conversation = Conversation::findByEncryptedId($encryptedId);
        if (!$conversation) {
            return response()->json(['error' => 'Conversation not found'], 404);
        }

        // Check participant
        if (!$conversation->participants()->where('user_id', $user->id)->exists()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'body' => 'required|string|max:5000',
        ]);

        $message = $conversation->messages()->create([
            'conversation_id' => $conversation->id,
            'body' => $validated['body'],
            'user_id' => $user->id,
        ]);

        // $messageData = [
        //     'id' => $message->id,
        //     'body' => $message->body,
        //     'user' => [
        //         'id' => $user->id,
        //         'name' => $user->name,
        //     ],
        //     'created_at' => $message->created_at->toDateTimeString(),
        // ];

        // Wrap the message data in a 'message' key
        broadcast(new MessageSent($message));

        return response()->json([
            'message' => $message->load('user')
        ], 201);
    }
}
