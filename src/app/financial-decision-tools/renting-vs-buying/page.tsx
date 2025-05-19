"use client";

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
    <div style={{ maxWidth: 700, margin: "0 auto", padding: 24 }}>
      <h1>Rent vs Buy Calculator</h1>
      <p>
        Compare the estimated total cost of renting vs buying a home over a set
        period.
      </p>
      <form
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
          marginBottom: 32,
        }}
        onSubmit={(e) => e.preventDefault()}
      >
        <div>
          <h2>Renting</h2>
          <label>
            Monthly Rent ($)
            <input
              type="number"
              value={rent}
              min={0}
              onChange={(e) => setRent(Number(e.target.value))}
            />
          </label>
          <br />
          <label>
            Annual Rent Increase (%)
            <input
              type="number"
              value={rentIncrease}
              min={0}
              step={0.1}
              onChange={(e) => setRentIncrease(Number(e.target.value))}
            />
          </label>
        </div>
        <div>
          <h2>Buying</h2>
          <label>
            Home Price ($)
            <input
              type="number"
              value={homePrice}
              min={0}
              onChange={(e) => setHomePrice(Number(e.target.value))}
            />
          </label>
          <br />
          <label>
            Down Payment (%)
            <input
              type="number"
              value={downPayment}
              min={0}
              max={100}
              step={0.1}
              onChange={(e) => setDownPayment(Number(e.target.value))}
            />
          </label>
          <br />
          <label>
            Mortgage Rate (%)
            <input
              type="number"
              value={mortgageRate}
              min={0}
              step={0.01}
              onChange={(e) => setMortgageRate(Number(e.target.value))}
            />
          </label>
          <br />
          <label>
            Property Tax Rate (%)
            <input
              type="number"
              value={propertyTax}
              min={0}
              step={0.01}
              onChange={(e) => setPropertyTax(Number(e.target.value))}
            />
          </label>
          <br />
          <label>
            Home Insurance (annual $)
            <input
              type="number"
              value={homeInsurance}
              min={0}
              onChange={(e) => setHomeInsurance(Number(e.target.value))}
            />
          </label>
          <br />
          <label>
            Maintenance (% of home price/year)
            <input
              type="number"
              value={maintenance}
              min={0}
              step={0.1}
              onChange={(e) => setMaintenance(Number(e.target.value))}
            />
          </label>
          <br />
          <label>
            HOA Fees (monthly $)
            <input
              type="number"
              value={hoa}
              min={0}
              onChange={(e) => setHoa(Number(e.target.value))}
            />
          </label>
        </div>
        <div>
          <label>
            Years to Compare
            <input
              type="number"
              value={years}
              min={1}
              max={30}
              onChange={(e) => setYears(Number(e.target.value))}
            />
          </label>
        </div>
      </form>
      <h2>Results</h2>
      <div style={{ display: "flex", gap: 32 }}>
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
      <p style={{ marginTop: 24, color: "#666" }}>
        Note: This calculator does not account for investment growth on down
        payment, home appreciation, selling costs, or tax deductions.
      </p>
    </div>
  );
};

export default RentVsBuy;
