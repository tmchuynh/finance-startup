"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  calculateExpenseToRevenueRatio,
  calculateJobTrainingROI,
  calculateOvertimePay,
  forecastExpenses,
} from "@/lib/utils/calculators/business";
import { formatCamelCaseToTitle } from "@/lib/utils/format";
import { useState } from "react";

export default function ExpensesCalculators() {
  // Expense to Revenue Ratio
  const [expenseRevenueInputs, setExpenseRevenueInputs] = useState({
    totalExpenses: 0,
    totalRevenue: 1,
  });
  const expenseToRevenueRatio =
    calculateExpenseToRevenueRatio(expenseRevenueInputs);

  // Job Training ROI
  const [jobTrainingInputs, setJobTrainingInputs] = useState({
    programCost: 0,
    expectedSalaryIncrease: 0,
    yearsToBenefit: 0,
  });
  const jobTrainingROI = calculateJobTrainingROI(jobTrainingInputs);

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
        <h2 className="font-semibold text-xl">Expense to Revenue Ratio</h2>
        <div className="gap-6 grid md:grid-cols-2 mt-2">
          {["totalExpenses", "totalRevenue"].map((field) => (
            <div key={field}>
              <Label>{formatCamelCaseToTitle(field)}</Label>
              <Input
                type="number"
                value={
                  expenseRevenueInputs[
                    field as keyof typeof expenseRevenueInputs
                  ]
                }
                onChange={(e) =>
                  setExpenseRevenueInputs({
                    ...expenseRevenueInputs,
                    [field]: parseFloat(e.target.value) || 0,
                  })
                }
              />
            </div>
          ))}
        </div>
        <div className="mt-2">
          <p>Expense-to-Revenue Ratio: {expenseToRevenueRatio.toFixed(2)}</p>
        </div>
      </section>

      <section>
        <h2 className="font-semibold text-xl">Job Training ROI</h2>
        <div className="gap-6 grid md:grid-cols-2 mt-2">
          {["programCost", "expectedSalaryIncrease", "yearsToBenefit"].map(
            (field) => (
              <div key={field}>
                <Label>{formatCamelCaseToTitle(field)}</Label>
                <Input
                  type="number"
                  value={
                    jobTrainingInputs[field as keyof typeof jobTrainingInputs]
                  }
                  onChange={(e) =>
                    setJobTrainingInputs({
                      ...jobTrainingInputs,
                      [field]: parseFloat(e.target.value) || 0,
                    })
                  }
                />
              </div>
            )
          )}
        </div>
        <div className="mt-2">
          <p>ROI: {(jobTrainingROI * 100).toFixed(2)}%</p>
        </div>
      </section>

      <section>
        <h2 className="font-semibold text-xl">Expense Forecast</h2>
        <div className="gap-6 grid md:grid-cols-2 mt-2">
          {["initialExpense", "monthlyGrowthRate", "months"].map((field) => (
            <div key={field}>
              <Label>{formatCamelCaseToTitle(field)}</Label>
              <Input
                type="number"
                value={forecastInputs[field as keyof typeof forecastInputs]}
                onChange={(e) =>
                  setForecastInputs({
                    ...forecastInputs,
                    [field]: parseFloat(e.target.value) || 0,
                  })
                }
              />
            </div>
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
            <div key={field}>
              <Label>{formatCamelCaseToTitle(field)}</Label>
              <Input
                type="number"
                value={overtimeInputs[field as keyof typeof overtimeInputs]}
                onChange={(e) =>
                  setOvertimeInputs({
                    ...overtimeInputs,
                    [field]: parseFloat(e.target.value) || 0,
                  })
                }
              />
            </div>
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
