export const pricing = {
  frequencies: [
    { value: "monthly", label: "Monthly" },
    { value: "annually", label: "Annually (Save 20%)" },
  ],
  tiers: [
    {
      name: "Free",
      id: "tier-free",
      href: "#",
      featured: false,
      description: "Everything you need to get started.",
      priceMonthly: 0,

      highlights: [
        { description: "Custom domains" },
        { description: "Edge content delivery" },
        { description: "Advanced analytics" },
        { description: "Quarterly workshops", disabled: true },
        { description: "Single sign-on (SSO)", disabled: true },
        { description: "Priority phone support", disabled: true },
      ],
    },
    {
      name: "Personal",
      id: "tier-personal",
      href: "#",
      featured: true,
      description: "Added flexibility at personal.",
      priceMonthly: 19,
      highlights: [
        { description: "Custom domains" },
        { description: "Edge content delivery" },
        { description: "Advanced analytics" },
        { description: "Quarterly workshops" },
        { description: "Single sign-on (SSO)", disabled: true },
        { description: "Priority phone support", disabled: true },
      ],
    },
    {
      name: "Starter",
      id: "tier-starter",
      href: "#",
      featured: false,
      description: "All the extras for your growing team.",
      priceMonthly: 59,
      highlights: [
        { description: "Custom domains" },
        { description: "Edge content delivery" },
        { description: "Advanced analytics" },
        { description: "Quarterly workshops" },
        { description: "Single sign-on (SSO)" },
        { description: "Priority phone support" },
      ],
    },
    {
      name: "Business",
      id: "tier-business",
      href: "#",
      featured: false,
      description: "All the extras for your growing team.",
      priceMonthly: 99,
      highlights: [
        { description: "Custom domains" },
        { description: "Edge content delivery" },
        { description: "Advanced analytics" },
        { description: "Quarterly workshops" },
        { description: "Single sign-on (SSO)" },
        { description: "Priority phone support" },
      ],
    },
  ],
  sections: [
    {
      name: "Features",
      features: [
        {
          name: "Edge content delivery",
          tiers: { Free: true, Starter: true, Personal: true, Business: true },
        },
        {
          name: "Custom domains",
          tiers: {
            Free: "1",
            Starter: "3",
            Personal: "Unlimited",
            Business: "Unlimited",
          },
        },
        {
          name: "Team members",
          tiers: {
            Free: "3",
            Starter: "20",
            Personal: "Unlimited",
            Business: "Unlimited",
          },
        },
        {
          name: "Single sign-on (SSO)",
          tiers: {
            Free: false,
            Starter: false,
            Personal: true,
            Business: true,
          },
        },
      ],
    },
    {
      name: "Reporting",
      features: [
        {
          name: "Advanced analytics",
          tiers: { Free: true, Starter: true, Personal: true, Business: true },
        },
        {
          name: "Basic reports",
          tiers: { Free: false, Starter: true, Personal: true, Business: true },
        },
        {
          name: "Professional reports",
          tiers: {
            Free: false,
            Starter: false,
            Personal: true,
            Business: true,
          },
        },
        {
          name: "Custom report builder",
          tiers: {
            Free: false,
            Starter: false,
            Personal: true,
            Business: true,
          },
        },
      ],
    },
    {
      name: "Support",
      features: [
        {
          name: "24/7 online support",
          tiers: { Free: true, Starter: true, Personal: true, Business: true },
        },
        {
          name: "Quarterly workshops",
          tiers: { Free: false, Starter: true, Personal: true, Business: true },
        },
        {
          name: "Priority phone support",
          tiers: {
            Free: false,
            Starter: false,
            Personal: true,
            Business: true,
          },
        },
        {
          name: "1:1 onboarding tour",
          tiers: {
            Free: false,
            Starter: false,
            Personal: true,
            Business: true,
          },
        },
      ],
    },
  ],
};
