import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { CurrencyConversion } from '../types/payment';

export const useCurrency = (defaultCurrency = 'USD') => {
    const [userCurrency, setUserCurrency] = useState<string>(defaultCurrency);
    const [loading, setLoading] = useState(false);
    const [conversionData, setConversionData] = useState<CurrencyConversion | null>(null);

    useEffect(() => {
        fetchUserCurrency();
    }, []);

    const fetchUserCurrency = async () => {
        try {
            const response = await axios.get<CurrencyConversion>('/api/currency/data');
            setUserCurrency(response.data.user_currency);
        } catch (error) {
            console.error('Failed to fetch user currency:', error);
        }
    };

    const convertCurrency = useCallback(
        async (amount: number, from: string, to?: string) => {
            setLoading(true);
            try {
                const response = await axios.get<CurrencyConversion>('/api/currency/data', {
                    params: { amount, from, to: to || userCurrency },
                });
                setConversionData(response.data);
                return response.data;
            } catch (error) {
                console.error('Currency conversion failed:', error);
                return null;
            } finally {
                setLoading(false);
            }
        },
        [userCurrency],
    );

    return {
        userCurrency,
        setUserCurrency,
        convertCurrency,
        conversionData,
        loading,
    };
};
