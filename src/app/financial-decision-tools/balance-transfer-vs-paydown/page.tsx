"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
  };

  return (
    <div className="mx-auto pt-6 sm:pt-12 lg:pt-16 pb-24 lg:pb-32 w-10/12 md:w-11/12">
      <h1>Credit Card Balance Transfer vs Paying Down Existing Card</h1>
      <h5>Compare Your Options for Paying Off Credit Card Debt</h5>
      <p>
        Use this tool to estimate whether transferring your credit card balance
        to a new card with a promotional rate could save you money compared to
        paying down your current card.
      </p>
      <p className="mt-4">
        This tool provides estimates for informational purposes only. Actual
        rates, fees, and savings may vary. Consult a financial advisor before
        making decisions.
      </p>
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
        aria-label="Balance transfer comparison form"
      >
        <div>
          <Label htmlFor="balance" className="block mb-1 font-semibold">
            Current Card Balance ($)
          </Label>
          <Input
            id="balance"
            type="number"
            min={0}
            value={balance === 0 ? "" : balance}
            onChange={(e) => setBalance(Number(e.target.value))}
            className="p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div>
          <Label htmlFor="currentRate" className="block mb-1 font-semibold">
            Current Card Interest Rate (%)
          </Label>
          <Input
            id="currentRate"
            type="number"
            min={0}
            max={100}
            value={currentRate}
            onChange={(e) => setCurrentRate(Number(e.target.value))}
            className="p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div>
          <Label htmlFor="monthlyPayment" className="block mb-1 font-semibold">
            Planned Monthly Payment ($)
          </Label>
          <Input
            id="monthlyPayment"
            type="number"
            min={0}
            value={monthlyPayment === 0 ? "" : monthlyPayment}
            onChange={(e) => setMonthlyPayment(Number(e.target.value))}
            className="p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div className="mt-6">
          <Label className="block mb-1 font-semibold">
            Balance Transfer Offer
          </Label>
          <div className="flex gap-2">
            <div className="flex-1">
              <Input
                type="number"
                min={0}
                max={100}
                placeholder="Promo Interest Rate (%)"
                value={promoRate}
                onChange={(e) => setPromoRate(Number(e.target.value))}
                className="p-2 border border-gray-300 rounded w-full"
                required
              />
            </div>
            <div className="flex-1">
              <Input
                type="number"
                min={0}
                placeholder="Promo Period (months)"
                value={promoMonths}
                onChange={(e) => setPromoMonths(Number(e.target.value))}
                className="p-2 border border-gray-300 rounded w-full"
                required
              />
            </div>
            <div className="flex-1">
              <Input
                type="number"
                min={0}
                max={100}
                placeholder="Transfer Fee (%)"
                value={transferFee}
                onChange={(e) => setTransferFee(Number(e.target.value))}
                className="p-2 border border-gray-300 rounded w-full"
                required
              />
            </div>
            <div className="flex-1">
              <Input
                type="number"
                min={0}
                max={100}
                placeholder="Post-Promo Rate (%)"
                value={postPromoRate}
                onChange={(e) => setPostPromoRate(Number(e.target.value))}
                className="p-2 border border-gray-300 rounded w-full"
                required
              />
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 py-2 rounded focus:ring-2 focus:ring-blue-500 w-full font-semibold text-white focus:outline-none"
        >
          Compare
        </button>
      </form>
      {result && (
        <div
          className="bg-gray-100 mt-6 p-4 border border-gray-300 rounded whitespace-pre-line"
          role="alert"
          aria-live="polite"
        >
          {result}
        </div>
      )}
    </div>
  );
}
