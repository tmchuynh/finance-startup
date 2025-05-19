"use client";

import React, { useState } from "react";

const InvestingVsSaving: React.FC = () => {
  const [initial, setInitial] = useState(5000);
  const [monthly, setMonthly] = useState(500);
  const [investReturn, setInvestReturn] = useState(7);
  const [savingRate, setSavingRate] = useState(4);
  const [years, setYears] = useState(10);

  // Future value calculation for investments and savings
  function futureValue(rate: number) {
    const r = rate / 100 / 12;
    const n = years * 12;
    // FV = PV*(1+r)^n + PMT*(((1+r)^n - 1)/r)
    return (
      initial * Math.pow(1 + r, n) + monthly * ((Math.pow(1 + r, n) - 1) / r)
    );
  }

  const investFV = futureValue(investReturn);
  const savingFV = futureValue(savingRate);

  return (
    <div className="mx-auto pt-6 sm:pt-12 lg:pt-16 pb-24 lg:pb-32 w-10/12 md:w-11/12">
      <h1>Investing vs Saving Calculator</h1>
      <h5>Make informed decisions about your financial future</h5>
      <p>
        This calculator helps you compare the future value of investing vs.
        saving based on your initial investment, monthly contributions, and
        expected returns. Please fill out the form below to see the results.
      </p>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <label>
            Initial Amount ($)
            <input
              type="number"
              value={initial}
              min={0}
              onChange={(e) => setInitial(Number(e.target.value))}
            />
          </label>
          <br />
          <label>
            Monthly Contribution ($)
            <input
              type="number"
              value={monthly}
              min={0}
              onChange={(e) => setMonthly(Number(e.target.value))}
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
            Savings Account Rate (%/year)
            <input
              type="number"
              value={savingRate}
              min={0}
              step={0.1}
              onChange={(e) => setSavingRate(Number(e.target.value))}
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
          <h3>Investing</h3>
          <p>
            <strong>
              Future Value: $
              {investFV.toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })}
            </strong>
          </p>
        </div>
        <div>
          <h3>Saving</h3>
          <p>
            <strong>
              Future Value: $
              {savingFV.toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })}
            </strong>
          </p>
        </div>
      </div>
      <p style={{ marginTop: 24, color: "#666" }}>
        Note: This calculator assumes fixed rates and does not account for taxes
        or investment losses.
      </p>
    </div>
  );
};

export default InvestingVsSaving;
