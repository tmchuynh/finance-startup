"use client";
import { useState } from "react";

function projectRevenue({
  currentRevenue,
  growthRate,
  periods,
}: {
  currentRevenue: number;
  growthRate: number;
  periods: number;
}) {
  const projections: number[] = [];
  let revenue = currentRevenue;
  for (let i = 0; i < periods; i++) {
    revenue = revenue * (1 + growthRate / 100);
    projections.push(revenue);
  }
  return projections;
}

export default function RevenueProjectionCalculator() {
  const [currentRevenue, setCurrentRevenue] = useState<string>("");
  const [growthRate, setGrowthRate] = useState<string>("");
  const [periods, setPeriods] = useState<string>("12");
  const [result, setResult] = useState<number[] | null>(null);

  const handleCalculate = () => {
    const rev = parseFloat(currentRevenue);
    const rate = parseFloat(growthRate);
    const n = parseInt(periods, 10);
    if (!isNaN(rev) && !isNaN(rate) && !isNaN(n) && rev > 0 && n > 0) {
      setResult(
        projectRevenue({ currentRevenue: rev, growthRate: rate, periods: n })
      );
    } else {
      setResult(null);
    }
  };

  return (
    <div className="mx-auto mt-8 md:mt-12 w-10/12 md:w-11/12 h-full">
      <h1>Revenue Projection Calculator</h1>
      <p className="mb-4">
        Project your business's future revenue based on current revenue and
        expected growth rate.
      </p>
      <div className="mb-4">
        <p>
          <strong>How does it work?</strong>
          <br />
          Enter your current revenue, expected average growth rate, and the
          number of periods (months or years) to project. The calculator will
          estimate your revenue for each period using compound growth.
        </p>
        <p className="mt-2">
          <strong>Formula:</strong>
          <br />
          <code>
            Future Revenue = Current Revenue × (1 + Growth Rate)<sup>n</sup>
          </code>
        </p>
      </div>
      <div className="gap-4 grid md:grid-cols-3">
        <div className="mb-2">
          <label className="block mb-1 font-medium">Current Revenue ($):</label>
          <input
            type="number"
            className="px-2 py-1 border rounded w-full"
            value={currentRevenue}
            onChange={(e) => setCurrentRevenue(e.target.value)}
            placeholder="Enter current revenue"
            min="0"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1 font-medium">
            Growth Rate (% per period):
          </label>
          <input
            type="number"
            className="px-2 py-1 border rounded w-full"
            value={growthRate}
            onChange={(e) => setGrowthRate(e.target.value)}
            placeholder="e.g. 5"
            min="0"
            step="0.01"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1 font-medium">Number of Periods:</label>
          <input
            type="number"
            className="px-2 py-1 border rounded w-full"
            value={periods}
            onChange={(e) => setPeriods(e.target.value)}
            placeholder="e.g. 12"
            min="1"
            step="1"
          />
        </div>
      </div>
      <button
        className="bg-blue-600 mt-2 px-4 py-2 rounded text-white"
        onClick={handleCalculate}
      >
        Project Revenue
      </button>
      {result && (
        <div className="flex flex-col gap-4 mt-6">
          <div className="bg-white shadow p-4 border rounded-lg">
            <strong>Projected Revenue by Period:</strong>
            <ul className="mt-2">
              {result.map((val, idx) => (
                <li key={idx}>
                  Period {idx + 1}:{" "}
                  <span className="text-blue-700">${val.toFixed(2)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
