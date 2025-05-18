"use client";

import { NumberInput } from "@/components/forms/NumberInput";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  calculateProfitMargins,
  forecastMonthlyCashFlow,
} from "@/lib/utils/calculators/business/income";
import { calculateInventoryTurnoverRatio } from "@/lib/utils/calculators/business/inventory";
import { calculateBreakEvenPoint } from "@/lib/utils/calculators/business/operations";
import { calculatePayrollTaxes } from "@/lib/utils/calculators/tax";
import { useState } from "react";

export default function CashFlowCalculators() {
  // Profit Margin
  const [profitInputs, setProfitInputs] = useState({
    revenue: 0,
    costOfGoodsSold: 0,
    operatingExpenses: 0,
    interestExpense: 0,
    taxes: 0,
  });

  const profitResult = calculateProfitMargins(profitInputs);

  // Inventory Turnover
  const [inventoryInputs, setInventoryInputs] = useState({
    costOfGoodsSold: 0,
    averageInventory: 1,
  });

  const inventoryTurnover = calculateInventoryTurnoverRatio(inventoryInputs);

  // Break Even
  const [breakEvenInputs, setBreakEvenInputs] = useState({
    fixedCosts: 0,
    variableCostPerUnit: 0,
    pricePerUnit: 1,
  });

  const breakEvenOutput = calculateBreakEvenPoint(breakEvenInputs);
  const breakEven =
    typeof breakEvenOutput === "number"
      ? {
          breakEvenUnits: breakEvenOutput,
          breakEvenSales: breakEvenOutput * breakEvenInputs.pricePerUnit,
        }
      : breakEvenOutput;

  // Payroll Taxes
  const [payrollInputs, setPayrollInputs] = useState({
    grossPayroll: 0,
    numEmployees: 1,
    stateUnemploymentTaxRate: 0,
    federalUnemploymentTaxRate: 0,
  });

  const payrollResult = calculatePayrollTaxes(payrollInputs);

  // Cash Flow
  const [cashFlowInputs, setCashFlowInputs] = useState({
    startingCash: 0,
    monthlyIncome: 0,
    monthlyExpenses: 0,
    accountsReceivableDays: 0,
    accountsPayableDays: 0,
  });

  const cashFlow = forecastMonthlyCashFlow(cashFlowInputs);

  return (
    <main className="space-y-12 p-6 w-full">
      <h1 className="mb-6 font-bold text-3xl">Cash Flow Calculators</h1>

      {/* Profit Margin Calculator */}
      <section>
        <h2 className="font-semibold text-xl">Profit Margin Calculator</h2>
        <div className="gap-6 grid md:grid-cols-2 mt-2">
          {[
            "revenue",
            "costOfGoodsSold",
            "operatingExpenses",
            "interestExpense",
            "taxes",
          ].map((field) => (
            <NumberInput
              key={field}
              field={field}
              state={profitInputs}
              setState={setProfitInputs}
            />
          ))}
        </div>
        <div className="gap-2 grid md:grid-cols-3 mt-2">
          <p>Gross Margin: {(profitResult.grossMargin * 100).toFixed(2)}%</p>
          <p>Net Margin: {(profitResult.netMargin * 100).toFixed(2)}%</p>
          <p>Gross Profit: ${profitResult.grossProfit.toFixed(2)}</p>
          <p>Net Income: ${profitResult.netIncome.toFixed(2)}</p>
        </div>
      </section>

      {/* Inventory Turnover Ratio */}
      <section>
        <h2 className="font-semibold text-xl">Inventory Turnover Ratio</h2>
        <div className="gap-6 grid md:grid-cols-2 mt-2">
          <div>
            <Label>Cost of Goods Sold</Label>
            <Input
              type="number"
              placeholder="Cost of Goods Sold"
              className="mt-2 input-bordered input"
              value={inventoryInputs.costOfGoodsSold}
              onChange={(e) =>
                setInventoryInputs({
                  ...inventoryInputs,
                  costOfGoodsSold: parseFloat(e.target.value) || 0,
                })
              }
            />
          </div>
          <div>
            <Label>Average Inventory</Label>
            <Input
              type="number"
              placeholder="Average Inventory"
              className="mt-2 input-bordered input"
              value={inventoryInputs.averageInventory}
              onChange={(e) =>
                setInventoryInputs({
                  ...inventoryInputs,
                  averageInventory: parseFloat(e.target.value) || 1,
                })
              }
            />
          </div>
        </div>
        <div className="gap-2 grid md:grid-cols-3 mt-2">
          <p>Turnover Ratio: {inventoryTurnover.turnoverRatio}</p>
        </div>
      </section>

      {/* Break Even Calculator */}
      <section>
        <h2 className="font-semibold text-xl">Break-Even Point</h2>
        <div className="gap-6 grid md:grid-cols-2 mt-2">
          {["fixedCosts", "variableCostPerUnit", "pricePerUnit"].map(
            (field) => (
              <NumberInput
                key={field}
                field={field}
                state={breakEvenInputs}
                setState={setBreakEvenInputs}
              />
            )
          )}
        </div>
        <div className="gap-2 grid md:grid-cols-3 mt-2">
          <p>Break-Even Units: {breakEven.breakEvenUnits.toFixed(2)}</p>
          <p>Break-Even Sales: ${breakEven.breakEvenSales.toFixed(2)}</p>
        </div>
      </section>

      {/* Payroll Tax Calculator */}
      <section>
        <h2 className="font-semibold text-xl">Payroll Tax Calculator</h2>
        <div className="gap-6 grid md:grid-cols-2 mt-2">
          {[
            "grossPayroll",
            "numEmployees",
            "stateUnemploymentTaxRate",
            "federalUnemploymentTaxRate",
          ].map((field) => (
            <NumberInput
              key={field}
              field={field}
              state={payrollInputs}
              setState={setPayrollInputs}
            />
          ))}
        </div>
        <div className="gap-2 grid md:grid-cols-3 mt-2">
          <p>
            Social Security Tax: ${payrollResult.socialSecurityTax.toFixed(2)}
          </p>
          <p>Medicare Tax: ${payrollResult.medicareTax.toFixed(2)}</p>
          <p>
            State Unemployment Tax: $
            {payrollResult.stateUnemploymentTax.toFixed(2)}
          </p>
          <p>
            Federal Unemployment Tax: $
            {payrollResult.federalUnemploymentTax.toFixed(2)}
          </p>
          <p>Total Employer Taxes: ${payrollResult.employerTaxes.toFixed(2)}</p>
        </div>
      </section>

      {/* Cash Flow Forecast */}
      <section>
        <h2 className="font-semibold text-xl">Cash Flow Forecast</h2>
        <div className="gap-6 grid md:grid-cols-2 mt-2">
          {[
            "startingCash",
            "monthlyIncome",
            "monthlyExpenses",
            "accountsReceivableDays",
            "accountsPayableDays",
          ].map((field) => (
            <NumberInput
              key={field}
              field={field}
              state={cashFlowInputs}
              setState={setCashFlowInputs}
            />
          ))}
        </div>
        <div className="gap-2 grid md:grid-cols-3 mt-2">
          <p>Ending Cash: ${cashFlow.endingCash.toFixed(2)}</p>
          <p>Income Received: ${cashFlow.incomeReceived.toFixed(2)}</p>
          <p>Expenses Paid: ${cashFlow.expensesPaid.toFixed(2)}</p>
        </div>
      </section>
    </main>
  );
}
