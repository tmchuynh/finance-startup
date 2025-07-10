"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function RetirementSavingsAndIncomeCalculator() {
  const [currentAge, setCurrentAge] = useState<string>("");
  const [retirementAge, setRetirementAge] = useState<string>("65");
  const [currentSavings, setCurrentSavings] = useState<string>("");
  const [annualContribution, setAnnualContribution] = useState<string>("");
  const [expectedReturn, setExpectedReturn] = useState<string>("6");
  const [yearsInRetirement, setYearsInRetirement] = useState<string>("25");
  const [annualSpending, setAnnualSpending] = useState<string>("50000");
  const [result, setResult] = useState<{
    totalAtRetirement: number;
    canSupportSpending: boolean;
    yearsSupported: number;
  } | null>(null);

  function calcFutureValue(PV: number, PMT: number, r: number, n: number) {
    // FV = PV*(1+r)^n + PMT*(((1+r)^n - 1)/r)
    if (r === 0) return PV + PMT * n;
    return PV * Math.pow(1 + r, n) + PMT * ((Math.pow(1 + r, n) - 1) / r);
  }

  function calcYearsSupported(FV: number, annualSpending: number, r: number) {
    // Solve for n: FV = annualSpending * [(1 - (1 + r)^-n)/r]
    if (r === 0) return FV / annualSpending;
    return Math.log(1 - (FV * r) / annualSpending) / Math.log(1 / (1 + r));
  }

  const handleCalculate = () => {
    const age = parseFloat(currentAge);
    const retire = parseFloat(retirementAge);
    const savings = parseFloat(currentSavings);
    const contrib = parseFloat(annualContribution);
    const returnRate = parseFloat(expectedReturn) / 100;
    const yearsRetire = parseFloat(yearsInRetirement);
    const spending = parseFloat(annualSpending);

    if (
      !isNaN(age) &&
      !isNaN(retire) &&
      !isNaN(savings) &&
      !isNaN(contrib) &&
      !isNaN(returnRate) &&
      !isNaN(yearsRetire) &&
      !isNaN(spending) &&
      age > 0 &&
      retire > age &&
      savings >= 0 &&
      contrib >= 0 &&
      returnRate >= 0 &&
      yearsRetire > 0 &&
      spending > 0
    ) {
      const yearsToRetirement = retire - age;
      const FV = calcFutureValue(
        savings,
        contrib,
        returnRate,
        yearsToRetirement
      );
      // Withdrawal phase: can you support annual spending for yearsInRetirement?
      // Use annuity formula: PV = PMT * [1 - (1 + r)^-n]/r
      // Rearranged to solve for n above
      const r = returnRate;
      let yearsSupported = 0;
      if (r === 0) {
        yearsSupported = FV / spending;
      } else {
        yearsSupported =
          Math.log(1 - (FV * r) / spending) / Math.log(1 / (1 + r));
      }
      setResult({
        totalAtRetirement: FV,
        canSupportSpending: yearsSupported >= yearsRetire,
        yearsSupported,
      });
    } else {
      setResult(null);
    }
  };

  return (
    <div className="mt-8 md:mt-12 mx-auto h-full w-10/12 md:w-11/12">
      <h1>Retirement Savings and Income Calculator</h1>
      <p className="mb-4">
        <strong>
          Estimate how much you will have saved by retirement and whether your
          savings can support your desired retirement income.
        </strong>
      </p>
      <section className="mb-8">
        <h2>How Does This Calculator Work?</h2>
        <p>
          Enter your current age, retirement age, current savings, annual
          contributions, expected investment return, years in retirement, and
          desired annual spending. The calculator estimates your savings at
          retirement and how long your money will last.
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
                <td className="px-3 py-2 border">Annual Contribution ($)</td>
                <td className="px-3 py-2 border">$6,000 - $30,000</td>
                <td className="px-3 py-2 border">401(k), IRA, etc.</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Expected Return (%)</td>
                <td className="px-3 py-2 border">5% - 7%</td>
                <td className="px-3 py-2 border">
                  Long-term stock market average: ~6%
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Years in Retirement</td>
                <td className="px-3 py-2 border">20 - 30</td>
                <td className="px-3 py-2 border">
                  How long you expect to need income
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Annual Spending ($)</td>
                <td className="px-3 py-2 border">$40,000 - $80,000</td>
                <td className="px-3 py-2 border">
                  Desired annual retirement income
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mb-6">
          <h3>Retirement Savings & Income Details</h3>
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
                <td className="px-3 py-2 border">
                  Total saved for retirement now
                </td>
                <td className="px-3 py-2 border">$100,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Annual Contribution</td>
                <td className="px-3 py-2 border">Amount added each year</td>
                <td className="px-3 py-2 border">$10,000</td>
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
                <td className="px-3 py-2 border">$1,000,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Annual Spending</td>
                <td className="px-3 py-2 border">Desired yearly withdrawals</td>
                <td className="px-3 py-2 border">$50,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Years Supported</td>
                <td className="px-3 py-2 border">
                  How long your savings will last
                </td>
                <td className="px-3 py-2 border">25</td>
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
                <td className="px-3 py-2 border">35</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Retirement Age</td>
                <td className="px-3 py-2 border">67</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Current Savings</td>
                <td className="px-3 py-2 border">$80,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Annual Contribution</td>
                <td className="px-3 py-2 border">$8,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Expected Return</td>
                <td className="px-3 py-2 border">6%</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Years in Retirement</td>
                <td className="px-3 py-2 border">25</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Annual Spending</td>
                <td className="px-3 py-2 border">$50,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Total at Retirement</td>
                <td className="px-3 py-2 border">$1,050,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Years Supported</td>
                <td className="px-3 py-2 border">26</td>
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
            <li>Increase contributions as your income grows.</li>
            <li>Review your investment return assumptions regularly.</li>
            <li>Consider Social Security and pensions as additional income.</li>
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
            placeholder="e.g., 35"
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
            placeholder="e.g., 80000"
            min="0"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1 font-medium">
            Annual Contribution ($):
          </label>
          <input
            type="number"
            className="px-2 py-1 border rounded w-full"
            value={annualContribution}
            onChange={(e) => setAnnualContribution(e.target.value)}
            placeholder="e.g., 8000"
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
            placeholder="e.g., 6"
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
            value={yearsInRetirement}
            onChange={(e) => setYearsInRetirement(e.target.value)}
            placeholder="e.g., 25"
            min="1"
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
      </div>
      <Button className="mt-2 px-4 py-2 rounded" onClick={handleCalculate}>
        Calculate Retirement Savings
      </Button>
      {result && (
        <div className="flex flex-col gap-4 mt-6">
          <div className="shadow p-4 border rounded-lg">
            <h3>Results</h3>
            <table className="border border-gray-300 min-w-full text-sm">
              <tbody>
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
                    Can Support Desired Spending?
                  </td>
                  <td className="px-3 py-2 border">
                    {result.canSupportSpending ? (
                      <span className="font-bold">Yes</span>
                    ) : (
                      <span className="font-bold text-red-700">No</span>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="mt-2 text-sm">
              <strong>Note:</strong> This calculator does not include Social
              Security, pensions, or taxes. Actual results may vary.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
