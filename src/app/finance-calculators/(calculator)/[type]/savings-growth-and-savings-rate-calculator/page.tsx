"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function SavingsGrowthAndSavingsRateCalculator() {
  const [currentSavings, setCurrentSavings] = useState<string>("");
  const [monthlyContribution, setMonthlyContribution] = useState<string>("");
  const [years, setYears] = useState<string>("10");
  const [interestRate, setInterestRate] = useState<string>("3");
  const [savingsGoal, setSavingsGoal] = useState<string>("100000");
  const [annualIncome, setAnnualIncome] = useState<string>("");

  const [result, setResult] = useState<{
    futureValue: number;
    requiredSavingsRate: number;
    goalMet: boolean;
  } | null>(null);

  function calcFutureValue(PV: number, PMT: number, r: number, n: number) {
    // FV = PV*(1+r)^n + PMT*(((1+r)^n - 1)/r)
    if (r === 0) return PV + PMT * n * 12;
    return PV * Math.pow(1 + r, n) + PMT * 12 * ((Math.pow(1 + r, n) - 1) / r);
  }

  function calcRequiredSavingsRate(
    goal: number,
    PV: number,
    r: number,
    n: number,
    income: number
  ) {
    // Solve for PMT: goal = PV*(1+r)^n + PMT*12*(((1+r)^n - 1)/r)
    // PMT = (goal - PV*(1+r)^n) * r / (12*((1+r)^n - 1))
    if (r === 0) return ((goal - PV) / (n * 12) / (income / 12)) * 100;
    const numerator = (goal - PV * Math.pow(1 + r, n)) * r;
    const denominator = 12 * (Math.pow(1 + r, n) - 1) * (income / 12);
    return denominator > 0 ? (numerator / denominator) * 100 : 0;
  }

  const handleCalculate = () => {
    const PV = parseFloat(currentSavings);
    const PMT = parseFloat(monthlyContribution);
    const n = parseFloat(years);
    const r = parseFloat(interestRate) / 100;
    const goal = parseFloat(savingsGoal);
    const income = parseFloat(annualIncome);

    if (
      !isNaN(PV) &&
      !isNaN(PMT) &&
      !isNaN(n) &&
      !isNaN(r) &&
      !isNaN(goal) &&
      !isNaN(income) &&
      PV >= 0 &&
      PMT >= 0 &&
      n > 0 &&
      r >= 0 &&
      goal > 0 &&
      income > 0
    ) {
      const FV = calcFutureValue(PV, PMT, r, n);
      const requiredSavingsRate = calcRequiredSavingsRate(
        goal,
        PV,
        r,
        n,
        income
      );
      setResult({
        futureValue: FV,
        requiredSavingsRate,
        goalMet: FV >= goal,
      });
    } else {
      setResult(null);
    }
  };

  return (
    <div className="mt-8 md:mt-12 mx-auto h-full w-10/12 md:w-11/12">
      <h1>Savings Growth & Savings Rate Calculator</h1>
      <p className="mb-4">
        <strong>
          Estimate how your savings will grow over time and what savings rate
          you need to reach your goal.
        </strong>
      </p>
      <section className="mb-8">
        <h2>How Does This Calculator Work?</h2>
        <p>
          Enter your current savings, monthly contributions, years to save,
          interest rate, savings goal, and annual income. The calculator
          estimates your future savings and the savings rate needed to reach
          your goal.
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
                <td className="px-3 py-2 border">$5,000 - $50,000</td>
                <td className="px-3 py-2 border">Total in savings account</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Monthly Contribution ($)</td>
                <td className="px-3 py-2 border">$200 - $1,000</td>
                <td className="px-3 py-2 border">Amount saved each month</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Years to Save</td>
                <td className="px-3 py-2 border">3 - 20</td>
                <td className="px-3 py-2 border">Time horizon for your goal</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Interest Rate (%)</td>
                <td className="px-3 py-2 border">1% - 5%</td>
                <td className="px-3 py-2 border">High-yield savings: 3-5%</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Savings Goal ($)</td>
                <td className="px-3 py-2 border">$20,000 - $200,000</td>
                <td className="px-3 py-2 border">Target amount to reach</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Annual Income ($)</td>
                <td className="px-3 py-2 border">$40,000 - $150,000</td>
                <td className="px-3 py-2 border">
                  Used to calculate savings rate
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mb-6">
          <h3>Savings Growth & Rate Details</h3>
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
                <td className="px-3 py-2 border">Amount you have now</td>
                <td className="px-3 py-2 border">$10,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Monthly Contribution</td>
                <td className="px-3 py-2 border">Amount you save each month</td>
                <td className="px-3 py-2 border">$500</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Interest Rate</td>
                <td className="px-3 py-2 border">Annual yield on savings</td>
                <td className="px-3 py-2 border">3%</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Years to Save</td>
                <td className="px-3 py-2 border">How long you save</td>
                <td className="px-3 py-2 border">10</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Future Value</td>
                <td className="px-3 py-2 border">Projected savings at end</td>
                <td className="px-3 py-2 border">$85,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Savings Goal</td>
                <td className="px-3 py-2 border">Target amount</td>
                <td className="px-3 py-2 border">$80,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Required Savings Rate</td>
                <td className="px-3 py-2 border">
                  Percent of income needed to reach goal
                </td>
                <td className="px-3 py-2 border">10%</td>
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
                <td className="px-3 py-2 border">$600</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Years to Save</td>
                <td className="px-3 py-2 border">10</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Interest Rate</td>
                <td className="px-3 py-2 border">3.5%</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Savings Goal</td>
                <td className="px-3 py-2 border">$100,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Annual Income</td>
                <td className="px-3 py-2 border">$72,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Future Value</td>
                <td className="px-3 py-2 border">$102,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Required Savings Rate</td>
                <td className="px-3 py-2 border">9.8%</td>
              </tr>
            </tbody>
          </table>
          <p className="text-sm">
            <strong>Source:</strong> Bankrate, NerdWallet, 2024 averages.
          </p>
        </div>
        <div className="mb-6">
          <h3>Tips for Beginners</h3>
          <ul className="list-disc list-inside">
            <li>
              Start saving early—compound interest makes a big difference over
              time.
            </li>
            <li>Increase your monthly savings as your income grows.</li>
            <li>
              High-yield savings accounts offer better returns than regular
              savings.
            </li>
            <li>Set a realistic goal and track your progress each year.</li>
            <li>
              Consult a financial advisor for personalized savings strategies.
            </li>
          </ul>
        </div>
      </section>
      <div className="mb-8">
        <h3>Savings Inputs</h3>
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
              placeholder="e.g., 600"
              min="0"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">Years to Save:</label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              placeholder="e.g., 10"
              min="1"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">Interest Rate (%):</label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              placeholder="e.g., 3.5"
              min="0"
              max="100"
              step="0.01"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">Savings Goal ($):</label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={savingsGoal}
              onChange={(e) => setSavingsGoal(e.target.value)}
              placeholder="e.g., 100000"
              min="0"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">Annual Income ($):</label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={annualIncome}
              onChange={(e) => setAnnualIncome(e.target.value)}
              placeholder="e.g., 72000"
              min="0"
            />
          </div>
        </div>
      </div>
      <Button className="mt-2 px-4 py-2 rounded" onClick={handleCalculate}>
        Calculate Savings Growth
      </Button>
      {result && (
        <div className="flex flex-col gap-4 mt-6">
          <div className="shadow p-4 border rounded-lg">
            <h3>Results</h3>
            <table className="border border-gray-300 min-w-full text-sm">
              <tbody>
                <tr>
                  <td className="px-3 py-2 border font-medium">Future Value</td>
                  <td className="px-3 py-2 border">
                    $
                    {result.futureValue.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2 border font-medium">
                    Required Savings Rate
                  </td>
                  <td className="px-3 py-2 border">
                    {result.requiredSavingsRate > 0
                      ? result.requiredSavingsRate.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }) + "%"
                      : "-"}
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2 border font-medium">Goal Met?</td>
                  <td className="px-3 py-2 border">
                    {result.goalMet ? (
                      <span className="font-bold">Yes</span>
                    ) : (
                      <span className="font-bold text-red-700">No</span>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="mt-2 text-sm">
              <strong>Note:</strong> This calculator provides estimates. Actual
              results may vary based on your savings habits and interest rates.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
