interface BasicNeedsInputs {
  totalIncome: number;
  minimumRent: number;
  minimumFood: number;
  minimumUtilities: number;
  minimumHealthcare: number;
}

export function allocateBasicNeeds(inputs: BasicNeedsInputs) {
  const {
    totalIncome,
    minimumRent,
    minimumFood,
    minimumUtilities,
    minimumHealthcare,
  } = inputs;
  const totalMinimums =
    minimumRent + minimumFood + minimumUtilities + minimumHealthcare;

  if (totalIncome < totalMinimums) {
    // Prioritize proportionally if income insufficient
    const ratio = totalIncome / totalMinimums;
    return {
      rent: minimumRent * ratio,
      food: minimumFood * ratio,
      utilities: minimumUtilities * ratio,
      healthcare: minimumHealthcare * ratio,
      shortfall: totalMinimums - totalIncome,
    };
  }

  return {
    rent: minimumRent,
    food: minimumFood,
    utilities: minimumUtilities,
    healthcare: minimumHealthcare,
    surplus: totalIncome - totalMinimums,
  };
}

interface FamilyBudgetInputs {
  totalIncome: number;
  housingPercent: number; // e.g., 30 for 30%
  foodPercent: number;
  educationPercent: number;
  transportationPercent: number;
  healthcarePercent: number;
  entertainmentPercent: number;
  savingsPercent: number;
  miscPercent: number;
}

export function calculateFamilyBudget(inputs: FamilyBudgetInputs) {
  const {
    totalIncome,
    housingPercent,
    foodPercent,
    educationPercent,
    transportationPercent,
    healthcarePercent,
    entertainmentPercent,
    savingsPercent,
    miscPercent,
  } = inputs;

  return {
    housing: (housingPercent / 100) * totalIncome,
    food: (foodPercent / 100) * totalIncome,
    education: (educationPercent / 100) * totalIncome,
    transportation: (transportationPercent / 100) * totalIncome,
    healthcare: (healthcarePercent / 100) * totalIncome,
    entertainment: (entertainmentPercent / 100) * totalIncome,
    savings: (savingsPercent / 100) * totalIncome,
    miscellaneous: (miscPercent / 100) * totalIncome,
  };
}

interface Expenses {
  fixedExpenses: number[];
  variableExpenses: number[];
}

export function calculateTotalMonthlyExpenses(expenses: Expenses) {
  const totalFixed = expenses.fixedExpenses.reduce((sum, e) => sum + e, 0);
  const totalVariable = expenses.variableExpenses.reduce(
    (sum, e) => sum + e,
    0
  );
  return totalFixed + totalVariable;
}

interface BudgetComparisonParams {
  budgetedAmount: number;
  actualAmount: number;
}

export function calculateBudgetVariance({
  budgetedAmount,
  actualAmount,
}: BudgetComparisonParams) {
  const variance = actualAmount - budgetedAmount;
  const percentVariance = (variance / budgetedAmount) * 100;

  return { variance, percentVariance };
}

export function calculateInflationImpact(
  currentAmount: number,
  inflationRate: number,
  years: number
): number {
  return currentAmount / Math.pow(1 + inflationRate, years);
}

interface IraDecisionParams {
  currentIncome: number;
  taxBracket: number; // Current marginal tax rate e.g., 0.22
  expectedRetirementTaxBracket: number; // Expected marginal rate at retirement
  incomeLimitForRoth: number; // E.g. $144,000 single for 2025
  plansToWithdrawEarly: boolean;
}

export function decideIRAType({
  currentIncome,
  taxBracket,
  expectedRetirementTaxBracket,
  incomeLimitForRoth,
  plansToWithdrawEarly,
}: IraDecisionParams): "Traditional IRA" | "Roth IRA" | "Neither" {
  if (currentIncome > incomeLimitForRoth) return "Traditional IRA"; // Roth not allowed

  if (plansToWithdrawEarly) {
    // Roth contributions can be withdrawn anytime tax and penalty-free
    return "Roth IRA";
  }

  if (taxBracket > expectedRetirementTaxBracket) {
    // Better to defer taxes now
    return "Traditional IRA";
  }

  // Otherwise, pay taxes now and withdraw tax-free later
  return "Roth IRA";
}

interface SocialSecurityParams {
  age: number;
  fullRetirementAge?: number; // default 67
  averageIndexedMonthlyEarnings: number; // AIME
}

export function estimateSocialSecurityBenefit({
  age,
  fullRetirementAge = 67,
  averageIndexedMonthlyEarnings,
}: SocialSecurityParams): number {
  const earlyRetirementAge = 62;
  const delayedRetirementAge = 70;

  // Primary Insurance Amount (PIA) calculation (simplified 2024 bend points):
  // Up to $1,115 = 90%, $1,115-$6,721 = 32%, over $6,721 = 15%
  let pia = 0;
  if (averageIndexedMonthlyEarnings <= 1115) {
    pia = averageIndexedMonthlyEarnings * 0.9;
  } else if (averageIndexedMonthlyEarnings <= 6721) {
    pia = 1115 * 0.9 + (averageIndexedMonthlyEarnings - 1115) * 0.32;
  } else {
    pia =
      1115 * 0.9 +
      (6721 - 1115) * 0.32 +
      (averageIndexedMonthlyEarnings - 6721) * 0.15;
  }

  // Adjust for claiming age
  let adjustmentFactor = 1;
  if (age < fullRetirementAge) {
    // Early claiming reduces benefits roughly 6-7% per year before FRA
    const yearsEarly = fullRetirementAge - age;
    adjustmentFactor = 1 - 0.06 * yearsEarly;
  } else if (age > fullRetirementAge) {
    // Delayed claiming increases benefit about 8% per year after FRA up to 70
    const yearsDelayed =
      Math.min(age, delayedRetirementAge) - fullRetirementAge;
    adjustmentFactor = 1 + 0.08 * yearsDelayed;
  }

  return Math.max(pia * adjustmentFactor, 0);
}

interface FireSimulatorParams {
  currentSavings: number;
  annualContribution: number;
  annualExpenses: number;
  annualReturnRate: number;
  yearsToRetirement: number;
  fatFireMultiplier?: number; // default 25x expenses
}

export function simulateFIREStatus({
  currentSavings,
  annualContribution,
  annualExpenses,
  annualReturnRate,
  yearsToRetirement,
  fatFireMultiplier = 25,
}: FireSimulatorParams) {
  // Calculate future value of savings + contributions
  let futureValue = currentSavings;
  for (let i = 0; i < yearsToRetirement; i++) {
    futureValue = (futureValue + annualContribution) * (1 + annualReturnRate);
  }

  const coastFireTarget = annualExpenses / annualReturnRate; // Principal needed to cover expenses indefinitely
  const fatFireTarget = annualExpenses * fatFireMultiplier;

  return {
    futureValue,
    coastFireTarget,
    fatFireTarget,
    hasReachedCoastFIRE: futureValue >= coastFireTarget,
    hasReachedFatFIRE: futureValue >= fatFireTarget,
  };
}

interface RetirementReadinessParams {
  currentSavings: number;
  annualExpenses: number;
  age: number;
  expectedRetirementAge: number;
  expectedReturnRate: number; // e.g., 0.06
  yearsInRetirement: number; // e.g., 25
}

export function calculateRetirementReadiness({
  currentSavings,
  annualExpenses,
  age,
  expectedRetirementAge,
  expectedReturnRate,
  yearsInRetirement,
}: RetirementReadinessParams): number {
  const yearsToRetirement = expectedRetirementAge - age;
  if (yearsToRetirement <= 0) return 100;

  // Estimate required retirement savings (simple: annual expenses * years in retirement)
  const requiredSavings = annualExpenses * yearsInRetirement;

  // Project current savings growth until retirement
  const projectedSavings =
    currentSavings * Math.pow(1 + expectedReturnRate, yearsToRetirement);

  // Score as percentage of required savings
  const readinessPercent = Math.min(
    100,
    (projectedSavings / requiredSavings) * 100
  );

  return readinessPercent;
}

export function calculateBudgetBreakdown({
  income,
  allocations, // e.g. { housing: 0.3, food: 0.15, savings: 0.2, entertainment: 0.1, other: 0.25 }
}: {
  income: number;
  allocations: Record<string, number>;
}) {
  const breakdown: Record<string, number> = {};
  for (const category in allocations) {
    breakdown[category] = income * allocations[category];
  }
  return breakdown;
}

export function calculateCompoundInterest({
  principal,
  annualInterestRate,
  timesCompoundedPerYear,
  years,
}: {
  principal: number;
  annualInterestRate: number;
  timesCompoundedPerYear: number;
  years: number;
}) {
  return (
    principal *
    Math.pow(
      1 + annualInterestRate / timesCompoundedPerYear,
      timesCompoundedPerYear * years
    )
  );
}

export function calculateROI({ gain, cost }: { gain: number; cost: number }) {
  return ((gain - cost) / cost) * 100;
}

export function calculatePercentChange({
  oldValue,
  newValue,
}: {
  oldValue: number;
  newValue: number;
}) {
  return ((newValue - oldValue) / oldValue) * 100;
}

export function calculateSalesTax({
  itemPrice,
  salesTaxRate,
}: {
  itemPrice: number;
  salesTaxRate: number;
}) {
  const total = itemPrice * (1 + salesTaxRate / 100);
  const tax = total - itemPrice;
  return { total, tax };
}

export function convertHourlyToAnnual({
  hourlyRate,
  hoursPerWeek,
  weeksPerYear,
}: {
  hourlyRate: number;
  hoursPerWeek: number;
  weeksPerYear: number;
}) {
  return hourlyRate * hoursPerWeek * weeksPerYear;
}

export function calculateSimpleInterestLoan({
  principal,
  interestRate,
  termYears,
}: {
  principal: number;
  interestRate: number;
  termYears: number;
}) {
  const interest = principal * interestRate * termYears;
  const totalRepayment = principal + interest;
  return { interest, totalRepayment };
}

export function calculateInflationAdjustedFutureValue({
  currentValue,
  inflationRate,
  years,
}: {
  currentValue: number;
  inflationRate: number;
  years: number;
}) {
  return currentValue * Math.pow(1 + inflationRate, years);
}
