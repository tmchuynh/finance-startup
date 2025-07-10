"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function EmergencyFundCalculator() {
  const [monthlyExpenses, setMonthlyExpenses] = useState<string>("");
  const [monthsCovered, setMonthsCovered] = useState<string>("6");
  const [currentSavings, setCurrentSavings] = useState<string>("");
  const [interestRate, setInterestRate] = useState<string>("1.5");

  const [result, setResult] = useState<{
    recommendedFund: number;
    fundGap: number;
    monthsYouCanCover: number;
    futureValue: number;
  } | null>(null);

  function calcFutureValue(PV: number, r: number, n: number) {
    // FV = PV*(1+r)^n, r = annual rate, n = years (assume 1 year for emergency fund)
    return PV * Math.pow(1 + r, n);
  }

  const handleCalculate = () => {
    const expenses = parseFloat(monthlyExpenses);
    const months = parseFloat(monthsCovered);
    const savings = parseFloat(currentSavings);
    const rate = parseFloat(interestRate) / 100;

    if (
      !isNaN(expenses) &&
      !isNaN(months) &&
      !isNaN(savings) &&
      !isNaN(rate) &&
      expenses > 0 &&
      months > 0 &&
      savings >= 0 &&
      rate >= 0
    ) {
      const recommendedFund = expenses * months;
      const fundGap = recommendedFund - savings;
      const monthsYouCanCover = savings / expenses;
      const futureValue = calcFutureValue(savings, rate, 1);
      setResult({
        recommendedFund,
        fundGap,
        monthsYouCanCover,
        futureValue,
      });
    } else {
      setResult(null);
    }
  };

  return (
    <div className="mt-8 md:mt-12 mx-auto h-full w-10/12 md:w-11/12">
      <h1>Emergency Fund Calculator</h1>
      <p className="mb-4">
        <strong>
          Estimate how much you need in your emergency fund to cover unexpected
          expenses and how long your current savings will last.
        </strong>
      </p>
      <section className="mb-8">
        <h2>How Does This Calculator Work?</h2>
        <p>
          Enter your average monthly expenses, the number of months you want to
          cover, your current emergency savings, and your savings account
          interest rate. The calculator estimates your recommended emergency
          fund, any gap, and how long your savings will last.
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
                <td className="px-3 py-2 border">Monthly Expenses ($)</td>
                <td className="px-3 py-2 border">$2,000 - $6,000</td>
                <td className="px-3 py-2 border">
                  Rent, food, utilities, insurance, etc.
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Months to Cover</td>
                <td className="px-3 py-2 border">3 - 12</td>
                <td className="px-3 py-2 border">
                  6 months is a common recommendation
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">
                  Current Emergency Savings ($)
                </td>
                <td className="px-3 py-2 border">$1,000 - $30,000</td>
                <td className="px-3 py-2 border">
                  Amount in savings for emergencies
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Interest Rate (%)</td>
                <td className="px-3 py-2 border">0.5% - 5%</td>
                <td className="px-3 py-2 border">High-yield savings: 3-5%</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mb-6">
          <h3>Emergency Fund Details</h3>
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
                <td className="px-3 py-2 border">Monthly Expenses</td>
                <td className="px-3 py-2 border">
                  Total essential spending per month
                </td>
                <td className="px-3 py-2 border">$3,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Months to Cover</td>
                <td className="px-3 py-2 border">
                  How many months you want to be protected
                </td>
                <td className="px-3 py-2 border">6</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Recommended Fund</td>
                <td className="px-3 py-2 border">Expenses × months to cover</td>
                <td className="px-3 py-2 border">$18,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Current Savings</td>
                <td className="px-3 py-2 border">
                  What you have saved for emergencies
                </td>
                <td className="px-3 py-2 border">$8,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Fund Gap</td>
                <td className="px-3 py-2 border">
                  How much more you need to save
                </td>
                <td className="px-3 py-2 border">$10,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Months You Can Cover</td>
                <td className="px-3 py-2 border">
                  Current savings ÷ monthly expenses
                </td>
                <td className="px-3 py-2 border">2.7</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Future Value (1 year)</td>
                <td className="px-3 py-2 border">
                  Current savings with interest after 1 year
                </td>
                <td className="px-3 py-2 border">$8,120</td>
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
                <td className="px-3 py-2 border">Monthly Expenses</td>
                <td className="px-3 py-2 border">$3,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Months to Cover</td>
                <td className="px-3 py-2 border">6</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Current Savings</td>
                <td className="px-3 py-2 border">$8,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Interest Rate</td>
                <td className="px-3 py-2 border">2.0%</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Recommended Fund</td>
                <td className="px-3 py-2 border">$18,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Fund Gap</td>
                <td className="px-3 py-2 border">$10,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Months You Can Cover</td>
                <td className="px-3 py-2 border">2.7</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Future Value (1 year)</td>
                <td className="px-3 py-2 border">$8,160</td>
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
              Start with a $1,000 starter fund, then build up to 3-6 months of
              expenses.
            </li>
            <li>
              Keep your emergency fund in a high-yield savings account for easy
              access.
            </li>
            <li>
              Only use your emergency fund for true emergencies (job loss,
              medical, car repair).
            </li>
            <li>Replenish your fund after using it.</li>
            <li>Review your expenses and fund size annually.</li>
          </ul>
        </div>
      </section>
      <div className="mb-8">
        <h3>Emergency Fund Inputs</h3>
        <div className="gap-4 grid md:grid-cols-3">
          <div className="mb-2">
            <label className="block mb-1 font-medium">
              Monthly Expenses ($):
            </label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={monthlyExpenses}
              onChange={(e) => setMonthlyExpenses(e.target.value)}
              placeholder="e.g., 3000"
              min="0"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">Months to Cover:</label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={monthsCovered}
              onChange={(e) => setMonthsCovered(e.target.value)}
              placeholder="e.g., 6"
              min="1"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">
              Current Emergency Savings ($):
            </label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={currentSavings}
              onChange={(e) => setCurrentSavings(e.target.value)}
              placeholder="e.g., 8000"
              min="0"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">Interest Rate (%):</label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              placeholder="e.g., 2.0"
              min="0"
              max="100"
              step="0.01"
            />
          </div>
        </div>
      </div>
      <Button className="mt-2 px-4 py-2 rounded" onClick={handleCalculate}>
        Calculate Emergency Fund
      </Button>
      {result && (
        <div className="flex flex-col gap-4 mt-6">
          <div className="shadow p-4 border rounded-lg">
            <h3>Results</h3>
            <table className="border border-gray-300 min-w-full text-sm">
              <tbody>
                <tr>
                  <td className="px-3 py-2 border font-medium">
                    Recommended Fund
                  </td>
                  <td className="px-3 py-2 border">
                    $
                    {result.recommendedFund.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2 border font-medium">Fund Gap</td>
                  <td className="px-3 py-2 border">
                    $
                    {result.fundGap.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2 border font-medium">
                    Months You Can Cover
                  </td>
                  <td className="px-3 py-2 border">
                    {result.monthsYouCanCover.toLocaleString(undefined, {
                      minimumFractionDigits: 1,
                      maximumFractionDigits: 1,
                    })}
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2 border font-medium">
                    Future Value (1 year)
                  </td>
                  <td className="px-3 py-2 border">
                    $
                    {result.futureValue.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="mt-2 text-sm">
              <strong>Note:</strong> This calculator provides estimates. Actual
              results may vary based on your expenses and savings rate.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
