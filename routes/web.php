<?php

use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\MessageController;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Route::get('/checkout', function () {
//     return Inertia::render('Checkout');
// })->name('checkout');

Route::get('/sign-up', function () {
    return Inertia::render('reg');
})->name('sign-up');



// Route::get('/registration/continue', [RegisteredUserController::class, 'continue'])->name('registration.continue');
// Route::get('/payment', [PaymentController::class, 'paymentPage'])->name('payment.page');


Route::middleware(['auth', 'verified'])->group(function () {
    // Route::get('dashboard', function () {
    //     return Inertia::render('dashboard');
    // })->name('dashboard');
    Route::get('/connected-users', [\App\Http\Controllers\DashboardController::class, 'connectedUsers'])->name('connected.users');
    Route::post('/connections/send', [\App\Http\Controllers\ConnectionController::class, 'sendRequest']);
    Route::post('/connections/accept', [\App\Http\Controllers\ConnectionController::class, 'acceptRequest']);
    Route::post('/connections/reject', [\App\Http\Controllers\ConnectionController::class, 'rejectRequest']);
    Route::get('/connections/list', [\App\Http\Controllers\ConnectionController::class, 'listConnections']);

    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    // Route::get('/dashboard', [DashboardController::class, 'weeklyActivity']);
    Route::get('/api/user/{userId?}', [DashboardController::class, 'weeklyActivity']);
    Route::get('/api/user-activity-change', [DashboardController::class, 'getActivityChange']);

    // Route::get('/chats', function () {
    //     return Inertia::render('chats/index');  // Note the lowercase path
    // })->name('chats.index');
    Route::get('/messages', [ChatController::class, 'index'])->name('chats.index');
    Route::get('/messages/{encryptedId}', [ChatController::class, 'show'])->name('chats.show');
    Route::post('/messages/{encryptedId}/messages', [MessageController::class, 'store'])->name('chats.messages.store');

    // Route::get('/payment', [PaymentController::class, 'index'])->name('payment.index');
    // Route::post('/api/payment/initialize', [PaymentController::class, 'initializePayment'])->name('payment.initialize');
    // Route::get('/payment/callback', [PaymentController::class, 'handleCallback'])->name('payment.callback');
    // Route::get('/api/currency/data', [PaymentController::class, 'getCurrencyData'])->name('currency.data');

    // Route::post('/payment/initialize', [PaymentController::class, 'initialize'])->name('payment.initialize');
    // Route::get('/payment/callback', [PaymentController::class, 'callback'])->name('payment.callback');
});

// Route::get('/payment/test', function (Request $request) {
//     return Inertia::render('Payment/Test');
// })->name('payment.test');

// Route::post('/payment/initialize', [PaymentController::class, 'initialize'])
//     ->name('payment.initialize');

// Route::view('/test-payment', 'payment')->name('payment.test');
// Route::get('/pay', [PaymentController::class, 'initialize'])->name('payment.initialize');
// Route::get('/payment/callback', [PaymentController::class, 'callback'])->name('payment.callback');


// Route::get('/payments/preflight', [PaymentController::class, 'preflight']);
// Route::post('/webhooks/flutterwave', [PaymentController::class, 'webhook'])->name('payments.webhook');

// routes/web.php (for optional redirect callback)
// Route::get('/payments/callback', [PaymentController::class, 'callback'])->name('payments.callback');



require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';

// require __DIR__ . '/connections.php';
