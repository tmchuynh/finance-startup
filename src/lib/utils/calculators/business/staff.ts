interface EmployeeProductivityInputs {
  revenue: number;
  netProfit: number;
  totalEmployees: number;
  laborCosts: number;
  productionOutput?: number; // Units produced or services delivered
}

export function calculateEmployeeProductivity(
  inputs: EmployeeProductivityInputs
) {
  const { revenue, netProfit, totalEmployees, laborCosts, productionOutput } =
    inputs;

  // Calculate key productivity metrics
  const revenuePerEmployee = revenue / totalEmployees;
  const profitPerEmployee = netProfit / totalEmployees;
  const laborCostPerEmployee = laborCosts / totalEmployees;

  // Return on labor investment
  const returnOnLabor = netProfit / laborCosts;

  // Labor efficiency ratio
  const laborEfficiencyRatio = revenue / laborCosts;

  // Labor cost percentage
  const laborCostPercentage = (laborCosts / revenue) * 100;

  // Calculate additional metrics if production output is provided
  const outputMetrics = productionOutput
    ? {
        outputPerEmployee: productionOutput / totalEmployees,
        costPerUnit: laborCosts / productionOutput,
        revenuePerUnit: revenue / productionOutput,
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
  };
}
