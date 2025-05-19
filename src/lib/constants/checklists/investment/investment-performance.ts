import { ChecklistCategory } from "@/lib/interfaces";

export const investmentPerformance: ChecklistCategory[] = [
  {
    id: "investment-performance",
    title: "Investment Performance",
    items: [
      {
        id: "performance-metrics",
        label: "Understand key performance metrics (e.g., ROI, alpha, beta)",
        items: [
          {
            id: "roi-definition",
            label: "Define and calculate Return on Investment (ROI)",
          },
          {
            id: "alpha-definition",
            label: "Define and calculate alpha",
          },
          {
            id: "beta-definition",
            label: "Define and calculate beta",
          },
          {
            id: "sharpe-ratio-definition",
            label: "Define and calculate the Sharpe ratio",
          },
          {
            id: "sortino-ratio-definition",
            label: "Define and calculate the Sortino ratio",
          },
        ],
      },
      {
        id: "benchmark-comparison",
        label: "Compare portfolio performance to relevant benchmarks",
        items: [
          {
            id: "benchmark-selection",
            label: "Select appropriate benchmarks for comparison",
          },
          {
            id: "benchmark-performance-analysis",
            label: "Analyze performance against selected benchmarks",
          },
          {
            id: "benchmark-adjustments",
            label: "Make adjustments based on benchmark performance",
          },
        ],
      },
      {
        id: "performance-reporting",
        label: "Review regular performance reports and statements",
      },
      {
        id: "performance-attribution",
        label: "Conduct performance attribution analysis",
        items: [
          {
            id: "attribution-methods",
            label: "Understand different performance attribution methods",
          },
          {
            id: "attribution-analysis",
            label: "Analyze performance attribution results",
          },
          {
            id: "attribution-reporting",
            label: "Prepare performance attribution reports",
          },
        ],
      },
      {
        id: "investment-horizon-consideration",
        label:
          "Consider the investment horizon when evaluating performance metrics",
        items: [
          {
            id: "short-term-vs-long-term-performance",
            label:
              "Differentiate between short-term and long-term performance metrics",
          },
          {
            id: "investment-horizon-impact",
            label:
              "Understand how investment horizon impacts performance evaluation",
          },
        ],
      },
      {
        id: "performance-trends-analysis",
        label: "Analyze performance trends over time",
      },
      {
        id: "performance-forecasting",
        label: "Forecast future performance based on historical data",
        items: [
          {
            id: "historical-data-analysis",
            label: "Analyze historical performance data",
          },
          {
            id: "performance-projections",
            label: "Make projections based on historical trends",
          },
          {
            id: "forecasting-methods",
            label: "Understand different forecasting methods",
          },
        ],
      },
      {
        id: "performance-communication",
        label:
          "Communicate performance results to stakeholders and clients effectively",
      },
    ],
  },
  {
    id: "risk-adjusted-returns",
    title: "Risk-Adjusted Returns",
    items: [
      {
        id: "sharpe-ratio",
        label: "Calculate and interpret the Sharpe ratio",
        items: [
          {
            id: "sharpe-ratio-definition",
            label: "Define the Sharpe ratio and its components",
          },
          {
            id: "sharpe-ratio-calculation",
            label: "Calculate the Sharpe ratio for a portfolio",
          },
          {
            id: "sharpe-ratio-interpretation",
            label:
              "Interpret the Sharpe ratio in the context of risk-adjusted returns",
          },
          {
            id: "sharpe-ratio-comparison",
            label: "Compare Sharpe ratios across different investment options",
          },
          {
            id: "sharpe-ratio-limitations",
            label: "Understand the limitations of the Sharpe ratio",
          },
          {
            id: "sharpe-ratio-application",
            label: "Apply the Sharpe ratio in investment decision-making",
          },
        ],
      },
      {
        id: "sortino-ratio",
        label: "Understand the Sortino ratio and its significance",
        items: [
          {
            id: "sortino-ratio-definition",
            label: "Define the Sortino ratio and its components",
          },
          {
            id: "sortino-ratio-calculation",
            label: "Calculate the Sortino ratio for a portfolio",
          },
          {
            id: "sortino-ratio-interpretation",
            label:
              "Interpret the Sortino ratio in the context of risk-adjusted returns",
          },
          {
            id: "sortino-ratio-comparison",
            label: "Compare Sortino ratios across different investment options",
          },
          {
            id: "sortino-ratio-limitations",
            label: "Understand the limitations of the Sortino ratio",
          },
        ],
      },
      {
        id: "treynor-ratio",
        label: "Evaluate the Treynor ratio for risk-adjusted returns",
        items: [
          {
            id: "treynor-ratio-definition",
            label: "Define the Treynor ratio and its components",
          },
          {
            id: "treynor-ratio-calculation",
            label: "Calculate the Treynor ratio for a portfolio",
          },
          {
            id: "treynor-ratio-interpretation",
            label:
              "Interpret the Treynor ratio in the context of risk-adjusted returns",
          },
          {
            id: "treynor-ratio-comparison",
            label: "Compare Treynor ratios across different investment options",
          },
          {
            id: "treynor-ratio-limitations",
            label: "Understand the limitations of the Treynor ratio",
          },
        ],
      },
      {
        id: "alpha-measurement",
        label: "Measure alpha to assess portfolio performance relative to risk",
        items: [
          {
            id: "alpha-definition",
            label:
              "Define alpha and its significance in performance evaluation",
          },
          {
            id: "alpha-calculation",
            label: "Calculate alpha for a portfolio",
          },
          {
            id: "alpha-interpretation",
            label:
              "Interpret alpha in the context of risk-adjusted returns and performance",
          },
          {
            id: "alpha-comparison",
            label: "Compare alpha across different investment options",
          },
          {
            id: "alpha-limitations",
            label:
              "Understand the limitations of alpha as a performance metric",
          },
        ],
      },
      {
        id: "beta-analysis",
        label: "Analyze beta to understand portfolio volatility",
        items: [
          {
            id: "beta-definition",
            label: "Define beta and its significance in performance evaluation",
          },
          {
            id: "beta-calculation",
            label: "Calculate beta for a portfolio",
          },
          {
            id: "beta-interpretation",
            label:
              "Interpret beta in the context of risk-adjusted returns and volatility",
          },
          {
            id: "beta-comparison",
            label: "Compare beta across different investment options",
          },
          {
            id: "beta-limitations",
            label: "Understand the limitations of beta as a performance metric",
          },
        ],
      },
      {
        id: "downside-risk",
        label: "Assess downside risk and its impact on performance",
        items: [
          {
            id: "downside-risk-definition",
            label: "Define downside risk and its significance in performance",
          },
          {
            id: "downside-risk-calculation",
            label: "Calculate downside risk for a portfolio",
          },
          {
            id: "downside-risk-interpretation",
            label:
              "Interpret downside risk in the context of risk-adjusted returns",
          },
          {
            id: "downside-risk-comparison",
            label: "Compare downside risk across different investment options",
          },
          {
            id: "downside-risk-limitations",
            label: "Understand the limitations of downside risk as a metric",
          },
        ],
      },
      {
        id: "value-at-risk",
        label: "Calculate Value at Risk (VaR) for potential losses",
        items: [
          {
            id: "var-definition",
            label: "Define Value at Risk (VaR) and its significance",
          },
          {
            id: "var-calculation",
            label: "Calculate VaR for a portfolio",
          },
          {
            id: "var-interpretation",
            label:
              "Interpret VaR in the context of risk-adjusted returns and performance",
          },
          {
            id: "var-comparison",
            label: "Compare VaR across different investment options",
          },
          {
            id: "var-limitations",
            label: "Understand the limitations of VaR as a risk metric",
          },
        ],
      },
      {
        id: "expected-shortfall",
        label: "Understand expected shortfall and its implications",
        items: [
          {
            id: "expected-shortfall-definition",
            label: "Define expected shortfall and its significance",
          },
          {
            id: "expected-shortfall-calculation",
            label: "Calculate expected shortfall for a portfolio",
          },
          {
            id: "expected-shortfall-interpretation",
            label:
              "Interpret expected shortfall in the context of risk-adjusted returns",
          },
          {
            id: "expected-shortfall-comparison",
            label:
              "Compare expected shortfall across different investment options",
          },
          {
            id: "expected-shortfall-limitations",
            label:
              "Understand the limitations of expected shortfall as a risk metric",
          },
        ],
      },
      {
        id: "risk-adjusted-performance-comparison",
        label:
          "Compare risk-adjusted performance across different investment options",
        items: [
          {
            id: "risk-adjusted-performance-metrics",
            label:
              "Understand different risk-adjusted performance metrics (e.g., Sharpe ratio, Sortino ratio)",
          },
          {
            id: "risk-adjusted-performance-analysis",
            label:
              "Analyze risk-adjusted performance of different investment options",
          },
          {
            id: "risk-adjusted-performance-reporting",
            label:
              "Prepare reports comparing risk-adjusted performance across options",
          },
          {
            id: "risk-adjusted-performance-communication",
            label:
              "Communicate risk-adjusted performance comparisons to stakeholders",
          },
        ],
      },
      {
        id: "risk-adjusted-performance-reporting",
        label:
          "Review risk-adjusted performance reports to assess investment strategies",
        items: [
          {
            id: "risk-adjusted-performance-reporting-methods",
            label:
              "Understand different methods of reporting risk-adjusted performance",
          },
          {
            id: "risk-adjusted-performance-reporting-analysis",
            label:
              "Analyze risk-adjusted performance reports to assess strategies",
          },
          {
            id: "risk-adjusted-performance-reporting-communication",
            label:
              "Communicate risk-adjusted performance reports to stakeholders",
          },
        ],
      },
      {
        id: "risk-adjusted-performance-communication",
        label: "Communicate risk-adjusted performance metrics to stakeholders",
        items: [
          {
            id: "risk-adjusted-performance-communication-methods",
            label:
              "Understand different methods of communicating risk-adjusted performance",
          },
          {
            id: "risk-adjusted-performance-communication-analysis",
            label: "Analyze risk-adjusted performance communication strategies",
          },
          {
            id: "risk-adjusted-performance-communication-tools",
            label:
              "Use tools for effective communication of risk-adjusted performance",
          },
        ],
      },
    ],
  },
  {
    id: "investment-strategies-evaluation",
    title: "Investment Strategies Evaluation",
    items: [
      {
        id: "strategy-performance-analysis",
        label: "Analyze the performance of different investment strategies",
        items: [
          {
            id: "strategy-performance-metrics",
            label: "Understand performance metrics for investment strategies",
          },
          {
            id: "strategy-performance-comparison",
            label: "Compare the performance of different investment strategies",
          },
          {
            id: "strategy-performance-reporting",
            label:
              "Prepare reports on the performance of different investment strategies",
          },
          {
            id: "strategy-performance-communication",
            label: "Communicate strategy performance results to stakeholders",
          },
        ],
      },
      {
        id: "strategy-adjustments",
        label: "Make adjustments to strategies based on performance data",
        items: [
          {
            id: "strategy-adjustment-methods",
            label: "Understand methods for adjusting investment strategies",
          },
          {
            id: "strategy-adjustment-analysis",
            label:
              "Analyze the impact of adjustments on investment strategy performance",
          },
          {
            id: "strategy-adjustment-reporting",
            label:
              "Prepare reports on adjustments made to investment strategies",
          },
          {
            id: "strategy-adjustment-communication",
            label:
              "Communicate strategy adjustments to stakeholders effectively",
          },
        ],
      },
      {
        id: "long-term-vs-short-term-performance",
        label:
          "Differentiate between long-term and short-term investment performance metrics",
        items: [
          {
            id: "long-term-performance-metrics",
            label: "Understand long-term performance metrics",
          },
          {
            id: "short-term-performance-metrics",
            label: "Understand short-term performance metrics",
          },
          {
            id: "long-term-vs-short-term-comparison",
            label:
              "Compare long-term and short-term performance metrics effectively",
          },
        ],
      },
      {
        id: "performance-consistency",
        label: "Evaluate the consistency of investment performance over time",
        items: [
          {
            id: "performance-consistency-metrics",
            label: "Understand metrics for evaluating performance consistency",
          },
          {
            id: "performance-consistency-analysis",
            label:
              "Analyze the consistency of investment performance over time",
          },
          {
            id: "performance-consistency-reporting",
            label:
              "Prepare reports on the consistency of investment performance",
          },
          {
            id: "performance-consistency-communication",
            label:
              "Communicate performance consistency results to stakeholders",
          },
        ],
      },
      {
        id: "performance-attribution-analysis",
        label:
          "Conduct performance attribution analysis to identify sources of returns",
        items: [
          {
            id: "performance-attribution-methods",
            label: "Understand different performance attribution methods",
          },
          {
            id: "performance-attribution-analysis",
            label:
              "Analyze performance attribution results to identify sources of returns",
          },
          {
            id: "performance-attribution-reporting",
            label:
              "Prepare reports on performance attribution analysis results",
          },
          {
            id: "performance-attribution-communication",
            label:
              "Communicate performance attribution results to stakeholders",
          },
        ],
      },
      {
        id: "investment-style-analysis",
        label:
          "Perform investment style analysis to understand portfolio characteristics",
        items: [
          {
            id: "investment-style-definition",
            label: "Define investment styles and their significance",
          },
          {
            id: "investment-style-analysis-methods",
            label:
              "Understand methods for performing investment style analysis",
          },
          {
            id: "investment-style-reporting",
            label: "Prepare reports on investment style analysis results",
          },
          {
            id: "investment-style-communication",
            label:
              "Communicate investment style analysis results to stakeholders",
          },
        ],
      },
      {
        id: "performance-forecasting",
        label: "Forecast future performance based on historical data",
      },
    ],
  },
  {
    id: "performance-reporting-and-communication",
    title: "Performance Reporting and Communication",
    items: [
      {
        id: "performance-reporting",
        label: "Prepare and present performance reports to stakeholders",
      },
      {
        id: "performance-communication-strategies",
        label:
          "Develop effective communication strategies for performance results",
      },
      {
        id: "stakeholder-engagement",
        label: "Engage stakeholders in performance discussions",
        items: [
          {
            id: "stakeholder-engagement-methods",
            label:
              "Understand methods for engaging stakeholders in performance discussions",
          },
          {
            id: "stakeholder-engagement-analysis",
            label:
              "Analyze stakeholder engagement strategies for performance discussions",
          },
          {
            id: "stakeholder-engagement-tools",
            label:
              "Use tools for effective stakeholder engagement in performance discussions",
          },
        ],
      },
      {
        id: "performance-education",
        label: "Educate clients on performance metrics and their significance",
      },
    ],
  },
];
