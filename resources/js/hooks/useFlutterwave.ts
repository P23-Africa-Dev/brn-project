import { PaymentData, TransactionResponse } from '@/types/payment';
import axios from 'axios';
import { useCallback, useState } from 'react';

export const useFlutterwave = (publicKey: string) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const initializePayment = useCallback(async (paymentData: PaymentData) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post<TransactionResponse>('/api/payment/initialize', paymentData);

            if (response.data.status === 'success' && response.data.data?.link) {
                // Redirect to Flutterwave payment page
                window.location.href = response.data.data.link;
            } else {
                throw new Error(response.data.message || 'Payment initialization failed');
            }
        } catch (err: any) {
            setError(err.response?.data?.message || err.message || 'Payment failed');
            setLoading(false);
            throw err;
        }
    }, []);

    const initializeInlinePayment = useCallback(
        (paymentData: PaymentData, onSuccess: Function, onClose?: Function) => {
            // @ts-ignore - FlutterwaveCheckout is loaded from script
            if (typeof window.FlutterwaveCheckout === 'undefined') {
                setError('Flutterwave SDK not loaded');
                return;
            }

            const modal = window.FlutterwaveCheckout({
                public_key: publicKey,
                tx_ref: 'FLW-' + Date.now() + Math.floor(Math.random() * 1000),
                amount: paymentData.amount,
                currency: paymentData.currency,
                customer: {
                    email: paymentData.email,
                    phone_number: paymentData.phone || '',
                    name: paymentData.name,
                },
                customizations: {
                    title: 'Payment',
                    description: paymentData.description || 'Payment for services',
                },
                callback: (response: any) => {
                    modal.close();
                    onSuccess(response);
                },
                onclose: () => {
                    if (onClose) onClose();
                },
            });
        },
        [publicKey],
    );

    return {
        initializePayment,
        initializeInlinePayment,
        loading,
        error,
    };
};
