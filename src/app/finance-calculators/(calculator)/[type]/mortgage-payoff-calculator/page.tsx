"use client";
import { useState } from "react";

export default function MortgagePayoffCalculator() {
  const [loanAmount, setLoanAmount] = useState<string>("");
  const [interestRate, setInterestRate] = useState<string>("6");
  const [loanTerm, setLoanTerm] = useState<string>("30");
  const [yearsPaid, setYearsPaid] = useState<string>("0");
  const [extraPayment, setExtraPayment] = useState<string>("0");
  const [result, setResult] = useState<{
    originalPayoff: string;
    newPayoff: string;
    interestSaved: number;
    monthsSaved: number;
  } | null>(null);

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

  function calcPayoffMonths(balance: number, rate: number, payment: number) {
    if (rate === 0) return Math.ceil(balance / payment);
    const r = rate / 100 / 12;
    return Math.ceil(
      Math.log(payment / (payment - balance * r)) / Math.log(1 + r)
    );
  }

  function formatMonths(months: number) {
    const y = Math.floor(months / 12);
    const m = months % 12;
    return `${y} years, ${m} months`;
  }

  const handleCalculate = () => {
    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate);
    const term = parseFloat(loanTerm);
    const paidYears = parseFloat(yearsPaid);
    const extra = parseFloat(extraPayment);

    if (
      !isNaN(principal) &&
      !isNaN(rate) &&
      !isNaN(term) &&
      !isNaN(paidYears) &&
      !isNaN(extra) &&
      principal > 0 &&
      rate >= 0 &&
      term > 0 &&
      paidYears >= 0 &&
      paidYears < term &&
      extra >= 0
    ) {
      // Calculate original monthly payment
      const origMonthly = calcMonthlyPayment(principal, rate, term);

      // Remaining balance after years paid
      const nPaid = paidYears * 12;
      const r = rate / 100 / 12;
      const n = term * 12;
      const remainingBalance =
        r === 0
          ? principal - origMonthly * nPaid
          : principal * Math.pow(1 + r, nPaid) -
            origMonthly * ((Math.pow(1 + r, nPaid) - 1) / r);

      // Original payoff (remaining)
      const origMonthsLeft = n - nPaid;
      const origTotalInterest = origMonthly * origMonthsLeft - remainingBalance;

      // New payoff with extra payment
      const newMonthly = origMonthly + extra;
      const newMonthsLeft = calcPayoffMonths(
        remainingBalance,
        rate,
        newMonthly
      );
      const newTotalInterest = newMonthly * newMonthsLeft - remainingBalance;

      setResult({
        originalPayoff: formatMonths(origMonthsLeft),
        newPayoff: formatMonths(newMonthsLeft),
        interestSaved: origTotalInterest - newTotalInterest,
        monthsSaved: origMonthsLeft - newMonthsLeft,
      });
    } else {
      setResult(null);
    }
  };

  return (
    <div className="mx-auto mt-8 md:mt-12 w-10/12 md:w-11/12 h-full">
      <h1>Mortgage Payoff Calculator</h1>
      <p className="mb-4">
        <strong>
          See how making extra payments can help you pay off your mortgage
          faster and save on interest.
        </strong>
      </p>
      <section className="mb-8">
        <h2>How Does This Calculator Work?</h2>
        <p>
          Enter your loan details and any extra monthly payment you can make.
          The calculator will show how much sooner you can pay off your mortgage
          and how much interest you can save.
        </p>

        <div className="my-6">
          <h3>Key Terms Explained</h3>
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
                <td className="px-3 py-2 border">Loan Amount</td>
                <td className="px-3 py-2 border">
                  The original amount you borrowed.
                </td>
                <td className="px-3 py-2 border">$400,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Interest Rate</td>
                <td className="px-3 py-2 border">
                  The annual rate charged by your lender.
                </td>
                <td className="px-3 py-2 border">6.5%</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Loan Term</td>
                <td className="px-3 py-2 border">
                  How many years you have to repay the loan.
                </td>
                <td className="px-3 py-2 border">30</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Years Already Paid</td>
                <td className="px-3 py-2 border">
                  How many years you've already paid on your mortgage.
                </td>
                <td className="px-3 py-2 border">5</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Extra Monthly Payment</td>
                <td className="px-3 py-2 border">
                  Any extra amount you pay each month in addition to your
                  regular payment.
                </td>
                <td className="px-3 py-2 border">$200</td>
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
                <th className="px-3 py-2 border text-left">No Extra Payment</th>
                <th className="px-3 py-2 border text-left">With $200 Extra</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-3 py-2 border">Payoff Time</td>
                <td className="px-3 py-2 border">30 years</td>
                <td className="px-3 py-2 border">25 years, 2 months</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Total Interest Paid</td>
                <td className="px-3 py-2 border">$510,640</td>
                <td className="px-3 py-2 border">$429,200</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Interest Saved</td>
                <td className="px-3 py-2 border">-</td>
                <td className="px-3 py-2 border">$81,440</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Months Saved</td>
                <td className="px-3 py-2 border">-</td>
                <td className="px-3 py-2 border">58</td>
              </tr>
            </tbody>
          </table>
          <p className="text-gray-600 text-sm">
            <strong>Source:</strong> Bankrate, Freddie Mac, 2024 averages.
          </p>
        </div>
        <div className="mb-6">
          <h3>Tips for Beginners</h3>
          <ul className="list-disc list-inside">
            <li>
              Even small extra payments can save you thousands in interest.
            </li>
            <li>Check if your lender allows extra payments without penalty.</li>
            <li>Paying extra early in your loan saves more interest.</li>
            <li>
              Make sure to specify that extra payments go toward principal.
            </li>
            <li>Consult a mortgage professional for personalized advice.</li>
          </ul>
        </div>
      </section>
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
              <td className="px-3 py-2 border">Loan Amount ($)</td>
              <td className="px-3 py-2 border">$300,000 - $500,000</td>
              <td className="px-3 py-2 border">Typical U.S. mortgage (2024)</td>
            </tr>
            <tr>
              <td className="px-3 py-2 border">Interest Rate (%)</td>
              <td className="px-3 py-2 border">6% - 7%</td>
              <td className="px-3 py-2 border">2024 average: ~6.5%</td>
            </tr>
            <tr>
              <td className="px-3 py-2 border">Loan Term (years)</td>
              <td className="px-3 py-2 border">30</td>
              <td className="px-3 py-2 border">Most common in U.S.</td>
            </tr>
            <tr>
              <td className="px-3 py-2 border">Years Already Paid</td>
              <td className="px-3 py-2 border">0 - 10</td>
              <td className="px-3 py-2 border">How long you've had the loan</td>
            </tr>
            <tr>
              <td className="px-3 py-2 border">Extra Monthly Payment ($)</td>
              <td className="px-3 py-2 border">$100 - $500</td>
              <td className="px-3 py-2 border">
                Any extra you can pay each month
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="gap-4 grid md:grid-cols-2">
        <div className="mb-2">
          <label className="block mb-1 font-medium">Loan Amount ($):</label>
          <input
            type="number"
            className="px-2 py-1 border rounded w-full"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            placeholder="Enter original loan amount"
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
            placeholder="e.g., 6.5"
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
            placeholder="e.g., 30"
            min="1"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1 font-medium">Years Already Paid:</label>
          <input
            type="number"
            className="px-2 py-1 border rounded w-full"
            value={yearsPaid}
            onChange={(e) => setYearsPaid(e.target.value)}
            placeholder="e.g., 5"
            min="0"
            max={loanTerm}
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1 font-medium">
            Extra Monthly Payment ($):
          </label>
          <input
            type="number"
            className="px-2 py-1 border rounded w-full"
            value={extraPayment}
            onChange={(e) => setExtraPayment(e.target.value)}
            placeholder="e.g., 200"
            min="0"
          />
        </div>
      </div>
      <button
        className="bg-blue-600 mt-2 px-4 py-2 rounded text-white"
        onClick={handleCalculate}
      >
        Calculate Payoff
      </button>
      {result && (
        <div className="flex flex-col gap-4 mt-6">
          <div className="bg-white shadow p-4 border rounded-lg">
            <h3 className="mb-2 font-semibold">Results</h3>
            <table className="border border-gray-300 min-w-full text-sm">
              <tbody>
                <tr>
                  <td className="px-3 py-2 border font-medium">
                    Original Payoff Time
                  </td>
                  <td className="px-3 py-2 border">{result.originalPayoff}</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 border font-medium">
                    New Payoff Time
                  </td>
                  <td className="px-3 py-2 border">{result.newPayoff}</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 border font-medium">
                    Interest Saved
                  </td>
                  <td className="px-3 py-2 border">
                    $
                    {result.interestSaved.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2 border font-medium">Months Saved</td>
                  <td className="px-3 py-2 border">{result.monthsSaved}</td>
                </tr>
              </tbody>
            </table>
            <div className="mt-2 text-gray-600 text-sm">
              <strong>Note:</strong> This calculator assumes a fixed-rate
              mortgage and does not include taxes or insurance.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
