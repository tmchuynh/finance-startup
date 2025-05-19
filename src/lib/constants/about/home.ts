import {
  ArrowPathIcon,
  CloudArrowUpIcon,
  FingerPrintIcon,
  LockClosedIcon,
} from "@heroicons/react/20/solid";

export const features = [
  {
    name: "Advanced Financial Calculators",
    description: [
      {
        title: "Tailored for Real Life",
        description:
          "From complex business projections to simple savings goals, each calculator is crafted to solve real-world financial problems.",
      },
      {
        title: "Dynamic Inputs & Outputs",
        description:
          "Adjust variables on the fly and watch results update instantly with visualized insights.",
      },
      {
        title: "Use-Case Specific",
        description:
          "Business, real estate, investment, retirement, tax, insurance, savings, and debt calculators – each fine-tuned for its domain.",
      },
    ],
    icon: CloudArrowUpIcon,
  },
  {
    name: "Interactive Financial Checklists",
    description: [
      {
        title: "Step-by-Step Guidance",
        description:
          "Ensure every critical step is covered, from starting a business to preparing for retirement.",
      },
      {
        title: "Pre-built & Customizable",
        description: "Start with expert-designed templates or create your own.",
      },
      {
        title: "Track Progress in Real Time",
        description: "Save, edit, and revisit your checklists across sessions.",
      },
    ],
    icon: LockClosedIcon,
  },
  {
    name: "Smart Decision Tools",
    description: [
      {
        title: "Head-to-Head Comparisons",
        description:
          "IRA vs Roth, renting vs buying, leasing vs owning, and more.",
      },
      {
        title: "Context-Aware Insights",
        description: "Personalized suggestions based on your inputs and goals.",
      },
      {
        title: "Education First",
        description:
          "Every comparison includes explanations to help you learn while you decide.",
      },
    ],
    icon: ArrowPathIcon,
  },
  {
    name: "Financial Simulators",
    description: [
      {
        title: "Stock Market Simulator",
        description:
          "Practice trades in a risk-free environment with live market data.",
      },
      {
        title: "Compound Interest Visualizer",
        description:
          "See how savings grow with time, interest rate, and contributions.",
      },
      {
        title: "Scenario Modeling",
        description:
          "Simulate financial outcomes based on multiple decision paths.",
      },
    ],
    icon: FingerPrintIcon,
  },
];
