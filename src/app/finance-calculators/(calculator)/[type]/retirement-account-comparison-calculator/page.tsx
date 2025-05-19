"use client";
import { useState } from "react";

type AccountType = "Traditional IRA" | "Roth IRA" | "401(k)";

const ACCOUNT_OPTIONS: { label: AccountType; description: string }[] = [
  {
    label: "Traditional IRA",
    description:
      "Tax-deductible contributions, tax-deferred growth, taxed on withdrawal.",
  },
  {
    label: "Roth IRA",
    description:
      "After-tax contributions, tax-free growth, tax-free withdrawals in retirement.",
  },
  {
    label: "401(k)",
    description:
      "Employer-sponsored, pre-tax contributions, tax-deferred growth, taxed on withdrawal.",
  },
];

export default function RetirementAccountComparisonCalculator() {
  const [account1, setAccount1] = useState<AccountType>("Traditional IRA");
  const [account2, setAccount2] = useState<AccountType>("Roth IRA");
  const [initialBalance, setInitialBalance] = useState<string>("0");
  const [annualContribution, setAnnualContribution] = useState<string>("6000");
  const [years, setYears] = useState<string>("30");
  const [expectedReturn, setExpectedReturn] = useState<string>("6");
  const [currentTaxRate, setCurrentTaxRate] = useState<string>("24");
  const [retirementTaxRate, setRetirementTaxRate] = useState<string>("22");

  const [result, setResult] = useState<{
    account1: { final: number; afterTax: number };
    account2: { final: number; afterTax: number };
  } | null>(null);

  function calcFutureValue(PV: number, PMT: number, r: number, n: number) {
    // FV = PV*(1+r)^n + PMT*(((1+r)^n - 1)/r)
    if (r === 0) return PV + PMT * n;
    return PV * Math.pow(1 + r, n) + PMT * ((Math.pow(1 + r, n) - 1) / r);
  }

  function getAfterTaxValue(
    type: AccountType,
    FV: number,
    currentTax: number,
    retireTax: number
  ) {
    if (type === "Traditional IRA" || type === "401(k)") {
      // All withdrawals taxed at retirement rate
      return FV * (1 - retireTax / 100);
    }
    if (type === "Roth IRA") {
      // Withdrawals are tax-free
      return FV;
    }
    return FV;
  }

  const handleCalculate = () => {
    const PV = parseFloat(initialBalance);
    const PMT = parseFloat(annualContribution);
    const n = parseFloat(years);
    const r = parseFloat(expectedReturn) / 100;
    const currentTax = parseFloat(currentTaxRate);
    const retireTax = parseFloat(retirementTaxRate);

    if (
      !isNaN(PV) &&
      !isNaN(PMT) &&
      !isNaN(n) &&
      !isNaN(r) &&
      !isNaN(currentTax) &&
      !isNaN(retireTax) &&
      n > 0 &&
      r >= 0
    ) {
      // For Traditional IRA/401k: contributions are pre-tax, taxed at withdrawal
      // For Roth IRA: contributions are after-tax, withdrawals are tax-free
      // For simplicity, assume all contributions made at year-end

      // Traditional/401k: FV of all contributions
      const FV1 = calcFutureValue(PV, PMT, r, n);
      const afterTax1 = getAfterTaxValue(account1, FV1, currentTax, retireTax);

      // Roth: contributions are after-tax, so reduce PMT by current tax rate
      let rothPMT = PMT;
      let rothPV = PV;
      if (account2 === "Roth IRA") {
        rothPMT = PMT * (1 - currentTax / 100);
        rothPV = PV * (1 - currentTax / 100);
      }
      const FV2 = calcFutureValue(rothPV, rothPMT, r, n);
      const afterTax2 = getAfterTaxValue(account2, FV2, currentTax, retireTax);

      setResult({
        account1: { final: FV1, afterTax: afterTax1 },
        account2: { final: FV2, afterTax: afterTax2 },
      });
    } else {
      setResult(null);
    }
  };

  return (
    <div className="mx-auto mt-8 md:mt-12 w-10/12 md:w-11/12 h-full">
      <h1>Retirement Account Comparison Calculator</h1>
      <p className="mb-4">
        <strong>
          Compare the future value and after-tax value of different retirement
          accounts (Traditional IRA, Roth IRA, 401(k)) to see which may be best
          for you.
        </strong>
      </p>
      <section className="mb-8">
        <h2>How Does This Calculator Work?</h2>
        <p>
          Enter your expected annual contributions, years to retirement,
          investment return, and tax rates. The calculator estimates the future
          value and after-tax value of each account type.
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
                <td className="px-3 py-2 border">Account Type</td>
                <td className="px-3 py-2 border">
                  Traditional IRA, Roth IRA, 401(k)
                </td>
                <td className="px-3 py-2 border">
                  See table below for details
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Initial Balance ($)</td>
                <td className="px-3 py-2 border">$0 - $100,000</td>
                <td className="px-3 py-2 border">Current savings in account</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Annual Contribution ($)</td>
                <td className="px-3 py-2 border">$6,000 - $23,000</td>
                <td className="px-3 py-2 border">
                  2024 IRA: $7,000, 401(k): $23,000
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Years to Retirement</td>
                <td className="px-3 py-2 border">10 - 40</td>
                <td className="px-3 py-2 border">How long until you retire</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Expected Return (%)</td>
                <td className="px-3 py-2 border">5% - 7%</td>
                <td className="px-3 py-2 border">
                  Long-term stock market average: ~6%
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Current Tax Rate (%)</td>
                <td className="px-3 py-2 border">22% - 32%</td>
                <td className="px-3 py-2 border">Your marginal tax rate now</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Retirement Tax Rate (%)</td>
                <td className="px-3 py-2 border">12% - 24%</td>
                <td className="px-3 py-2 border">
                  Expected tax rate in retirement
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mb-6">
          <h3>Retirement Account Details</h3>
          <table className="mb-4 border border-gray-300 min-w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-3 py-2 border text-left">Account Type</th>
                <th className="px-3 py-2 border text-left">Tax Treatment</th>
                <th className="px-3 py-2 border text-left">
                  2024 Contribution Limit
                </th>
                <th className="px-3 py-2 border text-left">Withdrawal Rules</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-3 py-2 border">Traditional IRA</td>
                <td className="px-3 py-2 border">
                  Pre-tax, taxed at withdrawal
                </td>
                <td className="px-3 py-2 border">$7,000 ($8,000 age 50+)</td>
                <td className="px-3 py-2 border">59½+, RMDs at 73</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Roth IRA</td>
                <td className="px-3 py-2 border">
                  After-tax, tax-free withdrawals
                </td>
                <td className="px-3 py-2 border">$7,000 ($8,000 age 50+)</td>
                <td className="px-3 py-2 border">59½+, no RMDs</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">401(k)</td>
                <td className="px-3 py-2 border">
                  Pre-tax, taxed at withdrawal
                </td>
                <td className="px-3 py-2 border">$23,000 ($30,500 age 50+)</td>
                <td className="px-3 py-2 border">59½+, RMDs at 73</td>
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
                <th className="px-3 py-2 border text-left">Traditional IRA</th>
                <th className="px-3 py-2 border text-left">Roth IRA</th>
                <th className="px-3 py-2 border text-left">401(k)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-3 py-2 border">Initial Balance</td>
                <td className="px-3 py-2 border">$10,000</td>
                <td className="px-3 py-2 border">$10,000</td>
                <td className="px-3 py-2 border">$10,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Annual Contribution</td>
                <td className="px-3 py-2 border">$7,000</td>
                <td className="px-3 py-2 border">$7,000 (after-tax)</td>
                <td className="px-3 py-2 border">$23,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Years to Retirement</td>
                <td className="px-3 py-2 border">30</td>
                <td className="px-3 py-2 border">30</td>
                <td className="px-3 py-2 border">30</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Expected Return</td>
                <td className="px-3 py-2 border">6%</td>
                <td className="px-3 py-2 border">6%</td>
                <td className="px-3 py-2 border">6%</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Current Tax Rate</td>
                <td className="px-3 py-2 border">24%</td>
                <td className="px-3 py-2 border">24%</td>
                <td className="px-3 py-2 border">24%</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Retirement Tax Rate</td>
                <td className="px-3 py-2 border">22%</td>
                <td className="px-3 py-2 border">22%</td>
                <td className="px-3 py-2 border">22%</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Final Value</td>
                <td className="px-3 py-2 border">$617,000</td>
                <td className="px-3 py-2 border">$469,000</td>
                <td className="px-3 py-2 border">$2,028,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">After-Tax Value</td>
                <td className="px-3 py-2 border">$481,000</td>
                <td className="px-3 py-2 border">$469,000</td>
                <td className="px-3 py-2 border">$1,582,000</td>
              </tr>
            </tbody>
          </table>
          <p className="text-gray-600 text-sm">
            <strong>Source:</strong> IRS, Fidelity, 2024 limits and averages.
          </p>
        </div>
        <div className="mb-6">
          <h3>Tips for Beginners</h3>
          <ul className="list-disc list-inside">
            <li>
              Roth IRAs are best if you expect to be in a higher tax bracket in
              retirement.
            </li>
            <li>
              Traditional IRAs/401(k)s are best if you want to reduce taxes now.
            </li>
            <li>Maximize employer match in your 401(k) if available.</li>
            <li>Contribution limits may change each year—check IRS rules.</li>
            <li>
              Consult a financial advisor for personalized retirement planning.
            </li>
          </ul>
        </div>
      </section>
      <div className="gap-4 grid md:grid-cols-2">
        <div className="mb-2">
          <label className="block mb-1 font-medium">Account 1:</label>
          <select
            className="px-2 py-1 border rounded w-full"
            value={account1}
            onChange={(e) => setAccount1(e.target.value as AccountType)}
          >
            {ACCOUNT_OPTIONS.map((a) => (
              <option key={a.label} value={a.label}>
                {a.label}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-2">
          <label className="block mb-1 font-medium">Account 2:</label>
          <select
            className="px-2 py-1 border rounded w-full"
            value={account2}
            onChange={(e) => setAccount2(e.target.value as AccountType)}
          >
            {ACCOUNT_OPTIONS.map((a) => (
              <option key={a.label} value={a.label}>
                {a.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="gap-4 grid md:grid-cols-3">
        <div className="mb-2">
          <label className="block mb-1 font-medium">Initial Balance ($):</label>
          <input
            type="number"
            className="px-2 py-1 border rounded w-full"
            value={initialBalance}
            onChange={(e) => setInitialBalance(e.target.value)}
            placeholder="e.g., 10000"
            min="0"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1 font-medium">
            Annual Contribution ($):
          </label>
          <input
            type="number"
            className="px-2 py-1 border rounded w-full"
            value={annualContribution}
            onChange={(e) => setAnnualContribution(e.target.value)}
            placeholder="e.g., 7000"
            min="0"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1 font-medium">Years to Retirement:</label>
          <input
            type="number"
            className="px-2 py-1 border rounded w-full"
            value={years}
            onChange={(e) => setYears(e.target.value)}
            placeholder="e.g., 30"
            min="1"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1 font-medium">Expected Return (%):</label>
          <input
            type="number"
            className="px-2 py-1 border rounded w-full"
            value={expectedReturn}
            onChange={(e) => setExpectedReturn(e.target.value)}
            placeholder="e.g., 6"
            min="0"
            max="100"
            step="0.01"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1 font-medium">
            Current Tax Rate (%):
          </label>
          <input
            type="number"
            className="px-2 py-1 border rounded w-full"
            value={currentTaxRate}
            onChange={(e) => setCurrentTaxRate(e.target.value)}
            placeholder="e.g., 24"
            min="0"
            max="100"
            step="0.01"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1 font-medium">
            Retirement Tax Rate (%):
          </label>
          <input
            type="number"
            className="px-2 py-1 border rounded w-full"
            value={retirementTaxRate}
            onChange={(e) => setRetirementTaxRate(e.target.value)}
            placeholder="e.g., 22"
            min="0"
            max="100"
            step="0.01"
          />
        </div>
      </div>
      <button
        className="bg-blue-600 mt-2 px-4 py-2 rounded text-white"
        onClick={handleCalculate}
      >
        Compare Accounts
      </button>
      {result && (
        <div className="flex flex-col gap-4 mt-6">
          <div className="bg-white shadow p-4 border rounded-lg">
            <h3 className="mb-2 font-semibold">Comparison Results</h3>
            <table className="border border-gray-300 min-w-full text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-3 py-2 border text-left">Account</th>
                  <th className="px-3 py-2 border text-left">Final Value</th>
                  <th className="px-3 py-2 border text-left">
                    After-Tax Value
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-3 py-2 border">{account1}</td>
                  <td className="px-3 py-2 border">
                    $
                    {result.account1.final.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                  <td className="px-3 py-2 border">
                    $
                    {result.account1.afterTax.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2 border">{account2}</td>
                  <td className="px-3 py-2 border">
                    $
                    {result.account2.final.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                  <td className="px-3 py-2 border">
                    $
                    {result.account2.afterTax.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="mt-2 text-gray-600 text-sm">
              <strong>Note:</strong> This calculator does not include employer
              match, early withdrawal penalties, or required minimum
              distributions. Actual results may vary.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
