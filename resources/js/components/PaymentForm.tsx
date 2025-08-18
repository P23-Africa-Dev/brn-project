import { useForm } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import { useCurrency } from '../hooks/useCurrency';
import { useFlutterwave } from '../hooks/useFlutterwave';
import { PaymentData } from '../types/payment';

interface PaymentFormProps {
    publicKey: string;
    supportedCurrencies: string[];
    initialCurrency?: string;
    onSuccess?: (response: any) => void;
}

const CURRENCY_SYMBOLS: Record<string, string> = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    NGN: '₦',
    KES: 'KSh',
    GHS: 'GH₵',
    ZAR: 'R',
    TZS: 'TSh',
    UGX: 'USh',
    RWF: 'FRw',
};

export const PaymentForm: React.FC<PaymentFormProps> = ({ publicKey, supportedCurrencies, initialCurrency = 'USD', onSuccess }) => {
    const { data, setData, processing, errors, reset } = useForm<PaymentData>({
        amount: 0,
        currency: initialCurrency,
        email: '',
        name: '',
        phone: '',
        description: '',
    });

    const { initializePayment, initializeInlinePayment, loading, error } = useFlutterwave(publicKey);
    const { userCurrency, convertCurrency, conversionData } = useCurrency(initialCurrency);
    const [useInlinePayment, setUseInlinePayment] = useState(true);
    const [convertedAmount, setConvertedAmount] = useState<number | null>(null);

    useEffect(() => {
        // Auto-detect and set user's currency
        if (userCurrency && supportedCurrencies.includes(userCurrency)) {
            setData('currency', userCurrency);
        }
    }, [userCurrency]);

    useEffect(() => {
        // Convert amount when currency changes
        if (data.amount > 0 && data.currency !== initialCurrency) {
            convertCurrency(data.amount, initialCurrency, data.currency).then((result) => {
                if (result) {
                    setConvertedAmount(result.converted_amount);
                }
            });
        } else {
            setConvertedAmount(null);
        }
    }, [data.amount, data.currency]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const paymentData = {
            ...data,
            amount: convertedAmount || data.amount,
        };

        try {
            if (useInlinePayment) {
                initializeInlinePayment(
                    paymentData,
                    (response: any) => {
                        console.log('Payment successful:', response);
                        if (onSuccess) onSuccess(response);
                        reset();
                    },
                    () => {
                        console.log('Payment modal closed');
                    },
                );
            } else {
                await initializePayment(paymentData);
            }
        } catch (err) {
            console.error('Payment error:', err);
        }
    };

    const getCurrencySymbol = (currency: string) => CURRENCY_SYMBOLS[currency] || currency;

    return (
        <div className="mx-auto max-w-md rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-6 text-2xl font-bold text-gray-800">Make Payment</h2>

            {error && <div className="mb-4 rounded border border-red-400 bg-red-100 p-3 text-red-700">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">Amount</label>
                    <div className="relative">
                        <span className="absolute top-1/2 left-3 -translate-y-1/2 transform text-gray-500">{getCurrencySymbol(data.currency)}</span>
                        <input
                            type="number"
                            value={data.amount}
                            onChange={(e) => setData('amount', parseFloat(e.target.value))}
                            className="w-full rounded-md border border-gray-300 py-2 pr-3 pl-8 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="0.00"
                            step="0.01"
                            min="1"
                            required
                        />
                    </div>
                    {errors.amount && <p className="mt-1 text-sm text-red-600">{errors.amount}</p>}
                    {convertedAmount && data.currency !== initialCurrency && (
                        <p className="mt-1 text-sm text-gray-600">
                            ≈ {getCurrencySymbol(initialCurrency)}
                            {data.amount} {initialCurrency}
                        </p>
                    )}
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">Currency</label>
                    <select
                        value={data.currency}
                        onChange={(e) => setData('currency', e.target.value)}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        required
                    >
                        {supportedCurrencies.map((currency) => (
                            <option key={currency} value={currency}>
                                {currency} {userCurrency === currency && '(Your Currency)'}
                            </option>
                        ))}
                    </select>
                    {errors.currency && <p className="mt-1 text-sm text-red-600">{errors.currency}</p>}
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="john@example.com"
                        required
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">Full Name</label>
                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="John Doe"
                        required
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">Phone Number (Optional)</label>
                    <input
                        type="tel"
                        value={data.phone}
                        onChange={(e) => setData('phone', e.target.value)}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="+234 801 234 5678"
                    />
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">Description (Optional)</label>
                    <textarea
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        rows={3}
                        placeholder="Payment description..."
                    />
                </div>

                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="inline-payment"
                        checked={useInlinePayment}
                        onChange={(e) => setUseInlinePayment(e.target.checked)}
                        className="mr-2"
                    />
                    <label htmlFor="inline-payment" className="text-sm text-gray-700">
                        Use inline payment (stay on site)
                    </label>
                </div>

                <button
                    type="submit"
                    disabled={processing || loading}
                    className="w-full rounded-md bg-blue-600 px-4 py-2 text-white transition duration-200 hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
                >
                    {processing || loading ? 'Processing...' : `Pay ${getCurrencySymbol(data.currency)}${convertedAmount || data.amount || '0'}`}
                </button>
            </form>
        </div>
    );
};
