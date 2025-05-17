export default function CalculatorCategoryPage({
  params,
}: {
  params: { category: string };
}) {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <div className="p-4 w-full max-w-2xl">
        <h1 className="font-bold text-2xl">{params.category}</h1>
        <p>Welcome to the {params.category} calculators collection!</p>
      </div>
    </div>
  );
}
