export default function CalculatorCategoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <div className="p-4 w-full max-w-2xl">{children}</div>
    </div>
  );
}
