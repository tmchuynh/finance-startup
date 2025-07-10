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
    <div className="mx-auto pb-24 lg:pb-32 pt-6 sm:pt-12 lg:pt-16 w-10/12 md:w-11/12">
      <div className="mb-12 text-center">
        <h1>Freelance vs Full-Time Income Calculator</h1>
        <h5>Compare Your Potential Net Income</h5>
        <p>
          Use this tool to estimate your net annual income as a freelancer
          versus a full-time employee. Enter your expected freelance rates,
          expenses, and tax rate, as well as your full-time salary, benefits,
          and tax rate. This tool provides estimates for informational purposes
          only. Actual income, taxes, and benefits may vary. Consult a financial
          advisor or tax professional for personalized advice.
        </p>
      </div>
      {/* Table: Typical Income and Benefits */}
      <div className="my-8">
        <h2>Typical Income & Benefits (2024)</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Annual Range</TableHead>
              <TableHead>Notes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Freelance Hourly Rate</TableCell>
              <TableCell>$30 - $150/hr</TableCell>
              <TableCell>Varies by field and experience</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Full-Time Salary</TableCell>
              <TableCell>$50,000 - $150,000</TableCell>
              <TableCell>Plus benefits</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Benefits Value</TableCell>
              <TableCell>$5,000 - $20,000</TableCell>
              <TableCell>Health, retirement, PTO, etc.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Self-Employment Tax Rate</TableCell>
              <TableCell>15% - 30%</TableCell>
              <TableCell>Includes Social Security/Medicare</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      {/* Table: Pros and Cons */}
      <div className="my-8">
        <h2>Pros and Cons</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Pros</TableHead>
              <TableHead>Cons</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Freelance</TableCell>
              <TableCell>
                <ul className="space-y-1 text-sm list-disc list-inside">
                  <li>Flexibility</li>
                  <li>Set your own rates</li>
                  <li>Potential for higher income</li>
                </ul>
              </TableCell>
              <TableCell>
                <ul className="space-y-1 text-sm list-disc list-inside">
                  <li>No benefits</li>
                  <li>Income instability</li>
                  <li>Responsible for own taxes</li>
                </ul>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Full-Time</TableCell>
              <TableCell>
                <ul className="space-y-1 text-sm list-disc list-inside">
                  <li>Benefits</li>
                  <li>Stable income</li>
                  <li>Employer handles taxes</li>
                </ul>
              </TableCell>
              <TableCell>
                <ul className="space-y-1 text-sm list-disc list-inside">
                  <li>Less flexibility</li>
                  <li>Limited earning potential</li>
                  <li>Less control over work</li>
                </ul>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div className="shadow-lg mb-8 p-8 border rounded-lg">
        <h2>Calculator</h2>

        {/* Freelance Income Section */}
        <div className="mb-8 p-6 border rounded-lg">
          <h3>Freelance Income</h3>
          <div className="gap-6 grid grid-cols-1 md:grid-cols-3 mb-4">
            <div>
              <Label className="font-medium text-sm">
                Hourly Rate: ${freelanceHourly}
              </Label>
              <div className="flex gap-4 items-center mt-2">
                <Slider
                  min={0}
                  max={300}
                  step={1}
                  value={[freelanceHourly]}
                  onValueChange={([v]) => setFreelanceHourly(v)}
                  className="flex-1"
                />
                <Input
                  type="number"
                  min={0}
                  placeholder="Hourly Rate"
                  value={freelanceHourly === 0 ? "" : freelanceHourly}
                  onChange={(e) => setFreelanceHourly(Number(e.target.value))}
                  className="w-24"
                  required
                />
              </div>
            </div>
            <div>
              <Label className="font-medium text-sm">
                Hours/Week: {freelanceHours}
              </Label>
              <div className="flex gap-4 items-center mt-2">
                <Slider
                  min={0}
                  max={80}
                  step={1}
                  value={[freelanceHours]}
                  onValueChange={([v]) => setFreelanceHours(v)}
                  className="flex-1"
                />
                <Input
                  type="number"
                  min={0}
                  placeholder="Hours/Week"
                  value={freelanceHours === 0 ? "" : freelanceHours}
                  onChange={(e) => setFreelanceHours(Number(e.target.value))}
                  className="w-24"
                  required
                />
              </div>
            </div>
            <div>
              <Label className="font-medium text-sm">
                Weeks/Year: {freelanceWeeks}
              </Label>
              <div className="flex gap-4 items-center mt-2">
                <Slider
                  min={0}
                  max={52}
                  step={1}
                  value={[freelanceWeeks]}
                  onValueChange={([v]) => setFreelanceWeeks(v)}
                  className="flex-1"
                />
                <Input
                  type="number"
                  min={0}
                  placeholder="Weeks/Year"
                  value={freelanceWeeks === 0 ? "" : freelanceWeeks}
                  onChange={(e) => setFreelanceWeeks(Number(e.target.value))}
                  className="w-24"
                  required
                />
              </div>
            </div>
          </div>
          <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
            <div>
              <Label className="font-medium text-sm">
                Annual Expenses: ${freelanceExpenses.toLocaleString()}
              </Label>
              <div className="flex gap-4 items-center mt-2">
                <Slider
                  min={0}
                  max={50000}
                  step={500}
                  value={[freelanceExpenses]}
                  onValueChange={([v]) => setFreelanceExpenses(v)}
                  className="flex-1"
                />
                <Input
                  type="number"
                  min={0}
                  placeholder="Expenses"
                  value={freelanceExpenses === 0 ? "" : freelanceExpenses}
                  onChange={(e) => setFreelanceExpenses(Number(e.target.value))}
                  className="w-28"
                  required
                />
              </div>
            </div>
            <div>
              <Label className="font-medium text-sm">
                Self-Employment Tax Rate: {freelanceTax}%
              </Label>
              <div className="flex gap-4 items-center mt-2">
                <Slider
                  min={0}
                  max={40}
                  step={0.1}
                  value={[freelanceTax]}
                  onValueChange={([v]) => setFreelanceTax(Number(v.toFixed(1)))}
                  className="flex-1"
                />
                <Input
                  type="number"
                  min={0}
                  max={100}
                  placeholder="Tax Rate"
                  value={freelanceTax === 0 ? "" : freelanceTax}
                  onChange={(e) => setFreelanceTax(Number(e.target.value))}
                  className="w-24"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* Full-Time Employment Section */}
        <div className="mb-6 p-6 border rounded-lg">
          <h3>Full-Time Employment</h3>
          <div className="gap-6 grid grid-cols-1 md:grid-cols-3">
            <div>
              <Label className="font-medium text-sm">
                Annual Salary: ${fullTimeSalary.toLocaleString()}
              </Label>
              <div className="flex gap-4 items-center mt-2">
                <Slider
                  min={0}
                  max={300000}
                  step={1000}
                  value={[fullTimeSalary]}
                  onValueChange={([v]) => setFullTimeSalary(v)}
                  className="flex-1"
                />
                <Input
                  type="number"
                  min={0}
                  placeholder="Annual Salary"
                  value={fullTimeSalary === 0 ? "" : fullTimeSalary}
                  onChange={(e) => setFullTimeSalary(Number(e.target.value))}
                  className="w-28"
                  required
                />
              </div>
            </div>
            <div>
              <Label className="font-medium text-sm">
                Annual Benefits: ${fullTimeBenefits.toLocaleString()}
              </Label>
              <div className="flex gap-4 items-center mt-2">
                <Slider
                  min={0}
                  max={50000}
                  step={500}
                  value={[fullTimeBenefits]}
                  onValueChange={([v]) => setFullTimeBenefits(v)}
                  className="flex-1"
                />
                <Input
                  type="number"
                  min={0}
                  placeholder="Annual Benefits"
                  value={fullTimeBenefits === 0 ? "" : fullTimeBenefits}
                  onChange={(e) => setFullTimeBenefits(Number(e.target.value))}
                  className="w-28"
                  required
                />
              </div>
            </div>
            <div>
              <Label className="font-medium text-sm">
                Tax Rate: {fullTimeTax}%
              </Label>
              <div className="flex gap-4 items-center mt-2">
                <Slider
                  min={0}
                  max={40}
                  step={0.1}
                  value={[fullTimeTax]}
                  onValueChange={([v]) => setFullTimeTax(Number(v.toFixed(1)))}
                  className="flex-1"
                />
                <Input
                  type="number"
                  min={0}
                  max={100}
                  placeholder="Tax Rate"
                  value={fullTimeTax === 0 ? "" : fullTimeTax}
                  onChange={(e) => setFullTimeTax(Number(e.target.value))}
                  className="w-24"
                  required
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <h2>Results</h2>
      {/* Winner Banner */}
      <div
        className={`p-4 rounded-lg mb-6 ${
          freelance.net > fulltime.net ? " border " : " border "
        }`}
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className={` ${freelance.net > fulltime.net ? "" : ""}`}>
              {freelance.net > fulltime.net
                ? "Freelancing Pays More!"
                : "Full-Time Pays More!"}
            </h3>
            <p className={`text-sm ${freelance.net > fulltime.net ? "" : ""}`}>
              {freelance.net > fulltime.net
                ? `$${(
                    freelance.net - fulltime.net
                  ).toLocaleString()} higher net income annually`
                : `$${(
                    fulltime.net - freelance.net
                  ).toLocaleString()} higher net income annually (including benefits)`}
            </p>
          </div>
        </div>
      </div>
      <div className="gap-6 grid grid-cols-1 md:grid-cols-2 mb-8">
        <div className="shadow-sm p-6 border-2 rounded-lg">
          <h3 className="flex gap-2 items-center">💼 Freelance</h3>
          <div className="space-y-3">
            {(() => {
              const freelance = calcFreelanceNet({
                hourly: freelanceHourly,
                hours: freelanceHours,
                weeks: freelanceWeeks,
                expenses: freelanceExpenses,
                taxRate: freelanceTax,
              });
              const grossIncome =
                freelanceHourly * freelanceHours * freelanceWeeks;
              return (
                <>
                  <div className="flex items-center justify-between">
                    <span className="">Gross Income:</span>
                    <span className="font-bold text-lg">
                      ${grossIncome.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="">Business Expenses:</span>
                    <span className="font-bold">
                      -${freelanceExpenses.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="">Taxes ({freelanceTax}%):</span>
                    <span className="font-bold">
                      -$
                      {(
                        Math.max(grossIncome - freelanceExpenses, 0) *
                        (freelanceTax / 100)
                      ).toLocaleString()}
                    </span>
                  </div>
                  <div className="pt-2 border-t">
                    <div className="flex items-center justify-between">
                      <span className="">Net Annual Income:</span>
                      <span className="font-bold text-xl">
                        ${freelance.net.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className="text-xs">
                    Working {freelanceHours} hrs/week × {freelanceWeeks} weeks ={" "}
                    {freelanceHours * freelanceWeeks} total hours
                  </div>
                </>
              );
            })()}
          </div>
        </div>

        <div className="shadow-sm p-6 border-2 rounded-lg">
          <h3 className="flex gap-2 items-center">🏢 Full-Time</h3>
          <div className="space-y-3">
            {(() => {
              const fulltime = calcFullTimeNet({
                salary: fullTimeSalary,
                benefits: fullTimeBenefits,
                taxRate: fullTimeTax,
              });
              return (
                <>
                  <div className="flex items-center justify-between">
                    <span className="">Annual Salary:</span>
                    <span className="font-bold text-lg">
                      ${fullTimeSalary.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="">Annual Benefits:</span>
                    <span className="font-bold">
                      +${fullTimeBenefits.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="">Taxes ({fullTimeTax}%):</span>
                    <span className="font-bold">
                      -$
                      {(fullTimeSalary * (fullTimeTax / 100)).toLocaleString()}
                    </span>
                  </div>
                  <div className="pt-2 border-t">
                    <div className="flex items-center justify-between">
                      <span className="">Net Annual Income + Benefits:</span>
                      <span className="font-bold text-xl">
                        ${fulltime.net.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className="text-xs">
                    Standard 40 hrs/week × 52 weeks = 2,080 total hours
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      </div>
      ;{/* Detailed Comparison Table */}
      <div className="shadow mb-8 border rounded-lg overflow-hidden">
        <h3>Detailed Comparison</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Metric</TableHead>
              <TableHead className="">Freelance</TableHead>
              <TableHead className="">Full-Time</TableHead>
              <TableHead>Difference</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(() => {
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
              const freelanceGross =
                freelanceHourly * freelanceHours * freelanceWeeks;
              const freelanceHourlyEquivalent =
                freelance.net / (freelanceHours * freelanceWeeks);
              const fulltimeHourlyEquivalent = fulltime.net / 2080; // 40 hrs/week × 52 weeks

              return (
                <>
                  <TableRow>
                    <TableCell>Gross Income</TableCell>
                    <TableCell>${freelanceGross.toLocaleString()}</TableCell>
                    <TableCell>
                      ${(fullTimeSalary + fullTimeBenefits).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      {freelanceGross > fullTimeSalary + fullTimeBenefits
                        ? `$${(
                            freelanceGross -
                            fullTimeSalary -
                            fullTimeBenefits
                          ).toLocaleString()} higher`
                        : `$${(
                            fullTimeSalary +
                            fullTimeBenefits -
                            freelanceGross
                          ).toLocaleString()} lower`}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Tax Rate</TableCell>
                    <TableCell>{freelanceTax}%</TableCell>
                    <TableCell>{fullTimeTax}%</TableCell>
                    <TableCell>
                      {freelanceTax > fullTimeTax
                        ? `${(freelanceTax - fullTimeTax).toFixed(1)}% higher`
                        : `${(fullTimeTax - freelanceTax).toFixed(1)}% lower`}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Work Hours/Year</TableCell>
                    <TableCell>
                      {freelanceHours * freelanceWeeks} hours
                    </TableCell>
                    <TableCell>2,080 hours (standard)</TableCell>
                    <TableCell>
                      {freelanceHours * freelanceWeeks < 2080
                        ? `${
                            2080 - freelanceHours * freelanceWeeks
                          } fewer hours`
                        : `${
                            freelanceHours * freelanceWeeks - 2080
                          } more hours`}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Effective Hourly Rate</TableCell>
                    <TableCell className="">
                      ${freelanceHourlyEquivalent.toFixed(2)}/hr
                    </TableCell>
                    <TableCell className="">
                      ${fulltimeHourlyEquivalent.toFixed(2)}/hr
                    </TableCell>
                    <TableCell>
                      {freelanceHourlyEquivalent > fulltimeHourlyEquivalent
                        ? `$${(
                            freelanceHourlyEquivalent - fulltimeHourlyEquivalent
                          ).toFixed(2)} higher`
                        : `$${(
                            fulltimeHourlyEquivalent - freelanceHourlyEquivalent
                          ).toFixed(2)} lower`}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Net Annual Income</TableCell>
                    <TableCell className="font-bold text-lg">
                      ${freelance.net.toLocaleString()}
                    </TableCell>
                    <TableCell className="font-bold text-lg">
                      ${fulltime.net.toLocaleString()}
                    </TableCell>
                    <TableCell className="font-bold">
                      {freelance.net > fulltime.net
                        ? `$${(
                            freelance.net - fulltime.net
                          ).toLocaleString()} advantage`
                        : `$${(
                            fulltime.net - freelance.net
                          ).toLocaleString()} advantage`}
                    </TableCell>
                  </TableRow>
                </>
              );
            })()}
          </TableBody>
        </Table>
      </div>
      ;{/* Recommendation Banner */}
      {result && (
        <div className="mb-8 p-6 border rounded-lg">
          <h3>💡 Recommendation</h3>
          <div className="">{result.split("\n").slice(-1).join("")}</div>
        </div>
      )}
      {/* Important Considerations */}
      <div className="mb-8 p-6 border rounded-lg">
        <h3>⚠️ Important Considerations</h3>
        <ul className="space-y-2">
          <li>Freelance income can be highly variable and unpredictable</li>
          <li>
            Full-time benefits often include health insurance, retirement
            matching, and paid time off
          </li>
          <li>
            Freelancers must handle their own taxes, insurance, and retirement
            planning
          </li>
          <li>
            Consider the value of job security and steady income vs flexibility
          </li>
          <li>
            Freelancers may have business expenses (equipment, software, home
            office)
          </li>
          <li>
            Self-employment tax is typically higher than employee tax rates
          </li>
          <li>
            Factor in time spent on business development, invoicing, and
            administration
          </li>
        </ul>
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
