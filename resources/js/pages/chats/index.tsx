import AppLayout from '@/layouts/app-layout';
import { Link } from '@inertiajs/react';

type Props = {
    conversations?: {
        id: number;
        title?: string | null;
        participants: { id: number; name: string; profile_picture?: string }[];
        last_message?: { body: string; created_at: string } | null;
    }[];
    auth: {
        user: {
            id: number;
            name: string;
            profile_picture?: string;
        };
    };
};


export default function Index({ conversations = [], auth }: Props) {
    // Helper to get the other participant (for 1:1 chat)
    function getOtherParticipant(participants: { id: number; name: string; profile_picture?: string }[], currentUserId: number) {
        if (!participants || participants.length < 2) return null;
        return participants.find((u) => u.id !== currentUserId) || null;
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
                                    <Link
                                        key={c.id}
                                        href={`/messages/${c.id}`}
                                        className="flex items-center gap-3 rounded-xl bg-white p-4 shadow hover:bg-gray-50"
                                    >
                                        <img
                                            src={other?.profile_picture || '/assets/brn-logo.png'}
                                            alt={other?.name || 'User'}
                                            className="h-10 w-10 rounded-full border object-cover"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = '/assets/brn-logo.png';
                                            }}
                                        />
                                        <div className="min-w-0 flex-1">
                                            <div className="truncate font-semibold">{other?.name || 'User'}</div>
                                            <div className="truncate text-sm text-gray-500">{c.last_message?.body || 'No messages yet'}</div>
                                        </div>
                                        <div className="text-xs whitespace-nowrap text-gray-400">
                                            {c.last_message?.created_at && new Date(c.last_message.created_at).toLocaleTimeString()}
                                        </div>
                                    </Link>
                                );
                            })
                        ) : (
                            <div className="py-4 text-center text-gray-500">No conversations available</div>
                        )}
                    </div>
                </aside>

                <div className="flex flex-1 items-center justify-center text-gray-400">Select a conversation</div>
            </div>
        </AppLayout>
    );
}
