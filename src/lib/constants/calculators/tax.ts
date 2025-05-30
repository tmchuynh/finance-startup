import { FilingStatus, TaxBracket } from "@/lib/interfaces";

// Dependent deduction default (can be customized)
export const DEPENDENT_DEDUCTION = 2000;

// 2024 Standard Deduction Amounts (IRS)
export const STANDARD_DEDUCTION: Record<string, number> = {
  single: 13850,
  married: 27700,
  head_of_household: 20800,
};

// Federal income tax brackets for 2024 Single filer (simplified example)
export const FEDERAL_TAX_BRACKETS_SINGLE = [
  { threshold: 0, rate: 0.1 },
  { threshold: 11000, rate: 0.12 },
  { threshold: 44725, rate: 0.22 },
  { threshold: 95375, rate: 0.24 },
  { threshold: 182100, rate: 0.32 },
  { threshold: 231250, rate: 0.35 },
  { threshold: 578125, rate: 0.37 },
  { threshold: 1000000, rate: 0.4 },
];

// Federal brackets for Married Filing Jointly
export const FEDERAL_TAX_BRACKETS_MARRIED = [
  { threshold: 0, rate: 0.1 },
  { threshold: 22000, rate: 0.12 },
  { threshold: 89450, rate: 0.22 },
  { threshold: 190750, rate: 0.24 },
  { threshold: 364200, rate: 0.32 },
  { threshold: 462500, rate: 0.35 },
  { threshold: 693750, rate: 0.37 },
  { threshold: 1000000, rate: 0.4 },
];

// Federal brackets for Head of Household
export const FEDERAL_TAX_BRACKETS_HOH = [
  { threshold: 0, rate: 0.1 },
  { threshold: 15700, rate: 0.12 },
  { threshold: 59850, rate: 0.22 },
  { threshold: 95350, rate: 0.24 },
  { threshold: 182100, rate: 0.32 },
  { threshold: 231250, rate: 0.35 },
  { threshold: 578100, rate: 0.37 },
  { threshold: 1000000, rate: 0.4 },
];

export const federalTaxBrackets: Record<FilingStatus, TaxBracket[]> = {
  single: [
    { threshold: 0, rate: 0.1, max: 11000 },
    { threshold: 11000, rate: 0.12, max: 44725 },
    { threshold: 44725, rate: 0.22, max: 95375 },
    { threshold: 95375, rate: 0.24, max: 182100 },
    { threshold: 182100, rate: 0.32, max: 231250 },
    { threshold: 231250, rate: 0.35, max: 578125 },
    { threshold: 578125, rate: 0.37, max: 1000000 },
    { threshold: 1000000, rate: 0.4, max: Infinity },
  ],
  married: [
    { threshold: 0, rate: 0.1, max: 22000 },
    { threshold: 22000, rate: 0.12, max: 89450 },
    { threshold: 89450, rate: 0.22, max: 190750 },
    { threshold: 190750, rate: 0.24, max: 364200 },
    { threshold: 364200, rate: 0.32, max: 462500 },
    { threshold: 462500, rate: 0.35, max: 693750 },
    { threshold: 693750, rate: 0.37, max: 1000000 },
    { threshold: 1000000, rate: 0.4, max: Infinity },
  ],
  headOfHousehold: [
    { threshold: 0, rate: 0.1, max: 15700 },
    { threshold: 15700, rate: 0.12, max: 59850 },
    { threshold: 59850, rate: 0.22, max: 95350 },
    { threshold: 95350, rate: 0.24, max: 182100 },
    { threshold: 182100, rate: 0.32, max: 231250 },
    { threshold: 231250, rate: 0.35, max: 578100 },
    { threshold: 578100, rate: 0.37, max: 1000000 },
    { threshold: 1000000, rate: 0.4, max: Infinity },
  ],
};
