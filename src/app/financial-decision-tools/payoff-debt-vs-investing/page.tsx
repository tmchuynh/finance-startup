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

  const winner = payoff.totalValue > invest.investValue ? "payoff" : "invest";
  const winnerValue =
    winner === "payoff" ? payoff.totalValue : invest.investValue;
  const loserValue =
    winner === "payoff" ? invest.investValue : payoff.totalValue;
  const advantage = winnerValue - loserValue;

  return (
    <div className="mx-auto pb-24 lg:pb-32 pt-6 sm:pt-12 lg:pt-16 w-10/12 md:w-11/12">
      {/* Header Section */}
      <div className="mb-12 text-center">
        <h1 className="bg-clip-text bg-gradient-to-r from-blue-600 to-green-600 mb-4 font-bold text-3xl text-transparent md:text-5xl">
          Pay Off Debt vs Investing Calculator
        </h1>
        <p className="mx-auto max-w-3xl leading-relaxed text-lg md:text-xl">
          Make informed decisions about your financial future by comparing the
          benefits of paying off debt versus investing extra money.
        </p>
      </div>

      {/* Information Tables */}
      <div className="gap-8 grid mb-12">
        {/* Typical Debt and Investment Returns */}
        <div className="shadow-sm p-6 border rounded-lg">
          <h2 className="mb-4 font-semibold text-2xl">
            Typical Debt & Investment Returns (2024)
          </h2>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold">Type</TableHead>
                  <TableHead className="font-semibold">
                    Interest/Return
                  </TableHead>
                  <TableHead className="font-semibold">Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">
                    Credit Card Debt
                  </TableCell>
                  <TableCell>16% - 29%</TableCell>
                  <TableCell>High, variable, not tax-deductible</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Student Loan</TableCell>
                  <TableCell>4% - 8%</TableCell>
                  <TableCell>May be tax-deductible</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    Stock Market (S&P 500)
                  </TableCell>
                  <TableCell>7% - 10%</TableCell>
                  <TableCell>Long-term average, not guaranteed</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Savings Account</TableCell>
                  <TableCell>0.5% - 5%</TableCell>
                  <TableCell>High-yield savings at upper end</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Pros and Cons */}
        <div className="shadow-sm p-6 border rounded-lg">
          <h2 className="mb-4 font-semibold text-2xl">Pros and Cons</h2>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold">Strategy</TableHead>
                  <TableHead className="font-semibold">Pros</TableHead>
                  <TableHead className="font-semibold">Cons</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">
                    Pay Off Debt First
                  </TableCell>
                  <TableCell>
                    <ul className="space-y-1">
                      <li>Guaranteed return (interest saved)</li>
                      <li>Reduces stress</li>
                      <li>Improves credit score</li>
                    </ul>
                  </TableCell>
                  <TableCell>
                    <ul className="space-y-1">
                      <li>Miss out on market growth</li>
                      <li>Less liquidity until debt is gone</li>
                    </ul>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    Invest Extra While Paying Minimum
                  </TableCell>
                  <TableCell>
                    <ul className="space-y-1">
                      <li>Potential for higher returns</li>
                      <li>Start investing early</li>
                      <li>More liquidity</li>
                    </ul>
                  </TableCell>
                  <TableCell>
                    <ul className="space-y-1">
                      <li>Risk of loss</li>
                      <li>Debt lingers longer</li>
                      <li>Interest may outweigh gains</li>
                    </ul>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* Calculator Form */}
      <div className="shadow-sm mb-8 p-6 border rounded-lg">
        <h2 className="mb-6 font-semibold text-2xl">Financial Calculator</h2>

        <form onSubmit={(e) => e.preventDefault()}>
          <div className="gap-8 grid">
            {/* Debt Information */}
            <div className="p-6 border rounded-lg">
              <h3 className="mb-4 font-semibold text-lg">Debt Information</h3>
              <div className="gap-6 grid md:grid-cols-2">
                <div>
                  <Label className="font-medium text-sm">
                    Debt Amount: ${debt.toLocaleString()}
                  </Label>
                  <div className="flex gap-4 items-center mt-2">
                    <Slider
                      min={0}
                      max={100000}
                      step={100}
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
                <div>
                  <Label className="font-medium text-sm">
                    Debt Interest Rate: {debtRate}% APR
                  </Label>
                  <div className="flex gap-4 items-center mt-2">
                    <Slider
                      min={0}
                      max={40}
                      step={0.1}
                      value={[debtRate]}
                      onValueChange={([v]) => setDebtRate(Number(v.toFixed(1)))}
                      className="flex-1"
                    />
                    <Input
                      type="number"
                      value={debtRate}
                      min={0}
                      step={0.1}
                      onChange={(e) => setDebtRate(Number(e.target.value))}
                      className="w-24"
                    />
                  </div>
                </div>
                <div>
                  <Label className="font-medium text-sm">
                    Minimum Payment: ${minPayment}/month
                  </Label>
                  <div className="flex gap-4 items-center mt-2">
                    <Slider
                      min={0}
                      max={5000}
                      step={10}
                      value={[minPayment]}
                      onValueChange={([v]) => setMinPayment(v)}
                      className="flex-1"
                    />
                    <Input
                      type="number"
                      value={minPayment}
                      min={0}
                      onChange={(e) => setMinPayment(Number(e.target.value))}
                      className="w-24"
                    />
                  </div>
                </div>
                <div>
                  <Label className="font-medium text-sm">
                    Extra Monthly Amount: ${extra}
                  </Label>
                  <div className="flex gap-4 items-center mt-2">
                    <Slider
                      min={0}
                      max={10000}
                      step={10}
                      value={[extra]}
                      onValueChange={([v]) => setExtra(v)}
                      className="flex-1"
                    />
                    <Input
                      type="number"
                      value={extra}
                      min={0}
                      onChange={(e) => setExtra(Number(e.target.value))}
                      className="w-24"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Investment Information */}
            <div className="p-6 border rounded-lg">
              <h3 className="mb-4 font-semibold text-lg">
                Investment Information
              </h3>
              <div className="gap-6 grid md:grid-cols-2">
                <div>
                  <Label className="font-medium text-sm">
                    Expected Investment Return: {investReturn}%/year
                  </Label>
                  <div className="flex gap-4 items-center mt-2">
                    <Slider
                      min={0}
                      max={15}
                      step={0.1}
                      value={[investReturn]}
                      onValueChange={([v]) =>
                        setInvestReturn(Number(v.toFixed(1)))
                      }
                      className="flex-1"
                    />
                    <Input
                      type="number"
                      value={investReturn}
                      min={0}
                      step={0.1}
                      onChange={(e) => setInvestReturn(Number(e.target.value))}
                      className="w-24"
                    />
                  </div>
                </div>
                <div>
                  <Label className="font-medium text-sm">
                    Years to Compare: {years}
                  </Label>
                  <div className="flex gap-4 items-center mt-2">
                    <Slider
                      min={1}
                      max={40}
                      step={1}
                      value={[years]}
                      onValueChange={([v]) => setYears(v)}
                      className="flex-1"
                    />
                    <Input
                      type="number"
                      value={years}
                      min={1}
                      max={40}
                      onChange={(e) => setYears(Number(e.target.value))}
                      className="w-24"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      {/* Results Section */}
      <div className="space-y-6">
        {/* Winner Banner */}
        <div
          className={`rounded-lg p-6 text-center border-2 ${
            winner === "payoff" ? "  " : " border-green-300 "
          }`}
        >
          <h2 className="mb-2 font-bold text-2xl">
            {winner === "payoff"
              ? "🏆 Pay Off Debt First Wins!"
              : "🏆 Invest Extra Wins!"}
          </h2>
          <p className="text-lg">
            {winner === "payoff"
              ? "Paying off debt first"
              : "Investing extra while paying minimum"}
            provides{" "}
            <strong>
              $
              {advantage.toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })}
            </strong>{" "}
            more in total value after {years} years.
          </p>
        </div>

        {/* Results Comparison */}
        <div className="gap-6 grid md:grid-cols-2">
          <div
            className={`rounded-lg border-2 p-6 ${
              winner === "payoff" ? " " : " "
            }`}
          >
            <div className="flex gap-3 items-center mb-4">
              <div className="rounded-full h-3 w-3 0"></div>
              <h3 className="font-semibold text-xl">Pay Off Debt First</h3>
              {winner === "payoff" && <span className="font-bold">WINNER</span>}
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="">Total Value:</span>
                <span className="font-bold text-lg">
                  $
                  {payoff.totalValue.toLocaleString(undefined, {
                    maximumFractionDigits: 0,
                  })}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="">Debt paid off in:</span>
                <span className="font-bold">{payoff.debtFreeMonth} months</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="">Total Debt Payments:</span>
                <span className="font-bold">
                  $
                  {payoff.totalPaid.toLocaleString(undefined, {
                    maximumFractionDigits: 0,
                  })}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="">Investment Value:</span>
                <span className="font-bold">
                  $
                  {payoff.investAfterDebt.toLocaleString(undefined, {
                    maximumFractionDigits: 0,
                  })}
                </span>
              </div>
            </div>
          </div>

          <div
            className={`rounded-lg border-2 p-6 ${
              winner === "invest" ? " border-green-300" : " "
            }`}
          >
            <div className="flex gap-3 items-center mb-4">
              <div className="rounded-full h-3 w-3 0"></div>
              <h3 className="font-semibold text-xl">
                Invest Extra While Paying Minimum
              </h3>
              {winner === "invest" && <span className="font-bold">WINNER</span>}
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="">Total Investment Value:</span>
                <span className="font-bold text-lg">
                  $
                  {invest.investValue.toLocaleString(undefined, {
                    maximumFractionDigits: 0,
                  })}
                </span>
              </div>
              <div className="mt-4 text-sm">
                <p className="mb-2">
                  <strong>Strategy:</strong> Pay only the minimum on debt while
                  investing the extra ${extra}/month.
                </p>
                <p>
                  <strong>Note:</strong> Final debt balance and continued
                  payments are factored into the comparison.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Comparison Table */}
        <div className="shadow-sm p-6 border rounded-lg">
          <h3 className="mb-4 font-semibold text-xl">Detailed Comparison</h3>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold">Metric</TableHead>
                  <TableHead className="font-semibold">
                    Pay Off Debt First
                  </TableHead>
                  <TableHead className="font-semibold">Invest Extra</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">
                    Total Value After {years} Years
                  </TableCell>
                  <TableCell className="font-semibold">
                    $
                    {payoff.totalValue.toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    })}
                  </TableCell>
                  <TableCell className="font-semibold">
                    $
                    {invest.investValue.toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    })}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    Monthly Payment Strategy
                  </TableCell>
                  <TableCell className="">
                    ${(minPayment + extra).toLocaleString()} until debt-free,
                    then invest
                  </TableCell>
                  <TableCell className="">
                    ${minPayment.toLocaleString()} to debt, $
                    {extra.toLocaleString()} to investments
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Risk Level</TableCell>
                  <TableCell className="">Low (guaranteed return)</TableCell>
                  <TableCell className="">Higher (market dependent)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    Psychological Benefit
                  </TableCell>
                  <TableCell className="">
                    Debt freedom, peace of mind
                  </TableCell>
                  <TableCell className="">Building wealth early</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Important Considerations */}
        <div className="p-6 border rounded-lg">
          <h3 className="flex gap-2 items-center mb-3 font-semibold text-lg">
            ⚠️ Important Considerations
          </h3>
          <div className="gap-4 grid md:grid-cols-2 text-sm">
            <div>
              <h4 className="mb-2 font-semibold">
                Factors Favoring Debt Payoff:
              </h4>
              <ul className="space-y-1">
                <li>High-interest debt (credit cards, payday loans)</li>
                <li>Guaranteed return (interest rate saved)</li>
                <li>Improved credit score and financial flexibility</li>
                <li>Reduced financial stress</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-2 font-semibold">
                Factors Favoring Investment:
              </h4>
              <ul className="space-y-1">
                <li>Low-interest debt (below expected returns)</li>
                <li>Employer 401(k) matching</li>
                <li>Tax-advantaged investment accounts</li>
                <li>Long investment time horizon</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="p-6 border rounded-lg">
          <h3 className="mb-3 font-semibold text-lg">📋 Disclaimer</h3>
          <div className="space-y-2 text-sm">
            <p>
              <strong>Important:</strong> This calculator provides estimates for
              educational purposes only. Results assume fixed rates, no taxes,
              fees, or investment losses.
            </p>
            <p>
              Actual investment returns vary and can include losses. Consider
              your risk tolerance, tax situation, emergency fund needs, and
              overall financial goals.
            </p>
            <p>
              <strong>Professional Advice:</strong> Consult with a qualified
              financial advisor before making significant financial decisions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayoffDebtVsInvesting;
