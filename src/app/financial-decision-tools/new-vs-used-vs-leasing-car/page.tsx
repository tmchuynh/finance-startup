"use client";

import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
    <div className="mx-auto pb-24 lg:pb-32 pt-6 sm:pt-12 lg:pt-16 w-10/12 md:w-11/12">
      {/* Header Section */}
      <div className="mb-8 text-center">
        <h1 className="mb-4 font-bold text-4xl">
          New vs Used vs Leasing Car Calculator
        </h1>
        <p className="mb-6 text-xl">
          Make informed decisions about your car purchase or lease
        </p>
        <div className="gap-6 grid grid-cols-1 lg:grid-cols-2 mx-auto max-w-5xl text-left">
          <div className="space-y-4">
            <p>
              This calculator helps you compare the total cost of owning a new
              car, a used car, or leasing a car over a specified number of
              years. Please fill out the form below to see the results.
            </p>
            <p>
              Use this tool to estimate the total cost of owning a new car, a
              used car, or leasing a car over a specified number of years. Enter
              the relevant details for each option, and the calculator will
              provide you with the total cost for each option.
            </p>
          </div>
          <div className="space-y-4">
            <p>
              This calculator assumes that the car will be driven for the entire
              duration of the loan or lease term. The depreciation value is
              calculated based on the initial purchase price and the specified
              depreciation rate.
            </p>
            <p className="text-sm">
              <strong>Note:</strong> This tool is for informational purposes
              only and should not be considered financial advice. Please consult
              with a financial advisor for personalized recommendations.
            </p>
          </div>
        </div>
      </div>

      {/* Car Costs Information Table */}
      <div className="shadow mb-8 border rounded-lg overflow-hidden">
        <h2 className="p-6 pb-4 font-semibold text-xl">
          Typical Car Costs (US, 2024)
        </h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Option</TableHead>
              <TableHead>Annual Cost</TableHead>
              <TableHead>Notes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">New Car</TableCell>
              <TableCell>$8,000 - $12,000</TableCell>
              <TableCell>Higher depreciation, higher insurance</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Used Car</TableCell>
              <TableCell>$5,000 - $8,000</TableCell>
              <TableCell>Lower depreciation, lower insurance</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Leasing</TableCell>
              <TableCell>$5,000 - $10,000</TableCell>
              <TableCell>
                No equity, mileage limits, new car every few years
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      {/* Pros and Cons Table */}
      <div className="shadow mb-8 border rounded-lg overflow-hidden">
        <h2 className="p-6 pb-4 font-semibold text-xl">Pros and Cons</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Option</TableHead>
              <TableHead>Pros</TableHead>
              <TableHead>Cons</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">New Car</TableCell>
              <TableCell>
                <ul className="space-y-1">
                  <li>Latest features</li>
                  <li>Full warranty</li>
                  <li>Customization</li>
                </ul>
              </TableCell>
              <TableCell>
                <ul className="space-y-1">
                  <li>Highest cost</li>
                  <li>Fastest depreciation</li>
                  <li>Higher insurance</li>
                </ul>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Used Car</TableCell>
              <TableCell>
                <ul className="space-y-1">
                  <li>Lower cost</li>
                  <li>Slower depreciation</li>
                  <li>Lower insurance</li>
                </ul>
              </TableCell>
              <TableCell>
                <ul className="space-y-1">
                  <li>Shorter warranty</li>
                  <li>Possible repairs</li>
                  <li>Fewer choices</li>
                </ul>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Leasing</TableCell>
              <TableCell>
                <ul className="space-y-1">
                  <li>Lower monthly payment</li>
                  <li>New car every few years</li>
                  <li>Fewer repair worries</li>
                </ul>
              </TableCell>
              <TableCell>
                <ul className="space-y-1">
                  <li>No equity</li>
                  <li>Mileage limits</li>
                  <li>Fees for wear/tear</li>
                </ul>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      {/* Calculator Form */}
      <div className="shadow mb-8 p-6 border rounded-lg">
        <h2 className="mb-6 font-semibold text-2xl">
          Car Comparison Calculator
        </h2>

        <form onSubmit={(e) => e.preventDefault()}>
          {/* Time Frame Selection */}
          <div className="mb-8 p-6 border rounded-lg">
            <h3 className="flex gap-2 items-center mb-6 font-semibold text-xl">
              ⏱️ Comparison Period
            </h3>
            <div>
              <Label className="font-medium text-sm">
                Years to Compare: {years} years
              </Label>
              <Slider
                value={[years]}
                onValueChange={(value) => setYears(value[0])}
                max={10}
                min={1}
                step={1}
                className="mt-2"
              />
              <div className="flex justify-between mt-1 text-xs">
                <span>1 year</span>
                <span>10 years</span>
              </div>
            </div>
          </div>

          <div className="gap-8 grid grid-cols-1 lg:grid-cols-3">
            {/* New Car Section */}
            <div className="p-6 border rounded-lg">
              <h3 className="flex gap-2 items-center mb-6 font-semibold text-xl">
                🚗 New Car
              </h3>
              <div className="space-y-6">
                <div>
                  <Label className="font-medium text-sm">
                    Price: ${newPrice.toLocaleString()}
                  </Label>
                  <Slider
                    value={[newPrice]}
                    onValueChange={(value) => setNewPrice(value[0])}
                    max={100000}
                    min={10000}
                    step={500}
                    className="mt-2"
                  />
                  <div className="flex justify-between mt-1 text-xs">
                    <span>$10,000</span>
                    <span>$100,000</span>
                  </div>
                </div>

                <div>
                  <Label className="font-medium text-sm">
                    Down Payment: ${newDown.toLocaleString()}
                  </Label>
                  <Slider
                    value={[newDown]}
                    onValueChange={(value) => setNewDown(value[0])}
                    max={50000}
                    min={0}
                    step={500}
                    className="mt-2"
                  />
                  <div className="flex justify-between mt-1 text-xs">
                    <span>$0</span>
                    <span>$50,000</span>
                  </div>
                </div>

                <div>
                  <Label className="font-medium text-sm">
                    Loan Rate: {newLoanRate}%
                  </Label>
                  <Slider
                    value={[newLoanRate]}
                    onValueChange={(value) =>
                      setNewLoanRate(Number(value[0].toFixed(2)))
                    }
                    max={15}
                    min={0}
                    step={0.1}
                    className="mt-2"
                  />
                  <div className="flex justify-between mt-1 text-xs">
                    <span>0%</span>
                    <span>15%</span>
                  </div>
                </div>

                <div>
                  <Label className="font-medium text-sm">
                    Loan Term: {newLoanTerm} months
                  </Label>
                  <Slider
                    value={[newLoanTerm]}
                    onValueChange={(value) => setNewLoanTerm(value[0])}
                    max={84}
                    min={12}
                    step={6}
                    className="mt-2"
                  />
                  <div className="flex justify-between mt-1 text-xs">
                    <span>12 months</span>
                    <span>84 months</span>
                  </div>
                </div>

                <div>
                  <Label className="font-medium text-sm">
                    Annual Insurance: ${newInsurance.toLocaleString()}
                  </Label>
                  <Slider
                    value={[newInsurance]}
                    onValueChange={(value) => setNewInsurance(value[0])}
                    max={5000}
                    min={0}
                    step={50}
                    className="mt-2"
                  />
                  <div className="flex justify-between mt-1 text-xs">
                    <span>$0</span>
                    <span>$5,000</span>
                  </div>
                </div>

                <div>
                  <Label className="font-medium text-sm">
                    Annual Maintenance: ${newMaintenance.toLocaleString()}
                  </Label>
                  <Slider
                    value={[newMaintenance]}
                    onValueChange={(value) => setNewMaintenance(value[0])}
                    max={5000}
                    min={0}
                    step={50}
                    className="mt-2"
                  />
                  <div className="flex justify-between mt-1 text-xs">
                    <span>$0</span>
                    <span>$5,000</span>
                  </div>
                </div>

                <div>
                  <Label className="font-medium text-sm">
                    Depreciation: {newDepreciation}% per year
                  </Label>
                  <Slider
                    value={[newDepreciation]}
                    onValueChange={(value) =>
                      setNewDepreciation(Number(value[0].toFixed(1)))
                    }
                    max={25}
                    min={0}
                    step={0.5}
                    className="mt-2"
                  />
                  <div className="flex justify-between mt-1 text-xs">
                    <span>0%</span>
                    <span>25%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Used Car Section */}
            <div className="p-6 border rounded-lg">
              <h3 className="flex gap-2 items-center mb-6 font-semibold text-xl">
                🚙 Used Car
              </h3>
              <div className="space-y-6">
                <div>
                  <Label className="font-medium text-sm">
                    Price: ${usedPrice.toLocaleString()}
                  </Label>
                  <Slider
                    value={[usedPrice]}
                    onValueChange={(value) => setUsedPrice(value[0])}
                    max={80000}
                    min={2000}
                    step={500}
                    className="mt-2"
                  />
                  <div className="flex justify-between mt-1 text-xs">
                    <span>$2,000</span>
                    <span>$80,000</span>
                  </div>
                </div>

                <div>
                  <Label className="font-medium text-sm">
                    Down Payment: ${usedDown.toLocaleString()}
                  </Label>
                  <Slider
                    value={[usedDown]}
                    onValueChange={(value) => setUsedDown(value[0])}
                    max={40000}
                    min={0}
                    step={500}
                    className="mt-2"
                  />
                  <div className="flex justify-between mt-1 text-xs">
                    <span>$0</span>
                    <span>$40,000</span>
                  </div>
                </div>

                <div>
                  <Label className="font-medium text-sm">
                    Loan Rate: {usedLoanRate}%
                  </Label>
                  <Slider
                    value={[usedLoanRate]}
                    onValueChange={(value) =>
                      setUsedLoanRate(Number(value[0].toFixed(2)))
                    }
                    max={15}
                    min={0}
                    step={0.1}
                    className="mt-2"
                  />
                  <div className="flex justify-between mt-1 text-xs">
                    <span>0%</span>
                    <span>15%</span>
                  </div>
                </div>

                <div>
                  <Label className="font-medium text-sm">
                    Loan Term: {usedLoanTerm} months
                  </Label>
                  <Slider
                    value={[usedLoanTerm]}
                    onValueChange={(value) => setUsedLoanTerm(value[0])}
                    max={84}
                    min={12}
                    step={6}
                    className="mt-2"
                  />
                  <div className="flex justify-between mt-1 text-xs">
                    <span>12 months</span>
                    <span>84 months</span>
                  </div>
                </div>

                <div>
                  <Label className="font-medium text-sm">
                    Annual Insurance: ${usedInsurance.toLocaleString()}
                  </Label>
                  <Slider
                    value={[usedInsurance]}
                    onValueChange={(value) => setUsedInsurance(value[0])}
                    max={5000}
                    min={0}
                    step={50}
                    className="mt-2"
                  />
                  <div className="flex justify-between mt-1 text-xs">
                    <span>$0</span>
                    <span>$5,000</span>
                  </div>
                </div>

                <div>
                  <Label className="font-medium text-sm">
                    Annual Maintenance: ${usedMaintenance.toLocaleString()}
                  </Label>
                  <Slider
                    value={[usedMaintenance]}
                    onValueChange={(value) => setUsedMaintenance(value[0])}
                    max={5000}
                    min={0}
                    step={50}
                    className="mt-2"
                  />
                  <div className="flex justify-between mt-1 text-xs">
                    <span>$0</span>
                    <span>$5,000</span>
                  </div>
                </div>

                <div>
                  <Label className="font-medium text-sm">
                    Depreciation: {usedDepreciation}% per year
                  </Label>
                  <Slider
                    value={[usedDepreciation]}
                    onValueChange={(value) =>
                      setUsedDepreciation(Number(value[0].toFixed(1)))
                    }
                    max={20}
                    min={0}
                    step={0.5}
                    className="mt-2"
                  />
                  <div className="flex justify-between mt-1 text-xs">
                    <span>0%</span>
                    <span>20%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Leasing Section */}
            <div className="bg-orange-50 p-6 border border-orange-200 rounded-lg">
              <h3 className="flex gap-2 items-center mb-6 font-semibold text-orange-700 text-xl">
                🔄 Leasing
              </h3>
              <div className="space-y-6">
                <div>
                  <Label className="font-medium text-sm">
                    Monthly Payment: ${leaseMonthly.toLocaleString()}
                  </Label>
                  <Slider
                    value={[leaseMonthly]}
                    onValueChange={(value) => setLeaseMonthly(value[0])}
                    max={2000}
                    min={100}
                    step={10}
                    className="mt-2"
                  />
                  <div className="flex justify-between mt-1 text-xs">
                    <span>$100</span>
                    <span>$2,000</span>
                  </div>
                </div>

                <div>
                  <Label className="font-medium text-sm">
                    Down Payment: ${leaseDown.toLocaleString()}
                  </Label>
                  <Slider
                    value={[leaseDown]}
                    onValueChange={(value) => setLeaseDown(value[0])}
                    max={10000}
                    min={0}
                    step={100}
                    className="mt-2"
                  />
                  <div className="flex justify-between mt-1 text-xs">
                    <span>$0</span>
                    <span>$10,000</span>
                  </div>
                </div>

                <div>
                  <Label className="font-medium text-sm">
                    Lease Term: {leaseTerm} months
                  </Label>
                  <Slider
                    value={[leaseTerm]}
                    onValueChange={(value) => setLeaseTerm(value[0])}
                    max={60}
                    min={12}
                    step={6}
                    className="mt-2"
                  />
                  <div className="flex justify-between mt-1 text-xs">
                    <span>12 months</span>
                    <span>60 months</span>
                  </div>
                </div>

                <div>
                  <Label className="font-medium text-sm">
                    Annual Insurance: ${leaseInsurance.toLocaleString()}
                  </Label>
                  <Slider
                    value={[leaseInsurance]}
                    onValueChange={(value) => setLeaseInsurance(value[0])}
                    max={5000}
                    min={0}
                    step={50}
                    className="mt-2"
                  />
                  <div className="flex justify-between mt-1 text-xs">
                    <span>$0</span>
                    <span>$5,000</span>
                  </div>
                </div>

                <div>
                  <Label className="font-medium text-sm">
                    Annual Maintenance: ${leaseMaintenance.toLocaleString()}
                  </Label>
                  <Slider
                    value={[leaseMaintenance]}
                    onValueChange={(value) => setLeaseMaintenance(value[0])}
                    max={5000}
                    min={0}
                    step={50}
                    className="mt-2"
                  />
                  <div className="flex justify-between mt-1 text-xs">
                    <span>$0</span>
                    <span>$5,000</span>
                  </div>
                </div>

                <div className="bg-orange-100 p-3 rounded text-orange-700 text-sm">
                  <strong>Note:</strong> Leasing costs assume rolling leases if
                  comparison period exceeds lease term
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      {/* Results Section */}
      <div className="shadow mb-8 p-6 border rounded-lg">
        <h2 className="mb-6 font-semibold text-2xl">
          Results over {years} years
        </h2>

        {/* Winner Banner */}
        {(() => {
          const newTotal = calcNewCarTotal();
          const usedTotal = calcUsedCarTotal();
          const leaseTotal = calcLeaseTotal();
          const costs = [
            { name: "New Car", cost: newTotal, color: "blue" },
            { name: "Used Car", cost: usedTotal, color: "green" },
            { name: "Leasing", cost: leaseTotal, color: "orange" },
          ];
          const winner = costs.reduce((min, curr) =>
            curr.cost < min.cost ? curr : min
          );

          return (
            <div
              className={`p-4 rounded-lg mb-6 ${
                winner.color === "blue"
                  ? " border "
                  : winner.color === "green"
                  ? " border "
                  : "bg-orange-50 border border-orange-200"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3
                    className={`font-semibold ${
                      winner.color === "blue"
                        ? ""
                        : winner.color === "green"
                        ? ""
                        : "text-orange-800"
                    }`}
                  >
                    {winner.name} is Most Cost Effective!
                  </h3>
                  <p
                    className={`text-sm ${
                      winner.color === "blue"
                        ? ""
                        : winner.color === "green"
                        ? ""
                        : "text-orange-600"
                    }`}
                  >
                    Total cost: ${winner.cost.toLocaleString()} over {years}{" "}
                    years
                  </p>
                </div>
              </div>
            </div>
          );
        })()}

        {/* Comparison Cards */}
        <div className="gap-6 grid grid-cols-1 md:grid-cols-3 mb-8">
          {/* New Car Card */}
          <div className="shadow-sm p-6 border-2 rounded-lg">
            <h3 className="flex gap-2 items-center mb-4 font-semibold text-xl">
              🚗 New Car
            </h3>
            <div className="space-y-3">
              {(() => {
                const loanMonths = Math.min(years * 12, newLoanTerm);
                const loanMonthly = calcLoanMonthly(
                  newPrice - newDown,
                  newLoanRate,
                  newLoanTerm
                );
                const loanTotal = loanMonthly * loanMonths;
                const totalInsurance = newInsurance * years;
                const totalMaintenance = newMaintenance * years;
                const depreciation = (newDepreciation / 100) * newPrice * years;
                const total = calcNewCarTotal();

                return (
                  <>
                    <div className="flex items-center justify-between">
                      <span className="">Down Payment:</span>
                      <span className="font-bold">
                        ${newDown.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="">Loan Payments:</span>
                      <span className="font-bold">
                        ${loanTotal.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="">Insurance ({years} years):</span>
                      <span className="font-bold">
                        ${totalInsurance.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="">Maintenance ({years} years):</span>
                      <span className="font-bold">
                        ${totalMaintenance.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="">Depreciation:</span>
                      <span className="font-bold">
                        ${depreciation.toLocaleString()}
                      </span>
                    </div>
                    <div className="pt-2 border-t">
                      <div className="flex items-center justify-between">
                        <span className="">Total Cost:</span>
                        <span className="font-bold text-xl">
                          ${total.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <div className="text-xs">
                      Monthly loan payment: ${loanMonthly.toLocaleString()}
                    </div>
                  </>
                );
              })()}
            </div>
          </div>

          {/* Used Car Card */}
          <div className="shadow-sm p-6 border-2 rounded-lg">
            <h3 className="flex gap-2 items-center mb-4 font-semibold text-xl">
              🚙 Used Car
            </h3>
            <div className="space-y-3">
              {(() => {
                const loanMonths = Math.min(years * 12, usedLoanTerm);
                const loanMonthly = calcLoanMonthly(
                  usedPrice - usedDown,
                  usedLoanRate,
                  usedLoanTerm
                );
                const loanTotal = loanMonthly * loanMonths;
                const totalInsurance = usedInsurance * years;
                const totalMaintenance = usedMaintenance * years;
                const depreciation =
                  (usedDepreciation / 100) * usedPrice * years;
                const total = calcUsedCarTotal();

                return (
                  <>
                    <div className="flex items-center justify-between">
                      <span className="">Down Payment:</span>
                      <span className="font-bold">
                        ${usedDown.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="">Loan Payments:</span>
                      <span className="font-bold">
                        ${loanTotal.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="">Insurance ({years} years):</span>
                      <span className="font-bold">
                        ${totalInsurance.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="">Maintenance ({years} years):</span>
                      <span className="font-bold">
                        ${totalMaintenance.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="">Depreciation:</span>
                      <span className="font-bold">
                        ${depreciation.toLocaleString()}
                      </span>
                    </div>
                    <div className="pt-2 border-t">
                      <div className="flex items-center justify-between">
                        <span className="">Total Cost:</span>
                        <span className="font-bold text-xl">
                          ${total.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <div className="text-xs">
                      Monthly loan payment: ${loanMonthly.toLocaleString()}
                    </div>
                  </>
                );
              })()}
            </div>
          </div>

          {/* Leasing Card */}
          <div className="shadow-sm p-6 border-2 border-orange-200 rounded-lg">
            <h3 className="flex gap-2 items-center mb-4 font-semibold text-orange-700 text-xl">
              🔄 Leasing
            </h3>
            <div className="space-y-3">
              {(() => {
                const fullTerms = Math.floor((years * 12) / leaseTerm);
                const remMonths = (years * 12) % leaseTerm;
                const totalLeasePayments =
                  (fullTerms * leaseTerm + remMonths) * leaseMonthly;
                const totalDown =
                  leaseDown * (fullTerms + (remMonths > 0 ? 1 : 0));
                const totalInsurance = leaseInsurance * years;
                const totalMaintenance = leaseMaintenance * years;
                const total = calcLeaseTotal();

                return (
                  <>
                    <div className="flex items-center justify-between">
                      <span className="">Down Payments:</span>
                      <span className="font-bold text-orange-900">
                        ${totalDown.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="">Lease Payments:</span>
                      <span className="font-bold text-orange-900">
                        ${totalLeasePayments.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="">Insurance ({years} years):</span>
                      <span className="font-bold text-orange-900">
                        ${totalInsurance.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="">Maintenance ({years} years):</span>
                      <span className="font-bold text-orange-900">
                        ${totalMaintenance.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="">Equity Built:</span>
                      <span className="font-bold text-orange-900">
                        $0 (no ownership)
                      </span>
                    </div>
                    <div className="pt-2 border-t">
                      <div className="flex items-center justify-between">
                        <span className="">Total Cost:</span>
                        <span className="font-bold text-orange-900 text-xl">
                          ${total.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <div className="text-xs">
                      {fullTerms + (remMonths > 0 ? 1 : 0)} lease(s) over{" "}
                      {years} years
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        </div>

        {/* Detailed Comparison Table */}
        <div className="shadow mb-8 border rounded-lg overflow-hidden">
          <h3 className="p-6 pb-4 font-semibold text-lg">
            Detailed Cost Comparison
          </h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cost Component</TableHead>
                <TableHead className="">New Car</TableHead>
                <TableHead className="">Used Car</TableHead>
                <TableHead className="text-orange-700">Leasing</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(() => {
                const newTotal = calcNewCarTotal();
                const usedTotal = calcUsedCarTotal();
                const leaseTotal = calcLeaseTotal();
                const newMonthly = newTotal / (years * 12);
                const usedMonthly = usedTotal / (years * 12);
                const leaseMonthlyAvg = leaseTotal / (years * 12);

                return (
                  <>
                    <TableRow>
                      <TableCell className="font-medium">
                        Average Monthly Cost
                      </TableCell>
                      <TableCell>${newMonthly.toLocaleString()}</TableCell>
                      <TableCell>${usedMonthly.toLocaleString()}</TableCell>
                      <TableCell>${leaseMonthlyAvg.toLocaleString()}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        Down Payment
                      </TableCell>
                      <TableCell>${newDown.toLocaleString()}</TableCell>
                      <TableCell>${usedDown.toLocaleString()}</TableCell>
                      <TableCell>
                        ${leaseDown.toLocaleString()} (per lease)
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        Vehicle Price
                      </TableCell>
                      <TableCell>${newPrice.toLocaleString()}</TableCell>
                      <TableCell>${usedPrice.toLocaleString()}</TableCell>
                      <TableCell>N/A (lease)</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Loan Rate</TableCell>
                      <TableCell>{newLoanRate}%</TableCell>
                      <TableCell>{usedLoanRate}%</TableCell>
                      <TableCell>N/A</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        Depreciation Rate
                      </TableCell>
                      <TableCell>{newDepreciation}% per year</TableCell>
                      <TableCell>{usedDepreciation}% per year</TableCell>
                      <TableCell>N/A (not owned)</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        Total Cost ({years} years)
                      </TableCell>
                      <TableCell className="font-bold text-lg">
                        ${newTotal.toLocaleString()}
                      </TableCell>
                      <TableCell className="font-bold text-lg">
                        ${usedTotal.toLocaleString()}
                      </TableCell>
                      <TableCell className="font-bold text-lg text-orange-700">
                        ${leaseTotal.toLocaleString()}
                      </TableCell>
                    </TableRow>
                  </>
                );
              })()}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Important Considerations */}
      <div className="mb-8 p-6 border rounded-lg">
        <h3 className="mb-3 font-semibold text-lg">
          ⚠️ Important Considerations
        </h3>
        <ul className="space-y-2">
          <li>
            <strong>Resale Value:</strong> This calculator doesn't account for
            potential resale/trade-in value
          </li>
          <li>
            <strong>Mileage Limits:</strong> Leases typically have annual
            mileage restrictions (10,000-15,000 miles)
          </li>
          <li>
            <strong>Wear and Tear:</strong> Lease returns may incur charges for
            excessive wear
          </li>
          <li>
            <strong>Equity Building:</strong> Only purchasing options build
            equity that can be realized upon sale
          </li>
          <li>
            <strong>Flexibility:</strong> Owned vehicles can be modified; leased
            vehicles cannot
          </li>
          <li>
            <strong>Insurance Requirements:</strong> Leased vehicles often
            require higher coverage levels
          </li>
          <li>
            <strong>End-of-Term Costs:</strong> Consider inspection fees,
            disposition fees, and excess wear charges for leases
          </li>
        </ul>
      </div>

      {/* Disclaimer */}
      <div className="p-6 border rounded-lg">
        <h3 className="mb-3 font-semibold text-lg">📋 Disclaimer</h3>
        <p className="text-sm">
          <strong>Estimate Only:</strong> This calculator provides cost
          estimates and does not account for taxes, fees, registration costs,
          fuel, potential resale value, or regional price variations. Actual
          costs may vary significantly based on individual circumstances, market
          conditions, creditworthiness, and specific vehicle choices. Lease
          terms and purchase financing vary by dealer and lender. Please consult
          with automotive dealers and financial institutions for personalized
          quotes and advice.
        </p>
      </div>
    </div>
  );
};
export default NewVsUsedVsLeasingCar;