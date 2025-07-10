"use client";

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

const CreditCardVsPersonalLoan: React.FC = () => {
  const [debt, setDebt] = useState(10000);
  const [ccRate, setCcRate] = useState(22);
  const [minPaymentPct, setMinPaymentPct] = useState(2);
  const [loanRate, setLoanRate] = useState(10);
  const [loanTerm, setLoanTerm] = useState(36);

  // Credit Card payoff simulation (minimum payment, no new charges)
  function calcCreditCard() {
    let balance = debt;
    let totalPaid = 0;
    let months = 0;
    const minPaymentFloor = 25;
    while (balance > 0 && months < 600) {
      const interest = (balance * ccRate) / 100 / 12;
      let payment = Math.max((minPaymentPct / 100) * balance, minPaymentFloor);
      if (payment > balance + interest) payment = balance + interest;
      balance = balance + interest - payment;
      totalPaid += payment;
      months++;
      if (balance < 0.01) break;
    }
    return { totalPaid, months };
  }

  // Personal loan calculation (fixed payment)
  function calcPersonalLoan() {
    const monthlyRate = loanRate / 100 / 12;
    const n = loanTerm;
    const payment = (debt * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -n));
    const totalPaid = payment * n;
    return { totalPaid, months: n };
  }

  const cc = calcCreditCard();
  const loan = calcPersonalLoan();

  return (
    <div className="mx-auto pb-24 lg:pb-32 pt-6 sm:pt-12 lg:pt-16 w-10/12 md:w-11/12">
      <div className="mb-12 text-center">
        <h1>Credit Card vs Personal Loan Calculator</h1>
        <h5>Make informed decisions about your debt repayment strategy</h5>
        <p>
          This calculator helps you compare the total cost and time to pay off
          your credit card debt using a personal loan vs. continuing to pay the
          credit card minimum. Please fill out the form below to see the
          results.
        </p>
      </div>

      {/* Table: Typical Terms */}
      <div className="my-8">
        <h2>Typical Terms</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
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
              <TableCell>Minimum payment required monthly</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Personal Loan</TableCell>
              <TableCell>6% - 20%</TableCell>
              <TableCell>12 - 84 months</TableCell>
              <TableCell>Fixed payments, fixed term</TableCell>
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
              <TableCell>Credit Card</TableCell>
              <TableCell>
                <ul className="space-y-1 text-sm list-disc list-inside">
                  <li>Flexible payments</li>
                  <li>No new loan required</li>
                  <li>Widely available</li>
                </ul>
              </TableCell>
              <TableCell>
                <ul className="space-y-1 text-sm list-disc list-inside">
                  <li>High interest rates</li>
                  <li>Can take decades to pay off</li>
                  <li>Minimum payments may barely reduce balance</li>
                </ul>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Personal Loan</TableCell>
              <TableCell>
                <ul className="space-y-1 text-sm list-disc list-inside">
                  <li>Lower interest rate possible</li>
                  <li>Fixed payoff schedule</li>
                  <li>May reduce total interest paid</li>
                </ul>
              </TableCell>
              <TableCell>
                <ul className="space-y-1 text-sm list-disc list-inside">
                  <li>Requires good credit</li>
                  <li>Origination fees possible</li>
                  <li>New account required</li>
                </ul>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <div className="shadow-lg mb-8 p-8 border rounded-lg">
        <h2>Calculator</h2>

        {/* Debt Information */}
        <div className="mb-8">
          <h3>Debt Information</h3>
          <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
            <div>
              <Label className="font-medium text-sm">
                Debt Amount: ${debt.toLocaleString()}
              </Label>
              <div className="flex gap-4 items-center mt-2">
                <Slider
                  min={1000}
                  max={100000}
                  step={500}
                  value={[debt]}
                  onValueChange={([v]) => setDebt(v)}
                  className="flex-1"
                />
                <Input
                  type="number"
                  value={debt}
                  min={0}
                  onChange={(e) => setDebt(Number(e.target.value))}
                  className="w-24"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Credit Card Information */}
        <div className="mb-8">
          <h3>Credit Card Information</h3>
          <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
            <div>
              <Label className="font-medium text-sm">
                Interest Rate: {ccRate}% APR
              </Label>
              <div className="flex gap-4 items-center mt-2">
                <Slider
                  min={0}
                  max={40}
                  step={0.1}
                  value={[ccRate]}
                  onValueChange={([v]) => setCcRate(Number(v.toFixed(1)))}
                  className="flex-1"
                />
                <Input
                  type="number"
                  value={ccRate}
                  min={0}
                  step={0.1}
                  onChange={(e) => setCcRate(Number(e.target.value))}
                  className="w-24"
                />
              </div>
            </div>
            <div>
              <Label className="font-medium text-sm">
                Minimum Payment: {minPaymentPct}% of balance
              </Label>
              <div className="flex gap-4 items-center mt-2">
                <Slider
                  min={1}
                  max={10}
                  step={0.1}
                  value={[minPaymentPct]}
                  onValueChange={([v]) =>
                    setMinPaymentPct(Number(v.toFixed(1)))
                  }
                  className="flex-1"
                />
                <Input
                  type="number"
                  value={minPaymentPct}
                  min={1}
                  max={100}
                  step={0.1}
                  onChange={(e) => setMinPaymentPct(Number(e.target.value))}
                  className="w-24"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Personal Loan Information */}
        <div className="mb-6">
          <h3>Personal Loan Information</h3>
          <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
            <div>
              <Label className="font-medium text-sm">
                Interest Rate: {loanRate}% APR
              </Label>
              <div className="flex gap-4 items-center mt-2">
                <Slider
                  min={0}
                  max={20}
                  step={0.1}
                  value={[loanRate]}
                  onValueChange={([v]) => setLoanRate(Number(v.toFixed(1)))}
                  className="flex-1"
                />
                <Input
                  type="number"
                  value={loanRate}
                  min={0}
                  step={0.1}
                  onChange={(e) => setLoanRate(Number(e.target.value))}
                  className="w-24"
                />
              </div>
            </div>
            <div>
              <Label className="font-medium text-sm">
                Term: {loanTerm} months
              </Label>
              <div className="flex gap-4 items-center mt-2">
                <Slider
                  min={12}
                  max={120}
                  step={1}
                  value={[loanTerm]}
                  onValueChange={([v]) => setLoanTerm(v)}
                  className="flex-1"
                />
                <Input
                  type="number"
                  value={loanTerm}
                  min={1}
                  max={120}
                  onChange={(e) => setLoanTerm(Number(e.target.value))}
                  className="w-24"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <h2>Results</h2>

      {/* Winner Banner */}
      {cc.totalPaid !== loan.totalPaid && (
        <div
          className={`p-4 rounded-lg mb-6 ${
            loan.totalPaid < cc.totalPaid ? " border " : " border "
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className={` ${loan.totalPaid < cc.totalPaid ? "" : ""}`}>
                {loan.totalPaid < cc.totalPaid
                  ? "Personal Loan is Better!"
                  : "Credit Card is Better!"}
              </h3>
              <p
                className={`text-sm ${loan.totalPaid < cc.totalPaid ? "" : ""}`}
              >
                Save $
                {Math.abs(cc.totalPaid - loan.totalPaid).toLocaleString(
                  undefined,
                  { maximumFractionDigits: 0 }
                )}
                {loan.totalPaid < cc.totalPaid
                  ? " and pay off " +
                    (cc.months - loan.months) +
                    " months faster"
                  : " with more flexible payments"}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Comparison Cards */}
      <div className="gap-6 grid grid-cols-1 md:grid-cols-2 mb-8">
        <div className="shadow-sm p-6 border-2 rounded-lg">
          <h3 className="flex gap-2 items-center mb-4">💳 Credit Card</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="">Total Amount Paid:</span>
              <span className="font-bold text-lg">
                $
                {cc.totalPaid.toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="">Time to Pay Off:</span>
              <span className="font-bold">
                {cc.months} months ({Math.round((cc.months / 12) * 10) / 10}{" "}
                years)
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="">Total Interest:</span>
              <span className="font-bold">
                $
                {(cc.totalPaid - debt).toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })}
              </span>
            </div>
          </div>
        </div>

        <div className="shadow-sm p-6 border-2 rounded-lg">
          <h3 className="flex gap-2 items-center mb-4">🏦 Personal Loan</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="">Total Amount Paid:</span>
              <span className="font-bold text-lg">
                $
                {loan.totalPaid.toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="">Time to Pay Off:</span>
              <span className="font-bold">
                {loan.months} months ({Math.round((loan.months / 12) * 10) / 10}{" "}
                years)
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="">Total Interest:</span>
              <span className="font-bold">
                $
                {(loan.totalPaid - debt).toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Comparison Table */}
      <div className="shadow mb-8 border rounded-lg overflow-hidden">
        <h3>Detailed Comparison</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Metric</TableHead>
              <TableHead className="">Credit Card</TableHead>
              <TableHead className="">Personal Loan</TableHead>
              <TableHead>Difference</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Initial Debt</TableCell>
              <TableCell>${debt.toLocaleString()}</TableCell>
              <TableCell>${debt.toLocaleString()}</TableCell>
              <TableCell>-</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Interest Rate</TableCell>
              <TableCell>{ccRate}% APR</TableCell>
              <TableCell>{loanRate}% APR</TableCell>
              <TableCell>{(ccRate - loanRate).toFixed(1)}% higher</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Monthly Payment</TableCell>
              <TableCell>
                ~${Math.round((debt * minPaymentPct) / 100)} (initial)
              </TableCell>
              <TableCell>
                ${Math.round(loan.totalPaid / loan.months)} (fixed)
              </TableCell>
              <TableCell>-</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Payoff Time</TableCell>
              <TableCell className="">{cc.months} months</TableCell>
              <TableCell className="">{loan.months} months</TableCell>
              <TableCell>
                {Math.abs(cc.months - loan.months)} months{" "}
                {cc.months > loan.months ? "longer" : "shorter"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Total Interest</TableCell>
              <TableCell className="">
                $
                {(cc.totalPaid - debt).toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })}
              </TableCell>
              <TableCell className="">
                $
                {(loan.totalPaid - debt).toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })}
              </TableCell>
              <TableCell>
                $
                {Math.abs(cc.totalPaid - loan.totalPaid).toLocaleString(
                  undefined,
                  { maximumFractionDigits: 0 }
                )}
                {cc.totalPaid > loan.totalPaid ? " more" : " less"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Total Cost</TableCell>
              <TableCell className="font-bold text-lg">
                $
                {cc.totalPaid.toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })}
              </TableCell>
              <TableCell className="font-bold text-lg">
                $
                {loan.totalPaid.toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })}
              </TableCell>
              <TableCell className="font-bold">
                $
                {Math.abs(cc.totalPaid - loan.totalPaid).toLocaleString(
                  undefined,
                  { maximumFractionDigits: 0 }
                )}
                {cc.totalPaid > loan.totalPaid
                  ? " savings"
                  : " additional cost"}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      {/* Important Considerations */}
      <div className="p-6 border rounded-lg">
        <h3>⚠️ Important Considerations</h3>
        <ul className="space-y-2">
          <li>
            Personal loans typically require good credit for the best rates
          </li>
          <li>
            Some personal loans may have origination fees (0.99% - 8% of loan
            amount)
          </li>
          <li>
            Credit cards offer payment flexibility that personal loans do not
          </li>
          <li>This calculation assumes no new charges on the credit card</li>
          <li>
            Personal loan rates and terms vary significantly by lender and
            credit profile
          </li>
          <li>
            Consider the psychological benefit of having a fixed payoff date
            with personal loans
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CreditCardVsPersonalLoan;
