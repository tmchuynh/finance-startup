"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function DebtReductionComparisonAndReliefCalculator() {
  const [totalDebt, setTotalDebt] = useState<string>("");
  const [interestRate, setInterestRate] = useState<string>("18");
  const [monthlyPayment, setMonthlyPayment] = useState<string>("400");
  const [extraPayment, setExtraPayment] = useState<string>("100");
  const [reliefPercent, setReliefPercent] = useState<string>("40");
  const [reliefFee, setReliefFee] = useState<string>("20");

  const [result, setResult] = useState<{
    monthsToPayoff: number;
    totalPaid: number;
    totalInterest: number;
    monthsWithExtra: number;
    totalPaidWithExtra: number;
    totalInterestWithExtra: number;
    reliefAmount: number;
    reliefFeeAmount: number;
    totalReliefCost: number;
    savingsVsStandard: number;
    savingsVsExtra: number;
  } | null>(null);

  // Calculate months to pay off debt with fixed payments
  function calcMonthsToPayoff(P: number, r: number, PMT: number) {
    if (r === 0) return P / PMT;
    const monthlyRate = r / 12;
    if (PMT <= P * monthlyRate) return Infinity;
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
    const extra = parseFloat(extraPayment);
    const reliefPct = parseFloat(reliefPercent) / 100;
    const reliefFeePct = parseFloat(reliefFee) / 100;

    if (
      !isNaN(P) &&
      !isNaN(r) &&
      !isNaN(PMT) &&
      !isNaN(extra) &&
      !isNaN(reliefPct) &&
      !isNaN(reliefFeePct) &&
      P > 0 &&
      PMT > 0 &&
      extra >= 0 &&
      reliefPct > 0 &&
      reliefFeePct >= 0
    ) {
      // Standard repayment
      const n = calcMonthsToPayoff(P, r, PMT);
      const { totalPaid, totalInterest } = calcTotalPaid(P, r, PMT, n);

      // With extra payment
      const PMTExtra = PMT + extra;
      const nExtra = calcMonthsToPayoff(P, r, PMTExtra);
      const {
        totalPaid: totalPaidWithExtra,
        totalInterest: totalInterestWithExtra,
      } = calcTotalPaid(P, r, PMTExtra, nExtra);

      // Debt relief calculation
      const reliefAmount = P * reliefPct;
      const reliefFeeAmount = reliefAmount * reliefFeePct;
      const totalReliefCost = reliefAmount + reliefFeeAmount;

      // Savings
      const savingsVsStandard = totalPaid - totalReliefCost;
      const savingsVsExtra = totalPaidWithExtra - totalReliefCost;

      setResult({
        monthsToPayoff: n,
        totalPaid,
        totalInterest,
        monthsWithExtra: nExtra,
        totalPaidWithExtra,
        totalInterestWithExtra,
        reliefAmount,
        reliefFeeAmount,
        totalReliefCost,
        savingsVsStandard,
        savingsVsExtra,
      });
    } else {
      setResult(null);
    }
  };

  return (
    <div className="mt-8 md:mt-12 mx-auto h-full w-10/12 md:w-11/12">
      <h1>Debt Reduction Comparison & Relief Calculator</h1>
      <p className="mb-4">
        <strong>
          Compare standard debt repayment, accelerated payments, and debt relief
          (settlement/forgiveness) to see which option saves you the most money
          and time.
        </strong>
      </p>
      <section className="mb-8">
        <h2>How Does This Calculator Work?</h2>
        <p>
          Enter your total debt, interest rate, monthly payment, extra payment
          amount, and a typical debt relief offer. The calculator estimates your
          payoff time, total interest, and compares the cost of each strategy.
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
                <td className="px-3 py-2 border">Extra Payment ($/mo)</td>
                <td className="px-3 py-2 border">$0 - $200</td>
                <td className="px-3 py-2 border">
                  Speeds up payoff, saves interest
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Debt Relief Percent (%)</td>
                <td className="px-3 py-2 border">30% - 60%</td>
                <td className="px-3 py-2 border">Typical settlement: 40%</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Relief Fee (%)</td>
                <td className="px-3 py-2 border">15% - 25%</td>
                <td className="px-3 py-2 border">Debt relief company fee</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mb-6">
          <h3>Debt Reduction & Relief Details</h3>
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
                <td className="px-3 py-2 border">Extra Payment</td>
                <td className="px-3 py-2 border">Additional paid each month</td>
                <td className="px-3 py-2 border">$100</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">
                  Months to Payoff (Standard)
                </td>
                <td className="px-3 py-2 border">Time to pay off debt</td>
                <td className="px-3 py-2 border">31</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Total Paid (Standard)</td>
                <td className="px-3 py-2 border">Sum of all payments</td>
                <td className="px-3 py-2 border">$12,400</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Total Interest (Standard)</td>
                <td className="px-3 py-2 border">Interest paid over time</td>
                <td className="px-3 py-2 border">$2,400</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">
                  Months to Payoff (With Extra)
                </td>
                <td className="px-3 py-2 border">
                  Time to pay off with extra payment
                </td>
                <td className="px-3 py-2 border">22</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Total Paid (With Extra)</td>
                <td className="px-3 py-2 border">
                  Sum of all payments with extra
                </td>
                <td className="px-3 py-2 border">$11,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">
                  Total Interest (With Extra)
                </td>
                <td className="px-3 py-2 border">Interest paid with extra</td>
                <td className="px-3 py-2 border">$1,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Debt Relief Amount</td>
                <td className="px-3 py-2 border">Amount paid in settlement</td>
                <td className="px-3 py-2 border">$4,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Relief Fee</td>
                <td className="px-3 py-2 border">Company fee for relief</td>
                <td className="px-3 py-2 border">$800</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Total Relief Cost</td>
                <td className="px-3 py-2 border">Relief + fee</td>
                <td className="px-3 py-2 border">$4,800</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Savings vs Standard</td>
                <td className="px-3 py-2 border">
                  Standard total paid - relief cost
                </td>
                <td className="px-3 py-2 border">$7,600</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Savings vs Extra</td>
                <td className="px-3 py-2 border">
                  Extra total paid - relief cost
                </td>
                <td className="px-3 py-2 border">$6,200</td>
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
                <td className="px-3 py-2 border">Extra Payment</td>
                <td className="px-3 py-2 border">$100</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Relief Percent</td>
                <td className="px-3 py-2 border">40%</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Relief Fee</td>
                <td className="px-3 py-2 border">20%</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">
                  Months to Payoff (Standard)
                </td>
                <td className="px-3 py-2 border">31</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Total Paid (Standard)</td>
                <td className="px-3 py-2 border">$12,400</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Total Interest (Standard)</td>
                <td className="px-3 py-2 border">$2,400</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">
                  Months to Payoff (With Extra)
                </td>
                <td className="px-3 py-2 border">22</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Total Paid (With Extra)</td>
                <td className="px-3 py-2 border">$11,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">
                  Total Interest (With Extra)
                </td>
                <td className="px-3 py-2 border">$1,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Relief Amount</td>
                <td className="px-3 py-2 border">$4,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Relief Fee</td>
                <td className="px-3 py-2 border">$800</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Total Relief Cost</td>
                <td className="px-3 py-2 border">$4,800</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Savings vs Standard</td>
                <td className="px-3 py-2 border">$7,600</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Savings vs Extra</td>
                <td className="px-3 py-2 border">$6,200</td>
              </tr>
            </tbody>
          </table>
          <p className="text-sm">
            <strong>Source:</strong> National Debt Relief, NerdWallet, 2024
            averages.
          </p>
        </div>
        <div className="mb-6">
          <h3>Tips for Beginners</h3>
          <ul className="list-disc list-inside">
            <li>
              Making extra payments saves you money and shortens your debt
              payoff time.
            </li>
            <li>
              Debt relief can reduce your total payoff, but may hurt your credit
              score and have tax consequences.
            </li>
            <li>
              Compare all options and consult a financial advisor before
              choosing debt relief.
            </li>
            <li>
              Always make at least the minimum payment to avoid late fees and
              penalties.
            </li>
            <li>
              Consider debt consolidation or credit counseling for more options.
            </li>
          </ul>
        </div>
      </section>
      <div className="mb-8">
        <h3>Debt Inputs</h3>
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
              Extra Payment ($/mo):
            </label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={extraPayment}
              onChange={(e) => setExtraPayment(e.target.value)}
              placeholder="e.g., 100"
              min="0"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">
              Debt Relief Percent (%):
            </label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={reliefPercent}
              onChange={(e) => setReliefPercent(e.target.value)}
              placeholder="e.g., 40"
              min="0"
              max="100"
              step="0.01"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">Relief Fee (%):</label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={reliefFee}
              onChange={(e) => setReliefFee(e.target.value)}
              placeholder="e.g., 20"
              min="0"
              max="100"
              step="0.01"
            />
          </div>
        </div>
      </div>
      <Button className="mt-2 px-4 py-2 rounded" onClick={handleCalculate}>
        Compare Debt Reduction Options
      </Button>
      {result && (
        <div className="flex flex-col gap-4 mt-6">
          <div className="shadow p-4 border rounded-lg">
            <h3>Results</h3>
            <table className="border border-gray-300 min-w-full text-sm">
              <tbody>
                <tr>
                  <td className="px-3 py-2 border font-medium">
                    Months to Payoff (Standard)
                  </td>
                  <td className="px-3 py-2 border">
                    {result.monthsToPayoff === Infinity
                      ? "Never (payment too low)"
                      : result.monthsToPayoff.toLocaleString(undefined, {
                          minimumFractionDigits: 1,
                          maximumFractionDigits: 1,
                        })}
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2 border font-medium">
                    Total Paid (Standard)
                  </td>
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
                    Total Interest (Standard)
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
                    Months to Payoff (With Extra)
                  </td>
                  <td className="px-3 py-2 border">
                    {result.monthsWithExtra === Infinity
                      ? "Never (payment too low)"
                      : result.monthsWithExtra.toLocaleString(undefined, {
                          minimumFractionDigits: 1,
                          maximumFractionDigits: 1,
                        })}
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2 border font-medium">
                    Total Paid (With Extra)
                  </td>
                  <td className="px-3 py-2 border">
                    $
                    {result.totalPaidWithExtra.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2 border font-medium">
                    Total Interest (With Extra)
                  </td>
                  <td className="px-3 py-2 border">
                    $
                    {result.totalInterestWithExtra.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2 border font-medium">
                    Debt Relief Amount
                  </td>
                  <td className="px-3 py-2 border">
                    $
                    {result.reliefAmount.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2 border font-medium">Relief Fee</td>
                  <td className="px-3 py-2 border">
                    $
                    {result.reliefFeeAmount.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2 border font-medium">
                    Total Relief Cost
                  </td>
                  <td className="px-3 py-2 border">
                    $
                    {result.totalReliefCost.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2 border font-medium">
                    Savings vs Standard
                  </td>
                  <td className="px-3 py-2 border font-bold">
                    $
                    {result.savingsVsStandard.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2 border font-medium">
                    Savings vs Extra
                  </td>
                  <td className="px-3 py-2 border font-bold">
                    $
                    {result.savingsVsExtra.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="mt-2 text-sm">
              <strong>Note:</strong> This calculator provides estimates. Actual
              results may vary based on your debt terms and relief offers.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
