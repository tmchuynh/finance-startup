"use client";

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
    <div className="mx-auto pb-24 lg:pb-32 pt-6 sm:pt-12 lg:pt-16 w-10/12 md:w-11/12">
      {/* Header Section */}
      <div className="mb-8 text-center">
        <h1>Investing vs Saving Calculator</h1>
        <p className="mb-6 text-xl">
          Make informed decisions about your financial future
        </p>
        <p className="mx-auto max-w-3xl">
          This calculator helps you compare the future value of investing vs.
          saving based on your initial investment, monthly contributions, and
          expected returns. Please fill out the form below to see the results.
        </p>
      </div>

      {/* Typical Returns Table */}
      <div className="shadow mb-8 border rounded-lg overflow-hidden">
        <h2>Typical Returns and Rates (2024)</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Annual Rate</TableHead>
              <TableHead>Notes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Stock Market (S&P 500)</TableCell>
              <TableCell>7% - 10%</TableCell>
              <TableCell>Long-term average, not guaranteed</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Savings Account</TableCell>
              <TableCell>0.5% - 5%</TableCell>
              <TableCell>High-yield savings at upper end</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>CD (Certificate of Deposit)</TableCell>
              <TableCell>2% - 5%</TableCell>
              <TableCell>Depends on term and bank</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Bonds</TableCell>
              <TableCell>3% - 6%</TableCell>
              <TableCell>Varies by type and duration</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      {/* Pros and Cons Table */}
      <div className="shadow mb-8 border rounded-lg overflow-hidden">
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
              <TableCell>Investing</TableCell>
              <TableCell>
                <ul className="space-y-1">
                  <li>Higher potential returns</li>
                  <li>Beats inflation long-term</li>
                  <li>Compound growth</li>
                </ul>
              </TableCell>
              <TableCell>
                <ul className="space-y-1">
                  <li>Risk of loss</li>
                  <li>Volatility</li>
                  <li>Not FDIC insured</li>
                </ul>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Saving</TableCell>
              <TableCell>
                <ul className="space-y-1">
                  <li>Safe</li>
                  <li>FDIC insured</li>
                  <li>Easy access</li>
                </ul>
              </TableCell>
              <TableCell>
                <ul className="space-y-1">
                  <li>Lower returns</li>
                  <li>May not keep up with inflation</li>
                  <li>Limited growth</li>
                </ul>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      {/* Calculator Form */}
      <div className="shadow mb-8 p-6 border rounded-lg">
        <h2>Investment Calculator</h2>

        <form onSubmit={(e) => e.preventDefault()}>
          <div className="gap-8 grid grid-cols-1 lg:grid-cols-2">
            {/* Investment Inputs */}
            <div className="p-6 border rounded-lg">
              <h3 className="flex gap-2 items-center">
                📈 Investment Parameters
              </h3>
              <div className="space-y-6">
                <div>
                  <Label className="font-medium text-sm">
                    Initial Amount: ${initial.toLocaleString()}
                  </Label>
                  <Slider
                    value={[initial]}
                    onValueChange={(value) => setInitial(value[0])}
                    max={100000}
                    min={0}
                    step={500}
                    className="mt-2"
                  />
                  <div className="flex justify-between mt-1 text-xs">
                    <span>$0</span>
                    <span>$100,000</span>
                  </div>
                </div>

                <div>
                  <Label className="font-medium text-sm">
                    Monthly Contribution: ${monthly.toLocaleString()}
                  </Label>
                  <Slider
                    value={[monthly]}
                    onValueChange={(value) => setMonthly(value[0])}
                    max={10000}
                    min={0}
                    step={50}
                    className="mt-2"
                  />
                  <div className="flex justify-between mt-1 text-xs">
                    <span>$0</span>
                    <span>$10,000</span>
                  </div>
                </div>

                <div>
                  <Label className="font-medium text-sm">
                    Expected Investment Return: {investReturn}% per year
                  </Label>
                  <Slider
                    value={[investReturn]}
                    onValueChange={(value) =>
                      setInvestReturn(Number(value[0].toFixed(1)))
                    }
                    max={15}
                    min={0}
                    step={0.1}
                    className="mt-2"
                  />
                  <div className="flex justify-between mt-1 text-xs">
                    <span>0%</span>
                    <span>15%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Savings Inputs */}
            <div className="p-6 border rounded-lg">
              <h3 className="flex gap-2 items-center">🏦 Savings Parameters</h3>
              <div className="space-y-6">
                <div>
                  <Label className="font-medium text-sm">
                    Same Initial Amount: ${initial.toLocaleString()}
                  </Label>
                  <div className="mt-2 p-3 rounded text-sm">
                    Automatically matches investment initial amount
                  </div>
                </div>

                <div>
                  <Label className="font-medium text-sm">
                    Same Monthly Contribution: ${monthly.toLocaleString()}
                  </Label>
                  <div className="mt-2 p-3 rounded text-sm">
                    Automatically matches investment monthly contribution
                  </div>
                </div>

                <div>
                  <Label className="font-medium text-sm">
                    Savings Account Rate: {savingRate}% per year
                  </Label>
                  <Slider
                    value={[savingRate]}
                    onValueChange={(value) =>
                      setSavingRate(Number(value[0].toFixed(1)))
                    }
                    max={10}
                    min={0}
                    step={0.1}
                    className="mt-2"
                  />
                  <div className="flex justify-between mt-1 text-xs">
                    <span>0%</span>
                    <span>10%</span>
                  </div>
                </div>

                <div>
                  <Label className="font-medium text-sm">
                    Time Horizon: {years} years
                  </Label>
                  <Slider
                    value={[years]}
                    onValueChange={(value) => setYears(value[0])}
                    max={40}
                    min={1}
                    step={1}
                    className="mt-2"
                  />
                  <div className="flex justify-between mt-1 text-xs">
                    <span>1 year</span>
                    <span>40 years</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      {/* Results Section */}
      <div className="shadow mb-8 p-6 border rounded-lg">
        <h2>Results after {years} years</h2>

        {/* Winner Banner */}
        {(() => {
          const difference = investFV - savingFV;
          const isInvestingBetter = difference > 0;

          return (
            <div
              className={`p-4 rounded-lg mb-6 ${
                isInvestingBetter ? " border " : " border "
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className={` ${isInvestingBetter ? "" : ""}`}>
                    {isInvestingBetter ? "Investing Wins!" : "Saving Wins!"}
                  </h3>
                  <p className={`text-sm ${isInvestingBetter ? "" : ""}`}>
                    {Math.abs(difference) > 0
                      ? `$${Math.abs(
                          difference
                        ).toLocaleString()} advantage after ${years} years`
                      : "Both options result in the same amount"}
                  </p>
                </div>
              </div>
            </div>
          );
        })()}

        {/* Comparison Cards */}
        <div className="gap-6 grid grid-cols-1 md:grid-cols-2 mb-8">
          <div className="shadow-sm p-6 border-2 rounded-lg">
            <h3 className="flex gap-2 items-center">📈 Investing</h3>
            <div className="space-y-3">
              {(() => {
                const totalContributions = initial + monthly * years * 12;
                const earnings = investFV - totalContributions;
                const returnRate =
                  totalContributions > 0
                    ? (investFV / totalContributions - 1) * 100
                    : 0;

                return (
                  <>
                    <div className="flex items-center justify-between">
                      <span className="">Total Contributions:</span>
                      <span className="font-bold">
                        ${totalContributions.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="">Investment Earnings:</span>
                      <span className="font-bold">
                        +${earnings.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="">Total Return:</span>
                      <span className="font-bold">
                        {returnRate.toFixed(1)}%
                      </span>
                    </div>
                    <div className="pt-2 border-t">
                      <div className="flex items-center justify-between">
                        <span className="">Future Value:</span>
                        <span className="font-bold text-xl">
                          ${investFV.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>

          <div className="shadow-sm p-6 border-2 rounded-lg">
            <h3 className="flex gap-2 items-center">🏦 Saving</h3>
            <div className="space-y-3">
              {(() => {
                const totalContributions = initial + monthly * years * 12;
                const earnings = savingFV - totalContributions;
                const returnRate =
                  totalContributions > 0
                    ? (savingFV / totalContributions - 1) * 100
                    : 0;

                return (
                  <>
                    <div className="flex items-center justify-between">
                      <span className="">Total Contributions:</span>
                      <span className="font-bold">
                        ${totalContributions.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="">Interest Earnings:</span>
                      <span className="font-bold">
                        +${earnings.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="">Total Return:</span>
                      <span className="font-bold">
                        {returnRate.toFixed(1)}%
                      </span>
                    </div>
                    <div className="pt-2 border-t">
                      <div className="flex items-center justify-between">
                        <span className="">Future Value:</span>
                        <span className="font-bold text-xl">
                          ${savingFV.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        </div>

        {/* Detailed Comparison Table */}
        <div className="shadow mb-8 border rounded-lg overflow-hidden">
          <h3>Detailed Financial Projection</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Metric</TableHead>
                <TableHead className="">Investing</TableHead>
                <TableHead className="">Saving</TableHead>
                <TableHead>Difference</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(() => {
                const totalContributions = initial + monthly * years * 12;
                const investEarnings = investFV - totalContributions;
                const savingEarnings = savingFV - totalContributions;
                const difference = investFV - savingFV;
                const monthlyInvestReturn = investFV / (years * 12);
                const monthlySavingReturn = savingFV / (years * 12);

                return (
                  <>
                    <TableRow>
                      <TableCell>Annual Return Rate</TableCell>
                      <TableCell>{investReturn}%</TableCell>
                      <TableCell>{savingRate}%</TableCell>
                      <TableCell>
                        {investReturn > savingRate
                          ? `${(investReturn - savingRate).toFixed(1)}% higher`
                          : `${(savingRate - investReturn).toFixed(1)}% lower`}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Total Contributions</TableCell>
                      <TableCell>
                        ${totalContributions.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        ${totalContributions.toLocaleString()}
                      </TableCell>
                      <TableCell>Same</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Total Earnings</TableCell>
                      <TableCell>${investEarnings.toLocaleString()}</TableCell>
                      <TableCell>${savingEarnings.toLocaleString()}</TableCell>
                      <TableCell>
                        {investEarnings > savingEarnings
                          ? `$${(
                              investEarnings - savingEarnings
                            ).toLocaleString()} more`
                          : `$${(
                              savingEarnings - investEarnings
                            ).toLocaleString()} less`}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Average Monthly Growth</TableCell>
                      <TableCell>
                        ${monthlyInvestReturn.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        ${monthlySavingReturn.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        {monthlyInvestReturn > monthlySavingReturn
                          ? `$${(
                              monthlyInvestReturn - monthlySavingReturn
                            ).toLocaleString()} more`
                          : `$${(
                              monthlySavingReturn - monthlyInvestReturn
                            ).toLocaleString()} less`}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Final Value</TableCell>
                      <TableCell className="font-bold text-lg">
                        ${investFV.toLocaleString()}
                      </TableCell>
                      <TableCell className="font-bold text-lg">
                        ${savingFV.toLocaleString()}
                      </TableCell>
                      <TableCell className="font-bold">
                        {difference > 0
                          ? `$${difference.toLocaleString()} advantage`
                          : difference < 0
                          ? `$${Math.abs(
                              difference
                            ).toLocaleString()} disadvantage`
                          : "Equal"}
                      </TableCell>
                    </TableRow>
                  </>
                );
              })()}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Important Considerations */}
      <div className="mb-8 p-6 border rounded-lg">
        <h3>⚠️ Important Considerations</h3>
        <ul className="space-y-2">
          <li>
            <strong>Risk vs Reward:</strong> Investments offer higher potential
            returns but come with risk of loss
          </li>
          <li>
            <strong>Market Volatility:</strong> Investment returns can vary
            significantly year to year
          </li>
          <li>
            <strong>Emergency Fund:</strong> Keep 3-6 months of expenses in
            savings before investing
          </li>
          <li>
            <strong>Time Horizon:</strong> Longer time periods favor investing
            due to compound growth
          </li>
          <li>
            <strong>Inflation Impact:</strong> Low savings rates may not keep up
            with inflation
          </li>
          <li>
            <strong>Tax Considerations:</strong> Investment gains may be subject
            to capital gains tax
          </li>
          <li>
            <strong>Diversification:</strong> Consider a mix of both saving and
            investing
          </li>
        </ul>
      </div>

      {/* Disclaimer */}
      <div className="p-6 border rounded-lg">
        <h3>📋 Disclaimer</h3>
        <p className="text-sm">
          <strong>Note:</strong> This calculator provides estimates and assumes
          fixed rates of return. It does not account for taxes, investment
          losses, market volatility, inflation, or fees. Past performance does
          not guarantee future results. Actual investment returns can vary
          significantly and may result in losses. Please consult with a
          qualified financial advisor for personalized investment advice.
        </p>
      </div>
    </div>
  );
};

export default InvestingVsSaving;
