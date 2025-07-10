"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function MortgageRefinanceCalculator() {
  const [currentBalance, setCurrentBalance] = useState<string>("");
  const [currentRate, setCurrentRate] = useState<string>("");
  const [currentTerm, setCurrentTerm] = useState<string>("30");
  const [yearsPaid, setYearsPaid] = useState<string>("0");
  const [newRate, setNewRate] = useState<string>("");
  const [newTerm, setNewTerm] = useState<string>("30");
  const [closingCosts, setClosingCosts] = useState<string>("0");
  const [result, setResult] = useState<{
    oldPayment: number;
    newPayment: number;
    monthlySavings: number;
    totalInterestOld: number;
    totalInterestNew: number;
    breakEvenMonths: number | null;
  } | null>(null);

  // Helper to calculate monthly payment
  function calcMonthlyPayment(
    principal: number,
    annualRate: number,
    years: number
  ) {
    const r = annualRate / 100 / 12;
    const n = years * 12;
    if (r === 0) return principal / n;
    return (principal * r) / (1 - Math.pow(1 + r, -n));
  }

  const handleCalculate = () => {
    const balance = parseFloat(currentBalance);
    const oldRate = parseFloat(currentRate);
    const oldTerm = parseFloat(currentTerm);
    const paidYears = parseFloat(yearsPaid);
    const newLoanRate = parseFloat(newRate);
    const newLoanTerm = parseFloat(newTerm);
    const costs = parseFloat(closingCosts) || 0;

    if (
      !isNaN(balance) &&
      !isNaN(oldRate) &&
      !isNaN(oldTerm) &&
      !isNaN(paidYears) &&
      !isNaN(newLoanRate) &&
      !isNaN(newLoanTerm) &&
      balance > 0 &&
      oldRate > 0 &&
      oldTerm > 0 &&
      paidYears >= 0 &&
      paidYears < oldTerm &&
      newLoanRate > 0 &&
      newLoanTerm > 0 &&
      costs >= 0
    ) {
      // Remaining balance after years paid (approximate, for beginners)
      const oldMonthly = calcMonthlyPayment(balance, oldRate, oldTerm);
      const nPaid = paidYears * 12;
      const r = oldRate / 100 / 12;
      const n = oldTerm * 12;
      // Remaining balance formula
      const remainingBalance =
        r === 0
          ? balance - oldMonthly * nPaid
          : balance * Math.pow(1 + r, nPaid) -
            oldMonthly * ((Math.pow(1 + r, nPaid) - 1) / r);

      // New loan payment
      const newMonthly = calcMonthlyPayment(
        remainingBalance + costs,
        newLoanRate,
        newLoanTerm
      );

      // Total interest remaining on old loan
      const totalInterestOld = oldMonthly * (n - nPaid) - remainingBalance;

      // Total interest on new loan
      const totalInterestNew =
        newMonthly * newLoanTerm * 12 - (remainingBalance + costs);

      // Monthly savings
      const monthlySavings = oldMonthly - newMonthly;

      // Break-even point (months to recover closing costs)
      const breakEvenMonths =
        monthlySavings > 0 ? Math.ceil(costs / monthlySavings) : null;

      setResult({
        oldPayment: oldMonthly,
        newPayment: newMonthly,
        monthlySavings,
        totalInterestOld,
        totalInterestNew,
        breakEvenMonths,
      });
    } else {
      setResult(null);
    }
  };

  return (
    <div className="mt-8 md:mt-12 mx-auto h-full w-10/12 md:w-11/12">
      <h1>Mortgage Refinance Calculator</h1>
      <p className="mb-4">
        <strong>
          Estimate your new monthly payment, savings, and break-even point if
          you refinance your mortgage. Learn how refinancing works and what to
          consider.
        </strong>
      </p>
      <section className="mb-8">
        <h2>What is Mortgage Refinancing?</h2>
        <p>
          Refinancing means replacing your current mortgage with a new
          one—usually to get a lower interest rate, reduce your monthly payment,
          or change your loan term. You can also refinance to take cash out or
          switch from an adjustable to a fixed rate.
        </p>
        <div className="my-6">
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
                <td className="px-3 py-2 border">Current Balance</td>
                <td className="px-3 py-2 border">
                  Amount you still owe on your mortgage.
                </td>
                <td className="px-3 py-2 border">$250,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Interest Rate</td>
                <td className="px-3 py-2 border">
                  Annual rate you pay on your mortgage.
                </td>
                <td className="px-3 py-2 border">5%</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Loan Term</td>
                <td className="px-3 py-2 border">
                  Total years for your mortgage (e.g., 30 years).
                </td>
                <td className="px-3 py-2 border">30</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Years Paid</td>
                <td className="px-3 py-2 border">
                  How many years you've already paid.
                </td>
                <td className="px-3 py-2 border">5</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Closing Costs</td>
                <td className="px-3 py-2 border">
                  Fees for getting the new loan (appraisal, title, etc.).
                </td>
                <td className="px-3 py-2 border">$3,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Break-even Point</td>
                <td className="px-3 py-2 border">
                  How many months it takes for your monthly savings to cover
                  closing costs.
                </td>
                <td className="px-3 py-2 border">20 months</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mb-6">
          <h3>Step-by-Step Example</h3>
          <ol className="mb-2 list-decimal list-inside">
            <li>Current balance: $250,000</li>
            <li>Current rate: 5%, 30-year loan, 5 years paid</li>
            <li>New rate: 4%, 30-year loan, closing costs: $3,000</li>
            <li>New monthly payment: $1,193.54</li>
            <li>Monthly savings: $148.51</li>
            <li>Break-even: $3,000 / $148.51 ≈ 21 months</li>
          </ol>
        </div>
        <div className="gap-4 grid md:grid-cols-2">
          <div className="mb-2">
            <label className="block mb-1 font-medium">
              Current Mortgage Balance ($):
            </label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={currentBalance}
              onChange={(e) => setCurrentBalance(e.target.value)}
              placeholder="Enter current balance"
              min="0"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">
              Current Interest Rate (%):
            </label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={currentRate}
              onChange={(e) => setCurrentRate(e.target.value)}
              placeholder="Enter current rate"
              min="0"
              step="0.01"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">
              Original Loan Term (years):
            </label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={currentTerm}
              onChange={(e) => setCurrentTerm(e.target.value)}
              placeholder="e.g., 30"
              min="1"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">
              Years Already Paid:
            </label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={yearsPaid}
              onChange={(e) => setYearsPaid(e.target.value)}
              placeholder="e.g., 5"
              min="0"
              max={currentTerm}
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">
              New Interest Rate (%):
            </label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={newRate}
              onChange={(e) => setNewRate(e.target.value)}
              placeholder="Enter new rate"
              min="0"
              step="0.01"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">
              New Loan Term (years):
            </label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={newTerm}
              onChange={(e) => setNewTerm(e.target.value)}
              placeholder="e.g., 30"
              min="1"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">
              Estimated Closing Costs ($):
            </label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={closingCosts}
              onChange={(e) => setClosingCosts(e.target.value)}
              placeholder="e.g., 3000"
              min="0"
            />
          </div>
        </div>
        <Button className="mt-2 px-4 py-2 rounded" onClick={handleCalculate}>
          Calculate Refinance
        </Button>
        {result && (
          <div className="flex flex-col gap-4 mt-6">
            <div className="shadow p-4 border rounded-lg">
              <h3>Results</h3>
              <table className="border border-gray-300 min-w-full text-sm">
                <tbody>
                  <tr>
                    <td className="px-3 py-2 border font-medium">
                      Old Monthly Payment
                    </td>
                    <td className="px-3 py-2 border">
                      $
                      {result.oldPayment.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border font-medium">
                      New Monthly Payment
                    </td>
                    <td className="px-3 py-2 border">
                      $
                      {result.newPayment.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border font-medium">
                      Monthly Savings
                    </td>
                    <td className="px-3 py-2 border">
                      $
                      {result.monthlySavings.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border font-medium">
                      Total Interest Remaining (Old Loan)
                    </td>
                    <td className="px-3 py-2 border">
                      $
                      {result.totalInterestOld.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border font-medium">
                      Total Interest (New Loan)
                    </td>
                    <td className="px-3 py-2 border">
                      $
                      {result.totalInterestNew.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border font-medium">
                      Break-even Point
                    </td>
                    <td className="px-3 py-2 border">
                      {result.breakEvenMonths !== null
                        ? `${result.breakEvenMonths} months`
                        : "N/A"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
        <div className="my-6">
          <h3>How Refinancing is Calculated</h3>
          <ul className="mb-2 list-decimal list-inside">
            <li>
              <strong>Find your remaining balance.</strong> This is what you
              still owe on your current mortgage.
            </li>
            <li>
              <strong>Estimate your new loan terms.</strong> Choose a new
              interest rate and loan term.
            </li>
            <li>
              <strong>Add closing costs.</strong> These are fees for the new
              loan.
            </li>
            <li>
              <strong>Calculate your new monthly payment.</strong>
            </li>
            <li>
              <strong>
                Compare your old and new payments and total interest.
              </strong>
            </li>
            <li>
              <strong>Find your break-even point.</strong> Divide closing costs
              by your monthly savings.
            </li>
          </ul>
          <table className="border border-gray-300 min-w-full text-sm">
            <thead>
              <tr className="">
                <th className="px-3 py-2 border text-left">Step</th>
                <th className="px-3 py-2 border text-left">Formula</th>
                <th className="px-3 py-2 border text-left">Example</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-3 py-2 border">Monthly Payment</td>
                <td className="px-3 py-2 border">
                  M = P × [ r(1 + r)<sup>n</sup> ] / [ (1 + r)<sup>n</sup> - 1 ]
                </td>
                <td className="px-3 py-2 border">$1,342.05</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Monthly Savings</td>
                <td className="px-3 py-2 border">Old Payment - New Payment</td>
                <td className="px-3 py-2 border">$200</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Break-even Point</td>
                <td className="px-3 py-2 border">
                  Closing Costs / Monthly Savings
                </td>
                <td className="px-3 py-2 border">15 months</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mb-6">
          <h3>Tips for Beginners</h3>
          <ul className="list-disc list-inside">
            <li>
              Refinancing makes sense if you can lower your rate or payment, or
              pay off your loan faster.
            </li>
            <li>Compare total interest paid, not just monthly payments.</li>
            <li>
              Consider how long you plan to stay in the home—if you move before
              the break-even point, refinancing may not save you money.
            </li>
            <li>Shop around for the best rates and lowest closing costs.</li>
            <li>Ask your lender for a Loan Estimate and Closing Disclosure.</li>
            <li>Consult a mortgage professional for personalized advice.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
