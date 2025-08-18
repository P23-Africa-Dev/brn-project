<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Services\FlutterwaveService;
use App\Services\CurrencyService;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->singleton(FlutterwaveService::class, function ($app) {
            return new FlutterwaveService();
        });

        $this->app->singleton(CurrencyService::class, function ($app) {
            return new CurrencyService($app->make(FlutterwaveService::class));
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
