"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
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

  // Auto-calculate result as inputs change
  React.useEffect(() => {
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
  }, [debts, loanAmount, loanInterest, loanTerm]);

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

      {/* Table: Typical Debt & Loan Terms */}
      <div className="my-8">
        <h2>Typical Debt & Loan Terms</h2>
        <div className="overflow-x-auto">
          <table className="border border-gray-300 min-w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-3 py-2 border text-left">Type</th>
                <th className="px-3 py-2 border text-left">Interest Rate</th>
                <th className="px-3 py-2 border text-left">Term</th>
                <th className="px-3 py-2 border text-left">Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-3 py-2 border">Credit Card</td>
                <td className="px-3 py-2 border">16% - 29%</td>
                <td className="px-3 py-2 border">Open-ended</td>
                <td className="px-3 py-2 border">
                  Minimum payments can extend payoff
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Personal Loan</td>
                <td className="px-3 py-2 border">6% - 20%</td>
                <td className="px-3 py-2 border">12 - 84 months</td>
                <td className="px-3 py-2 border">Fixed payments, fixed term</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Debt Consolidation Loan</td>
                <td className="px-3 py-2 border">7% - 15%</td>
                <td className="px-3 py-2 border">24 - 72 months</td>
                <td className="px-3 py-2 border">May require good credit</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Table: Pros and Cons */}
      <div className="my-8">
        <h2>Pros and Cons</h2>
        <div className="overflow-x-auto">
          <table className="border border-gray-300 min-w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-3 py-2 border text-left">Option</th>
                <th className="px-3 py-2 border text-left">Pros</th>
                <th className="px-3 py-2 border text-left">Cons</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-3 py-2 border">Current Debts</td>
                <td className="px-3 py-2 border">
                  No new loan required
                  <br />
                  No origination fees
                  <br />
                  No credit check
                </td>
                <td className="px-3 py-2 border">
                  High interest rates
                  <br />
                  Multiple payments
                  <br />
                  Harder to track progress
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Consolidation Loan</td>
                <td className="px-3 py-2 border">
                  Lower interest possible
                  <br />
                  Single payment
                  <br />
                  Fixed payoff date
                </td>
                <td className="px-3 py-2 border">
                  May require good credit
                  <br />
                  Possible fees
                  <br />
                  Longer payoff if term extended
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Table: Typical Fees */}
      <div className="my-8">
        <h2>Typical Fees</h2>
        <div className="overflow-x-auto">
          <table className="border border-gray-300 min-w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-3 py-2 border text-left">Fee Type</th>
                <th className="px-3 py-2 border text-left">Range</th>
                <th className="px-3 py-2 border text-left">Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-3 py-2 border">Origination Fee</td>
                <td className="px-3 py-2 border">0% - 8%</td>
                <td className="px-3 py-2 border">
                  May be deducted from loan amount
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Prepayment Penalty</td>
                <td className="px-3 py-2 border">0% - 5%</td>
                <td className="px-3 py-2 border">Rare for personal loans</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Late Payment Fee</td>
                <td className="px-3 py-2 border">$15 - $40</td>
                <td className="px-3 py-2 border">If payment is late</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <form
        className="space-y-5 mt-5"
        aria-label="Debt consolidation comparison form"
      >
        <div>
          <h3>Current Debts</h3>
          {debts.map((debt, idx) => (
            <div key={idx} className="flex items-end gap-2 mb-2">
              <div className="flex-1">
                <Label className="block mb-1">Debt Amount ($)</Label>
                <div className="flex gap-2">
                  <Slider
                    min={0}
                    max={100000}
                    step={100}
                    value={[debt.amount]}
                    onValueChange={([v]) => handleDebtChange(idx, "amount", v)}
                    className="w-2/3"
                  />
                  <Input
                    type="number"
                    min={0}
                    placeholder="Amount ($)"
                    value={debt.amount === 0 ? "" : debt.amount}
                    onChange={(e) =>
                      handleDebtChange(idx, "amount", Number(e.target.value))
                    }
                    className="w-1/3"
                    required
                  />
                </div>
              </div>
              <div className="flex-1">
                <Label className="block mb-1">Interest Rate (%)</Label>
                <div className="flex gap-2">
                  <Slider
                    min={0}
                    max={40}
                    step={0.1}
                    value={[debt.interest]}
                    onValueChange={([v]) =>
                      handleDebtChange(idx, "interest", Number(v.toFixed(1)))
                    }
                    className="w-2/3"
                  />
                  <Input
                    type="number"
                    min={0}
                    max={100}
                    placeholder="Interest Rate (%)"
                    value={debt.interest === 0 ? "" : debt.interest}
                    onChange={(e) =>
                      handleDebtChange(idx, "interest", Number(e.target.value))
                    }
                    className="w-1/3"
                    required
                  />
                </div>
              </div>
              <div className="flex-1">
                <Label className="block mb-1">Monthly Payment</Label>
                <div className="flex gap-2">
                  <Slider
                    min={0}
                    max={5000}
                    step={10}
                    value={[debt.monthly]}
                    onValueChange={([v]) => handleDebtChange(idx, "monthly", v)}
                    className="w-2/3"
                  />
                  <Input
                    type="number"
                    min={0}
                    placeholder="Monthly Payment ($)"
                    value={debt.monthly === 0 ? "" : debt.monthly}
                    onChange={(e) =>
                      handleDebtChange(idx, "monthly", Number(e.target.value))
                    }
                    className="w-1/3"
                    required
                  />
                </div>
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
          <h3>Consolidation Loan</h3>
          <div className="flex gap-2">
            <div className="flex-1">
              <Label className="block mb-1">Loan Amount ($)</Label>
              <div className="flex gap-2">
                {" "}
                <Slider
                  min={0}
                  max={200000}
                  step={100}
                  value={[loanAmount]}
                  onValueChange={([v]) => setLoanAmount(v)}
                  className="w-2/3"
                />
                <Input
                  type="number"
                  min={0}
                  placeholder="Loan Amount ($)"
                  value={loanAmount === 0 ? "" : loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-1/3"
                  required
                />
              </div>
            </div>
            <div className="flex-1">
              <Label className="block mb-1">Interest Rate (%)</Label>
              <div className="flex gap-2">
                <Slider
                  min={0}
                  max={40}
                  step={0.1}
                  value={[loanInterest]}
                  onValueChange={([v]) => setLoanInterest(Number(v.toFixed(1)))}
                  className="w-2/3"
                />
                <Input
                  type="number"
                  min={0}
                  max={100}
                  placeholder="Interest Rate (%)"
                  value={loanInterest === 0 ? "" : loanInterest}
                  onChange={(e) => setLoanInterest(Number(e.target.value))}
                  className="w-1/3"
                  required
                />
              </div>
            </div>
            <div className="flex-1">
              <Label className="block mb-1">Term (months)</Label>
              <div className="flex gap-2">
                <Slider
                  min={1}
                  max={120}
                  step={1}
                  value={[loanTerm]}
                  onValueChange={([v]) => setLoanTerm(v)}
                  className="w-2/3"
                />
                <Input
                  type="number"
                  min={1}
                  placeholder="Term (months)"
                  value={loanTerm === 0 ? "" : loanTerm}
                  onChange={(e) => setLoanTerm(Number(e.target.value))}
                  className="w-1/3"
                  required
                />
              </div>
            </div>
          </div>
        </div>
        {/* No compare button */}
      </form>

      {/* Card-like results display */}
      <div className="gap-6 grid grid-cols-1 md:grid-cols-2 mt-8">
        <div className="bg-white shadow p-5 border border-gray-300 rounded-lg">
          <h3 className="flex items-center gap-2 mb-2 font-semibold text-blue-700 text-lg">
            Current Debts
          </h3>
          <ul>
            <li>
              <span className="text-gray-700">Estimated Total Interest:</span>{" "}
              <strong className="text-blue-900">
                $
                {debts.length === 0 ||
                debts.some(
                  (d) => d.amount <= 0 || d.interest < 0 || d.monthly <= 0
                )
                  ? "—"
                  : calculateTotalInterest(debts).toLocaleString()}
              </strong>
            </li>
            <li>
              <span className="text-gray-700">Total Monthly Payment:</span>{" "}
              <strong className="text-blue-900">
                $
                {debts
                  .reduce((s, d) => s + (d.monthly > 0 ? d.monthly : 0), 0)
                  .toLocaleString()}
              </strong>
            </li>
          </ul>
        </div>
        <div className="bg-white shadow p-5 border border-gray-300 rounded-lg">
          <h3 className="flex items-center gap-2 mb-2 font-semibold text-green-700 text-lg">
            Consolidation Loan
          </h3>
          <ul>
            <li>
              <span className="text-gray-700">Estimated Total Interest:</span>{" "}
              <strong className="text-green-900">
                {loanAmount <= 0 || loanInterest < 0 || loanTerm <= 0
                  ? "—"
                  : `$${calculateConsolidationLoan(
                      loanAmount,
                      loanInterest,
                      loanTerm
                    ).totalInterest.toLocaleString()}`}
              </strong>
            </li>
            <li>
              <span className="text-gray-700">Monthly Payment:</span>{" "}
              <strong className="text-green-900">
                {loanAmount <= 0 || loanInterest < 0 || loanTerm <= 0
                  ? "—"
                  : `$${calculateConsolidationLoan(
                      loanAmount,
                      loanInterest,
                      loanTerm
                    ).monthly.toLocaleString()}`}
              </strong>
            </li>
          </ul>
        </div>
      </div>
      {/* Recommendation */}
      <div className="mt-6">
        <div className="bg-blue-50 p-4 border border-blue-200 rounded text-blue-900">
          <strong>Recommendation:</strong>
          <div className="mt-1">
            {result && result.split("\n").slice(-1).join("")}
          </div>
        </div>
      </div>
      <section className="mt-8">
        <h2>Disclaimer</h2>
        <p>
          This tool provides estimates for informational purposes only. Actual
          rates, payments, and savings may vary. Consult a financial advisor
          before making decisions. The results are based on the inputs you
          provided and do not take into account other factors that may affect
          your options, such as credit score, lender policies, or changes in
          rates. Please use this tool as a starting point for your research and
          consult a financial advisor for personalized advice.
        </p>
      </section>
    </div>
  );
}
