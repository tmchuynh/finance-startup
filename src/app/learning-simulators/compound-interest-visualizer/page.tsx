"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
    <div className="mx-auto pt-6 sm:pt-12 lg:pt-16 pb-24 lg:pb-32 w-10/12 md:w-11/12">
      <h1>Compound Interest Visualizer</h1>
      <h5>Visualize Your Investment Growth</h5>
      <p>
        Use this tool to visualize how your investments grow over time with
        compound interest. Adjust the parameters to see how they affect your
        final balance.
      </p>
      <div className="gap-6 grid md:grid-cols-2 lg:grid-cols-4 mt-8">
        <div>
          <Label>Initial Amount ($)</Label>
          <Input
            type="number"
            value={principal}
            min={0}
            onChange={(e) => setPrincipal(Number(e.target.value))}
          />
        </div>
        <div>
          <Label>Annual Interest Rate (%)</Label>
          <Input
            type="number"
            value={annualRate}
            min={0}
            step={0.01}
            onChange={(e) => setAnnualRate(Number(e.target.value))}
          />
        </div>
        <div>
          <Label>Monthly Contribution ($)</Label>
          <Input
            type="number"
            value={monthlyContribution}
            min={0}
            onChange={(e) => setMonthlyContribution(Number(e.target.value))}
          />
        </div>
        <div>
          <Label>Years</Label>
          <Input
            type="number"
            value={years}
            min={1}
            max={50}
            onChange={(e) => setYears(Number(e.target.value))}
          />
        </div>
      </div>
      <Line data={chartData} />
      <div className="mt-8">
        <h2>Results</h2>
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
