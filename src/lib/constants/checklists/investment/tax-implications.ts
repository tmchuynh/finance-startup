import { ChecklistCategory } from "@/lib/interfaces";

export const taxImplications: ChecklistCategory[] = [
  {
    id: "capital-gains-tax",
    title: "Capital Gains Tax",
    items: [
      {
        id: "long-term-capital-gains",
        label: "Understand long-term capital gains tax rates",
        items: [
          {
            id: "long-term-capital-gains-rates",
            label: "Learn about long-term capital gains tax rates",
          },
          {
            id: "tax-implications",
            label: "Explore tax implications of long-term capital gains",
          },
          {
            id: "exclusions",
            label: "Learn about exclusions for primary residence sales",
          },
          {
            id: "primary-residence-exclusion",
            label:
              "Understand primary residence exclusion for capital gains tax",
          },
        ],
      },
      {
        id: "short-term-capital-gains",
        label: "Understand short-term capital gains tax rates",
        items: [
          {
            id: "short-term-capital-gains-rates",
            label: "Learn about short-term capital gains tax rates",
          },
          {
            id: "holding-period",
            label: "Understand holding period for short-term gains",
          },
          {
            id: "ordinary-income-tax",
            label: "Understand ordinary income tax rates for short-term gains",
          },
        ],
      },
      {
        id: "1031-exchange",
        label: "Consider 1031 exchange for deferring taxes",
        items: [
          {
            id: "1031-exchange-rules",
            label: "Understand 1031 exchange rules and requirements",
          },
          {
            id: "like-kind-properties",
            label: "Identify like-kind properties for exchange",
          },
        ],
      },
      {
        id: "capital-gains-tax-strategies",
        label: "Explore capital gains tax strategies",
        items: [
          {
            id: "tax-loss-harvesting",
            label: "Learn about tax-loss harvesting strategies",
          },
          {
            id: "holding-period-strategies",
            label: "Understand holding period strategies for tax savings",
          },
          {
            id: "charitable-contributions",
            label: "Explore charitable contributions for tax benefits",
          },
          {
            id: "tax-advantaged-accounts",
            label: "Consider tax-advantaged accounts for investments",
          },
        ],
      },
    ],
  },
  {
    id: "deductions-and-credits",
    title: "Deductions and Credits",
    items: [
      {
        id: "mortgage-interest-deduction",
        label: "Research mortgage interest deduction eligibility",
        items: [
          {
            id: "mortgage-interest-rates",
            label: "Understand mortgage interest rates and deductions",
          },
          {
            id: "itemized-deductions",
            label: "Explore itemized deductions for mortgage interest",
          },
          {
            id: "state-and-local-tax-deduction",
            label: "Understand state and local tax deduction options",
          },
        ],
      },
      {
        id: "property-tax-deduction",
        label: "Understand property tax deduction options",
        items: [
          {
            id: "property-tax-rates",
            label: "Learn about property tax rates and deductions",
          },
          {
            id: "property-tax-exemptions",
            label: "Check for property tax exemptions (e.g., homestead)",
          },
          {
            id: "property-tax-appeals",
            label: "Learn about property tax appeal processes",
          },
        ],
      },
      {
        id: "investment-property-expenses",
        label: "Track investment property expenses for deductions",
        items: [
          {
            id: "deductible-expenses",
            label: "Identify deductible expenses for investment properties",
          },
          {
            id: "depreciation",
            label: "Understand depreciation for investment properties",
          },
        ],
      },
      {
        id: "home-office-deduction",
        label: "Consider home office deduction eligibility",
        items: [
          {
            id: "home-office-expenses",
            label: "Identify deductible home office expenses",
          },
          {
            id: "record-keeping",
            label: "Maintain accurate records of home office expenses",
          },
        ],
      },
    ],
  },
  {
    id: "tax-forms",
    title: "Tax Forms",
    items: [
      {
        id: "schedule-e",
        label: "Use Schedule E for reporting rental income",
      },
      {
        id: "form-4562",
        label: "Use Form 4562 for depreciation deductions",
      },
      {
        id: "form-8825",
        label: "Use Form 8825 for partnership rental income",
      },
      {
        id: "form-1040",
        label: "Use Form 1040 for personal tax returns",
      },
      {
        id: "form-1040-sr",
        label: "Use Form 1040-SR for seniors",
      },
      {
        id: "form-1040x",
        label: "Use Form 1040-X for amended returns",
      },
    ],
  },
];
