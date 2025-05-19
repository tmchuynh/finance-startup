"use client";

import { financeCalculatorCategories } from "@/lib/constants/calculators/categories";
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
  return (
    <div className="mx-auto pt-6 sm:pt-12 lg:pt-16 pb-24 lg:pb-32 w-10/12 md:w-11/12">
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
        {financeCalculators.map((category) => (
          <div key={category.id}>
            <h2
              className="font-bold text-xl underline-offset-2 hover:underline cursor-pointer"
              onClick={() => router.push(`/finance-calculators/${category.id}`)}
            >
              {category.title}
            </h2>
            <p>{category.description}</p>
            {category.introduction && (
              <p className="italic">{category.introduction}</p>
            )}
            {category.usage && <p>{category.usage}</p>}
            {category.list && (
              <ul className="gap-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6 pl-5 list-disc">
                {category.list.map((item) => (
                  <li
                    key={item.id}
                    className="underline-offset-2 hover:underline cursor-pointer"
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
