"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function CollegeSavingsCalculator() {
  const [currentSavings, setCurrentSavings] = useState<string>("");
  const [monthlyContribution, setMonthlyContribution] = useState<string>("");
  const [yearsToCollege, setYearsToCollege] = useState<string>("10");
  const [annualCollegeCost, setAnnualCollegeCost] = useState<string>("30000");
  const [yearsInCollege, setYearsInCollege] = useState<string>("4");
  const [costInflationRate, setCostInflationRate] = useState<string>("5");
  const [investmentReturn, setInvestmentReturn] = useState<string>("6");

  const [result, setResult] = useState<{
    totalCollegeCost: number;
    futureValue: number;
    savingsGap: number;
    percentCovered: number;
  } | null>(null);

  // Calculate future college cost with inflation
  function calcFutureCollegeCost(
    cost: number,
    inflation: number,
    years: number,
    duration: number
  ) {
    let total = 0;
    for (let i = 0; i < duration; i++) {
      total += cost * Math.pow(1 + inflation, years + i);
    }
    return total;
  }

  // Calculate future value of savings and contributions
  function calcFutureValue(PV: number, PMT: number, r: number, n: number) {
    // FV = PV*(1+r)^n + PMT*(((1+r)^n - 1)/r)
    if (r === 0) return PV + PMT * n * 12;
    return PV * Math.pow(1 + r, n) + PMT * 12 * ((Math.pow(1 + r, n) - 1) / r);
  }

  const handleCalculate = () => {
    const PV = parseFloat(currentSavings);
    const PMT = parseFloat(monthlyContribution);
    const n = parseFloat(yearsToCollege);
    const annualCost = parseFloat(annualCollegeCost);
    const duration = parseFloat(yearsInCollege);
    const inflation = parseFloat(costInflationRate) / 100;
    const returnRate = parseFloat(investmentReturn) / 100;

    if (
      !isNaN(PV) &&
      !isNaN(PMT) &&
      !isNaN(n) &&
      !isNaN(annualCost) &&
      !isNaN(duration) &&
      !isNaN(inflation) &&
      !isNaN(returnRate) &&
      PV >= 0 &&
      PMT >= 0 &&
      n > 0 &&
      annualCost > 0 &&
      duration > 0 &&
      inflation >= 0 &&
      returnRate >= 0
    ) {
      const totalCollegeCost = calcFutureCollegeCost(
        annualCost,
        inflation,
        n,
        duration
      );
      const futureValue = calcFutureValue(PV, PMT, returnRate, n);
      const savingsGap = totalCollegeCost - futureValue;
      const percentCovered = (futureValue / totalCollegeCost) * 100;
      setResult({
        totalCollegeCost,
        futureValue,
        savingsGap,
        percentCovered,
      });
    } else {
      setResult(null);
    }
  };

  return (
    <div className="mt-8 md:mt-12 mx-auto h-full w-10/12 md:w-11/12">
      <h1>College Savings Calculator</h1>
      <p className="mb-4">
        <strong>
          Estimate how much you need to save for college, how your savings will
          grow, and what percent of future college costs you can cover.
        </strong>
      </p>
      <section className="mb-8">
        <h2>How Does This Calculator Work?</h2>
        <p>
          Enter your current savings, monthly contributions, years until
          college, expected annual college cost, years in college, college cost
          inflation rate, and expected investment return. The calculator
          estimates the total future cost, your savings at college start, and
          any gap.
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
                <td className="px-3 py-2 border">Current Savings ($)</td>
                <td className="px-3 py-2 border">$2,000 - $30,000</td>
                <td className="px-3 py-2 border">
                  529 plan, savings account, etc.
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Monthly Contribution ($)</td>
                <td className="px-3 py-2 border">$100 - $800</td>
                <td className="px-3 py-2 border">Amount saved each month</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Years to College</td>
                <td className="px-3 py-2 border">5 - 18</td>
                <td className="px-3 py-2 border">Child's age until college</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Annual College Cost ($)</td>
                <td className="px-3 py-2 border">$20,000 - $70,000</td>
                <td className="px-3 py-2 border">
                  Current cost per year (tuition, room, board)
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Years in College</td>
                <td className="px-3 py-2 border">2 - 5</td>
                <td className="px-3 py-2 border">Typical: 4 years</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">
                  College Cost Inflation Rate (%)
                </td>
                <td className="px-3 py-2 border">3% - 6%</td>
                <td className="px-3 py-2 border">U.S. average: ~5%</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Investment Return (%)</td>
                <td className="px-3 py-2 border">4% - 7%</td>
                <td className="px-3 py-2 border">529 plan average: 6%</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mb-6">
          <h3>College Savings Details</h3>
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
                <td className="px-3 py-2 border">Current Savings</td>
                <td className="px-3 py-2 border">Amount saved now</td>
                <td className="px-3 py-2 border">$10,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Monthly Contribution</td>
                <td className="px-3 py-2 border">Amount saved each month</td>
                <td className="px-3 py-2 border">$300</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Years to College</td>
                <td className="px-3 py-2 border">Years until college starts</td>
                <td className="px-3 py-2 border">10</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Annual College Cost</td>
                <td className="px-3 py-2 border">Current cost per year</td>
                <td className="px-3 py-2 border">$30,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Years in College</td>
                <td className="px-3 py-2 border">Number of years</td>
                <td className="px-3 py-2 border">4</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">
                  College Cost Inflation Rate
                </td>
                <td className="px-3 py-2 border">Expected annual increase</td>
                <td className="px-3 py-2 border">5%</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Investment Return</td>
                <td className="px-3 py-2 border">
                  Expected annual return on savings
                </td>
                <td className="px-3 py-2 border">6%</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">
                  Total College Cost (future)
                </td>
                <td className="px-3 py-2 border">Sum of all years, inflated</td>
                <td className="px-3 py-2 border">$181,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Future Value of Savings</td>
                <td className="px-3 py-2 border">
                  Projected savings at college start
                </td>
                <td className="px-3 py-2 border">$65,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Savings Gap</td>
                <td className="px-3 py-2 border">Amount still needed</td>
                <td className="px-3 py-2 border">$116,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">% Covered by Savings</td>
                <td className="px-3 py-2 border">Future value ÷ total cost</td>
                <td className="px-3 py-2 border">36%</td>
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
                <td className="px-3 py-2 border">Current Savings</td>
                <td className="px-3 py-2 border">$15,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Monthly Contribution</td>
                <td className="px-3 py-2 border">$400</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Years to College</td>
                <td className="px-3 py-2 border">8</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Annual College Cost</td>
                <td className="px-3 py-2 border">$35,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Years in College</td>
                <td className="px-3 py-2 border">4</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">
                  College Cost Inflation Rate
                </td>
                <td className="px-3 py-2 border">5%</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Investment Return</td>
                <td className="px-3 py-2 border">6%</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">
                  Total College Cost (future)
                </td>
                <td className="px-3 py-2 border">$181,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Future Value of Savings</td>
                <td className="px-3 py-2 border">$65,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Savings Gap</td>
                <td className="px-3 py-2 border">$116,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">% Covered by Savings</td>
                <td className="px-3 py-2 border">36%</td>
              </tr>
            </tbody>
          </table>
          <p className="text-sm">
            <strong>Source:</strong> College Board, Vanguard, 2024 averages.
          </p>
        </div>
        <div className="mb-6">
          <h3>Tips for Beginners</h3>
          <ul className="list-disc list-inside">
            <li>
              Start saving early—college costs rise faster than inflation.
            </li>
            <li>Use a 529 plan for tax-advantaged college savings.</li>
            <li>
              Review your plan annually and adjust contributions as needed.
            </li>
            <li>
              Consider scholarships, grants, and financial aid for the gap.
            </li>
            <li>
              Consult a financial advisor for personalized college planning.
            </li>
          </ul>
        </div>
      </section>
      <div className="mb-8">
        <h3 className="mb-2 font-medium">College Savings Inputs</h3>
        <div className="gap-4 grid md:grid-cols-3">
          <div className="mb-2">
            <label className="block mb-1 font-medium">
              Current Savings ($):
            </label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={currentSavings}
              onChange={(e) => setCurrentSavings(e.target.value)}
              placeholder="e.g., 15000"
              min="0"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">
              Monthly Contribution ($):
            </label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(e.target.value)}
              placeholder="e.g., 400"
              min="0"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">Years to College:</label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={yearsToCollege}
              onChange={(e) => setYearsToCollege(e.target.value)}
              placeholder="e.g., 8"
              min="1"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">
              Annual College Cost ($):
            </label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={annualCollegeCost}
              onChange={(e) => setAnnualCollegeCost(e.target.value)}
              placeholder="e.g., 35000"
              min="0"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">Years in College:</label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={yearsInCollege}
              onChange={(e) => setYearsInCollege(e.target.value)}
              placeholder="e.g., 4"
              min="1"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">
              College Cost Inflation Rate (%):
            </label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={costInflationRate}
              onChange={(e) => setCostInflationRate(e.target.value)}
              placeholder="e.g., 5"
              min="0"
              max="20"
              step="0.01"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">
              Investment Return (%):
            </label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={investmentReturn}
              onChange={(e) => setInvestmentReturn(e.target.value)}
              placeholder="e.g., 6"
              min="0"
              max="20"
              step="0.01"
            />
          </div>
        </div>
      </div>
      <Button className="mt-2 px-4 py-2 rounded" onClick={handleCalculate}>
        Calculate College Savings
      </Button>
      {result && (
        <div className="flex flex-col gap-4 mt-6">
          <div className="shadow p-4 border rounded-lg">
            <h3 className="mb-2 font-semibold">Results</h3>
            <table className="border border-gray-300 min-w-full text-sm">
              <tbody>
                <tr>
                  <td className="px-3 py-2 border font-medium">
                    Total College Cost (future)
                  </td>
                  <td className="px-3 py-2 border">
                    $
                    {result.totalCollegeCost.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2 border font-medium">
                    Future Value of Savings
                  </td>
                  <td className="px-3 py-2 border">
                    $
                    {result.futureValue.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2 border font-medium">Savings Gap</td>
                  <td className="px-3 py-2 border">
                    $
                    {result.savingsGap.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2 border font-medium">
                    % Covered by Savings
                  </td>
                  <td className="px-3 py-2 border">
                    {result.percentCovered.toLocaleString(undefined, {
                      minimumFractionDigits: 1,
                      maximumFractionDigits: 1,
                    })}
                    %
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="mt-2 text-sm">
              <strong>Note:</strong> This calculator provides estimates. Actual
              college costs and investment returns may vary.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
