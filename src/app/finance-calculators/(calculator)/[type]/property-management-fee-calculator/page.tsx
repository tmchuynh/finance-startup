"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function PropertyManagementFeeCalculator() {
  const [monthlyRent, setMonthlyRent] = useState<string>("");
  const [managementFeeRate, setManagementFeeRate] = useState<string>("8");
  const [leasingFee, setLeasingFee] = useState<string>("500");
  const [numUnits, setNumUnits] = useState<string>("1");
  const [vacancyRate, setVacancyRate] = useState<string>("5");
  const [otherFees, setOtherFees] = useState<string>("0");

  const [result, setResult] = useState<{
    annualRent: number;
    annualMgmtFee: number;
    annualLeasingFee: number;
    annualOtherFees: number;
    totalAnnualFees: number;
    netIncomeAfterFees: number;
  } | null>(null);

  const handleCalculate = () => {
    const rent = parseFloat(monthlyRent);
    const mgmtRate = parseFloat(managementFeeRate) / 100;
    const leaseFee = parseFloat(leasingFee);
    const units = parseInt(numUnits, 10);
    const vacancy = parseFloat(vacancyRate) / 100;
    const other = parseFloat(otherFees);

    if (
      !isNaN(rent) &&
      !isNaN(mgmtRate) &&
      !isNaN(leaseFee) &&
      !isNaN(units) &&
      !isNaN(vacancy) &&
      !isNaN(other) &&
      rent > 0 &&
      mgmtRate >= 0 &&
      leaseFee >= 0 &&
      units > 0 &&
      vacancy >= 0 &&
      vacancy < 1 &&
      other >= 0
    ) {
      const annualRent = rent * 12 * units * (1 - vacancy);
      const annualMgmtFee = annualRent * mgmtRate;
      const annualLeasingFee = leaseFee * units; // assume 1 new lease per unit per year
      const annualOtherFees = other * units;
      const totalAnnualFees =
        annualMgmtFee + annualLeasingFee + annualOtherFees;
      const netIncomeAfterFees = annualRent - totalAnnualFees;

      setResult({
        annualRent,
        annualMgmtFee,
        annualLeasingFee,
        annualOtherFees,
        totalAnnualFees,
        netIncomeAfterFees,
      });
    } else {
      setResult(null);
    }
  };

  return (
    <div className="mt-8 md:mt-12 mx-auto h-full w-10/12 md:w-11/12">
      <h1>Property Management Fee Calculator</h1>
      <p className="mb-4">
        <strong>
          Estimate the annual cost of hiring a property manager for your rental
          property, including management, leasing, and other fees.
        </strong>
      </p>
      <section className="mb-8">
        <h2>How Does This Calculator Work?</h2>
        <p>
          Enter your monthly rent, management fee rate, leasing fee, number of
          units, vacancy rate, and any other annual fees. The calculator will
          estimate your total annual management costs and net rental income
          after fees.
        </p>
        <div className="my-6">
          <h3>Property Management Fee Details</h3>
          <table className="mb-4 border border-gray-300 min-w-full text-sm">
            <thead>
              <tr className="">
                <th className="px-3 py-2 border text-left">Fee Type</th>
                <th className="px-3 py-2 border text-left">Typical Range</th>
                <th className="px-3 py-2 border text-left">Explanation</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-3 py-2 border">Management Fee</td>
                <td className="px-3 py-2 border">8% - 12% of rent</td>
                <td className="px-3 py-2 border">
                  Covers rent collection, maintenance coordination, tenant
                  communication
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Leasing Fee</td>
                <td className="px-3 py-2 border">$300 - $1,000 per lease</td>
                <td className="px-3 py-2 border">
                  Charged when a new tenant is placed
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Renewal Fee</td>
                <td className="px-3 py-2 border">$100 - $300</td>
                <td className="px-3 py-2 border">
                  For lease renewals (not always charged)
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Other Fees</td>
                <td className="px-3 py-2 border">$0 - $500/year</td>
                <td className="px-3 py-2 border">
                  Admin, inspection, eviction, etc.
                </td>
              </tr>
            </tbody>
          </table>
          <p className="text-sm">
            <strong>Source:</strong> National Association of Residential
            Property Managers, 2024 averages.
          </p>
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
                <td className="px-3 py-2 border">Monthly Rent ($)</td>
                <td className="px-3 py-2 border">$1,200 - $2,500</td>
                <td className="px-3 py-2 border">Per unit, varies by market</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Management Fee (%)</td>
                <td className="px-3 py-2 border">8% - 12%</td>
                <td className="px-3 py-2 border">
                  Of collected rent (U.S. average: ~10%)
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Leasing Fee ($)</td>
                <td className="px-3 py-2 border">$300 - $1,000</td>
                <td className="px-3 py-2 border">Per new lease signed</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Number of Units</td>
                <td className="px-3 py-2 border">1 - 10</td>
                <td className="px-3 py-2 border">
                  Single-family or small multi-family
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Vacancy Rate (%)</td>
                <td className="px-3 py-2 border">5% - 8%</td>
                <td className="px-3 py-2 border">U.S. average: ~6%</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Other Annual Fees ($)</td>
                <td className="px-3 py-2 border">$0 - $500</td>
                <td className="px-3 py-2 border">Admin, inspection, etc.</td>
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
              placeholder="Enter monthly rent per unit"
              min="0"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">
              Management Fee Rate (%):
            </label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={managementFeeRate}
              onChange={(e) => setManagementFeeRate(e.target.value)}
              placeholder="e.g., 10"
              min="0"
              max="100"
              step="0.01"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">
              Leasing Fee ($ per lease):
            </label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={leasingFee}
              onChange={(e) => setLeasingFee(e.target.value)}
              placeholder="e.g., 500"
              min="0"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">Number of Units:</label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={numUnits}
              onChange={(e) => setNumUnits(e.target.value)}
              placeholder="e.g., 1"
              min="1"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">Vacancy Rate (%):</label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={vacancyRate}
              onChange={(e) => setVacancyRate(e.target.value)}
              placeholder="e.g., 5"
              min="0"
              max="100"
              step="0.01"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">
              Other Annual Fees ($):
            </label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={otherFees}
              onChange={(e) => setOtherFees(e.target.value)}
              placeholder="e.g., 200"
              min="0"
            />
          </div>
        </div>
        <Button className="mt-2 px-4 py-2 rounded" onClick={handleCalculate}>
          Calculate Management Fees
        </Button>
        {result && (
          <div className="flex flex-col gap-4 mt-6">
            <div className="shadow p-4 border rounded-lg">
              <h3>Results</h3>
              <table className="border border-gray-300 min-w-full text-sm">
                <tbody>
                  <tr>
                    <td className="px-3 py-2 border font-medium">
                      Annual Rent (after vacancy)
                    </td>
                    <td className="px-3 py-2 border">
                      $
                      {result.annualRent.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border font-medium">
                      Annual Management Fee
                    </td>
                    <td className="px-3 py-2 border">
                      -$
                      {result.annualMgmtFee.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border font-medium">
                      Annual Leasing Fee
                    </td>
                    <td className="px-3 py-2 border">
                      -$
                      {result.annualLeasingFee.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border font-medium">
                      Other Annual Fees
                    </td>
                    <td className="px-3 py-2 border">
                      -$
                      {result.annualOtherFees.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border font-medium">
                      Total Annual Fees
                    </td>
                    <td className="px-3 py-2 border">
                      -$
                      {result.totalAnnualFees.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border font-medium">
                      Net Income After Fees
                    </td>
                    <td className="px-3 py-2 border font-bold">
                      $
                      {result.netIncomeAfterFees.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="mt-2 text-sm">
                <strong>Note:</strong> Actual fees and net income may vary.
                Always review your management contract and ask for a full fee
                schedule.
              </div>
            </div>
          </div>
        )}
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
                  Rent charged per unit per month
                </td>
                <td className="px-3 py-2 border">$1,500</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Management Fee Rate</td>
                <td className="px-3 py-2 border">
                  Percent of collected rent paid to manager
                </td>
                <td className="px-3 py-2 border">10%</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Leasing Fee</td>
                <td className="px-3 py-2 border">
                  Fee for finding a new tenant
                </td>
                <td className="px-3 py-2 border">$500</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Number of Units</td>
                <td className="px-3 py-2 border">How many units you own</td>
                <td className="px-3 py-2 border">2</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Vacancy Rate</td>
                <td className="px-3 py-2 border">
                  Percent of time units are vacant
                </td>
                <td className="px-3 py-2 border">5%</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Other Fees</td>
                <td className="px-3 py-2 border">
                  Annual admin, inspection, or other fees
                </td>
                <td className="px-3 py-2 border">$200</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mb-6">
          <h3>Tips for Beginners</h3>
          <ul className="list-disc list-inside">
            <li>
              Management fees are usually a percentage of collected rent, not
              scheduled rent.
            </li>
            <li>Leasing fees are often charged per new tenant placed.</li>
            <li>Vacancy reduces your rental income and management fees.</li>
            <li>
              Ask for a full fee schedule before hiring a property manager.
            </li>
            <li>Compare several companies and read reviews before choosing.</li>
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
                <td className="px-3 py-2 border">Monthly Rent</td>
                <td className="px-3 py-2 border">$1,800</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Management Fee (10%)</td>
                <td className="px-3 py-2 border">$2,052/year</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Leasing Fee</td>
                <td className="px-3 py-2 border">$500/year</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Other Fees</td>
                <td className="px-3 py-2 border">$200/year</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Total Annual Fees</td>
                <td className="px-3 py-2 border">$2,752</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Net Income After Fees</td>
                <td className="px-3 py-2 border">$17,048</td>
              </tr>
            </tbody>
          </table>
          <p className="text-sm">
            <strong>Source:</strong> NARPM, Zillow, 2024 averages.
          </p>
        </div>
      </section>
    </div>
  );
}
