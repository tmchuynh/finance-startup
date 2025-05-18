"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface Allocation {
  name: string;
  percentage: number;
  amount: number;
}

const ASSET_CLASSES = ["Stocks", "Bonds", "Real Estate", "Cash", "Others"];

export default function AssetAllocationTool() {
  const [totalAmount, setTotalAmount] = useState<number>(10000);
  const [percentages, setPercentages] = useState<Record<string, number>>({
    Stocks: 50,
    Bonds: 30,
    "Real Estate": 10,
    Cash: 5,
    Others: 5,
  });

  const handlePercentageChange = (asset: string, value: number) => {
    if (value < 0) value = 0;
    if (value > 100) value = 100;
    setPercentages((prev) => ({ ...prev, [asset]: value }));
  };

  const totalPercent = Object.values(percentages).reduce((a, b) => a + b, 0);

  const allocations: Allocation[] = ASSET_CLASSES.map((asset) => {
    const pct = percentages[asset] || 0;
    return {
      name: asset,
      percentage: pct,
      amount: (totalAmount * pct) / 100,
    };
  });

  const isValid = totalPercent === 100;

  return (
    <div className="bg-white shadow mx-auto p-6 rounded max-w-lg">
      <h1 className="mb-6 font-bold text-2xl">Asset Allocation Tool</h1>

      <div className="mb-4">
        <Label htmlFor="totalAmount" className="block mb-1 font-semibold">
          Total Investment Amount ($)
        </Label>
        <Input
          id="totalAmount"
          type="number"
          min={0}
          value={totalAmount}
          onChange={(e) => setTotalAmount(Number(e.target.value))}
          className="p-2 border border-gray-300 rounded w-full"
          aria-describedby="totalAmountHelp"
        />
        <p id="totalAmountHelp" className="mt-1 text-gray-500 text-sm">
          Enter the total amount you want to invest.
        </p>
      </div>

      <form
        onSubmit={(e) => e.preventDefault()}
        aria-label="Asset allocation form"
        className="space-y-4 mb-6"
      >
        {ASSET_CLASSES.map((asset) => (
          <div key={asset}>
            <Label
              htmlFor={`pct-${asset}`}
              className="block mb-1 font-semibold"
            >
              {asset} Allocation (%)
            </Label>
            <Input
              id={`pct-${asset}`}
              type="number"
              min={0}
              max={100}
              value={percentages[asset]}
              onChange={(e) =>
                handlePercentageChange(asset, Number(e.target.value))
              }
              className="p-2 border border-gray-300 rounded w-full"
            />
          </div>
        ))}
      </form>

      <p
        className={`mb-4 font-semibold ${
          isValid ? "text-green-600" : "text-red-600"
        }`}
      >
        Total allocation: {totalPercent}%{" "}
        {isValid ? "(Valid)" : "(Must equal 100%)"}
      </p>

      <table className="border border-gray-300 rounded w-full table-auto">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-3 py-1 border border-gray-300 text-left">
              Asset Class
            </th>
            <th className="text-right px-3 py-1 border border-gray-300">
              Allocation %
            </th>
            <th className="text-right px-3 py-1 border border-gray-300">
              Amount ($)
            </th>
          </tr>
        </thead>
        <tbody>
          {allocations.map(({ name, percentage, amount }) => (
            <tr key={name} className="even:bg-gray-50">
              <td className="px-3 py-1 border border-gray-300">{name}</td>
              <td className="text-right px-3 py-1 border border-gray-300">
                {percentage.toFixed(2)}%
              </td>
              <td className="text-right px-3 py-1 border border-gray-300">
                ${amount.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
