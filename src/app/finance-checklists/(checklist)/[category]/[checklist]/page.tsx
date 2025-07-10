"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useChecklistContext } from "@/context/checklistContext";
import { checklistCategories } from "@/lib/constants/checklists/categories";
import { ChecklistCategory } from "@/lib/interfaces";
import { capitalize } from "@/lib/utils/format";
import { getChecklistInformation } from "@/lib/utils/get";
import React from "react";

import { useEffect, useState } from "react";

export default function Checklist({
  params,
}: {
  params: Promise<{ category: string; checklist: string }>;
}) {
  const { checklist } = React.use(params);

  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);

  const { checklistName, checklistCategory, correspondingChecklists } =
    useChecklistContext();
  const [checklistData, setChecklistData] = useState<ChecklistCategory[]>([]);

  const checklistInfo = checklistCategories
    .find((category: { id: string }) => category.id === checklistName)
    ?.list?.find((item) => item.id === checklist);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("correspondingChecklists", correspondingChecklists);
        console.log("checklistCategory", checklistCategory);
        console.log("checklistName", checklistName);
        console.log("checklist", checklist);
        // Await the Promise from getToolResource
        const data = await getChecklistInformation(checklistName, checklist);
        setChecklistData(data);
      } catch (error) {
        console.error("Failed to load affirmation cards:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [checklistName, checklistCategory]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }


  const toggleItem = (id: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const areAllSubItemsChecked = (item: any) => {
    if (!item.items || item.items.length === 0) return false;
    return item.items.every((subItem: any) => !!checkedItems[subItem.id]);
  };

  // Count checked items per category
  const categoryCheckedCounts = checklistData.map((category) => {
    let checkedCount = 0;
    let total = 0;
    category.items.forEach((item) => {
      if (item.items && item.items.length > 0) {
        // Only count subitems, not the parent item itself
        total += item.items.length;
        checkedCount += item.items.filter(
          (subItem: any) => !!checkedItems[subItem.id]
        ).length;
      } else {
        total += 1;
        if (checkedItems[item.id]) checkedCount += 1;
      }
    });
    return { id: category.id, checkedCount, total };
  });

  const getTotalCounts = () => {
    let checked = 0;
    let total = 0;
    checklistData.forEach((category) => {
      category.items.forEach((item) => {
        if (item.items && item.items.length > 0) {
          // Only count subitems, not the parent item itself
          total += item.items.length;
          checked += item.items.filter(
            (subItem: any) => !!checkedItems[subItem.id]
          ).length;
        } else {
          total += 1;
          if (checkedItems[item.id]) checked += 1;
        }
      });
    });
    return { checked, total };
  };

  const { checked: totalChecked, total: totalItems } = getTotalCounts();

  return (
    <div className="mt-8 md:mt-12 mx-auto h-full w-10/12 md:w-11/12">
      <h1>{capitalize(checklist)}</h1>
      <p>{checklistInfo?.description}</p>

      <p className="mb-6">{checklistCategory?.description}</p>

      {checklistData.map((category) => {
        const counts = categoryCheckedCounts.find((c) => c.id === category.id);
        return (
          <section key={category.id} className="mb-8">
            <header className="flex items-center justify-between mb-3">
              <h4>{category.title}</h4>
              <span className="text-sm">
                {counts?.checkedCount} / {counts?.total} completed
              </span>
            </header>
            <ul className="gap-2 grid lg:grid-cols-2">
              {category.items.map((item) => {
                const hasSubItems = item.items && item.items.length > 0;
                // Only show checkbox if no subitems
                const parentChecked = hasSubItems
                  ? areAllSubItemsChecked(item)
                  : !!checkedItems[item.id];
                return (
                  <li key={item.id} className="space-y-2">
                    <Label
                      htmlFor={item.id}
                      className={`inline-flex items-center cursor-pointer select-none ${
                        hasSubItems ? "-ml-3" : ""
                      }`}
                    >
                      {!hasSubItems && (
                        <Checkbox
                          id={item.id}
                          checked={parentChecked}
                          onCheckedChange={() => toggleItem(item.id)}
                          className="mr-3"
                        />
                      )}
                      <span className={hasSubItems ? "" : "ml-3"}>
                        {item.label}
                      </span>
                    </Label>

                    {hasSubItems && item.items && (
                      <ul className="mt-2 pl-5">
                        {item.items.map((subItem: any) => (
                          <li key={subItem.id} className="mt-1">
                            <Label
                              htmlFor={subItem.id}
                              className="inline-flex items-center cursor-pointer select-none"
                            >
                              <Checkbox
                                id={subItem.id}
                                checked={!!checkedItems[subItem.id]}
                                onCheckedChange={() => toggleItem(subItem.id)}
                                className="mr-3"
                              />
                              <span className="ml-3">{subItem.label}</span>
                            </Label>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}

      <footer className="flex justify-between mt-8 pt-4 border-t">
        <span>
          Total items completed: {totalChecked} / {totalItems}
        </span>
        <Button variant={"destructive"} onClick={() => setCheckedItems({})}>
          Clear All
        </Button>
      </footer>
    </div>
  );
}
