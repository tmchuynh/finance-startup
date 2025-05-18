import {
  DEPENDENT_DEDUCTION,
  FEDERAL_TAX_BRACKETS_HOH,
  FEDERAL_TAX_BRACKETS_MARRIED,
  FEDERAL_TAX_BRACKETS_SINGLE,
  federalTaxBrackets,
  STANDARD_DEDUCTION,
} from "@/lib/constants/calculators/tax";
import { FilingStatus } from "@/lib/interfaces";
import { calculateSelfEmploymentTax } from "../business/tax";

interface CapitalGainsInputs {
  salePrice: number;
  purchasePrice: number;
  holdingPeriodDays: number;
  filingStatus: "single" | "married" | "head_of_household";
  ordinaryIncome: number; // Needed for bracket determination
}

/**
 * Calculates capital gains tax based on sale price, purchase price, holding period, and income.
 *
 * This function determines the tax owed on capital gains by considering:
 * - Whether the gain is short-term (held ≤ 365 days) or long-term (> 365 days)
 * - The taxpayer's filing status (single or married)
 * - The taxpayer's ordinary income
 *
 * Short-term capital gains are taxed as ordinary income using the applicable federal tax brackets.
 * Long-term capital gains are taxed using preferential tax rates (0%, 15%, or 20%) based on income thresholds.
 *
 * @param inputs - The capital gains calculation inputs
 * @param inputs.salePrice - The price at which the asset was sold
 * @param inputs.purchasePrice - The price at which the asset was originally purchased
 * @param inputs.holdingPeriodDays - The number of days the asset was held
 * @param inputs.filingStatus - The tax filing status ('single' or 'married')
 * @param inputs.ordinaryIncome - The taxpayer's ordinary income before capital gains
 *
 * @returns The amount of capital gains tax owed, or 0 if there was no gain
 *
 * @example
 * const tax = calculateCapitalGainsTax({
 *   salePrice: 15000,
 *   purchasePrice: 10000,
 *   holdingPeriodDays: 400,
 *   filingStatus: 'single',
 *   ordinaryIncome: 80000
 * });
 */
export function calculateCapitalGainsTax(inputs: CapitalGainsInputs): number {
  const {
    salePrice,
    purchasePrice,
    holdingPeriodDays,
    filingStatus,
    ordinaryIncome,
  } = inputs;
  const gain = salePrice - purchasePrice;
  if (gain <= 0) return 0;

  // Short-term = held <= 365 days => taxed as ordinary income
  if (holdingPeriodDays <= 365) {
    // Use ordinary income tax brackets, assume federal only
    // Simplified: marginal tax rate based on ordinary income + gain
    const totalIncome = ordinaryIncome + gain;
    // Use same federal tax brackets as before (single filer example here)
    const brackets =
      filingStatus === "single"
        ? FEDERAL_TAX_BRACKETS_SINGLE
        : FEDERAL_TAX_BRACKETS_MARRIED;
    // Find marginal rate for totalIncome
    let rate = 0.1;
    for (let i = brackets.length - 1; i >= 0; i--) {
      if (totalIncome > brackets[i].threshold) {
        rate = brackets[i].rate;
        break;
      }
    }
    return gain * rate;
  } else {
    // Long-term capital gains rates for 2024 (single filer, simplified)
    // 0% up to $44,625, 15% up to $492,300, 20% above
    const longTermBrackets = [
      { threshold: 0, rate: 0.0 },
      { threshold: 44625, rate: 0.15 },
      { threshold: 492300, rate: 0.2 },
    ];
    // Taxable income plus gains
    const totalIncome = ordinaryIncome + gain;

    // Calculate long-term capital gains tax progressively
    let tax = 0;
    let remainingGain = gain;
    for (let i = longTermBrackets.length - 1; i >= 0; i--) {
      if (totalIncome > longTermBrackets[i].threshold) {
        const taxableAtRate = Math.min(
          remainingGain,
          totalIncome - longTermBrackets[i].threshold
        );
        tax += taxableAtRate * longTermBrackets[i].rate;
        remainingGain -= taxableAtRate;
      }
    }
    return tax;
  }
}

// Types for inputs and outputs
interface TaxInputs {
  grossIncome: number; // Wages + other income (excluding business income)
  businessNetIncome: number; // Net income from self-employment
  filingStatus: "single" | "married" | "head_of_household";
  numDependents: number;
  standardDeduction?: number; // Use IRS default if undefined
  dependentDeduction?: number; // Default to $2000 per dependent if undefined
  stateTaxRate?: number; // Flat state tax rate in decimal, e.g., 0.05 = 5%
  quarterlyPaidSoFar?: number; // Amount of tax already paid this year via quarterly payments
}

interface TaxBreakdown {
  adjustedGrossIncome: number;
  selfEmploymentTax: number;
  halfSelfEmploymentTaxDeduction: number;
  taxableIncome: number;
  federalTax: number;
  stateTax: number;
  totalTax: number;
  quarterlyEstimatedPayment: number;
  quarterlyBalanceDue: number;
}

/**
 * Calculate federal income tax with progressive brackets.
 * @param taxableIncome number
 * @param brackets Array<{threshold:number, rate:number}>
 * @returns number tax amount
 */
export function calculateFederalTax(
  taxableIncome: number,
  brackets: { threshold: number; rate: number }[]
): number {
  if (taxableIncome <= 0) return 0;

  let tax = 0;
  for (let i = brackets.length - 1; i >= 0; i--) {
    if (taxableIncome > brackets[i].threshold) {
      tax += (taxableIncome - brackets[i].threshold) * brackets[i].rate;
      taxableIncome = brackets[i].threshold;
    }
  }
  return tax;
}

/**
 * Calculates detailed tax breakdown based on income and filing information
 *
 * This function performs a comprehensive tax calculation by:
 * 1. Computing Adjusted Gross Income (AGI)
 * 2. Calculating Self-Employment Tax
 * 3. Determining Taxable Income after applicable deductions
 * 4. Applying appropriate tax brackets based on filing status
 * 5. Computing federal, state, and self-employment tax amounts
 * 6. Calculating quarterly estimated payments and remaining balance
 *
 * @param inputs - Tax calculation parameters
 * @param inputs.grossIncome - Total gross (W2) income
 * @param inputs.businessNetIncome - Net income from self-employment/business activities
 * @param inputs.filingStatus - Tax filing status ("single", "married", or "head_of_household")
 * @param inputs.numDependents - Number of dependents to claim
 * @param inputs.standardDeduction - Optional standard deduction amount (defaults to status-based value)
 * @param inputs.dependentDeduction - Optional dependent deduction amount (defaults to constant)
 * @param inputs.stateTaxRate - Optional state tax rate as decimal (defaults to 0)
 * @param inputs.quarterlyPaidSoFar - Optional amount of quarterly estimated tax already paid (defaults to 0)
 *
 * @returns Tax breakdown with calculated values for AGI, various tax components,
 *          total tax liability, and quarterly payment information
 */
export function calculateTax(inputs: TaxInputs): TaxBreakdown {
  const {
    grossIncome,
    businessNetIncome,
    filingStatus,
    numDependents,
    standardDeduction = STANDARD_DEDUCTION[filingStatus],
    dependentDeduction = DEPENDENT_DEDUCTION,
    stateTaxRate = 0,
    quarterlyPaidSoFar = 0,
  } = inputs;

  // Step 1: Adjusted Gross Income (AGI)
  const agi = grossIncome + businessNetIncome;

  // Step 2: Self-Employment Tax
  const seTax = calculateSelfEmploymentTax(businessNetIncome);
  const halfSeTaxDeduction = seTax / 2;

  // Step 3: Taxable Income
  let taxableIncome =
    agi -
    standardDeduction -
    numDependents * dependentDeduction -
    halfSeTaxDeduction;
  taxableIncome = taxableIncome > 0 ? taxableIncome : 0;

  // Step 4: Select federal brackets by filing status
  let brackets = FEDERAL_TAX_BRACKETS_SINGLE;
  if (filingStatus === "married") brackets = FEDERAL_TAX_BRACKETS_MARRIED;
  else if (filingStatus === "head_of_household")
    brackets = FEDERAL_TAX_BRACKETS_HOH;

  // Step 5: Calculate federal tax
  const federalTax = calculateFederalTax(taxableIncome, brackets);

  // Step 6: Calculate state tax (flat rate on taxable income)
  const stateTax = taxableIncome * stateTaxRate;

  // Step 7: Total tax liability
  const totalTax = federalTax + seTax + stateTax;

  // Step 8: Quarterly estimated payments
  const quarterlyEstimate = totalTax / 4;
  const quarterlyBalanceDue = quarterlyEstimate * 4 - quarterlyPaidSoFar;

  return {
    adjustedGrossIncome: agi,
    selfEmploymentTax: seTax,
    halfSelfEmploymentTaxDeduction: halfSeTaxDeduction,
    taxableIncome,
    federalTax,
    stateTax,
    totalTax,
    quarterlyEstimatedPayment: quarterlyEstimate,
    quarterlyBalanceDue,
  };
}

interface TaxWithholdingParams {
  annualIncome: number;
  filingStatus: "single" | "married";
  federalTaxWithheld: number;
  standardDeduction: number;
  taxBrackets: { rate: number; bracketLimit: number }[]; // ascending order
}

export function estimateTaxOwed({
  annualIncome,
  filingStatus,
  federalTaxWithheld,
  standardDeduction,
  taxBrackets,
}: TaxWithholdingParams): number {
  const taxableIncome = Math.max(annualIncome - standardDeduction, 0);

  let taxOwed = 0;
  let lastLimit = 0;
  for (const bracket of taxBrackets) {
    if (taxableIncome <= lastLimit) break;
    const incomeInBracket =
      Math.min(taxableIncome, bracket.bracketLimit) - lastLimit;
    taxOwed += incomeInBracket * bracket.rate;
    lastLimit = bracket.bracketLimit;
  }

  return federalTaxWithheld - taxOwed; // positive: refund, negative: owed
}

export function calculateEAR({
  nominalRate,
  compoundingPeriodsPerYear,
}: {
  nominalRate: number; // e.g. 0.05 for 5%
  compoundingPeriodsPerYear: number;
}) {
  return (
    Math.pow(
      1 + nominalRate / compoundingPeriodsPerYear,
      compoundingPeriodsPerYear
    ) - 1
  );
}

export function estimateTaxWithholding({
  expectedAnnualIncome,
  expectedTaxLiability,
  paychecksPerYear = 26,
}: {
  expectedAnnualIncome: number;
  expectedTaxLiability: number;
  paychecksPerYear?: number;
}) {
  const withholdingPerPaycheck = expectedTaxLiability / paychecksPerYear;
  const withholdingRate =
    withholdingPerPaycheck / (expectedAnnualIncome / paychecksPerYear);
  return { withholdingPerPaycheck, withholdingRate };
}

/**
 * Estimates income taxes for W2 employees based on tax brackets and deductions.
 *
 * @param {Object} params - The parameters for tax calculation
 * @param {number} params.annualSalary - The gross annual salary
 * @param {number} [params.numDependents=0] - Number of dependents for tax deduction purposes
 * @param {FilingStatus} [params.filingStatus="single"] - Tax filing status (single, married, or headOfHousehold)
 * @param {number} [params.stateTaxRate=0.05] - State tax rate as a decimal (default 5%)
 * @param {Record<FilingStatus, number>} [params.standardDeductions] - Standard deductions by filing status
 * @param {number} [params.dependentDeduction=2000] - Deduction amount per dependent
 *
 * @returns {Object} Tax calculation results
 * @returns {number} returns.taxableIncome - Income amount subject to taxation after deductions
 * @returns {number} returns.estimatedFederalTax - Estimated federal tax amount
 * @returns {number} returns.estimatedStateTax - Estimated state tax amount
 * @returns {number} returns.totalTax - Combined federal and state taxes
 * @returns {number} returns.effectiveTaxRate - Total tax as a percentage of annual salary
 */
export function estimateW2IncomeTaxesWithBrackets({
  annualSalary,
  numDependents = 0,
  filingStatus = "single",
  stateTaxRate = 0.05,
  standardDeductions = {
    single: 13850,
    married: 27700,
    headOfHousehold: 20800,
  },
  dependentDeduction = 2000,
}: {
  annualSalary: number;
  numDependents?: number;
  filingStatus?: FilingStatus;
  stateTaxRate?: number;
  standardDeductions?: Record<FilingStatus, number>;
  dependentDeduction?: number;
}) {
  const standardDeduction = standardDeductions[filingStatus];
  const totalDeductions =
    standardDeduction + numDependents * dependentDeduction;
  const taxableIncome = Math.max(annualSalary - totalDeductions, 0);

  const estimatedFederalTax = calculateFederalTax(
    taxableIncome,
    federalTaxBrackets[filingStatus]
  );
  const estimatedStateTax = taxableIncome * stateTaxRate;

  const totalTax = estimatedFederalTax + estimatedStateTax;
  const effectiveTaxRate = totalTax / annualSalary;

  return {
    taxableIncome,
    estimatedFederalTax,
    estimatedStateTax,
    totalTax,
    effectiveTaxRate,
  };
}

export function estimatePaycheckWithholding({
  grossPay,
  federalRate,
  stateRate,
  deductions = 0,
}: {
  grossPay: number;
  federalRate: number;
  stateRate: number;
  deductions?: number;
}) {
  const taxableIncome = grossPay - deductions;
  const federalTax = taxableIncome * federalRate;
  const stateTax = taxableIncome * stateRate;
  const netPay = grossPay - federalTax - stateTax;

  return { federalTax, stateTax, netPay };
}
