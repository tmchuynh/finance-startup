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
            label: "Research Sole Proprietorship",
          },
          {
            id: "business-structure-partnership",
            label: "Research Partnership",
          },
          {
            id: "business-structure-corporation",
            label: "Research Corporation",
          },
          {
            id: "business-structure-limited-liability-company",
            label: "Research Limited Liability Company (LLC)",
          },
        ],
      },
      {
        id: "business-insurance",
        label: "Get Business Insurance",
        items: [
          {
            id: "business-insurance-research",
            label: "Research Types of Business Insurance",
          },
          {
            id: "business-insurance-compare",
            label: "Compare Insurance Providers",
          },
          {
            id: "business-insurance-purchase",
            label: "Purchase Insurance Policy",
          },
          {
            id: "business-insurance-review",
            label: "Review and Update Insurance Annually",
          },
        ],
      },
      {
        id: "business-name-registration",
        label: "Register Your Business Name",
        items: [
          {
            id: "business-name-registration-check-availability",
            label: "Check Name Availability",
          },
          {
            id: "employer-identification-number",
            label: "Apply for an Employer Identification Number (EIN)",
          },
          {
            id: "business-name-registration-domain",
            label: "Register a Domain Name",
          },
        ],
      },
      {
        id: "business-licenses-permits",
        label: "Obtain Necessary Licenses and Permits",
        items: [
          {
            id: "business-licenses-permits-research",
            label: "Research Required Licenses and Permits",
          },
          {
            id: "business-name-registration-file-forms",
            label: "File Necessary Forms",
          },
          {
            id: "business-licenses-permits-apply",
            label: "Apply for Licenses and Permits",
          },
          {
            id: "business-name-registration-trademark",
            label: "Consider Trademark Registration",
          },
        ],
      },
      {
        id: "business-bank-account",
        label: "Open a Business Bank Account",
        items: [
          {
            id: "business-bank-account-research",
            label: "Research Business Bank Accounts",
          },
          {
            id: "business-bank-account-compare",
            label: "Compare Fees and Features",
          },
          {
            id: "business-bank-account-open",
            label: "Open the Account",
          },
        ],
      },
      {
        id: "business-backstory-mission-vision",
        label: "Define Your Business Backstory, Mission, and Vision",
        items: [
          {
            id: "business-name-registration-website",
            label: "Build a Website",
          },
          {
            id: "create-a-logo",
            label: "Create a Logo",
          },
          {
            id: "create-a-slogan",
            label: "Create a Slogan",
          },
          {
            id: "business-name-registration-branding",
            label: "Develop Branding (Logo, Colors, etc.)",
          },
          {
            id: "business-backstory-mission-vision-backstory",
            label: "Write Your Business Backstory",
          },
          {
            id: "business-backstory-mission-vision-mission",
            label: "Define Your Mission Statement",
          },
          {
            id: "business-backstory-mission-vision-vision",
            label: "Create Your Vision Statement",
          },
        ],
      },
      {
        id: "establish-physical-or-online-presence",
        label: "Establish a Physical or Online Presence",
        items: [
          {
            id: "business-name-registration-social-media",
            label: "Create Social Media Accounts",
          },

          {
            id: "create-a-business-email",
            label: "Create a Business Email Address",
          },
          {
            id: "business-name-registration-google-business",
            label: "Set Up Google My Business",
          },
          {
            id: "business-name-registration-business-cards",
            label: "Design Business Cards and Marketing Materials",
          },
          {
            id: "business-name-registration-office-space",
            label: "Secure Office Space (if applicable)",
          },
          {
            id: "business-name-registration-virtual-office",
            label: "Consider a Virtual Office (if applicable)",
          },
        ],
      },

      {
        id: "accounting-system",
        label: "Set Up an Accounting System",
        items: [
          {
            id: "accounting-system-software",
            label: "Choose Accounting Software",
          },
          {
            id: "accounting-system-set-up",
            label: "Set Up Your Accounting System",
          },
          {
            id: "accounting-system-bookkeeping",
            label: "Establish a Bookkeeping System",
          },
          {
            id: "accounting-system-hire-accountant",
            label: "Consider Hiring an Accountant",
          },
        ],
      },
      {
        id: "business-marketing-strategy",
        label: "Develop a Marketing Strategy",
        items: [
          {
            id: "business-marketing-strategy-research",
            label: "Research Your Target Audience",
          },
          {
            id: "business-marketing-strategy-choose-channels",
            label: "Choose Marketing Channels",
          },
          {
            id: "business-marketing-strategy-create-content",
            label: "Create Marketing Content",
          },
          {
            id: "business-marketing-strategy-launch-campaigns",
            label: "Launch Marketing Campaigns",
          },
        ],
      },
      {
        id: "business-networking",
        label: "Network and Build Relationships",
        items: [
          {
            id: "business-networking-join-groups",
            label: "Join Professional Groups and Associations",
          },
          {
            id: "business-networking-attend-events",
            label: "Attend Networking Events",
          },
          {
            id: "business-networking-connect-online",
            label: "Connect with Others Online (LinkedIn, etc.)",
          },
        ],
      },
      {
        id: "plan-for-hiring",
        label: "Plan for Hiring Employees",
        items: [
          {
            id: "plan-for-hiring-research",
            label: "Research Hiring Needs",
          },
          {
            id: "plan-for-hiring-create-job-descriptions",
            label: "Create Job Descriptions",
          },
          {
            id: "plan-for-hiring-post-jobs",
            label: "Post Job Openings",
          },
          {
            id: "plan-for-hiring-interview-candidates",
            label: "Interview Candidates",
          },
        ],
      },
      {
        id: "business-launch",
        label: "Launch Your Business",
        items: [
          {
            id: "business-launch-plan",
            label: "Finalize Your Business Plan",
          },
          {
            id: "business-launch-prepare",
            label: "Prepare for Launch",
          },
          {
            id: "business-launch-launch",
            label: "Officially Launch Your Business",
          },
        ],
      },
    ],
  },
];
