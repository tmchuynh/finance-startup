interface LiquidityInputs {
  liquidAssets: number;
  currentLiabilities: number;
}

export function calculateLiquidityRatio(inputs: LiquidityInputs) {
  let { liquidAssets, currentLiabilities } = inputs;

  liquidAssets =
    typeof liquidAssets === "number" && liquidAssets >= 0 ? liquidAssets : 0;
  currentLiabilities =
    typeof currentLiabilities === "number" && currentLiabilities >= 0
      ? currentLiabilities
      : 0;

  if (currentLiabilities === 0) {
    return {
      liquidityRatio: Infinity,
      liquidAssets,
      currentLiabilities,
      explanation: "Current liabilities are zero; liquidity ratio is infinite.",
    };
  }

  const liquidityRatio = liquidAssets / currentLiabilities;

  return {
    liquidityRatio: Math.round(liquidityRatio * 100) / 100,
    liquidAssets,
    currentLiabilities,
    explanation: `Liquidity Ratio = Liquid Assets (${liquidAssets}) / Current Liabilities (${currentLiabilities}) = ${
      Math.round(liquidityRatio * 100) / 100
    }`,
  };
}

interface RefinanceParams {
  currentLoanBalance: number;
  currentInterestRate: number;
  currentRemainingTermYears: number;
  newInterestRate: number;
  newTermYears: number;
}

export function monthlyPayment(
  principal: number,
  rate: number,
  termYears: number
) {
  principal = typeof principal === "number" && principal > 0 ? principal : 0;
  rate = typeof rate === "number" && rate >= 0 ? rate : 0;
  termYears = typeof termYears === "number" && termYears > 0 ? termYears : 1;

  const monthlyRate = rate / 12;
  const n = termYears * 12;

  if (principal === 0 || n === 0) return 0;
  if (rate === 0) return principal / n;

  return (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -n));
}

export function calculateRefinanceSavings({
  currentLoanBalance,
  currentInterestRate,
  currentRemainingTermYears,
  newInterestRate,
  newTermYears,
}: RefinanceParams) {
  // Calculate current and new monthly payments
  const currentMonthlyPayment = monthlyPayment(
    currentLoanBalance,
    currentInterestRate,
    currentRemainingTermYears
  );
  const newMonthlyPayment = monthlyPayment(
    currentLoanBalance,
    newInterestRate,
    newTermYears
  );

  // Total payments over the remaining life of each loan
  const totalCurrentPayments =
    currentMonthlyPayment * currentRemainingTermYears * 12;
  const totalNewPayments = newMonthlyPayment * newTermYears * 12;

  // Total interest paid for each scenario
  const totalCurrentInterest = totalCurrentPayments - currentLoanBalance;
  const totalNewInterest = totalNewPayments - currentLoanBalance;

  // Calculate savings in total payments and interest
  const paymentSavings = totalCurrentPayments - totalNewPayments;
  const interestSavings = totalCurrentInterest - totalNewInterest;

  return {
    currentMonthlyPayment: Math.round(currentMonthlyPayment * 100) / 100,
    newMonthlyPayment: Math.round(newMonthlyPayment * 100) / 100,
    totalCurrentPayments: Math.round(totalCurrentPayments * 100) / 100,
    totalNewPayments: Math.round(totalNewPayments * 100) / 100,
    totalCurrentInterest: Math.round(totalCurrentInterest * 100) / 100,
    totalNewInterest: Math.round(totalNewInterest * 100) / 100,
    paymentSavings: Math.round(paymentSavings * 100) / 100,
    interestSavings: Math.round(interestSavings * 100) / 100,
    explanation: `Refinancing from ${
      currentInterestRate * 100
    }% for ${currentRemainingTermYears} years to ${
      newInterestRate * 100
    }% for ${newTermYears} years results in a monthly payment change from $${
      Math.round(currentMonthlyPayment * 100) / 100
    } to $${
      Math.round(newMonthlyPayment * 100) / 100
    }, with total payment savings of $${
      Math.round(paymentSavings * 100) / 100
    } and interest savings of $${Math.round(interestSavings * 100) / 100}.`,
  };
}

export function calculateHomeAffordability({
  grossAnnualIncome,
  monthlyDebts,
  downPayment,
  interestRate,
  loanTermYears,
  dtiLimit = 0.36,
}: {
  grossAnnualIncome: number;
  monthlyDebts: number;
  downPayment: number;
  interestRate: number;
  loanTermYears: number;
  dtiLimit?: number;
}) {
  // Clamp and validate inputs for realism
  grossAnnualIncome =
    typeof grossAnnualIncome === "number" && grossAnnualIncome > 0
      ? grossAnnualIncome
      : 0;
  monthlyDebts =
    typeof monthlyDebts === "number" && monthlyDebts >= 0 ? monthlyDebts : 0;
  downPayment =
    typeof downPayment === "number" && downPayment >= 0 ? downPayment : 0;
  interestRate =
    typeof interestRate === "number" && interestRate >= 0 ? interestRate : 0;
  loanTermYears =
    typeof loanTermYears === "number" && loanTermYears > 0 ? loanTermYears : 1;
  dtiLimit =
    typeof dtiLimit === "number" && dtiLimit > 0 && dtiLimit < 1
      ? dtiLimit
      : 0.36;

  const monthlyIncome = grossAnnualIncome / 12;
  const maxAffordableMortgagePayment = Math.max(
    monthlyIncome * dtiLimit - monthlyDebts,
    0
  );

  const monthlyInterestRate = interestRate / 12;
  const numPayments = loanTermYears * 12;

  let mortgageAmount: number;
  if (monthlyInterestRate === 0) {
    mortgageAmount = maxAffordableMortgagePayment * numPayments;
  } else {
    mortgageAmount =
      (maxAffordableMortgagePayment *
        (1 - Math.pow(1 + monthlyInterestRate, -numPayments))) /
      monthlyInterestRate;
  }
  mortgageAmount = Math.max(mortgageAmount, 0);

  const totalHomePrice = mortgageAmount + downPayment;

  return {
    maxMonthlyPayment: Math.round(maxAffordableMortgagePayment * 100) / 100,
    estimatedMortgageAmount: Math.round(mortgageAmount * 100) / 100,
    estimatedMaxHomePrice: Math.round(totalHomePrice * 100) / 100,
    explanation: `With a gross annual income of $${grossAnnualIncome}, monthly debts of $${monthlyDebts}, and a down payment of $${downPayment}, you can afford a maximum monthly mortgage payment of $${
      Math.round(maxAffordableMortgagePayment * 100) / 100
    }. This translates to an estimated mortgage amount of $${
      Math.round(mortgageAmount * 100) / 100
    } and a maximum home price of $${
      Math.round(totalHomePrice * 100) / 100
    } at an interest rate of ${
      interestRate * 100
    }% over ${loanTermYears} years (DTI limit: ${Math.round(
      dtiLimit * 100
    )}%).`,
  };
}

export function compareRentVsBuy({
  monthlyRent,
  homePrice,
  downPayment,
  loanRate,
  termYears,
  propertyTaxRate,
  annualMaintenance,
  appreciationRate,
}: {
  monthlyRent: number;
  homePrice: number;
  downPayment: number;
  loanRate: number;
  termYears: number;
  propertyTaxRate: number;
  annualMaintenance: number;
  appreciationRate: number;
}) {
  // Clamp and validate inputs for realism
  monthlyRent =
    typeof monthlyRent === "number" && monthlyRent >= 0 ? monthlyRent : 0;
  homePrice = typeof homePrice === "number" && homePrice > 0 ? homePrice : 0;
  downPayment =
    typeof downPayment === "number" && downPayment >= 0 ? downPayment : 0;
  loanRate = typeof loanRate === "number" && loanRate >= 0 ? loanRate : 0;
  termYears = typeof termYears === "number" && termYears > 0 ? termYears : 1;
  propertyTaxRate =
    typeof propertyTaxRate === "number" && propertyTaxRate >= 0
      ? propertyTaxRate
      : 0;
  annualMaintenance =
    typeof annualMaintenance === "number" && annualMaintenance >= 0
      ? annualMaintenance
      : 0;
  appreciationRate =
    typeof appreciationRate === "number" && appreciationRate >= 0
      ? appreciationRate
      : 0;

  // Total rent paid over the period
  const totalRent = monthlyRent * 12 * termYears;

  // Calculate mortgage details (principal & interest only, no PMI/insurance for simplicity)
  const loanAmount = homePrice - downPayment;
  const n = termYears * 12;
  const monthlyInterestRate = loanRate / 12;
  let monthlyMortgagePayment: number;
  if (loanRate === 0) {
    monthlyMortgagePayment = loanAmount / n;
  } else {
    monthlyMortgagePayment =
      (loanAmount * monthlyInterestRate) /
      (1 - Math.pow(1 + monthlyInterestRate, -n));
  }
  const totalMortgagePayments = monthlyMortgagePayment * n;
  const totalInterest = totalMortgagePayments - loanAmount;

  // Property taxes and maintenance
  const propertyTax = homePrice * propertyTaxRate * termYears;
  const totalMaintenance = annualMaintenance * termYears;

  // Total cost of buying (down payment + all mortgage payments + property tax + maintenance)
  const totalBuyCost =
    downPayment + totalMortgagePayments + propertyTax + totalMaintenance;

  // Future value of home after appreciation
  const futureValue = homePrice * Math.pow(1 + appreciationRate, termYears);

  // Net cost of buying = total out-of-pocket minus equity gained (future value - home price)
  const netCostOfBuying = totalBuyCost - (futureValue - homePrice);

  return {
    totalRent: Math.round(totalRent * 100) / 100,
    totalBuyCost: Math.round(totalBuyCost * 100) / 100,
    homeValueAfterAppreciation: Math.round(futureValue * 100) / 100,
    netCostOfBuying: Math.round(netCostOfBuying * 100) / 100,
    monthlyMortgagePayment: Math.round(monthlyMortgagePayment * 100) / 100,
    totalInterest: Math.round(totalInterest * 100) / 100,
    propertyTax: Math.round(propertyTax * 100) / 100,
    totalMaintenance: Math.round(totalMaintenance * 100) / 100,
    explanation: `Over ${termYears} years, renting costs $${
      Math.round(totalRent * 100) / 100
    }, while buying costs $${
      Math.round(totalBuyCost * 100) / 100
    } (including down payment, mortgage, property tax, and maintenance). After appreciation, the home's value is $${
      Math.round(futureValue * 100) / 100
    }, so the net cost of buying is $${
      Math.round(netCostOfBuying * 100) / 100
    }.`,
  };
}
