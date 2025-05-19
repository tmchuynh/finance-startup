"use client";
import { useState } from "react";

export default function LifeAndAutoInsuranceCalculator() {
  // Life insurance fields
  const [age, setAge] = useState<string>("");
  const [annualIncome, setAnnualIncome] = useState<string>("");
  const [yearsToSupport, setYearsToSupport] = useState<string>("10");
  const [existingCoverage, setExistingCoverage] = useState<string>("0");
  const [lifePremium, setLifePremium] = useState<string>("600");

  // Auto insurance fields
  const [carValue, setCarValue] = useState<string>("");
  const [carAge, setCarAge] = useState<string>("");
  const [drivingRecord, setDrivingRecord] = useState<string>("clean");
  const [autoPremium, setAutoPremium] = useState<string>("1200");

  const [result, setResult] = useState<{
    suggestedLifeCoverage: number;
    annualLifePremium: number;
    suggestedAutoCoverage: number;
    annualAutoPremium: number;
  } | null>(null);

  const handleCalculate = () => {
    const ageNum = parseFloat(age);
    const income = parseFloat(annualIncome);
    const years = parseFloat(yearsToSupport);
    const existing = parseFloat(existingCoverage);
    const lifePrem = parseFloat(lifePremium);

    const carVal = parseFloat(carValue);
    const carAgeNum = parseFloat(carAge);
    const autoPrem = parseFloat(autoPremium);

    // Life insurance: suggest 10x-12x income minus existing coverage
    let suggestedLifeCoverage = 0;
    if (!isNaN(income) && !isNaN(years) && !isNaN(existing)) {
      suggestedLifeCoverage = Math.max(0, income * years - existing);
    }

    // Auto insurance: suggest coverage at least equal to car value, adjust for record/age
    let suggestedAutoCoverage = 0;
    if (!isNaN(carVal)) {
      suggestedAutoCoverage = carVal;
      if (drivingRecord === "accidents") suggestedAutoCoverage *= 1.1;
      if (!isNaN(carAgeNum) && carAgeNum > 10) suggestedAutoCoverage *= 0.8;
    }

    setResult({
      suggestedLifeCoverage,
      annualLifePremium: isNaN(lifePrem) ? 0 : lifePrem,
      suggestedAutoCoverage,
      annualAutoPremium: isNaN(autoPrem) ? 0 : autoPrem,
    });
  };

  return (
    <div className="mx-auto mt-8 md:mt-12 w-10/12 md:w-11/12 h-full">
      <h1>Life & Auto Insurance Calculator</h1>
      <p className="mb-4">
        <strong>
          Estimate your life insurance needs and auto insurance coverage and
          premiums based on your income, family needs, car value, and driving
          record.
        </strong>
      </p>
      <section className="mb-8">
        <h2>How Does This Calculator Work?</h2>
        <p>
          Enter your age, income, years you want to support your family,
          existing life insurance, car value, car age, and driving record. The
          calculator estimates suggested coverage and typical annual premiums
          for both life and auto insurance.
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
                <td className="px-3 py-2 border">Age</td>
                <td className="px-3 py-2 border">25 - 55</td>
                <td className="px-3 py-2 border">For life insurance quote</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Annual Income ($)</td>
                <td className="px-3 py-2 border">$40,000 - $120,000</td>
                <td className="px-3 py-2 border">
                  Used for life insurance need
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Years to Support Family</td>
                <td className="px-3 py-2 border">5 - 20</td>
                <td className="px-3 py-2 border">
                  Years of income replacement
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Existing Life Coverage ($)</td>
                <td className="px-3 py-2 border">$0 - $500,000</td>
                <td className="px-3 py-2 border">Employer or other policies</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Annual Life Premium ($)</td>
                <td className="px-3 py-2 border">$300 - $1,200</td>
                <td className="px-3 py-2 border">
                  Term life, healthy non-smoker
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Car Value ($)</td>
                <td className="px-3 py-2 border">$10,000 - $40,000</td>
                <td className="px-3 py-2 border">Current market value</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Car Age (years)</td>
                <td className="px-3 py-2 border">0 - 15</td>
                <td className="px-3 py-2 border">
                  Older cars may need less coverage
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Driving Record</td>
                <td className="px-3 py-2 border">Clean / Accidents</td>
                <td className="px-3 py-2 border">Affects auto premium</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Annual Auto Premium ($)</td>
                <td className="px-3 py-2 border">$800 - $2,000</td>
                <td className="px-3 py-2 border">
                  Full coverage, varies by state
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mb-6">
          <h3>Insurance Details Explained</h3>
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
                <td className="px-3 py-2 border">Life Insurance Coverage</td>
                <td className="px-3 py-2 border">
                  Amount paid to beneficiaries if you pass away
                </td>
                <td className="px-3 py-2 border">$500,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Annual Life Premium</td>
                <td className="px-3 py-2 border">
                  Yearly cost for term life insurance
                </td>
                <td className="px-3 py-2 border">$600</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Auto Insurance Coverage</td>
                <td className="px-3 py-2 border">
                  Maximum payout for car damage/theft
                </td>
                <td className="px-3 py-2 border">$20,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Annual Auto Premium</td>
                <td className="px-3 py-2 border">
                  Yearly cost for full coverage
                </td>
                <td className="px-3 py-2 border">$1,200</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Driving Record</td>
                <td className="px-3 py-2 border">
                  Clean or with accidents/tickets
                </td>
                <td className="px-3 py-2 border">Clean</td>
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
                <td className="px-3 py-2 border">Age</td>
                <td className="px-3 py-2 border">35</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Annual Income</td>
                <td className="px-3 py-2 border">$70,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Years to Support</td>
                <td className="px-3 py-2 border">10</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Existing Life Coverage</td>
                <td className="px-3 py-2 border">$100,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Suggested Life Coverage</td>
                <td className="px-3 py-2 border">$600,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Annual Life Premium</td>
                <td className="px-3 py-2 border">$600</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Car Value</td>
                <td className="px-3 py-2 border">$20,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Car Age</td>
                <td className="px-3 py-2 border">5</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Driving Record</td>
                <td className="px-3 py-2 border">Clean</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Suggested Auto Coverage</td>
                <td className="px-3 py-2 border">$20,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Annual Auto Premium</td>
                <td className="px-3 py-2 border">$1,200</td>
              </tr>
            </tbody>
          </table>
          <p className="text-gray-600 text-sm">
            <strong>Source:</strong> Policygenius, ValuePenguin, 2024 averages.
          </p>
        </div>
        <div className="mb-6">
          <h3>Tips for Beginners</h3>
          <ul className="list-disc list-inside">
            <li>
              Life insurance is usually recommended at 10-12× your annual
              income.
            </li>
            <li>Term life is much cheaper than whole life for most people.</li>
            <li>
              Auto insurance premiums depend on car value, age, and driving
              record.
            </li>
            <li>Shop around for quotes and review coverage annually.</li>
            <li>Consult an insurance agent for personalized advice.</li>
          </ul>
        </div>
      </section>
      <div className="mb-8">
        <h3 className="mb-2 font-medium">Life Insurance Inputs</h3>
        <div className="gap-4 grid md:grid-cols-3">
          <div className="mb-2">
            <label className="block mb-1 font-medium">Age:</label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="e.g., 35"
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
              placeholder="e.g., 70000"
              min="0"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">
              Years to Support Family:
            </label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={yearsToSupport}
              onChange={(e) => setYearsToSupport(e.target.value)}
              placeholder="e.g., 10"
              min="1"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">
              Existing Life Coverage ($):
            </label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={existingCoverage}
              onChange={(e) => setExistingCoverage(e.target.value)}
              placeholder="e.g., 100000"
              min="0"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">
              Annual Life Premium ($):
            </label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={lifePremium}
              onChange={(e) => setLifePremium(e.target.value)}
              placeholder="e.g., 600"
              min="0"
            />
          </div>
        </div>
      </div>
      <div className="mb-8">
        <h3 className="mb-2 font-medium">Auto Insurance Inputs</h3>
        <div className="gap-4 grid md:grid-cols-3">
          <div className="mb-2">
            <label className="block mb-1 font-medium">Car Value ($):</label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={carValue}
              onChange={(e) => setCarValue(e.target.value)}
              placeholder="e.g., 20000"
              min="0"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">Car Age (years):</label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={carAge}
              onChange={(e) => setCarAge(e.target.value)}
              placeholder="e.g., 5"
              min="0"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">Driving Record:</label>
            <select
              className="px-2 py-1 border rounded w-full"
              value={drivingRecord}
              onChange={(e) => setDrivingRecord(e.target.value)}
            >
              <option value="clean">Clean</option>
              <option value="accidents">Accidents/Tickets</option>
            </select>
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">
              Annual Auto Premium ($):
            </label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={autoPremium}
              onChange={(e) => setAutoPremium(e.target.value)}
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
        Calculate Insurance Needs
      </button>
      {result && (
        <div className="flex flex-col gap-4 mt-6">
          <div className="bg-white shadow p-4 border rounded-lg">
            <h3 className="mb-2 font-semibold">Results</h3>
            <table className="border border-gray-300 min-w-full text-sm">
              <tbody>
                <tr>
                  <td className="px-3 py-2 border font-medium">
                    Suggested Life Coverage
                  </td>
                  <td className="px-3 py-2 border">
                    $
                    {result.suggestedLifeCoverage.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2 border font-medium">
                    Annual Life Premium
                  </td>
                  <td className="px-3 py-2 border">
                    $
                    {result.annualLifePremium.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2 border font-medium">
                    Suggested Auto Coverage
                  </td>
                  <td className="px-3 py-2 border">
                    $
                    {result.suggestedAutoCoverage.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2 border font-medium">
                    Annual Auto Premium
                  </td>
                  <td className="px-3 py-2 border">
                    $
                    {result.annualAutoPremium.toLocaleString(undefined, {
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
              location, and insurer.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
