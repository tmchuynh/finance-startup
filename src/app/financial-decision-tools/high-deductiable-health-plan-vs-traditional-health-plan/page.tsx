"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
    <div className="mx-auto pt-6 sm:pt-12 lg:pt-16 pb-24 lg:pb-32 w-10/12 md:w-11/12">
      <h1>HDHP vs Traditional Health Plan Calculator</h1>
      <h5>Make informed decisions about your health insurance options</h5>
      <p>
        This calculator helps you compare the total annual costs of a High
        Deductible Health Plan (HDHP) and a Traditional Health Plan based on
        your premiums, deductibles, out-of-pocket maximums, and expected medical
        expenses. Please fill out the form below to see the results.
      </p>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="gap-4 grid md:grid-cols-2 my-5"
      >
        <div>
          <h2>HDHP</h2>
          <div className="space-y-3 mt-5">
            <div>
              <Label>Monthly Premium ($)</Label>
              <Input
                type="number"
                value={hdhpPremium}
                min={0}
                onChange={(e) => setHdhpPremium(Number(e.target.value))}
              />
            </div>

            <div>
              <Label>Deductible ($)</Label>
              <Input
                type="number"
                value={hdhpDeductible}
                min={0}
                onChange={(e) => setHdhpDeductible(Number(e.target.value))}
              />
            </div>

            <div>
              <Label>Out-of-Pocket Max ($)</Label>
              <Input
                type="number"
                value={hdhpOOP}
                min={0}
                onChange={(e) => setHdhpOOP(Number(e.target.value))}
              />
            </div>

            <div>
              <Label>Annual HSA Contribution ($)</Label>
              <Input
                type="number"
                value={hsaContribution}
                min={0}
                onChange={(e) => setHsaContribution(Number(e.target.value))}
              />
            </div>
          </div>
        </div>
        <div>
          <h2>Traditional Plan</h2>
          <div className="space-y-3 mt-5">
            <div>
              <Label>Monthly Premium ($)</Label>
              <Input
                type="number"
                value={tradPremium}
                min={0}
                onChange={(e) => setTradPremium(Number(e.target.value))}
              />
            </div>

            <div>
              <Label>Deductible ($)</Label>
              <Input
                type="number"
                value={tradDeductible}
                min={0}
                onChange={(e) => setTradDeductible(Number(e.target.value))}
              />
            </div>

            <div>
              <Label>Out-of-Pocket Max ($)</Label>
              <Input
                type="number"
                value={tradOOP}
                min={0}
                onChange={(e) => setTradOOP(Number(e.target.value))}
              />
            </div>
            <div>
              <Label>Expected Medical Expenses (annual $)</Label>
              <Input
                type="number"
                value={expectedExpenses}
                min={0}
                onChange={(e) => setExpectedExpenses(Number(e.target.value))}
              />
            </div>
          </div>
        </div>
      </form>
      <div>
        <h2>Results</h2>
        <div className="flex flex-col gap-5 mt-3">
          <div>
            <h3>HDHP Net Cost</h3>
            <p>
              <strong>
                $
                {calcHDHPCost().toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })}
              </strong>
            </p>
          </div>
          <div>
            <h3>Traditional Plan Cost</h3>
            <p>
              <strong>
                $
                {calcTradCost().toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })}
              </strong>
            </p>
          </div>
        </div>
      </div>
      <p className="mt-5">
        Note: This calculator assumes all medical expenses are subject to the
        deductible and does not account for coinsurance, employer HSA
        contributions, or tax effects.
      </p>
    </div>
  );
};

export default HDHPvsTraditional;
