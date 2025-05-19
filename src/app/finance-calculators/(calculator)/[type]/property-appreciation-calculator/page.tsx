"use client";
import { useState } from "react";

export default function PropertyAppreciationCalculator() {
  const [initialValue, setInitialValue] = useState<string>("");
  const [annualAppreciation, setAnnualAppreciation] = useState<string>("3.5");
  const [years, setYears] = useState<string>("10");
  const [result, setResult] = useState<{
    futureValue: number;
    totalGain: number;
    percentGain: number;
  } | null>(null);

  const handleCalculate = () => {
    const value = parseFloat(initialValue);
    const appreciation = parseFloat(annualAppreciation) / 100;
    const nYears = parseFloat(years);

    if (
      !isNaN(value) &&
      !isNaN(appreciation) &&
      !isNaN(nYears) &&
      value > 0 &&
      nYears > 0
    ) {
      const futureValue = value * Math.pow(1 + appreciation, nYears);
      const totalGain = futureValue - value;
      const percentGain = (totalGain / value) * 100;
      setResult({
        futureValue,
        totalGain,
        percentGain,
      });
    } else {
      setResult(null);
    }
  };

  return (
    <div className="mx-auto mt-8 md:mt-12 w-10/12 md:w-11/12 h-full">
      <h1>Property Appreciation Calculator</h1>
      <p className="mb-4">
        <strong>
          Estimate how much your property could be worth in the future based on
          average annual appreciation rates.
        </strong>
      </p>
      <section className="mb-8">
        <h2>How Does This Calculator Work?</h2>
        <p>
          Enter your property's current value, the expected annual appreciation
          rate, and the number of years you plan to hold the property. The
          calculator will estimate your property's future value and total gain.
        </p>
        <div className="my-6">
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
                <td className="px-3 py-2 border">Initial Property Value ($)</td>
                <td className="px-3 py-2 border">$300,000 - $600,000</td>
                <td className="px-3 py-2 border">
                  Typical U.S. home price (2024)
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">
                  Annual Appreciation Rate (%)
                </td>
                <td className="px-3 py-2 border">3% - 5%</td>
                <td className="px-3 py-2 border">
                  U.S. long-term average: ~3.5%
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Years</td>
                <td className="px-3 py-2 border">5 - 30</td>
                <td className="px-3 py-2 border">
                  How long you plan to hold the property
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="gap-4 grid md:grid-cols-3">
          <div className="mb-2">
            <label className="block mb-1 font-medium">
              Initial Property Value ($):
            </label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={initialValue}
              onChange={(e) => setInitialValue(e.target.value)}
              placeholder="Enter current property value"
              min="0"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">
              Annual Appreciation Rate (%):
            </label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={annualAppreciation}
              onChange={(e) => setAnnualAppreciation(e.target.value)}
              placeholder="e.g., 3.5"
              min="0"
              max="100"
              step="0.01"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">Years:</label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              placeholder="e.g., 10"
              min="1"
            />
          </div>
        </div>
        <button
          className="bg-blue-600 mt-2 px-4 py-2 rounded text-white"
          onClick={handleCalculate}
        >
          Calculate Appreciation
        </button>
        {result && (
          <div className="flex flex-col gap-4 mt-6">
            <div className="bg-white shadow p-4 border rounded-lg">
              <h3 className="mb-2 font-semibold">Results</h3>
              <table className="border border-gray-300 min-w-full text-sm">
                <tbody>
                  <tr>
                    <td className="px-3 py-2 border font-medium">
                      Future Value
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
                    <td className="px-3 py-2 border font-medium">Total Gain</td>
                    <td className="px-3 py-2 border">
                      $
                      {result.totalGain.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border font-medium">
                      Percent Gain
                    </td>
                    <td className="px-3 py-2 border">
                      {result.percentGain.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                      %
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="mt-2 text-gray-600 text-sm">
                <strong>Note:</strong> This calculator assumes a constant annual
                appreciation rate and does not account for market fluctuations
                or costs of ownership.
              </div>
            </div>
          </div>
        )}
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
                <td className="px-3 py-2 border">Initial Value</td>
                <td className="px-3 py-2 border">
                  Current market value of your property
                </td>
                <td className="px-3 py-2 border">$400,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Annual Appreciation Rate</td>
                <td className="px-3 py-2 border">
                  Expected yearly increase in property value (as a percent)
                </td>
                <td className="px-3 py-2 border">3.5%</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Years</td>
                <td className="px-3 py-2 border">
                  Number of years you plan to keep the property
                </td>
                <td className="px-3 py-2 border">10</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Future Value</td>
                <td className="px-3 py-2 border">
                  Estimated value after appreciation
                </td>
                <td className="px-3 py-2 border">$564,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Total Gain</td>
                <td className="px-3 py-2 border">
                  Increase in value over the period
                </td>
                <td className="px-3 py-2 border">$164,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Percent Gain</td>
                <td className="px-3 py-2 border">
                  Total gain as a percent of initial value
                </td>
                <td className="px-3 py-2 border">41%</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mb-6">
          <h3>Tips for Beginners</h3>
          <ul className="list-disc list-inside">
            <li>Appreciation rates vary by location and market conditions.</li>
            <li>Past performance does not guarantee future results.</li>
            <li>
              Consider property taxes, maintenance, and selling costs when
              evaluating investment returns.
            </li>
            <li>
              Consult a real estate professional for local appreciation trends.
            </li>
            <li>
              This calculator does not include rental income, mortgage payments,
              or costs of ownership.
            </li>
          </ul>
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
                <td className="px-3 py-2 border">Initial Value</td>
                <td className="px-3 py-2 border">$400,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Annual Appreciation Rate</td>
                <td className="px-3 py-2 border">3.5%</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Years</td>
                <td className="px-3 py-2 border">10</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Future Value</td>
                <td className="px-3 py-2 border">$564,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Total Gain</td>
                <td className="px-3 py-2 border">$164,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Percent Gain</td>
                <td className="px-3 py-2 border">41%</td>
              </tr>
            </tbody>
          </table>
          <p className="text-gray-600 text-sm">
            <strong>Source:</strong> Federal Housing Finance Agency, National
            Association of Realtors, 2024 averages.
          </p>
        </div>
      </section>
    </div>
  );
}
