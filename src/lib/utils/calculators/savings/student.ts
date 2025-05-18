interface ScholarshipInputs {
  tuitionCost: number;
  scholarshipAmount: number;
}

/**
 * Calculates the remaining loan needed after applying scholarships.
 * - Clamps negative or invalid values to zero for realism.
 */
export function calculateLoanAfterScholarship(inputs: ScholarshipInputs) {
  const tuitionCost =
    typeof inputs.tuitionCost === "number" && inputs.tuitionCost >= 0
      ? inputs.tuitionCost
      : 0;
  const scholarshipAmount =
    typeof inputs.scholarshipAmount === "number" &&
    inputs.scholarshipAmount >= 0
      ? inputs.scholarshipAmount
      : 0;
  return Math.max(0, tuitionCost - scholarshipAmount);
}

interface BudgetPlannerInputs {
  totalIncome: number;
  rentPercent: number; // e.g., 30 for 30%
  foodPercent: number;
  transportPercent: number;
  entertainmentPercent: number;
  miscPercent: number;
}

/**
 * Calculates a budget breakdown for students based on income and percentage allocations.
 *
 * @param inputs - The budget planning parameters
 * @param inputs.totalIncome - Total monthly income (defaults to 0 if invalid)
 * @param inputs.rentPercent - Percentage of income to allocate for rent (defaults to 0 if invalid)
 * @param inputs.foodPercent - Percentage of income to allocate for food (defaults to 0 if invalid)
 * @param inputs.transportPercent - Percentage of income to allocate for transportation (defaults to 0 if invalid)
 * @param inputs.entertainmentPercent - Percentage of income to allocate for entertainment (defaults to 0 if invalid)
 * @param inputs.miscPercent - Percentage of income to allocate for miscellaneous expenses (defaults to 0 if invalid)
 *
 * @returns An object containing the calculated budget breakdown with the following properties:
 * - rent: Dollar amount allocated for rent
 * - food: Dollar amount allocated for food
 * - transport: Dollar amount allocated for transportation
 * - entertainment: Dollar amount allocated for entertainment
 * - miscellaneous: Dollar amount allocated for miscellaneous expenses
 * - leftover: Remaining funds after all allocations
 * - explanation: String containing a formatted breakdown of all budget allocations
 */
export function calculateStudentBudget(inputs: BudgetPlannerInputs) {
  const totalIncome =
    typeof inputs.totalIncome === "number" && inputs.totalIncome >= 0
      ? inputs.totalIncome
      : 0;
  const rentPercent =
    typeof inputs.rentPercent === "number" && inputs.rentPercent >= 0
      ? inputs.rentPercent
      : 0;
  const foodPercent =
    typeof inputs.foodPercent === "number" && inputs.foodPercent >= 0
      ? inputs.foodPercent
      : 0;
  const transportPercent =
    typeof inputs.transportPercent === "number" && inputs.transportPercent >= 0
      ? inputs.transportPercent
      : 0;
  const entertainmentPercent =
    typeof inputs.entertainmentPercent === "number" &&
    inputs.entertainmentPercent >= 0
      ? inputs.entertainmentPercent
      : 0;
  const miscPercent =
    typeof inputs.miscPercent === "number" && inputs.miscPercent >= 0
      ? inputs.miscPercent
      : 0;

  const rent = (rentPercent / 100) * totalIncome;
  const food = (foodPercent / 100) * totalIncome;
  const transport = (transportPercent / 100) * totalIncome;
  const entertainment = (entertainmentPercent / 100) * totalIncome;
  const miscellaneous = (miscPercent / 100) * totalIncome;
  const total = rent + food + transport + entertainment + miscellaneous;
  const leftover = totalIncome - total;

  return {
    rent: Math.round(rent * 100) / 100,
    food: Math.round(food * 100) / 100,
    transport: Math.round(transport * 100) / 100,
    entertainment: Math.round(entertainment * 100) / 100,
    miscellaneous: Math.round(miscellaneous * 100) / 100,
    leftover: Math.round(leftover * 100) / 100,
    explanation: `Budget breakdown: rent $${
      Math.round(rent * 100) / 100
    }, food $${Math.round(food * 100) / 100}, transport $${
      Math.round(transport * 100) / 100
    }, entertainment $${
      Math.round(entertainment * 100) / 100
    }, miscellaneous $${Math.round(miscellaneous * 100) / 100}. Leftover: $${
      Math.round(leftover * 100) / 100
    }.`,
  };
}

interface EducationSavingsInputs {
  targetAmount: number;
  annualInterestRate: number; // decimal, e.g., 0.03 for 3%
  yearsToSave: number;
}

/**
 * Calculates the monthly savings amount needed to reach a target education fund.
 *
 * This function determines how much money needs to be saved each month to accumulate
 * a desired education fund amount within a specified timeframe, considering compound interest.
 * If the interest rate is zero, it calculates a simple division of the target amount over the number of months.
 *
 * @param inputs - The education savings calculation parameters
 * @param inputs.targetAmount - The total education fund goal amount (must be positive)
 * @param inputs.annualInterestRate - The annual interest rate as a decimal (e.g., 0.05 for 5%)
 * @param inputs.yearsToSave - The number of years to save (must be positive)
 *
 * @returns The required monthly savings amount, rounded to 2 decimal places
 */
export function calculateMonthlyEducationSavings(
  inputs: EducationSavingsInputs
) {
  const targetAmount =
    typeof inputs.targetAmount === "number" && inputs.targetAmount > 0
      ? inputs.targetAmount
      : 0;
  const annualInterestRate =
    typeof inputs.annualInterestRate === "number" &&
    inputs.annualInterestRate >= 0
      ? inputs.annualInterestRate
      : 0;
  const yearsToSave =
    typeof inputs.yearsToSave === "number" && inputs.yearsToSave > 0
      ? inputs.yearsToSave
      : 1;

  const monthlyInterestRate = annualInterestRate / 12;
  const numberOfMonths = yearsToSave * 12;

  if (monthlyInterestRate === 0) {
    return Math.round((targetAmount / numberOfMonths) * 100) / 100;
  }

  const monthlySavings =
    (targetAmount * monthlyInterestRate) /
    (Math.pow(1 + monthlyInterestRate, numberOfMonths) - 1);

  return Math.round(monthlySavings * 100) / 100;
}

interface EducationSavingsParams {
  currentSavings: number;
  annualContribution: number;
  yearsUntilCollege: number;
  annualReturnRate: number;
}

/**
 * Calculates the future value of education savings with annual contributions.
 * - Compounds annually.
 * - Clamps negative or invalid values to zero for realism.
 */
export function calculateEducationSavings({
  currentSavings,
  annualContribution,
  yearsUntilCollege,
  annualReturnRate,
}: EducationSavingsParams): number {
  let total =
    typeof currentSavings === "number" && currentSavings >= 0
      ? currentSavings
      : 0;
  const safeAnnualContribution =
    typeof annualContribution === "number" && annualContribution >= 0
      ? annualContribution
      : 0;
  const safeYears =
    typeof yearsUntilCollege === "number" && yearsUntilCollege > 0
      ? yearsUntilCollege
      : 0;
  const safeReturn =
    typeof annualReturnRate === "number" && annualReturnRate >= 0
      ? annualReturnRate
      : 0;

  for (let i = 0; i < safeYears; i++) {
    total = (total + safeAnnualContribution) * (1 + safeReturn);
  }
  return Math.round(total * 100) / 100;
}

/**
 * Calculates college savings projections, including future costs and potential funding gaps.
 *
 * This function estimates the amount needed for a 4-year college education based on
 * the child's current age, when they will start college, projected college costs, and
 * the current savings plan. It accounts for inflation and investment returns.
 *
 * @param {Object} params - The college savings calculation parameters
 * @param {number} params.currentAge - The child's current age in years
 * @param {number} params.collegeStartAge - The age when the child will start college (typically 18)
 * @param {number} params.annualCollegeCost - The current annual cost of college education
 * @param {number} params.inflationRate - The expected annual inflation rate as a decimal (e.g., 0.03 for 3%)
 * @param {number} params.currentSavings - The current amount already saved for college
 * @param {number} params.annualReturnRate - The expected annual investment return rate as a decimal (e.g., 0.07 for 7%)
 * @param {number} params.monthlyContribution - The amount being contributed monthly to college savings
 *
 * @returns {Object} The college savings projection results
 * @returns {number} returns.futureAnnualCost - The projected annual cost of college when the child starts
 * @returns {number} returns.totalNeeded - The total amount needed for 4 years of college
 * @returns {number} returns.projectedSavings - The projected amount saved by college start age
 * @returns {number} returns.savingsGap - The difference between total needed and projected savings
 * @returns {string} returns.explanation - A human-readable explanation of the calculation results
 */
export function calculateCollegeSavings({
  currentAge,
  collegeStartAge,
  annualCollegeCost,
  inflationRate,
  currentSavings,
  annualReturnRate,
  monthlyContribution,
}: {
  currentAge: number;
  collegeStartAge: number;
  annualCollegeCost: number;
  inflationRate: number;
  currentSavings: number;
  annualReturnRate: number;
  monthlyContribution: number;
}) {
  const yearsUntilCollege =
    typeof collegeStartAge === "number" &&
    typeof currentAge === "number" &&
    collegeStartAge > currentAge
      ? collegeStartAge - currentAge
      : 0;
  const safeAnnualCollegeCost =
    typeof annualCollegeCost === "number" && annualCollegeCost > 0
      ? annualCollegeCost
      : 0;
  const safeInflationRate =
    typeof inflationRate === "number" && inflationRate >= 0 ? inflationRate : 0;
  const safeCurrentSavings =
    typeof currentSavings === "number" && currentSavings >= 0
      ? currentSavings
      : 0;
  const safeAnnualReturnRate =
    typeof annualReturnRate === "number" && annualReturnRate >= 0
      ? annualReturnRate
      : 0;
  const safeMonthlyContribution =
    typeof monthlyContribution === "number" && monthlyContribution >= 0
      ? monthlyContribution
      : 0;

  const futureAnnualCost =
    safeAnnualCollegeCost * Math.pow(1 + safeInflationRate, yearsUntilCollege);
  const totalNeeded = futureAnnualCost * 4;

  // Future value of current savings + contributions
  const futureValue =
    safeCurrentSavings * Math.pow(1 + safeAnnualReturnRate, yearsUntilCollege) +
    safeMonthlyContribution *
      ((Math.pow(1 + safeAnnualReturnRate / 12, yearsUntilCollege * 12) - 1) /
        (safeAnnualReturnRate / 12 || 1));

  const savingsGap = Math.round((totalNeeded - futureValue) * 100) / 100;

  return {
    futureAnnualCost: Math.round(futureAnnualCost * 100) / 100,
    totalNeeded: Math.round(totalNeeded * 100) / 100,
    projectedSavings: Math.round(futureValue * 100) / 100,
    savingsGap,
    explanation: `Future annual college cost: $${
      Math.round(futureAnnualCost * 100) / 100
    }, total needed for 4 years: $${
      Math.round(totalNeeded * 100) / 100
    }, projected savings: $${
      Math.round(futureValue * 100) / 100
    }, gap: $${savingsGap}.`,
  };
}
