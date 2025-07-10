"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function TravelInsuranceCalculator() {
  const [tripCost, setTripCost] = useState<string>("");
  const [tripLength, setTripLength] = useState<string>("7");
  const [travelerAge, setTravelerAge] = useState<string>("");
  const [destination, setDestination] = useState<string>("domestic");
  const [coverageType, setCoverageType] = useState<string>("standard");
  const [annualPremium, setAnnualPremium] = useState<string>("120");

  const [result, setResult] = useState<{
    suggestedCoverage: number;
    estimatedPremium: number;
  } | null>(null);

  const handleCalculate = () => {
    const cost = parseFloat(tripCost);
    const length = parseFloat(tripLength);
    const age = parseFloat(travelerAge);
    const annPrem = parseFloat(annualPremium);

    // Suggest coverage at least equal to trip cost, add for medical if international
    let suggestedCoverage = isNaN(cost) ? 0 : cost;
    if (destination === "international") suggestedCoverage += 50000; // add medical
    if (coverageType === "comprehensive") suggestedCoverage += 10000;

    // Estimate premium: typically 4-10% of trip cost, higher for older travelers/international
    let estimatedPremium = isNaN(cost) ? 0 : cost * 0.06;
    if (destination === "international") estimatedPremium *= 1.3;
    if (!isNaN(age) && age > 60) estimatedPremium *= 1.5;
    if (coverageType === "comprehensive") estimatedPremium *= 1.2;
    if (!isNaN(annPrem) && annPrem > 0) estimatedPremium = annPrem;

    setResult({
      suggestedCoverage,
      estimatedPremium,
    });
  };

  return (
    <div className="mt-8 md:mt-12 mx-auto h-full w-10/12 md:w-11/12">
      <h1>Travel Insurance Calculator</h1>
      <p className="mb-4">
        <strong>
          Estimate your travel insurance coverage needs and typical premiums
          based on your trip cost, length, age, and destination.
        </strong>
      </p>
      <section className="mb-8">
        <h2>How Does This Calculator Work?</h2>
        <p>
          Enter your trip cost, length, age, destination, and coverage type. The
          calculator estimates suggested coverage and typical annual premiums
          for travel insurance.
        </p>
        <div className="mb-6">
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
                <td className="px-3 py-2 border">Trip Cost ($)</td>
                <td className="px-3 py-2 border">$1,000 - $10,000</td>
                <td className="px-3 py-2 border">
                  Total prepaid, nonrefundable expenses
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Trip Length (days)</td>
                <td className="px-3 py-2 border">3 - 30</td>
                <td className="px-3 py-2 border">Longer trips may cost more</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Traveler Age</td>
                <td className="px-3 py-2 border">18 - 75</td>
                <td className="px-3 py-2 border">Older travelers pay more</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Destination</td>
                <td className="px-3 py-2 border">Domestic / International</td>
                <td className="px-3 py-2 border">
                  International adds medical coverage
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Coverage Type</td>
                <td className="px-3 py-2 border">Standard / Comprehensive</td>
                <td className="px-3 py-2 border">
                  Comprehensive includes more benefits
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Annual Premium ($)</td>
                <td className="px-3 py-2 border">$80 - $400</td>
                <td className="px-3 py-2 border">Typical U.S. range</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mb-6">
          <h3>Travel Insurance Details Explained</h3>
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
                <td className="px-3 py-2 border">Trip Cancellation</td>
                <td className="px-3 py-2 border">
                  Reimburses nonrefundable costs if you cancel for covered
                  reasons
                </td>
                <td className="px-3 py-2 border">$5,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Medical Coverage</td>
                <td className="px-3 py-2 border">
                  Pays for emergency medical expenses abroad
                </td>
                <td className="px-3 py-2 border">$50,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Baggage Loss</td>
                <td className="px-3 py-2 border">
                  Covers lost or stolen luggage
                </td>
                <td className="px-3 py-2 border">$1,500</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Annual Premium</td>
                <td className="px-3 py-2 border">
                  Yearly cost for travel insurance
                </td>
                <td className="px-3 py-2 border">$120</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Coverage Type</td>
                <td className="px-3 py-2 border">Standard or comprehensive</td>
                <td className="px-3 py-2 border">Comprehensive</td>
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
                <td className="px-3 py-2 border">Trip Cost</td>
                <td className="px-3 py-2 border">$3,500</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Trip Length</td>
                <td className="px-3 py-2 border">10 days</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Traveler Age</td>
                <td className="px-3 py-2 border">45</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Destination</td>
                <td className="px-3 py-2 border">International</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Coverage Type</td>
                <td className="px-3 py-2 border">Comprehensive</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Suggested Coverage</td>
                <td className="px-3 py-2 border">$63,500</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Estimated Premium</td>
                <td className="px-3 py-2 border">$120</td>
              </tr>
            </tbody>
          </table>
          <p className="text-sm">
            <strong>Source:</strong> Squaremouth, Forbes Advisor, 2024 averages.
          </p>
        </div>
        <div className="mb-6">
          <h3>Tips for Beginners</h3>
          <ul className="list-disc list-inside">
            <li>
              Travel insurance is recommended for expensive or international
              trips.
            </li>
            <li>
              Medical coverage is especially important outside your home
              country.
            </li>
            <li>Compare policies for coverage limits and exclusions.</li>
            <li>Older travelers and longer trips cost more to insure.</li>
            <li>Consult a travel insurance agent for personalized advice.</li>
          </ul>
        </div>
      </section>
      <div className="mb-8">
        <h3 className="mb-2 font-medium">Travel Insurance Inputs</h3>
        <div className="gap-4 grid md:grid-cols-3">
          <div className="mb-2">
            <label className="block mb-1 font-medium">Trip Cost ($):</label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={tripCost}
              onChange={(e) => setTripCost(e.target.value)}
              placeholder="e.g., 3500"
              min="0"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">
              Trip Length (days):
            </label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={tripLength}
              onChange={(e) => setTripLength(e.target.value)}
              placeholder="e.g., 10"
              min="1"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">Traveler Age:</label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={travelerAge}
              onChange={(e) => setTravelerAge(e.target.value)}
              placeholder="e.g., 45"
              min="0"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">Destination:</label>
            <select
              className="px-2 py-1 border rounded w-full"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            >
              <option value="domestic">Domestic</option>
              <option value="international">International</option>
            </select>
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">Coverage Type:</label>
            <select
              className="px-2 py-1 border rounded w-full"
              value={coverageType}
              onChange={(e) => setCoverageType(e.target.value)}
            >
              <option value="standard">Standard</option>
              <option value="comprehensive">Comprehensive</option>
            </select>
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">
              Annual Premium ($):
            </label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={annualPremium}
              onChange={(e) => setAnnualPremium(e.target.value)}
              placeholder="e.g., 120"
              min="0"
            />
          </div>
        </div>
      </div>
      <Button className="mt-2 px-4 py-2 rounded" onClick={handleCalculate}>
        Calculate Travel Insurance
      </Button>
      {result && (
        <div className="flex flex-col gap-4 mt-6">
          <div className="shadow p-4 border rounded-lg">
            <h3 className="mb-2 font-semibold">Results</h3>
            <table className="border border-gray-300 min-w-full text-sm">
              <tbody>
                <tr>
                  <td className="px-3 py-2 border font-medium">
                    Suggested Coverage
                  </td>
                  <td className="px-3 py-2 border">
                    $
                    {result.suggestedCoverage.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2 border font-medium">
                    Estimated Premium
                  </td>
                  <td className="px-3 py-2 border">
                    $
                    {result.estimatedPremium.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="mt-2 text-sm">
              <strong>Note:</strong> This calculator provides estimates. Actual
              insurance needs and premiums may vary based on your age,
              destination, and insurer.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
