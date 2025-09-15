<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\UserActivity;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $users = User::all();

        return Inertia::render('dashboard', [
            'users' => $users,
        ]);
    }


    public function weeklyActivity(Request $request, $userId = null)
    {
        $userId = $userId ?? Auth::id();
        $lastWeek = now()->subDays(6)->startOfDay();
        $today = now()->endOfDay();

        $activities = UserActivity::where('user_id', $userId)
            ->whereBetween('created_at', [$lastWeek, $today])
            ->orderBy('created_at')
            ->get()
            ->groupBy(function ($activity) {
                return $activity->created_at->format('Y-m-d');
            })
            ->map(function ($group) {
                return $group->sum('minutes_online');
            });

        // Fill in missing dates with zero
        $result = collect();
        for ($date = $lastWeek; $date <= $today; $date->addDay()) {
            $dateStr = $date->format('Y-m-d');
            $result[$dateStr] = $activities[$dateStr] ?? 0;
        }

        return response()->json(['data' => $result]);
    }

    public function getActivityChange()
    {
        $userId = Auth::id();
        $today = Carbon::now();

        // Get this week's total minutes
        $thisWeek = UserActivity::where('user_id', $userId)
            ->whereBetween('created_at', [
                $today->copy()->startOfWeek(),
                $today->copy()->endOfWeek()
            ])
            ->sum('minutes_online');

        // Get last week's total minutes
        $lastWeek = UserActivity::where('user_id', $userId)
            ->whereBetween('created_at', [
                $today->copy()->subWeek()->startOfWeek(),
                $today->copy()->subWeek()->endOfWeek()
            ])
            ->sum('minutes_online');

        // Calculate percentage change
        $percentageChange = $lastWeek > 0
            ? (($thisWeek - $lastWeek) / $lastWeek) * 100
            : ($thisWeek > 0 ? 100 : 0);

        return response()->json([
            'change' => round($percentageChange, 1),
            'isIncrease' => $percentageChange >= 0
        ]);
    }

    public function connectedUsers()
    {
        $user = auth()->user();
        $userId = $user->id;

        $connections = \App\Models\Connection::where(function($q) use ($userId) {
            $q->where('user_id', $userId)
              ->orWhere('connected_user_id', $userId);
        })->get();

        $connected = [];
        $pending = [];
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
                if ($conn->connected_user_id == $userId) {
                    $pending[] = [
                        'id' => $conn->user->id,
                        'name' => $conn->user->name,
                        'email' => $conn->user->email,
                        'profile_picture' => $conn->user->profile_picture,
                    ]; // incoming
                } else {
                    $pending[] = [
                        'id' => $conn->connectedUser->id,
                        'name' => $conn->connectedUser->name,
                        'email' => $conn->connectedUser->email,
                        'profile_picture' => $conn->connectedUser->profile_picture,
                    ]; // outgoing
                }
            }
        }

        return Inertia::render('connected-users', [
            'connected' => $connected,
            'pending' => $pending,
        ]);
    }
}
