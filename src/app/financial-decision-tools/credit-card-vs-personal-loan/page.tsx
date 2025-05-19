"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
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
    <div className="mx-auto pt-6 sm:pt-12 lg:pt-16 pb-24 lg:pb-32 w-10/12 md:w-11/12">
      <h1>Credit Card vs Personal Loan Payoff Calculator</h1>
      <h5>Make informed decisions about your debt repayment strategy</h5>
      <p>
        This calculator helps you compare the total cost and time to pay off
        your credit card debt using a personal loan vs. continuing to pay the
        credit card minimum. Please fill out the form below to see the results.
      </p>

      {/* Table: Typical Terms */}
      <div className="my-8">
        <h2>Typical Terms</h2>
        <div className="overflow-x-auto">
          <table className="border border-gray-300 min-w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-3 py-2 border text-left">Product</th>
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
                  Minimum payment required monthly
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Personal Loan</td>
                <td className="px-3 py-2 border">6% - 20%</td>
                <td className="px-3 py-2 border">12 - 84 months</td>
                <td className="px-3 py-2 border">Fixed payments, fixed term</td>
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
                <td className="px-3 py-2 border">Credit Card</td>
                <td className="px-3 py-2 border">
                  Flexible payments
                  <br />
                  No new loan required
                  <br />
                  Widely available
                </td>
                <td className="px-3 py-2 border">
                  High interest rates
                  <br />
                  Can take decades to pay off
                  <br />
                  Minimum payments may barely reduce balance
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Personal Loan</td>
                <td className="px-3 py-2 border">
                  Lower interest rate possible
                  <br />
                  Fixed payoff schedule
                  <br />
                  May reduce total interest paid
                </td>
                <td className="px-3 py-2 border">
                  Requires good credit
                  <br />
                  Origination fees possible
                  <br />
                  New account required
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <form className="mt-5">
        <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 mb-8">
          <div>
            <Label>Debt Amount ($)</Label>
            <div className="flex items-center gap-4">
              <Slider
                min={1000}
                max={100000}
                step={500}
                value={[debt]}
                onValueChange={([v]) => setDebt(v)}
                className="w-2/3"
              />
              <Input
                type="number"
                value={debt}
                min={0}
                onChange={(e) => setDebt(Number(e.target.value))}
                className="w-1/3"
              />
            </div>
          </div>
          <div>
            <Label>Credit Card Interest Rate (% APR)</Label>
            <div className="flex items-center gap-4">
              <Slider
                min={0}
                max={40}
                step={0.1}
                value={[ccRate]}
                onValueChange={([v]) => setCcRate(Number(v.toFixed(1)))}
                className="w-2/3"
              />
              <Input
                type="number"
                value={ccRate}
                min={0}
                step={0.1}
                onChange={(e) => setCcRate(Number(e.target.value))}
                className="w-1/3"
              />
            </div>
          </div>
          <div>
            <Label>Minimum Payment (% of balance)</Label>
            <div className="flex items-center gap-4">
              <Slider
                min={1}
                max={10}
                step={0.1}
                value={[minPaymentPct]}
                onValueChange={([v]) => setMinPaymentPct(Number(v.toFixed(1)))}
                className="w-2/3"
              />
              <Input
                type="number"
                value={minPaymentPct}
                min={1}
                max={100}
                step={0.1}
                onChange={(e) => setMinPaymentPct(Number(e.target.value))}
                className="w-1/3"
              />
            </div>
          </div>
        </div>
        <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 mb-8">
          <div>
            <Label>Personal Loan Interest Rate (% APR)</Label>
            <div className="flex items-center gap-4">
              <Slider
                min={0}
                max={20}
                step={0.1}
                value={[loanRate]}
                onValueChange={([v]) => setLoanRate(Number(v.toFixed(1)))}
                className="w-2/3"
              />
              <Input
                type="number"
                value={loanRate}
                min={0}
                step={0.1}
                onChange={(e) => setLoanRate(Number(e.target.value))}
                className="w-1/3"
              />
            </div>
          </div>
          <div>
            <Label>Loan Term (months)</Label>
            <div className="flex items-center gap-4">
              <Slider
                min={12}
                max={120}
                step={1}
                value={[loanTerm]}
                onValueChange={([v]) => setLoanTerm(v)}
                className="w-2/3"
              />
              <Input
                type="number"
                value={loanTerm}
                min={1}
                max={120}
                onChange={(e) => setLoanTerm(Number(e.target.value))}
                className="w-1/3"
              />
            </div>
          </div>
        </div>
      </form>
      <h2>Results</h2>
      <div className="gap-6 grid grid-cols-1 md:grid-cols-2 mt-3">
        <div className="bg-white shadow p-5 border border-gray-300 rounded-lg">
          <h3 className="flex items-center gap-2 mb-2 font-semibold text-blue-700 text-lg">
            Credit Card
          </h3>
          <ul>
            <li>
              <span className="text-gray-700">Total Paid:</span>{" "}
              <strong className="text-blue-900">
                $
                {cc.totalPaid.toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })}
              </strong>
            </li>
            <li>
              <span className="text-gray-700">Months to Payoff:</span>{" "}
              <strong className="text-blue-900">{cc.months}</strong>
            </li>
          </ul>
        </div>
        <div className="bg-white shadow p-5 border border-gray-300 rounded-lg">
          <h3 className="flex items-center gap-2 mb-2 font-semibold text-green-700 text-lg">
            Personal Loan
          </h3>
          <ul>
            <li>
              <span className="text-gray-700">Total Paid:</span>{" "}
              <strong className="text-green-900">
                $
                {loan.totalPaid.toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })}
              </strong>
            </li>
            <li>
              <span className="text-gray-700">Months to Payoff:</span>{" "}
              <strong className="text-green-900">{loan.months}</strong>
            </li>
          </ul>
        </div>
      </div>
      <p style={{ marginTop: 24, color: "#666" }}>
        Note: This calculator assumes no new charges on the credit card and
        fixed payments for the personal loan.
      </p>
    </div>
  );
};

export default CreditCardVsPersonalLoan;
