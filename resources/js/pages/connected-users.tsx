import React, { useState } from 'react';
import { usePage } from '@inertiajs/react';
import axios from 'axios';

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
    const { connected = [], pending = [], auth } = usePage<PageProps & { auth: { user: { id: number } } }>().props;
    const [pendingList, setPendingList] = useState<User[]>(pending);
    const [connectedList, setConnectedList] = useState<User[]>(connected);
    const [loadingId, setLoadingId] = useState<number | null>(null);

    const handleAction = async (userId: number, action: 'accept' | 'reject' | 'revoke') => {
        setLoadingId(userId);
        try {
            let url = '';
            let method: 'post' | 'delete' = 'post';
            if (action === 'accept') url = '/connections/accept';
            else if (action === 'reject') url = '/connections/reject';
            else {
                url = '/connections/reject';
                method = 'post'; // using POST for revoke for compatibility with backend
            }
            if (method === 'post') {
                await axios.post(url, { user_id: userId });
            } else {
                await axios.delete(url, { data: { user_id: userId } });
            }
            if (action === 'accept') {
                // Move user from pending to connected
                const user = pendingList.find(u => u.id === userId);
                if (user) {
                    setConnectedList(prev => [...prev, user]);
                }
            }
            setPendingList(prev => prev.filter(u => u.id !== userId));
        } catch (e) {
            // Optionally show error
        }
        setLoadingId(null);
    };

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Connected Users</h2>
            <div className="mb-8">
                {connectedList.length === 0 ? (
                    <p>No connections yet.</p>
                ) : (
                    <ul className="space-y-2">
                        {connectedList.map(user => (
                            <li key={user.id} className="flex items-center gap-3 p-2 border rounded">
                                {user.profile_picture && (
                                    <img src={user.profile_picture} alt={user.name} className="h-10 w-10 rounded-full" />
                                )}
                                <span>{user.name}</span>
                                <span className="text-xs text-gray-500">{user.email}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <h2 className="text-2xl font-bold mb-4">Pending Requests</h2>
            <div>
                {pendingList.length === 0 ? (
                    <p>No pending requests.</p>
                ) : (
                    <ul className="space-y-2">
                        {pendingList.map(user => {
                            const isIncoming = user.direction === 'incoming';
                            return (
                                <li key={user.id} className="flex items-center gap-3 p-2 border rounded">
                                    {user.profile_picture && (
                                        <img src={user.profile_picture} alt={user.name} className="h-10 w-10 rounded-full" />
                                    )}
                                    <span>{user.name}</span>
                                    <span className="text-xs text-gray-500">{user.email}</span>
                                    {isIncoming ? (
                                        <>
                                            <button
                                                className="ml-auto mr-2 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
                                                onClick={() => handleAction(user.id, 'accept')}
                                                disabled={loadingId === user.id}
                                            >
                                                {loadingId === user.id ? 'Processing...' : 'Accept'}
                                            </button>
                                            <button
                                                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
                                                onClick={() => handleAction(user.id, 'reject')}
                                                disabled={loadingId === user.id}
                                            >
                                                {loadingId === user.id ? 'Processing...' : 'Decline'}
                                            </button>
                                        </>
                                    ) : (
                                        <button
                                            className="ml-auto px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 disabled:opacity-50"
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
