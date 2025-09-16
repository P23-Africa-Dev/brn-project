<?php

use App\Models\User;

test('login screen can be rendered', function () {
    $response = $this->get('/login');
    $response->assertOk();
});

test('users can authenticate using the login screen', function () {
    $user = User::factory()->create();
    $response = $this->post('/login', [
        'email' => $user->email,
        'password' => 'password',
    ]);
    $response->assertRedirect(route('dashboard', absolute: false));
    $this->assertAuthenticatedAs($user);
});

test('users cannot authenticate with invalid password', function () {
    $user = User::factory()->create();
    $response = $this->post('/login', [
        'email' => $user->email,
        'password' => 'wrong-password',
    ]);
    $this->assertGuest();
});

test('users can logout', function () {
    $user = User::factory()->create();
    $response = $this->actingAs($user)->post('/logout');
    $response->assertRedirect('/');
    $this->assertGuest();
});
