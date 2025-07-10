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
    <div className="mx-auto pb-24 lg:pb-32 pt-6 sm:pt-12 lg:pt-16 w-10/12 md:w-11/12">
      <div className="mb-8 text-center">
        <h1 className="mb-4 font-bold text-4xl sm:text-5xl tracking-tight">
          Transportation Cost Comparison
        </h1>
        <h5 className="mb-6 text-xl">
          Compare the costs of car ownership, Uber/Lyft, carpooling, and public
          transportation.
        </h5>
        <p className="mx-auto max-w-3xl text-lg">
          This calculator helps you compare the costs of owning a car versus
          using Uber/Lyft, carpooling, or public transportation. This tool is
          for informational purposes only and should not be considered financial
          advice.
        </p>
      </div>

      {/* Typical Transportation Costs */}
      <div className="shadow-sm mb-8 border rounded-lg">
        <div className="p-6">
          <h2 className="mb-4 font-semibold text-xl">
            Typical Transportation Costs (US, 2024)
          </h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mode</TableHead>
                <TableHead>Typical Annual Cost</TableHead>
                <TableHead>Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Car Ownership</TableCell>
                <TableCell>$8,000 - $12,000</TableCell>
                <TableCell>
                  Includes loan, insurance, fuel, maintenance, registration,
                  parking
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Uber/Lyft</TableCell>
                <TableCell>$3,000 - $15,000</TableCell>
                <TableCell>Highly variable, depends on usage</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Carpool</TableCell>
                <TableCell>$1,000 - $2,500</TableCell>
                <TableCell>Depends on arrangement</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Public Transit</TableCell>
                <TableCell>$800 - $1,500</TableCell>
                <TableCell>Monthly pass in most US cities</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pros and Cons */}
      <div className="shadow-sm mb-8 border rounded-lg">
        <div className="p-6">
          <h2 className="mb-4 font-semibold text-xl">Pros and Cons</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mode</TableHead>
                <TableHead>Pros</TableHead>
                <TableHead>Cons</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Car Ownership</TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div>Flexibility</div>
                    <div>Convenience</div>
                    <div>Useful for long trips</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div>High cost</div>
                    <div>Depreciation</div>
                    <div>Parking/maintenance hassles</div>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Uber/Lyft</TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div>No maintenance</div>
                    <div>No insurance</div>
                    <div>Pay per use</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div>Expensive for frequent use</div>
                    <div>Surge pricing</div>
                    <div>Wait times</div>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Carpool</TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div>Lower cost</div>
                    <div>Shared driving</div>
                    <div>Social benefits</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div>Less flexibility</div>
                    <div>Coordination required</div>
                    <div>Limited availability</div>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Public Transit</TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div>Lowest cost</div>
                    <div>No maintenance</div>
                    <div>Environmentally friendly</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div>Less flexible</div>
                    <div>May be slower</div>
                    <div>Limited coverage</div>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Calculator Form */}
      <div className="shadow-sm border rounded-lg">
        <div className="p-6">
          <h2 className="mb-6 font-semibold text-xl">
            Transportation Cost Calculator
          </h2>

          {/* Years to Compare */}
          <div className="mb-8">
            <h3 className="mb-4 font-medium text-lg">Years to Compare</h3>
            <div className="max-w-md">
              <Label htmlFor="years">Years</Label>
              <div className="flex gap-4 items-center mt-2">
                <Slider
                  min={1}
                  max={15}
                  step={1}
                  value={[years]}
                  onValueChange={([v]) => setYears(v)}
                  className="flex-1"
                />
                <Input
                  id="years"
                  type="number"
                  value={years}
                  min={1}
                  max={15}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="w-20"
                />
              </div>
            </div>
          </div>

          {/* Car Ownership */}
          <div className="mb-8">
            <h3 className="mb-4 font-medium text-lg">Car Ownership</h3>
            <div className="gap-6 grid md:grid-cols-2 lg:grid-cols-3">
              <div>
                <Label htmlFor="carPrice">Car Price ($)</Label>
                <div className="flex gap-4 items-center mt-2">
                  <Slider
                    min={5000}
                    max={100000}
                    step={500}
                    value={[carPrice]}
                    onValueChange={([v]) => setCarPrice(v)}
                    className="flex-1"
                  />
                  <Input
                    id="carPrice"
                    type="number"
                    value={carPrice}
                    min={0}
                    onChange={(e) => setCarPrice(Number(e.target.value))}
                    className="w-28"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="downPayment">Down Payment ($)</Label>
                <div className="flex gap-4 items-center mt-2">
                  <Slider
                    min={0}
                    max={50000}
                    step={500}
                    value={[downPayment]}
                    onValueChange={([v]) => setDownPayment(v)}
                    className="flex-1"
                  />
                  <Input
                    id="downPayment"
                    type="number"
                    value={downPayment}
                    min={0}
                    onChange={(e) => setDownPayment(Number(e.target.value))}
                    className="w-28"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="loanRate">Loan Rate (%)</Label>
                <div className="flex gap-4 items-center mt-2">
                  <Slider
                    min={0}
                    max={15}
                    step={0.1}
                    value={[loanRate]}
                    onValueChange={([v]) => setLoanRate(Number(v.toFixed(1)))}
                    className="flex-1"
                  />
                  <Input
                    id="loanRate"
                    type="number"
                    value={loanRate}
                    min={0}
                    step={0.1}
                    onChange={(e) => setLoanRate(Number(e.target.value))}
                    className="w-20"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="loanTerm">Loan Term (months)</Label>
                <div className="flex gap-4 items-center mt-2">
                  <Slider
                    min={12}
                    max={84}
                    step={1}
                    value={[loanTerm]}
                    onValueChange={([v]) => setLoanTerm(v)}
                    className="flex-1"
                  />
                  <Input
                    id="loanTerm"
                    type="number"
                    value={loanTerm}
                    min={1}
                    max={84}
                    onChange={(e) => setLoanTerm(Number(e.target.value))}
                    className="w-20"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="insurance">Insurance (annual $)</Label>
                <div className="flex gap-4 items-center mt-2">
                  <Slider
                    min={0}
                    max={5000}
                    step={50}
                    value={[insurance]}
                    onValueChange={([v]) => setInsurance(v)}
                    className="flex-1"
                  />
                  <Input
                    id="insurance"
                    type="number"
                    value={insurance}
                    min={0}
                    onChange={(e) => setInsurance(Number(e.target.value))}
                    className="w-28"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="maintenance">Maintenance (annual $)</Label>
                <div className="flex gap-4 items-center mt-2">
                  <Slider
                    min={0}
                    max={5000}
                    step={50}
                    value={[maintenance]}
                    onValueChange={([v]) => setMaintenance(v)}
                    className="flex-1"
                  />
                  <Input
                    id="maintenance"
                    type="number"
                    value={maintenance}
                    min={0}
                    onChange={(e) => setMaintenance(Number(e.target.value))}
                    className="w-28"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="fuel">Fuel (annual $)</Label>
                <div className="flex gap-4 items-center mt-2">
                  <Slider
                    min={0}
                    max={5000}
                    step={50}
                    value={[fuel]}
                    onValueChange={([v]) => setFuel(v)}
                    className="flex-1"
                  />
                  <Input
                    id="fuel"
                    type="number"
                    value={fuel}
                    min={0}
                    onChange={(e) => setFuel(Number(e.target.value))}
                    className="w-28"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="registration">Registration (annual $)</Label>
                <div className="flex gap-4 items-center mt-2">
                  <Slider
                    min={0}
                    max={1000}
                    step={10}
                    value={[registration]}
                    onValueChange={([v]) => setRegistration(v)}
                    className="flex-1"
                  />
                  <Input
                    id="registration"
                    type="number"
                    value={registration}
                    min={0}
                    onChange={(e) => setRegistration(Number(e.target.value))}
                    className="w-28"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="parking">Parking (annual $)</Label>
                <div className="flex gap-4 items-center mt-2">
                  <Slider
                    min={0}
                    max={3000}
                    step={10}
                    value={[parking]}
                    onValueChange={([v]) => setParking(v)}
                    className="flex-1"
                  />
                  <Input
                    id="parking"
                    type="number"
                    value={parking}
                    min={0}
                    onChange={(e) => setParking(Number(e.target.value))}
                    className="w-28"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Uber/Lyft */}
          <div className="mb-8">
            <h3 className="mb-4 font-medium text-lg">Uber/Lyft</h3>
            <div className="gap-6 grid md:grid-cols-2">
              <div>
                <Label htmlFor="uberCostPerTrip">
                  Average Cost per Trip ($)
                </Label>
                <div className="flex gap-4 items-center mt-2">
                  <Slider
                    min={5}
                    max={100}
                    step={1}
                    value={[uberCostPerTrip]}
                    onValueChange={([v]) => setUberCostPerTrip(v)}
                    className="flex-1"
                  />
                  <Input
                    id="uberCostPerTrip"
                    type="number"
                    value={uberCostPerTrip}
                    min={0}
                    onChange={(e) => setUberCostPerTrip(Number(e.target.value))}
                    className="w-20"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="uberTripsPerWeek">Trips per Week</Label>
                <div className="flex gap-4 items-center mt-2">
                  <Slider
                    min={1}
                    max={50}
                    step={1}
                    value={[uberTripsPerWeek]}
                    onValueChange={([v]) => setUberTripsPerWeek(v)}
                    className="flex-1"
                  />
                  <Input
                    id="uberTripsPerWeek"
                    type="number"
                    value={uberTripsPerWeek}
                    min={0}
                    onChange={(e) =>
                      setUberTripsPerWeek(Number(e.target.value))
                    }
                    className="w-20"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Carpool and Public Transit */}
          <div className="gap-8 grid md:grid-cols-2">
            <div>
              <h3 className="mb-4 font-medium text-lg">Carpool</h3>
              <div>
                <Label htmlFor="carpoolCostPerMonth">Cost per Month ($)</Label>
                <div className="flex gap-4 items-center mt-2">
                  <Slider
                    min={0}
                    max={500}
                    step={10}
                    value={[carpoolCostPerMonth]}
                    onValueChange={([v]) => setCarpoolCostPerMonth(v)}
                    className="flex-1"
                  />
                  <Input
                    id="carpoolCostPerMonth"
                    type="number"
                    value={carpoolCostPerMonth}
                    min={0}
                    onChange={(e) =>
                      setCarpoolCostPerMonth(Number(e.target.value))
                    }
                    className="w-24"
                  />
                </div>
              </div>
            </div>
            <div>
              <h3 className="mb-4 font-medium text-lg">Public Transit</h3>
              <div>
                <Label htmlFor="transitCostPerMonth">Cost per Month ($)</Label>
                <div className="flex gap-4 items-center mt-2">
                  <Slider
                    min={0}
                    max={300}
                    step={5}
                    value={[transitCostPerMonth]}
                    onValueChange={([v]) => setTransitCostPerMonth(v)}
                    className="flex-1"
                  />
                  <Input
                    id="transitCostPerMonth"
                    type="number"
                    value={transitCostPerMonth}
                    min={0}
                    onChange={(e) =>
                      setTransitCostPerMonth(Number(e.target.value))
                    }
                    className="w-24"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Results Display */}
      <div className="shadow-sm mt-8 border rounded-lg">
        <div className="p-6">
          <h2 className="mb-6 font-semibold text-xl">
            Cost Comparison Results
          </h2>
          <p className="mb-6 text-sm">
            Total costs over {years} year{years !== 1 ? "s" : ""}
          </p>

          {/* Cost Cards */}
          <div className="gap-6 grid md:grid-cols-2 lg:grid-cols-4">
            <div className="p-4 border rounded-lg">
              <div className="flex gap-2 items-center mb-2">
                <div className="rounded-full h-3 w-3"></div>
                <h3 className="font-semibold">Car Ownership</h3>
              </div>
              <p className="font-bold text-2xl">
                $
                {calcCarAnnualCost().toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })}
              </p>
              <p className="mt-1 text-sm">
                ${Math.round(calcCarAnnualCost() / years / 12).toLocaleString()}
                /month
              </p>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex gap-2 items-center mb-2">
                <div className="bg-green-600 rounded-full h-3 w-3"></div>
                <h3 className="font-semibold">Uber/Lyft</h3>
              </div>
              <p className="font-bold text-2xl">
                $
                {calcUberTotalCost().toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })}
              </p>
              <p className="mt-1 text-sm">
                ${Math.round(calcUberTotalCost() / years / 12).toLocaleString()}
                /month
              </p>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex gap-2 items-center mb-2">
                <div className="bg-yellow-600 rounded-full h-3 w-3"></div>
                <h3 className="font-semibold text-yellow-900">Carpool</h3>
              </div>
              <p className="font-bold text-2xl text-yellow-900">
                $
                {calcCarpoolTotalCost().toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })}
              </p>
              <p className="mt-1 text-sm">
                ${carpoolCostPerMonth.toLocaleString()}/month
              </p>
            </div>

            <div className="bg-purple-50 p-4 border border-purple-200 rounded-lg">
              <div className="flex gap-2 items-center mb-2">
                <div className="bg-purple-600 rounded-full h-3 w-3"></div>
                <h3 className="font-semibold text-purple-900">
                  Public Transit
                </h3>
              </div>
              <p className="font-bold text-2xl text-purple-900">
                $
                {calcTransitTotalCost().toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })}
              </p>
              <p className="mt-1 text-sm">
                ${transitCostPerMonth.toLocaleString()}/month
              </p>
            </div>
          </div>

          {/* Cost Breakdown */}
          <div className="mt-8">
            <h3 className="mb-4 font-medium text-lg">Cost Breakdown</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transportation Mode</TableHead>
                  <TableHead>Total Cost</TableHead>
                  <TableHead>Monthly Cost</TableHead>
                  <TableHead>Cost per Year</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Car Ownership</TableCell>
                  <TableCell className="font-semibold">
                    $
                    {calcCarAnnualCost().toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    })}
                  </TableCell>
                  <TableCell>
                    $
                    {Math.round(
                      calcCarAnnualCost() / years / 12
                    ).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    ${Math.round(calcCarAnnualCost() / years).toLocaleString()}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Uber/Lyft</TableCell>
                  <TableCell className="font-semibold">
                    $
                    {calcUberTotalCost().toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    })}
                  </TableCell>
                  <TableCell>
                    $
                    {Math.round(
                      calcUberTotalCost() / years / 12
                    ).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    ${Math.round(calcUberTotalCost() / years).toLocaleString()}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium text-yellow-900">
                    Carpool
                  </TableCell>
                  <TableCell className="font-semibold">
                    $
                    {calcCarpoolTotalCost().toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    })}
                  </TableCell>
                  <TableCell>${carpoolCostPerMonth.toLocaleString()}</TableCell>
                  <TableCell>
                    ${(carpoolCostPerMonth * 12).toLocaleString()}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium text-purple-900">
                    Public Transit
                  </TableCell>
                  <TableCell className="font-semibold">
                    $
                    {calcTransitTotalCost().toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    })}
                  </TableCell>
                  <TableCell>${transitCostPerMonth.toLocaleString()}</TableCell>
                  <TableCell>
                    ${(transitCostPerMonth * 12).toLocaleString()}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          {/* Winner Banner */}
          {(() => {
            const costs = [
              {
                name: "Car Ownership",
                cost: calcCarAnnualCost(),
                color: "blue",
              },
              {
                name: "Uber/Lyft",
                cost: calcUberTotalCost(),
                color: "green",
              },
              {
                name: "Carpool",
                cost: calcCarpoolTotalCost(),
                color: "yellow",
              },
              {
                name: "Public Transit",
                cost: calcTransitTotalCost(),
                color: "purple",
              },
            ];
            const winner = costs.reduce((min, current) =>
              current.cost < min.cost ? current : min
            );
            const savings = Math.max(...costs.map((c) => c.cost)) - winner.cost;

            return (
              <div
                className={`mt-8 p-4 rounded-lg border ${
                  winner.color === "blue"
                    ? " "
                    : winner.color === "green"
                    ? " "
                    : winner.color === "yellow"
                    ? " "
                    : "bg-purple-50 border-purple-200"
                }`}
              >
                <div className="flex gap-2 items-center mb-2">
                  <div
                    className={`w-4 h-4 rounded-full ${
                      winner.color === "blue"
                        ? ""
                        : winner.color === "green"
                        ? "bg-green-600"
                        : winner.color === "yellow"
                        ? "bg-yellow-600"
                        : "bg-purple-600"
                    }`}
                  ></div>
                  <h3
                    className={`text-lg font-semibold ${
                      winner.color === "blue"
                        ? ""
                        : winner.color === "green"
                        ? ""
                        : winner.color === "yellow"
                        ? "text-yellow-900"
                        : "text-purple-900"
                    }`}
                  >
                    🏆 Most Cost-Effective: {winner.name}
                  </h3>
                </div>
                <p
                  className={`${
                    winner.color === "blue"
                      ? ""
                      : winner.color === "green"
                      ? ""
                      : winner.color === "yellow"
                      ? ""
                      : ""
                  }`}
                >
                  You could save up to{" "}
                  <strong>
                    $
                    {savings.toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    })}
                  </strong>{" "}
                  over {years} years by choosing {winner.name.toLowerCase()}.
                </p>
              </div>
            );
          })()}

          {/* Educational Note */}
          <div className="mt-6 p-4 border rounded-lg">
            <h4 className="mb-2 font-medium">Important Considerations</h4>
            <ul className="space-y-1 text-sm">
              <li>
                This calculator does not account for depreciation, resale value,
                or time costs
              </li>
              <li>
                Actual costs may vary based on your location and personal
                circumstances
              </li>
              <li>
                Consider factors like convenience, reliability, and
                environmental impact
              </li>
              <li>
                For car ownership, consider that having a car provides asset
                value
              </li>
              <li>
                Public transit and carpool options may not be available in all
                areas
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyingVsUberVsCarpoolVsTransit;
