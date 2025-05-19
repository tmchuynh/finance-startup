"use client";

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

      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <h2>Car Ownership</h2>
          <label>
            Car Price ($)
            <input
              type="number"
              value={carPrice}
              min={0}
              onChange={(e) => setCarPrice(Number(e.target.value))}
            />
          </label>
          <br />
          <label>
            Down Payment ($)
            <input
              type="number"
              value={downPayment}
              min={0}
              onChange={(e) => setDownPayment(Number(e.target.value))}
            />
          </label>
          <br />
          <label>
            Loan Rate (%)
            <input
              type="number"
              value={loanRate}
              min={0}
              step={0.01}
              onChange={(e) => setLoanRate(Number(e.target.value))}
            />
          </label>
          <br />
          <label>
            Loan Term (months)
            <input
              type="number"
              value={loanTerm}
              min={1}
              max={84}
              onChange={(e) => setLoanTerm(Number(e.target.value))}
            />
          </label>
          <br />
          <label>
            Insurance (annual $)
            <input
              type="number"
              value={insurance}
              min={0}
              onChange={(e) => setInsurance(Number(e.target.value))}
            />
          </label>
          <br />
          <label>
            Maintenance (annual $)
            <input
              type="number"
              value={maintenance}
              min={0}
              onChange={(e) => setMaintenance(Number(e.target.value))}
            />
          </label>
          <br />
          <label>
            Fuel (annual $)
            <input
              type="number"
              value={fuel}
              min={0}
              onChange={(e) => setFuel(Number(e.target.value))}
            />
          </label>
          <br />
          <label>
            Registration (annual $)
            <input
              type="number"
              value={registration}
              min={0}
              onChange={(e) => setRegistration(Number(e.target.value))}
            />
          </label>
          <br />
          <label>
            Parking (annual $)
            <input
              type="number"
              value={parking}
              min={0}
              onChange={(e) => setParking(Number(e.target.value))}
            />
          </label>
        </div>
        <div>
          <h2>Uber/Lyft</h2>
          <label>
            Average Cost per Trip ($)
            <input
              type="number"
              value={uberCostPerTrip}
              min={0}
              onChange={(e) => setUberCostPerTrip(Number(e.target.value))}
            />
          </label>
          <br />
          <label>
            Trips per Week
            <input
              type="number"
              value={uberTripsPerWeek}
              min={0}
              onChange={(e) => setUberTripsPerWeek(Number(e.target.value))}
            />
          </label>
          <h2 style={{ marginTop: 32 }}>Carpool</h2>
          <label>
            Carpool Cost per Month ($)
            <input
              type="number"
              value={carpoolCostPerMonth}
              min={0}
              onChange={(e) => setCarpoolCostPerMonth(Number(e.target.value))}
            />
          </label>
          <h2 style={{ marginTop: 32 }}>Public Transportation</h2>
          <label>
            Transit Cost per Month ($)
            <input
              type="number"
              value={transitCostPerMonth}
              min={0}
              onChange={(e) => setTransitCostPerMonth(Number(e.target.value))}
            />
          </label>
          <h2 style={{ marginTop: 32 }}>Years to Compare</h2>
          <label>
            Years
            <input
              type="number"
              value={years}
              min={1}
              max={15}
              onChange={(e) => setYears(Number(e.target.value))}
            />
          </label>
        </div>
      </form>
      <h2>Results for {years} years</h2>
      <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
        <div>
          <h3>Car Ownership</h3>
          <p>
            <strong>
              $
              {calcCarAnnualCost().toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })}
            </strong>
          </p>
        </div>
        <div>
          <h3>Uber/Lyft</h3>
          <p>
            <strong>
              $
              {calcUberTotalCost().toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })}
            </strong>
          </p>
        </div>
        <div>
          <h3>Carpool</h3>
          <p>
            <strong>
              $
              {calcCarpoolTotalCost().toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })}
            </strong>
          </p>
        </div>
        <div>
          <h3>Public Transportation</h3>
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
