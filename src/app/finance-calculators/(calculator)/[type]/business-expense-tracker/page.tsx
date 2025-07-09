"use client";
import { analyzeBusinessExpenses } from "@/lib/utils/calculators/business/expenses";
import { useState } from "react";

interface ExpenseInput {
  category: string;
  amount: string;
  isFixed: boolean;
}

export default function BusinessExpenseTracker() {
  const [expenses, setExpenses] = useState<ExpenseInput[]>([
    { category: "", amount: "", isFixed: false },
  ]);
  const [revenue, setRevenue] = useState<string>("");
  const [result, setResult] = useState<any>(null);

  const handleExpenseChange = (
    idx: number,
    field: keyof ExpenseInput,
    value: string | boolean
  ) => {
    setExpenses((expenses) =>
      expenses.map((exp, i) => (i === idx ? { ...exp, [field]: value } : exp))
    );
  };

  const addExpense = () => {
    setExpenses([...expenses, { category: "", amount: "", isFixed: false }]);
  };

  const removeExpense = (idx: number) => {
    setExpenses((expenses) => expenses.filter((_, i) => i !== idx));
  };

  const handleCalculate = () => {
    const parsedExpenses = expenses
      .filter((exp) => exp.category && exp.amount !== "")
      .map((exp) => ({
        category: exp.category,
        amount: parseFloat(exp.amount) || 0,
        isFixed: exp.isFixed,
      }));
    const rev = parseFloat(revenue);
    if (parsedExpenses.length && !isNaN(rev)) {
      setResult(
        analyzeBusinessExpenses({ expenses: parsedExpenses, revenue: rev })
      );
    } else {
      setResult(null);
    }
  };

  return (
    <div className="mt-8 md:mt-12 mx-auto h-full w-10/12 md:w-11/12">
      <h1>Business Expense Tracker</h1>
      <h5>Analyze your business expenses effectively.</h5>
      <p className="mb-4">
        This tool helps you track and analyze your business expenses. By
        categorizing your expenses as fixed or variable, you can gain insights
        into your spending patterns and make informed financial decisions. Use
        this tracker to optimize your budget and improve your business's
        profitability.
      </p>
      <div className="mb-4">
        <p>
          <strong>How does it work?</strong>
          <br />
          Enter your business revenue and list your expenses by category. Mark
          each expense as fixed or variable. The tracker will analyze your
          expense breakdown and show key metrics.
        </p>
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Business Revenue ($):</label>
        <input
          type="number"
          className="px-2 py-1 border rounded w-full"
          value={revenue}
          onChange={(e) => setRevenue(e.target.value)}
          placeholder="Enter total revenue"
          min="0"
        />
      </div>
      <div>
        <h2 className="mb-2 font-semibold">Expenses</h2>
        {expenses.map((exp, idx) => (
          <div key={idx} className="flex gap-2 items-center mb-2">
            <input
              type="text"
              className="px-2 py-1 border rounded w-1/3"
              placeholder="Category"
              value={exp.category}
              onChange={(e) =>
                handleExpenseChange(idx, "category", e.target.value)
              }
            />
            <input
              type="number"
              className="px-2 py-1 border rounded w-1/3"
              placeholder="Amount"
              min="0"
              value={exp.amount}
              onChange={(e) =>
                handleExpenseChange(idx, "amount", e.target.value)
              }
            />
            <label className="flex gap-1 items-center text-xs">
              <input
                type="checkbox"
                checked={exp.isFixed}
                onChange={(e) =>
                  handleExpenseChange(idx, "isFixed", e.target.checked)
                }
              />
              Fixed
            </label>
            <button
              className="text-red-500 text-xs"
              onClick={() => removeExpense(idx)}
              disabled={expenses.length === 1}
              type="button"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          className="bg-gray-200 mt-2 px-3 py-1 rounded text-sm"
          onClick={addExpense}
          type="button"
        >
          Add Expense
        </button>
      </div>
      <button
        className="bg-blue-600 mt-4 px-4 py-2 rounded"
        onClick={handleCalculate}
      >
        Analyze Expenses
      </button>
      {result && (
        <div className="flex flex-col gap-4 mt-6">
          <div className="shadow p-4 border rounded-lg">
            <div>
              <strong>Total Expenses:</strong>{" "}
              <span className="">${result.totalExpenses.toFixed(2)}</span>
            </div>
            <div>
              <strong>Fixed Expenses:</strong>{" "}
              <span className="">${result.fixedExpenses.toFixed(2)}</span>
            </div>
            <div>
              <strong>Variable Expenses:</strong>{" "}
              <span className="">${result.variableExpenses.toFixed(2)}</span>
            </div>
            <div>
              <strong>Expense to Revenue Ratio:</strong>{" "}
              <span className="">
                {result.expenseToRevenueRatioPercent.toFixed(2)}%
              </span>
            </div>
            <div>
              <strong>Fixed Expense Ratio:</strong>{" "}
              <span className="">
                {result.fixedExpenseRatioPercent.toFixed(2)}%
              </span>
            </div>
            <div>
              <strong>Variable Expense Ratio:</strong>{" "}
              <span className="">
                {result.variableExpenseRatioPercent.toFixed(2)}%
              </span>
            </div>
          </div>
          <div className="shadow p-4 border rounded-lg text-sm">
            <strong>Expense Breakdown by Category:</strong>
            <ul className="mt-2">
              {Object.entries(result.expenseBreakdown).map(
                ([cat, val]: any) => (
                  <li key={cat}>
                    <strong>{cat}:</strong> ${val.amount.toFixed(2)} (
                    {val.percentOfRevenue.toFixed(2)}% of revenue,{" "}
                    {val.percentOfTotal.toFixed(2)}% of total,{" "}
                    {val.isFixed ? "Fixed" : "Variable"})
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
