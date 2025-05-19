"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
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

      {/* Table: Typical Debt and Investment Returns */}
      <div className="my-8">
        <h2>Typical Debt & Investment Returns (2024)</h2>
        <div className="overflow-x-auto">
          <table className="border border-gray-300 min-w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-3 py-2 border text-left">Type</th>
                <th className="px-3 py-2 border text-left">Interest/Return</th>
                <th className="px-3 py-2 border text-left">Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-3 py-2 border">Credit Card Debt</td>
                <td className="px-3 py-2 border">16% - 29%</td>
                <td className="px-3 py-2 border">
                  High, variable, not tax-deductible
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Student Loan</td>
                <td className="px-3 py-2 border">4% - 8%</td>
                <td className="px-3 py-2 border">May be tax-deductible</td>
              </tr>
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
                <th className="px-3 py-2 border text-left">Strategy</th>
                <th className="px-3 py-2 border text-left">Pros</th>
                <th className="px-3 py-2 border text-left">Cons</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-3 py-2 border">Pay Off Debt First</td>
                <td className="px-3 py-2 border">
                  Guaranteed return (interest saved)
                  <br />
                  Reduces stress
                  <br />
                  Improves credit score
                </td>
                <td className="px-3 py-2 border">
                  Miss out on market growth
                  <br />
                  Less liquidity until debt is gone
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">
                  Invest Extra While Paying Minimum
                </td>
                <td className="px-3 py-2 border">
                  Potential for higher returns
                  <br />
                  Start investing early
                  <br />
                  More liquidity
                </td>
                <td className="px-3 py-2 border">
                  Risk of loss
                  <br />
                  Debt lingers longer
                  <br />
                  Interest may outweigh gains
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <form
        className="gap-4 grid grid-cols-1 sm:grid-cols-2 my-8"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 mb-8">
          <div>
            <Label>Debt Amount ($)</Label>
            <div className="flex items-center gap-4">
              <Slider
                min={0}
                max={100000}
                step={100}
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
            <Label>Debt Interest Rate (% APR)</Label>
            <div className="flex items-center gap-4">
              <Slider
                min={0}
                max={40}
                step={0.1}
                value={[debtRate]}
                onValueChange={([v]) => setDebtRate(Number(v.toFixed(1)))}
                className="w-2/3"
              />
              <Input
                type="number"
                value={debtRate}
                min={0}
                step={0.1}
                onChange={(e) => setDebtRate(Number(e.target.value))}
                className="w-1/3"
              />
            </div>
          </div>
          <div>
            <Label>Minimum Payment ($/month)</Label>
            <div className="flex items-center gap-4">
              <Slider
                min={0}
                max={5000}
                step={10}
                value={[minPayment]}
                onValueChange={([v]) => setMinPayment(v)}
                className="w-2/3"
              />
              <Input
                type="number"
                value={minPayment}
                min={0}
                onChange={(e) => setMinPayment(Number(e.target.value))}
                className="w-1/3"
              />
            </div>
          </div>
          <div>
            <Label>Extra Monthly Amount ($)</Label>
            <div className="flex items-center gap-4">
              <Slider
                min={0}
                max={10000}
                step={10}
                value={[extra]}
                onValueChange={([v]) => setExtra(v)}
                className="w-2/3"
              />
              <Input
                type="number"
                value={extra}
                min={0}
                onChange={(e) => setExtra(Number(e.target.value))}
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
            Pay Off Debt First
          </h3>
          <ul>
            <li>
              <span className="text-gray-700">Total Value:</span>{" "}
              <strong className="text-blue-900">
                $
                {payoff.totalValue.toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })}
              </strong>
            </li>
            <li>
              <span className="text-gray-700">Debt paid off in:</span>{" "}
              <strong className="text-blue-900">
                {payoff.debtFreeMonth} months
              </strong>
            </li>
          </ul>
        </div>
        <div className="bg-white shadow p-5 border border-gray-300 rounded-lg">
          <h3 className="flex items-center gap-2 mb-2 font-semibold text-green-700 text-lg">
            Invest Extra While Paying Minimum
          </h3>
          <ul>
            <li>
              <span className="text-gray-700">Total Value:</span>{" "}
              <strong className="text-green-900">
                $
                {invest.investValue.toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })}
              </strong>
            </li>
          </ul>
        </div>
      </div>
      <p className="mt-4">
        Note: This calculator assumes fixed rates, no taxes, and no investment
        losses.
      </p>
    </div>
  );
};

export default PayoffDebtVsInvesting;
