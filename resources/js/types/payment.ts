export interface Currency {
  code: string;
  symbol: string;
  name: string;
}

export interface PaymentData {
  amount: number;
  currency: string;
  email: string;
  name: string;
  phone?: string;
  description?: string;
}

export interface TransactionResponse {
  status: string;
  data?: {
    link?: string;
    tx_ref?: string;
    transaction_id?: string;
    amount?: number;
    currency?: string;
    status?: string;
  };
  message?: string;
}

export interface CurrencyConversion {
  original_amount: number;
  original_currency: string;
  converted_amount: number;
  converted_currency: string;
  user_currency: string;
}