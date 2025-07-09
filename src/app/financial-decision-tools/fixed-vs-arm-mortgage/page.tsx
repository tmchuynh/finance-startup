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
    <div className="mx-auto pb-24 lg:pb-32 pt-6 sm:pt-12 lg:pt-16 w-10/12 md:w-11/12">
      <div className="mb-12 text-center">
        <h1 className="mb-4 font-bold text-4xl sm:text-5xl tracking-tight">
          Fixed Rate vs ARM Mortgage Calculator
        </h1>
        <h5 className="mb-6 text-xl">Compare Your Mortgage Options</h5>
        <p className="mx-auto max-w-3xl text-lg">
          Use this tool to estimate the monthly payments and total cost of a
          fixed-rate mortgage versus an adjustable-rate mortgage (ARM). This
          tool provides estimates for informational purposes only. Actual rates,
          payments, and costs may vary. Consult a mortgage professional before
          making decisions.
        </p>
      </div>
      {/* Chart 1: Key Differences */}
      <div className="my-8">
        <h2 className="mb-4 font-semibold text-2xl">Key Differences</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Feature</TableHead>
              <TableHead>Fixed-Rate Mortgage</TableHead>
              <TableHead>Adjustable-Rate Mortgage (ARM)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Interest Rate</TableCell>
              <TableCell>Stays the same for the life of the loan</TableCell>
              <TableCell>Starts lower, adjusts after initial period</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Monthly Payment</TableCell>
              <TableCell>Predictable, never changes</TableCell>
              <TableCell>
                Can increase or decrease after initial period
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Best For</TableCell>
              <TableCell>Staying long-term, want stability</TableCell>
              <TableCell>
                Short-term stay, expect to move or refinance
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Initial Rate</TableCell>
              <TableCell>Usually higher than ARM's initial rate</TableCell>
              <TableCell>Usually lower for first 3-10 years</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Risk</TableCell>
              <TableCell>No risk of payment increase</TableCell>
              <TableCell>Risk of higher payments after adjustment</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      {/* Chart 2: Pros and Cons */}
      <div className="my-8">
        <h2 className="mb-4 font-semibold text-2xl">Pros and Cons</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Pros</TableHead>
              <TableHead>Cons</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Fixed-Rate</TableCell>
              <TableCell>
                <ul className="space-y-1 text-sm list-disc list-inside">
                  <li>Predictable payments</li>
                  <li>Easier budgeting</li>
                  <li>No risk of rising rates</li>
                </ul>
              </TableCell>
              <TableCell>
                <ul className="space-y-1 text-sm list-disc list-inside">
                  <li>Higher initial rate</li>
                  <li>May pay more if you move early</li>
                </ul>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">ARM</TableCell>
              <TableCell>
                <ul className="space-y-1 text-sm list-disc list-inside">
                  <li>Lower initial rate</li>
                  <li>Lower payments in early years</li>
                  <li>Good if moving/refinancing before adjustment</li>
                </ul>
              </TableCell>
              <TableCell>
                <ul className="space-y-1 text-sm list-disc list-inside">
                  <li>Payments can rise</li>
                  <li>Harder to budget long-term</li>
                  <li>More complex terms</li>
                </ul>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      {/* Chart 3: Typical Rates and Terms */}
      <div className="my-8">
        <h2 className="mb-4 font-semibold text-2xl">
          Typical Rates and Terms (2024)
        </h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Interest Rate Range</TableHead>
              <TableHead>Common Terms</TableHead>
              <TableHead>Notes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Fixed-Rate</TableCell>
              <TableCell>6% - 7.5%</TableCell>
              <TableCell>15, 20, 30 years</TableCell>
              <TableCell>Rate stays the same for entire loan</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">ARM (e.g. 5/1, 7/1)</TableCell>
              <TableCell>5% - 6.5% (initial)</TableCell>
              <TableCell>
                30 years (5-10 years fixed, then adjusts annually)
              </TableCell>
              <TableCell>
                Rate adjusts after initial period, may increase
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      {/* End charts */}
      <div className="shadow-lg mb-8 p-8 border rounded-lg">
        <h2 className="mb-6 font-semibold text-2xl">Calculator</h2>

        {/* Loan Amount Section */}
        <div className="mb-8">
          <h3 className="mb-4 font-medium text-lg">Loan Information</h3>
          <div>
            <Label className="font-medium text-sm">
              Loan Amount: ${amount.toLocaleString()}
            </Label>
            <div className="flex gap-4 items-center mt-2">
              <Slider
                min={50000}
                max={2000000}
                step={10000}
                value={[amount]}
                onValueChange={([v]) => setAmount(v)}
                className="flex-1"
              />
              <Input
                type="number"
                min={0}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-32"
                required
              />
            </div>
          </div>
        </div>

        {/* Fixed-Rate Mortgage Section */}
        <div className="mb-8 p-6 border rounded-lg">
          <h3 className="mb-4 font-medium text-lg">Fixed-Rate Mortgage</h3>
          <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
            <div>
              <Label className="font-medium text-sm">
                Interest Rate: {fixedRate}%
              </Label>
              <div className="flex gap-4 items-center mt-2">
                <Slider
                  min={0}
                  max={15}
                  step={0.01}
                  value={[fixedRate]}
                  onValueChange={([v]) => setFixedRate(Number(v.toFixed(2)))}
                  className="flex-1"
                />
                <Input
                  type="number"
                  min={0}
                  max={100}
                  value={fixedRate}
                  step={0.01}
                  onChange={(e) => setFixedRate(Number(e.target.value))}
                  className="w-24"
                  required
                />
              </div>
            </div>
            <div>
              <Label className="font-medium text-sm">
                Term: {fixedYears} years
              </Label>
              <div className="flex gap-4 items-center mt-2">
                <Slider
                  min={1}
                  max={40}
                  step={1}
                  value={[fixedYears]}
                  onValueChange={([v]) => setFixedYears(v)}
                  className="flex-1"
                />
                <Input
                  type="number"
                  min={1}
                  value={fixedYears}
                  onChange={(e) => setFixedYears(Number(e.target.value))}
                  className="w-24"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* ARM Section */}
        <div className="mb-6 p-6 border rounded-lg">
          <h3 className="mb-4 font-medium text-lg">
            Adjustable-Rate Mortgage (ARM)
          </h3>
          <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
            <div>
              <Label className="font-medium text-sm">
                Initial Rate: {armInitialRate}%
              </Label>
              <div className="flex gap-4 items-center mt-2">
                <Slider
                  min={0}
                  max={15}
                  step={0.01}
                  value={[armInitialRate]}
                  onValueChange={([v]) =>
                    setArmInitialRate(Number(v.toFixed(2)))
                  }
                  className="flex-1"
                />
                <Input
                  type="number"
                  min={0}
                  max={100}
                  value={armInitialRate}
                  step={0.01}
                  onChange={(e) => setArmInitialRate(Number(e.target.value))}
                  className="w-24"
                  required
                />
              </div>
            </div>
            <div>
              <Label className="font-medium text-sm">
                Initial Period: {armInitialYears} years
              </Label>
              <div className="flex gap-4 items-center mt-2">
                <Slider
                  min={0}
                  max={10}
                  step={1}
                  value={[armInitialYears]}
                  onValueChange={([v]) => setArmInitialYears(v)}
                  className="flex-1"
                />
                <Input
                  type="number"
                  min={0}
                  value={armInitialYears}
                  onChange={(e) => setArmInitialYears(Number(e.target.value))}
                  className="w-24"
                  required
                />
              </div>
            </div>
            <div>
              <Label className="font-medium text-sm">
                Adjusted Rate: {armAdjRate}%
              </Label>
              <div className="flex gap-4 items-center mt-2">
                <Slider
                  min={0}
                  max={15}
                  step={0.01}
                  value={[armAdjRate]}
                  onValueChange={([v]) => setArmAdjRate(Number(v.toFixed(2)))}
                  className="flex-1"
                />
                <Input
                  type="number"
                  min={0}
                  max={100}
                  value={armAdjRate}
                  step={0.01}
                  onChange={(e) => setArmAdjRate(Number(e.target.value))}
                  className="w-24"
                  required
                />
              </div>
            </div>
            <div>
              <Label className="font-medium text-sm">
                Total Term: {armTotalYears} years
              </Label>
              <div className="flex gap-4 items-center mt-2">
                <Slider
                  min={1}
                  max={40}
                  step={1}
                  value={[armTotalYears]}
                  onValueChange={([v]) => setArmTotalYears(v)}
                  className="flex-1"
                />
                <Input
                  type="number"
                  min={1}
                  value={armTotalYears}
                  onChange={(e) => setArmTotalYears(Number(e.target.value))}
                  className="w-24"
                  required
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <h2 className="mb-6 font-semibold text-2xl">Results</h2>
      {/* Winner Banner */}
      {(() => {
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

        return (
          <div
            className={`p-4 rounded-lg mb-6 ${
              arm.total < fixed.total ? " border " : " border "
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3
                  className={`font-semibold ${
                    arm.total < fixed.total ? "" : ""
                  }`}
                >
                  {arm.total < fixed.total
                    ? "ARM Could Save Money!"
                    : "Fixed-Rate is More Stable!"}
                </h3>
                <p className={`text-sm ${arm.total < fixed.total ? "" : ""}`}>
                  {arm.total < fixed.total
                    ? `Potential savings: $${(
                        fixed.total - arm.total
                      ).toLocaleString()} over the life of the loan`
                    : "Predictable payments with no adjustment risk"}
                </p>
              </div>
            </div>
          </div>
        );
      })()}
      {/* Comparison Cards */}
      <div className="gap-6 grid grid-cols-1 md:grid-cols-2 mb-8">
        <div className="shadow-sm p-6 border-2 rounded-lg">
          <h3 className="flex gap-2 items-center mb-4 font-semibold text-xl">
            🏠 Fixed-Rate Mortgage
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="">Monthly Payment:</span>
              <span className="font-bold text-lg">
                $
                {calcFixedMortgage({
                  amount,
                  rate: fixedRate,
                  years: fixedYears,
                }).monthly.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="">Total Paid Over {fixedYears} Years:</span>
              <span className="font-bold">
                $
                {calcFixedMortgage({
                  amount,
                  rate: fixedRate,
                  years: fixedYears,
                }).total.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="">Total Interest:</span>
              <span className="font-bold">
                $
                {(
                  calcFixedMortgage({
                    amount,
                    rate: fixedRate,
                    years: fixedYears,
                  }).total - amount
                ).toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="">Rate Stability:</span>
              <span className="font-bold">Guaranteed</span>
            </div>
          </div>
        </div>

        <div className="shadow-sm p-6 border-2 rounded-lg">
          <h3 className="flex gap-2 items-center mb-4 font-semibold text-xl">
            📈 Adjustable-Rate Mortgage (ARM)
          </h3>
          <div className="space-y-3">
            {(() => {
              const arm = calcARMMortgage({
                amount,
                initialRate: armInitialRate,
                initialYears: armInitialYears,
                adjRate: armAdjRate,
                totalYears: armTotalYears,
              });
              return (
                <>
                  <div className="flex items-center justify-between">
                    <span className="">Initial Monthly Payment:</span>
                    <span className="font-bold text-lg">
                      ${arm.initialMonthly.toLocaleString()}
                    </span>
                  </div>
                  <div className="-mt-2 text-xs">
                    For first {armInitialYears} years
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="">Adjusted Monthly Payment:</span>
                    <span className="font-bold">
                      ${arm.adjMonthly.toLocaleString()}
                    </span>
                  </div>
                  <div className="-mt-2 text-xs">
                    For remaining {armTotalYears - armInitialYears} years
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="">
                      Total Paid Over {armTotalYears} Years:
                    </span>
                    <span className="font-bold">
                      ${arm.total.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="">Total Interest:</span>
                    <span className="font-bold">
                      ${(arm.total - amount).toLocaleString()}
                    </span>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      </div>
      ;{/* Detailed Comparison Table */}
      <div className="shadow mb-8 border rounded-lg overflow-hidden">
        <h3 className="p-6 pb-4 font-semibold text-lg">Detailed Comparison</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Metric</TableHead>
              <TableHead className="">Fixed-Rate</TableHead>
              <TableHead className="">ARM</TableHead>
              <TableHead>Difference</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(() => {
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

              return (
                <>
                  <TableRow>
                    <TableCell className="font-medium">Loan Amount</TableCell>
                    <TableCell>${amount.toLocaleString()}</TableCell>
                    <TableCell>${amount.toLocaleString()}</TableCell>
                    <TableCell>Same</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Interest Rate</TableCell>
                    <TableCell>{fixedRate}% (fixed)</TableCell>
                    <TableCell>
                      {armInitialRate}% → {armAdjRate}%
                    </TableCell>
                    <TableCell>
                      {armInitialRate < fixedRate
                        ? `${(fixedRate - armInitialRate).toFixed(
                            2
                          )}% higher initially`
                        : `${(armInitialRate - fixedRate).toFixed(
                            2
                          )}% lower initially`}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      Initial Monthly Payment
                    </TableCell>
                    <TableCell className="font-semibold">
                      ${fixed.monthly.toLocaleString()}
                    </TableCell>
                    <TableCell className="font-semibold">
                      ${arm.initialMonthly.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      {arm.initialMonthly < fixed.monthly
                        ? `$${(
                            fixed.monthly - arm.initialMonthly
                          ).toLocaleString()} lower`
                        : `$${(
                            arm.initialMonthly - fixed.monthly
                          ).toLocaleString()} higher`}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      Adjusted Payment (ARM)
                    </TableCell>
                    <TableCell>N/A</TableCell>
                    <TableCell className="font-semibold">
                      ${arm.adjMonthly.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      {arm.adjMonthly > fixed.monthly
                        ? `$${(
                            arm.adjMonthly - fixed.monthly
                          ).toLocaleString()} higher than fixed`
                        : `$${(
                            fixed.monthly - arm.adjMonthly
                          ).toLocaleString()} lower than fixed`}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      Total Interest
                    </TableCell>
                    <TableCell className="font-semibold">
                      ${(fixed.total - amount).toLocaleString()}
                    </TableCell>
                    <TableCell className="font-semibold">
                      ${(arm.total - amount).toLocaleString()}
                    </TableCell>
                    <TableCell className="font-bold">
                      {arm.total < fixed.total
                        ? `$${(
                            fixed.total - arm.total
                          ).toLocaleString()} savings with ARM`
                        : `$${(
                            arm.total - fixed.total
                          ).toLocaleString()} additional cost with ARM`}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Total Cost</TableCell>
                    <TableCell className="font-bold text-lg">
                      ${fixed.total.toLocaleString()}
                    </TableCell>
                    <TableCell className="font-bold text-lg">
                      ${arm.total.toLocaleString()}
                    </TableCell>
                    <TableCell className="font-bold">
                      {arm.total < fixed.total
                        ? `$${(
                            fixed.total - arm.total
                          ).toLocaleString()} savings`
                        : `$${(
                            arm.total - fixed.total
                          ).toLocaleString()} additional cost`}
                    </TableCell>
                  </TableRow>
                </>
              );
            })()}
          </TableBody>
        </Table>
      </div>
      ; ; ; ; ;{/* Recommendation Banner */}
      <div className="mb-8 p-6 border rounded-lg">
        <h3 className="mb-3 font-semibold text-lg">💡 Recommendation</h3>
        <div className="">{recommendation}</div>
      </div>
      {/* Important Considerations */}
      <div className="mb-8 p-6 border rounded-lg">
        <h3 className="mb-3 font-semibold text-lg">
          ⚠️ Important Considerations
        </h3>
        <ul className="space-y-2">
          <li>ARM rates can increase significantly after the initial period</li>
          <li>Fixed-rate mortgages provide payment stability for budgeting</li>
          <li>Consider how long you plan to stay in the home</li>
          <li>
            ARM loans may have rate caps that limit how much rates can increase
          </li>
          <li>
            Market conditions and your credit score affect available rates
          </li>
          <li>Consider refinancing options if rates change favorably</li>
        </ul>
      </div>
      <section className="p-6 border rounded-lg">
        <h2 className="mb-3 font-semibold text-xl">📋 Disclaimer</h2>
        <p className="leading-relaxed">
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
