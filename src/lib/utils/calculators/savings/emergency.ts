export function estimateEmergencyFund({
  monthlyExpenses,
  coverageMonths = 6,
}: {
  monthlyExpenses: number;
  coverageMonths?: number;
}) {
  monthlyExpenses =
    typeof monthlyExpenses === "number" && monthlyExpenses >= 0
      ? monthlyExpenses
      : 0;
  coverageMonths =
    typeof coverageMonths === "number" && coverageMonths > 0
      ? coverageMonths
      : 6;
  return Math.round(monthlyExpenses * coverageMonths * 100) / 100;
}

export function calculateSinkingFund(
  targetAmount: number,
  currentAmount: number,
  monthsRemaining: number
) {
  targetAmount =
    typeof targetAmount === "number" && targetAmount > 0 ? targetAmount : 0;
  currentAmount =
    typeof currentAmount === "number" && currentAmount >= 0 ? currentAmount : 0;
  monthsRemaining =
    typeof monthsRemaining === "number" && monthsRemaining > 0
      ? monthsRemaining
      : 1;

  const remainingAmount = Math.max(targetAmount - currentAmount, 0);
  const monthlyContribution = remainingAmount / monthsRemaining;
  return {
    remainingAmount: Math.round(remainingAmount * 100) / 100,
    monthlyContribution: Math.round(monthlyContribution * 100) / 100,
    explanation: `You need to save $${
      Math.round(monthlyContribution * 100) / 100
    } per month for ${monthsRemaining} months to reach your goal of $${targetAmount}.`,
  };
}

interface EmergencyFundInputs {
  monthlyExpenses: number;
  monthsOfCoverage: number;
}

export function calculateEmergencyFund(inputs: EmergencyFundInputs) {
  const monthlyExpenses =
    typeof inputs.monthlyExpenses === "number" && inputs.monthlyExpenses >= 0
      ? inputs.monthlyExpenses
      : 0;
  const monthsOfCoverage =
    typeof inputs.monthsOfCoverage === "number" && inputs.monthsOfCoverage > 0
      ? inputs.monthsOfCoverage
      : 6;
  return Math.round(monthlyExpenses * monthsOfCoverage * 100) / 100;
}

export function calculateEmergencyFundGoal(
  monthlyExpenses: number,
  monthsOfCoverage: number
) {
  const safeMonthlyExpenses =
    typeof monthlyExpenses === "number" && monthlyExpenses >= 0
      ? monthlyExpenses
      : 0;
  const safeMonthsOfCoverage =
    typeof monthsOfCoverage === "number" && monthsOfCoverage > 0
      ? monthsOfCoverage
      : 6;
  return Math.round(safeMonthlyExpenses * safeMonthsOfCoverage * 100) / 100;
}

export function calculateEmergencyFundShortfall(
  currentSavings: number,
  monthlyExpenses: number,
  monthsOfCoverage: number
) {
  const safeCurrentSavings =
    typeof currentSavings === "number" && currentSavings >= 0
      ? currentSavings
      : 0;
  const safeMonthlyExpenses =
    typeof monthlyExpenses === "number" && monthlyExpenses >= 0
      ? monthlyExpenses
      : 0;
  const safeMonthsOfCoverage =
    typeof monthsOfCoverage === "number" && monthsOfCoverage > 0
      ? monthsOfCoverage
      : 6;

  const goal = calculateEmergencyFundGoal(
    safeMonthlyExpenses,
    safeMonthsOfCoverage
  );
  return Math.max(goal - safeCurrentSavings, 0);
}

export function calculateEmergencyFundSurplus(
  currentSavings: number,
  monthlyExpenses: number,
  monthsOfCoverage: number
) {
  const safeCurrentSavings =
    typeof currentSavings === "number" && currentSavings >= 0
      ? currentSavings
      : 0;
  const safeMonthlyExpenses =
    typeof monthlyExpenses === "number" && monthlyExpenses >= 0
      ? monthlyExpenses
      : 0;
  const safeMonthsOfCoverage =
    typeof monthsOfCoverage === "number" && monthsOfCoverage > 0
      ? monthsOfCoverage
      : 6;

  const goal = calculateEmergencyFundGoal(
    safeMonthlyExpenses,
    safeMonthsOfCoverage
  );
  return Math.max(safeCurrentSavings - goal, 0);
}
