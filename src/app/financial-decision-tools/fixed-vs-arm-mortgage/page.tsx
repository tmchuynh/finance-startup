"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";

function calcFixedMortgage({
  amount,
  rate,
  years,
}: {
  amount: number;
  rate: number;
  years: number;
}) {
  const n = years * 12;
  const monthlyRate = rate / 100 / 12;
  const monthly =
    monthlyRate === 0
      ? amount / n
      : (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -n));
  const totalPaid = monthly * n;
  return { monthly: Math.round(monthly), total: Math.round(totalPaid) };
}

function calcARMMortgage({
  amount,
  initialRate,
  initialYears,
  adjRate,
  totalYears,
}: {
  amount: number;
  initialRate: number;
  initialYears: number;
  adjRate: number;
  totalYears: number;
}) {
  const nInitial = initialYears * 12;
  const nTotal = totalYears * 12;
  const nAdj = nTotal - nInitial;
  const initialMonthlyRate = initialRate / 100 / 12;
  const adjMonthlyRate = adjRate / 100 / 12;

  // Initial period
  const initialMonthly =
    initialMonthlyRate === 0
      ? amount / nTotal
      : (amount * initialMonthlyRate) /
        (1 - Math.pow(1 + initialMonthlyRate, -nTotal));
  let balance = amount;
  for (let i = 0; i < nInitial; i++) {
    const interest = balance * initialMonthlyRate;
    const principal = initialMonthly - interest;
    balance -= principal;
  }

  // Adjusted period
  const adjMonthly =
    adjMonthlyRate === 0
      ? balance / nAdj
      : (balance * adjMonthlyRate) / (1 - Math.pow(1 + adjMonthlyRate, -nAdj));
  const totalPaid =
    initialMonthly * nInitial + (isNaN(adjMonthly) ? 0 : adjMonthly * nAdj);

  return {
    initialMonthly: Math.round(initialMonthly),
    adjMonthly: isNaN(adjMonthly) ? 0 : Math.round(adjMonthly),
    total: Math.round(totalPaid),
  };
}

export default function FixedVsARMMortgage() {
  const [amount, setAmount] = useState<number>(400000);
  const [fixedRate, setFixedRate] = useState<number>(6.5);
  const [fixedYears, setFixedYears] = useState<number>(30);

  const [armInitialRate, setArmInitialRate] = useState<number>(5.5);
  const [armInitialYears, setArmInitialYears] = useState<number>(5);
  const [armAdjRate, setArmAdjRate] = useState<number>(7.5);
  const [armTotalYears, setArmTotalYears] = useState<number>(30);

  const [result, setResult] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      amount <= 0 ||
      fixedRate < 0 ||
      fixedYears <= 0 ||
      armInitialRate < 0 ||
      armInitialYears < 0 ||
      armAdjRate < 0 ||
      armTotalYears <= 0 ||
      armInitialYears > armTotalYears
    ) {
      setResult("Please enter valid, non-negative values for all fields.");
      return;
    }
    const fixed = calcFixedMortgage({
      amount,
      rate: fixedRate,
      years: fixedYears,
    });
    const arm = calcARMMortgage({
      amount,
      initialRate: armInitialRate,
      initialYears: armInitialYears,
      adjRate: armAdjRate,
      totalYears: armTotalYears,
    });

    let recommendation = "";
    if (arm.total < fixed.total) {
      recommendation =
        "The ARM could cost less overall if you move or refinance before the adjustment period ends, but payments may rise after the initial period.";
    } else if (arm.total > fixed.total) {
      recommendation =
        "The fixed-rate mortgage may cost less overall and provides predictable payments.";
    } else {
      recommendation =
        "Both options may have similar total costs. Consider your risk tolerance and how long you plan to stay in the home.";
    }

    setResult(
      `Fixed-Rate Mortgage:
  - Monthly payment: $${fixed.monthly.toLocaleString()}
  - Total paid over ${fixedYears} years: $${fixed.total.toLocaleString()}

Adjustable-Rate Mortgage (ARM):
  - Initial monthly payment: $${arm.initialMonthly.toLocaleString()} for ${armInitialYears} years
  - Adjusted monthly payment: $${arm.adjMonthly.toLocaleString()} for ${
        armTotalYears - armInitialYears
      } years
  - Total paid over ${armTotalYears} years: $${arm.total.toLocaleString()}

${recommendation}`
    );
  };

  return (
    <div className="mx-auto pt-6 sm:pt-12 lg:pt-16 pb-24 lg:pb-32 w-10/12 md:w-11/12">
      <h1>Fixed Rate vs Adjustable Rate Mortgage</h1>
      <h5>Compare Your Mortgage Options</h5>
      <p>
        Use this tool to estimate the monthly payments and total cost of a
        fixed-rate mortgage versus an adjustable-rate mortgage (ARM).
      </p>
      <p className="mt-4">
        This tool provides estimates for informational purposes only. Actual
        rates, payments, and costs may vary. Consult a mortgage professional
        before making decisions.
      </p>
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
        aria-label="Mortgage comparison form"
      >
        <div className="mb-4 pb-4 border-b">
          <Label className="block mb-1 font-semibold">
            Fixed-Rate Mortgage
          </Label>
          <div className="flex gap-2 mb-2">
            <div className="flex-1">
              <Input
                type="number"
                min={0}
                placeholder="Loan Amount ($)"
                value={amount === 0 ? "" : amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="p-2 border border-gray-300 rounded w-full"
                required
              />
            </div>
            <div className="flex-1">
              <Input
                type="number"
                min={0}
                max={100}
                placeholder="Interest Rate (%)"
                value={fixedRate === 0 ? "" : fixedRate}
                onChange={(e) => setFixedRate(Number(e.target.value))}
                className="p-2 border border-gray-300 rounded w-full"
                required
              />
            </div>
            <div className="flex-1">
              <Input
                type="number"
                min={1}
                placeholder="Term (years)"
                value={fixedYears === 0 ? "" : fixedYears}
                onChange={(e) => setFixedYears(Number(e.target.value))}
                className="p-2 border border-gray-300 rounded w-full"
                required
              />
            </div>
          </div>
        </div>
        <div>
          <Label className="block mb-1 font-semibold">
            Adjustable-Rate Mortgage (ARM)
          </Label>
          <div className="flex gap-2 mb-2">
            <div className="flex-1">
              <Input
                type="number"
                min={0}
                max={100}
                placeholder="Initial Rate (%)"
                value={armInitialRate === 0 ? "" : armInitialRate}
                onChange={(e) => setArmInitialRate(Number(e.target.value))}
                className="p-2 border border-gray-300 rounded w-full"
                required
              />
            </div>
            <div className="flex-1">
              <Input
                type="number"
                min={0}
                placeholder="Initial Period (years)"
                value={armInitialYears === 0 ? "" : armInitialYears}
                onChange={(e) => setArmInitialYears(Number(e.target.value))}
                className="p-2 border border-gray-300 rounded w-full"
                required
              />
            </div>
            <div className="flex-1">
              <Input
                type="number"
                min={0}
                max={100}
                placeholder="Adjusted Rate (%)"
                value={armAdjRate === 0 ? "" : armAdjRate}
                onChange={(e) => setArmAdjRate(Number(e.target.value))}
                className="p-2 border border-gray-300 rounded w-full"
                required
              />
            </div>
            <div className="flex-1">
              <Input
                type="number"
                min={1}
                placeholder="Total Term (years)"
                value={armTotalYears === 0 ? "" : armTotalYears}
                onChange={(e) => setArmTotalYears(Number(e.target.value))}
                className="p-2 border border-gray-300 rounded w-full"
                required
              />
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 py-2 rounded focus:ring-2 focus:ring-blue-500 w-full font-semibold text-white focus:outline-none"
        >
          Compare
        </button>
      </form>
      {result && (
        <div
          className="bg-gray-100 mt-6 p-4 border border-gray-300 rounded whitespace-pre-line"
          role="alert"
          aria-live="polite"
        >
          {result}
        </div>
      )}
    </div>
  );
}
