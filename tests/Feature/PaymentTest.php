<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Http;

uses(RefreshDatabase::class);

it('initializes payment in user native currency', function () {
    // Fake HTTP call to Flutterwave
    Http::fake([
        'https://api.flutterwave.com/v3/payments' => Http::response([
            'status' => 'success',
            'data' => [
                'link' => 'https://checkout.flutterwave.com/fake-checkout-link',
            ],
        ], 200),
    ]);

    $user = User::factory()->create([
        'currency' => 'NGN', // user native currency
    ]);

    $response = $this->actingAs($user)
        ->postJson('/payments/initialize', [
            'amount' => 5000,
        ]);

    $response->assertStatus(200)
        ->assertJsonStructure([
            'payment_link',
        ])
        ->assertJson([
            'payment_link' => 'https://checkout.flutterwave.com/fake-checkout-link',
        ]);
});

it('handles successful payment callback', function () {
    $user = User::factory()->create([
        'currency' => 'USD',
    ]);

    $this->actingAs($user)
        ->get('/payments/callback?status=successful&transaction_id=TX12345')
        ->assertStatus(200)
        ->assertSee('Payment successful');
});

it('handles failed payment callback', function () {
    $user = User::factory()->create([
        'currency' => 'KES',
    ]);

    $this->actingAs($user)
        ->get('/payments/callback?status=failed&transaction_id=TX9999')
        ->assertStatus(200)
        ->assertSee('Payment failed');
});
