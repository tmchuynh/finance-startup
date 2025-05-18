interface HealthcareSubsidyInputs {
  annualIncome: number;
  familySize: number;
  federalPovertyLevel: number; // e.g., $13,590 for single in 2023, adjust as needed
}

export function estimateHealthcareSubsidy(inputs: HealthcareSubsidyInputs) {
  const { annualIncome, familySize, federalPovertyLevel } = inputs;
  const adjustedFPL = federalPovertyLevel * familySize;
  const incomeRatio = adjustedFPL > 0 ? annualIncome / adjustedFPL : 0;

  let eligibility: string;
  if (incomeRatio < 1) {
    eligibility = "Full subsidy likely (Medicaid eligible in most states)";
  } else if (incomeRatio >= 1 && incomeRatio <= 4) {
    eligibility = "Partial subsidy possible (premium tax credits)";
  } else {
    eligibility = "No subsidy expected";
  }

  return {
    annualIncome,
    familySize,
    federalPovertyLevel,
    adjustedFPL,
    incomeRatio: Math.round(incomeRatio * 100) / 100,
    eligibility,
    explanation: `Income is ${Math.round(
      incomeRatio * 100
    )}% of Federal Poverty Level for a family of ${familySize}.`,
  };
}
