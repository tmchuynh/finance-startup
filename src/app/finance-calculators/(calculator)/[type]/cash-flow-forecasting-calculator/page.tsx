"use client";
import { forecastMonthlyCashFlow } from "@/lib/utils/calculators/business/income";
import { useState } from "react";

export default function CashFlowForecastingCalculator() {
  const [startingCash, setStartingCash] = useState<string>("");
  const [monthlyIncome, setMonthlyIncome] = useState<string>("");
  const [monthlyExpenses, setMonthlyExpenses] = useState<string>("");
  const [accountsReceivableDays, setAccountsReceivableDays] =
    useState<string>("");
  const [accountsPayableDays, setAccountsPayableDays] = useState<string>("");
  const [result, setResult] = useState<{
    endingCash: number;
    incomeReceived: number;
    expensesPaid: number;
  } | null>(null);

  const handleCalculate = () => {
    const cash = parseFloat(startingCash);
    const income = parseFloat(monthlyIncome);
    const expenses = parseFloat(monthlyExpenses);
    const arDays = parseFloat(accountsReceivableDays);
    const apDays = parseFloat(accountsPayableDays);
    if (
      !isNaN(cash) &&
      !isNaN(income) &&
      !isNaN(expenses) &&
      !isNaN(arDays) &&
      !isNaN(apDays)
    ) {
      const res = forecastMonthlyCashFlow({
        startingCash: cash,
        monthlyIncome: income,
        monthlyExpenses: expenses,
        accountsReceivableDays: arDays,
        accountsPayableDays: apDays,
      });
      setResult(res);
    } else {
      setResult(null);
    }
  };

  return (
    <div className="mx-auto mt-8 md:mt-12 w-10/12 md:w-11/12 h-full">
      <h1>Cash Flow Forecasting Calculator</h1>
      <h5>
        Estimate your business's cash flow for the next month based on expected
        income and expenses.
      </h5>
      <p className="mb-4">
        This calculator helps you forecast your cash flow by considering
        expected income, expenses, and the timing of cash inflows and outflows.
        By understanding your cash flow, you can make informed decisions about
        your business's financial health and liquidity. This is crucial for
        managing your operations, planning for growth, and ensuring you have
        enough cash to meet your obligations. Use this tool to assess your cash
        flow needs and make strategic financial decisions.
      </p>
      <div className="mb-4">
        <p>
          <strong>What is Cash Flow Forecasting?</strong>
          <br />
          Cash flow forecasting helps you predict your business's future cash
          position by estimating incoming and outgoing cash, including the
          effects of payment delays.
        </p>
        <p className="mt-2">
          <strong>Why it matters:</strong>
          <br />
          Forecasting cash flow helps you avoid shortfalls, plan for growth, and
          make informed financial decisions.
        </p>
      </div>
      <div className="gap-4 grid md:grid-cols-2">
        <div className="mb-2">
          <label className="block mb-1 font-medium">Starting Cash ($):</label>
          <input
            type="number"
            className="px-2 py-1 border rounded w-full"
            value={startingCash}
            onChange={(e) => setStartingCash(e.target.value)}
            placeholder="Cash at start of month"
            min="0"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1 font-medium">Monthly Income ($):</label>
          <input
            type="number"
            className="px-2 py-1 border rounded w-full"
            value={monthlyIncome}
            onChange={(e) => setMonthlyIncome(e.target.value)}
            placeholder="Expected income"
            min="0"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1 font-medium">
            Monthly Expenses ($):
          </label>
          <input
            type="number"
            className="px-2 py-1 border rounded w-full"
            value={monthlyExpenses}
            onChange={(e) => setMonthlyExpenses(e.target.value)}
            placeholder="Expected expenses"
            min="0"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1 font-medium">
            Accounts Receivable Days:
          </label>
          <input
            type="number"
            className="px-2 py-1 border rounded w-full"
            value={accountsReceivableDays}
            onChange={(e) => setAccountsReceivableDays(e.target.value)}
            placeholder="Avg days to collect payments"
            min="0"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1 font-medium">
            Accounts Payable Days:
          </label>
          <input
            type="number"
            className="px-2 py-1 border rounded w-full"
            value={accountsPayableDays}
            onChange={(e) => setAccountsPayableDays(e.target.value)}
            placeholder="Avg days to pay expenses"
            min="0"
          />
        </div>
      </div>
      <button
        className="bg-blue-600 mt-2 px-4 py-2 rounded text-white"
        onClick={handleCalculate}
      >
        Forecast Cash Flow
      </button>
      {result && (
        <div className="flex flex-col gap-4 mt-6">
          <div className="bg-white shadow p-4 border rounded-lg">
            <div>
              <strong>Income Received:</strong>{" "}
              <span className="text-blue-700">
                ${result.incomeReceived.toFixed(2)}
              </span>
            </div>
            <div>
              <strong>Expenses Paid:</strong>{" "}
              <span className="text-blue-700">
                ${result.expensesPaid.toFixed(2)}
              </span>
            </div>
            <div>
              <strong>Ending Cash:</strong>{" "}
              <span className="text-blue-700 text-lg">
                ${result.endingCash.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
