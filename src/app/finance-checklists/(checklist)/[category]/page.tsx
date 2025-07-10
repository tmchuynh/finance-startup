"use client";

import ResourceCard from "@/components/cards/ResourceCard";
import { useChecklistContext } from "@/context/checklistContext";
import { capitalize } from "@/lib/utils/format";
import { sortByProperty } from "@/lib/utils/sort";

export default function BusinessCalculator() {
  const { checklistName, checklistCategory, correspondingChecklists } =
    useChecklistContext();

  return (
    <div className="mt-8 md:mt-12 mx-auto h-full w-10/12 md:w-11/12">
      <h1>{capitalize(checklistName)}</h1>
      <p>{checklistCategory?.introduction}</p>
      <p>{checklistCategory?.description}</p>

      <section>
        {correspondingChecklists && (
          <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6">
            {sortByProperty(correspondingChecklists, "title").map(
              (calculator, index) => (
                <ResourceCard
                  key={index}
                  title={calculator.title}
                  description={calculator.description}
                />
              )
            )}
          </div>
        )}
      </section>
    </div>
  );
}
