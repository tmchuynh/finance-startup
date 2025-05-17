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
  const { monthlyIncome, monthlyDebtPayments, maxDebtToIncomeRatio } = inputs;
  return maxDebtToIncomeRatio * monthlyIncome - monthlyDebtPayments;
}

interface LiquidityInputs {
  liquidAssets: number;
  currentLiabilities: number;
}

export function calculateLiquidityRatio(inputs: LiquidityInputs) {
  const { liquidAssets, currentLiabilities } = inputs;
  if (currentLiabilities === 0) return Infinity;

  return liquidAssets / currentLiabilities;
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
  const brackets =
    filingStatus === "single"
      ? FEDERAL_TAX_BRACKETS_SINGLE
      : FEDERAL_TAX_BRACKETS_MARRIED;
  let rate = 0.1;
  for (let i = brackets.length - 1; i >= 0; i--) {
    if (taxableIncomeBeforeDeduction > brackets[i].threshold) {
      rate = brackets[i].rate;
      break;
    }
  }
  // Tax savings = interest * marginal rate
  return mortgageInterestPaid * rate;
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
  const monthlyRate = annualInterestRate / 12;
  const numberOfPayments = termYears * 12;
  const numerator = monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments);
  const denominator = Math.pow(1 + monthlyRate, numberOfPayments) - 1;
  const payment = principal * (numerator / denominator);
  return payment;
}

interface EmergencyFundInputs {
  monthlyExpenses: number;
  monthsOfCoverage: number;
}

export function calculateEmergencyFund(inputs: EmergencyFundInputs) {
  return inputs.monthlyExpenses * inputs.monthsOfCoverage;
}

interface CarLoanParams {
  loanAmount: number;
  annualInterestRate: number;
  termMonths: number;
}

export function calculateCarLoanPayments({
  loanAmount,
  annualInterestRate,
  termMonths,
}: CarLoanParams) {
  const monthlyRate = annualInterestRate / 12;
  const monthlyPayment =
    (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -termMonths));
  const totalPayment = monthlyPayment * termMonths;
  const totalInterest = totalPayment - loanAmount;

  return { monthlyPayment, totalPayment, totalInterest };
}

interface RefinanceParams {
  currentLoanBalance: number;
  currentInterestRate: number;
  currentRemainingTermYears: number;
  newInterestRate: number;
  newTermYears: number;
}

export function monthlyPayment(
  principal: number,
  rate: number,
  termYears: number
) {
  const monthlyRate = rate / 12;
  const n = termYears * 12;
  return (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -n));
}
export function calculateRefinanceSavings({
  currentLoanBalance,
  currentInterestRate,
  currentRemainingTermYears,
  newInterestRate,
  newTermYears,
}: RefinanceParams) {
  const currentMonthlyPayment = monthlyPayment(
    currentLoanBalance,
    currentInterestRate,
    currentRemainingTermYears
  );
  const newMonthlyPayment = monthlyPayment(
    currentLoanBalance,
    newInterestRate,
    newTermYears
  );

  const totalCurrentPayments =
    currentMonthlyPayment * currentRemainingTermYears * 12;
  const totalNewPayments = newMonthlyPayment * newTermYears * 12;

  const savings = totalCurrentPayments - totalNewPayments;

  return {
    currentMonthlyPayment,
    newMonthlyPayment,
    totalCurrentPayments,
    totalNewPayments,
    savings,
  };
}
