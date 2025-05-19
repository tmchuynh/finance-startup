"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

      <form onSubmit={(e) => e.preventDefault()}>
        <div className="mt-5">
          <h2>Years to Compare</h2>
          <div>
            <Label>Years</Label>
            <Input
              type="number"
              value={years}
              min={1}
              max={10}
              onChange={(e) => setYears(Number(e.target.value))}
            />
          </div>
        </div>
        <div className="mt-5">
          <h2>New Car</h2>
          <div className="gap-4 grid lg:grid-cols-2 mt-3">
            <div>
              <Label>Price ($)</Label>
              <Input
                type="number"
                value={newPrice}
                min={0}
                onChange={(e) => setNewPrice(Number(e.target.value))}
              />
            </div>
            <div>
              <Label>Down Payment ($)</Label>
              <Input
                type="number"
                value={newDown}
                min={0}
                onChange={(e) => setNewDown(Number(e.target.value))}
              />
            </div>
            <div>
              <Label>Loan Rate (%)</Label>
              <Input
                type="number"
                value={newLoanRate}
                min={0}
                step={0.01}
                onChange={(e) => setNewLoanRate(Number(e.target.value))}
              />
            </div>
            <div>
              <Label>Loan Term (months)</Label>
              <Input
                type="number"
                value={newLoanTerm}
                min={1}
                max={84}
                onChange={(e) => setNewLoanTerm(Number(e.target.value))}
              />
            </div>
            <div>
              <Label>Insurance (annual $)</Label>
              <Input
                type="number"
                value={newInsurance}
                min={0}
                onChange={(e) => setNewInsurance(Number(e.target.value))}
              />
            </div>
            <div>
              <Label>Maintenance (annual $)</Label>
              <Input
                type="number"
                value={newMaintenance}
                min={0}
                onChange={(e) => setNewMaintenance(Number(e.target.value))}
              />
            </div>
            <div>
              <Label>Depreciation (% of price/year)</Label>
              <Input
                type="number"
                value={newDepreciation}
                min={0}
                step={0.1}
                onChange={(e) => setNewDepreciation(Number(e.target.value))}
              />
            </div>
          </div>
        </div>

        <div className="mt-5">
          <h2>Used Car</h2>
          <div className="gap-4 grid lg:grid-cols-2 mt-3">
            <div>
              <Label>Price ($)</Label>
              <Input
                type="number"
                value={usedPrice}
                min={0}
                onChange={(e) => setUsedPrice(Number(e.target.value))}
              />
            </div>
            <div>
              <Label>Down Payment ($)</Label>
              <Input
                type="number"
                value={usedDown}
                min={0}
                onChange={(e) => setUsedDown(Number(e.target.value))}
              />
            </div>
            <div>
              <Label>Loan Rate (%)</Label>
              <Input
                type="number"
                value={usedLoanRate}
                min={0}
                step={0.01}
                onChange={(e) => setUsedLoanRate(Number(e.target.value))}
              />
            </div>
            <div>
              <Label>Loan Term (months)</Label>
              <Input
                type="number"
                value={usedLoanTerm}
                min={1}
                max={84}
                onChange={(e) => setUsedLoanTerm(Number(e.target.value))}
              />
            </div>
            <div>
              <Label>Insurance (annual $)</Label>
              <Input
                type="number"
                value={usedInsurance}
                min={0}
                onChange={(e) => setUsedInsurance(Number(e.target.value))}
              />
            </div>
            <div>
              <Label>Maintenance (annual $)</Label>
              <Input
                type="number"
                value={usedMaintenance}
                min={0}
                onChange={(e) => setUsedMaintenance(Number(e.target.value))}
              />
            </div>
            <div>
              <Label>Depreciation (% of price/year)</Label>
              <Input
                type="number"
                value={usedDepreciation}
                min={0}
                step={0.1}
                onChange={(e) => setUsedDepreciation(Number(e.target.value))}
              />
            </div>
          </div>
        </div>
        <div className="mt-5">
          <h2>Leasing</h2>
          <div className="gap-4 grid lg:grid-cols-2 mt-3">
            <div>
              <Label>Lease Payment (monthly $)</Label>
              <Input
                type="number"
                value={leaseMonthly}
                min={0}
                onChange={(e) => setLeaseMonthly(Number(e.target.value))}
              />
            </div>
            <div>
              <Label>Lease Down Payment ($)</Label>
              <Input
                type="number"
                value={leaseDown}
                min={0}
                onChange={(e) => setLeaseDown(Number(e.target.value))}
              />
            </div>
            <div>
              <Label>Lease Term (months)</Label>
              <Input
                type="number"
                value={leaseTerm}
                min={1}
                max={60}
                onChange={(e) => setLeaseTerm(Number(e.target.value))}
              />
            </div>
            <div>
              <Label>Insurance (annual $)</Label>
              <Input
                type="number"
                value={leaseInsurance}
                min={0}
                onChange={(e) => setLeaseInsurance(Number(e.target.value))}
              />
            </div>
            <div>
              <Label>Maintenance (annual $)</Label>
              <Input
                type="number"
                value={leaseMaintenance}
                min={0}
                onChange={(e) => setLeaseMaintenance(Number(e.target.value))}
              />
            </div>
          </div>
        </div>
      </form>
      <div className="mt-5">
        {" "}
        <h2>Results for {years} years</h2>
        <div className="gap-5 grid md:grid-cols-3 mt-3">
          <div>
            <h3>New Car</h3>
            <p>
              <strong>
                $
                {calcNewCarTotal().toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })}
              </strong>
            </p>
          </div>
          <div>
            <h3>Used Car</h3>
            <p>
              <strong>
                $
                {calcUsedCarTotal().toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })}
              </strong>
            </p>
          </div>
          <div>
            <h3>Leasing</h3>
            <p>
              <strong>
                $
                {calcLeaseTotal().toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })}
              </strong>
            </p>
          </div>
        </div>
      </div>
      <p style={{ marginTop: 24, color: "#666" }}>
        Note: This calculator does not account for resale value, taxes, or fees.
      </p>
    </div>
  );
};

export default NewVsUsedVsLeasingCar;
