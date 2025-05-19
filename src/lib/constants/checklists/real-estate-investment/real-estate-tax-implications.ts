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
            id: "title-insurance",
            label: "Consider title insurance to protect against claims",
          },
          {
            id: "property-history",
            label: "Research property history for liens or disputes",
          },
          {
            id: "property-survey",
            label: "Obtain a property survey to confirm boundaries",
          },
        ],
      },
      {
        id: "zoning-laws",
        label: "Understand zoning laws and restrictions",
        items: [
          {
            id: "zoning-restrictions",
            label: "Check for zoning restrictions on property use",
          },
          {
            id: "building-permits",
            label: "Verify building permits for renovations or additions",
          },
          {
            id: "land-use-regulations",
            label: "Understand land use regulations in the area",
          },
          {
            id: "environmental-regulations",
            label: "Check for environmental regulations or restrictions",
          },
          {
            id: "homeowners-association",
            label: "Review homeowners association (HOA) rules and fees",
          },
          {
            id: "property-usage",
            label: "Understand property usage rights and limitations",
          },
        ],
      },
      {
        id: "property-boundaries",
        label: "Verify property boundaries and easements",
        items: [
          {
            id: "property-survey",
            label: "Obtain a property survey to confirm boundaries",
          },
          {
            id: "easements",
            label: "Check for easements or rights of way on the property",
          },
          {
            id: "neighboring-properties",
            label: "Research neighboring properties and their usage",
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
        items: [
          {
            id: "fixed-rate-mortgage",
            label: "Fixed-rate mortgage",
          },
          {
            id: "adjustable-rate-mortgage",
            label: "Adjustable-rate mortgage (ARM)",
          },
          {
            id: "interest-only-mortgage",
            label: "Interest-only mortgage",
          },
          {
            id: "fha-loan",
            label: "FHA loan (Federal Housing Administration)",
          },
          {
            id: "va-loan",
            label: "VA loan (Veterans Affairs)",
          },
        ],
      },
      {
        id: "interest-rates",
        label: "Compare interest rates from lenders",
        items: [
          {
            id: "fixed-vs-variable-rates",
            label: "Fixed vs. variable interest rates",
          },
          {
            id: "points-and-fees",
            label: "Understand points and fees associated with loans",
          },
          {
            id: "loan-terms",
            label: "Compare loan terms and conditions",
          },
        ],
      },
      {
        id: "down-payment-assistance",
        label: "Explore down payment assistance programs",
        items: [
          {
            id: "state-and-local-programs",
            label: "State and local programs for first-time buyers",
          },
          {
            id: "grants-and-loans",
            label: "Grants and loans for down payment assistance",
          },
          {
            id: "tax-credits",
            label: "Tax credits for homebuyers",
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
            id: "assessed-value",
            label: "Understand assessed value and tax rate",
          },
          {
            id: "property-tax-deductions",
            label: "Explore property tax deductions available",
          },
          {
            id: "property-tax-exemptions",
            label: "Check for property tax exemptions (e.g., homestead)",
          },
        ],
      },
      {
        id: "deductible-expenses",
        label:
          "Identify deductible expenses (mortgage interest, property taxes)",
        items: [
          {
            id: "mortgage-interest",
            label: "Mortgage interest deduction",
          },
          {
            id: "property-tax-deduction",
            label: "Property tax deduction",
          },
          {
            id: "home-office-deduction",
            label: "Home office deduction (if applicable)",
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
            label: "Long-term capital gains tax rates",
          },
          {
            id: "1031-exchange",
            label: "1031 exchange for deferring capital gains tax",
          },
          {
            id: "primary-residence-exclusion",
            label:
              "Primary residence exclusion for capital gains tax (up to $250,000)",
          },
        ],
      },
      {
        id: "tax-credits",
        label: "Explore available tax credits for real estate investments",
        items: [
          {
            id: "energy-efficiency-credits",
            label: "Energy efficiency tax credits",
          },
          {
            id: "historic-preservation-credits",
            label: "Historic preservation tax credits",
          },
          {
            id: "low-income-housing-credits",
            label: "Low-income housing tax credits (LIHTC)",
          },
        ],
      },
      {
        id: "tax-planning",
        label: "Consult a tax professional for tax planning strategies",
        items: [
          {
            id: "tax-strategies",
            label: "Tax strategies for real estate investors",
          },
          {
            id: "deductions-and-credits",
            label: "Maximize deductions and credits available",
          },
          {
            id: "retirement-account-investments",
            label:
              "Consider retirement account investments in real estate (e.g., self-directed IRA)",
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
        items: [
          {
            id: "coverage-types",
            label: "Understand coverage types (dwelling, personal property)",
          },
          {
            id: "liability-coverage",
            label: "Consider liability coverage for accidents on property",
          },
          {
            id: "deductibles",
            label: "Choose appropriate deductibles for your policy",
          },
        ],
      },
      {
        id: "flood-insurance",
        label: "Consider flood insurance if in a flood zone",
        items: [
          {
            id: "flood-zone-maps",
            label: "Check flood zone maps for your area",
          },
          {
            id: "flood-insurance-requirements",
            label:
              "Understand flood insurance requirements from lenders or FEMA",
          },
        ],
      },
      {
        id: "landlord-insurance",
        label: "If renting, consider landlord insurance for rental properties",
        items: [
          {
            id: "rental-property-coverage",
            label:
              "Understand rental property coverage and liability protection",
          },
          {
            id: "loss-of-rent-coverage",
            label:
              "Consider loss of rent coverage for tenant non-payment or damage",
          },
        ],
      },
    ],
  },
];
