"use client";
import { useState } from "react";

function calculateROI({
  initialInvestment,
  finalValue,
}: {
  initialInvestment: number;
  finalValue: number;
}) {
  const roi = ((finalValue - initialInvestment) / initialInvestment) * 100;
  return roi;
}

export default function ROICalculator() {
  const [initialInvestment, setInitialInvestment] = useState<string>("");
  const [finalValue, setFinalValue] = useState<string>("");
  const [result, setResult] = useState<number | null>(null);

  const handleCalculate = () => {
    const initial = parseFloat(initialInvestment);
    const final = parseFloat(finalValue);
    if (!isNaN(initial) && !isNaN(final) && initial > 0) {
      setResult(
        calculateROI({ initialInvestment: initial, finalValue: final })
      );
    } else {
      setResult(null);
    }
  };

  return (
    <div className="mt-8 md:mt-12 mx-auto h-full w-10/12 md:w-11/12">
      <h1>Return on Investment (ROI) Calculator</h1>
      <p className="mb-4">
        Calculate the return on investment to assess the profitability of your
        investments.
      </p>
      <div className="mb-4">
        <p>
          <strong>What is ROI?</strong>
          <br />
          Return on Investment (ROI) measures the gain or loss generated on an
          investment relative to its initial cost. It is expressed as a
          percentage and helps you compare the efficiency or profitability of
          different investments.
        </p>
        <p className="mt-2">
          <strong>Formula:</strong>
          <br />
          <code>
            ROI = (Final Value - Initial Investment) / Initial Investment × 100
          </code>
        </p>
        <p className="mt-2">
          <strong>Why it matters:</strong>
          <br />
          ROI helps you evaluate the effectiveness of your investment strategy
          and make informed financial decisions.
        </p>
      </div>
      <div className="gap-4 grid md:grid-cols-2">
        <div className="mb-2">
          <label className="block mb-1 font-medium">
            Initial Investment ($):
          </label>
          <input
            type="number"
            className="px-2 py-1 border rounded w-full"
            value={initialInvestment}
            onChange={(e) => setInitialInvestment(e.target.value)}
            placeholder="Enter initial investment"
            min="0"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1 font-medium">Final Value ($):</label>
          <input
            type="number"
            className="px-2 py-1 border rounded w-full"
            value={finalValue}
            onChange={(e) => setFinalValue(e.target.value)}
            placeholder="Enter final value"
            min="0"
          />
        </div>
      </div>
      <button
        className="bg-blue-600 mt-2 px-4 py-2 rounded"
        onClick={handleCalculate}
      >
        Calculate ROI
      </button>
      {result !== null && (
        <div className="flex flex-col gap-4 mt-6">
          <div className="shadow p-4 border rounded-lg">
            <strong>Return on Investment (ROI):</strong>{" "}
            <span className="text-lg">{result.toFixed(2)}%</span>
          </div>
        </div>
      )}
    </div>
  );
}
