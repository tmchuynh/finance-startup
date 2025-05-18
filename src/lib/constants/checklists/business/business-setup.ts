import { ChecklistCategory } from "@/lib/interfaces";

export const businessSetup: ChecklistCategory[] = [
  {
    id: "business-setup",
    title: "Business Setup",
    items: [
      {
        id: "business-plan",
        label: "Create a Business Plan",
        items: [
          {
            id: "business-plan-executive-summary",
            label: "Write an Executive Summary",
          },
          {
            id: "business-plan-company-description",
            label: "Describe Your Company",
          },
          {
            id: "business-plan-market-analysis",
            label: "Conduct Market Analysis",
          },
          {
            id: "business-plan-organization-management",
            label: "Outline Organization and Management",
          },
          {
            id: "business-plan-service-product-line",
            label: "Define Your Service or Product Line",
          },
          {
            id: "business-plan-marketing-sales",
            label: "Develop Marketing and Sales Strategies",
          },
          {
            id: "business-plan-funding-request",
            label: "Create a Funding Request (if applicable)",
          },
        ],
      },
      {
        id: "business-structure",
        label: "Choose a Business Structure",
        items: [
          {
            id: "business-structure-sole-proprietorship",
            label: "Sole Proprietorship",
          },
          {
            id: "business-structure-partnership",
            label: "Partnership",
          },
          {
            id: "business-structure-corporation",
            label: "Corporation",
          },
          {
            id: "business-structure-limited-liability-company",
            label: "Limited Liability Company (LLC)",
          },
        ],
      },
      {
        id: "business-name-registration",
        label: "Register Your Business Name",
      },
      {
        id: "business-licenses-permits",
        label: "Obtain Necessary Licenses and Permits",
      },
      {
        id: "business-bank-account",
        label: "Open a Business Bank Account",
      },
    ],
  },
];
