"use client";
import { useState } from "react";

export default function SelfEmploymentTaxAndTaxableIncomeCalculator() {
  const [netEarnings, setNetEarnings] = useState<string>("");
  const [otherIncome, setOtherIncome] = useState<string>("0");
  const [deductions, setDeductions] = useState<string>("14600");
  const [filingStatus, setFilingStatus] = useState<string>("single");

  const [result, setResult] = useState<{
    seTax: number;
    seDeduction: number;
    taxableIncome: number;
    federalTax: number;
    totalTax: number;
  } | null>(null);

  // 2024 standard deduction
  const STANDARD_DEDUCTION = {
    single: 14600,
    married: 29200,
    head: 21900,
  };

  // 2024 federal tax brackets (simplified)
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

  function calculateSelfEmploymentTax(earnings: number) {
    // Social Security tax: 12.4% up to $168,600 (2024)
    // Medicare tax: 2.9% on all earnings
    const ssWageBase = 168600;
    const ssTax = Math.min(earnings, ssWageBase) * 0.124;
    const medicareTax = earnings * 0.029;
    return ssTax + medicareTax;
  }

  function calculateFederalTax(taxable: number, status: string) {
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
    return Math.max(0, owed);
  }

  const handleCalculate = () => {
    const earnings = parseFloat(netEarnings);
    const other = parseFloat(otherIncome);
    const ded =
      deductions === ""
        ? STANDARD_DEDUCTION[filingStatus as keyof typeof STANDARD_DEDUCTION]
        : parseFloat(deductions);

    if (
      !isNaN(earnings) &&
      !isNaN(other) &&
      !isNaN(ded) &&
      earnings >= 0 &&
      other >= 0 &&
      ded >= 0
    ) {
      // SE tax is on 92.35% of net earnings
      const seTaxable = earnings * 0.9235;
      const seTax = calculateSelfEmploymentTax(seTaxable);
      // Half of SE tax is deductible
      const seDeduction = seTax / 2;
      // Taxable income = net earnings + other income - deductions - half SE tax
      const taxableIncome = Math.max(0, earnings + other - ded - seDeduction);
      const federalTax = calculateFederalTax(taxableIncome, filingStatus);
      const totalTax = seTax + federalTax;
      setResult({
        seTax,
        seDeduction,
        taxableIncome,
        federalTax,
        totalTax,
      });
    } else {
      setResult(null);
    }
  };

  return (
    <div className="mx-auto mt-8 md:mt-12 w-10/12 md:w-11/12 h-full">
      <h1>Self-Employment Tax & Taxable Income Calculator</h1>
      <p className="mb-4">
        <strong>
          Estimate your self-employment tax, federal taxable income, and total
          tax owed as a freelancer, contractor, or small business owner.
        </strong>
      </p>
      <section className="mb-8">
        <h2>How Does This Calculator Work?</h2>
        <p>
          Enter your net self-employment earnings, other income, deductions, and
          filing status. The calculator estimates your self-employment tax,
          deductible portion, taxable income, and federal tax using 2024 rules.
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
                <td className="px-3 py-2 border">
                  Net Self-Employment Earnings ($)
                </td>
                <td className="px-3 py-2 border">$20,000 - $150,000</td>
                <td className="px-3 py-2 border">After business expenses</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Other Income ($)</td>
                <td className="px-3 py-2 border">$0 - $50,000</td>
                <td className="px-3 py-2 border">W-2, interest, etc.</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Deductions ($)</td>
                <td className="px-3 py-2 border">$14,600 - $29,200</td>
                <td className="px-3 py-2 border">
                  Standard or itemized (2024)
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Filing Status</td>
                <td className="px-3 py-2 border">
                  Single, Married, Head of Household
                </td>
                <td className="px-3 py-2 border">
                  Affects brackets & deduction
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mb-6">
          <h3>Self-Employment Tax & Income Details</h3>
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
                <td className="px-3 py-2 border">Net Earnings</td>
                <td className="px-3 py-2 border">
                  Self-employment income after expenses
                </td>
                <td className="px-3 py-2 border">$60,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">SE Taxable Earnings</td>
                <td className="px-3 py-2 border">92.35% of net earnings</td>
                <td className="px-3 py-2 border">$55,410</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Self-Employment Tax</td>
                <td className="px-3 py-2 border">
                  Social Security + Medicare (15.3%)
                </td>
                <td className="px-3 py-2 border">$8,478</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">SE Tax Deduction</td>
                <td className="px-3 py-2 border">
                  Half of SE tax is deductible
                </td>
                <td className="px-3 py-2 border">$4,239</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Taxable Income</td>
                <td className="px-3 py-2 border">
                  Net earnings + other income - deductions - half SE tax
                </td>
                <td className="px-3 py-2 border">$51,761</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Federal Tax</td>
                <td className="px-3 py-2 border">
                  Based on taxable income & status
                </td>
                <td className="px-3 py-2 border">$6,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Total Tax</td>
                <td className="px-3 py-2 border">SE tax + federal tax</td>
                <td className="px-3 py-2 border">$14,478</td>
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
                <td className="px-3 py-2 border">Net Earnings</td>
                <td className="px-3 py-2 border">$60,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Other Income</td>
                <td className="px-3 py-2 border">$10,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Deductions</td>
                <td className="px-3 py-2 border">$14,600</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Filing Status</td>
                <td className="px-3 py-2 border">Single</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Self-Employment Tax</td>
                <td className="px-3 py-2 border">$8,478</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">SE Tax Deduction</td>
                <td className="px-3 py-2 border">$4,239</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Taxable Income</td>
                <td className="px-3 py-2 border">$51,761</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Federal Tax</td>
                <td className="px-3 py-2 border">$6,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Total Tax</td>
                <td className="px-3 py-2 border">$14,478</td>
              </tr>
            </tbody>
          </table>
          <p className="text-gray-600 text-sm">
            <strong>Source:</strong> IRS, 2024 self-employment tax and brackets.
          </p>
        </div>
        <div className="mb-6">
          <h3>Tips for Beginners</h3>
          <ul className="list-disc list-inside">
            <li>
              Self-employment tax covers Social Security and Medicare—double
              what W-2 employees pay.
            </li>
            <li>
              You can deduct half of your SE tax from your taxable income.
            </li>
            <li>
              Keep good records of business expenses to reduce net earnings.
            </li>
            <li>Pay estimated taxes quarterly to avoid penalties.</li>
            <li>Consult a tax professional for complex situations.</li>
          </ul>
        </div>
      </section>
      <div className="gap-4 grid md:grid-cols-3">
        <div className="mb-2">
          <label className="block mb-1 font-medium">
            Net Self-Employment Earnings ($):
          </label>
          <input
            type="number"
            className="px-2 py-1 border rounded w-full"
            value={netEarnings}
            onChange={(e) => setNetEarnings(e.target.value)}
            placeholder="e.g., 60000"
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
            placeholder="e.g., 10000"
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
            placeholder="e.g., 14600"
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
        Calculate Self-Employment Tax
      </button>
      {result && (
        <div className="flex flex-col gap-4 mt-6">
          <div className="bg-white shadow p-4 border rounded-lg">
            <h3 className="mb-2 font-semibold">Results</h3>
            <table className="border border-gray-300 min-w-full text-sm">
              <tbody>
                <tr>
                  <td className="px-3 py-2 border font-medium">
                    Self-Employment Tax
                  </td>
                  <td className="px-3 py-2 border">
                    $
                    {result.seTax.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2 border font-medium">
                    SE Tax Deduction
                  </td>
                  <td className="px-3 py-2 border">
                    $
                    {result.seDeduction.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                </tr>
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
                  <td className="px-3 py-2 border font-medium">Federal Tax</td>
                  <td className="px-3 py-2 border">
                    $
                    {result.federalTax.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2 border font-medium">Total Tax</td>
                  <td className="px-3 py-2 border font-bold text-red-700">
                    $
                    {result.totalTax.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="mt-2 text-gray-600 text-sm">
              <strong>Note:</strong> This calculator provides an estimate.
              Actual tax owed may vary based on your full tax situation and
              deductions.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
