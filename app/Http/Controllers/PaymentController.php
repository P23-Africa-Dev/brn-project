<?php

namespace App\Http\Controllers;

use Flutterwave\Flutterwave;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
// use Flutterwave\Service\Rave;
// use Flutterwave\Service\Transactions;
// use App\Services\FlutterwaveService;


class PaymentController extends Controller
{
    public function initialize(Request $request)
    {
        // $reference = Flutterwave::generateReference();
        $reference = 'FLW-' . uniqid() . '-' . time();
        $amount = $request->amount ?? 1000;

        // Get user’s currency (priority: request > user profile > env default)
        $currency = $request->currency
            ?? (Auth::check() ? Auth::user()->currency : null)
            ?? config('services.flutterwave.currency', 'NGN');

        $payload = [
            'tx_ref' => $reference,
            'amount' => $amount,
            'currency' => strtoupper($currency),
            'redirect_url' => config('services.flutterwave.redirect_url'),
            'customer' => [
                'email' => $request->email ?? (Auth::check() ? Auth::user()->email : null),
                'name'  => $request->name ?? (Auth::check() ? Auth::user()->name : null),
            ],
            'customizations' => [
                'title' => 'My BRN App Payment',
                'description' => 'Payment for software premium usage',
            ],
        ];

        try {
            // $payment = Flutterwave::initializePayment($payload);
            $rave = new Rave(config('services.flutterwave.secret_key'), env('APP_ENV', 'development'));

            $payment = $rave->payment->initialize($payload);

            if ($payment['status'] === 'success') {
                return redirect($payment['data']['link']);
            }

            return back()->with('error', 'Unable to initiate payment.');
        } catch (\Exception $e) {
            Log::error("Flutterwave init error: " . $e->getMessage());
            return back()->with('error', 'Something went wrong.');
        }
    }

    public function callback(Request $request)
    {
        $status = $request->status;
        $transactionId = $request->transaction_id;

        if ($status === 'successful') {
            $transactions = new Transactions();
            $response = $transactions->verify($transactionId);

            if ($response['status'] === 'success') {
                // Save to DB if needed
                return redirect('/')->with('success', 'Payment successful!');
            }
        }

        return redirect('/')->with('error', 'Payment failed or cancelled.');
    }
}
