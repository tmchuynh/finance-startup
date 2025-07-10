"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function CapitalGainsAndLossDeductionTaxCalculator() {
  const [filingStatus, setFilingStatus] = useState<string>("single");
  const [shortTermGains, setShortTermGains] = useState<string>("");
  const [longTermGains, setLongTermGains] = useState<string>("");
  const [capitalLosses, setCapitalLosses] = useState<string>("");
  const [ordinaryIncome, setOrdinaryIncome] = useState<string>("");

  const [result, setResult] = useState<{
    netShortTerm: number;
    netLongTerm: number;
    lossDeduction: number;
    taxableShortTerm: number;
    taxableLongTerm: number;
    shortTermTax: number;
    longTermTax: number;
    totalTax: number;
  } | null>(null);

  // 2024 long-term capital gains brackets
  const LTCG_BRACKETS = {
    single: [
      { rate: 0, max: 44725 },
      { rate: 0.15, max: 492300 },
      { rate: 0.2, max: Infinity },
    ],
    married: [
      { rate: 0, max: 89450 },
      { rate: 0.15, max: 553850 },
      { rate: 0.2, max: Infinity },
    ],
    head: [
      { rate: 0, max: 59750 },
      { rate: 0.15, max: 523050 },
      { rate: 0.2, max: Infinity },
    ],
  };

  // 2024 ordinary income tax brackets (simplified)
  const ORDINARY_BRACKETS = {
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

  function calcOrdinaryTax(income: number, status: string) {
    let owed = 0;
    let prevMax = 0;
    for (const bracket of (ORDINARY_BRACKETS as any)[status]) {
      if (income > bracket.max) {
        owed += (bracket.max - prevMax) * bracket.rate;
        prevMax = bracket.max;
      } else {
        owed += (income - prevMax) * bracket.rate;
        break;
      }
    }
    return Math.max(0, owed);
  }

  function calcLongTermTax(
    gain: number,
    taxableIncome: number,
    status: string
  ) {
    let owed = 0;
    let prevMax = 0;
    let remaining = gain;
    for (const bracket of (LTCG_BRACKETS as any)[status]) {
      const bracketStart = prevMax;
      const bracketEnd = bracket.max;
      const bracketTaxable = Math.max(
        0,
        Math.min(remaining, bracketEnd - Math.max(taxableIncome, bracketStart))
      );
      if (bracketTaxable > 0) {
        owed += bracketTaxable * bracket.rate;
        remaining -= bracketTaxable;
      }
      prevMax = bracketEnd;
      if (remaining <= 0) break;
    }
    return Math.max(0, owed);
  }

  const handleCalculate = () => {
    const status = filingStatus;
    const stGains = parseFloat(shortTermGains) || 0;
    const ltGains = parseFloat(longTermGains) || 0;
    const losses = parseFloat(capitalLosses) || 0;
    const income = parseFloat(ordinaryIncome) || 0;

    // Net gains/losses
    let netShortTerm = stGains;
    let netLongTerm = ltGains;
    let netLoss = losses;

    // Apply losses: first to short-term, then to long-term
    if (netLoss > 0) {
      if (netShortTerm >= netLoss) {
        netShortTerm -= netLoss;
        netLoss = 0;
      } else {
        netLoss -= netShortTerm;
        netShortTerm = 0;
        netLongTerm = Math.max(0, netLongTerm - netLoss);
        netLoss = 0;
      }
    }

    // If total net gains are negative, up to $3,000 ($1,500 married) can be deducted from ordinary income
    let lossDeduction = 0;
    if (netShortTerm + netLongTerm < 0) {
      lossDeduction = status === "married" ? 3000 : 1500;
      lossDeduction = Math.min(
        Math.abs(netShortTerm + netLongTerm),
        lossDeduction
      );
    }

    // Taxable short-term gains are taxed as ordinary income
    const taxableShortTerm = netShortTerm;
    // Taxable long-term gains are taxed at capital gains rates
    const taxableLongTerm = netLongTerm;

    // Calculate taxes
    const totalOrdinary = income + taxableShortTerm - lossDeduction;
    const shortTermTax =
      calcOrdinaryTax(totalOrdinary, status) - calcOrdinaryTax(income, status);
    const longTermTax = calcLongTermTax(
      taxableLongTerm,
      income + taxableShortTerm - lossDeduction,
      status
    );
    const totalTax = Math.max(0, shortTermTax) + Math.max(0, longTermTax);

    setResult({
      netShortTerm,
      netLongTerm,
      lossDeduction,
      taxableShortTerm,
      taxableLongTerm,
      shortTermTax,
      longTermTax,
      totalTax,
    });
  };

  return (
    <div className="mt-8 md:mt-12 mx-auto h-full w-10/12 md:w-11/12">
      <h1>Capital Gains & Loss Deduction Tax Calculator</h1>
      <p className="mb-4">
        <strong>
          Estimate your capital gains tax and how much you can deduct for
          capital losses, using 2024 U.S. tax rules.
        </strong>
      </p>
      <section className="mb-8">
        <h2>How Does This Calculator Work?</h2>
        <p>
          Enter your short-term and long-term capital gains, capital losses,
          ordinary income, and filing status. The calculator estimates your tax
          owed on gains and your allowable loss deduction.
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
                <td className="px-3 py-2 border">Short-Term Gains ($)</td>
                <td className="px-3 py-2 border">$0 - $20,000</td>
                <td className="px-3 py-2 border">
                  Held ≤ 1 year, taxed as ordinary income
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Long-Term Gains ($)</td>
                <td className="px-3 py-2 border">$0 - $50,000</td>
                <td className="px-3 py-2 border">
                  Held &gt; 1 year, taxed at lower rates
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Capital Losses ($)</td>
                <td className="px-3 py-2 border">$0 - $10,000</td>
                <td className="px-3 py-2 border">
                  Offset gains, up to $3,000 ($1,500 married) deductible
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Ordinary Income ($)</td>
                <td className="px-3 py-2 border">$40,000 - $120,000</td>
                <td className="px-3 py-2 border">Wages, salary, etc.</td>
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
          <h3>Capital Gains & Loss Deduction Details</h3>
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
                <td className="px-3 py-2 border">Short-Term Gain</td>
                <td className="px-3 py-2 border">
                  Profit from assets held ≤ 1 year
                </td>
                <td className="px-3 py-2 border">$5,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Long-Term Gain</td>
                <td className="px-3 py-2 border">
                  Profit from assets held &gt; 1 year
                </td>
                <td className="px-3 py-2 border">$10,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Capital Loss</td>
                <td className="px-3 py-2 border">
                  Loss from sale of investments
                </td>
                <td className="px-3 py-2 border">$2,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Loss Deduction</td>
                <td className="px-3 py-2 border">
                  Amount deductible from ordinary income
                </td>
                <td className="px-3 py-2 border">$3,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Short-Term Tax</td>
                <td className="px-3 py-2 border">
                  Tax on short-term gains (ordinary rates)
                </td>
                <td className="px-3 py-2 border">$1,100</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Long-Term Tax</td>
                <td className="px-3 py-2 border">
                  Tax on long-term gains (capital gains rates)
                </td>
                <td className="px-3 py-2 border">$1,500</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Total Tax</td>
                <td className="px-3 py-2 border">Sum of above taxes</td>
                <td className="px-3 py-2 border">$2,600</td>
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
                <td className="px-3 py-2 border">Short-Term Gains</td>
                <td className="px-3 py-2 border">$5,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Long-Term Gains</td>
                <td className="px-3 py-2 border">$10,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Capital Losses</td>
                <td className="px-3 py-2 border">$2,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Ordinary Income</td>
                <td className="px-3 py-2 border">$60,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Filing Status</td>
                <td className="px-3 py-2 border">Single</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Short-Term Tax</td>
                <td className="px-3 py-2 border">$1,100</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Long-Term Tax</td>
                <td className="px-3 py-2 border">$1,500</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Total Tax</td>
                <td className="px-3 py-2 border">$2,600</td>
              </tr>
            </tbody>
          </table>
          <p className="text-sm">
            <strong>Source:</strong> IRS, 2024 capital gains and loss deduction
            rules.
          </p>
        </div>
        <div className="mb-6">
          <h3>Tips for Beginners</h3>
          <ul className="list-disc list-inside">
            <li>
              Short-term gains are taxed as ordinary income; long-term gains get
              lower rates.
            </li>
            <li>
              You can deduct up to $3,000 ($1,500 married) of net capital losses
              from ordinary income each year.
            </li>
            <li>Unused losses can be carried forward to future years.</li>
            <li>Keep records of all investment sales for tax reporting.</li>
            <li>Consult a tax professional for complex situations.</li>
          </ul>
        </div>
      </section>
      <div className="gap-4 grid md:grid-cols-2">
        <div className="mb-2">
          <label className="block mb-1 font-medium">
            Short-Term Gains ($):
          </label>
          <input
            type="number"
            className="px-2 py-1 border rounded w-full"
            value={shortTermGains}
            onChange={(e) => setShortTermGains(e.target.value)}
            placeholder="e.g., 5000"
            min="0"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1 font-medium">Long-Term Gains ($):</label>
          <input
            type="number"
            className="px-2 py-1 border rounded w-full"
            value={longTermGains}
            onChange={(e) => setLongTermGains(e.target.value)}
            placeholder="e.g., 10000"
            min="0"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1 font-medium">Capital Losses ($):</label>
          <input
            type="number"
            className="px-2 py-1 border rounded w-full"
            value={capitalLosses}
            onChange={(e) => setCapitalLosses(e.target.value)}
            placeholder="e.g., 2000"
            min="0"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1 font-medium">Ordinary Income ($):</label>
          <input
            type="number"
            className="px-2 py-1 border rounded w-full"
            value={ordinaryIncome}
            onChange={(e) => setOrdinaryIncome(e.target.value)}
            placeholder="e.g., 60000"
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
      <Button className="mt-2 px-4 py-2 rounded" onClick={handleCalculate}>
        Calculate Capital Gains Tax
      </Button>
      {result && (
        <div className="flex flex-col gap-4 mt-6">
          <div className="shadow p-4 border rounded-lg">
            <h3>Results</h3>
            <table className="border border-gray-300 min-w-full text-sm">
              <tbody>
                <tr>
                  <td className="px-3 py-2 border font-medium">
                    Net Short-Term Gain
                  </td>
                  <td className="px-3 py-2 border">
                    $
                    {result.netShortTerm.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2 border font-medium">
                    Net Long-Term Gain
                  </td>
                  <td className="px-3 py-2 border">
                    $
                    {result.netLongTerm.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2 border font-medium">
                    Loss Deduction
                  </td>
                  <td className="px-3 py-2 border">
                    $
                    {result.lossDeduction.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2 border font-medium">
                    Taxable Short-Term Gain
                  </td>
                  <td className="px-3 py-2 border">
                    $
                    {result.taxableShortTerm.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2 border font-medium">
                    Taxable Long-Term Gain
                  </td>
                  <td className="px-3 py-2 border">
                    $
                    {result.taxableLongTerm.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2 border font-medium">
                    Short-Term Tax
                  </td>
                  <td className="px-3 py-2 border">
                    $
                    {result.shortTermTax.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2 border font-medium">
                    Long-Term Tax
                  </td>
                  <td className="px-3 py-2 border">
                    $
                    {result.longTermTax.toLocaleString(undefined, {
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
            <div className="mt-2 text-sm">
              <strong>Note:</strong> This calculator provides an estimate.
              Actual tax owed may vary based on your full tax situation and IRS
              rules.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
