"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function TaxDeductionAndTaxRefundCalculator() {
  const [annualIncome, setAnnualIncome] = useState<string>("");
  const [filingStatus, setFilingStatus] = useState<string>("single");
  const [taxWithheld, setTaxWithheld] = useState<string>("");
  const [deductions, setDeductions] = useState<string>("");
  const [credits, setCredits] = useState<string>("");

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

  function calculateTaxableIncome(income: number, deduction: number) {
    return Math.max(0, income - deduction);
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

  const handleCalculate = () => {
    const income = parseFloat(annualIncome);
    const withheld = parseFloat(taxWithheld);
    const ded =
      deductions === ""
        ? STANDARD_DEDUCTION[filingStatus as keyof typeof STANDARD_DEDUCTION]
        : parseFloat(deductions);
    const cred = parseFloat(credits) || 0;

    if (
      !isNaN(income) &&
      !isNaN(withheld) &&
      !isNaN(ded) &&
      income > 0 &&
      withheld >= 0 &&
      ded >= 0 &&
      cred >= 0
    ) {
      const taxableIncome = calculateTaxableIncome(income, ded);
      const taxOwed = Math.max(
        0,
        calculateTaxOwed(taxableIncome, filingStatus) - cred
      );
      const refund = withheld - taxOwed;
      setResult({
        taxableIncome,
        taxOwed,
        refund,
      });
    } else {
      setResult(null);
    }
  };

  const [result, setResult] = useState<{
    taxableIncome: number;
    taxOwed: number;
    refund: number;
  } | null>(null);

  return (
    <div className="mt-8 md:mt-12 mx-auto h-full w-10/12 md:w-11/12">
      <h1>Tax Deduction & Tax Refund Calculator</h1>
      <p className="mb-4">
        <strong>
          Estimate your taxable income, federal tax owed, and refund based on
          your income, deductions, credits, and tax withheld.
        </strong>
      </p>
      <section className="mb-8">
        <h2>How Does This Calculator Work?</h2>
        <p>
          Enter your annual income, filing status, tax withheld, deductions, and
          credits. The calculator estimates your taxable income, tax owed, and
          refund or amount due using 2024 U.S. tax brackets.
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
                <td className="px-3 py-2 border">Annual Income ($)</td>
                <td className="px-3 py-2 border">$40,000 - $120,000</td>
                <td className="px-3 py-2 border">Before taxes</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Filing Status</td>
                <td className="px-3 py-2 border">
                  Single, Married, Head of Household
                </td>
                <td className="px-3 py-2 border">
                  Affects brackets & standard deduction
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Tax Withheld ($)</td>
                <td className="px-3 py-2 border">$3,000 - $15,000</td>
                <td className="px-3 py-2 border">From W-2 or paychecks</td>
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
          <h3>Tax Deduction & Refund Details</h3>
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
                <td className="px-3 py-2 border">Taxable Income</td>
                <td className="px-3 py-2 border">Income minus deductions</td>
                <td className="px-3 py-2 border">$60,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Tax Owed</td>
                <td className="px-3 py-2 border">Federal tax after credits</td>
                <td className="px-3 py-2 border">$6,500</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Tax Withheld</td>
                <td className="px-3 py-2 border">From paychecks/W-2</td>
                <td className="px-3 py-2 border">$7,200</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Refund</td>
                <td className="px-3 py-2 border">
                  Tax withheld minus tax owed
                </td>
                <td className="px-3 py-2 border">$700</td>
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
                <td className="px-3 py-2 border">Annual Income</td>
                <td className="px-3 py-2 border">$75,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Filing Status</td>
                <td className="px-3 py-2 border">Single</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Tax Withheld</td>
                <td className="px-3 py-2 border">$7,000</td>
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
                <td className="px-3 py-2 border">Taxable Income</td>
                <td className="px-3 py-2 border">$60,400</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Tax Owed</td>
                <td className="px-3 py-2 border">$7,200</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Refund</td>
                <td className="px-3 py-2 border">-$200 (amount owed)</td>
              </tr>
            </tbody>
          </table>
          <p className="text-sm">
            <strong>Source:</strong> IRS, 2024 tax brackets and deductions.
          </p>
        </div>
        <div className="mb-6">
          <h3>Tips for Beginners</h3>
          <ul className="list-disc list-inside">
            <li>
              Use the standard deduction unless your itemized deductions are
              higher.
            </li>
            <li>Tax credits reduce your tax bill dollar-for-dollar.</li>
            <li>
              Refund = tax withheld minus tax owed. Negative means you owe more.
            </li>
            <li>Check IRS.gov for the latest deduction and credit rules.</li>
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
          <label className="block mb-1 font-medium">Tax Withheld ($):</label>
          <input
            type="number"
            className="px-2 py-1 border rounded w-full"
            value={taxWithheld}
            onChange={(e) => setTaxWithheld(e.target.value)}
            placeholder="e.g., 7000"
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
      </div>
      <Button className="mt-2 px-4 py-2 rounded" onClick={handleCalculate}>
        Calculate Tax Refund
      </Button>
      {result && (
        <div className="flex flex-col gap-4 mt-6">
          <div className="shadow p-4 border rounded-lg">
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
                  <td className="px-3 py-2 border font-medium">
                    Refund / Amount Owed
                  </td>
                  <td
                    className="px-3 py-2 border font-bold"
                    style={{
                      color: result.refund >= 0 ? "#15803d" : "#b91c1c",
                    }}
                  >
                    {result.refund >= 0
                      ? `$${result.refund.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })} (Refund)`
                      : `$${Math.abs(result.refund).toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })} (Owed)`}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="mt-2 text-sm">
              <strong>Note:</strong> This calculator provides an estimate.
              Actual tax owed or refund may vary based on your full tax
              situation.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
