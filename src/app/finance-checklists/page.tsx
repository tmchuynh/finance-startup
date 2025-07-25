"use client";

import { Button } from "@/components/ui/button";
import { checklistCategories } from "@/lib/constants/checklists/categories";
import { sortByProperty } from "@/lib/utils/sort";
import { useRouter } from "next/navigation";

export default function FinanceChecklistsPage() {
  const router = useRouter();

  const checklists = checklistCategories.map((category) => ({
    id: category.id,
    title: category.title,
    description: category.description,
    introduction: category.introduction,
    usage: category.usage,
    list: category.list,
  }));

  const sortedChecklists = sortByProperty(checklists, "title");
  return (
    <div className="mx-auto pb-24 lg:pb-32 pt-6 sm:pt-12 lg:pt-16 w-10/12 md:w-11/12">
      <h1>Finance Checklists</h1>
      <h5>Explore our collection of finance checklists</h5>
      <p>
        Our finance checklists are designed to help you stay organized and
        ensure that you cover all the important aspects of your financial
        planning. Whether you're preparing for a major life event, managing your
        investments, or planning for retirement, our checklists provide a
        comprehensive guide to help you navigate the process. Explore our
        collection of checklists below and take control of your financial
        future!
      </p>

      <div className="space-y-6 mt-8">
        {sortedChecklists.map((category) => (
          <div key={category.id}>
            <div className="flex gap-5 items-center justify-between w-1/4">
              <h2
                className="font-bold text-xl underline-offset-2 hover:underline cursor-pointer"
                onClick={() =>
                  router.push(`/finance-checklists/${category.id}`)
                }
              >
                {category.title}
              </h2>
              <Button
                onClick={() =>
                  router.push(`/finance-checklists/${category.id}`)
                }
                className="px-4"
              >
                View All
              </Button>
            </div>
            <p>{category.description}</p>
            {category.introduction && (
              <p className="italic">{category.introduction}</p>
            )}
            {category.usage && <p>{category.usage}</p>}
            {category.list && (
              <ul className="gap-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6 pl-5 list-disc">
                {[...category.list]
                  .sort((a, b) => a.title.localeCompare(b.title))
                  .map((item) => (
                    <li
                      key={item.id}
                      className="underline-offset-2 hover:underline cursor-pointer"
                      onClick={() =>
                        router.push(
                          `/finance-checklists/${category.id}/${item.title
                            .toLowerCase()
                            .replaceAll(/\s+/g, "-")}`
                        )
                      }
                    >
                      {item.title}
                    </li>
                  ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
