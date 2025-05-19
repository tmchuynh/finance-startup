"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
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

  return (
    <div className="mx-auto pt-6 sm:pt-12 lg:pt-16 pb-24 lg:pb-32 w-10/12 md:w-11/12">
      <h1>Rent vs Buy Calculator</h1>
      <h5>Make informed decisions about your housing options</h5>
      <p>
        This calculator helps you compare the total cost of renting vs. buying a
        home over a specified period. Please fill out the form below to see the
        results. This tool is for informational purposes only and should not be
        considered financial advice. Please consult a financial advisor for
        personalized advice.
      </p>
      <p>
        Enter your monthly rent, expected annual rent increase, home price, down
        payment percentage, mortgage rate, property tax rate, home insurance,
        maintenance costs, and HOA fees. The calculator will provide you with
        the total cost of renting and buying over the specified number of years.
      </p>
      <p>
        Note: This calculator does not account for investment growth on down
        payment, home appreciation, selling costs, or tax deductions.
      </p>

      {/* Typical values table for first-time homebuyers */}
      <div className="my-8">
        <h2 className="mb-2 font-semibold text-lg">
          Typical Values for First-Time Homebuyers
        </h2>
        <div className="overflow-x-auto">
          <table className="border border-gray-300 min-w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-3 py-2 border text-left">Parameter</th>
                <th className="px-3 py-2 border text-left">Typical Range</th>
                <th className="px-3 py-2 border text-left">Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-3 py-2 border">Mortgage Rate (%)</td>
                <td className="px-3 py-2 border">5% - 7%</td>
                <td className="px-3 py-2 border">
                  Varies by credit score, loan type, and market
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Down Payment (%)</td>
                <td className="px-3 py-2 border">3% - 20%</td>
                <td className="px-3 py-2 border">
                  3-5% for FHA/VA/first-time buyer programs, 20% avoids PMI
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Home Insurance (annual $)</td>
                <td className="px-3 py-2 border">$800 - $2,000</td>
                <td className="px-3 py-2 border">
                  Depends on location, home value, and coverage
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">
                  Maintenance (% of home price/year)
                </td>
                <td className="px-3 py-2 border">1% - 2%</td>
                <td className="px-3 py-2 border">General rule of thumb</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">HOA Fees (monthly $)</td>
                <td className="px-3 py-2 border">$0 - $400</td>
                <td className="px-3 py-2 border">
                  Only for condos/townhomes or some neighborhoods
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Property Tax Rate (%)</td>
                <td className="px-3 py-2 border">0.7% - 2.5%</td>
                <td className="px-3 py-2 border">
                  Varies widely by state/county
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {/* End typical values table */}

      <form
        className="gap-4 grid grid-cols-1 md:grid-cols-2 mb-8"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="space-y-3 md:space-y-29">
          <div className="mt-9 lg:mt-11 2xl:mt-14.5">
            <Label>Years to Compare</Label>
            <div className="flex items-center gap-4">
              <Slider
                min={1}
                max={30}
                step={1}
                value={[years]}
                onValueChange={([v]) => setYears(v)}
                className="w-2/3"
              />
              <Input
                type="number"
                value={years}
                min={1}
                max={30}
                onChange={(e) => setYears(Number(e.target.value))}
                className="w-1/3"
              />
            </div>
          </div>
          <div className="">
            <h2>Results</h2>
            <div className="flex flex-col gap-5 mt-3">
              <div>
                <h3>Total Renting Cost</h3>
                <p>
                  <strong>
                    $
                    {calcTotalRent().toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    })}
                  </strong>
                </p>
              </div>
              <div>
                <h3>Total Buying Cost</h3>
                <p>
                  <strong>
                    $
                    {calcTotalBuy().toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    })}
                  </strong>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-3 md:space-y-10">
          <div className="">
            <h2>Renting</h2>
            <div className="space-y-5 mt-3">
              <div>
                <Label>Monthly Rent ($)</Label>
                <div className="flex items-center gap-4">
                  <Slider
                    min={0}
                    max={10000}
                    step={50}
                    value={[rent]}
                    onValueChange={([v]) => setRent(v)}
                    className="w-2/3"
                  />
                  <Input
                    type="number"
                    value={rent}
                    min={0}
                    onChange={(e) => setRent(Number(e.target.value))}
                    className="w-1/3"
                  />
                </div>
              </div>
              <div>
                <Label>Annual Rent Increase (%)</Label>
                <div className="flex items-center gap-4">
                  <Slider
                    min={0}
                    max={10}
                    step={0.1}
                    value={[rentIncrease]}
                    onValueChange={([v]) =>
                      setRentIncrease(Number(v.toFixed(1)))
                    }
                    className="w-2/3"
                  />
                  <Input
                    type="number"
                    value={rentIncrease}
                    min={0}
                    step={0.1}
                    onChange={(e) => setRentIncrease(Number(e.target.value))}
                    className="w-1/3"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <h2>Buying</h2>
            <div className="space-y-5 mt-3">
              <div>
                <Label>Home Price ($)</Label>
                <div className="flex items-center gap-4">
                  <Slider
                    min={50000}
                    max={2000000}
                    step={10000}
                    value={[homePrice]}
                    onValueChange={([v]) => setHomePrice(v)}
                    className="w-2/3"
                  />
                  <Input
                    type="number"
                    value={homePrice}
                    min={0}
                    onChange={(e) => setHomePrice(Number(e.target.value))}
                    className="w-1/3"
                  />
                </div>
              </div>
              <div>
                <Label>Down Payment (%)</Label>
                <div className="flex items-center gap-4">
                  <Slider
                    min={0}
                    max={100}
                    step={0.1}
                    value={[downPayment]}
                    onValueChange={([v]) =>
                      setDownPayment(Number(v.toFixed(1)))
                    }
                    className="w-2/3"
                  />
                  <Input
                    type="number"
                    value={downPayment}
                    min={0}
                    max={100}
                    step={0.1}
                    onChange={(e) => setDownPayment(Number(e.target.value))}
                    className="w-1/3"
                  />
                </div>
              </div>
              <div>
                <Label>Mortgage Rate (%)</Label>
                <div className="flex items-center gap-4">
                  <Slider
                    min={0}
                    max={15}
                    step={0.01}
                    value={[mortgageRate]}
                    onValueChange={([v]) =>
                      setMortgageRate(Number(v.toFixed(2)))
                    }
                    className="w-2/3"
                  />
                  <Input
                    type="number"
                    value={mortgageRate}
                    min={0}
                    step={0.01}
                    onChange={(e) => setMortgageRate(Number(e.target.value))}
                    className="w-1/3"
                  />
                </div>
              </div>
              <div>
                <Label>Property Tax Rate (%)</Label>
                <div className="flex items-center gap-4">
                  <Slider
                    min={0}
                    max={5}
                    step={0.01}
                    value={[propertyTax]}
                    onValueChange={([v]) =>
                      setPropertyTax(Number(v.toFixed(2)))
                    }
                    className="w-2/3"
                  />
                  <Input
                    type="number"
                    value={propertyTax}
                    min={0}
                    step={0.01}
                    onChange={(e) => setPropertyTax(Number(e.target.value))}
                    className="w-1/3"
                  />
                </div>
              </div>
              <div>
                <Label>Home Insurance (annual $)</Label>
                <div className="flex items-center gap-4">
                  <Slider
                    min={0}
                    max={5000}
                    step={50}
                    value={[homeInsurance]}
                    onValueChange={([v]) => setHomeInsurance(v)}
                    className="w-2/3"
                  />
                  <Input
                    type="number"
                    value={homeInsurance}
                    min={0}
                    onChange={(e) => setHomeInsurance(Number(e.target.value))}
                    className="w-1/3"
                  />
                </div>
              </div>
              <div>
                <Label>Maintenance (% of home price/year)</Label>
                <div className="flex items-center gap-4">
                  <Slider
                    min={0}
                    max={5}
                    step={0.1}
                    value={[maintenance]}
                    onValueChange={([v]) =>
                      setMaintenance(Number(v.toFixed(1)))
                    }
                    className="w-2/3"
                  />
                  <Input
                    type="number"
                    value={maintenance}
                    min={0}
                    step={0.1}
                    onChange={(e) => setMaintenance(Number(e.target.value))}
                    className="w-1/3"
                  />
                </div>
              </div>
              <div>
                <Label>HOA Fees (monthly $)</Label>
                <div className="flex items-center gap-4">
                  <Slider
                    min={0}
                    max={1000}
                    step={10}
                    value={[hoa]}
                    onValueChange={([v]) => setHoa(v)}
                    className="w-2/3"
                  />
                  <Input
                    type="number"
                    value={hoa}
                    min={0}
                    onChange={(e) => setHoa(Number(e.target.value))}
                    className="w-1/3"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>

      <p style={{ marginTop: 24, color: "#666" }}>
        Note: This calculator does not account for investment growth on down
        payment, home appreciation, selling costs, or tax deductions.
      </p>
    </div>
  );
};

export default RentVsBuy;
