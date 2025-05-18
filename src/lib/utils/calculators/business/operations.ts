export function calculateBreakEven({
  fixedCosts,
  variableCostPerUnit,
  pricePerUnit,
}: {
  fixedCosts: number;
  variableCostPerUnit: number;
  pricePerUnit: number;
}) {
  // Clamp negative/invalid values to zero for realism
  fixedCosts =
    typeof fixedCosts === "number" && fixedCosts >= 0 ? fixedCosts : 0;
  variableCostPerUnit =
    typeof variableCostPerUnit === "number" && variableCostPerUnit >= 0
      ? variableCostPerUnit
      : 0;
  pricePerUnit =
    typeof pricePerUnit === "number" && pricePerUnit > 0 ? pricePerUnit : 0;

  const contributionMargin = pricePerUnit - variableCostPerUnit;

  if (contributionMargin <= 0) {
    return {
      contributionMargin,
      breakEvenUnits: 0,
      breakEvenSales: 0,
      explanation:
        "Break-even is not achievable as contribution margin is zero or negative.",
    };
  }

  const breakEvenUnits = fixedCosts / contributionMargin;
  const breakEvenSales = breakEvenUnits * pricePerUnit;

  return {
    contributionMargin: Math.round(contributionMargin * 100) / 100,
    breakEvenUnits: Math.ceil(breakEvenUnits),
    breakEvenSales: Math.round(breakEvenSales * 100) / 100,
    explanation: `Break-even Units = Fixed Costs (${fixedCosts}) / Contribution Margin (${contributionMargin}) = ${Math.ceil(
      breakEvenUnits
    )}`,
  };
}

interface WorkingCapitalOptimizationInputs {
  currentAssets: number;
  currentLiabilities: number;
  inventory: number;
  accountsReceivable: number;
  accountsPayable: number;
  annualRevenue: number;
  costOfGoodsSold: number;
  industryWorkingCapitalRatio?: number;
}

export function optimizeWorkingCapital(
  inputs: WorkingCapitalOptimizationInputs
) {
  const {
    currentAssets,
    currentLiabilities,
    inventory,
    accountsReceivable,
    accountsPayable,
    annualRevenue,
    costOfGoodsSold,
    industryWorkingCapitalRatio = 2.0, // Default industry benchmark
  } = inputs;

  // Calculate working capital metrics
  const workingCapital = currentAssets - currentLiabilities;
  const workingCapitalRatio = currentAssets / currentLiabilities;

  // Calculate days metrics
  const daysInventory = (inventory / costOfGoodsSold) * 365;
  const daysReceivables = (accountsReceivable / annualRevenue) * 365;
  const daysPayables = (accountsPayable / costOfGoodsSold) * 365;

  // Calculate cash conversion cycle
  const cashConversionCycle = daysInventory + daysReceivables - daysPayables;

  // Calculate working capital as percentage of revenue
  const wcToRevenue = (workingCapital / annualRevenue) * 100;

  // Identify optimization opportunities
  const optimizationOpportunities: string[] = [];
  let potentialImprovement = 0;

  // Check if working capital ratio is significantly higher than industry average
  if (workingCapitalRatio > industryWorkingCapitalRatio * 1.2) {
    optimizationOpportunities.push(
      "Working capital ratio is higher than industry average. Consider reducing current assets or increasing current liabilities."
    );

    // Calculate potential improvement
    const targetCurrentAssets =
      currentLiabilities * industryWorkingCapitalRatio;
    potentialImprovement += currentAssets - targetCurrentAssets;
  }

  // Check inventory days
  if (daysInventory > 60) {
    // Threshold can be adjusted based on industry
    optimizationOpportunities.push(
      "Inventory days are high. Consider implementing just-in-time inventory or improving inventory turnover."
    );

    // Target 45 days inventory
    const targetInventory = (costOfGoodsSold / 365) * 45;
    potentialImprovement += inventory - targetInventory;
  }

  // Check receivables days
  if (daysReceivables > 45) {
    // Threshold can be adjusted
    optimizationOpportunities.push(
      "Receivables days are high. Consider improving collection processes or offering early payment discounts."
    );

    // Target 30 days receivables
    const targetReceivables = (annualRevenue / 365) * 30;
    potentialImprovement += accountsReceivable - targetReceivables;
  }

  // Check payables days
  if (daysPayables < 30) {
    // Threshold can be adjusted
    optimizationOpportunities.push(
      "Payables days are low. Consider negotiating better payment terms with suppliers."
    );

    // Target 45 days payables
    const targetPayables = (costOfGoodsSold / 365) * 45;
    // This represents additional cash that could be retained
    potentialImprovement += targetPayables - accountsPayable;
  }

  return {
    workingCapital,
    workingCapitalRatio,
    cashConversionCycle,
    daysInventory,
    daysReceivables,
    daysPayables,
    wcToRevenuePercent: wcToRevenue,
    optimizationOpportunities,
    potentialCashImprovement: potentialImprovement,
    potentialImprovementPercent:
      potentialImprovement > 0
        ? (potentialImprovement / workingCapital) * 100
        : 0,
  };
}

interface BreakEvenInputs {
  fixedCosts: number;
  variableCostPerUnit: number;
  pricePerUnit: number;
}

export function calculateBreakEvenPoint(inputs: BreakEvenInputs) {
  let { fixedCosts, variableCostPerUnit, pricePerUnit } = inputs;

  // Clamp negative/invalid values to zero for realism
  fixedCosts =
    typeof fixedCosts === "number" && fixedCosts >= 0 ? fixedCosts : 0;
  variableCostPerUnit =
    typeof variableCostPerUnit === "number" && variableCostPerUnit >= 0
      ? variableCostPerUnit
      : 0;
  pricePerUnit =
    typeof pricePerUnit === "number" && pricePerUnit > 0 ? pricePerUnit : 0;

  const contributionMargin = pricePerUnit - variableCostPerUnit;

  if (contributionMargin <= 0) {
    return {
      contributionMargin,
      breakEvenUnits: 0,
      breakEvenSales: 0,
      explanation:
        "Break-even is not achievable as price per unit is less than or equal to variable cost per unit.",
    };
  }

  const breakEvenUnits = fixedCosts / contributionMargin;
  const breakEvenSales = breakEvenUnits * pricePerUnit;

  return {
    contributionMargin: Math.round(contributionMargin * 100) / 100,
    breakEvenUnits: Math.ceil(breakEvenUnits),
    breakEvenSales: Math.round(breakEvenSales * 100) / 100,
    explanation: `Break-even Units = Fixed Costs (${fixedCosts}) / (Price per Unit (${pricePerUnit}) - Variable Cost per Unit (${variableCostPerUnit})) = ${Math.ceil(
      breakEvenUnits
    )}`,
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
  // Input validation and clamping for realism
  const amount =
    typeof currentAmount === "number" && currentAmount >= 0 ? currentAmount : 0;
  const rate =
    typeof inflationRate === "number" && inflationRate >= 0 ? inflationRate : 0;
  const nYears = typeof years === "number" && years >= 0 ? years : 0;

  const adjustedValue = amount / Math.pow(1 + rate, nYears);

  return {
    inflationAdjustedValue: Math.round(adjustedValue * 100) / 100,
    currentAmount: amount,
    inflationRate: rate,
    years: nYears,
    explanation: `Inflation-adjusted value = Current Amount (${amount}) / (1 + Inflation Rate (${rate}))^${nYears} = ${
      Math.round(adjustedValue * 100) / 100
    }`,
  };
}

interface Allocation {
  [assetClass: string]: number; // percent e.g., 30 for 30%
}

export function validatePortfolioAllocation(allocation: Allocation) {
  const total = Object.values(allocation).reduce((a, b) => a + b, 0);
  const roundedTotal = Math.round(total * 100) / 100;
  const adjustmentNeeded = Math.round((100 - total) * 100) / 100;
  const isValid = Math.abs(total - 100) < 0.01;

  let explanation = `Total allocation is ${roundedTotal}%. `;
  if (isValid) {
    explanation += "Portfolio is properly allocated.";
  } else if (total > 100) {
    explanation += `Reduce allocation by ${Math.abs(
      adjustmentNeeded
    )}% to reach 100%.`;
  } else {
    explanation += `Increase allocation by ${Math.abs(
      adjustmentNeeded
    )}% to reach 100%.`;
  }

  return {
    total: roundedTotal,
    isValid,
    adjustmentNeeded,
    explanation,
  };
}

interface CashConversionCycleInputs {
  daysInventoryOutstanding: number;
  daysSalesOutstanding: number;
  daysPayablesOutstanding: number;
}

export function calculateCashConversionCycle(
  inputs: CashConversionCycleInputs
) {
  let {
    daysInventoryOutstanding: DIO,
    daysSalesOutstanding: DSO,
    daysPayablesOutstanding: DPO,
  } = inputs;

  // Input validation and normalization
  [DIO, DSO, DPO] = [DIO, DSO, DPO].map((v) =>
    typeof v === "number" && v >= 0 ? v : 0
  );

  let cashConversionCycle = DIO + DSO - DPO;
  cashConversionCycle = Math.max(0, cashConversionCycle);

  // Round for reporting
  cashConversionCycle = Math.round(cashConversionCycle * 100) / 100;

  // Flag for interpretation
  let note = "";
  if (cashConversionCycle < 0)
    note =
      "Negative CCC: company gets paid before paying suppliers (very efficient).";
  else if (cashConversionCycle > 120)
    note = "High CCC: may indicate slow inventory or collections.";

  return {
    cashConversionCycle,
    daysInventoryOutstanding: DIO,
    daysSalesOutstanding: DSO,
    daysPayablesOutstanding: DPO,
    explanation: `CCC = DIO (${DIO}) + DSO (${DSO}) - DPO (${DPO}) = ${cashConversionCycle}`,
    note,
  };
}

interface BusinessValuationInputs {
  annualRevenue: number;
  netProfit: number;
  industry: string;
  assetValue: number;
  discountRate?: number; // WACC or required rate of return
  projectedGrowthRate?: number;
  projectedCashFlows?: number[]; // For DCF method
}

export function calculateBusinessValuation(inputs: BusinessValuationInputs) {
  const {
    annualRevenue,
    netProfit,
    industry,
    assetValue,
    discountRate = 0.15,
    projectedGrowthRate = 0.03,
    projectedCashFlows = [],
  } = inputs;

  // Industry multipliers (simplified - in real use case, would use current industry data)
  const industryMultipliers: Record<
    string,
    { revenueMultiple: number; earningsMultiple: number }
  > = {
    technology: { revenueMultiple: 2.5, earningsMultiple: 15 },
    retail: { revenueMultiple: 0.6, earningsMultiple: 8 },
    manufacturing: { revenueMultiple: 0.8, earningsMultiple: 6 },
    services: { revenueMultiple: 1.2, earningsMultiple: 10 },
    healthcare: { revenueMultiple: 1.8, earningsMultiple: 12 },
    financial: { revenueMultiple: 1.5, earningsMultiple: 11 },
    default: { revenueMultiple: 1.0, earningsMultiple: 8 },
  };

  const { revenueMultiple, earningsMultiple } =
    industryMultipliers[industry] || industryMultipliers.default;

  // Multiple methods
  const revenueBasedValue = annualRevenue * revenueMultiple;
  const earningsBasedValue = netProfit * earningsMultiple;

  // Asset-based method
  const assetBasedValue = assetValue;

  // Discounted cash flow method
  let dcfValue = 0;
  if (projectedCashFlows.length > 0) {
    // Calculate present value of projected cash flows
    const presentValueOfCashFlows = projectedCashFlows.reduce(
      (sum, cashFlow, year) =>
        sum + cashFlow / Math.pow(1 + discountRate, year + 1),
      0
    );

    // Terminal value using perpetuity growth model
    const lastCashFlow = projectedCashFlows[projectedCashFlows.length - 1];
    const terminalValue =
      (lastCashFlow * (1 + projectedGrowthRate)) /
      (discountRate - projectedGrowthRate);
    const presentValueOfTerminalValue =
      terminalValue / Math.pow(1 + discountRate, projectedCashFlows.length);

    dcfValue = presentValueOfCashFlows + presentValueOfTerminalValue;
  } else if (netProfit > 0) {
    // Simplified DCF using current profit with growth
    dcfValue =
      (netProfit * (1 + projectedGrowthRate)) /
      (discountRate - projectedGrowthRate);
  }

  // Weighted average (can be customized based on business specifics)
  const weightedValue =
    revenueBasedValue * 0.2 +
    earningsBasedValue * 0.3 +
    assetBasedValue * 0.2 +
    dcfValue * 0.3;

  return {
    revenueBasedValue,
    earningsBasedValue,
    assetBasedValue,
    dcfValue,
    weightedValue,
    priceSalesRatio: revenueBasedValue / annualRevenue,
    priceEarningsRatio: netProfit ? earningsBasedValue / netProfit : 0,
  };
}

interface ScenarioAnalysisInputs {
  baseScenario: Record<string, number>;
  optimisticScenario: Record<string, number>;
  pessimisticScenario: Record<string, number>;
  calculateFunction: (params: Record<string, number>) => Record<string, number>;
}

export function performScenarioAnalysis(inputs: ScenarioAnalysisInputs) {
  const {
    baseScenario,
    optimisticScenario,
    pessimisticScenario,
    calculateFunction,
  } = inputs;

  // Calculate outcomes for each scenario
  const baseOutcome = calculateFunction(baseScenario);
  const optimisticOutcome = calculateFunction(optimisticScenario);
  const pessimisticOutcome = calculateFunction(pessimisticScenario);

  // Calculate variances
  const optimisticVariance: Record<string, number> = {};
  const pessimisticVariance: Record<string, number> = {};

  Object.keys(baseOutcome).forEach((key) => {
    optimisticVariance[key] =
      ((optimisticOutcome[key] - baseOutcome[key]) / baseOutcome[key]) * 100;
    pessimisticVariance[key] =
      ((pessimisticOutcome[key] - baseOutcome[key]) / baseOutcome[key]) * 100;
  });

  return {
    baseScenario: {
      inputs: baseScenario,
      outputs: baseOutcome,
    },
    optimisticScenario: {
      inputs: optimisticScenario,
      outputs: optimisticOutcome,
      variance: optimisticVariance,
    },
    pessimisticScenario: {
      inputs: pessimisticScenario,
      outputs: pessimisticOutcome,
      variance: pessimisticVariance,
    },
  };
}

interface UnitEconomicsInputs {
  averageRevenue: number; // revenue per unit
  costOfGoodsSold: number; // variable costs per unit
  customerAcquisitionCost: number; // CAC
  averageCustomerLifespan: number; // months
  monthlyChurnRate?: number; // as decimal, e.g. 0.05 for 5%
  grossMargin?: number; // as decimal
}

export function calculateUnitEconomics(inputs: UnitEconomicsInputs) {
  const {
    averageRevenue,
    costOfGoodsSold,
    customerAcquisitionCost,
    averageCustomerLifespan,
    monthlyChurnRate,
    grossMargin: inputGrossMargin,
  } = inputs;

  // Calculate gross margin if not provided
  const grossMargin =
    inputGrossMargin !== undefined
      ? inputGrossMargin
      : (averageRevenue - costOfGoodsSold) / averageRevenue;

  // Calculate contribution margin per unit
  const contributionMargin = averageRevenue - costOfGoodsSold;

  // Calculate customer lifetime value (LTV)
  let ltv: number;
  if (monthlyChurnRate && monthlyChurnRate > 0) {
    // If churn rate is provided, use the formula: LTV = averageRevenue * grossMargin / churnRate
    ltv = (averageRevenue * grossMargin) / monthlyChurnRate;
  } else {
    // Otherwise use average customer lifespan
    ltv = averageRevenue * grossMargin * averageCustomerLifespan;
  }

  // Calculate LTV:CAC ratio
  const ltvCacRatio = ltv / customerAcquisitionCost;

  // Calculate payback period (in months)
  const paybackPeriod =
    customerAcquisitionCost / (averageRevenue * grossMargin);

  // Calculate breakeven number of sales
  const breakEvenSales = customerAcquisitionCost / contributionMargin;

  return {
    grossMarginPerUnit: grossMargin * averageRevenue,
    grossMarginPercent: grossMargin * 100,
    contributionMargin,
    contributionMarginPercent: (contributionMargin / averageRevenue) * 100,
    customerLifetimeValue: ltv,
    ltvCacRatio,
    paybackPeriodMonths: paybackPeriod,
    breakEvenSales,
    profitableAfterMonths: Math.ceil(paybackPeriod),
    cacEfficiency:
      ltvCacRatio >= 3
        ? "Excellent"
        : ltvCacRatio >= 2
        ? "Good"
        : "Needs improvement",
  };
}
