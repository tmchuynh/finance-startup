import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface Expense {
  id: string;
  name: string;
  amount: number;
}

export default function BudgetBuilder() {
  const [income, setIncome] = useState<number>(0);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState<number | "">("");

  // Add new expense to list
  const addExpense = () => {
    if (!expenseName.trim() || !expenseAmount || expenseAmount <= 0) return;
    setExpenses((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        name: expenseName.trim(),
        amount: expenseAmount,
      },
    ]);
    setExpenseName("");
    setExpenseAmount("");
  };

  // Remove expense by id
  const removeExpense = (id: string) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  // Calculate total expenses
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);

  // Calculate leftover budget monthly and weekly
  const leftoverMonthly = income - totalExpenses;
  const leftoverWeekly = leftoverMonthly / 4.345; // average weeks per month

  return (
    <div className="bg-white shadow mx-auto p-6 rounded max-w-lg">
      <h1 className="mb-4 font-bold text-2xl">Budget Builder</h1>

      <div className="mb-6">
        <Label htmlFor="income" className="block mb-1 font-semibold">
          Monthly Income ($)
        </Label>
        <Input
          id="income"
          type="number"
          min={0}
          value={income}
          onChange={(e) => setIncome(Number(e.target.value))}
          className="p-2 border border-gray-300 rounded w-full"
          aria-describedby="income-desc"
        />
        <p id="income-desc" className="mt-1 text-gray-500 text-sm">
          Enter your total monthly income before expenses.
        </p>
      </div>

      <div className="mb-4">
        <h2 className="mb-2 font-semibold text-xl">Expenses</h2>

        <div className="flex gap-2 mb-3">
          <Input
            type="text"
            placeholder="Expense Name"
            value={expenseName}
            onChange={(e) => setExpenseName(e.target.value)}
            className="flex-grow p-2 border border-gray-300 rounded"
            aria-label="Expense Name"
          />
          <Input
            type="number"
            placeholder="Amount"
            min={0}
            value={expenseAmount}
            onChange={(e) => setExpenseAmount(Number(e.target.value))}
            className="p-2 border border-gray-300 rounded w-24"
            aria-label="Expense Amount"
          />
          <button
            onClick={addExpense}
            disabled={
              !expenseName.trim() || !expenseAmount || expenseAmount <= 0
            }
            className="bg-blue-600 disabled:opacity-50 px-4 rounded text-white"
          >
            Add
          </button>
        </div>

        {expenses.length === 0 && (
          <p className="text-gray-500">No expenses added yet.</p>
        )}

        {expenses.length > 0 && (
          <ul className="mb-4 border border-gray-200 rounded max-h-48 overflow-y-auto">
            {expenses.map(({ id, name, amount }) => (
              <li
                key={id}
                className="flex justify-between items-center px-3 py-2 border-gray-100 border-b"
              >
                <span>{name}</span>
                <div className="flex items-center gap-3">
                  <span>${amount.toFixed(2)}</span>
                  <button
                    onClick={() => removeExpense(id)}
                    aria-label={`Remove expense ${name}`}
                    className="font-bold text-red-600 hover:text-red-800"
                  >
                    &times;
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="pt-4 border-gray-300 border-t">
        <p className="text-lg">
          <span className="font-semibold">Total Expenses:</span> $
          {totalExpenses.toFixed(2)}
        </p>
        <p className="text-lg">
          <span className="font-semibold">Leftover Monthly Budget:</span>{" "}
          <span className={leftoverMonthly < 0 ? "text-red-600" : ""}>
            ${leftoverMonthly.toFixed(2)}
          </span>
        </p>
        <p className="text-lg">
          <span className="font-semibold">Leftover Weekly Budget:</span>{" "}
          <span className={leftoverWeekly < 0 ? "text-red-600" : ""}>
            ${leftoverWeekly.toFixed(2)}
          </span>
        </p>
      </div>
    </div>
  );
}
