import React from 'react';

interface CurrencySelectorProps {
    currencies: string[];
    selectedCurrency: string;
    onCurrencyChange: (currency: string) => void;
    userCurrency?: string;
}

export const CurrencySelector: React.FC<CurrencySelectorProps> = ({ currencies, selectedCurrency, onCurrencyChange, userCurrency }) => {
    return (
        <div className="inline-flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Currency:</label>
            <div className="relative">
                <select
                    value={selectedCurrency}
                    onChange={(e) => onCurrencyChange(e.target.value)}
                    className="appearance-none rounded-md border border-gray-300 bg-white px-3 py-1 pr-8 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                    {currencies.map((currency) => (
                        <option key={currency} value={currency}>
                            {currency}
                            {userCurrency === currency && ' ⭐'}
                        </option>
                    ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                </div>
            </div>
            {userCurrency && userCurrency !== selectedCurrency && (
                <button
                    onClick={() => onCurrencyChange(userCurrency)}
                    className="rounded bg-blue-100 px-2 py-1 text-xs text-blue-700 transition hover:bg-blue-200"
                >
                    Use my currency ({userCurrency})
                </button>
            )}
        </div>
    );
};
