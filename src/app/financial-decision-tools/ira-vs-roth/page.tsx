"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
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
  const [income, setIncome] = useState<number>(85000);
  const [filingStatus, setFilingStatus] = useState<FilingStatus>("single");
  const [currentTaxBracket, setCurrentTaxBracket] = useState<number>(12);
  const [expectedRetirementBracket, setExpectedRetirementBracket] =
    useState<number>(12);
  const [result, setResult] = useState<string>("");

  // Tax bracket options for toggles
  const taxBracketOptions = [10, 12, 22, 24, 32, 35, 37];

  // Automatically update result as inputs change
  React.useEffect(() => {
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
  }, [income, filingStatus, currentTaxBracket, expectedRetirementBracket]);

  return (
    <div className="mx-auto pt-6 sm:pt-12 lg:pt-16 pb-24 lg:pb-32 w-10/12 md:w-11/12">
      <h1>IRA vs Roth IRA Decision Tool</h1>
      <h5>Make Informed Decisions About Your Retirement Savings</h5>
      <p>
        Use this tool to help determine whether a Traditional IRA or Roth IRA
        may be more suitable for your retirement savings strategy. Please fill
        out the form below with your financial information, and we will provide
        you with a recommendation based on your current and expected tax
        situation. This tool is for informational purposes only and should not
        be considered financial advice. Please consult with a financial advisor
        or tax professional for personalized recommendations based on your
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

      {/* Tax Bracket Chart */}
      <div className="my-8">
        <h3>2024 Federal Income Tax Brackets</h3>
        <div className="overflow-x-auto">
          <table className="bg-white border border-gray-300 min-w-full text-sm">
            <thead>
              <tr>
                <th className="px-2 py-1 border">Rate</th>
                <th className="px-2 py-1 border">Single</th>
                <th className="px-2 py-1 border">Married Filing Jointly</th>
                <th className="px-2 py-1 border">Head of Household</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-2 py-1 border">10%</td>
                <td className="px-2 py-1 border">Up to $11,600</td>
                <td className="px-2 py-1 border">Up to $23,200</td>
                <td className="px-2 py-1 border">Up to $16,550</td>
              </tr>
              <tr>
                <td className="px-2 py-1 border">12%</td>
                <td className="px-2 py-1 border">$11,601 – $47,150</td>
                <td className="px-2 py-1 border">$23,201 – $94,300</td>
                <td className="px-2 py-1 border">$16,551 – $63,100</td>
              </tr>
              <tr>
                <td className="px-2 py-1 border">22%</td>
                <td className="px-2 py-1 border">$47,151 – $100,525</td>
                <td className="px-2 py-1 border">$94,301 – $201,050</td>
                <td className="px-2 py-1 border">$63,101 – $100,500</td>
              </tr>
              <tr>
                <td className="px-2 py-1 border">24%</td>
                <td className="px-2 py-1 border">$100,526 – $191,950</td>
                <td className="px-2 py-1 border">$201,051 – $383,900</td>
                <td className="px-2 py-1 border">$100,501 – $191,950</td>
              </tr>
              <tr>
                <td className="px-2 py-1 border">32%</td>
                <td className="px-2 py-1 border">$191,951 – $243,725</td>
                <td className="px-2 py-1 border">$383,901 – $487,450</td>
                <td className="px-2 py-1 border">$191,951 – $243,700</td>
              </tr>
              <tr>
                <td className="px-2 py-1 border">35%</td>
                <td className="px-2 py-1 border">$243,726 – $609,350</td>
                <td className="px-2 py-1 border">$487,451 – $731,200</td>
                <td className="px-2 py-1 border">$243,701 – $609,350</td>
              </tr>
              <tr>
                <td className="px-2 py-1 border">37%</td>
                <td className="px-2 py-1 border">Over $609,350</td>
                <td className="px-2 py-1 border">Over $731,200</td>
                <td className="px-2 py-1 border">Over $609,350</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-gray-500 text-xs">
          Source: IRS. These are marginal tax rates for 2024. Your tax bracket
          is based on your taxable income and filing status.
        </p>
      </div>
      {/* End Tax Bracket Chart */}

      <form className="space-y-5" aria-label="IRA vs Roth IRA decision form">
        <div>
          <Label htmlFor="income" className="block mb-1 font-semibold">
            Annual Income ($)
          </Label>
          <div className="flex items-center gap-4">
            <Slider
              min={0}
              max={500000}
              step={1000}
              defaultValue={[income]}
              value={[income]}
              onValueChange={([v]) => setIncome(v)}
              className="w-2/3"
            />
            <Input
              id="income"
              type="number"
              min={0}
              value={income === 0 ? "" : income}
              onChange={(e) => setIncome(Number(e.target.value))}
              className="w-1/3"
              required
              aria-describedby="incomeHelp"
            />
          </div>
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
          <div className="flex items-center gap-4">
            <ToggleGroup
              type="single"
              defaultValue="12"
              aria-label="Current tax bracket"
              value={currentTaxBracket.toString()}
              onValueChange={(val) => {
                if (val) setCurrentTaxBracket(Number(val));
              }}
              className="border w-full"
            >
              {taxBracketOptions.map((bracket) => (
                <ToggleGroupItem
                  key={bracket}
                  value={bracket.toString()}
                  aria-label={`Current tax bracket ${bracket}%`}
                >
                  {bracket}%
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
          <p className="mt-1 text-gray-500 text-sm">
            Select your current marginal tax rate (e.g., 12, 22, 24).
          </p>
        </div>

        <div>
          <Label
            htmlFor="expectedRetirementBracket"
            className="block mb-1 font-semibold"
          >
            Expected Retirement Tax Bracket (%)
          </Label>
          <div className="flex items-center gap-4">
            <ToggleGroup
              type="single"
              defaultValue="12"
              aria-label="Expected retirement tax bracket"
              value={expectedRetirementBracket.toString()}
              onValueChange={(val) => {
                if (val) setExpectedRetirementBracket(Number(val));
              }}
              className="border w-full"
            >
              {taxBracketOptions.map((bracket) => (
                <ToggleGroupItem
                  key={bracket}
                  value={bracket.toString()}
                  aria-label={`Expected retirement tax bracket ${bracket}%`}
                >
                  {bracket}%
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
          <p className="mt-1 text-gray-500 text-sm">
            Select your expected marginal tax rate during retirement.
          </p>
        </div>
        {/* No button */}
      </form>

      {/* Card-like results display */}
      {result && (
        <div className="gap-6 grid grid-cols-1 md:grid-cols-2 mt-8">
          <div className="col-span-2 bg-white shadow p-5 border border-gray-300 rounded-lg">
            <h3 className="flex items-center gap-2 mb-2 font-semibold text-blue-700 text-lg">
              Recommendation
            </h3>
            <div className="text-blue-900">{result}</div>
          </div>
        </div>
      )}
    </div>
  );
}
