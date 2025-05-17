export const pricing = {
  frequencies: [
    { value: "monthly", label: "Monthly" },
    { value: "annually", label: "Annually" },
  ],
  tiers: [
    {
      name: "Starter",
      id: "tier-starter",
      href: "#",
      featured: false,
      description: "Everything you need to get started.",
      price: { monthly: "$19", annually: "$199" },
      highlights: [
        "Custom domains",
        "Edge content delivery",
        "Advanced analytics",
      ],
    },
    {
      name: "Scale",
      id: "tier-scale",
      href: "#",
      featured: true,
      description: "Added flexibility at scale.",
      price: { monthly: "$99", annually: "$999" },
      highlights: [
        "Custom domains",
        "Edge content delivery",
        "Advanced analytics",
        "Quarterly workshops",
        "Single sign-on (SSO)",
        "Priority phone support",
      ],
    },
    {
      name: "Growth",
      id: "tier-growth",
      href: "#",
      featured: false,
      description: "All the extras for your growing team.",
      price: { monthly: "$49", annually: "$499" },
      highlights: [
        "Custom domains",
        "Edge content delivery",
        "Advanced analytics",
        "Quarterly workshops",
      ],
    },
  ],
  sections: [
    {
      name: "Features",
      features: [
        {
          name: "Edge content delivery",
          tiers: { Starter: true, Growth: true, Scale: true },
        },
        {
          name: "Custom domains",
          tiers: { Starter: "1", Growth: "3", Scale: "Unlimited" },
        },
        {
          name: "Team members",
          tiers: { Starter: "3", Growth: "20", Scale: "Unlimited" },
        },
        {
          name: "Single sign-on (SSO)",
          tiers: { Starter: false, Growth: false, Scale: true },
        },
      ],
    },
    {
      name: "Reporting",
      features: [
        {
          name: "Advanced analytics",
          tiers: { Starter: true, Growth: true, Scale: true },
        },
        {
          name: "Basic reports",
          tiers: { Starter: false, Growth: true, Scale: true },
        },
        {
          name: "Professional reports",
          tiers: { Starter: false, Growth: false, Scale: true },
        },
        {
          name: "Custom report builder",
          tiers: { Starter: false, Growth: false, Scale: true },
        },
      ],
    },
    {
      name: "Support",
      features: [
        {
          name: "24/7 online support",
          tiers: { Starter: true, Growth: true, Scale: true },
        },
        {
          name: "Quarterly workshops",
          tiers: { Starter: false, Growth: true, Scale: true },
        },
        {
          name: "Priority phone support",
          tiers: { Starter: false, Growth: false, Scale: true },
        },
        {
          name: "1:1 onboarding tour",
          tiers: { Starter: false, Growth: false, Scale: true },
        },
      ],
    },
  ],
};
