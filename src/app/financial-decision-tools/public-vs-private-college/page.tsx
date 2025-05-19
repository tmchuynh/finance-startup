"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useEffect, useState } from "react";

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

  useEffect(() => {
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
  }, [
    publicTuition,
    publicRoomBoard,
    publicFees,
    publicScholarships,
    privateTuition,
    privateRoomBoard,
    privateFees,
    privateScholarships,
    years,
  ]);

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

      {/* Table: Typical College Costs */}
      <div className="my-8">
        <h2>Typical College Costs (US, 2024)</h2>
        <div className="overflow-x-auto">
          <table className="border border-gray-300 min-w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-3 py-2 border text-left">Type</th>
                <th className="px-3 py-2 border text-left">
                  Tuition & Fees (per year)
                </th>
                <th className="px-3 py-2 border text-left">
                  Room & Board (per year)
                </th>
                <th className="px-3 py-2 border text-left">Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-3 py-2 border">Public (in-state)</td>
                <td className="px-3 py-2 border">$10,000 - $13,000</td>
                <td className="px-3 py-2 border">$11,000 - $14,000</td>
                <td className="px-3 py-2 border">
                  Lower for in-state residents
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Private</td>
                <td className="px-3 py-2 border">$35,000 - $60,000</td>
                <td className="px-3 py-2 border">$12,000 - $16,000</td>
                <td className="px-3 py-2 border">
                  Higher sticker price, more aid possible
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Table: Pros and Cons */}
      <div className="my-8">
        <h2>Pros and Cons</h2>
        <div className="overflow-x-auto">
          <table className="border border-gray-300 min-w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-3 py-2 border text-left">Type</th>
                <th className="px-3 py-2 border text-left">Pros</th>
                <th className="px-3 py-2 border text-left">Cons</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-3 py-2 border">Public College</td>
                <td className="px-3 py-2 border">
                  Lower cost
                  <br />
                  Large alumni network
                  <br />
                  More in-state options
                </td>
                <td className="px-3 py-2 border">
                  Larger class sizes
                  <br />
                  Less personalized attention
                  <br />
                  Limited out-of-state aid
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Private College</td>
                <td className="px-3 py-2 border">
                  Smaller class sizes
                  <br />
                  More aid for some students
                  <br />
                  Prestige/networking
                </td>
                <td className="px-3 py-2 border">
                  Higher sticker price
                  <br />
                  May require more loans
                  <br />
                  Less in-state tuition benefit
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <form
        className="space-y-5 mt-5"
        aria-label="College cost comparison form"
      >
        <div className="mb-4 pb-4 border-b">
          <h4 className="mb-3">Public College</h4>
          <div className="flex gap-2 mb-2">
            <div className="flex-1">
              <Label className="block mb-1">Tuition ($/year)</Label>
              <div className="flex gap-3">
                {" "}
                <Slider
                  min={0}
                  max={60000}
                  step={500}
                  value={[publicTuition]}
                  onValueChange={([v]) => setPublicTuition(v)}
                  className="w-2/3"
                />
                <Input
                  type="number"
                  min={0}
                  placeholder="Tuition ($/year)"
                  value={publicTuition === 0 ? "" : publicTuition}
                  onChange={(e) => setPublicTuition(Number(e.target.value))}
                  className="w-1/3"
                  required
                />
              </div>
            </div>
            <div className="flex-1">
              <Label className="block mb-1">Room & Board ($/year)</Label>
              <div className="flex gap-3">
                {" "}
                <Slider
                  min={0}
                  max={30000}
                  step={500}
                  value={[publicRoomBoard]}
                  onValueChange={([v]) => setPublicRoomBoard(v)}
                  className="w-2/3"
                />
                <Input
                  type="number"
                  min={0}
                  placeholder="Room & Board ($/year)"
                  value={publicRoomBoard === 0 ? "" : publicRoomBoard}
                  onChange={(e) => setPublicRoomBoard(Number(e.target.value))}
                  className="w-1/3"
                  required
                />
              </div>
            </div>
            <div className="flex-1">
              <Label className="block mb-1">Fees ($/year)</Label>
              <div className="flex gap-3">
                {" "}
                <Slider
                  min={0}
                  max={10000}
                  step={100}
                  value={[publicFees]}
                  onValueChange={([v]) => setPublicFees(v)}
                  className="w-2/3"
                />
                <Input
                  type="number"
                  min={0}
                  placeholder="Fees ($/year)"
                  value={publicFees === 0 ? "" : publicFees}
                  onChange={(e) => setPublicFees(Number(e.target.value))}
                  className="w-1/3"
                  required
                />
              </div>
            </div>
          </div>
          <div className="flex gap-2 mb-2">
            <div className="flex-1">
              <Label className="block mb-1">
                Scholarships/Grants (total $)
              </Label>
              <div className="flex gap-3">
                <Slider
                  min={0}
                  max={200000}
                  step={500}
                  value={[publicScholarships]}
                  onValueChange={([v]) => setPublicScholarships(v)}
                  className="w-2/3"
                />
                <Input
                  type="number"
                  min={0}
                  placeholder="Scholarships/Grants (total $)"
                  value={publicScholarships === 0 ? "" : publicScholarships}
                  onChange={(e) =>
                    setPublicScholarships(Number(e.target.value))
                  }
                  className="w-1/3"
                  required
                />
              </div>
            </div>
            <div className="flex-1">
              <Label className="block mb-1">Years</Label>
              <div className="flex gap-3">
                {" "}
                <Slider
                  min={1}
                  max={8}
                  step={1}
                  value={[years]}
                  onValueChange={([v]) => setYears(v)}
                  className="w-2/3"
                />
                <Input
                  type="number"
                  min={1}
                  placeholder="Years"
                  value={years === 0 ? "" : years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="w-1/3"
                  required
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          <h4 className="mb-3">Private College</h4>
          <div className="flex gap-2 mb-2">
            <div className="flex-1">
              <Label className="block mb-1">Tuition ($/year)</Label>
              <div className="flex gap-3">
                {" "}
                <Slider
                  min={0}
                  max={100000}
                  step={500}
                  value={[privateTuition]}
                  onValueChange={([v]) => setPrivateTuition(v)}
                  className="w-2/3"
                />
                <Input
                  type="number"
                  min={0}
                  placeholder="Tuition ($/year)"
                  value={privateTuition === 0 ? "" : privateTuition}
                  onChange={(e) => setPrivateTuition(Number(e.target.value))}
                  className="w-1/3"
                  required
                />
              </div>
            </div>
            <div className="flex-1">
              <Label className="block mb-1">Room & Board ($/year)</Label>
              <div className="flex gap-3">
                {" "}
                <Slider
                  min={0}
                  max={40000}
                  step={500}
                  value={[privateRoomBoard]}
                  onValueChange={([v]) => setPrivateRoomBoard(v)}
                  className="w-2/3"
                />
                <Input
                  type="number"
                  min={0}
                  placeholder="Room & Board ($/year)"
                  value={privateRoomBoard === 0 ? "" : privateRoomBoard}
                  onChange={(e) => setPrivateRoomBoard(Number(e.target.value))}
                  className="w-1/3"
                  required
                />
              </div>
            </div>
            <div className="flex-1">
              <Label className="block mb-1">Fees ($/year)</Label>
              <div className="flex gap-3">
                {" "}
                <Slider
                  min={0}
                  max={20000}
                  step={100}
                  value={[privateFees]}
                  onValueChange={([v]) => setPrivateFees(v)}
                  className="w-2/3"
                />
                <Input
                  type="number"
                  min={0}
                  placeholder="Fees ($/year)"
                  value={privateFees === 0 ? "" : privateFees}
                  onChange={(e) => setPrivateFees(Number(e.target.value))}
                  className="w-1/3"
                  required
                />
              </div>
            </div>
          </div>
          <div className="flex gap-2 mb-2">
            <div className="flex-1">
              <Label className="block mb-1">
                Scholarships/Grants (total $)
              </Label>
              <div className="flex gap-3">
                {" "}
                <Slider
                  min={0}
                  max={400000}
                  step={500}
                  value={[privateScholarships]}
                  onValueChange={([v]) => setPrivateScholarships(v)}
                  className="w-2/3"
                />
                <Input
                  type="number"
                  min={0}
                  placeholder="Scholarships/Grants (total $)"
                  value={privateScholarships === 0 ? "" : privateScholarships}
                  onChange={(e) =>
                    setPrivateScholarships(Number(e.target.value))
                  }
                  className="w-1/3"
                  required
                />
              </div>
            </div>
          </div>
        </div>
        {/* No compare button */}
      </form>

      {/* Card-like results display */}
      <div className="gap-6 grid grid-cols-1 md:grid-cols-2 mt-8">
        <div className="bg-white shadow p-5 border border-gray-300 rounded-lg">
          <h3 className="flex items-center gap-2 mb-2 font-semibold text-blue-700 text-lg">
            Public College
          </h3>
          <ul>
            <li>
              <span className="text-gray-700">Net Cost:</span>{" "}
              <strong className="text-blue-900">
                $
                {(() => {
                  const pub = calcTotalCost({
                    tuition: publicTuition,
                    roomBoard: publicRoomBoard,
                    fees: publicFees,
                    years,
                    scholarships: publicScholarships,
                  });
                  return pub.net.toLocaleString();
                })()}
              </strong>
            </li>
          </ul>
        </div>
        <div className="bg-white shadow p-5 border border-gray-300 rounded-lg">
          <h3 className="flex items-center gap-2 mb-2 font-semibold text-green-700 text-lg">
            Private College
          </h3>
          <ul>
            <li>
              <span className="text-gray-700">Net Cost:</span>{" "}
              <strong className="text-green-900">
                $
                {(() => {
                  const priv = calcTotalCost({
                    tuition: privateTuition,
                    roomBoard: privateRoomBoard,
                    fees: privateFees,
                    years,
                    scholarships: privateScholarships,
                  });
                  return priv.net.toLocaleString();
                })()}
              </strong>
            </li>
          </ul>
        </div>
      </div>
      {/* Recommendation */}
      <div className="mt-6">
        <div className="bg-blue-50 p-4 border border-blue-200 rounded text-blue-900">
          <strong>Recommendation:</strong>
          <div className="mt-1">
            {result && result.split("\n").slice(-1).join("")}
          </div>
        </div>
      </div>
      <section className="mt-8">
        <h2>Disclaimer</h2>
        <p>
          This tool provides estimates for informational purposes only. Actual
          costs and aid may vary. Consult each college's financial aid office
          for personalized information. This calculator is for informational
          purposes only and does not constitute financial advice. Actual costs
          and financial aid may vary. Please consult with a financial advisor or
          the financial aid office of the colleges you are considering for
          personalized information.
        </p>
      </section>
    </div>
  );
}
