"use client";

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
import React, { useState } from "react";

const HDHPvsTraditional: React.FC = () => {
  const [hdhpPremium, setHdhpPremium] = useState(250);
  const [hdhpDeductible, setHdhpDeductible] = useState(3000);
  const [hdhpOOP, setHdhpOOP] = useState(6000);
  const [hsaContribution, setHsaContribution] = useState(2000);

  const [tradPremium, setTradPremium] = useState(400);
  const [tradDeductible, setTradDeductible] = useState(1000);
  const [tradOOP, setTradOOP] = useState(4000);

  const [expectedExpenses, setExpectedExpenses] = useState(2500);

  // Calculate total annual cost for each plan
  const calcHDHPCost = () => {
    const premium = hdhpPremium * 12;
    let medical = 0;
    if (expectedExpenses <= hdhpDeductible) {
      medical = expectedExpenses;
    } else if (expectedExpenses <= hdhpOOP) {
      medical = hdhpDeductible + (expectedExpenses - hdhpDeductible);
    } else {
      medical = hdhpOOP;
    }
    // Subtract HSA contribution (tax-advantaged savings)
    return premium + medical - hsaContribution;
  };

  const calcTradCost = () => {
    const premium = tradPremium * 12;
    let medical = 0;
    if (expectedExpenses <= tradDeductible) {
      medical = expectedExpenses;
    } else if (expectedExpenses <= tradOOP) {
      medical = tradDeductible + (expectedExpenses - tradDeductible);
    } else {
      medical = tradOOP;
    }
    return premium + medical;
  };

  return (
    <div className="mx-auto pb-24 lg:pb-32 pt-6 sm:pt-12 lg:pt-16 w-10/12 md:w-11/12">
      {/* Header Section */}
      <div className="mb-8 text-center">
        <h1 className="mb-4 font-bold text-4xl">
          HDHP vs Traditional Health Plan Calculator
        </h1>
        <p className="mb-6 text-xl">
          Make informed decisions about your health insurance options
        </p>
        <p className="mx-auto max-w-3xl">
          This calculator helps you compare the total annual costs of a High
          Deductible Health Plan (HDHP) and a Traditional Health Plan based on
          your premiums, deductibles, out-of-pocket maximums, and expected
          medical expenses. Please fill out the form below to see the results.
        </p>
      </div>

      {/* Information Table */}
      <div className="shadow mb-8 border rounded-lg overflow-hidden">
        <h2 className="p-6 pb-4 font-semibold text-xl">
          Health Plan Comparison Overview
        </h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Feature</TableHead>
              <TableHead>HDHP</TableHead>
              <TableHead>Traditional Plan</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Monthly Premium</TableCell>
              <TableCell>Generally lower</TableCell>
              <TableCell>Generally higher</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Deductible</TableCell>
              <TableCell>High ($1,400+ individual, $2,800+ family)</TableCell>
              <TableCell>Lower ($500-$1,500 typical)</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">HSA Eligibility</TableCell>
              <TableCell>✅ Yes - tax advantages</TableCell>
              <TableCell>❌ No</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Best For</TableCell>
              <TableCell>Healthy individuals, emergency coverage</TableCell>
              <TableCell>Regular medical care, predictable costs</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">
                Out-of-Pocket Protection
              </TableCell>
              <TableCell>Higher maximum before full coverage</TableCell>
              <TableCell>Lower maximum before full coverage</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      {/* Calculator Form */}
      <div className="shadow mb-8 p-6 border rounded-lg">
        <h2 className="mb-6 font-semibold text-2xl">
          Plan Comparison Calculator
        </h2>

        <form onSubmit={(e) => e.preventDefault()}>
          <div className="gap-8 grid grid-cols-1 lg:grid-cols-2">
            {/* HDHP Section */}
            <div className="p-6 border rounded-lg">
              <h3 className="flex gap-2 items-center mb-6 font-semibold text-xl">
                🏥 High Deductible Health Plan (HDHP)
              </h3>
              <div className="space-y-6">
                <div>
                  <Label className="font-medium text-sm">
                    Monthly Premium: ${hdhpPremium}
                  </Label>
                  <Slider
                    value={[hdhpPremium]}
                    onValueChange={(value) => setHdhpPremium(value[0])}
                    max={800}
                    min={50}
                    step={10}
                    className="mt-2"
                  />
                  <div className="flex justify-between mt-1 text-xs">
                    <span>$50</span>
                    <span>$800</span>
                  </div>
                </div>

                <div>
                  <Label className="font-medium text-sm">
                    Annual Deductible: ${hdhpDeductible.toLocaleString()}
                  </Label>
                  <Slider
                    value={[hdhpDeductible]}
                    onValueChange={(value) => setHdhpDeductible(value[0])}
                    max={15000}
                    min={1400}
                    step={100}
                    className="mt-2"
                  />
                  <div className="flex justify-between mt-1 text-xs">
                    <span>$1,400</span>
                    <span>$15,000</span>
                  </div>
                </div>

                <div>
                  <Label className="font-medium text-sm">
                    Out-of-Pocket Maximum: ${hdhpOOP.toLocaleString()}
                  </Label>
                  <Slider
                    value={[hdhpOOP]}
                    onValueChange={(value) => setHdhpOOP(value[0])}
                    max={20000}
                    min={2000}
                    step={250}
                    className="mt-2"
                  />
                  <div className="flex justify-between mt-1 text-xs">
                    <span>$2,000</span>
                    <span>$20,000</span>
                  </div>
                </div>

                <div>
                  <Label className="font-medium text-sm">
                    Annual HSA Contribution: ${hsaContribution.toLocaleString()}
                  </Label>
                  <Slider
                    value={[hsaContribution]}
                    onValueChange={(value) => setHsaContribution(value[0])}
                    max={4300}
                    min={0}
                    step={100}
                    className="mt-2"
                  />
                  <div className="flex justify-between mt-1 text-xs">
                    <span>$0</span>
                    <span>$4,300 (2024 limit)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Traditional Plan Section */}
            <div className="p-6 border rounded-lg">
              <h3 className="flex gap-2 items-center mb-6 font-semibold text-xl">
                🏢 Traditional Health Plan
              </h3>
              <div className="space-y-6">
                <div>
                  <Label className="font-medium text-sm">
                    Monthly Premium: ${tradPremium}
                  </Label>
                  <Slider
                    value={[tradPremium]}
                    onValueChange={(value) => setTradPremium(value[0])}
                    max={800}
                    min={50}
                    step={10}
                    className="mt-2"
                  />
                  <div className="flex justify-between mt-1 text-xs">
                    <span>$50</span>
                    <span>$800</span>
                  </div>
                </div>

                <div>
                  <Label className="font-medium text-sm">
                    Annual Deductible: ${tradDeductible.toLocaleString()}
                  </Label>
                  <Slider
                    value={[tradDeductible]}
                    onValueChange={(value) => setTradDeductible(value[0])}
                    max={5000}
                    min={0}
                    step={50}
                    className="mt-2"
                  />
                  <div className="flex justify-between mt-1 text-xs">
                    <span>$0</span>
                    <span>$5,000</span>
                  </div>
                </div>

                <div>
                  <Label className="font-medium text-sm">
                    Out-of-Pocket Maximum: ${tradOOP.toLocaleString()}
                  </Label>
                  <Slider
                    value={[tradOOP]}
                    onValueChange={(value) => setTradOOP(value[0])}
                    max={15000}
                    min={1000}
                    step={250}
                    className="mt-2"
                  />
                  <div className="flex justify-between mt-1 text-xs">
                    <span>$1,000</span>
                    <span>$15,000</span>
                  </div>
                </div>

                <div>
                  <Label className="font-medium text-sm">
                    Expected Annual Medical Expenses: $
                    {expectedExpenses.toLocaleString()}
                  </Label>
                  <Slider
                    value={[expectedExpenses]}
                    onValueChange={(value) => setExpectedExpenses(value[0])}
                    max={25000}
                    min={0}
                    step={250}
                    className="mt-2"
                  />
                  <div className="flex justify-between mt-1 text-xs">
                    <span>$0</span>
                    <span>$25,000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      {/* Results Section */}
      <div className="shadow mb-8 p-6 border rounded-lg">
        <h2 className="mb-6 font-semibold text-2xl">Results</h2>

        {/* Winner Banner */}
        {(() => {
          const hdhpCost = calcHDHPCost();
          const tradCost = calcTradCost();
          const isHDHPBetter = hdhpCost < tradCost;

          return (
            <div
              className={`p-4 rounded-lg mb-6 ${
                isHDHPBetter ? " border " : " border "
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className={`font-semibold ${isHDHPBetter ? "" : ""}`}>
                    {isHDHPBetter
                      ? "HDHP is More Cost Effective!"
                      : "Traditional Plan is More Cost Effective!"}
                  </h3>
                  <p className={`text-sm ${isHDHPBetter ? "" : ""}`}>
                    Saves you ${Math.abs(hdhpCost - tradCost).toLocaleString()}{" "}
                    annually
                  </p>
                </div>
              </div>
            </div>
          );
        })()}

        {/* Comparison Cards */}
        <div className="gap-6 grid grid-cols-1 md:grid-cols-2 mb-8">
          <div className="shadow-sm p-6 border-2 rounded-lg">
            <h3 className="flex gap-2 items-center mb-4 font-semibold text-xl">
              🏥 HDHP Net Cost
            </h3>
            <div className="space-y-3">
              {(() => {
                const annualPremium = hdhpPremium * 12;
                const totalCost = calcHDHPCost();
                const medicalCosts = (() => {
                  if (expectedExpenses <= hdhpDeductible) {
                    return expectedExpenses;
                  } else if (expectedExpenses <= hdhpOOP) {
                    return hdhpDeductible + (expectedExpenses - hdhpDeductible);
                  } else {
                    return hdhpOOP;
                  }
                })();

                return (
                  <>
                    <div className="flex items-center justify-between">
                      <span className="">Annual Premium:</span>
                      <span className="font-bold">
                        ${annualPremium.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="">Medical Expenses:</span>
                      <span className="font-bold">
                        +${medicalCosts.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="">HSA Contribution:</span>
                      <span className="font-bold">
                        -${hsaContribution.toLocaleString()}
                      </span>
                    </div>
                    <div className="pt-2 border-t">
                      <div className="flex items-center justify-between">
                        <span className="">Total Annual Cost:</span>
                        <span className="font-bold text-xl">
                          ${totalCost.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>

          <div className="shadow-sm p-6 border-2 rounded-lg">
            <h3 className="flex gap-2 items-center mb-4 font-semibold text-xl">
              🏢 Traditional Plan Cost
            </h3>
            <div className="space-y-3">
              {(() => {
                const annualPremium = tradPremium * 12;
                const totalCost = calcTradCost();
                const medicalCosts = (() => {
                  if (expectedExpenses <= tradDeductible) {
                    return expectedExpenses;
                  } else if (expectedExpenses <= tradOOP) {
                    return tradDeductible + (expectedExpenses - tradDeductible);
                  } else {
                    return tradOOP;
                  }
                })();

                return (
                  <>
                    <div className="flex items-center justify-between">
                      <span className="">Annual Premium:</span>
                      <span className="font-bold">
                        ${annualPremium.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="">Medical Expenses:</span>
                      <span className="font-bold">
                        +${medicalCosts.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="">HSA Contribution:</span>
                      <span className="font-bold">$0 (not eligible)</span>
                    </div>
                    <div className="pt-2 border-t">
                      <div className="flex items-center justify-between">
                        <span className="">Total Annual Cost:</span>
                        <span className="font-bold text-xl">
                          ${totalCost.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        </div>

        {/* Detailed Comparison Table */}
        <div className="shadow mb-8 border rounded-lg overflow-hidden">
          <h3 className="p-6 pb-4 font-semibold text-lg">
            Detailed Cost Breakdown
          </h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cost Component</TableHead>
                <TableHead className="">HDHP</TableHead>
                <TableHead className="">Traditional Plan</TableHead>
                <TableHead>Difference</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(() => {
                const hdhpAnnualPremium = hdhpPremium * 12;
                const tradAnnualPremium = tradPremium * 12;
                const hdhpMedical = (() => {
                  if (expectedExpenses <= hdhpDeductible)
                    return expectedExpenses;
                  if (expectedExpenses <= hdhpOOP)
                    return hdhpDeductible + (expectedExpenses - hdhpDeductible);
                  return hdhpOOP;
                })();
                const tradMedical = (() => {
                  if (expectedExpenses <= tradDeductible)
                    return expectedExpenses;
                  if (expectedExpenses <= tradOOP)
                    return tradDeductible + (expectedExpenses - tradDeductible);
                  return tradOOP;
                })();
                const hdhpTotal = calcHDHPCost();
                const tradTotal = calcTradCost();

                return (
                  <>
                    <TableRow>
                      <TableCell className="font-medium">
                        Annual Premium
                      </TableCell>
                      <TableCell>
                        ${hdhpAnnualPremium.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        ${tradAnnualPremium.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        {hdhpAnnualPremium < tradAnnualPremium
                          ? `$${(
                              tradAnnualPremium - hdhpAnnualPremium
                            ).toLocaleString()} lower`
                          : `$${(
                              hdhpAnnualPremium - tradAnnualPremium
                            ).toLocaleString()} higher`}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        Medical Expenses (after deductible)
                      </TableCell>
                      <TableCell>${hdhpMedical.toLocaleString()}</TableCell>
                      <TableCell>${tradMedical.toLocaleString()}</TableCell>
                      <TableCell>
                        {hdhpMedical < tradMedical
                          ? `$${(
                              tradMedical - hdhpMedical
                            ).toLocaleString()} lower`
                          : `$${(
                              hdhpMedical - tradMedical
                            ).toLocaleString()} higher`}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        HSA Tax Advantage
                      </TableCell>
                      <TableCell>
                        -${hsaContribution.toLocaleString()}
                      </TableCell>
                      <TableCell>$0</TableCell>
                      <TableCell>
                        ${hsaContribution.toLocaleString()} advantage
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        Total Annual Cost
                      </TableCell>
                      <TableCell className="font-bold text-lg">
                        ${hdhpTotal.toLocaleString()}
                      </TableCell>
                      <TableCell className="font-bold text-lg">
                        ${tradTotal.toLocaleString()}
                      </TableCell>
                      <TableCell className="font-bold">
                        {hdhpTotal < tradTotal
                          ? `$${(
                              tradTotal - hdhpTotal
                            ).toLocaleString()} savings with HDHP`
                          : `$${(
                              hdhpTotal - tradTotal
                            ).toLocaleString()} savings with Traditional`}
                      </TableCell>
                    </TableRow>
                  </>
                );
              })()}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Important Considerations */}
      <div className="mb-8 p-6 border rounded-lg">
        <h3 className="mb-3 font-semibold text-lg">
          ⚠️ Important Considerations
        </h3>
        <ul className="space-y-2">
          <li>
            <strong>HDHP Benefits:</strong> Lower premiums, HSA tax advantages,
            covers preventive care
          </li>
          <li>
            <strong>HDHP Risks:</strong> Higher out-of-pocket costs for
            unexpected medical expenses
          </li>
          <li>
            <strong>Traditional Plan Benefits:</strong> Lower deductibles, more
            predictable costs
          </li>
          <li>
            <strong>Traditional Plan Costs:</strong> Higher premiums, no HSA
            eligibility
          </li>
          <li>
            <strong>HSA Advantages:</strong> Triple tax benefit (deductible,
            growth, withdrawals for medical)
          </li>
          <li>
            <strong>Consider Your Health:</strong> Chronic conditions may favor
            traditional plans
          </li>
          <li>
            <strong>Emergency Fund:</strong> HDHPs require higher cash reserves
            for deductibles
          </li>
        </ul>
      </div>

      {/* Disclaimer */}
      <div className="p-6 border rounded-lg">
        <h3 className="mb-3 font-semibold text-lg">📋 Disclaimer</h3>
        <p className="text-sm">
          <strong>Note:</strong> This calculator provides estimates and assumes
          all medical expenses are subject to the deductible. It does not
          account for coinsurance rates, copayments, employer HSA contributions,
          specific tax brackets, or individual tax situations. Actual costs may
          vary based on your specific plan details, network providers, and
          medical needs. Please consult with your benefits administrator and tax
          advisor for personalized advice.
        </p>
      </div>
    </div>
  );
};

export default HDHPvsTraditional;
