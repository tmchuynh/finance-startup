"use client";
import { calculateCashConversionCycle } from "@/lib/utils/calculators/business/operations";
import { useState } from "react";

export default function CashConversionCycleCalculator() {
  const [daysInventoryOutstanding, setDaysInventoryOutstanding] = useState<string>("");
  const [daysSalesOutstanding, setDaysSalesOutstanding] = useState<string>("");
  const [daysPayablesOutstanding, setDaysPayablesOutstanding] = useState<string>("");
  const [result, setResult] = useState<{
    cashConversionCycle: number;
    explanation: string;
    note?: string;
  } | null>(null);

  const handleCalculate = () => {
    const dio = parseFloat(daysInventoryOutstanding);
    const dso = parseFloat(daysSalesOutstanding);
    const dpo = parseFloat(daysPayablesOutstanding);
    if (!isNaN(dio) && !isNaN(dso) && !isNaN(dpo)) {
      const res = calculateCashConversionCycle({
        daysInventoryOutstanding: dio,
        daysSalesOutstanding: dso,
        daysPayablesOutstanding: dpo,
      });
      setResult(res);
    } else {
      setResult(null);
    }
  };

  return (
    <div className="mx-auto mt-8 md:mt-12 w-10/12 md:w-11/12 h-full">
      <h1 className="mb-2 font-bold text-2xl">Cash Conversion Cycle Calculator</h1>
      <p className="mb-4">
        Calculate your business's cash conversion cycle (CCC) to assess how efficiently you manage inventory, receivables, and payables.
      </p>
      <div className="mb-4 text-gray-700 text-sm">
        <p>
          <strong>What is Cash Conversion Cycle?</strong>
          <br />
          The cash conversion cycle (CCC) measures the time (in days) it takes for a business to convert its investments in inventory and other resources into cash flows from sales. It combines inventory, receivables, and payables cycles.
        </p>
        <p className="mt-2">
          <strong>Formula:</strong>
          <br />
          <code>
            CCC = Days Inventory Outstanding (DIO) + Days Sales Outstanding (DSO) - Days Payables Outstanding (DPO)
          </code>
        </p>
        <p className="mt-2">
          <strong>Why it matters:</strong>
          <br />
          A shorter CCC means your business recovers cash faster, improving liquidity and reducing financing needs.
        </p>
      </div>
      <div className="gap-4 grid md:grid-cols-3">
        <div className="mb-2">
          <label className="block mb-1 font-medium">Days Inventory Outstanding (DIO):</label>
          <input
            type="number"
            className="px-2 py-1 border rounded w-full"
            value={daysInventoryOutstanding}
            onChange={e => setDaysInventoryOutstanding(e.target.value)}
            placeholder="e.g. 45"
            min="0"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1 font-medium">Days Sales Outstanding (DSO):</label>
          <input
            type="number"
            className="px-2 py-1 border rounded w-full"
            value={daysSalesOutstanding}
            onChange={e => setDaysSalesOutstanding(e.target.value)}
            placeholder="e.g. 30"
            min="0"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1 font-medium">Days Payables Outstanding (DPO):</label>
          <input
            type="number"
            className="px-2 py-1 border rounded w-full"
            value={daysPayablesOutstanding}
            onChange={e => setDaysPayablesOutstanding(e.target.value)}
            placeholder="e.g. 25"
            min="0"
          />
        </div>
      </div>
      <button
        className="bg-blue-600 mt-2 px-4 py-2 rounded text-white"
        onClick={handleCalculate}
      >
        Calculate CCC
      </button>
      {result && (
        <div className="flex flex-col gap-4 mt-6">
          <div className="bg-white shadow p-4 border rounded-lg">
            <div>
              <strong>Cash Conversion Cycle (CCC):</strong>{" "}
              <span className="text-blue-700 text-lg">
                {result.cashConversionCycle} days
              </span>
            </div>
          </div>
          <div className="bg-gray-50 shadow p-4 border rounded-lg text-gray-700 text-sm">
            {result.explanation}
            {result.note && (
              <div className="mt-2 text-yellow-700">{result.note}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
