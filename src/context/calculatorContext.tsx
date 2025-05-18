"use client";

import { ListDetails } from "@/lib/interfaces";
import { createContext, ReactNode, useContext } from "react";

export interface CalculatorContextType {
  calculatorType: string;
  calculatorName: string;
  correspondingCalculators?: ListDetails[];
}

export const CalculatorContext = createContext<CalculatorContextType | null>(
  null
);

export const CalculatorProvider = ({
  children,
  value,
}: {
  children: ReactNode;
  value: CalculatorContextType;
}) => {
  return (
    <CalculatorContext.Provider value={value}>
      {children}
    </CalculatorContext.Provider>
  );
};

export const useCalculatorContext = () => {
  const context = useContext(CalculatorContext);
  if (!context) {
    throw new Error(
      "useCalculatorContext must be used within a CalculatorProvider"
    );
  }
  return context;
};
