import { Head } from '@inertiajs/react';
import React, { useEffect } from 'react';
import { CurrencySelector } from '../../components/CurrencySelector';
import { PaymentForm } from '../../components/PaymentForm';

interface PaymentPageProps {
    publicKey: string;
    userCurrency: string;
    supportedCurrencies: string[];
}

export default function PaymentIndex({ publicKey, userCurrency: initialUserCurrency, supportedCurrencies }: PaymentPageProps) {
    const [selectedCurrency, setSelectedCurrency] = React.useState(initialUserCurrency);

    // Load Flutterwave SDK
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://checkout.flutterwave.com/v3.js';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const handlePaymentSuccess = (response: any) => {
        console.log('Payment successful:', response);
        // Handle successful payment (e.g., redirect to success page)
        window.location.href = `/payment/success?tx_ref=${response.tx_ref}`;
    };

    return (
        <>
            <Head title="Make Payment" />

            <div className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold text-gray-900">Secure Payment</h1>
                        <p className="mt-2 text-gray-600">Pay securely with Flutterwave in your preferred currency</p>
                    </div>

                    <div className="mb-6 flex justify-center">
                        <CurrencySelector
                            currencies={supportedCurrencies}
                            selectedCurrency={selectedCurrency}
                            onCurrencyChange={setSelectedCurrency}
                            userCurrency={initialUserCurrency}
                        />
                    </div>

                    <PaymentForm
                        publicKey={publicKey}
                        supportedCurrencies={supportedCurrencies}
                        initialCurrency={selectedCurrency}
                        onSuccess={handlePaymentSuccess}
                    />

                    <div className="mt-8 text-center">
                        <p className="text-sm text-gray-500">Secured by Flutterwave • SSL Encrypted • PCI DSS Compliant</p>
                    </div>
                </div>
            </div>
        </>
    );
}
