"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";

function calcFreelanceNet({
  hourly,
  hours,
  weeks,
  expenses,
  taxRate,
}: {
  hourly: number;
  hours: number;
  weeks: number;
  expenses: number;
  taxRate: number;
}) {
  const gross = hourly * hours * weeks;
  const taxable = Math.max(gross - expenses, 0);
  const taxes = taxable * (taxRate / 100);
  const net = taxable - taxes;
  return { gross, net: Math.round(net) };
}

function calcFullTimeNet({
  salary,
  benefits,
  taxRate,
}: {
  salary: number;
  benefits: number;
  taxRate: number;
}) {
  const taxable = salary;
  const taxes = taxable * (taxRate / 100);
  const net = salary - taxes + benefits;
  return { gross: salary + benefits, net: Math.round(net) };
}

export default function FreelanceVsFullTimeIncome() {
  const [freelanceHourly, setFreelanceHourly] = useState<number>(60);
  const [freelanceHours, setFreelanceHours] = useState<number>(30);
  const [freelanceWeeks, setFreelanceWeeks] = useState<number>(48);
  const [freelanceExpenses, setFreelanceExpenses] = useState<number>(5000);
  const [freelanceTax, setFreelanceTax] = useState<number>(25);

  const [fullTimeSalary, setFullTimeSalary] = useState<number>(90000);
  const [fullTimeBenefits, setFullTimeBenefits] = useState<number>(10000);
  const [fullTimeTax, setFullTimeTax] = useState<number>(22);

  const [result, setResult] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      freelanceHourly < 0 ||
      freelanceHours < 0 ||
      freelanceWeeks < 0 ||
      freelanceExpenses < 0 ||
      freelanceTax < 0 ||
      fullTimeSalary < 0 ||
      fullTimeBenefits < 0 ||
      fullTimeTax < 0
    ) {
      setResult("Please enter valid, non-negative values for all fields.");
      return;
    }
    const freelance = calcFreelanceNet({
      hourly: freelanceHourly,
      hours: freelanceHours,
      weeks: freelanceWeeks,
      expenses: freelanceExpenses,
      taxRate: freelanceTax,
    });
    const fulltime = calcFullTimeNet({
      salary: fullTimeSalary,
      benefits: fullTimeBenefits,
      taxRate: fullTimeTax,
    });

    let recommendation = "";
    if (freelance.net > fulltime.net) {
      recommendation =
        "Freelancing could provide a higher net annual income, but consider job security, benefits, and work-life balance.";
    } else if (freelance.net < fulltime.net) {
      recommendation =
        "Full-time employment could provide a higher net annual income, along with benefits and stability.";
    } else {
      recommendation =
        "Both options may provide similar net annual income. Consider other factors such as flexibility, benefits, and job security.";
    }

    setResult(
      `Freelance (Estimated Net Annual Income): $${freelance.net.toLocaleString()}
Full-Time (Estimated Net Annual Income + Benefits): $${fulltime.net.toLocaleString()}

${recommendation}`
    );
  };

  return (
    <div className="mx-auto pt-6 sm:pt-12 lg:pt-16 pb-24 lg:pb-32 w-10/12 md:w-11/12">
      <h1>Freelance vs Full-Time Employment Income</h1>
      <h5>Compare Your Potential Net Income</h5>
      <p>
        Use this tool to estimate your net annual income as a freelancer versus
        a full-time employee. Enter your expected freelance rates, expenses, and
        tax rate, as well as your full-time salary, benefits, and tax rate. This
        tool provides estimates for informational purposes only. Actual income,
        taxes, and benefits may vary. Consult a financial advisor or tax
        professional for personalized advice.
      </p>
      <form
        onSubmit={handleSubmit}
        className="space-y-5 mt-5"
        aria-label="Freelance vs Full-Time Income form"
      >
        <div className="mb-4 pb-4 border-b">
          <h4 className="mb-3">Freelance Income</h4>
          <div className="flex gap-2 mb-2">
            <div className="flex-1">
              <Label className="block mb-1">Hourly Rate ($)</Label>
              <Input
                type="number"
                min={0}
                placeholder="Hourly Rate ($)"
                value={freelanceHourly === 0 ? "" : freelanceHourly}
                onChange={(e) => setFreelanceHourly(Number(e.target.value))}
                className="p-2 border border-gray-300 rounded w-full"
                required
              />
            </div>
            <div className="flex-1">
              <Label className="block mb-1">Hours/Week</Label>
              <Input
                type="number"
                min={0}
                placeholder="Hours/Week"
                value={freelanceHours === 0 ? "" : freelanceHours}
                onChange={(e) => setFreelanceHours(Number(e.target.value))}
                className="p-2 border border-gray-300 rounded w-full"
                required
              />
            </div>
            <div className="flex-1">
              <Label className="block mb-1">Weeks/Year</Label>
              <Input
                type="number"
                min={0}
                placeholder="Weeks/Year"
                value={freelanceWeeks === 0 ? "" : freelanceWeeks}
                onChange={(e) => setFreelanceWeeks(Number(e.target.value))}
                className="p-2 border border-gray-300 rounded w-full"
                required
              />
            </div>
          </div>
          <div className="flex gap-2 mb-2">
            <div className="flex-1">
              <Label className="block mb-1">Estimated Expenses ($/yr)</Label>
              <Input
                type="number"
                min={0}
                placeholder="Estimated Expenses ($/yr)"
                value={freelanceExpenses === 0 ? "" : freelanceExpenses}
                onChange={(e) => setFreelanceExpenses(Number(e.target.value))}
                className="p-2 border border-gray-300 rounded w-full"
                required
              />
            </div>
            <div className="flex-1">
              <Label className="block mb-1">Self-Employment Tax Rate (%)</Label>
              <Input
                type="number"
                min={0}
                max={100}
                placeholder="Self-Employment Tax Rate (%)"
                value={freelanceTax === 0 ? "" : freelanceTax}
                onChange={(e) => setFreelanceTax(Number(e.target.value))}
                className="p-2 border border-gray-300 rounded w-full"
                required
              />
            </div>
          </div>
        </div>
        <div>
          <h4 className="mb-3">Full-Time Employment</h4>
          <div className="flex gap-2 mb-2">
            <div className="flex-1">
              <Label className="block mb-1">Annual Salary ($)</Label>
              <Input
                type="number"
                min={0}
                placeholder="Annual Salary ($)"
                value={fullTimeSalary === 0 ? "" : fullTimeSalary}
                onChange={(e) => setFullTimeSalary(Number(e.target.value))}
                className="p-2 border border-gray-300 rounded w-full"
                required
              />
            </div>
            <div className="flex-1">
              <Label className="block mb-1">Annual Benefits ($)</Label>
              <Input
                type="number"
                min={0}
                placeholder="Annual Benefits ($)"
                value={fullTimeBenefits === 0 ? "" : fullTimeBenefits}
                onChange={(e) => setFullTimeBenefits(Number(e.target.value))}
                className="p-2 border border-gray-300 rounded w-full"
                required
              />
            </div>
            <div className="flex-1">
              <Label className="block mb-1">Tax Rate (%)</Label>
              <Input
                type="number"
                min={0}
                max={100}
                placeholder="Tax Rate (%)"
                value={fullTimeTax === 0 ? "" : fullTimeTax}
                onChange={(e) => setFullTimeTax(Number(e.target.value))}
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
