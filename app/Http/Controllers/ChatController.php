<?php

namespace App\Http\Controllers;

use App\Models\Conversation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ChatController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        $conversations = $user->conversations()
            ->with(['participants', 'lastMessage.user'])
            ->orderByDesc('last_message_at')
            ->get();

        // Add this logging
        \Log::info('Conversations:', [
            'count' => $conversations->count(),
            'data' => $conversations->toArray()
        ]);

        $mappedConversations = $conversations->map(function ($c) use ($user) {
            return [
                'id' => $c->id,
                'title' => $c->title,
                'participants' => $c->participants->map->only(['id', 'name']),
                'last_message' => $c->lastMessage ? [
                    'body' => $c->lastMessage->body,
                    'created_at' => $c->lastMessage->created_at->toDateTimeString()
                ] : null,
            ];
        });

        return Inertia::render('chats/index', [
            'conversations' => $mappedConversations,
            'auth' => ['user' => $user->only('id', 'name', 'email')],
        ]);
    }

    public function show(Request $request, Conversation $conversation)
    {
        $user = $request->user();

        if (!$user) {
            abort(401);
        }

        if (!$conversation->participants()->where('user_id', $user->id)->exists()) {
            abort(403);
        }

        $messages = $conversation->messages()
            ->with('user')
            ->orderBy('created_at')
            ->get()
            ->map(function ($m) {
                return [
                    'id' => $m->id,
                    'body' => $m->body,
                    'user' => $m->user ? $m->user->only(['id', 'name']) : null,
                    'created_at' => $m->created_at->toDateTimeString(),
                ];
            });

        return Inertia::render('chats/show', [
            'conversation' => [
                'id' => $conversation->id,
                'title' => $conversation->title,
                'participants' => $conversation->participants()
                    ->select(['users.id', 'users.name'])
                    ->get(),
            ],
            'messages' => $messages,
            'auth' => [
                'user' => $user->only(['id', 'name'])
            ],
        ]);
    }
}
