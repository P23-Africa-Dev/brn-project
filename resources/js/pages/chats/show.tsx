import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';

interface Props {
    conversation: {
        id: number;
        title: string | null;
        participants: User[];
    };
    messages: Message[];
    auth: {
        user: {
            id: number;
            name: string;
        };
    };
}

type User = {
    id: number;
    name: string;
};

type Message = {
    id: number;
    body: string;
    user: User;
    created_at: string;
};

export default function Show({ conversation, messages: initialMessages, auth }: Props) {
    // Add validation check at the start
    if (!auth?.user?.id) {
        return <div className="p-4 text-red-500">Authentication required</div>;
    }

    const [messages, setMessages] = useState<Message[]>(initialMessages || []);
    const [text, setText] = useState('');
    const [typingUsers, setTypingUsers] = useState<User[]>([]);
    const [participants, setParticipants] = useState<User[]>(conversation?.participants || []);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const channelRef = useRef<any>(null);

    useEffect(() => scrollToBottom(), [messages]);

    useEffect(() => {
        if (!conversation?.id || !auth?.user?.id) return;

        const chan = window.Echo.join(`conversation.${conversation.id}`)
            .here((users: User[]) => {
                if (Array.isArray(users)) {
                    setParticipants(users);
                }
            })
            .joining((user: User) => {
                if (user?.id) {
                    setParticipants((p) => [...p, user]);
                }
            })
            .leaving((user: User) => {
                if (user?.id) {
                    setParticipants((p) => p.filter((u) => u.id !== user.id));
                }
            })
            .listen('.message.sent', (event: { message: Message }) => {
                // Note: Changed 'e' to 'event.message'
                const message = event.message;
                if (message?.user?.id !== auth.user.id) {
                    setMessages((prev) => [...prev, message]);
                }
            })
            .listenForWhisper('typing', (event: { user: User }) => {
                if (event?.user?.id && event.user.id !== auth.user.id) {
                    setTypingUsers((prev) => {
                        if (!prev.find((u) => u.id === event.user.id)) {
                            return [...prev, event.user];
                        }
                        return prev;
                    });
                    setTimeout(() => {
                        setTypingUsers((prev) => prev.filter((u) => u.id !== event.user.id));
                    }, 2000);
                }
            });

        channelRef.current = chan;

        return () => {
            chan?.leave(`conversation.${conversation.id}`);
        };
    }, [conversation?.id, auth?.user?.id]);

    function scrollToBottom() {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }

    async function sendMessage(e?: React.FormEvent) {
        e?.preventDefault();
        if (!text.trim()) return;
        const body = text;
        setText('');
        try {
            const res = await axios.post(`/chats/${conversation.id}/messages`, { body });
            setMessages((m) => [...m, res.data.message]); // local append
        } catch (err) {
            console.error(err);
            setText(body);
        }
    }

    function handleTyping(e: React.ChangeEvent<HTMLInputElement>) {
        setText(e.target.value);
        try {
            channelRef.current?.whisper('typing', { user: auth.user });
        } catch (err) {}
    }

    return (
        <div className="flex h-screen bg-white">
            <div className="w-96 border-r p-6">
                <h3 className="text-lg font-semibold">{conversation.title ?? 'Conversation'}</h3>
                <div className="mt-2 text-sm text-gray-500">Participants: {participants.map((p) => p.name).join(', ')}</div>
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
    );
}
