"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function EmergencyFundPlanner() {
  const [monthlyExpenses, setMonthlyExpenses] = useState<number>(0);
  const [targetMonths, setTargetMonths] = useState<number>(3);
  const [currentSavings, setCurrentSavings] = useState<number>(0);

  const fundNeeded = monthlyExpenses * targetMonths;
  const progressPercent =
    fundNeeded > 0 ? Math.min((currentSavings / fundNeeded) * 100, 100) : 0;
  const isGoalMet = currentSavings >= fundNeeded;

  return (
    <div className="bg-white shadow mx-auto p-6 rounded max-w-md">
      <h1 className="mb-6 font-bold text-2xl">Emergency Fund Planner</h1>

      <Label htmlFor="monthly-expenses" className="block mb-1 font-semibold">
        Average Monthly Expenses ($)
      </Label>
      <Input
        id="monthly-expenses"
        type="number"
        min={0}
        value={monthlyExpenses}
        onChange={(e) => setMonthlyExpenses(Number(e.target.value))}
        className="mb-4 p-2 border border-gray-300 rounded w-full"
        aria-describedby="monthly-expenses-desc"
      />
      <p id="monthly-expenses-desc" className="mb-4 text-gray-500 text-sm">
        Your average monthly expenses (rent, utilities, food, etc.).
      </p>

      <Label htmlFor="target-months" className="block mb-1 font-semibold">
        Target Number of Months
      </Label>
      <Input
        id="target-months"
        type="number"
        min={1}
        max={24}
        value={targetMonths}
        onChange={(e) => setTargetMonths(Number(e.target.value))}
        className="mb-4 p-2 border border-gray-300 rounded w-full"
        aria-describedby="target-months-desc"
      />
      <p id="target-months-desc" className="mb-4 text-gray-500 text-sm">
        How many months of expenses you want to save.
      </p>

      <Label htmlFor="current-savings" className="block mb-1 font-semibold">
        Current Emergency Savings ($)
      </Label>
      <Input
        id="current-savings"
        type="number"
        min={0}
        value={currentSavings}
        onChange={(e) => setCurrentSavings(Number(e.target.value))}
        className="mb-6 p-2 border border-gray-300 rounded w-full"
        aria-describedby="current-savings-desc"
      />
      <p id="current-savings-desc" className="mb-6 text-gray-500 text-sm">
        Your current emergency fund savings amount.
      </p>

      <div className="pt-4 border-gray-300 border-t">
        <p className="mb-2 text-lg">
          <span className="font-semibold">Emergency Fund Needed:</span> $
          {fundNeeded.toFixed(2)}
        </p>
        <p className="mb-2 text-lg">
          <span className="font-semibold">Progress:</span>{" "}
          <span className={isGoalMet ? "text-green-700" : "text-yellow-600"}>
            {progressPercent.toFixed(1)}%
          </span>
        </p>
        <p
          className={`text-lg font-semibold ${
            isGoalMet ? "text-green-700" : "text-red-600"
          }`}
        >
          {isGoalMet
            ? "You have reached your emergency fund goal!"
            : `You need $${(fundNeeded - currentSavings).toFixed(
                2
              )} more to reach your goal.`}
        </p>
      </div>
    </div>
  );
}
