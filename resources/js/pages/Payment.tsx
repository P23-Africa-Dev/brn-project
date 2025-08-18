import { useForm } from '@inertiajs/react';
import React from 'react';

export default function PaymentPage() {
    const { data, setData, post, processing, errors } = useForm({
        amount: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('payment.initialize'));
    };

    return (
        <div className="mx-auto max-w-md p-6">
            <h2 className="mb-4 text-xl font-bold">Make a Payment</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="mb-1 block">Amount</label>
                    <input
                        type="number"
                        value={data.amount}
                        onChange={(e) => setData('amount', e.target.value)}
                        className="w-full rounded border p-2"
                    />
                    {errors.amount && <p className="text-red-500">{errors.amount}</p>}
                </div>
                <button type="submit" disabled={processing} className="rounded bg-blue-600 px-4 py-2 text-white">
                    {processing ? 'Processing...' : 'Pay Now'}
                </button>
            </form>
        </div>
    );
}
