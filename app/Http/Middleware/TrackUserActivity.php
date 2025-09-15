<?php

namespace App\Http\Middleware;

use Closure;
use Carbon\Carbon;
use App\Models\UserActivity;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TrackUserActivity
{
    public function handle(Request $request, Closure $next)
    {
        $response = $next($request);

        if (Auth::check()) {
            UserActivity::updateOrCreate(
                [
                    'user_id' => Auth::id(),
                    'created_at' => Carbon::today(),
                ],
                [
                    'minutes_online' => \DB::raw('minutes_online + 1'),
                    'last_activity_at' => now(),
                ]
            );
        }

        return $response;
    }
}