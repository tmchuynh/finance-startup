"use client";

import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";
import React, { useState } from "react";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

function calculateCompoundInterest(
  principal: number,
  annualRate: number,
  monthlyContribution: number,
  years: number
) {
  const months = years * 12;
  const monthlyRate = annualRate / 100 / 12;
  let balance = principal;
  const data: number[] = [balance];
  let totalContributions = principal;

  for (let i = 1; i <= months; i++) {
    balance = balance * (1 + monthlyRate) + monthlyContribution;
    totalContributions += monthlyContribution;
    data.push(balance);
  }
  const interestEarned = balance - totalContributions;
  return { data, totalContributions, interestEarned, finalBalance: balance };
}

const CompoundInterestVisualizer: React.FC = () => {
  const [principal, setPrincipal] = useState(1000);
  const [annualRate, setAnnualRate] = useState(5);
  const [monthlyContribution, setMonthlyContribution] = useState(100);
  const [years, setYears] = useState(10);

  const { data, totalContributions, interestEarned, finalBalance } =
    calculateCompoundInterest(
      principal,
      annualRate,
      monthlyContribution,
      years
    );

  const chartData = {
    labels: Array.from({ length: years * 12 + 1 }, (_, i) => `Month ${i}`),
    datasets: [
      {
        label: "Balance Over Time",
        data,
        borderColor: "#4f46e5",
        backgroundColor: "rgba(79,70,229,0.1)",
        fill: true,
        tension: 0.1,
      },
    ],
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <h2>Compound Interest Visualizer</h2>
      <div
        style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 24 }}
      >
        <label>
          Initial Amount ($)
          <input
            type="number"
            value={principal}
            min={0}
            onChange={(e) => setPrincipal(Number(e.target.value))}
          />
        </label>
        <label>
          Annual Interest Rate (%)
          <input
            type="number"
            value={annualRate}
            min={0}
            step={0.01}
            onChange={(e) => setAnnualRate(Number(e.target.value))}
          />
        </label>
        <label>
          Monthly Contribution ($)
          <input
            type="number"
            value={monthlyContribution}
            min={0}
            onChange={(e) => setMonthlyContribution(Number(e.target.value))}
          />
        </label>
        <label>
          Years
          <input
            type="number"
            value={years}
            min={1}
            max={50}
            onChange={(e) => setYears(Number(e.target.value))}
          />
        </label>
      </div>
      <Line data={chartData} />
      <div style={{ marginTop: 24 }}>
        <p>
          <strong>Total Contributions:</strong> ${totalContributions.toFixed(2)}
        </p>
        <p>
          <strong>Interest Earned:</strong> ${interestEarned.toFixed(2)}
        </p>
        <p>
          <strong>Final Balance:</strong> ${finalBalance.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default CompoundInterestVisualizer;
