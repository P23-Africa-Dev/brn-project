import { Head, Link } from '@inertiajs/react';

interface FailedPageProps {
    message: string;
}

export default function PaymentFailed({ message }: FailedPageProps) {
    return (
        <>
            <Head title="Payment Failed" />

            <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
                <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
                    <div className="text-center">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                            <svg
                                className="h-10 w-10 text-red-600"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </div>

                        <h2 className="mb-4 text-2xl font-bold text-gray-900">Payment Failed</h2>

                        <p className="mb-6 text-gray-600">{message || 'Your payment could not be processed. Please try again.'}</p>

                        <div className="space-y-3">
                            <Link
                                href="/payment"
                                className="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                            >
                                Try Again
                            </Link>

                            <Link
                                href="/dashboard"
                                className="inline-flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                            >
                                Back to Dashboard
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
