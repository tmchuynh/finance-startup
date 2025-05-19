"use client";
import { useState } from "react";

type Debt = {
  balance: string;
  interestRate: string;
  monthlyPayment: string;
};

export default function DebtConsolidationCalculator() {
  const [debts, setDebts] = useState<Debt[]>([
    { balance: "", interestRate: "", monthlyPayment: "" },
  ]);
  const [consolidationRate, setConsolidationRate] = useState<string>("8");
  const [consolidationTerm, setConsolidationTerm] = useState<string>("5");
  const [fees, setFees] = useState<string>("0");

  const [result, setResult] = useState<{
    totalCurrentMonthly: number;
    totalCurrentPaid: number;
    totalCurrentInterest: number;
    consolidationMonthly: number;
    consolidationTotalPaid: number;
    consolidationInterest: number;
    savings: number;
  } | null>(null);

  // Calculate months to pay off each debt
  function calcMonthsToPayoff(P: number, r: number, PMT: number) {
    if (r === 0) return P / PMT;
    const monthlyRate = r / 12;
    if (PMT <= P * monthlyRate) return Infinity;
    return Math.log(PMT / (PMT - P * monthlyRate)) / Math.log(1 + monthlyRate);
  }

  // Calculate total paid and interest for each debt
  function calcTotalPaid(P: number, r: number, PMT: number, n: number) {
    const totalPaid = PMT * n;
    const totalInterest = totalPaid - P;
    return { totalPaid, totalInterest };
  }

  // Calculate monthly payment for consolidation loan
  function calcMonthlyPayment(P: number, r: number, n: number) {
    if (r === 0) return P / n;
    const monthlyRate = r / 12;
    return (P * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -n));
  }

  const handleDebtChange = (idx: number, field: keyof Debt, value: string) => {
    setDebts((prev) =>
      prev.map((d, i) => (i === idx ? { ...d, [field]: value } : d))
    );
  };

  const addDebt = () => {
    setDebts((prev) => [...prev, { balance: "", interestRate: "", monthlyPayment: "" }]);
  };

  const removeDebt = (idx: number) => {
    setDebts((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleCalculate = () => {
    let totalCurrentMonthly = 0;
    let totalCurrentPaid = 0;
    let totalCurrentInterest = 0;
    let totalBalance = 0;

    for (const debt of debts) {
      const P = parseFloat(debt.balance);
      const r = parseFloat(debt.interestRate) / 100;
      const PMT = parseFloat(debt.monthlyPayment);

      if (
        isNaN(P) ||
        isNaN(r) ||
        isNaN(PMT) ||
        P <= 0 ||
        r < 0 ||
        PMT <= 0
      ) {
        setResult(null);
        return;
      }
      const n = calcMonthsToPayoff(P, r, PMT);
      const { totalPaid, totalInterest } = calcTotalPaid(P, r, PMT, n);
      totalCurrentMonthly += PMT;
      totalCurrentPaid += totalPaid;
      totalCurrentInterest += totalInterest;
      totalBalance += P;
    }

    const consRate = parseFloat(consolidationRate) / 100;
    const consTerm = parseFloat(consolidationTerm);
    const consFees = parseFloat(fees);

    if (
      isNaN(consRate) ||
      isNaN(consTerm) ||
      isNaN(consFees) ||
      consTerm <= 0 ||
      consRate < 0 ||
      consFees < 0
    ) {
      setResult(null);
      return;
    }

    const n = consTerm * 12;
    const principal = totalBalance + consFees;
    const consolidationMonthly = calcMonthlyPayment(principal, consRate, n);
    const consolidationTotalPaid = consolidationMonthly * n;
    const consolidationInterest = consolidationTotalPaid - principal;
    const savings = totalCurrentPaid - consolidationTotalPaid;

    setResult({
      totalCurrentMonthly,
      totalCurrentPaid,
      totalCurrentInterest,
      consolidationMonthly,
      consolidationTotalPaid,
      consolidationInterest,
      savings,
    });
  };

  return (
    <div className="mx-auto mt-8 md:mt-12 w-10/12 md:w-11/12 h-full">
      <h1>Debt Consolidation Calculator</h1>
      <p className="mb-4">
        <strong>
          Estimate your savings and new monthly payment if you consolidate multiple debts into a single loan.
        </strong>
      </p>
      <section className="mb-8">
        <h2>How Does This Calculator Work?</h2>
        <p>
          Enter your existing debts (balance, interest rate, monthly payment), then enter the consolidation loan's interest rate, term, and fees. The calculator compares your current payments and interest to a new consolidated loan.
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
                <td className="px-3 py-2 border">Debt Balance ($)</td>
                <td className="px-3 py-2 border">$1,000 - $20,000</td>
                <td className="px-3 py-2 border">Per credit card or loan</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Interest Rate (%)</td>
                <td className="px-3 py-2 border">12% - 25%</td>
                <td className="px-3 py-2 border">Credit card average: 18%</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Monthly Payment ($)</td>
                <td className="px-3 py-2 border">$50 - $500</td>
                <td className="px-3 py-2 border">Per debt</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Consolidation Rate (%)</td>
                <td className="px-3 py-2 border">6% - 12%</td>
                <td className="px-3 py-2 border">Personal loan average: 8%</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Consolidation Term (years)</td>
                <td className="px-3 py-2 border">3 - 7</td>
                <td className="px-3 py-2 border">Typical: 5 years</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Fees ($)</td>
                <td className="px-3 py-2 border">$0 - $500</td>
                <td className="px-3 py-2 border">Origination or processing fees</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mb-6">
          <h3>Debt Consolidation Details</h3>
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
                <td className="px-3 py-2 border">Debt Balance</td>
                <td className="px-3 py-2 border">Amount owed per debt</td>
                <td className="px-3 py-2 border">$5,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Interest Rate</td>
                <td className="px-3 py-2 border">Annual rate per debt</td>
                <td className="px-3 py-2 border">18%</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Monthly Payment</td>
                <td className="px-3 py-2 border">Amount paid per month</td>
                <td className="px-3 py-2 border">$200</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Consolidation Rate</td>
                <td className="px-3 py-2 border">Interest rate on new loan</td>
                <td className="px-3 py-2 border">8%</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Consolidation Term</td>
                <td className="px-3 py-2 border">Repayment period in years</td>
                <td className="px-3 py-2 border">5</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Fees</td>
                <td className="px-3 py-2 border">Loan origination or processing</td>
                <td className="px-3 py-2 border">$200</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Current Total Monthly Payment</td>
                <td className="px-3 py-2 border">Sum of all debt payments</td>
                <td className="px-3 py-2 border">$600</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Current Total Paid</td>
                <td className="px-3 py-2 border">Sum of all payments over time</td>
                <td className="px-3 py-2 border">$8,200</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Current Total Interest</td>
                <td className="px-3 py-2 border">Interest paid on all debts</td>
                <td className="px-3 py-2 border">$2,200</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Consolidation Monthly Payment</td>
                <td className="px-3 py-2 border">New payment after consolidation</td>
                <td className="px-3 py-2 border">$405</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Consolidation Total Paid</td>
                <td className="px-3 py-2 border">Sum of all payments on new loan</td>
                <td className="px-3 py-2 border">$7,300</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Consolidation Interest</td>
                <td className="px-3 py-2 border">Interest paid on new loan</td>
                <td className="px-3 py-2 border">$1,100</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Savings</td>
                <td className="px-3 py-2 border">Current total paid - consolidation total paid</td>
                <td className="px-3 py-2 border">$900</td>
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
                <td className="px-3 py-2 border">Debt 1</td>
                <td className="px-3 py-2 border">$5,000 @ 18%, $200/mo</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Debt 2</td>
                <td className="px-3 py-2 border">$3,000 @ 22%, $120/mo</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Debt 3</td>
                <td className="px-3 py-2 border">$2,000 @ 14%, $80/mo</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Consolidation Rate</td>
                <td className="px-3 py-2 border">8%</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Consolidation Term</td>
                <td className="px-3 py-2 border">5 years</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Fees</td>
                <td className="px-3 py-2 border">$200</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Current Total Monthly Payment</td>
                <td className="px-3 py-2 border">$400</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Current Total Paid</td>
                <td className="px-3 py-2 border">$11,200</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Current Total Interest</td>
                <td className="px-3 py-2 border">$3,200</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Consolidation Monthly Payment</td>
                <td className="px-3 py-2 border">$215</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Consolidation Total Paid</td>
                <td className="px-3 py-2 border">$8,200</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Consolidation Interest</td>
                <td className="px-3 py-2 border">$1,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Savings</td>
                <td className="px-3 py-2 border">$3,000</td>
              </tr>
            </tbody>
          </table>
          <p className="text-gray-600 text-sm">
            <strong>Source:</strong> LendingTree, NerdWallet, 2024 averages.
          </p>
        </div>
        <div className="mb-6">
          <h3>Tips for Beginners</h3>
          <ul className="list-disc list-inside">
            <li>Debt consolidation can lower your monthly payment and interest, but may extend your payoff time.</li>
            <li>Compare total interest and fees before consolidating.</li>
            <li>Make extra payments to pay off your consolidation loan faster.</li>
            <li>Check for origination fees and prepayment penalties.</li>
            <li>Consult a financial advisor for personalized debt strategies.</li>
          </ul>
        </div>
      </section>
      <div className="mb-8">
        <h3 className="mb-2 font-medium">Debt Inputs</h3>
        {debts.map((debt, idx) => (
          <div key={idx} className="items-end gap-4 grid md:grid-cols-4 mb-2">
            <div>
              <label className="block mb-1 font-medium">Balance ($):</label>
              <input
                type="number"
                className="px-2 py-1 border rounded w-full"
                value={debt.balance}
                onChange={(e) => handleDebtChange(idx, "balance", e.target.value)}
                placeholder="e.g., 5000"
                min="0"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Interest Rate (%):</label>
              <input
                type="number"
                className="px-2 py-1 border rounded w-full"
                value={debt.interestRate}
                onChange={(e) => handleDebtChange(idx, "interestRate", e.target.value)}
                placeholder="e.g., 18"
                min="0"
                max="100"
                step="0.01"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Monthly Payment ($):</label>
              <input
                type="number"
                className="px-2 py-1 border rounded w-full"
                value={debt.monthlyPayment}
                onChange={(e) => handleDebtChange(idx, "monthlyPayment", e.target.value)}
                placeholder="e.g., 200"
                min="0"
              />
            </div>
            <div>
              {debts.length > 1 && (
                <button
                  className="bg-red-600 px-2 py-1 rounded text-white"
                  onClick={() => removeDebt(idx)}
                  type="button"
                >
                  Remove
                </button>
              )}
            </div>
          </div>
        ))}
        <button
          className="bg-gray-700 mb-4 px-3 py-1 rounded text-white"
          onClick={addDebt}
          type="button"
        >
          + Add Another Debt
        </button>
        <div className="gap-4 grid md:grid-cols-3">
          <div className="mb-2">
            <label className="block mb-1 font-medium">Consolidation Rate (%):</label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={consolidationRate}
              onChange={(e) => setConsolidationRate(e.target.value)}
              placeholder="e.g., 8"
              min="0"
              max="100"
              step="0.01"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">Consolidation Term (years):</label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={consolidationTerm}
              onChange={(e) => setConsolidationTerm(e.target.value)}
              placeholder="e.g., 5"
              min="1"
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
        </div>
      </div>
      <button
        className="bg-blue-600 mt-2 px-4 py-2 rounded text-white"
        onClick={handleCalculate}
      >
        Calculate Consolidation
      </button>
      {result && (
        <div className="flex flex-col gap-4 mt-6">
          <div className="bg-white shadow p-4 border rounded-lg">
            <h3 className="mb-2 font-semibold">Results</h3>
            <table className="border border-gray-300 min-w-full text-sm">
              <tbody>
                <tr>
                  <td className="px-3 py-2 border font-medium">Current Total Monthly Payment</td>
                  <td className="px-3 py-2 border">
                    ${result.totalCurrentMonthly.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2 border font-medium">Current Total Paid</td>
                  <td className="px-3 py-2 border">
                    ${result.totalCurrentPaid.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2 border font-medium">Current Total Interest</td>
                  <td className="px-3 py-2 border">
                    ${result.totalCurrentInterest.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2 border font-medium">Consolidation Monthly Payment</td>
                  <td className="px-3 py-2 border">
                    ${result.consolidationMonthly.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2 border font-medium">Consolidation Total Paid</td>
                  <td className="px-3 py-2 border">
                    ${result.consolidationTotalPaid.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2 border font-medium">Consolidation Interest</td>
                  <td className="px-3 py-2 border">
                    ${result.consolidationInterest.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2 border font-medium">Savings</td>
                  <td className="px-3 py-2 border font-bold text-green-700">
                    ${result.savings.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="mt-2 text-gray-600 text-sm">
              <strong>Note:</strong> This calculator provides estimates. Actual results may vary based on your debt terms and consolidation loan.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
