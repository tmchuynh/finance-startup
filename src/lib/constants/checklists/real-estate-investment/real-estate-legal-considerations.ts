import { ChecklistCategory } from "@/lib/interfaces";

export const realEstateLegalConsiderations: ChecklistCategory[] = [
  {
    id: "property-ownership",
    title: "Property Ownership",
    items: [
      {
        id: "title-deed",
        label: "Ensure clear title deed",
        items: [
          {
            id: "title-search",
            label: "Conduct a title search to verify ownership",
          },
          {
            id: "title-insurance",
            label: "Obtain title insurance to protect against claims",
          },
          {
            id: "property-taxes",
            label: "Check for unpaid property taxes or liens",
          },
        ],
      },
      {
        id: "zoning-laws",
        label: "Understand zoning laws and restrictions",
        items: [
          {
            id: "zoning-restrictions",
            label: "Research zoning restrictions for property use",
          },
          {
            id: "building-permits",
            label: "Check for required building permits",
          },
          {
            id: "land-use-regulations",
            label: "Understand land use regulations in the area",
          },
        ],
      },
      {
        id: "property-boundaries",
        label: "Verify property boundaries and easements",
        items: [
          {
            id: "property-survey",
            label: "Conduct a property survey to confirm boundaries",
          },
          {
            id: "easements",
            label: "Check for any easements or encroachments",
          },
          {
            id: "property-lines",
            label: "Understand property lines and rights-of-way",
          },
        ],
      },
      {
        id: "property-history",
        label: "Research property history for liens or disputes",
        items: [
          {
            id: "property-history-report",
            label: "Obtain a property history report",
          },
          {
            id: "previous-owners",
            label: "Check for previous owners and their claims",
          },
          {
            id: "legal-disputes",
            label: "Investigate any legal disputes related to the property",
          },
        ],
      },
      {
        id: "property-survey",
        label: "Obtain a property survey to confirm boundaries",
        items: [
          {
            id: "property-boundaries",
            label: "Verify property boundaries and easements",
          },
          {
            id: "land-surveyor",
            label: "Hire a licensed land surveyor for accurate measurements",
          },
          {
            id: "property-lines",
            label: "Understand property lines and rights-of-way",
          },
        ],
      },
    ],
  },
  {
    id: "financing-options",
    title: "Financing Options",
    items: [
      {
        id: "mortgage-types",
        label: "Research mortgage types and terms",
      },
      {
        id: "interest-rates",
        label: "Compare interest rates from lenders",
        items: [
          {
            id: "fixed-rate-mortgage",
            label: "Understand fixed-rate mortgage options",
          },
          {
            id: "adjustable-rate-mortgage",
            label: "Explore adjustable-rate mortgage options",
          },
          {
            id: "interest-only-mortgage",
            label: "Consider interest-only mortgage options",
          },
        ],
      },
      {
        id: "down-payment-assistance",
        label: "Explore down payment assistance programs",
        items: [
          {
            id: "state-and-local-programs",
            label: "Research state and local assistance programs",
          },
          {
            id: "federal-assistance-programs",
            label: "Explore federal assistance programs",
          },
          {
            id: "grants-and-loans",
            label: "Consider grants and low-interest loans",
          },
        ],
      },
      {
        id: "loan-approval",
        label: "Get pre-approved for a mortgage",
        items: [
          {
            id: "pre-approval-process",
            label: "Understand the pre-approval process",
          },
          {
            id: "credit-score-impact",
            label: "Know how credit score affects loan approval",
          },
          {
            id: "debt-to-income-ratio",
            label: "Calculate debt-to-income ratio for approval",
          },
        ],
      },
      {
        id: "closing-costs",
        label: "Understand closing costs and fees",
        items: [
          {
            id: "closing-costs-breakdown",
            label: "Get a breakdown of closing costs",
          },
          {
            id: "negotiating-closing-costs",
            label: "Negotiate closing costs with the seller",
          },
          {
            id: "prepaid-expenses",
            label: "Understand prepaid expenses and escrows",
          },
        ],
      },
    ],
  },
  {
    id: "tax-implications",
    title: "Tax Implications",
    items: [
      {
        id: "property-tax-calculator",
        label: "Use a property tax calculator to estimate annual taxes",
        items: [
          {
            id: "property-tax-rates",
            label: "Research local property tax rates",
          },
          {
            id: "property-tax-deductions",
            label: "Understand property tax deductions",
          },
          {
            id: "property-tax-exemptions",
            label: "Check for property tax exemptions",
          },
        ],
      },
      {
        id: "deductible-expenses",
        label:
          "Identify deductible expenses (mortgage interest, property taxes)",
        items: [
          {
            id: "mortgage-interest-deduction",
            label: "Research mortgage interest deduction eligibility",
          },
          {
            id: "property-tax-deduction",
            label: "Understand property tax deduction options",
          },
          {
            id: "investment-property-expenses",
            label: "Track investment property expenses for deductions",
          },
          {
            id: "home-office-deduction",
            label: "Explore home office deduction options",
          },
          {
            id: "capital-improvements",
            label: "Understand capital improvements and deductions",
          },
          {
            id: "tax-record-keeping",
            label: "Maintain accurate tax records for deductions",
          },
          {
            id: "tax-implications",
            label: "Explore tax implications of investment property expenses",
          },
          {
            id: "tax-credits",
            label: "Research available tax credits for property owners",
          },
        ],
      },
      {
        id: "capital-gains-tax",
        label:
          "Understand capital gains tax implications on property sales or rentals",
        items: [
          {
            id: "long-term-capital-gains",
            label: "Learn about long-term capital gains tax rates",
          },
          {
            id: "1031-exchange",
            label: "Explore 1031 exchange options to defer taxes",
          },
          {
            id: "capital-gains-exemptions",
            label: "Check for capital gains exemptions",
          },
          {
            id: "property-sale-tax-implications",
            label: "Understand tax implications of property sales",
          },
          {
            id: "rental-income-taxation",
            label: "Learn about rental income taxation",
          },
          {
            id: "tax-loss-harvesting",
            label: "Explore tax-loss harvesting strategies",
          },
          {
            id: "tax-planning",
            label: "Consult a tax professional for tax planning",
          },
        ],
      },
    ],
  },
  {
    id: "insurance-requirements",
    title: "Insurance Requirements",
    items: [
      {
        id: "homeowners-insurance",
        label: "Obtain homeowners insurance",
      },
      {
        id: "flood-insurance",
        label: "Consider flood insurance if in a flood zone",
      },
      {
        id: "landlord-insurance",
        label: "Get landlord insurance for rental properties",
      },
      {
        id: "liability-insurance",
        label: "Consider liability insurance for additional protection",
      },
      {
        id: "property-insurance",
        label: "Research property insurance options",
      },
      {
        id: "insurance-coverage",
        label: "Understand coverage limits and deductibles",
      },
      {
        id: "insurance-claims-process",
        label: "Familiarize yourself with the claims process",
      },
      {
        id: "insurance-discounts",
        label: "Ask about discounts for bundling policies",
      },
    ],
  },
  {
    id: "legal-protection",
    title: "Legal Protection",
    items: [
      {
        id: "consult-real-estate-attorney",
        label: "Consult a real estate attorney for legal advice and contracts",
      },
      {
        id: "review-lease-agreements",
        label: "Review lease agreements to ensure they comply with local laws",
      },
      {
        id: "understand-landlord-tenant-laws",
        label:
          "Understand landlord-tenant laws in your area to avoid legal issues",
      },
    ],
  },
  {
    id: "property-management",
    title: "Property Management",
    items: [
      {
        id: "property-management-company",
        label: "Consider hiring a property management company",
      },
      {
        id: "tenant-screening-process",
        label: "Establish a tenant screening process",
      },
      {
        id: "maintenance-requirements",
        label: "Understand maintenance and repair responsibilities",
      },
      {
        id: "lease-agreement-terms",
        label: "Review lease agreement terms and conditions",
      },
      {
        id: "eviction-process",
        label: "Familiarize yourself with the eviction process",
      },
      {
        id: "property-management-software",
        label: "Consider using property management software",
      },
      {
        id: "tenant-communication",
        label: "Establish clear tenant communication channels",
      },
    ],
  },
  {
    id: "market-research",
    title: "Market Research",
    items: [
      {
        id: "local-market-trends",
        label: "Research local market trends and property values",
      },
      {
        id: "rental-demand-analysis",
        label: "Analyze rental demand in your area",
      },
      {
        id: "economic-indicators",
        label:
          "Monitor economic indicators that may affect property values and demand",
      },
      {
        id: "neighborhood-analysis",
        label: "Conduct a neighborhood analysis for investment potential",
      },
      {
        id: "property-comparables",
        label: "Use property comparables to assess value",
      },
      {
        id: "investment-strategy",
        label: "Align your investment strategy with market conditions",
      },
      {
        id: "real-estate-news",
        label: "Stay updated with real estate news and reports",
      },
    ],
  },
];
