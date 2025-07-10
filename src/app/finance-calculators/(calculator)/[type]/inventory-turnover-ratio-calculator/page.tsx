"use client";
import { Button } from "@/components/ui/button";
import { calculateInventoryTurnoverRatio } from "@/lib/utils/calculators/business/inventory";
import { useState } from "react";

export default function InventoryTurnoverRatioCalculator() {
  const [costOfGoodsSold, setCostOfGoodsSold] = useState<string>("");
  const [averageInventory, setAverageInventory] = useState<string>("");
  const [result, setResult] = useState<{
    turnoverRatio: number;
    daysSalesOfInventory: number | null;
    explanation: string;
  } | null>(null);

  const handleCalculate = () => {
    const cogsNum = parseFloat(costOfGoodsSold);
    const avgInvNum = parseFloat(averageInventory);
    if (!isNaN(cogsNum) && !isNaN(avgInvNum) && avgInvNum > 0) {
      const res = calculateInventoryTurnoverRatio({
        costOfGoodsSold: cogsNum,
        averageInventory: avgInvNum,
      });
      setResult({
        turnoverRatio: res.turnoverRatio,
        daysSalesOfInventory: res.daysSalesOfInventory ?? null,
        explanation: res.explanation,
      });
    } else {
      setResult(null);
    }
  };

  return (
    <div className="mt-8 md:mt-12 mx-auto h-full w-10/12 md:w-11/12">
      <h1>Inventory Turnover Ratio Calculator</h1>
      <h5>Calculate your inventory turnover ratio easily.</h5>
      <p className="mb-4">
        This calculator helps you determine how efficiently your business is
        managing its inventory. A higher turnover ratio indicates better
        inventory management and sales performance, while a lower ratio may
        suggest overstocking or weak sales. Use this tool to optimize your
        inventory levels and improve cash flow.
      </p>
      <div className="mb-4">
        <p>
          <strong>What is Inventory Turnover Ratio?</strong>
          <br />
          The inventory turnover ratio measures how many times a company sells
          and replaces its inventory over a period. A higher ratio indicates
          efficient inventory management and strong sales, while a lower ratio
          may suggest overstocking or weak sales. This ratio is crucial for
          businesses to understand their inventory management efficiency and
          sales performance.
        </p>
        <p className="mt-2">
          <strong>Formula:</strong>
          <code>
            Inventory Turnover Ratio = Cost of Goods Sold / Average Inventory
          </code>
        </p>
        <p className="mt-2">
          <strong>Days Sales of Inventory (DSI):</strong>
          <br />
          <code>DSI = 365 / Inventory Turnover Ratio</code>
          <br />
          This tells you the average number of days inventory is held before
          being sold. A lower DSI indicates faster inventory turnover.
        </p>
        <p className="mt-2">
          <strong>Why it matters:</strong>
          <br />
          Monitoring this ratio helps businesses optimize inventory levels,
          reduce holding costs, and improve cash flow. A high turnover ratio
          indicates efficient inventory management, while a low ratio may
          suggest overstocking or weak sales. Regularly analyzing this metric
          can help businesses make informed decisions about purchasing,
          production, and sales strategies.
        </p>
      </div>
      <div className="gap-4 grid md:grid-cols-2">
        <div className="mb-2">
          <label className="block mb-1 font-medium">
            Cost of Goods Sold (COGS):
          </label>
          <input
            type="number"
            className="px-2 py-1 border rounded w-full"
            value={costOfGoodsSold}
            onChange={(e) => setCostOfGoodsSold(e.target.value)}
            placeholder="Enter COGS"
            min="0"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1 font-medium">Average Inventory:</label>
          <input
            type="number"
            className="px-2 py-1 border rounded w-full"
            value={averageInventory}
            onChange={(e) => setAverageInventory(e.target.value)}
            placeholder="Enter average inventory"
            min="0"
          />
        </div>
      </div>
      <Button className="mt-2 px-4 py-2 rounded" onClick={handleCalculate}>
        Calculate Inventory Turnover
      </Button>
      {result && (
        <div className="gap-4 grid md:grid-cols-2 mt-6">
          <div className="shadow p-4 border rounded-lg">
            <strong>Inventory Turnover Ratio:</strong>{" "}
            <span className="text-lg">{result.turnoverRatio}</span>
          </div>
          {result.daysSalesOfInventory !== null && (
            <div className="shadow p-4 border rounded-lg">
              <strong>Days Sales of Inventory:</strong>{" "}
              <span className="text-lg">{result.daysSalesOfInventory}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
