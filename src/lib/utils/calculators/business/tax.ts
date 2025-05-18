import { federalTaxBrackets } from "@/lib/constants/calculators/tax";
import { FilingStatus, TaxBracket } from "@/lib/interfaces";
import { calculateFederalTax } from "../tax/tax";

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

  // Social Security wage base cap for 2024 is $168,600
  const SOCIAL_SECURITY_WAGE_BASE = 168600;
  const socialSecurityTaxable = Math.min(
    grossPayroll,
    SOCIAL_SECURITY_WAGE_BASE * numEmployees
  );
  const socialSecurityTax = socialSecurityTaxable * 0.062; // Employer pays 6.2%

  // Medicare has no wage base cap
  const medicareTax = grossPayroll * 0.0145; // Employer portion

  // Unemployment taxes are typically only on the first $7,000 per employee (FUTA wage base)
  const FUTA_WAGE_BASE = 7000;
  const futaTaxableWages = Math.min(
    grossPayroll,
    FUTA_WAGE_BASE * numEmployees
  );
  const federalUnemploymentTax = futaTaxableWages * federalUnemploymentTaxRate;

  // State unemployment wage base varies by state, but let's allow full payroll for now
  const stateUnemploymentTax = grossPayroll * stateUnemploymentTaxRate;

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
  const standardQuarterly = totalEstimatedTax / 4;

  // Calculate how many full quarterly payments have been made
  const quartersPaid = Math.floor(quarterlyPaymentsMade / standardQuarterly);

  // Payments remaining (never less than 0)
  const paymentsRemaining = Math.max(4 - quartersPaid, 0);

  // Remaining balance due for the year
  const balanceDue = Math.max(totalEstimatedTax - quarterlyPaymentsMade, 0);

  // Next payment: divide remaining balance by remaining quarters, or $0 if paid up
  const nextQuarterlyPayment =
    paymentsRemaining > 0 ? Math.max(balanceDue / paymentsRemaining, 0) : 0;

  // If overpaid, set everything to zero
  if (balanceDue <= 0) {
    return {
      quarterlyPayment: 0,
      nextQuarterlyPayment: 0,
      paymentsRemaining: 0,
      balanceDue: 0,
      overpaid: Math.abs(balanceDue),
    };
  }

  return {
    quarterlyPayment: standardQuarterly,
    nextQuarterlyPayment,
    paymentsRemaining,
    balanceDue,
    overpaid: 0,
  };
}

/**
 * Calculate self-employment tax on net business income.
 * SE tax = 15.3% on 92.35% of net business income.
 * @param businessNetIncome number
 * @returns number SE tax amount
 */
export function calculateSelfEmploymentTax(businessNetIncome: number): number {
  if (businessNetIncome <= 0) return 0;

  // Social Security wage base cap for 2024 is $168,600
  const SOCIAL_SECURITY_WAGE_BASE = 168600;
  const socialSecurityRate = 0.124; // 12.4%
  const medicareRate = 0.029; // 2.9%

  // Only 92.35% of net income is subject to SE tax
  const taxableIncome = businessNetIncome * 0.9235;

  // Social Security portion is capped at wage base
  const socialSecurityTax =
    Math.min(taxableIncome, SOCIAL_SECURITY_WAGE_BASE) * socialSecurityRate;

  // Medicare portion is uncapped
  const medicareTax = taxableIncome * medicareRate;

  let additionalMedicareTax = 0;
  if (taxableIncome > 200000) {
    additionalMedicareTax = (taxableIncome - 200000) * 0.009;
  }

  const seTax = socialSecurityTax + medicareTax + additionalMedicareTax;
  return seTax;
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
  if (gainAmount <= 0) return 0;

  // Short-term capital gains: taxed as ordinary income (use provided flat rate as fallback)
  if (holdingPeriodInYears < 1) {
    return gainAmount * shortTermRate;
  }

  // Long-term capital gains: use progressive brackets for the given filing status
  // If brackets for the filing status are not found, fallback to "single"
  const brackets = longTermBrackets[filingStatus] || longTermBrackets["single"];

  // Realistically, long-term capital gains are taxed progressively
  let remaining = gainAmount;
  let tax = 0;
  let lastLimit = 0;

  for (const bracket of brackets) {
    if (remaining <= 0) break;
    const taxableAtThisRate = Math.min(
      remaining,
      bracket.max !== undefined ? bracket.max - lastLimit : remaining
    );
    tax += taxableAtThisRate * bracket.rate;
    remaining -= taxableAtThisRate;
    lastLimit = bracket.max ?? lastLimit;
  }

  return tax;
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
  // Net income after business deductions
  const netIncome = Math.max(grossIncome - deductions, 0);

  // Calculate self-employment tax using the realistic function
  const selfEmploymentTax = calculateSelfEmploymentTax(netIncome);

  // Deduct half of SE tax for AGI (as allowed by IRS)
  const halfSETaxDeduction = selfEmploymentTax / 2;

  // Calculate total deductions: standard + dependents + half SE tax
  const totalDeductions =
    (standardDeductions[filingStatus] ?? 13850) +
    numDependents * dependentDeduction +
    halfSETaxDeduction;

  // Taxable income for federal and state
  const taxableIncome = Math.max(netIncome - totalDeductions, 0);

  // Estimate federal tax using progressive brackets
  const estimatedFederalTax = calculateFederalTax(
    taxableIncome,
    federalTaxBrackets[filingStatus]
  );

  // Estimate state tax (flat rate, most states are not progressive)
  const estimatedStateTax = taxableIncome * stateTaxRate;

  // Total annual tax liability
  const totalAnnualTax =
    selfEmploymentTax + estimatedFederalTax + estimatedStateTax;

  // Quarterly estimated payment
  const quarterlyTax = totalAnnualTax / 4;

  return {
    netIncome,
    selfEmploymentTax,
    halfSETaxDeduction,
    totalDeductions,
    taxableIncome,
    estimatedFederalTax,
    estimatedStateTax,
    totalAnnualTax,
    quarterlyTax,
  };
}
