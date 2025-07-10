"use client";

import ResourceCard from "@/components/cards/ResourceCard";
import { useCalculatorContext } from "@/context/calculatorContext";
import { capitalize } from "@/lib/utils/format";
import { sortByProperty } from "@/lib/utils/sort";

export default function Calculator() {
  const { calculatorType, correspondingCalculators, calculatorCategory } =
    useCalculatorContext();

  if (!calculatorType || !correspondingCalculators) {
    return (
      <div className="mt-8 md:mt-12 mx-auto h-full w-10/12 md:w-11/12">
        <h1>Calculator Not Found</h1>
        <p>Please select a valid calculator type from the list.</p>
      </div>
    );
  }

  const sortedCalculators = sortByProperty(correspondingCalculators, "title");

  return (
    <div className="mt-8 md:mt-12 mx-auto h-full w-10/12 md:w-11/12">
      <h1>{capitalize(calculatorType)}</h1>
      <p>{calculatorCategory?.introduction}</p>
      <p>{calculatorCategory?.description}</p>

      <section>
        {correspondingCalculators && (
          <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6">
            {sortedCalculators.map((calculator, index) => (
              <ResourceCard
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
