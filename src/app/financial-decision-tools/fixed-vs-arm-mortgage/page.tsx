"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useEffect, useState } from "react";

function calcFixedMortgage({
  amount,
  rate,
  years,
}: {
  amount: number;
  rate: number;
  years: number;
}) {
  const n = years * 12;
  const monthlyRate = rate / 100 / 12;
  const monthly =
    monthlyRate === 0
      ? amount / n
      : (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -n));
  const totalPaid = monthly * n;
  return { monthly: Math.round(monthly), total: Math.round(totalPaid) };
}

function calcARMMortgage({
  amount,
  initialRate,
  initialYears,
  adjRate,
  totalYears,
}: {
  amount: number;
  initialRate: number;
  initialYears: number;
  adjRate: number;
  totalYears: number;
}) {
  const nInitial = initialYears * 12;
  const nTotal = totalYears * 12;
  const nAdj = nTotal - nInitial;
  const initialMonthlyRate = initialRate / 100 / 12;
  const adjMonthlyRate = adjRate / 100 / 12;

  // Initial period
  const initialMonthly =
    initialMonthlyRate === 0
      ? amount / nTotal
      : (amount * initialMonthlyRate) /
        (1 - Math.pow(1 + initialMonthlyRate, -nTotal));
  let balance = amount;
  for (let i = 0; i < nInitial; i++) {
    const interest = balance * initialMonthlyRate;
    const principal = initialMonthly - interest;
    balance -= principal;
  }

  // Adjusted period
  const adjMonthly =
    adjMonthlyRate === 0
      ? balance / nAdj
      : (balance * adjMonthlyRate) / (1 - Math.pow(1 + adjMonthlyRate, -nAdj));
  const totalPaid =
    initialMonthly * nInitial + (isNaN(adjMonthly) ? 0 : adjMonthly * nAdj);

  return {
    initialMonthly: Math.round(initialMonthly),
    adjMonthly: isNaN(adjMonthly) ? 0 : Math.round(adjMonthly),
    total: Math.round(totalPaid),
  };
}

export default function FixedVsARMMortgage() {
  const [amount, setAmount] = useState<number>(400000);
  const [fixedRate, setFixedRate] = useState<number>(6.5);
  const [fixedYears, setFixedYears] = useState<number>(30);

  const [armInitialRate, setArmInitialRate] = useState<number>(5.5);
  const [armInitialYears, setArmInitialYears] = useState<number>(5);
  const [armAdjRate, setArmAdjRate] = useState<number>(7.5);
  const [armTotalYears, setArmTotalYears] = useState<number>(30);

  const [recommendation, setRecommendation] = useState<string>("");

  // Calculate results automatically as inputs change
  useEffect(() => {
    const fixed = calcFixedMortgage({
      amount,
      rate: fixedRate,
      years: fixedYears,
    });
    const arm = calcARMMortgage({
      amount,
      initialRate: armInitialRate,
      initialYears: armInitialYears,
      adjRate: armAdjRate,
      totalYears: armTotalYears,
    });

    let recommendation = "";
    if (arm.total < fixed.total) {
      recommendation =
        "The ARM could cost less overall if you move or refinance before the adjustment period ends, but payments may rise after the initial period.";
    } else if (arm.total > fixed.total) {
      recommendation =
        "The fixed-rate mortgage may cost less overall and provides predictable payments.";
    } else {
      recommendation =
        "Both options may have similar total costs. Consider your risk tolerance and how long you plan to stay in the home.";
    }

    setRecommendation(recommendation);
  }, [
    amount,
    fixedRate,
    fixedYears,
    armInitialRate,
    armInitialYears,
    armAdjRate,
    armTotalYears,
  ]);

  return (
    <div className="mx-auto pt-6 sm:pt-12 lg:pt-16 pb-24 lg:pb-32 w-10/12 md:w-11/12">
      <h1>Fixed Rate vs Adjustable Rate Mortgage</h1>
      <h5>Compare Your Mortgage Options</h5>
      <p>
        Use this tool to estimate the monthly payments and total cost of a
        fixed-rate mortgage versus an adjustable-rate mortgage (ARM). This tool
        provides estimates for informational purposes only. Actual rates,
        payments, and costs may vary. Consult a mortgage professional before
        making decisions.
      </p>

      {/* Chart 1: Key Differences */}
      <div className="my-8">
        <h2 className="mb-2 font-semibold text-lg">Key Differences</h2>
        <div className="overflow-x-auto">
          <table className="border border-gray-300 min-w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-3 py-2 border text-left">Feature</th>
                <th className="px-3 py-2 border text-left">
                  Fixed-Rate Mortgage
                </th>
                <th className="px-3 py-2 border text-left">
                  Adjustable-Rate Mortgage (ARM)
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-3 py-2 border">Interest Rate</td>
                <td className="px-3 py-2 border">
                  Stays the same for the life of the loan
                </td>
                <td className="px-3 py-2 border">
                  Starts lower, adjusts after initial period
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Monthly Payment</td>
                <td className="px-3 py-2 border">Predictable, never changes</td>
                <td className="px-3 py-2 border">
                  Can increase or decrease after initial period
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Best For</td>
                <td className="px-3 py-2 border">
                  Staying long-term, want stability
                </td>
                <td className="px-3 py-2 border">
                  Short-term stay, expect to move or refinance
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Initial Rate</td>
                <td className="px-3 py-2 border">
                  Usually higher than ARM's initial rate
                </td>
                <td className="px-3 py-2 border">
                  Usually lower for first 3-10 years
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Risk</td>
                <td className="px-3 py-2 border">
                  No risk of payment increase
                </td>
                <td className="px-3 py-2 border">
                  Risk of higher payments after adjustment
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Chart 2: Pros and Cons */}
      <div className="my-8">
        <h2 className="mb-2 font-semibold text-lg">Pros and Cons</h2>
        <div className="overflow-x-auto">
          <table className="border border-gray-300 min-w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-3 py-2 border text-left">Type</th>
                <th className="px-3 py-2 border text-left">Pros</th>
                <th className="px-3 py-2 border text-left">Cons</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-3 py-2 border">Fixed-Rate</td>
                <td className="px-3 py-2 border">
                  Predictable payments
                  <br />
                  Easier budgeting
                  <br />
                  No risk of rising rates
                </td>
                <td className="px-3 py-2 border">
                  Higher initial rate
                  <br />
                  May pay more if you move early
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">ARM</td>
                <td className="px-3 py-2 border">
                  Lower initial rate
                  <br />
                  Lower payments in early years
                  <br />
                  Good if moving/refinancing before adjustment
                </td>
                <td className="px-3 py-2 border">
                  Payments can rise
                  <br />
                  Harder to budget long-term
                  <br />
                  More complex terms
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Chart 3: Typical Rates and Terms */}
      <div className="my-8">
        <h2 className="mb-2 font-semibold text-lg">
          Typical Rates and Terms (2024)
        </h2>
        <div className="overflow-x-auto">
          <table className="border border-gray-300 min-w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-3 py-2 border text-left">Type</th>
                <th className="px-3 py-2 border text-left">
                  Interest Rate Range
                </th>
                <th className="px-3 py-2 border text-left">Common Terms</th>
                <th className="px-3 py-2 border text-left">Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-3 py-2 border">Fixed-Rate</td>
                <td className="px-3 py-2 border">6% - 7.5%</td>
                <td className="px-3 py-2 border">15, 20, 30 years</td>
                <td className="px-3 py-2 border">
                  Rate stays the same for entire loan
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">ARM (e.g. 5/1, 7/1)</td>
                <td className="px-3 py-2 border">5% - 6.5% (initial)</td>
                <td className="px-3 py-2 border">
                  30 years (5-10 years fixed, then adjusts annually)
                </td>
                <td className="px-3 py-2 border">
                  Rate adjusts after initial period, may increase
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {/* End charts */}

      <form className="space-y-5 mt-5" aria-label="Mortgage comparison form">
        <div className="mb-4 pb-4 border-b">
          <Label className="block mb-1 font-semibold">
            Fixed-Rate Mortgage
          </Label>
          <div className="flex flex-col gap-4 mb-2">
            <div className="flex items-center gap-4">
              <Label className="w-32">Loan Amount ($)</Label>
              <Slider
                min={50000}
                max={2000000}
                step={10000}
                value={[amount]}
                onValueChange={([v]) => setAmount(v)}
                className="w-2/3"
              />
              <Input
                type="number"
                min={0}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-1/4"
                required
              />
            </div>
            <div className="flex items-center gap-4">
              <Label className="w-32">Interest Rate (%)</Label>
              <Slider
                min={0}
                max={15}
                step={0.01}
                value={[fixedRate]}
                onValueChange={([v]) => setFixedRate(Number(v.toFixed(2)))}
                className="w-2/3"
              />
              <Input
                type="number"
                min={0}
                max={100}
                value={fixedRate}
                step={0.01}
                onChange={(e) => setFixedRate(Number(e.target.value))}
                className="w-1/4"
                required
              />
            </div>
            <div className="flex items-center gap-4">
              <Label className="w-32">Term (years)</Label>
              <Slider
                min={1}
                max={40}
                step={1}
                value={[fixedYears]}
                onValueChange={([v]) => setFixedYears(v)}
                className="w-2/3"
              />
              <Input
                type="number"
                min={1}
                value={fixedYears}
                onChange={(e) => setFixedYears(Number(e.target.value))}
                className="w-1/4"
                required
              />
            </div>
          </div>
        </div>
        <div>
          <Label className="block mb-1 font-semibold">
            Adjustable-Rate Mortgage (ARM)
          </Label>
          <div className="flex flex-col gap-4 mb-2">
            <div className="flex items-center gap-4">
              <Label className="w-32">Initial Rate (%)</Label>
              <Slider
                min={0}
                max={15}
                step={0.01}
                value={[armInitialRate]}
                onValueChange={([v]) => setArmInitialRate(Number(v.toFixed(2)))}
                className="w-2/3"
              />
              <Input
                type="number"
                min={0}
                max={100}
                value={armInitialRate}
                step={0.01}
                onChange={(e) => setArmInitialRate(Number(e.target.value))}
                className="w-1/4"
                required
              />
            </div>
            <div className="flex items-center gap-4">
              <Label className="w-32">Initial Period (years)</Label>
              <Slider
                min={0}
                max={10}
                step={1}
                value={[armInitialYears]}
                onValueChange={([v]) => setArmInitialYears(v)}
                className="w-2/3"
              />
              <Input
                type="number"
                min={0}
                value={armInitialYears}
                onChange={(e) => setArmInitialYears(Number(e.target.value))}
                className="w-1/4"
                required
              />
            </div>
            <div className="flex items-center gap-4">
              <Label className="w-32">Adjusted Rate (%)</Label>
              <Slider
                min={0}
                max={15}
                step={0.01}
                value={[armAdjRate]}
                onValueChange={([v]) => setArmAdjRate(Number(v.toFixed(2)))}
                className="w-2/3"
              />
              <Input
                type="number"
                min={0}
                max={100}
                value={armAdjRate}
                step={0.01}
                onChange={(e) => setArmAdjRate(Number(e.target.value))}
                className="w-1/4"
                required
              />
            </div>
            <div className="flex items-center gap-4">
              <Label className="w-32">Total Term (years)</Label>
              <Slider
                min={1}
                max={40}
                step={1}
                value={[armTotalYears]}
                onValueChange={([v]) => setArmTotalYears(v)}
                className="w-2/3"
              />
              <Input
                type="number"
                min={1}
                value={armTotalYears}
                onChange={(e) => setArmTotalYears(Number(e.target.value))}
                className="w-1/4"
                required
              />
            </div>
          </div>
        </div>
      </form>

      {/* Card-like results display */}
      <div className="gap-6 grid grid-cols-1 md:grid-cols-2 mt-8">
        <div className="bg-white shadow p-5 border border-gray-300 rounded-lg">
          <h3 className="flex items-center gap-2 mb-2 font-semibold text-blue-700 text-lg">
            Fixed-Rate Mortgage
          </h3>
          <ul>
            <li>
              <span className="text-gray-700">Monthly Payment:</span>{" "}
              <strong className="text-blue-900">
                $
                {calcFixedMortgage({
                  amount,
                  rate: fixedRate,
                  years: fixedYears,
                }).monthly.toLocaleString()}
              </strong>
            </li>
            <li>
              <span className="text-gray-700">
                Total Paid Over {fixedYears} Years:
              </span>{" "}
              <strong className="text-blue-900">
                $
                {calcFixedMortgage({
                  amount,
                  rate: fixedRate,
                  years: fixedYears,
                }).total.toLocaleString()}
              </strong>
            </li>
          </ul>
        </div>
        <div className="bg-white shadow p-5 border border-gray-300 rounded-lg">
          <h3 className="flex items-center gap-2 mb-2 font-semibold text-green-700 text-lg">
            Adjustable-Rate Mortgage (ARM)
          </h3>
          <ul>
            <li>
              <span className="text-gray-700">Initial Monthly Payment:</span>{" "}
              <strong className="text-green-900">
                $
                {calcARMMortgage({
                  amount,
                  initialRate: armInitialRate,
                  initialYears: armInitialYears,
                  adjRate: armAdjRate,
                  totalYears: armTotalYears,
                }).initialMonthly.toLocaleString()}
              </strong>{" "}
              for {armInitialYears} years
            </li>
            <li>
              <span className="text-gray-700">Adjusted Monthly Payment:</span>{" "}
              <strong className="text-green-900">
                $
                {calcARMMortgage({
                  amount,
                  initialRate: armInitialRate,
                  initialYears: armInitialYears,
                  adjRate: armAdjRate,
                  totalYears: armTotalYears,
                }).adjMonthly.toLocaleString()}
              </strong>{" "}
              for {armTotalYears - armInitialYears} years
            </li>
            <li>
              <span className="text-gray-700">
                Total Paid Over {armTotalYears} Years:
              </span>{" "}
              <strong className="text-green-900">
                $
                {calcARMMortgage({
                  amount,
                  initialRate: armInitialRate,
                  initialYears: armInitialYears,
                  adjRate: armAdjRate,
                  totalYears: armTotalYears,
                }).total.toLocaleString()}
              </strong>
            </li>
          </ul>
        </div>
      </div>
      {/* Recommendation */}
      <div className="mt-6">
        <div className="bg-blue-50 p-4 border border-blue-200 rounded text-blue-900">
          <strong>Recommendation:</strong>
          <div className="mt-1">{recommendation}</div>
        </div>
      </div>

      <section className="mt-8">
        <h2 className="mt-8 mb-2 font-semibold text-lg">Disclaimer</h2>
        <p>
          This tool provides estimates for informational purposes only. Actual
          rates, payments, and costs may vary. Consult a mortgage professional
          before making decisions. The results are based on the inputs you
          provided and do not take into account other factors that may affect
          your mortgage options, such as credit score, down payment, and lender
          requirements. The calculations are based on standard mortgage terms
          and may not reflect your specific situation. Please use this tool as a
          starting point for your research and consult a financial advisor or
          mortgage professional for personalized advice.
        </p>
      </section>
    </div>
  );
}
