"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
    <div className="mx-auto pb-24 lg:pb-32 pt-6 sm:pt-12 lg:pt-16 w-10/12 md:w-11/12">
      <div className="mb-12 text-center">
        <h1>Debt Consolidation Calculator</h1>
       <h5>
          Compare Your Current Debts to a Consolidation Loan
        </h5>
      <p>
          Use this tool to estimate whether consolidating your debts with a new
          loan could save you money or lower your monthly payment. Enter your
          current debts and the terms of a proposed consolidation loan. This
          tool provides estimates for informational purposes only. Actual loan
          terms and savings may vary. Consult a financial advisor before making
          decisions.
        </p>
      </div>

      {/* Table: Typical Debt & Loan Terms */}
      <div className="my-8">
        <h2>Typical Debt & Loan Terms</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Interest Rate</TableHead>
              <TableHead>Term</TableHead>
              <TableHead>Notes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Credit Card</TableCell>
              <TableCell>16% - 29%</TableCell>
              <TableCell>Open-ended</TableCell>
              <TableCell>Minimum payments can extend payoff</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Personal Loan</TableCell>
              <TableCell>6% - 20%</TableCell>
              <TableCell>12 - 84 months</TableCell>
              <TableCell>Fixed payments, fixed term</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Debt Consolidation Loan</TableCell>
              <TableCell>7% - 15%</TableCell>
              <TableCell>24 - 72 months</TableCell>
              <TableCell>May require good credit</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      {/* Table: Pros and Cons */}
      <div className="my-8">
        <h2>Pros and Cons</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Option</TableHead>
              <TableHead>Pros</TableHead>
              <TableHead>Cons</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Current Debts</TableCell>
              <TableCell>
                <ul className="space-y-1 text-sm list-disc list-inside">
                  <li>No new loan required</li>
                  <li>No origination fees</li>
                  <li>No credit check</li>
                </ul>
              </TableCell>
              <TableCell>
                <ul className="space-y-1 text-sm list-disc list-inside">
                  <li>High interest rates</li>
                  <li>Multiple payments</li>
                  <li>Harder to track progress</li>
                </ul>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Consolidation Loan</TableCell>
              <TableCell>
                <ul className="space-y-1 text-sm list-disc list-inside">
                  <li>Lower interest possible</li>
                  <li>Single payment</li>
                  <li>Fixed payoff date</li>
                </ul>
              </TableCell>
              <TableCell>
                <ul className="space-y-1 text-sm list-disc list-inside">
                  <li>May require good credit</li>
                  <li>Possible fees</li>
                  <li>Longer payoff if term extended</li>
                </ul>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      {/* Table: Typical Fees */}
      <div className="my-8">
        <h2>Typical Fees</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Fee Type</TableHead>
              <TableHead>Range</TableHead>
              <TableHead>Notes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Origination Fee</TableCell>
              <TableCell>0% - 8%</TableCell>
              <TableCell>May be deducted from loan amount</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Prepayment Penalty</TableCell>
              <TableCell>0% - 5%</TableCell>
              <TableCell>Rare for personal loans</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Late Payment Fee</TableCell>
              <TableCell>$15 - $40</TableCell>
              <TableCell>If payment is late</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <div className="shadow-lg mb-8 p-8 border rounded-lg">
        <h2>Calculator</h2>

        {/* Current Debts Section */}
        <div className="mb-8">
          <h3>Current Debts</h3>
          {debts.map((debt, idx) => (
            <div key={idx} className="mb-4 p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium">Debt #{idx + 1}</h4>
                {debts.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeDebt(idx)}
                    className="hover:bg-red-50 text-red-600 hover:text-red-700"
                  >
                    Remove
                  </Button>
                )}
              </div>
              <div className="gap-4 grid grid-cols-1 md:grid-cols-3">
                <div>
                  <Label className="font-medium text-sm">
                    Amount: ${debt.amount.toLocaleString()}
                  </Label>
                  <div className="flex gap-2 items-center mt-2">
                    <Slider
                      min={0}
                      max={100000}
                      step={100}
                      value={[debt.amount]}
                      onValueChange={([v]) =>
                        handleDebtChange(idx, "amount", v)
                      }
                      className="flex-1"
                    />
                    <Input
                      type="number"
                      min={0}
                      placeholder="Amount"
                      value={debt.amount === 0 ? "" : debt.amount}
                      onChange={(e) =>
                        handleDebtChange(idx, "amount", Number(e.target.value))
                      }
                      className="w-24"
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label className="font-medium text-sm">
                    Interest Rate: {debt.interest}%
                  </Label>
                  <div className="flex gap-2 items-center mt-2">
                    <Slider
                      min={0}
                      max={40}
                      step={0.1}
                      value={[debt.interest]}
                      onValueChange={([v]) =>
                        handleDebtChange(idx, "interest", Number(v.toFixed(1)))
                      }
                      className="flex-1"
                    />
                    <Input
                      type="number"
                      min={0}
                      max={100}
                      placeholder="Rate"
                      value={debt.interest === 0 ? "" : debt.interest}
                      onChange={(e) =>
                        handleDebtChange(
                          idx,
                          "interest",
                          Number(e.target.value)
                        )
                      }
                      className="w-24"
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label className="font-medium text-sm">
                    Monthly Payment: ${debt.monthly.toLocaleString()}
                  </Label>
                  <div className="flex gap-2 items-center mt-2">
                    <Slider
                      min={0}
                      max={5000}
                      step={10}
                      value={[debt.monthly]}
                      onValueChange={([v]) =>
                        handleDebtChange(idx, "monthly", v)
                      }
                      className="flex-1"
                    />
                    <Input
                      type="number"
                      min={0}
                      placeholder="Payment"
                      value={debt.monthly === 0 ? "" : debt.monthly}
                      onChange={(e) =>
                        handleDebtChange(idx, "monthly", Number(e.target.value))
                      }
                      className="w-24"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={addDebt}
            className="mt-2"
          >
            + Add Another Debt
          </Button>
        </div>

        {/* Consolidation Loan Section */}
        <div className="mb-6">
          <h3>Consolidation Loan</h3>
          <div className="gap-6 grid grid-cols-1 md:grid-cols-3">
            <div>
              <Label className="font-medium text-sm">
                Loan Amount: ${loanAmount.toLocaleString()}
              </Label>
              <div className="flex gap-4 items-center mt-2">
                <Slider
                  min={0}
                  max={200000}
                  step={100}
                  value={[loanAmount]}
                  onValueChange={([v]) => setLoanAmount(v)}
                  className="flex-1"
                />
                <Input
                  type="number"
                  min={0}
                  placeholder="Loan Amount"
                  value={loanAmount === 0 ? "" : loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-24"
                  required
                />
              </div>
            </div>
            <div>
              <Label className="font-medium text-sm">
                Interest Rate: {loanInterest}%
              </Label>
              <div className="flex gap-4 items-center mt-2">
                <Slider
                  min={0}
                  max={40}
                  step={0.1}
                  value={[loanInterest]}
                  onValueChange={([v]) => setLoanInterest(Number(v.toFixed(1)))}
                  className="flex-1"
                />
                <Input
                  type="number"
                  min={0}
                  max={100}
                  placeholder="Interest Rate"
                  value={loanInterest === 0 ? "" : loanInterest}
                  onChange={(e) => setLoanInterest(Number(e.target.value))}
                  className="w-24"
                  required
                />
              </div>
            </div>
            <div>
              <Label className="font-medium text-sm">
                Term: {loanTerm} months
              </Label>
              <div className="flex gap-4 items-center mt-2">
                <Slider
                  min={1}
                  max={120}
                  step={1}
                  value={[loanTerm]}
                  onValueChange={([v]) => setLoanTerm(v)}
                  className="flex-1"
                />
                <Input
                  type="number"
                  min={1}
                  placeholder="Term"
                  value={loanTerm === 0 ? "" : loanTerm}
                  onChange={(e) => setLoanTerm(Number(e.target.value))}
                  className="w-24"
                  required
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2>Results</h2>

      {/* Winner Banner */}
      {debts.length > 0 &&
        debts.every((d) => d.amount > 0 && d.interest >= 0 && d.monthly > 0) &&
        loanAmount > 0 &&
        loanInterest >= 0 &&
        loanTerm > 0 && (
          <div
            className={`p-4 rounded-lg mb-6 ${
              calculateConsolidationLoan(loanAmount, loanInterest, loanTerm)
                .totalInterest < calculateTotalInterest(debts)
                ? " border "
                : " border "
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3
                  className={` ${
                    calculateConsolidationLoan(
                      loanAmount,
                      loanInterest,
                      loanTerm
                    ).totalInterest < calculateTotalInterest(debts)
                      ? ""
                      : ""
                  }`}
                >
                  {calculateConsolidationLoan(
                    loanAmount,
                    loanInterest,
                    loanTerm
                  ).totalInterest < calculateTotalInterest(debts)
                    ? "Consolidation Loan is Better!"
                    : "Keep Current Debts!"}
                </h3>
                <p
                  className={`text-sm ${
                    calculateConsolidationLoan(
                      loanAmount,
                      loanInterest,
                      loanTerm
                    ).totalInterest < calculateTotalInterest(debts)
                      ? ""
                      : ""
                  }`}
                >
                  {calculateConsolidationLoan(
                    loanAmount,
                    loanInterest,
                    loanTerm
                  ).totalInterest < calculateTotalInterest(debts)
                    ? `Save $${(
                        calculateTotalInterest(debts) -
                        calculateConsolidationLoan(
                          loanAmount,
                          loanInterest,
                          loanTerm
                        ).totalInterest
                      ).toLocaleString()} in total interest`
                    : "Your current debt strategy may be more cost-effective"}
                </p>
              </div>
            </div>
          </div>
        )}

      {/* Comparison Cards */}
      <div className="gap-6 grid grid-cols-1 md:grid-cols-2 mb-8">
        <div className="shadow-sm p-6 border-2 rounded-lg">
          <h3 className="flex gap-2 items-center">📊 Current Debts</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="">Total Debt Amount:</span>
              <span className="font-bold text-lg">
                $
                {debts
                  .reduce((sum, debt) => sum + debt.amount, 0)
                  .toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="">Total Monthly Payment:</span>
              <span className="font-bold">
                $
                {debts
                  .reduce((s, d) => s + (d.monthly > 0 ? d.monthly : 0), 0)
                  .toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="">Estimated Total Interest:</span>
              <span className="font-bold">
                {debts.length === 0 ||
                debts.some(
                  (d) => d.amount <= 0 || d.interest < 0 || d.monthly <= 0
                )
                  ? "—"
                  : `$${calculateTotalInterest(debts).toLocaleString()}`}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="">Number of Payments:</span>
              <span className="font-bold">
                {debts.length} separate payments
              </span>
            </div>
          </div>
        </div>

        <div className="shadow-sm p-6 border-2 rounded-lg">
          <h3 className="flex gap-2 items-center">🏦 Consolidation Loan</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="">Loan Amount:</span>
              <span className="font-bold text-lg">
                ${loanAmount.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="">Monthly Payment:</span>
              <span className="font-bold">
                {loanAmount <= 0 || loanInterest < 0 || loanTerm <= 0
                  ? "—"
                  : `$${calculateConsolidationLoan(
                      loanAmount,
                      loanInterest,
                      loanTerm
                    ).monthly.toLocaleString()}`}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="">Total Interest:</span>
              <span className="font-bold">
                {loanAmount <= 0 || loanInterest < 0 || loanTerm <= 0
                  ? "—"
                  : `$${calculateConsolidationLoan(
                      loanAmount,
                      loanInterest,
                      loanTerm
                    ).totalInterest.toLocaleString()}`}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="">Term:</span>
              <span className="font-bold">
                {loanTerm} months ({Math.round((loanTerm / 12) * 10) / 10}{" "}
                years)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Comparison Table */}
      {debts.length > 0 &&
        debts.every((d) => d.amount > 0 && d.interest >= 0 && d.monthly > 0) &&
        loanAmount > 0 &&
        loanInterest >= 0 &&
        loanTerm > 0 && (
          <div className="shadow mb-8 border rounded-lg overflow-hidden">
            <h3>Detailed Comparison</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Metric</TableHead>
                  <TableHead>Current Debts</TableHead>
                  <TableHead>Consolidation Loan</TableHead>
                  <TableHead>Difference</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Total Amount</TableCell>
                  <TableCell>
                    $
                    {debts
                      .reduce((sum, debt) => sum + debt.amount, 0)
                      .toLocaleString()}
                  </TableCell>
                  <TableCell>${loanAmount.toLocaleString()}</TableCell>
                  <TableCell>
                    {loanAmount >
                    debts.reduce((sum, debt) => sum + debt.amount, 0)
                      ? `$${(
                          loanAmount -
                          debts.reduce((sum, debt) => sum + debt.amount, 0)
                        ).toLocaleString()} extra cash`
                      : loanAmount ===
                        debts.reduce((sum, debt) => sum + debt.amount, 0)
                      ? "Same amount"
                      : `$${(
                          debts.reduce((sum, debt) => sum + debt.amount, 0) -
                          loanAmount
                        ).toLocaleString()} shortfall`}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Monthly Payment</TableCell>
                  <TableCell className="">
                    $
                    {debts
                      .reduce((s, d) => s + (d.monthly > 0 ? d.monthly : 0), 0)
                      .toLocaleString()}
                  </TableCell>
                  <TableCell className="">
                    $
                    {calculateConsolidationLoan(
                      loanAmount,
                      loanInterest,
                      loanTerm
                    ).monthly.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {calculateConsolidationLoan(
                      loanAmount,
                      loanInterest,
                      loanTerm
                    ).monthly < debts.reduce((s, d) => s + d.monthly, 0)
                      ? `$${(
                          debts.reduce((s, d) => s + d.monthly, 0) -
                          calculateConsolidationLoan(
                            loanAmount,
                            loanInterest,
                            loanTerm
                          ).monthly
                        ).toLocaleString()} lower`
                      : `$${(
                          calculateConsolidationLoan(
                            loanAmount,
                            loanInterest,
                            loanTerm
                          ).monthly - debts.reduce((s, d) => s + d.monthly, 0)
                        ).toLocaleString()} higher`}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Total Interest</TableCell>
                  <TableCell className="">
                    ${calculateTotalInterest(debts).toLocaleString()}
                  </TableCell>
                  <TableCell className="">
                    $
                    {calculateConsolidationLoan(
                      loanAmount,
                      loanInterest,
                      loanTerm
                    ).totalInterest.toLocaleString()}
                  </TableCell>
                  <TableCell className="font-bold">
                    {calculateConsolidationLoan(
                      loanAmount,
                      loanInterest,
                      loanTerm
                    ).totalInterest < calculateTotalInterest(debts)
                      ? `$${(
                          calculateTotalInterest(debts) -
                          calculateConsolidationLoan(
                            loanAmount,
                            loanInterest,
                            loanTerm
                          ).totalInterest
                        ).toLocaleString()} savings`
                      : `$${(
                          calculateConsolidationLoan(
                            loanAmount,
                            loanInterest,
                            loanTerm
                          ).totalInterest - calculateTotalInterest(debts)
                        ).toLocaleString()} additional cost`}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Number of Payments</TableCell>
                  <TableCell>{debts.length} separate payments</TableCell>
                  <TableCell>1 consolidated payment</TableCell>
                  <TableCell>Simplified to single payment</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        )}

      {/* Recommendation Banner */}
      {result && (
        <div className="mb-8 p-6 border rounded-lg">
          <h3>💡 Recommendation</h3>
          <div className="">{result.split("\n").slice(-1).join("")}</div>
        </div>
      )}

      {/* Important Considerations */}
      <div className="mb-8 p-6 border rounded-lg">
        <h3>⚠️ Important Considerations</h3>
        <ul className="space-y-2">
          <li>
            Consolidation loans typically require good to excellent credit for
            the best rates
          </li>
          <li>
            Consider origination fees (0% - 8% of loan amount) when comparing
            total costs
          </li>
          <li>
            Closing multiple credit accounts may temporarily affect your credit
            score
          </li>
          <li>Avoid accumulating new debt on the cards you've paid off</li>
          <li>
            Shop around with multiple lenders to find the best rates and terms
          </li>
          <li>
            Consider the psychological benefit of having just one payment to
            manage
          </li>
        </ul>
      </div>
      <section className="p-6 border rounded-lg">
        <h2>📋 Disclaimer</h2>
        <p className="leading-relaxed">
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
