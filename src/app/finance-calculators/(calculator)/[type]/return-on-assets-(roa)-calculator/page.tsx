"use client";
import { useState } from "react";

export default function ROACalculator() {
  const [netIncome, setNetIncome] = useState<string>("");
  const [totalAssets, setTotalAssets] = useState<string>("");
  const [result, setResult] = useState<number | null>(null);

  const handleCalculate = () => {
    const income = parseFloat(netIncome);
    const assets = parseFloat(totalAssets);
    if (!isNaN(income) && !isNaN(assets) && assets > 0) {
      setResult((income / assets) * 100);
    } else {
      setResult(null);
    }
  };

  return (
    <div className="mt-8 md:mt-12 mx-auto h-full w-10/12 md:w-11/12">
      <h1>Return on Assets (ROA) Calculator</h1>
      <p className="mb-4">
        Calculate your business's return on assets (ROA) to assess how
        efficiently you use assets to generate profit.
      </p>
      <div className="mb-4">
        <p>
          <strong>What is ROA?</strong>
          <br />
          Return on Assets (ROA) measures how effectively your business uses its
          assets to generate net income. A higher ROA indicates better asset
          utilization and profitability.
        </p>
        <p className="mt-2">
          <strong>Formula:</strong>
          <br />
          <code>ROA = (Net Income / Total Assets) × 100</code>
        </p>
        <p className="mt-2">
          <strong>Why it matters:</strong>
          <br />
          Monitoring ROA helps you evaluate your business's efficiency and
          compare performance over time or against industry peers.
        </p>
      </div>
      <div className="gap-4 grid md:grid-cols-2">
        <div className="mb-2">
          <label className="block mb-1 font-medium">Net Income ($):</label>
          <input
            type="number"
            className="px-2 py-1 border rounded w-full"
            value={netIncome}
            onChange={(e) => setNetIncome(e.target.value)}
            placeholder="Enter net income"
            min="0"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1 font-medium">Total Assets ($):</label>
          <input
            type="number"
            className="px-2 py-1 border rounded w-full"
            value={totalAssets}
            onChange={(e) => setTotalAssets(e.target.value)}
            placeholder="Enter total assets"
            min="0"
          />
        </div>
      </div>
      <button
        className="bg-blue-600 mt-2 px-4 py-2 rounded"
        onClick={handleCalculate}
      >
        Calculate ROA
      </button>
      {result !== null && (
        <div className="flex flex-col gap-4 mt-6">
          <div className="shadow p-4 border rounded-lg">
            <strong>Return on Assets (ROA):</strong>{" "}
            <span className="text-lg">{result.toFixed(2)}%</span>
          </div>
        </div>
      )}
    </div>
  );
}
