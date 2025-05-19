"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
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

      {/* Table: Typical Returns and Rates */}
      <div className="my-8">
        <h2>Typical Returns and Rates (2024)</h2>
        <div className="overflow-x-auto">
          <table className="border border-gray-300 min-w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-3 py-2 border text-left">Type</th>
                <th className="px-3 py-2 border text-left">Annual Rate</th>
                <th className="px-3 py-2 border text-left">Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-3 py-2 border">Stock Market (S&P 500)</td>
                <td className="px-3 py-2 border">7% - 10%</td>
                <td className="px-3 py-2 border">
                  Long-term average, not guaranteed
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Savings Account</td>
                <td className="px-3 py-2 border">0.5% - 5%</td>
                <td className="px-3 py-2 border">
                  High-yield savings at upper end
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">
                  CD (Certificate of Deposit)
                </td>
                <td className="px-3 py-2 border">2% - 5%</td>
                <td className="px-3 py-2 border">Depends on term and bank</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Bonds</td>
                <td className="px-3 py-2 border">3% - 6%</td>
                <td className="px-3 py-2 border">
                  Varies by type and duration
                </td>
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
                <td className="px-3 py-2 border">Investing</td>
                <td className="px-3 py-2 border">
                  Higher potential returns
                  <br />
                  Beats inflation long-term
                  <br />
                  Compound growth
                </td>
                <td className="px-3 py-2 border">
                  Risk of loss
                  <br />
                  Volatility
                  <br />
                  Not FDIC insured
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Saving</td>
                <td className="px-3 py-2 border">
                  Safe
                  <br />
                  FDIC insured
                  <br />
                  Easy access
                </td>
                <td className="px-3 py-2 border">
                  Lower returns
                  <br />
                  May not keep up with inflation
                  <br />
                  Limited growth
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <form className="mt-5">
        <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 mb-8">
          <div>
            <Label>Initial Amount ($)</Label>
            <div className="flex items-center gap-4">
              <Slider
                min={0}
                max={100000}
                step={500}
                value={[initial]}
                onValueChange={([v]) => setInitial(v)}
                className="w-2/3"
              />
              <Input
                type="number"
                value={initial}
                min={0}
                onChange={(e) => setInitial(Number(e.target.value))}
                className="w-1/3"
              />
            </div>
          </div>
          <div>
            <Label>Monthly Contribution ($)</Label>
            <div className="flex items-center gap-4">
              <Slider
                min={0}
                max={10000}
                step={50}
                value={[monthly]}
                onValueChange={([v]) => setMonthly(v)}
                className="w-2/3"
              />
              <Input
                type="number"
                value={monthly}
                min={0}
                onChange={(e) => setMonthly(Number(e.target.value))}
                className="w-1/3"
              />
            </div>
          </div>
        </div>
        <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 mb-8">
          <div>
            <Label>Expected Investment Return (%/year)</Label>
            <div className="flex items-center gap-4">
              <Slider
                min={0}
                max={15}
                step={0.1}
                value={[investReturn]}
                onValueChange={([v]) => setInvestReturn(Number(v.toFixed(1)))}
                className="w-2/3"
              />
              <Input
                type="number"
                value={investReturn}
                min={0}
                step={0.1}
                onChange={(e) => setInvestReturn(Number(e.target.value))}
                className="w-1/3"
              />
            </div>
          </div>
          <div>
            <Label>Savings Account Rate (%/year)</Label>
            <div className="flex items-center gap-4">
              <Slider
                min={0}
                max={10}
                step={0.1}
                value={[savingRate]}
                onValueChange={([v]) => setSavingRate(Number(v.toFixed(1)))}
                className="w-2/3"
              />
              <Input
                type="number"
                value={savingRate}
                min={0}
                step={0.1}
                onChange={(e) => setSavingRate(Number(e.target.value))}
                className="w-1/3"
              />
            </div>
          </div>
          <div>
            <Label>Years to Compare</Label>
            <div className="flex items-center gap-4">
              <Slider
                min={1}
                max={40}
                step={1}
                value={[years]}
                onValueChange={([v]) => setYears(v)}
                className="w-2/3"
              />
              <Input
                type="number"
                value={years}
                min={1}
                max={40}
                onChange={(e) => setYears(Number(e.target.value))}
                className="w-1/3"
              />
            </div>
          </div>
        </div>
      </form>
      <h2>Results after {years} years</h2>
      <div className="gap-5 grid grid-cols-1 md:grid-cols-2 mt-3">
        <div className="bg-white shadow p-5 border border-gray-300 rounded-lg">
          <h3 className="flex items-center gap-2 mb-2 font-semibold text-blue-700 text-lg">
            Investing
          </h3>
          <ul>
            <li>
              <span className="text-gray-700">Future Value:</span>{" "}
              <strong className="text-blue-900">
                $
                {investFV.toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })}
              </strong>
            </li>
          </ul>
        </div>
        <div className="bg-white shadow p-5 border border-gray-300 rounded-lg">
          <h3 className="flex items-center gap-2 mb-2 font-semibold text-green-700 text-lg">
            Saving
          </h3>
          <ul>
            <li>
              <span className="text-gray-700">Future Value:</span>{" "}
              <strong className="text-green-900">
                $
                {savingFV.toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })}
              </strong>
            </li>
          </ul>
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
