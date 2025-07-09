"use client";
import { useState } from "react";

export default function HomeEquityLoanCalculator() {
  const [homeValue, setHomeValue] = useState<string>("");
  const [mortgageBalance, setMortgageBalance] = useState<string>("");
  const [loanToValue, setLoanToValue] = useState<string>("80");
  const [interestRate, setInterestRate] = useState<string>("");
  const [loanTerm, setLoanTerm] = useState<string>("15");
  const [result, setResult] = useState<{
    maxLoan: number;
    monthlyPayment: number;
  } | null>(null);

  const handleCalculate = () => {
    const value = parseFloat(homeValue);
    const balance = parseFloat(mortgageBalance);
    const ltv = parseFloat(loanToValue) / 100;
    const rate = parseFloat(interestRate) / 100 / 12;
    const years = parseFloat(loanTerm);

    if (
      !isNaN(value) &&
      !isNaN(balance) &&
      !isNaN(ltv) &&
      !isNaN(rate) &&
      !isNaN(years) &&
      value > 0 &&
      balance >= 0 &&
      ltv > 0 &&
      ltv <= 1 &&
      rate > 0 &&
      years > 0
    ) {
      const maxLoan = Math.max(0, value * ltv - balance);
      const n = years * 12;
      const monthlyPayment =
        maxLoan > 0 ? (maxLoan * rate) / (1 - Math.pow(1 + rate, -n)) : 0;
      setResult({
        maxLoan,
        monthlyPayment,
      });
    } else {
      setResult(null);
    }
  };

  return (
    <div className="mt-8 md:mt-12 mx-auto h-full w-10/12 md:w-11/12">
      <h1>Home Equity Loan Calculator</h1>
      <p className="mb-4">
        <strong>
          Estimate how much you can borrow with a home equity loan and what your
          monthly payment might be.
        </strong>
      </p>
      <section className="mb-8">
        <h2>What is a Home Equity Loan?</h2>
        <p>
          A home equity loan lets you borrow money using the equity in your home
          as collateral. Equity is the difference between your home's value and
          what you owe on your mortgage. Home equity loans are often used for
          home improvements, debt consolidation, or major expenses.
        </p>
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
                <td className="px-3 py-2 border">Home Value</td>
                <td className="px-3 py-2 border">
                  The current market value of your home.
                </td>
                <td className="px-3 py-2 border">$400,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Mortgage Balance</td>
                <td className="px-3 py-2 border">
                  The amount you still owe on your mortgage.
                </td>
                <td className="px-3 py-2 border">$200,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Loan-to-Value (LTV) Ratio</td>
                <td className="px-3 py-2 border">
                  The percentage of your home's value you can borrow (including
                  your mortgage).
                </td>
                <td className="px-3 py-2 border">80%</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Interest Rate</td>
                <td className="px-3 py-2 border">
                  The annual rate charged for borrowing, as a percentage.
                </td>
                <td className="px-3 py-2 border">7%</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Loan Term</td>
                <td className="px-3 py-2 border">
                  How long you have to repay the loan (in years).
                </td>
                <td className="px-3 py-2 border">15</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Monthly Payment</td>
                <td className="px-3 py-2 border">
                  The amount you pay each month to repay the loan.
                </td>
                <td className="px-3 py-2 border">$719.00</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mb-6">
          <h3>Tips for Beginners</h3>
          <ul className="list-disc list-inside">
            <li>
              Most lenders allow you to borrow up to 80% of your home's value,
              but this can vary.
            </li>
            <li>
              Your home is collateral—if you can't repay, you could lose your
              home.
            </li>
            <li>Shop around for the best interest rates and terms.</li>
            <li>
              Consider all costs: closing costs, fees, and possible changes in
              your home's value.
            </li>
            <li>
              Consult a financial advisor or mortgage professional for
              personalized advice.
            </li>
          </ul>
        </div>
        <div className="mb-6">
          <h3>How Home Equity Loan Amount is Calculated</h3>
          <ul className="mb-2 list-decimal list-inside">
            <li>
              <strong>Find your home's value.</strong>
            </li>
            <li>
              <strong>Multiply by the maximum LTV ratio</strong> (often 80%).
            </li>
            <li>
              <strong>Subtract your current mortgage balance.</strong>
            </li>
            <li>
              <strong>The result is your maximum loan amount.</strong>
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
                <td className="px-3 py-2 border">Home Value</td>
                <td className="px-3 py-2 border">-</td>
                <td className="px-3 py-2 border">$400,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">LTV Ratio</td>
                <td className="px-3 py-2 border">-</td>
                <td className="px-3 py-2 border">80% (0.80)</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Max Loan Amount</td>
                <td className="px-3 py-2 border">
                  Home Value × LTV - Mortgage Balance
                </td>
                <td className="px-3 py-2 border">
                  $400,000 × 0.80 - $200,000 = $120,000
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="grid lg:grid-cols-2">
          <div className="mb-6">
            <h3>How Monthly Payment is Calculated</h3>
            <ul className="mb-2 list-decimal list-inside">
              <li>
                <strong>
                  Use the maximum loan amount, interest rate, and loan term.
                </strong>
              </li>
              <li>
                <strong>Apply the loan payment formula:</strong>
                <div className="mt-2">
                  <code className="px-2 py-1 rounded text-sm">
                    M = P × [ r(1 + r)<sup>n</sup> ] / [ (1 + r)<sup>n</sup> - 1
                    ]
                  </code>
                </div>
                <div className="mt-2 text-sm">
                  Where:
                  <br />
                  <strong>M</strong> = monthly payment
                  <br />
                  <strong>P</strong> = loan amount
                  <br />
                  <strong>r</strong> = monthly interest rate
                  <br />
                  <strong>n</strong> = total number of payments (months)
                </div>
              </li>
            </ul>
          </div>
          <div className="mb-6">
            <h3>Step-by-Step Example</h3>
            <ol className="mb-2 list-decimal list-inside">
              <li>Home value: $400,000</li>
              <li>Mortgage balance: $200,000</li>
              <li>LTV ratio: 80%</li>
              <li>Max loan: $400,000 × 0.80 - $200,000 = $120,000</li>
              <li>Interest rate: 7% per year</li>
              <li>Loan term: 15 years</li>
              <li>Monthly payment: $1,079.77</li>
            </ol>
          </div>
        </div>
        <div className="gap-4 grid md:grid-cols-2">
          <div className="mb-2">
            <label className="block mb-1 font-medium">Home Value ($):</label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={homeValue}
              onChange={(e) => setHomeValue(e.target.value)}
              placeholder="Enter your home's value"
              min="0"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">
              Current Mortgage Balance ($):
            </label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={mortgageBalance}
              onChange={(e) => setMortgageBalance(e.target.value)}
              placeholder="Enter your current mortgage balance"
              min="0"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">
              Max Loan-to-Value Ratio (%):
            </label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={loanToValue}
              onChange={(e) => setLoanToValue(e.target.value)}
              placeholder="Usually 80"
              min="1"
              max="100"
              step="0.01"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">
              Interest Rate (% per year):
            </label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              placeholder="Enter annual interest rate"
              min="0"
              step="0.01"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">Loan Term (years):</label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={loanTerm}
              onChange={(e) => setLoanTerm(e.target.value)}
              placeholder="Enter loan term (e.g., 15)"
              min="1"
            />
          </div>
        </div>
        <button
          className="bg-blue-600 mt-2 px-4 py-2 rounded"
          onClick={handleCalculate}
        >
          Calculate Home Equity Loan
        </button>
        {result && (
          <div className="flex flex-col gap-4 mt-6">
            <div className="shadow p-4 border rounded-lg">
              <h3 className="mb-2 font-semibold">Results</h3>
              <table className="border border-gray-300 min-w-full text-sm">
                <tbody>
                  <tr>
                    <td className="px-3 py-2 border font-medium">
                      Maximum Loan Amount
                    </td>
                    <td className="px-3 py-2 border">
                      $
                      {result.maxLoan.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border font-medium">
                      Estimated Monthly Payment
                    </td>
                    <td className="px-3 py-2 border">
                      $
                      {result.monthlyPayment.toLocaleString(undefined, {
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
      </section>
    </div>
  );
}
