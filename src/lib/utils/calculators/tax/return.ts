/**
 * Calculates the tax savings from Health Savings Account (HSA) contributions based on the
 * annual contribution amount and marginal tax rate.
 *
 * @param options - The calculation parameters
 * @param options.annualContribution - The annual amount contributed to the HSA in dollars
 * @param options.marginalTaxRate - The marginal tax rate as a decimal (e.g., 0.24 for 24%)
 * @returns The estimated tax savings in dollars
 *
 * @example
 * // Calculate tax savings for a $3,000 contribution with 22% tax rate
 * const savings = calculateHSATaxSavings({
 *   annualContribution: 3000,
 *   marginalTaxRate: 0.22
 * });
 * // Result: 660
 */
export function calculateHSATaxSavings({
  annualContribution,
  marginalTaxRate,
}: {
  annualContribution: number;
  marginalTaxRate: number;
}) {
  const safeContribution =
    typeof annualContribution === "number" && annualContribution > 0
      ? annualContribution
      : 0;
  const safeRate =
    typeof marginalTaxRate === "number" && marginalTaxRate > 0
      ? marginalTaxRate
      : 0;
  return safeContribution * safeRate;
}

interface ChildTaxCreditInputs {
  numChildren: number;
  modifiedAGI: number;
  filingStatus: "single" | "married" | "head_of_household";
}

/**
 * Estimates the Child Tax Credit based on the number of qualifying children,
 * modified adjusted gross income (MAGI), and filing status.
 *
 * The credit is $2,000 per qualifying child and begins to phase out when
 * MAGI exceeds certain thresholds based on filing status:
 * - $400,000 for married filing jointly
 * - $200,000 for single, head of household, or other filing statuses
 *
 * The credit is reduced by $50 for each $1,000 (or fraction thereof) by which
 * the taxpayer's MAGI exceeds the threshold amount.
 *
 * @param inputs - The inputs needed to calculate the Child Tax Credit
 * @param inputs.numChildren - The number of qualifying children under age 17
 * @param inputs.modifiedAGI - Modified Adjusted Gross Income
 * @param inputs.filingStatus - Tax filing status ("married", "head_of_household", or other)
 *
 * @returns The estimated Child Tax Credit amount in dollars
 *
 * @example
 * // Returns 4000 (2 children × $2,000)
 * estimateChildTaxCredit({
 *   numChildren: 2,
 *   modifiedAGI: 150000,
 *   filingStatus: "married"
 * });
 */
export function estimateChildTaxCredit(inputs: ChildTaxCreditInputs): number {
  const numChildren =
    typeof inputs.numChildren === "number" && inputs.numChildren > 0
      ? Math.floor(inputs.numChildren)
      : 0;
  const modifiedAGI =
    typeof inputs.modifiedAGI === "number" && inputs.modifiedAGI >= 0
      ? inputs.modifiedAGI
      : 0;
  const filingStatus = inputs.filingStatus;

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

/**
 * Estimates the Earned Income Tax Credit (EITC) based on filing status, number of qualifying children, and earned income.
 * Uses 2024 IRS EITC parameters (simplified and rounded for demonstration purposes).
 *
 * @param options - The parameters for EITC calculation
 * @param options.filingStatus - The tax filing status: "single", "married", or "head_of_household"
 * @param options.numChildren - Number of qualifying children (capped at 3 for calculation purposes)
 * @param options.earnedIncome - The earned income amount for the tax year
 *
 * @returns The estimated EITC amount, rounded to the nearest cent (0 if not eligible or above income limits)
 *
 * @remarks
 * - Negative or non-numeric earned income is treated as 0
 * - Non-numeric or negative number of children is treated as 0
 * - Number of children is capped at 3 for calculation purposes (per IRS rules)
 * - Returns 0 if earned income exceeds the income limit for the filing status and number of children
 *
 * @example
 * // Returns EITC for a single parent with 2 children earning $25,000
 * const eitcAmount = estimateEITC({
 *   filingStatus: "single",
 *   numChildren: 2,
 *   earnedIncome: 25000
 * });
 */
export function estimateEITC({
  filingStatus,
  numChildren,
  earnedIncome,
}: {
  filingStatus: "single" | "married" | "head_of_household";
  numChildren: number;
  earnedIncome: number;
}): number {
  // 2024 IRS EITC parameters (rounded, simplified for demonstration)
  const params = {
    single: [
      {
        maxCredit: 632,
        incomeLimit: 17640,
        phaseIn: 0.0765,
        phaseOut: 0.0765,
        phaseOutStart: 8840,
      },
      {
        maxCredit: 3995,
        incomeLimit: 46860,
        phaseIn: 0.34,
        phaseOut: 0.1598,
        phaseOutStart: 20131,
      },
      {
        maxCredit: 6604,
        incomeLimit: 52918,
        phaseIn: 0.4,
        phaseOut: 0.2106,
        phaseOutStart: 20131,
      },
      {
        maxCredit: 7430,
        incomeLimit: 56838,
        phaseIn: 0.45,
        phaseOut: 0.2106,
        phaseOutStart: 20131,
      },
    ],
    married: [
      {
        maxCredit: 632,
        incomeLimit: 24210,
        phaseIn: 0.0765,
        phaseOut: 0.0765,
        phaseOutStart: 14410,
      },
      {
        maxCredit: 3995,
        incomeLimit: 53430,
        phaseIn: 0.34,
        phaseOut: 0.1598,
        phaseOutStart: 26101,
      },
      {
        maxCredit: 6604,
        incomeLimit: 59488,
        phaseIn: 0.4,
        phaseOut: 0.2106,
        phaseOutStart: 26101,
      },
      {
        maxCredit: 7430,
        incomeLimit: 63408,
        phaseIn: 0.45,
        phaseOut: 0.2106,
        phaseOutStart: 26101,
      },
    ],
    head_of_household: [
      {
        maxCredit: 632,
        incomeLimit: 17640,
        phaseIn: 0.0765,
        phaseOut: 0.0765,
        phaseOutStart: 8840,
      },
      {
        maxCredit: 3995,
        incomeLimit: 46860,
        phaseIn: 0.34,
        phaseOut: 0.1598,
        phaseOutStart: 20131,
      },
      {
        maxCredit: 6604,
        incomeLimit: 52918,
        phaseIn: 0.4,
        phaseOut: 0.2106,
        phaseOutStart: 20131,
      },
      {
        maxCredit: 7430,
        incomeLimit: 56838,
        phaseIn: 0.45,
        phaseOut: 0.2106,
        phaseOutStart: 20131,
      },
    ],
  };

  const safeEarnedIncome =
    typeof earnedIncome === "number" && earnedIncome >= 0 ? earnedIncome : 0;
  const safeNumChildren =
    typeof numChildren === "number" && numChildren >= 0
      ? Math.min(Math.floor(numChildren), 3)
      : 0;
  const param = params[filingStatus][safeNumChildren];
  if (!param) return 0;

  // Phase-in
  let credit = Math.min(param.maxCredit, safeEarnedIncome * param.phaseIn);

  // Phase-out
  if (safeEarnedIncome > param.phaseOutStart) {
    const reduction = (safeEarnedIncome - param.phaseOutStart) * param.phaseOut;
    credit = Math.max(0, credit - reduction);
  }

  // Cap at max income limit
  if (safeEarnedIncome > param.incomeLimit) return 0;

  return Math.round(credit * 100) / 100;
}

/**
 * Estimates tax savings from traditional 401(k) contributions based on marginal tax rate.
 *
 * @param inputs - Configuration object for the calculation
 * @param inputs.contributionAmount - The amount contributed to the 401(k) plan
 * @param inputs.marginalTaxRate - The marginal tax rate as a decimal (e.g., 0.24 for 24%)
 * @returns The estimated tax savings rounded to 2 decimal places
 *
 * @example
 * // Returns 6000 (24% of $25,000)
 * estimate401kTaxSavings({ contributionAmount: 25000, marginalTaxRate: 0.24 });
 */
export function estimate401kTaxSavings(inputs: {
  contributionAmount: number;
  marginalTaxRate: number;
}): number {
  const safeContribution =
    typeof inputs.contributionAmount === "number" &&
    inputs.contributionAmount > 0
      ? inputs.contributionAmount
      : 0;
  const safeRate =
    typeof inputs.marginalTaxRate === "number" && inputs.marginalTaxRate > 0
      ? inputs.marginalTaxRate
      : 0;
  return Math.round(safeContribution * safeRate * 100) / 100;
}

/**
 * Estimates the tax savings from contributing to a Traditional IRA.
 *
 * This function calculates how much tax a person could save in the current year
 * by making a contribution to a Traditional IRA, based on their marginal tax rate.
 * The result is rounded to 2 decimal places (nearest cent).
 *
 * @param inputs - The calculation inputs
 * @param inputs.contributionAmount - The amount contributed to a Traditional IRA (in dollars)
 * @param inputs.marginalTaxRate - The marginal tax rate as a decimal (e.g., 0.22 for 22%)
 * @returns The estimated tax savings in dollars, rounded to 2 decimal places
 *
 * @example
 * // Returns 660 (22% of $3000)
 * estimateTraditionalIRATaxSavings({ contributionAmount: 3000, marginalTaxRate: 0.22 });
 */
export function estimateTraditionalIRATaxSavings(inputs: {
  contributionAmount: number;
  marginalTaxRate: number;
}): number {
  const safeContribution =
    typeof inputs.contributionAmount === "number" &&
    inputs.contributionAmount > 0
      ? inputs.contributionAmount
      : 0;
  const safeRate =
    typeof inputs.marginalTaxRate === "number" && inputs.marginalTaxRate > 0
      ? inputs.marginalTaxRate
      : 0;
  return Math.round(safeContribution * safeRate * 100) / 100;
}

/**
 * Calculates the estimated tax savings from HSA contributions based on the
 * contribution amount and marginal tax rate.
 *
 * @param inputs - The calculation inputs
 * @param inputs.contributionAmount - The amount contributed to HSA in dollars
 * @param inputs.marginalTaxRate - The marginal tax rate as a decimal (e.g., 0.24 for 24%)
 * @returns The estimated tax savings rounded to 2 decimal places
 *
 * @example
 * // Returns 600 (24% of $2500)
 * estimateHSATaxSavings({ contributionAmount: 2500, marginalTaxRate: 0.24 });
 */
export function estimateHSATaxSavings(inputs: {
  contributionAmount: number;
  marginalTaxRate: number;
}): number {
  const safeContribution =
    typeof inputs.contributionAmount === "number" &&
    inputs.contributionAmount > 0
      ? inputs.contributionAmount
      : 0;
  const safeRate =
    typeof inputs.marginalTaxRate === "number" && inputs.marginalTaxRate > 0
      ? inputs.marginalTaxRate
      : 0;
  return Math.round(safeContribution * safeRate * 100) / 100;
}

export function estimateFSATaxSavings(inputs: {
  contributionAmount: number;
  marginalTaxRate: number;
}): number {
  const safeContribution =
    typeof inputs.contributionAmount === "number" &&
    inputs.contributionAmount > 0
      ? inputs.contributionAmount
      : 0;
  const safeRate =
    typeof inputs.marginalTaxRate === "number" && inputs.marginalTaxRate > 0
      ? inputs.marginalTaxRate
      : 0;
  return Math.round(safeContribution * safeRate * 100) / 100;
}

export function estimate529PlanTaxSavings(inputs: {
  contributionAmount: number;
  marginalTaxRate: number;
}): number {
  const safeContribution =
    typeof inputs.contributionAmount === "number" &&
    inputs.contributionAmount > 0
      ? inputs.contributionAmount
      : 0;
  const safeRate =
    typeof inputs.marginalTaxRate === "number" && inputs.marginalTaxRate > 0
      ? inputs.marginalTaxRate
      : 0;
  return Math.round(safeContribution * safeRate * 100) / 100;
}

export function estimateDependentCareFSATaxSavings(inputs: {
  contributionAmount: number;
  marginalTaxRate: number;
}): number {
  const safeContribution =
    typeof inputs.contributionAmount === "number" &&
    inputs.contributionAmount > 0
      ? inputs.contributionAmount
      : 0;
  const safeRate =
    typeof inputs.marginalTaxRate === "number" && inputs.marginalTaxRate > 0
      ? inputs.marginalTaxRate
      : 0;
  return Math.round(safeContribution * safeRate * 100) / 100;
}

export function estimateStudentLoanInterestDeduction(inputs: {
  interestPaid: number;
  marginalTaxRate: number;
}): number {
  const safeInterest =
    typeof inputs.interestPaid === "number" && inputs.interestPaid > 0
      ? Math.min(inputs.interestPaid, 2500)
      : 0;
  const safeRate =
    typeof inputs.marginalTaxRate === "number" && inputs.marginalTaxRate > 0
      ? inputs.marginalTaxRate
      : 0;
  return Math.round(safeInterest * safeRate * 100) / 100;
}

export function estimateMortgageInterestDeduction(inputs: {
  interestPaid: number;
  marginalTaxRate: number;
}): number {
  const safeInterest =
    typeof inputs.interestPaid === "number" && inputs.interestPaid > 0
      ? inputs.interestPaid
      : 0;
  const safeRate =
    typeof inputs.marginalTaxRate === "number" && inputs.marginalTaxRate > 0
      ? inputs.marginalTaxRate
      : 0;
  // For realism, you could add logic to cap deduction based on mortgage balance, but here we just use interest paid.
  return Math.round(safeInterest * safeRate * 100) / 100;
}

export function estimateCharitableContributionDeduction(inputs: {
  contributionAmount: number;
  marginalTaxRate: number;
  agi?: number;
}): number {
  const safeContribution =
    typeof inputs.contributionAmount === "number" &&
    inputs.contributionAmount > 0
      ? inputs.contributionAmount
      : 0;
  const safeRate =
    typeof inputs.marginalTaxRate === "number" && inputs.marginalTaxRate > 0
      ? inputs.marginalTaxRate
      : 0;
  const agi =
    typeof inputs.agi === "number" && inputs.agi > 0 ? inputs.agi : undefined;
  let deduction = safeContribution;
  if (agi) {
    deduction = Math.min(safeContribution, agi * 0.6);
  }
  return Math.round(deduction * safeRate * 100) / 100;
}

export function estimateSALTDeduction(inputs: {
  stateAndLocalTaxes: number;
  marginalTaxRate: number;
  isItemizing?: boolean; // Optional: if false, no deduction
}): number {
  const safeSALT =
    typeof inputs.stateAndLocalTaxes === "number" &&
    inputs.stateAndLocalTaxes > 0
      ? Math.min(inputs.stateAndLocalTaxes, 10000)
      : 0;
  const safeRate =
    typeof inputs.marginalTaxRate === "number" && inputs.marginalTaxRate > 0
      ? inputs.marginalTaxRate
      : 0;
  const isItemizing =
    typeof inputs.isItemizing === "boolean" ? inputs.isItemizing : true;

  // If not itemizing, no deduction allowed
  if (!isItemizing) return 0;

  return Math.round(safeSALT * safeRate * 100) / 100;
}

export function estimateHealthInsurancePremiumDeduction(inputs: {
  premiumAmount: number;
  marginalTaxRate: number;
  netSelfEmploymentIncome?: number;
  selfEmploymentTaxRate?: number; // e.g. 0.153 for 15.3%
}): number {
  const safePremium =
    typeof inputs.premiumAmount === "number" && inputs.premiumAmount > 0
      ? inputs.premiumAmount
      : 0;
  const safeRate =
    typeof inputs.marginalTaxRate === "number" && inputs.marginalTaxRate > 0
      ? inputs.marginalTaxRate
      : 0;
  const netSE =
    typeof inputs.netSelfEmploymentIncome === "number" &&
    inputs.netSelfEmploymentIncome > 0
      ? inputs.netSelfEmploymentIncome
      : undefined;
  const seTaxRate =
    typeof inputs.selfEmploymentTaxRate === "number" &&
    inputs.selfEmploymentTaxRate > 0
      ? inputs.selfEmploymentTaxRate
      : 0.153; // Default to 15.3%

  let deduction = safePremium;
  if (netSE !== undefined) {
    // IRS: Deduction cannot exceed net SE income minus 50% of SE tax
    const seTax = netSE * seTaxRate;
    const maxDeductible = Math.max(0, netSE - 0.5 * seTax);
    deduction = Math.min(safePremium, maxDeductible);
  }
  return Math.round(deduction * safeRate * 100) / 100;
}

export function estimateBusinessExpenseDeduction(inputs: {
  expenseAmount: number;
  marginalTaxRate: number;
}): number {
  const safeExpense =
    typeof inputs.expenseAmount === "number" && inputs.expenseAmount > 0
      ? inputs.expenseAmount
      : 0;
  const safeRate =
    typeof inputs.marginalTaxRate === "number" && inputs.marginalTaxRate > 0
      ? inputs.marginalTaxRate
      : 0;
  return Math.round(safeExpense * safeRate * 100) / 100;
}

export function estimateSelfEmployedHealthInsuranceDeduction(inputs: {
  premiumAmount: number;
  marginalTaxRate: number;
  netSelfEmploymentIncome?: number;
  selfEmploymentTaxRate?: number; // e.g. 0.153 for 15.3%
}): number {
  const safePremium =
    typeof inputs.premiumAmount === "number" && inputs.premiumAmount > 0
      ? inputs.premiumAmount
      : 0;
  const safeRate =
    typeof inputs.marginalTaxRate === "number" && inputs.marginalTaxRate > 0
      ? inputs.marginalTaxRate
      : 0;
  const netSE =
    typeof inputs.netSelfEmploymentIncome === "number" &&
    inputs.netSelfEmploymentIncome > 0
      ? inputs.netSelfEmploymentIncome
      : undefined;
  const seTaxRate =
    typeof inputs.selfEmploymentTaxRate === "number" &&
    inputs.selfEmploymentTaxRate > 0
      ? inputs.selfEmploymentTaxRate
      : 0.153; // Default to 15.3%

  let deduction = safePremium;
  if (netSE !== undefined) {
    // IRS: Deduction cannot exceed net SE income minus 50% of SE tax
    const seTax = netSE * seTaxRate;
    const maxDeductible = Math.max(0, netSE - 0.5 * seTax);
    deduction = Math.min(safePremium, maxDeductible);
  }
  return Math.round(deduction * safeRate * 100) / 100;
}
