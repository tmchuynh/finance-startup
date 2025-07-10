"use client";

import { Button } from "@/components/ui/button";
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

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            return `Balance: $${context.parsed.y.toLocaleString()}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value: any) {
            return "$" + value.toLocaleString();
          },
        },
      },
    },
  };

  const resetToDefaults = () => {
    setPrincipal(1000);
    setAnnualRate(5);
    setMonthlyContribution(100);
    setYears(10);
  };

  return (
    <div className="mx-auto px-4 py-8 max-w-7xl container">
      {/* Header Section */}
      <div className="mb-8">
        <h1>Compound Interest Visualizer</h1>
        <div className="mb-6 p-6 border rounded-lg">
          <h2 className="">Visualize Your Investment Growth</h2>
          <p className="">
            Use this powerful tool to see how your investments grow over time
            with compound interest. Adjust the parameters below to explore
            different scenarios and understand the impact of consistent
            investing and compound growth.
          </p>
        </div>
      </div>

      {/* Input Parameters Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2>Investment Parameters</h2>
          <Button
            variant="outline"
            onClick={resetToDefaults}
            className="text-sm"
          >
            Reset to Defaults
          </Button>
        </div>

        <div className="bg-card p-6 border rounded-lg">
          <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <Label htmlFor="principal" className="font-medium text-sm">
                Initial Amount ($)
              </Label>
              <Input
                id="principal"
                type="number"
                value={principal}
                min={0}
                step={100}
                onChange={(e) => setPrincipal(Number(e.target.value))}
                className="text-lg"
              />
              <p className="text-muted-foreground text-xs">
                Your starting investment amount
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="rate" className="font-medium text-sm">
                Annual Interest Rate (%)
              </Label>
              <Input
                id="rate"
                type="number"
                value={annualRate}
                min={0}
                max={20}
                step={0.1}
                onChange={(e) => setAnnualRate(Number(e.target.value))}
                className="text-lg"
              />
              <p className="text-muted-foreground text-xs">
                Expected annual return rate
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="contribution" className="font-medium text-sm">
                Monthly Contribution ($)
              </Label>
              <Input
                id="contribution"
                type="number"
                value={monthlyContribution}
                min={0}
                step={50}
                onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                className="text-lg"
              />
              <p className="text-muted-foreground text-xs">
                Amount added each month
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="years" className="font-medium text-sm">
                Investment Period (Years)
              </Label>
              <Input
                id="years"
                type="number"
                value={years}
                min={1}
                max={50}
                onChange={(e) => setYears(Number(e.target.value))}
                className="text-lg"
              />
              <p className="text-muted-foreground text-xs">
                How long to invest
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="mb-8">
        <h2>Investment Summary</h2>
        <div className="gap-4 grid grid-cols-1 md:grid-cols-3">
          <div className="bg-card p-4 border rounded-lg">
            <h4>Total Contributions</h4>
            <p className="font-bold text-2xl">
              ${totalContributions.toLocaleString()}
            </p>
            <p className="mt-1 text-muted-foreground text-xs">
              Your total investment
            </p>
          </div>
          <div className="bg-card p-4 border rounded-lg">
            <h4>Interest Earned</h4>
            <p className="font-bold text-2xl">
              ${interestEarned.toLocaleString()}
            </p>
            <p className="mt-1 text-muted-foreground text-xs">
              Compound growth profit
            </p>
          </div>
          <div className="bg-card p-4 border rounded-lg">
            <h4>Final Balance</h4>
            <p className="font-bold text-2xl">
              ${finalBalance.toLocaleString()}
            </p>
            <p className="mt-1 text-muted-foreground text-xs">
              Total after {years} years
            </p>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="mb-8">
        <h2>Growth Visualization</h2>
        <div className="bg-card p-6 border rounded-lg">
          <div className="h-96">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Key Insights Section */}
      <div className="mb-8">
        <h2>Key Insights</h2>
        <div className="bg-card p-6 border rounded-lg">
          <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
            <div>
              <h3>Growth Breakdown</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Interest vs Contributions:</span>
                  <span className="font-medium">
                    {((interestEarned / totalContributions) * 100).toFixed(1)}%
                    gain
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Monthly growth rate:</span>
                  <span className="font-medium">
                    {(annualRate / 12).toFixed(2)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Total months:</span>
                  <span className="font-medium">{years * 12} months</span>
                </div>
              </div>
            </div>
            <div>
              <h3>Power of Compound Interest</h3>
              <p className="text-muted-foreground text-sm">
                Notice how the growth accelerates over time. This is the magic
                of compound interest - you earn interest on both your original
                investment and previously earned interest. The longer you
                invest, the more dramatic this effect becomes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompoundInterestVisualizer;
