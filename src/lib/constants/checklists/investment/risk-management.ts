import { ChecklistCategory } from "@/lib/interfaces";

export const riskManagement: ChecklistCategory[] = [
  {
    id: "risk-assessment",
    title: "Risk Assessment",
    items: [
      {
        id: "identify-risks",
        label: "Identify potential risks associated with the investment",
        items: [
          {
            id: "market-risk",
            label: "Market risk (economic downturns, market volatility)",
          },
          {
            id: "credit-risk",
            label: "Credit risk (default by borrowers or issuers)",
          },
          {
            id: "liquidity-risk",
            label: "Liquidity risk (difficulty in selling the investment)",
          },
          {
            id: "interest-rate-risk",
            label: "Interest rate risk (fluctuations in interest rates)",
          },
          {
            id: "regulatory-risk",
            label: "Regulatory risk (changes in laws and regulations)",
          },
        ],
      },
      {
        id: "evaluate-risk-impact",
        label: "Evaluate the potential impact of each risk",
        items: [
          {
            id: "financial-impact",
            label: "Financial impact (loss of capital, reduced returns)",
          },
          {
            id: "reputation-impact",
            label: "Reputation impact (damage to brand or credibility)",
          },
          {
            id: "operational-impact",
            label: "Operational impact (disruption to business operations)",
          },
        ],
      },
      {
        id: "prioritize-risks",
        label: "Prioritize risks based on their likelihood and impact",
        items: [
          {
            id: "high-priority-risks",
            label: "Identify high-priority risks to address first",
          },
          {
            id: "medium-priority-risks",
            label: "Identify medium-priority risks to monitor",
          },
          {
            id: "low-priority-risks",
            label: "Identify low-priority risks for future consideration",
          },
        ],
      },
    ],
  },
  {
    id: "risk-mitigation-strategies",
    title: "Risk Mitigation Strategies",
    items: [
      {
        id: "diversification",
        label: "Diversify investments to spread risk",
        items: [
          {
            id: "asset-class-diversification",
            label: "Diversify across different asset classes",
          },
          {
            id: "geographic-diversification",
            label: "Diversify across different geographic regions",
          },
          {
            id: "sector-diversification",
            label: "Diversify across different sectors or industries",
          },
        ],
      },
      {
        id: "insurance-coverage",
        label: "Consider insurance coverage for potential losses",
        items: [
          {
            id: "property-insurance",
            label: "Property insurance for physical assets",
          },
          {
            id: "liability-insurance",
            label: "Liability insurance for legal protection",
          },
          {
            id: "business-interruption-insurance",
            label: "Business interruption insurance for income loss",
          },
        ],
      },
      {
        id: "emergency-fund",
        label: "Establish an emergency fund for unexpected expenses",
        items: [
          {
            id: "determine-fund-size",
            label: "Determine the size of the emergency fund needed",
          },
          {
            id: "set-fund-goals",
            label: "Set goals for building the emergency fund",
          },
          {
            id: "regular-contributions",
            label: "Make regular contributions to the emergency fund",
          },
        ],
      },
    ],
  },
  {
    id: "monitoring-and-review",
    title: "Monitoring and Review",
    items: [
      {
        id: "regular-review-of-investments",
        label: "Conduct regular reviews of investment performance and risks",
      },
      {
        id: "adjust-risk-management-strategies",
        label:
          "Adjust risk management strategies as needed based on performance and market conditions",
      },
    ],
  },
  {
    id: "legal-and-regulatory-compliance",
    title: "Legal and Regulatory Compliance",
    items: [
      {
        id: "understand-regulations",
        label: "Understand legal and regulatory requirements for investments",
        items: [
          {
            id: "local-regulations",
            label: "Research local regulations and compliance requirements",
          },
          {
            id: "international-regulations",
            label:
              "Research international regulations for cross-border investments",
          },
          {
            id: "industry-specific-regulations",
            label: "Research industry-specific regulations and compliance",
          },
        ],
      },
      {
        id: "consult-legal-advisor",
        label: "Consult a legal advisor for compliance issues",
      },
      {
        id: "document-management",
        label: "Maintain proper documentation for all investments",
      },
    ],
  },
  {
    id: "exit-strategy",
    title: "Exit Strategy",
    items: [
      {
        id: "define-exit-strategy",
        label: "Define an exit strategy for the investment",
        items: [
          {
            id: "liquidation-strategy",
            label: "Liquidation strategy (selling assets)",
          },
          {
            id: "merger-acquisition-strategy",
            label: "Merger or acquisition strategy",
          },
          {
            id: "initial-public-offering-strategy",
            label: "Initial public offering (IPO) strategy",
          },
        ],
      },
      {
        id: "market-conditions-assessment",
        label: "Assess market conditions before executing the exit strategy",
      },
      {
        id: "tax-implications",
        label:
          "Understand tax implications of selling or exiting the investment",
        items: [
          {
            id: "capital-gains-tax",
            label: "Capital gains tax on profits from the sale",
          },
          {
            id: "tax-loss-harvesting",
            label: "Tax-loss harvesting strategies to offset gains",
          },
          {
            id: "tax-implications-of-mergers",
            label: "Tax implications of mergers or acquisitions",
          },
        ],
      },
    ],
  },
];
