interface JobTrainingInputs {
  programCost: number;
  expectedSalaryIncrease: number; // annual
  yearsToBenefit: number;
}

export function calculateJobTrainingROI(inputs: JobTrainingInputs) {
  const { programCost, expectedSalaryIncrease, yearsToBenefit } = inputs;
  const totalReturn = expectedSalaryIncrease * yearsToBenefit;
  const roi = (totalReturn - programCost) / programCost;
  return roi; // ROI ratio, e.g., 0.5 means 50% return
}

interface CapExInputs {
  plannedCapEx: number;
  actualCapEx: number;
}

export function calculateCapExVariance(inputs: CapExInputs) {
  const { plannedCapEx, actualCapEx } = inputs;
  const variance = actualCapEx - plannedCapEx;
  const percentVariance = plannedCapEx ? (variance / plannedCapEx) * 100 : 0;

  return { variance, percentVariance };
}

interface ExpenseRevenueInputs {
  totalExpenses: number;
  totalRevenue: number;
}

export function calculateExpenseToRevenueRatio(inputs: ExpenseRevenueInputs) {
  const { totalExpenses, totalRevenue } = inputs;
  if (totalRevenue === 0) return Infinity;

  return totalExpenses / totalRevenue;
}

interface BreakEvenCashFlowInputs {
  cashFixedCosts: number;
  cashVariableCosts: number;
  cashRevenue: number;
}

export function calculateBreakEvenCashFlow(inputs: BreakEvenCashFlowInputs) {
  const { cashFixedCosts, cashVariableCosts, cashRevenue } = inputs;

  if (cashRevenue <= cashVariableCosts) return Infinity;

  return cashFixedCosts / (cashRevenue - cashVariableCosts);
}

interface ExpenseForecastInputs {
  initialExpense: number;
  monthlyGrowthRate: number; // decimal e.g. 0.02 for 2%
  months: number;
}

export function forecastExpenses(inputs: ExpenseForecastInputs): number[] {
  const { initialExpense, monthlyGrowthRate, months } = inputs;
  const forecast: number[] = [];

  for (let i = 0; i < months; i++) {
    const expense = initialExpense * Math.pow(1 + monthlyGrowthRate, i);
    forecast.push(parseFloat(expense.toFixed(2)));
  }
  return forecast;
}

interface CashConversionCycleInputs {
  daysInventoryOutstanding: number;
  daysSalesOutstanding: number;
  daysPayablesOutstanding: number;
}

export function calculateCashConversionCycle(
  inputs: CashConversionCycleInputs
) {
  const {
    daysInventoryOutstanding,
    daysSalesOutstanding,
    daysPayablesOutstanding,
  } = inputs;
  return (
    daysInventoryOutstanding + daysSalesOutstanding - daysPayablesOutstanding
  );
}

interface WorkingCapitalInputs {
  currentAssets: number;
  currentLiabilities: number;
}

export function calculateWorkingCapital(inputs: WorkingCapitalInputs) {
  return inputs.currentAssets - inputs.currentLiabilities;
}

interface OperatingCashFlowInputs {
  netIncome: number;
  depreciationAmortization: number;
  changesInWorkingCapital: number; // Positive if assets decrease or liabilities increase
}

export function calculateOperatingCashFlow(inputs: OperatingCashFlowInputs) {
  const { netIncome, depreciationAmortization, changesInWorkingCapital } =
    inputs;
  return netIncome + depreciationAmortization + changesInWorkingCapital;
}

interface SalesGrowthInputs {
  salesPreviousPeriod: number;
  salesCurrentPeriod: number;
}

export function calculateSalesGrowthRate(inputs: SalesGrowthInputs) {
  const { salesPreviousPeriod, salesCurrentPeriod } = inputs;
  if (salesPreviousPeriod === 0) return Infinity;

  return (
    ((salesCurrentPeriod - salesPreviousPeriod) / salesPreviousPeriod) * 100
  );
}

interface ReorderPointInputs {
  averageDailyUsage: number;
  leadTimeDays: number;
  safetyStock: number;
}

export function calculateReorderPoint(inputs: ReorderPointInputs) {
  const { averageDailyUsage, leadTimeDays, safetyStock } = inputs;

  return averageDailyUsage * leadTimeDays + safetyStock;
}

interface OvertimeInputs {
  regularHours: number;
  overtimeHours: number;
  hourlyRate: number;
}

export function calculateOvertimePay(inputs: OvertimeInputs) {
  const { regularHours, overtimeHours, hourlyRate } = inputs;

  const regularPay = regularHours * hourlyRate;
  const overtimePay = overtimeHours * hourlyRate * 1.5;
  const totalPay = regularPay + overtimePay;

  return { regularPay, overtimePay, totalPay };
}

interface DSOInputs {
  accountsReceivable: number;
  totalCreditSales: number;
  periodDays: number;
}

export function calculateDSO(inputs: DSOInputs) {
  const { accountsReceivable, totalCreditSales, periodDays } = inputs;
  if (totalCreditSales === 0) return 0;

  return (accountsReceivable / totalCreditSales) * periodDays;
}

interface WACCInputs {
  equityValue: number;
  debtValue: number;
  costOfEquity: number; // decimal e.g. 0.08 for 8%
  costOfDebt: number; // decimal e.g. 0.05 for 5%
  taxRate: number; // decimal e.g. 0.21 for 21%
}

export function calculateWACC(inputs: WACCInputs) {
  const { equityValue, debtValue, costOfEquity, costOfDebt, taxRate } = inputs;
  const totalCapital = equityValue + debtValue;

  const weightedEquity = (equityValue / totalCapital) * costOfEquity;
  const weightedDebt = (debtValue / totalCapital) * costOfDebt * (1 - taxRate);

  return weightedEquity + weightedDebt;
}

interface Receivable {
  amount: number;
  daysOutstanding: number;
}

export function agingReceivables(receivables: Receivable[]) {
  const agingBuckets = {
    current: 0,
    "1-30": 0,
    "31-60": 0,
    "61-90": 0,
    "90+": 0,
  };

  receivables.forEach(({ amount, daysOutstanding }) => {
    if (daysOutstanding <= 30) agingBuckets["1-30"] += amount;
    else if (daysOutstanding <= 60) agingBuckets["31-60"] += amount;
    else if (daysOutstanding <= 90) agingBuckets["61-90"] += amount;
    else if (daysOutstanding > 90) agingBuckets["90+"] += amount;
  });

  agingBuckets.current = receivables
    .filter((r) => r.daysOutstanding === 0)
    .reduce((sum, r) => sum + r.amount, 0);

  return agingBuckets;
}

interface ProfitMarginInputs {
  revenue: number;
  costOfGoodsSold: number;
  operatingExpenses: number;
  interestExpense?: number;
  taxes?: number;
}

export function calculateProfitMargins(inputs: ProfitMarginInputs) {
  const {
    revenue,
    costOfGoodsSold,
    operatingExpenses,
    interestExpense = 0,
    taxes = 0,
  } = inputs;

  const grossProfit = revenue - costOfGoodsSold;
  const grossMargin = revenue ? grossProfit / revenue : 0;

  const netIncome = grossProfit - operatingExpenses - interestExpense - taxes;
  const netMargin = revenue ? netIncome / revenue : 0;

  return { grossMargin, netMargin, grossProfit, netIncome };
}

interface InventoryInputs {
  costOfGoodsSold: number;
  averageInventory: number;
}

export function calculateInventoryTurnoverRatio(inputs: InventoryInputs) {
  const { costOfGoodsSold, averageInventory } = inputs;
  if (averageInventory === 0) return Infinity;

  return costOfGoodsSold / averageInventory;
}

interface DepreciationInputs {
  assetCost: number;
  salvageValue: number;
  usefulLifeYears: number;
  yearsElapsed: number;
}

export function calculateStraightLineDepreciation(inputs: DepreciationInputs) {
  const { assetCost, salvageValue, usefulLifeYears, yearsElapsed } = inputs;
  const depreciableAmount = assetCost - salvageValue;
  const annualDepreciation = depreciableAmount / usefulLifeYears;

  const accumulatedDepreciation = Math.min(
    annualDepreciation * yearsElapsed,
    depreciableAmount
  );
  const bookValue = assetCost - accumulatedDepreciation;

  return { annualDepreciation, accumulatedDepreciation, bookValue };
}

interface BreakEvenInputs {
  fixedCosts: number;
  variableCostPerUnit: number;
  pricePerUnit: number;
}

export function calculateBreakEvenPoint(inputs: BreakEvenInputs) {
  const { fixedCosts, variableCostPerUnit, pricePerUnit } = inputs;
  if (pricePerUnit <= variableCostPerUnit) return Infinity; // no break-even if price < variable cost

  const breakEvenUnits = fixedCosts / (pricePerUnit - variableCostPerUnit);
  const breakEvenSales = breakEvenUnits * pricePerUnit;

  return { breakEvenUnits, breakEvenSales };
}

interface CashFlowInputs {
  startingCash: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  accountsReceivableDays: number; // Avg days to collect payments
  accountsPayableDays: number; // Avg days to pay expenses
}

export function forecastMonthlyCashFlow(inputs: CashFlowInputs) {
  const {
    startingCash,
    monthlyIncome,
    monthlyExpenses,
    accountsReceivableDays,
    accountsPayableDays,
  } = inputs;

  // Cash received this month is delayed by receivable days fraction
  const incomeReceived = monthlyIncome * (1 - accountsReceivableDays / 30);
  // Expenses paid this month delayed by payable days fraction
  const expensesPaid = monthlyExpenses * (1 - accountsPayableDays / 30);

  const endingCash = startingCash + incomeReceived - expensesPaid;
  return { endingCash, incomeReceived, expensesPaid };
}

export function calculateNPV({
  cashFlows, // array of cash flows per period (can be negative or positive)
  discountRate,
}: {
  cashFlows: number[];
  discountRate: number; // decimal
}) {
  return cashFlows.reduce(
    (npv, cf, i) => npv + cf / Math.pow(1 + discountRate, i + 1),
    0
  );
}

export function calculateStartupCosts({
  items,
}: {
  items: { name: string; cost: number }[];
}) {
  const total = items.reduce((sum, item) => sum + item.cost, 0);
  return { total };
}

export function calculateFreelanceRate({
  desiredAnnualIncome,
  billableHoursPerWeek,
  weeksPerYear,
  expenses,
}: {
  desiredAnnualIncome: number;
  billableHoursPerWeek: number;
  weeksPerYear: number;
  expenses?: number;
}) {
  const totalIncomeNeeded = desiredAnnualIncome + (expenses ?? 0);
  return totalIncomeNeeded / (billableHoursPerWeek * weeksPerYear);
}

export function calculateBreakEven({
  fixedCosts,
  variableCostPerUnit,
  pricePerUnit,
}: {
  fixedCosts: number;
  variableCostPerUnit: number;
  pricePerUnit: number;
}) {
  const contributionMargin = pricePerUnit - variableCostPerUnit;
  const breakEvenUnits = Math.ceil(fixedCosts / contributionMargin);

  return {
    contributionMargin,
    breakEvenUnits,
  };
}

export function estimateInflationAdjustedValue({
  currentAmount,
  inflationRate,
  years,
}: {
  currentAmount: number;
  inflationRate: number; // e.g. 0.03 for 3%
  years: number;
}) {
  return currentAmount / Math.pow(1 + inflationRate, years);
}

interface Allocation {
  [assetClass: string]: number; // percent e.g., 30 for 30%
}

export function validatePortfolioAllocation(allocation: Allocation) {
  const total = Object.values(allocation).reduce((a, b) => a + b, 0);
  return {
    total,
    isValid: Math.abs(total - 100) < 0.01,
    adjustmentNeeded: 100 - total,
  };
}
