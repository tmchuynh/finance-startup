"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import React, { useState } from "react";

const NewVsUsedVsLeasingCar: React.FC = () => {
  // New car
  const [newPrice, setNewPrice] = useState(35000);
  const [newDown, setNewDown] = useState(5000);
  const [newLoanRate, setNewLoanRate] = useState(5);
  const [newLoanTerm, setNewLoanTerm] = useState(60);
  const [newInsurance, setNewInsurance] = useState(1400);
  const [newMaintenance, setNewMaintenance] = useState(600);
  const [newDepreciation, setNewDepreciation] = useState(15);

  // Used car
  const [usedPrice, setUsedPrice] = useState(18000);
  const [usedDown, setUsedDown] = useState(3000);
  const [usedLoanRate, setUsedLoanRate] = useState(7);
  const [usedLoanTerm, setUsedLoanTerm] = useState(48);
  const [usedInsurance, setUsedInsurance] = useState(900);
  const [usedMaintenance, setUsedMaintenance] = useState(900);
  const [usedDepreciation, setUsedDepreciation] = useState(10);

  // Leasing
  const [leaseMonthly, setLeaseMonthly] = useState(400);
  const [leaseDown, setLeaseDown] = useState(2000);
  const [leaseTerm, setLeaseTerm] = useState(36);
  const [leaseInsurance, setLeaseInsurance] = useState(1200);
  const [leaseMaintenance, setLeaseMaintenance] = useState(400);

  // Years to compare
  const [years, setYears] = useState(5);

  // Helper: loan monthly payment
  function calcLoanMonthly(principal: number, rate: number, term: number) {
    if (principal <= 0) return 0;
    const r = rate / 100 / 12;
    return (principal * r) / (1 - Math.pow(1 + r, -term));
  }

  // New car total cost
  function calcNewCarTotal() {
    const loanMonths = Math.min(years * 12, newLoanTerm);
    const loanMonthly = calcLoanMonthly(
      newPrice - newDown,
      newLoanRate,
      newLoanTerm
    );
    const loanTotal = loanMonthly * loanMonths;
    const totalDown = newDown;
    const totalInsurance = newInsurance * years;
    const totalMaintenance = newMaintenance * years;
    // Depreciation: percent of original price per year
    const depreciation = (newDepreciation / 100) * newPrice * years;
    return (
      totalDown + loanTotal + totalInsurance + totalMaintenance + depreciation
    );
  }

  // Used car total cost
  function calcUsedCarTotal() {
    const loanMonths = Math.min(years * 12, usedLoanTerm);
    const loanMonthly = calcLoanMonthly(
      usedPrice - usedDown,
      usedLoanRate,
      usedLoanTerm
    );
    const loanTotal = loanMonthly * loanMonths;
    const totalDown = usedDown;
    const totalInsurance = usedInsurance * years;
    const totalMaintenance = usedMaintenance * years;
    const depreciation = (usedDepreciation / 100) * usedPrice * years;
    return (
      totalDown + loanTotal + totalInsurance + totalMaintenance + depreciation
    );
  }

  // Lease total cost (assume rolling leases if years > leaseTerm)
  function calcLeaseTotal() {
    const fullTerms = Math.floor((years * 12) / leaseTerm);
    const remMonths = (years * 12) % leaseTerm;
    const totalLeasePayments =
      (fullTerms * leaseTerm + remMonths) * leaseMonthly;
    const totalDown = leaseDown * (fullTerms + (remMonths > 0 ? 1 : 0));
    const totalInsurance = leaseInsurance * years;
    const totalMaintenance = leaseMaintenance * years;
    return totalLeasePayments + totalDown + totalInsurance + totalMaintenance;
  }

  return (
    <div className="mx-auto pt-6 sm:pt-12 lg:pt-16 pb-24 lg:pb-32 w-10/12 md:w-11/12">
      <h1>New vs Used vs Leasing Car Calculator</h1>
      <h5>Make informed decisions about your car purchase or lease</h5>
      <div className="gap-4 grid lg:grid-cols-2">
        <div>
          <p>
            This calculator helps you compare the total cost of owning a new
            car, a used car, or leasing a car over a specified number of years.
            Please fill out the form below to see the results.
          </p>
          <p>
            Use this tool to estimate the total cost of owning a new car, a used
            car, or leasing a car over a specified number of years. Enter the
            relevant details for each option, and the calculator will provide
            you with the total cost for each option. This tool is for
            informational purposes only and should not be considered financial
            advice. Please consult with a financial advisor for personalized
            recommendations based on your individual circumstances.
          </p>
          <p>
            Note: This calculator does not account for resale value, taxes, or
            fees. It is recommended to consult with a financial advisor for a
            more comprehensive analysis of your specific situation.
          </p>
        </div>
        <div>
          <p>
            This calculator assumes that the car will be driven for the entire
            duration of the loan or lease term. It does not account for any
            potential resale value of the car at the end of the term. The
            depreciation value is calculated based on the initial purchase price
            of the car and the specified depreciation rate. The calculator also
            assumes that the insurance and maintenance costs will remain
            constant over the specified period. Actual costs may vary based on
            individual circumstances, market conditions, and other factors.
            Please use this calculator as a general guide and consult with a
            financial advisor for personalized advice.
          </p>
          <p>
            This calculator is for informational purposes only and should not be
            considered financial advice. Actual costs and savings may vary based
            on individual circumstances, market conditions, and other factors.
            Please consult with a financial advisor for personalized
            recommendations based on your individual situation.
          </p>
        </div>
      </div>

      {/* Table: Typical Car Costs */}
      <div className="my-8">
        <h2>Typical Car Costs (US, 2024)</h2>
        <div className="overflow-x-auto">
          <table className="border border-gray-300 min-w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-3 py-2 border text-left">Option</th>
                <th className="px-3 py-2 border text-left">Annual Cost</th>
                <th className="px-3 py-2 border text-left">Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-3 py-2 border">New Car</td>
                <td className="px-3 py-2 border">$8,000 - $12,000</td>
                <td className="px-3 py-2 border">
                  Higher depreciation, higher insurance
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Used Car</td>
                <td className="px-3 py-2 border">$5,000 - $8,000</td>
                <td className="px-3 py-2 border">
                  Lower depreciation, lower insurance
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Leasing</td>
                <td className="px-3 py-2 border">$5,000 - $10,000</td>
                <td className="px-3 py-2 border">
                  No equity, mileage limits, new car every few years
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Table: Pros and Cons */}
      <div className="my-8">
        <h2>Pros and Cons</h2>
        <div className="overflow-x-auto">
          <table className="border border-gray-300 min-w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-3 py-2 border text-left">Option</th>
                <th className="px-3 py-2 border text-left">Pros</th>
                <th className="px-3 py-2 border text-left">Cons</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-3 py-2 border">New Car</td>
                <td className="px-3 py-2 border">
                  Latest features
                  <br />
                  Full warranty
                  <br />
                  Customization
                </td>
                <td className="px-3 py-2 border">
                  Highest cost
                  <br />
                  Fastest depreciation
                  <br />
                  Higher insurance
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Used Car</td>
                <td className="px-3 py-2 border">
                  Lower cost
                  <br />
                  Slower depreciation
                  <br />
                  Lower insurance
                </td>
                <td className="px-3 py-2 border">
                  Shorter warranty
                  <br />
                  Possible repairs
                  <br />
                  Fewer choices
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Leasing</td>
                <td className="px-3 py-2 border">
                  Lower monthly payment
                  <br />
                  New car every few years
                  <br />
                  Fewer repair worries
                </td>
                <td className="px-3 py-2 border">
                  No equity
                  <br />
                  Mileage limits
                  <br />
                  Fees for wear/tear
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <form onSubmit={(e) => e.preventDefault()}>
        <div className="mt-5">
          <h2>Years to Compare</h2>
          <div>
            <Label>Years</Label>
            <div className="flex items-center gap-4">
              <Slider
                min={1}
                max={10}
                step={1}
                value={[years]}
                onValueChange={([v]) => setYears(v)}
                className="w-2/3"
              />
              <Input
                type="number"
                value={years}
                min={1}
                max={10}
                onChange={(e) => setYears(Number(e.target.value))}
                className="w-1/3"
              />
            </div>
          </div>
        </div>
        <div className="mt-5">
          <h2>New Car</h2>
          <div className="gap-4 grid lg:grid-cols-2 mt-3">
            <div>
              <Label>Price ($)</Label>
              <div className="flex items-center gap-4">
                <Slider
                  min={10000}
                  max={100000}
                  step={500}
                  value={[newPrice]}
                  onValueChange={([v]) => setNewPrice(v)}
                  className="w-2/3"
                />
                <Input
                  type="number"
                  value={newPrice}
                  min={0}
                  onChange={(e) => setNewPrice(Number(e.target.value))}
                  className="w-1/3"
                />
              </div>
            </div>
            <div>
              <Label>Down Payment ($)</Label>
              <div className="flex items-center gap-4">
                <Slider
                  min={0}
                  max={50000}
                  step={500}
                  value={[newDown]}
                  onValueChange={([v]) => setNewDown(v)}
                  className="w-2/3"
                />
                <Input
                  type="number"
                  value={newDown}
                  min={0}
                  onChange={(e) => setNewDown(Number(e.target.value))}
                  className="w-1/3"
                />
              </div>
            </div>
            <div>
              <Label>Loan Rate (%)</Label>
              <div className="flex items-center gap-4">
                <Slider
                  min={0}
                  max={15}
                  step={0.01}
                  value={[newLoanRate]}
                  onValueChange={([v]) => setNewLoanRate(Number(v.toFixed(2)))}
                  className="w-2/3"
                />
                <Input
                  type="number"
                  value={newLoanRate}
                  min={0}
                  step={0.01}
                  onChange={(e) => setNewLoanRate(Number(e.target.value))}
                  className="w-1/3"
                />
              </div>
            </div>
            <div>
              <Label>Loan Term (months)</Label>
              <div className="flex items-center gap-4">
                <Slider
                  min={12}
                  max={84}
                  step={1}
                  value={[newLoanTerm]}
                  onValueChange={([v]) => setNewLoanTerm(v)}
                  className="w-2/3"
                />
                <Input
                  type="number"
                  value={newLoanTerm}
                  min={1}
                  max={84}
                  onChange={(e) => setNewLoanTerm(Number(e.target.value))}
                  className="w-1/3"
                />
              </div>
            </div>
            <div>
              <Label>Insurance (annual $)</Label>
              <div className="flex items-center gap-4">
                <Slider
                  min={0}
                  max={5000}
                  step={50}
                  value={[newInsurance]}
                  onValueChange={([v]) => setNewInsurance(v)}
                  className="w-2/3"
                />
                <Input
                  type="number"
                  value={newInsurance}
                  min={0}
                  onChange={(e) => setNewInsurance(Number(e.target.value))}
                  className="w-1/3"
                />
              </div>
            </div>
            <div>
              <Label>Maintenance (annual $)</Label>
              <div className="flex items-center gap-4">
                <Slider
                  min={0}
                  max={5000}
                  step={50}
                  value={[newMaintenance]}
                  onValueChange={([v]) => setNewMaintenance(v)}
                  className="w-2/3"
                />
                <Input
                  type="number"
                  value={newMaintenance}
                  min={0}
                  onChange={(e) => setNewMaintenance(Number(e.target.value))}
                  className="w-1/3"
                />
              </div>
            </div>
            <div>
              <Label>Depreciation (% of price/year)</Label>
              <div className="flex items-center gap-4">
                <Slider
                  min={0}
                  max={25}
                  step={0.1}
                  value={[newDepreciation]}
                  onValueChange={([v]) =>
                    setNewDepreciation(Number(v.toFixed(1)))
                  }
                  className="w-2/3"
                />
                <Input
                  type="number"
                  value={newDepreciation}
                  min={0}
                  step={0.1}
                  onChange={(e) => setNewDepreciation(Number(e.target.value))}
                  className="w-1/3"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <h2>Used Car</h2>
          <div className="gap-4 grid lg:grid-cols-2 mt-3">
            <div>
              <Label>Price ($)</Label>
              <div className="flex items-center gap-4">
                <Slider
                  min={2000}
                  max={80000}
                  step={500}
                  value={[usedPrice]}
                  onValueChange={([v]) => setUsedPrice(v)}
                  className="w-2/3"
                />
                <Input
                  type="number"
                  value={usedPrice}
                  min={0}
                  onChange={(e) => setUsedPrice(Number(e.target.value))}
                  className="w-1/3"
                />
              </div>
            </div>
            <div>
              <Label>Down Payment ($)</Label>
              <div className="flex items-center gap-4">
                <Slider
                  min={0}
                  max={40000}
                  step={500}
                  value={[usedDown]}
                  onValueChange={([v]) => setUsedDown(v)}
                  className="w-2/3"
                />
                <Input
                  type="number"
                  value={usedDown}
                  min={0}
                  onChange={(e) => setUsedDown(Number(e.target.value))}
                  className="w-1/3"
                />
              </div>
            </div>
            <div>
              <Label>Loan Rate (%)</Label>
              <div className="flex items-center gap-4">
                <Slider
                  min={0}
                  max={15}
                  step={0.01}
                  value={[usedLoanRate]}
                  onValueChange={([v]) => setUsedLoanRate(Number(v.toFixed(2)))}
                  className="w-2/3"
                />
                <Input
                  type="number"
                  value={usedLoanRate}
                  min={0}
                  step={0.01}
                  onChange={(e) => setUsedLoanRate(Number(e.target.value))}
                  className="w-1/3"
                />
              </div>
            </div>
            <div>
              <Label>Loan Term (months)</Label>
              <div className="flex items-center gap-4">
                <Slider
                  min={12}
                  max={84}
                  step={1}
                  value={[usedLoanTerm]}
                  onValueChange={([v]) => setUsedLoanTerm(v)}
                  className="w-2/3"
                />
                <Input
                  type="number"
                  value={usedLoanTerm}
                  min={1}
                  max={84}
                  onChange={(e) => setUsedLoanTerm(Number(e.target.value))}
                  className="w-1/3"
                />
              </div>
            </div>
            <div>
              <Label>Insurance (annual $)</Label>
              <div className="flex items-center gap-4">
                <Slider
                  min={0}
                  max={5000}
                  step={50}
                  value={[usedInsurance]}
                  onValueChange={([v]) => setUsedInsurance(v)}
                  className="w-2/3"
                />
                <Input
                  type="number"
                  value={usedInsurance}
                  min={0}
                  onChange={(e) => setUsedInsurance(Number(e.target.value))}
                  className="w-1/3"
                />
              </div>
            </div>
            <div>
              <Label>Maintenance (annual $)</Label>
              <div className="flex items-center gap-4">
                <Slider
                  min={0}
                  max={5000}
                  step={50}
                  value={[usedMaintenance]}
                  onValueChange={([v]) => setUsedMaintenance(v)}
                  className="w-2/3"
                />
                <Input
                  type="number"
                  value={usedMaintenance}
                  min={0}
                  onChange={(e) => setUsedMaintenance(Number(e.target.value))}
                  className="w-1/3"
                />
              </div>
            </div>
            <div>
              <Label>Depreciation (% of price/year)</Label>
              <div className="flex items-center gap-4">
                <Slider
                  min={0}
                  max={20}
                  step={0.1}
                  value={[usedDepreciation]}
                  onValueChange={([v]) =>
                    setUsedDepreciation(Number(v.toFixed(1)))
                  }
                  className="w-2/3"
                />
                <Input
                  type="number"
                  value={usedDepreciation}
                  min={0}
                  step={0.1}
                  onChange={(e) => setUsedDepreciation(Number(e.target.value))}
                  className="w-1/3"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5">
          <h2>Leasing</h2>
          <div className="gap-4 grid lg:grid-cols-2 mt-3">
            <div>
              <Label>Lease Payment (monthly $)</Label>
              <div className="flex items-center gap-4">
                <Slider
                  min={100}
                  max={2000}
                  step={10}
                  value={[leaseMonthly]}
                  onValueChange={([v]) => setLeaseMonthly(v)}
                  className="w-2/3"
                />
                <Input
                  type="number"
                  value={leaseMonthly}
                  min={0}
                  onChange={(e) => setLeaseMonthly(Number(e.target.value))}
                  className="w-1/3"
                />
              </div>
            </div>
            <div>
              <Label>Lease Down Payment ($)</Label>
              <div className="flex items-center gap-4">
                <Slider
                  min={0}
                  max={10000}
                  step={100}
                  value={[leaseDown]}
                  onValueChange={([v]) => setLeaseDown(v)}
                  className="w-2/3"
                />
                <Input
                  type="number"
                  value={leaseDown}
                  min={0}
                  onChange={(e) => setLeaseDown(Number(e.target.value))}
                  className="w-1/3"
                />
              </div>
            </div>
            <div>
              <Label>Lease Term (months)</Label>
              <div className="flex items-center gap-4">
                <Slider
                  min={12}
                  max={60}
                  step={1}
                  value={[leaseTerm]}
                  onValueChange={([v]) => setLeaseTerm(v)}
                  className="w-2/3"
                />
                <Input
                  type="number"
                  value={leaseTerm}
                  min={1}
                  max={60}
                  onChange={(e) => setLeaseTerm(Number(e.target.value))}
                  className="w-1/3"
                />
              </div>
            </div>
            <div>
              <Label>Insurance (annual $)</Label>
              <div className="flex items-center gap-4">
                <Slider
                  min={0}
                  max={5000}
                  step={50}
                  value={[leaseInsurance]}
                  onValueChange={([v]) => setLeaseInsurance(v)}
                  className="w-2/3"
                />
                <Input
                  type="number"
                  value={leaseInsurance}
                  min={0}
                  onChange={(e) => setLeaseInsurance(Number(e.target.value))}
                  className="w-1/3"
                />
              </div>
            </div>
            <div>
              <Label>Maintenance (annual $)</Label>
              <div className="flex items-center gap-4">
                <Slider
                  min={0}
                  max={5000}
                  step={50}
                  value={[leaseMaintenance]}
                  onValueChange={([v]) => setLeaseMaintenance(v)}
                  className="w-2/3"
                />
                <Input
                  type="number"
                  value={leaseMaintenance}
                  min={0}
                  onChange={(e) => setLeaseMaintenance(Number(e.target.value))}
                  className="w-1/3"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5">
          <h2>Results</h2>
          <div className="gap-5 grid grid-cols-1 md:grid-cols-3 mt-3">
            <div className="bg-white shadow p-5 border border-gray-300 rounded-lg">
              <h3 className="flex items-center gap-2 mb-2 font-semibold text-blue-700 text-lg">
                New Car Total Cost
              </h3>
              <ul>
                <li>
                  <span className="text-gray-700"> Total Cost:</span>{" "}
                  <strong className="text-blue-900">
                    $
                    {calcNewCarTotal().toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    })}
                  </strong>
                </li>
              </ul>
            </div>

            <div className="bg-white shadow p-5 border border-gray-300 rounded-lg">
              <h3 className="flex items-center gap-2 mb-2 font-semibold text-green-700 text-lg">
                Used Car Total Cost
              </h3>
              <ul>
                <li>
                  <span className="text-gray-700">Total Cost:</span>{" "}
                  <strong className="text-green-900">
                    $
                    {calcUsedCarTotal().toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    })}
                  </strong>
                </li>
              </ul>
            </div>

            <div className="bg-white shadow p-5 border border-gray-300 rounded-lg">
              <h3 className="flex items-center gap-2 mb-2 font-semibold text-lg text-orange-700">
                Leasing Total Cost
              </h3>
              <ul>
                <li>
                  <span className="text-gray-700">Total Cost:</span>{" "}
                  <strong className="text-orange-900">
                    $
                    {calcLeaseTotal().toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    })}
                  </strong>
                </li>
              </ul>
            </div>
          </div>

          <p className="mt-4">
            Note: The total cost includes down payment, monthly payments,
            insurance, maintenance, and depreciation (for purchase options).
            Leasing costs include down payment, monthly payments, insurance, and
            maintenance. The calculator does not account for taxes, fees, or
            resale value.
          </p>
        </div>
      </form>
    </div>
  );
};
export default NewVsUsedVsLeasingCar;