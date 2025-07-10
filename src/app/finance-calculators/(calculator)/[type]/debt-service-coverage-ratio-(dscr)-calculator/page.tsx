"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function DSCRCalculator() {
  const [netOperatingIncome, setNetOperatingIncome] = useState<string>("");
  const [totalDebtService, setTotalDebtService] = useState<string>("");
  const [result, setResult] = useState<number | null>(null);

  const handleCalculate = () => {
    const noi = parseFloat(netOperatingIncome);
    const debt = parseFloat(totalDebtService);
    if (!isNaN(noi) && !isNaN(debt) && debt > 0) {
      setResult(noi / debt);
    } else {
      setResult(null);
    }
  };

  return (
    <div className="mt-8 md:mt-12 mx-auto h-full w-10/12 md:w-11/12">
      <h1>Debt Service Coverage Ratio (DSCR) Calculator</h1>
      <p className="mb-4">
        Calculate your business's DSCR to assess its ability to cover debt
        obligations with operating income.
      </p>
      <div className="mb-4">
        <p>
          <strong>What is DSCR?</strong>
          <br />
          The Debt Service Coverage Ratio (DSCR) measures your business's
          ability to pay its debt obligations from its net operating income. A
          DSCR above 1 means you generate enough income to cover your debt
          payments.
        </p>
        <p className="mt-2">
          <strong>Formula:</strong>
          <br />
          <code>DSCR = Net Operating Income / Total Debt Service</code>
        </p>
        <p className="mt-2">
          <strong>Why it matters:</strong>
          <br />
          Lenders use DSCR to evaluate your business's financial health and
          ability to take on new debt. A higher DSCR indicates lower risk for
          lenders.
        </p>
      </div>
      <div className="gap-4 grid md:grid-cols-2">
        <div className="mb-2">
          <label className="block mb-1 font-medium">
            Net Operating Income ($):
          </label>
          <input
            type="number"
            className="px-2 py-1 border rounded w-full"
            value={netOperatingIncome}
            onChange={(e) => setNetOperatingIncome(e.target.value)}
            placeholder="Enter net operating income"
            min="0"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1 font-medium">
            Total Debt Service ($):
          </label>
          <input
            type="number"
            className="px-2 py-1 border rounded w-full"
            value={totalDebtService}
            onChange={(e) => setTotalDebtService(e.target.value)}
            placeholder="Enter total debt service"
            min="0"
          />
        </div>
      </div>
      <Button className="mt-2 px-4 py-2 rounded" onClick={handleCalculate}>
        Calculate DSCR
      </Button>
      {result !== null && (
        <div className="flex flex-col gap-4 mt-6">
          <div className="shadow p-4 border rounded-lg">
            <strong>Debt Service Coverage Ratio (DSCR):</strong>{" "}
            <span className="text-lg">{result.toFixed(2)}</span>
          </div>
        </div>
      )}
    </div>
  );
}
