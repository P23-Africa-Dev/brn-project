import { router, usePage } from '@inertiajs/react';
import React from 'react';

interface User {
    id: number;
    name: string;
    email: string;
    profile_picture?: string | null;
    direction?: 'incoming' | 'outgoing'; // 'incoming' if request is to me, 'outgoing' if I sent
}

interface PageProps {
    connected: User[];
    pending: User[];
    [key: string]: unknown;
}

const ConnectedUsersPage: React.FC = () => {
    const { connected = [], pending = [] } = usePage<PageProps & { auth: { user: { id: number } } }>().props;
    const [loadingId, setLoadingId] = React.useState<number | null>(null);

    const handleAction = (userId: number, action: 'accept' | 'reject' | 'revoke') => {
        setLoadingId(userId);
        let url = '';
        if (action === 'accept') url = '/connections/accept';
        else if (action === 'reject') url = '/connections/reject';
        else url = '/connections/reject'; // revoke uses same endpoint as reject
        router.post(
            url,
            { user_id: userId },
            {
                preserveScroll: true,
                onFinish: () => setLoadingId(null),
                onSuccess: () => router.reload({ only: ['connected', 'pending'] }),
            },
        );
    };

    return (
        <div className="mx-auto max-w-3xl p-6">
            <h2 className="mb-4 text-2xl font-bold">Connected Users</h2>
            <div className="mb-8">
                {connected.length === 0 ? (
                    <p>No connections yet.</p>
                ) : (
                    <ul className="space-y-2">
                        {connected.map((user) => (
                            <li key={user.id} className="flex items-center gap-3 rounded border p-2">
                                {user.profile_picture && <img src={user.profile_picture} alt={user.name} className="h-10 w-10 rounded-full" />}
                                <span>{user.name}</span>
                                <span className="text-xs text-gray-500">{user.email}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <h2 className="mb-4 text-2xl font-bold">Pending Requests</h2>
            <div>
                {pending.length === 0 ? (
                    <p>No pending requests.</p>
                ) : (
                    <ul className="space-y-2">
                        {pending.map((user) => {
                            const isIncoming = user.direction === 'incoming';
                            return (
                                <li key={user.id} className="flex items-center gap-3 rounded border p-2">
                                    {user.profile_picture && <img src={user.profile_picture} alt={user.name} className="h-10 w-10 rounded-full" />}
                                    <span>{user.name}</span>
                                    <span className="text-xs text-gray-500">{user.email}</span>
                                    {isIncoming ? (
                                        <>
                                            <button
                                                className="mr-2 ml-auto rounded bg-green-500 px-3 py-1 text-white hover:bg-green-600 disabled:opacity-50"
                                                onClick={() => handleAction(user.id, 'accept')}
                                                disabled={loadingId === user.id}
                                            >
                                                {loadingId === user.id ? 'Processing...' : 'Accept'}
                                            </button>
                                            <button
                                                className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600 disabled:opacity-50"
                                                onClick={() => handleAction(user.id, 'reject')}
                                                disabled={loadingId === user.id}
                                            >
                                                {loadingId === user.id ? 'Processing...' : 'Decline'}
                                            </button>
                                        </>
                                    ) : (
                                        <button
                                            className="ml-auto rounded bg-yellow-500 px-3 py-1 text-white hover:bg-yellow-600 disabled:opacity-50"
                                            onClick={() => handleAction(user.id, 'revoke')}
                                            disabled={loadingId === user.id}
                                        >
                                            {loadingId === user.id ? 'Processing...' : 'Revoke Connection'}
                                        </button>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default ConnectedUsersPage;
