import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Test() {
  const { data, setData, post, processing, errors } = useForm({
    name: "",
    email: "",
    amount: "",
    currency: "NGN",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    post(route("payment.initialize"), {
      onFinish: () => setLoading(false),
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <Card className="w-full max-w-md shadow-lg rounded-2xl">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-4 text-center">
            Test Flutterwave Payment
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Full Name</label>
              <input
                type="text"
                value={data.name}
                onChange={(e) => setData("name", e.target.value)}
                className="mt-1 w-full border rounded-lg p-2"
                required
              />
              {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                value={data.email}
                onChange={(e) => setData("email", e.target.value)}
                className="mt-1 w-full border rounded-lg p-2"
                required
              />
              {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium">Amount</label>
              <input
                type="number"
                value={data.amount}
                onChange={(e) => setData("amount", e.target.value)}
                className="mt-1 w-full border rounded-lg p-2"
                required
              />
              {errors.amount && <p className="text-red-500 text-xs">{errors.amount}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium">Currency</label>
              <select
                value={data.currency}
                onChange={(e) => setData("currency", e.target.value)}
                className="mt-1 w-full border rounded-lg p-2"
              >
                <option value="NGN">Nigerian Naira (NGN)</option>
                <option value="USD">US Dollar (USD)</option>
                <option value="GHS">Ghanaian Cedi (GHS)</option>
                <option value="KES">Kenyan Shilling (KES)</option>
              </select>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={processing || loading}
            >
              {loading ? "Redirecting..." : "Pay Now"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
