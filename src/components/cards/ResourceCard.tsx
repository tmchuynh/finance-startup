"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader } from "../ui/card";

export default function ResourceCard({
  title,
  description,
  link,
}: {
  title: string;
  description?: string;
  link: string;
}) {
  const router = useRouter();
  return (
    <Card className="p-4 max-w-2xl">
      <CardHeader>
        <h2
          className="underline-offset-2 hover:underline cursor-pointer"
          onClick={() => router.push(link)}
        >
          {title}
        </h2>
      </CardHeader>
      {description && <CardContent>{description}</CardContent>}
    </Card>
  );
}
