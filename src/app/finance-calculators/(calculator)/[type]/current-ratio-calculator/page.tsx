"use client";
import { useState } from "react";

export default function CurrentRatioCalculator() {
  const [currentAssets, setCurrentAssets] = useState<string>("");
  const [currentLiabilities, setCurrentLiabilities] = useState<string>("");
  const [result, setResult] = useState<number | null>(null);

  const handleCalculate = () => {
    const assets = parseFloat(currentAssets);
    const liabilities = parseFloat(currentLiabilities);
    if (!isNaN(assets) && !isNaN(liabilities) && liabilities > 0) {
      setResult(assets / liabilities);
    } else {
      setResult(null);
    }
  };

  return (
    <div className="mt-8 md:mt-12 mx-auto h-full w-10/12 md:w-11/12">
      <h1>Current Ratio Calculator</h1>
      <h5>Assess your business's short-term liquidity and financial health.</h5>
      <div className="mb-4">
        <p>
          <strong>What is Current Ratio?</strong>
          <br />
          The current ratio measures your business's ability to pay short-term
          obligations with short-term assets. A ratio above 1 indicates more
          assets than liabilities.
        </p>
        <p className="mt-2">
          <strong>Formula:</strong>
          <br />
          <code>Current Ratio = Current Assets / Current Liabilities</code>
        </p>
        <p className="mt-2">
          <strong>Why it matters:</strong>
          <br />
          Monitoring your current ratio helps you ensure your business can cover
          its bills and avoid liquidity problems.
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
        className="bg-blue-600 mt-2 px-4 py-2 rounded"
        onClick={handleCalculate}
      >
        Calculate Current Ratio
      </button>
      {result !== null && (
        <div className="flex flex-col gap-4 mt-6">
          <div className="shadow p-4 border rounded-lg">
            <strong>Current Ratio:</strong>{" "}
            <span className="text-lg">{result.toFixed(2)}</span>
          </div>
        </div>
      )}
    </div>
  );
}
