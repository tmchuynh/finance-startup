interface BasicNeedsInputs {
  totalIncome: number;
  minimumRent: number;
  minimumFood: number;
  minimumUtilities: number;
  minimumHealthcare: number;
}

/**
 * Allocates income to basic needs categories based on minimum requirements.
 *
 * @param inputs - Object containing income and minimum requirements
 * @param inputs.totalIncome - Total available income for allocation
 * @param inputs.minimumRent - Minimum amount needed for rent
 * @param inputs.minimumFood - Minimum amount needed for food
 * @param inputs.minimumUtilities - Minimum amount needed for utilities
 * @param inputs.minimumHealthcare - Minimum amount needed for healthcare
 * 
 * @returns An object containing the allocated amounts for each category.
 * If totalIncome >= total minimum requirements, includes a 'surplus' property.
 * If totalIncome < total minimum requirements, includes a 'shortfall' property
 * and proportionally reduces all allocations.
 * 
 * @example
 * // Sufficient income scenario
 * const result = allocateBasicNeeds({
 *   totalIncome: 3000,
 *   minimumRent: 1200,
 *   minimumFood: 500,
 *   minimumUtilities: 300,
 *   minimumHealthcare: 400
 * });
 * // Returns { rent: 1200, food: 500, utilities: 300, healthcare: 400, surplus: 600 }
 */
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

/**
 * Calculates a family budget by dividing total income according to specified percentage allocations.
 * 
 * @param inputs - The budget input parameters
 * @param inputs.totalIncome - The total family income amount
 * @param inputs.housingPercent - The percentage of income allocated to housing
 * @param inputs.foodPercent - The percentage of income allocated to food
 * @param inputs.educationPercent - The percentage of income allocated to education
 * @param inputs.transportationPercent - The percentage of income allocated to transportation
 * @param inputs.healthcarePercent - The percentage of income allocated to healthcare
 * @param inputs.entertainmentPercent - The percentage of income allocated to entertainment
 * @param inputs.savingsPercent - The percentage of income allocated to savings
 * @param inputs.miscPercent - The percentage of income allocated to miscellaneous expenses
 * 
 * @returns An object containing the monetary allocation for each budget category
 */
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

/**
 * Calculates the total monthly expenses by summing all fixed and variable expenses.
 * 
 * @param expenses - The expenses object containing fixed and variable expense arrays.
 * @returns The sum of all monthly expenses.
 * 
 * @example
 * const myExpenses = {
 *   fixedExpenses: [1000, 500, 200],
 *   variableExpenses: [300, 150, 75]
 * };
 * const total = calculateTotalMonthlyExpenses(myExpenses); // 2225
 */
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

/**
 * Calculates the variance between budgeted and actual amounts in both absolute and percentage terms.
 * 
 * @param {Object} params - The budget comparison parameters
 * @param {number} params.budgetedAmount - The planned/expected amount in the budget
 * @param {number} params.actualAmount - The actual amount spent or received
 * 
 * @returns {Object} An object containing the calculation results
 * @returns {number} returns.variance - The absolute difference between actual and budgeted amounts
 * @returns {number} returns.percentVariance - The percentage difference relative to the budgeted amount (positive means over budget)
 * 
 * @example
 * const result = calculateBudgetVariance({ budgetedAmount: 100, actualAmount: 120 });
 * // result: { variance: 20, percentVariance: 20 }
 */
export function calculateBudgetVariance({
  budgetedAmount,
  actualAmount,
}: BudgetComparisonParams) {
  const variance = actualAmount - budgetedAmount;
  const percentVariance = (variance / budgetedAmount) * 100;

  return { variance, percentVariance };
}

/**
 * Calculates the future purchasing power of a given amount after considering inflation effects.
 * This function determines how much the current amount will be worth in the future due to inflation.
 * 
 * @param currentAmount - The present monetary value
 * @param inflationRate - The annual inflation rate as a decimal (e.g., 0.03 for 3%)
 * @param years - The number of years to project into the future
 * @returns The future value with decreased purchasing power due to inflation
 * 
 * @example
 * // Calculate what $1000 will be worth in 5 years with 2% annual inflation
 * const futureValue = calculateInflationImpact(1000, 0.02, 5);
 * // Returns approximately 905.73
 */
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

/**
 * Determines the most appropriate IRA type based on user financial parameters.
 * 
 * @param {Object} params - The parameters for making an IRA decision
 * @param {number} params.currentIncome - User's current annual income
 * @param {number} params.taxBracket - User's current tax bracket percentage
 * @param {number} params.expectedRetirementTaxBracket - Expected tax bracket during retirement
 * @param {number} params.incomeLimitForRoth - Income threshold for Roth IRA eligibility
 * @param {boolean} params.plansToWithdrawEarly - Whether the user plans to withdraw funds before retirement age
 * 
 * @returns {"Traditional IRA" | "Roth IRA" | "Neither"} The recommended IRA type based on the provided parameters
 * 
 * @remarks
 * - Recommends Traditional IRA if current income exceeds Roth IRA limits
 * - Favors Roth IRA for users planning early withdrawals (as contributions can be withdrawn tax/penalty-free)
 * - Recommends Traditional IRA when current tax bracket is higher than expected retirement tax bracket
 * - Defaults to Roth IRA in other scenarios (pay taxes now, withdraw tax-free later)
 */
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

/**
 * Estimates a person's monthly Social Security benefit based on their age, full retirement age,
 * and average indexed monthly earnings.
 * 
 * @param params - The parameters for estimating Social Security benefits
 * @param params.age - The current age or claiming age of the person (must be between 0 and 120)
 * @param params.fullRetirementAge - The full retirement age for Social Security benefits (default: 67, must be between 62 and 70)
 * @param params.averageIndexedMonthlyEarnings - The Average Indexed Monthly Earnings (AIME) used in benefit calculations
 * 
 * @returns The estimated monthly Social Security benefit in dollars
 * 
 * @throws {Error} When age is not between 0 and 120
 * @throws {Error} When fullRetirementAge is not between 62 and 70
 * 
 * @remarks
 * Uses simplified 2024 bend points for Primary Insurance Amount (PIA) calculation:
 * - 90% of first $1,115 of AIME
 * - 32% of AIME between $1,115 and $6,721
 * - 15% of AIME over $6,721
 * 
 * Adjusts for early claiming (reduction of approximately 6.67% per year for the first 3 years 
 * before full retirement age, and 5% per year for additional years) or delayed claiming 
 * (increase of 8% per year after full retirement age up to age 70).
 */
export function estimateSocialSecurityBenefit({
  age,
  fullRetirementAge = 67,
  averageIndexedMonthlyEarnings,
}: SocialSecurityParams): number {
  if (age < 0 || age > 120) {
    throw new Error("Age must be between 0 and 120.");
  }
  if (averageIndexedMonthlyEarnings < 0) {
    // Up to $1,115 = 90%, $1,115-$6,721 = 32%, over $6,721 = 15%
    // Note: These are simplified 2024 bend points and may change annually. Verify for accuracy.
  }
  if (fullRetirementAge < 62 || fullRetirementAge > 70) {
    throw new Error("Full Retirement Age must be between 62 and 70.");
  }
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
    if (yearsEarly <= 3) {
      adjustmentFactor = 1 - 0.0667 * yearsEarly;
    } else {
      adjustmentFactor = 1 - (0.0667 * 3 + 0.05 * (yearsEarly - 3));
    }
    // Delayed claiming increases benefit about 8% per year after FRA up to 70
    const yearsDelayed =
      Math.min(age, delayedRetirementAge) - fullRetirementAge;
    adjustmentFactor =
      1 +
      0.08 * Math.min(yearsDelayed, delayedRetirementAge - fullRetirementAge);
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

/**
 * Simulates a person's FIRE (Financial Independence, Retire Early) status based on provided financial parameters.
 *
 * @param {Object} params - The financial parameters for the FIRE simulation
 * @param {number} params.currentSavings - Current total savings/investments
 * @param {number} params.annualContribution - Amount contributed to investments annually
 * @param {number} params.annualExpenses - Expected annual expenses during retirement
 * @param {number} params.annualReturnRate - Expected annual return rate on investments (decimal form, e.g., 0.07 for 7%)
 * @param {number} params.yearsToRetirement - Number of years until planned retirement
 * @param {number} [params.fatFireMultiplier=25] - Multiplier to determine Fat FIRE target (default: 25)
 *
 * @returns {Object} The simulation results
 * @returns {number} returns.futureValue - Projected value of investments at retirement
 * @returns {boolean} returns.isCoastFIRE - Whether investments will grow to cover expenses without further contributions
 * @returns {boolean} returns.isFatFIRE - Whether investments will exceed the Fat FIRE target
 * @returns {boolean} returns.hasReachedCoastFIRE - Alias for isCoastFIRE
 * @returns {boolean} returns.hasReachedFatFIRE - Alias for isFatFIRE
 */
export function simulateFIREStatus({
  currentSavings,
  annualContribution,
  annualExpenses,
  annualReturnRate,
  yearsToRetirement,
  fatFireMultiplier = 25,
}: FireSimulatorParams) {
  // Calculate future value of savings + contributions
  const futureValue =
    currentSavings * Math.pow(1 + annualReturnRate, yearsToRetirement) +
    annualContribution *
      ((Math.pow(1 + annualReturnRate, yearsToRetirement) - 1) /
        annualReturnRate);
  const coastFireTarget =
    annualReturnRate !== 0 ? annualExpenses / annualReturnRate : Infinity; // Handle zero return rate by setting target to Infinity
  const fatFireTarget = annualExpenses * fatFireMultiplier;

  return {
    futureValue,
    isCoastFIRE: futureValue >= coastFireTarget,
    isFatFIRE: futureValue >= fatFireTarget,
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

/**
 * Calculates a retirement readiness score as a percentage based on financial inputs.
 * 
 * The function compares projected savings at retirement with required savings to support
 * expected expenses throughout retirement years. The result is capped at 100%.
 * 
 * @param {Object} params - Retirement planning parameters
 * @param {number} params.currentSavings - Current retirement savings amount
 * @param {number} params.annualExpenses - Expected annual expenses during retirement
 * @param {number} params.age - Current age of the individual
 * @param {number} params.expectedRetirementAge - Age at which the individual plans to retire
 * @param {number} params.expectedReturnRate - Annual expected rate of return on investments (decimal format, e.g., 0.07 for 7%)
 * @param {number} params.yearsInRetirement - Expected number of years to live in retirement
 * 
 * @returns {number} A retirement readiness score from 0 to 100, representing the percentage of required
 *                   retirement savings projected to be available
 * 
 * @example
 * calculateRetirementReadiness({
 *   currentSavings: 100000,
 *   annualExpenses: 40000,
 *   age: 35,
 *   expectedRetirementAge: 65,
 *   expectedReturnRate: 0.07,
 *   yearsInRetirement: 30
 * });
 */
export function calculateRetirementReadiness({
  currentSavings,
  annualExpenses,
  age,
  expectedRetirementAge,
  expectedReturnRate,
  yearsInRetirement,
}: RetirementReadinessParams): number {
  const yearsToRetirement = expectedRetirementAge - age;
  if (yearsToRetirement <= 0) {
    const requiredSavings = annualExpenses * yearsInRetirement;
    return Math.min(100, (currentSavings / requiredSavings) * 100);
  }

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

/**
 * Calculates the monetary breakdown of an income based on specified allocation percentages.
  allocations, // e.g. { housing: 0.3, food: 0.15, savings: 0.2, entertainment: 0.1, other: 0.25 }
  if (Object.values(allocations).reduce((sum, value) => sum + value, 0) !== 1) {
    throw new Error("The sum of allocation percentages must equal 1.");
 * @param {Record<string, number>} params.allocations - An object where keys are category names and values are allocation percentages represented as decimals (e.g., 0.3 for 30%, { housing: 0.3, food: 0.15 })
 * @param {Object} params - The input parameters for the calculation
 * @param {number} params.income - The total income to be allocated
 * @param {Record<string, number>} params.allocations - An object where keys are category names and values are allocation percentages (e.g., { housing: 0.3, food: 0.15 })
 * 
 * @returns {Record<string, number>} An object containing the monetary allocation for each category
 * 
 * @example
 * const breakdown = calculateBudgetBreakdown({
 *   income: 5000,
 *   allocations: { housing: 0.3, food: 0.15, savings: 0.2, entertainment: 0.1, other: 0.25 }
 * });
 * // Returns { housing: 1500, food: 750, savings: 1000, entertainment: 500, other: 1250 }
 */
export function calculateBudgetBreakdown({
  income,
  allocations,
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

/**
 * Calculates the final amount after applying compound interest.
 * 
 * This function uses the compound interest formula: A = P(1 + r/n)^(nt)
 * where:
 * - A is the final amount
 * - P is the principal
 * - r is the annual interest rate (as a decimal)
 * - n is the number of times compounded per year
 * - t is the time in years
 * 
 * @param options - The compound interest calculation parameters
 * @param options.principal - The initial investment amount
 * @param options.annualInterestRate - The annual interest rate (in decimal form, e.g., 0.05 for 5%)
 * @param options.timesCompoundedPerYear - The number of times the interest is compounded per year
 * @param options.years - The time period in years
 * @returns The final amount after compound interest is applied
 * 
 * @example
 * // Calculate investment of $1000 at 5% interest compounded quarterly for 10 years
 * const result = calculateCompoundInterest({
 *   principal: 1000,
 *   annualInterestRate: 0.05,
 *   timesCompoundedPerYear: 4,
 *   years: 10
 * });
 * // result ≈ 1638.62
 */
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

/**
 * Calculates the Return on Investment (ROI) as a percentage.
 *
 * @param {object} params - The parameters for ROI calculation
 * @param {number} params.gain - The total return or final value of the investment
 * @param {number} params.cost - The initial investment or cost
 * @returns {number} The ROI as a percentage value
 * 
 * @example
 * // Returns 50 (representing 50%)
 * calculateROI({ gain: 150, cost: 100 });
 */
export function calculateROI({ gain, cost }: { gain: number; cost: number }) {
  return ((gain - cost) / cost) * 100;
}

/**
 * Calculates the percentage change between two values
 *
 * @param {Object} params - The input parameters
 * @param {number} params.oldValue - The original/reference value
 * @param {number} params.newValue - The new/changed value
 * @returns {number} The percentage change value (positive indicates increase, negative indicates decrease)
 * 
 * @example
 * // Returns 25 (25% increase)
 * calculatePercentChange({ oldValue: 100, newValue: 125 })
 * 
 * @example
 * // Returns -20 (20% decrease)
 * calculatePercentChange({ oldValue: 100, newValue: 80 })
 */
export function calculatePercentChange({
  oldValue,
  newValue,
}: {
  oldValue: number;
  newValue: number;
}) {
  return ((newValue - oldValue) / oldValue) * 100;
}

/**
 * Calculates the sales tax and total price for an item based on its price and tax rate.
 * 
 * @param {object} params - The parameters for the calculation
 * @param {number} params.itemPrice - The original price of the item without tax
 * @param {number} params.salesTaxRate - The sales tax rate as a percentage (e.g., 7 for 7%)
 * @returns {object} An object containing the total price including tax and the tax amount
 * @returns {number} returns.total - The total price including tax
 * @returns {number} returns.tax - The amount of sales tax applied
 */
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

/**
 * Converts an hourly wage rate to an annual salary
 * 
 * @param {Object} params - The parameters for the conversion
 * @param {number} params.hourlyRate - The hourly wage rate
 * @param {number} params.hoursPerWeek - The number of hours worked per week
 * @param {number} params.weeksPerYear - The number of weeks worked per year
 * @returns {number} The calculated annual salary
 */
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

/**
 * Calculates the interest and total repayment for a simple interest loan.
 * 
 * @param {object} params - The loan parameters
 * @param {number} params.principal - The initial loan amount
 * @param {number} params.interestRate - The annual interest rate (in decimal form, e.g., 0.05 for 5%)
 * @param {number} params.termYears - The loan term in years
 * @returns {object} An object containing the calculated interest and total repayment
 * @returns {number} returns.interest - The total interest over the loan term
 * @returns {number} returns.totalRepayment - The total amount to be repaid (principal + interest)
 */
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

/**
 * Calculates the future value of an amount adjusted for inflation over time.
 *
 * This function applies the standard inflation adjustment formula to determine
 * how much a current value will be worth in the future, considering the
 * effects of inflation over a specified number of years.
 *
 * @param params - Parameters for the inflation adjustment calculation
 * @param params.currentValue - The present value amount in currency units
 * @param params.inflationRate - The annual inflation rate as a decimal (e.g., 0.03 for 3%)
 * @param params.years - The number of years to project into the future
 * @returns The inflation-adjusted future value
 *
 * @example
 * // Calculate what $1000 will be worth in 10 years with 2% annual inflation
 * const futureValue = calculateInflationAdjustedFutureValue({
 *   currentValue: 1000,
 *   inflationRate: 0.02,
 *   years: 10
 * });
 */
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
