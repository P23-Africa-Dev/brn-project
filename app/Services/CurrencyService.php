<?php

namespace App\Services;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class CurrencyService
{
    protected $flutterwaveService;

    public function __construct(FlutterwaveService $flutterwaveService)
    {
        $this->flutterwaveService = $flutterwaveService;
    }

    public function getUserCurrency($ip = null)
    {
        try {
            // Get user's IP if not provided
            $ip = $ip ?? request()->ip();

            // Check cache first
            $cacheKey = "user_currency_{$ip}";
            if (Cache::has($cacheKey)) {
                return Cache::get($cacheKey);
            }

            // Get location from IP
            $response = Http::get("http://ip-api.com/json/{$ip}");

            if ($response->successful()) {
                $data = $response->json();
                $currency = $this->getCurrencyByCountry($data['countryCode'] ?? 'US');

                // Cache for 24 hours
                Cache::put($cacheKey, $currency, 86400);

                return $currency;
            }
        } catch (\Exception $e) {
            Log::error('Currency Detection Error: ' . $e->getMessage());
        }

        return 'USD'; // Default currency
    }

    protected function getCurrencyByCountry($countryCode)
    {
        $currencyMap = [
            'NG' => 'NGN',
            'US' => 'USD',
            'GB' => 'GBP',
            'KE' => 'KES',
            'GH' => 'GHS',
            'ZA' => 'ZAR',
            'TZ' => 'TZS',
            'UG' => 'UGX',
            'RW' => 'RWF',
            'FR' => 'EUR',
            'DE' => 'EUR',
            'ES' => 'EUR',
            'IT' => 'EUR',
        ];

        return $currencyMap[$countryCode] ?? 'USD';
    }

    public function convertCurrency($amount, $from, $to)
    {
        if ($from === $to) {
            return $amount;
        }

        $cacheKey = "exchange_rate_{$from}_{$to}";
        $rate = Cache::remember($cacheKey, 3600, function () use ($from, $to, $amount) {
            $rateData = $this->flutterwaveService->getExchangeRate($from, $to, $amount);
            return $rateData['rate'] ?? null;
        });

        return $rate ? $amount * $rate : $amount;
    }
}