"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";

function calculateSalesTax({
  amount,
  taxRate,
}: {
  amount: number;
  taxRate: number;
}) {
  const tax = amount * (taxRate / 100);
  const total = amount + tax;
  return { tax, total };
}

export default function SalesTaxCalculator() {
  const [amount, setAmount] = useState<string>("");
  const [taxRate, setTaxRate] = useState<string>("");
  const [result, setResult] = useState<{ tax: number; total: number } | null>(
    null
  );

  const handleCalculate = () => {
    const amt = parseFloat(amount);
    const rate = parseFloat(taxRate);
    if (!isNaN(amt) && !isNaN(rate) && amt >= 0 && rate >= 0) {
      setResult(calculateSalesTax({ amount: amt, taxRate: rate }));
    } else {
      setResult(null);
    }
  };

  return (
    <div className="mt-8 md:mt-12 mx-auto h-full w-10/12 md:w-11/12">
      <h1>Sales Tax Calculator</h1>
      <p className="mb-4">
        Calculate the sales tax and total price for your products or services
        based on your local tax rate.
      </p>
      <div className="mb-4">
        <p>
          <strong>How does it work?</strong>
          <br />
          Enter the price of your product or service and the applicable sales
          tax rate. The calculator will show the sales tax amount and the total
          price including tax.
        </p>
        <p className="mt-2">
          <strong>Formula:</strong>
          <br />
          <code>Total Price = Amount + (Amount × Sales Tax Rate)</code>
        </p>
      </div>
      <div className="gap-4 grid md:grid-cols-2">
        <div className="mb-2">
          <label className="block mb-1 font-medium">Amount ($):</label>
          <input
            type="number"
            className="px-2 py-1 border rounded w-full"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            min="0"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1 font-medium">Sales Tax Rate (%):</label>
          <input
            type="number"
            className="px-2 py-1 border rounded w-full"
            value={taxRate}
            onChange={(e) => setTaxRate(e.target.value)}
            placeholder="e.g. 8.25"
            min="0"
            step="0.01"
          />
        </div>
      </div>
      <Button className="mt-2 px-4 py-2 rounded" onClick={handleCalculate}>
        Calculate Sales Tax
      </Button>
      {result && (
        <div className="flex flex-col gap-4 mt-6">
          <div className="shadow p-4 border rounded-lg">
            <div>
              <strong>Sales Tax:</strong>{" "}
              <span className="">${result.tax.toFixed(2)}</span>
            </div>
            <div>
              <strong>Total Price (with tax):</strong>{" "}
              <span className="text-lg">${result.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
