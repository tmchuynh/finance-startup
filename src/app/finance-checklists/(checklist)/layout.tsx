"use client";

import { ChecklistProvider } from "@/context/checklistContext";
import { checklistCategories } from "@/lib/constants/checklists/categories";
import { usePathname } from "next/navigation";

export default function ChecklistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const segments = usePathname().split("/");
  const checklistType = segments[segments.length - 1];
  const checklistName = segments[segments.length - 2];

  const correspondingChecklists = checklistCategories.find(
    (category) => category.id === checklistType
  )?.list;

  const checklistCategory = checklistCategories.find(
    (category) => category.id === checklistType
  );

  return (
    <ChecklistProvider
      value={{
        checklistName,
        checklistCategory,
        correspondingChecklists,
      }}
    >
      <div className="flex flex-col justify-center items-center h-full">
        {children}
      </div>
    </ChecklistProvider>
  );
}
