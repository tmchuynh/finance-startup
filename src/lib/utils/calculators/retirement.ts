import {
  FEDERAL_TAX_BRACKETS_SINGLE,
  FEDERAL_TAX_BRACKETS_MARRIED,
} from "@/lib/constants/calculators/tax";

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
  const employerContribution =
    Math.min(annualContribution / annualSalary, employerMatchLimit) *
    employerMatchRate *
    annualSalary;
  const totalAnnualContribution = annualContribution + employerContribution;

  let balance = currentBalance;
  for (let i = 0; i < years; i++) {
    balance = (balance + totalAnnualContribution) * (1 + annualReturnRate);
  }

  return balance;
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
  const employerContribution =
    Math.min(annualContribution / annualSalary, employerMatchLimit) *
    employerMatchRate *
    annualSalary;
  const totalAnnualContribution = annualContribution + employerContribution;

  let balance = currentBalance;

  for (let i = 0; i < years; i++) {
    balance = (balance + totalAnnualContribution) * (1 + annualInterestRate);
  }

  return balance;
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
  const months = years * 12;
  const monthlyRate = annualInterestRate / 12;
  let futureValue = currentSavings * Math.pow(1 + monthlyRate, months);

  for (let i = 0; i < months; i++) {
    futureValue +=
      monthlyContribution * Math.pow(1 + monthlyRate, months - i - 1);
  }

  return futureValue;
}

interface RetirementContributionInputs {
  contributionAmount: number;
  filingStatus: "single" | "married" | "head_of_household";
  taxableIncome: number; // Before contribution
  marginalTaxRate?: number; // Optional override
}

export function estimateRetirementTaxSavings(
  inputs: RetirementContributionInputs
): number {
  const { contributionAmount, filingStatus, taxableIncome, marginalTaxRate } =
    inputs;

  // Use marginal tax rate if provided, else estimate from brackets
  const rate =
    marginalTaxRate ??
    (() => {
      const brackets =
        filingStatus === "single"
          ? FEDERAL_TAX_BRACKETS_SINGLE
          : FEDERAL_TAX_BRACKETS_MARRIED;
      for (let i = brackets.length - 1; i >= 0; i--) {
        if (taxableIncome > brackets[i].threshold) return brackets[i].rate;
      }
      return 0.1;
    })();

  // Tax savings = contribution * marginal rate
  return contributionAmount * rate;
}
