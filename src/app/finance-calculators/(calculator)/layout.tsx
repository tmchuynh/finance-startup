"use client";

import { usePathname } from "next/navigation";

export default function CalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const segments = usePathname().split("/");
  console.log("segments", segments);
  const calculatorType = segments[segments.length - 1];
  const calculatorName = segments[segments.length - 2];
  const calculatorCategory = segments[segments.length - 3];
  console.log("calculatorType", calculatorType);
  console.log("calculatorName", calculatorName);
  console.log("calculatorCategory", calculatorCategory);
  const calculatorPath = `/${calculatorCategory}/${calculatorName}/${calculatorType}`;
  console.log("calculatorPath", calculatorPath);
  return (
    <div className="flex flex-col justify-center items-center mx-auto w-11/12 h-full">
      {children}
    </div>
  );
}
