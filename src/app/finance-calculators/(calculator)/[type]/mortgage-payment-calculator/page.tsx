"use client";
import { useState } from "react";

export default function MortgagePaymentCalculator() {
  const [loanAmount, setLoanAmount] = useState<string>("");
  const [interestRate, setInterestRate] = useState<string>("");
  const [loanTerm, setLoanTerm] = useState<string>("30");
  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null);

  const handleCalculate = () => {
    const principal = parseFloat(loanAmount);
    const annualRate = parseFloat(interestRate) / 100;
    const years = parseFloat(loanTerm);

    if (
      !isNaN(principal) &&
      !isNaN(annualRate) &&
      !isNaN(years) &&
      principal > 0 &&
      annualRate > 0 &&
      years > 0
    ) {
      const monthlyRate = annualRate / 12;
      const n = years * 12;
      const payment =
        (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -n));
      setMonthlyPayment(payment);
    } else {
      setMonthlyPayment(null);
    }
  };

  return (
    <div className="mt-8 md:mt-12 mx-auto h-full w-10/12 md:w-11/12">
      <h1>Mortgage Payment Calculator</h1>
      <p className="mb-4">
        <strong>
          Calculate your monthly mortgage payment and understand how your loan
          amount, interest rate, and loan term affect your payment.
        </strong>
      </p>
      <section className="mb-8">
        <h2>What is a Mortgage Payment?</h2>
        <p>
          A mortgage payment is the amount you pay each month to your lender to
          repay your home loan. It usually includes principal (the amount you
          borrowed) and interest (the cost of borrowing). Sometimes, it also
          includes property taxes and homeowner's insurance.
        </p>
        <div className="my-6">
          <h3>Tips for Beginners</h3>
          <ul className="list-disc list-inside">
            <li>
              Your monthly payment does <strong>not</strong> include property
              taxes, homeowner's insurance, or HOA fees—budget for these
              separately.
            </li>
            <li>
              A lower interest rate or a longer loan term will reduce your
              monthly payment, but a longer term means you pay more interest
              over time.
            </li>
            <li>
              Making extra payments toward principal can save you money on
              interest.
            </li>
            <li>Shop around for the best mortgage rates and terms.</li>
            <li>Talk to a mortgage professional for personalized advice.</li>
          </ul>
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
                <td className="px-3 py-2 border">Loan Amount</td>
                <td className="px-3 py-2 border">
                  The amount you borrow from the lender.
                </td>
                <td className="px-3 py-2 border">$300,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Interest Rate</td>
                <td className="px-3 py-2 border">
                  The annual cost of borrowing, shown as a percentage.
                </td>
                <td className="px-3 py-2 border">6%</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Loan Term</td>
                <td className="px-3 py-2 border">
                  How long you have to repay the loan (in years).
                </td>
                <td className="px-3 py-2 border">30</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Principal</td>
                <td className="px-3 py-2 border">
                  The part of your payment that reduces your loan balance.
                </td>
                <td className="px-3 py-2 border">Varies each month</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Interest</td>
                <td className="px-3 py-2 border">
                  The part of your payment that pays the lender for the loan.
                </td>
                <td className="px-3 py-2 border">Varies each month</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mb-6">
          <h3>How Your Payment is Calculated</h3>
          <ul className="mb-2 list-decimal list-inside">
            <li>
              <strong>Loan Amount:</strong> The total amount you borrow.
            </li>
            <li>
              <strong>Interest Rate:</strong> The annual rate divided by 12 for
              monthly payments.
            </li>
            <li>
              <strong>Loan Term:</strong> The number of years, multiplied by 12
              for total months.
            </li>
            <li>
              <strong>Monthly Payment Formula:</strong>
              <div className="mt-2">
                <code className="px-2 py-1 rounded text-sm">
                  M = P × [ r(1 + r)<sup>n</sup> ] / [ (1 + r)<sup>n</sup> - 1 ]
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
        <div className="gap-4 grid md:grid-cols-3">
          <div className="mb-2">
            <label className="block mb-1 font-medium">Loan Amount ($):</label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              placeholder="Enter loan amount"
              min="0"
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
              placeholder="Enter loan term in years"
              min="1"
            />
          </div>
        </div>
        <button
          className="bg-blue-600 mt-2 px-4 py-2 rounded"
          onClick={handleCalculate}
        >
          Calculate Payment
        </button>
        {monthlyPayment !== null && (
          <div className="flex flex-col gap-4 mt-6">
            <div className="shadow p-4 border rounded-lg">
              <strong>Estimated Monthly Payment:</strong>{" "}
              <span className="text-lg">
                $
                {monthlyPayment.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
          </div>
        )}
        <div className="my-6">
          <h3>Step-by-Step Example</h3>
          <table className="mb-2 border border-gray-300 min-w-full text-sm">
            <thead>
              <tr className="">
                <th className="px-3 py-2 border text-left">Step</th>
                <th className="px-3 py-2 border text-left">Calculation</th>
                <th className="px-3 py-2 border text-left">Result</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-3 py-2 border">Loan Amount</td>
                <td className="px-3 py-2 border">$300,000</td>
                <td className="px-3 py-2 border">$300,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Interest Rate</td>
                <td className="px-3 py-2 border">6% / 12 = 0.005</td>
                <td className="px-3 py-2 border">0.005</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Loan Term</td>
                <td className="px-3 py-2 border">30 × 12 = 360</td>
                <td className="px-3 py-2 border">360</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Monthly Payment</td>
                <td className="px-3 py-2 border">
                  300,000 × [0.005(1+0.005)<sup>360</sup>] / [(1+0.005)
                  <sup>360</sup> - 1]
                </td>
                <td className="px-3 py-2 border">$1,798.65</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
