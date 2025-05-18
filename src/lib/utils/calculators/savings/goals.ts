interface VacationBudgetInputs {
  travelCost: number;
  lodgingCost: number;
  foodCost: number;
  activitiesCost: number;
  miscCost: number;
  nights?: number; // Optional: number of nights for lodging/food
  people?: number; // Optional: number of people for food/activities
  dailyFoodPerPerson?: number; // Optional: override for food cost per person per day
  dailyMiscPerPerson?: number; // Optional: override for misc cost per person per day
}

/**
 * Calculates a more realistic vacation budget.
 * - Allows for per-night and per-person calculations.
 * - Clamps negative or invalid values to zero.
 * - Returns a detailed breakdown and explanation.
 */
export function calculateVacationBudget(inputs: VacationBudgetInputs) {
  const travelCost =
    typeof inputs.travelCost === "number" && inputs.travelCost >= 0
      ? inputs.travelCost
      : 0;
  const nights =
    typeof inputs.nights === "number" && inputs.nights > 0
      ? Math.floor(inputs.nights)
      : 7;
  const people =
    typeof inputs.people === "number" && inputs.people > 0
      ? Math.floor(inputs.people)
      : 2;

  // Lodging: per night or total
  let lodgingCost =
    typeof inputs.lodgingCost === "number" && inputs.lodgingCost >= 0
      ? inputs.lodgingCost
      : 0;
  if (lodgingCost > 0 && lodgingCost < 100) {
    // If suspiciously low, assume it's per night
    lodgingCost = lodgingCost * nights;
  }

  // Food: per day per person or total
  let foodCost =
    typeof inputs.foodCost === "number" && inputs.foodCost >= 0
      ? inputs.foodCost
      : 0;
  if (inputs.dailyFoodPerPerson && inputs.dailyFoodPerPerson > 0) {
    foodCost = inputs.dailyFoodPerPerson * people * nights;
  } else if (foodCost > 0 && foodCost < 20 * people * nights) {
    // If suspiciously low, assume it's per day per person
    foodCost = 50 * people * nights;
  }

  // Activities: per person or total
  let activitiesCost =
    typeof inputs.activitiesCost === "number" && inputs.activitiesCost >= 0
      ? inputs.activitiesCost
      : 0;
  if (activitiesCost > 0 && activitiesCost < 20 * people) {
    // If suspiciously low, assume it's per person
    activitiesCost = activitiesCost * people;
  }

  // Misc: per day per person or total
  let miscCost =
    typeof inputs.miscCost === "number" && inputs.miscCost >= 0
      ? inputs.miscCost
      : 0;
  if (inputs.dailyMiscPerPerson && inputs.dailyMiscPerPerson > 0) {
    miscCost = inputs.dailyMiscPerPerson * people * nights;
  } else if (miscCost > 0 && miscCost < 10 * people * nights) {
    miscCost = 20 * people * nights;
  }

  const total = travelCost + lodgingCost + foodCost + activitiesCost + miscCost;

  return {
    total: Math.round(total * 100) / 100,
    breakdown: {
      travelCost: Math.round(travelCost * 100) / 100,
      lodgingCost: Math.round(lodgingCost * 100) / 100,
      foodCost: Math.round(foodCost * 100) / 100,
      activitiesCost: Math.round(activitiesCost * 100) / 100,
      miscCost: Math.round(miscCost * 100) / 100,
      nights,
      people,
    },
    explanation: `Total vacation budget is $${
      Math.round(total * 100) / 100
    } for ${people} people and ${nights} nights. Breakdown: travel ($${
      Math.round(travelCost * 100) / 100
    }), lodging ($${Math.round(lodgingCost * 100) / 100}), food ($${
      Math.round(foodCost * 100) / 100
    }), activities ($${
      Math.round(activitiesCost * 100) / 100
    }), miscellaneous ($${Math.round(miscCost * 100) / 100}).`,
  };
}

/**
 * Calculates the budget for purchasing and owning a car, including loan payments and total cost of ownership.
 *
 * @param inputs - The car purchase and ownership parameters
 * @param inputs.carPrice - The base price of the car (before taxes)
 * @param inputs.downPayment - The initial payment made upfront
 * @param inputs.loanTermYears - The duration of the car loan in years
 * @param inputs.annualInterestRate - The yearly interest rate on the loan (e.g., 0.05 for 5%)
 * @param inputs.salesTaxRate - The sales tax rate applied to the car purchase (e.g., 0.08 for 8%), defaults to 0.08
 * @param inputs.annualInsurance - The yearly cost of car insurance, defaults to $1,200
 * @param inputs.annualRegistration - The yearly cost of vehicle registration, defaults to $200
 * @param inputs.annualMaintenance - The estimated yearly cost of maintenance, defaults to $500
 *
 * @returns An object containing:
 *   - totalCost: The total cost of ownership over the loan term
 *   - monthlyPayment: The monthly loan payment amount
 *   - salesTax: The sales tax paid on the car purchase
 *   - annualInsurance: The yearly insurance cost
 *   - annualRegistration: The yearly registration cost
 *   - annualMaintenance: The yearly maintenance cost
 *   - explanation: A human-readable summary of the costs
 */
export function calculateCarBudget(inputs: {
  carPrice: number;
  downPayment: number;
  loanTermYears: number;
  annualInterestRate: number;
  salesTaxRate?: number; // e.g. 0.08 for 8%
  annualInsurance?: number;
  annualRegistration?: number;
  annualMaintenance?: number;
}) {
  const {
    carPrice,
    downPayment,
    loanTermYears,
    annualInterestRate,
    salesTaxRate = 0.08,
    annualInsurance = 1200,
    annualRegistration = 200,
    annualMaintenance = 500,
  } = inputs;

  const safeCarPrice =
    typeof carPrice === "number" && carPrice > 0 ? carPrice : 0;
  const safeDownPayment =
    typeof downPayment === "number" && downPayment >= 0 ? downPayment : 0;
  const safeLoanTermYears =
    typeof loanTermYears === "number" && loanTermYears > 0 ? loanTermYears : 1;
  const safeAnnualInterestRate =
    typeof annualInterestRate === "number" && annualInterestRate >= 0
      ? annualInterestRate
      : 0;

  // Add sales tax to car price
  const salesTax = safeCarPrice * salesTaxRate;
  const totalCarCost = safeCarPrice + salesTax;

  const principal = totalCarCost - safeDownPayment;
  const monthlyInterestRate = safeAnnualInterestRate / 12;
  const numberOfPayments = safeLoanTermYears * 12;

  let monthlyPayment = 0;
  if (principal > 0 && numberOfPayments > 0) {
    if (safeAnnualInterestRate === 0) {
      monthlyPayment = principal / numberOfPayments;
    } else {
      monthlyPayment =
        (principal * monthlyInterestRate) /
        (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
    }
  }

  // Add recurring annual costs
  const totalOwnershipCost =
    totalCarCost +
    monthlyPayment * numberOfPayments +
    annualInsurance * safeLoanTermYears +
    annualRegistration * safeLoanTermYears +
    annualMaintenance * safeLoanTermYears;

  return {
    totalCost: Math.round(totalOwnershipCost * 100) / 100,
    monthlyPayment: Math.round(monthlyPayment * 100) / 100,
    salesTax: Math.round(salesTax * 100) / 100,
    annualInsurance,
    annualRegistration,
    annualMaintenance,
    explanation: `Total cost of car ownership (including sales tax, insurance, registration, and maintenance) is $${
      Math.round(totalOwnershipCost * 100) / 100
    }, with a monthly loan payment of $${
      Math.round(monthlyPayment * 100) / 100
    }.`,
  };
}

export function calculateEngagementRingBudget(inputs: {
  annualIncome: number;
  percentageOfIncome: number;
  maxBudget?: number;
  minBudget?: number;
}) {
  const { annualIncome, percentageOfIncome, maxBudget, minBudget } = inputs;

  const safeAnnualIncome =
    typeof annualIncome === "number" && annualIncome > 0 ? annualIncome : 0;
  const safePercentageOfIncome =
    typeof percentageOfIncome === "number" && percentageOfIncome > 0
      ? percentageOfIncome
      : 0;

  let budget = (safeAnnualIncome * safePercentageOfIncome) / 100;

  // Clamp to min/max if provided
  if (typeof minBudget === "number" && minBudget > 0) {
    budget = Math.max(budget, minBudget);
  }
  if (typeof maxBudget === "number" && maxBudget > 0) {
    budget = Math.min(budget, maxBudget);
  }

  return {
    budget: Math.round(budget * 100) / 100,
    explanation: `Engagement ring budget is $${
      Math.round(budget * 100) / 100
    }, which is ${safePercentageOfIncome}% of an annual income of $${
      Math.round(safeAnnualIncome * 100) / 100
    }${minBudget ? ` (minimum $${minBudget})` : ""}${
      maxBudget ? ` (maximum $${maxBudget})` : ""
    }.`,
  };
}

/**
 * Calculates a detailed wedding budget breakdown based on percentages allocated to different categories.
 *
 * @param inputs - The wedding budget parameters
 * @param inputs.totalBudget - The total budget for the wedding (in currency units)
 * @param inputs.percentageForVenue - Percentage of the total budget allocated to venue costs
 * @param inputs.percentageForCatering - Percentage of the total budget allocated to catering costs
 * @param inputs.percentageForPhotography - Percentage of the total budget allocated to photography costs
 * @param inputs.percentageForAttire - Percentage of the total budget allocated to attire costs
 * @param inputs.percentageForEntertainment - Percentage of the total budget allocated to entertainment costs
 * @param inputs.percentageForOther - Optional percentage of the total budget allocated to other costs (defaults to 0)
 * @param inputs.guestCount - Optional number of guests (defaults to 100)
 * @param inputs.contingencyPercent - Optional percentage of the total budget to allocate for contingency (defaults to 5)
 *
 * @returns An object containing:
 * - totalCost: The calculated total cost including contingency
 * - breakdown: Detailed breakdown of costs by category including per-guest metrics
 * - explanation: A human-readable explanation of the budget breakdown
 *
 * @example
 * const budget = calculateWeddingBudget({
 *   totalBudget: 20000,
 *   percentageForVenue: 30,
 *   percentageForCatering: 25,
 *   percentageForPhotography: 15,
 *   percentageForAttire: 10,
 *   percentageForEntertainment: 10,
 *   percentageForOther: 5,
 *   guestCount: 120,
 *   contingencyPercent: 5
 * });
 */
export function calculateWeddingBudget(inputs: {
  totalBudget: number;
  percentageForVenue: number;
  percentageForCatering: number;
  percentageForPhotography: number;
  percentageForAttire: number;
  percentageForEntertainment: number;
  percentageForOther?: number;
  guestCount?: number;
  contingencyPercent?: number; // e.g. 5 for 5%
}) {
  const {
    totalBudget,
    percentageForVenue,
    percentageForCatering,
    percentageForPhotography,
    percentageForAttire,
    percentageForEntertainment,
    percentageForOther = 0,
    guestCount = 100,
    contingencyPercent = 5,
  } = inputs;

  const safeTotalBudget =
    typeof totalBudget === "number" && totalBudget > 0 ? totalBudget : 0;
  const safePercentageForVenue =
    typeof percentageForVenue === "number" && percentageForVenue > 0
      ? percentageForVenue
      : 0;
  const safePercentageForCatering =
    typeof percentageForCatering === "number" && percentageForCatering > 0
      ? percentageForCatering
      : 0;
  const safePercentageForPhotography =
    typeof percentageForPhotography === "number" && percentageForPhotography > 0
      ? percentageForPhotography
      : 0;
  const safePercentageForAttire =
    typeof percentageForAttire === "number" && percentageForAttire > 0
      ? percentageForAttire
      : 0;
  const safePercentageForEntertainment =
    typeof percentageForEntertainment === "number" &&
    percentageForEntertainment > 0
      ? percentageForEntertainment
      : 0;
  const safePercentageForOther =
    typeof percentageForOther === "number" && percentageForOther > 0
      ? percentageForOther
      : 0;
  const safeContingencyPercent =
    typeof contingencyPercent === "number" && contingencyPercent > 0
      ? contingencyPercent
      : 0;

  // Calculate each category
  const venueCost = (safeTotalBudget * safePercentageForVenue) / 100;
  const cateringCost = (safeTotalBudget * safePercentageForCatering) / 100;
  const photographyCost =
    (safeTotalBudget * safePercentageForPhotography) / 100;
  const attireCost = (safeTotalBudget * safePercentageForAttire) / 100;
  const entertainmentCost =
    (safeTotalBudget * safePercentageForEntertainment) / 100;
  const otherCost = (safeTotalBudget * safePercentageForOther) / 100;

  // Add contingency buffer
  const subtotal =
    venueCost +
    cateringCost +
    photographyCost +
    attireCost +
    entertainmentCost +
    otherCost;
  const contingency = (safeTotalBudget * safeContingencyPercent) / 100;
  const totalCost = subtotal + contingency;

  // Per-guest cost for realism
  const perGuestCost =
    guestCount > 0
      ? Math.round(((cateringCost + entertainmentCost) / guestCount) * 100) /
        100
      : 0;

  return {
    totalCost: Math.round(totalCost * 100) / 100,
    breakdown: {
      venueCost: Math.round(venueCost * 100) / 100,
      cateringCost: Math.round(cateringCost * 100) / 100,
      photographyCost: Math.round(photographyCost * 100) / 100,
      attireCost: Math.round(attireCost * 100) / 100,
      entertainmentCost: Math.round(entertainmentCost * 100) / 100,
      otherCost: Math.round(otherCost * 100) / 100,
      contingency: Math.round(contingency * 100) / 100,
      perGuestCost,
      guestCount,
    },
    explanation: `Total wedding budget is $${
      Math.round(totalCost * 100) / 100
    } for ${guestCount} guests, including venue ($${
      Math.round(venueCost * 100) / 100
    }), catering ($${Math.round(cateringCost * 100) / 100}), photography ($${
      Math.round(photographyCost * 100) / 100
    }), attire ($${Math.round(attireCost * 100) / 100}), entertainment ($${
      Math.round(entertainmentCost * 100) / 100
    }), other ($${Math.round(otherCost * 100) / 100}), and contingency ($${
      Math.round(contingency * 100) / 100
    }). Per-guest cost: $${perGuestCost}.`,
  };
}
