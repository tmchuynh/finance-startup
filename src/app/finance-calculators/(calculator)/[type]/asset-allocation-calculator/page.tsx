"use client";
import { useState } from "react";

type AssetClass = {
  label: string;
  key: string;
  typical: string;
  description: string;
};

const ASSET_CLASSES: AssetClass[] = [
  {
    label: "Stocks",
    key: "stocks",
    typical: "40% - 80%",
    description: "Equities, mutual funds, ETFs. Higher risk, higher return.",
  },
  {
    label: "Bonds",
    key: "bonds",
    typical: "10% - 50%",
    description:
      "Government, municipal, or corporate bonds. Lower risk, lower return.",
  },
  {
    label: "Cash",
    key: "cash",
    typical: "0% - 20%",
    description: "Savings, money market, CDs. Very low risk, low return.",
  },
  {
    label: "Real Estate",
    key: "realEstate",
    typical: "0% - 20%",
    description:
      "REITs, rental property. Moderate risk, income and appreciation.",
  },
  {
    label: "Other (Commodities, Crypto, etc.)",
    key: "other",
    typical: "0% - 10%",
    description: "Gold, crypto, alternatives. High risk, speculative.",
  },
];

export default function AssetAllocationCalculator() {
  const [age, setAge] = useState<string>("");
  const [riskTolerance, setRiskTolerance] = useState<string>("moderate");
  const [inputs, setInputs] = useState<{ [key: string]: string }>({
    stocks: "",
    bonds: "",
    cash: "",
    realEstate: "",
    other: "",
  });
  const [result, setResult] = useState<{
    allocation: { [key: string]: number };
    total: number;
    recommendation: string;
  } | null>(null);

  const handleInputChange = (key: string, value: string) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  const handleCalculate = () => {
    let total = 0;
    const allocation: { [key: string]: number } = {};
    for (const asset of ASSET_CLASSES) {
      const val = parseFloat(inputs[asset.key]) || 0;
      allocation[asset.key] = val;
      total += val;
    }
    let recommendation = "";
    if (total !== 100) {
      recommendation = "Your allocation should total 100%.";
    } else {
      if (riskTolerance === "conservative") {
        recommendation =
          "You have chosen a conservative allocation. Consider more bonds and cash.";
      } else if (riskTolerance === "moderate") {
        recommendation =
          "You have chosen a moderate allocation. A balanced mix of stocks and bonds is typical.";
      } else {
        recommendation =
          "You have chosen an aggressive allocation. More stocks and alternatives, less bonds/cash.";
      }
    }
    setResult({ allocation, total, recommendation });
  };

  // Example model portfolios
  const MODEL_PORTFOLIOS = [
    {
      name: "Conservative",
      stocks: 30,
      bonds: 50,
      cash: 15,
      realEstate: 5,
      other: 0,
    },
    {
      name: "Moderate",
      stocks: 50,
      bonds: 35,
      cash: 10,
      realEstate: 5,
      other: 0,
    },
    {
      name: "Aggressive",
      stocks: 70,
      bonds: 20,
      cash: 5,
      realEstate: 5,
      other: 0,
    },
  ];

  return (
    <div className="mt-8 md:mt-12 mx-auto h-full w-10/12 md:w-11/12">
      <h1>Asset Allocation Calculator</h1>
      <p className="mb-4">
        <strong>
          Find the right mix of stocks, bonds, cash, and other assets for your
          investment portfolio based on your age and risk tolerance.
        </strong>
      </p>
      <section className="mb-8">
        <h2>How Does This Calculator Work?</h2>
        <p>
          Enter your age and risk tolerance, then enter your desired allocation
          for each asset class. The calculator will help you see if your
          allocation matches your goals and common guidelines.
        </p>
        <div className="mb-6">
          <h3>Typical Input Values</h3>
          <table className="mb-4 border border-gray-300 min-w-full text-sm">
            <thead>
              <tr className="">
                <th className="px-3 py-2 border text-left">Asset Class</th>
                <th className="px-3 py-2 border text-left">
                  Typical Allocation (%)
                </th>
                <th className="px-3 py-2 border text-left">Description</th>
              </tr>
            </thead>
            <tbody>
              {ASSET_CLASSES.map((a) => (
                <tr key={a.key}>
                  <td className="px-3 py-2 border">{a.label}</td>
                  <td className="px-3 py-2 border">{a.typical}</td>
                  <td className="px-3 py-2 border">{a.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mb-6">
          <h3>Model Portfolios (2024)</h3>
          <table className="mb-4 border border-gray-300 min-w-full text-sm">
            <thead>
              <tr className="">
                <th className="px-3 py-2 border text-left">Portfolio</th>
                {ASSET_CLASSES.map((a) => (
                  <th key={a.key} className="px-3 py-2 border text-left">
                    {a.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MODEL_PORTFOLIOS.map((p) => (
                <tr key={p.name}>
                  <td className="px-3 py-2 border">{p.name}</td>
                  {ASSET_CLASSES.map((a) => (
                    <td key={a.key} className="px-3 py-2 border">
                      {(p as any)[a.key]}%
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-sm">
            <strong>Source:</strong> Vanguard, Fidelity, 2024 model portfolios.
          </p>
        </div>
        <div className="mb-6">
          <h3>Key Terms Explained</h3>
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
                <td className="px-3 py-2 border">Stocks</td>
                <td className="px-3 py-2 border">
                  Shares of companies, higher risk and return
                </td>
                <td className="px-3 py-2 border">S&P 500 Index Fund</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Bonds</td>
                <td className="px-3 py-2 border">
                  Loans to governments or companies, lower risk
                </td>
                <td className="px-3 py-2 border">U.S. Treasury Bond</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Cash</td>
                <td className="px-3 py-2 border">Savings, money market, CDs</td>
                <td className="px-3 py-2 border">Savings Account</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Real Estate</td>
                <td className="px-3 py-2 border">Property or REITs</td>
                <td className="px-3 py-2 border">Vanguard Real Estate ETF</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Other</td>
                <td className="px-3 py-2 border">Commodities, crypto, etc.</td>
                <td className="px-3 py-2 border">Gold, Bitcoin</td>
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
                <td className="px-3 py-2 border">Age</td>
                <td className="px-3 py-2 border">35</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Risk Tolerance</td>
                <td className="px-3 py-2 border">Moderate</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Stocks</td>
                <td className="px-3 py-2 border">50%</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Bonds</td>
                <td className="px-3 py-2 border">35%</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Cash</td>
                <td className="px-3 py-2 border">10%</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Real Estate</td>
                <td className="px-3 py-2 border">5%</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Other</td>
                <td className="px-3 py-2 border">0%</td>
              </tr>
            </tbody>
          </table>
          <p className="text-sm">
            <strong>Source:</strong> Vanguard, Fidelity, 2024 model portfolios.
          </p>
        </div>
        <div className="mb-6">
          <h3>Tips for Beginners</h3>
          <ul className="list-disc list-inside">
            <li>
              Asset allocation is the most important factor in long-term
              investment returns.
            </li>
            <li>
              Stocks offer higher growth but more risk; bonds and cash offer
              stability.
            </li>
            <li>
              Rebalance your portfolio annually to maintain your target
              allocation.
            </li>
            <li>
              Consider your age, goals, and risk tolerance when choosing an
              allocation.
            </li>
            <li>Consult a financial advisor for personalized advice.</li>
          </ul>
        </div>
      </section>
      <div className="gap-4 grid md:grid-cols-2">
        <div className="mb-2">
          <label className="block mb-1 font-medium">Your Age:</label>
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
          <label className="block mb-1 font-medium">Risk Tolerance:</label>
          <select
            className="px-2 py-1 border rounded w-full"
            value={riskTolerance}
            onChange={(e) => setRiskTolerance(e.target.value)}
          >
            <option value="conservative">Conservative</option>
            <option value="moderate">Moderate</option>
            <option value="aggressive">Aggressive</option>
          </select>
        </div>
      </div>
      <div className="mb-4">
        <h3 className="mb-2 font-medium">Enter Your Target Allocation (%)</h3>
        <div className="gap-4 grid md:grid-cols-3">
          {ASSET_CLASSES.map((a) => (
            <div key={a.key} className="mb-2">
              <label className="block mb-1 font-medium">{a.label}:</label>
              <input
                type="number"
                className="px-2 py-1 border rounded w-full"
                value={inputs[a.key]}
                onChange={(e) => handleInputChange(a.key, e.target.value)}
                placeholder={a.typical}
                min="0"
                max="100"
                step="0.01"
              />
            </div>
          ))}
        </div>
      </div>
      <button
        className="bg-blue-600 mt-2 px-4 py-2 rounded"
        onClick={handleCalculate}
      >
        Calculate Allocation
      </button>
      {result && (
        <div className="flex flex-col gap-4 mt-6">
          <div className="shadow p-4 border rounded-lg">
            <h3 className="mb-2 font-semibold">Results</h3>
            <table className="mb-2 border border-gray-300 min-w-full text-sm">
              <thead>
                <tr className="">
                  <th className="px-3 py-2 border text-left">Asset Class</th>
                  <th className="px-3 py-2 border text-left">
                    Your Allocation (%)
                  </th>
                </tr>
              </thead>
              <tbody>
                {ASSET_CLASSES.map((a) => (
                  <tr key={a.key}>
                    <td className="px-3 py-2 border">{a.label}</td>
                    <td className="px-3 py-2 border">
                      {result.allocation[a.key] || 0}%
                    </td>
                  </tr>
                ))}
                <tr>
                  <td className="px-3 py-2 border font-medium">Total</td>
                  <td className="px-3 py-2 border font-medium">
                    {result.total}%
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="mt-2 text-sm">
              <strong>Recommendation:</strong> {result.recommendation}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
