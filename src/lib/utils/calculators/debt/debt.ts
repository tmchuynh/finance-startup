interface DSCRInputs {
  netOperatingIncome: number;
  totalDebtService: number;
}

export function calculateDSCR(inputs: DSCRInputs) {
  let { netOperatingIncome, totalDebtService } = inputs;

  netOperatingIncome =
    typeof netOperatingIncome === "number" && netOperatingIncome >= 0
      ? netOperatingIncome
      : 0;
  totalDebtService =
    typeof totalDebtService === "number" && totalDebtService > 0
      ? totalDebtService
      : 0;

  if (totalDebtService === 0) {
    return {
      dscr: Infinity,
      netOperatingIncome,
      totalDebtService,
      explanation: "No debt service payments; DSCR is infinite.",
    };
  }

  const dscr = netOperatingIncome / totalDebtService;

  return {
    dscr: Math.round(dscr * 100) / 100,
    netOperatingIncome,
    totalDebtService,
    explanation: `DSCR = Net Operating Income (${netOperatingIncome}) / Total Debt Service (${totalDebtService}) = ${
      Math.round(dscr * 100) / 100
    }`,
  };
}

export function calculateDebtSnowball({
  debts, // Array of { balance: number, minimumPayment: number }
  extraPayment, // Extra amount user can pay monthly toward debts
}: {
  debts: { balance: number; minimumPayment: number }[];
  extraPayment: number;
}) {
  // Clone and sanitize input
  const debtList = debts
    .map((d) => ({
      balance: typeof d.balance === "number" && d.balance > 0 ? d.balance : 0,
      minimumPayment:
        typeof d.minimumPayment === "number" && d.minimumPayment > 0
          ? d.minimumPayment
          : 0,
    }))
    .filter((d) => d.balance > 0 && d.minimumPayment > 0);

  let totalMonths = 0;
  const paymentHistory: { month: number; balances: number[] }[] = [];

  while (debtList.some((d) => d.balance > 0)) {
    totalMonths++;
    const paymentLeft = extraPayment;

    // Pay minimums first
    for (let i = 0; i < debtList.length; i++) {
      if (debtList[i].balance > 0) {
        const pay = Math.min(debtList[i].minimumPayment, debtList[i].balance);
        debtList[i].balance = Math.max(debtList[i].balance - pay, 0);
      }
    }

    // Apply extra payment to smallest balance
    // Find index of smallest positive balance
    const smallestIndex = debtList
      .map((d, i) => ({ balance: d.balance, i }))
      .filter(({ balance }) => balance > 0)
      .sort((a, b) => a.balance - b.balance)[0]?.i;

    if (smallestIndex !== undefined && paymentLeft > 0) {
      // After minimums, apply extra to smallest
      const pay = Math.min(paymentLeft, debtList[smallestIndex].balance);
      debtList[smallestIndex].balance = Math.max(
        debtList[smallestIndex].balance - pay,
        0
      );
    }

    paymentHistory.push({
      month: totalMonths,
      balances: debtList.map((d) => d.balance),
    });
  }

  return paymentHistory;
}

interface DebtToIncomeInputs {
  monthlyDebtPayments: number;
  monthlyGrossIncome: number;
}

export function calculateDebtToIncomeRatio(inputs: DebtToIncomeInputs) {
  let { monthlyDebtPayments, monthlyGrossIncome } = inputs;

  monthlyDebtPayments =
    typeof monthlyDebtPayments === "number" && monthlyDebtPayments >= 0
      ? monthlyDebtPayments
      : 0;
  monthlyGrossIncome =
    typeof monthlyGrossIncome === "number" && monthlyGrossIncome > 0
      ? monthlyGrossIncome
      : 0;

  if (monthlyGrossIncome === 0) {
    return {
      dti: Infinity,
      monthlyDebtPayments,
      monthlyGrossIncome,
      explanation: "Gross income is zero; DTI is infinite.",
    };
  }

  const dti = monthlyDebtPayments / monthlyGrossIncome;

  return {
    dti: Math.round(dti * 10000) / 10000, // 4 decimal places for precision
    monthlyDebtPayments,
    monthlyGrossIncome,
    explanation: `DTI = Monthly Debt Payments (${monthlyDebtPayments}) / Monthly Gross Income (${monthlyGrossIncome}) = ${
      Math.round(dti * 10000) / 10000
    }`,
  };
}

export function calculateCreditCardPayoff({
  balance,
  annualInterestRate,
  monthlyPayment,
}: {
  balance: number;
  annualInterestRate: number;
  monthlyPayment: number;
}) {
  // Input validation and clamping for realism
  let remainingBalance =
    typeof balance === "number" && balance > 0 ? balance : 0;
  const monthlyRate =
    typeof annualInterestRate === "number" && annualInterestRate > 0
      ? annualInterestRate / 12
      : 0;
  const payment =
    typeof monthlyPayment === "number" && monthlyPayment > 0
      ? monthlyPayment
      : 0;

  let months = 0;
  let totalInterest = 0;

  // If payment is not enough to cover even the first month's interest, payoff is impossible
  if (payment <= remainingBalance * monthlyRate) {
    return {
      months: Infinity,
      totalInterest: Infinity,
      explanation:
        "Monthly payment is too low to cover interest; balance will never be paid off.",
    };
  }

  while (remainingBalance > 0) {
    const interest = remainingBalance * monthlyRate;
    totalInterest += interest;
    const principalPayment = payment - interest;
    remainingBalance = Math.max(remainingBalance - principalPayment, 0);
    months++;
    // Safety: prevent infinite loop for edge cases
    if (months > 1000) {
      return {
        months: Infinity,
        totalInterest: Infinity,
        explanation:
          "Calculation exceeded 1000 months; check your inputs for realism.",
      };
    }
  }

  return {
    months,
    totalInterest: Math.round(totalInterest * 100) / 100,
    explanation: `It will take ${months} months to pay off the balance with a total interest of $${
      Math.round(totalInterest * 100) / 100
    }.`,
  };
}

interface DebtPaymentInputs {
  currentMonthlyDebt: number;
  currentMonthlyIncome: number;
  reducedMonthlyIncome: number;
}

export function adjustDebtPayments(inputs: DebtPaymentInputs) {
  let { currentMonthlyDebt, currentMonthlyIncome, reducedMonthlyIncome } =
    inputs;

  // Clamp negative or invalid values to zero for realism
  currentMonthlyDebt =
    typeof currentMonthlyDebt === "number" && currentMonthlyDebt >= 0
      ? currentMonthlyDebt
      : 0;
  currentMonthlyIncome =
    typeof currentMonthlyIncome === "number" && currentMonthlyIncome > 0
      ? currentMonthlyIncome
      : 0;
  reducedMonthlyIncome =
    typeof reducedMonthlyIncome === "number" && reducedMonthlyIncome >= 0
      ? reducedMonthlyIncome
      : 0;

  if (currentMonthlyIncome === 0) {
    return {
      adjustedDebtPayment: 0,
      explanation:
        "Current monthly income is zero; adjusted debt payment set to zero.",
    };
  }

  const adjustmentFactor = reducedMonthlyIncome / currentMonthlyIncome;
  const adjustedDebtPayment =
    Math.round(currentMonthlyDebt * adjustmentFactor * 100) / 100;

  return {
    adjustedDebtPayment,
    explanation: `Adjusted Debt Payment = Current Monthly Debt (${currentMonthlyDebt}) × (Reduced Income (${reducedMonthlyIncome}) / Current Income (${currentMonthlyIncome})) = ${adjustedDebtPayment}`,
  };
}
