import { Card } from "../ui/card";

export default function ArticleCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <Card className="flex flex-col justify-center items-center w-full h-full">
      <div className="p-4 w-full max-w-2xl">
        <h2 className="font-bold text-xl">{title}</h2>
        <p>{description}</p>
      </div>
    </Card>
  );
}
