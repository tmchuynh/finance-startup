"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
      <form onSubmit={(e) => e.preventDefault()} className="mt-5">
        <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 mb-8">
          <div>
            <Label>Initial Amount ($)</Label>
            <Input
              type="number"
              value={initial}
              min={0}
              onChange={(e) => setInitial(Number(e.target.value))}
            />
          </div>

          <div>
            <Label>Monthly Contribution ($)</Label>
            <Input
              type="number"
              value={monthly}
              min={0}
              onChange={(e) => setMonthly(Number(e.target.value))}
            />
          </div>
        </div>
        <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 mb-8">
          <div>
            <Label>Expected Investment Return (%/year)</Label>
            <Input
              type="number"
              value={investReturn}
              min={0}
              step={0.1}
              onChange={(e) => setInvestReturn(Number(e.target.value))}
            />
          </div>

          <div>
            <Label>Savings Account Rate (%/year)</Label>
            <Input
              type="number"
              value={savingRate}
              min={0}
              step={0.1}
              onChange={(e) => setSavingRate(Number(e.target.value))}
            />
          </div>

          <div>
            <Label>Years to Compare</Label>
            <Input
              type="number"
              value={years}
              min={1}
              max={40}
              onChange={(e) => setYears(Number(e.target.value))}
            />
          </div>
        </div>
      </form>
      <h2>Results after {years} years</h2>
      <div className="flex flex-col gap-5 mt-3">
        <div>
          <h3>Investing</h3>
          <p>
            Future Value:{" "}
            <strong>
              $
              {investFV.toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })}
            </strong>
          </p>
        </div>
        <div>
          <h3>Saving</h3>
          <p>
            Future Value:{" "}
            <strong>
              $
              {savingFV.toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })}
            </strong>
          </p>
        </div>
      </div>
      <p className="mt-4">
        Note: This calculator assumes fixed rates and does not account for taxes
        or investment losses.
      </p>
    </div>
  );
};

export default InvestingVsSaving;
