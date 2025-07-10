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

function calculatePayoff(
  balance: number,
  rate: number,
  monthly: number
): { months: number; totalInterest: number } {
  let months = 0;
  let totalInterest = 0;
  let current = balance;
  const monthlyRate = rate / 100 / 12;
  while (current > 0 && months < 600) {
    const interest = current * monthlyRate;
    const principal = Math.max(monthly - interest, 0);
    if (principal <= 0) break;
    current -= principal;
    totalInterest += interest;
    months++;
  }
  return {
    months,
    totalInterest: Math.round(totalInterest),
  };
}

function calculateBalanceTransfer(
  balance: number,
  promoRate: number,
  promoMonths: number,
  regularRate: number,
  monthly: number,
  transferFee: number
): { months: number; totalInterest: number; totalFees: number } {
  let months = 0;
  let totalInterest = 0;
  let current = balance;
  const promoMonthlyRate = promoRate / 100 / 12;
  const regularMonthlyRate = regularRate / 100 / 12;
  let inPromo = true;
  let promoLeft = promoMonths;
  while (current > 0 && months < 600) {
    const rate =
      inPromo && promoLeft > 0 ? promoMonthlyRate : regularMonthlyRate;
    const interest = current * rate;
    const principal = Math.max(monthly - interest, 0);
    if (principal <= 0) break;
    current -= principal;
    totalInterest += interest;
    months++;
    if (inPromo) promoLeft--;
    if (promoLeft === 0) inPromo = false;
  }
  const fee = balance * (transferFee / 100);
  return {
    months,
    totalInterest: Math.round(totalInterest),
    totalFees: Math.round(fee),
  };
}

export default function BalanceTransferVsPaydown() {
  const [balance, setBalance] = useState<number>(5000);
  const [currentRate, setCurrentRate] = useState<number>(20);
  const [monthlyPayment, setMonthlyPayment] = useState<number>(200);

  const [promoRate, setPromoRate] = useState<number>(0);
  const [promoMonths, setPromoMonths] = useState<number>(12);
  const [transferFee, setTransferFee] = useState<number>(3);
  const [postPromoRate, setPostPromoRate] = useState<number>(20);

  const [result, setResult] = useState<string>("");

  useEffect(() => {
    if (
      balance <= 0 ||
      currentRate < 0 ||
      monthlyPayment <= 0 ||
      promoRate < 0 ||
      promoMonths < 0 ||
      transferFee < 0 ||
      postPromoRate < 0
    ) {
      setResult("Please enter valid, non-negative values for all fields.");
      return;
    }
    const paydown = calculatePayoff(balance, currentRate, monthlyPayment);
    const transfer = calculateBalanceTransfer(
      balance,
      promoRate,
      promoMonths,
      postPromoRate,
      monthlyPayment,
      transferFee
    );
    let recommendation = "";
    if (transfer.totalInterest + transfer.totalFees < paydown.totalInterest) {
      recommendation =
        "A balance transfer could save you money compared to paying down your current card.";
    } else {
      recommendation =
        "Paying down your current card may be as good or better than a balance transfer.";
    }
    setResult(
      `Paying Down Current Card:
  - Months to pay off: ${paydown.months}
  - Total interest: $${paydown.totalInterest.toLocaleString()}

Balance Transfer:
  - Months to pay off: ${transfer.months}
  - Total interest: $${transfer.totalInterest.toLocaleString()}
  - Transfer fee: $${transfer.totalFees.toLocaleString()}
  - Total cost: $${(
    transfer.totalInterest + transfer.totalFees
  ).toLocaleString()}

${recommendation}`
    );
  }, [
    balance,
    currentRate,
    monthlyPayment,
    promoRate,
    promoMonths,
    transferFee,
    postPromoRate,
  ]);

  return (
    <div className="mx-auto pb-24 lg:pb-32 pt-6 sm:pt-12 lg:pt-16 w-10/12 md:w-11/12">
      <div className="mb-12 text-center">
        <h1 className="mb-4 font-bold text-4xl sm:text-5xl tracking-tight">
          Credit Card Balance Transfer vs Paying Down Existing Card
        </h1>
        <h5 className="mb-6 text-xl">
          Compare your options for paying off credit card debt
        </h5>
        <p className="mx-auto max-w-3xl text-lg">
          Use this tool to estimate whether transferring your credit card
          balance to a new card with a promotional rate could save you money
          compared to paying down your current card. This tool provides
          estimates for informational purposes only.
        </p>
      </div>

      {/* Typical Credit Card Terms */}
      <div className="shadow-sm mb-8 border rounded-lg">
        <div className="p-6">
          <h2 className="mb-4 font-semibold text-xl">
            Typical Credit Card Terms
          </h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Parameter</TableHead>
                <TableHead>Typical Range</TableHead>
                <TableHead>Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">
                  Interest Rate (APR)
                </TableCell>
                <TableCell>16% - 29%</TableCell>
                <TableCell>Varies by credit score and card type</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Minimum Payment</TableCell>
                <TableCell>1% - 3% of balance</TableCell>
                <TableCell>Paying only minimum extends payoff time</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  Balance Transfer Fee
                </TableCell>
                <TableCell>3% - 5%</TableCell>
                <TableCell>Charged on amount transferred</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Promo Rate</TableCell>
                <TableCell>0% - 5%</TableCell>
                <TableCell>Introductory, usually for 6-21 months</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Post-Promo Rate</TableCell>
                <TableCell>16% - 29%</TableCell>
                <TableCell>Reverts to standard APR after promo</TableCell>
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
                <TableCell className="font-medium">
                  Pay Down Existing Card
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div>No new account needed</div>
                    <div>No transfer fee</div>
                    <div>Simple process</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div>High interest costs</div>
                    <div>Slow payoff if only minimum paid</div>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Balance Transfer</TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div>Lower (or 0%) promo interest</div>
                    <div>Faster payoff with same payment</div>
                    <div>Can save on interest</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div>Transfer fee</div>
                    <div>New account required</div>
                    <div>High rate after promo ends</div>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Typical Balance Transfer Offers */}
      <div className="shadow-sm mb-8 border rounded-lg">
        <div className="p-6">
          <h2 className="mb-4 font-semibold text-xl">
            Typical Balance Transfer Offers (2024)
          </h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Feature</TableHead>
                <TableHead>Range</TableHead>
                <TableHead>Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Promo APR</TableCell>
                <TableCell>0% - 5%</TableCell>
                <TableCell>Most common is 0% for 12-21 months</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Promo Period</TableCell>
                <TableCell>6 - 21 months</TableCell>
                <TableCell>Longer periods are better for payoff</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Transfer Fee</TableCell>
                <TableCell>3% - 5%</TableCell>
                <TableCell>Added to balance at transfer</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Post-Promo APR</TableCell>
                <TableCell>16% - 29%</TableCell>
                <TableCell>Applies to remaining balance after promo</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Calculator Form */}
      <div className="shadow-sm border rounded-lg">
        <div className="p-6">
          <h2 className="mb-6 font-semibold text-xl">Debt Payoff Calculator</h2>

          {/* Current Card Information */}
          <div className="mb-8">
            <h3 className="mb-4 font-medium text-lg">
              Current Card Information
            </h3>
            <div className="gap-6 grid md:grid-cols-3">
              <div>
                <Label htmlFor="balance" className="font-medium">
                  Current Card Balance ($)
                </Label>
                <div className="flex gap-4 items-center mt-2">
                  <Slider
                    min={100}
                    max={50000}
                    step={100}
                    value={[balance]}
                    onValueChange={([v]) => setBalance(v)}
                    className="flex-1"
                  />
                  <Input
                    id="balance"
                    type="number"
                    min={0}
                    value={balance}
                    onChange={(e) => setBalance(Number(e.target.value))}
                    className="w-28"
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="currentRate" className="font-medium">
                  Current Card Interest Rate (%)
                </Label>
                <div className="flex gap-4 items-center mt-2">
                  <Slider
                    min={0}
                    max={40}
                    step={0.1}
                    value={[currentRate]}
                    onValueChange={([v]) =>
                      setCurrentRate(Number(v.toFixed(1)))
                    }
                    className="flex-1"
                  />
                  <Input
                    id="currentRate"
                    type="number"
                    min={0}
                    max={100}
                    step={0.1}
                    value={currentRate}
                    onChange={(e) => setCurrentRate(Number(e.target.value))}
                    className="w-20"
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="monthlyPayment" className="font-medium">
                  Planned Monthly Payment ($)
                </Label>
                <div className="flex gap-4 items-center mt-2">
                  <Slider
                    min={10}
                    max={5000}
                    step={10}
                    value={[monthlyPayment]}
                    onValueChange={([v]) => setMonthlyPayment(v)}
                    className="flex-1"
                  />
                  <Input
                    id="monthlyPayment"
                    type="number"
                    min={0}
                    value={monthlyPayment}
                    onChange={(e) => setMonthlyPayment(Number(e.target.value))}
                    className="w-28"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Balance Transfer Offer */}
          <div>
            <h3 className="mb-4 font-medium text-lg">Balance Transfer Offer</h3>
            <div className="gap-6 grid md:grid-cols-2 lg:grid-cols-4">
              <div>
                <Label htmlFor="promoRate" className="font-medium">
                  Promo Interest Rate (%)
                </Label>
                <div className="flex gap-4 items-center mt-2">
                  <Slider
                    min={0}
                    max={10}
                    step={0.1}
                    value={[promoRate]}
                    onValueChange={([v]) => setPromoRate(Number(v.toFixed(1)))}
                    className="flex-1"
                  />
                  <Input
                    id="promoRate"
                    type="number"
                    min={0}
                    max={100}
                    step={0.1}
                    value={promoRate}
                    onChange={(e) => setPromoRate(Number(e.target.value))}
                    className="w-20"
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="promoMonths" className="font-medium">
                  Promo Period (months)
                </Label>
                <div className="flex gap-4 items-center mt-2">
                  <Slider
                    min={0}
                    max={24}
                    step={1}
                    value={[promoMonths]}
                    onValueChange={([v]) => setPromoMonths(v)}
                    className="flex-1"
                  />
                  <Input
                    id="promoMonths"
                    type="number"
                    min={0}
                    value={promoMonths}
                    onChange={(e) => setPromoMonths(Number(e.target.value))}
                    className="w-20"
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="transferFee" className="font-medium">
                  Transfer Fee (%)
                </Label>
                <div className="flex gap-4 items-center mt-2">
                  <Slider
                    min={0}
                    max={10}
                    step={0.1}
                    value={[transferFee]}
                    onValueChange={([v]) =>
                      setTransferFee(Number(v.toFixed(1)))
                    }
                    className="flex-1"
                  />
                  <Input
                    id="transferFee"
                    type="number"
                    min={0}
                    max={100}
                    step={0.1}
                    value={transferFee}
                    onChange={(e) => setTransferFee(Number(e.target.value))}
                    className="w-20"
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="postPromoRate" className="font-medium">
                  Post-Promo Interest Rate (%)
                </Label>
                <div className="flex gap-4 items-center mt-2">
                  <Slider
                    min={0}
                    max={40}
                    step={0.1}
                    value={[postPromoRate]}
                    onValueChange={([v]) =>
                      setPostPromoRate(Number(v.toFixed(1)))
                    }
                    className="flex-1"
                  />
                  <Input
                    id="postPromoRate"
                    type="number"
                    min={0}
                    max={100}
                    step={0.1}
                    value={postPromoRate}
                    onChange={(e) => setPostPromoRate(Number(e.target.value))}
                    className="w-20"
                    required
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
            if (
              balance <= 0 ||
              currentRate < 0 ||
              monthlyPayment <= 0 ||
              promoRate < 0 ||
              promoMonths < 0 ||
              transferFee < 0 ||
              postPromoRate < 0
            ) {
              return (
                <div className="bg-red-50 p-4 border border-red-200 rounded-lg">
                  <p className="text-red-800">
                    Please enter valid, non-negative values for all fields.
                  </p>
                </div>
              );
            }

            const paydown = calculatePayoff(
              balance,
              currentRate,
              monthlyPayment
            );
            const transfer = calculateBalanceTransfer(
              balance,
              promoRate,
              promoMonths,
              postPromoRate,
              monthlyPayment,
              transferFee
            );

            const transferTotalCost =
              transfer.totalInterest + transfer.totalFees;
            const savings = paydown.totalInterest - transferTotalCost;
            const isTransferBetter = savings > 0;

            return (
              <>
                {/* Comparison Cards */}
                <div className="gap-6 grid md:grid-cols-2 mb-8">
                  <div className="p-6 border rounded-lg">
                    <div className="flex gap-2 items-center mb-4">
                      <div className="rounded-full h-3 w-3"></div>
                      <h3 className="font-semibold text-lg">
                        Paying Down Current Card
                      </h3>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm">Months to pay off</p>
                        <p className="font-bold text-2xl">
                          {paydown.months} months
                        </p>
                      </div>
                      <div>
                        <p className="text-sm">Total interest paid</p>
                        <p className="font-semibold text-xl">
                          ${paydown.totalInterest.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm">Total amount paid</p>
                        <p className="font-medium text-lg">
                          ${(balance + paydown.totalInterest).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 border rounded-lg">
                    <div className="flex gap-2 items-center mb-4">
                      <div className="bg-green-600 rounded-full h-3 w-3"></div>
                      <h3 className="font-semibold text-lg">
                        Balance Transfer
                      </h3>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm">Months to pay off</p>
                        <p className="font-bold text-2xl">
                          {transfer.months} months
                        </p>
                      </div>
                      <div>
                        <p className="text-sm">Total interest paid</p>
                        <p className="font-semibold text-xl">
                          ${transfer.totalInterest.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm">Transfer fee</p>
                        <p className="font-medium text-lg">
                          ${transfer.totalFees.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm">Total cost (interest + fees)</p>
                        <p className="font-medium text-lg">
                          ${transferTotalCost.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm">Total amount paid</p>
                        <p className="font-medium text-lg">
                          ${(balance + transferTotalCost).toLocaleString()}
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
                        <TableHead>Payoff Time</TableHead>
                        <TableHead>Interest Paid</TableHead>
                        <TableHead>Fees</TableHead>
                        <TableHead>Total Cost</TableHead>
                        <TableHead>Total Paid</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">
                          Current Card
                        </TableCell>
                        <TableCell>{paydown.months} months</TableCell>
                        <TableCell>
                          ${paydown.totalInterest.toLocaleString()}
                        </TableCell>
                        <TableCell>$0</TableCell>
                        <TableCell className="font-semibold">
                          ${paydown.totalInterest.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          ${(balance + paydown.totalInterest).toLocaleString()}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">
                          Balance Transfer
                        </TableCell>
                        <TableCell>{transfer.months} months</TableCell>
                        <TableCell>
                          ${transfer.totalInterest.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          ${transfer.totalFees.toLocaleString()}
                        </TableCell>
                        <TableCell className="font-semibold">
                          ${transferTotalCost.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          ${(balance + transferTotalCost).toLocaleString()}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                {/* Recommendation Banner */}
                <div
                  className={`p-6 rounded-lg border ${
                    isTransferBetter ? " " : " "
                  }`}
                >
                  <div className="flex gap-2 items-center mb-3">
                    <div
                      className={`w-4 h-4 rounded-full ${
                        isTransferBetter ? "bg-green-600" : ""
                      }`}
                    ></div>
                    <h3
                      className={`text-lg font-semibold ${
                        isTransferBetter ? "" : ""
                      }`}
                    >
                      🏆 Recommended:{" "}
                      {isTransferBetter
                        ? "Balance Transfer"
                        : "Pay Down Current Card"}
                    </h3>
                  </div>
                  <p className={`text-sm ${isTransferBetter ? "" : ""}`}>
                    {isTransferBetter
                      ? `A balance transfer could save you $${Math.abs(
                          savings
                        ).toLocaleString()} compared to paying down your current card.`
                      : `Paying down your current card may be as good or better than a balance transfer. You could save $${Math.abs(
                          savings
                        ).toLocaleString()} by avoiding the balance transfer.`}
                  </p>
                  {isTransferBetter && (
                    <div className="bg-green-100 mt-3 p-3 border border-green-300 rounded">
                      <h4 className="mb-2 font-medium">Key Benefits:</h4>
                      <ul className="space-y-1 text-sm">
                        <li>
                          Save ${Math.abs(savings).toLocaleString()} in total
                          costs
                        </li>
                        <li>
                          •{" "}
                          {paydown.months - transfer.months > 0
                            ? `Pay off debt ${
                                paydown.months - transfer.months
                              } months faster`
                            : "Similar payoff timeline"}
                        </li>
                        <li>
                          Lower promotional interest rate for {promoMonths}{" "}
                          months
                        </li>
                      </ul>
                    </div>
                  )}
                </div>

                {/* Important Considerations */}
                <div className="mt-6 p-4 border rounded-lg">
                  <h4 className="mb-2 font-medium">Important Considerations</h4>
                  <ul className="space-y-1 text-sm">
                    <li>
                      Balance transfer approval depends on your credit score and
                      income
                    </li>
                    <li>
                      Transfer fees are typically added to your new balance
                    </li>
                    <li>
                      Promotional rates are temporary - plan to pay off before
                      they expire
                    </li>
                    <li>
                      Consider the discipline needed to avoid accumulating new
                      debt
                    </li>
                    <li>
                      This calculator provides estimates - actual results may
                      vary
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
}
