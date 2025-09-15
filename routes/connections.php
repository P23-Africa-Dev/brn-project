<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ConnectionController;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::post('/connections/send', [ConnectionController::class, 'sendRequest']);
    Route::post('/connections/accept', [ConnectionController::class, 'acceptRequest']);
    Route::post('/connections/reject', [ConnectionController::class, 'rejectRequest']);
    Route::get('/connections/list', [ConnectionController::class, 'listConnections']);
});
