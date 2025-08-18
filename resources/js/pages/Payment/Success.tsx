import { Head, Link } from '@inertiajs/react';

interface SuccessPageProps {
    transaction: {
        transaction_id: string;
        tx_ref: string;
        amount: number;
        currency: string;
        status: string;
        payment_type: string;
        customer: {
            email: string;
            name: string;
        };
    };
}

export default function PaymentSuccess({ transaction }: SuccessPageProps) {
    return (
        <>
            <Head title="Payment Successful" />

            <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
                <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
                    <div className="text-center">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                            <svg
                                className="h-10 w-10 text-green-600"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path d="M5 13l4 4L19 7"></path>
                            </svg>
                        </div>

                        <h2 className="mb-4 text-2xl font-bold text-gray-900">Payment Successful!</h2>

                        <p className="mb-6 text-gray-600">Your payment has been processed successfully.</p>

                        <div className="mb-6 rounded-lg bg-gray-50 p-4 text-left">
                            <h3 className="mb-2 font-semibold text-gray-700">Transaction Details</h3>
                            <dl className="space-y-1 text-sm">
                                <div className="flex justify-between">
                                    <dt className="text-gray-500">Reference:</dt>
                                    <dd className="font-medium text-gray-900">{transaction.tx_ref}</dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt className="text-gray-500">Amount:</dt>
                                    <dd className="font-medium text-gray-900">
                                        {transaction.currency} {transaction.amount.toFixed(2)}
                                    </dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt className="text-gray-500">Email:</dt>
                                    <dd className="font-medium text-gray-900">{transaction.customer.email}</dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt className="text-gray-500">Payment Method:</dt>
                                    <dd className="font-medium text-gray-900 capitalize">{transaction.payment_type}</dd>
                                </div>
                            </dl>
                        </div>

                        <div className="space-y-3">
                            <Link
                                href="/dashboard"
                                className="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                            >
                                Go to Dashboard
                            </Link>

                            <Link
                                href="/payment"
                                className="inline-flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                            >
                                Make Another Payment
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
