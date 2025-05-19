"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import React, { useState } from "react";

const BuyingVsUberVsCarpoolVsTransit: React.FC = () => {
  // Car ownership
  const [carPrice, setCarPrice] = useState(30000);
  const [downPayment, setDownPayment] = useState(5000);
  const [loanRate, setLoanRate] = useState(5);
  const [loanTerm, setLoanTerm] = useState(60);
  const [insurance, setInsurance] = useState(1200);
  const [maintenance, setMaintenance] = useState(800);
  const [fuel, setFuel] = useState(1200);
  const [registration, setRegistration] = useState(200);
  const [parking, setParking] = useState(600);

  // Uber/Lyft
  const [uberCostPerTrip, setUberCostPerTrip] = useState(18);
  const [uberTripsPerWeek, setUberTripsPerWeek] = useState(10);

  // Carpool
  const [carpoolCostPerMonth, setCarpoolCostPerMonth] = useState(120);

  // Public Transit
  const [transitCostPerMonth, setTransitCostPerMonth] = useState(90);

  // Years to compare
  const [years, setYears] = useState(5);

  // Car loan monthly payment
  function calcCarLoanMonthly() {
    const principal = carPrice - downPayment;
    const r = loanRate / 100 / 12;
    const n = loanTerm;
    if (principal <= 0) return 0;
    return (principal * r) / (1 - Math.pow(1 + r, -n));
  }

  // Car ownership total annual cost
  function calcCarAnnualCost() {
    const loanMonths = Math.min(years * 12, loanTerm);
    const loanMonthly = calcCarLoanMonthly();
    const loanTotal = loanMonthly * loanMonths;
    const totalDown = downPayment;
    const totalInsurance = insurance * years;
    const totalMaintenance = maintenance * years;
    const totalFuel = fuel * years;
    const totalReg = registration * years;
    const totalParking = parking * years;
    return (
      totalDown +
      loanTotal +
      totalInsurance +
      totalMaintenance +
      totalFuel +
      totalReg +
      totalParking
    );
  }

  // Uber/Lyft total cost
  function calcUberTotalCost() {
    const weekly = uberCostPerTrip * uberTripsPerWeek;
    return weekly * 52 * years;
  }

  // Carpool total cost
  function calcCarpoolTotalCost() {
    return carpoolCostPerMonth * 12 * years;
  }

  // Public transit total cost
  function calcTransitTotalCost() {
    return transitCostPerMonth * 12 * years;
  }

  return (
    <div className="mx-auto pt-6 sm:pt-12 lg:pt-16 pb-24 lg:pb-32 w-10/12 md:w-11/12">
      <h1>Transportation Cost Comparison</h1>
      <h5>
        Compare the costs of car ownership, Uber/Lyft, carpooling, and public
        transportation.
      </h5>
      <p>
        This calculator helps you compare the costs of owning a car versus using
        Uber/Lyft, carpooling, or public transportation. Please fill out the
        form below to see the results. This tool is for informational purposes
        only and should not be considered financial advice. Please consult with
        a financial advisor for personalized recommendations based on your
        individual circumstances.
      </p>
      <p>
        Note: This calculator does not account for depreciation, resale value,
        or time costs. The costs are estimates and may vary based on your
        location and personal circumstances. Please adjust the values according
        to your situation.
      </p>
      <p>
        Please enter your car ownership costs, Uber/Lyft costs, carpooling
        costs, and public transportation costs. The tool will provide you with a
        comparison of the total costs over the specified number of years.
      </p>

      {/* Table: Typical Transportation Costs */}
      <div className="my-8">
        <h2>Typical Transportation Costs (US, 2024)</h2>
        <div className="overflow-x-auto">
          <table className="border border-gray-300 min-w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-3 py-2 border text-left">Mode</th>
                <th className="px-3 py-2 border text-left">
                  Typical Annual Cost
                </th>
                <th className="px-3 py-2 border text-left">Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-3 py-2 border">Car Ownership</td>
                <td className="px-3 py-2 border">$8,000 - $12,000</td>
                <td className="px-3 py-2 border">
                  Includes loan, insurance, fuel, maintenance, registration,
                  parking
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Uber/Lyft</td>
                <td className="px-3 py-2 border">$3,000 - $15,000</td>
                <td className="px-3 py-2 border">
                  Highly variable, depends on usage
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Carpool</td>
                <td className="px-3 py-2 border">$1,000 - $2,500</td>
                <td className="px-3 py-2 border">Depends on arrangement</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Public Transit</td>
                <td className="px-3 py-2 border">$800 - $1,500</td>
                <td className="px-3 py-2 border">
                  Monthly pass in most US cities
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
                <th className="px-3 py-2 border text-left">Mode</th>
                <th className="px-3 py-2 border text-left">Pros</th>
                <th className="px-3 py-2 border text-left">Cons</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-3 py-2 border">Car Ownership</td>
                <td className="px-3 py-2 border">
                  Flexibility
                  <br />
                  Convenience
                  <br />
                  Useful for long trips
                </td>
                <td className="px-3 py-2 border">
                  High cost
                  <br />
                  Depreciation
                  <br />
                  Parking/maintenance hassles
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Uber/Lyft</td>
                <td className="px-3 py-2 border">
                  No maintenance
                  <br />
                  No insurance
                  <br />
                  Pay per use
                </td>
                <td className="px-3 py-2 border">
                  Expensive for frequent use
                  <br />
                  Surge pricing
                  <br />
                  Wait times
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Carpool</td>
                <td className="px-3 py-2 border">
                  Lower cost
                  <br />
                  Shared driving
                  <br />
                  Social benefits
                </td>
                <td className="px-3 py-2 border">
                  Less flexibility
                  <br />
                  Coordination required
                  <br />
                  Limited availability
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Public Transit</td>
                <td className="px-3 py-2 border">
                  Lowest cost
                  <br />
                  No maintenance
                  <br />
                  Environmentally friendly
                </td>
                <td className="px-3 py-2 border">
                  Less flexible
                  <br />
                  May be slower
                  <br />
                  Limited coverage
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <form className="mt-5">
        <div>
          <h2>Years to Compare</h2>
          <div>
            <Label>Years</Label>
            <div className="flex items-center gap-4">
              <Slider
                min={1}
                max={15}
                step={1}
                value={[years]}
                onValueChange={([v]) => setYears(v)}
                className="w-2/3"
              />
              <Input
                type="number"
                value={years}
                min={1}
                max={15}
                onChange={(e) => setYears(Number(e.target.value))}
                className="w-1/3"
              />
            </div>
          </div>
        </div>
        <div className="mt-8">
          <h2>Car Ownership</h2>
          <div className="gap-4 grid lg:grid-cols-3 mt-2">
            <div>
              <Label>Car Price ($)</Label>
              <div className="flex items-center gap-4">
                <Slider
                  min={5000}
                  max={100000}
                  step={500}
                  value={[carPrice]}
                  onValueChange={([v]) => setCarPrice(v)}
                  className="w-2/3"
                />
                <Input
                  type="number"
                  value={carPrice}
                  min={0}
                  onChange={(e) => setCarPrice(Number(e.target.value))}
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
                  value={[downPayment]}
                  onValueChange={([v]) => setDownPayment(v)}
                  className="w-2/3"
                />
                <Input
                  type="number"
                  value={downPayment}
                  min={0}
                  onChange={(e) => setDownPayment(Number(e.target.value))}
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
                  value={[loanRate]}
                  onValueChange={([v]) => setLoanRate(Number(v.toFixed(2)))}
                  className="w-2/3"
                />
                <Input
                  type="number"
                  value={loanRate}
                  min={0}
                  step={0.01}
                  onChange={(e) => setLoanRate(Number(e.target.value))}
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
                  value={[loanTerm]}
                  onValueChange={([v]) => setLoanTerm(v)}
                  className="w-2/3"
                />
                <Input
                  type="number"
                  value={loanTerm}
                  min={1}
                  max={84}
                  onChange={(e) => setLoanTerm(Number(e.target.value))}
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
                  value={[insurance]}
                  onValueChange={([v]) => setInsurance(v)}
                  className="w-2/3"
                />
                <Input
                  type="number"
                  value={insurance}
                  min={0}
                  onChange={(e) => setInsurance(Number(e.target.value))}
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
                  value={[maintenance]}
                  onValueChange={([v]) => setMaintenance(v)}
                  className="w-2/3"
                />
                <Input
                  type="number"
                  value={maintenance}
                  min={0}
                  onChange={(e) => setMaintenance(Number(e.target.value))}
                  className="w-1/3"
                />
              </div>
            </div>
            <div>
              <Label>Fuel (annual $)</Label>
              <div className="flex items-center gap-4">
                <Slider
                  min={0}
                  max={5000}
                  step={50}
                  value={[fuel]}
                  onValueChange={([v]) => setFuel(v)}
                  className="w-2/3"
                />
                <Input
                  type="number"
                  value={fuel}
                  min={0}
                  onChange={(e) => setFuel(Number(e.target.value))}
                  className="w-1/3"
                />
              </div>
            </div>
            <div>
              <Label>Registration (annual $)</Label>
              <div className="flex items-center gap-4">
                <Slider
                  min={0}
                  max={1000}
                  step={10}
                  value={[registration]}
                  onValueChange={([v]) => setRegistration(v)}
                  className="w-2/3"
                />
                <Input
                  type="number"
                  value={registration}
                  min={0}
                  onChange={(e) => setRegistration(Number(e.target.value))}
                  className="w-1/3"
                />
              </div>
            </div>
            <div>
              <Label>Parking (annual $)</Label>
              <div className="flex items-center gap-4">
                <Slider
                  min={0}
                  max={3000}
                  step={10}
                  value={[parking]}
                  onValueChange={([v]) => setParking(v)}
                  className="w-2/3"
                />
                <Input
                  type="number"
                  value={parking}
                  min={0}
                  onChange={(e) => setParking(Number(e.target.value))}
                  className="w-1/3"
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="mt-8">
            <h2>Uber/Lyft</h2>
            <div className="gap-4 grid md:grid-cols-2 mt-2">
              <div>
                <Label>Average Cost per Trip ($)</Label>
                <div className="flex items-center gap-4">
                  <Slider
                    min={5}
                    max={100}
                    step={1}
                    value={[uberCostPerTrip]}
                    onValueChange={([v]) => setUberCostPerTrip(v)}
                    className="w-2/3"
                  />
                  <Input
                    type="number"
                    value={uberCostPerTrip}
                    min={0}
                    onChange={(e) => setUberCostPerTrip(Number(e.target.value))}
                    className="w-1/3"
                  />
                </div>
              </div>
              <div>
                <Label>Trips per Week</Label>
                <div className="flex items-center gap-4">
                  <Slider
                    min={0}
                    max={30}
                    step={1}
                    value={[uberTripsPerWeek]}
                    onValueChange={([v]) => setUberTripsPerWeek(v)}
                    className="w-2/3"
                  />
                  <Input
                    type="number"
                    value={uberTripsPerWeek}
                    min={0}
                    onChange={(e) =>
                      setUberTripsPerWeek(Number(e.target.value))
                    }
                    className="w-1/3"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="gap-4 grid lg:grid-cols-2 mt-8">
            <div>
              <h2>Carpool</h2>
              <div className="mt-2">
                <Label>Carpool Cost per Month ($)</Label>
                <div className="flex items-center gap-4">
                  <Slider
                    min={0}
                    max={1000}
                    step={10}
                    value={[carpoolCostPerMonth]}
                    onValueChange={([v]) => setCarpoolCostPerMonth(v)}
                    className="w-2/3"
                  />
                  <Input
                    type="number"
                    value={carpoolCostPerMonth}
                    min={0}
                    onChange={(e) =>
                      setCarpoolCostPerMonth(Number(e.target.value))
                    }
                    className="w-1/3"
                  />
                </div>
              </div>
            </div>
            <div>
              <h2>Public Transportation</h2>
              <div className="mt-2">
                <Label>Transit Cost per Month ($)</Label>
                <div className="flex items-center gap-4">
                  <Slider
                    min={0}
                    max={500}
                    step={5}
                    value={[transitCostPerMonth]}
                    onValueChange={([v]) => setTransitCostPerMonth(v)}
                    className="w-2/3"
                  />
                  <Input
                    type="number"
                    value={transitCostPerMonth}
                    min={0}
                    onChange={(e) =>
                      setTransitCostPerMonth(Number(e.target.value))
                    }
                    className="w-1/3"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      {/* Card-like results display */}
      <div className="gap-5 grid md:grid-cols-2 lg:grid-cols-4 mt-8">
        <div className="bg-white shadow p-5 border border-gray-300 rounded-lg">
          <h3 className="flex items-center gap-2 mb-2 font-semibold text-blue-700 text-lg">
            Car Ownership
          </h3>
          <p>
            <strong>
              $
              {calcCarAnnualCost().toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })}
            </strong>
          </p>
        </div>
        <div className="bg-white shadow p-5 border border-gray-300 rounded-lg">
          <h3 className="flex items-center gap-2 mb-2 font-semibold text-green-700 text-lg">
            Uber/Lyft
          </h3>
          <p>
            <strong>
              $
              {calcUberTotalCost().toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })}
            </strong>
          </p>
        </div>
        <div className="bg-white shadow p-5 border border-gray-300 rounded-lg">
          <h3 className="flex items-center gap-2 mb-2 font-semibold text-lg text-yellow-700">
            Carpool
          </h3>
          <p>
            <strong>
              $
              {calcCarpoolTotalCost().toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })}
            </strong>
          </p>
        </div>
        <div className="bg-white shadow p-5 border border-gray-300 rounded-lg">
          <h3 className="flex items-center gap-2 mb-2 font-semibold text-lg text-purple-700">
            Public Transportation
          </h3>
          <p>
            <strong>
              $
              {calcTransitTotalCost().toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })}
            </strong>
          </p>
        </div>
      </div>
      <p style={{ marginTop: 24, color: "#666" }}>
        Note: This calculator does not account for depreciation, resale value,
        or time costs.
      </p>
    </div>
  );
};

export default BuyingVsUberVsCarpoolVsTransit;
