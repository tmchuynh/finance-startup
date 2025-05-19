"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

  return (
    <div className="mx-auto pt-6 sm:pt-12 lg:pt-16 pb-24 lg:pb-32 w-10/12 md:w-11/12">
      <h1>401(k) vs Roth 401(k) Calculator</h1>
      <h5>Make informed decisions about your retirement savings</h5>
      <p>
        This calculator helps you compare the future value of a Traditional
        401(k) and a Roth 401(k) based on your salary, contribution rates,
        employer match, and expected returns. It also considers your current and
        retirement tax rates. Please fill out the form below to see the results.
      </p>

      {/* Info table for new users */}
      <div className="my-8">
        <h2 className="mb-2 font-semibold text-lg">
          401(k) vs Roth 401(k): Key Differences
        </h2>
        <div className="overflow-x-auto">
          <table className="border border-gray-300 min-w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-3 py-2 border text-left">Feature</th>
                <th className="px-3 py-2 border text-left">
                  Traditional 401(k)
                </th>
                <th className="px-3 py-2 border text-left">Roth 401(k)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-3 py-2 border">Contributions</td>
                <td className="px-3 py-2 border">
                  Pre-tax (lowers taxable income now)
                </td>
                <td className="px-3 py-2 border">
                  After-tax (no immediate tax benefit)
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Growth</td>
                <td className="px-3 py-2 border">Tax-deferred</td>
                <td className="px-3 py-2 border">Tax-free</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Withdrawals in Retirement</td>
                <td className="px-3 py-2 border">Taxed as ordinary income</td>
                <td className="px-3 py-2 border">Tax-free (if qualified)</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Employer Match</td>
                <td className="px-3 py-2 border">
                  Pre-tax, taxed at withdrawal
                </td>
                <td className="px-3 py-2 border">
                  Pre-tax, taxed at withdrawal
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">
                  Required Minimum Distributions (RMDs)
                </td>
                <td className="px-3 py-2 border">Yes, starting at age 73</td>
                <td className="px-3 py-2 border">Yes, starting at age 73</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Best For</td>
                <td className="px-3 py-2 border">
                  Expecting lower tax rate in retirement
                </td>
                <td className="px-3 py-2 border">
                  Expecting higher tax rate in retirement
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {/* End info table */}

      <form onSubmit={(e) => e.preventDefault()} className="my-5">
        <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 mb-8">
          <div>
            <Label>Annual Salary ($)</Label>
            <Input
              type="number"
              value={salary}
              min={0}
              onChange={(e) => setSalary(Number(e.target.value))}
            />
          </div>
          <div>
            <Label>Employee Contribution (%)</Label>
            <Input
              type="number"
              value={contribution}
              min={0}
              max={100}
              step={0.1}
              onChange={(e) => setContribution(Number(e.target.value))}
            />
          </div>
          <div>
            <Label>Employer Match (%)</Label>
            <Input
              type="number"
              value={employerMatch}
              min={0}
              max={100}
              step={0.1}
              onChange={(e) => setEmployerMatch(Number(e.target.value))}
            />
          </div>
          <div>
            <Label>Years to Grow</Label>
            <Input
              type="number"
              value={years}
              min={1}
              max={50}
              onChange={(e) => setYears(Number(e.target.value))}
            />
          </div>
          <div>
            <Label>Expected Annual Return (%)</Label>
            <Input
              type="number"
              value={annualReturn}
              min={0}
              max={20}
              step={0.1}
              onChange={(e) => setAnnualReturn(Number(e.target.value))}
            />
          </div>
        </div>
        <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 mb-8">
          <div>
            <Label>Current Marginal Tax Rate (%)</Label>
            <Input
              type="number"
              value={currentTax}
              min={0}
              max={50}
              step={0.1}
              onChange={(e) => setCurrentTax(Number(e.target.value))}
            />
          </div>
          <div>
            <Label>Retirement Tax Rate (%)</Label>
            <Input
              type="number"
              value={retirementTax}
              min={0}
              max={50}
              step={0.1}
              onChange={(e) => setRetirementTax(Number(e.target.value))}
            />
          </div>
        </div>
      </form>

      {/* Card-like results display */}
      <h2>Results</h2>
      <div className="gap-5 grid grid-cols-1 md:grid-cols-2 mt-3">
        <div className="bg-white shadow p-5 border border-gray-300 rounded-lg">
          <h3 className="flex items-center gap-2 mb-2 font-semibold text-blue-700 text-lg">
            Traditional 401(k)
          </h3>
          <ul>
            <li>
              <span className="text-gray-700">After-tax at retirement:</span>{" "}
              <strong className="text-blue-900">
                $
                {traditional.afterTax.toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })}
              </strong>
            </li>
          </ul>
        </div>
        <div className="bg-white shadow p-5 border border-gray-300 rounded-lg">
          <h3 className="flex items-center gap-2 mb-2 font-semibold text-green-700 text-lg">
            Roth 401(k)
          </h3>
          <ul>
            <li>
              <span className="text-gray-700">After-tax at retirement:</span>{" "}
              <strong className="text-green-900">
                $
                {roth.afterTax.toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })}
              </strong>
            </li>
          </ul>
        </div>
      </div>
      <p style={{ marginTop: 24, color: "#666" }}>
        Note: This calculator assumes annual contributions at year-end, ignores
        IRS contribution limits, and does not account for investment fees or
        early withdrawal penalties.
      </p>
    </div>
  );
};

export default RothVsTraditional401k;
