import {
  GlobeAltIcon,
  InformationCircleIcon,
  UserGroupIcon,
  VideoCameraIcon,
} from "@heroicons/react/20/solid";
import {
  BookOpenIcon,
  BriefcaseIcon,
  NewspaperIcon,
  ShieldCheckIcon,
  UsersIcon,
} from "lucide-react";

export const engagement = [
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
  {
    name: "Financial Decision Tools",
    href: "/financial-decision-tools",
    icon: BriefcaseIcon,
  },
  {
    name: "Learning Simulators",
    href: "/learning-simulators",
    icon: ShieldCheckIcon,
  },
];

export const resources = [
  { name: "Pricing", href: "/pricing", icon: UserGroupIcon },
  { name: "Partners", href: "#", icon: GlobeAltIcon },
  { name: "Guides", href: "#", icon: BookOpenIcon },
  { name: "Webinars", href: "#", icon: VideoCameraIcon },
];

export const community = [
  { name: "Blog", href: "#", icon: GlobeAltIcon },
  { name: "Events", href: "#", icon: GlobeAltIcon },
  { name: "Newsletter", href: "#", icon: GlobeAltIcon },
  { name: "Forum", href: "#", icon: GlobeAltIcon },
];

export const company = [
  { name: "About", href: "#", icon: InformationCircleIcon },
  { name: "Customers", href: "#", icon: UsersIcon },
  { name: "Press", href: "#", icon: NewspaperIcon },
  { name: "Careers", href: "#", icon: BriefcaseIcon },
  { name: "Privacy", href: "#", icon: ShieldCheckIcon },
];
