"use client";

import { Input } from "@/components/ui/input";
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

const RentVsBuy: React.FC = () => {
  const [rent, setRent] = useState(1500);
  const [rentIncrease, setRentIncrease] = useState(3);
  const [homePrice, setHomePrice] = useState(350000);
  const [downPayment, setDownPayment] = useState(20);
  const [mortgageRate, setMortgageRate] = useState(6);
  const [years, setYears] = useState(5);
  const [propertyTax, setPropertyTax] = useState(1.2);
  const [homeInsurance, setHomeInsurance] = useState(1200);
  const [maintenance, setMaintenance] = useState(1);
  const [hoa, setHoa] = useState(0);

  // Helper functions
  const calcTotalRent = () => {
    let total = 0;
    let currentRent = rent;
    for (let i = 0; i < years; i++) {
      total += currentRent * 12;
      currentRent *= 1 + rentIncrease / 100;
    }
    return total;
  };

  const calcTotalBuy = () => {
    const dp = (downPayment / 100) * homePrice;
    const loan = homePrice - dp;
    const monthlyRate = mortgageRate / 100 / 12;
    const n = years * 12;
    const monthlyMortgage =
      (loan * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -n));
    const totalMortgage = monthlyMortgage * n;
    const totalPropertyTax = (propertyTax / 100) * homePrice * years;
    const totalInsurance = homeInsurance * years;
    const totalMaintenance = (maintenance / 100) * homePrice * years;
    const totalHoa = hoa * 12 * years;
    return (
      dp +
      totalMortgage +
      totalPropertyTax +
      totalInsurance +
      totalMaintenance +
      totalHoa
    );
  };

  const totalRent = calcTotalRent();
  const totalBuy = calcTotalBuy();
  const winner = totalRent < totalBuy ? "rent" : "buy";
  const savings =
    winner === "rent" ? totalBuy - totalRent : totalRent - totalBuy;

  return (
    <div className="mx-auto pb-24 lg:pb-32 pt-6 sm:pt-12 lg:pt-16 w-10/12 md:w-11/12">
      {/* Header Section */}
      <div className="mb-12 text-center">
        <h1 className="bg-clip-text bg-gradient-to-r from-blue-600 to-green-600 mb-4 font-bold text-3xl text-transparent md:text-5xl">
          Rent vs Buy Calculator
        </h1>
        <p className="mx-auto max-w-3xl leading-relaxed text-lg md:text-xl">
          Make informed decisions about your housing options by comparing the
          total cost of renting versus buying a home over your specified
          timeframe.
        </p>
      </div>

      {/* Information Table */}
      <div className="shadow-sm mb-8 p-6 border rounded-lg">
        <h2 className="mb-4 font-semibold text-2xl">
          Typical Values for First-Time Homebuyers
        </h2>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-semibold">Parameter</TableHead>
                <TableHead className="font-semibold">Typical Range</TableHead>
                <TableHead className="font-semibold">Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Mortgage Rate (%)</TableCell>
                <TableCell>5% - 7%</TableCell>
                <TableCell>
                  Varies by credit score, loan type, and market
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Down Payment (%)</TableCell>
                <TableCell>3% - 20%</TableCell>
                <TableCell>
                  3-5% for FHA/VA/first-time buyer programs, 20% avoids PMI
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  Home Insurance (annual $)
                </TableCell>
                <TableCell>$800 - $2,000</TableCell>
                <TableCell>
                  Depends on location, home value, and coverage
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  Maintenance (% of home price/year)
                </TableCell>
                <TableCell>1% - 2%</TableCell>
                <TableCell>General rule of thumb</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  HOA Fees (monthly $)
                </TableCell>
                <TableCell>$0 - $400</TableCell>
                <TableCell>
                  Only for condos/townhomes or some neighborhoods
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  Property Tax Rate (%)
                </TableCell>
                <TableCell>0.7% - 2.5%</TableCell>
                <TableCell>Varies widely by state/county</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Calculator Form */}
      <div className="shadow-sm mb-8 p-6 border rounded-lg">
        <h2 className="mb-6 font-semibold text-2xl">Housing Cost Calculator</h2>

        <form onSubmit={(e) => e.preventDefault()}>
          <div className="gap-8 grid">
            {/* Time Frame Section */}
            <div className="p-6 border rounded-lg">
              <h3 className="mb-4 font-semibold text-lg">
                Comparison Timeframe
              </h3>
              <div>
                <Label className="font-medium text-sm">
                  Years to Compare: {years}
                </Label>
                <div className="flex gap-4 items-center mt-2">
                  <Slider
                    min={1}
                    max={30}
                    step={1}
                    value={[years]}
                    onValueChange={([v]) => setYears(v)}
                    className="flex-1"
                  />
                  <Input
                    type="number"
                    value={years}
                    min={1}
                    max={30}
                    onChange={(e) => setYears(Number(e.target.value))}
                    className="w-24"
                  />
                </div>
              </div>
            </div>

            {/* Renting Section */}
            <div className="p-6 border rounded-lg">
              <h3 className="mb-4 font-semibold text-lg">Renting Costs</h3>
              <div className="gap-6 grid md:grid-cols-2">
                <div>
                  <Label className="font-medium text-sm">
                    Monthly Rent: ${rent.toLocaleString()}
                  </Label>
                  <div className="flex gap-4 items-center mt-2">
                    <Slider
                      min={0}
                      max={10000}
                      step={50}
                      value={[rent]}
                      onValueChange={([v]) => setRent(v)}
                      className="flex-1"
                    />
                    <Input
                      type="number"
                      value={rent}
                      min={0}
                      onChange={(e) => setRent(Number(e.target.value))}
                      className="w-24"
                    />
                  </div>
                </div>
                <div>
                  <Label className="font-medium text-sm">
                    Annual Rent Increase: {rentIncrease}%
                  </Label>
                  <div className="flex gap-4 items-center mt-2">
                    <Slider
                      min={0}
                      max={10}
                      step={0.1}
                      value={[rentIncrease]}
                      onValueChange={([v]) =>
                        setRentIncrease(Number(v.toFixed(1)))
                      }
                      className="flex-1"
                    />
                    <Input
                      type="number"
                      value={rentIncrease}
                      min={0}
                      step={0.1}
                      onChange={(e) => setRentIncrease(Number(e.target.value))}
                      className="w-24"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Buying Section */}
            <div className="p-6 border rounded-lg">
              <h3 className="mb-4 font-semibold text-lg">Home Buying Costs</h3>
              <div className="gap-6 grid md:grid-cols-2 lg:grid-cols-3">
                <div>
                  <Label className="font-medium text-sm">
                    Home Price: ${homePrice.toLocaleString()}
                  </Label>
                  <div className="flex gap-4 items-center mt-2">
                    <Slider
                      min={50000}
                      max={2000000}
                      step={10000}
                      value={[homePrice]}
                      onValueChange={([v]) => setHomePrice(v)}
                      className="flex-1"
                    />
                    <Input
                      type="number"
                      value={homePrice}
                      min={0}
                      onChange={(e) => setHomePrice(Number(e.target.value))}
                      className="w-24"
                    />
                  </div>
                </div>
                <div>
                  <Label className="font-medium text-sm">
                    Down Payment: {downPayment}%
                  </Label>
                  <div className="flex gap-4 items-center mt-2">
                    <Slider
                      min={0}
                      max={100}
                      step={0.1}
                      value={[downPayment]}
                      onValueChange={([v]) =>
                        setDownPayment(Number(v.toFixed(1)))
                      }
                      className="flex-1"
                    />
                    <Input
                      type="number"
                      value={downPayment}
                      min={0}
                      max={100}
                      step={0.1}
                      onChange={(e) => setDownPayment(Number(e.target.value))}
                      className="w-24"
                    />
                  </div>
                </div>
                <div>
                  <Label className="font-medium text-sm">
                    Mortgage Rate: {mortgageRate}%
                  </Label>
                  <div className="flex gap-4 items-center mt-2">
                    <Slider
                      min={0}
                      max={15}
                      step={0.01}
                      value={[mortgageRate]}
                      onValueChange={([v]) =>
                        setMortgageRate(Number(v.toFixed(2)))
                      }
                      className="flex-1"
                    />
                    <Input
                      type="number"
                      value={mortgageRate}
                      min={0}
                      step={0.01}
                      onChange={(e) => setMortgageRate(Number(e.target.value))}
                      className="w-24"
                    />
                  </div>
                </div>
                <div>
                  <Label className="font-medium text-sm">
                    Property Tax: {propertyTax}%
                  </Label>
                  <div className="flex gap-4 items-center mt-2">
                    <Slider
                      min={0}
                      max={5}
                      step={0.01}
                      value={[propertyTax]}
                      onValueChange={([v]) =>
                        setPropertyTax(Number(v.toFixed(2)))
                      }
                      className="flex-1"
                    />
                    <Input
                      type="number"
                      value={propertyTax}
                      min={0}
                      step={0.01}
                      onChange={(e) => setPropertyTax(Number(e.target.value))}
                      className="w-24"
                    />
                  </div>
                </div>
                <div>
                  <Label className="font-medium text-sm">
                    Home Insurance: ${homeInsurance.toLocaleString()}/year
                  </Label>
                  <div className="flex gap-4 items-center mt-2">
                    <Slider
                      min={0}
                      max={5000}
                      step={50}
                      value={[homeInsurance]}
                      onValueChange={([v]) => setHomeInsurance(v)}
                      className="flex-1"
                    />
                    <Input
                      type="number"
                      value={homeInsurance}
                      min={0}
                      onChange={(e) => setHomeInsurance(Number(e.target.value))}
                      className="w-24"
                    />
                  </div>
                </div>
                <div>
                  <Label className="font-medium text-sm">
                    Maintenance: {maintenance}%/year
                  </Label>
                  <div className="flex gap-4 items-center mt-2">
                    <Slider
                      min={0}
                      max={5}
                      step={0.1}
                      value={[maintenance]}
                      onValueChange={([v]) =>
                        setMaintenance(Number(v.toFixed(1)))
                      }
                      className="flex-1"
                    />
                    <Input
                      type="number"
                      value={maintenance}
                      min={0}
                      step={0.1}
                      onChange={(e) => setMaintenance(Number(e.target.value))}
                      className="w-24"
                    />
                  </div>
                </div>
                <div>
                  <Label className="font-medium text-sm">
                    HOA Fees: ${hoa.toLocaleString()}/month
                  </Label>
                  <div className="flex gap-4 items-center mt-2">
                    <Slider
                      min={0}
                      max={1000}
                      step={10}
                      value={[hoa]}
                      onValueChange={([v]) => setHoa(v)}
                      className="flex-1"
                    />
                    <Input
                      type="number"
                      value={hoa}
                      min={0}
                      onChange={(e) => setHoa(Number(e.target.value))}
                      className="w-24"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Results Section */}
      <div className="space-y-6">
        {/* Winner Banner */}
        <div
          className={`rounded-lg p-6 text-center border-2 ${
            winner === "rent" ? "  " : " border-green-300 "
          }`}
        >
          <h2 className="mb-2 font-bold text-2xl">
            🏆 {winner === "rent" ? "Renting Wins!" : "Buying Wins!"}
          </h2>
          <p className="text-lg">
            {winner === "rent" ? "Renting" : "Buying"} saves you{" "}
            <strong>
              ${savings.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </strong>
            over {years} years.
          </p>
        </div>

        {/* Results Comparison */}
        <div className="gap-6 grid md:grid-cols-2">
          <div
            className={`rounded-lg border-2 p-6 ${
              winner === "rent" ? " " : " "
            }`}
          >
            <div className="flex gap-3 items-center mb-4">
              <div className="rounded-full h-3 w-3 0"></div>
              <h3 className="font-semibold text-xl">Renting</h3>
              {winner === "rent" && <span className="font-bold">WINNER</span>}
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="">Total Cost ({years} years):</span>
                <span className="font-bold text-lg">
                  $
                  {totalRent.toLocaleString(undefined, {
                    maximumFractionDigits: 0,
                  })}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="">Starting Monthly Rent:</span>
                <span className="font-bold">${rent.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="">Annual Rent Increase:</span>
                <span className="font-bold">{rentIncrease}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="">Average Monthly Cost:</span>
                <span className="font-bold">
                  $
                  {(totalRent / (years * 12)).toLocaleString(undefined, {
                    maximumFractionDigits: 0,
                  })}
                </span>
              </div>
            </div>
          </div>

          <div
            className={`rounded-lg border-2 p-6 ${
              winner === "buy" ? " border-green-300" : " "
            }`}
          >
            <div className="flex gap-3 items-center mb-4">
              <div className="rounded-full h-3 w-3 0"></div>
              <h3 className="font-semibold text-xl">Buying</h3>
              {winner === "buy" && <span className="font-bold">WINNER</span>}
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="">Total Cost ({years} years):</span>
                <span className="font-bold text-lg">
                  $
                  {totalBuy.toLocaleString(undefined, {
                    maximumFractionDigits: 0,
                  })}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="">Home Price:</span>
                <span className="font-bold">${homePrice.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="">Down Payment:</span>
                <span className="font-bold">
                  $
                  {((downPayment / 100) * homePrice).toLocaleString(undefined, {
                    maximumFractionDigits: 0,
                  })}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="">Average Monthly Cost:</span>
                <span className="font-bold">
                  $
                  {(totalBuy / (years * 12)).toLocaleString(undefined, {
                    maximumFractionDigits: 0,
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Cost Breakdown */}
        <div className="shadow-sm p-6 border rounded-lg">
          <h3 className="mb-4 font-semibold text-xl">
            Detailed Cost Breakdown
          </h3>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold">
                    Cost Component
                  </TableHead>
                  <TableHead className="font-semibold">Renting</TableHead>
                  <TableHead className="font-semibold">Buying</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Initial Payment</TableCell>
                  <TableCell className="">
                    ${rent.toLocaleString()} (First month)
                  </TableCell>
                  <TableCell className="">
                    ${((downPayment / 100) * homePrice).toLocaleString()} (Down
                    payment)
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    Monthly Housing Cost
                  </TableCell>
                  <TableCell className="">
                    ${rent.toLocaleString()} (increasing {rentIncrease}%/year)
                  </TableCell>
                  <TableCell className="">
                    $
                    {(() => {
                      const loan = homePrice - (downPayment / 100) * homePrice;
                      const monthlyRate = mortgageRate / 100 / 12;
                      const n = years * 12;
                      const mortgage =
                        (loan * monthlyRate) /
                        (1 - Math.pow(1 + monthlyRate, -n));
                      const monthlyTax = ((propertyTax / 100) * homePrice) / 12;
                      const monthlyInsurance = homeInsurance / 12;
                      const monthlyMaintenance =
                        ((maintenance / 100) * homePrice) / 12;
                      return (
                        mortgage +
                        monthlyTax +
                        monthlyInsurance +
                        monthlyMaintenance +
                        hoa
                      ).toLocaleString(undefined, { maximumFractionDigits: 0 });
                    })()}{" "}
                    (P&I, taxes, insurance, maintenance, HOA)
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    Property Taxes ({years} years)
                  </TableCell>
                  <TableCell className="">N/A</TableCell>
                  <TableCell className="">
                    $
                    {((propertyTax / 100) * homePrice * years).toLocaleString(
                      undefined,
                      { maximumFractionDigits: 0 }
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    Insurance ({years} years)
                  </TableCell>
                  <TableCell className="">N/A</TableCell>
                  <TableCell className="">
                    ${(homeInsurance * years).toLocaleString()}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    Maintenance ({years} years)
                  </TableCell>
                  <TableCell className="">N/A</TableCell>
                  <TableCell className="">
                    $
                    {((maintenance / 100) * homePrice * years).toLocaleString(
                      undefined,
                      { maximumFractionDigits: 0 }
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    HOA Fees ({years} years)
                  </TableCell>
                  <TableCell className="">N/A</TableCell>
                  <TableCell className="">
                    ${(hoa * 12 * years).toLocaleString()}
                  </TableCell>
                </TableRow>
                <TableRow className="">
                  <TableCell className="font-bold">
                    Total Cost ({years} years)
                  </TableCell>
                  <TableCell className="font-bold text-lg">
                    $
                    {totalRent.toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    })}
                  </TableCell>
                  <TableCell className="font-bold text-lg">
                    $
                    {totalBuy.toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    })}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Important Considerations */}
        <div className="p-6 border rounded-lg">
          <h3 className="flex gap-2 items-center mb-3 font-semibold text-lg">
            ⚠️ Important Considerations
          </h3>
          <div className="gap-4 grid md:grid-cols-2 text-sm">
            <div>
              <h4 className="mb-2 font-semibold">
                Not Included in This Analysis:
              </h4>
              <ul className="space-y-1">
                <li>Home appreciation/depreciation</li>
                <li>Investment returns on down payment</li>
                <li>Tax deductions (mortgage interest, property tax)</li>
                <li>Selling costs (realtor fees, closing costs)</li>
                <li>PMI (Private Mortgage Insurance)</li>
                <li>Major home repairs or improvements</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-2 font-semibold">
                Additional Factors to Consider:
              </h4>
              <ul className="space-y-1">
                <li>Flexibility to move</li>
                <li>Building equity vs. no ownership</li>
                <li>Control over property modifications</li>
                <li>Responsibility for repairs and maintenance</li>
                <li>Market conditions and timing</li>
                <li>Credit score impact on mortgage rates</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="p-6 border rounded-lg">
          <h3 className="mb-3 font-semibold text-lg">📋 Disclaimer</h3>
          <div className="space-y-2 text-sm">
            <p>
              <strong>Important:</strong> This calculator provides simplified
              estimates for comparison purposes only. Actual costs may vary
              significantly based on location, market conditions, and individual
              circumstances.
            </p>
            <p>
              This analysis does not account for home appreciation, investment
              opportunities, tax benefits, or selling costs. Consider consulting
              with a financial advisor and real estate professional.
            </p>
            <p>
              <strong>Professional Advice:</strong> Real estate decisions
              involve many factors beyond cost. Seek personalized advice from
              qualified professionals before making housing decisions.
            </p>
          </div>
        </div>
      </div>

      <p style={{ marginTop: 24, color: "#666" }}>
        Note: This calculator does not account for investment growth on down
        payment, home appreciation, selling costs, or tax deductions.
      </p>
    </div>
  );
};

export default RentVsBuy;
