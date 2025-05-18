"use client";

import CalculatorCard from "@/components/cards/CalculatorCard";
import { useChecklistContext } from "@/context/checklistContext";
import { capitalize } from "@/lib/utils/format";

export default function BusinessCalculator() {
  const { checklistName, checklistCategory, correspondingChecklists } =
    useChecklistContext();

  console.log("correspondingChecklists", correspondingChecklists);

  return (
    <div className="mx-auto mt-8 md:mt-12 w-11/12 h-full">
      <h1>{capitalize(checklistName)}</h1>
      <p>{checklistCategory?.introduction}</p>
      <p>{checklistCategory?.description}</p>

      <section>
        {correspondingChecklists && (
          <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6">
            {correspondingChecklists.map((calculator, index) => (
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
