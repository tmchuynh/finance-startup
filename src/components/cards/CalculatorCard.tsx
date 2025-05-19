"use client";
import { usePathname, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader } from "../ui/card";

export default function CalculatorCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const formatTitle = (title: string) => {
    return title.toLowerCase().replaceAll(",", "").replaceAll(/\s+/g, "-");
  };
  return (
    <Card>
      <CardHeader>
        <h4
          className="underline-offset-2 hover:underline cursor-pointer"
          onClick={() => router.push(`${pathname}/${formatTitle(title)}`)}
        >
          {title}
        </h4>
      </CardHeader>
      <CardContent>
        <p>{description}</p>
      </CardContent>
    </Card>
  );
}
