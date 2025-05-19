import { ChecklistCategory } from "@/lib/interfaces";

export const marketingStrategy: ChecklistCategory[] = [
  {
    id: "develop-marketing-plan",
    title: "Develop a Marketing Plan",
    items: [
      {
        id: "define-target-market",
        label: "Define target market and audience",
      },
      {
        id: "set-marketing-goals",
        label: "Set marketing goals and objectives",
      },
      {
        id: "identify-marketing-channels",
        label: "Identify marketing channels (e.g., social media, email, etc.)",
      },
      {
        id: "create-marketing-budget",
        label: "Create a marketing budget",
      },
    ],
  },
  {
    id: "branding-strategy",
    title: "Branding Strategy",
    items: [
      {
        id: "develop-brand-identity",
        label: "Develop brand identity (logo, colors, etc.)",
      },
      {
        id: "create-brand-guidelines",
        label: "Create brand guidelines for consistency",
      },
      {
        id: "develop-brand-message",
        label: "Develop brand message and voice",
      },
      {
        id: "conduct-competitor-analysis",
        label: "Conduct competitor analysis for branding insights",
      },
    ],
  },
  {
    id: "digital-marketing-strategy",
    title: "Digital Marketing Strategy",
    items: [
      {
        id: "optimize-website-for-seo",
        label: "Optimize website for SEO (Search Engine Optimization)",
      },
      {
        id: "create-content-marketing-plan",
        label: "Create a content marketing plan (blogs, videos, etc.)",
      },
      {
        id: "implement-social-media-strategy",
        label: "Implement social media strategy and schedule posts",
      },
    ],
  },
];
