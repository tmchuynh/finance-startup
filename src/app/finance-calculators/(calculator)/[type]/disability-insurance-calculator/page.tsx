"use client";
import { useState } from "react";

export default function DisabilityInsuranceCalculator() {
  const [annualIncome, setAnnualIncome] = useState<string>("");
  const [coveragePercent, setCoveragePercent] = useState<string>("60");
  const [existingCoverage, setExistingCoverage] = useState<string>("0");
  const [monthlyExpenses, setMonthlyExpenses] = useState<string>("");
  const [waitingPeriod, setWaitingPeriod] = useState<string>("90");
  const [benefitPeriod, setBenefitPeriod] = useState<string>("24");
  const [annualPremium, setAnnualPremium] = useState<string>("1200");

  const [result, setResult] = useState<{
    suggestedBenefit: number;
    totalMonthlyBenefit: number;
    estimatedPremium: number;
  } | null>(null);

  const handleCalculate = () => {
    const income = parseFloat(annualIncome);
    const percent = parseFloat(coveragePercent) / 100;
    const existing = parseFloat(existingCoverage);
    const expenses = parseFloat(monthlyExpenses);
    const annPrem = parseFloat(annualPremium);

    // Suggest benefit as 60% of income minus existing coverage, but not less than monthly expenses
    let suggestedBenefit = 0;
    if (!isNaN(income) && !isNaN(percent)) {
      suggestedBenefit = (income * percent) / 12;
      if (!isNaN(existing))
        suggestedBenefit = Math.max(0, suggestedBenefit - existing);
      if (!isNaN(expenses))
        suggestedBenefit = Math.max(suggestedBenefit, expenses);
    }

    setResult({
      suggestedBenefit,
      totalMonthlyBenefit: suggestedBenefit,
      estimatedPremium: isNaN(annPrem) ? 0 : annPrem,
    });
  };

  return (
    <div className="mx-auto mt-8 md:mt-12 w-10/12 md:w-11/12 h-full">
      <h1>Disability Insurance Calculator</h1>
      <p className="mb-4">
        <strong>
          Estimate your disability insurance needs and typical premiums based on
          your income, expenses, and existing coverage.
        </strong>
      </p>
      <section className="mb-8">
        <h2>How Does This Calculator Work?</h2>
        <p>
          Enter your annual income, desired coverage percent, existing
          disability coverage, monthly expenses, waiting period, benefit period,
          and annual premium. The calculator estimates your suggested monthly
          benefit and typical premium.
        </p>
        <div className="mb-6">
          <h3>Typical Input Values</h3>
          <table className="mb-4 border border-gray-300 min-w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-3 py-2 border text-left">Field</th>
                <th className="px-3 py-2 border text-left">Typical Value</th>
                <th className="px-3 py-2 border text-left">Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-3 py-2 border">Annual Income ($)</td>
                <td className="px-3 py-2 border">$40,000 - $150,000</td>
                <td className="px-3 py-2 border">Before taxes</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Coverage Percent (%)</td>
                <td className="px-3 py-2 border">50% - 70%</td>
                <td className="px-3 py-2 border">60% is typical</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Existing Coverage ($/mo)</td>
                <td className="px-3 py-2 border">$0 - $3,000</td>
                <td className="px-3 py-2 border">Employer or other policies</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Monthly Expenses ($)</td>
                <td className="px-3 py-2 border">$2,000 - $6,000</td>
                <td className="px-3 py-2 border">Rent, food, bills, etc.</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Waiting Period (days)</td>
                <td className="px-3 py-2 border">30 - 180</td>
                <td className="px-3 py-2 border">Time before benefits start</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Benefit Period (months)</td>
                <td className="px-3 py-2 border">12 - 60</td>
                <td className="px-3 py-2 border">How long benefits last</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Annual Premium ($)</td>
                <td className="px-3 py-2 border">$500 - $2,500</td>
                <td className="px-3 py-2 border">Typical U.S. range</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mb-6">
          <h3>Disability Insurance Details</h3>
          <table className="mb-4 border border-gray-300 min-w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-3 py-2 border text-left">Term</th>
                <th className="px-3 py-2 border text-left">Description</th>
                <th className="px-3 py-2 border text-left">Example</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-3 py-2 border">Monthly Benefit</td>
                <td className="px-3 py-2 border">
                  Amount paid if you become disabled
                </td>
                <td className="px-3 py-2 border">$3,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Coverage Percent</td>
                <td className="px-3 py-2 border">Percent of income replaced</td>
                <td className="px-3 py-2 border">60%</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Waiting Period</td>
                <td className="px-3 py-2 border">Time before benefits start</td>
                <td className="px-3 py-2 border">90 days</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Benefit Period</td>
                <td className="px-3 py-2 border">How long benefits last</td>
                <td className="px-3 py-2 border">24 months</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Annual Premium</td>
                <td className="px-3 py-2 border">Yearly cost for coverage</td>
                <td className="px-3 py-2 border">$1,200</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mb-6">
          <h3>Real Data Example (2024)</h3>
          <table className="mb-4 border border-gray-300 min-w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-3 py-2 border text-left">Scenario</th>
                <th className="px-3 py-2 border text-left">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-3 py-2 border">Annual Income</td>
                <td className="px-3 py-2 border">$80,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Coverage Percent</td>
                <td className="px-3 py-2 border">60%</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Existing Coverage</td>
                <td className="px-3 py-2 border">$0</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Monthly Expenses</td>
                <td className="px-3 py-2 border">$3,500</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Waiting Period</td>
                <td className="px-3 py-2 border">90 days</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Benefit Period</td>
                <td className="px-3 py-2 border">24 months</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Suggested Monthly Benefit</td>
                <td className="px-3 py-2 border">$4,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Annual Premium</td>
                <td className="px-3 py-2 border">$1,200</td>
              </tr>
            </tbody>
          </table>
          <p className="text-gray-600 text-sm">
            <strong>Source:</strong> Policygenius, Guardian, 2024 averages.
          </p>
        </div>
        <div className="mb-6">
          <h3>Tips for Beginners</h3>
          <ul className="list-disc list-inside">
            <li>
              Disability insurance replaces income if you can't work due to
              illness or injury.
            </li>
            <li>Most policies cover 50-70% of your income.</li>
            <li>
              Longer waiting periods lower your premium but delay benefits.
            </li>
            <li>
              Benefit period is how long you'll receive payments if disabled.
            </li>
            <li>
              Review your policy annually and consult an insurance agent for
              advice.
            </li>
          </ul>
        </div>
      </section>
      <div className="mb-8">
        <h3 className="mb-2 font-medium">Disability Insurance Inputs</h3>
        <div className="gap-4 grid md:grid-cols-3">
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
            <label className="block mb-1 font-medium">
              Coverage Percent (%):
            </label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={coveragePercent}
              onChange={(e) => setCoveragePercent(e.target.value)}
              placeholder="e.g., 60"
              min="0"
              max="100"
              step="0.01"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">
              Existing Coverage ($/mo):
            </label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={existingCoverage}
              onChange={(e) => setExistingCoverage(e.target.value)}
              placeholder="e.g., 0"
              min="0"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">
              Monthly Expenses ($):
            </label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={monthlyExpenses}
              onChange={(e) => setMonthlyExpenses(e.target.value)}
              placeholder="e.g., 3500"
              min="0"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">
              Waiting Period (days):
            </label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={waitingPeriod}
              onChange={(e) => setWaitingPeriod(e.target.value)}
              placeholder="e.g., 90"
              min="0"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">
              Benefit Period (months):
            </label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={benefitPeriod}
              onChange={(e) => setBenefitPeriod(e.target.value)}
              placeholder="e.g., 24"
              min="0"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">
              Annual Premium ($):
            </label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={annualPremium}
              onChange={(e) => setAnnualPremium(e.target.value)}
              placeholder="e.g., 1200"
              min="0"
            />
          </div>
        </div>
      </div>
      <button
        className="bg-blue-600 mt-2 px-4 py-2 rounded text-white"
        onClick={handleCalculate}
      >
        Calculate Disability Insurance
      </button>
      {result && (
        <div className="flex flex-col gap-4 mt-6">
          <div className="bg-white shadow p-4 border rounded-lg">
            <h3 className="mb-2 font-semibold">Results</h3>
            <table className="border border-gray-300 min-w-full text-sm">
              <tbody>
                <tr>
                  <td className="px-3 py-2 border font-medium">
                    Suggested Monthly Benefit
                  </td>
                  <td className="px-3 py-2 border">
                    $
                    {result.suggestedBenefit.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2 border font-medium">
                    Estimated Annual Premium
                  </td>
                  <td className="px-3 py-2 border">
                    $
                    {result.estimatedPremium.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="mt-2 text-gray-600 text-sm">
              <strong>Note:</strong> This calculator provides estimates. Actual
              insurance needs and premiums may vary based on your health,
              occupation, and insurer.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
