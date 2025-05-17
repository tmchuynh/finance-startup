import { ChecklistCategory } from "@/lib/interfaces";

export const TAX_CHECKLIST: ChecklistCategory[] = [
  {
    id: "income",
    title: "Income Documents",
    items: [
      { id: "w2", label: "W-2 forms from employers" },
      { id: "1099", label: "1099 forms (contractor, freelance)" },
      {
        id: "investment",
        label: "Investment income statements (1099-DIV, 1099-INT)",
      },
      { id: "rental", label: "Rental property income documentation" },
      { id: "socialsecurity", label: "Social Security benefits statements" },
    ],
  },
  {
    id: "deductions",
    title: "Deductions",
    items: [
      { id: "mortgage", label: "Mortgage interest statements (Form 1098)" },
      { id: "charitable", label: "Charitable donation receipts" },
      { id: "medical", label: "Medical expenses documentation" },
      { id: "education", label: "Education expenses (Form 1098-T)" },
      { id: "business", label: "Business expenses records" },
    ],
  },
  {
    id: "credits",
    title: "Tax Credits",
    items: [
      { id: "childcare", label: "Childcare expenses" },
      { id: "energy", label: "Energy-efficient home improvement receipts" },
      { id: "educationcredit", label: "Education credits documentation" },
      { id: "retirement", label: "Retirement savings contributions" },
    ],
  },
];
