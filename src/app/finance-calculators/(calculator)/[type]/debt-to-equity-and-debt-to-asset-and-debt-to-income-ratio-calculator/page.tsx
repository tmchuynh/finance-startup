"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function DebtRatiosCalculator() {
  const [totalDebt, setTotalDebt] = useState<string>("");
  const [totalEquity, setTotalEquity] = useState<string>("");
  const [totalAssets, setTotalAssets] = useState<string>("");
  const [monthlyDebtPayments, setMonthlyDebtPayments] = useState<string>("");
  const [grossMonthlyIncome, setGrossMonthlyIncome] = useState<string>("");

  const [result, setResult] = useState<{
    debtToEquity: number;
    debtToAsset: number;
    debtToIncome: number;
  } | null>(null);

  const handleCalculate = () => {
    const debt = parseFloat(totalDebt);
    const equity = parseFloat(totalEquity);
    const assets = parseFloat(totalAssets);
    const monthlyDebt = parseFloat(monthlyDebtPayments);
    const monthlyIncome = parseFloat(grossMonthlyIncome);

    if (
      !isNaN(debt) &&
      !isNaN(equity) &&
      !isNaN(assets) &&
      !isNaN(monthlyDebt) &&
      !isNaN(monthlyIncome) &&
      equity > 0 &&
      assets > 0 &&
      monthlyIncome > 0
    ) {
      const debtToEquity = debt / equity;
      const debtToAsset = debt / assets;
      const debtToIncome = monthlyDebt / monthlyIncome;
      setResult({
        debtToEquity,
        debtToAsset,
        debtToIncome,
      });
    } else {
      setResult(null);
    }
  };

  return (
    <div className="mt-8 md:mt-12 mx-auto h-full w-10/12 md:w-11/12">
      <h1>Debt-to-Equity, Debt-to-Asset & Debt-to-Income Ratio Calculator</h1>
      <p className="mb-4">
        <strong>
          Calculate your debt-to-equity, debt-to-asset, and debt-to-income
          ratios to assess your financial health and borrowing risk.
        </strong>
      </p>
      <section className="mb-8">
        <h2>How Does This Calculator Work?</h2>
        <p>
          Enter your total debt, equity, assets, monthly debt payments, and
          gross monthly income. The calculator estimates your key debt ratios
          and explains what they mean for your finances.
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
                <td className="px-3 py-2 border">Total Debt ($)</td>
                <td className="px-3 py-2 border">$10,000 - $200,000</td>
                <td className="px-3 py-2 border">
                  All loans, credit cards, mortgages
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Total Equity ($)</td>
                <td className="px-3 py-2 border">$50,000 - $500,000</td>
                <td className="px-3 py-2 border">
                  Net worth or owner's equity
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Total Assets ($)</td>
                <td className="px-3 py-2 border">$100,000 - $1,000,000</td>
                <td className="px-3 py-2 border">
                  Home, car, investments, cash
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Monthly Debt Payments ($)</td>
                <td className="px-3 py-2 border">$500 - $3,000</td>
                <td className="px-3 py-2 border">Loans, credit cards, etc.</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Gross Monthly Income ($)</td>
                <td className="px-3 py-2 border">$3,000 - $12,000</td>
                <td className="px-3 py-2 border">Before taxes</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mb-6">
          <h3>Debt Ratio Details</h3>
          <table className="mb-4 border border-gray-300 min-w-full text-sm">
            <thead>
              <tr className="">
                <th className="px-3 py-2 border text-left">Ratio</th>
                <th className="px-3 py-2 border text-left">Formula</th>
                <th className="px-3 py-2 border text-left">What It Means</th>
                <th className="px-3 py-2 border text-left">Good Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-3 py-2 border">Debt-to-Equity</td>
                <td className="px-3 py-2 border">Total Debt / Total Equity</td>
                <td className="px-3 py-2 border">
                  Measures leverage; higher = more risk
                </td>
                <td className="px-3 py-2 border">&lt; 1.0 (lower is better)</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Debt-to-Asset</td>
                <td className="px-3 py-2 border">Total Debt / Total Assets</td>
                <td className="px-3 py-2 border">
                  Shows % of assets financed by debt
                </td>
                <td className="px-3 py-2 border">&lt; 0.5 (lower is better)</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Debt-to-Income</td>
                <td className="px-3 py-2 border">
                  Monthly Debt Payments / Gross Monthly Income
                </td>
                <td className="px-3 py-2 border">
                  Shows ability to manage payments
                </td>
                <td className="px-3 py-2 border">&lt; 0.36 (36%)</td>
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
                <th className="px-3 py-2 border">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-3 py-2 border">Total Debt</td>
                <td className="px-3 py-2 border">$80,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Total Equity</td>
                <td className="px-3 py-2 border">$200,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Total Assets</td>
                <td className="px-3 py-2 border">$400,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Monthly Debt Payments</td>
                <td className="px-3 py-2 border">$1,500</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Gross Monthly Income</td>
                <td className="px-3 py-2 border">$7,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Debt-to-Equity</td>
                <td className="px-3 py-2 border">0.40</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Debt-to-Asset</td>
                <td className="px-3 py-2 border">0.20</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Debt-to-Income</td>
                <td className="px-3 py-2 border">0.21 (21%)</td>
              </tr>
            </tbody>
          </table>
          <p className="text-sm">
            <strong>Source:</strong> Federal Reserve, Bankrate, 2024 averages.
          </p>
        </div>
        <div className="mb-6">
          <h3>Tips for Beginners</h3>
          <ul className="list-disc list-inside">
            <li>Lower ratios mean less risk and more financial flexibility.</li>
            <li>Lenders use debt-to-income to approve mortgages and loans.</li>
            <li>Track your ratios yearly to monitor your financial health.</li>
            <li>
              Paying down debt or increasing assets/equity improves your ratios.
            </li>
            <li>Consult a financial advisor for personalized advice.</li>
          </ul>
        </div>
      </section>
      <div className="mb-8">
        <h3>Debt Ratio Inputs</h3>
        <div className="gap-4 grid md:grid-cols-3">
          <div className="mb-2">
            <label className="block mb-1 font-medium">Total Debt ($):</label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={totalDebt}
              onChange={(e) => setTotalDebt(e.target.value)}
              placeholder="e.g., 80000"
              min="0"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">Total Equity ($):</label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={totalEquity}
              onChange={(e) => setTotalEquity(e.target.value)}
              placeholder="e.g., 200000"
              min="0"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">Total Assets ($):</label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={totalAssets}
              onChange={(e) => setTotalAssets(e.target.value)}
              placeholder="e.g., 400000"
              min="0"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">
              Monthly Debt Payments ($):
            </label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={monthlyDebtPayments}
              onChange={(e) => setMonthlyDebtPayments(e.target.value)}
              placeholder="e.g., 1500"
              min="0"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">
              Gross Monthly Income ($):
            </label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={grossMonthlyIncome}
              onChange={(e) => setGrossMonthlyIncome(e.target.value)}
              placeholder="e.g., 7000"
              min="0"
            />
          </div>
        </div>
      </div>
      <Button className="mt-2 px-4 py-2 rounded" onClick={handleCalculate}>
        Calculate Debt Ratios
      </Button>
      {result && (
        <div className="flex flex-col gap-4 mt-6">
          <div className="shadow p-4 border rounded-lg">
            <h3>Results</h3>
            <table className="border border-gray-300 min-w-full text-sm">
              <tbody>
                <tr>
                  <td className="px-3 py-2 border font-medium">
                    Debt-to-Equity Ratio
                  </td>
                  <td className="px-3 py-2 border">
                    {result.debtToEquity.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2 border font-medium">
                    Debt-to-Asset Ratio
                  </td>
                  <td className="px-3 py-2 border">
                    {result.debtToAsset.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2 border font-medium">
                    Debt-to-Income Ratio
                  </td>
                  <td className="px-3 py-2 border">
                    {(result.debtToIncome * 100).toLocaleString(undefined, {
                      minimumFractionDigits: 1,
                      maximumFractionDigits: 1,
                    })}
                    %
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="mt-2 text-sm">
              <strong>Note:</strong> This calculator provides estimates. Actual
              results may vary based on your full financial situation.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
