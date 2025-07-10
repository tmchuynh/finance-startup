"use client";
import { formatTitleToKebabCase } from "@/lib/utils/format";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";

export default function ResourceCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <Card className="flex flex-col justify-between h-full">
      <div>
        <CardHeader>
          <h3
            className="underline-offset-2 hover:underline cursor-pointer"
            onClick={() =>
              router.push(`${pathname}/${formatTitleToKebabCase(title)}`)
            }
          >
            {title}
          </h3>
        </CardHeader>
        <CardContent>
          <p>{description}</p>
        </CardContent>
      </div>
      <CardFooter>
        <Button
          onClick={() =>
            router.push(`${pathname}/${formatTitleToKebabCase(title)}`)
          }
          className="w-full"
        >
          Explore Resource
        </Button>
      </CardFooter>
    </Card>
  );
}
