import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface ChecklistItem {
  id: string;
  Label: string;
}

interface ChecklistCategory {
  id: string;
  title: string;
  items: ChecklistItem[];
}

const TAX_CHECKLIST: ChecklistCategory[] = [
  {
    id: "income",
    title: "Income Documents",
    items: [
      { id: "w2", Label: "W-2 forms from employers" },
      { id: "1099", Label: "1099 forms (contractor, freelance)" },
      {
        id: "investment",
        Label: "Investment income statements (1099-DIV, 1099-INT)",
      },
      { id: "rental", Label: "Rental property income documentation" },
      { id: "socialsecurity", Label: "Social Security benefits statements" },
    ],
  },
  {
    id: "deductions",
    title: "Deductions",
    items: [
      { id: "mortgage", Label: "Mortgage interest statements (Form 1098)" },
      { id: "charitable", Label: "Charitable donation receipts" },
      { id: "medical", Label: "Medical expenses documentation" },
      { id: "education", Label: "Education expenses (Form 1098-T)" },
      { id: "business", Label: "Business expenses records" },
    ],
  },
  {
    id: "credits",
    title: "Tax Credits",
    items: [
      { id: "childcare", Label: "Childcare expenses" },
      { id: "energy", Label: "Energy-efficient home improvement receipts" },
      { id: "educationcredit", Label: "Education credits documentation" },
      { id: "retirement", Label: "Retirement savings contributions" },
    ],
  },
];

export default function AnnualTaxChecklist() {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const toggleItem = (id: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Count checked items per category
  const categoryCheckedCounts = TAX_CHECKLIST.map((category) => {
    const checkedCount = category.items.reduce(
      (count, item) => (checkedItems[item.id] ? count + 1 : count),
      0
    );
    return { id: category.id, checkedCount, total: category.items.length };
  });

  const totalChecked = Object.values(checkedItems).filter(Boolean).length;
  const totalItems = TAX_CHECKLIST.reduce((sum, c) => sum + c.items.length, 0);

  return (
    <div className="bg-white shadow mx-auto p-6 rounded max-w-4xl">
      <h1 className="mb-6 font-bold text-3xl">Annual Tax Checklist</h1>

      <p className="mb-6 text-gray-700">
        Use this interactive checklist to track your tax document preparation.
        Check items as you gather them.
      </p>

      {TAX_CHECKLIST.map((category) => {
        const counts = categoryCheckedCounts.find((c) => c.id === category.id);
        return (
          <section key={category.id} className="mb-8">
            <header className="flex justify-between items-center mb-3">
              <h2 className="font-semibold text-xl">{category.title}</h2>
              <span className="text-gray-600 text-sm">
                {counts?.checkedCount} / {counts?.total} completed
              </span>
            </header>
            <ul className="space-y-2">
              {category.items.map((item) => (
                <li key={item.id}>
                  <Label
                    htmlFor={item.id}
                    className="inline-flex items-center cursor-pointer select-none"
                  >
                    <Input
                      type="checkbox"
                      id={item.id}
                      checked={!!checkedItems[item.id]}
                      onChange={() => toggleItem(item.id)}
                      className="w-5 h-5 text-blue-600 form-checkbox"
                    />
                    <span className="ml-3 text-gray-900">{item.Label}</span>
                  </Label>
                </li>
              ))}
            </ul>
          </section>
        );
      })}

      <footer className="flex justify-between mt-8 pt-4 border-t font-semibold text-gray-700">
        <span>
          Total items completed: {totalChecked} / {totalItems}
        </span>
        <button
          type="button"
          onClick={() => setCheckedItems({})}
          className="rounded focus:ring-2 focus:ring-red-500 text-red-600 text-sm hover:text-red-800 focus:outline-none"
          aria-label="Clear all selections"
        >
          Clear All
        </button>
      </footer>
    </div>
  );
}
