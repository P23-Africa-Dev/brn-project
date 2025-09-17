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
    const [editingMessageId, setEditingMessageId] = useState<number | null>(null);
    const [editText, setEditText] = useState('');
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
        if (editingMessageId !== null) {
            // Save edited message
            await handleSaveEdit(editingMessageId);
            return;
        }
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

    // Edit message handlers
    function handleEditMessage(messageId: number, currentBody: string) {
        setEditingMessageId(messageId);
        setEditText(currentBody);
    }

    function handleCancelEdit() {
        setEditingMessageId(null);
        setEditText('');
    }

    async function handleSaveEdit(messageId: number) {
        if (!editText.trim() || !selectedConversation) return;
        try {
            // TODO: Replace with actual backend PATCH endpoint
            await axios.patch(`/messages/${selectedConversation.encrypted_id}/messages/${messageId}`, { body: editText });
            setMessages((msgs) => msgs.map((msg) => (msg.id === messageId ? { ...msg, body: editText } : msg)));
            setEditingMessageId(null);
            setEditText('');
        } catch (err) {
            console.error('Edit message failed', err);
        }
    }

    async function handleDeleteMessage(messageId: number) {
        if (!selectedConversation) return;
        if (!window.confirm('Are you sure you want to delete this message?')) return;
        try {
            // TODO: Replace with actual backend DELETE endpoint
            await axios.delete(`/messages/${selectedConversation.encrypted_id}/messages/${messageId}`);
            setMessages((msgs) => msgs.filter((msg) => msg.id !== messageId));
        } catch (err) {
            console.error('Delete message failed', err);
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
                                        className={`flex w-full cursor-pointer items-center gap-3 rounded-xl p-4 shadow hover:bg-gray-50 ${selectedEncryptedId === c.encrypted_id ? 'bg-indigo-50' : 'bg-white'}`}
                                        style={{ border: selectedEncryptedId === c.encrypted_id ? '2px solid #6366f1' : undefined }}
                                    >
                                        <img
                                            src={other?.profile_picture || '/images/no-user-dp.png'}
                                            alt={other?.name || 'User'}
                                            className="h-10 w-10 rounded-full border object-cover"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = '/images/no-user-dp.png';
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
                            <div className="relative mb-6 flex items-center gap-3 px-8 py-4 pb-0">
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
                                                src={other?.profile_picture || '/images/no-user-dp.png'}
                                                alt={other?.name || 'User'}
                                                className="h-12 w-12 rounded-full border object-cover"
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).src = '/images/no-user-dp.png';
                                                }}
                                            />
                                            <div>
                                                <h3 className="text-lg font-semibold">{other?.name || 'User'}</h3>
                                            </div>
                                            {/* Close icon */}
                                            <button
                                                onClick={() => {
                                                    setSelectedEncryptedId(null);
                                                    setSelectedConversation(null);
                                                    setMessages([]);
                                                    setParticipants([]);
                                                    setText('');
                                                    // Optionally update the URL to remove the conversation id
                                                    router.replace({ url: '/messages' });
                                                }}
                                                className="absolute top-2 right-2 rounded-full p-2 hover:bg-gray-200 focus:outline-none"
                                                title="Close chat"
                                                type="button"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-5 w-5 text-gray-500"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </>
                                    );
                                })()}
                            </div>
                            <div className="flex-1 overflow-auto bg-gray-50 p-6">
                                <div className="mx-auto max-w-3xl space-y-4">
                                    {messages.map((m) => {
                                        const isOwn = m.user.id === auth.user.id;
                                        const isEditing = editingMessageId === m.id;
                                        return (
                                            <div key={m.id} className={`flex ${isOwn ? 'justify-end' : 'justify-start'} group`}>
                                                <div
                                                    className={`${isOwn ? 'bg-indigo-600 text-white' : 'bg-white'} relative max-w-[70%] rounded-lg p-3 shadow`}
                                                >
                                                    {isEditing ? (
                                                        <form
                                                            onSubmit={(e) => {
                                                                e.preventDefault();
                                                                handleSaveEdit(m.id);
                                                            }}
                                                            className="flex items-center gap-2"
                                                        >
                                                            <input
                                                                value={editText}
                                                                onChange={(e) => setEditText(e.target.value)}
                                                                className="flex-1 rounded border px-2 py-1 text-white focus:outline-none"
                                                                autoFocus
                                                            />
                                                            {/* Save icon */}
                                                            <button type="submit" title="Save" className="ml-1 rounded p-1 hover:bg-gray-200">
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    className="h-4 w-4 text-green-600"
                                                                    fill="none"
                                                                    viewBox="0 0 24 24"
                                                                    stroke="currentColor"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth={2}
                                                                        d="M5 13l4 4L19 7"
                                                                    />
                                                                </svg>
                                                            </button>
                                                            {/* Cancel icon */}
                                                            <button
                                                                type="button"
                                                                title="Cancel"
                                                                onClick={handleCancelEdit}
                                                                className="ml-1 rounded p-1 hover:bg-gray-200"
                                                            >
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    className="h-4 w-4 text-gray-400"
                                                                    fill="none"
                                                                    viewBox="0 0 24 24"
                                                                    stroke="currentColor"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth={2}
                                                                        d="M6 18L18 6M6 6l12 12"
                                                                    />
                                                                </svg>
                                                            </button>
                                                        </form>
                                                    ) : (
                                                        <>
                                                            <div className="text-sm break-words">{m.body}</div>
                                                            <div className="mt-1 text-xs text-gray-400">
                                                                {new Date(m.created_at).toLocaleString()}
                                                            </div>
                                                            {isOwn && (
                                                                <div className="flex w-full justify-end">
                                                                    <div className="absolute right-0 bottom-1 left-0 flex justify-end gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                                                                        <button
                                                                            title="Edit"
                                                                            className="rounded p-1 hover:bg-gray-200"
                                                                            onClick={() => handleEditMessage(m.id, m.body)}
                                                                        >
                                                                            <svg
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                className="h-4 w-4 text-gray-500"
                                                                                fill="none"
                                                                                viewBox="0 0 24 24"
                                                                                stroke="currentColor"
                                                                            >
                                                                                <path
                                                                                    strokeLinecap="round"
                                                                                    strokeLinejoin="round"
                                                                                    strokeWidth={2}
                                                                                    d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a4 4 0 01-1.414.828l-4 1a1 1 0 01-1.263-1.263l1-4a4 4 0 01.828-1.414z"
                                                                                />
                                                                            </svg>
                                                                        </button>
                                                                        <button
                                                                            title="Delete"
                                                                            className="rounded p-1 hover:bg-gray-200"
                                                                            onClick={() => handleDeleteMessage(m.id)}
                                                                        >
                                                                            <svg
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                className="h-4 w-4 text-gray-500"
                                                                                fill="none"
                                                                                viewBox="0 0 24 24"
                                                                                stroke="currentColor"
                                                                            >
                                                                                <path
                                                                                    strokeLinecap="round"
                                                                                    strokeLinejoin="round"
                                                                                    strokeWidth={2}
                                                                                    d="M6 18L18 6M6 6l12 12"
                                                                                />
                                                                            </svg>
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
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
