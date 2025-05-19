import {
  GlobeAltIcon,
  InformationCircleIcon,
  UserGroupIcon,
} from "@heroicons/react/20/solid";
import {
  BookOpenIcon,
  BriefcaseIcon,
  NewspaperIcon,
  ShieldCheckIcon,
  UsersIcon,
} from "lucide-react";

export const essentials = [
  {
    name: "Finance Calculators",
    href: "/finance-calculators",
    icon: InformationCircleIcon,
  },
  { name: "Finance Articles", href: "/finance-articles", icon: UsersIcon },
  {
    name: "Finance Checklists",
    href: "/finance-checklists",
    icon: NewspaperIcon,
  },
];

export const simulators = [
  {
    name: "Overview",
    href: "/learning-simulators",
    icon: ShieldCheckIcon,
  },
  {
    name: "Stock Market Simulator",
    href: "/learning-simulators/stock-market-simulator",
    icon: ShieldCheckIcon,
  },
  {
    name: "Crypto Trading Simulator",
    href: "/learning-simulators/crypto-trading-simulator",
    icon: ShieldCheckIcon,
  },
  {
    name: "Real Estate Simulator",
    href: "/learning-simulators/real-estate-simulator",
    icon: ShieldCheckIcon,
  },
  {
    name: "Compound Interest Visualizer",
    href: "/learning-simulators/compound-interest-visualizer",
    icon: ShieldCheckIcon,
  },
];

export const comparisons = [
  {
    name: "Financial Decision Tools",
    href: "/financial-decision-tools",
    icon: BriefcaseIcon,
  },
  { name: "Guides", href: "/helpful-guides", icon: BookOpenIcon },
];

export const pricing = [
  { name: "Pricing", href: "/pricing", icon: UserGroupIcon },
  { name: "Testimonials", href: "/testimonials", icon: NewspaperIcon },
];

export const contact = [
  {
    name: "Frequently Asked Questions",
    href: "/frequently-asked-questions",
    icon: GlobeAltIcon,
  },
  { name: "Contact Us", href: "/contact-us", icon: GlobeAltIcon },
];

export const company = [
  { name: "About", href: "/about-us", icon: InformationCircleIcon },
  { name: "Our Team", href: "/about-us/our-team", icon: ShieldCheckIcon },
  { name: "Careers", href: "/careers", icon: BriefcaseIcon },
  { name: "Partners", href: "/about-us/our-partners", icon: GlobeAltIcon },
];
