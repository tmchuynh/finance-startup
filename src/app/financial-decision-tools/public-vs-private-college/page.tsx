"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";

function calcTotalCost({
  tuition,
  roomBoard,
  fees,
  years,
  scholarships,
}: {
  tuition: number;
  roomBoard: number;
  fees: number;
  years: number;
  scholarships: number;
}) {
  const gross = (tuition + roomBoard + fees) * years;
  const net = Math.max(gross - scholarships, 0);
  return { gross, net };
}

export default function PublicVsPrivateCollege() {
  const [publicTuition, setPublicTuition] = useState<number>(11000);
  const [publicRoomBoard, setPublicRoomBoard] = useState<number>(12000);
  const [publicFees, setPublicFees] = useState<number>(2000);
  const [publicScholarships, setPublicScholarships] = useState<number>(5000);

  const [privateTuition, setPrivateTuition] = useState<number>(40000);
  const [privateRoomBoard, setPrivateRoomBoard] = useState<number>(14000);
  const [privateFees, setPrivateFees] = useState<number>(2500);
  const [privateScholarships, setPrivateScholarships] = useState<number>(20000);

  const [years, setYears] = useState<number>(4);

  const [result, setResult] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      publicTuition < 0 ||
      publicRoomBoard < 0 ||
      publicFees < 0 ||
      publicScholarships < 0 ||
      privateTuition < 0 ||
      privateRoomBoard < 0 ||
      privateFees < 0 ||
      privateScholarships < 0 ||
      years <= 0
    ) {
      setResult("Please enter valid, non-negative values for all fields.");
      return;
    }
    const pub = calcTotalCost({
      tuition: publicTuition,
      roomBoard: publicRoomBoard,
      fees: publicFees,
      years,
      scholarships: publicScholarships,
    });
    const priv = calcTotalCost({
      tuition: privateTuition,
      roomBoard: privateRoomBoard,
      fees: privateFees,
      years,
      scholarships: privateScholarships,
    });

    let recommendation = "";
    if (pub.net < priv.net) {
      recommendation =
        "Attending a public college may be more affordable after scholarships and aid.";
    } else if (pub.net > priv.net) {
      recommendation =
        "Attending a private college may be more affordable after scholarships and aid.";
    } else {
      recommendation =
        "Both options may have similar net costs. Consider other factors such as academic programs, campus life, and outcomes.";
    }

    setResult(
      `Public College (Net Cost): $${pub.net.toLocaleString()}
Private College (Net Cost): $${priv.net.toLocaleString()}

${recommendation}`
    );
  };

  return (
    <div className="mx-auto pt-6 sm:pt-12 lg:pt-16 pb-24 lg:pb-32 w-10/12 md:w-11/12">
      <h1>Public vs Private College Cost Comparison</h1>
      <h5>Estimate Your Net Cost of Attendance</h5>
      <p>
        Use this tool to compare the estimated total cost of attending a public
        versus a private college, including tuition, room & board, fees, and
        scholarships or grants. This tool provides estimates for informational
        purposes only. Actual costs and aid may vary. Consult each college's
        financial aid office for personalized information. This calculator is
        for informational purposes only and does not constitute financial
        advice. Actual costs and financial aid may vary. Please consult with a
        financial advisor or the financial aid office of the colleges you are
        considering for personalized information.
      </p>
      <p>
        Enter the estimated costs for each college type, including tuition, room
        & board, fees, and any scholarships or grants you expect to receive. The
        calculator will provide a comparison of the net costs for both options.
      </p>
      <p>
        Note: The calculator assumes a standard 4-year college program. Adjust
        the years as needed for your specific situation.
      </p>
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
        aria-label="College cost comparison form"
      >
        <div className="mb-4 pb-4 border-b">
          <Label className="block mb-1 font-semibold">Public College</Label>
          <div className="flex gap-2 mb-2">
            <div className="flex-1">
              <Input
                type="number"
                min={0}
                placeholder="Tuition ($/year)"
                value={publicTuition === 0 ? "" : publicTuition}
                onChange={(e) => setPublicTuition(Number(e.target.value))}
                className="p-2 border border-gray-300 rounded w-full"
                required
              />
            </div>
            <div className="flex-1">
              <Input
                type="number"
                min={0}
                placeholder="Room & Board ($/year)"
                value={publicRoomBoard === 0 ? "" : publicRoomBoard}
                onChange={(e) => setPublicRoomBoard(Number(e.target.value))}
                className="p-2 border border-gray-300 rounded w-full"
                required
              />
            </div>
            <div className="flex-1">
              <Input
                type="number"
                min={0}
                placeholder="Fees ($/year)"
                value={publicFees === 0 ? "" : publicFees}
                onChange={(e) => setPublicFees(Number(e.target.value))}
                className="p-2 border border-gray-300 rounded w-full"
                required
              />
            </div>
          </div>
          <div className="flex gap-2 mb-2">
            <div className="flex-1">
              <Input
                type="number"
                min={0}
                placeholder="Scholarships/Grants (total $)"
                value={publicScholarships === 0 ? "" : publicScholarships}
                onChange={(e) => setPublicScholarships(Number(e.target.value))}
                className="p-2 border border-gray-300 rounded w-full"
                required
              />
            </div>
            <div className="flex-1">
              <Input
                type="number"
                min={1}
                placeholder="Years"
                value={years === 0 ? "" : years}
                onChange={(e) => setYears(Number(e.target.value))}
                className="p-2 border border-gray-300 rounded w-full"
                required
              />
            </div>
          </div>
        </div>
        <div>
          <Label className="block mb-1 font-semibold">Private College</Label>
          <div className="flex gap-2 mb-2">
            <div className="flex-1">
              <Input
                type="number"
                min={0}
                placeholder="Tuition ($/year)"
                value={privateTuition === 0 ? "" : privateTuition}
                onChange={(e) => setPrivateTuition(Number(e.target.value))}
                className="p-2 border border-gray-300 rounded w-full"
                required
              />
            </div>
            <div className="flex-1">
              <Input
                type="number"
                min={0}
                placeholder="Room & Board ($/year)"
                value={privateRoomBoard === 0 ? "" : privateRoomBoard}
                onChange={(e) => setPrivateRoomBoard(Number(e.target.value))}
                className="p-2 border border-gray-300 rounded w-full"
                required
              />
            </div>
            <div className="flex-1">
              <Input
                type="number"
                min={0}
                placeholder="Fees ($/year)"
                value={privateFees === 0 ? "" : privateFees}
                onChange={(e) => setPrivateFees(Number(e.target.value))}
                className="p-2 border border-gray-300 rounded w-full"
                required
              />
            </div>
          </div>
          <div className="flex gap-2 mb-2">
            <div className="flex-1">
              <Input
                type="number"
                min={0}
                placeholder="Scholarships/Grants (total $)"
                value={privateScholarships === 0 ? "" : privateScholarships}
                onChange={(e) => setPrivateScholarships(Number(e.target.value))}
                className="p-2 border border-gray-300 rounded w-full"
                required
              />
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 py-2 rounded focus:ring-2 focus:ring-blue-500 w-full font-semibold text-white focus:outline-none"
        >
          Compare
        </button>
      </form>
      {result && (
        <div
          className="bg-gray-100 mt-6 p-4 border border-gray-300 rounded whitespace-pre-line"
          role="alert"
          aria-live="polite"
        >
          {result}
        </div>
      )}
    </div>
  );
}
