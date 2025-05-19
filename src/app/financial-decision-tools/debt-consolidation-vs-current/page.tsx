"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";

type Debt = {
  amount: number;
  interest: number;
  monthly: number;
};

function calculateTotalInterest(debts: Debt[]): number {
  // Simple estimation: sum of interest paid if paid at current monthly payment until paid off
  let totalInterest = 0;
  debts.forEach(({ amount, interest, monthly }) => {
    let balance = amount;
    let totalPaid = 0;
    let months = 0;
    const monthlyRate = interest / 100 / 12;
    while (balance > 0 && months < 600) {
      const interestPortion = balance * monthlyRate;
      const principalPortion = Math.max(monthly - interestPortion, 0);
      balance -= principalPortion;
      totalPaid += monthly;
      months++;
      if (principalPortion <= 0) break; // avoid infinite loop
    }
    totalInterest += Math.max(totalPaid - amount, 0);
  });
  return Math.round(totalInterest);
}

function calculateConsolidationLoan(
  totalAmount: number,
  interest: number,
  termMonths: number
): { monthly: number; totalInterest: number } {
  // Standard loan amortization formula
  const monthlyRate = interest / 100 / 12;
  const monthly =
    monthlyRate === 0
      ? totalAmount / termMonths
      : (totalAmount * monthlyRate) /
        (1 - Math.pow(1 + monthlyRate, -termMonths));
  const totalPaid = monthly * termMonths;
  const totalInterest = Math.max(totalPaid - totalAmount, 0);
  return {
    monthly: Math.round(monthly),
    totalInterest: Math.round(totalInterest),
  };
}

export default function DebtConsolidationVsCurrent() {
  const [debts, setDebts] = useState<Debt[]>([
    { amount: 5000, interest: 18, monthly: 150 },
  ]);
  const [loanAmount, setLoanAmount] = useState<number>(5000);
  const [loanInterest, setLoanInterest] = useState<number>(8);
  const [loanTerm, setLoanTerm] = useState<number>(36);
  const [result, setResult] = useState<string>("");

  const handleDebtChange = (idx: number, field: keyof Debt, value: number) => {
    const updated = debts.map((d, i) =>
      i === idx ? { ...d, [field]: value } : d
    );
    setDebts(updated);
  };

  const addDebt = () =>
    setDebts([...debts, { amount: 0, interest: 0, monthly: 0 }]);
  const removeDebt = (idx: number) =>
    setDebts(debts.filter((_, i) => i !== idx));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      debts.length === 0 ||
      debts.some((d) => d.amount <= 0 || d.interest < 0 || d.monthly <= 0)
    ) {
      setResult("Please enter valid values for all current debts.");
      return;
    }
    if (loanAmount <= 0 || loanInterest < 0 || loanTerm <= 0) {
      setResult("Please enter valid values for the consolidation loan.");
      return;
    }
    const totalCurrentInterest = calculateTotalInterest(debts);
    const { monthly, totalInterest } = calculateConsolidationLoan(
      loanAmount,
      loanInterest,
      loanTerm
    );
    let recommendation = "";
    if (
      totalInterest < totalCurrentInterest &&
      monthly <= debts.reduce((s, d) => s + d.monthly, 0)
    ) {
      recommendation =
        "A debt consolidation loan could save you money and lower your monthly payment.";
    } else if (totalInterest < totalCurrentInterest) {
      recommendation =
        "A debt consolidation loan could save you money in total interest, but your monthly payment may be higher.";
    } else {
      recommendation =
        "A debt consolidation loan may not save you money compared to your current debts.";
    }
    setResult(
      `Current Debts: Estimated total interest = $${totalCurrentInterest.toLocaleString()}
Consolidation Loan: Estimated total interest = $${totalInterest.toLocaleString()}, Monthly payment = $${monthly.toLocaleString()}
${recommendation}`
    );
  };

  return (
    <div className="mx-auto pt-6 sm:pt-12 lg:pt-16 pb-24 lg:pb-32 w-10/12 md:w-11/12">
      <h1>Debt Consolidation Loan vs Current Debts</h1>
      <h5>Compare Your Current Debts to a Consolidation Loan</h5>
      <p>
        Use this tool to estimate whether consolidating your debts with a new
        loan could save you money or lower your monthly payment. Enter your
        current debts and the terms of a proposed consolidation loan. This tool
        provides estimates for informational purposes only. Actual loan terms
        and savings may vary. Consult a financial advisor before making
        decisions.
      </p>
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
        aria-label="Debt consolidation comparison form"
      >
        <div>
          <Label className="block mb-1 font-semibold">Current Debts</Label>
          {debts.map((debt, idx) => (
            <div key={idx} className="flex items-end gap-2 mb-2">
              <div className="flex-1">
                <Input
                  type="number"
                  min={0}
                  placeholder="Amount ($)"
                  value={debt.amount === 0 ? "" : debt.amount}
                  onChange={(e) =>
                    handleDebtChange(idx, "amount", Number(e.target.value))
                  }
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
                  value={debt.interest === 0 ? "" : debt.interest}
                  onChange={(e) =>
                    handleDebtChange(idx, "interest", Number(e.target.value))
                  }
                  className="p-2 border border-gray-300 rounded w-full"
                  required
                />
              </div>
              <div className="flex-1">
                <Input
                  type="number"
                  min={0}
                  placeholder="Monthly Payment ($)"
                  value={debt.monthly === 0 ? "" : debt.monthly}
                  onChange={(e) =>
                    handleDebtChange(idx, "monthly", Number(e.target.value))
                  }
                  className="p-2 border border-gray-300 rounded w-full"
                  required
                />
              </div>
              {debts.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeDebt(idx)}
                  className="px-2 font-bold text-red-600"
                  aria-label="Remove debt"
                >
                  ×
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addDebt}
            className="mt-1 text-blue-600 text-sm underline"
          >
            + Add another debt
          </button>
        </div>
        <div>
          <Label className="block mb-1 font-semibold">Consolidation Loan</Label>
          <div className="flex gap-2">
            <div className="flex-1">
              <Input
                type="number"
                min={0}
                placeholder="Loan Amount ($)"
                value={loanAmount === 0 ? "" : loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
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
                value={loanInterest === 0 ? "" : loanInterest}
                onChange={(e) => setLoanInterest(Number(e.target.value))}
                className="p-2 border border-gray-300 rounded w-full"
                required
              />
            </div>
            <div className="flex-1">
              <Input
                type="number"
                min={1}
                placeholder="Term (months)"
                value={loanTerm === 0 ? "" : loanTerm}
                onChange={(e) => setLoanTerm(Number(e.target.value))}
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
