"use client";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
    <div className="mx-auto pb-24 lg:pb-32 pt-6 sm:pt-12 lg:pt-16 w-10/12 md:w-11/12">
      {/* Header Section */}
      <div className="mb-8 text-center">
        <h1>IRA vs Roth IRA Decision Tool</h1>
        <p className="mb-6 text-xl">
          Make Informed Decisions About Your Retirement Savings
        </p>
        <p className="mb-4 mx-auto max-w-4xl">
          Use this tool to help determine whether a Traditional IRA or Roth IRA
          may be more suitable for your retirement savings strategy. Please fill
          out the form below with your financial information, and we will
          provide you with a recommendation based on your current and expected
          tax situation.
        </p>
        <p className="mx-auto max-w-4xl text-sm">
          <strong>Disclaimer:</strong> This tool is for informational purposes
          only and should not be considered financial advice. Please consult
          with a financial advisor or tax professional for personalized
          recommendations based on your individual circumstances.
        </p>
      </div>

      {/* Tax Bracket Information Table */}
      <div className="shadow mb-8 border rounded-lg overflow-hidden">
        <h2>2024 Federal Income Tax Brackets</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Rate</TableHead>
              <TableHead>Single</TableHead>
              <TableHead>Married Filing Jointly</TableHead>
              <TableHead>Head of Household</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>10%</TableCell>
              <TableCell>Up to $11,600</TableCell>
              <TableCell>Up to $23,200</TableCell>
              <TableCell>Up to $16,550</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>12%</TableCell>
              <TableCell>$11,601 – $47,150</TableCell>
              <TableCell>$23,201 – $94,300</TableCell>
              <TableCell>$16,551 – $63,100</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>22%</TableCell>
              <TableCell>$47,151 – $100,525</TableCell>
              <TableCell>$94,301 – $201,050</TableCell>
              <TableCell>$63,101 – $100,500</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>24%</TableCell>
              <TableCell>$100,526 – $191,950</TableCell>
              <TableCell>$201,051 – $383,900</TableCell>
              <TableCell>$100,501 – $191,950</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>32%</TableCell>
              <TableCell>$191,951 – $243,725</TableCell>
              <TableCell>$383,901 – $487,450</TableCell>
              <TableCell>$191,951 – $243,700</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>35%</TableCell>
              <TableCell>$243,726 – $609,350</TableCell>
              <TableCell>$487,451 – $731,200</TableCell>
              <TableCell>$243,701 – $609,350</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>37%</TableCell>
              <TableCell>Over $609,350</TableCell>
              <TableCell>Over $731,200</TableCell>
              <TableCell>Over $609,350</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <div className="p-4 border-t">
          <p className="text-sm">
            <strong>Source:</strong> IRS. These are marginal tax rates for 2024.
            Your tax bracket is based on your taxable income and filing status.
          </p>
        </div>
      </div>

      {/* IRA Comparison Overview Table */}
      <div className="shadow mb-8 border rounded-lg overflow-hidden">
        <h2>IRA Comparison Overview</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Feature</TableHead>
              <TableHead>Traditional IRA</TableHead>
              <TableHead>Roth IRA</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Tax Treatment</TableCell>
              <TableCell>
                Tax-deductible contributions, taxed on withdrawal
              </TableCell>
              <TableCell>
                After-tax contributions, tax-free withdrawals
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Income Limits</TableCell>
              <TableCell>No income limits for contributions</TableCell>
              <TableCell>
                Income limits apply ($138k-$153k single, $218k-$228k married)
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Required Distributions</TableCell>
              <TableCell>RMDs start at age 73</TableCell>
              <TableCell>No RMDs during lifetime</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Early Withdrawal</TableCell>
              <TableCell>10% penalty + taxes on earnings</TableCell>
              <TableCell>
                Contributions anytime; earnings after 5 years & age 59½
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Best For</TableCell>
              <TableCell>Higher current tax bracket than retirement</TableCell>
              <TableCell>Lower current tax bracket than retirement</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      {/* Calculator Form */}
      <div className="shadow mb-8 p-6 border rounded-lg">
        <h2>IRA Decision Calculator</h2>

        <form
          className="space-y-8"
          aria-label="IRA vs Roth IRA decision form"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="gap-8 grid grid-cols-1 lg:grid-cols-2">
            {/* Personal Information Section */}
            <div className="p-6 border rounded-lg">
              <h3 className="flex gap-2 items-center">
                👤 Personal Information
              </h3>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="income" className="font-medium text-sm">
                    Annual Income: ${income.toLocaleString()}
                  </Label>
                  <Slider
                    value={[income]}
                    onValueChange={(value) => setIncome(value[0])}
                    max={500000}
                    min={0}
                    step={1000}
                    className="mt-2"
                  />
                  <div className="flex justify-between mt-1 text-xs">
                    <span>$0</span>
                    <span>$500,000</span>
                  </div>
                  <p className="mt-2 text-sm">
                    Enter your adjusted gross income (AGI)
                  </p>
                </div>

                <div>
                  <Label
                    htmlFor="filingStatus"
                    className="block mb-2 font-medium text-sm"
                  >
                    Tax Filing Status
                  </Label>
                  <select
                    id="filingStatus"
                    value={filingStatus}
                    onChange={(e) =>
                      setFilingStatus(e.target.value as FilingStatus)
                    }
                    className="p-3 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 rounded-md w-full"
                  >
                    <option value="single">Single</option>
                    <option value="married">Married Filing Jointly</option>
                    <option value="head_of_household">Head of Household</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Tax Bracket Selection Section */}
            <div className="p-6 border rounded-lg">
              <h3 className="flex gap-2 items-center">
                📊 Tax Bracket Analysis
              </h3>
              <div className="space-y-6">
                <div>
                  <Label className="block mb-3 font-medium text-sm">
                    Current Tax Bracket: {currentTaxBracket}%
                  </Label>
                  <ToggleGroup
                    type="single"
                    value={currentTaxBracket.toString()}
                    onValueChange={(val) => {
                      if (val) setCurrentTaxBracket(Number(val));
                    }}
                    className="flex flex-wrap gap-2 justify-start"
                  >
                    {taxBracketOptions.map((bracket) => (
                      <ToggleGroupItem
                        key={bracket}
                        value={bracket.toString()}
                        className="px-4 py-2 text-sm"
                        aria-label={`Current tax bracket ${bracket}%`}
                      >
                        {bracket}%
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                  <p className="mt-2 text-sm">
                    Select your current marginal tax rate
                  </p>
                </div>

                <div>
                  <Label className="block mb-3 font-medium text-sm">
                    Expected Retirement Tax Bracket: {expectedRetirementBracket}
                    %
                  </Label>
                  <ToggleGroup
                    type="single"
                    value={expectedRetirementBracket.toString()}
                    onValueChange={(val) => {
                      if (val) setExpectedRetirementBracket(Number(val));
                    }}
                    className="flex flex-wrap gap-2 justify-start"
                  >
                    {taxBracketOptions.map((bracket) => (
                      <ToggleGroupItem
                        key={bracket}
                        value={bracket.toString()}
                        className="px-4 py-2 text-sm"
                        aria-label={`Expected retirement tax bracket ${bracket}%`}
                      >
                        {bracket}%
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                  <p className="mt-2 text-sm">
                    Select your expected marginal tax rate during retirement
                  </p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Results Section */}
      {result && (
        <div className="shadow mb-8 p-6 border rounded-lg">
          <h2>Recommendation</h2>

          {/* Analysis Summary */}
          <div className="mb-6 p-6 border rounded-lg">
            <h3>💡 Your Analysis Summary</h3>
            <div className="gap-4 grid grid-cols-1 md:grid-cols-3 mb-4">
              <div className="text-center">
                <div className="font-bold text-2xl">
                  ${income.toLocaleString()}
                </div>
                <div className="text-sm">Annual Income</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-2xl">{currentTaxBracket}%</div>
                <div className="text-sm">Current Tax Bracket</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-2xl">
                  {expectedRetirementBracket}%
                </div>
                <div className="text-sm">Expected Retirement Bracket</div>
              </div>
            </div>

            {/* Eligibility Check */}
            <div className="mt-4 p-4 border rounded">
              <h4 className="mb-2">Roth IRA Eligibility</h4>
              {(() => {
                const rothLimit = getRothIncomeLimit(filingStatus);
                const isEligible = income <= rothLimit;
                return (
                  <div
                    className={`flex items-center gap-2 ${
                      isEligible ? "" : "text-red-700"
                    }`}
                  >
                    <span className="text-lg">{isEligible ? "✅" : "❌"}</span>
                    <span>
                      {isEligible
                        ? `You are eligible for Roth IRA contributions (income below $${rothLimit.toLocaleString()})`
                        : `Income exceeds Roth IRA limit of $${rothLimit.toLocaleString()} for ${filingStatus} filers`}
                    </span>
                  </div>
                );
              })()}
            </div>
          </div>

          {/* Recommendation Banner */}
          {(() => {
            const rothLimit = getRothIncomeLimit(filingStatus);
            const isRothEligible = income <= rothLimit;
            const recommendsTraditional =
              currentTaxBracket > expectedRetirementBracket;
            const recommendsRoth =
              currentTaxBracket < expectedRetirementBracket;

            let bannerColor = " ";
            let textColor = "";
            let recommendation = "Consider Both Options";

            if (!isRothEligible) {
              bannerColor = "bg-orange-50 border-orange-200";
              textColor = "text-orange-800";
              recommendation = "Traditional IRA Recommended";
            } else if (recommendsTraditional) {
              bannerColor = " ";
              textColor = "";
              recommendation = "Traditional IRA Recommended";
            } else if (recommendsRoth) {
              bannerColor = " ";
              textColor = "";
              recommendation = "Roth IRA Recommended";
            }

            return (
              <div className={`p-4 rounded-lg mb-6 ${bannerColor}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className={` ${textColor}`}>{recommendation}</h3>
                    <p className={`text-sm ${textColor.replace("800", "600")}`}>
                      {!isRothEligible
                        ? "Income exceeds Roth IRA limits"
                        : recommendsTraditional
                        ? `Save ${
                            currentTaxBracket - expectedRetirementBracket
                          }% in taxes now`
                        : recommendsRoth
                        ? `Save ${
                            expectedRetirementBracket - currentTaxBracket
                          }% in taxes later`
                        : "Tax brackets are equal - both options viable"}
                    </p>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Detailed Recommendation */}
          <div className="mb-6 p-6 border rounded-lg">
            <h3>📋 Detailed Recommendation</h3>
            <p className="leading-relaxed">{result}</p>
          </div>

          {/* Comparison Table */}
          <div className="shadow mb-6 border rounded-lg overflow-hidden">
            <h3>Your Scenario Analysis</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Factor</TableHead>
                  <TableHead className="">Traditional IRA</TableHead>
                  <TableHead className="">Roth IRA</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Current Tax Benefit</TableCell>
                  <TableCell>
                    ✅ ${((7000 * currentTaxBracket) / 100).toLocaleString()}{" "}
                    deduction (max contribution)
                  </TableCell>
                  <TableCell>❌ No immediate deduction</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Income Eligibility</TableCell>
                  <TableCell>✅ No income limits</TableCell>
                  <TableCell>
                    {income <= getRothIncomeLimit(filingStatus)
                      ? "✅ Income within limits"
                      : "❌ Income exceeds limits"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Retirement Withdrawals</TableCell>
                  <TableCell>
                    Taxed at {expectedRetirementBracket}% rate
                  </TableCell>
                  <TableCell>✅ Tax-free withdrawals</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Required Distributions</TableCell>
                  <TableCell>❌ RMDs required at age 73</TableCell>
                  <TableCell>✅ No RMDs during lifetime</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Early Access</TableCell>
                  <TableCell>❌ 10% penalty + taxes</TableCell>
                  <TableCell>✅ Contributions anytime penalty-free</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Estate Planning</TableCell>
                  <TableCell>Heirs pay income tax</TableCell>
                  <TableCell>✅ Tax-free inheritance</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      )}

      {/* Important Considerations */}
      <div className="mb-8 p-6 border rounded-lg">
        <h3>⚠️ Important Considerations</h3>
        <ul className="space-y-2">
          <li>
            <strong>Income Limits:</strong> Roth IRA contributions have income
            limits that may change annually
          </li>
          <li>
            <strong>5-Year Rule:</strong> Roth earnings withdrawals require
            account to be open 5+ years
          </li>
          <li>
            <strong>Diversification:</strong> Consider having both Traditional
            and Roth accounts for tax diversification
          </li>
          <li>
            <strong>Future Tax Changes:</strong> Tax brackets and rules may
            change in the future
          </li>
          <li>
            <strong>State Taxes:</strong> Consider your state's tax treatment of
            retirement accounts
          </li>
          <li>
            <strong>Employer Plans:</strong> 401(k) options may affect your IRA
            strategy
          </li>
          <li>
            <strong>Professional Advice:</strong> Consult a financial advisor
            for personalized recommendations
          </li>
        </ul>
      </div>

      {/* Disclaimer */}
      <div className="p-6 border rounded-lg">
        <h3>📋 Important Disclaimer</h3>
        <p className="text-sm">
          <strong>Educational Tool Only:</strong> This calculator provides
          general guidance based on current tax brackets and IRS rules. It does
          not constitute financial, tax, or investment advice. Individual
          circumstances vary significantly, and tax laws are subject to change.
          Income limits for Roth IRA contributions may change annually. Please
          consult with a qualified financial advisor, tax professional, or
          attorney before making retirement planning decisions. Past performance
          does not guarantee future results.
        </p>
      </div>
    </div>
  );
}
