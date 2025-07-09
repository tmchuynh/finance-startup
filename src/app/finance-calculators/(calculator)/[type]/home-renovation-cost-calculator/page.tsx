"use client";
import { useState } from "react";

const RENOVATION_TYPES = [
  { key: "kitchen", label: "Kitchen" },
  { key: "bathroom", label: "Bathroom" },
  { key: "basement", label: "Basement" },
  { key: "roof", label: "Roof" },
  { key: "windows", label: "Windows" },
  { key: "flooring", label: "Flooring" },
  { key: "paint", label: "Paint" },
  { key: "landscaping", label: "Landscaping" },
  { key: "other", label: "Other" },
];

// Typical value added by renovation type (as % of renovation cost)
const VALUE_ADDED = {
  kitchen: 0.6,
  bathroom: 0.55,
  basement: 0.5,
  roof: 0.6,
  windows: 0.7,
  flooring: 0.5,
  paint: 0.4,
  landscaping: 0.5,
  other: 0.4,
};

// Typical cost ranges (2024, U.S. averages)
const TYPICAL_COSTS = {
  kitchen: "$15,000 - $50,000",
  bathroom: "$6,000 - $20,000",
  basement: "$20,000 - $50,000",
  roof: "$8,000 - $20,000",
  windows: "$5,000 - $15,000",
  flooring: "$3,000 - $10,000",
  paint: "$2,000 - $6,000",
  landscaping: "$3,000 - $15,000",
  other: "Varies",
};

type Renovation = {
  type: string;
  cost: string;
  numRooms: string;
};

export default function HomeRenovationCostCalculator() {
  const [homeValue, setHomeValue] = useState<string>("");
  const [renovations, setRenovations] = useState<Renovation[]>([
    { type: "kitchen", cost: "", numRooms: "1" },
  ]);
  const [result, setResult] = useState<{
    totalCost: number;
    percentOfHome: number;
    valueAdded: number;
    breakdown: { type: string; cost: number; valueAdded: number }[];
  } | null>(null);

  const handleRenovationChange = (
    idx: number,
    field: keyof Renovation,
    value: string
  ) => {
    setRenovations((prev) =>
      prev.map((r, i) => (i === idx ? { ...r, [field]: value } : r))
    );
  };

  const handleAddRenovation = () => {
    setRenovations((prev) => [
      ...prev,
      { type: "kitchen", cost: "", numRooms: "1" },
    ]);
  };

  const handleRemoveRenovation = (idx: number) => {
    setRenovations((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleCalculate = () => {
    const value = parseFloat(homeValue);
    let totalCost = 0;
    let totalValueAdded = 0;
    const breakdown: { type: string; cost: number; valueAdded: number }[] = [];
    let valid = !isNaN(value) && value > 0;

    renovations.forEach((ren) => {
      const cost = parseFloat(ren.cost);
      const rooms = parseInt(ren.numRooms, 10);
      if (!isNaN(cost) && !isNaN(rooms) && cost > 0 && rooms > 0) {
        const renTotal = cost * rooms;
        const renValueAdded =
          renTotal * (VALUE_ADDED[ren.type as keyof typeof VALUE_ADDED] || 0.4);
        totalCost += renTotal;
        totalValueAdded += renValueAdded;
        breakdown.push({
          type: ren.type,
          cost: renTotal,
          valueAdded: renValueAdded,
        });
      } else {
        valid = false;
      }
    });

    if (valid && totalCost > 0) {
      const percentOfHome = (totalCost / value) * 100;
      setResult({
        totalCost,
        percentOfHome,
        valueAdded: totalValueAdded,
        breakdown,
      });
    } else {
      setResult(null);
    }
  };

  return (
    <div className="mt-8 md:mt-12 mx-auto h-full w-10/12 md:w-11/12">
      <h1>Home Renovation Cost Calculator</h1>
      <p className="mb-4">
        <strong>
          Estimate the total cost of your home renovation project and see how
          much value it could add to your property.
        </strong>
      </p>
      <section className="mb-8">
        <h2>How Does This Calculator Work?</h2>
        <p>
          Enter your home's value, add each renovation type, estimated cost per
          room, and the number of rooms. The calculator will estimate your total
          renovation cost, what percent of your home's value it represents, and
          how much value it could add.
        </p>
        <div className="my-6">
          <h3>Typical Input Values</h3>
          <table className="mb-4 border border-gray-300 min-w-full text-sm">
            <thead>
              <tr className="">
                <th className="px-3 py-2 border text-left">Field</th>
                <th className="px-3 py-2 border text-left">Typical Value</th>
                <th className="px-3 py-2 border text-left">Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-3 py-2 border">Home Value ($)</td>
                <td className="px-3 py-2 border">$300,000 - $600,000</td>
                <td className="px-3 py-2 border">
                  Typical U.S. home price (2024)
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Renovation Type</td>
                <td className="px-3 py-2 border">Kitchen, Bathroom, etc.</td>
                <td className="px-3 py-2 border">
                  See table below for cost ranges
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Cost per Room ($)</td>
                <td className="px-3 py-2 border">See below</td>
                <td className="px-3 py-2 border">
                  Kitchen: $15k-$50k, Bath: $6k-$20k, etc.
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Number of Rooms</td>
                <td className="px-3 py-2 border">1 - 3</td>
                <td className="px-3 py-2 border">
                  How many rooms you plan to renovate
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mb-6">
          <h3>Typical Renovation Costs by Project (2024)</h3>
          <table className="mb-4 border border-gray-300 min-w-full text-sm">
            <thead>
              <tr className="">
                <th className="px-3 py-2 border text-left">Renovation Type</th>
                <th className="px-3 py-2 border text-left">
                  Typical Cost Range
                </th>
                <th className="px-3 py-2 border text-left">
                  Value Added (% of cost)
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-3 py-2 border">Kitchen Remodel</td>
                <td className="px-3 py-2 border">{TYPICAL_COSTS.kitchen}</td>
                <td className="px-3 py-2 border">60%</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Bathroom Remodel</td>
                <td className="px-3 py-2 border">{TYPICAL_COSTS.bathroom}</td>
                <td className="px-3 py-2 border">55%</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Basement Finish</td>
                <td className="px-3 py-2 border">{TYPICAL_COSTS.basement}</td>
                <td className="px-3 py-2 border">50%</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Roof Replacement</td>
                <td className="px-3 py-2 border">{TYPICAL_COSTS.roof}</td>
                <td className="px-3 py-2 border">60%</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Windows</td>
                <td className="px-3 py-2 border">{TYPICAL_COSTS.windows}</td>
                <td className="px-3 py-2 border">70%</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Flooring</td>
                <td className="px-3 py-2 border">{TYPICAL_COSTS.flooring}</td>
                <td className="px-3 py-2 border">50%</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Paint</td>
                <td className="px-3 py-2 border">{TYPICAL_COSTS.paint}</td>
                <td className="px-3 py-2 border">40%</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Landscaping</td>
                <td className="px-3 py-2 border">
                  {TYPICAL_COSTS.landscaping}
                </td>
                <td className="px-3 py-2 border">50%</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Other</td>
                <td className="px-3 py-2 border">{TYPICAL_COSTS.other}</td>
                <td className="px-3 py-2 border">40%</td>
              </tr>
            </tbody>
          </table>
          <p className="text-sm">
            <strong>Source:</strong> Remodeling Magazine Cost vs. Value Report,
            HomeAdvisor, 2024.
          </p>
        </div>
        <div className="gap-4 grid md:grid-cols-3">
          <div className="mb-2">
            <label className="block mb-1 font-medium">Home Value ($):</label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={homeValue}
              onChange={(e) => setHomeValue(e.target.value)}
              placeholder="Enter current home value"
              min="0"
            />
          </div>
        </div>
        <div className="mb-4">
          <h3 className="mb-2 font-medium">Renovations</h3>
          {renovations.map((ren, idx) => (
            <div
              key={idx}
              className="flex flex-col md:flex-row gap-2 items-end mb-2"
            >
              <div className="flex-1">
                <label className="block mb-1 font-medium">Type:</label>
                <select
                  className="px-2 py-1 border rounded w-full"
                  value={ren.type}
                  onChange={(e) =>
                    handleRenovationChange(idx, "type", e.target.value)
                  }
                >
                  {RENOVATION_TYPES.map((t) => (
                    <option key={t.key} value={t.key}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <label className="block mb-1 font-medium">
                  Cost per Room ($):
                </label>
                <input
                  type="number"
                  className="px-2 py-1 border rounded w-full"
                  value={ren.cost}
                  onChange={(e) =>
                    handleRenovationChange(idx, "cost", e.target.value)
                  }
                  placeholder="e.g., 25000"
                  min="0"
                />
              </div>
              <div className="flex-1">
                <label className="block mb-1 font-medium">
                  Number of Rooms:
                </label>
                <input
                  type="number"
                  className="px-2 py-1 border rounded w-full"
                  value={ren.numRooms}
                  onChange={(e) =>
                    handleRenovationChange(idx, "numRooms", e.target.value)
                  }
                  placeholder="e.g., 2"
                  min="1"
                />
              </div>
              <div>
                {renovations.length > 1 && (
                  <button
                    className="bg-red-500 ml-2 px-2 py-1 rounded"
                    onClick={() => handleRemoveRenovation(idx)}
                    type="button"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))}
          <button
            className="bg-green-600 mt-2 px-3 py-1 rounded"
            onClick={handleAddRenovation}
            type="button"
          >
            Add Renovation
          </button>
        </div>
        <button
          className="bg-blue-600 mt-2 px-4 py-2 rounded"
          onClick={handleCalculate}
        >
          Calculate Renovation Cost
        </button>
        {result && (
          <div className="flex flex-col gap-4 mt-6">
            <div className="shadow p-4 border rounded-lg">
              <h3 className="mb-2 font-semibold">Results</h3>
              <table className="mb-4 border border-gray-300 min-w-full text-sm">
                <thead>
                  <tr className="">
                    <th className="px-3 py-2 border text-left">
                      Renovation Type
                    </th>
                    <th className="px-3 py-2 border text-left">Total Cost</th>
                    <th className="px-3 py-2 border text-left">
                      Estimated Value Added
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {result.breakdown.map((b, i) => (
                    <tr key={i}>
                      <td className="px-3 py-2 border">
                        {RENOVATION_TYPES.find((t) => t.key === b.type)
                          ?.label || b.type}
                      </td>
                      <td className="px-3 py-2 border">
                        $
                        {b.cost.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </td>
                      <td className="px-3 py-2 border">
                        $
                        {b.valueAdded.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <table className="border border-gray-300 min-w-full text-sm">
                <tbody>
                  <tr>
                    <td className="px-3 py-2 border font-medium">
                      Total Renovation Cost
                    </td>
                    <td className="px-3 py-2 border">
                      $
                      {result.totalCost.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border font-medium">
                      % of Home Value
                    </td>
                    <td className="px-3 py-2 border">
                      {result.percentOfHome.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                      %
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border font-medium">
                      Estimated Value Added
                    </td>
                    <td className="px-3 py-2 border">
                      $
                      {result.valueAdded.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="mt-2 text-sm">
                <strong>Note:</strong> Actual costs and value added may vary.
                Always get multiple quotes and consult professionals.
              </div>
            </div>
          </div>
        )}
        <div className="my-6">
          <h3>Renovation & Homeownership Tips</h3>
          <ul className="list-disc list-inside">
            <li>
              Renovating when the market is down can mean lower contractor costs
              and less competition for materials.
            </li>
            <li>
              Major renovations (kitchen, bath, roof) add the most value, but
              rarely recoup 100% of cost.
            </li>
            <li>Always get multiple quotes and check contractor references.</li>
            <li>
              Consider the impact on your mortgage and insurance—some
              renovations may require lender approval or increase your insurance
              premium.
            </li>
            <li>Budget for unexpected costs—add 10-20% to your estimate.</li>
            <li>
              Some improvements (energy efficiency, accessibility) may qualify
              for tax credits or rebates.
            </li>
            <li>
              Consult a real estate agent before major renovations if you plan
              to sell soon.
            </li>
          </ul>
        </div>
        <div className="mb-6">
          <h3>Key Terms Explained</h3>
          <table className="mb-4 border border-gray-300 min-w-full text-sm">
            <thead>
              <tr className="">
                <th className="px-3 py-2 border text-left">Term</th>
                <th className="px-3 py-2 border text-left">Description</th>
                <th className="px-3 py-2 border text-left">Example</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-3 py-2 border">Home Value</td>
                <td className="px-3 py-2 border">
                  Current market value of your home
                </td>
                <td className="px-3 py-2 border">$400,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Renovation Type</td>
                <td className="px-3 py-2 border">
                  Type of project (kitchen, bath, etc.)
                </td>
                <td className="px-3 py-2 border">Kitchen</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Cost per Room</td>
                <td className="px-3 py-2 border">
                  Estimated cost for one room/project
                </td>
                <td className="px-3 py-2 border">$25,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Number of Rooms</td>
                <td className="px-3 py-2 border">
                  How many rooms/projects you plan to renovate
                </td>
                <td className="px-3 py-2 border">2</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Total Cost</td>
                <td className="px-3 py-2 border">
                  Cost per room × number of rooms
                </td>
                <td className="px-3 py-2 border">$50,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">% of Home Value</td>
                <td className="px-3 py-2 border">
                  Total cost as a percent of home value
                </td>
                <td className="px-3 py-2 border">12.5%</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Value Added</td>
                <td className="px-3 py-2 border">
                  Estimated increase in home value
                </td>
                <td className="px-3 py-2 border">$30,000</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mb-6">
          <h3>Real Data Example (2024)</h3>
          <table className="mb-4 border border-gray-300 min-w-full text-sm">
            <thead>
              <tr className="">
                <th className="px-3 py-2 border text-left">Scenario</th>
                <th className="px-3 py-2 border text-left">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-3 py-2 border">Home Value</td>
                <td className="px-3 py-2 border">$400,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Renovation Type</td>
                <td className="px-3 py-2 border">Kitchen</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Cost per Room</td>
                <td className="px-3 py-2 border">$25,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Number of Rooms</td>
                <td className="px-3 py-2 border">2</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Total Cost</td>
                <td className="px-3 py-2 border">$50,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">% of Home Value</td>
                <td className="px-3 py-2 border">12.5%</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Value Added</td>
                <td className="px-3 py-2 border">$30,000</td>
              </tr>
            </tbody>
          </table>
          <p className="text-sm">
            <strong>Source:</strong> Remodeling Magazine, HomeAdvisor, 2024
            averages.
          </p>
        </div>
      </section>
    </div>
  );
}
