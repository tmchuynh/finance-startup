"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function SavingsWithdrawalCalculator() {
  const [initialSavings, setInitialSavings] = useState<string>("");
  const [monthlyWithdrawal, setMonthlyWithdrawal] = useState<string>("2000");
  const [interestRate, setInterestRate] = useState<string>("3");
  const [years, setYears] = useState<string>("10");

  const [result, setResult] = useState<{
    yearsSupported: number;
    endingBalance: number;
    totalWithdrawn: number;
  } | null>(null);

  // Calculate how many years the savings will last with withdrawals and growth
  function calcYearsSupported(PV: number, PMT: number, r: number) {
    // PV = PMT * [1 - (1 + r/12)^-n*12]/(r/12)  => solve for n
    if (r === 0) return PV / (PMT * 12);
    const monthlyRate = r / 12;
    return (
      Math.log(1 - (PV * monthlyRate) / PMT) /
      Math.log(1 / (1 + monthlyRate)) /
      12
    );
  }

  // Calculate ending balance after n years of withdrawals
  function calcEndingBalance(PV: number, PMT: number, r: number, n: number) {
    // FV = PV*(1+r/12)^(n*12) - PMT*[(1+r/12)^(n*12) - 1]/(r/12)
    if (r === 0) return PV - PMT * n * 12;
    const monthlyRate = r / 12;
    return (
      PV * Math.pow(1 + monthlyRate, n * 12) -
      PMT * ((Math.pow(1 + monthlyRate, n * 12) - 1) / monthlyRate)
    );
  }

  const handleCalculate = () => {
    const PV = parseFloat(initialSavings);
    const PMT = parseFloat(monthlyWithdrawal);
    const n = parseFloat(years);
    const r = parseFloat(interestRate) / 100;

    if (
      !isNaN(PV) &&
      !isNaN(PMT) &&
      !isNaN(n) &&
      !isNaN(r) &&
      PV >= 0 &&
      PMT > 0 &&
      n > 0 &&
      r >= 0
    ) {
      const yearsSupported = calcYearsSupported(PV, PMT, r);
      const endingBalance = calcEndingBalance(PV, PMT, r, n);
      const totalWithdrawn = Math.min(
        PMT * 12 * n,
        PV + endingBalance > 0 ? PV : 0
      );
      setResult({
        yearsSupported,
        endingBalance,
        totalWithdrawn: PMT * 12 * n,
      });
    } else {
      setResult(null);
    }
  };

  return (
    <div className="mt-8 md:mt-12 mx-auto h-full w-10/12 md:w-11/12">
      <h1>Savings Withdrawal Calculator</h1>
      <p className="mb-4">
        <strong>
          Estimate how long your savings will last and your ending balance based
          on monthly withdrawals and interest earned.
        </strong>
      </p>
      <section className="mb-8">
        <h2>How Does This Calculator Work?</h2>
        <p>
          Enter your starting savings, planned monthly withdrawal, interest
          rate, and number of years. The calculator estimates how long your
          savings will last, your ending balance, and total withdrawn.
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
                <td className="px-3 py-2 border">Initial Savings ($)</td>
                <td className="px-3 py-2 border">$50,000 - $500,000</td>
                <td className="px-3 py-2 border">Total in savings account</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Monthly Withdrawal ($)</td>
                <td className="px-3 py-2 border">$1,000 - $4,000</td>
                <td className="px-3 py-2 border">
                  Amount withdrawn each month
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Interest Rate (%)</td>
                <td className="px-3 py-2 border">1% - 5%</td>
                <td className="px-3 py-2 border">High-yield savings: 3-5%</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Years to Withdraw</td>
                <td className="px-3 py-2 border">5 - 20</td>
                <td className="px-3 py-2 border">
                  How long you plan to withdraw
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mb-6">
          <h3>Savings Withdrawal Details</h3>
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
                <td className="px-3 py-2 border">Initial Savings</td>
                <td className="px-3 py-2 border">Amount you have now</td>
                <td className="px-3 py-2 border">$120,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Monthly Withdrawal</td>
                <td className="px-3 py-2 border">
                  Amount withdrawn each month
                </td>
                <td className="px-3 py-2 border">$2,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Interest Rate</td>
                <td className="px-3 py-2 border">Annual yield on savings</td>
                <td className="px-3 py-2 border">3%</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Years to Withdraw</td>
                <td className="px-3 py-2 border">How long you withdraw</td>
                <td className="px-3 py-2 border">10</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Years Supported</td>
                <td className="px-3 py-2 border">How long savings will last</td>
                <td className="px-3 py-2 border">10</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Ending Balance</td>
                <td className="px-3 py-2 border">
                  Amount left after withdrawals
                </td>
                <td className="px-3 py-2 border">$8,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Total Withdrawn</td>
                <td className="px-3 py-2 border">Sum of all withdrawals</td>
                <td className="px-3 py-2 border">$240,000</td>
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
                <td className="px-3 py-2 border">Initial Savings</td>
                <td className="px-3 py-2 border">$120,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Monthly Withdrawal</td>
                <td className="px-3 py-2 border">$2,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Interest Rate</td>
                <td className="px-3 py-2 border">3%</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Years to Withdraw</td>
                <td className="px-3 py-2 border">10</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Years Supported</td>
                <td className="px-3 py-2 border">10</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Ending Balance</td>
                <td className="px-3 py-2 border">$8,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Total Withdrawn</td>
                <td className="px-3 py-2 border">$240,000</td>
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
              Withdrawals above interest earned will eventually deplete your
              savings.
            </li>
            <li>High-yield savings accounts help your money last longer.</li>
            <li>Review your withdrawal plan annually and adjust as needed.</li>
            <li>Consider taxes if withdrawing from retirement accounts.</li>
            <li>
              Consult a financial advisor for personalized withdrawal
              strategies.
            </li>
          </ul>
        </div>
      </section>
      <div className="mb-8">
        <h3 className="mb-2 font-medium">Savings Withdrawal Inputs</h3>
        <div className="gap-4 grid md:grid-cols-3">
          <div className="mb-2">
            <label className="block mb-1 font-medium">
              Initial Savings ($):
            </label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={initialSavings}
              onChange={(e) => setInitialSavings(e.target.value)}
              placeholder="e.g., 120000"
              min="0"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">
              Monthly Withdrawal ($):
            </label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={monthlyWithdrawal}
              onChange={(e) => setMonthlyWithdrawal(e.target.value)}
              placeholder="e.g., 2000"
              min="0"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">Interest Rate (%):</label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              placeholder="e.g., 3"
              min="0"
              max="100"
              step="0.01"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">Years to Withdraw:</label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              placeholder="e.g., 10"
              min="1"
            />
          </div>
        </div>
      </div>
      <Button className="mt-2 px-4 py-2 rounded" onClick={handleCalculate}>
        Calculate Withdrawal Plan
      </Button>
      {result && (
        <div className="flex flex-col gap-4 mt-6">
          <div className="shadow p-4 border rounded-lg">
            <h3 className="mb-2 font-semibold">Results</h3>
            <table className="border border-gray-300 min-w-full text-sm">
              <tbody>
                <tr>
                  <td className="px-3 py-2 border font-medium">
                    Years Supported
                  </td>
                  <td className="px-3 py-2 border">
                    {result.yearsSupported.toLocaleString(undefined, {
                      minimumFractionDigits: 1,
                      maximumFractionDigits: 1,
                    })}
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2 border font-medium">
                    Ending Balance
                  </td>
                  <td className="px-3 py-2 border">
                    $
                    {result.endingBalance.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2 border font-medium">
                    Total Withdrawn
                  </td>
                  <td className="px-3 py-2 border">
                    $
                    {result.totalWithdrawn.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="mt-2 text-sm">
              <strong>Note:</strong> This calculator provides estimates. Actual
              results may vary based on your withdrawal habits and interest
              rates.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
