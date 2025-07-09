"use client";

import { Button } from "@/components/ui/button";
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

const RothVsTraditional401k: React.FC = () => {
  const [salary, setSalary] = useState(80000);
  const [contribution, setContribution] = useState(10);
  const [employerMatch, setEmployerMatch] = useState(4);
  const [years, setYears] = useState(30);
  const [annualReturn, setAnnualReturn] = useState(7);
  const [currentTax, setCurrentTax] = useState(24);
  const [retirementTax, setRetirementTax] = useState(22);

  // Helper to calculate future value of a series of contributions
  function futureValue(annual: number, rate: number, n: number) {
    const r = rate / 100;
    return annual * ((Math.pow(1 + r, n) - 1) / r);
  }

  // Calculate for Traditional 401k
  const calcTraditional = () => {
    const employee = (contribution / 100) * salary;
    const employer = (employerMatch / 100) * salary;
    const totalAnnual = employee + employer;
    const fv = futureValue(totalAnnual, annualReturn, years);
    const afterTax = fv * (1 - retirementTax / 100);
    return { fv, afterTax };
  };

  // Calculate for Roth 401k
  const calcRoth = () => {
    const employee = (contribution / 100) * salary * (1 - currentTax / 100);
    const employer = (employerMatch / 100) * salary; // Employer match is always pre-tax
    // Employee Roth grows tax-free, employer match is taxed at withdrawal
    const fvEmployee = futureValue(employee, annualReturn, years);
    const fvEmployer = futureValue(employer, annualReturn, years);
    const afterTax = fvEmployee + fvEmployer * (1 - retirementTax / 100);
    return { fv: fvEmployee + fvEmployer, afterTax };
  };

  const traditional = calcTraditional();
  const roth = calcRoth();

  const resetToDefaults = () => {
    setSalary(80000);
    setContribution(10);
    setEmployerMatch(4);
    setYears(30);
    setAnnualReturn(7);
    setCurrentTax(24);
    setRetirementTax(22);
  };

  const winner = roth.afterTax > traditional.afterTax ? "Roth" : "Traditional";
  const difference = Math.abs(roth.afterTax - traditional.afterTax);

  return (
    <div className="mx-auto pb-24 lg:pb-32 pt-6 sm:pt-12 lg:pt-16 w-10/12 md:w-11/12">
      {/* Header Section */}
      <div className="mb-12 text-center">
        <h1 className="mb-4 font-bold text-4xl sm:text-5xl tracking-tight">
          401(k) vs Roth 401(k) Calculator
        </h1>
        <h5 className="mb-6 text-xl">
          Make Informed Retirement Savings Decisions
        </h5>
        <p className="mx-auto max-w-3xl text-lg">
          Compare the future value of Traditional and Roth 401(k) accounts based
          on your salary, contribution rates, employer match, and tax
          considerations. This tool helps you understand which option may be
          better for your specific situation.
        </p>
      </div>

      {/* Key Differences Section */}
      <div className="mb-8">
        <h2 className="mb-4 font-semibold text-2xl">
          401(k) vs Roth 401(k): Key Differences
        </h2>
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/4">Feature</TableHead>
                <TableHead className="w-3/8">Traditional 401(k)</TableHead>
                <TableHead className="w-3/8">Roth 401(k)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Contributions</TableCell>
                <TableCell>Pre-tax (lowers taxable income now)</TableCell>
                <TableCell>After-tax (no immediate tax benefit)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Growth</TableCell>
                <TableCell>Tax-deferred</TableCell>
                <TableCell>Tax-free</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  Withdrawals in Retirement
                </TableCell>
                <TableCell>Taxed as ordinary income</TableCell>
                <TableCell>Tax-free (if qualified)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Employer Match</TableCell>
                <TableCell>Pre-tax, taxed at withdrawal</TableCell>
                <TableCell>Pre-tax, taxed at withdrawal</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  Required Minimum Distributions
                </TableCell>
                <TableCell>Yes, starting at age 73</TableCell>
                <TableCell>Yes, starting at age 73</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Best For</TableCell>
                <TableCell>Expecting lower tax rate in retirement</TableCell>
                <TableCell>Expecting higher tax rate in retirement</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Calculator Form Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-2xl">Calculator Parameters</h2>
          <Button
            variant="outline"
            onClick={resetToDefaults}
            className="text-sm"
          >
            Reset to Defaults
          </Button>
        </div>

        <div className="bg-card p-6 border rounded-lg">
          {/* Basic Parameters */}
          <div className="gap-6 grid grid-cols-1 md:grid-cols-2 mb-6">
            <div className="space-y-3">
              <Label htmlFor="salary" className="font-medium text-sm">
                Annual Salary ($)
              </Label>
              <div className="flex gap-4 items-center">
                <Slider
                  min={0}
                  max={500000}
                  step={1000}
                  value={[salary]}
                  onValueChange={([v]) => setSalary(v)}
                  className="flex-1"
                />
                <Input
                  id="salary"
                  type="number"
                  value={salary}
                  min={0}
                  onChange={(e) => setSalary(Number(e.target.value))}
                  className="w-32"
                />
              </div>
              <p className="text-muted-foreground text-xs">
                Your annual gross income
              </p>
            </div>

            <div className="space-y-3">
              <Label htmlFor="contribution" className="font-medium text-sm">
                Employee Contribution (%)
              </Label>
              <div className="flex gap-4 items-center">
                <Slider
                  min={0}
                  max={50}
                  step={0.1}
                  value={[contribution]}
                  onValueChange={([v]) => setContribution(Number(v.toFixed(1)))}
                  className="flex-1"
                />
                <Input
                  id="contribution"
                  type="number"
                  value={contribution}
                  min={0}
                  max={100}
                  step={0.1}
                  onChange={(e) => setContribution(Number(e.target.value))}
                  className="w-32"
                />
              </div>
              <p className="text-muted-foreground text-xs">
                Percentage of salary you contribute
              </p>
            </div>

            <div className="space-y-3">
              <Label htmlFor="employerMatch" className="font-medium text-sm">
                Employer Match (%)
              </Label>
              <div className="flex gap-4 items-center">
                <Slider
                  min={0}
                  max={20}
                  step={0.1}
                  value={[employerMatch]}
                  onValueChange={([v]) =>
                    setEmployerMatch(Number(v.toFixed(1)))
                  }
                  className="flex-1"
                />
                <Input
                  id="employerMatch"
                  type="number"
                  value={employerMatch}
                  min={0}
                  max={100}
                  step={0.1}
                  onChange={(e) => setEmployerMatch(Number(e.target.value))}
                  className="w-32"
                />
              </div>
              <p className="text-muted-foreground text-xs">
                Employer matching contribution percentage
              </p>
            </div>

            <div className="space-y-3">
              <Label htmlFor="years" className="font-medium text-sm">
                Years to Retirement
              </Label>
              <div className="flex gap-4 items-center">
                <Slider
                  min={1}
                  max={50}
                  step={1}
                  value={[years]}
                  onValueChange={([v]) => setYears(v)}
                  className="flex-1"
                />
                <Input
                  id="years"
                  type="number"
                  value={years}
                  min={1}
                  max={50}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="w-32"
                />
              </div>
              <p className="text-muted-foreground text-xs">
                How long until you retire
              </p>
            </div>

            <div className="space-y-3">
              <Label htmlFor="annualReturn" className="font-medium text-sm">
                Expected Annual Return (%)
              </Label>
              <div className="flex gap-4 items-center">
                <Slider
                  min={0}
                  max={20}
                  step={0.1}
                  value={[annualReturn]}
                  onValueChange={([v]) => setAnnualReturn(Number(v.toFixed(1)))}
                  className="flex-1"
                />
                <Input
                  id="annualReturn"
                  type="number"
                  value={annualReturn}
                  min={0}
                  max={20}
                  step={0.1}
                  onChange={(e) => setAnnualReturn(Number(e.target.value))}
                  className="w-32"
                />
              </div>
              <p className="text-muted-foreground text-xs">
                Expected investment growth rate
              </p>
            </div>
          </div>

          {/* Tax Rate Parameters */}
          <div className="pt-6 border-t">
            <h3 className="mb-4 font-semibold text-lg">Tax Rate Assumptions</h3>
            <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
              <div className="space-y-3">
                <Label htmlFor="currentTax" className="font-medium text-sm">
                  Current Marginal Tax Rate (%)
                </Label>
                <div className="flex gap-4 items-center">
                  <Slider
                    min={0}
                    max={50}
                    step={0.1}
                    value={[currentTax]}
                    onValueChange={([v]) => setCurrentTax(Number(v.toFixed(1)))}
                    className="flex-1"
                  />
                  <Input
                    id="currentTax"
                    type="number"
                    value={currentTax}
                    min={0}
                    max={50}
                    step={0.1}
                    onChange={(e) => setCurrentTax(Number(e.target.value))}
                    className="w-32"
                  />
                </div>
                <p className="text-muted-foreground text-xs">
                  Your current tax bracket
                </p>
              </div>

              <div className="space-y-3">
                <Label htmlFor="retirementTax" className="font-medium text-sm">
                  Retirement Tax Rate (%)
                </Label>
                <div className="flex gap-4 items-center">
                  <Slider
                    min={0}
                    max={50}
                    step={0.1}
                    value={[retirementTax]}
                    onValueChange={([v]) =>
                      setRetirementTax(Number(v.toFixed(1)))
                    }
                    className="flex-1"
                  />
                  <Input
                    id="retirementTax"
                    type="number"
                    value={retirementTax}
                    min={0}
                    max={50}
                    step={0.1}
                    onChange={(e) => setRetirementTax(Number(e.target.value))}
                    className="w-32"
                  />
                </div>
                <p className="text-muted-foreground text-xs">
                  Expected tax bracket in retirement
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="mb-8">
        <h2 className="mb-4 font-semibold text-2xl">Comparison Results</h2>

        {/* Winner Banner */}
        <div
          className={`border rounded-lg p-4 mb-6 ${
            winner === "Roth" ? " " : " "
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3
                className={`text-lg font-semibold ${
                  winner === "Roth" ? "" : ""
                }`}
              >
                {winner} 401(k) performs better in this scenario
              </h3>
              <p className={`text-sm ${winner === "Roth" ? "" : ""}`}>
                Advantage: ${difference.toLocaleString()} more at retirement
              </p>
            </div>
            <div
              className={`text-2xl font-bold ${winner === "Roth" ? "" : ""}`}
            >
              {(
                (difference / Math.min(traditional.afterTax, roth.afterTax)) *
                100
              ).toFixed(1)}
              %
            </div>
          </div>
        </div>

        {/* Detailed Comparison */}
        <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
          <div className="bg-card p-6 border rounded-lg">
            <div className="flex gap-3 items-center mb-4">
              <div className="rounded h-4 w-4 0"></div>
              <h3 className="font-semibold text-lg">Traditional 401(k)</h3>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Annual Employee Contribution:
                </span>
                <span className="font-medium">
                  ${((contribution / 100) * salary).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Annual Employer Match:
                </span>
                <span className="font-medium">
                  ${((employerMatch / 100) * salary).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Total Annual Contribution:
                </span>
                <span className="font-medium">
                  $
                  {(
                    ((contribution + employerMatch) / 100) *
                    salary
                  ).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Current Tax Savings:
                </span>
                <span className="font-medium">
                  $
                  {(
                    ((contribution / 100) * salary * currentTax) /
                    100
                  ).toLocaleString()}
                </span>
              </div>
              <div className="pt-3 border-t">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">
                    Pre-tax Value at Retirement:
                  </span>
                  <span className="font-bold">
                    ${traditional.fv.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-lg">
                  <span className="font-semibold">
                    After-tax Value at Retirement:
                  </span>
                  <span className="font-bold">
                    ${traditional.afterTax.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card p-6 border rounded-lg">
            <div className="flex gap-3 items-center mb-4">
              <div className="rounded h-4 w-4 0"></div>
              <h3 className="font-semibold text-lg">Roth 401(k)</h3>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Annual Employee Contribution (after-tax):
                </span>
                <span className="font-medium">
                  $
                  {(
                    (contribution / 100) *
                    salary *
                    (1 - currentTax / 100)
                  ).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Annual Employer Match (pre-tax):
                </span>
                <span className="font-medium">
                  ${((employerMatch / 100) * salary).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Total Annual Contribution:
                </span>
                <span className="font-medium">
                  $
                  {(
                    (contribution / 100) * salary * (1 - currentTax / 100) +
                    (employerMatch / 100) * salary
                  ).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Current Tax Savings:
                </span>
                <span className="font-medium text-red-600">$0</span>
              </div>
              <div className="pt-3 border-t">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">
                    Total Value at Retirement:
                  </span>
                  <span className="font-bold">${roth.fv.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-lg">
                  <span className="font-semibold">
                    After-tax Value at Retirement:
                  </span>
                  <span className="font-bold">
                    ${roth.afterTax.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Insights */}
      <div className="mb-8">
        <h2 className="mb-4 font-semibold text-2xl">Key Insights</h2>
        <div className="bg-card p-6 border rounded-lg">
          <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
            <div>
              <h3 className="mb-3 font-semibold">Tax Considerations</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Current tax rate:</span>
                  <span className="font-medium">{currentTax}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Retirement tax rate:</span>
                  <span className="font-medium">{retirementTax}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax rate difference:</span>
                  <span
                    className={`font-medium ${
                      currentTax > retirementTax ? "" : ""
                    }`}
                  >
                    {currentTax > retirementTax ? "-" : "+"}
                    {Math.abs(currentTax - retirementTax)}%
                  </span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="mb-3 font-semibold">Investment Growth</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Time to retirement:</span>
                  <span className="font-medium">{years} years</span>
                </div>
                <div className="flex justify-between">
                  <span>Expected annual return:</span>
                  <span className="font-medium">{annualReturn}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Total contributions:</span>
                  <span className="font-medium">
                    $
                    {(
                      ((contribution + employerMatch) / 100) *
                      salary *
                      years
                    ).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t">
            <h3 className="mb-3 font-semibold">Recommendation</h3>
            <p className="text-muted-foreground text-sm">
              {currentTax > retirementTax
                ? "Since your current tax rate is higher than your expected retirement tax rate, a Traditional 401(k) may be more beneficial as you'll save more in taxes now and pay less later."
                : currentTax < retirementTax
                ? "Since your expected retirement tax rate is higher than your current rate, a Roth 401(k) may be more beneficial as you'll pay taxes now at a lower rate."
                : "Since your current and retirement tax rates are the same, both options provide similar tax benefits. Consider other factors like tax diversification and flexibility."}
            </p>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="p-4 border rounded-lg">
        <p className="text-sm">
          <strong>Important Note:</strong> This calculator assumes annual
          contributions at year-end, ignores IRS contribution limits, and does
          not account for investment fees or early withdrawal penalties. Tax
          laws may change, and individual circumstances vary. Consult with a
          financial advisor or tax professional for personalized advice.
        </p>
      </div>
    </div>
  );
};

export default RothVsTraditional401k;
