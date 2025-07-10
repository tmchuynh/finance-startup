"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function HomeAffordabilityCalculator() {
  const [annualIncome, setAnnualIncome] = useState<string>("");
  const [downPayment, setDownPayment] = useState<string>("");
  const [monthlyDebts, setMonthlyDebts] = useState<string>("");
  const [interestRate, setInterestRate] = useState<string>("");
  const [loanTerm, setLoanTerm] = useState<string>("30");
  const [result, setResult] = useState<number | null>(null);

  // Helper function to calculate maximum affordable home price
  const handleCalculate = () => {
    const income = parseFloat(annualIncome);
    const down = parseFloat(downPayment);
    const debts = parseFloat(monthlyDebts);
    const rate = parseFloat(interestRate) / 100 / 12;
    const years = parseFloat(loanTerm);

    if (
      !isNaN(income) &&
      !isNaN(down) &&
      !isNaN(debts) &&
      !isNaN(rate) &&
      !isNaN(years) &&
      income > 0 &&
      down >= 0 &&
      debts >= 0 &&
      rate > 0 &&
      years > 0
    ) {
      // 28% rule for housing expenses (PITI)
      const maxHousing = (income / 12) * 0.28;
      // 36% rule for total debts (including housing)
      const maxTotalDebt = (income / 12) * 0.36 - debts;
      // Use the lower of the two
      const affordablePayment = Math.min(maxHousing, maxTotalDebt);

      // Mortgage calculation (principal only, for simplicity)
      const n = years * 12;
      const maxLoan = (affordablePayment * (1 - Math.pow(1 + rate, -n))) / rate;
      const maxHomePrice = maxLoan + down;

      setResult(maxHomePrice > 0 ? maxHomePrice : 0);
    } else {
      setResult(null);
    }
  };

  return (
    <div className="mt-8 md:mt-12 mx-auto h-full w-10/12 md:w-11/12">
      <h1>Home Affordability Calculator</h1>
      <p className="mb-4">
        <strong>
          Find out how much house you can afford based on your income, debts,
          down payment, and loan details.
        </strong>
      </p>
      <section className="mb-8">
        <h2>What is Home Affordability?</h2>
        <p>
          Home affordability is the maximum price of a home you can comfortably
          purchase without stretching your finances too thin. Lenders use your
          income, debts, down payment, and loan terms to determine this amount.
        </p>
        <div className="mb-6">
          <h3>Key Factors That Affect Home Affordability</h3>
          <table className="mb-4 border border-gray-300 min-w-full text-sm">
            <thead>
              <tr className="">
                <th className="px-3 py-2 border text-left">Factor</th>
                <th className="px-3 py-2 border text-left">Description</th>
                <th className="px-3 py-2 border text-left">Why It Matters</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-3 py-2 border">Annual Income</td>
                <td className="px-3 py-2 border">
                  Your total pre-tax income per year.
                </td>
                <td className="px-3 py-2 border">
                  Determines how much you can borrow and repay.
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Down Payment</td>
                <td className="px-3 py-2 border">
                  The amount you pay upfront for the home.
                </td>
                <td className="px-3 py-2 border">
                  Reduces the loan amount and may lower your interest rate.
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Monthly Debts</td>
                <td className="px-3 py-2 border">
                  Total of your monthly debt payments (credit cards, car loans,
                  etc.).
                </td>
                <td className="px-3 py-2 border">
                  Lenders want to ensure you can manage all debts, not just your
                  mortgage.
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Interest Rate</td>
                <td className="px-3 py-2 border">
                  The annual rate charged by your lender, expressed as a
                  percentage.
                </td>
                <td className="px-3 py-2 border">
                  Affects your monthly payment and total loan cost.
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Loan Term</td>
                <td className="px-3 py-2 border">
                  The number of years you have to repay the loan (e.g., 30
                  years).
                </td>
                <td className="px-3 py-2 border">
                  Longer terms mean lower payments but more interest paid over
                  time.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mb-6">
          <h3>Common Rules Lenders Use</h3>
          <ul className="mb-2 list-disc list-inside">
            <li>
              <strong>28% Rule:</strong> Your monthly housing costs (including
              mortgage, taxes, insurance) should not exceed 28% of your gross
              monthly income.
            </li>
            <li>
              <strong>36% Rule:</strong> Your total monthly debts (including
              housing, car loans, credit cards, etc.) should not exceed 36% of
              your gross monthly income.
            </li>
          </ul>
          <table className="border border-gray-300 min-w-full text-sm">
            <thead>
              <tr className="">
                <th className="px-3 py-2 border text-left">Rule</th>
                <th className="px-3 py-2 border text-left">Calculation</th>
                <th className="px-3 py-2 border text-left">
                  Example (Annual Income: $60,000)
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-3 py-2 border">28% Rule</td>
                <td className="px-3 py-2 border">
                  $60,000 / 12 × 0.28 = $1,400/month
                </td>
                <td className="px-3 py-2 border">
                  Max housing payment: $1,400/month
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">36% Rule</td>
                <td className="px-3 py-2 border">
                  $60,000 / 12 × 0.36 = $1,800/month
                </td>
                <td className="px-3 py-2 border">
                  Max total debt payments: $1,800/month
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mb-6">
          <h3>Step-by-Step Example</h3>
          <ol className="mb-2 list-decimal list-inside">
            <li>Enter your annual income before taxes.</li>
            <li>Enter your expected down payment amount.</li>
            <li>
              List your total monthly debt payments (car, credit cards, etc.).
            </li>
            <li>Enter the expected interest rate for your mortgage.</li>
            <li>Choose your loan term (usually 30 years).</li>
            <li>
              Click "Calculate" to see the maximum home price you can afford.
            </li>
          </ol>
        </div>
        <div className="mb-6">
          <h3>Formula Used</h3>
          <p className="">
            <code className="px-2 py-1 rounded text-sm">
              Maximum Home Price = Maximum Affordable Loan + Down Payment
            </code>
          </p>
          <p className="mt-2 text-sm">
            The maximum affordable loan is calculated using the lower of the 28%
            and 36% rules, then applying the standard mortgage formula.
          </p>
        </div>
        <div className="mb-6">
          <h3>Tips for Beginners</h3>
          <ul className="list-disc list-inside">
            <li>Be realistic about your monthly expenses and debts.</li>
            <li>
              Remember to budget for property taxes, insurance, and maintenance.
            </li>
            <li>
              A larger down payment can help you afford a more expensive home or
              lower your monthly payment.
            </li>
            <li>Interest rates can change—shop around for the best rate.</li>
            <li>
              Consult with a financial advisor or mortgage professional for
              personalized advice.
            </li>
          </ul>
        </div>
      </section>
      <div className="gap-4 grid md:grid-cols-2">
        <div className="mb-2">
          <label className="block mb-1 font-medium">
            Annual Income (before taxes) ($):
          </label>
          <input
            type="number"
            className="px-2 py-1 border rounded w-full"
            value={annualIncome}
            onChange={(e) => setAnnualIncome(e.target.value)}
            placeholder="Enter your annual income"
            min="0"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1 font-medium">Down Payment ($):</label>
          <input
            type="number"
            className="px-2 py-1 border rounded w-full"
            value={downPayment}
            onChange={(e) => setDownPayment(e.target.value)}
            placeholder="Enter your down payment"
            min="0"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1 font-medium">
            Total Monthly Debts ($):
          </label>
          <input
            type="number"
            className="px-2 py-1 border rounded w-full"
            value={monthlyDebts}
            onChange={(e) => setMonthlyDebts(e.target.value)}
            placeholder="Enter your total monthly debts"
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
            placeholder="Enter expected interest rate"
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
            placeholder="Enter loan term (e.g., 30)"
            min="1"
          />
        </div>
      </div>
      <Button className="mt-2 px-4 py-2 rounded" onClick={handleCalculate}>
        Calculate Home Affordability
      </Button>
      {result !== null && (
        <div className="flex flex-col gap-4 mt-6">
          <div className="shadow p-4 border rounded-lg">
            <strong>Estimated Maximum Home Price You Can Afford:</strong>{" "}
            <span className="text-lg">
              $
              {result.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
