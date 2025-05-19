"use client";

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

      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <label>
            Debt Amount ($)
            <input
              type="number"
              value={debt}
              min={0}
              onChange={(e) => setDebt(Number(e.target.value))}
            />
          </label>
          <br />
          <label>
            Credit Card Interest Rate (% APR)
            <input
              type="number"
              value={ccRate}
              min={0}
              step={0.1}
              onChange={(e) => setCcRate(Number(e.target.value))}
            />
          </label>
          <br />
          <label>
            Minimum Payment (% of balance)
            <input
              type="number"
              value={minPaymentPct}
              min={1}
              max={100}
              step={0.1}
              onChange={(e) => setMinPaymentPct(Number(e.target.value))}
            />
          </label>
        </div>
        <div>
          <label>
            Personal Loan Interest Rate (% APR)
            <input
              type="number"
              value={loanRate}
              min={0}
              step={0.1}
              onChange={(e) => setLoanRate(Number(e.target.value))}
            />
          </label>
          <br />
          <label>
            Loan Term (months)
            <input
              type="number"
              value={loanTerm}
              min={1}
              max={120}
              onChange={(e) => setLoanTerm(Number(e.target.value))}
            />
          </label>
        </div>
      </form>
      <h2>Results</h2>
      <div style={{ display: "flex", gap: 32 }}>
        <div>
          <h3>Credit Card</h3>
          <p>
            <strong>
              Total Paid: $
              {cc.totalPaid.toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })}
            </strong>
            <br />
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
            <br />
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
