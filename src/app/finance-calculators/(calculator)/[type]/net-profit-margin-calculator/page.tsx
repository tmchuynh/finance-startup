"use client";
import { Button } from "@/components/ui/button";
import { calculateProfitMargins } from "@/lib/utils/calculators/business/income";
import { useState } from "react";

export default function NetProfitMarginCalculator() {
  const [revenue, setRevenue] = useState<string>("");
  const [costOfGoodsSold, setCostOfGoodsSold] = useState<string>("");
  const [operatingExpenses, setOperatingExpenses] = useState<string>("");
  const [interestExpense, setInterestExpense] = useState<string>("");
  const [taxes, setTaxes] = useState<string>("");
  const [result, setResult] = useState<{
    netMarginPercent: number;
    netIncome: number;
  } | null>(null);

  const handleCalculate = () => {
    const revenueNum = parseFloat(revenue);
    const cogsNum = parseFloat(costOfGoodsSold);
    const opExpNum = parseFloat(operatingExpenses);
    const interestNum = parseFloat(interestExpense);
    const taxesNum = parseFloat(taxes);
    if (
      !isNaN(revenueNum) &&
      !isNaN(cogsNum) &&
      !isNaN(opExpNum) &&
      !isNaN(interestNum) &&
      !isNaN(taxesNum) &&
      revenueNum !== 0
    ) {
      const res = calculateProfitMargins({
        revenue: revenueNum,
        costOfGoodsSold: cogsNum,
        operatingExpenses: opExpNum,
        interestExpense: interestNum,
        taxes: taxesNum,
      });
      setResult({
        netMarginPercent: res.netMarginPercent,
        netIncome: res.netIncome,
      });
    } else {
      setResult(null);
    }
  };

  return (
    <div className="mt-8 md:mt-12 mx-auto h-full w-10/12 md:w-11/12">
      <h1>Net Profit Margin Calculator</h1>
      <p className="mb-4">
        Calculate your business's net profit margin to understand profitability
        after all expenses, interest, and taxes.
      </p>
      <div className="mb-4">
        <p>
          <strong>What is Net Profit Margin?</strong>
          <br />
          Net profit margin shows the percentage of revenue that remains as
          profit after all expenses, interest, and taxes are deducted. It is a
          key indicator of your business's overall profitability.
        </p>
        <p className="mt-2">
          <strong>Formula:</strong>
          <br />
          <code>Net Profit Margin = (Net Income / Revenue) × 100</code>
        </p>
        <p className="mt-2">
          <strong>Why it matters:</strong>
          <br />A higher net profit margin means your business is more efficient
          at converting revenue into actual profit. Monitoring this metric helps
          you make better financial and operational decisions.
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
        <div className="mb-2">
          <label className="block mb-1 font-medium">
            Interest Expense ($):
          </label>
          <input
            type="number"
            className="px-2 py-1 border rounded w-full"
            value={interestExpense}
            onChange={(e) => setInterestExpense(e.target.value)}
            placeholder="Enter interest expense"
            min="0"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1 font-medium">Taxes ($):</label>
          <input
            type="number"
            className="px-2 py-1 border rounded w-full"
            value={taxes}
            onChange={(e) => setTaxes(e.target.value)}
            placeholder="Enter taxes"
            min="0"
          />
        </div>
      </div>
      <Button className="mt-2 px-4 py-2 rounded" onClick={handleCalculate}>
        Calculate Net Profit Margin
      </Button>
      {result && (
        <div className="flex flex-col gap-4 mt-6">
          <div className="shadow p-4 border rounded-lg">
            <div>
              <strong>Net Profit Margin:</strong>{" "}
              <span className="text-lg">
                {result.netMarginPercent.toFixed(2)}%
              </span>
            </div>
            <div>
              <strong>Net Income:</strong>{" "}
              <span className="">${result.netIncome.toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
