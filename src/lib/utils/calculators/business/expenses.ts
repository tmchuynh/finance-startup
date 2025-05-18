interface PayrollExpenseInputs {
  employees: Array<{
    salary: number; // Annual base salary
    hourlyRate?: number; // Hourly rate for hourly employees
    hoursWorked?: number; // Hours worked in period
    benefitsPercentage: number; // Benefits as % of salary (e.g., 20 for 20%)
    taxesPercentage: number; // Employer taxes as % of salary
    bonuses?: number; // Additional bonuses in the period
  }>;
}

export function calculatePayrollExpenses(inputs: PayrollExpenseInputs) {
  let totalSalaries = 0;
  let totalBenefits = 0;
  let totalTaxes = 0;
  let totalBonuses = 0;

  inputs.employees.forEach((employee) => {
    const basePay =
      employee.salary ||
      (employee.hourlyRate && employee.hoursWorked
        ? employee.hourlyRate * employee.hoursWorked
        : 0);

    totalSalaries += basePay;
    totalBenefits += basePay * (employee.benefitsPercentage / 100);
    totalTaxes += basePay * (employee.taxesPercentage / 100);
    totalBonuses += employee.bonuses || 0;
  });

  const totalCompensation =
    totalSalaries + totalBenefits + totalTaxes + totalBonuses;

  return {
    salaries: totalSalaries,
    benefits: totalBenefits,
    taxes: totalTaxes,
    bonuses: totalBonuses,
    total: totalCompensation,
  };
}

interface ExpenseAnalysisInputs {
  expenses: {
    category: string;
    amount: number;
    isFixed: boolean;
    previousPeriodAmount?: number;
  }[];
  revenue: number;
  previousPeriodRevenue?: number;
}

export function analyzeBusinessExpenses(inputs: ExpenseAnalysisInputs) {
  const { expenses, revenue, previousPeriodRevenue } = inputs;

  // Calculate total expenses
  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  // Split between fixed and variable expenses
  const fixedExpenses = expenses
    .filter((e) => e.isFixed)
    .reduce((sum, exp) => sum + exp.amount, 0);

  const variableExpenses = totalExpenses - fixedExpenses;

  // Calculate expense to revenue ratio
  const expenseToRevenueRatio = revenue ? totalExpenses / revenue : 0;

  // Calculate expense percentage of revenue by category
  const expenseCategories = expenses.reduce((acc, exp) => {
    const percentOfRevenue = revenue ? (exp.amount / revenue) * 100 : 0;
    const percentOfTotal = totalExpenses
      ? (exp.amount / totalExpenses) * 100
      : 0;
    const periodChange =
      exp.previousPeriodAmount !== undefined
        ? ((exp.amount - exp.previousPeriodAmount) / exp.previousPeriodAmount) *
          100
        : null;

    acc[exp.category] = {
      amount: exp.amount,
      percentOfRevenue,
      percentOfTotal,
      isFixed: exp.isFixed,
      periodChange,
    };
    return acc;
  }, {} as Record<string, { amount: number; percentOfRevenue: number; percentOfTotal: number; isFixed: boolean; periodChange: number | null }>);

  // Calculate period-over-period changes
  const totalExpenseChange = previousPeriodRevenue
    ? {
        expenseToRevenueRatioPrevious: previousPeriodRevenue
          ? totalExpenses / previousPeriodRevenue
          : 0,
        expenseToRevenueRatioChange:
          previousPeriodRevenue && revenue
            ? totalExpenses / revenue - totalExpenses / previousPeriodRevenue
            : 0,
      }
    : null;

  // Calculate fixed/variable expense mix
  const fixedExpenseRatio = totalExpenses ? fixedExpenses / totalExpenses : 0;
  const variableExpenseRatio = totalExpenses
    ? variableExpenses / totalExpenses
    : 0;

  return {
    totalExpenses,
    fixedExpenses,
    variableExpenses,
    expenseToRevenueRatio,
    expenseToRevenueRatioPercent: expenseToRevenueRatio * 100,
    fixedExpenseRatio,
    fixedExpenseRatioPercent: fixedExpenseRatio * 100,
    variableExpenseRatio,
    variableExpenseRatioPercent: variableExpenseRatio * 100,
    expenseBreakdown: expenseCategories,
    periodComparison: totalExpenseChange,
  };
}

interface ExpenseOptimizationInputs {
  expenses: Array<{
    category: string;
    amount: number;
    isEssential: boolean;
    potentialSavingsPercent?: number;
  }>;
  revenue: number;
  targetExpenseRatio?: number;
}

export function optimizeBusinessExpenses(inputs: ExpenseOptimizationInputs) {
  const { expenses, revenue, targetExpenseRatio = 0.7 } = inputs;

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const currentExpenseRatio = revenue ? totalExpenses / revenue : 0;

  // Calculate target expense amount
  const targetExpenses = revenue * targetExpenseRatio;
  const requiredReduction = Math.max(0, totalExpenses - targetExpenses);
  const requiresOptimization = requiredReduction > 0;

  // Calculate possible savings
  const potentialSavings = expenses.reduce((sum, exp) => {
    if (!exp.isEssential && exp.potentialSavingsPercent) {
      return sum + (exp.amount * exp.potentialSavingsPercent) / 100;
    }
    return sum;
  }, 0);

  // Recommend optimization steps
  const recommendedCuts = requiresOptimization
    ? expenses
        .filter((exp) => !exp.isEssential && exp.potentialSavingsPercent)
        .map((exp) => ({
          category: exp.category,
          currentAmount: exp.amount,
          recommendedSavings:
            (exp.amount * (exp.potentialSavingsPercent || 0)) / 100,
          newAmount:
            exp.amount * (1 - (exp.potentialSavingsPercent || 0) / 100),
        }))
        .sort((a, b) => b.recommendedSavings - a.recommendedSavings)
    : [];

  const achievableExpenseRatio = revenue
    ? (totalExpenses - potentialSavings) / revenue
    : currentExpenseRatio;

  return {
    currentExpenses: totalExpenses,
    currentExpenseRatio,
    currentExpenseRatioPercent: currentExpenseRatio * 100,
    targetExpenseRatio,
    targetExpenseRatioPercent: targetExpenseRatio * 100,
    targetExpenseAmount: targetExpenses,
    requiredReduction,
    potentialSavings,
    canAchieveTarget: potentialSavings >= requiredReduction,
    achievableExpenseRatio,
    achievableExpenseRatioPercent: achievableExpenseRatio * 100,
    recommendedCuts,
  };
}

interface OperatingEfficiencyInputs {
  revenue: number;
  costOfGoodsSold: number;
  operatingExpenses: number;
  assets: number;
  employees: number;
  squareFeet?: number; // For retail/office businesses
  laborHours?: number; // For manufacturing/service businesses
}

export function calculateOperatingEfficiency(
  inputs: OperatingEfficiencyInputs
) {
  const {
    revenue,
    costOfGoodsSold,
    operatingExpenses,
    assets,
    employees,
    squareFeet,
    laborHours,
  } = inputs;

  const grossProfit = revenue - costOfGoodsSold;

  // Calculate efficiency metrics
  const assetTurnover = revenue / assets;
  const revenuePerEmployee = revenue / employees;
  const profitPerEmployee = grossProfit / employees;
  const operatingExpensePerEmployee = operatingExpenses / employees;

  // Calculate optional metrics based on provided data
  const metrics: Record<string, number> = {
    assetTurnover,
    revenuePerEmployee,
    profitPerEmployee,
    operatingExpensePerEmployee,
  };

  if (squareFeet) {
    metrics.revenuePerSquareFoot = revenue / squareFeet;
    metrics.profitPerSquareFoot = grossProfit / squareFeet;
  }

  if (laborHours) {
    metrics.revenuePerLaborHour = revenue / laborHours;
    metrics.profitPerLaborHour = grossProfit / laborHours;
    metrics.laborEfficiency =
      revenue / laborHours / (operatingExpenses / laborHours);
  }

  return metrics;
}

interface OverheadAllocationInputs {
  totalOverhead: number;
  allocationBases: Array<{
    department: string;
    metric: number; // Square footage, headcount, etc.
  }>;
}

export function allocateOverheadExpenses(inputs: OverheadAllocationInputs) {
  const { totalOverhead, allocationBases } = inputs;
  const totalMetric = allocationBases.reduce(
    (sum, base) => sum + base.metric,
    0
  );

  const allocations = allocationBases.map((base) => ({
    department: base.department,
    allocation: totalOverhead * (base.metric / totalMetric),
  }));

  return allocations;
}

interface DecliningBalanceDepreciationInputs {
  assetCost: number;
  salvageValue: number;
  usefulLifeYears: number;
  rateMultiplier: number; // 2 for double declining, 1.5 for 150% declining, etc.
}

export function calculateDecliningBalanceDepreciation(
  inputs: DecliningBalanceDepreciationInputs
) {
  const { assetCost, salvageValue, usefulLifeYears, rateMultiplier } = inputs;

  const straightLineRate = 1 / usefulLifeYears;
  const decliningRate = straightLineRate * rateMultiplier;

  const yearlyDepreciation: number[] = [];
  let bookValue = assetCost;
  let accumulatedDepreciation = 0;

  for (let year = 1; year <= usefulLifeYears; year++) {
    if (bookValue <= salvageValue) {
      yearlyDepreciation.push(0);
      continue;
    }

    // Switch to straight-line for remaining years if it's more than declining balance
    const remainingYears = usefulLifeYears - year + 1;
    const straightLineForRemaining =
      (bookValue - salvageValue) / remainingYears;
    const decliningAmount = bookValue * decliningRate;

    const depreciationThisYear = Math.max(
      Math.min(decliningAmount, bookValue - salvageValue),
      straightLineForRemaining
    );

    yearlyDepreciation.push(depreciationThisYear);
    accumulatedDepreciation += depreciationThisYear;
    bookValue -= depreciationThisYear;
  }

  return {
    yearlyDepreciation,
    accumulatedDepreciation,
    finalBookValue: bookValue,
  };
}

interface COGSCalculationInputs {
  beginningInventory: {
    units: number;
    cost: number;
  };
  purchases: Array<{
    units: number;
    unitCost: number;
  }>;
  endingInventoryUnits: number;
  method: "FIFO" | "LIFO" | "WeightedAverage";
}

export function calculateCOGS(inputs: COGSCalculationInputs) {
  const { beginningInventory, purchases, endingInventoryUnits, method } =
    inputs;

  // Create inventory movements
  const inventory: Array<{ units: number; unitCost: number }> = [
    {
      units: beginningInventory.units,
      unitCost: beginningInventory.cost / beginningInventory.units,
    },
  ];

  purchases.forEach((purchase) => {
    inventory.push({ units: purchase.units, unitCost: purchase.unitCost });
  });

  const totalUnits = inventory.reduce((sum, layer) => sum + layer.units, 0);
  const soldUnits = totalUnits - endingInventoryUnits;

  if (soldUnits < 0) {
    throw new Error(
      "Ending inventory units cannot exceed total available units"
    );
  }

  let cogs = 0;
  let endingInventoryValue = 0;

  if (method === "FIFO") {
    let remainingSold = soldUnits;
    const remainingInventory = [...inventory];

    // FIFO: Sell oldest inventory first (beginning of array)
    while (remainingSold > 0 && remainingInventory.length) {
      const layer = remainingInventory[0];
      const soldFromLayer = Math.min(layer.units, remainingSold);

      cogs += soldFromLayer * layer.unitCost;
      remainingSold -= soldFromLayer;

      if (soldFromLayer === layer.units) {
        remainingInventory.shift();
      } else {
        remainingInventory[0] = {
          units: layer.units - soldFromLayer,
          unitCost: layer.unitCost,
        };
      }
    }

    // Calculate ending inventory value
    endingInventoryValue = remainingInventory.reduce(
      (sum, layer) => sum + layer.units * layer.unitCost,
      0
    );
  } else if (method === "LIFO") {
    let remainingSold = soldUnits;
    const remainingInventory = [...inventory];

    // LIFO: Sell newest inventory first (end of array)
    while (remainingSold > 0 && remainingInventory.length) {
      const layer = remainingInventory[remainingInventory.length - 1];
      const soldFromLayer = Math.min(layer.units, remainingSold);

      cogs += soldFromLayer * layer.unitCost;
      remainingSold -= soldFromLayer;

      if (soldFromLayer === layer.units) {
        remainingInventory.pop();
      } else {
        remainingInventory[remainingInventory.length - 1] = {
          units: layer.units - soldFromLayer,
          unitCost: layer.unitCost,
        };
      }
    }

    // Calculate ending inventory value
    endingInventoryValue = remainingInventory.reduce(
      (sum, layer) => sum + layer.units * layer.unitCost,
      0
    );
  } else if (method === "WeightedAverage") {
    // Calculate weighted average cost
    const totalCost = inventory.reduce(
      (sum, layer) => sum + layer.units * layer.unitCost,
      0
    );
    const averageCost = totalCost / totalUnits;

    cogs = soldUnits * averageCost;
    endingInventoryValue = endingInventoryUnits * averageCost;
  }

  return {
    cogs,
    endingInventoryValue,
    soldUnits,
  };
}

interface ExpenseBudgetVarianceInputs {
  budgetedExpenses: { [category: string]: number };
  actualExpenses: { [category: string]: number };
}

export function calculateExpenseBudgetVariance(
  inputs: ExpenseBudgetVarianceInputs
) {
  const { budgetedExpenses, actualExpenses } = inputs;
  const allCategories = new Set([
    ...Object.keys(budgetedExpenses),
    ...Object.keys(actualExpenses),
  ]);

  const variances: {
    [category: string]: {
      budgeted: number;
      actual: number;
      variance: number;
      percentVariance: number;
    };
  } = {};

  let totalBudgeted = 0;
  let totalActual = 0;

  allCategories.forEach((category) => {
    const budgeted = budgetedExpenses[category] || 0;
    const actual = actualExpenses[category] || 0;
    const variance = actual - budgeted;
    const percentVariance = budgeted !== 0 ? (variance / budgeted) * 100 : 0;

    variances[category] = {
      budgeted,
      actual,
      variance,
      percentVariance,
    };

    totalBudgeted += budgeted;
    totalActual += actual;
  });

  const totalVariance = totalActual - totalBudgeted;
  const totalPercentVariance =
    totalBudgeted !== 0 ? (totalVariance / totalBudgeted) * 100 : 0;

  return {
    categoryVariances: variances,
    summary: {
      totalBudgeted,
      totalActual,
      totalVariance,
      totalPercentVariance,
    },
  };
}

interface OvertimeInputs {
  regularHours: number;
  overtimeHours: number;
  hourlyRate: number;
  overtimeMultiplier?: number; // Optional, default 1.5
}

export function calculateOvertimePay(inputs: OvertimeInputs) {
  let {
    regularHours,
    overtimeHours,
    hourlyRate,
    overtimeMultiplier = 1.5,
  } = inputs;

  // Clamp negative/invalid values to zero for realism
  regularHours =
    typeof regularHours === "number" && regularHours > 0 ? regularHours : 0;
  overtimeHours =
    typeof overtimeHours === "number" && overtimeHours > 0 ? overtimeHours : 0;
  hourlyRate =
    typeof hourlyRate === "number" && hourlyRate > 0 ? hourlyRate : 0;
  overtimeMultiplier =
    typeof overtimeMultiplier === "number" && overtimeMultiplier >= 1
      ? overtimeMultiplier
      : 1.5;

  const regularPay = regularHours * hourlyRate;
  const overtimePay = overtimeHours * hourlyRate * overtimeMultiplier;
  const totalPay = regularPay + overtimePay;

  return {
    regularPay,
    overtimePay,
    totalPay,
    details: `Regular: ${regularHours}h x $${hourlyRate} + Overtime: ${overtimeHours}h x $${hourlyRate} x ${overtimeMultiplier}`,
  };
}

interface ExpenseForecastInputs {
  initialExpense: number;
  monthlyGrowthRate: number; // decimal e.g. 0.02 for 2%
  months: number;
}

export function forecastExpenses(inputs: ExpenseForecastInputs): number[] {
  const { initialExpense, monthlyGrowthRate, months } = inputs;

  // Validate inputs
  if (
    typeof initialExpense !== "number" ||
    typeof monthlyGrowthRate !== "number" ||
    typeof months !== "number" ||
    initialExpense < 0 ||
    months <= 0
  ) {
    return [];
  }

  // Clamp growth rate to [-0.5, 0.5] for realism (avoid extreme compounding)
  const safeGrowthRate = Math.max(-0.5, Math.min(monthlyGrowthRate, 0.5));

  // Add random fluctuation to simulate real-world volatility (±3%)
  const fluctuation = () => 1 + (Math.random() - 0.5) * 0.06;

  const expenses: number[] = [];
  let lastExpense = initialExpense;

  for (let i = 0; i < months; i++) {
    // Apply growth and fluctuation
    lastExpense = lastExpense * (1 + safeGrowthRate) * fluctuation();
    // Prevent negative expense due to negative growth
    lastExpense = Math.max(0, lastExpense);
    // Round to 2 decimals
    expenses.push(Math.round(lastExpense * 100) / 100);
  }

  return expenses;
}

interface TaxExpenseInputs {
  taxableIncome: number;
  taxRate: number; // decimal, e.g., 0.21 for 21%
  taxCredits?: number;
  deferredTaxAssets?: number;
  deferredTaxLiabilities?: number;
}

export function calculateTaxExpense(inputs: TaxExpenseInputs) {
  const {
    taxableIncome,
    taxRate,
    taxCredits = 0,
    deferredTaxAssets = 0,
    deferredTaxLiabilities = 0,
  } = inputs;

  const currentTaxBeforeCredits = taxableIncome * taxRate;
  const currentTax = Math.max(0, currentTaxBeforeCredits - taxCredits);
  const deferredTax = deferredTaxLiabilities - deferredTaxAssets;
  const totalTaxExpense = currentTax + deferredTax;

  const effectiveTaxRate =
    taxableIncome !== 0 ? (totalTaxExpense / taxableIncome) * 100 : 0;

  return {
    currentTax,
    deferredTax,
    totalTaxExpense,
    effectiveTaxRate,
  };
}

interface WACCInputs {
  equityValue: number;
  debtValue: number;
  costOfEquity: number; // decimal e.g. 0.08 for 8%
  costOfDebt: number; // decimal e.g. 0.05 for 5%
  taxRate: number; // decimal e.g. 0.21 for 21%
}

export function calculateWACC(inputs: WACCInputs) {
  let { equityValue, debtValue, costOfEquity, costOfDebt, taxRate } = inputs;

  // Clamp negative/invalid values to zero or reasonable bounds
  equityValue =
    typeof equityValue === "number" && equityValue >= 0 ? equityValue : 0;
  debtValue = typeof debtValue === "number" && debtValue >= 0 ? debtValue : 0;
  costOfEquity =
    typeof costOfEquity === "number" && costOfEquity >= 0 ? costOfEquity : 0;
  costOfDebt =
    typeof costOfDebt === "number" && costOfDebt >= 0 ? costOfDebt : 0;
  taxRate =
    typeof taxRate === "number" && taxRate >= 0 && taxRate < 1 ? taxRate : 0;

  const totalCapital = equityValue + debtValue;

  if (totalCapital === 0) {
    return {
      wacc: 0,
      explanation: "Total capital is zero; WACC cannot be calculated.",
    };
  }

  const equityPortion = equityValue / totalCapital;
  const debtPortion = debtValue / totalCapital;

  const weightedEquity = equityPortion * costOfEquity;
  const weightedDebt = debtPortion * costOfDebt * (1 - taxRate);

  const wacc = weightedEquity + weightedDebt;

  return {
    wacc: Math.round(wacc * 10000) / 10000, // rounded to 4 decimals
    weightedEquity,
    weightedDebt,
    equityPortion,
    debtPortion,
    costOfEquity,
    costOfDebt,
    taxRate,
    explanation: `WACC = (E/V)×Re + (D/V)×Rd×(1-Tc) = (${equityPortion.toFixed(
      2
    )}×${costOfEquity}) + (${debtPortion.toFixed(
      2
    )}×${costOfDebt}×(1-${taxRate})) = ${wacc.toFixed(4)}`,
  };
}

interface CashBurnRateInputs {
  cashBalance: number;
  monthlyExpenses: number[];
  monthlyRevenues: number[];
  futureFunding?: number;
  fundingMonth?: number;
}

export function analyzeCashBurn(inputs: CashBurnRateInputs) {
  const {
    cashBalance,
    monthlyExpenses,
    monthlyRevenues,
    futureFunding = 0,
    fundingMonth = 0,
  } = inputs;

  let currentCash = cashBalance;
  const monthlyNetBurn: number[] = [];
  const cashBalances: number[] = [];

  // Calculate for each month
  for (
    let i = 0;
    i < Math.max(monthlyExpenses.length, monthlyRevenues.length);
    i++
  ) {
    const expense = i < monthlyExpenses.length ? monthlyExpenses[i] : 0;
    const revenue = i < monthlyRevenues.length ? monthlyRevenues[i] : 0;

    // Add funding if it's the funding month
    if (i === fundingMonth) {
      currentCash += futureFunding;
    }

    const netBurn = expense - revenue;
    monthlyNetBurn.push(netBurn);

    currentCash -= netBurn;
    cashBalances.push(currentCash);

    // Stop if cash runs out
    if (currentCash <= 0) {
      break;
    }
  }

  // Calculate average burn rate
  const avgBurnRate =
    monthlyNetBurn.reduce((sum, burn) => sum + burn, 0) / monthlyNetBurn.length;

  // Calculate runway in months
  const currentBurnRate =
    monthlyNetBurn.length > 0 ? monthlyNetBurn[monthlyNetBurn.length - 1] : 0;
  const cashRunway =
    currentBurnRate > 0
      ? cashBalances[cashBalances.length - 1] / currentBurnRate
      : Infinity;

  // Runway date
  const runwayDate = new Date();
  runwayDate.setMonth(runwayDate.getMonth() + Math.floor(cashRunway));

  return {
    monthlyNetBurn,
    cashBalances,
    averageBurnRate: avgBurnRate,
    currentBurnRate,
    cashRunway,
    estimatedRunwayDate: runwayDate,
    burnRateImprovement:
      monthlyNetBurn.length > 1
        ? ((monthlyNetBurn[0] - monthlyNetBurn[monthlyNetBurn.length - 1]) /
            monthlyNetBurn[0]) *
          100
        : 0,
  };
}

export function calculateNPV({
  cashFlows,
  discountRate,
}: {
  cashFlows: number[];
  discountRate: number; // decimal
}) {
  // Input validation for realism
  if (
    !Array.isArray(cashFlows) ||
    cashFlows.length === 0 ||
    typeof discountRate !== "number" ||
    discountRate < 0
  ) {
    return {
      npv: 0,
      explanation: "Invalid cash flows or discount rate.",
    };
  }

  // Calculate NPV
  const npv = cashFlows.reduce(
    (sum, cf, i) => sum + cf / Math.pow(1 + discountRate, i + 1),
    0
  );

  return {
    npv: Math.round(npv * 100) / 100,
    discountRate,
    periods: cashFlows.length,
    explanation: `NPV = Σ [CFₜ / (1 + r)^t] for t=1 to ${cashFlows.length}, r=${discountRate}`,
  };
}

export function calculateStartupCosts({
  items,
}: {
  items: { name: string; cost: number }[];
}) {
  // Filter out invalid or negative costs for realism
  const validItems = items.filter(
    (item) =>
      typeof item.cost === "number" &&
      item.cost >= 0 &&
      typeof item.name === "string" &&
      item.name.trim().length > 0
  );

  const total = validItems.reduce((sum, item) => sum + item.cost, 0);

  // Provide breakdown for transparency
  return {
    total,
    breakdown: validItems.map((item) => ({
      name: item.name,
      cost: item.cost,
    })),
    invalidCount: items.length - validItems.length,
    explanation:
      items.length === validItems.length
        ? "All items included in total."
        : `${
            items.length - validItems.length
          } invalid or negative-cost items excluded from total.`,
  };
}
