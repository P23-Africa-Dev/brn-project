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
        // Use provided userId or fallback to authenticated user
        $userId = $userId ?? Auth::id();

        $lastWeek = Carbon::now()->subDays(6);

        $activities = UserActivity::where('user_id', $userId)
            ->where('created_at', '>=', $lastWeek)
            ->get()
            ->groupBy(function ($date) {
                return Carbon::parse($date->created_at)->format('Y-m-d');
            })
            ->map(function ($group) {
                return $group->sum('minutes_online');
            });

        return response()->json([
            'data' => $activities
        ]);
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
}
