import { ChecklistCategory } from "@/lib/interfaces";

export const realEstateRiskManagement: ChecklistCategory[] = [
  {
    id: "property-insurance",
    title: "Property Insurance",
    items: [
      {
        id: "homeowners-insurance",
        label: "Obtain homeowners insurance",
      },
      {
        id: "landlord-insurance",
        label: "Consider landlord insurance for rental properties",
      },
      {
        id: "flood-insurance",
        label: "Evaluate flood insurance if in a flood-prone area",
      },
      {
        id: "earthquake-insurance",
        label: "Consider earthquake insurance in seismic zones",
      },
      {
        id: "liability-coverage",
        label: "Ensure liability coverage for accidents on the property",
      },
      {
        id: "review-insurance-policies",
        label: "Review insurance policies annually for adequacy",
      },
    ],
  },
  {
    id: "emergency-fund",
    title: "Emergency Fund",
    items: [
      {
        id: "set-up-emergency-fund",
        label: "Set up an emergency fund for unexpected repairs or vacancies",
      },
      {
        id: "calculate-fund-amount",
        label:
          "Calculate the amount needed for 3-6 months of expenses and mortgage payments",
      },
      {
        id: "keep-fund-accessible",
        label:
          "Keep the emergency fund in a separate, easily accessible account",
      },
      {
        id: "replenish-fund-when-used",
        label: "Replenish the fund when used for repairs or emergencies",
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
      {
        id: "consider-legal-insurance",
        label: "Consider legal insurance for additional protection",
      },
      {
        id: "document-property-condition",
        label: "Document the condition of the property before tenants move in",
      },
    ],
  },
  {
    id: "property-management",
    title: "Property Management",
    items: [
      {
        id: "consider-property-management-company",
        label:
          "Consider hiring a property management company for rental properties",
      },
      {
        id: "screen-tenants-thoroughly",
        label: "Screen tenants thoroughly to minimize risks",
      },
      {
        id: "establish-clear-communication",
        label:
          "Establish clear communication channels with tenants for maintenance and issues",
      },
      {
        id: "set-clear-rules-and-policies",
        label: "Set clear rules and policies for tenants to follow",
      },
      {
        id: "conduct-regular-property-inspections",
        label:
          "Conduct regular property inspections to identify maintenance issues early",
      },
    ],
  },
  {
    id: "market-research",
    title: "Market Research",
    items: [
      {
        id: "research-local-market-trends",
        label: "Research local market trends and property values",
      },
      {
        id: "analyze-rental-demand",
        label: "Analyze rental demand in your area to set competitive rates",
      },
      {
        id: "monitor-economic-indicators",
        label:
          "Monitor economic indicators that may affect property values and demand",
      },
    ],
  },
];
