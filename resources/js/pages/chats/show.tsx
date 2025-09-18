import AppLayout from '@/layouts/app-layout';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';

// Helper to get the other participant (for 1:1 chat)
function getOtherParticipant(participants: User[], currentUserId: number): User | null {
    if (!participants || participants.length < 2) return null;
    return participants.find((u) => u.id !== currentUserId) || null;
}

interface Props {
    conversation: {
        encrypted_id: string | number;
        id: number;
        title: string | null;
        participants: User[];
    };
    messages: Message[];
    latestMessage?: Message | null;
    auth: {
        user: {
            id: number;
            name: string;
            profile_picture: string;
        };
    };
}

type User = {
    id: number;
    name: string;
    profile_picture?: string;
};

type Message = {
    id: number;
    body: string;
    user: User;
    created_at: string;
};

export default function Show({ conversation, messages: initialMessages, latestMessage, auth }: Props) {
    // React hooks must be called before any early returns
    const [messages, setMessages] = useState<Message[]>(initialMessages || []);
    const [text, setText] = useState('');
    const [typingUsers, setTypingUsers] = useState<User[]>([]);
    const [participants, setParticipants] = useState<User[]>(conversation?.participants || []);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const channelRef = useRef<{ whisper?: (event: string, data: unknown) => void } | null>(null);

    useEffect(() => scrollToBottom(), [messages]);

    useEffect(() => {
        if (!conversation?.id || !auth?.user?.id) return;

        const chan = window.Echo.join(`conversation.${conversation.id}`)
            .here((users: User[]) => setParticipants(users))
            .joining((user: User) => setParticipants((p) => [...p, user]))
            .leaving((user: User) => setParticipants((p) => p.filter((u) => u.id !== user.id)))
            .listen('MessageSent', (event: { message: Message }) => {
                // server now sends { message: { ... } }
                const incoming = event.message;
                if (incoming.user.id !== auth.user.id) {
                    setMessages((prev) => [...prev, incoming]);
                }
            })
            .listenForWhisper('typing', (payload: { user: User }) => {
                if (payload?.user?.id && payload.user.id !== auth.user.id) {
                    setTypingUsers((prev) => (prev.find((u) => u.id === payload.user.id) ? prev : [...prev, payload.user]));
                    setTimeout(() => {
                        setTypingUsers((prev) => prev.filter((u) => u.id !== payload.user.id));
                    }, 2000);
                }
            });

        channelRef.current = chan;

        return () => {
            try {
                (window as { Echo?: { leave: (channel: string) => void } }).Echo?.leave(`conversation.${conversation.id}`);
                channelRef.current = null;
            } catch (err) {
                console.warn('Error leaving Echo channel', err);
            }
        };
    }, [conversation?.id, auth?.user?.id]);

    // Add validation check after all hooks
    if (!auth?.user?.id) {
        return <div className="p-4 text-red-500">Authentication required</div>;
    }

    // Find the other participant (for 1:1 chat)
    const otherUser = getOtherParticipant(conversation?.participants || [], auth.user.id);

    function scrollToBottom() {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }

    async function sendMessage(e?: React.FormEvent) {
        e?.preventDefault();
        if (!text.trim()) return;

        const body = text;
        setText('');

        try {
            const res = await axios.post(`/messages/${conversation.encrypted_id}/messages`, { body });
            setMessages((m) => [...m, res.data.message]); // local append
        } catch (err) {
            console.error(err);
            setText(body);
        }
    }

    function handleTyping(e: React.ChangeEvent<HTMLInputElement>) {
        setText(e.target.value);

        try {
            if (channelRef.current && typeof channelRef.current.whisper === 'function') {
                channelRef.current.whisper('typing', { user: auth.user });
            }
        } catch (err) {
            console.error('Error sending typing notification:', err);
        }
    }

    return (
        <AppLayout>
            <div className="flex h-screen bg-white">
                <div className="w-96 border-r p-6">
                    {/* Show other participant's name and profile picture */}
                    {otherUser ? (
                        <div className="flex items-center gap-3">
                            {/* Use real profile image from backend, fallback to default */}
                            <img
                                src={otherUser.profile_picture || '/images/no-user-dp.png'}
                                alt={otherUser.name}
                                className="h-12 w-12 rounded-full border object-cover"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = '/images/no-user-dp.png';
                                }}
                            />
                            <div>
                                <h3 className="text-lg font-semibold">{otherUser.name}</h3>
                                {/* Latest message under name */}
                                {latestMessage && latestMessage.body && (
                                    <div className="mt-1 max-w-xs truncate text-sm text-gray-500">{latestMessage.body}</div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <h3 className="text-lg font-semibold">{conversation.title ?? 'Conversation'}</h3>
                    )}
                    {/* Optionally, show all participants for group chats */}
                    {participants.length > 2 && (
                        <div className="mt-2 text-sm text-gray-500">Participants: {participants.map((p) => p.name).join(', ')}</div>
                    )}
                </div>

                <div className="flex flex-1 flex-col">
                    <div className="flex-1 overflow-auto bg-gray-50 p-6">
                        <div className="mx-auto max-w-3xl space-y-4">
                            {messages.map((m) => (
                                <div key={m.id} className={`flex ${m.user.id === auth.user.id ? 'justify-end' : 'justify-start'}`}>
                                    <div
                                        className={`${m.user.id === auth.user.id ? 'bg-indigo-600 text-white' : 'bg-white'} max-w-[70%] rounded-lg p-3 shadow`}
                                    >
                                        <div className="text-sm">{m.body}</div>
                                        <div className="mt-1 text-xs text-gray-400">{new Date(m.created_at).toLocaleString()}</div>
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef}></div>
                        </div>
                    </div>

                    <div className="border-t p-4">
                        <form onSubmit={sendMessage} className="mx-auto flex max-w-3xl items-center gap-3">
                            <input
                                value={text}
                                onChange={handleTyping}
                                placeholder="Write your message..."
                                className="flex-1 rounded-full border px-4 py-2 focus:outline-none"
                            />
                            <button type="submit" className="rounded-full bg-indigo-600 px-4 py-2 text-white">
                                Send
                            </button>
                        </form>

                        <div className="mx-auto mt-2 max-w-3xl text-sm text-gray-500">
                            {typingUsers.length ? `${typingUsers.map((u) => u.name).join(', ')} typing…` : ''}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
