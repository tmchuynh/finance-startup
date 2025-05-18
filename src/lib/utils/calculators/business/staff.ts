interface EmployeeProductivityInputs {
  revenue: number;
  netProfit: number;
  totalEmployees: number;
  laborCosts: number;
  productionOutput?: number; // Units produced or services delivered
  hoursWorked?: number; // Optional: total hours worked by all employees
}

export function calculateEmployeeProductivity(
  inputs: EmployeeProductivityInputs
) {
  const {
    revenue,
    netProfit,
    totalEmployees,
    laborCosts,
    productionOutput,
    hoursWorked,
  } = inputs;

  // Avoid division by zero
  const safeDiv = (a: number, b: number) => (b === 0 ? 0 : a / b);

  // Calculate key productivity metrics
  const revenuePerEmployee = safeDiv(revenue, totalEmployees);
  const profitPerEmployee = safeDiv(netProfit, totalEmployees);
  const laborCostPerEmployee = safeDiv(laborCosts, totalEmployees);

  // Return on labor investment
  const returnOnLabor = safeDiv(netProfit, laborCosts);

  // Labor efficiency ratio
  const laborEfficiencyRatio = safeDiv(revenue, laborCosts);

  // Labor cost percentage
  const laborCostPercentage = safeDiv(laborCosts, revenue) * 100;

  // Calculate additional metrics if production output is provided
  const outputMetrics = productionOutput
    ? {
        outputPerEmployee: safeDiv(productionOutput, totalEmployees),
        costPerUnit: safeDiv(laborCosts, productionOutput),
        revenuePerUnit: safeDiv(revenue, productionOutput),
      }
    : null;

  // Calculate per hour metrics if hoursWorked is provided
  const perHourMetrics = hoursWorked
    ? {
        revenuePerHour: safeDiv(revenue, hoursWorked),
        profitPerHour: safeDiv(netProfit, hoursWorked),
        laborCostPerHour: safeDiv(laborCosts, hoursWorked),
        outputPerHour: productionOutput
          ? safeDiv(productionOutput, hoursWorked)
          : undefined,
      }
    : null;

  return {
    revenuePerEmployee,
    profitPerEmployee,
    laborCostPerEmployee,
    returnOnLabor,
    laborEfficiencyRatio,
    laborCostPercentage,
    outputMetrics,
    perHourMetrics,
  };
}
