<?php
return [
    'publicKey' => env('FLW_PUBLIC_KEY'),
    'secretKey' => env('FLW_SECRET_KEY'),
    'secretHash' => env('FLW_SECRET_HASH'),
    'encryptionKey' => env('FLW_ENCRYPTION_KEY'),
    'env' => env('FLW_ENV', 'staging'),
    'baseUrl' => env('FLW_ENV') === 'live'
        ? 'https://api.flutterwave.com/v3'
        : 'https://api.flutterwave.com/v3',
    'supported_currencies' => [
        'NGN',
        'USD',
        'EUR',
        'GBP',
        'KES',
        'GHS',
        'ZAR',
        'TZS',
        'UGX',
        'RWF'
    ],
];