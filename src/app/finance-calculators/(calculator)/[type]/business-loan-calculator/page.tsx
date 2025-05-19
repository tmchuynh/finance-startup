"use client";
import { useState } from "react";

function calculateLoan({
  principal,
  annualRate,
  years,
}: {
  principal: number;
  annualRate: number;
  years: number;
}) {
  const monthlyRate = annualRate / 12 / 100;
  const n = years * 12;
  if (monthlyRate === 0) {
    const payment = principal / n;
    return {
      monthlyPayment: payment,
      totalPayment: payment * n,
      totalInterest: 0,
    };
  }
  const payment =
    (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -n));
  const totalPayment = payment * n;
  const totalInterest = totalPayment - principal;
  return {
    monthlyPayment: payment,
    totalPayment,
    totalInterest,
  };
}

export default function BusinessLoanCalculator() {
  const [principal, setPrincipal] = useState<string>("");
  const [annualRate, setAnnualRate] = useState<string>("");
  const [years, setYears] = useState<string>("");
  const [result, setResult] = useState<{
    monthlyPayment: number;
    totalPayment: number;
    totalInterest: number;
  } | null>(null);

  const handleCalculate = () => {
    const p = parseFloat(principal);
    const r = parseFloat(annualRate);
    const y = parseFloat(years);
    if (!isNaN(p) && !isNaN(r) && !isNaN(y) && p > 0 && y > 0) {
      setResult(calculateLoan({ principal: p, annualRate: r, years: y }));
    } else {
      setResult(null);
    }
  };

  return (
    <div className="mx-auto mt-8 md:mt-12 w-10/12 md:w-11/12 h-full">
      <h1 className="mb-2 font-bold text-2xl">Business Loan Calculator</h1>
      <p className="mb-4">
        Estimate your monthly payment, total interest, and total cost for a business loan.
      </p>
      <div className="mb-4 text-gray-700 text-sm">
        <p>
          <strong>How does it work?</strong>
          <br />
          Enter your loan amount, annual interest rate, and loan term. The calculator will show your estimated monthly payment and total interest paid over the life of the loan.
        </p>
        <p className="mt-2">
          <strong>Formula:</strong>
          <br />
          <code>
            Monthly Payment = P × r / [1 - (1 + r)<sup>-n</sup>]
          </code>
          <br />
          Where P = principal, r = monthly interest rate, n = total payments.
        </p>
      </div>
      <div className="gap-4 grid md:grid-cols-3">
        <div className="mb-2">
          <label className="block mb-1 font-medium">Loan Amount ($):</label>
          <input
            type="number"
            className="px-2 py-1 border rounded w-full"
            value={principal}
            onChange={e => setPrincipal(e.target.value)}
            placeholder="Enter loan amount"
            min="0"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1 font-medium">Annual Interest Rate (%):</label>
          <input
            type="number"
            className="px-2 py-1 border rounded w-full"
            value={annualRate}
            onChange={e => setAnnualRate(e.target.value)}
            placeholder="e.g. 7.5"
            min="0"
            step="0.01"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1 font-medium">Loan Term (years):</label>
          <input
            type="number"
            className="px-2 py-1 border rounded w-full"
            value={years}
            onChange={e => setYears(e.target.value)}
            placeholder="e.g. 5"
            min="1"
            step="1"
          />
        </div>
      </div>
      <button
        className="bg-blue-600 mt-2 px-4 py-2 rounded text-white"
        onClick={handleCalculate}
      >
        Calculate Loan
      </button>
      {result && (
        <div className="flex flex-col gap-4 mt-6">
          <div className="bg-white shadow p-4 border rounded-lg">
            <div>
              <strong>Monthly Payment:</strong>{" "}
              <span className="text-blue-700 text-lg">
                ${result.monthlyPayment.toFixed(2)}
              </span>
            </div>
            <div>
              <strong>Total Interest:</strong>{" "}
              <span className="text-blue-700">
                ${result.totalInterest.toFixed(2)}
              </span>
            </div>
            <div>
              <strong>Total Payment:</strong>{" "}
              <span className="text-blue-700">
                ${result.totalPayment.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
