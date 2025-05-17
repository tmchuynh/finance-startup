interface ChildcareCostInputs {
  hourlyRate: number;
  hoursPerWeek: number;
  weeksPerYear: number;
}

export function calculateChildcareCost(inputs: ChildcareCostInputs) {
  return inputs.hourlyRate * inputs.hoursPerWeek * inputs.weeksPerYear;
}

interface HealthcareSubsidyInputs {
  annualIncome: number;
  familySize: number;
  federalPovertyLevel: number; // e.g., $13,590 for single in 2023, adjust as needed
}

export function estimateHealthcareSubsidy(inputs: HealthcareSubsidyInputs) {
  const { annualIncome, familySize, federalPovertyLevel } = inputs;
  const adjustedFPL = federalPovertyLevel * familySize;
  const incomeRatio = annualIncome / adjustedFPL;

  // Subsidy eligibility typically between 100%-400% FPL, rough scale:
  if (incomeRatio < 1) {
    return "Full subsidy likely";
  }
  if (incomeRatio >= 1 && incomeRatio <= 4) {
    return "Partial subsidy possible";
  }
  return "No subsidy expected";
}

interface VacationBudgetInputs {
  travelCost: number;
  lodgingCost: number;
  foodCost: number;
  activitiesCost: number;
  miscCost: number;
}

export function calculateVacationBudget(inputs: VacationBudgetInputs) {
  return (
    inputs.travelCost +
    inputs.lodgingCost +
    inputs.foodCost +
    inputs.activitiesCost +
    inputs.miscCost
  );
}

interface CollegeSavingsInputs {
  totalCollegeCostPerChild: number[];
  yearsToSavePerChild: number[];
  annualInterestRate: number; // decimal e.g., 0.05
}

export function calculateMonthlySavingsMultipleChildren(
  inputs: CollegeSavingsInputs
) {
  const { totalCollegeCostPerChild, yearsToSavePerChild, annualInterestRate } =
    inputs;
  const monthlyInterestRate = annualInterestRate / 12;
  let totalMonthlySavings = 0;

  for (let i = 0; i < totalCollegeCostPerChild.length; i++) {
    const months = yearsToSavePerChild[i] * 12;
    if (annualInterestRate === 0) {
      totalMonthlySavings += totalCollegeCostPerChild[i] / months;
    } else {
      totalMonthlySavings +=
        (totalCollegeCostPerChild[i] * monthlyInterestRate) /
        (Math.pow(1 + monthlyInterestRate, months) - 1);
    }
  }

  return totalMonthlySavings;
}

export function estimateEmergencyFund({
  monthlyExpenses,
  coverageMonths = 6,
}: {
  monthlyExpenses: number;
  coverageMonths?: number;
}) {
  return monthlyExpenses * coverageMonths;
}

export function calculateHSATaxSavings({
  annualContribution,
  marginalTaxRate,
}: {
  annualContribution: number;
  marginalTaxRate: number;
}) {
  return annualContribution * marginalTaxRate;
}

export function calculateSinkingFund(
  targetAmount: number,
  currentAmount: number,
  monthsRemaining: number
) {
  const remainingAmount = targetAmount - currentAmount;
  const monthlyContribution = remainingAmount / monthsRemaining;
  return {
    remainingAmount,
    monthlyContribution,
  };
}

interface ChildTaxCreditInputs {
  numChildren: number;
  modifiedAGI: number;
  filingStatus: "single" | "married" | "head_of_household";
}

export function estimateChildTaxCredit(inputs: ChildTaxCreditInputs): number {
  const { numChildren, modifiedAGI, filingStatus } = inputs;
  if (numChildren === 0) return 0;

  const creditPerChild = 2000;
  let phaseOutStart = 200000; // Single filer threshold
  if (filingStatus === "married") phaseOutStart = 400000;
  else if (filingStatus === "head_of_household") phaseOutStart = 200000;

  const totalCredit = numChildren * creditPerChild;

  if (modifiedAGI <= phaseOutStart) return totalCredit;

  // Phase-out: credit reduced by $50 for each $1000 over threshold
  const excess = modifiedAGI - phaseOutStart;
  const reduction = Math.floor(excess / 1000) * 50;
  const creditAfterPhaseOut = Math.max(totalCredit - reduction, 0);
  return creditAfterPhaseOut;
}

export function calculateHomeAffordability({
  grossAnnualIncome,
  monthlyDebts,
  downPayment,
  interestRate,
  loanTermYears,
  dtiLimit = 0.36,
}: {
  grossAnnualIncome: number;
  monthlyDebts: number;
  downPayment: number;
  interestRate: number;
  loanTermYears: number;
  dtiLimit?: number;
}) {
  const monthlyIncome = grossAnnualIncome / 12;
  const maxAffordableMortgagePayment = monthlyIncome * dtiLimit - monthlyDebts;

  const monthlyInterestRate = interestRate / 12;
  const numPayments = loanTermYears * 12;

  const mortgageAmount =
    (maxAffordableMortgagePayment *
      (1 - Math.pow(1 + monthlyInterestRate, -numPayments))) /
    monthlyInterestRate;
  const totalHomePrice = mortgageAmount + downPayment;

  return {
    maxMonthlyPayment: maxAffordableMortgagePayment,
    estimatedMortgageAmount: mortgageAmount,
    estimatedMaxHomePrice: totalHomePrice,
  };
}
