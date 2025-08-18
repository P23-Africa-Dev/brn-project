<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class FlutterwaveService
{
    protected $secretKey;
    protected $publicKey;
    protected $baseUrl;

    public function __construct()
    {
        $this->secretKey = config('flutterwave.secretKey');
        $this->publicKey = config('flutterwave.publicKey');
        $this->baseUrl = config('flutterwave.baseUrl');
    }

    public function initializePayment(array $data)
    {
        try {
            $payload = [
                'tx_ref' => $data['tx_ref'] ?? 'FLW-' . uniqid() . time(),
                'amount' => $data['amount'],
                'currency' => $data['currency'],
                'redirect_url' => $data['redirect_url'] ?? route('payment.callback'),
                'payment_options' => $data['payment_options'] ?? 'card,banktransfer,ussd',
                'customer' => [
                    'email' => $data['customer']['email'],
                    'phone_number' => $data['customer']['phone'] ?? '',
                    'name' => $data['customer']['name']
                ],
                'customizations' => [
                    'title' => $data['title'] ?? config('app.name'),
                    'description' => $data['description'] ?? 'Payment for services',
                    'logo' => $data['logo'] ?? ''
                ],
                'meta' => $data['meta'] ?? []
            ];

            $response = Http::withToken($this->secretKey)
                ->post("{$this->baseUrl}/payments", $payload);

            if ($response->successful()) {
                return [
                    'status' => 'success',
                    'data' => $response->json()['data']
                ];
            }

            return [
                'status' => 'error',
                'message' => $response->json()['message'] ?? 'Payment initialization failed'
            ];
        } catch (\Exception $e) {
            Log::error('Flutterwave Payment Error: ' . $e->getMessage());
            return [
                'status' => 'error',
                'message' => 'Payment initialization failed'
            ];
        }
    }

    public function verifyTransaction($transactionId)
    {
        try {
            $response = Http::withToken($this->secretKey)
                ->get("{$this->baseUrl}/transactions/{$transactionId}/verify");

            if ($response->successful()) {
                $data = $response->json()['data'];

                return [
                    'status' => 'success',
                    'data' => [
                        'transaction_id' => $data['id'],
                        'tx_ref' => $data['tx_ref'],
                        'amount' => $data['amount'],
                        'currency' => $data['currency'],
                        'charged_amount' => $data['charged_amount'],
                        'status' => $data['status'],
                        'payment_type' => $data['payment_type'],
                        'customer' => $data['customer']
                    ]
                ];
            }

            return [
                'status' => 'error',
                'message' => 'Transaction verification failed'
            ];
        } catch (\Exception $e) {
            Log::error('Flutterwave Verification Error: ' . $e->getMessage());
            return [
                'status' => 'error',
                'message' => 'Transaction verification failed'
            ];
        }
    }

    public function getExchangeRate($from, $to, $amount)
    {
        try {
            $response = Http::withToken($this->secretKey)
                ->get("{$this->baseUrl}/rates", [
                    'from' => $from,
                    'to' => $to,
                    'amount' => $amount
                ]);

            if ($response->successful()) {
                return $response->json()['data'];
            }

            return null;
        } catch (\Exception $e) {
            Log::error('Exchange Rate Error: ' . $e->getMessage());
            return null;
        }
    }
}