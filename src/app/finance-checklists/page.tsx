"use client";

import { checklistCategories } from "@/lib/constants/checklists/categories";
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
  return (
    <div className="flex flex-col justify-center items-center mx-auto mt-10 w-10/12 md:w-11/12">
      <h1 className="font-bold text-2xl">Finance Checklists</h1>
      <p>Welcome to the Finance Checklists page!</p>

      <div className="space-y-6">
        {checklists.map((category) => (
          <div key={category.id}>
            <h2
              className="font-bold text-xl underline-offset-2 hover:underline cursor-pointer"
              onClick={() => router.push(`/finance-checklists/${category.id}`)}
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
