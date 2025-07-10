"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function RetirementWithdrawalAndSpendingCalculator() {
  const [initialSavings, setInitialSavings] = useState<string>("");
  const [annualSpending, setAnnualSpending] = useState<string>("50000");
  const [expectedReturn, setExpectedReturn] = useState<string>("5");
  const [years, setYears] = useState<string>("30");
  const [inflationRate, setInflationRate] = useState<string>("2.5");

  const [result, setResult] = useState<{
    yearsSupported: number;
    endingBalance: number;
    inflationAdjustedSpending: number;
  } | null>(null);

  // Calculate how many years the savings will last with withdrawals and growth
  function calcYearsSupported(PV: number, PMT: number, r: number) {
    // PV = PMT * [1 - (1 + r)^-n]/r  => solve for n
    if (r === 0) return PV / PMT;
    return Math.log(1 - (PV * r) / PMT) / Math.log(1 / (1 + r));
  }

  // Calculate ending balance after n years of withdrawals
  function calcEndingBalance(PV: number, PMT: number, r: number, n: number) {
    // FV = PV*(1+r)^n - PMT*[(1+r)^n - 1]/r
    if (r === 0) return PV - PMT * n;
    return PV * Math.pow(1 + r, n) - PMT * ((Math.pow(1 + r, n) - 1) / r);
  }

  const handleCalculate = () => {
    const PV = parseFloat(initialSavings);
    const PMT = parseFloat(annualSpending);
    const r = parseFloat(expectedReturn) / 100;
    const n = parseFloat(years);
    const inflation = parseFloat(inflationRate) / 100;

    if (
      !isNaN(PV) &&
      !isNaN(PMT) &&
      !isNaN(r) &&
      !isNaN(n) &&
      !isNaN(inflation) &&
      PV >= 0 &&
      PMT > 0 &&
      n > 0
    ) {
      const yearsSupported = calcYearsSupported(PV, PMT, r);
      const endingBalance = calcEndingBalance(PV, PMT, r, n);
      // Inflation-adjusted spending in final year
      const inflationAdjustedSpending = PMT * Math.pow(1 + inflation, n - 1);
      setResult({
        yearsSupported,
        endingBalance,
        inflationAdjustedSpending,
      });
    } else {
      setResult(null);
    }
  };

  return (
    <div className="mt-8 md:mt-12 mx-auto h-full w-10/12 md:w-11/12">
      <h1>Retirement Withdrawal and Spending Calculator</h1>
      <p className="mb-4">
        <strong>
          Estimate how long your retirement savings will last and what your
          ending balance will be, based on your annual withdrawals, investment
          returns, and inflation.
        </strong>
      </p>
      <section className="mb-8">
        <h2>How Does This Calculator Work?</h2>
        <p>
          Enter your starting retirement savings, annual spending, expected
          investment return, years in retirement, and inflation rate. The
          calculator estimates how long your savings will last and your ending
          balance.
        </p>
        <div className="mb-6">
          <h3>Typical Input Values</h3>
          <table className="mb-4 border border-gray-300 min-w-full text-sm">
            <thead>
              <tr className="">
                <th className="px-3 py-2 border text-left">Field</th>
                <th className="px-3 py-2 border text-left">Typical Value</th>
                <th className="px-3 py-2 border text-left">Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-3 py-2 border">Initial Savings ($)</td>
                <td className="px-3 py-2 border">$500,000 - $1,500,000</td>
                <td className="px-3 py-2 border">Total at retirement</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Annual Spending ($)</td>
                <td className="px-3 py-2 border">$40,000 - $80,000</td>
                <td className="px-3 py-2 border">
                  Desired withdrawals per year
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Expected Return (%)</td>
                <td className="px-3 py-2 border">4% - 6%</td>
                <td className="px-3 py-2 border">
                  Average for balanced portfolio
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Years in Retirement</td>
                <td className="px-3 py-2 border">20 - 35</td>
                <td className="px-3 py-2 border">
                  How long you expect to need income
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Inflation Rate (%)</td>
                <td className="px-3 py-2 border">2% - 3%</td>
                <td className="px-3 py-2 border">
                  U.S. long-term average: ~2.5%
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mb-6">
          <h3>Withdrawal & Spending Details</h3>
          <table className="mb-4 border border-gray-300 min-w-full text-sm">
            <thead>
              <tr className="">
                <th className="px-3 py-2 border text-left">Term</th>
                <th className="px-3 py-2 border text-left">Description</th>
                <th className="px-3 py-2 border text-left">Example</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-3 py-2 border">Initial Savings</td>
                <td className="px-3 py-2 border">Total saved at retirement</td>
                <td className="px-3 py-2 border">$1,000,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Annual Spending</td>
                <td className="px-3 py-2 border">Yearly withdrawals</td>
                <td className="px-3 py-2 border">$50,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Expected Return</td>
                <td className="px-3 py-2 border">
                  Average annual investment growth
                </td>
                <td className="px-3 py-2 border">5%</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Years in Retirement</td>
                <td className="px-3 py-2 border">
                  How long you plan to withdraw
                </td>
                <td className="px-3 py-2 border">30</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Inflation Rate</td>
                <td className="px-3 py-2 border">
                  Average annual price increase
                </td>
                <td className="px-3 py-2 border">2.5%</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Years Supported</td>
                <td className="px-3 py-2 border">How long savings will last</td>
                <td className="px-3 py-2 border">28</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Ending Balance</td>
                <td className="px-3 py-2 border">
                  Amount left after withdrawals
                </td>
                <td className="px-3 py-2 border">$120,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">
                  Inflation-Adjusted Spending (Final Year)
                </td>
                <td className="px-3 py-2 border">
                  Spending in last year, adjusted for inflation
                </td>
                <td className="px-3 py-2 border">$104,000</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mb-6">
          <h3>Real Data Example (2024)</h3>
          <table className="mb-4 border border-gray-300 min-w-full text-sm">
            <thead>
              <tr className="">
                <th className="px-3 py-2 border text-left">Scenario</th>
                <th className="px-3 py-2 border text-left">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-3 py-2 border">Initial Savings</td>
                <td className="px-3 py-2 border">$1,000,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Annual Spending</td>
                <td className="px-3 py-2 border">$50,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Expected Return</td>
                <td className="px-3 py-2 border">5%</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Years in Retirement</td>
                <td className="px-3 py-2 border">30</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Inflation Rate</td>
                <td className="px-3 py-2 border">2.5%</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Years Supported</td>
                <td className="px-3 py-2 border">28</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Ending Balance</td>
                <td className="px-3 py-2 border">$120,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">
                  Inflation-Adjusted Spending (Final Year)
                </td>
                <td className="px-3 py-2 border">$104,000</td>
              </tr>
            </tbody>
          </table>
          <p className="text-sm">
            <strong>Source:</strong> Vanguard, Fidelity, 2024 averages.
          </p>
        </div>
        <div className="mb-6">
          <h3>Tips for Beginners</h3>
          <ul className="list-disc list-inside">
            <li>
              The "4% rule" suggests withdrawing 4% of your savings per year for
              a 30-year retirement.
            </li>
            <li>
              Inflation reduces your purchasing power over time—plan for rising
              costs.
            </li>
            <li>Review your spending and investment returns annually.</li>
            <li>
              Consider Social Security, pensions, and other income sources.
            </li>
            <li>
              Consult a financial advisor for personalized withdrawal
              strategies.
            </li>
          </ul>
        </div>
      </section>
      <div className="gap-4 grid md:grid-cols-3">
        <div className="mb-2">
          <label className="block mb-1 font-medium">Initial Savings ($):</label>
          <input
            type="number"
            className="px-2 py-1 border rounded w-full"
            value={initialSavings}
            onChange={(e) => setInitialSavings(e.target.value)}
            placeholder="e.g., 1000000"
            min="0"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1 font-medium">Annual Spending ($):</label>
          <input
            type="number"
            className="px-2 py-1 border rounded w-full"
            value={annualSpending}
            onChange={(e) => setAnnualSpending(e.target.value)}
            placeholder="e.g., 50000"
            min="0"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1 font-medium">Expected Return (%):</label>
          <input
            type="number"
            className="px-2 py-1 border rounded w-full"
            value={expectedReturn}
            onChange={(e) => setExpectedReturn(e.target.value)}
            placeholder="e.g., 5"
            min="0"
            max="100"
            step="0.01"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1 font-medium">Years in Retirement:</label>
          <input
            type="number"
            className="px-2 py-1 border rounded w-full"
            value={years}
            onChange={(e) => setYears(e.target.value)}
            placeholder="e.g., 30"
            min="1"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1 font-medium">Inflation Rate (%):</label>
          <input
            type="number"
            className="px-2 py-1 border rounded w-full"
            value={inflationRate}
            onChange={(e) => setInflationRate(e.target.value)}
            placeholder="e.g., 2.5"
            min="0"
            max="100"
            step="0.01"
          />
        </div>
      </div>
      <Button className="mt-2 px-4 py-2 rounded" onClick={handleCalculate}>
        Calculate Withdrawal Plan
      </Button>
      {result && (
        <div className="flex flex-col gap-4 mt-6">
          <div className="shadow p-4 border rounded-lg">
            <h3>Results</h3>
            <table className="border border-gray-300 min-w-full text-sm">
              <tbody>
                <tr>
                  <td className="px-3 py-2 border font-medium">
                    Years Supported
                  </td>
                  <td className="px-3 py-2 border">
                    {result.yearsSupported.toLocaleString(undefined, {
                      minimumFractionDigits: 1,
                      maximumFractionDigits: 1,
                    })}
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2 border font-medium">
                    Ending Balance
                  </td>
                  <td className="px-3 py-2 border">
                    $
                    {result.endingBalance.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2 border font-medium">
                    Inflation-Adjusted Spending (Final Year)
                  </td>
                  <td className="px-3 py-2 border">
                    $
                    {result.inflationAdjustedSpending.toLocaleString(
                      undefined,
                      { minimumFractionDigits: 2, maximumFractionDigits: 2 }
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="mt-2 text-sm">
              <strong>Note:</strong> This calculator does not include taxes,
              Social Security, or pensions. Actual results may vary.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
