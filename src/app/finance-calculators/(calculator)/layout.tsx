"use client";

import { CalculatorProvider } from "@/context/calculatorContext";
import { financeCalculatorCategories } from "@/lib/constants/calculators/categories";
import { usePathname } from "next/navigation";

export default function CalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const segments = usePathname().split("/");
  const calculatorType = segments[segments.length - 1];
  const calculatorName = segments[segments.length - 2];

  const correspondingCalculators = financeCalculatorCategories.find(
    (category) => category.id === calculatorType
  )?.list;

  return (
    <CalculatorProvider
      value={{ calculatorType, calculatorName, correspondingCalculators }}
    >
      <div className="flex flex-col justify-center items-center h-full">
        {children}
      </div>
    </CalculatorProvider>
  );
}
