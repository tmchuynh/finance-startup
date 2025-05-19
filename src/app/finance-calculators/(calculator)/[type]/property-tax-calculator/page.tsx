"use client";
import { useState } from "react";

export default function PropertyTaxCalculator() {
  const [propertyValue, setPropertyValue] = useState<string>("");
  const [taxRate, setTaxRate] = useState<string>("");
  const [annualTax, setAnnualTax] = useState<number | null>(null);

  const handleCalculate = () => {
    const value = parseFloat(propertyValue);
    const rate = parseFloat(taxRate) / 100;
    if (!isNaN(value) && !isNaN(rate) && value > 0 && rate >= 0) {
      setAnnualTax(value * rate);
    } else {
      setAnnualTax(null);
    }
  };

  return (
    <div className="mx-auto mt-8 md:mt-12 w-10/12 md:w-11/12 h-full">
      <h1>Property Tax Calculator</h1>
      <p className="mb-4">
        <strong>
          Estimate your annual property tax and learn how property taxes work,
          what affects them, and how to budget for them.
        </strong>
      </p>
      <section className="mb-8">
        <h2>What is Property Tax?</h2>
        <p>
          Property tax is a yearly fee paid by property owners to local
          governments. It helps fund schools, roads, police, fire departments,
          and other public services. The amount you pay depends on your
          property's value and your local tax rate.
        </p>
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
                <td className="px-3 py-2 border">Assessed Value</td>
                <td className="px-3 py-2 border">
                  The value of your property as determined by your local
                  government for tax purposes.
                </td>
                <td className="px-3 py-2 border">$350,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Tax Rate</td>
                <td className="px-3 py-2 border">
                  The percentage of your property's value you pay in taxes each
                  year.
                </td>
                <td className="px-3 py-2 border">1.25%</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Annual Property Tax</td>
                <td className="px-3 py-2 border">
                  The total amount you pay each year.
                </td>
                <td className="px-3 py-2 border">$4,375</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mb-6">
          <h3>How Property Tax is Calculated</h3>
          <ul className="mb-2 list-decimal list-inside">
            <li>
              <strong>Find your property's assessed value.</strong> This is
              usually based on the market value, but may be adjusted by your
              local government.
            </li>
            <li>
              <strong>Find your local property tax rate.</strong> This is a
              percentage (for example, 1.25%).
            </li>
            <li>
              <strong>Multiply the assessed value by the tax rate.</strong>
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
                <td className="px-3 py-2 border">Assessed Value</td>
                <td className="px-3 py-2 border">-</td>
                <td className="px-3 py-2 border">$350,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Tax Rate</td>
                <td className="px-3 py-2 border">-</td>
                <td className="px-3 py-2 border">1.25% (0.0125)</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Annual Property Tax</td>
                <td className="px-3 py-2 border">
                  Assessed Value × (Tax Rate / 100)
                </td>
                <td className="px-3 py-2 border">$350,000 × 0.0125 = $4,375</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mb-6">
          <h3>Step-by-Step Example</h3>
          <ol className="mb-2 list-decimal list-inside">
            <li>Assessed value: $350,000</li>
            <li>Tax rate: 1.25%</li>
            <li>Annual property tax: $350,000 × 0.0125 = $4,375</li>
          </ol>
        </div>
        <div className="mb-6">
          <h3>Tips for Beginners</h3>
          <ul className="list-disc list-inside">
            <li>
              <strong>Check your local rates:</strong> Property tax rates vary
              by city, county, and state.
            </li>
            <li>
              <strong>Budget for increases:</strong> Property taxes can go up if
              your home's value increases or if local governments raise rates.
            </li>
            <li>
              <strong>Escrow accounts:</strong> Many lenders collect property
              taxes monthly with your mortgage payment and pay them for you.
            </li>
            <li>
              <strong>Appeal if needed:</strong> If you think your assessed
              value is too high, you can usually appeal with your local
              assessor.
            </li>
            <li>
              <strong>Ask for exemptions:</strong> Some areas offer tax breaks
              for seniors, veterans, or primary residences.
            </li>
          </ul>
        </div>
      </section>
      <div className="gap-4 grid md:grid-cols-2">
        <div className="mb-2">
          <label className="block mb-1 font-medium">Property Value ($):</label>
          <input
            type="number"
            className="px-2 py-1 border rounded w-full"
            value={propertyValue}
            onChange={(e) => setPropertyValue(e.target.value)}
            placeholder="Enter property value"
            min="0"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1 font-medium">Tax Rate (%):</label>
          <input
            type="number"
            className="px-2 py-1 border rounded w-full"
            value={taxRate}
            onChange={(e) => setTaxRate(e.target.value)}
            placeholder="Enter tax rate"
            min="0"
            step="0.01"
          />
        </div>
      </div>
      <button
        className="bg-blue-600 mt-2 px-4 py-2 rounded text-white"
        onClick={handleCalculate}
      >
        Calculate Property Tax
      </button>
      {annualTax !== null && (
        <div className="flex flex-col gap-4 mt-6">
          <div className="bg-white shadow p-4 border rounded-lg">
            <strong>Estimated Annual Property Tax:</strong>{" "}
            <span className="text-blue-700 text-lg">
              $
              {annualTax.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
