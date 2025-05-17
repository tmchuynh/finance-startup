interface UnemploymentDurationInputs {
  savings: number;
  monthlyExpenses: number;
  monthlyUnemploymentBenefit: number;
}

export function estimateUnemploymentDuration(
  inputs: UnemploymentDurationInputs
) {
  const netMonthlyShortfall =
    inputs.monthlyExpenses - inputs.monthlyUnemploymentBenefit;
  if (netMonthlyShortfall <= 0) {
    return Infinity; // Benefits cover expenses fully
  }
  return inputs.savings / netMonthlyShortfall;
}

interface UnemploymentEmergencyFundInputs {
  monthlyExpenses: number;
  expectedUnemploymentMonths: number;
}

export function calculateUnemploymentEmergencyFund(
  inputs: UnemploymentEmergencyFundInputs
) {
  return inputs.monthlyExpenses * inputs.expectedUnemploymentMonths;
}

interface UnemploymentBenefitInputs {
  previousMonthlyIncome: number;
  replacementRate: number; // decimal, e.g., 0.6 for 60%
  maxBenefit?: number; // Optional cap on benefits
}

export function calculateUnemploymentBenefit(
  inputs: UnemploymentBenefitInputs
) {
  const { previousMonthlyIncome, replacementRate, maxBenefit } = inputs;
  const estimatedBenefit = previousMonthlyIncome * replacementRate;
  if (maxBenefit !== undefined) {
    return Math.min(estimatedBenefit, maxBenefit);
  }
  return estimatedBenefit;
}

interface UnemploymentBudgetInputs {
  totalIncome: number;
  rentPercent: number;
  foodPercent: number;
  utilitiesPercent: number;
  transportationPercent: number;
  healthcarePercent: number;
  savingsPercent: number;
  miscPercent: number;
}

export function calculateUnemploymentBudget(inputs: UnemploymentBudgetInputs) {
  const {
    totalIncome,
    rentPercent,
    foodPercent,
    utilitiesPercent,
    transportationPercent,
    healthcarePercent,
    savingsPercent,
    miscPercent,
  } = inputs;

  return {
    rent: (rentPercent / 100) * totalIncome,
    food: (foodPercent / 100) * totalIncome,
    utilities: (utilitiesPercent / 100) * totalIncome,
    transportation: (transportationPercent / 100) * totalIncome,
    healthcare: (healthcarePercent / 100) * totalIncome,
    savings: (savingsPercent / 100) * totalIncome,
    miscellaneous: (miscPercent / 100) * totalIncome,
  };
}

interface JobSearchCostPercentages {
  resumeServicesPercent: number;
  travelPercent: number;
  interviewClothesPercent: number;
  trainingPercent: number;
  miscellaneousPercent: number;
}

export function calculateJobSearchCosts(
  totalBudget: number,
  percentages: JobSearchCostPercentages
) {
  return {
    resumeServices: (percentages.resumeServicesPercent / 100) * totalBudget,
    travel: (percentages.travelPercent / 100) * totalBudget,
    interviewClothes: (percentages.interviewClothesPercent / 100) * totalBudget,
    training: (percentages.trainingPercent / 100) * totalBudget,
    miscellaneous: (percentages.miscellaneousPercent / 100) * totalBudget,
  };
}

interface JobSearchExpenses {
  resumeServices: number;
  travelCosts: number;
  interviewClothing: number;
  certifications: number;
  miscellaneous: number;
}

export function calculateTotalJobSearchExpenses(expenses: JobSearchExpenses) {
  return (
    expenses.resumeServices +
    expenses.travelCosts +
    expenses.interviewClothing +
    expenses.certifications +
    expenses.miscellaneous
  );
}

interface BenefitExhaustionInputs {
  startDate: Date;
  maxBenefitWeeks: number;
}

export function calculateBenefitExhaustionDate(
  inputs: BenefitExhaustionInputs
): Date {
  const { startDate, maxBenefitWeeks } = inputs;
  const exhaustionDate = new Date(startDate);
  exhaustionDate.setDate(exhaustionDate.getDate() + maxBenefitWeeks * 7);
  return exhaustionDate;
}
