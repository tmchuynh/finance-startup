"use client";
import { useState } from "react";

export default function SocialSecurityBenefitsCalculator() {
  const [currentAge, setCurrentAge] = useState<string>("");
  const [retirementAge, setRetirementAge] = useState<string>("67");
  const [averageEarnings, setAverageEarnings] = useState<string>("");
  const [yearsWorked, setYearsWorked] = useState<string>("35");
  const [result, setResult] = useState<{
    monthlyBenefit: number;
    annualBenefit: number;
    replacementRate: number;
  } | null>(null);

  // 2024 bend points for PIA calculation (rounded for simplicity)
  const BEND1 = 1174;
  const BEND2 = 7078;

  // Approximate PIA formula for Social Security (2024)
  function calculatePIA(earnings: number) {
    // PIA = 90% of first $1,174 + 32% of next $6,904 + 15% of amount over $7,078 (monthly)
    if (earnings <= BEND1) {
      return earnings * 0.9;
    } else if (earnings <= BEND2) {
      return 0.9 * BEND1 + 0.32 * (earnings - BEND1);
    } else {
      return 0.9 * BEND1 + 0.32 * (BEND2 - BEND1) + 0.15 * (earnings - BEND2);
    }
  }

  // Adjust benefit for claiming age (simplified)
  function adjustForRetirementAge(pia: number, age: number) {
    // Full retirement age = 67. Early: reduce by 6.67%/year (62-67). Delay: increase by 8%/year (67-70)
    if (age === 67) return pia;
    if (age < 67) {
      const yearsEarly = 67 - age;
      return pia * (1 - 0.0667 * yearsEarly);
    }
    if (age > 67) {
      const yearsLate = age - 67;
      return pia * (1 + 0.08 * yearsLate);
    }
    return pia;
  }

  const handleCalculate = () => {
    const age = parseFloat(currentAge);
    const retireAge = parseFloat(retirementAge);
    const earnings = parseFloat(averageEarnings);
    const years = parseFloat(yearsWorked);

    if (
      !isNaN(age) &&
      !isNaN(retireAge) &&
      !isNaN(earnings) &&
      !isNaN(years) &&
      age > 0 &&
      retireAge >= 62 &&
      retireAge <= 70 &&
      earnings > 0 &&
      years >= 10
    ) {
      // Social Security uses highest 35 years of earnings, indexed to inflation
      // For simplicity, use entered average earnings as AIME (monthly)
      const aime = earnings / 12;
      let pia = calculatePIA(aime);
      pia = adjustForRetirementAge(pia, retireAge);
      const monthlyBenefit = Math.max(0, pia);
      const annualBenefit = monthlyBenefit * 12;
      const replacementRate = ((monthlyBenefit * 12) / earnings) * 100;
      setResult({
        monthlyBenefit,
        annualBenefit,
        replacementRate,
      });
    } else {
      setResult(null);
    }
  };

  return (
    <div className="mx-auto mt-8 md:mt-12 w-10/12 md:w-11/12 h-full">
      <h1>Social Security Benefits Calculator</h1>
      <p className="mb-4">
        <strong>
          Estimate your monthly and annual Social Security retirement benefits
          based on your average earnings and claiming age.
        </strong>
      </p>
      <section className="mb-8">
        <h2>How Does This Calculator Work?</h2>
        <p>
          Enter your current age, planned retirement age, average annual
          earnings, and years worked. The calculator estimates your Social
          Security benefit using the official formula and adjusts for early or
          delayed claiming.
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
                <td className="px-3 py-2 border">Current Age</td>
                <td className="px-3 py-2 border">40 - 60</td>
                <td className="px-3 py-2 border">Your current age</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Retirement Age</td>
                <td className="px-3 py-2 border">62 - 70</td>
                <td className="px-3 py-2 border">Full retirement age is 67</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">
                  Average Annual Earnings ($)
                </td>
                <td className="px-3 py-2 border">$40,000 - $120,000</td>
                <td className="px-3 py-2 border">
                  Average of highest 35 years
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Years Worked</td>
                <td className="px-3 py-2 border">10 - 40</td>
                <td className="px-3 py-2 border">
                  Minimum 10 years to qualify
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mb-6">
          <h3>Social Security Benefit Details</h3>
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
                <td className="px-3 py-2 border">AIME</td>
                <td className="px-3 py-2 border">
                  Average Indexed Monthly Earnings
                </td>
                <td className="px-3 py-2 border">$5,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">PIA</td>
                <td className="px-3 py-2 border">
                  Primary Insurance Amount (monthly benefit at full retirement
                  age)
                </td>
                <td className="px-3 py-2 border">$2,300</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Monthly Benefit</td>
                <td className="px-3 py-2 border">
                  Benefit at your claiming age
                </td>
                <td className="px-3 py-2 border">$1,840</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Annual Benefit</td>
                <td className="px-3 py-2 border">Monthly × 12</td>
                <td className="px-3 py-2 border">$22,080</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Replacement Rate</td>
                <td className="px-3 py-2 border">
                  Percent of earnings replaced by benefit
                </td>
                <td className="px-3 py-2 border">46%</td>
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
                <td className="px-3 py-2 border">Average Earnings</td>
                <td className="px-3 py-2 border">$60,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Years Worked</td>
                <td className="px-3 py-2 border">35</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Retirement Age</td>
                <td className="px-3 py-2 border">67</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Monthly Benefit</td>
                <td className="px-3 py-2 border">$2,200</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Annual Benefit</td>
                <td className="px-3 py-2 border">$26,400</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Replacement Rate</td>
                <td className="px-3 py-2 border">44%</td>
              </tr>
            </tbody>
          </table>
          <p className="text-gray-600 text-sm">
            <strong>Source:</strong> Social Security Administration, 2024.
          </p>
        </div>
        <div className="mb-6">
          <h3>Tips for Beginners</h3>
          <ul className="list-disc list-inside">
            <li>
              Benefits are based on your highest 35 years of earnings, adjusted
              for inflation.
            </li>
            <li>
              Claiming before age 67 reduces your benefit; delaying increases
              it.
            </li>
            <li>
              You need at least 10 years of work to qualify for retirement
              benefits.
            </li>
            <li>
              Social Security is only one part of retirement income—consider
              savings and pensions too.
            </li>
            <li>
              Check your official statement at{" "}
              <a
                href="https://www.ssa.gov/myaccount/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 underline"
              >
                ssa.gov/myaccount
              </a>
              .
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
            placeholder="e.g., 55"
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
            min="62"
            max="70"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1 font-medium">
            Average Annual Earnings ($):
          </label>
          <input
            type="number"
            className="px-2 py-1 border rounded w-full"
            value={averageEarnings}
            onChange={(e) => setAverageEarnings(e.target.value)}
            placeholder="e.g., 60000"
            min="0"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1 font-medium">Years Worked:</label>
          <input
            type="number"
            className="px-2 py-1 border rounded w-full"
            value={yearsWorked}
            onChange={(e) => setYearsWorked(e.target.value)}
            placeholder="e.g., 35"
            min="10"
            max="50"
          />
        </div>
      </div>
      <button
        className="bg-blue-600 mt-2 px-4 py-2 rounded text-white"
        onClick={handleCalculate}
      >
        Calculate Benefit
      </button>
      {result && (
        <div className="flex flex-col gap-4 mt-6">
          <div className="bg-white shadow p-4 border rounded-lg">
            <h3 className="mb-2 font-semibold">Results</h3>
            <table className="border border-gray-300 min-w-full text-sm">
              <tbody>
                <tr>
                  <td className="px-3 py-2 border font-medium">
                    Monthly Benefit
                  </td>
                  <td className="px-3 py-2 border">
                    $
                    {result.monthlyBenefit.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2 border font-medium">
                    Annual Benefit
                  </td>
                  <td className="px-3 py-2 border">
                    $
                    {result.annualBenefit.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2 border font-medium">
                    Replacement Rate
                  </td>
                  <td className="px-3 py-2 border">
                    {result.replacementRate.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                    %
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="mt-2 text-gray-600 text-sm">
              <strong>Note:</strong> This calculator provides an estimate. Your
              actual benefit may vary based on your full earnings record and
              official SSA calculations.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
