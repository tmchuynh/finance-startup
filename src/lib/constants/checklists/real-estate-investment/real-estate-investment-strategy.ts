import { ChecklistCategory } from "@/lib/interfaces";

export const realEstateInvestmentStrategy: ChecklistCategory[] = [
  {
    id: "investment-goals",
    title: "Investment Goals",
    items: [
      {
        id: "define-investment-goals",
        label: "Define your investment goals (e.g., cash flow, appreciation)",
        items: [
          {
            id: "cash-flow-goals",
            label: "Set cash flow goals for rental income",
          },
          {
            id: "appreciation-goals",
            label: "Set appreciation goals for property value growth",
          },
          {
            id: "diversification-goals",
            label: "Set diversification goals for your portfolio",
          },
          {
            id: "tax-benefits-goals",
            label: "Set tax benefits goals for investment properties",
          },
          {
            id: "retirement-goals",
            label: "Set retirement goals for long-term investments",
          },
          {
            id: "wealth-building-goals",
            label: "Set wealth-building goals for future investments",
          },
        ],
      },
      {
        id: "determine-investment-horizon",
        label: "Determine your investment horizon (short-term vs. long-term)",
        items: [
          {
            id: "short-term-investments",
            label: "Identify short-term investment opportunities",
          },
          {
            id: "long-term-investments",
            label: "Identify long-term investment opportunities",
          },
          {
            id: "investment-strategy",
            label:
              "Choose an investment strategy (e.g., buy and hold, fix and flip)",
          },
        ],
      },
      {
        id: "assess-risk-tolerance",
        label: "Assess your risk tolerance and investment strategy",
        items: [
          {
            id: "high-risk-investments",
            label: "Consider high-risk investments for higher returns",
          },
          {
            id: "low-risk-investments",
            label: "Consider low-risk investments for stability",
          },
          {
            id: "diversified-investments",
            label: "Consider diversified investments for balanced risk",
          },
        ],
      },
    ],
  },
  {
    id: "property-type",
    title: "Property Type",
    items: [
      {
        id: "residential-vs-commercial",
        label:
          "Decide between residential, commercial, or mixed-use properties",
        items: [
          {
            id: "residential-properties",
            label: "Consider residential properties for rental income",
          },
          {
            id: "commercial-properties",
            label: "Consider commercial properties for business use",
          },
          {
            id: "mixed-use-properties",
            label: "Consider mixed-use properties for diverse income streams",
          },
        ],
      },
      {
        id: "single-family-vs-multi-family",
        label:
          "Choose between single-family homes, multi-family units, or condos",
        items: [
          {
            id: "single-family-homes",
            label: "Consider single-family homes for rental income",
          },
          {
            id: "multi-family-units",
            label: "Consider multi-family units for higher cash flow",
          },
          {
            id: "condos",
            label: "Consider condos for lower maintenance costs",
          },
        ],
      },
      {
        id: "vacation-rental-vs-long-term-rental",
        label:
          "Consider vacation rentals vs. long-term rental properties based on market demand",
        items: [
          {
            id: "vacation-rentals",
            label: "Consider vacation rentals for higher short-term income",
          },
          {
            id: "long-term-rentals",
            label: "Consider long-term rentals for stable cash flow",
          },
        ],
      },
    ],
  },
  {
    id: "location-analysis",
    title: "Location Analysis",
    items: [
      {
        id: "research-local-market-trends",
        label:
          "Research local market trends, including supply and demand dynamics",
      },
      {
        id: "evaluate-neighborhood-factors",
        label:
          "Evaluate neighborhood factors such as schools, amenities, and crime rates",
      },
      {
        id: "assess-economic-indicators",
        label:
          "Assess economic indicators like job growth and population trends in the area",
      },
    ],
  },
];
