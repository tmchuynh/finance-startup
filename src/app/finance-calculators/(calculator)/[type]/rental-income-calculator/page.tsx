"use client";
import { useState } from "react";

export default function RentalIncomeCalculator() {
  const [monthlyRent, setMonthlyRent] = useState<string>("");
  const [vacancyRate, setVacancyRate] = useState<string>("5");
  const [monthlyExpenses, setMonthlyExpenses] = useState<string>("");
  const [otherIncome, setOtherIncome] = useState<string>("");

  const [result, setResult] = useState<{
    grossAnnualIncome: number;
    vacancyLoss: number;
    effectiveIncome: number;
    annualExpenses: number;
    netOperatingIncome: number;
  } | null>(null);

  const handleCalculate = () => {
    const rent = parseFloat(monthlyRent);
    const vacancy = parseFloat(vacancyRate) / 100;
    const expenses = parseFloat(monthlyExpenses);
    const other = parseFloat(otherIncome) || 0;

    if (
      !isNaN(rent) &&
      !isNaN(vacancy) &&
      !isNaN(expenses) &&
      rent >= 0 &&
      vacancy >= 0 &&
      expenses >= 0
    ) {
      const grossAnnualIncome = (rent + other) * 12;
      const vacancyLoss = grossAnnualIncome * vacancy;
      const effectiveIncome = grossAnnualIncome - vacancyLoss;
      const annualExpenses = expenses * 12;
      const netOperatingIncome = effectiveIncome - annualExpenses;

      setResult({
        grossAnnualIncome,
        vacancyLoss,
        effectiveIncome,
        annualExpenses,
        netOperatingIncome,
      });
    } else {
      setResult(null);
    }
  };

  return (
    <div className="mx-auto mt-8 md:mt-12 w-10/12 md:w-11/12 h-full">
      <h1>Rental Income Calculator</h1>
      <p className="mb-4">
        <strong>
          Estimate your annual rental income and net operating income (NOI) by
          entering your rental details below.
        </strong>
      </p>
      <section className="mb-8">
        <h2>What is Rental Income?</h2>
        <p>
          Rental income is the money you receive from renting out a property. To
          understand your true earnings, you need to consider not just the rent,
          but also vacancies and expenses.
        </p>
        <div className="my-6">
          <h3>Tips for Beginners</h3>
          <ul className="list-disc list-inside">
            <li>
              Be realistic about vacancy rates—most properties are not rented
              100% of the time.
            </li>
            <li>
              Include all expenses: property taxes, insurance, repairs,
              management fees, utilities, etc.
            </li>
            <li>
              Net Operating Income (NOI) does not include mortgage payments or
              income taxes.
            </li>
            <li>
              Use NOI to compare different rental properties and estimate
              investment returns.
            </li>
            <li>
              Consult a financial advisor or property manager for personalized
              advice.
            </li>
          </ul>
        </div>
        <div className="mb-6">
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
                <td className="px-3 py-2 border">Monthly Rent</td>
                <td className="px-3 py-2 border">
                  The amount you charge tenants each month.
                </td>
                <td className="px-3 py-2 border">$1,500</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Other Monthly Income</td>
                <td className="px-3 py-2 border">
                  Additional income (e.g., parking, laundry).
                </td>
                <td className="px-3 py-2 border">$100</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Vacancy Rate</td>
                <td className="px-3 py-2 border">
                  Percentage of time the property is unoccupied.
                </td>
                <td className="px-3 py-2 border">5%</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Monthly Expenses</td>
                <td className="px-3 py-2 border">
                  Total monthly costs (maintenance, taxes, insurance, etc.).
                </td>
                <td className="px-3 py-2 border">$400</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Net Operating Income (NOI)</td>
                <td className="px-3 py-2 border">
                  Income left after expenses and vacancy loss.
                </td>
                <td className="px-3 py-2 border">$11,400</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="gap-4 grid md:grid-cols-2">
          <div className="mb-2">
            <label className="block mb-1 font-medium">Monthly Rent ($):</label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={monthlyRent}
              onChange={(e) => setMonthlyRent(e.target.value)}
              placeholder="Enter monthly rent"
              min="0"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">
              Other Monthly Income ($):
            </label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={otherIncome}
              onChange={(e) => setOtherIncome(e.target.value)}
              placeholder="Enter other monthly income"
              min="0"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">Vacancy Rate (%):</label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={vacancyRate}
              onChange={(e) => setVacancyRate(e.target.value)}
              placeholder="Enter vacancy rate (e.g., 5)"
              min="0"
              max="100"
              step="0.01"
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
              placeholder="Enter total monthly expenses"
              min="0"
            />
          </div>
        </div>
        <button
          className="bg-blue-600 mt-2 px-4 py-2 rounded text-white"
          onClick={handleCalculate}
        >
          Calculate Rental Income
        </button>
        {result && (
          <div className="flex flex-col gap-4 mt-6">
            <div className="bg-white shadow p-4 border rounded-lg">
              <h3 className="mb-2 font-semibold">Results</h3>
              <table className="border border-gray-300 min-w-full text-sm">
                <tbody>
                  <tr>
                    <td className="px-3 py-2 border font-medium">
                      Gross Annual Income
                    </td>
                    <td className="px-3 py-2 border">
                      $
                      {result.grossAnnualIncome.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border font-medium">
                      Vacancy Loss
                    </td>
                    <td className="px-3 py-2 border">
                      -$
                      {result.vacancyLoss.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border font-medium">
                      Effective Rental Income
                    </td>
                    <td className="px-3 py-2 border">
                      $
                      {result.effectiveIncome.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border font-medium">
                      Annual Expenses
                    </td>
                    <td className="px-3 py-2 border">
                      -$
                      {result.annualExpenses.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border font-medium">
                      Net Operating Income (NOI)
                    </td>
                    <td className="px-3 py-2 border font-bold text-green-700">
                      $
                      {result.netOperatingIncome.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
        <div className="my-6">
          <h3>How Rental Income is Calculated</h3>
          <ul className="mb-2 list-decimal list-inside">
            <li>
              <strong>Gross Annual Income:</strong> (Monthly Rent + Other
              Monthly Income) × 12
            </li>
            <li>
              <strong>Vacancy Loss:</strong> Gross Annual Income × Vacancy Rate
            </li>
            <li>
              <strong>Effective Rental Income:</strong> Gross Annual Income -
              Vacancy Loss
            </li>
            <li>
              <strong>Annual Expenses:</strong> Monthly Expenses × 12
            </li>
            <li>
              <strong>Net Operating Income (NOI):</strong> Effective Rental
              Income - Annual Expenses
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
                <td className="px-3 py-2 border">Gross Annual Income</td>
                <td className="px-3 py-2 border">(1500 + 100) × 12</td>
                <td className="px-3 py-2 border">$19,200</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Vacancy Loss</td>
                <td className="px-3 py-2 border">$19,200 × 0.05</td>
                <td className="px-3 py-2 border">$960</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Effective Rental Income</td>
                <td className="px-3 py-2 border">$19,200 - $960</td>
                <td className="px-3 py-2 border">$18,240</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Annual Expenses</td>
                <td className="px-3 py-2 border">$400 × 12</td>
                <td className="px-3 py-2 border">$4,800</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Net Operating Income (NOI)</td>
                <td className="px-3 py-2 border">$18,240 - $4,800</td>
                <td className="px-3 py-2 border">$13,440</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
