"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function HomeownersAndRentersInsuranceCalculator() {
  const [propertyType, setPropertyType] = useState<"homeowner" | "renter">(
    "homeowner"
  );
  const [propertyValue, setPropertyValue] = useState<string>("");
  const [personalProperty, setPersonalProperty] = useState<string>("");
  const [locationRisk, setLocationRisk] = useState<string>("average");
  const [deductible, setDeductible] = useState<string>("1000");
  const [coverageAmount, setCoverageAmount] = useState<string>("");
  const [annualPremium, setAnnualPremium] = useState<string>("1200");

  const [result, setResult] = useState<{
    suggestedCoverage: number;
    estimatedPremium: number;
  } | null>(null);

  const handleCalculate = () => {
    let suggestedCoverage = 0;
    let estimatedPremium = 0;
    const propVal = parseFloat(propertyValue);
    const persProp = parseFloat(personalProperty);
    const ded = parseFloat(deductible);
    const covAmt = parseFloat(coverageAmount);
    const annPrem = parseFloat(annualPremium);

    if (propertyType === "homeowner") {
      // Suggest coverage at least equal to property value + personal property
      if (!isNaN(propVal) && !isNaN(persProp)) {
        suggestedCoverage = propVal + persProp;
      }
      // Estimate premium based on risk and deductible
      estimatedPremium = isNaN(annPrem) ? 0 : annPrem;
      if (locationRisk === "high") estimatedPremium *= 1.2;
      if (locationRisk === "low") estimatedPremium *= 0.85;
      if (!isNaN(ded) && ded > 1000) estimatedPremium *= 0.95;
    } else {
      // Renters: suggest coverage for personal property only
      if (!isNaN(persProp)) {
        suggestedCoverage = persProp;
      }
      estimatedPremium = isNaN(annPrem) ? 0 : annPrem;
      if (locationRisk === "high") estimatedPremium *= 1.15;
      if (locationRisk === "low") estimatedPremium *= 0.9;
      if (!isNaN(ded) && ded > 500) estimatedPremium *= 0.95;
    }

    setResult({
      suggestedCoverage,
      estimatedPremium,
    });
  };

  return (
    <div className="mt-8 md:mt-12 mx-auto h-full w-10/12 md:w-11/12">
      <h1>Homeowners & Renters Insurance Calculator</h1>
      <p className="mb-4">
        <strong>
          Estimate your insurance needs and annual premiums for homeowners or
          renters insurance based on your property value, personal belongings,
          location, and deductible.
        </strong>
      </p>
      <section className="mb-8">
        <h2>How Does This Calculator Work?</h2>
        <p>
          Select whether you are a homeowner or renter, then enter your property
          value, personal property value, location risk, deductible, and current
          premium. The calculator estimates suggested coverage and typical
          annual premiums.
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
                <td className="px-3 py-2 border">Property Type</td>
                <td className="px-3 py-2 border">Homeowner / Renter</td>
                <td className="px-3 py-2 border">Choose your situation</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Property Value ($)</td>
                <td className="px-3 py-2 border">$200,000 - $800,000</td>
                <td className="px-3 py-2 border">
                  Home value (homeowners only)
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Personal Property ($)</td>
                <td className="px-3 py-2 border">$20,000 - $100,000</td>
                <td className="px-3 py-2 border">Value of belongings</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Location Risk</td>
                <td className="px-3 py-2 border">Low / Average / High</td>
                <td className="px-3 py-2 border">
                  Flood, crime, wildfire risk
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Deductible ($)</td>
                <td className="px-3 py-2 border">$500 - $2,500</td>
                <td className="px-3 py-2 border">
                  Higher deductible lowers premium
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Coverage Amount ($)</td>
                <td className="px-3 py-2 border">$50,000 - $900,000</td>
                <td className="px-3 py-2 border">Desired total coverage</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Annual Premium ($)</td>
                <td className="px-3 py-2 border">$150 - $2,500</td>
                <td className="px-3 py-2 border">Typical U.S. range</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mb-6">
          <h3>Insurance Details Explained</h3>
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
                <td className="px-3 py-2 border">Dwelling Coverage</td>
                <td className="px-3 py-2 border">
                  Covers rebuilding your home
                </td>
                <td className="px-3 py-2 border">$350,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Personal Property</td>
                <td className="px-3 py-2 border">
                  Covers belongings (furniture, electronics, etc.)
                </td>
                <td className="px-3 py-2 border">$50,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Deductible</td>
                <td className="px-3 py-2 border">
                  Amount you pay before insurance pays
                </td>
                <td className="px-3 py-2 border">$1,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Annual Premium</td>
                <td className="px-3 py-2 border">Yearly cost for insurance</td>
                <td className="px-3 py-2 border">$1,200</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Location Risk</td>
                <td className="px-3 py-2 border">
                  Risk of flood, wildfire, or crime
                </td>
                <td className="px-3 py-2 border">Average</td>
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
                <th className="px-3 py-2 border text-left">Homeowner</th>
                <th className="px-3 py-2 border text-left">Renter</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-3 py-2 border">Property Value</td>
                <td className="px-3 py-2 border">$350,000</td>
                <td className="px-3 py-2 border">-</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Personal Property</td>
                <td className="px-3 py-2 border">$50,000</td>
                <td className="px-3 py-2 border">$30,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Location Risk</td>
                <td className="px-3 py-2 border">Average</td>
                <td className="px-3 py-2 border">Average</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Deductible</td>
                <td className="px-3 py-2 border">$1,000</td>
                <td className="px-3 py-2 border">$500</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Coverage Amount</td>
                <td className="px-3 py-2 border">$400,000</td>
                <td className="px-3 py-2 border">$30,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Annual Premium</td>
                <td className="px-3 py-2 border">$1,200</td>
                <td className="px-3 py-2 border">$200</td>
              </tr>
            </tbody>
          </table>
          <p className="text-sm">
            <strong>Source:</strong> Insurance.com, ValuePenguin, 2024 averages.
          </p>
        </div>
        <div className="mb-6">
          <h3>Tips for Beginners</h3>
          <ul className="list-disc list-inside">
            <li>
              Homeowners should insure for the full cost to rebuild, not just
              market value.
            </li>
            <li>
              Renters insurance covers your belongings, not the building itself.
            </li>
            <li>
              Higher deductibles lower your premium but increase out-of-pocket
              costs if you file a claim.
            </li>
            <li>
              Location risk (flood, wildfire, crime) can raise your premium.
            </li>
            <li>Review your coverage annually and shop for quotes.</li>
          </ul>
        </div>
      </section>
      <div className="mb-8">
        <h3>Insurance Inputs</h3>
        <div className="gap-4 grid md:grid-cols-3">
          <div className="mb-2">
            <label className="block mb-1 font-medium">Property Type:</label>
            <select
              className="px-2 py-1 border rounded w-full"
              value={propertyType}
              onChange={(e) =>
                setPropertyType(e.target.value as "homeowner" | "renter")
              }
            >
              <option value="homeowner">Homeowner</option>
              <option value="renter">Renter</option>
            </select>
          </div>
          {propertyType === "homeowner" && (
            <div className="mb-2">
              <label className="block mb-1 font-medium">
                Property Value ($):
              </label>
              <input
                type="number"
                className="px-2 py-1 border rounded w-full"
                value={propertyValue}
                onChange={(e) => setPropertyValue(e.target.value)}
                placeholder="e.g., 350000"
                min="0"
              />
            </div>
          )}
          <div className="mb-2">
            <label className="block mb-1 font-medium">
              Personal Property ($):
            </label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={personalProperty}
              onChange={(e) => setPersonalProperty(e.target.value)}
              placeholder="e.g., 50000"
              min="0"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">Location Risk:</label>
            <select
              className="px-2 py-1 border rounded w-full"
              value={locationRisk}
              onChange={(e) => setLocationRisk(e.target.value)}
            >
              <option value="low">Low</option>
              <option value="average">Average</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">Deductible ($):</label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={deductible}
              onChange={(e) => setDeductible(e.target.value)}
              placeholder="e.g., 1000"
              min="0"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">
              Coverage Amount ($):
            </label>
            <input
              type="number"
              className="px-2 py-1 border rounded w-full"
              value={coverageAmount}
              onChange={(e) => setCoverageAmount(e.target.value)}
              placeholder="e.g., 400000"
              min="0"
            />
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
              placeholder="e.g., 1200"
              min="0"
            />
          </div>
        </div>
      </div>
      <Button className="mt-2 px-4 py-2 rounded" onClick={handleCalculate}>
        Calculate Insurance Needs
      </Button>
      {result && (
        <div className="flex flex-col gap-4 mt-6">
          <div className="shadow p-4 border rounded-lg">
            <h3>Results</h3>
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
                    Estimated Annual Premium
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
              insurance needs and premiums may vary based on your location,
              insurer, and coverage options.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
