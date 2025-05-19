"use client";
import { calculateProfitMargins } from "@/lib/utils/calculators/business/income";
import { useState } from "react";

export default function ProfitMarginCalculator() {
  const [revenue, setRevenue] = useState<string>("");
  const [cost, setCost] = useState<string>("");
  const [margin, setMargin] = useState<number | null>(null);

  const calculateMargin = () => {
    const revenueNum = parseFloat(revenue);
    const costNum = parseFloat(cost);
    if (!isNaN(revenueNum) && !isNaN(costNum) && revenueNum !== 0) {
      const result = calculateProfitMargins({
        revenue: revenueNum,
        costOfGoodsSold: costNum,
        operatingExpenses: 0,
      });
      setMargin(result.grossMarginPercent);
    } else {
      setMargin(null);
    }
  };

  return (
    <div className="mx-auto mt-8 md:mt-12 w-10/12 md:w-11/12 h-full">
      <h1>Profit Margin Calculator</h1>
      <h5>Calculate your profit margin easily.</h5>
      <p className="mb-4">
        This calculator helps you determine how much profit you make from your
        sales after covering costs. A higher profit margin indicates better
        profitability and efficiency in managing expenses. Use this tool to
        assess your business's financial health and make informed decisions.
      </p>
      <div className="mb-4">
        <p>
          <strong>What is Profit Margin?</strong>
          <br />
          Profit margin is a key financial metric that shows what percentage of
          revenue is actual profit after covering costs. It helps you understand
          how efficiently your business is operating and how much profit you
          keep from every dollar of sales.
        </p>
        <p className="mt-2">
          <strong>Formula:</strong>
          <br />
          <code>Profit Margin = (Revenue - Cost) / Revenue × 100</code>
        </p>
        <p className="mt-2">
          <strong>Why it matters:</strong>
          <br />A higher profit margin means your business is more efficient at
          converting sales into actual profit. Monitoring your margin helps you
          make better pricing, cost control, and investment decisions.
        </p>
      </div>
      <div className="gap-4 grid md:grid-cols-2">
        <div className="mb-2">
          <label className="block mb-1 font-medium">Revenue:</label>
          <input
            type="number"
            className="px-2 py-1 border rounded w-full"
            value={revenue}
            onChange={(e) => setRevenue(e.target.value)}
            placeholder="Enter revenue"
            min="0"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1 font-medium">Cost:</label>
          <input
            type="number"
            className="px-2 py-1 border rounded w-full"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            placeholder="Enter cost"
            min="0"
          />
        </div>
      </div>
      <button
        className="bg-blue-600 mt-2 px-4 py-2 rounded text-white"
        onClick={calculateMargin}
      >
        Calculate Profit Margin
      </button>
      {margin !== null && (
        <div className="flex flex-col gap-4 mt-6">
          <div className="bg-white shadow p-4 border rounded-lg">
            <div>
              <strong>Profit Margin:</strong>{" "}
              <span className="text-blue-700 text-lg">
                {margin.toFixed(2)}%
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
