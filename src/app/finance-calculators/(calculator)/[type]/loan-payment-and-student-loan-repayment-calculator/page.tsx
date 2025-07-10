"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function LoanPaymentAndStudentLoanRepaymentCalculator() {
  const [loanAmount, setLoanAmount] = useState<string>("");
  const [interestRate, setInterestRate] = useState<string>("6");
  const [loanTerm, setLoanTerm] = useState<string>("10");
  const [extraPayment, setExtraPayment] = useState<string>("0");
  const [downPayment, setDownPayment] = useState<string>("0");
  const [fees, setFees] = useState<string>("0");

  const [result, setResult] = useState<{
    monthlyPayment: number;
    totalPaid: number;
    totalInterest: number;
    monthsToPayoff: number;
    savingsWithExtra: number;
  } | null>(null);

  // Calculate monthly payment for a loan
  function calcMonthlyPayment(P: number, r: number, n: number) {
    if (r === 0) return P / n;
    const monthlyRate = r / 12;
    return (P * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -n));
  }

  // Calculate months to payoff with extra payment
  function calcMonthsToPayoff(P: number, r: number, payment: number) {
    if (r === 0) return P / payment;
    const monthlyRate = r / 12;
    if (payment <= P * monthlyRate) return Infinity;
    return (
      Math.log(payment / (payment - P * monthlyRate)) /
      Math.log(1 + monthlyRate)
    );
  }

  // Calculate total paid and interest
  function calcTotalPaid(P: number, r: number, payment: number, n: number) {
    const totalPaid = payment * n;
    const totalInterest = totalPaid - P;
    return { totalPaid, totalInterest };
  }

  const handleCalculate = () => {
    const loan = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 100;
    const years = parseFloat(loanTerm);
    const extra = parseFloat(extraPayment);
    const down = parseFloat(downPayment);
    const fee = parseFloat(fees);

    if (
      !isNaN(loan) &&
      !isNaN(rate) &&
      !isNaN(years) &&
      !isNaN(extra) &&
      !isNaN(down) &&
      !isNaN(fee) &&
      loan > 0 &&
      years > 0
    ) {
      const principal = loan - down + fee;
      const n = years * 12;
      const monthlyPayment = calcMonthlyPayment(principal, rate, n);
      const { totalPaid, totalInterest } = calcTotalPaid(
        principal,
        rate,
        monthlyPayment,
        n
      );

      // With extra payment
      const totalMonthly = monthlyPayment + extra;
      const monthsToPayoff = calcMonthsToPayoff(principal, rate, totalMonthly);
      const { totalPaid: totalPaidExtra } = calcTotalPaid(
        principal,
        rate,
        totalMonthly,
        monthsToPayoff
      );
      const savingsWithExtra = totalPaid - totalPaidExtra;

      setResult({
        monthlyPayment,
        totalPaid,
        totalInterest,
        monthsToPayoff,
        savingsWithExtra,
      });
    } else {
      setResult(null);
    }
  };

  return (
    <div className="mt-8 md:mt-12 mx-auto h-full w-10/12 md:w-11/12">
      <h1>Loan Payment & Student Loan Repayment Calculator</h1>
      <p className="mb-4">
        <strong>
          Estimate your monthly loan payment, total interest, and see how extra
          payments can help you pay off your loan faster and save money.
        </strong>
      </p>
      <section className="mb-8">
        <h2>How Does This Calculator Work?</h2>
        <p>
          Enter your loan amount, interest rate, loan term, down payment, fees,
          and any extra monthly payment. The calculator estimates your monthly
          payment, total paid, total interest, and how much faster you can pay
          off your loan with extra payments.
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
                <td className="px-3 py-2 border">Loan Amount ($)</td>
                <td className="px-3 py-2 border">$5,000 - $50,000</td>
                <td className="px-3 py-2 border">
                  Student, auto, or personal loan
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Interest Rate (%)</td>
                <td className="px-3 py-2 border">3% - 8%</td>
                <td className="px-3 py-2 border">
                  Federal student loan avg: 5.5%
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Loan Term (years)</td>
                <td className="px-3 py-2 border">5 - 20</td>
                <td className="px-3 py-2 border">
                  Standard student loan: 10 years
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Down Payment ($)</td>
                <td className="px-3 py-2 border">$0 - $5,000</td>
                <td className="px-3 py-2 border">Reduces amount borrowed</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Fees ($)</td>
                <td className="px-3 py-2 border">$0 - $500</td>
                <td className="px-3 py-2 border">
                  Origination or processing fees
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Extra Payment ($/mo)</td>
                <td className="px-3 py-2 border">$0 - $200</td>
                <td className="px-3 py-2 border">
                  Speeds up payoff, saves interest
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mb-6">
          <h3>Loan & Repayment Details</h3>
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
                <td className="px-3 py-2 border">Total borrowed</td>
                <td className="px-3 py-2 border">$20,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Interest Rate</td>
                <td className="px-3 py-2 border">Annual rate charged</td>
                <td className="px-3 py-2 border">6%</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Loan Term</td>
                <td className="px-3 py-2 border">Repayment period in years</td>
                <td className="px-3 py-2 border">10</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Monthly Payment</td>
                <td className="px-3 py-2 border">Amount due each month</td>
                <td className="px-3 py-2 border">$222</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Total Paid</td>
                <td className="px-3 py-2 border">Sum of all payments</td>
                <td className="px-3 py-2 border">$26,645</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Total Interest</td>
                <td className="px-3 py-2 border">Interest paid over loan</td>
                <td className="px-3 py-2 border">$6,645</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">
                  Months to Payoff (with extra)
                </td>
                <td className="px-3 py-2 border">
                  Time to pay off with extra payment
                </td>
                <td className="px-3 py-2 border">91</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Savings with Extra Payment</td>
                <td className="px-3 py-2 border">
                  Interest saved by paying extra
                </td>
                <td className="px-3 py-2 border">$1,200</td>
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
                <td className="px-3 py-2 border">Loan Amount</td>
                <td className="px-3 py-2 border">$20,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Interest Rate</td>
                <td className="px-3 py-2 border">6%</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Loan Term</td>
                <td className="px-3 py-2 border">10 years</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Monthly Payment</td>
                <td className="px-3 py-2 border">$222</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Total Paid</td>
                <td className="px-3 py-2 border">$26,645</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Total Interest</td>
                <td className="px-3 py-2 border">$6,645</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Extra Payment</td>
                <td className="px-3 py-2 border">$50</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">
                  Months to Payoff (with extra)
                </td>
                <td className="px-3 py-2 border">91</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Savings with Extra Payment</td>
                <td className="px-3 py-2 border">$1,200</td>
              </tr>
            </tbody>
          </table>
          <p className="text-sm">
            <strong>Source:</strong> Federal Student Aid, Bankrate, 2024
            averages.
          </p>
        </div>
        <div className="mb-6">
          <h3>Tips for Beginners</h3>
          <ul className="list-disc list-inside">
            <li>
              Paying extra each month can save you thousands in interest and
              shorten your loan term.
            </li>
            <li>
              Federal student loans have fixed rates and flexible repayment
              options.
            </li>
            <li>Private loans may have higher rates and fewer protections.</li>
            <li>
              Always check for prepayment penalties before making extra
              payments.
            </li>
            <li>
              Consult your loan servicer or a financial advisor for personalized
              advice.
            </li>
          </ul>
        </div>
      </section>
      <div className="mb-8">
        <h3>Loan Inputs</h3>
        <div className="gap-4 grid md:grid-cols-3">
          <div className="mb-2">
            <label className="block mb-1 font-medium">Loan Amount ($):</label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              placeholder="e.g., 20000"
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
              placeholder="e.g., 6"
              min="0"
              max="100"
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
              placeholder="e.g., 10"
              min="1"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">Down Payment ($):</label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={downPayment}
              onChange={(e) => setDownPayment(e.target.value)}
              placeholder="e.g., 1000"
              min="0"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">Fees ($):</label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={fees}
              onChange={(e) => setFees(e.target.value)}
              placeholder="e.g., 200"
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
              placeholder="e.g., 50"
              min="0"
            />
          </div>
        </div>
      </div>
      <Button className="mt-2 px-4 py-2 rounded" onClick={handleCalculate}>
        Calculate Loan Payment
      </Button>
      {result && (
        <div className="flex flex-col gap-4 mt-6">
          <div className="shadow p-4 border rounded-lg">
            <h3>Results</h3>
            <table className="border border-gray-300 min-w-full text-sm">
              <tbody>
                <tr>
                  <td className="px-3 py-2 border font-medium">
                    Monthly Payment
                  </td>
                  <td className="px-3 py-2 border">
                    $
                    {result.monthlyPayment.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
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
                    Months to Payoff (with extra)
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
                    Savings with Extra Payment
                  </td>
                  <td className="px-3 py-2 border font-bold">
                    $
                    {result.savingsWithExtra.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="mt-2 text-sm">
              <strong>Note:</strong> This calculator provides estimates. Actual
              results may vary based on your loan terms and payment habits.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
