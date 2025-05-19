import { InformationCircleIcon } from "@heroicons/react/20/solid";
import { BriefcaseIcon } from "lucide-react";
import { AiOutlineStock } from "react-icons/ai";
import { BsChatQuoteFill } from "react-icons/bs";
import {
  FaBitcoin,
  FaCalculator,
  FaCheckDouble,
  FaHouseDamage,
  FaPiggyBank,
  FaQuestionCircle,
  FaUserCheck,
} from "react-icons/fa";
import { FaHandshakeAngle, FaPeopleGroup } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";
import { MdOutlineAttachMoney } from "react-icons/md";

export const essentials = [
  {
    name: "Finance Calculators",
    href: "/finance-calculators",
    icon: FaCalculator,
  },
  {
    name: "Finance Checklists",
    href: "/finance-checklists",
    icon: FaCheckDouble,
  },
  {
    name: "Financial Decision Tools",
    href: "/financial-decision-tools",
    icon: FaUserCheck,
  },
];

export const simulators = [
  {
    name: "Stock Market Simulator",
    href: "/learning-simulators/stock-market-simulator",
    icon: AiOutlineStock,
  },
  {
    name: "Crypto Trading Simulator",
    href: "/learning-simulators/crypto-trading-simulator",
    icon: FaBitcoin,
  },
  {
    name: "Real Estate Simulator",
    href: "/learning-simulators/real-estate-simulator",
    icon: FaHouseDamage,
  },
  {
    name: "Compound Interest Visualizer",
    href: "/learning-simulators/compound-interest-visualizer",
    icon: FaPiggyBank,
  },
];

export const pricing = [
  { name: "Membership", href: "/pricing", icon: MdOutlineAttachMoney },
  { name: "Testimonials", href: "/testimonials", icon: BsChatQuoteFill },
];

export const contact = [
  {
    name: "Frequently Asked Questions",
    href: "/frequently-asked-questions",
    icon: FaQuestionCircle,
  },
  { name: "Careers at Fiscora", href: "/careers", icon: BriefcaseIcon },
  { name: "Contact Us", href: "/contact-us", icon: IoIosMail },
];

export const company = [
  { name: "About Fiscora", href: "/about-us", icon: InformationCircleIcon },
  { name: "Our Team", href: "/about-us/our-team", icon: FaPeopleGroup },
  {
    name: "Our Financial Partners",
    href: "/about-us/our-partners",
    icon: FaHandshakeAngle,
  },
];
