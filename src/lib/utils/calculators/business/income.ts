interface DSOInputs {
  accountsReceivable: number;
  totalCreditSales: number;
  periodDays: number;
}

export function calculateDSO(inputs: DSOInputs) {
  let { accountsReceivable, totalCreditSales, periodDays } = inputs;

  // Clamp negative or invalid values to zero for realism
  accountsReceivable =
    typeof accountsReceivable === "number" && accountsReceivable >= 0
      ? accountsReceivable
      : 0;
  totalCreditSales =
    typeof totalCreditSales === "number" && totalCreditSales > 0
      ? totalCreditSales
      : 0;
  periodDays =
    typeof periodDays === "number" && periodDays > 0 ? periodDays : 0;

  if (totalCreditSales === 0 || periodDays === 0) {
    return {
      dso: 0,
      accountsReceivable,
      totalCreditSales,
      periodDays,
      explanation:
        "Insufficient credit sales or period days for DSO calculation.",
    };
  }

  const dso = (accountsReceivable / totalCreditSales) * periodDays;

  return {
    dso: Math.round(dso * 100) / 100,
    accountsReceivable,
    totalCreditSales,
    periodDays,
    explanation: `DSO = (Accounts Receivable (${accountsReceivable}) / Total Credit Sales (${totalCreditSales})) × Period Days (${periodDays}) = ${
      Math.round(dso * 100) / 100
    }`,
  };
}

interface SalesGrowthInputs {
  salesPreviousPeriod: number;
  salesCurrentPeriod: number;
  previousLabel?: string;
  currentLabel?: string;
}

export function calculateSalesGrowthRate(inputs: SalesGrowthInputs) {
  const {
    salesPreviousPeriod,
    salesCurrentPeriod,
    previousLabel = "Previous",
    currentLabel = "Current",
  } = inputs;
  if (salesPreviousPeriod === 0) {
    if (salesCurrentPeriod === 0) {
      return {
        percentGrowth: 0,
        absoluteGrowth: 0,
        message: "No sales in either period",
        previousLabel,
        currentLabel,
      };
    }
    return {
      percentGrowth: Infinity,
      absoluteGrowth: salesCurrentPeriod,
      message: "No previous sales; all current sales are new",
      previousLabel,
      currentLabel,
    };
  }
  const absoluteGrowth = salesCurrentPeriod - salesPreviousPeriod;
  const percentGrowth = (absoluteGrowth / salesPreviousPeriod) * 100;
  return {
    percentGrowth,
    absoluteGrowth,
    isGrowth: percentGrowth > 0,
    previous: salesPreviousPeriod,
    current: salesCurrentPeriod,
    previousLabel,
    currentLabel,
  };
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
    total: 0,
  };

  receivables.forEach(({ amount, daysOutstanding }) => {
    // Clamp negative/invalid values to zero
    const amt = typeof amount === "number" && amount > 0 ? amount : 0;
    const days =
      typeof daysOutstanding === "number" && daysOutstanding >= 0
        ? daysOutstanding
        : 0;

    if (days === 0) agingBuckets.current += amt;
    else if (days <= 30) agingBuckets["1-30"] += amt;
    else if (days <= 60) agingBuckets["31-60"] += amt;
    else if (days <= 90) agingBuckets["61-90"] += amt;
    else agingBuckets["90+"] += amt;
  });

  agingBuckets.total =
    agingBuckets.current +
    agingBuckets["1-30"] +
    agingBuckets["31-60"] +
    agingBuckets["61-90"] +
    agingBuckets["90+"];

  // Add percentages for each bucket (except total)
  const percent = (val: number) =>
    agingBuckets.total > 0
      ? Math.round((val / agingBuckets.total) * 10000) / 100
      : 0;

  return {
    ...agingBuckets,
    percentCurrent: percent(agingBuckets.current),
    percent1_30: percent(agingBuckets["1-30"]),
    percent31_60: percent(agingBuckets["31-60"]),
    percent61_90: percent(agingBuckets["61-90"]),
    percent90plus: percent(agingBuckets["90+"]),
  };
}

interface ProfitMarginInputs {
  revenue: number;
  costOfGoodsSold: number;
  operatingExpenses: number;
  interestExpense?: number;
  taxes?: number;
  depreciation?: number;
  amortization?: number;
  previousYearMetrics?: {
    revenue: number;
    grossProfit: number;
    operatingProfit: number;
    netIncome: number;
  };
}

export function calculateProfitMargins(inputs: ProfitMarginInputs) {
  const {
    revenue,
    costOfGoodsSold,
    operatingExpenses,
    interestExpense = 0,
    taxes = 0,
    depreciation = 0,
    amortization = 0,
    previousYearMetrics,
  } = inputs;

  // Calculate key profit metrics
  const grossProfit = revenue - costOfGoodsSold;
  const operatingProfit = grossProfit - operatingExpenses;
  const ebitda = operatingProfit + depreciation + amortization;
  const profitBeforeTax = operatingProfit - interestExpense;
  const netIncome = profitBeforeTax - taxes;

  // Calculate margin percentages
  const grossMargin = revenue ? grossProfit / revenue : 0;
  const operatingMargin = revenue ? operatingProfit / revenue : 0;
  const ebitdaMargin = revenue ? ebitda / revenue : 0;
  const pretaxMargin = revenue ? profitBeforeTax / revenue : 0;
  const netMargin = revenue ? netIncome / revenue : 0;

  // Calculate contribution margin
  const variableCosts = costOfGoodsSold; // Simplified - in reality, COGS might include fixed costs
  const contributionMargin = revenue ? (revenue - variableCosts) / revenue : 0;

  // Calculate year-over-year growth if previous year metrics provided
  const yoyGrowth = previousYearMetrics
    ? {
        revenue: previousYearMetrics.revenue
          ? ((revenue - previousYearMetrics.revenue) /
              previousYearMetrics.revenue) *
            100
          : 0,
        grossProfit: previousYearMetrics.grossProfit
          ? ((grossProfit - previousYearMetrics.grossProfit) /
              previousYearMetrics.grossProfit) *
            100
          : 0,
        operatingProfit: previousYearMetrics.operatingProfit
          ? ((operatingProfit - previousYearMetrics.operatingProfit) /
              previousYearMetrics.operatingProfit) *
            100
          : 0,
        netIncome: previousYearMetrics.netIncome
          ? ((netIncome - previousYearMetrics.netIncome) /
              previousYearMetrics.netIncome) *
            100
          : 0,
      }
    : null;

  return {
    // Absolute values
    revenue,
    costOfGoodsSold,
    grossProfit,
    operatingExpenses,
    operatingProfit,
    ebitda,
    interestExpense,
    profitBeforeTax,
    taxes,
    netIncome,

    // Margin ratios (decimal)
    grossMargin,
    operatingMargin,
    ebitdaMargin,
    pretaxMargin,
    netMargin,
    contributionMargin,

    // Margin percentages
    grossMarginPercent: grossMargin * 100,
    operatingMarginPercent: operatingMargin * 100,
    ebitdaMarginPercent: ebitdaMargin * 100,
    pretaxMarginPercent: pretaxMargin * 100,
    netMarginPercent: netMargin * 100,
    contributionMarginPercent: contributionMargin * 100,

    // Year-over-year growth
    yoyGrowth,
  };
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

interface EnhancedCashFlowInputs extends CashFlowInputs {
  seasonalityFactors?: number[]; // 12 monthly factors, e.g. [1.1, 0.9, 1.0, ...]
  growthRate?: number; // Monthly growth rate
  forecastMonths?: number; // Number of months to forecast
  oneTimeEvents?: Array<{
    month: number;
    amount: number;
    description: string;
    isRevenue: boolean;
  }>;
}

export function forecastDetailedCashFlow(inputs: EnhancedCashFlowInputs) {
  const {
    startingCash,
    monthlyIncome,
    monthlyExpenses,
    accountsReceivableDays,
    accountsPayableDays,
    seasonalityFactors = Array(12).fill(1),
    growthRate = 0,
    forecastMonths = 12,
    oneTimeEvents = [],
  } = inputs;

  const forecast = [];
  let currentCash = startingCash;

  for (let month = 0; month < forecastMonths; month++) {
    const seasonality = seasonalityFactors[month % 12];
    const growthFactor = Math.pow(1 + growthRate, month);

    const baseIncome = monthlyIncome * growthFactor * seasonality;
    const baseExpenses = monthlyExpenses * growthFactor;

    // Apply AR/AP delays
    const incomeReceived = baseIncome * (1 - accountsReceivableDays / 30);
    const expensesPaid = baseExpenses * (1 - accountsPayableDays / 30);

    // Add one-time events
    const monthEvents = oneTimeEvents.filter((event) => event.month === month);
    const oneTimeIncome = monthEvents
      .filter((event) => event.isRevenue)
      .reduce((sum, event) => sum + event.amount, 0);

    const oneTimeExpenses = monthEvents
      .filter((event) => !event.isRevenue)
      .reduce((sum, event) => sum + event.amount, 0);

    const totalIncome = incomeReceived + oneTimeIncome;
    const totalExpenses = expensesPaid + oneTimeExpenses;
    const netCashFlow = totalIncome - totalExpenses;

    currentCash += netCashFlow;

    forecast.push({
      month,
      incomeReceived: totalIncome,
      expensesPaid: totalExpenses,
      netCashFlow,
      endingCash: currentCash,
      events: monthEvents,
    });
  }

  return {
    forecast,
    totalIncome: forecast.reduce((sum, month) => sum + month.incomeReceived, 0),
    totalExpenses: forecast.reduce((sum, month) => sum + month.expensesPaid, 0),
    netCashFlow: forecast.reduce((sum, month) => sum + month.netCashFlow, 0),
  };
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
  // Input validation and clamping for realism
  const annualIncome =
    typeof desiredAnnualIncome === "number" && desiredAnnualIncome > 0
      ? desiredAnnualIncome
      : 0;
  const hoursPerWeek =
    typeof billableHoursPerWeek === "number" && billableHoursPerWeek > 0
      ? billableHoursPerWeek
      : 0;
  const weeks =
    typeof weeksPerYear === "number" && weeksPerYear > 0 ? weeksPerYear : 0;
  const totalExpenses =
    typeof expenses === "number" && expenses > 0 ? expenses : 0;

  const totalIncomeNeeded = annualIncome + totalExpenses;
  const totalBillableHours = hoursPerWeek * weeks;

  if (totalBillableHours === 0) {
    return {
      hourlyRate: 0,
      explanation:
        "Billable hours per week or weeks per year is zero or invalid. Cannot calculate rate.",
    };
  }

  const hourlyRate = totalIncomeNeeded / totalBillableHours;

  return {
    hourlyRate: Math.round(hourlyRate * 100) / 100,
    totalIncomeNeeded,
    totalBillableHours,
    explanation: `Hourly Rate = (Annual Income (${annualIncome}) + Expenses (${totalExpenses})) / (Billable Hours/Week (${hoursPerWeek}) × Weeks/Year (${weeks})) = ${
      Math.round(hourlyRate * 100) / 100
    }`,
  };
}
