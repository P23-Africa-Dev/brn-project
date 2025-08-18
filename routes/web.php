<?php

use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\PaymentController;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/sign-up', function () {
    return Inertia::render('reg');
})->name('sign-up');



// Route::get('/registration/continue', [RegisteredUserController::class, 'continue'])->name('registration.continue');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::get('/payment/test', function (Request $request) {
    return Inertia::render('Payment/Test');
})->name('payment.test');

Route::post('/payment/initialize', [PaymentController::class, 'initialize'])
    ->name('payment.initialize');

// Route::view('/test-payment', 'payment')->name('payment.test');
// Route::get('/pay', [PaymentController::class, 'initialize'])->name('payment.initialize');
// Route::get('/payment/callback', [PaymentController::class, 'callback'])->name('payment.callback');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
