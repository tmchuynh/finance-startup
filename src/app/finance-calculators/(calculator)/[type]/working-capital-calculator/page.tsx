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
      <section className="mb-8">
        <h2>What is Working Capital?</h2>
        <p>
          Working capital is a fundamental metric in financial management that
          represents the difference between your current assets and current
          liabilities. It is a key indicator of your business's operational
          efficiency and short-term financial stability. In simple terms, it
          measures how much cash and liquid assets your business has available
          to cover its short-term obligations.
        </p>
        <p>
          A positive working capital shows that your business can pay off its
          short-term debts and still have resources left to reinvest or cover
          unexpected expenses. A negative working capital, on the other hand,
          may suggest liquidity issues that could disrupt daily operations or
          lead to insolvency if not addressed.
        </p>

        <div className="gap-4 grid lg:grid-cols-2 mt-3 lg:mt-7 mb-5">
          <div>
            <h3>Current Assets</h3>
            <p>
              These are all assets your business expects to convert into cash,
              sell, or consume within one year.
            </p>
            <ul className="list-disc list-inside">
              <li>Cash & cash equivalents</li>
              <li>Accounts receivable</li>
              <li>Inventory</li>
              <li>Prepaid expenses</li>
              <li>Short-term investments</li>
              <li>Other liquid assets</li>
            </ul>
          </div>
          <div>
            <h3>Current Liabilities</h3>
            <p>
              These are financial obligations your business must settle within
              one year.
            </p>
            <ul className="list-disc list-inside">
              <li>Accounts payable</li>
              <li>Short-term debt</li>
              <li>Accrued expenses</li>
              <li>Taxes payable</li>
              <li>Unearned revenue</li>
            </ul>
          </div>
        </div>

        <div className="mb-6">
          <h3>Formula</h3>
          <p className="text-gray-700">
            <code className="bg-gray-100 px-2 py-1 rounded text-sm">
              Working Capital = Current Assets - Current Liabilities
            </code>
          </p>
        </div>

        <div className="mb-6">
          <h3>Example</h3>
          <p className="text-gray-700">
            If your business has <strong>$10,000</strong> in current assets and{" "}
            <strong>$7,000</strong> in current liabilities, your working capital
            is <strong>$3,000</strong> ($10,000 - $7,000).
          </p>
        </div>

        <div className="mb-6">
          <h3>Why It Matters</h3>
          <p>
            Working capital helps evaluate your business's ability to meet
            short-term obligations and maintain smooth daily operations.
          </p>
          <ul className="space-y-2 mt-3">
            <li>
              <strong>Positive working capital: </strong> You have enough
              resources to pay your bills and keep your business running
              smoothly.
            </li>
            <li>
              <strong>Negative working capital: </strong> You may struggle to
              pay bills on time, which could lead to financial difficulties.
            </li>
          </ul>
        </div>

        <p className="text-gray-600 text-sm">
          <strong>Tip:</strong> Review your balance sheet to find your current
          assets and liabilities. If unsure, consult with your accountant or
          bookkeeper to ensure accuracy.
        </p>
      </section>
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
