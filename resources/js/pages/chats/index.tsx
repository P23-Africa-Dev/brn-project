import AppLayout from '@/layouts/app-layout';
import { router } from '@inertiajs/react';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';

// Helper to get the other participant (for 1:1 chat)
function getOtherParticipant(participants: User[], currentUserId: number): User | null {
    if (!participants || participants.length < 2) return null;
    return participants.find((u) => u.id !== currentUserId) || null;
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

type ConversationListItem = {
    id?: any; // may be encrypted in index response — we'll fetch full conversation on select
    encrypted_id: string;
    title?: string | null;
    participants: User[];
    last_message?: { body: string; created_at: string } | null;
};

type Props = {
    conversations?: ConversationListItem[];
    auth: {
        user: User;
    };
};

export default function Index({ conversations = [], auth }: Props) {
    // Get encryptedId from URL if present
    const urlMatch = typeof window !== 'undefined' ? window.location.pathname.match(/\/messages\/(\w+)/) : null;
    const initialId = urlMatch ? urlMatch[1] : null;
    const [selectedEncryptedId, setSelectedEncryptedId] = useState<string | null>(initialId);

    // Full conversation data we fetch when a conversation is selected
    const [selectedConversation, setSelectedConversation] = useState<{
        id: number | null; // raw numeric id required for Echo channel
        encrypted_id: string;
        participants: User[];
        title?: string | null;
    } | null>(null);

    // Chat state for selected conversation
    const [messages, setMessages] = useState<Message[]>([]);
    const [text, setText] = useState('');
    const [typingUsers, setTypingUsers] = useState<User[]>([]);
    const [participants, setParticipants] = useState<User[]>([]);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const channelRef = useRef<any>(null);

    // Load conversations list participant avatars already provided by server (props)
    // When selectedEncryptedId changes we fetch that conversation's messages & raw id
    useEffect(() => {
        if (!selectedEncryptedId) {
            setSelectedConversation(null);
            setMessages([]);
            setParticipants([]);
            return;
        }

        async function loadConversation(encryptedId: string) {
            try {
                // Attempt to fetch the same data returned by ChatController::show.
                // Use Accept: 'application/json' and X-Requested-With to encourage JSON props from Inertia if configured.
                const res = await axios.get(`/messages/${encryptedId}`, {
                    headers: {
                        Accept: 'application/json',
                        'X-Requested-With': 'XMLHttpRequest',
                    },
                });

                // Inertia returns props under res.data.props, otherwise try res.data
                const payload = res.data?.props ? res.data.props : res.data;

                // Try to get conversation and messages from payload (matches ChatController::show)
                let conversation = payload?.conversation ?? payload?.props?.conversation ?? null;
                let msgs = payload?.messages ?? payload?.props?.messages ?? null;

                // Sometimes server may return in different shapes — try to detect
                // If `conversation` doesn't contain raw id, attempt to infer or fallback
                if (!conversation || !('id' in conversation)) {
                    // fallback: try `payload.conversation` or `payload.page` etc.
                    // (not exhaustive — but will fall back to fetch messages route if available)
                }

                if (conversation && msgs) {
                    setSelectedConversation({
                        id: conversation.id ?? null,
                        encrypted_id: conversation.encrypted_id ?? encryptedId,
                        participants: conversation.participants ?? [],
                        title: conversation.title ?? null,
                    });
                    setMessages(msgs || []);
                    setParticipants(conversation.participants ?? []);
                    return;
                }

                // FALLBACK: older setup — try a dedicated messages endpoint (if available)
                const fallback = await axios.get(`/messages/${encryptedId}/messages`, {
                    headers: { Accept: 'application/json' },
                });
                const fallbackData = fallback.data?.props ? fallback.data.props : fallback.data;
                // If fallbackData contains conversation or messages, use them
                const fallbackConv = fallbackData?.conversation ?? null;
                const fallbackMsgs = fallbackData?.messages ?? fallbackData?.messages ?? fallbackData;
                setSelectedConversation({
                    id: fallbackConv?.id ?? null,
                    encrypted_id: encryptedId,
                    participants: fallbackConv?.participants ?? [],
                    title: fallbackConv?.title ?? null,
                });
                setMessages(fallbackMsgs || []);
                setParticipants(fallbackConv?.participants ?? []);
            } catch (err) {
                console.error('Error loading conversation:', err);
                // If the GET /messages/{encryptedId} returned HTML (Inertia non-JSON) axios may throw
                // Try to call a minimal API: GET /messages/{encryptedId}/messages (if your backend supports it)
                try {
                    const fallback = await axios.get(`/messages/${encryptedId}/messages`, {
                        headers: { Accept: 'application/json' },
                    });
                    const fallbackData = fallback.data?.props ? fallback.data.props : fallback.data;
                    const fallbackConv = fallbackData?.conversation ?? null;
                    const fallbackMsgs = fallbackData?.messages ?? [];
                    setSelectedConversation({
                        id: fallbackConv?.id ?? null,
                        encrypted_id: encryptedId,
                        participants: fallbackConv?.participants ?? [],
                        title: fallbackConv?.title ?? null,
                    });
                    setMessages(fallbackMsgs || []);
                    setParticipants(fallbackConv?.participants ?? []);
                } catch (err2) {
                    console.error('Fallback load also failed', err2);
                }
            }
        }

        loadConversation(selectedEncryptedId);
    }, [selectedEncryptedId]);

    // Real-time and typing logic (use raw numeric id for channel)
    useEffect(() => {
        // we need the raw numeric id that the server broadcasts to (conversation.id)
        if (!selectedConversation?.id || !auth?.user?.id) return;
        const conversationId = selectedConversation.id;

        // Leave any previous channel first
        if (channelRef.current && typeof (window as any).Echo.leave === 'function') {
            try {
                (window as any).Echo.leave(`conversation.${channelRef.current?.currentConversationId}`);
            } catch (err) {
                // ignore
            }
            channelRef.current = null;
        }

        const chan = (window as any).Echo?.join(`conversation.${conversationId}`)
            .here((users: User[]) => {
                setParticipants(users);
            })
            .joining((user: User) => {
                setParticipants((p: User[]) => [...p, user]);
            })
            .leaving((user: User) => {
                setParticipants((p: User[]) => p.filter((u) => u.id !== user.id));
            })
            .listen('MessageSent', (event: { message: Message }) => {
                const incoming = event.message;
                if (!incoming) return;
                // server sends { message: { ... } } — match show.tsx behaviour
                if (incoming.user && incoming.user.id !== auth.user.id) {
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

        // store channel and conversation id for leaving later
        channelRef.current = { chan, currentConversationId: conversationId };

        return () => {
            try {
                (window as any).Echo?.leave(`conversation.${conversationId}`);
                channelRef.current = null;
            } catch (err) {
                // ignore
            }
        };
    }, [selectedConversation?.id, auth?.user?.id]);

    // scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    async function sendMessage(e?: React.FormEvent) {
        e?.preventDefault();
        if (!text.trim() || !selectedConversation) return;
        const body = text;
        setText('');
        try {
            const res = await axios.post(`/messages/${selectedConversation.encrypted_id}/messages`, { body });
            // server responds with 'message' => message (with user loaded)
            if (res?.data?.message) {
                setMessages((m) => [...m, res.data.message]);
            } else if (res?.data) {
                setMessages((m) => [...m, res.data]);
            }
        } catch (err) {
            console.error('Send message failed', err);
            setText(body);
        }
    }

    function handleTyping(e: React.ChangeEvent<HTMLInputElement>) {
        setText(e.target.value);
        try {
            if (channelRef.current && typeof channelRef.current.chan?.whisper === 'function') {
                channelRef.current.chan.whisper('typing', { user: auth.user });
            } else if ((window as any).Echo && (window as any).Echo.private) {
                // fallback — attempt whisper on the raw channel name if available
                try {
                    (window as any).Echo.whisper(`conversation.${selectedConversation?.id}`, 'typing', {
                        user: auth.user,
                    });
                } catch (err) {
                    // ignore
                }
            }
        } catch (err) {
            // ignore
        }
    }

    // When a conversation is selected, update the URL with encrypted_id and load messages
    function handleSelectConversation(encryptedId: string) {
        setSelectedEncryptedId(encryptedId);
        // Update the browser URL without a full navigation
        router.replace({ url: `/messages/${encryptedId}` });
        // router.replace(`/messages/${encryptedId}`); // ✅ no object wrapper
    }

    return (
        <AppLayout>
            <div className="flex h-screen bg-gray-50">
                <aside className="w-96 border-r bg-white p-6">
                    <h2 className="mb-4 text-xl font-semibold">Direct Messages</h2>
                    <div className="space-y-4">
                        {Array.isArray(conversations) && conversations.length > 0 ? (
                            conversations.map((c) => {
                                const other = getOtherParticipant(c.participants, auth.user.id) || c.participants[0];
                                return (
                                    <button
                                        key={c.encrypted_id}
                                        onClick={() => handleSelectConversation(c.encrypted_id)}
                                        className={`flex w-full items-center gap-3 rounded-xl p-4 shadow hover:bg-gray-50 ${selectedEncryptedId === c.encrypted_id ? 'bg-indigo-50' : 'bg-white'}`}
                                        style={{ border: selectedEncryptedId === c.encrypted_id ? '2px solid #6366f1' : undefined }}
                                    >
                                        <img
                                            src={other?.profile_picture || '/assets/brn-logo.png'}
                                            alt={other?.name || 'User'}
                                            className="h-10 w-10 rounded-full border object-cover"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = '/assets/brn-logo.png';
                                            }}
                                        />
                                        <div className="min-w-0 flex-1 text-left">
                                            <div className="truncate font-semibold">{other?.name || 'User'}</div>
                                            <div className="truncate text-sm text-gray-500">{c.last_message?.body || 'No messages yet'}</div>
                                        </div>
                                        <div className="text-xs whitespace-nowrap text-gray-400">
                                            {c.last_message?.created_at && new Date(c.last_message.created_at).toLocaleTimeString()}
                                        </div>
                                    </button>
                                );
                            })
                        ) : (
                            <div className="py-4 text-center text-gray-500">No conversations available</div>
                        )}
                    </div>
                </aside>

                <div className="flex flex-1 flex-col bg-white">
                    {selectedConversation ? (
                        <>
                            <div className="mb-6 flex items-center gap-3 p-8 pb-0">
                                {(() => {
                                    const other = getOtherParticipant(selectedConversation.participants, auth.user.id);
                                    // Find the last message from the other participant, or just the last message
                                    let lastMsg = null;
                                    if (messages && messages.length > 0) {
                                        // Prefer last message from the other participant
                                        lastMsg =
                                            [...messages].reverse().find((m) => other && m.user.id === other.id) || messages[messages.length - 1];
                                    }
                                    return (
                                        <>
                                            <img
                                                src={other?.profile_picture || '/assets/brn-logo.png'}
                                                alt={other?.name || 'User'}
                                                className="h-12 w-12 rounded-full border object-cover"
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).src = '/assets/brn-logo.png';
                                                }}
                                            />
                                            <div>
                                                <h3 className="text-lg font-semibold">{other?.name || 'User'}</h3>
                                                <div className="mt-1 max-w-xs truncate text-sm text-gray-500">
                                                    {lastMsg ? lastMsg.body : 'No messages yet'}
                                                </div>
                                            </div>
                                        </>
                                    );
                                })()}
                            </div>
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
                        </>
                    ) : (
                        <div className="flex flex-1 items-center justify-center text-gray-400">Select a conversation</div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
