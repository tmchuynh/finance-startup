"use client";
import { useState } from "react";

type MortgageInput = {
  label: string;
  loanAmount: string;
  interestRate: string;
  loanTerm: string;
  downPayment: string;
};

export default function MortgageComparisonCalculator() {
  const [mortgages, setMortgages] = useState<MortgageInput[]>([
    {
      label: "Option 1",
      loanAmount: "",
      interestRate: "6.5",
      loanTerm: "30",
      downPayment: "20",
    },
    {
      label: "Option 2",
      loanAmount: "",
      interestRate: "7",
      loanTerm: "30",
      downPayment: "20",
    },
  ]);
  const [result, setResult] = useState<
    { monthly: number; total: number; totalInterest: number }[] | null
  >(null);

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

  const handleInputChange = (
    idx: number,
    field: keyof MortgageInput,
    value: string
  ) => {
    setMortgages((prev) =>
      prev.map((m, i) => (i === idx ? { ...m, [field]: value } : m))
    );
  };

  const handleAddOption = () => {
    setMortgages((prev) => [
      ...prev,
      {
        label: `Option ${prev.length + 1}`,
        loanAmount: "",
        interestRate: "6.5",
        loanTerm: "30",
        downPayment: "20",
      },
    ]);
  };

  const handleRemoveOption = (idx: number) => {
    setMortgages((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleCalculate = () => {
    const res = mortgages.map((m) => {
      const loan = parseFloat(m.loanAmount);
      const rate = parseFloat(m.interestRate);
      const term = parseFloat(m.loanTerm);
      if (
        !isNaN(loan) &&
        !isNaN(rate) &&
        !isNaN(term) &&
        loan > 0 &&
        rate >= 0 &&
        term > 0
      ) {
        const monthly = calcMonthlyPayment(loan, rate, term);
        const total = monthly * term * 12;
        const totalInterest = total - loan;
        return { monthly, total, totalInterest };
      }
      return { monthly: NaN, total: NaN, totalInterest: NaN };
    });
    setResult(res);
  };

  return (
    <div className="mx-auto mt-8 md:mt-12 w-10/12 md:w-11/12 h-full">
      <h1>Mortgage Comparison Calculator</h1>
      <p className="mb-4">
        <strong>
          Compare different mortgage options side by side to see which is best
          for you. Enter loan amounts, rates, terms, and down payments for each
          option.
        </strong>
      </p>
      <section className="mb-8">
        <h2>How Does This Calculator Work?</h2>
        <p>
          Enter the details for each mortgage option you want to compare. The
          calculator will show the monthly payment, total cost, and total
          interest for each option.
        </p>
        <div className="my-6">
          <h3>Tips for Beginners</h3>
          <ul className="list-disc list-inside">
            <li>Compare at least two options before choosing a mortgage.</li>
            <li>Lower rates and shorter terms reduce total interest paid.</li>
            <li>Consider taxes, insurance, and PMI (not included here).</li>
            <li>Ask about closing costs and lender fees.</li>
            <li>Consult a mortgage professional for personalized advice.</li>
          </ul>
        </div>
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
                <td className="px-3 py-2 border">$300,000 - $600,000</td>
                <td className="px-3 py-2 border">
                  Typical U.S. mortgage (2024)
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Interest Rate (%)</td>
                <td className="px-3 py-2 border">6% - 7%</td>
                <td className="px-3 py-2 border">2024 average: ~6.5%</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Loan Term (years)</td>
                <td className="px-3 py-2 border">15 or 30</td>
                <td className="px-3 py-2 border">30-year is most common</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Down Payment (%)</td>
                <td className="px-3 py-2 border">20%</td>
                <td className="px-3 py-2 border">
                  Standard for conventional loans
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mb-4">
          <h3>Mortgage Options</h3>
          {mortgages.map((m, idx) => (
            <div
              key={idx}
              className="flex md:flex-row flex-col items-end gap-2 mb-2"
            >
              <div className="flex-1">
                <label className="block mb-1 font-medium">Label:</label>
                <input
                  type="text"
                  className="px-2 py-1 border rounded w-full"
                  value={m.label}
                  onChange={(e) =>
                    handleInputChange(idx, "label", e.target.value)
                  }
                  placeholder={`Option ${idx + 1}`}
                />
              </div>
              <div className="flex-1">
                <label className="block mb-1 font-medium">
                  Loan Amount ($):
                </label>
                <input
                  type="number"
                  className="px-2 py-1 border rounded w-full"
                  value={m.loanAmount}
                  onChange={(e) =>
                    handleInputChange(idx, "loanAmount", e.target.value)
                  }
                  placeholder="e.g., 400000"
                  min="0"
                />
              </div>
              <div className="flex-1">
                <label className="block mb-1 font-medium">
                  Interest Rate (%):
                </label>
                <input
                  type="number"
                  className="px-2 py-1 border rounded w-full"
                  value={m.interestRate}
                  onChange={(e) =>
                    handleInputChange(idx, "interestRate", e.target.value)
                  }
                  placeholder="e.g., 6.5"
                  min="0"
                  step="0.01"
                />
              </div>
              <div className="flex-1">
                <label className="block mb-1 font-medium">
                  Loan Term (years):
                </label>
                <input
                  type="number"
                  className="px-2 py-1 border rounded w-full"
                  value={m.loanTerm}
                  onChange={(e) =>
                    handleInputChange(idx, "loanTerm", e.target.value)
                  }
                  placeholder="e.g., 30"
                  min="1"
                />
              </div>
              <div className="flex-1">
                <label className="block mb-1 font-medium">
                  Down Payment (%):
                </label>
                <input
                  type="number"
                  className="px-2 py-1 border rounded w-full"
                  value={m.downPayment}
                  onChange={(e) =>
                    handleInputChange(idx, "downPayment", e.target.value)
                  }
                  placeholder="e.g., 20"
                  min="0"
                  max="100"
                  step="0.01"
                />
              </div>
              <div>
                {mortgages.length > 2 && (
                  <button
                    className="bg-red-500 ml-2 px-2 py-1 rounded text-white"
                    onClick={() => handleRemoveOption(idx)}
                    type="button"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))}
          <button
            className="bg-green-600 mt-2 px-3 py-1 rounded text-white"
            onClick={handleAddOption}
            type="button"
          >
            Add Option
          </button>
        </div>
        <button
          className="bg-blue-600 mt-2 px-4 py-2 rounded text-white"
          onClick={handleCalculate}
        >
          Compare Mortgages
        </button>
        {result && (
          <div className="flex flex-col gap-4 mt-6">
            <div className="bg-white shadow p-4 border rounded-lg">
              <h3 className="mb-2 font-semibold">Comparison Results</h3>
              <table className="border border-gray-300 min-w-full text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-3 py-2 border text-left">Option</th>
                    <th className="px-3 py-2 border text-left">
                      Monthly Payment
                    </th>
                    <th className="px-3 py-2 border text-left">Total Cost</th>
                    <th className="px-3 py-2 border text-left">
                      Total Interest
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {result.map((r, i) => (
                    <tr key={i}>
                      <td className="px-3 py-2 border">{mortgages[i].label}</td>
                      <td className="px-3 py-2 border">
                        {isNaN(r.monthly)
                          ? "-"
                          : `$${r.monthly.toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}`}
                      </td>
                      <td className="px-3 py-2 border">
                        {isNaN(r.total)
                          ? "-"
                          : `$${r.total.toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}`}
                      </td>
                      <td className="px-3 py-2 border">
                        {isNaN(r.totalInterest)
                          ? "-"
                          : `$${r.totalInterest.toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-2 text-gray-600 text-sm">
                <strong>Note:</strong> This calculator compares principal and
                interest only. Taxes, insurance, and PMI are not included.
              </div>
            </div>
          </div>
        )}
        <div className="my-6">
          <h3>Real Data Example (2024)</h3>
          <table className="mb-4 border border-gray-300 min-w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-3 py-2 border text-left">Scenario</th>
                <th className="px-3 py-2 border text-left">Option 1</th>
                <th className="px-3 py-2 border text-left">Option 2</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-3 py-2 border">Loan Amount</td>
                <td className="px-3 py-2 border">$400,000</td>
                <td className="px-3 py-2 border">$400,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Interest Rate</td>
                <td className="px-3 py-2 border">6.5%</td>
                <td className="px-3 py-2 border">7.0%</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Loan Term</td>
                <td className="px-3 py-2 border">30 years</td>
                <td className="px-3 py-2 border">30 years</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Monthly Payment</td>
                <td className="px-3 py-2 border">$2,528</td>
                <td className="px-3 py-2 border">$2,661</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Total Interest</td>
                <td className="px-3 py-2 border">$511,000</td>
                <td className="px-3 py-2 border">$558,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Total Cost</td>
                <td className="px-3 py-2 border">$911,000</td>
                <td className="px-3 py-2 border">$958,000</td>
              </tr>
            </tbody>
          </table>
          <p className="text-gray-600 text-sm">
            <strong>Source:</strong> Bankrate, Freddie Mac, 2024 averages.
          </p>
        </div>
        <div className="mb-6">
          <h3>Mortgage Comparison Details</h3>
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
                  Amount borrowed after down payment
                </td>
                <td className="px-3 py-2 border">$400,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Interest Rate</td>
                <td className="px-3 py-2 border">
                  Annual rate charged by lender
                </td>
                <td className="px-3 py-2 border">6.5%</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Loan Term</td>
                <td className="px-3 py-2 border">Years to repay the loan</td>
                <td className="px-3 py-2 border">30</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Down Payment</td>
                <td className="px-3 py-2 border">
                  Percent of home price paid upfront
                </td>
                <td className="px-3 py-2 border">20%</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Monthly Payment</td>
                <td className="px-3 py-2 border">Principal & interest only</td>
                <td className="px-3 py-2 border">$2,528</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Total Interest</td>
                <td className="px-3 py-2 border">
                  Interest paid over the life of the loan
                </td>
                <td className="px-3 py-2 border">$511,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Total Cost</td>
                <td className="px-3 py-2 border">Monthly × term × 12</td>
                <td className="px-3 py-2 border">$911,000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
