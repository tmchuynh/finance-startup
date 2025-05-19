"use client";
import { useState } from "react";

export default function IncomeAndPropertyAndSalesTaxCalculator() {
  const [annualIncome, setAnnualIncome] = useState<string>("");
  const [stateTaxRate, setStateTaxRate] = useState<string>("5");
  const [federalTaxRate, setFederalTaxRate] = useState<string>("22");
  const [propertyValue, setPropertyValue] = useState<string>("");
  const [propertyTaxRate, setPropertyTaxRate] = useState<string>("1.1");
  const [purchaseAmount, setPurchaseAmount] = useState<string>("");
  const [salesTaxRate, setSalesTaxRate] = useState<string>("7");

  const [result, setResult] = useState<{
    incomeTax: number;
    propertyTax: number;
    salesTax: number;
    totalTax: number;
  } | null>(null);

  const handleCalculate = () => {
    const income = parseFloat(annualIncome);
    const stateRate = parseFloat(stateTaxRate) / 100;
    const federalRate = parseFloat(federalTaxRate) / 100;
    const propValue = parseFloat(propertyValue);
    const propRate = parseFloat(propertyTaxRate) / 100;
    const purchase = parseFloat(purchaseAmount);
    const salesRate = parseFloat(salesTaxRate) / 100;

    const incomeTax =
      !isNaN(income) && income > 0 ? income * (stateRate + federalRate) : 0;
    const propertyTax =
      !isNaN(propValue) && propValue > 0 ? propValue * propRate : 0;
    const salesTax =
      !isNaN(purchase) && purchase > 0 ? purchase * salesRate : 0;
    const totalTax = incomeTax + propertyTax + salesTax;

    setResult({
      incomeTax,
      propertyTax,
      salesTax,
      totalTax,
    });
  };

  return (
    <div className="mx-auto mt-8 md:mt-12 w-10/12 md:w-11/12 h-full">
      <h1>Income, Property, and Sales Tax Calculator</h1>
      <p className="mb-4">
        <strong>
          Estimate your annual income tax, property tax, and sales tax based on
          your income, property value, and purchases.
        </strong>
      </p>
      <section className="mb-8">
        <h2>How Does This Calculator Work?</h2>
        <p>
          Enter your annual income, state and federal tax rates, property value
          and tax rate, and purchase amount with sales tax rate. The calculator
          estimates your total tax burden for each category.
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
                <td className="px-3 py-2 border">$50,000 - $150,000</td>
                <td className="px-3 py-2 border">Before taxes</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">State Tax Rate (%)</td>
                <td className="px-3 py-2 border">0% - 13%</td>
                <td className="px-3 py-2 border">
                  Varies by state (CA: 13.3%, TX: 0%)
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Federal Tax Rate (%)</td>
                <td className="px-3 py-2 border">10% - 37%</td>
                <td className="px-3 py-2 border">2024 U.S. tax brackets</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Property Value ($)</td>
                <td className="px-3 py-2 border">$200,000 - $800,000</td>
                <td className="px-3 py-2 border">Home or real estate value</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Property Tax Rate (%)</td>
                <td className="px-3 py-2 border">0.3% - 2.5%</td>
                <td className="px-3 py-2 border">U.S. average: 1.1%</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Purchase Amount ($)</td>
                <td className="px-3 py-2 border">$100 - $10,000</td>
                <td className="px-3 py-2 border">Total taxable purchases</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Sales Tax Rate (%)</td>
                <td className="px-3 py-2 border">4% - 10%</td>
                <td className="px-3 py-2 border">U.S. average: 7%</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mb-6">
          <h3>Tax Details Explained</h3>
          <table className="mb-4 border border-gray-300 min-w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-3 py-2 border text-left">Tax Type</th>
                <th className="px-3 py-2 border text-left">Description</th>
                <th className="px-3 py-2 border text-left">Example</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-3 py-2 border">Income Tax</td>
                <td className="px-3 py-2 border">
                  Tax on your annual earnings
                </td>
                <td className="px-3 py-2 border">$12,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Property Tax</td>
                <td className="px-3 py-2 border">
                  Annual tax on real estate value
                </td>
                <td className="px-3 py-2 border">$3,300</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Sales Tax</td>
                <td className="px-3 py-2 border">
                  Tax on purchases of goods/services
                </td>
                <td className="px-3 py-2 border">$350</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Total Tax</td>
                <td className="px-3 py-2 border">Sum of all taxes above</td>
                <td className="px-3 py-2 border">$15,650</td>
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
                <td className="px-3 py-2 border">State Tax Rate</td>
                <td className="px-3 py-2 border">5%</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Federal Tax Rate</td>
                <td className="px-3 py-2 border">22%</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Property Value</td>
                <td className="px-3 py-2 border">$300,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Property Tax Rate</td>
                <td className="px-3 py-2 border">1.1%</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Purchase Amount</td>
                <td className="px-3 py-2 border">$5,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Sales Tax Rate</td>
                <td className="px-3 py-2 border">7%</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Income Tax</td>
                <td className="px-3 py-2 border">$21,600</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Property Tax</td>
                <td className="px-3 py-2 border">$3,300</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Sales Tax</td>
                <td className="px-3 py-2 border">$350</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Total Tax</td>
                <td className="px-3 py-2 border">$25,250</td>
              </tr>
            </tbody>
          </table>
          <p className="text-gray-600 text-sm">
            <strong>Source:</strong> IRS, Tax Foundation, 2024 averages.
          </p>
        </div>
        <div className="mb-6">
          <h3>Tips for Beginners</h3>
          <ul className="list-disc list-inside">
            <li>
              Income tax rates are progressive—this calculator uses a flat
              estimate for simplicity.
            </li>
            <li>Property tax rates vary widely by state and county.</li>
            <li>
              Sales tax applies to most goods, but not all services or groceries
              in some states.
            </li>
            <li>Check your local government website for exact rates.</li>
            <li>Consult a tax professional for personalized advice.</li>
          </ul>
        </div>
      </section>
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
          <label className="block mb-1 font-medium">State Tax Rate (%):</label>
          <input
            type="number"
            className="px-2 py-1 border rounded w-full"
            value={stateTaxRate}
            onChange={(e) => setStateTaxRate(e.target.value)}
            placeholder="e.g., 5"
            min="0"
            max="20"
            step="0.01"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1 font-medium">
            Federal Tax Rate (%):
          </label>
          <input
            type="number"
            className="px-2 py-1 border rounded w-full"
            value={federalTaxRate}
            onChange={(e) => setFederalTaxRate(e.target.value)}
            placeholder="e.g., 22"
            min="0"
            max="50"
            step="0.01"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1 font-medium">Property Value ($):</label>
          <input
            type="number"
            className="px-2 py-1 border rounded w-full"
            value={propertyValue}
            onChange={(e) => setPropertyValue(e.target.value)}
            placeholder="e.g., 300000"
            min="0"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1 font-medium">
            Property Tax Rate (%):
          </label>
          <input
            type="number"
            className="px-2 py-1 border rounded w-full"
            value={propertyTaxRate}
            onChange={(e) => setPropertyTaxRate(e.target.value)}
            placeholder="e.g., 1.1"
            min="0"
            max="10"
            step="0.01"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1 font-medium">Purchase Amount ($):</label>
          <input
            type="number"
            className="px-2 py-1 border rounded w-full"
            value={purchaseAmount}
            onChange={(e) => setPurchaseAmount(e.target.value)}
            placeholder="e.g., 5000"
            min="0"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1 font-medium">Sales Tax Rate (%):</label>
          <input
            type="number"
            className="px-2 py-1 border rounded w-full"
            value={salesTaxRate}
            onChange={(e) => setSalesTaxRate(e.target.value)}
            placeholder="e.g., 7"
            min="0"
            max="20"
            step="0.01"
          />
        </div>
      </div>
      <button
        className="bg-blue-600 mt-2 px-4 py-2 rounded text-white"
        onClick={handleCalculate}
      >
        Calculate Taxes
      </button>
      {result && (
        <div className="flex flex-col gap-4 mt-6">
          <div className="bg-white shadow p-4 border rounded-lg">
            <h3 className="mb-2 font-semibold">Results</h3>
            <table className="border border-gray-300 min-w-full text-sm">
              <tbody>
                <tr>
                  <td className="px-3 py-2 border font-medium">Income Tax</td>
                  <td className="px-3 py-2 border">
                    $
                    {result.incomeTax.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2 border font-medium">Property Tax</td>
                  <td className="px-3 py-2 border">
                    $
                    {result.propertyTax.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2 border font-medium">Sales Tax</td>
                  <td className="px-3 py-2 border">
                    $
                    {result.salesTax.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2 border font-medium">Total Tax</td>
                  <td className="px-3 py-2 border font-bold text-red-700">
                    $
                    {result.totalTax.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="mt-2 text-gray-600 text-sm">
              <strong>Note:</strong> This calculator provides estimates. Actual
              tax owed may vary based on deductions, credits, and local laws.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
