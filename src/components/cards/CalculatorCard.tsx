"use client";
import { Card } from "../ui/card";

export default function CalculatorCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="flex flex-col justify-center items-center w-full h-full">
      <div className="p-4 w-full max-w-2xl">
        <h2 className="font-bold text-xl">{title}</h2>
        <p>{description}</p>
        {children}
      </div>
    </Card>
  );
}
