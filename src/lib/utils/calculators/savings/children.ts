interface ChildcareCostInputs {
  hourlyRate: number;
  hoursPerWeek: number;
  weeksPerYear: number;
  numChildren?: number;
  taxCreditPerChild?: number; // e.g., Child and Dependent Care Credit
}

export function calculateChildcareCost(inputs: ChildcareCostInputs) {
  const hourlyRate =
    typeof inputs.hourlyRate === "number" && inputs.hourlyRate >= 0
      ? inputs.hourlyRate
      : 0;
  const hoursPerWeek =
    typeof inputs.hoursPerWeek === "number" && inputs.hoursPerWeek >= 0
      ? inputs.hoursPerWeek
      : 0;
  const weeksPerYear =
    typeof inputs.weeksPerYear === "number" && inputs.weeksPerYear >= 0
      ? inputs.weeksPerYear
      : 0;
  const numChildren =
    typeof inputs.numChildren === "number" && inputs.numChildren > 0
      ? Math.floor(inputs.numChildren)
      : 1;
  const taxCreditPerChild =
    typeof inputs.taxCreditPerChild === "number" &&
    inputs.taxCreditPerChild >= 0
      ? inputs.taxCreditPerChild
      : 0;

  const weeklyCost = hourlyRate * hoursPerWeek * numChildren;
  const annualCost = weeklyCost * weeksPerYear;
  const totalTaxCredit = taxCreditPerChild * numChildren;
  const netAnnualCost = Math.max(annualCost - totalTaxCredit, 0);

  return {
    annualCost: Math.round(annualCost * 100) / 100,
    netAnnualCost: Math.round(netAnnualCost * 100) / 100,
    weeklyCost: Math.round(weeklyCost * 100) / 100,
    hourlyRate,
    hoursPerWeek,
    weeksPerYear,
    numChildren,
    taxCreditPerChild,
    totalTaxCredit,
    explanation: `Annual childcare cost for ${numChildren} child(ren) is $${
      Math.round(annualCost * 100) / 100
    } ($${
      Math.round(weeklyCost * 100) / 100
    }/week for ${weeksPerYear} weeks). After tax credits ($${totalTaxCredit}), net cost is $${
      Math.round(netAnnualCost * 100) / 100
    }.`,
  };
}

interface CollegeSavingsInputs {
  totalCollegeCostPerChild: number[];
  yearsToSavePerChild: number[];
  annualInterestRate: number; // decimal e.g., 0.05
  inflationRate?: number; // decimal e.g., 0.03
}

export function calculateMonthlySavingsMultipleChildren(
  inputs: CollegeSavingsInputs
) {
  const {
    totalCollegeCostPerChild,
    yearsToSavePerChild,
    annualInterestRate,
    inflationRate = 0.03,
  } = inputs;

  const monthlyInterestRate =
    typeof annualInterestRate === "number" && annualInterestRate >= 0
      ? annualInterestRate / 12
      : 0;

  let totalMonthlySavings = 0;
  const perChild: number[] = [];

  for (let i = 0; i < totalCollegeCostPerChild.length; i++) {
    const cost =
      typeof totalCollegeCostPerChild[i] === "number" &&
      totalCollegeCostPerChild[i] > 0
        ? totalCollegeCostPerChild[i]
        : 0;
    const years =
      typeof yearsToSavePerChild[i] === "number" && yearsToSavePerChild[i] > 0
        ? yearsToSavePerChild[i]
        : 1;
    const months = years * 12;

    // Adjust future cost for inflation
    const inflatedCost = cost * Math.pow(1 + inflationRate, years);

    let monthlySavings: number;
    if (monthlyInterestRate === 0) {
      monthlySavings = inflatedCost / months;
    } else {
      monthlySavings =
        (inflatedCost * monthlyInterestRate) /
        (Math.pow(1 + monthlyInterestRate, months) - 1);
    }
    monthlySavings = Math.round(monthlySavings * 100) / 100;
    perChild.push(monthlySavings);
    totalMonthlySavings += monthlySavings;
  }

  return {
    totalMonthlySavings: Math.round(totalMonthlySavings * 100) / 100,
    perChild,
    explanation: `Total monthly savings needed for all children (inflation-adjusted): $${
      Math.round(totalMonthlySavings * 100) / 100
    }. Per child: [${perChild.join(", ")}]`,
  };
}

interface CollegeSavingsGoalInputs {
  targetAmount: number;
  currentSavings: number;
  annualInterestRate: number; // decimal e.g., 0.05
  yearsToSave: number;
  inflationRate?: number; // decimal e.g., 0.03
}

export function calculateMonthlySavingsForCollegeGoal(
  inputs: CollegeSavingsGoalInputs
) {
  const {
    targetAmount,
    currentSavings,
    annualInterestRate,
    yearsToSave,
    inflationRate = 0.03,
  } = inputs;

  const monthlyRate =
    typeof annualInterestRate === "number" && annualInterestRate >= 0
      ? annualInterestRate / 12
      : 0;
  const months =
    typeof yearsToSave === "number" && yearsToSave > 0 ? yearsToSave * 12 : 1;

  const safeTarget =
    typeof targetAmount === "number" && targetAmount > 0 ? targetAmount : 0;
  const safeCurrent =
    typeof currentSavings === "number" && currentSavings >= 0
      ? currentSavings
      : 0;

  // Adjust target for inflation
  const inflatedTarget = safeTarget * Math.pow(1 + inflationRate, yearsToSave);

  // Future value of current savings
  const fvCurrent = safeCurrent * Math.pow(1 + monthlyRate, months);

  // Monthly savings needed to reach target
  let monthlySavings: number;
  if (monthlyRate === 0) {
    monthlySavings = (inflatedTarget - fvCurrent) / months;
  } else {
    monthlySavings =
      ((inflatedTarget - fvCurrent) * monthlyRate) /
      (Math.pow(1 + monthlyRate, months) - 1);
  }

  return monthlySavings > 0 ? Math.round(monthlySavings * 100) / 100 : 0;
}

export function calculateTotalCollegeSavingsNeeded(
  inputs: CollegeSavingsInputs
) {
  const {
    totalCollegeCostPerChild,
    yearsToSavePerChild,
    inflationRate = 0.03,
  } = inputs;

  let totalSavingsNeeded = 0;

  for (let i = 0; i < totalCollegeCostPerChild.length; i++) {
    const cost =
      typeof totalCollegeCostPerChild[i] === "number" &&
      totalCollegeCostPerChild[i] > 0
        ? totalCollegeCostPerChild[i]
        : 0;
    const years =
      typeof yearsToSavePerChild[i] === "number" && yearsToSavePerChild[i] > 0
        ? yearsToSavePerChild[i]
        : 1;

    // Adjust for inflation
    const inflatedCost = cost * Math.pow(1 + inflationRate, years);

    totalSavingsNeeded += inflatedCost;
  }

  return {
    totalSavingsNeeded: Math.round(totalSavingsNeeded * 100) / 100,
    explanation: `Total inflation-adjusted college savings needed for all children: $${
      Math.round(totalSavingsNeeded * 100) / 100
    }.`,
  };
}
