import { ChecklistCategory } from "@/lib/interfaces";

export const propertyManagement: ChecklistCategory[] = [
  {
    id: "property-management",
    title: "Property Management",
    items: [
      {
        id: "property-management-company",
        label: "Consider hiring a property management company",
        items: [
          {
            id: "research-property-management",
            label: "Research property management companies",
          },
          {
            id: "compare-services-and-fees",
            label: "Compare services and fees",
          },
          {
            id: "check-references-and-reviews",
            label: "Check references and reviews",
          },
          {
            id: "interview-potential-companies",
            label: "Interview potential property management companies",
          },
        ],
      },
      {
        id: "tenant-screening-process",
        label: "Understand the tenant screening process",
        items: [
          {
            id: "background-checks",
            label: "Conduct background checks on potential tenants",
          },
          {
            id: "credit-checks",
            label: "Perform credit checks",
          },
          {
            id: "income-verification",
            label: "Verify tenant income and employment",
          },
        ],
      },
      {
        id: "lease-agreement-terms",
        label: "Review lease agreement terms and conditions",
        items: [
          {
            id: "lease-terms",
            label: "Understand lease terms and conditions",
          },
          {
            id: "security-deposit-requirements",
            label: "Know security deposit requirements",
          },
          {
            id: "rent-increase-notice-periods",
            label: "Understand rent increase notice periods",
          },
        ],
      },
      {
        id: "maintenance-and-repairs",
        label: "Plan for maintenance and repairs",
        items: [
          {
            id: "routine-maintenance",
            label: "Schedule routine maintenance",
          },
          {
            id: "emergency-repairs",
            label: "Establish emergency repair procedures",
          },
          {
            id: "vendor-management",
            label: "Manage vendor relationships for repairs and services",
          },
        ],
      },
      {
        id: "tenant-communication",
        label: "Establish tenant communication channels",
        items: [
          {
            id: "communication-methods",
            label: "Determine communication methods (email, phone, etc.)",
          },
          {
            id: "response-time-standards",
            label: "Set response time standards for tenant inquiries",
          },
          {
            id: "tenant-feedback-process",
            label: "Create a process for tenant feedback and complaints",
          },
        ],
      },
    ],
  },
  {
    id: "tenant-management",
    title: "Tenant Management",
    items: [
      {
        id: "tenant-screening",
        label: "Screen tenants thoroughly",
        items: [
          {
            id: "background-checks",
            label: "Conduct background checks",
          },
          {
            id: "credit-checks",
            label: "Perform credit checks",
          },
          {
            id: "income-verification",
            label: "Verify income and employment",
          },
        ],
      },
      {
        id: "lease-renewals",
        label: "Manage lease renewals and terminations",
        items: [
          {
            id: "renewal-notices",
            label: "Send lease renewal notices",
          },
          {
            id: "termination-notices",
            label: "Send lease termination notices",
          },
          {
            id: "move-out-inspections",
            label: "Conduct move-out inspections",
          },
        ],
      },
      {
        id: "rent-collection-process",
        label: "Establish a rent collection process",
        items: [
          {
            id: "payment-methods",
            label: "Determine acceptable payment methods",
          },
          {
            id: "late-fees-policy",
            label: "Set a late fees policy",
          },
          {
            id: "rent-receipt-procedures",
            label: "Create rent receipt procedures",
          },
        ],
      },
      {
        id: "tenant-eviction-process",
        label: "Understand the tenant eviction process",
        items: [
          {
            id: "eviction-notices",
            label: "Know the eviction notice requirements",
          },
          {
            id: "court-procedures",
            label: "Understand court procedures for eviction",
          },
          {
            id: "tenant-rights",
            label: "Be aware of tenant rights during eviction",
          },
        ],
      },
    ],
  },
  {
    id: "property-maintenance",
    title: "Property Maintenance",
    items: [
      {
        id: "routine-maintenance-schedule",
        label: "Create a routine maintenance schedule",
        items: [
          {
            id: "seasonal-maintenance",
            label: "Plan seasonal maintenance tasks",
          },
          {
            id: "property-inspections",
            label: "Conduct regular property inspections",
          },
          {
            id: "maintenance-tracking-system",
            label: "Implement a maintenance tracking system",
          },
          {
            id: "maintenance-record-keeping",
            label: "Keep detailed maintenance records",
          },
        ],
      },
      {
        id: "emergency-repair-procedures",
        label: "Establish emergency repair procedures",
        items: [
          {
            id: "emergency-contact-numbers",
            label: "Compile a list of emergency contact numbers",
          },
          {
            id: "24-7-maintenance-service",
            label: "Consider 24/7 maintenance service options",
          },
          {
            id: "emergency-repair-budget",
            label: "Set an emergency repair budget",
          },
          {
            id: "emergency-repair-protocols",
            label: "Create emergency repair protocols",
          },
        ],
      },
      {
        id: "vendor-management",
        label: "Manage vendor relationships for repairs and services",
        items: [
          {
            id: "vendor-selection",
            label: "Select reliable vendors for repairs",
          },
          {
            id: "vendor-contracts",
            label: "Negotiate vendor contracts",
          },
          {
            id: "vendor-performance-evaluation",
            label: "Evaluate vendor performance regularly",
          },
        ],
      },
    ],
  },
  {
    id: "financial-management",
    title: "Financial Management",
    items: [
      {
        id: "budgeting-and-expenses",
        label: "Create a budget for property expenses",
      },
      {
        id: "tax-record-keeping",
        label: "Maintain accurate tax records",
      },
      {
        id: "insurance-requirements",
        label: "Understand insurance requirements for properties",
      },
    ],
  },
  {
    id: "legal-compliance",
    title: "Legal Compliance",
    items: [
      {
        id: "local-laws-and-regulations",
        label: "Understand local laws and regulations",
      },
      {
        id: "fair-housing-laws",
        label: "Comply with fair housing laws",
      },
      {
        id: "property-inspections",
        label: "Conduct regular property inspections",
      },
      {
        id: "lease-agreement-compliance",
        label: "Ensure lease agreement compliance",
      },
    ],
  },
];
