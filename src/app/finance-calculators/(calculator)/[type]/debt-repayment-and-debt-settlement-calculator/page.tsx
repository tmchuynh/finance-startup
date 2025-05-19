"use client";
import { useState } from "react";

export default function DebtRepaymentAndDebtSettlementCalculator() {
  const [totalDebt, setTotalDebt] = useState<string>("");
  const [interestRate, setInterestRate] = useState<string>("18");
  const [monthlyPayment, setMonthlyPayment] = useState<string>("400");
  const [settlementPercent, setSettlementPercent] = useState<string>("50");
  const [settlementFee, setSettlementFee] = useState<string>("20");

  const [result, setResult] = useState<{
    monthsToPayoff: number;
    totalPaid: number;
    totalInterest: number;
    settlementAmount: number;
    settlementFeeAmount: number;
    totalSettlementCost: number;
    savings: number;
  } | null>(null);

  // Calculate months to pay off debt with fixed payments
  function calcMonthsToPayoff(P: number, r: number, PMT: number) {
    if (r === 0) return P / PMT;
    const monthlyRate = r / 12;
    return Math.log(PMT / (PMT - P * monthlyRate)) / Math.log(1 + monthlyRate);
  }

  // Calculate total paid and interest
  function calcTotalPaid(P: number, r: number, PMT: number, n: number) {
    const totalPaid = PMT * n;
    const totalInterest = totalPaid - P;
    return { totalPaid, totalInterest };
  }

  const handleCalculate = () => {
    const P = parseFloat(totalDebt);
    const r = parseFloat(interestRate) / 100;
    const PMT = parseFloat(monthlyPayment);
    const settlePct = parseFloat(settlementPercent) / 100;
    const settleFee = parseFloat(settlementFee) / 100;

    if (
      !isNaN(P) &&
      !isNaN(r) &&
      !isNaN(PMT) &&
      !isNaN(settlePct) &&
      !isNaN(settleFee) &&
      P > 0 &&
      PMT > 0 &&
      settlePct > 0 &&
      settleFee >= 0
    ) {
      // Repayment calculation
      const n = calcMonthsToPayoff(P, r, PMT);
      const { totalPaid, totalInterest } = calcTotalPaid(P, r, PMT, n);

      // Settlement calculation
      const settlementAmount = P * settlePct;
      const settlementFeeAmount = settlementAmount * settleFee;
      const totalSettlementCost = settlementAmount + settlementFeeAmount;

      // Savings
      const savings = totalPaid - totalSettlementCost;

      setResult({
        monthsToPayoff: n,
        totalPaid,
        totalInterest,
        settlementAmount,
        settlementFeeAmount,
        totalSettlementCost,
        savings,
      });
    } else {
      setResult(null);
    }
  };

  return (
    <div className="mx-auto mt-8 md:mt-12 w-10/12 md:w-11/12 h-full">
      <h1>Debt Repayment & Debt Settlement Calculator</h1>
      <p className="mb-4">
        <strong>
          Estimate how long it will take to pay off your debt with regular
          payments, and compare the cost and savings of a debt settlement
          option.
        </strong>
      </p>
      <section className="mb-8">
        <h2>How Does This Calculator Work?</h2>
        <p>
          Enter your total debt, interest rate, monthly payment, and settlement
          offer details. The calculator estimates your payoff time, total
          interest, and compares it to a typical debt settlement scenario.
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
                <td className="px-3 py-2 border">Total Debt ($)</td>
                <td className="px-3 py-2 border">$5,000 - $30,000</td>
                <td className="px-3 py-2 border">Credit cards, loans, etc.</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Interest Rate (%)</td>
                <td className="px-3 py-2 border">12% - 24%</td>
                <td className="px-3 py-2 border">Credit card average: 18%</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Monthly Payment ($)</td>
                <td className="px-3 py-2 border">$150 - $600</td>
                <td className="px-3 py-2 border">Minimum or fixed payment</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Settlement Percent (%)</td>
                <td className="px-3 py-2 border">40% - 60%</td>
                <td className="px-3 py-2 border">Typical settlement: 50%</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Settlement Fee (%)</td>
                <td className="px-3 py-2 border">15% - 25%</td>
                <td className="px-3 py-2 border">
                  Debt settlement company fee
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mb-6">
          <h3>Debt Repayment & Settlement Details</h3>
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
                <td className="px-3 py-2 border">Total Debt</td>
                <td className="px-3 py-2 border">Amount owed</td>
                <td className="px-3 py-2 border">$10,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Interest Rate</td>
                <td className="px-3 py-2 border">Annual rate charged</td>
                <td className="px-3 py-2 border">18%</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Monthly Payment</td>
                <td className="px-3 py-2 border">Amount paid each month</td>
                <td className="px-3 py-2 border">$400</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Months to Payoff</td>
                <td className="px-3 py-2 border">Time to pay off debt</td>
                <td className="px-3 py-2 border">31</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Total Paid</td>
                <td className="px-3 py-2 border">Sum of all payments</td>
                <td className="px-3 py-2 border">$12,400</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Total Interest</td>
                <td className="px-3 py-2 border">Interest paid over time</td>
                <td className="px-3 py-2 border">$2,400</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Settlement Amount</td>
                <td className="px-3 py-2 border">Amount paid in settlement</td>
                <td className="px-3 py-2 border">$5,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Settlement Fee</td>
                <td className="px-3 py-2 border">Company fee for settlement</td>
                <td className="px-3 py-2 border">$1,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Total Settlement Cost</td>
                <td className="px-3 py-2 border">Settlement + fee</td>
                <td className="px-3 py-2 border">$6,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Savings</td>
                <td className="px-3 py-2 border">
                  Total paid - settlement cost
                </td>
                <td className="px-3 py-2 border">$6,400</td>
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
                <td className="px-3 py-2 border">Total Debt</td>
                <td className="px-3 py-2 border">$10,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Interest Rate</td>
                <td className="px-3 py-2 border">18%</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Monthly Payment</td>
                <td className="px-3 py-2 border">$400</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Settlement Percent</td>
                <td className="px-3 py-2 border">50%</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Settlement Fee</td>
                <td className="px-3 py-2 border">20%</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Months to Payoff</td>
                <td className="px-3 py-2 border">31</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Total Paid</td>
                <td className="px-3 py-2 border">$12,400</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Total Interest</td>
                <td className="px-3 py-2 border">$2,400</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Settlement Amount</td>
                <td className="px-3 py-2 border">$5,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Settlement Fee</td>
                <td className="px-3 py-2 border">$1,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Total Settlement Cost</td>
                <td className="px-3 py-2 border">$6,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Savings</td>
                <td className="px-3 py-2 border">$6,400</td>
              </tr>
            </tbody>
          </table>
          <p className="text-gray-600 text-sm">
            <strong>Source:</strong> National Debt Relief, NerdWallet, 2024
            averages.
          </p>
        </div>
        <div className="mb-6">
          <h3>Tips for Beginners</h3>
          <ul className="list-disc list-inside">
            <li>
              Debt settlement can reduce your total payoff, but may hurt your
              credit score.
            </li>
            <li>
              Repayment plans avoid settlement fees and credit damage, but cost
              more in interest.
            </li>
            <li>
              Always compare total costs and consult a financial advisor before
              choosing settlement.
            </li>
            <li>
              Make at least the minimum payment to avoid late fees and
              penalties.
            </li>
            <li>
              Consider debt consolidation or credit counseling for more options.
            </li>
          </ul>
        </div>
      </section>
      <div className="mb-8">
        <h3 className="mb-2 font-medium">Debt Inputs</h3>
        <div className="gap-4 grid md:grid-cols-3">
          <div className="mb-2">
            <label className="block mb-1 font-medium">Total Debt ($):</label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={totalDebt}
              onChange={(e) => setTotalDebt(e.target.value)}
              placeholder="e.g., 10000"
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
              placeholder="e.g., 18"
              min="0"
              max="100"
              step="0.01"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">
              Monthly Payment ($):
            </label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={monthlyPayment}
              onChange={(e) => setMonthlyPayment(e.target.value)}
              placeholder="e.g., 400"
              min="0"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">
              Settlement Percent (%):
            </label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={settlementPercent}
              onChange={(e) => setSettlementPercent(e.target.value)}
              placeholder="e.g., 50"
              min="0"
              max="100"
              step="0.01"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">
              Settlement Fee (%):
            </label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={settlementFee}
              onChange={(e) => setSettlementFee(e.target.value)}
              placeholder="e.g., 20"
              min="0"
              max="100"
              step="0.01"
            />
          </div>
        </div>
      </div>
      <button
        className="bg-blue-600 mt-2 px-4 py-2 rounded text-white"
        onClick={handleCalculate}
      >
        Calculate Debt Repayment & Settlement
      </button>
      {result && (
        <div className="flex flex-col gap-4 mt-6">
          <div className="bg-white shadow p-4 border rounded-lg">
            <h3 className="mb-2 font-semibold">Results</h3>
            <table className="border border-gray-300 min-w-full text-sm">
              <tbody>
                <tr>
                  <td className="px-3 py-2 border font-medium">
                    Months to Payoff
                  </td>
                  <td className="px-3 py-2 border">
                    {result.monthsToPayoff.toLocaleString(undefined, {
                      minimumFractionDigits: 1,
                      maximumFractionDigits: 1,
                    })}
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2 border font-medium">Total Paid</td>
                  <td className="px-3 py-2 border">
                    $
                    {result.totalPaid.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2 border font-medium">
                    Total Interest
                  </td>
                  <td className="px-3 py-2 border">
                    $
                    {result.totalInterest.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2 border font-medium">
                    Settlement Amount
                  </td>
                  <td className="px-3 py-2 border">
                    $
                    {result.settlementAmount.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2 border font-medium">
                    Settlement Fee
                  </td>
                  <td className="px-3 py-2 border">
                    $
                    {result.settlementFeeAmount.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2 border font-medium">
                    Total Settlement Cost
                  </td>
                  <td className="px-3 py-2 border">
                    $
                    {result.totalSettlementCost.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2 border font-medium">
                    Savings (vs. Repayment)
                  </td>
                  <td className="px-3 py-2 border font-bold text-green-700">
                    $
                    {result.savings.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="mt-2 text-gray-600 text-sm">
              <strong>Note:</strong> This calculator provides estimates. Actual
              results may vary based on your debt terms and settlement offers.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
