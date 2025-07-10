"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function ROECalculator() {
  const [netIncome, setNetIncome] = useState<string>("");
  const [shareholdersEquity, setShareholdersEquity] = useState<string>("");
  const [result, setResult] = useState<number | null>(null);

  const handleCalculate = () => {
    const income = parseFloat(netIncome);
    const equity = parseFloat(shareholdersEquity);
    if (!isNaN(income) && !isNaN(equity) && equity > 0) {
      setResult((income / equity) * 100);
    } else {
      setResult(null);
    }
  };

  return (
    <div className="mt-8 md:mt-12 mx-auto h-full w-10/12 md:w-11/12">
      <h1>Return on Equity (ROE) Calculator</h1>
      <p className="mb-4">
        Calculate your business's return on equity (ROE) to assess profitability
        relative to shareholders' equity.
      </p>
      <div className="mb-4">
        <p>
          <strong>What is ROE?</strong>
          <br />
          Return on Equity (ROE) measures how efficiently your business
          generates profit from shareholders' equity. A higher ROE indicates
          better financial performance and value creation for shareholders.
        </p>
        <p className="mt-2">
          <strong>Formula:</strong>
          <br />
          <code>ROE = (Net Income / Shareholders' Equity) × 100</code>
        </p>
        <p className="mt-2">
          <strong>Why it matters:</strong>
          <br />
          Monitoring ROE helps you evaluate your business's ability to generate
          returns for its owners and compare performance with industry peers.
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
          <label className="block mb-1 font-medium">
            Shareholders' Equity ($):
          </label>
          <input
            type="number"
            className="px-2 py-1 border rounded w-full"
            value={shareholdersEquity}
            onChange={(e) => setShareholdersEquity(e.target.value)}
            placeholder="Enter shareholders' equity"
            min="0"
          />
        </div>
      </div>
      <Button className="mt-2 px-4 py-2 rounded" onClick={handleCalculate}>
        Calculate ROE
      </Button>
      {result !== null && (
        <div className="flex flex-col gap-4 mt-6">
          <div className="shadow p-4 border rounded-lg">
            <strong>Return on Equity (ROE):</strong>{" "}
            <span className="text-lg">{result.toFixed(2)}%</span>
          </div>
        </div>
      )}
    </div>
  );
}
