<?php

namespace App\Events;

use App\Models\Message;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class MessageSent implements ShouldBroadcast // or ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public Message $message;
    public int $conversationId;

    public function __construct(Message $message)
    {
        // IMPORTANT: keep the model instance — SerializesModels will store its id for queued jobs
        $this->message = $message->load('user');
        $this->conversationId = (int) $message->conversation_id;
    }

    // Use PresenceChannel if you want presence features (who's here). This matches your client .join().
    public function broadcastOn(): PresenceChannel
    {
        return new PresenceChannel('conversation.' . $this->conversationId);
    }

    // Optional: if you want a custom event name
    // public function broadcastAs(): string
    // {
    //     return 'message.sent';
    // }

    // Return an associative payload — not a nested array — and don't duplicate keys
    public function broadcastWith(): array
    {
        return [
            'message' => [
                'id' => $this->message->id,
                'body' => $this->message->body,
                'conversation_id' => $this->message->conversation_id,
                'created_at' => $this->message->created_at->toDateTimeString(),
                'user' => [
                    'id' => $this->message->user->id,
                    'name' => $this->message->user->name,
                ],
            ],
            'conversationId' => $this->conversationId,
        ];
    }
}
