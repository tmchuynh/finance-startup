"use client";
import { useState } from "react";

export default function QuickRatioCalculator() {
  const [currentAssets, setCurrentAssets] = useState<string>("");
  const [inventory, setInventory] = useState<string>("");
  const [currentLiabilities, setCurrentLiabilities] = useState<string>("");
  const [result, setResult] = useState<number | null>(null);

  const handleCalculate = () => {
    const assets = parseFloat(currentAssets);
    const inv = parseFloat(inventory);
    const liabilities = parseFloat(currentLiabilities);
    if (
      !isNaN(assets) &&
      !isNaN(inv) &&
      !isNaN(liabilities) &&
      liabilities > 0
    ) {
      setResult((assets - inv) / liabilities);
    } else {
      setResult(null);
    }
  };

  return (
    <div className="mx-auto mt-8 md:mt-12 w-10/12 md:w-11/12 h-full">
      <h1>Quick Ratio Calculator</h1>
      <p className="mb-4">
        Calculate your business's quick ratio to assess short-term liquidity
        without relying on inventory.
      </p>
      <div className="mb-4">
        <p>
          <strong>What is Quick Ratio?</strong>
          <br />
          The quick ratio (acid-test ratio) measures your business's ability to
          meet short-term obligations using its most liquid assets, excluding
          inventory. A ratio above 1 generally indicates good short-term
          financial health.
        </p>
        <p className="mt-2">
          <strong>Formula:</strong>
          <br />
          <code>
            Quick Ratio = (Current Assets - Inventory) / Current Liabilities
          </code>
        </p>
        <p className="mt-2">
          <strong>Why it matters:</strong>
          <br />
          Monitoring your quick ratio helps ensure your business can pay its
          bills even if inventory can't be quickly converted to cash.
        </p>
      </div>
      <div className="gap-4 grid md:grid-cols-3">
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
          <label className="block mb-1 font-medium">Inventory ($):</label>
          <input
            type="number"
            className="px-2 py-1 border rounded w-full"
            value={inventory}
            onChange={(e) => setInventory(e.target.value)}
            placeholder="Enter inventory"
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
        Calculate Quick Ratio
      </button>
      {result !== null && (
        <div className="flex flex-col gap-4 mt-6">
          <div className="bg-white shadow p-4 border rounded-lg">
            <strong>Quick Ratio:</strong>{" "}
            <span className="text-blue-700 text-lg">{result.toFixed(2)}</span>
          </div>
        </div>
      )}
    </div>
  );
}
