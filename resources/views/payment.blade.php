@extends('app')

@section('title', 'Test Payment')

@section('content')
<div class="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl">
    <h2 class="text-2xl font-bold mb-4 text-center">Test Payment with Flutterwave</h2>

    @if(session('error'))
        <div class="bg-red-100 text-red-700 p-3 mb-4 rounded-lg">
            {{ session('error') }}
        </div>
    @endif

    @if(session('success'))
        <div class="bg-green-100 text-green-700 p-3 mb-4 rounded-lg">
            {{ session('success') }}
        </div>
    @endif

    <form action="{{ route('payment.initialize') }}" method="get" class="space-y-4">
        @csrf

        <div>
            <label class="block mb-1 font-semibold">Full Name</label>
            <input type="text" name="name" value="{{ old('name') }}" required 
                   class="w-full border p-2 rounded-lg">
        </div>

        <div>
            <label class="block mb-1 font-semibold">Email</label>
            <input type="email" name="email" value="{{ old('email') }}" required 
                   class="w-full border p-2 rounded-lg">
        </div>

        <div>
            <label class="block mb-1 font-semibold">Amount</label>
            <input type="number" name="amount" value="1000" required 
                   class="w-full border p-2 rounded-lg">
        </div>

        <div>
            <label class="block mb-1 font-semibold">Currency</label>
            <select name="currency" class="w-full border p-2 rounded-lg">
                <option value="NGN">Nigerian Naira (NGN)</option>
                <option value="USD">US Dollar (USD)</option>
                <option value="GHS">Ghanaian Cedi (GHS)</option>
                <option value="KES">Kenyan Shilling (KES)</option>
                <option value="ZAR">South African Rand (ZAR)</option>
            </select>
        </div>

        <button type="submit" 
                class="w-full bg-indigo-600 text-white p-3 rounded-lg font-semibold hover:bg-indigo-700">
            Pay Now
        </button>
    </form>
</div>
@endsection
