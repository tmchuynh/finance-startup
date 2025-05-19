import { ChecklistCategory } from "@/lib/interfaces";

export const businessOperations: ChecklistCategory[] = [
  {
    id: "management",
    title: "Management",
    items: [
      {
        id: "management-structure",
        label: "Define the management structure of the business.",
      },
      {
        id: "management-team",
        label: "Identify key management team members and their roles.",
      },
      {
        id: "management-processes",
        label: "Establish management processes and procedures.",
      },
      {
        id: "management-communication",
        label:
          "Implement effective communication channels within the management team.",
      },
      {
        id: "management-training",
        label: "Provide training and development for management team members.",
      },
      {
        id: "management-performance",
        label: "Set performance metrics for the management team.",
      },
      {
        id: "management-evaluation",
        label: "Conduct regular evaluations of management performance.",
      },
    ],
  },
  {
    id: "training",
    title: "Training",
    items: [
      {
        id: "training-needs-assessment",
        label: "Conduct a training needs assessment for employees.",
      },
      {
        id: "training-program-development",
        label: "Develop training programs based on the assessment.",
      },
      {
        id: "training-delivery-methods",
        label:
          "Choose appropriate delivery methods for training (e.g., in-person, online).",
      },
      {
        id: "training-schedule",
        label: "Create a training schedule for employees.",
      },
      {
        id: "training-evaluation",
        label: "Evaluate the effectiveness of training programs.",
      },
    ],
  },
  {
    id: "safety",
    title: "Safety and Compliance",
    items: [
      {
        id: "safety-policies",
        label: "Develop safety policies and procedures for the workplace.",
      },
      {
        id: "safety-training",
        label: "Provide safety training for employees.",
      },
      {
        id: "safety-audits",
        label: "Conduct regular safety audits and inspections.",
      },
      {
        id: "safety-reporting",
        label: "Establish a system for reporting safety incidents.",
      },
      {
        id: "safety-compliance",
        label:
          "Ensure compliance with local, state, and federal safety regulations.",
      },
    ],
  },
];
