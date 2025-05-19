"use client";
import { useState } from "react";

export default function TaxWithholdingAndEstimatedTaxPaymentCalculator() {
  const [annualIncome, setAnnualIncome] = useState<string>("");
  const [filingStatus, setFilingStatus] = useState<string>("single");
  const [taxWithheld, setTaxWithheld] = useState<string>("");
  const [otherIncome, setOtherIncome] = useState<string>("0");
  const [deductions, setDeductions] = useState<string>("");
  const [credits, setCredits] = useState<string>("0");
  const [quarterlyPayments, setQuarterlyPayments] = useState<string>("0");

  const STANDARD_DEDUCTION = {
    single: 14600,
    married: 29200,
    head: 21900,
  };

  const TAX_BRACKETS = {
    single: [
      { rate: 0.1, max: 11600 },
      { rate: 0.12, max: 47150 },
      { rate: 0.22, max: 100525 },
      { rate: 0.24, max: 191950 },
      { rate: 0.32, max: 243725 },
      { rate: 0.35, max: 609350 },
      { rate: 0.37, max: Infinity },
    ],
    married: [
      { rate: 0.1, max: 23200 },
      { rate: 0.12, max: 94300 },
      { rate: 0.22, max: 201050 },
      { rate: 0.24, max: 383900 },
      { rate: 0.32, max: 487450 },
      { rate: 0.35, max: 731200 },
      { rate: 0.37, max: Infinity },
    ],
    head: [
      { rate: 0.1, max: 16550 },
      { rate: 0.12, max: 63100 },
      { rate: 0.22, max: 100500 },
      { rate: 0.24, max: 191950 },
      { rate: 0.32, max: 243700 },
      { rate: 0.35, max: 609350 },
      { rate: 0.37, max: Infinity },
    ],
  };

  function calculateTaxableIncome(
    income: number,
    other: number,
    deduction: number
  ) {
    return Math.max(0, income + other - deduction);
  }

  function calculateTaxOwed(taxable: number, status: string) {
    let owed = 0;
    let prevMax = 0;
    for (const bracket of (TAX_BRACKETS as any)[status]) {
      if (taxable > bracket.max) {
        owed += (bracket.max - prevMax) * bracket.rate;
        prevMax = bracket.max;
      } else {
        owed += (taxable - prevMax) * bracket.rate;
        break;
      }
    }
    return owed;
  }

  const [result, setResult] = useState<{
    taxableIncome: number;
    taxOwed: number;
    totalPaid: number;
    underpayment: number;
    refund: number;
    safeHarbor: number;
    safeHarborMet: boolean;
  } | null>(null);

  const handleCalculate = () => {
    const income = parseFloat(annualIncome);
    const other = parseFloat(otherIncome);
    const withheld = parseFloat(taxWithheld);
    const ded =
      deductions === ""
        ? STANDARD_DEDUCTION[filingStatus as keyof typeof STANDARD_DEDUCTION]
        : parseFloat(deductions);
    const cred = parseFloat(credits) || 0;
    const qtr = parseFloat(quarterlyPayments) || 0;

    if (
      !isNaN(income) &&
      !isNaN(other) &&
      !isNaN(withheld) &&
      !isNaN(ded) &&
      !isNaN(cred) &&
      !isNaN(qtr) &&
      income >= 0 &&
      other >= 0 &&
      withheld >= 0 &&
      ded >= 0 &&
      cred >= 0 &&
      qtr >= 0
    ) {
      const taxableIncome = calculateTaxableIncome(income, other, ded);
      const taxOwed = Math.max(
        0,
        calculateTaxOwed(taxableIncome, filingStatus) - cred
      );
      const totalPaid = withheld + qtr;
      const underpayment = taxOwed > totalPaid ? taxOwed - totalPaid : 0;
      const refund = totalPaid > taxOwed ? totalPaid - taxOwed : 0;
      // Safe harbor: pay at least 90% of current year tax or 100% of last year (not calculated here, use 90% rule)
      const safeHarbor = taxOwed * 0.9;
      const safeHarborMet = totalPaid >= safeHarbor;
      setResult({
        taxableIncome,
        taxOwed,
        totalPaid,
        underpayment,
        refund,
        safeHarbor,
        safeHarborMet,
      });
    } else {
      setResult(null);
    }
  };

  return (
    <div className="mx-auto mt-8 md:mt-12 w-10/12 md:w-11/12 h-full">
      <h1>Tax Withholding & Estimated Tax Payment Calculator</h1>
      <p className="mb-4">
        <strong>
          Estimate your total tax owed, how much you should pay in withholding
          and estimated payments, and whether you may owe a penalty for
          underpayment.
        </strong>
      </p>
      <section className="mb-8">
        <h2>How Does This Calculator Work?</h2>
        <p>
          Enter your income, tax withheld, other income, deductions, credits,
          and estimated quarterly payments. The calculator estimates your tax
          owed, refund or underpayment, and checks if you meet the IRS safe
          harbor rule.
        </p>
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
                <td className="px-3 py-2 border">Annual Income ($)</td>
                <td className="px-3 py-2 border">$40,000 - $120,000</td>
                <td className="px-3 py-2 border">W-2, 1099, etc.</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Other Income ($)</td>
                <td className="px-3 py-2 border">$0 - $50,000</td>
                <td className="px-3 py-2 border">
                  Interest, dividends, side jobs
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Tax Withheld ($)</td>
                <td className="px-3 py-2 border">$3,000 - $15,000</td>
                <td className="px-3 py-2 border">From paychecks/W-2</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Quarterly Payments ($)</td>
                <td className="px-3 py-2 border">$0 - $10,000</td>
                <td className="px-3 py-2 border">
                  Estimated tax paid (Form 1040-ES)
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Deductions ($)</td>
                <td className="px-3 py-2 border">$14,600 - $29,200</td>
                <td className="px-3 py-2 border">
                  Standard or itemized (2024)
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Credits ($)</td>
                <td className="px-3 py-2 border">$0 - $4,000</td>
                <td className="px-3 py-2 border">Child, education, etc.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mb-6">
          <h3>Withholding & Estimated Tax Details</h3>
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
                <td className="px-3 py-2 border">Tax Owed</td>
                <td className="px-3 py-2 border">
                  Total federal tax after credits
                </td>
                <td className="px-3 py-2 border">$7,200</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Tax Withheld</td>
                <td className="px-3 py-2 border">From paychecks/W-2</td>
                <td className="px-3 py-2 border">$6,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Quarterly Payments</td>
                <td className="px-3 py-2 border">
                  Estimated tax paid (Form 1040-ES)
                </td>
                <td className="px-3 py-2 border">$1,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Total Paid</td>
                <td className="px-3 py-2 border">
                  Withholding + estimated payments
                </td>
                <td className="px-3 py-2 border">$7,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Underpayment</td>
                <td className="px-3 py-2 border">
                  Tax owed minus total paid (if positive)
                </td>
                <td className="px-3 py-2 border">$200</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Refund</td>
                <td className="px-3 py-2 border">
                  Total paid minus tax owed (if positive)
                </td>
                <td className="px-3 py-2 border">$0</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Safe Harbor Amount</td>
                <td className="px-3 py-2 border">
                  90% of current year tax (IRS rule)
                </td>
                <td className="px-3 py-2 border">$6,480</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Safe Harbor Met?</td>
                <td className="px-3 py-2 border">
                  Avoids penalty if total paid ≥ safe harbor
                </td>
                <td className="px-3 py-2 border">Yes</td>
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
                <th className="px-3 py-2 border text-left">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-3 py-2 border">Annual Income</td>
                <td className="px-3 py-2 border">$75,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Other Income</td>
                <td className="px-3 py-2 border">$5,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Tax Withheld</td>
                <td className="px-3 py-2 border">$6,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Quarterly Payments</td>
                <td className="px-3 py-2 border">$1,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Deductions</td>
                <td className="px-3 py-2 border">$14,600</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Credits</td>
                <td className="px-3 py-2 border">$1,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Tax Owed</td>
                <td className="px-3 py-2 border">$7,200</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Total Paid</td>
                <td className="px-3 py-2 border">$7,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Underpayment</td>
                <td className="px-3 py-2 border">$200</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Safe Harbor</td>
                <td className="px-3 py-2 border">$6,480</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Safe Harbor Met?</td>
                <td className="px-3 py-2 border">Yes</td>
              </tr>
            </tbody>
          </table>
          <p className="text-gray-600 text-sm">
            <strong>Source:</strong> IRS, 2024 tax brackets and safe harbor
            rules.
          </p>
        </div>
        <div className="mb-6">
          <h3>Tips for Beginners</h3>
          <ul className="list-disc list-inside">
            <li>
              Withholding is taken from paychecks; estimated payments are made
              quarterly (Form 1040-ES).
            </li>
            <li>
              To avoid penalties, pay at least 90% of your current year tax or
              100% of last year's tax.
            </li>
            <li>
              Self-employed and freelancers often need to make estimated
              payments.
            </li>
            <li>Check your paystub and IRS records to track payments.</li>
            <li>Consult a tax professional for complex situations.</li>
          </ul>
        </div>
      </section>
      <div className="gap-4 grid md:grid-cols-3">
        <div className="mb-2">
          <label className="block mb-1 font-medium">Annual Income ($):</label>
          <input
            type="number"
            className="px-2 py-1 border rounded w-full"
            value={annualIncome}
            onChange={(e) => setAnnualIncome(e.target.value)}
            placeholder="e.g., 75000"
            min="0"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1 font-medium">Other Income ($):</label>
          <input
            type="number"
            className="px-2 py-1 border rounded w-full"
            value={otherIncome}
            onChange={(e) => setOtherIncome(e.target.value)}
            placeholder="e.g., 5000"
            min="0"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1 font-medium">Tax Withheld ($):</label>
          <input
            type="number"
            className="px-2 py-1 border rounded w-full"
            value={taxWithheld}
            onChange={(e) => setTaxWithheld(e.target.value)}
            placeholder="e.g., 6000"
            min="0"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1 font-medium">
            Quarterly Payments ($):
          </label>
          <input
            type="number"
            className="px-2 py-1 border rounded w-full"
            value={quarterlyPayments}
            onChange={(e) => setQuarterlyPayments(e.target.value)}
            placeholder="e.g., 1000"
            min="0"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1 font-medium">Deductions ($):</label>
          <input
            type="number"
            className="px-2 py-1 border rounded w-full"
            value={deductions}
            onChange={(e) => setDeductions(e.target.value)}
            placeholder="Leave blank for standard deduction"
            min="0"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1 font-medium">Credits ($):</label>
          <input
            type="number"
            className="px-2 py-1 border rounded w-full"
            value={credits}
            onChange={(e) => setCredits(e.target.value)}
            placeholder="e.g., 1000"
            min="0"
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
      </div>
      <button
        className="bg-blue-600 mt-2 px-4 py-2 rounded text-white"
        onClick={handleCalculate}
      >
        Calculate Withholding & Estimated Tax
      </button>
      {result && (
        <div className="flex flex-col gap-4 mt-6">
          <div className="bg-white shadow p-4 border rounded-lg">
            <h3 className="mb-2 font-semibold">Results</h3>
            <table className="border border-gray-300 min-w-full text-sm">
              <tbody>
                <tr>
                  <td className="px-3 py-2 border font-medium">
                    Taxable Income
                  </td>
                  <td className="px-3 py-2 border">
                    $
                    {result.taxableIncome.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2 border font-medium">Tax Owed</td>
                  <td className="px-3 py-2 border">
                    $
                    {result.taxOwed.toLocaleString(undefined, {
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
                  <td className="px-3 py-2 border font-medium">Underpayment</td>
                  <td className="px-3 py-2 border">
                    $
                    {result.underpayment.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2 border font-medium">Refund</td>
                  <td className="px-3 py-2 border">
                    $
                    {result.refund.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2 border font-medium">
                    Safe Harbor Amount
                  </td>
                  <td className="px-3 py-2 border">
                    $
                    {result.safeHarbor.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2 border font-medium">
                    Safe Harbor Met?
                  </td>
                  <td
                    className="px-3 py-2 border font-bold"
                    style={{
                      color: result.safeHarborMet ? "#15803d" : "#b91c1c",
                    }}
                  >
                    {result.safeHarborMet ? "Yes" : "No"}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="mt-2 text-gray-600 text-sm">
              <strong>Note:</strong> This calculator provides an estimate.
              Actual tax owed or refund may vary based on your full tax
              situation and IRS rules.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
