"use client";

import { Button } from "@/components/ui/button";
import { financeCalculatorCategories } from "@/lib/constants/calculators/categories";
import { formatTitleToKebabCase } from "@/lib/utils/format";
import { sortByProperty } from "@/lib/utils/sort";
import { useRouter } from "next/navigation";

export default function FinanceCalculatorPage() {
  const router = useRouter();
  const financeCalculators = financeCalculatorCategories.map((category) => ({
    id: category.id,
    title: category.title,
    description: category.description,
    introduction: category.introduction,
    usage: category.usage,
    list: category.list,
  }));

  const sortedFinanceCalculators = sortByProperty(financeCalculators, "title");

  return (
    <div className="mx-auto pb-24 lg:pb-32 pt-6 sm:pt-12 lg:pt-16 w-10/12 md:w-11/12">
      <h1>Finance Calculators</h1>
      <h5>Explore our collection of finance calculators</h5>
      <p>
        Our finance calculators are designed to help you make informed financial
        decisions. Whether you're looking to calculate your mortgage payments,
        determine your investment returns, or plan for retirement, our
        calculators provide accurate and easy-to-use tools to assist you.
        Explore our collection of calculators below and take control of your
        financial future!
      </p>

      <div className="space-y-6 mt-8">
        {sortedFinanceCalculators.map((category) => (
          <div key={category.id}>
            <div className="flex gap-5 items-center justify-between w-1/4">
              <h2
                className="font-bold text-xl underline-offset-2 hover:underline cursor-pointer"
                onClick={() =>
                  router.push(`/finance-calculators/${category.id}`)
                }
              >
                {category.title}
              </h2>
              <Button
                onClick={() =>
                  router.push(
                    `/finance-calculators/${formatTitleToKebabCase(
                      category.title
                    )}`
                  )
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
                      className="w-6/7 underline-offset-2 hover:underline cursor-pointer"
                      onClick={() =>
                        router.push(
                          `/finance-calculators/${category.id}/${item.title
                            .toLowerCase()
                            .replaceAll(",", "")
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
