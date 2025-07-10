"use client";
import { Button } from "@/components/ui/button";
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
    <div className="mt-8 md:mt-12 mx-auto h-full w-10/12 md:w-11/12">
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

        <div className="gap-4 grid lg:grid-cols-2 mb-5 mt-3 lg:mt-7">
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

        {/* Example table for a typical person */}
        <div className="mb-6 overflow-x-auto">
          <h3 className="mb-2">
            Example: Typical Personal Assets and Liabilities
          </h3>
          <table className="border border-gray-300 min-w-full text-sm">
            <thead>
              <tr className="">
                <th className="px-3 py-2 border text-left">Example Assets</th>
                <th className="px-3 py-2 border text-left">
                  Example Liabilities
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-3 py-2 border">
                  Cash in checking/savings accounts
                </td>
                <td className="px-3 py-2 border">Credit card balances</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">
                  Paychecks not yet deposited
                </td>
                <td className="px-3 py-2 border">Unpaid utility bills</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">
                  Groceries or supplies on hand
                </td>
                <td className="px-3 py-2 border">Short-term personal loans</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">
                  Refunds or money owed to you
                </td>
                <td className="px-3 py-2 border">
                  Upcoming rent or mortgage payment
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">
                  Prepaid subscriptions (e.g., gym, streaming)
                </td>
                <td className="px-3 py-2 border">Outstanding medical bills</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mb-6">
          <h3>Formula</h3>
          <p className="">
            <code className="px-2 py-1 rounded text-sm">
              Working Capital = Current Assets - Current Liabilities
            </code>
          </p>
        </div>

        <div className="mb-6">
          <h3>Example</h3>
          <p className="">
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

        <p className="text-sm">
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
      <Button className="mt-2 px-4 py-2 rounded" onClick={handleCalculate}>
        Calculate Working Capital
      </Button>
      {result !== null && (
        <div className="flex flex-col gap-4 mt-6">
          <div className="shadow p-4 border rounded-lg">
            <strong>Working Capital:</strong>{" "}
            <span className={`text-lg ${result >= 0 ? "" : "text-red-700"}`}>
              ${result.toFixed(2)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
