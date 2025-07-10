"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function RetirementSavingsRateAndInvestmentGrowthCalculator() {
  const [currentAge, setCurrentAge] = useState<string>("");
  const [retirementAge, setRetirementAge] = useState<string>("67");
  const [currentSavings, setCurrentSavings] = useState<string>("");
  const [annualIncome, setAnnualIncome] = useState<string>("");
  const [savingsRate, setSavingsRate] = useState<string>("15");
  const [expectedReturn, setExpectedReturn] = useState<string>("6");
  const [desiredNestEgg, setDesiredNestEgg] = useState<string>("1000000");

  const [result, setResult] = useState<{
    annualContribution: number;
    totalAtRetirement: number;
    nestEggGoalMet: boolean;
    requiredSavingsRate: number;
  } | null>(null);

  function calcFutureValue(PV: number, PMT: number, r: number, n: number) {
    // FV = PV*(1+r)^n + PMT*(((1+r)^n - 1)/r)
    if (r === 0) return PV + PMT * n;
    return PV * Math.pow(1 + r, n) + PMT * ((Math.pow(1 + r, n) - 1) / r);
  }

  function calcRequiredSavingsRate(
    PV: number,
    income: number,
    r: number,
    n: number,
    goal: number
  ) {
    // Solve for PMT: goal = PV*(1+r)^n + PMT*(((1+r)^n - 1)/r)
    // PMT = (goal - PV*(1+r)^n) * r / ((1+r)^n - 1)
    if (r === 0) return ((goal - PV) / n / income) * 100;
    const numerator = (goal - PV * Math.pow(1 + r, n)) * r;
    const denominator = (Math.pow(1 + r, n) - 1) * income;
    return (numerator / denominator) * 100;
  }

  const handleCalculate = () => {
    const age = parseFloat(currentAge);
    const retire = parseFloat(retirementAge);
    const savings = parseFloat(currentSavings);
    const income = parseFloat(annualIncome);
    const rate = parseFloat(savingsRate) / 100;
    const returnRate = parseFloat(expectedReturn) / 100;
    const goal = parseFloat(desiredNestEgg);

    if (
      !isNaN(age) &&
      !isNaN(retire) &&
      !isNaN(savings) &&
      !isNaN(income) &&
      !isNaN(rate) &&
      !isNaN(returnRate) &&
      !isNaN(goal) &&
      age > 0 &&
      retire > age &&
      savings >= 0 &&
      income > 0 &&
      rate >= 0 &&
      returnRate >= 0 &&
      goal > 0
    ) {
      const years = retire - age;
      const annualContribution = income * rate;
      const FV = calcFutureValue(
        savings,
        annualContribution,
        returnRate,
        years
      );
      const nestEggGoalMet = FV >= goal;
      const requiredSavingsRate = calcRequiredSavingsRate(
        savings,
        income,
        returnRate,
        years,
        goal
      );
      setResult({
        annualContribution,
        totalAtRetirement: FV,
        nestEggGoalMet,
        requiredSavingsRate,
      });
    } else {
      setResult(null);
    }
  };

  return (
    <div className="mt-8 md:mt-12 mx-auto h-full w-10/12 md:w-11/12">
      <h1>Retirement Savings Rate & Investment Growth Calculator</h1>
      <p className="mb-4">
        <strong>
          Estimate how much you need to save each year and how your investments
          may grow to reach your retirement nest egg goal.
        </strong>
      </p>
      <section className="mb-8">
        <h2>How Does This Calculator Work?</h2>
        <p>
          Enter your age, retirement age, current savings, annual income,
          savings rate, expected investment return, and your nest egg goal. The
          calculator estimates your annual contribution, projected retirement
          savings, and the savings rate needed to reach your goal.
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
                <td className="px-3 py-2 border">Current Age</td>
                <td className="px-3 py-2 border">30 - 55</td>
                <td className="px-3 py-2 border">Your current age</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Retirement Age</td>
                <td className="px-3 py-2 border">60 - 70</td>
                <td className="px-3 py-2 border">When you plan to retire</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Current Savings ($)</td>
                <td className="px-3 py-2 border">$50,000 - $300,000</td>
                <td className="px-3 py-2 border">
                  Total in all retirement accounts
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Annual Income ($)</td>
                <td className="px-3 py-2 border">$50,000 - $200,000</td>
                <td className="px-3 py-2 border">Before taxes</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Savings Rate (%)</td>
                <td className="px-3 py-2 border">10% - 20%</td>
                <td className="px-3 py-2 border">
                  Percent of income saved each year
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Expected Return (%)</td>
                <td className="px-3 py-2 border">5% - 7%</td>
                <td className="px-3 py-2 border">
                  Long-term stock market average: ~6%
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Nest Egg Goal ($)</td>
                <td className="px-3 py-2 border">$750,000 - $2,000,000</td>
                <td className="px-3 py-2 border">Target retirement savings</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mb-6">
          <h3>Savings Rate & Growth Details</h3>
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
                <td className="px-3 py-2 border">Annual Contribution</td>
                <td className="px-3 py-2 border">Income × savings rate</td>
                <td className="px-3 py-2 border">$9,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Expected Return</td>
                <td className="px-3 py-2 border">
                  Average annual investment growth
                </td>
                <td className="px-3 py-2 border">6%</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Years to Retirement</td>
                <td className="px-3 py-2 border">
                  Retirement age minus current age
                </td>
                <td className="px-3 py-2 border">30</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Total at Retirement</td>
                <td className="px-3 py-2 border">
                  Projected savings at retirement
                </td>
                <td className="px-3 py-2 border">$1,050,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Nest Egg Goal</td>
                <td className="px-3 py-2 border">Target retirement savings</td>
                <td className="px-3 py-2 border">$1,000,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Required Savings Rate</td>
                <td className="px-3 py-2 border">
                  Percent of income needed to reach goal
                </td>
                <td className="px-3 py-2 border">13%</td>
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
                <td className="px-3 py-2 border">Current Age</td>
                <td className="px-3 py-2 border">37</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Retirement Age</td>
                <td className="px-3 py-2 border">67</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Current Savings</td>
                <td className="px-3 py-2 border">$60,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Annual Income</td>
                <td className="px-3 py-2 border">$80,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Savings Rate</td>
                <td className="px-3 py-2 border">15%</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Expected Return</td>
                <td className="px-3 py-2 border">6%</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Nest Egg Goal</td>
                <td className="px-3 py-2 border">$1,000,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Total at Retirement</td>
                <td className="px-3 py-2 border">$1,050,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Required Savings Rate</td>
                <td className="px-3 py-2 border">13%</td>
              </tr>
            </tbody>
          </table>
          <p className="text-sm">
            <strong>Source:</strong> Fidelity, Vanguard, 2024 averages.
          </p>
        </div>
        <div className="mb-6">
          <h3>Tips for Beginners</h3>
          <ul className="list-disc list-inside">
            <li>Start saving early—compound growth makes a big difference.</li>
            <li>Increase your savings rate as your income grows.</li>
            <li>Review your investment return assumptions regularly.</li>
            <li>
              Set a realistic nest egg goal based on your retirement needs.
            </li>
            <li>
              Consult a financial advisor for personalized retirement planning.
            </li>
          </ul>
        </div>
      </section>
      <div className="gap-4 grid md:grid-cols-3">
        <div className="mb-2">
          <label className="block mb-1 font-medium">Current Age:</label>
          <input
            type="number"
            className="px-2 py-1 border rounded w-full"
            value={currentAge}
            onChange={(e) => setCurrentAge(e.target.value)}
            placeholder="e.g., 37"
            min="0"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1 font-medium">Retirement Age:</label>
          <input
            type="number"
            className="px-2 py-1 border rounded w-full"
            value={retirementAge}
            onChange={(e) => setRetirementAge(e.target.value)}
            placeholder="e.g., 67"
            min="0"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1 font-medium">Current Savings ($):</label>
          <input
            type="number"
            className="px-2 py-1 border rounded w-full"
            value={currentSavings}
            onChange={(e) => setCurrentSavings(e.target.value)}
            placeholder="e.g., 60000"
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
            placeholder="e.g., 80000"
            min="0"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1 font-medium">Savings Rate (%):</label>
          <input
            type="number"
            className="px-2 py-1 border rounded w-full"
            value={savingsRate}
            onChange={(e) => setSavingsRate(e.target.value)}
            placeholder="e.g., 15"
            min="0"
            max="100"
            step="0.01"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1 font-medium">Expected Return (%):</label>
          <input
            type="number"
            className="px-2 py-1 border rounded w-full"
            value={expectedReturn}
            onChange={(e) => setExpectedReturn(e.target.value)}
            placeholder="e.g., 6"
            min="0"
            max="100"
            step="0.01"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1 font-medium">Nest Egg Goal ($):</label>
          <input
            type="number"
            className="px-2 py-1 border rounded w-full"
            value={desiredNestEgg}
            onChange={(e) => setDesiredNestEgg(e.target.value)}
            placeholder="e.g., 1000000"
            min="0"
          />
        </div>
      </div>
      <Button className="mt-2 px-4 py-2 rounded" onClick={handleCalculate}>
        Calculate Savings Growth
      </Button>
      {result && (
        <div className="flex flex-col gap-4 mt-6">
          <div className="shadow p-4 border rounded-lg">
            <h3 className="mb-2 font-semibold">Results</h3>
            <table className="border border-gray-300 min-w-full text-sm">
              <tbody>
                <tr>
                  <td className="px-3 py-2 border font-medium">
                    Annual Contribution
                  </td>
                  <td className="px-3 py-2 border">
                    $
                    {result.annualContribution.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2 border font-medium">
                    Total at Retirement
                  </td>
                  <td className="px-3 py-2 border">
                    $
                    {result.totalAtRetirement.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2 border font-medium">
                    Nest Egg Goal Met?
                  </td>
                  <td className="px-3 py-2 border">
                    {result.nestEggGoalMet ? (
                      <span className="font-bold">Yes</span>
                    ) : (
                      <span className="font-bold text-red-700">No</span>
                    )}
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
