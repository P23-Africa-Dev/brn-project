<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Show the registration page.
     */
    public function create(): Response
    {
        return Inertia::render('auth/register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'profile_picture' => 'nullable|image|max:2048',
            'company_name' => 'nullable|string|max:255',
            'company_description' => 'nullable|string',
            'industry' => 'nullable|string',
            'categories' => 'nullable|array',
            'great_at' => 'nullable|array|max:3',
            'can_help_with' => 'nullable|array|max:3',
        ]);

        $profilePicPath = $request->hasFile('profile_picture')
            ? $request->file('profile_picture')->store('profile_pictures', 'public')
            : null;

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'profile_picture' => $profilePicPath,
            'company_name' => $request->company_name,
            'company_description' => $request->company_description,
            'industry' => $request->industry,
            'categories' => $request->categories,
            'great_at' => $request->great_at,
            'can_help_with' => $request->can_help_with,
        ]);

        event(new Registered($user));

        Auth::login($user);

        return redirect()->intended(route('dashboard', absolute: false));
    }

    public function continue(Request $request)
    {
        try {
            $encrypted = $request->query('data');
            $decrypted = Crypt::decryptString($encrypted);
            $userData = json_decode($decrypted, true);

            return Inertia::render('auth/register', [
                'prefill' => [
                    'name' => $userData['name'] ?? '',
                    'email' => $userData['email'] ?? '',
                    'company_name' => $userData['company_name'] ?? '',
                ]
            ]);
        } catch (\Exception $e) {
            abort(403, 'Invalid or expired link.');
            // return redirect()->route('dashboard')->withErrors('Invalid or expired link.');
        }
    }
}
