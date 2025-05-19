"use client";
import { useState } from "react";

export default function CashFlowManagementCalculator() {
  const [cashInflows, setCashInflows] = useState<string>("");
  const [cashOutflows, setCashOutflows] = useState<string>("");
  const [startingCash, setStartingCash] = useState<string>("");
  const [result, setResult] = useState<{
    netCashFlow: number;
    endingCash: number;
  } | null>(null);

  const handleCalculate = () => {
    const inflows = parseFloat(cashInflows);
    const outflows = parseFloat(cashOutflows);
    const start = parseFloat(startingCash);
    if (!isNaN(inflows) && !isNaN(outflows) && !isNaN(start)) {
      const net = inflows - outflows;
      const ending = start + net;
      setResult({
        netCashFlow: net,
        endingCash: ending,
      });
    } else {
      setResult(null);
    }
  };

  return (
    <div className="mx-auto mt-8 md:mt-12 w-10/12 md:w-11/12 h-full">
      <h1>Cash Flow Management Calculator</h1>
      <h5>
        Manage your business's cash flow effectively with this calculator.
      </h5>
      <p className="mb-4">
        This calculator helps you understand your cash flow by calculating your
        net cash flow and ending cash balance. By entering your cash inflows,
        outflows, and starting cash balance, you can see how well your business
        is managing its cash. This is crucial for maintaining liquidity and
        ensuring you have enough cash to meet your obligations. Use this tool to
        assess your cash flow position and make informed financial decisions.
      </p>
      <div className="mb-4">
        <p>
          <strong>How does it work?</strong>
          <br />
          Enter your total cash inflows (income, sales, etc.), cash outflows
          (expenses, payments, etc.), and starting cash balance. The calculator
          will show your net cash flow and ending cash position.
        </p>
        <p className="mt-2">
          <strong>Why it matters:</strong>
          <br />
          Managing cash flow is critical for business survival. Positive cash
          flow means your business can cover its expenses and invest in growth,
          while negative cash flow may signal trouble.
        </p>
      </div>
      <div className="gap-4 grid md:grid-cols-3">
        <div className="mb-2">
          <label className="block mb-1 font-medium">Cash Inflows ($):</label>
          <input
            type="number"
            className="px-2 py-1 border rounded w-full"
            value={cashInflows}
            onChange={(e) => setCashInflows(e.target.value)}
            placeholder="Total cash received"
            min="0"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1 font-medium">Cash Outflows ($):</label>
          <input
            type="number"
            className="px-2 py-1 border rounded w-full"
            value={cashOutflows}
            onChange={(e) => setCashOutflows(e.target.value)}
            placeholder="Total cash spent"
            min="0"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1 font-medium">
            Starting Cash Balance ($):
          </label>
          <input
            type="number"
            className="px-2 py-1 border rounded w-full"
            value={startingCash}
            onChange={(e) => setStartingCash(e.target.value)}
            placeholder="Cash at start of period"
            min="0"
          />
        </div>
      </div>
      <button
        className="bg-blue-600 mt-2 px-4 py-2 rounded text-white"
        onClick={handleCalculate}
      >
        Calculate Cash Flow
      </button>
      {result && (
        <div className="flex flex-col gap-4 mt-6">
          <div className="bg-white shadow p-4 border rounded-lg">
            <div>
              <strong>Net Cash Flow:</strong>{" "}
              <span
                className={`text-lg ${
                  result.netCashFlow >= 0 ? "text-green-700" : "text-red-700"
                }`}
              >
                ${result.netCashFlow.toFixed(2)}
              </span>
            </div>
            <div>
              <strong>Ending Cash Balance:</strong>{" "}
              <span
                className={`text-lg ${
                  result.endingCash >= 0 ? "text-green-700" : "text-red-700"
                }`}
              >
                ${result.endingCash.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
