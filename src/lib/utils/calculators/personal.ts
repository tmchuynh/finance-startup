interface SavingsGoalParams {
  targetAmount: number;
  currentSavings: number;
  yearsToGoal: number;
  annualReturnRate: number;
}

export function calculateMonthlySavings({
  targetAmount,
  currentSavings,
  yearsToGoal,
  annualReturnRate,
}: SavingsGoalParams): number {
  const months = yearsToGoal * 12;
  const monthlyRate = annualReturnRate / 12;

  // Future value of current savings
  const fvCurrent = currentSavings * Math.pow(1 + monthlyRate, months);

  // Monthly savings needed to reach target
  const monthlySavings =
    ((targetAmount - fvCurrent) * monthlyRate) /
    (Math.pow(1 + monthlyRate, months) - 1);

  return monthlySavings > 0 ? monthlySavings : 0;
}

export function calculateMonthlySavingsGoal({
  goalAmount,
  currentSavings,
  annualInterestRate,
  months,
}: {
  goalAmount: number;
  currentSavings: number;
  annualInterestRate: number;
  months: number;
}) {
  const monthlyRate = annualInterestRate / 12;
  const numerator =
    goalAmount - currentSavings * Math.pow(1 + monthlyRate, months);
  const denominator = (Math.pow(1 + monthlyRate, months) - 1) / monthlyRate;
  return numerator / denominator;
}

export function compareRentVsBuy({
  monthlyRent,
  homePrice,
  downPayment,
  loanRate,
  termYears,
  propertyTaxRate,
  annualMaintenance,
  appreciationRate,
}: {
  monthlyRent: number;
  homePrice: number;
  downPayment: number;
  loanRate: number;
  termYears: number;
  propertyTaxRate: number;
  annualMaintenance: number;
  appreciationRate: number;
}) {
  const totalRent = monthlyRent * 12 * termYears;
  const loanAmount = homePrice - downPayment;
  const mortgageInterest = loanAmount * loanRate * termYears;
  const propertyTax = homePrice * propertyTaxRate * termYears;
  const totalMaintenance = annualMaintenance * termYears;
  const totalBuyCost =
    downPayment + mortgageInterest + propertyTax + totalMaintenance;
  const futureValue = homePrice * Math.pow(1 + appreciationRate, termYears);

  return {
    totalRent,
    totalBuyCost,
    homeValueAfterAppreciation: futureValue,
    netCostOfBuying: totalBuyCost - (futureValue - homePrice),
  };
}

interface ExpenseVarianceInputs {
  budgetedExpense: number;
  actualExpense: number;
}

export function calculateExpenseVariance(inputs: ExpenseVarianceInputs) {
  const { budgetedExpense, actualExpense } = inputs;
  const variance = actualExpense - budgetedExpense;
  const percentVariance = budgetedExpense
    ? (variance / budgetedExpense) * 100
    : 0;
  return { variance, percentVariance };
}

interface IncomeGapInputs {
  savings: number;
  monthlyExpenses: number;
  monthsUntilNewIncome: number;
}

export function calculateIncomeGapCoverage(inputs: IncomeGapInputs) {
  const { savings, monthlyExpenses, monthsUntilNewIncome } = inputs;
  const monthsCovered = savings / monthlyExpenses;
  return monthsCovered >= monthsUntilNewIncome;
}

interface ExpenseAdjusterInputs {
  currentIncome: number;
  reducedIncome: number;
  fixedExpenses: number;
  variableExpenses: number;
}

export function adjustExpenses(inputs: ExpenseAdjusterInputs) {
  const { currentIncome, reducedIncome, fixedExpenses, variableExpenses } =
    inputs;
  const incomeRatio = reducedIncome / currentIncome;

  // Fixed expenses mostly stay same, variable scale down with income
  return {
    adjustedFixedExpenses: fixedExpenses,
    adjustedVariableExpenses: variableExpenses * incomeRatio,
    totalAdjustedExpenses: fixedExpenses + variableExpenses * incomeRatio,
  };
}

interface PartTimeJobInputs {
  hourlyWage: number;
  hoursPerWeek: number;
  weeksPerMonth: number; // Typically 4 or 4.33
}

export function calculateMonthlyIncome(inputs: PartTimeJobInputs) {
  const { hourlyWage, hoursPerWeek, weeksPerMonth } = inputs;
  return hourlyWage * hoursPerWeek * weeksPerMonth;
}
