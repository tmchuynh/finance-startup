"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
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
    <div className="mx-auto pt-6 sm:pt-12 lg:pt-16 pb-24 lg:pb-32 w-10/12 md:w-11/12">
      <h1 className="max-w-4xl">
        Credit Card Balance Transfer vs Paying Down Existing Card
      </h1>
      <h5>Compare Your Options for Paying Off Credit Card Debt</h5>
      <p>
        Use this tool to estimate whether transferring your credit card balance
        to a new card with a promotional rate could save you money compared to
        paying down your current card. This tool provides estimates for
        informational purposes only. Actual rates, fees, and savings may vary.
        Consult a financial advisor before making decisions.
      </p>
      <p>
        Enter your current card balance, interest rate, and monthly payment
        amount. Then enter the promotional interest rate, duration of the promo
        period, transfer fee, and post-promo interest rate for the new card.
        Results update automatically as you adjust the sliders.
      </p>

      <div className="my-8">
        <h2 className="mb-2 font-semibold text-lg">
          Typical Credit Card Terms
        </h2>
        <div className="overflow-x-auto">
          <table className="border border-gray-300 min-w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-3 py-2 border text-left">Parameter</th>
                <th className="px-3 py-2 border text-left">Typical Range</th>
                <th className="px-3 py-2 border text-left">Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-3 py-2 border">Interest Rate (APR)</td>
                <td className="px-3 py-2 border">16% - 29%</td>
                <td className="px-3 py-2 border">
                  Varies by credit score and card type
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Minimum Payment</td>
                <td className="px-3 py-2 border">1% - 3% of balance</td>
                <td className="px-3 py-2 border">
                  Paying only minimum extends payoff time
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Balance Transfer Fee</td>
                <td className="px-3 py-2 border">3% - 5%</td>
                <td className="px-3 py-2 border">
                  Charged on amount transferred
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Promo Rate</td>
                <td className="px-3 py-2 border">0% - 5%</td>
                <td className="px-3 py-2 border">
                  Introductory, usually for 6-21 months
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Post-Promo Rate</td>
                <td className="px-3 py-2 border">16% - 29%</td>
                <td className="px-3 py-2 border">
                  Reverts to standard APR after promo
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="my-8">
        <h2 className="mb-2 font-semibold text-lg">Pros and Cons</h2>
        <div className="overflow-x-auto">
          <table className="border border-gray-300 min-w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-3 py-2 border text-left">Option</th>
                <th className="px-3 py-2 border text-left">Pros</th>
                <th className="px-3 py-2 border text-left">Cons</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-3 py-2 border">Pay Down Existing Card</td>
                <td className="px-3 py-2 border">
                  No new account needed
                  <br />
                  No transfer fee
                  <br />
                  Simple process
                </td>
                <td className="px-3 py-2 border">
                  High interest costs
                  <br />
                  Slow payoff if only minimum paid
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Balance Transfer</td>
                <td className="px-3 py-2 border">
                  Lower (or 0%) promo interest
                  <br />
                  Faster payoff with same payment
                  <br />
                  Can save on interest
                </td>
                <td className="px-3 py-2 border">
                  Transfer fee
                  <br />
                  New account required
                  <br />
                  High rate after promo ends
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="my-8">
        <h2 className="mb-2 font-semibold text-lg">
          Typical Balance Transfer Offers (2024)
        </h2>
        <div className="overflow-x-auto">
          <table className="border border-gray-300 min-w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-3 py-2 border text-left">Feature</th>
                <th className="px-3 py-2 border text-left">Range</th>
                <th className="px-3 py-2 border text-left">Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-3 py-2 border">Promo APR</td>
                <td className="px-3 py-2 border">0% - 5%</td>
                <td className="px-3 py-2 border">
                  Most common is 0% for 12-21 months
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Promo Period</td>
                <td className="px-3 py-2 border">6 - 21 months</td>
                <td className="px-3 py-2 border">
                  Longer periods are better for payoff
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Transfer Fee</td>
                <td className="px-3 py-2 border">3% - 5%</td>
                <td className="px-3 py-2 border">
                  Added to balance at transfer
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Post-Promo APR</td>
                <td className="px-3 py-2 border">16% - 29%</td>
                <td className="px-3 py-2 border">
                  Applies to remaining balance after promo
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <form
        className="space-y-5 mt-5"
        aria-label="Balance transfer comparison form"
      >
        <div className="gap-4 grid lg:grid-cols-3">
          <div>
            <Label htmlFor="balance" className="block mb-1 font-semibold">
              Current Card Balance ($)
            </Label>
            <div className="flex items-center gap-4">
              <Slider
                min={100}
                max={50000}
                step={100}
                value={[balance]}
                onValueChange={([v]) => setBalance(v)}
                className="w-2/3"
              />
              <Input
                id="balance"
                type="number"
                min={0}
                value={balance}
                onChange={(e) => setBalance(Number(e.target.value))}
                className="w-1/3"
                required
              />
            </div>
          </div>
          <div>
            <Label htmlFor="currentRate" className="block mb-1 font-semibold">
              Current Card Interest Rate (%)
            </Label>
            <div className="flex items-center gap-4">
              <Slider
                min={0}
                max={40}
                step={0.1}
                value={[currentRate]}
                onValueChange={([v]) => setCurrentRate(Number(v.toFixed(1)))}
                className="w-2/3"
              />
              <Input
                id="currentRate"
                type="number"
                min={0}
                max={100}
                value={currentRate}
                onChange={(e) => setCurrentRate(Number(e.target.value))}
                className="w-1/3"
                required
              />
            </div>
          </div>
          <div>
            <Label
              htmlFor="monthlyPayment"
              className="block mb-1 font-semibold"
            >
              Planned Monthly Payment ($)
            </Label>
            <div className="flex items-center gap-4">
              <Slider
                min={10}
                max={5000}
                step={10}
                value={[monthlyPayment]}
                onValueChange={([v]) => setMonthlyPayment(v)}
                className="w-2/3"
              />
              <Input
                id="monthlyPayment"
                type="number"
                min={0}
                value={monthlyPayment}
                onChange={(e) => setMonthlyPayment(Number(e.target.value))}
                className="w-1/3"
                required
              />
            </div>
          </div>
        </div>
        <div className="mt-6">
          <h4>Balance Transfer Offer</h4>
          <div className="flex flex-wrap gap-4 mt-3">
            <div className="flex-1 min-w-[220px]">
              <Label htmlFor="promoRate" className="block mb-1 font-semibold">
                Promo Interest Rate (%)
              </Label>
              <div className="flex items-center gap-4">
                <Slider
                  min={0}
                  max={10}
                  step={0.1}
                  value={[promoRate]}
                  onValueChange={([v]) => setPromoRate(Number(v.toFixed(1)))}
                  className="w-2/3"
                />
                <Input
                  id="promoRate"
                  type="number"
                  min={0}
                  max={100}
                  value={promoRate}
                  onChange={(e) => setPromoRate(Number(e.target.value))}
                  className="w-1/3"
                  required
                />
              </div>
            </div>
            <div className="flex-1 min-w-[220px]">
              <Label htmlFor="promoMonths" className="block mb-1 font-semibold">
                Promo Period (months)
              </Label>
              <div className="flex items-center gap-4">
                <Slider
                  min={0}
                  max={24}
                  step={1}
                  value={[promoMonths]}
                  onValueChange={([v]) => setPromoMonths(v)}
                  className="w-2/3"
                />
                <Input
                  id="promoMonths"
                  type="number"
                  min={0}
                  value={promoMonths}
                  onChange={(e) => setPromoMonths(Number(e.target.value))}
                  className="w-1/3"
                  required
                />
              </div>
            </div>
            <div className="flex-1 min-w-[220px]">
              <Label htmlFor="transferFee" className="block mb-1 font-semibold">
                Transfer Fee (%)
              </Label>
              <div className="flex items-center gap-4">
                <Slider
                  min={0}
                  max={10}
                  step={0.1}
                  value={[transferFee]}
                  onValueChange={([v]) => setTransferFee(Number(v.toFixed(1)))}
                  className="w-2/3"
                />
                <Input
                  id="transferFee"
                  type="number"
                  min={0}
                  max={100}
                  value={transferFee}
                  onChange={(e) => setTransferFee(Number(e.target.value))}
                  className="w-1/3"
                  required
                />
              </div>
            </div>
            <div className="flex-1 min-w-[220px]">
              <Label
                htmlFor="postPromoRate"
                className="block mb-1 font-semibold"
              >
                Post-Promo Interest Rate (%)
              </Label>
              <div className="flex items-center gap-4">
                <Slider
                  min={0}
                  max={40}
                  step={0.1}
                  value={[postPromoRate]}
                  onValueChange={([v]) =>
                    setPostPromoRate(Number(v.toFixed(1)))
                  }
                  className="w-2/3"
                />
                <Input
                  id="postPromoRate"
                  type="number"
                  min={0}
                  max={100}
                  value={postPromoRate}
                  onChange={(e) => setPostPromoRate(Number(e.target.value))}
                  className="w-1/3"
                  required
                />
              </div>
            </div>
          </div>
        </div>
      </form>

      {/* Updated results display */}
      <div className="gap-6 grid grid-cols-1 md:grid-cols-2 mt-8">
        <div className="bg-white shadow p-5 border border-gray-300 rounded-lg">
          <h3 className="flex items-center gap-2 mb-2 font-semibold text-blue-700 text-lg">
            Paying Down Current Card
          </h3>
          <ul className="mb-2">
            <li>
              <span className="text-gray-700">Months to pay off:</span>{" "}
              <strong className="text-blue-900">
                {calculatePayoff(balance, currentRate, monthlyPayment).months}
              </strong>
            </li>
            <li>
              <span className="text-gray-700">Total interest:</span>{" "}
              <strong className="text-blue-900">
                $
                {calculatePayoff(
                  balance,
                  currentRate,
                  monthlyPayment
                ).totalInterest.toLocaleString()}
              </strong>
            </li>
          </ul>
        </div>
        <div className="bg-white shadow p-5 border border-gray-300 rounded-lg">
          <h3 className="flex items-center gap-2 mb-2 font-semibold text-green-700 text-lg">
            Balance Transfer
          </h3>
          <ul className="mb-2">
            <li>
              <span className="text-gray-700">Months to pay off:</span>{" "}
              <strong className="text-green-900">
                {
                  calculateBalanceTransfer(
                    balance,
                    promoRate,
                    promoMonths,
                    postPromoRate,
                    monthlyPayment,
                    transferFee
                  ).months
                }
              </strong>
            </li>
            <li>
              <span className="text-gray-700">Total interest:</span>{" "}
              <strong className="text-green-900">
                $
                {calculateBalanceTransfer(
                  balance,
                  promoRate,
                  promoMonths,
                  postPromoRate,
                  monthlyPayment,
                  transferFee
                ).totalInterest.toLocaleString()}
              </strong>
            </li>
            <li>
              <span className="text-gray-700">Transfer fee:</span>{" "}
              <strong className="text-green-900">
                $
                {calculateBalanceTransfer(
                  balance,
                  promoRate,
                  promoMonths,
                  postPromoRate,
                  monthlyPayment,
                  transferFee
                ).totalFees.toLocaleString()}
              </strong>
            </li>
            <li>
              <span className="text-gray-700">Total cost:</span>{" "}
              <strong className="text-green-900">
                $
                {(
                  calculateBalanceTransfer(
                    balance,
                    promoRate,
                    promoMonths,
                    postPromoRate,
                    monthlyPayment,
                    transferFee
                  ).totalInterest +
                  calculateBalanceTransfer(
                    balance,
                    promoRate,
                    promoMonths,
                    postPromoRate,
                    monthlyPayment,
                    transferFee
                  ).totalFees
                ).toLocaleString()}
              </strong>
            </li>
          </ul>
        </div>
      </div>
      {/* Recommendation */}
      <div className="mt-6">
        <div className="bg-blue-50 p-4 border border-blue-200 rounded text-blue-900">
          <strong>Recommendation:</strong>
          <div className="mt-1">
            {(() => {
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
              if (
                transfer.totalInterest + transfer.totalFees <
                paydown.totalInterest
              ) {
                return "A balance transfer could save you money compared to paying down your current card.";
              } else {
                return "Paying down your current card may be as good or better than a balance transfer.";
              }
            })()}
          </div>
        </div>
      </div>

      <section className="mt-8">
        <h2 className="mt-8 mb-2 font-semibold text-lg">Disclaimer</h2>
        <p>
          This tool provides estimates for informational purposes only. Actual
          rates, fees, and savings may vary. Consult a financial advisor before
          making decisions. The results are based on the inputs you provided and
          do not take into account other factors that may affect your options,
          such as credit score, card issuer policies, or changes in rates.
          Please use this tool as a starting point for your research and consult
          a financial advisor for personalized advice.
        </p>
      </section>
    </div>
  );
}
