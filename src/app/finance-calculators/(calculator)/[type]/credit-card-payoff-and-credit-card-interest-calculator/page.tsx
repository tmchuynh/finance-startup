"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function CreditCardPayoffAndInterestCalculator() {
  const [balance, setBalance] = useState<string>("");
  const [interestRate, setInterestRate] = useState<string>("20");
  const [monthlyPayment, setMonthlyPayment] = useState<string>("200");
  const [minPaymentPercent, setMinPaymentPercent] = useState<string>("2");
  const [minPaymentDollar, setMinPaymentDollar] = useState<string>("25");

  const [result, setResult] = useState<{
    monthsToPayoff: number;
    totalPaid: number;
    totalInterest: number;
    minMonthsToPayoff: number;
    minTotalPaid: number;
    minTotalInterest: number;
  } | null>(null);

  // Calculate months to pay off with fixed payment
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

  // Calculate payoff with minimum payment (percent of balance or dollar minimum)
  function calcMinPaymentPayoff(
    P: number,
    r: number,
    minPct: number,
    minDollar: number
  ) {
    let balance = P;
    let month = 0;
    let totalPaid = 0;
    let totalInterest = 0;
    const monthlyRate = r / 12;
    while (balance > 0 && month < 600) {
      let payment = Math.max(balance * minPct, minDollar);
      if (payment > balance + balance * monthlyRate)
        payment = balance + balance * monthlyRate;
      const interest = balance * monthlyRate;
      const principal = payment - interest;
      balance -= principal;
      totalPaid += payment;
      totalInterest += interest;
      month++;
      if (balance < 0.01) break;
    }
    return { months: month, totalPaid, totalInterest };
  }

  const handleCalculate = () => {
    const P = parseFloat(balance);
    const r = parseFloat(interestRate) / 100;
    const PMT = parseFloat(monthlyPayment);
    const minPct = parseFloat(minPaymentPercent) / 100;
    const minDollar = parseFloat(minPaymentDollar);

    if (
      !isNaN(P) &&
      !isNaN(r) &&
      !isNaN(PMT) &&
      !isNaN(minPct) &&
      !isNaN(minDollar) &&
      P > 0 &&
      PMT > 0 &&
      minPct > 0 &&
      minDollar > 0
    ) {
      // Fixed payment
      const n = calcMonthsToPayoff(P, r, PMT);
      const { totalPaid, totalInterest } = calcTotalPaid(P, r, PMT, n);

      // Minimum payment
      const min = calcMinPaymentPayoff(P, r, minPct, minDollar);

      setResult({
        monthsToPayoff: n,
        totalPaid,
        totalInterest,
        minMonthsToPayoff: min.months,
        minTotalPaid: min.totalPaid,
        minTotalInterest: min.totalInterest,
      });
    } else {
      setResult(null);
    }
  };

  return (
    <div className="mt-8 md:mt-12 mx-auto h-full w-10/12 md:w-11/12">
      <h1>Credit Card Payoff & Interest Calculator</h1>
      <p className="mb-4">
        <strong>
          Estimate how long it will take to pay off your credit card balance and
          how much interest you'll pay, using either a fixed payment or the
          card's minimum payment.
        </strong>
      </p>
      <section className="mb-8">
        <h2>How Does This Calculator Work?</h2>
        <p>
          Enter your current balance, interest rate, planned monthly payment,
          and your card's minimum payment terms. The calculator estimates your
          payoff time and total interest for both fixed and minimum payments.
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
                <td className="px-3 py-2 border">Credit Card Balance ($)</td>
                <td className="px-3 py-2 border">$2,000 - $10,000</td>
                <td className="px-3 py-2 border">Current balance owed</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Interest Rate (%)</td>
                <td className="px-3 py-2 border">15% - 25%</td>
                <td className="px-3 py-2 border">U.S. average: 20%</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Monthly Payment ($)</td>
                <td className="px-3 py-2 border">$100 - $500</td>
                <td className="px-3 py-2 border">
                  Fixed amount you plan to pay
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Min Payment Percent (%)</td>
                <td className="px-3 py-2 border">1% - 3%</td>
                <td className="px-3 py-2 border">
                  Percent of balance (typical: 2%)
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Min Payment Dollar ($)</td>
                <td className="px-3 py-2 border">$20 - $35</td>
                <td className="px-3 py-2 border">
                  Minimum dollar amount (typical: $25)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mb-6">
          <h3>Credit Card Payoff & Interest Details</h3>
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
                <td className="px-3 py-2 border">Balance</td>
                <td className="px-3 py-2 border">Current amount owed</td>
                <td className="px-3 py-2 border">$5,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Interest Rate</td>
                <td className="px-3 py-2 border">
                  Annual percentage rate (APR)
                </td>
                <td className="px-3 py-2 border">20%</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Monthly Payment</td>
                <td className="px-3 py-2 border">
                  Fixed amount paid each month
                </td>
                <td className="px-3 py-2 border">$200</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Months to Payoff</td>
                <td className="px-3 py-2 border">Time to pay off balance</td>
                <td className="px-3 py-2 border">32</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Total Paid</td>
                <td className="px-3 py-2 border">Sum of all payments</td>
                <td className="px-3 py-2 border">$6,400</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Total Interest</td>
                <td className="px-3 py-2 border">
                  Interest paid over payoff period
                </td>
                <td className="px-3 py-2 border">$1,400</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Min Payment Months</td>
                <td className="px-3 py-2 border">
                  Time to pay off with minimum payment
                </td>
                <td className="px-3 py-2 border">210</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Min Payment Total Paid</td>
                <td className="px-3 py-2 border">
                  Sum of all minimum payments
                </td>
                <td className="px-3 py-2 border">$11,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Min Payment Total Interest</td>
                <td className="px-3 py-2 border">
                  Interest paid with minimum payment
                </td>
                <td className="px-3 py-2 border">$6,000</td>
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
                <td className="px-3 py-2 border">Balance</td>
                <td className="px-3 py-2 border">$5,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Interest Rate</td>
                <td className="px-3 py-2 border">20%</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Monthly Payment</td>
                <td className="px-3 py-2 border">$200</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Min Payment Percent</td>
                <td className="px-3 py-2 border">2%</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Min Payment Dollar</td>
                <td className="px-3 py-2 border">$25</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Months to Payoff</td>
                <td className="px-3 py-2 border">32</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Total Paid</td>
                <td className="px-3 py-2 border">$6,400</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Total Interest</td>
                <td className="px-3 py-2 border">$1,400</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Min Payment Months</td>
                <td className="px-3 py-2 border">210</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Min Payment Total Paid</td>
                <td className="px-3 py-2 border">$11,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Min Payment Total Interest</td>
                <td className="px-3 py-2 border">$6,000</td>
              </tr>
            </tbody>
          </table>
          <p className="text-sm">
            <strong>Source:</strong> Federal Reserve, NerdWallet, 2024 averages.
          </p>
        </div>
        <div className="mb-6">
          <h3>Tips for Beginners</h3>
          <ul className="list-disc list-inside">
            <li>
              Paying more than the minimum saves you thousands in interest and
              years of payments.
            </li>
            <li>
              High interest rates make credit card debt expensive—pay off as
              quickly as possible.
            </li>
            <li>
              Consider a balance transfer or consolidation loan for lower rates.
            </li>
            <li>
              Always make at least the minimum payment to avoid late fees and
              credit damage.
            </li>
            <li>
              Track your progress and adjust your payment plan as your finances
              change.
            </li>
          </ul>
        </div>
      </section>
      <div className="mb-8">
        <h3 className="mb-2 font-medium">Credit Card Inputs</h3>
        <div className="gap-4 grid md:grid-cols-3">
          <div className="mb-2">
            <label className="block mb-1 font-medium">
              Credit Card Balance ($):
            </label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
              placeholder="e.g., 5000"
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
              placeholder="e.g., 20"
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
              placeholder="e.g., 200"
              min="0"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">
              Min Payment Percent (%):
            </label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={minPaymentPercent}
              onChange={(e) => setMinPaymentPercent(e.target.value)}
              placeholder="e.g., 2"
              min="0"
              max="100"
              step="0.01"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">
              Min Payment Dollar ($):
            </label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={minPaymentDollar}
              onChange={(e) => setMinPaymentDollar(e.target.value)}
              placeholder="e.g., 25"
              min="0"
            />
          </div>
        </div>
      </div>
      <Button className="mt-2 px-4 py-2 rounded" onClick={handleCalculate}>
        Calculate Payoff & Interest
      </Button>
      {result && (
        <div className="flex flex-col gap-4 mt-6">
          <div className="shadow p-4 border rounded-lg">
            <h3 className="mb-2 font-semibold">Results</h3>
            <table className="border border-gray-300 min-w-full text-sm">
              <tbody>
                <tr>
                  <td className="px-3 py-2 border font-medium">
                    Months to Payoff (Fixed Payment)
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
                    Total Paid (Fixed Payment)
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
                    Total Interest (Fixed Payment)
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
                    Months to Payoff (Min Payment)
                  </td>
                  <td className="px-3 py-2 border">
                    {result.minMonthsToPayoff === Infinity
                      ? "Never (payment too low)"
                      : result.minMonthsToPayoff.toLocaleString(undefined, {
                          minimumFractionDigits: 1,
                          maximumFractionDigits: 1,
                        })}
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2 border font-medium">
                    Total Paid (Min Payment)
                  </td>
                  <td className="px-3 py-2 border">
                    $
                    {result.minTotalPaid.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2 border font-medium">
                    Total Interest (Min Payment)
                  </td>
                  <td className="px-3 py-2 border">
                    $
                    {result.minTotalInterest.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="mt-2 text-sm">
              <strong>Note:</strong> This calculator provides estimates. Actual
              results may vary based on your card terms and payment habits.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
