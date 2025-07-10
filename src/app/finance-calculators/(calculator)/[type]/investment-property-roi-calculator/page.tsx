"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function InvestmentPropertyROICalculator() {
  const [purchasePrice, setPurchasePrice] = useState<string>("");
  const [downPayment, setDownPayment] = useState<string>("20");
  const [mortgageRate, setMortgageRate] = useState<string>("6.5");
  const [loanTerm, setLoanTerm] = useState<string>("30");
  const [annualRent, setAnnualRent] = useState<string>("");
  const [annualExpenses, setAnnualExpenses] = useState<string>("");
  const [annualAppreciation, setAnnualAppreciation] = useState<string>("3.5");
  const [years, setYears] = useState<string>("5");
  const [renovationCost, setRenovationCost] = useState<string>("0");
  const [hoaFees, setHoaFees] = useState<string>("0");
  const [investmentReturn, setInvestmentReturn] = useState<string>("5");

  const [result, setResult] = useState<{
    totalCashInvested: number;
    totalGain: number;
    roi: number;
    annualizedRoi: number;
  } | null>(null);

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

  const handleCalculate = () => {
    const price = parseFloat(purchasePrice);
    const down = parseFloat(downPayment) / 100;
    const rate = parseFloat(mortgageRate);
    const term = parseFloat(loanTerm);
    const rent = parseFloat(annualRent);
    const expenses = parseFloat(annualExpenses);
    const appreciation = parseFloat(annualAppreciation) / 100;
    const nYears = parseFloat(years);
    const reno = parseFloat(renovationCost);
    const hoa = parseFloat(hoaFees);
    const investReturn = parseFloat(investmentReturn) / 100;

    if (
      !isNaN(price) &&
      !isNaN(down) &&
      !isNaN(rate) &&
      !isNaN(term) &&
      !isNaN(rent) &&
      !isNaN(expenses) &&
      !isNaN(appreciation) &&
      !isNaN(nYears) &&
      !isNaN(reno) &&
      !isNaN(hoa) &&
      !isNaN(investReturn) &&
      price > 0 &&
      down >= 0 &&
      down < 1 &&
      rent >= 0 &&
      expenses >= 0 &&
      nYears > 0
    ) {
      const loanAmount = price * (1 - down);
      const monthlyPayment = calcMonthlyPayment(loanAmount, rate, term);

      // Estimate principal paid over nYears (approximate, not exact amortization)
      let balance = loanAmount;
      let principalPaid = 0;
      const r = rate / 100 / 12;
      for (let i = 0; i < nYears * 12; i++) {
        const interest = balance * r;
        const principal = monthlyPayment - interest;
        principalPaid += principal;
        balance -= principal;
        if (balance < 0) break;
      }

      // Future property value
      const futureValue = price * Math.pow(1 + appreciation, nYears);

      // Total cash invested: down payment + renovation + HOA
      const totalCashInvested = price * down + reno + hoa * 12 * nYears;

      // Net rental income (rent - expenses - mortgage - HOA)
      const totalNetIncome =
        (rent - expenses - hoa * 12 - monthlyPayment * 12) * nYears;

      // Total gain: equity gained (future value - remaining mortgage) + net income - total cash invested
      const equityGained = futureValue - balance;
      const totalGain = equityGained + totalNetIncome - totalCashInvested;

      // ROI = total gain / total cash invested
      const roi = (totalGain / totalCashInvested) * 100;

      // Annualized ROI (CAGR)
      const annualizedRoi =
        (Math.pow(
          (totalGain + totalCashInvested) / totalCashInvested,
          1 / nYears
        ) -
          1) *
        100;

      setResult({
        totalCashInvested,
        totalGain,
        roi,
        annualizedRoi,
      });
    } else {
      setResult(null);
    }
  };

  return (
    <div className="mt-8 md:mt-12 mx-auto h-full w-10/12 md:w-11/12">
      <h1>Investment Property ROI Calculator</h1>
      <p className="mb-4">
        <strong>
          Estimate your return on investment (ROI) for a rental property,
          including appreciation, rental income, expenses, and renovation costs.
        </strong>
      </p>
      <section className="mb-8">
        <h2>What is ROI?</h2>
        <p>
          ROI (Return on Investment) measures how much profit you make on your
          investment property compared to the cash you put in. It includes
          rental income, appreciation, mortgage paydown, and subtracts all
          costs.
        </p>
        <div className="my-6">
          <h3>ROI Explained</h3>
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
                <td className="px-3 py-2 border">Total Cash Invested</td>
                <td className="px-3 py-2 border">
                  Down payment + renovation + HOA fees
                </td>
                <td className="px-3 py-2 border">$80,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Total Gain</td>
                <td className="px-3 py-2 border">
                  Equity gained + net rental income - cash invested
                </td>
                <td className="px-3 py-2 border">$60,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">ROI (%)</td>
                <td className="px-3 py-2 border">
                  Total gain ÷ total cash invested × 100
                </td>
                <td className="px-3 py-2 border">75%</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Annualized ROI (%)</td>
                <td className="px-3 py-2 border">
                  Compound annual growth rate (CAGR)
                </td>
                <td className="px-3 py-2 border">11.9%</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="gap-4 grid md:grid-cols-3">
          <div className="mb-2">
            <label className="block mb-1 font-medium">
              Purchase Price ($):
            </label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={purchasePrice}
              onChange={(e) => setPurchasePrice(e.target.value)}
              placeholder="Enter purchase price"
              min="0"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">Down Payment (%):</label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={downPayment}
              onChange={(e) => setDownPayment(e.target.value)}
              placeholder="e.g., 20"
              min="0"
              max="100"
              step="0.01"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">Mortgage Rate (%):</label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={mortgageRate}
              onChange={(e) => setMortgageRate(e.target.value)}
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
            <label className="block mb-1 font-medium">Annual Rent ($):</label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={annualRent}
              onChange={(e) => setAnnualRent(e.target.value)}
              placeholder="Monthly rent × 12"
              min="0"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">
              Annual Expenses ($):
            </label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={annualExpenses}
              onChange={(e) => setAnnualExpenses(e.target.value)}
              placeholder="Taxes, insurance, maintenance, etc."
              min="0"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">
              Annual Appreciation (%):
            </label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={annualAppreciation}
              onChange={(e) => setAnnualAppreciation(e.target.value)}
              placeholder="e.g., 3.5"
              min="0"
              max="100"
              step="0.01"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">Years Held:</label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              placeholder="e.g., 5"
              min="1"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">
              Renovation Cost ($):
            </label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={renovationCost}
              onChange={(e) => setRenovationCost(e.target.value)}
              placeholder="e.g., 25000"
              min="0"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">
              HOA Fees (annual, $):
            </label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={hoaFees}
              onChange={(e) => setHoaFees(e.target.value)}
              placeholder="e.g., 1200"
              min="0"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">
              Investment Return (%):
            </label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={investmentReturn}
              onChange={(e) => setInvestmentReturn(e.target.value)}
              placeholder="e.g., 5"
              min="0"
              step="0.01"
            />
          </div>
        </div>
        <Button className="mt-2 px-4 py-2 rounded" onClick={handleCalculate}>
          Calculate ROI
        </Button>
        {result && (
          <div className="flex flex-col gap-4 mt-6">
            <div className="shadow p-4 border rounded-lg">
              <h3>Results</h3>
              <table className="border border-gray-300 min-w-full text-sm">
                <tbody>
                  <tr>
                    <td className="px-3 py-2 border font-medium">
                      Total Cash Invested
                    </td>
                    <td className="px-3 py-2 border">
                      $
                      {result.totalCashInvested.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border font-medium">Total Gain</td>
                    <td className="px-3 py-2 border">
                      $
                      {result.totalGain.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border font-medium">ROI</td>
                    <td className="px-3 py-2 border">
                      {result.roi.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                      %
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border font-medium">
                      Annualized ROI (CAGR)
                    </td>
                    <td className="px-3 py-2 border">
                      {result.annualizedRoi.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                      %
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="mt-2 text-sm">
                <strong>Note:</strong> This calculator does not include taxes,
                selling costs, or vacancy. Actual returns may vary.
              </div>
            </div>
          </div>
        )}
        <div className="my-6">
          <h3>Tips for Beginners</h3>
          <ul className="list-disc list-inside">
            <li>ROI is a key metric for comparing investment properties.</li>
            <li>
              Include all costs: down payment, closing, renovation, HOA, etc.
            </li>
            <li>Annualized ROI (CAGR) shows your average yearly return.</li>
            <li>
              Consult a real estate professional or CPA for personalized advice.
            </li>
            <li>
              This calculator does not include taxes, selling costs, or vacancy.
            </li>
          </ul>
        </div>
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
                <td className="px-3 py-2 border">Purchase Price ($)</td>
                <td className="px-3 py-2 border">$300,000 - $600,000</td>
                <td className="px-3 py-2 border">
                  Typical U.S. home price (2024)
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Down Payment (%)</td>
                <td className="px-3 py-2 border">20%</td>
                <td className="px-3 py-2 border">
                  Standard for conventional loans
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Mortgage Rate (%)</td>
                <td className="px-3 py-2 border">6% - 7%</td>
                <td className="px-3 py-2 border">2024 average: ~6.5%</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Loan Term (years)</td>
                <td className="px-3 py-2 border">30</td>
                <td className="px-3 py-2 border">Most common in U.S.</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Annual Rent ($)</td>
                <td className="px-3 py-2 border">$18,000 - $36,000</td>
                <td className="px-3 py-2 border">Monthly rent × 12</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Annual Expenses ($)</td>
                <td className="px-3 py-2 border">$5,000 - $12,000</td>
                <td className="px-3 py-2 border">
                  Taxes, insurance, maintenance, etc.
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Annual Appreciation (%)</td>
                <td className="px-3 py-2 border">3% - 5%</td>
                <td className="px-3 py-2 border">
                  U.S. long-term average: ~3.5%
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Years Held</td>
                <td className="px-3 py-2 border">5 - 10</td>
                <td className="px-3 py-2 border">
                  How long you plan to hold the property
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Renovation Cost ($)</td>
                <td className="px-3 py-2 border">$0 - $50,000</td>
                <td className="px-3 py-2 border">Kitchen, bath, etc.</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">HOA Fees (annual, $)</td>
                <td className="px-3 py-2 border">$0 - $4,800</td>
                <td className="px-3 py-2 border">Monthly × 12</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Investment Return (%)</td>
                <td className="px-3 py-2 border">4% - 7%</td>
                <td className="px-3 py-2 border">
                  If you invested your cash elsewhere
                </td>
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
                <td className="px-3 py-2 border">Purchase Price</td>
                <td className="px-3 py-2 border">$400,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Down Payment (20%)</td>
                <td className="px-3 py-2 border">$80,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Annual Rent</td>
                <td className="px-3 py-2 border">$24,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Annual Expenses</td>
                <td className="px-3 py-2 border">$7,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Mortgage Rate</td>
                <td className="px-3 py-2 border">6.5%</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Years Held</td>
                <td className="px-3 py-2 border">5</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Total Cash Invested</td>
                <td className="px-3 py-2 border">$80,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Total Gain</td>
                <td className="px-3 py-2 border">$60,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">ROI</td>
                <td className="px-3 py-2 border">75%</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Annualized ROI</td>
                <td className="px-3 py-2 border">11.9%</td>
              </tr>
            </tbody>
          </table>
          <p className="text-sm">
            <strong>Source:</strong> Bankrate, NAR, 2024 averages.
          </p>
        </div>
      </section>
    </div>
  );
}
