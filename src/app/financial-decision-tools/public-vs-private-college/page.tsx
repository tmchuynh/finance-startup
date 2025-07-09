"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
        "Public college may be more affordable after scholarships and aid.";
    } else if (pub.net > priv.net) {
      recommendation =
        "Private college may be more affordable after scholarships and aid.";
    } else {
      recommendation =
        "Both options have similar net costs. Consider other factors such as academic programs, campus life, and outcomes.";
    }

    setResult(recommendation);
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

  const publicCost = calcTotalCost({
    tuition: publicTuition,
    roomBoard: publicRoomBoard,
    fees: publicFees,
    years,
    scholarships: publicScholarships,
  });

  const privateCost = calcTotalCost({
    tuition: privateTuition,
    roomBoard: privateRoomBoard,
    fees: privateFees,
    years,
    scholarships: privateScholarships,
  });

  const winner =
    publicCost.net < privateCost.net
      ? "public"
      : privateCost.net < publicCost.net
      ? "private"
      : "tie";
  const savings =
    winner === "public"
      ? privateCost.net - publicCost.net
      : winner === "private"
      ? publicCost.net - privateCost.net
      : 0;

  return (
    <div className="mx-auto pb-24 lg:pb-32 pt-6 sm:pt-12 lg:pt-16 w-10/12 md:w-11/12">
      {/* Header Section */}
      <div className="mb-12 text-center">
        <h1 className="bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4 font-bold text-3xl text-transparent md:text-5xl">
          Public vs Private College Cost Comparison
        </h1>
        <p className="mx-auto max-w-3xl leading-relaxed text-lg md:text-xl">
          Compare the estimated total cost of attending public versus private
          colleges, including tuition, room & board, fees, and financial aid.
        </p>
      </div>

      {/* Information Tables */}
      <div className="gap-8 grid mb-12">
        {/* Typical College Costs */}
        <div className="shadow-sm p-6 border rounded-lg">
          <h2 className="mb-4 font-semibold text-2xl">
            Typical College Costs (US, 2024)
          </h2>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold">Type</TableHead>
                  <TableHead className="font-semibold">
                    Tuition & Fees (per year)
                  </TableHead>
                  <TableHead className="font-semibold">
                    Room & Board (per year)
                  </TableHead>
                  <TableHead className="font-semibold">Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">
                    Public (in-state)
                  </TableCell>
                  <TableCell>$10,000 - $13,000</TableCell>
                  <TableCell>$11,000 - $14,000</TableCell>
                  <TableCell>Lower for in-state residents</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Private</TableCell>
                  <TableCell>$35,000 - $60,000</TableCell>
                  <TableCell>$12,000 - $16,000</TableCell>
                  <TableCell>Higher sticker price, more aid possible</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Pros and Cons */}
        <div className="shadow-sm p-6 border rounded-lg">
          <h2 className="mb-4 font-semibold text-2xl">Pros and Cons</h2>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold">Type</TableHead>
                  <TableHead className="font-semibold">Pros</TableHead>
                  <TableHead className="font-semibold">Cons</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Public College</TableCell>
                  <TableCell>
                    <ul className="space-y-1">
                      <li>Lower cost</li>
                      <li>Large alumni network</li>
                      <li>More in-state options</li>
                    </ul>
                  </TableCell>
                  <TableCell>
                    <ul className="space-y-1">
                      <li>Larger class sizes</li>
                      <li>Less personalized attention</li>
                      <li>Limited out-of-state aid</li>
                    </ul>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Private College</TableCell>
                  <TableCell>
                    <ul className="space-y-1">
                      <li>Smaller class sizes</li>
                      <li>More aid for some students</li>
                      <li>Prestige/networking</li>
                    </ul>
                  </TableCell>
                  <TableCell>
                    <ul className="space-y-1">
                      <li>Higher sticker price</li>
                      <li>May require more loans</li>
                      <li>Less in-state tuition benefit</li>
                    </ul>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* Calculator Form */}
      <div className="shadow-sm mb-8 p-6 border rounded-lg">
        <h2 className="mb-6 font-semibold text-2xl">College Cost Calculator</h2>

        <form
          aria-label="College cost comparison form"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="gap-8 grid">
            {/* Public College Section */}
            <div className="p-6 border rounded-lg">
              <h3 className="mb-4 font-semibold text-lg">
                Public College Costs
              </h3>
              <div className="gap-6 grid md:grid-cols-2 lg:grid-cols-3">
                <div>
                  <Label className="font-medium text-sm">
                    Tuition: ${publicTuition.toLocaleString()}/year
                  </Label>
                  <div className="flex gap-4 items-center mt-2">
                    <Slider
                      min={0}
                      max={60000}
                      step={500}
                      value={[publicTuition]}
                      onValueChange={([v]) => setPublicTuition(v)}
                      className="flex-1"
                    />
                    <Input
                      type="number"
                      min={0}
                      value={publicTuition}
                      onChange={(e) => setPublicTuition(Number(e.target.value))}
                      className="w-24"
                    />
                  </div>
                </div>
                <div>
                  <Label className="font-medium text-sm">
                    Room & Board: ${publicRoomBoard.toLocaleString()}/year
                  </Label>
                  <div className="flex gap-4 items-center mt-2">
                    <Slider
                      min={0}
                      max={30000}
                      step={500}
                      value={[publicRoomBoard]}
                      onValueChange={([v]) => setPublicRoomBoard(v)}
                      className="flex-1"
                    />
                    <Input
                      type="number"
                      min={0}
                      value={publicRoomBoard}
                      onChange={(e) =>
                        setPublicRoomBoard(Number(e.target.value))
                      }
                      className="w-24"
                    />
                  </div>
                </div>
                <div>
                  <Label className="font-medium text-sm">
                    Fees: ${publicFees.toLocaleString()}/year
                  </Label>
                  <div className="flex gap-4 items-center mt-2">
                    <Slider
                      min={0}
                      max={10000}
                      step={100}
                      value={[publicFees]}
                      onValueChange={([v]) => setPublicFees(v)}
                      className="flex-1"
                    />
                    <Input
                      type="number"
                      min={0}
                      value={publicFees}
                      onChange={(e) => setPublicFees(Number(e.target.value))}
                      className="w-24"
                    />
                  </div>
                </div>
                <div>
                  <Label className="font-medium text-sm">
                    Scholarships/Grants: ${publicScholarships.toLocaleString()}{" "}
                    total
                  </Label>
                  <div className="flex gap-4 items-center mt-2">
                    <Slider
                      min={0}
                      max={200000}
                      step={500}
                      value={[publicScholarships]}
                      onValueChange={([v]) => setPublicScholarships(v)}
                      className="flex-1"
                    />
                    <Input
                      type="number"
                      min={0}
                      value={publicScholarships}
                      onChange={(e) =>
                        setPublicScholarships(Number(e.target.value))
                      }
                      className="w-24"
                    />
                  </div>
                </div>
                <div>
                  <Label className="font-medium text-sm">Years: {years}</Label>
                  <div className="flex gap-4 items-center mt-2">
                    <Slider
                      min={1}
                      max={8}
                      step={1}
                      value={[years]}
                      onValueChange={([v]) => setYears(v)}
                      className="flex-1"
                    />
                    <Input
                      type="number"
                      min={1}
                      value={years}
                      onChange={(e) => setYears(Number(e.target.value))}
                      className="w-24"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Private College Section */}
            <div className="bg-purple-50 p-6 border border-purple-200 rounded-lg">
              <h3 className="mb-4 font-semibold text-lg">
                Private College Costs
              </h3>
              <div className="gap-6 grid md:grid-cols-2 lg:grid-cols-3">
                <div>
                  <Label className="font-medium text-sm">
                    Tuition: ${privateTuition.toLocaleString()}/year
                  </Label>
                  <div className="flex gap-4 items-center mt-2">
                    <Slider
                      min={0}
                      max={100000}
                      step={500}
                      value={[privateTuition]}
                      onValueChange={([v]) => setPrivateTuition(v)}
                      className="flex-1"
                    />
                    <Input
                      type="number"
                      min={0}
                      value={privateTuition}
                      onChange={(e) =>
                        setPrivateTuition(Number(e.target.value))
                      }
                      className="w-24"
                    />
                  </div>
                </div>
                <div>
                  <Label className="font-medium text-sm">
                    Room & Board: ${privateRoomBoard.toLocaleString()}/year
                  </Label>
                  <div className="flex gap-4 items-center mt-2">
                    <Slider
                      min={0}
                      max={40000}
                      step={500}
                      value={[privateRoomBoard]}
                      onValueChange={([v]) => setPrivateRoomBoard(v)}
                      className="flex-1"
                    />
                    <Input
                      type="number"
                      min={0}
                      value={privateRoomBoard}
                      onChange={(e) =>
                        setPrivateRoomBoard(Number(e.target.value))
                      }
                      className="w-24"
                    />
                  </div>
                </div>
                <div>
                  <Label className="font-medium text-sm">
                    Fees: ${privateFees.toLocaleString()}/year
                  </Label>
                  <div className="flex gap-4 items-center mt-2">
                    <Slider
                      min={0}
                      max={20000}
                      step={100}
                      value={[privateFees]}
                      onValueChange={([v]) => setPrivateFees(v)}
                      className="flex-1"
                    />
                    <Input
                      type="number"
                      min={0}
                      value={privateFees}
                      onChange={(e) => setPrivateFees(Number(e.target.value))}
                      className="w-24"
                    />
                  </div>
                </div>
                <div>
                  <Label className="font-medium text-sm">
                    Scholarships/Grants: ${privateScholarships.toLocaleString()}{" "}
                    total
                  </Label>
                  <div className="flex gap-4 items-center mt-2">
                    <Slider
                      min={0}
                      max={400000}
                      step={500}
                      value={[privateScholarships]}
                      onValueChange={([v]) => setPrivateScholarships(v)}
                      className="flex-1"
                    />
                    <Input
                      type="number"
                      min={0}
                      value={privateScholarships}
                      onChange={(e) =>
                        setPrivateScholarships(Number(e.target.value))
                      }
                      className="w-24"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Results Section */}
      <div className="space-y-6">
        {/* Winner Banner */}
        {winner !== "tie" && (
          <div className={`rounded-lg p-6 text-center border-2 `}>
            <h2 className="mb-2 font-bold text-2xl">
              🏆{" "}
              {winner === "public"
                ? "Public College Wins!"
                : "Private College Wins!"}
            </h2>
            <p className="text-lg">
              {winner === "public" ? "Public college" : "Private college"} is
              more affordable by{" "}
              <strong>
                $
                {savings.toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })}
              </strong>
              over {years} years.
            </p>
          </div>
        )}

        {winner === "tie" && (
          <div className="p-6 border-2 border-gray-300 rounded-lg text-center">
            <h2 className="mb-2 font-bold text-2xl">🤝 It's a Tie!</h2>
            <p className="text-lg">
              Both options have similar net costs. Consider other factors like
              academic programs, campus life, and career outcomes.
            </p>
          </div>
        )}

        {/* Results Comparison */}
        <div className="gap-6 grid md:grid-cols-2">
          <div
            className={`rounded-lg border-2 p-6 ${
              winner === "public" ? " " : " "
            }`}
          >
            <div className="flex gap-3 items-center mb-4">
              <div className="rounded-full h-3 w-3 0"></div>
              <h3 className="font-semibold text-xl">Public College</h3>
              {winner === "public" && <span className="font-bold">WINNER</span>}
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="">Net Cost ({years} years):</span>
                <span className="font-bold text-lg">
                  $
                  {publicCost.net.toLocaleString(undefined, {
                    maximumFractionDigits: 0,
                  })}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="">Gross Cost:</span>
                <span className="font-bold">
                  $
                  {publicCost.gross.toLocaleString(undefined, {
                    maximumFractionDigits: 0,
                  })}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="">Scholarships/Grants:</span>
                <span className="font-bold">
                  -$
                  {publicScholarships.toLocaleString(undefined, {
                    maximumFractionDigits: 0,
                  })}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="">Annual Net Cost:</span>
                <span className="font-bold">
                  $
                  {(publicCost.net / years).toLocaleString(undefined, {
                    maximumFractionDigits: 0,
                  })}
                  /year
                </span>
              </div>
            </div>
          </div>

          <div className={`rounded-lg border-2 p-6 `}>
            <div className="flex gap-3 items-center mb-4">
              <div className="rounded-full h-3 w-3"></div>
              <h3 className="font-semibold text-xl">Private College</h3>
              {winner === "private" && (
                <span className="font-bold">WINNER</span>
              )}
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="">Net Cost ({years} years):</span>
                <span className="font-bold text-lg">
                  $
                  {privateCost.net.toLocaleString(undefined, {
                    maximumFractionDigits: 0,
                  })}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="">Gross Cost:</span>
                <span className="font-bold">
                  $
                  {privateCost.gross.toLocaleString(undefined, {
                    maximumFractionDigits: 0,
                  })}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="">Scholarships/Grants:</span>
                <span className="font-bold">
                  -$
                  {privateScholarships.toLocaleString(undefined, {
                    maximumFractionDigits: 0,
                  })}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="">Annual Net Cost:</span>
                <span className="font-bold">
                  $
                  {(privateCost.net / years).toLocaleString(undefined, {
                    maximumFractionDigits: 0,
                  })}
                  /year
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Comparison Table */}
        <div className="shadow-sm p-6 border rounded-lg">
          <h3 className="mb-4 font-semibold text-xl">
            Detailed Cost Breakdown
          </h3>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold">
                    Cost Component
                  </TableHead>
                  <TableHead className="font-semibold">
                    Public College
                  </TableHead>
                  <TableHead className="font-semibold">
                    Private College
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">
                    Tuition (per year)
                  </TableCell>
                  <TableCell className="">
                    ${publicTuition.toLocaleString()}
                  </TableCell>
                  <TableCell className="">
                    ${privateTuition.toLocaleString()}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    Room & Board (per year)
                  </TableCell>
                  <TableCell className="">
                    ${publicRoomBoard.toLocaleString()}
                  </TableCell>
                  <TableCell className="">
                    ${privateRoomBoard.toLocaleString()}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Fees (per year)</TableCell>
                  <TableCell className="">
                    ${publicFees.toLocaleString()}
                  </TableCell>
                  <TableCell className="">
                    ${privateFees.toLocaleString()}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    Total Annual Cost
                  </TableCell>
                  <TableCell className="font-semibold">
                    $
                    {(
                      publicTuition +
                      publicRoomBoard +
                      publicFees
                    ).toLocaleString()}
                  </TableCell>
                  <TableCell className="font-semibold">
                    $
                    {(
                      privateTuition +
                      privateRoomBoard +
                      privateFees
                    ).toLocaleString()}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    Scholarships/Grants (total)
                  </TableCell>
                  <TableCell className="font-semibold">
                    ${publicScholarships.toLocaleString()}
                  </TableCell>
                  <TableCell className="font-semibold">
                    ${privateScholarships.toLocaleString()}
                  </TableCell>
                </TableRow>
                <TableRow className="">
                  <TableCell className="font-bold">
                    Net Cost ({years} years)
                  </TableCell>
                  <TableCell className="font-bold text-lg">
                    ${publicCost.net.toLocaleString()}
                  </TableCell>
                  <TableCell className="font-bold text-lg">
                    ${privateCost.net.toLocaleString()}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Important Considerations */}
        <div className="p-6 border rounded-lg">
          <h3 className="flex gap-2 items-center mb-3 font-semibold text-lg">
            ⚠️ Important Considerations Beyond Cost
          </h3>
          <div className="gap-4 grid md:grid-cols-2 text-sm">
            <div>
              <h4 className="mb-2 font-semibold">Academic Factors:</h4>
              <ul className="space-y-1">
                <li>Program rankings and quality</li>
                <li>Faculty-to-student ratios</li>
                <li>Research opportunities</li>
                <li>Graduation and employment rates</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-2 font-semibold">Personal Factors:</h4>
              <ul className="space-y-1">
                <li>Campus culture and fit</li>
                <li>Location and distance from home</li>
                <li>Alumni network strength</li>
                <li>Career services and internship opportunities</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="p-6 border rounded-lg">
          <h3 className="mb-3 font-semibold text-lg">📋 Disclaimer</h3>
          <div className="space-y-2 text-sm">
            <p>
              <strong>Important:</strong> This calculator provides estimates for
              educational purposes only. Actual costs, financial aid, and
              scholarship amounts may vary significantly.
            </p>
            <p>
              Consider additional costs like textbooks, transportation, personal
              expenses, and potential cost increases over time. Financial aid
              packages can change annually.
            </p>
            <p>
              <strong>Professional Advice:</strong> Consult with college
              financial aid offices and financial advisors for personalized
              guidance on college financing decisions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
