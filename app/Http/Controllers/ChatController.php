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

        $mappedConversations = $conversations->map(function ($c) use ($user) {
            return [
                'id' => $c->encrypted_id, // Use encrypted ID for frontend routing
                'encrypted_id' => $c->encrypted_id, // Always provide encrypted_id
                'title' => $c->title,
                'participants' => $c->participants->map(function ($p) {
                    return [
                        'id' => $p->id,
                        'name' => $p->name,
                        // Always use accessor for full URL
                        'profile_picture' => $p->getAttribute('profile_picture'),
                    ];
                }),
                'last_message' => $c->lastMessage ? [
                    'body' => $c->lastMessage->body,
                    'created_at' => $c->lastMessage->created_at->toDateTimeString()
                ] : null,
            ];
        });

        return Inertia::render('chats/index', [
            'conversations' => $mappedConversations,
            'auth' => ['user' => $user->only(['id', 'name', 'email', 'profile_picture'])],
        ]);
    }

    /**
     * Start or find a direct conversation with a user and redirect to it.
     */
    public function startDirect(Request $request)
    {
        $user = $request->user();
        $otherUserId = $request->input('user_id');
        if (!$user || !$otherUserId || $user->id == $otherUserId) {
            return redirect()->back()->with('error', 'Invalid user.');
        }

        // Find existing direct conversation (2 participants, no title)
        $existing = $user->conversations()
            ->whereDoesntHave('participants', function ($q) use ($user, $otherUserId) {
                $q->whereNotIn('users.id', [$user->id, $otherUserId]);
            })
            ->whereHas('participants', function ($q) use ($otherUserId) {
                $q->where('users.id', $otherUserId);
            })
            ->whereRaw('(select count(*) from conversation_user where conversation_id = conversations.id) = 2')
            ->first();

        if ($existing) {
            return redirect()->route('chats.show', ['encryptedId' => $existing->encrypted_id]);
        }

        // Create new conversation
        $conversation = \App\Models\Conversation::create();
        $conversation->participants()->attach([$user->id, $otherUserId]);

        return redirect()->route('chats.show', ['encryptedId' => $conversation->encrypted_id]);
    }

    public function show(Request $request, string $encryptedId)
    {
        $user = $request->user();
        if (!$user) {
            abort(401);
        }

        $conversation = Conversation::findByEncryptedId($encryptedId);
        if (!$conversation) {
            abort(404);
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
                    'user' => $m->user ? $m->user->only(['id', 'name', 'profile_picture']) : null,
                    'created_at' => $m->created_at->toDateTimeString(),
                ];
            });

        // Get participants with profile_picture
        $participants = $conversation->participants()
            ->select(['users.id', 'users.name', 'users.profile_picture'])
            ->get();

        // Get latest message (last in the list)
        $latestMessage = $messages->count() ? $messages->last() : null;

        return Inertia::render('chats/show', [
            'conversation' => [
                'id' => $conversation->id, // raw id for Echo
                'encrypted_id' => $conversation->encrypted_id, // secure routes
                'title' => $conversation->title,
                'participants' => $participants,
            ],
            'messages' => $messages,
            'latestMessage' => $latestMessage,
            'auth' => [
                'user' => $user->only(['id', 'name', 'profile_picture'])
            ],
        ]);
    }
}
