"use client";
import { useState } from "react";

export default function MortgageInterestDeductionCalculator() {
  const [loanAmount, setLoanAmount] = useState<string>("");
  const [interestRate, setInterestRate] = useState<string>("6.5");
  const [loanTerm, setLoanTerm] = useState<string>("30");
  const [yearsPaid, setYearsPaid] = useState<string>("1");
  const [filingStatus, setFilingStatus] = useState<string>("single");
  const [itemizedDeductions, setItemizedDeductions] = useState<string>("0");
  const [result, setResult] = useState<{
    interestPaid: number;
    deduction: number;
    standardDeduction: number;
    taxBenefit: number;
    useItemized: boolean;
  } | null>(null);

  // 2024 standard deduction values
  const STANDARD_DEDUCTION = {
    single: 14600,
    married: 29200,
    head: 21900,
  };

  // 2024 average marginal tax rates (for illustration)
  const TAX_RATE = {
    single: 0.22,
    married: 0.22,
    head: 0.22,
  };

  function calcInterestPaid(
    principal: number,
    rate: number,
    years: number,
    paidYears: number
  ) {
    // Calculate interest paid in the most recent year
    const r = rate / 100 / 12;
    const n = years * 12;
    const monthly = (principal * r) / (1 - Math.pow(1 + r, -n));
    let balance = principal;
    let interestPaid = 0;
    const startMonth = (paidYears - 1) * 12;
    const endMonth = paidYears * 12;
    for (let i = 0; i < endMonth; i++) {
      const interest = balance * r;
      if (i >= startMonth) interestPaid += interest;
      const principalPaid = monthly - interest;
      balance -= principalPaid;
      if (balance < 0) break;
    }
    return interestPaid;
  }

  const handleCalculate = () => {
    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate);
    const term = parseFloat(loanTerm);
    const paidYears = parseFloat(yearsPaid);
    const itemized = parseFloat(itemizedDeductions);
    const status = filingStatus as keyof typeof STANDARD_DEDUCTION;

    if (
      !isNaN(principal) &&
      !isNaN(rate) &&
      !isNaN(term) &&
      !isNaN(paidYears) &&
      !isNaN(itemized) &&
      principal > 0 &&
      rate > 0 &&
      term > 0 &&
      paidYears > 0 &&
      paidYears <= term &&
      itemized >= 0
    ) {
      const interestPaid = calcInterestPaid(principal, rate, term, paidYears);
      const totalItemized = interestPaid + itemized;
      const standardDeduction = STANDARD_DEDUCTION[status];
      const useItemized = totalItemized > standardDeduction;
      const deduction = useItemized ? totalItemized : standardDeduction;
      const taxBenefit = deduction * TAX_RATE[status];
      setResult({
        interestPaid,
        deduction,
        standardDeduction,
        taxBenefit,
        useItemized,
      });
    } else {
      setResult(null);
    }
  };

  return (
    <div className="mt-8 md:mt-12 mx-auto h-full w-10/12 md:w-11/12">
      <h1>Mortgage Interest Deduction Calculator</h1>
      <p className="mb-4">
        <strong>
          Estimate your potential tax savings from deducting mortgage interest
          on your federal income tax return.
        </strong>
      </p>
      <section className="mb-8">
        <h2>How Does This Calculator Work?</h2>
        <p>
          Enter your mortgage details and other itemized deductions. The
          calculator estimates your mortgage interest deduction, compares it to
          the standard deduction, and shows your potential tax benefit.
        </p>
        <div className="my-6">
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
                <td className="px-3 py-2 border">30</td>
                <td className="px-3 py-2 border">Most common in U.S.</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Year of Loan</td>
                <td className="px-3 py-2 border">1 - 10</td>
                <td className="px-3 py-2 border">
                  Interest is highest in early years
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Filing Status</td>
                <td className="px-3 py-2 border">Single / Married / Head</td>
                <td className="px-3 py-2 border">Affects standard deduction</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">
                  Other Itemized Deductions ($)
                </td>
                <td className="px-3 py-2 border">$0 - $10,000</td>
                <td className="px-3 py-2 border">State taxes, charity, etc.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="gap-4 grid md:grid-cols-3">
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
            <label className="block mb-1 font-medium">Year of Loan:</label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={yearsPaid}
              onChange={(e) => setYearsPaid(e.target.value)}
              placeholder="e.g., 1"
              min="1"
              max={loanTerm}
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">Filing Status:</label>
            <select
              className="px-2 py-1 border rounded w-full"
              value={filingStatus}
              onChange={(e) => setFilingStatus(e.target.value)}
            >
              <option value="single">Single</option>
              <option value="married">Married Filing Jointly</option>
              <option value="head">Head of Household</option>
            </select>
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">
              Other Itemized Deductions ($):
            </label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={itemizedDeductions}
              onChange={(e) => setItemizedDeductions(e.target.value)}
              placeholder="e.g., 5000"
              min="0"
            />
          </div>
        </div>
        <button
          className="bg-blue-600 mt-2 px-4 py-2 rounded"
          onClick={handleCalculate}
        >
          Calculate Deduction
        </button>
        {result && (
          <div className="flex flex-col gap-4 mt-6">
            <div className="shadow p-4 border rounded-lg">
              <h3 className="mb-2 font-semibold">Results</h3>
              <table className="border border-gray-300 min-w-full text-sm">
                <tbody>
                  <tr>
                    <td className="px-3 py-2 border font-medium">
                      Interest Paid (Year)
                    </td>
                    <td className="px-3 py-2 border">
                      $
                      {result.interestPaid.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border font-medium">
                      Total Deduction Used
                    </td>
                    <td className="px-3 py-2 border">
                      $
                      {result.deduction.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}{" "}
                      ({result.useItemized ? "Itemized" : "Standard"})
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border font-medium">
                      Standard Deduction
                    </td>
                    <td className="px-3 py-2 border">
                      $
                      {result.standardDeduction.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border font-medium">
                      Estimated Tax Benefit
                    </td>
                    <td className="px-3 py-2 border">
                      $
                      {result.taxBenefit.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="mt-2 text-sm">
                <strong>Note:</strong> This is an estimate. Actual tax benefit
                depends on your full tax situation and IRS rules.
              </div>
            </div>
          </div>
        )}
        <div className="my-6">
          <h3>Deduction Details</h3>
          <table className="mb-4 border border-gray-300 min-w-full text-sm">
            <thead>
              <tr className="">
                <th className="px-3 py-2 border text-left">Detail</th>
                <th className="px-3 py-2 border text-left">Explanation</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-3 py-2 border">
                  Mortgage Interest Deduction
                </td>
                <td className="px-3 py-2 border">
                  You can deduct interest paid on up to $750,000 of mortgage
                  debt ($375,000 if married filing separately) for a primary or
                  secondary home (as of 2024).
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Standard Deduction</td>
                <td className="px-3 py-2 border">
                  You can only deduct mortgage interest if your total itemized
                  deductions exceed the standard deduction for your filing
                  status.
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Other Deductions</td>
                <td className="px-3 py-2 border">
                  State/local taxes, charitable donations, and medical expenses
                  may also be itemized.
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Tax Benefit</td>
                <td className="px-3 py-2 border">
                  The actual tax savings depends on your marginal tax rate and
                  whether you itemize.
                </td>
              </tr>
            </tbody>
          </table>
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
                <td className="px-3 py-2 border">Year of Loan</td>
                <td className="px-3 py-2 border">
                  Which year of the loan you are in.
                </td>
                <td className="px-3 py-2 border">1</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Filing Status</td>
                <td className="px-3 py-2 border">
                  Your tax filing status (single, married, head of household).
                </td>
                <td className="px-3 py-2 border">Single</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Other Itemized Deductions</td>
                <td className="px-3 py-2 border">
                  Other deductions you can claim (state taxes, charity, etc.)
                </td>
                <td className="px-3 py-2 border">$5,000</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mb-6">
          <h3>Tips for Beginners</h3>
          <ul className="list-disc list-inside">
            <li>
              You can only deduct mortgage interest if you itemize deductions.
            </li>
            <li>Interest is highest in the early years of your mortgage.</li>
            <li>
              Keep records of your mortgage statements and Form 1098 from your
              lender.
            </li>
            <li>Consult a tax professional for personalized advice.</li>
            <li>
              This calculator is for educational purposes only and does not
              provide tax advice.
            </li>
          </ul>
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
                <td className="px-3 py-2 border">$400,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Interest Paid (Year 1)</td>
                <td className="px-3 py-2 border">$25,700</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Other Itemized Deductions</td>
                <td className="px-3 py-2 border">$5,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Total Itemized Deductions</td>
                <td className="px-3 py-2 border">$30,700</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">
                  Standard Deduction (Single)
                </td>
                <td className="px-3 py-2 border">$14,600</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Tax Benefit (22%)</td>
                <td className="px-3 py-2 border">$6,754</td>
              </tr>
            </tbody>
          </table>
          <p className="text-sm">
            <strong>Source:</strong> IRS, Bankrate, 2024 averages.
          </p>
        </div>
      </section>
    </div>
  );
}
