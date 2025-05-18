import {
  FEDERAL_TAX_BRACKETS_MARRIED,
  FEDERAL_TAX_BRACKETS_SINGLE,
} from "@/lib/constants/calculators/tax";

interface MortgageAffordabilityInputs {
  monthlyIncome: number;
  monthlyDebtPayments: number;
  maxDebtToIncomeRatio: number; // e.g., 0.36
}

export function calculateMaxMortgagePayment(
  inputs: MortgageAffordabilityInputs
) {
  let { monthlyIncome, monthlyDebtPayments, maxDebtToIncomeRatio } = inputs;
  monthlyIncome =
    typeof monthlyIncome === "number" && monthlyIncome > 0 ? monthlyIncome : 0;
  monthlyDebtPayments =
    typeof monthlyDebtPayments === "number" && monthlyDebtPayments >= 0
      ? monthlyDebtPayments
      : 0;
  maxDebtToIncomeRatio =
    typeof maxDebtToIncomeRatio === "number" &&
    maxDebtToIncomeRatio > 0 &&
    maxDebtToIncomeRatio < 1
      ? maxDebtToIncomeRatio
      : 0.36;

  if (monthlyIncome === 0) return 0;

  const maxPayment = maxDebtToIncomeRatio * monthlyIncome - monthlyDebtPayments;
  return Math.max(Math.round(maxPayment * 100) / 100, 0);
}

interface MortgageInterestInputs {
  mortgageInterestPaid: number;
  filingStatus: "single" | "married" | "head_of_household";
  taxableIncomeBeforeDeduction: number;
}

export function estimateMortgageInterestTaxSavings(
  inputs: MortgageInterestInputs
): number {
  const { mortgageInterestPaid, filingStatus, taxableIncomeBeforeDeduction } =
    inputs;
  if (mortgageInterestPaid <= 0) return 0;

  // Estimate marginal tax rate from taxable income
  let brackets;
  if (filingStatus === "single" || filingStatus === "head_of_household") {
    brackets = FEDERAL_TAX_BRACKETS_SINGLE;
  } else {
    brackets = FEDERAL_TAX_BRACKETS_MARRIED;
  }
  let rate = brackets[0].rate;
  for (let i = brackets.length - 1; i >= 0; i--) {
    if (taxableIncomeBeforeDeduction > brackets[i].threshold) {
      rate = brackets[i].rate;
      break;
    }
  }
  // Tax savings = interest * marginal rate
  return Math.round(mortgageInterestPaid * rate * 100) / 100;
}

export function estimateMortgagePayment({
  principal,
  annualInterestRate,
  termYears,
}: {
  principal: number;
  annualInterestRate: number; // e.g. 0.05 for 5%
  termYears: number;
}) {
  principal = typeof principal === "number" && principal > 0 ? principal : 0;
  annualInterestRate =
    typeof annualInterestRate === "number" && annualInterestRate >= 0
      ? annualInterestRate
      : 0;
  termYears = typeof termYears === "number" && termYears > 0 ? termYears : 1;

  const monthlyRate = annualInterestRate / 12;
  const numberOfPayments = termYears * 12;

  if (principal === 0 || numberOfPayments === 0) return 0;
  if (annualInterestRate === 0) return principal / numberOfPayments;

  const numerator = monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments);
  const denominator = Math.pow(1 + monthlyRate, numberOfPayments) - 1;
  const payment = principal * (numerator / denominator);

  return Math.round(payment * 100) / 100;
}
