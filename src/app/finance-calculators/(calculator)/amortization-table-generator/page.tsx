import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface AmortizationPayment {
  paymentNumber: number;
  paymentAmount: number;
  principalPaid: number;
  interestPaid: number;
  remainingBalance: number;
}

export default function AmortizationTableGenerator() {
  const [loanAmount, setLoanAmount] = useState<number>(250000);
  const [annualInterestRate, setAnnualInterestRate] = useState<number>(4.5);
  const [loanTermYears, setLoanTermYears] = useState<number>(30);
  const [paymentsPerYear, setPaymentsPerYear] = useState<number>(12);

  // Calculate payment amount using amortization formula
  const r = annualInterestRate / 100 / paymentsPerYear; // periodic interest rate
  const n = loanTermYears * paymentsPerYear; // total number of payments

  let payment = 0;
  if (r > 0) {
    payment = (loanAmount * r) / (1 - Math.pow(1 + r, -n));
  } else {
    payment = loanAmount / n;
  }

  // Generate amortization schedule
  const schedule: AmortizationPayment[] = [];
  let balance = loanAmount;

  for (let i = 1; i <= n; i++) {
    const interestPaid = balance * r;
    const principalPaid = payment - interestPaid;
    balance -= principalPaid;

    // Protect against floating point rounding causing negative balance
    if (balance < 0) balance = 0;

    schedule.push({
      paymentNumber: i,
      paymentAmount: payment,
      principalPaid,
      interestPaid,
      remainingBalance: balance,
    });
  }

  const totalInterestPaid = schedule.reduce(
    (sum, p) => sum + p.interestPaid,
    0
  );

  return (
    <div className="bg-white shadow mx-auto p-6 rounded max-w-5xl overflow-x-auto">
      <h1 className="mb-6 font-bold text-2xl">Amortization Table Generator</h1>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="gap-4 grid grid-cols-1 sm:grid-cols-4 mb-6"
        aria-label="Loan input form"
      >
        <div>
          <Label htmlFor="loanAmount" className="block mb-1 font-semibold">
            Loan Amount ($)
          </Label>
          <Input
            type="number"
            id="loanAmount"
            min={0}
            value={loanAmount}
            onChange={(e) => setLoanAmount(Number(e.target.value))}
            className="p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>

        <div>
          <Label
            htmlFor="annualInterestRate"
            className="block mb-1 font-semibold"
          >
            Annual Interest Rate (%)
          </Label>
          <Input
            type="number"
            id="annualInterestRate"
            min={0}
            step={0.01}
            value={annualInterestRate}
            onChange={(e) => setAnnualInterestRate(Number(e.target.value))}
            className="p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>

        <div>
          <Label htmlFor="loanTermYears" className="block mb-1 font-semibold">
            Loan Term (Years)
          </Label>
          <Input
            type="number"
            id="loanTermYears"
            min={1}
            value={loanTermYears}
            onChange={(e) => setLoanTermYears(Number(e.target.value))}
            className="p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>

        <div>
          <Label htmlFor="paymentsPerYear" className="block mb-1 font-semibold">
            Payments Per Year
          </Label>
          <select
            id="paymentsPerYear"
            value={paymentsPerYear}
            onChange={(e) => setPaymentsPerYear(Number(e.target.value))}
            className="p-2 border border-gray-300 rounded w-full"
          >
            <option value={12}>12 (Monthly)</option>
            <option value={26}>26 (Bi-Weekly)</option>
            <option value={52}>52 (Weekly)</option>
            <option value={1}>1 (Yearly)</option>
          </select>
        </div>
      </form>

      <p className="mb-4 font-semibold">
        Your fixed payment per period is:{" "}
        <span className="text-blue-700">${payment.toFixed(2)}</span>
      </p>

      <div className="max-h-[400px] overflow-x-auto">
        <table className="border border-gray-300 rounded w-full text-left table-auto">
          <thead className="top-0 sticky bg-gray-100">
            <tr>
              <th className="px-3 py-1 border border-gray-300">#</th>
              <th className="px-3 py-1 border border-gray-300">Payment</th>
              <th className="px-3 py-1 border border-gray-300">Principal</th>
              <th className="px-3 py-1 border border-gray-300">Interest</th>
              <th className="px-3 py-1 border border-gray-300">Balance</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map(
              ({
                paymentNumber,
                paymentAmount,
                principalPaid,
                interestPaid,
                remainingBalance,
              }) => (
                <tr key={paymentNumber} className="even:bg-gray-50">
                  <td className="px-3 py-1 border border-gray-300">
                    {paymentNumber}
                  </td>
                  <td className="px-3 py-1 border border-gray-300">
                    ${paymentAmount.toFixed(2)}
                  </td>
                  <td className="px-3 py-1 border border-gray-300">
                    ${principalPaid.toFixed(2)}
                  </td>
                  <td className="px-3 py-1 border border-gray-300">
                    ${interestPaid.toFixed(2)}
                  </td>
                  <td className="px-3 py-1 border border-gray-300">
                    ${remainingBalance.toFixed(2)}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      <p className="text-right mt-4 font-semibold">
        Total interest paid:{" "}
        <span className="text-red-600">${totalInterestPaid.toFixed(2)}</span>
      </p>
    </div>
  );
}
