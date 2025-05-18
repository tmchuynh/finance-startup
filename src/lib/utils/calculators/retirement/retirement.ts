import {
  FEDERAL_TAX_BRACKETS_MARRIED,
  FEDERAL_TAX_BRACKETS_SINGLE,
} from "@/lib/constants/calculators/tax";
import { calculateHSATaxSavings } from "../tax/return";
import { estimateW2IncomeTaxesWithBrackets } from "../tax/tax";

interface Growth401kParams {
  currentBalance: number;
  annualContribution: number;
  employerMatchRate?: number; // e.g., 0.5 means 50% match
  employerMatchLimit?: number; // e.g., 0.06 means match up to 6% of salary
  annualSalary: number;
  annualReturnRate: number; // e.g., 0.07 for 7%
  years: number;
}

export function calculate401kGrowth({
  currentBalance,
  annualContribution,
  employerMatchRate = 0.5,
  employerMatchLimit = 0.06,
  annualSalary,
  annualReturnRate,
  years,
}: Growth401kParams): number {
  // Clamp and validate inputs
  currentBalance =
    typeof currentBalance === "number" && currentBalance >= 0
      ? currentBalance
      : 0;
  annualContribution =
    typeof annualContribution === "number" && annualContribution >= 0
      ? annualContribution
      : 0;
  employerMatchRate =
    typeof employerMatchRate === "number" && employerMatchRate >= 0
      ? employerMatchRate
      : 0.5;
  employerMatchLimit =
    typeof employerMatchLimit === "number" && employerMatchLimit >= 0
      ? employerMatchLimit
      : 0.06;
  annualSalary =
    typeof annualSalary === "number" && annualSalary > 0 ? annualSalary : 1;
  annualReturnRate =
    typeof annualReturnRate === "number" && annualReturnRate >= 0
      ? annualReturnRate
      : 0;
  years = typeof years === "number" && years > 0 ? years : 0;

  // Employer match is up to employerMatchLimit * salary, at employerMatchRate
  const employeeContributionPct = Math.min(
    annualContribution / annualSalary,
    employerMatchLimit
  );
  const employerContribution =
    employeeContributionPct * employerMatchRate * annualSalary;
  const totalAnnualContribution = annualContribution + employerContribution;

  let balance = currentBalance;
  for (let i = 0; i < years; i++) {
    balance = (balance + totalAnnualContribution) * (1 + annualReturnRate);
  }

  return Math.round(balance * 100) / 100;
}

export function estimate401kBalance({
  currentBalance,
  annualContribution,
  employerMatchRate = 0.5, // e.g. 50% match
  employerMatchLimit = 0.06, // up to 6% of salary matched
  annualSalary,
  annualInterestRate,
  years,
}: {
  currentBalance: number;
  annualContribution: number;
  employerMatchRate?: number;
  employerMatchLimit?: number;
  annualSalary: number;
  annualInterestRate: number;
  years: number;
}) {
  // Clamp and validate inputs for realism
  currentBalance =
    typeof currentBalance === "number" && currentBalance >= 0
      ? currentBalance
      : 0;
  annualContribution =
    typeof annualContribution === "number" && annualContribution >= 0
      ? annualContribution
      : 0;
  employerMatchRate =
    typeof employerMatchRate === "number" && employerMatchRate >= 0
      ? employerMatchRate
      : 0.5;
  employerMatchLimit =
    typeof employerMatchLimit === "number" && employerMatchLimit >= 0
      ? employerMatchLimit
      : 0.06;
  annualSalary =
    typeof annualSalary === "number" && annualSalary > 0 ? annualSalary : 1;
  annualInterestRate =
    typeof annualInterestRate === "number" && annualInterestRate >= 0
      ? annualInterestRate
      : 0;
  years = typeof years === "number" && years > 0 ? years : 0;

  // Employer match is up to employerMatchLimit * salary, at employerMatchRate
  const employeeContributionPct = Math.min(
    annualContribution / annualSalary,
    employerMatchLimit
  );
  const employerContribution =
    employeeContributionPct * employerMatchRate * annualSalary;
  const totalAnnualContribution = annualContribution + employerContribution;

  let balance = currentBalance;
  for (let i = 0; i < years; i++) {
    balance = (balance + totalAnnualContribution) * (1 + annualInterestRate);
  }

  return Math.round(balance * 100) / 100;
}

export function estimateRetirementSavings({
  currentSavings,
  monthlyContribution,
  annualInterestRate,
  years,
}: {
  currentSavings: number;
  monthlyContribution: number;
  annualInterestRate: number;
  years: number;
}) {
  // Clamp and validate inputs for realism
  currentSavings =
    typeof currentSavings === "number" && currentSavings >= 0
      ? currentSavings
      : 0;
  monthlyContribution =
    typeof monthlyContribution === "number" && monthlyContribution >= 0
      ? monthlyContribution
      : 0;
  annualInterestRate =
    typeof annualInterestRate === "number" && annualInterestRate >= 0
      ? annualInterestRate
      : 0;
  years = typeof years === "number" && years > 0 ? years : 0;

  const months = years * 12;
  const monthlyRate = annualInterestRate / 12;
  let futureValue = currentSavings * Math.pow(1 + monthlyRate, months);

  for (let i = 0; i < months; i++) {
    futureValue +=
      monthlyContribution * Math.pow(1 + monthlyRate, months - i - 1);
  }

  return Math.round(futureValue * 100) / 100;
}

interface RetirementContributionInputs {
  contributionAmount: number;
  filingStatus: "single" | "married" | "head_of_household";
  taxableIncome: number; // Before contribution
  marginalTaxRate?: number; // Optional override
}

export function estimateRetirementTaxSavings(
  inputs: RetirementContributionInputs
): {
  taxSavings: number;
  marginalRate: number;
  explanation: string;
  hsaTaxSavings: number;
} {
  const { contributionAmount, filingStatus, taxableIncome, marginalTaxRate } =
    inputs;

  // Use marginal tax rate if provided, else estimate from brackets
  let rate: number;
  if (typeof marginalTaxRate === "number" && marginalTaxRate > 0) {
    rate = marginalTaxRate;
  } else {
    // Use tax brackets for marginal rate
    const brackets =
      filingStatus === "single" || filingStatus === "head_of_household"
        ? FEDERAL_TAX_BRACKETS_SINGLE
        : FEDERAL_TAX_BRACKETS_MARRIED;
    rate = 0.1;
    for (let i = brackets.length - 1; i >= 0; i--) {
      if (taxableIncome > brackets[i].threshold) {
        rate = brackets[i].rate;
        break;
      }
    }
  }

  type MappedFilingStatus = "single" | "married" | "headOfHousehold";

  // Convert filing status to match the expected FilingStatus type for tax functions
  const mappedFilingStatus: MappedFilingStatus =
    filingStatus === "head_of_household" ? "headOfHousehold" : filingStatus;

  // Use tax.ts function to estimate actual tax savings from deduction
  const before = estimateW2IncomeTaxesWithBrackets({
    annualSalary: taxableIncome,
    filingStatus: mappedFilingStatus,
  });
  const after = estimateW2IncomeTaxesWithBrackets({
    annualSalary: Math.max(taxableIncome - contributionAmount, 0),
    filingStatus: mappedFilingStatus,
  });
  const actualTaxSavings =
    Math.round((before.totalTax - after.totalTax) * 100) / 100;

  // HSA tax savings for comparison (uses the same marginal rate)
  const hsaTaxSavings =
    Math.round(
      calculateHSATaxSavings({
        annualContribution: contributionAmount,
        marginalTaxRate: rate,
      }) * 100
    ) / 100;

  return {
    taxSavings: actualTaxSavings,
    marginalRate: rate,
    explanation: `A contribution of $${contributionAmount} at a marginal tax rate of ${Math.round(
      rate * 100
    )}% saves $${actualTaxSavings} in taxes (using IRS deduction logic). HSA tax savings at the same rate would be $${hsaTaxSavings}.`,
    hsaTaxSavings,
  };
}
