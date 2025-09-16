<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Services\FlutterwaveService;
use App\Services\CurrencyService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Vite;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // if ($this->app->environment('testing')) {
        //     Vite::useBuildDirectory('fake-build'); // avoid manifest lookup
        // }

        Inertia::share([
            'auth' => function () {
                return [
                    'user' => Auth::user() ? [
                        'id' => Auth::user()->id,
                        'name' => Auth::user()->name,
                        'email' => Auth::user()->email,
                        'profile_picture' => Auth::user()->profile_picture,
                        'company_name' => Auth::user()->company_name,
                        'company_description' => Auth::user()->company_description,
                        'industry' => Auth::user()->industry,
                        'categories' => Auth::user()->categories,
                        'great_at' => Auth::user()->great_at,
                        'can_help_with' => Auth::user()->can_help_with,
                    ] : null,
                ];
            },
        ]);
    }
}
