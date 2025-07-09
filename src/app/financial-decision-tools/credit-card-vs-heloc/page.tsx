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

const CreditCardVsHELOC: React.FC = () => {
  const [debt, setDebt] = useState(10000);
  const [ccRate, setCcRate] = useState(22);
  const [minPaymentPct, setMinPaymentPct] = useState(2);
  const [helocRate, setHelocRate] = useState(8);
  const [helocTerm, setHelocTerm] = useState(60);

  // Credit Card payoff simulation (minimum payment, no new charges)
  function calcCreditCard() {
    let balance = debt;
    let totalPaid = 0;
    let months = 0;
    const minPaymentFloor = 25;
    while (balance > 0 && months < 600) {
      const interest = (balance * ccRate) / 100 / 12;
      let payment = Math.max((minPaymentPct / 100) * balance, minPaymentFloor);
      if (payment > balance + interest) payment = balance + interest;
      balance = balance + interest - payment;
      totalPaid += payment;
      months++;
      if (balance < 0.01) break;
    }
    return { totalPaid, months };
  }

  // HELOC calculation (fixed payment)
  function calcHELOC() {
    const monthlyRate = helocRate / 100 / 12;
    const n = helocTerm;
    const payment = (debt * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -n));
    const totalPaid = payment * n;
    return { totalPaid, months: n };
  }

  const cc = calcCreditCard();
  const heloc = calcHELOC();

  return (
    <div className="mx-auto pb-24 lg:pb-32 pt-6 sm:pt-12 lg:pt-16 w-10/12 md:w-11/12">
      <div className="mb-8 text-center">
        <h1 className="mb-4 font-bold text-4xl sm:text-5xl tracking-tight">
          Credit Card vs HELOC Payoff Calculator
        </h1>
        <h5 className="mb-6 text-xl">
          Make informed decisions about your debt repayment strategy
        </h5>
        <p className="mx-auto max-w-3xl text-lg">
          This calculator helps you compare the total cost and time to pay off
          your credit card debt using a HELOC (Home Equity Line of Credit) vs.
          continuing to pay the credit card minimum.
        </p>
      </div>

      {/* Typical Terms */}
      <div className="shadow-sm mb-8 border rounded-lg">
        <div className="p-6">
          <h2 className="mb-4 font-semibold text-xl">Typical Terms</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Interest Rate</TableHead>
                <TableHead>Term</TableHead>
                <TableHead>Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Credit Card</TableCell>
                <TableCell>16% - 29%</TableCell>
                <TableCell>Open-ended</TableCell>
                <TableCell>Minimum payment required monthly</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">HELOC</TableCell>
                <TableCell>7% - 12%</TableCell>
                <TableCell>5 - 30 years</TableCell>
                <TableCell>
                  Variable rate, uses home equity as collateral
                </TableCell>
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
                <TableHead>Option</TableHead>
                <TableHead>Pros</TableHead>
                <TableHead>Cons</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Credit Card</TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div>No collateral required</div>
                    <div>Flexible payments</div>
                    <div>Widely available</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div>High interest rates</div>
                    <div>Can take decades to pay off</div>
                    <div>Minimum payments may barely reduce balance</div>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">HELOC</TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div>Lower interest rate</div>
                    <div>Fixed payoff schedule</div>
                    <div>May reduce total interest paid</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div>Requires home equity</div>
                    <div>Risk of foreclosure</div>
                    <div>Closing costs/fees possible</div>
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
            Debt Comparison Calculator
          </h2>

          {/* Current Debt Information */}
          <div className="mb-8">
            <h3 className="mb-4 font-medium text-lg">
              Current Debt Information
            </h3>
            <div className="gap-6 grid md:grid-cols-3">
              <div>
                <Label htmlFor="debt" className="font-medium">
                  Debt Amount ($)
                </Label>
                <div className="flex gap-4 items-center mt-2">
                  <Slider
                    min={1000}
                    max={100000}
                    step={500}
                    value={[debt]}
                    onValueChange={([v]) => setDebt(v)}
                    className="flex-1"
                  />
                  <Input
                    id="debt"
                    type="number"
                    value={debt}
                    min={0}
                    onChange={(e) => setDebt(Number(e.target.value))}
                    className="w-28"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="ccRate" className="font-medium">
                  Credit Card Interest Rate (% APR)
                </Label>
                <div className="flex gap-4 items-center mt-2">
                  <Slider
                    min={0}
                    max={40}
                    step={0.1}
                    value={[ccRate]}
                    onValueChange={([v]) => setCcRate(Number(v.toFixed(1)))}
                    className="flex-1"
                  />
                  <Input
                    id="ccRate"
                    type="number"
                    value={ccRate}
                    min={0}
                    step={0.1}
                    onChange={(e) => setCcRate(Number(e.target.value))}
                    className="w-20"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="minPaymentPct" className="font-medium">
                  Minimum Payment (% of balance)
                </Label>
                <div className="flex gap-4 items-center mt-2">
                  <Slider
                    min={1}
                    max={10}
                    step={0.1}
                    value={[minPaymentPct]}
                    onValueChange={([v]) =>
                      setMinPaymentPct(Number(v.toFixed(1)))
                    }
                    className="flex-1"
                  />
                  <Input
                    id="minPaymentPct"
                    type="number"
                    value={minPaymentPct}
                    min={1}
                    max={100}
                    step={0.1}
                    onChange={(e) => setMinPaymentPct(Number(e.target.value))}
                    className="w-20"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* HELOC Information */}
          <div>
            <h3 className="mb-4 font-medium text-lg">HELOC Information</h3>
            <div className="gap-6 grid md:grid-cols-2">
              <div>
                <Label htmlFor="helocRate" className="font-medium">
                  HELOC Interest Rate (% APR)
                </Label>
                <div className="flex gap-4 items-center mt-2">
                  <Slider
                    min={0}
                    max={20}
                    step={0.1}
                    value={[helocRate]}
                    onValueChange={([v]) => setHelocRate(Number(v.toFixed(1)))}
                    className="flex-1"
                  />
                  <Input
                    id="helocRate"
                    type="number"
                    value={helocRate}
                    min={0}
                    step={0.1}
                    onChange={(e) => setHelocRate(Number(e.target.value))}
                    className="w-20"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="helocTerm" className="font-medium">
                  HELOC Term (months)
                </Label>
                <div className="flex gap-4 items-center mt-2">
                  <Slider
                    min={12}
                    max={360}
                    step={1}
                    value={[helocTerm]}
                    onValueChange={([v]) => setHelocTerm(v)}
                    className="flex-1"
                  />
                  <Input
                    id="helocTerm"
                    type="number"
                    value={helocTerm}
                    min={1}
                    max={360}
                    onChange={(e) => setHelocTerm(Number(e.target.value))}
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
            Payoff Comparison Results
          </h2>

          {(() => {
            const cc = calcCreditCard();
            const heloc = calcHELOC();
            const savings = cc.totalPaid - heloc.totalPaid;
            const isHelocBetter = savings > 0;
            const timeDifference = cc.months - heloc.months;

            return (
              <>
                {/* Comparison Cards */}
                <div className="gap-6 grid md:grid-cols-2 mb-8">
                  <div className="p-6 border rounded-lg">
                    <div className="flex gap-2 items-center mb-4">
                      <div className="bg-blue-600 rounded-full h-3 w-3"></div>
                      <h3 className="font-semibold text-lg">
                        Credit Card Payoff
                      </h3>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm">Total amount paid</p>
                        <p className="font-bold text-2xl">
                          $
                          {cc.totalPaid.toLocaleString(undefined, {
                            maximumFractionDigits: 0,
                          })}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm">Time to pay off</p>
                        <p className="font-semibold text-xl">
                          {cc.months} months (
                          {Math.round((cc.months / 12) * 10) / 10} years)
                        </p>
                      </div>
                      <div>
                        <p className="text-sm">Total interest paid</p>
                        <p className="font-medium text-lg">
                          $
                          {(cc.totalPaid - debt).toLocaleString(undefined, {
                            maximumFractionDigits: 0,
                          })}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm">Monthly payment (starts at)</p>
                        <p className="font-medium text-lg">
                          $
                          {Math.round(
                            (minPaymentPct / 100) * debt
                          ).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 border rounded-lg">
                    <div className="flex gap-2 items-center mb-4">
                      <div className="bg-green-600 rounded-full h-3 w-3"></div>
                      <h3 className="font-semibold text-lg">HELOC Payoff</h3>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm">Total amount paid</p>
                        <p className="font-bold text-2xl">
                          $
                          {heloc.totalPaid.toLocaleString(undefined, {
                            maximumFractionDigits: 0,
                          })}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm">Time to pay off</p>
                        <p className="font-semibold text-xl">
                          {heloc.months} months (
                          {Math.round((heloc.months / 12) * 10) / 10} years)
                        </p>
                      </div>
                      <div>
                        <p className="text-sm">Total interest paid</p>
                        <p className="font-medium text-lg">
                          $
                          {(heloc.totalPaid - debt).toLocaleString(undefined, {
                            maximumFractionDigits: 0,
                          })}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm">Monthly payment (fixed)</p>
                        <p className="font-medium text-lg">
                          $
                          {Math.round(
                            heloc.totalPaid / heloc.months
                          ).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Detailed Comparison Table */}
                <div className="mb-8">
                  <h3 className="mb-4 font-medium text-lg">
                    Detailed Comparison
                  </h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Option</TableHead>
                        <TableHead>Total Paid</TableHead>
                        <TableHead>Interest Paid</TableHead>
                        <TableHead>Time to Pay Off</TableHead>
                        <TableHead>Monthly Payment</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">
                          Credit Card
                        </TableCell>
                        <TableCell className="font-semibold">
                          $
                          {cc.totalPaid.toLocaleString(undefined, {
                            maximumFractionDigits: 0,
                          })}
                        </TableCell>
                        <TableCell>
                          $
                          {(cc.totalPaid - debt).toLocaleString(undefined, {
                            maximumFractionDigits: 0,
                          })}
                        </TableCell>
                        <TableCell>{cc.months} months</TableCell>
                        <TableCell>
                          Starts at $
                          {Math.round(
                            (minPaymentPct / 100) * debt
                          ).toLocaleString()}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">HELOC</TableCell>
                        <TableCell className="font-semibold">
                          $
                          {heloc.totalPaid.toLocaleString(undefined, {
                            maximumFractionDigits: 0,
                          })}
                        </TableCell>
                        <TableCell>
                          $
                          {(heloc.totalPaid - debt).toLocaleString(undefined, {
                            maximumFractionDigits: 0,
                          })}
                        </TableCell>
                        <TableCell>{heloc.months} months</TableCell>
                        <TableCell>
                          $
                          {Math.round(
                            heloc.totalPaid / heloc.months
                          ).toLocaleString()}{" "}
                          (fixed)
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                {/* Recommendation Banner */}
                <div
                  className={`p-6 rounded-lg border ${
                    isHelocBetter ? " " : " "
                  }`}
                >
                  <div className="flex gap-2 items-center mb-3">
                    <div
                      className={`w-4 h-4 rounded-full ${
                        isHelocBetter ? "bg-green-600" : "bg-blue-600"
                      }`}
                    ></div>
                    <h3
                      className={`text-lg font-semibold ${
                        isHelocBetter ? "" : ""
                      }`}
                    >
                      🏆 Recommended: {isHelocBetter ? "HELOC" : "Credit Card"}
                    </h3>
                  </div>
                  <p className={`text-sm ${isHelocBetter ? "" : ""}`}>
                    {isHelocBetter
                      ? `Using a HELOC could save you $${Math.abs(
                          savings
                        ).toLocaleString()} compared to paying the credit card minimum.`
                      : `Continuing with credit card payments may be better in this scenario. You could save $${Math.abs(
                          savings
                        ).toLocaleString()} by avoiding the HELOC.`}
                  </p>

                  {isHelocBetter && (
                    <div className="bg-green-100 mt-3 p-3 border border-green-300 rounded">
                      <h4 className="mb-2 font-medium">
                        Key Benefits of HELOC:
                      </h4>
                      <ul className="space-y-1 text-sm">
                        <li>
                          Save ${Math.abs(savings).toLocaleString()} in total
                          costs
                        </li>
                        {timeDifference > 0 && (
                          <li>
                            Pay off debt {timeDifference} months (
                            {Math.round((timeDifference / 12) * 10) / 10} years)
                            faster
                          </li>
                        )}
                        <li>
                          Lower interest rate ({helocRate}% vs {ccRate}%)
                        </li>
                        <li>Fixed payment schedule provides predictability</li>
                      </ul>
                    </div>
                  )}
                </div>

                {/* Important Considerations */}
                <div className="mt-6 p-4 border rounded-lg">
                  <h4 className="mb-2 font-medium">Important Considerations</h4>
                  <ul className="space-y-1 text-sm">
                    <li>
                      <strong>HELOC risks:</strong> Your home serves as
                      collateral - failure to pay could result in foreclosure
                    </li>
                    <li>
                      <strong>Qualification:</strong> HELOCs require sufficient
                      home equity and good credit
                    </li>
                    <li>
                      <strong>Variable rates:</strong> HELOC rates may change
                      over time
                    </li>
                    <li>
                      <strong>Closing costs:</strong> HELOCs may have setup
                      fees, appraisal costs, or annual fees
                    </li>
                    <li>
                      <strong>Discipline required:</strong> Don't accumulate new
                      credit card debt after using HELOC
                    </li>
                    <li>
                      This calculator assumes no new charges on credit card and
                      fixed HELOC payments
                    </li>
                  </ul>
                </div>
              </>
            );
          })()}
        </div>
      </div>
    </div>
  );
};

export default CreditCardVsHELOC;
