"use client";

import { useCalculatorContext } from "@/context/calculatorContext";

export default function BusinessCalculator() {
  const { calculatorType, calculatorName, correspondingCalculators } =
    useCalculatorContext();

  console.log("calculatorType", calculatorType);
  console.log("calculatorName", calculatorName);
  console.log("correspondingCalculators", correspondingCalculators);
  return (
    <div className="flex flex-col justify-center items-center mx-auto w-11/12 h-full">
      <h1 className="font-bold text-2xl">Business Calculators</h1>
      <p>Welcome to the Business Calculators!</p>
    </div>
  );
}
