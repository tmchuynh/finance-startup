"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function LongTermCareAndHealthInsurancePremiumCalculator() {
  const [age, setAge] = useState<string>("");
  const [annualIncome, setAnnualIncome] = useState<string>("");
  const [healthPlanType, setHealthPlanType] = useState<string>("silver");
  const [healthDeductible, setHealthDeductible] = useState<string>("2000");
  const [healthPremium, setHealthPremium] = useState<string>("6000");
  const [ltcCoverage, setLtcCoverage] = useState<string>("150000");
  const [ltcBenefitPeriod, setLtcBenefitPeriod] = useState<string>("3");
  const [ltcDailyBenefit, setLtcDailyBenefit] = useState<string>("150");
  const [ltcPremium, setLtcPremium] = useState<string>("3000");

  const [result, setResult] = useState<{
    suggestedLtcCoverage: number;
    estimatedLtcPremium: number;
    estimatedHealthPremium: number;
  } | null>(null);

  const handleCalculate = () => {
    const ageNum = parseFloat(age);
    const income = parseFloat(annualIncome);
    const ltcCov = parseFloat(ltcCoverage);
    const ltcPeriod = parseFloat(ltcBenefitPeriod);
    const ltcDaily = parseFloat(ltcDailyBenefit);
    const ltcPrem = parseFloat(ltcPremium);
    const healthPrem = parseFloat(healthPremium);

    // Suggest LTC coverage: daily benefit × 365 × benefit period (years)
    let suggestedLtcCoverage = 0;
    if (!isNaN(ltcDaily) && !isNaN(ltcPeriod)) {
      suggestedLtcCoverage = ltcDaily * 365 * ltcPeriod;
    }

    setResult({
      suggestedLtcCoverage,
      estimatedLtcPremium: isNaN(ltcPrem) ? 0 : ltcPrem,
      estimatedHealthPremium: isNaN(healthPrem) ? 0 : healthPrem,
    });
  };

  return (
    <div className="mt-8 md:mt-12 mx-auto h-full w-10/12 md:w-11/12">
      <h1>Long-Term Care & Health Insurance Premium Calculator</h1>
      <p className="mb-4">
        <strong>
          Estimate your long-term care (LTC) insurance needs and health
          insurance premiums based on your age, income, plan type, and desired
          coverage.
        </strong>
      </p>
      <section className="mb-8">
        <h2>How Does This Calculator Work?</h2>
        <p>
          Enter your age, income, health plan details, and desired long-term
          care coverage. The calculator estimates your suggested LTC coverage,
          typical LTC premium, and health insurance premium.
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
                <td className="px-3 py-2 border">Age</td>
                <td className="px-3 py-2 border">40 - 65</td>
                <td className="px-3 py-2 border">
                  Older age = higher premiums
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Annual Income ($)</td>
                <td className="px-3 py-2 border">$40,000 - $150,000</td>
                <td className="px-3 py-2 border">Used for affordability</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Health Plan Type</td>
                <td className="px-3 py-2 border">Bronze / Silver / Gold</td>
                <td className="px-3 py-2 border">ACA marketplace tiers</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Health Deductible ($)</td>
                <td className="px-3 py-2 border">$1,500 - $7,500</td>
                <td className="px-3 py-2 border">
                  Lower deductible = higher premium
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Annual Health Premium ($)</td>
                <td className="px-3 py-2 border">$4,000 - $10,000</td>
                <td className="px-3 py-2 border">2024 U.S. average: $6,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">LTC Coverage Amount ($)</td>
                <td className="px-3 py-2 border">$100,000 - $300,000</td>
                <td className="px-3 py-2 border">Total benefit pool</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">LTC Benefit Period (years)</td>
                <td className="px-3 py-2 border">2 - 5</td>
                <td className="px-3 py-2 border">How long benefits last</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">LTC Daily Benefit ($)</td>
                <td className="px-3 py-2 border">$100 - $300</td>
                <td className="px-3 py-2 border">Max daily payout</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Annual LTC Premium ($)</td>
                <td className="px-3 py-2 border">$2,000 - $5,000</td>
                <td className="px-3 py-2 border">2024 U.S. average: $3,000</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mb-6">
          <h3>Insurance Details Explained</h3>
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
                <td className="px-3 py-2 border">Health Insurance Premium</td>
                <td className="px-3 py-2 border">
                  Yearly cost for health coverage
                </td>
                <td className="px-3 py-2 border">$6,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Health Deductible</td>
                <td className="px-3 py-2 border">
                  Amount you pay before insurance pays
                </td>
                <td className="px-3 py-2 border">$2,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">LTC Coverage Amount</td>
                <td className="px-3 py-2 border">
                  Total benefit pool for long-term care
                </td>
                <td className="px-3 py-2 border">$150,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">LTC Daily Benefit</td>
                <td className="px-3 py-2 border">Max daily payout for care</td>
                <td className="px-3 py-2 border">$150</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">LTC Benefit Period</td>
                <td className="px-3 py-2 border">How long benefits last</td>
                <td className="px-3 py-2 border">3 years</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">LTC Premium</td>
                <td className="px-3 py-2 border">
                  Yearly cost for LTC insurance
                </td>
                <td className="px-3 py-2 border">$3,000</td>
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
                <td className="px-3 py-2 border">Age</td>
                <td className="px-3 py-2 border">55</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Annual Income</td>
                <td className="px-3 py-2 border">$90,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Health Plan Type</td>
                <td className="px-3 py-2 border">Silver</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Health Deductible</td>
                <td className="px-3 py-2 border">$2,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Annual Health Premium</td>
                <td className="px-3 py-2 border">$6,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">LTC Coverage Amount</td>
                <td className="px-3 py-2 border">$150,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">LTC Benefit Period</td>
                <td className="px-3 py-2 border">3 years</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">LTC Daily Benefit</td>
                <td className="px-3 py-2 border">$150</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Annual LTC Premium</td>
                <td className="px-3 py-2 border">$3,000</td>
              </tr>
            </tbody>
          </table>
          <p className="text-sm">
            <strong>Source:</strong> Genworth, KFF, 2024 averages.
          </p>
        </div>
        <div className="mb-6">
          <h3>Tips for Beginners</h3>
          <ul className="list-disc list-inside">
            <li>
              Health insurance premiums and deductibles vary by plan and
              location.
            </li>
            <li>
              Long-term care insurance helps pay for nursing home, assisted
              living, or home care.
            </li>
            <li>
              Most LTC policies pay a daily benefit for a set number of years.
            </li>
            <li>Premiums rise with age and health conditions.</li>
            <li>Consult an insurance agent for personalized advice.</li>
          </ul>
        </div>
      </section>
      <div className="mb-8">
        <h3>Insurance Inputs</h3>
        <div className="gap-4 grid md:grid-cols-3">
          <div className="mb-2">
            <label className="block mb-1 font-medium">Age:</label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="e.g., 55"
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
              placeholder="e.g., 90000"
              min="0"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">Health Plan Type:</label>
            <select
              className="px-2 py-1 border rounded w-full"
              value={healthPlanType}
              onChange={(e) => setHealthPlanType(e.target.value)}
            >
              <option value="bronze">Bronze</option>
              <option value="silver">Silver</option>
              <option value="gold">Gold</option>
            </select>
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">
              Health Deductible ($):
            </label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={healthDeductible}
              onChange={(e) => setHealthDeductible(e.target.value)}
              placeholder="e.g., 2000"
              min="0"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">
              Annual Health Premium ($):
            </label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={healthPremium}
              onChange={(e) => setHealthPremium(e.target.value)}
              placeholder="e.g., 6000"
              min="0"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">
              LTC Coverage Amount ($):
            </label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={ltcCoverage}
              onChange={(e) => setLtcCoverage(e.target.value)}
              placeholder="e.g., 150000"
              min="0"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">
              LTC Benefit Period (years):
            </label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={ltcBenefitPeriod}
              onChange={(e) => setLtcBenefitPeriod(e.target.value)}
              placeholder="e.g., 3"
              min="1"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">
              LTC Daily Benefit ($):
            </label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={ltcDailyBenefit}
              onChange={(e) => setLtcDailyBenefit(e.target.value)}
              placeholder="e.g., 150"
              min="0"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">
              Annual LTC Premium ($):
            </label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={ltcPremium}
              onChange={(e) => setLtcPremium(e.target.value)}
              placeholder="e.g., 3000"
              min="0"
            />
          </div>
        </div>
      </div>
      <Button className="mt-2 px-4 py-2 rounded" onClick={handleCalculate}>
        Calculate Insurance Needs
      </Button>
      {result && (
        <div className="flex flex-col gap-4 mt-6">
          <div className="shadow p-4 border rounded-lg">
            <h3>Results</h3>
            <table className="border border-gray-300 min-w-full text-sm">
              <tbody>
                <tr>
                  <td className="px-3 py-2 border font-medium">
                    Suggested LTC Coverage
                  </td>
                  <td className="px-3 py-2 border">
                    $
                    {result.suggestedLtcCoverage.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2 border font-medium">
                    Estimated LTC Premium
                  </td>
                  <td className="px-3 py-2 border">
                    $
                    {result.estimatedLtcPremium.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2 border font-medium">
                    Estimated Health Premium
                  </td>
                  <td className="px-3 py-2 border">
                    $
                    {result.estimatedHealthPremium.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="mt-2 text-sm">
              <strong>Note:</strong> This calculator provides estimates. Actual
              insurance needs and premiums may vary based on your health,
              location, and insurer.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
