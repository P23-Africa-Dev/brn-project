<?php

namespace App\Http\Controllers;

use App\Models\Connection;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ConnectionController extends Controller
{
    // Send a connection request
    public function sendRequest(Request $request)
    {
        $request->validate([
            'connected_user_id' => 'required|exists:users,id',
        ]);
        $userId = Auth::id();
        $connectedUserId = $request->connected_user_id;
        if ($userId == $connectedUserId) {
            return redirect()->back()->with('error', 'Cannot connect to yourself');
        }
        $connection = Connection::firstOrCreate(
            [
                'user_id' => $userId,
                'connected_user_id' => $connectedUserId,
            ],
            ['status' => 'pending']
        );
    return redirect()->back()->with('success', 'Connection request sent.');
    }

    // Accept a connection request
    public function acceptRequest(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
        ]);
        $userId = Auth::id();
        $requesterId = $request->user_id;
        $connection = Connection::where('user_id', $requesterId)
            ->where('connected_user_id', $userId)
            ->where('status', 'pending')
            ->first();
        if (!$connection) {
            return redirect()->back()->with('error', 'No pending request found.');
        }
        $connection->status = 'accepted';
        $connection->save();
        return redirect()->back()->with('success', 'Connection accepted.');
    }

    // Reject a connection request or revoke outgoing request
    public function rejectRequest(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
        ]);
        $userId = Auth::id();
        $requesterId = $request->user_id;

        // Try to find as incoming (someone sent me a request)
        $connection = Connection::where('user_id', $requesterId)
            ->where('connected_user_id', $userId)
            ->where('status', 'pending')
            ->first();

        if ($connection) {
            $connection->status = 'rejected';
            $connection->save();
            return redirect()->back()->with('success', 'Connection declined.');
        }

        // Try to find as outgoing (I sent a request, so I can revoke/delete it)
        $connection = Connection::where('user_id', $userId)
            ->where('connected_user_id', $requesterId)
            ->where('status', 'pending')
            ->first();
        if ($connection) {
            $connection->delete();
            return redirect()->back()->with('success', 'Connection revoked.');
        }

        return redirect()->back()->with('error', 'No pending request found.');
    }

    // List all connections and pending requests for the authenticated user
    public function listConnections()
    {
        $connected = [];
        $pending = [];
        $userId = Auth::id();
        $connections = Connection::where(function($q) use ($userId) {
            $q->where('user_id', $userId)
              ->orWhere('connected_user_id', $userId);
        })->get();

        foreach ($connections as $conn) {
            if ($conn->status === 'accepted') {
                $otherUser = $conn->user_id == $userId ? $conn->connectedUser : $conn->user;
                $connected[] = [
                    'id' => $otherUser->id,
                    'name' => $otherUser->name,
                    'email' => $otherUser->email,
                    'profile_picture' => $otherUser->profile_picture,
                ];
            } elseif ($conn->status === 'pending') {
                if ($conn->user_id == $userId) {
                    // I sent the request (outgoing)
                    $pending[] = [
                        'id' => $conn->connectedUser->id,
                        'name' => $conn->connectedUser->name,
                        'email' => $conn->connectedUser->email,
                        'profile_picture' => $conn->connectedUser->profile_picture,
                        'direction' => 'outgoing',
                    ];
                }
                if ($conn->connected_user_id == $userId) {
                    // I received the request (incoming)
                    $pending[] = [
                        'id' => $conn->user->id,
                        'name' => $conn->user->name,
                        'email' => $conn->user->email,
                        'profile_picture' => $conn->user->profile_picture,
                        'direction' => 'incoming',
                    ];
                }
            }
        }
        return Inertia::render('connected-users', [
            'connected' => $connected,
            'pending' => $pending,
            'auth' => ['user' => ['id' => $userId]],
        ]);
    }
}
