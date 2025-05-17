interface ScholarshipInputs {
  tuitionCost: number;
  scholarshipAmount: number;
}

export function calculateLoanAfterScholarship(inputs: ScholarshipInputs) {
  const { tuitionCost, scholarshipAmount } = inputs;
  return Math.max(0, tuitionCost - scholarshipAmount);
}

interface LoanPayoffInputs {
  principal: number;
  annualInterestRate: number;
  monthlyPayment: number;
}

export function estimateLoanPayoffTime(inputs: LoanPayoffInputs) {
  const { principal, annualInterestRate, monthlyPayment } = inputs;
  const monthlyInterestRate = annualInterestRate / 12;

  if (monthlyPayment <= principal * monthlyInterestRate) {
    return Infinity; // Payment too low to ever pay off loan
  }

  const payoffMonths =
    -Math.log(1 - (monthlyInterestRate * principal) / monthlyPayment) /
    Math.log(1 + monthlyInterestRate);

  return Math.ceil(payoffMonths);
}

interface LoanInterestInputs {
  principal: number;
  annualInterestRate: number;
  monthsElapsed: number;
}

export function calculateAccruedInterest(inputs: LoanInterestInputs) {
  const { principal, annualInterestRate, monthsElapsed } = inputs;
  const monthlyInterestRate = annualInterestRate / 12;

  return principal * monthlyInterestRate * monthsElapsed;
}

interface BudgetPlannerInputs {
  totalIncome: number;
  rentPercent: number; // e.g., 30 for 30%
  foodPercent: number;
  transportPercent: number;
  entertainmentPercent: number;
  miscPercent: number;
}

export function calculateStudentBudget(inputs: BudgetPlannerInputs) {
  const {
    totalIncome,
    rentPercent,
    foodPercent,
    transportPercent,
    entertainmentPercent,
    miscPercent,
  } = inputs;

  return {
    rent: (rentPercent / 100) * totalIncome,
    food: (foodPercent / 100) * totalIncome,
    transport: (transportPercent / 100) * totalIncome,
    entertainment: (entertainmentPercent / 100) * totalIncome,
    miscellaneous: (miscPercent / 100) * totalIncome,
  };
}

interface EducationSavingsInputs {
  targetAmount: number;
  annualInterestRate: number; // decimal, e.g., 0.03 for 3%
  yearsToSave: number;
}

export function calculateMonthlyEducationSavings(
  inputs: EducationSavingsInputs
) {
  const { targetAmount, annualInterestRate, yearsToSave } = inputs;
  const monthlyInterestRate = annualInterestRate / 12;
  const numberOfMonths = yearsToSave * 12;

  if (annualInterestRate === 0) {
    return targetAmount / numberOfMonths;
  }

  const monthlySavings =
    (targetAmount * monthlyInterestRate) /
    (Math.pow(1 + monthlyInterestRate, numberOfMonths) - 1);

  return monthlySavings;
}

interface StudentLoanInputs {
  principal: number;
  annualInterestRate: number; // decimal, e.g., 0.05 for 5%
  loanTermYears: number;
}

export function calculateStudentLoanPayment(inputs: StudentLoanInputs) {
  const { principal, annualInterestRate, loanTermYears } = inputs;
  const monthlyInterestRate = annualInterestRate / 12;
  const numberOfPayments = loanTermYears * 12;

  if (annualInterestRate === 0) {
    return principal / numberOfPayments;
  }

  const payment =
    (principal * monthlyInterestRate) /
    (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));

  return payment;
}

interface EducationSavingsParams {
  currentSavings: number;
  annualContribution: number;
  yearsUntilCollege: number;
  annualReturnRate: number;
}

export function calculateEducationSavings({
  currentSavings,
  annualContribution,
  yearsUntilCollege,
  annualReturnRate,
}: EducationSavingsParams): number {
  let total = currentSavings;
  for (let i = 0; i < yearsUntilCollege; i++) {
    total = (total + annualContribution) * (1 + annualReturnRate);
  }
  return total;
}

export function calculateDebtSnowball({
  debts, // Array of { balance: number, minimumPayment: number }
  extraPayment, // Extra amount user can pay monthly toward debts
}: {
  debts: { balance: number; minimumPayment: number }[];
  extraPayment: number;
}) {
  let totalMonths = 0;
  const debtBalances = debts.map((d) => d.balance);
  const debtPayments = debts.map((d) => d.minimumPayment);

  while (debtBalances.some((balance) => balance > 0)) {
    totalMonths++;
    const paymentLeft = extraPayment;

    // Pay minimums first
    for (let i = 0; i < debtBalances.length; i++) {
      if (debtBalances[i] > 0) {
        debtBalances[i] = Math.max(debtBalances[i] - debtPayments[i], 0);
      }
    }

    // Apply extra payments to smallest balance
    const smallestIndex = debtBalances
      .map((balance, i) => ({ balance, i }))
      .filter(({ balance }) => balance > 0)
      .sort((a, b) => a.balance - b.balance)[0]?.i;

    if (smallestIndex !== undefined && paymentLeft > 0) {
      debtBalances[smallestIndex] = Math.max(
        debtBalances[smallestIndex] - paymentLeft,
        0
      );
    }
  }

  return totalMonths;
}

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
  const yearsUntilCollege = collegeStartAge - currentAge;
  const futureAnnualCost =
    annualCollegeCost * Math.pow(1 + inflationRate, yearsUntilCollege);
  const totalNeeded = futureAnnualCost * 4;

  // Future value of current savings + contributions
  const futureValue =
    currentSavings * Math.pow(1 + annualReturnRate, yearsUntilCollege) +
    monthlyContribution *
      ((Math.pow(1 + annualReturnRate / 12, yearsUntilCollege * 12) - 1) /
        (annualReturnRate / 12));

  const savingsGap = totalNeeded - futureValue;

  return {
    futureAnnualCost,
    totalNeeded,
    projectedSavings: futureValue,
    savingsGap,
  };
}
