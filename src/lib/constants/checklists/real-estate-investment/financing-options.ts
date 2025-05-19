import { ChecklistCategory } from "@/lib/interfaces";

export const financingOptions: ChecklistCategory[] = [
  {
    id: "mortgage-types",
    title: "Mortgage Types",
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
    title: "Interest Rates",
    items: [
      {
        id: "compare-lenders",
        label: "Compare interest rates from lenders",
        items: [
          {
            id: "current-market-rates",
            label: "Check current market rates",
          },
          {
            id: "lender-competitiveness",
            label: "Evaluate lender competitiveness",
          },
          {
            id: "rate-lock-options",
            label: "Explore rate lock options",
          },
          {
            id: "rate-quote-comparison",
            label: "Request and compare rate quotes from lenders",
          },
        ],
      },
      {
        id: "fixed-vs-variable-rates",
        label: "Understand fixed vs. variable rates",
        items: [
          {
            id: "fixed-rate-benefits",
            label: "Benefits of fixed-rate mortgages",
          },
          {
            id: "variable-rate-benefits",
            label: "Benefits of variable-rate mortgages",
          },
          {
            id: "rate-adjustment-implications",
            label: "Implications of rate adjustments",
          },
        ],
      },
      {
        id: "points-and-fees",
        label: "Consider points and fees associated with rates",
        items: [
          {
            id: "understand-points",
            label: "Understand points and fees",
          },
          {
            id: "calculate-cost-benefit",
            label: "Calculate cost-benefit of points",
          },
          {
            id: "negotiate-points-and-fees",
            label: "Negotiate points and fees with lenders",
          },
        ],
      },
    ],
  },
  {
    id: "down-payment-assistance",
    title: "Down Payment Assistance Programs",
    items: [
      {
        id: "state-and-local-programs",
        label: "Research state and local down payment assistance programs",
      },
      {
        id: "grants-and-loans",
        label: "Explore grants and loans for down payment assistance",
        items: [
          {
            id: "federal-programs",
            label: "Research federal programs for down payment assistance",
          },
          {
            id: "non-profit-organizations",
            label: "Explore non-profit organizations offering assistance",
          },
          {
            id: "community-development-financial-institutions",
            label:
              "Research community development financial institutions (CDFIs)",
          },
        ],
      },
    ],
  },
  {
    id: "loan-approval-process",
    title: "Loan Approval Process",
    items: [
      {
        id: "pre-approval-importance",
        label:
          "Understand the importance of getting pre-approved for a mortgage",
        items: [
          {
            id: "pre-approval-benefits",
            label: "Benefits of pre-approval",
          },
          {
            id: "pre-approval-process",
            label: "Pre-approval process and requirements",
          },
          {
            id: "pre-approval-vs-pre-qualification",
            label: "Difference between pre-approval and pre-qualification",
          },
          {
            id: "pre-approval-impact-on-offers",
            label: "Impact of pre-approval on offers and negotiations",
          },
        ],
      },
      {
        id: "documents-needed-for-pre-approval",
        label: "Gather necessary documents for pre-approval (income, assets)",
        items: [
          {
            id: "income-verification",
            label: "Income verification documents",
          },
          {
            id: "asset-verification",
            label: "Asset verification documents",
          },
          {
            id: "credit-report-check",
            label: "Check credit report and score",
          },
          {
            id: "debt-to-income-ratio",
            label: "Calculate debt-to-income ratio",
          },
        ],
      },
    ],
  },
  {
    id: "closing-costs-and-fees",
    title: "Closing Costs and Fees",
    items: [
      {
        id: "understand-closing-costs",
        label:
          "Understand closing costs and fees associated with the mortgage process",
        items: [
          {
            id: "types-of-closing-costs",
            label: "Types of closing costs (origination, appraisal, etc.)",
          },
          {
            id: "estimate-closing-costs",
            label: "Estimate closing costs using a calculator",
          },
          {
            id: "negotiate-closing-costs",
            label: "Negotiate closing costs with lenders or sellers",
          },
          {
            id: "closing-costs-implications",
            label: "Understand implications of closing costs on finances",
          },
          {
            id: "closing-costs-escrow-account",
            label: "Consider using an escrow account for closing costs",
          },
        ],
      },
      {
        id: "negotiate-closing-costs-with-lender",
        label: "Negotiate closing costs with the lender or seller",
        items: [
          {
            id: "lender-negotiation-tips",
            label: "Tips for negotiating with lenders",
          },
          {
            id: "seller-concessions",
            label: "Consider seller concessions for closing costs",
          },
          {
            id: "closing-costs-credits",
            label: "Explore closing cost credits from lenders",
          },
        ],
      },
      {
        id: "estimate-closing-costs",
        label: "Estimate closing costs using a calculator",
      },
      {
        id: "include-closing-costs-in-loan",
        label: "Consider including closing costs in the loan amount",
        items: [
          {
            id: "loan-amount-impact",
            label: "Understand impact on loan amount and monthly payments",
          },
          {
            id: "long-term-costs",
            label: "Evaluate long-term costs of including closing costs",
          },
        ],
      },
    ],
  },
  {
    id: "loan-terms-and-conditions",
    title: "Loan Terms and Conditions",
    items: [
      {
        id: "understand-loan-terms",
        label: "Understand loan terms and conditions",
      },
      {
        id: "loan-terms-comparison",
        label: "Compare loan terms and conditions from different lenders",
      },
      {
        id: "loan-conditions-negotiation",
        label: "Negotiate loan conditions with lenders",
        items: [
          {
            id: "interest-rate-negotiation",
            label: "Negotiate interest rates with lenders",
          },
          {
            id: "loan-terms-negotiation",
            label: "Negotiate loan terms and conditions",
          },
          {
            id: "fees-negotiation",
            label: "Negotiate fees associated with the loan",
          },
        ],
      },
      {
        id: "loan-conditions-review",
        label: "Review loan conditions before signing",
      },
    ],
  },
  {
    id: "loan-repayment-options",
    title: "Loan Repayment Options",
    items: [
      {
        id: "monthly-repayment-options",
        label: "Understand monthly repayment options",
        items: [
          {
            id: "fixed-monthly-payments",
            label: "Fixed monthly payments",
          },
          {
            id: "variable-monthly-payments",
            label: "Variable monthly payments",
          },
          {
            id: "interest-only-payments",
            label: "Interest-only payments",
          },
        ],
      },
      {
        id: "extra-payments-options",
        label: "Explore options for making extra payments",
        items: [
          {
            id: "lump-sum-payments",
            label: "Lump sum payments",
          },
          {
            id: "bi-weekly-payments",
            label: "Bi-weekly payments",
          },
          {
            id: "monthly-payment-increase",
            label: "Increase monthly payment amount",
          },
        ],
      },
      {
        id: "loan-refinancing-options",
        label: "Consider loan refinancing options in the future",
        items: [
          {
            id: "lower-interest-rate",
            label: "Lower interest rate",
          },
          {
            id: "shorter-loan-term",
            label: "Shorter loan term",
          },
          {
            id: "cash-out-refinancing",
            label: "Cash-out refinancing",
          },
        ],
      },
    ],
  },
];
