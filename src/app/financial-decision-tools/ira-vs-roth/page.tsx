"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";

type FilingStatus = "single" | "married" | "head_of_household";

function getRothIncomeLimit(status: FilingStatus): number {
  // 2024 approximate phase-out start income limits for Roth IRA contributions (adjust as needed)
  switch (status) {
    case "single":
      return 138000;
    case "married":
      return 218000;
    case "head_of_household":
      return 138000;
    default:
      return 0;
  }
}

function suggestPlan(
  income: number,
  status: FilingStatus,
  currentTaxBracket: number,
  expectedRetirementBracket: number
): string {
  const rothLimit = getRothIncomeLimit(status);
  if (income > rothLimit) {
    return "Your income exceeds the Roth IRA contribution limit. Traditional IRA may be suitable, but consult a tax advisor.";
  }
  if (currentTaxBracket > expectedRetirementBracket) {
    return "Traditional IRA is generally recommended because your current tax rate is higher than your expected retirement tax rate.";
  } else if (currentTaxBracket < expectedRetirementBracket) {
    return "Roth IRA is generally recommended because your current tax rate is lower than your expected retirement tax rate.";
  } else {
    return "Both Traditional and Roth IRAs could be suitable. Consider your long-term tax plans and consult a tax advisor.";
  }
}

export default function IraVsRothDecisionTool() {
  const [income, setIncome] = useState<number>(0);
  const [filingStatus, setFilingStatus] = useState<FilingStatus>("single");
  const [currentTaxBracket, setCurrentTaxBracket] = useState<number>(12);
  const [expectedRetirementBracket, setExpectedRetirementBracket] =
    useState<number>(12);
  const [result, setResult] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (income <= 0) {
      setResult("Please enter a valid income greater than zero.");
      return;
    }
    if (
      currentTaxBracket < 0 ||
      currentTaxBracket > 40 ||
      expectedRetirementBracket < 0 ||
      expectedRetirementBracket > 40
    ) {
      setResult("Please enter valid tax bracket percentages between 0 and 40.");
      return;
    }

    const suggestion = suggestPlan(
      income,
      filingStatus,
      currentTaxBracket,
      expectedRetirementBracket
    );
    setResult(suggestion);
  };

  return (
    <div className="mx-auto pt-6 sm:pt-12 lg:pt-16 pb-24 lg:pb-32 w-10/12 md:w-11/12">
      <h1>IRA vs Roth IRA Decision Tool</h1>
      <h5>Make Informed Decisions About Your Retirement Savings</h5>
      <p>
        Use this tool to help determine whether a Traditional IRA or Roth IRA
        may be more suitable for your retirement savings strategy. Please fill
        out the form below with your financial information, and we will provide
        you with a recommendation based on your current and expected tax
        situation.
      </p>
      <p className="mt-4">
        This tool is for informational purposes only and should not be
        considered financial advice. Please consult with a financial advisor or
        tax professional for personalized recommendations based on your
        individual circumstances.
      </p>
      <p className="mt-4">
        Please enter your annual income, tax filing status, current tax bracket,
        and expected retirement tax bracket. The tool will provide you with a
        recommendation on whether a Traditional IRA or Roth IRA may be more
        suitable for you.
      </p>
      <p className="mt-4">
        Note: The income limits for Roth IRA contributions may change annually.
        Please check the IRS website for the most up-to-date information.
      </p>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
        aria-label="IRA vs Roth IRA decision form"
      >
        <div>
          <Label htmlFor="income" className="block mb-1 font-semibold">
            Annual Income ($)
          </Label>
          <Input
            id="income"
            type="number"
            min={0}
            value={income === 0 ? "" : income}
            onChange={(e) => setIncome(Number(e.target.value))}
            className="p-2 border border-gray-300 rounded w-full"
            required
            aria-describedby="incomeHelp"
          />
          <p id="incomeHelp" className="mt-1 text-gray-500 text-sm">
            Enter your adjusted gross income.
          </p>
        </div>

        <div>
          <Label htmlFor="filingStatus" className="block mb-1 font-semibold">
            Tax Filing Status
          </Label>
          <select
            id="filingStatus"
            value={filingStatus}
            onChange={(e) => setFilingStatus(e.target.value as FilingStatus)}
            className="p-2 border border-gray-300 rounded w-full"
          >
            <option value="single">Single</option>
            <option value="married">Married Filing Jointly</option>
            <option value="head_of_household">Head of Household</option>
          </select>
        </div>

        <div>
          <Label
            htmlFor="currentTaxBracket"
            className="block mb-1 font-semibold"
          >
            Current Tax Bracket (%)
          </Label>
          <Input
            id="currentTaxBracket"
            type="number"
            min={0}
            max={40}
            value={currentTaxBracket}
            onChange={(e) => setCurrentTaxBracket(Number(e.target.value))}
            className="p-2 border border-gray-300 rounded w-full"
            required
          />
          <p className="mt-1 text-gray-500 text-sm">
            Enter your current marginal tax rate (e.g., 12, 22, 24).
          </p>
        </div>

        <div>
          <Label
            htmlFor="expectedRetirementBracket"
            className="block mb-1 font-semibold"
          >
            Expected Retirement Tax Bracket (%)
          </Label>
          <Input
            id="expectedRetirementBracket"
            type="number"
            min={0}
            max={40}
            value={expectedRetirementBracket}
            onChange={(e) =>
              setExpectedRetirementBracket(Number(e.target.value))
            }
            className="p-2 border border-gray-300 rounded w-full"
            required
          />
          <p className="mt-1 text-gray-500 text-sm">
            Estimate your expected marginal tax rate during retirement.
          </p>
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 py-2 rounded focus:ring-2 focus:ring-blue-500 w-full font-semibold text-white focus:outline-none"
        >
          Get Recommendation
        </button>
      </form>

      {result && (
        <div
          className="bg-gray-100 mt-6 p-4 border border-gray-300 rounded"
          role="alert"
          aria-live="polite"
        >
          {result}
        </div>
      )}
    </div>
  );
}
