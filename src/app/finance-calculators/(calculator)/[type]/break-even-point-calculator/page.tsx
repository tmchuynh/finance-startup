"use client";
import { calculateBreakEvenPoint } from "@/lib/utils/calculators/business/operations";
import { useState } from "react";

export default function BreakEvenPointCalculator() {
  const [fixedCosts, setFixedCosts] = useState<string>("");
  const [variableCostPerUnit, setVariableCostPerUnit] = useState<string>("");
  const [pricePerUnit, setPricePerUnit] = useState<string>("");
  const [result, setResult] = useState<{
    contributionMargin: number;
    breakEvenUnits: number;
    breakEvenSales: number;
    explanation: string;
  } | null>(null);

  const handleCalculate = () => {
    const fixed = parseFloat(fixedCosts);
    const variable = parseFloat(variableCostPerUnit);
    const price = parseFloat(pricePerUnit);
    if (!isNaN(fixed) && !isNaN(variable) && !isNaN(price) && price > 0) {
      const res = calculateBreakEvenPoint({
        fixedCosts: fixed,
        variableCostPerUnit: variable,
        pricePerUnit: price,
      });
      setResult(res);
    } else {
      setResult(null);
    }
  };

  return (
    <div className="mt-8 md:mt-12 mx-auto h-full w-10/12 md:w-11/12">
      <h1>Break-Even Point Calculator</h1>
      <h5>
        Estimate the number of units you need to sell to cover your fixed and
        variable costs.
      </h5>
      <p>
        Breaking even in business means covering all your costs without making a
        profit or loss. It’s a crucial point for any business, as it indicates
        the minimum sales needed to avoid losses. It is important for pricing
        strategies, sales targets, and overall financial health. Understanding
        your break-even point helps you make informed decisions about pricing,
        sales strategies, and cost management. It also allows you to communicate
        effectively with stakeholders about your business's financial health and
        growth potential.
      </p>
      <div className="mb-4">
        <p>
          <strong>What is Break-Even Point?</strong>
          <br />
          The break-even point is the level of sales at which total revenues
          equal total costs, resulting in zero profit. It helps you understand
          how much you need to sell to cover your expenses. It is a critical
          metric for assessing the financial viability of your business and
          making informed decisions about pricing, sales targets, and cost
          management.
        </p>
        <p className="mt-2">
          <strong>Formula:</strong>
          <br />
          <code>
            Break-Even Units = Fixed Costs / (Price per Unit - Variable Cost per
            Unit)
          </code>
        </p>
        <p className="mt-2">
          <strong>Why it matters:</strong>
          <br />
          Knowing your break-even point helps you set sales targets, price your
          products, and manage costs more effectively. It’s essential for
          financial planning and risk management. It is also useful for
          evaluating the impact of changes in costs or pricing on your
          profitability. This information can guide your business decisions and
          strategies.
        </p>
      </div>
      <div className="gap-4 grid md:grid-cols-3">
        <div className="mb-2">
          <label className="block mb-1 font-medium">Fixed Costs:</label>
          <input
            type="number"
            className="px-2 py-1 border rounded w-full"
            value={fixedCosts}
            onChange={(e) => setFixedCosts(e.target.value)}
            placeholder="Enter total fixed costs"
            min="0"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1 font-medium">
            Variable Cost per Unit:
          </label>
          <input
            type="number"
            className="px-2 py-1 border rounded w-full"
            value={variableCostPerUnit}
            onChange={(e) => setVariableCostPerUnit(e.target.value)}
            placeholder="Enter variable cost per unit"
            min="0"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1 font-medium">Price per Unit:</label>
          <input
            type="number"
            className="px-2 py-1 border rounded w-full"
            value={pricePerUnit}
            onChange={(e) => setPricePerUnit(e.target.value)}
            placeholder="Enter price per unit"
            min="0"
          />
        </div>
      </div>
      <button
        className="bg-blue-600 mt-2 px-4 py-2 rounded"
        onClick={handleCalculate}
      >
        Calculate Break-Even Point
      </button>
      {result && (
        <div className="flex flex-col gap-4 mt-6">
          <div className="shadow p-4 border rounded-lg">
            <div>
              <strong>Contribution Margin per Unit:</strong>{" "}
              <span className="text-lg">{result.contributionMargin}</span>
            </div>
            <div>
              <strong>Break-Even Units:</strong>{" "}
              <span className="text-lg">{result.breakEvenUnits}</span>
            </div>
            <div>
              <strong>Break-Even Sales ($):</strong>{" "}
              <span className="text-lg">{result.breakEvenSales}</span>
            </div>
          </div>
          <div className="shadow p-4 border rounded-lg text-sm">
            {result.explanation}
          </div>
        </div>
      )}
    </div>
  );
}
