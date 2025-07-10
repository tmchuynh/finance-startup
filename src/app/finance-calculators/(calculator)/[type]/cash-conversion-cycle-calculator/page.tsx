"use client";
import { Button } from "@/components/ui/button";
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
    <div className="mt-8 md:mt-12 mx-auto h-full w-10/12 md:w-11/12">
      <h1>Cash Conversion Cycle Calculator</h1>
      <h5>
        Calculate your cash conversion cycle to understand your business's
        liquidity.
      </h5>
      <p className="mb-4">
        This calculator helps you determine how efficiently your business is
        managing its cash flow. The cash conversion cycle (CCC) is a key metric
        that indicates the time it takes for a company to convert its
        investments in inventory and accounts receivable into cash. A shorter
        CCC means your business recovers cash faster, improving liquidity and
        reducing financing needs. Use this tool to assess your cash flow
        management and make informed decisions about your operations.
      </p>

      <div className="mb-4">
        <p>
          <strong>What is Cash Conversion Cycle?</strong>
          <br />
          The cash conversion cycle (CCC) measures the time (in days) it takes
          for a business to convert its investments in inventory and other
          resources into cash flows from sales. It combines inventory,
          receivables, and payables cycles.
        </p>
        <p className="mt-2">
          <strong>Formula:</strong>
          <br />
          <code>
            CCC = Days Inventory Outstanding (DIO) + Days Sales Outstanding
            (DSO) - Days Payables Outstanding (DPO)
          </code>
        </p>
        <p className="mt-2">
          <strong>Why it matters:</strong>
          <br />A shorter CCC means your business recovers cash faster,
          improving liquidity and reducing financing needs.
        </p>
      </div>
      <div className="gap-4 grid md:grid-cols-3">
        <div className="mb-2">
          <label className="block mb-1 font-medium">
            Days Inventory Outstanding (DIO):
          </label>
          <input
            type="number"
            className="px-2 py-1 border rounded w-full"
            value={daysInventoryOutstanding}
            onChange={(e) => setDaysInventoryOutstanding(e.target.value)}
            placeholder="e.g. 45"
            min="0"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1 font-medium">
            Days Sales Outstanding (DSO):
          </label>
          <input
            type="number"
            className="px-2 py-1 border rounded w-full"
            value={daysSalesOutstanding}
            onChange={(e) => setDaysSalesOutstanding(e.target.value)}
            placeholder="e.g. 30"
            min="0"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1 font-medium">
            Days Payables Outstanding (DPO):
          </label>
          <input
            type="number"
            className="px-2 py-1 border rounded w-full"
            value={daysPayablesOutstanding}
            onChange={(e) => setDaysPayablesOutstanding(e.target.value)}
            placeholder="e.g. 25"
            min="0"
          />
        </div>
      </div>
      <Button className="mt-2 px-4 py-2 rounded" onClick={handleCalculate}>
        Calculate CCC
      </Button>
      {result && (
        <div className="flex flex-col gap-4 mt-6">
          <div className="shadow p-4 border rounded-lg">
            <div>
              <strong>Cash Conversion Cycle (CCC):</strong>{" "}
              <span className="text-lg">{result.cashConversionCycle} days</span>
            </div>
          </div>
          <div className="shadow p-4 border rounded-lg text-sm">
            {result.explanation}
            {result.note && <div className="mt-2">{result.note}</div>}
          </div>
        </div>
      )}
    </div>
  );
}
