import { estimateMortgagePayment } from "../real-estate/mortgage";

export function generateLoanAmortization({
  principal,
  annualInterestRate,
  termYears,
}: {
  principal: number;
  annualInterestRate: number;
  termYears: number;
}) {
  // Input validation and clamping for realism
  principal = typeof principal === "number" && principal > 0 ? principal : 0;
  annualInterestRate =
    typeof annualInterestRate === "number" && annualInterestRate >= 0
      ? annualInterestRate
      : 0;
  termYears = typeof termYears === "number" && termYears > 0 ? termYears : 1;

  const monthlyRate = annualInterestRate / 12;
  const totalPayments = termYears * 12;

  // If interest rate is zero, simple division
  let monthlyPayment: number;
  if (annualInterestRate === 0) {
    monthlyPayment = principal / totalPayments;
  } else {
    monthlyPayment = estimateMortgagePayment({
      principal,
      annualInterestRate,
      termYears,
    });
  }

  let balance = principal;
  const schedule = [];

  for (let month = 1; month <= totalPayments; month++) {
    const interestPayment = balance * monthlyRate;
    let principalPayment = monthlyPayment - interestPayment;

    // Prevent negative principal payment in final month due to rounding
    if (principalPayment > balance) principalPayment = balance;

    balance -= principalPayment;
    if (balance < 0) balance = 0;

    schedule.push({
      month,
      principalPayment: Math.round(principalPayment * 100) / 100,
      interestPayment: Math.round(interestPayment * 100) / 100,
      remainingBalance: Math.round(balance * 100) / 100,
    });

    // Stop if loan is paid off early due to rounding
    if (balance === 0) break;
  }

  return schedule;
}

interface LoanPayoffInputs {
  principal: number;
  annualInterestRate: number;
  monthlyPayment: number;
}

export function estimateLoanPayoffTime(inputs: LoanPayoffInputs) {
  let { principal, annualInterestRate, monthlyPayment } = inputs;

  principal = typeof principal === "number" && principal > 0 ? principal : 0;
  annualInterestRate =
    typeof annualInterestRate === "number" && annualInterestRate >= 0
      ? annualInterestRate
      : 0;
  monthlyPayment =
    typeof monthlyPayment === "number" && monthlyPayment > 0
      ? monthlyPayment
      : 0;

  const monthlyInterestRate = annualInterestRate / 12;

  if (principal === 0) {
    return 0;
  }

  if (monthlyInterestRate === 0) {
    // No interest, simple division
    return Math.ceil(principal / monthlyPayment);
  }

  if (monthlyPayment <= principal * monthlyInterestRate) {
    return Infinity; // Payment too low to ever pay off loan
  }

  const payoffMonths =
    -Math.log(1 - (monthlyInterestRate * principal) / monthlyPayment) /
    Math.log(1 + monthlyInterestRate);

  return Math.ceil(payoffMonths);
}

interface StudentLoanInputs {
  principal: number;
  annualInterestRate: number; // decimal, e.g., 0.05 for 5%
  loanTermYears: number;
}

export function calculateStudentLoanPayment(inputs: StudentLoanInputs) {
  let { principal, annualInterestRate, loanTermYears } = inputs;

  principal = typeof principal === "number" && principal > 0 ? principal : 0;
  annualInterestRate =
    typeof annualInterestRate === "number" && annualInterestRate >= 0
      ? annualInterestRate
      : 0;
  loanTermYears =
    typeof loanTermYears === "number" && loanTermYears > 0 ? loanTermYears : 1;

  const monthlyInterestRate = annualInterestRate / 12;
  const numberOfPayments = loanTermYears * 12;

  if (principal === 0 || numberOfPayments === 0) {
    return 0;
  }

  if (annualInterestRate === 0) {
    return principal / numberOfPayments;
  }

  const payment =
    (principal * monthlyInterestRate) /
    (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));

  return payment;
}

interface LoanInterestInputs {
  principal: number;
  annualInterestRate: number;
  monthsElapsed: number;
}

export function calculateAccruedInterest(inputs: LoanInterestInputs) {
  let { principal, annualInterestRate, monthsElapsed } = inputs;

  principal = typeof principal === "number" && principal > 0 ? principal : 0;
  annualInterestRate =
    typeof annualInterestRate === "number" && annualInterestRate >= 0
      ? annualInterestRate
      : 0;
  monthsElapsed =
    typeof monthsElapsed === "number" && monthsElapsed > 0 ? monthsElapsed : 0;

  const monthlyInterestRate = annualInterestRate / 12;

  const accruedInterest = principal * monthlyInterestRate * monthsElapsed;

  return Math.round(accruedInterest * 100) / 100;
}

interface LoanInputs {
  principal: number;
  annualInterestRate: number; // decimal e.g., 0.07 for 7%
  termMonths: number;
}

interface AmortizationPayment {
  month: number;
  principalPaid: number;
  interestPaid: number;
  balanceRemaining: number;
}

export function calculateLoanAmortization(inputs: LoanInputs) {
  let { principal, annualInterestRate, termMonths } = inputs;

  principal = typeof principal === "number" && principal > 0 ? principal : 0;
  annualInterestRate =
    typeof annualInterestRate === "number" && annualInterestRate >= 0
      ? annualInterestRate
      : 0;
  termMonths =
    typeof termMonths === "number" && termMonths > 0 ? termMonths : 1;

  const monthlyRate = annualInterestRate / 12;

  let monthlyPayment: number;
  if (annualInterestRate === 0) {
    monthlyPayment = principal / termMonths;
  } else {
    monthlyPayment =
      principal * (monthlyRate / (1 - Math.pow(1 + monthlyRate, -termMonths)));
  }

  let balance = principal;
  let totalInterest = 0;
  const schedule: AmortizationPayment[] = [];

  for (let month = 1; month <= termMonths; month++) {
    const interestPaid = balance * monthlyRate;
    let principalPaid = monthlyPayment - interestPaid;

    // Prevent overpayment in the last month due to rounding
    if (principalPaid > balance) principalPaid = balance;

    balance -= principalPaid;
    if (balance < 0) balance = 0;

    totalInterest += interestPaid;

    schedule.push({
      month,
      principalPaid: Math.round(principalPaid * 100) / 100,
      interestPaid: Math.round(interestPaid * 100) / 100,
      balanceRemaining: Math.round(balance * 100) / 100,
    });

    if (balance === 0) break;
  }

  return {
    monthlyPayment: Math.round(monthlyPayment * 100) / 100,
    totalInterest: Math.round(totalInterest * 100) / 100,
    schedule,
  };
}

interface CarLoanParams {
  loanAmount: number;
  annualInterestRate: number;
  termMonths: number;
}

export function calculateCarLoanPayments({
  loanAmount,
  annualInterestRate,
  termMonths,
}: CarLoanParams) {
  loanAmount =
    typeof loanAmount === "number" && loanAmount > 0 ? loanAmount : 0;
  annualInterestRate =
    typeof annualInterestRate === "number" && annualInterestRate >= 0
      ? annualInterestRate
      : 0;
  termMonths =
    typeof termMonths === "number" && termMonths > 0 ? termMonths : 1;

  const monthlyRate = annualInterestRate / 12;

  let monthlyPayment: number;
  if (annualInterestRate === 0) {
    monthlyPayment = loanAmount / termMonths;
  } else {
    monthlyPayment =
      (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -termMonths));
  }

  const totalPayment = monthlyPayment * termMonths;
  const totalInterest = totalPayment - loanAmount;

  return {
    monthlyPayment: Math.round(monthlyPayment * 100) / 100,
    totalPayment: Math.round(totalPayment * 100) / 100,
    totalInterest: Math.round(totalInterest * 100) / 100,
  };
}
