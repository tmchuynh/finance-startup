"use client";
import { useState } from "react";

export default function ClosingCostCalculator() {
  const [homePrice, setHomePrice] = useState<string>("");
  const [closingCostRate, setClosingCostRate] = useState<string>("3");
  const [customCosts, setCustomCosts] = useState<string>("");
  const [result, setResult] = useState<{
    estimatedClosingCosts: number;
    totalClosingCosts: number;
  } | null>(null);

  const handleCalculate = () => {
    const price = parseFloat(homePrice);
    const rate = parseFloat(closingCostRate) / 100;
    const custom = parseFloat(customCosts) || 0;

    if (!isNaN(price) && !isNaN(rate) && price > 0 && rate >= 0) {
      const estimatedClosingCosts = price * rate;
      const totalClosingCosts = estimatedClosingCosts + custom;
      setResult({
        estimatedClosingCosts,
        totalClosingCosts,
      });
    } else {
      setResult(null);
    }
  };

  return (
    <div className="mx-auto mt-8 md:mt-12 w-10/12 md:w-11/12 h-full">
      <h1>Closing Cost Calculator</h1>
      <p className="mb-4">
        <strong>
          Estimate your total closing costs when buying a home, and learn what
          fees to expect, how they are calculated, and tips for saving money.
        </strong>
      </p>
      <section className="mb-8">
        <h2>What Are Closing Costs?</h2>
        <p>
          Closing costs are the fees and expenses you pay when you finalize (or
          "close") on a home purchase. These costs are in addition to your down
          payment and can add up to thousands of dollars.
        </p>
        <div className="mb-6">
          <h3>Common Closing Costs Explained</h3>
          <table className="mb-4 border border-gray-300 min-w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-3 py-2 border text-left">Cost</th>
                <th className="px-3 py-2 border text-left">Description</th>
                <th className="px-3 py-2 border text-left">Typical Range</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-3 py-2 border">Loan Origination Fee</td>
                <td className="px-3 py-2 border">
                  Fee charged by the lender to process your loan.
                </td>
                <td className="px-3 py-2 border">0.5% - 1% of loan amount</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Appraisal Fee</td>
                <td className="px-3 py-2 border">
                  Pays for a professional appraisal of the property.
                </td>
                <td className="px-3 py-2 border">$300 - $700</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Title Insurance</td>
                <td className="px-3 py-2 border">
                  Protects against title issues or disputes.
                </td>
                <td className="px-3 py-2 border">$500 - $1,500</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Attorney Fees</td>
                <td className="px-3 py-2 border">
                  Covers legal review and document preparation.
                </td>
                <td className="px-3 py-2 border">$500 - $1,500</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Recording Fees</td>
                <td className="px-3 py-2 border">
                  Charged by local government to record the sale.
                </td>
                <td className="px-3 py-2 border">$50 - $250</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Home Inspection</td>
                <td className="px-3 py-2 border">
                  Optional but recommended to check property condition.
                </td>
                <td className="px-3 py-2 border">$300 - $600</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Prepaid Taxes & Insurance</td>
                <td className="px-3 py-2 border">
                  Advance payments for property taxes and homeowner's insurance.
                </td>
                <td className="px-3 py-2 border">Varies</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Other Fees</td>
                <td className="px-3 py-2 border">
                  Courier, transfer taxes, HOA fees, etc.
                </td>
                <td className="px-3 py-2 border">Varies</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mb-6">
          <h3>How Are Closing Costs Calculated?</h3>
          <ul className="mb-2 list-decimal list-inside">
            <li>
              <strong>Estimate a percentage of the home price.</strong> Closing
              costs typically range from <strong>2% to 5%</strong> of the
              purchase price.
            </li>
            <li>
              <strong>Add any custom or additional costs.</strong> Some costs
              are fixed or vary by location.
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
                <td className="px-3 py-2 border">Estimate %</td>
                <td className="px-3 py-2 border">
                  Home Price × Closing Cost %
                </td>
                <td className="px-3 py-2 border">$400,000 × 3% = $12,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Add Custom Costs</td>
                <td className="px-3 py-2 border">Estimated + Custom</td>
                <td className="px-3 py-2 border">$12,000 + $1,000 = $13,000</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mb-6">
          <h3>Step-by-Step Example</h3>
          <ol className="mb-2 list-decimal list-inside">
            <li>Home price: $400,000</li>
            <li>Estimated closing cost rate: 3%</li>
            <li>Estimated closing costs: $400,000 × 0.03 = $12,000</li>
            <li>Custom costs (e.g., HOA transfer fee): $1,000</li>
            <li>Total closing costs: $12,000 + $1,000 = $13,000</li>
          </ol>
        </div>
        <div className="mb-6">
          <h3>Tips & Tricks for Saving on Closing Costs</h3>
          <ul className="list-disc list-inside">
            <li>Shop around for lenders and compare their fees.</li>
            <li>
              Ask the seller to contribute to closing costs (seller
              concessions).
            </li>
            <li>
              Review your Loan Estimate and Closing Disclosure carefully for
              unnecessary or duplicate fees.
            </li>
            <li>
              Negotiate with your lender or service providers for lower fees.
            </li>
            <li>
              Consider closing at the end of the month to reduce prepaid
              interest.
            </li>
            <li>
              Check if you qualify for first-time homebuyer or local assistance
              programs.
            </li>
            <li>
              Ask your real estate agent for advice on typical costs in your
              area.
            </li>
          </ul>
        </div>
        <div className="mb-6">
          <h3>Beginner's Guide: What to Expect</h3>
          <ul className="list-disc list-inside">
            <li>
              <strong>Loan Estimate:</strong> Your lender must provide this
              within 3 business days of your application. It lists all expected
              closing costs.
            </li>
            <li>
              <strong>Closing Disclosure:</strong> You’ll get this at least 3
              days before closing. Review it carefully and ask questions.
            </li>
            <li>
              <strong>Bring funds to closing:</strong> You’ll need a cashier’s
              check or wire transfer for your closing costs and down payment.
            </li>
            <li>
              <strong>Keep records:</strong> Save all documents for tax and
              reference purposes.
            </li>
          </ul>
        </div>
      </section>
      <div className="gap-4 grid md:grid-cols-3">
        <div className="mb-2">
          <label className="block mb-1 font-medium">Home Price ($):</label>
          <input
            type="number"
            className="px-2 py-1 border rounded w-full"
            value={homePrice}
            onChange={(e) => setHomePrice(e.target.value)}
            placeholder="Enter home price"
            min="0"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1 font-medium">
            Estimated Closing Cost Rate (%):
          </label>
          <input
            type="number"
            className="px-2 py-1 border rounded w-full"
            value={closingCostRate}
            onChange={(e) => setClosingCostRate(e.target.value)}
            placeholder="Usually 2-5"
            min="0"
            max="100"
            step="0.01"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1 font-medium">
            Custom/Additional Costs ($):
          </label>
          <input
            type="number"
            className="px-2 py-1 border rounded w-full"
            value={customCosts}
            onChange={(e) => setCustomCosts(e.target.value)}
            placeholder="Add any extra costs"
            min="0"
          />
        </div>
      </div>
      <button
        className="bg-blue-600 mt-2 px-4 py-2 rounded text-white"
        onClick={handleCalculate}
      >
        Calculate Closing Costs
      </button>
      {result && (
        <div className="flex flex-col gap-4 mt-6">
          <div className="bg-white shadow p-4 border rounded-lg">
            <h3 className="mb-2 font-semibold">Results</h3>
            <table className="border border-gray-300 min-w-full text-sm">
              <tbody>
                <tr>
                  <td className="px-3 py-2 border font-medium">
                    Estimated Closing Costs
                  </td>
                  <td className="px-3 py-2 border">
                    $
                    {result.estimatedClosingCosts.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2 border font-medium">
                    Total Closing Costs (with custom costs)
                  </td>
                  <td className="px-3 py-2 border">
                    $
                    {result.totalClosingCosts.toLocaleString(undefined, {
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
    </div>
  );
}
