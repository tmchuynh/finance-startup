import { FilingStatus } from "@/lib/interfaces";
import { estimateW2IncomeTaxesWithBrackets } from "../tax/tax";

interface SavingsGoalParams {
  targetAmount: number;
  currentSavings: number;
  yearsToGoal: number;
  annualReturnRate: number;
}

/**
 * Calculates the required monthly savings to reach a target amount in a given time frame.
 * - Handles zero or negative values for realism.
 * - Returns 0 if already at or above target.
 */
export function calculateMonthlySavings({
  targetAmount,
  currentSavings,
  yearsToGoal,
  annualReturnRate,
}: SavingsGoalParams): number {
  const months =
    typeof yearsToGoal === "number" && yearsToGoal > 0 ? yearsToGoal * 12 : 1;
  const monthlyRate =
    typeof annualReturnRate === "number" && annualReturnRate >= 0
      ? annualReturnRate / 12
      : 0;
  const safeTarget =
    typeof targetAmount === "number" && targetAmount > 0 ? targetAmount : 0;
  const safeCurrent =
    typeof currentSavings === "number" && currentSavings >= 0
      ? currentSavings
      : 0;

  // Future value of current savings
  const fvCurrent = safeCurrent * Math.pow(1 + monthlyRate, months);

  // Monthly savings needed to reach target
  let monthlySavings: number;
  if (monthlyRate === 0) {
    monthlySavings = (safeTarget - fvCurrent) / months;
  } else {
    monthlySavings =
      ((safeTarget - fvCurrent) * monthlyRate) /
      (Math.pow(1 + monthlyRate, months) - 1);
  }

  return monthlySavings > 0 ? Math.round(monthlySavings * 100) / 100 : 0;
}

/**
 * Calculates the monthly savings amount required to reach a financial goal.
 *
 * This function computes how much you need to save each month to reach a target amount,
 * taking into account your current savings and the compound interest on both your
 * existing savings and future contributions.
 *
 * @param params - The calculation parameters
 * @param params.goalAmount - The target amount you want to save (must be positive)
 * @param params.currentSavings - Your current savings amount (must be non-negative)
 * @param params.annualInterestRate - Annual interest rate as a decimal (e.g., 0.05 for 5%, must be non-negative)
 * @param params.months - The number of months to reach your goal (must be positive)
 *
 * @returns The required monthly savings amount rounded to 2 decimal places.
 *          Returns 0 if the calculated amount is negative or if current savings already exceed the goal.
 *
 * @example
 * // Calculate monthly savings to reach $10,000 in 24 months with $2,000 already saved at 3% annual interest
 * const monthlySavings = calculateMonthlySavingsGoal({
 *   goalAmount: 10000,
 *   currentSavings: 2000,
 *   annualInterestRate: 0.03,
 *   months: 24
 * });
 */
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
  const safeGoal =
    typeof goalAmount === "number" && goalAmount > 0 ? goalAmount : 0;
  const safeCurrent =
    typeof currentSavings === "number" && currentSavings >= 0
      ? currentSavings
      : 0;
  const safeMonths = typeof months === "number" && months > 0 ? months : 1;
  const monthlyRate =
    typeof annualInterestRate === "number" && annualInterestRate >= 0
      ? annualInterestRate / 12
      : 0;

  const fvCurrent = safeCurrent * Math.pow(1 + monthlyRate, safeMonths);

  let monthlySavings: number;
  if (monthlyRate === 0) {
    monthlySavings = (safeGoal - fvCurrent) / safeMonths;
  } else {
    monthlySavings =
      ((safeGoal - fvCurrent) * monthlyRate) /
      (Math.pow(1 + monthlyRate, safeMonths) - 1);
  }

  return monthlySavings > 0 ? Math.round(monthlySavings * 100) / 100 : 0;
}

interface ExpenseVarianceInputs {
  budgetedExpense: number;
  actualExpense: number;
}

/**
 * Calculates the variance and percent variance between budgeted and actual expenses.
 * - Returns both the absolute and percentage variance, rounded to two decimals.
 */
export function calculateExpenseVariance(inputs: ExpenseVarianceInputs) {
  const { budgetedExpense, actualExpense } = inputs;
  const variance = Math.round((actualExpense - budgetedExpense) * 100) / 100;
  const percentVariance =
    budgetedExpense !== 0
      ? Math.round((variance / budgetedExpense) * 100 * 100) / 100
      : 0;
  return { variance, percentVariance };
}

interface IncomeGapInputs {
  savings: number;
  monthlyExpenses: number;
  monthsUntilNewIncome: number;
  filingStatus?: FilingStatus;
  stateTaxRate?: number;
  numDependents?: number;
}

/**
 * Calculates whether savings will sufficiently cover monthly expenses until new income arrives,
 * accounting for tax implications when using savings as income.
 *
 * This function:
 * 1. Estimates the pre-tax income needed to cover monthly expenses
 * 2. Calculates effective tax rates based on filing status and other factors
 * 3. Determines how many months savings will last after accounting for taxes
 * 4. Compares this to the specified months until new income
 *
 * @param inputs - Configuration parameters for calculating income gap coverage
 * @param inputs.savings - Total amount of savings available
 * @param inputs.monthlyExpenses - Monthly expenses that need to be covered
 * @param inputs.monthsUntilNewIncome - Number of months until new income begins
 * @param inputs.filingStatus - Tax filing status (e.g., "single", "married") - defaults to "single"
 * @param inputs.stateTaxRate - State tax rate as a decimal - defaults to 0.05 (5%)
 * @param inputs.numDependents - Number of dependents for tax calculations - defaults to 0
 *
 * @returns A boolean indicating whether savings will last until new income arrives (true) or not (false)
 */
export function calculateIncomeGapCoverage(inputs: IncomeGapInputs) {
  const {
    savings,
    monthlyExpenses,
    monthsUntilNewIncome,
    filingStatus = "single",
    stateTaxRate = 0.05,
    numDependents = 0,
  } = inputs;

  // Estimate after-tax monthly expenses (assume expenses must be paid with after-tax dollars)
  // We'll "gross up" the expenses to estimate the pre-tax income needed to cover them,
  // then estimate the after-tax value of the savings.
  if (monthlyExpenses <= 0 || monthsUntilNewIncome <= 0) return true;

  // Estimate the pre-tax income needed to cover the expenses
  const grossUpFactor = 1 / (1 - 0.2); // Assume 20% effective tax rate if not specified
  const estimatedPreTaxMonthly = monthlyExpenses * grossUpFactor;
  const annualPreTax = estimatedPreTaxMonthly * 12;

  // Estimate taxes on using savings as income
  const taxResult = estimateW2IncomeTaxesWithBrackets({
    annualSalary: annualPreTax,
    numDependents,
    filingStatus,
    stateTaxRate,
  });
  const effectiveTaxRate = taxResult.effectiveTaxRate || 0.2;

  // Calculate how many months the savings will last after taxes
  const afterTaxMonthlyExpenses = monthlyExpenses / (1 - effectiveTaxRate);
  const monthsCovered = savings / afterTaxMonthlyExpenses;

  return monthsCovered >= monthsUntilNewIncome;
}

interface ExpenseAdjusterInputs {
  currentIncome: number;
  reducedIncome: number;
  fixedExpenses: number;
  variableExpenses: number;
  filingStatus?: FilingStatus;
  stateTaxRate?: number;
  numDependents?: number;
}

/**
 * Adjusts expenses based on reduced income, accounting for taxes.
 * - Fixed expenses remain, variable expenses scale with net income ratio.
 * - Uses tax logic for more realistic net income calculation.
 */
export function adjustExpenses(inputs: ExpenseAdjusterInputs) {
  const {
    currentIncome,
    reducedIncome,
    fixedExpenses,
    variableExpenses,
    filingStatus = "single",
    stateTaxRate = 0.05,
    numDependents = 0,
  } = inputs;

  // Calculate net income after estimated taxes for both scenarios
  const getNetIncome = (gross: number) => {
    if (gross <= 0) return 0;
    const taxResult = estimateW2IncomeTaxesWithBrackets({
      annualSalary: gross,
      numDependents,
      filingStatus,
      stateTaxRate,
    });
    return gross - taxResult.totalTax;
  };

  const netCurrent = getNetIncome(currentIncome);
  const netReduced = getNetIncome(reducedIncome);

  const netIncomeRatio = netCurrent > 0 ? netReduced / netCurrent : 0;

  return {
    adjustedFixedExpenses: fixedExpenses,
    adjustedVariableExpenses: variableExpenses * netIncomeRatio,
    totalAdjustedExpenses: fixedExpenses + variableExpenses * netIncomeRatio,
    netIncomeRatio: Math.round(netIncomeRatio * 100) / 100,
    explanation: `Variable expenses are scaled by net income ratio (${Math.round(
      netIncomeRatio * 100
    )}%) after taxes.`,
  };
}

interface PartTimeJobInputs {
  hourlyWage: number;
  hoursPerWeek: number;
  weeksPerMonth: number; // Typically 4 or 4.33
  filingStatus?: FilingStatus; // "single" | "married" | "head_of_household"
  stateTaxRate?: number; // e.g. 0.05 for 5%
  numDependents?: number;
}

/**
 * Calculates the net monthly income after taxes for a part-time job.
 *
 * @param inputs - The inputs needed to calculate monthly income
 * @param inputs.hourlyWage - Hourly wage rate (defaults to 0 if invalid)
 * @param inputs.hoursPerWeek - Number of hours worked per week (defaults to 0 if invalid)
 * @param inputs.weeksPerMonth - Number of weeks worked per month (defaults to 4 if invalid)
 * @param inputs.filingStatus - Tax filing status (defaults to "single")
 * @param inputs.stateTaxRate - State tax rate as a decimal (defaults to 0.05 if invalid)
 * @param inputs.numDependents - Number of dependents for tax purposes (defaults to 0 if invalid)
 *
 * @returns The estimated net monthly income after taxes, rounded to 2 decimal places.
 */
export function calculateMonthlyIncome(inputs: PartTimeJobInputs) {
  const hourlyWage =
    typeof inputs.hourlyWage === "number" && inputs.hourlyWage >= 0
      ? inputs.hourlyWage
      : 0;
  const hoursPerWeek =
    typeof inputs.hoursPerWeek === "number" && inputs.hoursPerWeek >= 0
      ? inputs.hoursPerWeek
      : 0;
  const weeksPerMonth =
    typeof inputs.weeksPerMonth === "number" && inputs.weeksPerMonth > 0
      ? inputs.weeksPerMonth
      : 4;
  const filingStatus: FilingStatus = inputs.filingStatus || "single";
  const stateTaxRate =
    typeof inputs.stateTaxRate === "number" && inputs.stateTaxRate >= 0
      ? inputs.stateTaxRate
      : 0.05;
  const numDependents =
    typeof inputs.numDependents === "number" && inputs.numDependents >= 0
      ? inputs.numDependents
      : 0;

  const grossMonthly = hourlyWage * hoursPerWeek * weeksPerMonth;
  const annualSalary = grossMonthly * 12;

  // Use the tax module to estimate annual taxes
  const taxResult = estimateW2IncomeTaxesWithBrackets({
    annualSalary,
    numDependents,
    filingStatus,
    stateTaxRate,
  });

  // Calculate monthly net income
  const netAnnual = annualSalary - taxResult.totalTax;
  const netMonthly = netAnnual / 12;

  return Math.round(netMonthly * 100) / 100;
}
