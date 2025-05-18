"use client";

import { Category, ListDetails } from "@/lib/interfaces";
import { createContext, ReactNode, useContext } from "react";

export interface ChecklistContextType {
  checklistName: string;
  checklistCategory: Category | undefined;
  correspondingChecklists?: ListDetails[];
}

export const ChecklistContext = createContext<ChecklistContextType | null>(
  null
);

export const ChecklistProvider = ({
  children,
  value,
}: {
  children: ReactNode;
  value: ChecklistContextType;
}) => {
  return (
    <ChecklistContext.Provider value={value}>
      {children}
    </ChecklistContext.Provider>
  );
};

export const useChecklistContext = () => {
  const context = useContext(ChecklistContext);
  if (!context) {
    throw new Error(
      "useChecklistContext must be used within a ChecklistProvider"
    );
  }
  return context;
};
