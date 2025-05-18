"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";

interface ExpenseEntry {
  id: string;
  description: string;
  amount: number;
  date: string; // ISO date string YYYY-MM-DD
}

export default function DailyExpenseTracker() {
  const [entries, setEntries] = useState<ExpenseEntry[]>([]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState<number | "">("");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("dailyExpenseEntries");
    if (saved) setEntries(JSON.parse(saved));
  }, []);

  // Save to localStorage on entries change
  useEffect(() => {
    localStorage.setItem("dailyExpenseEntries", JSON.stringify(entries));
  }, [entries]);

  const addEntry = () => {
    if (!description.trim() || !amount || amount <= 0) return;

    const newEntry: ExpenseEntry = {
      id: crypto.randomUUID(),
      description: description.trim(),
      amount: amount,
      date,
    };

    setEntries((prev) => [...prev, newEntry]);
    setDescription("");
    setAmount("");
    setDate(new Date().toISOString().slice(0, 10));
  };

  const removeEntry = (id: string) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  };

  // Group entries by date for display
  const entriesByDate = entries.reduce<Record<string, ExpenseEntry[]>>(
    (acc, entry) => {
      if (!acc[entry.date]) acc[entry.date] = [];
      acc[entry.date].push(entry);
      return acc;
    },
    {}
  );

  // Sort dates descending
  const sortedDates = Object.keys(entriesByDate).sort((a, b) =>
    a > b ? -1 : 1
  );

  return (
    <div className="bg-white shadow mx-auto p-6 rounded max-w-xl">
      <h1 className="mb-6 font-bold text-2xl">Daily Expense Tracker</h1>

      <div className="space-y-3 mb-6">
        <div>
          <Label htmlFor="description" className="block mb-1 font-semibold">
            Description
          </Label>
          <Input
            id="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What did you spend on?"
            className="p-2 border border-gray-300 rounded w-full"
          />
        </div>

        <div>
          <Label htmlFor="amount" className="block mb-1 font-semibold">
            Amount ($)
          </Label>
          <Input
            id="amount"
            type="number"
            min={0}
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            placeholder="0.00"
            className="p-2 border border-gray-300 rounded w-full"
          />
        </div>

        <div>
          <Label htmlFor="date" className="block mb-1 font-semibold">
            Date
          </Label>
          <Input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            max={new Date().toISOString().slice(0, 10)}
            className="p-2 border border-gray-300 rounded w-full"
          />
        </div>

        <button
          onClick={addEntry}
          disabled={!description.trim() || !amount || amount <= 0}
          className="bg-blue-600 disabled:opacity-50 px-4 py-2 rounded text-white"
        >
          Add Expense
        </button>
      </div>

      {entries.length === 0 && (
        <p className="text-center text-gray-500">No expenses logged yet.</p>
      )}

      {sortedDates.map((dateKey) => {
        const dailyEntries = entriesByDate[dateKey];
        const totalForDay = dailyEntries.reduce((sum, e) => sum + e.amount, 0);
        return (
          <div
            key={dateKey}
            className="mb-6 p-4 border border-gray-200 rounded"
          >
            <h2 className="mb-2 font-semibold text-lg">
              {new Date(dateKey).toLocaleDateString(undefined, {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </h2>
            <ul className="divide-y divide-gray-200">
              {dailyEntries.map(({ id, description, amount }) => (
                <li key={id} className="flex justify-between items-center py-2">
                  <span>{description}</span>
                  <div className="flex items-center gap-4">
                    <span>${amount.toFixed(2)}</span>
                    <button
                      onClick={() => removeEntry(id)}
                      aria-label={`Remove expense ${description}`}
                      className="font-bold text-red-600 hover:text-red-800"
                    >
                      &times;
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <p className="text-right mt-3 font-semibold">
              Total: ${totalForDay.toFixed(2)}
            </p>
          </div>
        );
      })}
    </div>
  );
}
