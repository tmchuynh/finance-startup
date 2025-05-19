import { ChecklistCategory } from "@/lib/interfaces";

export const portfolioManagement: ChecklistCategory[] = [
  {
    id: "portfolio-diversification",
    title: "Portfolio Diversification",
    items: [
      {
        id: "asset-allocation-strategy",
        label: "Develop an asset allocation strategy",
        items: [
          {
            id: "understand-asset-classes",
            label: "Understand different asset classes",
          },
          {
            id: "learn-about-risk-return-tradeoff",
            label: "Learn about risk-return trade-off",
          },
          {
            id: "explore-diversification-benefits",
            label: "Explore benefits of diversification",
          },
          {
            id: "determine-asset-allocation",
            label: "Determine your asset allocation",
          },
          {
            id: "reassess-asset-allocation",
            label: "Reassess your asset allocation periodically",
          },
          {
            id: "consider-tax-implications",
            label: "Consider tax implications of asset allocation",
          },
          {
            id: "review-market-conditions",
            label: "Review market conditions and adjust accordingly",
          },
        ],
      },
      {
        id: "sector-diversification",
        label: "Ensure sector diversification",
        items: [
          {
            id: "understand-sector-diversification",
            label: "Understand sector diversification",
          },
          {
            id: "analyze-sector-performance",
            label: "Analyze sector performance trends",
          },
          {
            id: "balance-sector-exposure",
            label: "Balance sector exposure in your portfolio",
          },
          {
            id: "monitor-sector-changes",
            label: "Monitor changes in sector performance",
          },
          {
            id: "adjust-sector-allocations",
            label: "Adjust sector allocations as needed",
          },
        ],
      },
      {
        id: "geographic-diversification",
        label: "Consider geographic diversification",
        items: [
          {
            id: "understand-geographic-diversification",
            label: "Understand geographic diversification",
          },
          {
            id: "analyze-global-market-trends",
            label: "Analyze global market trends",
          },
          {
            id: "balance-geographic-exposure",
            label: "Balance geographic exposure in your portfolio",
          },
          {
            id: "monitor-geopolitical-events",
            label: "Monitor geopolitical events and their impact",
          },
          {
            id: "adjust-geographic-allocations",
            label: "Adjust geographic allocations as needed",
          },
        ],
      },
    ],
  },
  {
    id: "performance-monitoring",
    title: "Performance Monitoring",
    items: [
      {
        id: "investment-performance-metrics",
        label: "Understand investment performance metrics",
      },
      {
        id: "benchmark-comparison",
        label: "Compare portfolio performance to benchmarks",
        items: [
          {
            id: "select-appropriate-benchmark",
            label: "Select appropriate benchmarks for comparison",
          },
          {
            id: "analyze-benchmark-performance",
            label: "Analyze benchmark performance",
          },
          {
            id: "evaluate-relative-performance",
            label: "Evaluate relative performance against benchmarks",
          },
        ],
      },
      {
        id: "rebalancing-strategy",
        label: "Establish a rebalancing strategy",
        items: [
          {
            id: "determine-rebalancing-frequency",
            label: "Determine rebalancing frequency",
          },
          {
            id: "set-rebalancing-thresholds",
            label: "Set rebalancing thresholds",
          },
          {
            id: "execute-rebalancing-trades",
            label: "Execute rebalancing trades efficiently",
          },
        ],
      },
    ],
  },
  {
    id: "risk-management-strategies",
    title: "Risk Management Strategies",
    items: [
      {
        id: "hedging-techniques",
        label: "Explore hedging techniques to mitigate risk",
        items: [
          {
            id: "understand-hedging-concepts",
            label: "Understand hedging concepts and strategies",
          },
          {
            id: "learn-about-derivatives",
            label: "Learn about derivatives for hedging",
          },
          {
            id: "evaluate-hedging-costs-benefits",
            label: "Evaluate costs and benefits of hedging",
          },
        ],
      },
      {
        id: "stop-loss-orders",
        label: "Use stop-loss orders to limit losses",
        items: [
          {
            id: "understand-stop-loss-orders",
            label: "Understand stop-loss orders and their purpose",
          },
          {
            id: "set-stop-loss-levels",
            label: "Set appropriate stop-loss levels",
          },
          {
            id: "monitor-stop-loss-orders",
            label: "Monitor stop-loss orders regularly",
          },
          {
            id: "adjust-stop-loss-orders",
            label: "Adjust stop-loss orders as needed",
          },
        ],
      },
      {
        id: "portfolio-insurance-options",
        label: "Consider portfolio insurance options",
        items: [
          {
            id: "understand-portfolio-insurance",
            label: "Understand portfolio insurance concepts",
          },
          {
            id: "explore-insurance-products",
            label: "Explore insurance products for portfolios",
          },
          {
            id: "evaluate-costs-benefits",
            label: "Evaluate costs and benefits of portfolio insurance",
          },
        ],
      },
    ],
  },
];
