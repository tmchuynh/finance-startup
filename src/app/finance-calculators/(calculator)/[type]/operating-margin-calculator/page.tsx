"use client";
import { Button } from "@/components/ui/button";
import { calculateProfitMargins } from "@/lib/utils/calculators/business/income";
import { useState } from "react";

export default function OperatingMarginCalculator() {
  const [revenue, setRevenue] = useState<string>("");
  const [costOfGoodsSold, setCostOfGoodsSold] = useState<string>("");
  const [operatingExpenses, setOperatingExpenses] = useState<string>("");
  const [result, setResult] = useState<{
    operatingMarginPercent: number;
    operatingProfit: number;
  } | null>(null);

  const handleCalculate = () => {
    const revenueNum = parseFloat(revenue);
    const cogsNum = parseFloat(costOfGoodsSold);
    const opExpNum = parseFloat(operatingExpenses);
    if (
      !isNaN(revenueNum) &&
      !isNaN(cogsNum) &&
      !isNaN(opExpNum) &&
      revenueNum !== 0
    ) {
      const res = calculateProfitMargins({
        revenue: revenueNum,
        costOfGoodsSold: cogsNum,
        operatingExpenses: opExpNum,
      });
      setResult({
        operatingMarginPercent: res.operatingMarginPercent,
        operatingProfit: res.operatingProfit,
      });
    } else {
      setResult(null);
    }
  };

  return (
    <div className="mt-8 md:mt-12 mx-auto h-full w-10/12 md:w-11/12">
      <h1>Operating Margin Calculator</h1>
      <p className="mb-4">
        Calculate your business's operating margin to assess operational
        efficiency and profitability before interest and taxes.
      </p>
      <div className="mb-4">
        <p>
          <strong>What is Operating Margin?</strong>
          <br />
          Operating margin shows the percentage of revenue left after covering
          cost of goods sold and operating expenses, but before interest and
          taxes. It is a key indicator of your business's core profitability.
        </p>
        <p className="mt-2">
          <strong>Formula:</strong>
          <br />
          <code>Operating Margin = (Operating Profit / Revenue) × 100</code>
        </p>
        <p className="mt-2">
          <strong>Why it matters:</strong>
          <br />A higher operating margin means your business is more efficient
          at controlling costs and generating profit from operations.
        </p>
      </div>
      <div className="gap-4 grid md:grid-cols-3">
        <div className="mb-2">
          <label className="block mb-1 font-medium">Revenue ($):</label>
          <input
            type="number"
            className="px-2 py-1 border rounded w-full"
            value={revenue}
            onChange={(e) => setRevenue(e.target.value)}
            placeholder="Enter total revenue"
            min="0"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1 font-medium">
            Cost of Goods Sold ($):
          </label>
          <input
            type="number"
            className="px-2 py-1 border rounded w-full"
            value={costOfGoodsSold}
            onChange={(e) => setCostOfGoodsSold(e.target.value)}
            placeholder="Enter COGS"
            min="0"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1 font-medium">
            Operating Expenses ($):
          </label>
          <input
            type="number"
            className="px-2 py-1 border rounded w-full"
            value={operatingExpenses}
            onChange={(e) => setOperatingExpenses(e.target.value)}
            placeholder="Enter operating expenses"
            min="0"
          />
        </div>
      </div>
      <Button className="mt-2 px-4 py-2 rounded" onClick={handleCalculate}>
        Calculate Operating Margin
      </Button>
      {result && (
        <div className="flex flex-col gap-4 mt-6">
          <div className="shadow p-4 border rounded-lg">
            <div>
              <strong>Operating Margin:</strong>{" "}
              <span className="text-lg">
                {result.operatingMarginPercent.toFixed(2)}%
              </span>
            </div>
            <div>
              <strong>Operating Profit:</strong>{" "}
              <span className="">${result.operatingProfit.toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
