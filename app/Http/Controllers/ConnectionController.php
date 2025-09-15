<?php

namespace App\Http\Controllers;

use App\Models\Connection;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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
            return response()->json(['message' => 'Cannot connect to yourself'], 400);
        }
        $connection = Connection::firstOrCreate(
            [
                'user_id' => $userId,
                'connected_user_id' => $connectedUserId,
            ],
            ['status' => 'pending']
        );
        return response()->json(['status' => $connection->status]);
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
                            // Always set direction explicitly
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
        // Try to find as incoming (someone sent me a request)
        $connection = Connection::where('user_id', $requesterId)
            ->where('connected_user_id', $userId)
            ->where('status', 'pending')
            ->first();

        if ($connection) {
            $connection->status = 'rejected';
            $connection->save();
            return response()->json(['status' => 'rejected']);
        }

        // Try to find as outgoing (I sent a request, so I can revoke/delete it)
        $connection = Connection::where('user_id', $userId)
            ->where('connected_user_id', $requesterId)
            ->where('status', 'pending')
            ->first();
        if ($connection) {
            $connection->delete();
            return response()->json(['status' => 'revoked']);
        }

        return response()->json(['message' => 'No pending request found'], 404);
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
                    // I sent the request (outgoing), show the user I sent to, with direction outgoing
                    $pending[] = [
                        'id' => $conn->connectedUser->id,
                        'name' => $conn->connectedUser->name,
                        'email' => $conn->connectedUser->email,
                        'profile_picture' => $conn->connectedUser->profile_picture,
                        'direction' => 'outgoing',
                    ];
                } elseif ($conn->connected_user_id == $userId) {
                    // I received the request (incoming), show the user who sent it, with direction incoming
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
        return response()->json([
            'connected' => $connected,
            'pending' => $pending,
        ]);
    }
}
