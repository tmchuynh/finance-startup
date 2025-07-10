"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function PensionPlanCalculator() {
  const [currentAge, setCurrentAge] = useState<string>("");
  const [retirementAge, setRetirementAge] = useState<string>("65");
  const [yearsOfService, setYearsOfService] = useState<string>("");
  const [finalSalary, setFinalSalary] = useState<string>("");
  const [benefitPercent, setBenefitPercent] = useState<string>("1.5");
  const [result, setResult] = useState<{
    annualPension: number;
    monthlyPension: number;
    replacementRate: number;
  } | null>(null);

  const handleCalculate = () => {
    const age = parseFloat(currentAge);
    const retire = parseFloat(retirementAge);
    const service = parseFloat(yearsOfService);
    const salary = parseFloat(finalSalary);
    const percent = parseFloat(benefitPercent);

    if (
      !isNaN(age) &&
      !isNaN(retire) &&
      !isNaN(service) &&
      !isNaN(salary) &&
      !isNaN(percent) &&
      age > 0 &&
      retire > age &&
      service > 0 &&
      salary > 0 &&
      percent > 0
    ) {
      // Formula: Pension = years of service × benefit % × final salary
      const annualPension = service * (percent / 100) * salary;
      const monthlyPension = annualPension / 12;
      const replacementRate = (annualPension / salary) * 100;
      setResult({
        annualPension,
        monthlyPension,
        replacementRate,
      });
    } else {
      setResult(null);
    }
  };

  return (
    <div className="mt-8 md:mt-12 mx-auto h-full w-10/12 md:w-11/12">
      <h1>Pension Plan Calculator</h1>
      <p className="mb-4">
        <strong>
          Estimate your annual and monthly pension income at retirement based on
          your years of service, final salary, and plan formula.
        </strong>
      </p>
      <section className="mb-8">
        <h2>How Does This Calculator Work?</h2>
        <p>
          Enter your current age, expected retirement age, years of service,
          final average salary, and your plan's benefit percentage. The
          calculator estimates your annual and monthly pension benefit.
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
                <td className="px-3 py-2 border">35 - 55</td>
                <td className="px-3 py-2 border">Your current age</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Retirement Age</td>
                <td className="px-3 py-2 border">60 - 67</td>
                <td className="px-3 py-2 border">When you plan to retire</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Years of Service</td>
                <td className="px-3 py-2 border">20 - 40</td>
                <td className="px-3 py-2 border">Total years worked in plan</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Final Average Salary ($)</td>
                <td className="px-3 py-2 border">$50,000 - $120,000</td>
                <td className="px-3 py-2 border">Average of last 3-5 years</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Benefit % per Year</td>
                <td className="px-3 py-2 border">1% - 2.5%</td>
                <td className="px-3 py-2 border">Plan formula (e.g., 1.5%)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mb-6">
          <h3>Pension Plan Details</h3>
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
                <td className="px-3 py-2 border">Years of Service</td>
                <td className="px-3 py-2 border">
                  Total years worked in the pension plan
                </td>
                <td className="px-3 py-2 border">30</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Final Average Salary</td>
                <td className="px-3 py-2 border">
                  Average salary over last 3-5 years
                </td>
                <td className="px-3 py-2 border">$80,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Benefit % per Year</td>
                <td className="px-3 py-2 border">
                  Percent of salary earned per year of service
                </td>
                <td className="px-3 py-2 border">1.5%</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Annual Pension</td>
                <td className="px-3 py-2 border">
                  Total annual benefit at retirement
                </td>
                <td className="px-3 py-2 border">$36,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Monthly Pension</td>
                <td className="px-3 py-2 border">
                  Annual pension divided by 12
                </td>
                <td className="px-3 py-2 border">$3,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Replacement Rate</td>
                <td className="px-3 py-2 border">
                  Percent of salary replaced by pension
                </td>
                <td className="px-3 py-2 border">45%</td>
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
                <td className="px-3 py-2 border">40</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Retirement Age</td>
                <td className="px-3 py-2 border">65</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Years of Service</td>
                <td className="px-3 py-2 border">25</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Final Salary</td>
                <td className="px-3 py-2 border">$90,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Benefit % per Year</td>
                <td className="px-3 py-2 border">2%</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Annual Pension</td>
                <td className="px-3 py-2 border">$45,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Monthly Pension</td>
                <td className="px-3 py-2 border">$3,750</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Replacement Rate</td>
                <td className="px-3 py-2 border">50%</td>
              </tr>
            </tbody>
          </table>
          <p className="text-sm">
            <strong>Source:</strong> U.S. Bureau of Labor Statistics, 2024
            averages.
          </p>
        </div>
        <div className="mb-6">
          <h3>Tips for Beginners</h3>
          <ul className="list-disc list-inside">
            <li>
              Pension formulas vary by employer—check your plan documents.
            </li>
            <li>
              Some plans use highest 3 or 5 years of salary for calculation.
            </li>
            <li>
              Replacement rate shows how much of your salary your pension will
              replace.
            </li>
            <li>
              Consider Social Security and other savings for full retirement
              income.
            </li>
            <li>
              Consult your HR or benefits office for personalized estimates.
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
            placeholder="e.g., 40"
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
            placeholder="e.g., 65"
            min="0"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1 font-medium">Years of Service:</label>
          <input
            type="number"
            className="px-2 py-1 border rounded w-full"
            value={yearsOfService}
            onChange={(e) => setYearsOfService(e.target.value)}
            placeholder="e.g., 25"
            min="0"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1 font-medium">
            Final Average Salary ($):
          </label>
          <input
            type="number"
            className="px-2 py-1 border rounded w-full"
            value={finalSalary}
            onChange={(e) => setFinalSalary(e.target.value)}
            placeholder="e.g., 90000"
            min="0"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1 font-medium">Benefit % per Year:</label>
          <input
            type="number"
            className="px-2 py-1 border rounded w-full"
            value={benefitPercent}
            onChange={(e) => setBenefitPercent(e.target.value)}
            placeholder="e.g., 1.5"
            min="0"
            max="10"
            step="0.01"
          />
        </div>
      </div>
      <Button className="mt-2 px-4 py-2 rounded" onClick={handleCalculate}>
        Calculate Pension
      </Button>
      {result && (
        <div className="flex flex-col gap-4 mt-6">
          <div className="shadow p-4 border rounded-lg">
            <h3 className="mb-2 font-semibold">Results</h3>
            <table className="border border-gray-300 min-w-full text-sm">
              <tbody>
                <tr>
                  <td className="px-3 py-2 border font-medium">
                    Annual Pension
                  </td>
                  <td className="px-3 py-2 border">
                    $
                    {result.annualPension.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2 border font-medium">
                    Monthly Pension
                  </td>
                  <td className="px-3 py-2 border">
                    $
                    {result.monthlyPension.toLocaleString(undefined, {
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
            <div className="mt-2 text-sm">
              <strong>Note:</strong> This calculator uses a simplified formula.
              Your actual pension may vary based on plan rules, early
              retirement, or survivor benefits.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
