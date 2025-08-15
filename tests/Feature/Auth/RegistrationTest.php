<?php

test('registration screen can be rendered', function () {
    $response = $this->get('/registration/continue');

    $response->assertStatus(200);
});

test('new users can register', function () {
    $response = $this->post('/registration/continue', [
        'name' => 'Test User',
        'email' => 'test@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
        'profile_picture' => null,
        'company_name' => 'Test Company',
        'company_description' => 'A test company',
        'industry' => 'Technology',
        'categories' => ['Development', 'Design'],
        'great_at' => ['Coding', 'Designing'],
        'can_help_with' => ['Consulting', 'Training'],
    ])->assertSessionHasNoErrors();
        

    $this->assertAuthenticated();
    $response->assertRedirect(route('dashboard', absolute: false));
});