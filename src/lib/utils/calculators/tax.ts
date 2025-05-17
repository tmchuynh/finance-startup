import {
  DEPENDENT_DEDUCTION,
  FEDERAL_TAX_BRACKETS_HOH,
  FEDERAL_TAX_BRACKETS_MARRIED,
  FEDERAL_TAX_BRACKETS_SINGLE,
  federalTaxBrackets,
  STANDARD_DEDUCTION,
} from "@/lib/constants/calculators/tax";
import { FilingStatus, TaxBracket } from "@/lib/interfaces";

interface PayrollInputs {
  grossPayroll: number;
  numEmployees: number;
  stateUnemploymentTaxRate: number; // e.g., 0.05 for 5%
  federalUnemploymentTaxRate: number; // e.g., 0.006 for 0.6%
}

export function calculatePayrollTaxes(inputs: PayrollInputs) {
  const {
    grossPayroll,
    numEmployees,
    stateUnemploymentTaxRate,
    federalUnemploymentTaxRate,
  } = inputs;

  const socialSecurityTax = grossPayroll * 0.062; // Employee + employer portion each; employer pays full 6.2%
  const medicareTax = grossPayroll * 0.0145; // Employer portion
  const stateUnemploymentTax = grossPayroll * stateUnemploymentTaxRate;
  const federalUnemploymentTax = grossPayroll * federalUnemploymentTaxRate;

  // Total employer taxes
  const employerTaxes =
    socialSecurityTax +
    medicareTax +
    stateUnemploymentTax +
    federalUnemploymentTax;

  return {
    socialSecurityTax,
    medicareTax,
    stateUnemploymentTax,
    federalUnemploymentTax,
    employerTaxes,
  };
}

interface QuarterlyPaymentInputs {
  totalEstimatedTax: number;
  quarterlyPaymentsMade: number; // Total paid in year so far
}

export function calculateQuarterlyPayments(inputs: QuarterlyPaymentInputs) {
  const { totalEstimatedTax, quarterlyPaymentsMade } = inputs;
  const quarterlyPayment = totalEstimatedTax / 4;
  const balanceDue = totalEstimatedTax - quarterlyPaymentsMade;
  return {
    quarterlyPayment,
    balanceDue,
  };
}

interface CapitalGainsInputs {
  salePrice: number;
  purchasePrice: number;
  holdingPeriodDays: number;
  filingStatus: "single" | "married" | "head_of_household";
  ordinaryIncome: number; // Needed for bracket determination
}

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
 * Calculate self-employment tax on net business income.
 * SE tax = 15.3% on 92.35% of net business income.
 * @param businessNetIncome number
 * @returns number SE tax amount
 */
export function calculateSelfEmploymentTax(businessNetIncome: number): number {
  if (businessNetIncome <= 0) return 0;
  const taxableIncome = businessNetIncome * 0.9235;
  const seTax = taxableIncome * 0.153; // 12.4% Social Security + 2.9% Medicare
  // Social Security wage base cap (2024) for SE tax is approx $160,200 — simplified here as uncapped
  return seTax;
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
 * Main export function to calculate detailed tax breakdown.
 * @param inputs TaxInputs
 * @returns TaxBreakdown
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

export function estimateCapitalGainsTax({
  gainAmount,
  holdingPeriodInYears,
  filingStatus = "single",
  shortTermRate = 0.22, // Typically taxed as ordinary income
  longTermBrackets = federalTaxBrackets,
}: {
  gainAmount: number;
  holdingPeriodInYears: number;
  filingStatus?: FilingStatus;
  shortTermRate?: number;
  longTermBrackets?: Record<FilingStatus, TaxBracket[]>;
}) {
  if (holdingPeriodInYears < 1) {
    // Short-term: taxed at ordinary income rates, simplified here as flat rate
    return gainAmount * shortTermRate;
  } else {
    // Long-term: calculate tax progressively with brackets on gain
    return calculateFederalTax(gainAmount, longTermBrackets[filingStatus]);
  }
}

export function calculateFreelancerQuarterlyTaxesWithBrackets({
  grossIncome,
  deductions,
  filingStatus = "single",
  selfEmploymentTaxRate = 0.153,
  stateTaxRate = 0.05,
  standardDeductions = {
    single: 13850,
    married: 27700,
    headOfHousehold: 20800,
  },
  dependentDeduction = 2000,
  numDependents = 0,
}: {
  grossIncome: number;
  deductions: number;
  filingStatus?: FilingStatus;
  selfEmploymentTaxRate?: number;
  stateTaxRate?: number;
  standardDeductions?: Record<FilingStatus, number>;
  dependentDeduction?: number;
  numDependents?: number;
}) {
  const netIncome = Math.max(grossIncome - deductions, 0);
  const selfEmploymentTax = netIncome * selfEmploymentTaxRate;

  const totalDeductions =
    (standardDeductions[filingStatus] ?? 13850) +
    numDependents * dependentDeduction;
  const taxableIncome = Math.max(netIncome - totalDeductions, 0);

  const estimatedFederalTax = calculateFederalTax(
    taxableIncome,
    federalTaxBrackets[filingStatus]
  );
  const estimatedStateTax = taxableIncome * stateTaxRate;

  const totalAnnualTax =
    selfEmploymentTax + estimatedFederalTax + estimatedStateTax;
  const quarterlyTax = totalAnnualTax / 4;

  return {
    netIncome,
    selfEmploymentTax,
    estimatedFederalTax,
    estimatedStateTax,
    totalAnnualTax,
    quarterlyTax,
  };
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
