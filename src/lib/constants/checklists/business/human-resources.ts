import { ChecklistCategory } from "@/lib/interfaces";

export const humanResources: ChecklistCategory[] = [
  {
    id: "recruitment",
    title: "Recruitment",
    items: [
      {
        id: "job-descriptions",
        label: "Create job descriptions",
      },
      {
        id: "post-job-openings",
        label: "Post job openings",
      },
      {
        id: "screen-resumes",
        label: "Screen resumes",
      },
      {
        id: "conduct-interviews",
        label: "Conduct interviews",
      },
      {
        id: "check-references",
        label: "Check references",
      },
      {
        id: "make-job-offers",
        label: "Make job offers",
      },
      {
        id: "negotiate-salaries",
        label: "Negotiate salaries and benefits",
      },
    ],
  },
  {
    id: "onboarding",
    title: "Onboarding",
    items: [
      {
        id: "prepare-onboarding-materials",
        label: "Prepare onboarding materials",
      },
      {
        id: "assign-mentors-or-buddies",
        label: "Assign mentors or buddies",
      },
      {
        id: "conduct-orientation-sessions",
        label: "Conduct orientation sessions",
      },
      {
        id: "set-up-workstations",
        label: "Set up workstations and access",
      },
      {
        id: "introduce-team-members",
        label: "Introduce team members",
      },
    ],
  },
  {
    id: "performance-management",
    title: "Performance Management",
    items: [
      {
        id: "set-performance-goals",
        label: "Set performance goals and expectations",
      },
      {
        id: "conduct-performance-reviews",
        label: "Conduct performance reviews and feedback sessions",
      },
      {
        id: "provide-training-and-development",
        label: "Provide training and development opportunities",
      },
      {
        id: "address-performance-issues",
        label: "Address performance issues and provide support",
      },
    ],
  },
];
