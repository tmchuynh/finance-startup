import { estimateMortgagePayment } from "./house";

interface DSCRInputs {
  netOperatingIncome: number;
  totalDebtService: number;
}

export function calculateDSCR(inputs: DSCRInputs) {
  const { netOperatingIncome, totalDebtService } = inputs;
  if (totalDebtService === 0) return Infinity;

  return netOperatingIncome / totalDebtService;
}

interface DebtToIncomeInputs {
  monthlyDebtPayments: number;
  monthlyGrossIncome: number;
}

export function calculateDebtToIncomeRatio(inputs: DebtToIncomeInputs) {
  if (inputs.monthlyGrossIncome === 0) return Infinity;
  return inputs.monthlyDebtPayments / inputs.monthlyGrossIncome;
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
  const monthlyRate = annualInterestRate / 12;
  let remainingBalance = balance;
  let months = 0;
  let totalInterest = 0;

  while (remainingBalance > 0) {
    const interest = remainingBalance * monthlyRate;
    totalInterest += interest;
    const principalPayment = monthlyPayment - interest;
    if (principalPayment <= 0)
      return { months: Infinity, totalInterest: Infinity }; // Payment too low to reduce balance
    remainingBalance = Math.max(remainingBalance - principalPayment, 0);
    months++;
  }

  return { months, totalInterest };
}

export function generateLoanAmortization({
  principal,
  annualInterestRate,
  termYears,
}: {
  principal: number;
  annualInterestRate: number;
  termYears: number;
}) {
  const monthlyRate = annualInterestRate / 12;
  const totalPayments = termYears * 12;
  const monthlyPayment = estimateMortgagePayment({
    principal,
    annualInterestRate,
    termYears,
  });

  let balance = principal;
  const schedule = [];

  for (let month = 1; month <= totalPayments; month++) {
    const interestPayment = balance * monthlyRate;
    const principalPayment = monthlyPayment - interestPayment;
    balance -= principalPayment;
    if (balance < 0) balance = 0;

    schedule.push({
      month,
      principalPayment,
      interestPayment,
      remainingBalance: balance,
    });
  }

  return schedule;
}

interface DebtPaymentInputs {
  currentMonthlyDebt: number;
  currentMonthlyIncome: number;
  reducedMonthlyIncome: number;
}

export function adjustDebtPayments(inputs: DebtPaymentInputs) {
  const { currentMonthlyDebt, currentMonthlyIncome, reducedMonthlyIncome } =
    inputs;
  const adjustmentFactor = reducedMonthlyIncome / currentMonthlyIncome;
  return currentMonthlyDebt * adjustmentFactor;
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
  const { principal, annualInterestRate, termMonths } = inputs;
  const monthlyRate = annualInterestRate / 12;

  const monthlyPayment =
    principal * (monthlyRate / (1 - Math.pow(1 + monthlyRate, -termMonths)));
  let balance = principal;
  let totalInterest = 0;

  const schedule: AmortizationPayment[] = [];

  for (let month = 1; month <= termMonths; month++) {
    const interestPaid = balance * monthlyRate;
    const principalPaid = monthlyPayment - interestPaid;
    balance -= principalPaid;
    totalInterest += interestPaid;

    schedule.push({
      month,
      principalPaid,
      interestPaid,
      balanceRemaining: balance > 0 ? balance : 0,
    });
  }

  return { monthlyPayment, totalInterest, schedule };
}
