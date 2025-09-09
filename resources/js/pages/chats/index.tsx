import { Link } from '@inertiajs/react';

type Props = {
    conversations?: {
        id: number;
        title?: string | null;
        participants: { id: number; name: string }[];
        last_message?: { body: string; created_at: string } | null;
    }[];
    auth: {
        user: {
            id: number;
            name: string;
        };
    };
};

export default function Index({ conversations = [], auth }: Props) {
    // Add this console log
    console.log('Conversations:', conversations);
    console.log('Auth:', auth);

    return (
        <div className="flex h-screen bg-gray-50">
            <aside className="w-96 border-r bg-white p-6">
                <h2 className="mb-4 text-xl font-semibold">Direct Messages</h2>
                <div className="space-y-4">
                    {Array.isArray(conversations) && conversations.length > 0 ? (
                        conversations.map((c) => (
                            <Link
                                key={c.id}
                                href={`/chats/${c.id}`}
                                className="flex items-center justify-between rounded-xl bg-white p-4 shadow hover:bg-gray-50"
                            >
                                <div>
                                    <div className="font-semibold">
                                        {c.title ||
                                            c.participants
                                                .filter((p) => p.id !== auth.user.id)
                                                .map((p) => p.name)
                                                .join(', ') ||
                                            'Unnamed Chat'}
                                    </div>
                                    <div className="text-sm text-gray-500">{c.last_message?.body || 'No messages yet'}</div>
                                </div>
                                <div className="text-xs text-gray-400">
                                    {c.last_message?.created_at && new Date(c.last_message.created_at).toLocaleTimeString()}
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="py-4 text-center text-gray-500">No conversations available</div>
                    )}
                </div>
            </aside>

            <div className="flex flex-1 items-center justify-center text-gray-400">Select a conversation</div>
        </div>
    );
}
