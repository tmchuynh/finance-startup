interface InventoryInputs {
  costOfGoodsSold: number;
  averageInventory: number;
}

export function calculateInventoryTurnoverRatio(inputs: InventoryInputs) {
  let { costOfGoodsSold, averageInventory } = inputs;

  // Clamp negative or invalid values to zero for realism
  costOfGoodsSold =
    typeof costOfGoodsSold === "number" && costOfGoodsSold >= 0
      ? costOfGoodsSold
      : 0;
  averageInventory =
    typeof averageInventory === "number" && averageInventory > 0
      ? averageInventory
      : 0;

  if (averageInventory === 0) {
    return {
      turnoverRatio: 0,
      explanation:
        "Average inventory is zero or invalid; turnover cannot be calculated.",
    };
  }

  const turnoverRatio = costOfGoodsSold / averageInventory;

  // Days sales of inventory (DSI): 365 / turnover ratio
  const daysSalesOfInventory =
    turnoverRatio > 0 ? Math.round((365 / turnoverRatio) * 100) / 100 : null;

  return {
    turnoverRatio: Math.round(turnoverRatio * 100) / 100,
    daysSalesOfInventory,
    costOfGoodsSold,
    averageInventory,
    explanation: `Inventory Turnover Ratio = COGS (${costOfGoodsSold}) / Average Inventory (${averageInventory}) = ${
      Math.round(turnoverRatio * 100) / 100
    }${
      daysSalesOfInventory !== null
        ? `; Days Sales of Inventory = 365 / Turnover Ratio = ${daysSalesOfInventory}`
        : ""
    }`,
  };
}

interface ReorderPointInputs {
  averageDailyUsage: number;
  leadTimeDays: number;
  safetyStock?: number; // Optional: if not provided, will be calculated
}

export function calculateReorderPoint(inputs: ReorderPointInputs) {
  let { averageDailyUsage, leadTimeDays, safetyStock } = inputs;

  // Clamp negative values to zero for realism
  averageDailyUsage =
    typeof averageDailyUsage === "number" && averageDailyUsage > 0
      ? averageDailyUsage
      : 0;
  leadTimeDays =
    typeof leadTimeDays === "number" && leadTimeDays > 0 ? leadTimeDays : 0;

  // If safetyStock is not provided, estimate it using standard deviations and a z-score for 95% service level
  if (typeof safetyStock !== "number" || safetyStock < 0) {
    const demandStdDev = 0.1 * averageDailyUsage; // 10% std dev as example
    const leadTimeStdDev = 0.2 * leadTimeDays; // 20% std dev as example
    const zScore = 1.65; // 95% service level
    safetyStock = Math.round(
      zScore *
        Math.sqrt(
          Math.pow(leadTimeDays * demandStdDev, 2) +
            Math.pow(averageDailyUsage * leadTimeStdDev, 2)
        )
    );
  } else {
    safetyStock = Math.round(safetyStock);
  }

  const reorderPoint = averageDailyUsage * leadTimeDays + safetyStock;

  return {
    reorderPoint,
    averageDailyUsage,
    leadTimeDays,
    safetyStock,
    explanation: `Reorder Point = Avg Daily Usage (${averageDailyUsage}) × Lead Time (${leadTimeDays}) + Safety Stock (${safetyStock}) = ${reorderPoint}`,
  };
}

interface DepreciationInputs {
  assetCost: number;
  salvageValue: number;
  usefulLifeYears: number;
  yearsElapsed: number;
}

export function calculateStraightLineDepreciation(inputs: DepreciationInputs) {
  let { assetCost, salvageValue, usefulLifeYears, yearsElapsed } = inputs;

  // Input validation and clamping
  assetCost = typeof assetCost === "number" && assetCost >= 0 ? assetCost : 0;
  salvageValue =
    typeof salvageValue === "number" && salvageValue >= 0 ? salvageValue : 0;
  usefulLifeYears =
    typeof usefulLifeYears === "number" && usefulLifeYears > 0
      ? usefulLifeYears
      : 1;
  yearsElapsed =
    typeof yearsElapsed === "number" && yearsElapsed >= 0 ? yearsElapsed : 0;

  // Depreciable amount cannot be negative
  const depreciableAmount = Math.max(assetCost - salvageValue, 0);
  const annualDepreciation = depreciableAmount / usefulLifeYears;

  // Accumulated depreciation cannot exceed depreciable amount
  const accumulatedDepreciation = Math.min(
    annualDepreciation * yearsElapsed,
    depreciableAmount
  );

  // Book value cannot go below salvage value
  const bookValue = Math.max(assetCost - accumulatedDepreciation, salvageValue);

  return {
    annualDepreciation: Math.round(annualDepreciation * 100) / 100,
    accumulatedDepreciation: Math.round(accumulatedDepreciation * 100) / 100,
    bookValue: Math.round(bookValue * 100) / 100,
    explanation: `Annual Depreciation = (Asset Cost (${assetCost}) - Salvage Value (${salvageValue})) / Useful Life (${usefulLifeYears}) = ${
      Math.round(annualDepreciation * 100) / 100
    }`,
  };
}
