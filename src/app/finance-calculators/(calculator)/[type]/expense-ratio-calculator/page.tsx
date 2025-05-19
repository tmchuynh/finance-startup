"use client";
import { useState } from "react";

export default function ExpenseRatioCalculator() {
  const [totalExpenses, setTotalExpenses] = useState<string>("");
  const [totalRevenue, setTotalRevenue] = useState<string>("");
  const [result, setResult] = useState<number | null>(null);

  const handleCalculate = () => {
    const expenses = parseFloat(totalExpenses);
    const revenue = parseFloat(totalRevenue);
    if (!isNaN(expenses) && !isNaN(revenue) && revenue > 0) {
      setResult((expenses / revenue) * 100);
    } else {
      setResult(null);
    }
  };

  return (
    <div className="mx-auto mt-8 md:mt-12 w-10/12 md:w-11/12 h-full">
      <h1>Expense Ratio Calculator</h1>
      <p className="mb-4">
        Calculate your business's expense ratio to assess operational efficiency
        and cost management.
      </p>
      <div className="mb-4">
        <p>
          <strong>What is Expense Ratio?</strong>
          <br />
          The expense ratio shows what percentage of your revenue is spent on
          operating expenses. A lower ratio indicates better cost control and
          higher efficiency.
        </p>
        <p className="mt-2">
          <strong>Formula:</strong>
          <br />
          <code>Expense Ratio = (Total Expenses / Total Revenue) × 100</code>
        </p>
        <p className="mt-2">
          <strong>Why it matters:</strong>
          <br />
          Monitoring your expense ratio helps you identify areas for improvement
          and make informed decisions to boost profitability.
        </p>
      </div>
      <div className="gap-4 grid md:grid-cols-2">
        <div className="mb-2">
          <label className="block mb-1 font-medium">Total Expenses ($):</label>
          <input
            type="number"
            className="px-2 py-1 border rounded w-full"
            value={totalExpenses}
            onChange={(e) => setTotalExpenses(e.target.value)}
            placeholder="Enter total expenses"
            min="0"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1 font-medium">Total Revenue ($):</label>
          <input
            type="number"
            className="px-2 py-1 border rounded w-full"
            value={totalRevenue}
            onChange={(e) => setTotalRevenue(e.target.value)}
            placeholder="Enter total revenue"
            min="0"
          />
        </div>
      </div>
      <button
        className="bg-blue-600 mt-2 px-4 py-2 rounded text-white"
        onClick={handleCalculate}
      >
        Calculate Expense Ratio
      </button>
      {result !== null && (
        <div className="flex flex-col gap-4 mt-6">
          <div className="bg-white shadow p-4 border rounded-lg">
            <strong>Expense Ratio:</strong>{" "}
            <span className="text-blue-700 text-lg">{result.toFixed(2)}%</span>
          </div>
        </div>
      )}
    </div>
  );
}
