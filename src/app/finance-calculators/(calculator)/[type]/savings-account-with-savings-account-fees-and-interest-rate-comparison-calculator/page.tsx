"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function SavingsAccountWithFeesAndInterestRateComparisonCalculator() {
  const [initialBalance, setInitialBalance] = useState<string>("");
  const [monthlyDeposit, setMonthlyDeposit] = useState<string>("");
  const [years, setYears] = useState<string>("5");
  const [interestRate1, setInterestRate1] = useState<string>("0.5");
  const [fee1, setFee1] = useState<string>("5");
  const [interestRate2, setInterestRate2] = useState<string>("4.0");
  const [fee2, setFee2] = useState<string>("0");

  const [result, setResult] = useState<{
    finalBalance1: number;
    totalFees1: number;
    interestEarned1: number;
    finalBalance2: number;
    totalFees2: number;
    interestEarned2: number;
    difference: number;
  } | null>(null);

  function calcFutureValueWithFees(
    PV: number,
    PMT: number,
    r: number,
    n: number,
    monthlyFee: number
  ) {
    // Calculate FV with monthly compounding, subtracting monthly fee
    let balance = PV;
    let totalFees = 0;
    let totalInterest = 0;
    for (let i = 0; i < n * 12; i++) {
      balance += PMT;
      const interest = balance * (r / 12);
      balance += interest;
      totalInterest += interest;
      balance -= monthlyFee;
      totalFees += monthlyFee;
      if (balance < 0) balance = 0;
    }
    return { balance, totalFees, totalInterest };
  }

  const handleCalculate = () => {
    const PV = parseFloat(initialBalance);
    const PMT = parseFloat(monthlyDeposit);
    const n = parseFloat(years);
    const r1 = parseFloat(interestRate1) / 100;
    const fee1Val = parseFloat(fee1);
    const r2 = parseFloat(interestRate2) / 100;
    const fee2Val = parseFloat(fee2);

    if (
      !isNaN(PV) &&
      !isNaN(PMT) &&
      !isNaN(n) &&
      !isNaN(r1) &&
      !isNaN(fee1Val) &&
      !isNaN(r2) &&
      !isNaN(fee2Val) &&
      PV >= 0 &&
      PMT >= 0 &&
      n > 0 &&
      r1 >= 0 &&
      r2 >= 0 &&
      fee1Val >= 0 &&
      fee2Val >= 0
    ) {
      const res1 = calcFutureValueWithFees(PV, PMT, r1, n, fee1Val);
      const res2 = calcFutureValueWithFees(PV, PMT, r2, n, fee2Val);
      setResult({
        finalBalance1: res1.balance,
        totalFees1: res1.totalFees,
        interestEarned1: res1.totalInterest,
        finalBalance2: res2.balance,
        totalFees2: res2.totalFees,
        interestEarned2: res2.totalInterest,
        difference: res2.balance - res1.balance,
      });
    } else {
      setResult(null);
    }
  };

  return (
    <div className="mt-8 md:mt-12 mx-auto h-full w-10/12 md:w-11/12">
      <h1>Savings Account Fees & Interest Rate Comparison Calculator</h1>
      <p className="mb-4">
        <strong>
          Compare how fees and interest rates affect your savings account growth
          over time.
        </strong>
      </p>
      <section className="mb-8">
        <h2>How Does This Calculator Work?</h2>
        <p>
          Enter your starting balance, monthly deposit, years to save, and the
          interest rate and monthly fee for two different savings accounts. The
          calculator estimates your ending balance, total fees paid, and
          interest earned for each account.
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
                <td className="px-3 py-2 border">Initial Balance ($)</td>
                <td className="px-3 py-2 border">$500 - $10,000</td>
                <td className="px-3 py-2 border">Starting amount in account</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Monthly Deposit ($)</td>
                <td className="px-3 py-2 border">$50 - $500</td>
                <td className="px-3 py-2 border">Amount added each month</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Years to Save</td>
                <td className="px-3 py-2 border">1 - 10</td>
                <td className="px-3 py-2 border">How long you plan to save</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">
                  Interest Rate (Account 1) (%)
                </td>
                <td className="px-3 py-2 border">0.01% - 1.0%</td>
                <td className="px-3 py-2 border">
                  Traditional bank average: 0.5%
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">
                  Monthly Fee (Account 1) ($)
                </td>
                <td className="px-3 py-2 border">$0 - $10</td>
                <td className="px-3 py-2 border">Many banks charge $5/month</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">
                  Interest Rate (Account 2) (%)
                </td>
                <td className="px-3 py-2 border">2.0% - 5.0%</td>
                <td className="px-3 py-2 border">
                  High-yield savings: 4.0% (2024)
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">
                  Monthly Fee (Account 2) ($)
                </td>
                <td className="px-3 py-2 border">$0</td>
                <td className="px-3 py-2 border">
                  Most online banks charge $0
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mb-6">
          <h3>Account Comparison Details</h3>
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
                <td className="px-3 py-2 border">Interest Rate</td>
                <td className="px-3 py-2 border">Annual yield paid by bank</td>
                <td className="px-3 py-2 border">0.5% vs 4.0%</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Monthly Fee</td>
                <td className="px-3 py-2 border">Fee charged each month</td>
                <td className="px-3 py-2 border">$5 vs $0</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Total Fees Paid</td>
                <td className="px-3 py-2 border">Sum of all monthly fees</td>
                <td className="px-3 py-2 border">$300</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Interest Earned</td>
                <td className="px-3 py-2 border">Total interest over period</td>
                <td className="px-3 py-2 border">$1,200</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Final Balance</td>
                <td className="px-3 py-2 border">
                  Ending savings after fees/interest
                </td>
                <td className="px-3 py-2 border">$7,500</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Difference</td>
                <td className="px-3 py-2 border">
                  Account 2 balance minus Account 1
                </td>
                <td className="px-3 py-2 border">$1,800</td>
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
                <th className="px-3 py-2 border text-left">Traditional Bank</th>
                <th className="px-3 py-2 border text-left">
                  High-Yield Savings
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-3 py-2 border">Initial Balance</td>
                <td className="px-3 py-2 border">$2,000</td>
                <td className="px-3 py-2 border">$2,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Monthly Deposit</td>
                <td className="px-3 py-2 border">$200</td>
                <td className="px-3 py-2 border">$200</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Years</td>
                <td className="px-3 py-2 border">5</td>
                <td className="px-3 py-2 border">5</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Interest Rate</td>
                <td className="px-3 py-2 border">0.5%</td>
                <td className="px-3 py-2 border">4.0%</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Monthly Fee</td>
                <td className="px-3 py-2 border">$5</td>
                <td className="px-3 py-2 border">$0</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Final Balance</td>
                <td className="px-3 py-2 border">$13,200</td>
                <td className="px-3 py-2 border">$15,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Total Fees Paid</td>
                <td className="px-3 py-2 border">$300</td>
                <td className="px-3 py-2 border">$0</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Interest Earned</td>
                <td className="px-3 py-2 border">$200</td>
                <td className="px-3 py-2 border">$2,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Difference</td>
                <td className="px-3 py-2 border" colSpan={2}>
                  $1,800
                </td>
              </tr>
            </tbody>
          </table>
          <p className="text-sm">
            <strong>Source:</strong> Bankrate, NerdWallet, 2024 averages.
          </p>
        </div>
        <div className="mb-6">
          <h3>Tips for Beginners</h3>
          <ul className="list-disc list-inside">
            <li>
              High-yield savings accounts offer much better returns than
              traditional banks.
            </li>
            <li>Monthly fees can eat away at your savings over time.</li>
            <li>
              Always compare both interest rates and fees before opening an
              account.
            </li>
            <li>Online banks often have no monthly fees and higher rates.</li>
            <li>Review your account terms annually and switch if needed.</li>
          </ul>
        </div>
      </section>
      <div className="mb-8">
        <h3 className="mb-2 font-medium">Savings Account Inputs</h3>
        <div className="gap-4 grid md:grid-cols-2">
          <div className="mb-2">
            <label className="block mb-1 font-medium">
              Initial Balance ($):
            </label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={initialBalance}
              onChange={(e) => setInitialBalance(e.target.value)}
              placeholder="e.g., 2000"
              min="0"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">
              Monthly Deposit ($):
            </label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={monthlyDeposit}
              onChange={(e) => setMonthlyDeposit(e.target.value)}
              placeholder="e.g., 200"
              min="0"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">Years to Save:</label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              placeholder="e.g., 5"
              min="1"
            />
          </div>
        </div>
        <div className="gap-4 grid md:grid-cols-2 mt-2">
          <div className="mb-2">
            <label className="block mb-1 font-medium">
              Interest Rate (Account 1) (%):
            </label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={interestRate1}
              onChange={(e) => setInterestRate1(e.target.value)}
              placeholder="e.g., 0.5"
              min="0"
              max="10"
              step="0.01"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">
              Monthly Fee (Account 1) ($):
            </label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={fee1}
              onChange={(e) => setFee1(e.target.value)}
              placeholder="e.g., 5"
              min="0"
              max="50"
              step="0.01"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">
              Interest Rate (Account 2) (%):
            </label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={interestRate2}
              onChange={(e) => setInterestRate2(e.target.value)}
              placeholder="e.g., 4.0"
              min="0"
              max="10"
              step="0.01"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">
              Monthly Fee (Account 2) ($):
            </label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={fee2}
              onChange={(e) => setFee2(e.target.value)}
              placeholder="e.g., 0"
              min="0"
              max="50"
              step="0.01"
            />
          </div>
        </div>
      </div>
      <Button className="mt-2 px-4 py-2 rounded" onClick={handleCalculate}>
        Compare Accounts
      </Button>
      {result && (
        <div className="flex flex-col gap-4 mt-6">
          <div className="shadow p-4 border rounded-lg">
            <h3 className="mb-2 font-semibold">Results</h3>
            <table className="border border-gray-300 min-w-full text-sm">
              <thead>
                <tr className="">
                  <th className="px-3 py-2 border text-left">Account 1</th>
                  <th className="px-3 py-2 border text-left">Account 2</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-3 py-2 border font-medium">
                    Final Balance
                  </td>
                  <td className="px-3 py-2 border">
                    $
                    {result.finalBalance1.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                  <td className="px-3 py-2 border">
                    $
                    {result.finalBalance2.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2 border font-medium">
                    Total Fees Paid
                  </td>
                  <td className="px-3 py-2 border">
                    $
                    {result.totalFees1.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                  <td className="px-3 py-2 border">
                    $
                    {result.totalFees2.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2 border font-medium">
                    Interest Earned
                  </td>
                  <td className="px-3 py-2 border">
                    $
                    {result.interestEarned1.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                  <td className="px-3 py-2 border">
                    $
                    {result.interestEarned2.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2 border font-medium">Difference</td>
                  <td className="px-3 py-2 border" colSpan={2}>
                    $
                    {result.difference.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="mt-2 text-sm">
              <strong>Note:</strong> This calculator provides estimates. Actual
              results may vary based on your account terms and interest rates.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
