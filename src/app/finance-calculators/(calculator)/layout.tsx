export default function CalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col justify-center items-center mx-auto w-11/12 h-full">
      {children}
    </div>
  );
}
