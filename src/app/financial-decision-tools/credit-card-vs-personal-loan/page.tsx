"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

      <form onSubmit={(e) => e.preventDefault()} className="mt-5">
        <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 mb-8">
          <div>
            <Label>Debt Amount ($)</Label>
            <Input
              type="number"
              value={debt}
              min={0}
              onChange={(e) => setDebt(Number(e.target.value))}
            />
          </div>

          <div>
            <Label>Credit Card Interest Rate (% APR)</Label>
            <Input
              type="number"
              value={ccRate}
              min={0}
              step={0.1}
              onChange={(e) => setCcRate(Number(e.target.value))}
            />
          </div>

          <div>
            <Label>Minimum Payment (% of balance)</Label>
            <Input
              type="number"
              value={minPaymentPct}
              min={1}
              max={100}
              step={0.1}
              onChange={(e) => setMinPaymentPct(Number(e.target.value))}
            />
          </div>
        </div>
        <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 mb-8">
          <div>
            <Label>Personal Loan Interest Rate (% APR)</Label>
            <Input
              type="number"
              value={loanRate}
              min={0}
              step={0.1}
              onChange={(e) => setLoanRate(Number(e.target.value))}
            />
          </div>

          <div>
            <Label>Loan Term (months)</Label>
            <Input
              type="number"
              value={loanTerm}
              min={1}
              max={120}
              onChange={(e) => setLoanTerm(Number(e.target.value))}
            />
          </div>
        </div>
      </form>
      <h2>Results</h2>
      <div className="flex flex-col gap-5 mt-3">
        <div>
          <h3>Credit Card</h3>
          <p>
            <strong>
              Total Paid: $
              {cc.totalPaid.toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })}
            </strong>
            Months to Payoff: {cc.months}
          </p>
        </div>
        <div>
          <h3>Personal Loan</h3>
          <p>
            <strong>
              Total Paid: $
              {loan.totalPaid.toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })}
            </strong>
            Months to Payoff: {loan.months}
          </p>
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
