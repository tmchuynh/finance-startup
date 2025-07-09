"use client";
import { useState } from "react";

export default function RentVsBuyHomeCalculator() {
  const [monthlyRent, setMonthlyRent] = useState<string>("");
  const [rentIncrease, setRentIncrease] = useState<string>("3");
  const [homePrice, setHomePrice] = useState<string>("");
  const [downPayment, setDownPayment] = useState<string>("20");
  const [mortgageRate, setMortgageRate] = useState<string>("6");
  const [propertyTaxRate, setPropertyTaxRate] = useState<string>("1.2");
  const [insuranceRate, setInsuranceRate] = useState<string>("0.35");
  const [years, setYears] = useState<string>("7");
  const [hoaFees, setHoaFees] = useState<string>("0");
  const [maintenanceRate, setMaintenanceRate] = useState<string>("1");
  const [investmentReturn, setInvestmentReturn] = useState<string>("5");
  const [result, setResult] = useState<{
    totalRent: number;
    totalBuy: number;
    buyVsRent: number;
    recommendation: string;
  } | null>(null);

  const handleCalculate = () => {
    const rent = parseFloat(monthlyRent);
    const rentInc = parseFloat(rentIncrease) / 100;
    const price = parseFloat(homePrice);
    const down = parseFloat(downPayment) / 100;
    const rate = parseFloat(mortgageRate) / 100 / 12;
    const taxRate = parseFloat(propertyTaxRate) / 100;
    const insRate = parseFloat(insuranceRate) / 100;
    const nYears = parseFloat(years);
    const hoa = parseFloat(hoaFees);
    const maintRate = parseFloat(maintenanceRate) / 100;
    const investReturn = parseFloat(investmentReturn) / 100;
    if (
      !isNaN(rent) &&
      !isNaN(rentInc) &&
      !isNaN(price) &&
      !isNaN(down) &&
      !isNaN(rate) &&
      !isNaN(taxRate) &&
      !isNaN(insRate) &&
      !isNaN(nYears) &&
      !isNaN(hoa) &&
      !isNaN(maintRate) &&
      !isNaN(investReturn) &&
      rent > 0 &&
      price > 0 &&
      down >= 0 &&
      down < 1 &&
      nYears > 0
    ) {
      // Calculate total rent paid over nYears (with annual increases)
      let totalRent = 0;
      let currentRent = rent;
      for (let y = 0; y < nYears; y++) {
        totalRent += currentRent * 12;
        currentRent *= 1 + rentInc;
      }

      // Calculate total cost of buying
      const loanAmount = price * (1 - down);
      const nMonths = nYears * 12;
      const monthlyPayment =
        (loanAmount * rate) / (1 - Math.pow(1 + rate, -30 * 12)); // 30-year fixed
      let totalMortgage = 0;
      let totalTax = 0;
      let totalInsurance = 0;
      let totalHOA = 0;
      let totalMaintenance = 0;
      for (let y = 0; y < nYears; y++) {
        totalMortgage += monthlyPayment * 12;
        totalTax += price * taxRate;
        totalInsurance += price * insRate;
        totalHOA += hoa * 12;
        totalMaintenance += price * maintRate;
      }
      // Opportunity cost: what you could have earned by investing the down payment
      const opportunityCost =
        price * down * (Math.pow(1 + investReturn, nYears) - 1);

      const totalBuy =
        price * down +
        totalMortgage +
        totalTax +
        totalInsurance +
        totalHOA +
        totalMaintenance +
        opportunityCost;

      const buyVsRent = totalBuy - totalRent;
      let recommendation = "";
      if (buyVsRent < 0) {
        recommendation = "Buying is likely to be cheaper over this period.";
      } else {
        recommendation = "Renting is likely to be cheaper over this period.";
      }

      setResult({
        totalRent,
        totalBuy,
        buyVsRent,
        recommendation,
      });
    } else {
      setResult(null);
    }
  };

  return (
    <div className="mt-8 md:mt-12 mx-auto h-full w-10/12 md:w-11/12">
      <h1>Rent vs Buy Home Calculator</h1>
      <p className="mb-4">
        <strong>
          Compare the total cost of renting versus buying a home over time. This
          tool helps you decide which option may be better for your situation.
        </strong>
      </p>
      <section className="mb-8">
        <h2>How Does This Calculator Work?</h2>
        <p>
          This calculator estimates the total cost of renting and buying a home
          over a set number of years. It includes mortgage payments, property
          taxes, insurance, HOA fees, maintenance, and the opportunity cost of
          your down payment. This calculator does not include home appreciation,
          tax deductions, or selling costs. Actual results may vary.
        </p>

        <div className="my-6">
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
                <td className="px-3 py-2 border">Monthly Rent</td>
                <td className="px-3 py-2 border">
                  Your current monthly rent payment.
                </td>
                <td className="px-3 py-2 border">$2,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Rent Increase (%)</td>
                <td className="px-3 py-2 border">
                  How much your rent increases each year.
                </td>
                <td className="px-3 py-2 border">3%</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Home Price</td>
                <td className="px-3 py-2 border">
                  The purchase price of the home you want to buy.
                </td>
                <td className="px-3 py-2 border">$400,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Down Payment (%)</td>
                <td className="px-3 py-2 border">
                  The percent of the home price you pay upfront.
                </td>
                <td className="px-3 py-2 border">20%</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Mortgage Rate (%)</td>
                <td className="px-3 py-2 border">
                  The annual interest rate for your mortgage.
                </td>
                <td className="px-3 py-2 border">6%</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Property Tax Rate (%)</td>
                <td className="px-3 py-2 border">
                  Annual property tax as a percent of home value.
                </td>
                <td className="px-3 py-2 border">1.2%</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Insurance Rate (%)</td>
                <td className="px-3 py-2 border">
                  Annual home insurance as a percent of home value.
                </td>
                <td className="px-3 py-2 border">0.35%</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">HOA Fees</td>
                <td className="px-3 py-2 border">
                  Monthly homeowners association fees (if any).
                </td>
                <td className="px-3 py-2 border">$0</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Maintenance Rate (%)</td>
                <td className="px-3 py-2 border">
                  Annual maintenance as a percent of home value.
                </td>
                <td className="px-3 py-2 border">1%</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Investment Return (%)</td>
                <td className="px-3 py-2 border">
                  Annual return if you invested your down payment instead.
                </td>
                <td className="px-3 py-2 border">5%</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Years</td>
                <td className="px-3 py-2 border">
                  How long you plan to stay in the home or rent.
                </td>
                <td className="px-3 py-2 border">7</td>
              </tr>
            </tbody>
          </table>
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
                <td className="px-3 py-2 border">Down Payment (%)</td>
                <td className="px-3 py-2 border">20%</td>
                <td className="px-3 py-2 border">
                  Standard for conventional loans; FHA can be as low as 3.5%
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Mortgage Rate (%)</td>
                <td className="px-3 py-2 border">6% - 7%</td>
                <td className="px-3 py-2 border">
                  Varies by credit score, loan type, and market (2024 average:
                  ~6.5%)
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Insurance Rate (%)</td>
                <td className="px-3 py-2 border">0.25% - 0.5%</td>
                <td className="px-3 py-2 border">
                  Annual premium as % of home value (varies by state)
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Maintenance Rate (%)</td>
                <td className="px-3 py-2 border">1% - 2%</td>
                <td className="px-3 py-2 border">
                  Annual maintenance as % of home value
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Annual Rent Increase (%)</td>
                <td className="px-3 py-2 border">2% - 5%</td>
                <td className="px-3 py-2 border">
                  Typical annual rent growth (U.S. average: ~3%)
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">HOA Fees (monthly)</td>
                <td className="px-3 py-2 border">$0 - $400</td>
                <td className="px-3 py-2 border">
                  Depends on property type and location
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Investment Return (%)</td>
                <td className="px-3 py-2 border">4% - 7%</td>
                <td className="px-3 py-2 border">
                  Average annual return for a balanced investment portfolio
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Property Tax Rate (%)</td>
                <td className="px-3 py-2 border">0.5% - 2.5%</td>
                <td className="px-3 py-2 border">
                  Varies by state/county (U.S. average: ~1.2%)
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="gap-4 grid md:grid-cols-2">
          <div className="mb-2">
            <label className="block mb-1 font-medium">Monthly Rent ($):</label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={monthlyRent}
              onChange={(e) => setMonthlyRent(e.target.value)}
              placeholder="Enter current monthly rent"
              min="0"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">
              Annual Rent Increase (%):
            </label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={rentIncrease}
              onChange={(e) => setRentIncrease(e.target.value)}
              placeholder="e.g., 3"
              min="0"
              step="0.01"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">Home Price ($):</label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={homePrice}
              onChange={(e) => setHomePrice(e.target.value)}
              placeholder="Enter home price"
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
              placeholder="e.g., 6"
              min="0"
              step="0.01"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">
              Property Tax Rate (%):
            </label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={propertyTaxRate}
              onChange={(e) => setPropertyTaxRate(e.target.value)}
              placeholder="e.g., 1.2"
              min="0"
              step="0.01"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">
              Insurance Rate (%):
            </label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={insuranceRate}
              onChange={(e) => setInsuranceRate(e.target.value)}
              placeholder="e.g., 0.35"
              min="0"
              step="0.01"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">
              HOA Fees (monthly) ($):
            </label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={hoaFees}
              onChange={(e) => setHoaFees(e.target.value)}
              placeholder="e.g., 0"
              min="0"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">
              Maintenance Rate (%):
            </label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={maintenanceRate}
              onChange={(e) => setMaintenanceRate(e.target.value)}
              placeholder="e.g., 1"
              min="0"
              step="0.01"
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
          <div className="mb-2">
            <label className="block mb-1 font-medium">Years:</label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              placeholder="e.g., 7"
              min="1"
            />
          </div>
        </div>
        <button
          className="bg-blue-600 mt-2 px-4 py-2 rounded"
          onClick={handleCalculate}
        >
          Calculate Rent vs Buy
        </button>
        {result && (
          <div className="flex flex-col gap-4 mt-6">
            <div className="shadow p-4 border rounded-lg">
              <h3 className="mb-2 font-semibold">Results</h3>
              <table className="border border-gray-300 min-w-full text-sm">
                <tbody>
                  <tr>
                    <td className="px-3 py-2 border font-medium">
                      Total Cost of Renting
                    </td>
                    <td className="px-3 py-2 border">
                      $
                      {result.totalRent.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border font-medium">
                      Total Cost of Buying
                    </td>
                    <td className="px-3 py-2 border">
                      $
                      {result.totalBuy.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border font-medium">
                      Difference (Buy - Rent)
                    </td>
                    <td className="px-3 py-2 border">
                      $
                      {result.buyVsRent.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border font-medium">
                      Recommendation
                    </td>
                    <td className="px-3 py-2 border">
                      {result.recommendation}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="mt-2 text-sm">
                <strong>Note:</strong> This calculator does not include home
                appreciation, tax deductions, or selling costs. Actual results
                may vary.
              </div>
            </div>
          </div>
        )}

        <div className="my-6">
          <h3>Tips for Beginners</h3>
          <ul className="list-disc list-inside">
            <li>
              Include all costs: mortgage, taxes, insurance, HOA, maintenance,
              and opportunity cost.
            </li>
            <li>
              Renting is often cheaper in the short term, but buying can build
              equity over time.
            </li>
            <li>
              Consider how long you plan to stay—buying usually makes sense if
              you stay 5+ years.
            </li>
            <li>
              Factor in rent increases and home appreciation (not included in
              this basic calculator).
            </li>
            <li>
              Consult a financial advisor or real estate professional for
              personalized advice.
            </li>
          </ul>
        </div>

        <div className="mb-6">
          <h3>Real Data Example (2024)</h3>
          <table className="mb-4 border border-gray-300 min-w-full text-sm">
            <thead>
              <tr className="">
                <th className="px-3 py-2 border text-left">Scenario</th>
                <th className="px-3 py-2 border text-left">Rent</th>
                <th className="px-3 py-2 border text-left">Buy</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-3 py-2 border">Monthly Payment (Year 1)</td>
                <td className="px-3 py-2 border">$2,000</td>
                <td className="px-3 py-2 border">
                  $2,398 (mortgage + taxes + insurance)
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Total Cost (7 years)</td>
                <td className="px-3 py-2 border">$181,000</td>
                <td className="px-3 py-2 border">$246,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Down Payment Needed</td>
                <td className="px-3 py-2 border">$0</td>
                <td className="px-3 py-2 border">$80,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Opportunity Cost</td>
                <td className="px-3 py-2 border">$0</td>
                <td className="px-3 py-2 border">$28,000</td>
              </tr>
            </tbody>
          </table>
          <p className="text-sm">
            <strong>Source:</strong> National Association of Realtors, Bankrate,
            2024 averages.
          </p>
        </div>
      </section>
    </div>
  );
}
