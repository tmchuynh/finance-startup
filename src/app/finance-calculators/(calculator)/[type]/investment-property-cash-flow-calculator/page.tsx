"use client";
import { useState } from "react";

export default function InvestmentPropertyCashFlowCalculator() {
  const [monthlyRent, setMonthlyRent] = useState<string>("");
  const [vacancyRate, setVacancyRate] = useState<string>("5");
  const [monthlyExpenses, setMonthlyExpenses] = useState<string>("");
  const [mortgagePayment, setMortgagePayment] = useState<string>("");
  const [otherIncome, setOtherIncome] = useState<string>("");

  const [result, setResult] = useState<{
    grossIncome: number;
    vacancyLoss: number;
    effectiveIncome: number;
    annualExpenses: number;
    annualMortgage: number;
    netCashFlow: number;
  } | null>(null);

  const handleCalculate = () => {
    const rent = parseFloat(monthlyRent);
    const vacancy = parseFloat(vacancyRate) / 100;
    const expenses = parseFloat(monthlyExpenses);
    const mortgage = parseFloat(mortgagePayment);
    const other = parseFloat(otherIncome) || 0;

    if (
      !isNaN(rent) &&
      !isNaN(vacancy) &&
      !isNaN(expenses) &&
      !isNaN(mortgage) &&
      rent >= 0 &&
      vacancy >= 0 &&
      expenses >= 0 &&
      mortgage >= 0
    ) {
      const grossIncome = (rent + other) * 12;
      const vacancyLoss = grossIncome * vacancy;
      const effectiveIncome = grossIncome - vacancyLoss;
      const annualExpenses = expenses * 12;
      const annualMortgage = mortgage * 12;
      const netCashFlow = effectiveIncome - annualExpenses - annualMortgage;

      setResult({
        grossIncome,
        vacancyLoss,
        effectiveIncome,
        annualExpenses,
        annualMortgage,
        netCashFlow,
      });
    } else {
      setResult(null);
    }
  };

  return (
    <div className="mx-auto mt-8 md:mt-12 w-10/12 md:w-11/12 h-full">
      <h1>Investment Property Cash Flow Calculator</h1>
      <p className="mb-4">
        <strong>
          Estimate your annual cash flow from a rental property by entering your
          rental income, expenses, and mortgage payments.
        </strong>
      </p>
      <section className="mb-8">
        <h2>How Does This Calculator Work?</h2>
        <p>
          Enter your expected monthly rent, vacancy rate, expenses, mortgage
          payment, and any other income. The calculator will estimate your
          property's annual cash flow.
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
                <td className="px-3 py-2 border">Monthly Rent ($)</td>
                <td className="px-3 py-2 border">$1,500 - $3,000</td>
                <td className="px-3 py-2 border">
                  Depends on property and location
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Vacancy Rate (%)</td>
                <td className="px-3 py-2 border">5% - 8%</td>
                <td className="px-3 py-2 border">U.S. average: ~6%</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Monthly Expenses ($)</td>
                <td className="px-3 py-2 border">$300 - $800</td>
                <td className="px-3 py-2 border">
                  Taxes, insurance, maintenance, management, etc.
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">
                  Monthly Mortgage Payment ($)
                </td>
                <td className="px-3 py-2 border">$800 - $2,000</td>
                <td className="px-3 py-2 border">Principal & interest only</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Other Monthly Income ($)</td>
                <td className="px-3 py-2 border">$0 - $200</td>
                <td className="px-3 py-2 border">
                  Laundry, parking, storage, etc.
                </td>
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
              placeholder="Laundry, parking, etc."
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
              placeholder="e.g., 5"
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
              placeholder="Taxes, insurance, repairs, etc."
              min="0"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">
              Monthly Mortgage Payment ($):
            </label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={mortgagePayment}
              onChange={(e) => setMortgagePayment(e.target.value)}
              placeholder="Principal & interest only"
              min="0"
            />
          </div>
        </div>
        <button
          className="bg-blue-600 mt-2 px-4 py-2 rounded text-white"
          onClick={handleCalculate}
        >
          Calculate Cash Flow
        </button>
        {result && (
          <div className="flex flex-col gap-4 mt-6">
            <div className="bg-white shadow p-4 border rounded-lg">
              <h3 className="mb-2 font-semibold">Results</h3>
              <table className="border border-gray-300 min-w-full text-sm">
                <tbody>
                  <tr>
                    <td className="px-3 py-2 border font-medium">
                      Gross Rental Income
                    </td>
                    <td className="px-3 py-2 border">
                      $
                      {result.grossIncome.toLocaleString(undefined, {
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
                      Annual Mortgage Payments
                    </td>
                    <td className="px-3 py-2 border">
                      -$
                      {result.annualMortgage.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border font-medium">
                      Net Annual Cash Flow
                    </td>
                    <td className="px-3 py-2 border font-bold text-green-700">
                      $
                      {result.netCashFlow.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="mt-2 text-gray-600 text-sm">
                <strong>Note:</strong> This calculator does not include income
                taxes, depreciation, or appreciation.
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
                <td className="px-3 py-2 border">Gross Rental Income</td>
                <td className="px-3 py-2 border">
                  Total rent and other income before expenses
                </td>
                <td className="px-3 py-2 border">$24,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Vacancy Loss</td>
                <td className="px-3 py-2 border">
                  Estimated lost income due to vacancies
                </td>
                <td className="px-3 py-2 border">$1,200</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Effective Rental Income</td>
                <td className="px-3 py-2 border">
                  Gross income minus vacancy loss
                </td>
                <td className="px-3 py-2 border">$22,800</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Annual Expenses</td>
                <td className="px-3 py-2 border">
                  Total yearly operating expenses
                </td>
                <td className="px-3 py-2 border">$5,400</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Annual Mortgage Payments</td>
                <td className="px-3 py-2 border">
                  Total yearly principal & interest
                </td>
                <td className="px-3 py-2 border">$12,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Net Cash Flow</td>
                <td className="px-3 py-2 border">
                  Income left after all expenses and mortgage
                </td>
                <td className="px-3 py-2 border">$5,400</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mb-6">
          <h3>Tips for Beginners</h3>
          <ul className="list-disc list-inside">
            <li>
              Be realistic about vacancy rates—few properties are rented 100% of
              the time.
            </li>
            <li>
              Include all expenses: taxes, insurance, repairs, management,
              utilities, etc.
            </li>
            <li>
              Net cash flow does not include income taxes or depreciation.
            </li>
            <li>
              Positive cash flow means your property earns more than it costs to
              own.
            </li>
            <li>
              Consult a property manager or real estate professional for local
              data.
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
                <td className="px-3 py-2 border">Monthly Rent</td>
                <td className="px-3 py-2 border">$2,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Vacancy Rate</td>
                <td className="px-3 py-2 border">5%</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Monthly Expenses</td>
                <td className="px-3 py-2 border">$500</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Monthly Mortgage</td>
                <td className="px-3 py-2 border">$1,200</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Other Income</td>
                <td className="px-3 py-2 border">$100</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Net Annual Cash Flow</td>
                <td className="px-3 py-2 border">$4,340</td>
              </tr>
            </tbody>
          </table>
          <p className="text-gray-600 text-sm">
            <strong>Source:</strong> National Apartment Association, Zillow,
            2024 averages.
          </p>
        </div>
      </section>
    </div>
  );
}
