"use client";
import { useState } from "react";

export default function WorkingCapitalCalculator() {
  const [currentAssets, setCurrentAssets] = useState<string>("");
  const [currentLiabilities, setCurrentLiabilities] = useState<string>("");
  const [result, setResult] = useState<number | null>(null);

  const handleCalculate = () => {
    const assets = parseFloat(currentAssets);
    const liabilities = parseFloat(currentLiabilities);
    if (!isNaN(assets) && !isNaN(liabilities)) {
      setResult(assets - liabilities);
    } else {
      setResult(null);
    }
  };

  return (
    <div className="mx-auto mt-8 md:mt-12 w-10/12 md:w-11/12 h-full">
      <h1>Working Capital Calculator</h1>
      <p className="mb-4">
        Calculate your business's working capital to assess short-term financial
        health and liquidity.
      </p>
      <div className="mb-4">
        <p>
          <strong>What is Working Capital?</strong>
          <br />
          Working capital is the difference between your current assets and
          current liabilities. It measures your business's ability to pay
          short-term obligations and fund day-to-day operations.
        </p>
        <ul className="mt-2 ml-6 list-disc">
          <li>
            <strong>Current Assets:</strong> These are items your business owns
            that can be quickly turned into cash within a year. Examples include
            cash, inventory, accounts receivable (money customers owe you), and
            short-term investments.
          </li>
          <li>
            <strong>Current Liabilities:</strong> These are debts or obligations
            your business needs to pay within a year. Examples include accounts
            payable (money you owe suppliers), short-term loans, and other bills
            due soon.
          </li>
        </ul>
        <p className="mt-2">
          <strong>Formula:</strong>
          <br />
          <code>Working Capital = Current Assets - Current Liabilities</code>
        </p>
        <p className="mt-2">
          <strong>Example:</strong>
          <br />
          If your business has $10,000 in current assets and $7,000 in current
          liabilities, your working capital is $3,000 ($10,000 - $7,000).
        </p>
        <p className="mt-2">
          <strong>Why it matters:</strong>
          <br />
          Positive working capital means your business can cover its short-term
          debts and invest in growth. Negative working capital may indicate
          liquidity problems.
        </p>
        <ul className="mt-2 ml-6 list-disc">
          <li>
            <strong>Positive working capital:</strong> You have enough resources
            to pay your bills and keep your business running smoothly.
          </li>
          <li>
            <strong>Negative working capital:</strong> You may struggle to pay
            bills on time, which could lead to financial difficulties.
          </li>
        </ul>
        <p className="mt-2 text-gray-600 text-sm">
          <strong>Tip:</strong> For beginners, review your balance sheet or
          accounting records to find your current assets and current
          liabilities. If unsure, ask your accountant or bookkeeper for help
          identifying these amounts.
        </p>
      </div>
      <div className="gap-4 grid md:grid-cols-2">
        <div className="mb-2">
          <label className="block mb-1 font-medium">Current Assets ($):</label>
          <input
            type="number"
            className="px-2 py-1 border rounded w-full"
            value={currentAssets}
            onChange={(e) => setCurrentAssets(e.target.value)}
            placeholder="Enter current assets"
            min="0"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1 font-medium">
            Current Liabilities ($):
          </label>
          <input
            type="number"
            className="px-2 py-1 border rounded w-full"
            value={currentLiabilities}
            onChange={(e) => setCurrentLiabilities(e.target.value)}
            placeholder="Enter current liabilities"
            min="0"
          />
        </div>
      </div>
      <button
        className="bg-blue-600 mt-2 px-4 py-2 rounded text-white"
        onClick={handleCalculate}
      >
        Calculate Working Capital
      </button>
      {result !== null && (
        <div className="flex flex-col gap-4 mt-6">
          <div className="bg-white shadow p-4 border rounded-lg">
            <strong>Working Capital:</strong>{" "}
            <span
              className={`text-lg ${
                result >= 0 ? "text-green-700" : "text-red-700"
              }`}
            >
              ${result.toFixed(2)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
