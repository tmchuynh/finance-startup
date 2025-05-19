"use client";

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

      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <label>
            Annual Salary ($)
            <input
              type="number"
              value={salary}
              min={0}
              onChange={(e) => setSalary(Number(e.target.value))}
            />
          </label>
          <br />
          <label>
            Employee Contribution (%)
            <input
              type="number"
              value={contribution}
              min={0}
              max={100}
              step={0.1}
              onChange={(e) => setContribution(Number(e.target.value))}
            />
          </label>
          <br />
          <label>
            Employer Match (%)
            <input
              type="number"
              value={employerMatch}
              min={0}
              max={100}
              step={0.1}
              onChange={(e) => setEmployerMatch(Number(e.target.value))}
            />
          </label>
          <br />
          <label>
            Years to Grow
            <input
              type="number"
              value={years}
              min={1}
              max={50}
              onChange={(e) => setYears(Number(e.target.value))}
            />
          </label>
          <br />
          <label>
            Expected Annual Return (%)
            <input
              type="number"
              value={annualReturn}
              min={0}
              max={20}
              step={0.1}
              onChange={(e) => setAnnualReturn(Number(e.target.value))}
            />
          </label>
        </div>
        <div>
          <label>
            Current Marginal Tax Rate (%)
            <input
              type="number"
              value={currentTax}
              min={0}
              max={50}
              step={0.1}
              onChange={(e) => setCurrentTax(Number(e.target.value))}
            />
          </label>
          <br />
          <label>
            Retirement Tax Rate (%)
            <input
              type="number"
              value={retirementTax}
              min={0}
              max={50}
              step={0.1}
              onChange={(e) => setRetirementTax(Number(e.target.value))}
            />
          </label>
        </div>
      </form>
      <h2>Results</h2>
      <div style={{ display: "flex", gap: 32 }}>
        <div>
          <h3>Traditional 401(k)</h3>
          <p>
            <strong>
              After-tax at retirement: $
              {traditional.afterTax.toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })}
            </strong>
          </p>
        </div>
        <div>
          <h3>Roth 401(k)</h3>
          <p>
            <strong>
              After-tax at retirement: $
              {roth.afterTax.toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })}
            </strong>
          </p>
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
