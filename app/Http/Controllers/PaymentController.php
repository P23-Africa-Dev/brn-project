<?php

namespace App\Http\Controllers;

use App\Services\FlutterwaveService;
use App\Services\CurrencyService;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PaymentController extends Controller
{
    protected $flutterwaveService;
    protected $currencyService;

    public function __construct(
        FlutterwaveService $flutterwaveService,
        CurrencyService $currencyService
    ) {
        $this->flutterwaveService = $flutterwaveService;
        $this->currencyService = $currencyService;
    }

    public function index()
    {
        $userCurrency = $this->currencyService->getUserCurrency();

        return Inertia::render('Payment/Index', [
            'publicKey' => config('flutterwave.publicKey'),
            'userCurrency' => $userCurrency,
            'supportedCurrencies' => config('flutterwave.supported_currencies'),
        ]);
    }

    public function initializePayment(Request $request)
    {
        $validated = $request->validate([
            'amount' => 'required|numeric|min:1',
            'currency' => 'required|string|in:' . implode(',', config('flutterwave.supported_currencies')),
            'email' => 'required|email',
            'name' => 'required|string',
            'phone' => 'nullable|string',
            'description' => 'nullable|string',
        ]);

        $txRef = 'FLW-' . uniqid() . time();

        // Store transaction in database
        $transaction = Transaction::create([
            'user_id' => auth()->id(),
            'tx_ref' => $txRef,
            'amount' => $validated['amount'],
            'currency' => $validated['currency'],
            'status' => 'pending',
            'email' => $validated['email'],
            'meta' => json_encode($request->only(['description', 'phone', 'name'])),
        ]);

        $paymentData = [
            'tx_ref' => $txRef,
            'amount' => $validated['amount'],
            'currency' => $validated['currency'],
            'redirect_url' => route('payment.callback'),
            'customer' => [
                'email' => $validated['email'],
                'name' => $validated['name'],
                'phone' => $validated['phone'] ?? '',
            ],
            'meta' => [
                'transaction_id' => $transaction->id,
                'user_id' => auth()->id(),
            ],
        ];

        $response = $this->flutterwaveService->initializePayment($paymentData);

        if ($response['status'] === 'success') {
            return response()->json([
                'status' => 'success',
                'data' => [
                    'link' => $response['data']['link'],
                    'tx_ref' => $txRef,
                ]
            ]);
        }

        return response()->json([
            'status' => 'error',
            'message' => $response['message']
        ], 400);
    }

    public function handleCallback(Request $request)
    {
        $status = $request->query('status');
        $txRef = $request->query('tx_ref');
        $transactionId = $request->query('transaction_id');

        if ($status === 'cancelled') {
            return Inertia::render('Payment/Failed', [
                'message' => 'Payment was cancelled'
            ]);
        }

        $verification = $this->flutterwaveService->verifyTransaction($transactionId);

        if (
            $verification['status'] === 'success' &&
            $verification['data']['status'] === 'successful'
        ) {

            // Update transaction in database
            Transaction::where('tx_ref', $txRef)->update([
                'status' => 'successful',
                'flw_transaction_id' => $transactionId,
                'verified_at' => now(),
            ]);

            return Inertia::render('Payment/Success', [
                'transaction' => $verification['data']
            ]);
        }

        return Inertia::render('Payment/Failed', [
            'message' => 'Payment verification failed'
        ]);
    }

    public function getCurrencyData(Request $request)
    {
        $amount = $request->query('amount', 100);
        $fromCurrency = $request->query('from', 'USD');
        $toCurrency = $request->query('to');

        if (!$toCurrency) {
            $toCurrency = $this->currencyService->getUserCurrency();
        }

        $convertedAmount = $this->currencyService->convertCurrency(
            $amount,
            $fromCurrency,
            $toCurrency
        );

        return response()->json([
            'original_amount' => $amount,
            'original_currency' => $fromCurrency,
            'converted_amount' => round($convertedAmount, 2),
            'converted_currency' => $toCurrency,
            'user_currency' => $this->currencyService->getUserCurrency(),
        ]);
    }
}