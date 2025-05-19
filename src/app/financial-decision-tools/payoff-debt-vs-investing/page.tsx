"use client";

import React, { useState } from "react";

const PayoffDebtVsInvesting: React.FC = () => {
  const [debt, setDebt] = useState(10000);
  const [debtRate, setDebtRate] = useState(18);
  const [minPayment, setMinPayment] = useState(200);
  const [extra, setExtra] = useState(300);
  const [investReturn, setInvestReturn] = useState(7);
  const [years, setYears] = useState(10);

  // Simulate paying off debt with extra payments
  function calcPayoffDebt() {
    let balance = debt;
    let month = 0;
    let totalPaid = 0;
    const monthlyRate = debtRate / 100 / 12;
    const payment = minPayment + extra;
    while (balance > 0 && month < years * 12) {
      const interest = balance * monthlyRate;
      const pay = Math.min(payment, balance + interest);
      balance = balance + interest - pay;
      totalPaid += pay;
      month++;
      if (balance < 0.01) break;
    }
    // After debt is paid, invest the extra for remaining months
    const investMonths = years * 12 - month;
    let investBalance = 0;
    for (let i = 0; i < investMonths; i++) {
      investBalance = (investBalance + payment) * (1 + investReturn / 100 / 12);
    }
    return {
      debtFreeMonth: month,
      totalPaid,
      investAfterDebt: investBalance,
      totalValue: investBalance,
    };
  }

  // Simulate making minimum debt payments and investing extra
  function calcInvestExtra() {
    let balance = debt;
    let investBalance = 0;
    const monthlyRate = debtRate / 100 / 12;
    for (let month = 0; month < years * 12; month++) {
      const interest = balance * monthlyRate;
      const pay = Math.min(minPayment, balance + interest);
      balance = balance + interest - pay;
      // Invest the extra every month
      investBalance = (investBalance + extra) * (1 + investReturn / 100 / 12);
      if (balance < 0.01) {
        // If debt is paid off, invest the minPayment too
        for (let i = month + 1; i < years * 12; i++) {
          investBalance =
            (investBalance + minPayment + extra) *
            (1 + investReturn / 100 / 12);
        }
        break;
      }
    }
    return {
      investValue: investBalance,
    };
  }

  const payoff = calcPayoffDebt();
  const invest = calcInvestExtra();

  return (
    <div className="mx-auto pt-6 sm:pt-12 lg:pt-16 pb-24 lg:pb-32 w-10/12 md:w-11/12">
      <h1>Pay Off Debt vs Investing Calculator</h1>
      <h5>Make informed decisions about your financial future</h5>
      <p>
        This calculator helps you compare the benefits of paying off debt versus
        investing extra money. Enter your debt amount, interest rate, minimum
        payment, and expected investment return to see the results. This tool
        provides estimates for informational purposes only. Actual results may
        vary. Consult a financial advisor before making decisions.
      </p>

      <form
        className="gap-4 grid grid-cols-1 sm:grid-cols-2 mb-8"
        onSubmit={(e) => e.preventDefault()}
      >
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
            Debt Interest Rate (% APR)
            <input
              type="number"
              value={debtRate}
              min={0}
              step={0.1}
              onChange={(e) => setDebtRate(Number(e.target.value))}
            />
          </label>
          <br />
          <label>
            Minimum Payment ($/month)
            <input
              type="number"
              value={minPayment}
              min={0}
              onChange={(e) => setMinPayment(Number(e.target.value))}
            />
          </label>
          <br />
          <label>
            Extra Monthly Amount ($)
            <input
              type="number"
              value={extra}
              min={0}
              onChange={(e) => setExtra(Number(e.target.value))}
            />
          </label>
        </div>
        <div>
          <label>
            Expected Investment Return (%/year)
            <input
              type="number"
              value={investReturn}
              min={0}
              step={0.1}
              onChange={(e) => setInvestReturn(Number(e.target.value))}
            />
          </label>
          <br />
          <label>
            Years to Compare
            <input
              type="number"
              value={years}
              min={1}
              max={40}
              onChange={(e) => setYears(Number(e.target.value))}
            />
          </label>
        </div>
      </form>
      <h2>Results after {years} years</h2>
      <div style={{ display: "flex", gap: 32 }}>
        <div>
          <h3>Pay Off Debt First</h3>
          <p>
            <strong>
              Total Value: $
              {payoff.totalValue.toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })}
            </strong>
            <br />
            Debt paid off in {payoff.debtFreeMonth} months
          </p>
        </div>
        <div>
          <h3>Invest Extra While Paying Minimum</h3>
          <p>
            <strong>
              Total Value: $
              {invest.investValue.toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })}
            </strong>
          </p>
        </div>
      </div>
      <p style={{ marginTop: 24, color: "#666" }}>
        Note: This calculator assumes fixed rates, no taxes, and no investment
        losses.
      </p>
    </div>
  );
};

export default PayoffDebtVsInvesting;
