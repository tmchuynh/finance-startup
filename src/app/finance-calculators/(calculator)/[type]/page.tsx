"use client";

import CalculatorCard from "@/components/cards/CalculatorCard";
import { useCalculatorContext } from "@/context/calculatorContext";
import { capitalize } from "@/lib/utils/format";

export default function Calculator() {
  const { calculatorType, correspondingCalculators, calculatorCategory } =
    useCalculatorContext();

  return (
    <div className="mx-auto mt-8 md:mt-12 w-10/12 md:w-11/12 h-full">
      <h1>{capitalize(calculatorType)}</h1>
      <p>{calculatorCategory?.introduction}</p>
      <p>{calculatorCategory?.description}</p>

      <section>
        {correspondingCalculators && (
          <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6">
            {correspondingCalculators.map((calculator, index) => (
              <CalculatorCard
                key={index}
                title={calculator.title}
                description={calculator.description}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
