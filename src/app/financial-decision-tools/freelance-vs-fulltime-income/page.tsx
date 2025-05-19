"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useEffect, useState } from "react";

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

  useEffect(() => {
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
  }, [
    freelanceHourly,
    freelanceHours,
    freelanceWeeks,
    freelanceExpenses,
    freelanceTax,
    fullTimeSalary,
    fullTimeBenefits,
    fullTimeTax,
  ]);

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

      {/* Table: Typical Income and Benefits */}
      <div className="my-8">
        <h2>Typical Income & Benefits (2024)</h2>
        <div className="overflow-x-auto">
          <table className="border border-gray-300 min-w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-3 py-2 border text-left">Type</th>
                <th className="px-3 py-2 border text-left">Annual Range</th>
                <th className="px-3 py-2 border text-left">Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-3 py-2 border">Freelance Hourly Rate</td>
                <td className="px-3 py-2 border">$30 - $150/hr</td>
                <td className="px-3 py-2 border">
                  Varies by field and experience
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Full-Time Salary</td>
                <td className="px-3 py-2 border">$50,000 - $150,000</td>
                <td className="px-3 py-2 border">Plus benefits</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Benefits Value</td>
                <td className="px-3 py-2 border">$5,000 - $20,000</td>
                <td className="px-3 py-2 border">
                  Health, retirement, PTO, etc.
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Self-Employment Tax Rate</td>
                <td className="px-3 py-2 border">15% - 30%</td>
                <td className="px-3 py-2 border">
                  Includes Social Security/Medicare
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
                <td className="px-3 py-2 border">Freelance</td>
                <td className="px-3 py-2 border">
                  Flexibility
                  <br />
                  Set your own rates
                  <br />
                  Potential for higher income
                </td>
                <td className="px-3 py-2 border">
                  No benefits
                  <br />
                  Income instability
                  <br />
                  Responsible for own taxes
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Full-Time</td>
                <td className="px-3 py-2 border">
                  Benefits
                  <br />
                  Stable income
                  <br />
                  Employer handles taxes
                </td>
                <td className="px-3 py-2 border">
                  Less flexibility
                  <br />
                  Limited earning potential
                  <br />
                  Less control over work
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <form
        className="space-y-5 mt-5"
        aria-label="Freelance vs Full-Time Income form"
      >
        <div className="mb-4 pb-4 border-b">
          <h4 className="mb-3">Freelance Income</h4>
          <div className="flex gap-2 mb-2">
            <div className="flex-1">
              <Label className="block mb-1">Hourly Rate ($)</Label>
              <div className="flex gap-2">
                <Slider
                  min={0}
                  max={300}
                  step={1}
                  value={[freelanceHourly]}
                  onValueChange={([v]) => setFreelanceHourly(v)}
                  className="w-2/3"
                />
                <Input
                  type="number"
                  min={0}
                  placeholder="Hourly Rate ($)"
                  value={freelanceHourly === 0 ? "" : freelanceHourly}
                  onChange={(e) => setFreelanceHourly(Number(e.target.value))}
                  className="w-1/3"
                  required
                />
              </div>
            </div>
            <div className="flex-1">
              <Label className="block mb-1">Hours/Week</Label>
              <div className="flex gap-2">
                <Slider
                  min={0}
                  max={80}
                  step={1}
                  value={[freelanceHours]}
                  onValueChange={([v]) => setFreelanceHours(v)}
                  className="w-2/3"
                />
                <Input
                  type="number"
                  min={0}
                  placeholder="Hours/Week"
                  value={freelanceHours === 0 ? "" : freelanceHours}
                  onChange={(e) => setFreelanceHours(Number(e.target.value))}
                  className="w-1/3"
                  required
                />
              </div>
            </div>
            <div className="flex-1">
              <Label className="block mb-1">Weeks/Year</Label>
              <div className="flex gap-2">
                <Slider
                  min={0}
                  max={52}
                  step={1}
                  value={[freelanceWeeks]}
                  onValueChange={([v]) => setFreelanceWeeks(v)}
                  className="w-2/3"
                />
                <Input
                  type="number"
                  min={0}
                  placeholder="Weeks/Year"
                  value={freelanceWeeks === 0 ? "" : freelanceWeeks}
                  onChange={(e) => setFreelanceWeeks(Number(e.target.value))}
                  className="w-1/3"
                  required
                />
              </div>
            </div>
          </div>
          <div className="flex gap-2 mb-2">
            <div className="flex-1">
              <Label className="block mb-1">Estimated Expenses ($/yr)</Label>
              <div className="flex gap-2">
                <Slider
                  min={0}
                  max={50000}
                  step={500}
                  value={[freelanceExpenses]}
                  onValueChange={([v]) => setFreelanceExpenses(v)}
                  className="w-2/3"
                />
                <Input
                  type="number"
                  min={0}
                  placeholder="Estimated Expenses ($/yr)"
                  value={freelanceExpenses === 0 ? "" : freelanceExpenses}
                  onChange={(e) => setFreelanceExpenses(Number(e.target.value))}
                  className="w-1/3"
                  required
                />
              </div>
            </div>
            <div className="flex-1">
              <Label className="block mb-1">Self-Employment Tax Rate (%)</Label>
              <div className="flex gap-2">
                <Slider
                  min={0}
                  max={40}
                  step={0.1}
                  value={[freelanceTax]}
                  onValueChange={([v]) => setFreelanceTax(Number(v.toFixed(1)))}
                  className="w-2/3"
                />
                <Input
                  type="number"
                  min={0}
                  max={100}
                  placeholder="Self-Employment Tax Rate (%)"
                  value={freelanceTax === 0 ? "" : freelanceTax}
                  onChange={(e) => setFreelanceTax(Number(e.target.value))}
                  className="w-1/3"
                  required
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          <h4 className="mb-3">Full-Time Employment</h4>
          <div className="flex gap-2 mb-2">
            <div className="flex-1">
              <Label className="block mb-1">Annual Salary ($)</Label>
              <div className="flex gap-2">
                <Slider
                  min={0}
                  max={300000}
                  step={1000}
                  value={[fullTimeSalary]}
                  onValueChange={([v]) => setFullTimeSalary(v)}
                  className="w-2/3"
                />
                <Input
                  type="number"
                  min={0}
                  placeholder="Annual Salary ($)"
                  value={fullTimeSalary === 0 ? "" : fullTimeSalary}
                  onChange={(e) => setFullTimeSalary(Number(e.target.value))}
                  className="w-1/3"
                  required
                />
              </div>
            </div>
            <div className="flex-1">
              <Label className="block mb-1">Annual Benefits ($)</Label>
              <div className="flex gap-2">
                <Slider
                  min={0}
                  max={50000}
                  step={500}
                  value={[fullTimeBenefits]}
                  onValueChange={([v]) => setFullTimeBenefits(v)}
                  className="w-2/3"
                />
                <Input
                  type="number"
                  min={0}
                  placeholder="Annual Benefits ($)"
                  value={fullTimeBenefits === 0 ? "" : fullTimeBenefits}
                  onChange={(e) => setFullTimeBenefits(Number(e.target.value))}
                  className="w-1/3"
                  required
                />
              </div>
            </div>
            <div className="flex-1">
              <Label className="block mb-1">Tax Rate (%)</Label>
              <div className="flex gap-2">
                <Slider
                  min={0}
                  max={40}
                  step={0.1}
                  value={[fullTimeTax]}
                  onValueChange={([v]) => setFullTimeTax(Number(v.toFixed(1)))}
                  className="w-2/3"
                />
                <Input
                  type="number"
                  min={0}
                  max={100}
                  placeholder="Tax Rate (%)"
                  value={fullTimeTax === 0 ? "" : fullTimeTax}
                  onChange={(e) => setFullTimeTax(Number(e.target.value))}
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
            Freelance
          </h3>
          <ul>
            <li>
              <span className="text-gray-700">
                Estimated Net Annual Income:
              </span>{" "}
              <strong className="text-blue-900">
                $
                {(() => {
                  const freelance = calcFreelanceNet({
                    hourly: freelanceHourly,
                    hours: freelanceHours,
                    weeks: freelanceWeeks,
                    expenses: freelanceExpenses,
                    taxRate: freelanceTax,
                  });
                  return freelance.net.toLocaleString();
                })()}
              </strong>
            </li>
          </ul>
        </div>
        <div className="bg-white shadow p-5 border border-gray-300 rounded-lg">
          <h3 className="flex items-center gap-2 mb-2 font-semibold text-green-700 text-lg">
            Full-Time
          </h3>
          <ul>
            <li>
              <span className="text-gray-700">
                Estimated Net Annual Income + Benefits:
              </span>{" "}
              <strong className="text-green-900">
                $
                {(() => {
                  const fulltime = calcFullTimeNet({
                    salary: fullTimeSalary,
                    benefits: fullTimeBenefits,
                    taxRate: fullTimeTax,
                  });
                  return fulltime.net.toLocaleString();
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
          income, taxes, and benefits may vary. Consult a financial advisor or
          tax professional for personalized advice. The results are based on the
          inputs you provided and do not take into account other factors that
          may affect your options, such as job security, benefits, or work-life
          balance. Please use this tool as a starting point for your research
          and consult a financial advisor for personalized advice.
        </p>
      </section>
    </div>
  );
}
