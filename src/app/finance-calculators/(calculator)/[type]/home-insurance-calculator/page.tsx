"use client";
import { useState } from "react";

export default function HomeInsuranceCalculator() {
  const [homeValue, setHomeValue] = useState<string>("");
  const [coveragePercent, setCoveragePercent] = useState<string>("100");
  const [annualRate, setAnnualRate] = useState<string>("0.35");
  const [deductible, setDeductible] = useState<string>("1000");
  const [result, setResult] = useState<{
    coverageAmount: number;
    estimatedPremium: number;
  } | null>(null);

  const handleCalculate = () => {
    const value = parseFloat(homeValue);
    const percent = parseFloat(coveragePercent) / 100;
    const rate = parseFloat(annualRate) / 100;
    if (
      !isNaN(value) &&
      !isNaN(percent) &&
      !isNaN(rate) &&
      value > 0 &&
      percent > 0 &&
      rate > 0
    ) {
      const coverageAmount = value * percent;
      const estimatedPremium = coverageAmount * rate;
      setResult({
        coverageAmount,
        estimatedPremium,
      });
    } else {
      setResult(null);
    }
  };

  return (
    <div className="mx-auto mt-8 md:mt-12 w-10/12 md:w-11/12 h-full">
      <h1>Home Insurance Calculator</h1>
      <p className="mb-4">
        <strong>
          Estimate your annual home insurance premium and learn how coverage,
          rates, and deductibles affect your cost.
        </strong>
      </p>
      <section className="mb-8">
        <h2>What is Home Insurance?</h2>
        <p>
          Home insurance (also called homeowner's insurance) protects your home
          and belongings against damage or loss from events like fire, theft,
          storms, or liability claims. Most lenders require it if you have a
          mortgage.
        </p>
        <div className="my-6">
          <h3>Key Terms Explained</h3>
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
                <td className="px-3 py-2 border">Home Value</td>
                <td className="px-3 py-2 border">
                  The estimated cost to rebuild your home (not the market
                  value).
                </td>
                <td className="px-3 py-2 border">$350,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Coverage Amount</td>
                <td className="px-3 py-2 border">
                  The dollar amount your policy will pay to repair or rebuild
                  your home.
                </td>
                <td className="px-3 py-2 border">$350,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Coverage Percent</td>
                <td className="px-3 py-2 border">
                  Percent of home value you want to insure (usually 100%).
                </td>
                <td className="px-3 py-2 border">100%</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Annual Rate</td>
                <td className="px-3 py-2 border">
                  The insurance rate as a percent of coverage amount (varies by
                  state and risk).
                </td>
                <td className="px-3 py-2 border">0.35%</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Deductible</td>
                <td className="px-3 py-2 border">
                  The amount you pay out of pocket before insurance pays a
                  claim.
                </td>
                <td className="px-3 py-2 border">$1,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Premium</td>
                <td className="px-3 py-2 border">
                  The amount you pay for insurance (usually yearly).
                </td>
                <td className="px-3 py-2 border">$1,225</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="gap-4 grid md:grid-cols-2">
          <div className="mb-2">
            <label className="block mb-1 font-medium">
              Home Value (replacement cost) ($):
            </label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={homeValue}
              onChange={(e) => setHomeValue(e.target.value)}
              placeholder="Enter estimated rebuild cost"
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
              placeholder="Usually 100"
              min="1"
              max="100"
              step="0.01"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">Annual Rate (%):</label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={annualRate}
              onChange={(e) => setAnnualRate(e.target.value)}
              placeholder="e.g., 0.35"
              min="0"
              step="0.01"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">Deductible ($):</label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={deductible}
              onChange={(e) => setDeductible(e.target.value)}
              placeholder="e.g., 1000"
              min="0"
            />
          </div>
        </div>
        <button
          className="bg-blue-600 mt-2 px-4 py-2 rounded text-white"
          onClick={handleCalculate}
        >
          Calculate Insurance Premium
        </button>
        {result && (
          <div className="flex flex-col gap-4 mt-6">
            <div className="bg-white shadow p-4 border rounded-lg">
              <h3 className="mb-2 font-semibold">Results</h3>
              <table className="border border-gray-300 min-w-full text-sm">
                <tbody>
                  <tr>
                    <td className="px-3 py-2 border font-medium">
                      Coverage Amount
                    </td>
                    <td className="px-3 py-2 border">
                      $
                      {result.coverageAmount.toLocaleString(undefined, {
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
                <strong>Note:</strong> Actual premiums may vary based on
                location, home features, claims history, and insurer.
              </div>
            </div>
          </div>
        )}
        <div className="my-6">
          <h3>How Home Insurance Premium is Calculated</h3>
          <ul className="mb-2 list-decimal list-inside">
            <li>
              <strong>Choose your coverage amount.</strong> Usually the cost to
              rebuild your home.
            </li>
            <li>
              <strong>Multiply by the annual rate.</strong> Rates vary by state,
              risk, and insurer.
            </li>
            <li>
              <strong>Adjust for deductible and extra coverage.</strong> Higher
              deductibles usually lower your premium.
            </li>
          </ul>
          <table className="border border-gray-300 min-w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-3 py-2 border text-left">Step</th>
                <th className="px-3 py-2 border text-left">Formula</th>
                <th className="px-3 py-2 border text-left">Example</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-3 py-2 border">Coverage Amount</td>
                <td className="px-3 py-2 border">Home Value × Coverage %</td>
                <td className="px-3 py-2 border">$350,000 × 100% = $350,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Estimated Premium</td>
                <td className="px-3 py-2 border">
                  Coverage Amount × Annual Rate
                </td>
                <td className="px-3 py-2 border">$350,000 × 0.0035 = $1,225</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mb-6">
          <h3>Tips for Beginners</h3>
          <ul className="list-disc list-inside">
            <li>
              Insure your home for its replacement cost, not its market value.
            </li>
            <li>
              Higher deductibles lower your premium, but mean more out-of-pocket
              if you file a claim.
            </li>
            <li>Bundle home and auto insurance for discounts.</li>
            <li>
              Ask about discounts for security systems, smoke alarms, or new
              roofs.
            </li>
            <li>
              Review your policy every year and update coverage as needed.
            </li>
            <li>
              Flood and earthquake insurance are usually separate policies.
            </li>
            <li>Compare quotes from several insurers before buying.</li>
          </ul>
        </div>
        <div className="mb-6">
          <h3>Real Data: Average Home Insurance Premiums (2024)</h3>
          <table className="mb-4 border border-gray-300 min-w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-3 py-2 border text-left">State</th>
                <th className="px-3 py-2 border text-left">
                  Average Annual Premium
                </th>
                <th className="px-3 py-2 border text-left">Coverage Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-3 py-2 border">California</td>
                <td className="px-3 py-2 border">$1,300</td>
                <td className="px-3 py-2 border">$350,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Texas</td>
                <td className="px-3 py-2 border">$2,100</td>
                <td className="px-3 py-2 border">$350,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Florida</td>
                <td className="px-3 py-2 border">$2,800</td>
                <td className="px-3 py-2 border">$350,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">New York</td>
                <td className="px-3 py-2 border">$1,400</td>
                <td className="px-3 py-2 border">$350,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Illinois</td>
                <td className="px-3 py-2 border">$1,200</td>
                <td className="px-3 py-2 border">$350,000</td>
              </tr>
            </tbody>
          </table>
          <p className="text-gray-600 text-sm">
            <strong>Source:</strong> National Association of Insurance
            Commissioners (2024)
          </p>
        </div>
      </section>
    </div>
  );
}
