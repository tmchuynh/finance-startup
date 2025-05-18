"use client";

import { NumberInput } from "@/components/forms/NumberInput";
import {
  calculateOvertimePay,
  forecastExpenses,
} from "@/lib/utils/calculators/business/expenses";

import { useState } from "react";

export default function ExpensesCalculators() {
  // Forecast Expenses
  const [forecastInputs, setForecastInputs] = useState({
    initialExpense: 0,
    monthlyGrowthRate: 0.01,
    months: 12,
  });
  const forecastedExpenses = forecastExpenses(forecastInputs);

  // Overtime Pay
  const [overtimeInputs, setOvertimeInputs] = useState({
    regularHours: 0,
    overtimeHours: 0,
    hourlyRate: 0,
  });
  const overtimePay = calculateOvertimePay(overtimeInputs);

  return (
    <main className="space-y-12 p-6 w-full">
      <section>
        <h2 className="font-semibold text-xl">Expense Forecast</h2>
        <div className="gap-6 grid md:grid-cols-2 mt-2">
          {["initialExpense", "monthlyGrowthRate", "months"].map((field) => (
            <NumberInput
              key={field}
              field={field}
              state={forecastInputs}
              setState={setForecastInputs}
            />
          ))}
        </div>
        <div className="mt-2">
          <p>Forecasted Monthly Expenses: {forecastedExpenses.join(", ")}</p>
        </div>
      </section>

      <section>
        <h2 className="font-semibold text-xl">Overtime Pay Calculator</h2>
        <div className="gap-6 grid md:grid-cols-2 mt-2">
          {["regularHours", "overtimeHours", "hourlyRate"].map((field) => (
            <NumberInput
              key={field}
              field={field}
              state={overtimeInputs}
              setState={setOvertimeInputs}
            />
          ))}
        </div>
        <div className="gap-2 grid md:grid-cols-3 mt-2">
          <p>Regular Pay: ${overtimePay.regularPay.toFixed(2)}</p>
          <p>Overtime Pay: ${overtimePay.overtimePay.toFixed(2)}</p>
          <p>Total Pay: ${overtimePay.totalPay.toFixed(2)}</p>
        </div>
      </section>
    </main>
  );
}
