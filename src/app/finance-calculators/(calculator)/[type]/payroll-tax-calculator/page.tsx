"use client";
import { calculatePayrollTaxes } from "@/lib/utils/calculators/business/tax";
import { useState } from "react";

export default function PayrollTaxCalculator() {
  const [grossPayroll, setGrossPayroll] = useState<string>("");
  const [numEmployees, setNumEmployees] = useState<string>("");
  const [stateUnemploymentTaxRate, setStateUnemploymentTaxRate] =
    useState<string>("");
  const [federalUnemploymentTaxRate, setFederalUnemploymentTaxRate] =
    useState<string>("");
  const [result, setResult] = useState<{
    socialSecurityTax: number;
    medicareTax: number;
    stateUnemploymentTax: number;
    federalUnemploymentTax: number;
    employerTaxes: number;
  } | null>(null);

  const handleCalculate = () => {
    const gross = parseFloat(grossPayroll);
    const employees = parseInt(numEmployees, 10);
    const stateRate = parseFloat(stateUnemploymentTaxRate) / 100;
    const federalRate = parseFloat(federalUnemploymentTaxRate) / 100;
    if (
      !isNaN(gross) &&
      !isNaN(employees) &&
      employees > 0 &&
      !isNaN(stateRate) &&
      !isNaN(federalRate)
    ) {
      const res = calculatePayrollTaxes({
        grossPayroll: gross,
        numEmployees: employees,
        stateUnemploymentTaxRate: stateRate,
        federalUnemploymentTaxRate: federalRate,
      });
      setResult(res);
    } else {
      setResult(null);
    }
  };

  return (
    <div className="mt-8 md:mt-12 mx-auto h-full w-10/12 md:w-11/12">
      <h1>Payroll Tax Calculator</h1>
      <p className="mb-4">
        Estimate your business's employer payroll tax obligations, including
        Social Security, Medicare, and unemployment taxes.
      </p>
      <div className="mb-4">
        <p>
          <strong>What are Payroll Taxes?</strong>
          <br />
          Payroll taxes are employer-paid taxes based on employee wages,
          including Social Security, Medicare, and federal/state unemployment
          taxes. These are required in addition to gross wages paid to
          employees.
        </p>
        <p className="mt-2">
          <strong>Why it matters:</strong>
          <br />
          Understanding your payroll tax obligations helps you budget accurately
          and stay compliant with tax laws.
        </p>
      </div>
      <div className="gap-4 grid md:grid-cols-2">
        <div className="mb-2">
          <label className="block mb-1 font-medium">Gross Payroll ($):</label>
          <input
            type="number"
            className="px-2 py-1 border rounded w-full"
            value={grossPayroll}
            onChange={(e) => setGrossPayroll(e.target.value)}
            placeholder="Total gross payroll"
            min="0"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1 font-medium">Number of Employees:</label>
          <input
            type="number"
            className="px-2 py-1 border rounded w-full"
            value={numEmployees}
            onChange={(e) => setNumEmployees(e.target.value)}
            placeholder="Number of employees"
            min="1"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1 font-medium">
            State Unemployment Tax Rate (%):
          </label>
          <input
            type="number"
            className="px-2 py-1 border rounded w-full"
            value={stateUnemploymentTaxRate}
            onChange={(e) => setStateUnemploymentTaxRate(e.target.value)}
            placeholder="e.g. 5"
            min="0"
            step="0.01"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1 font-medium">
            Federal Unemployment Tax Rate (%):
          </label>
          <input
            type="number"
            className="px-2 py-1 border rounded w-full"
            value={federalUnemploymentTaxRate}
            onChange={(e) => setFederalUnemploymentTaxRate(e.target.value)}
            placeholder="e.g. 0.6"
            min="0"
            step="0.01"
          />
        </div>
      </div>
      <button
        className="bg-blue-600 mt-2 px-4 py-2 rounded"
        onClick={handleCalculate}
      >
        Calculate Payroll Taxes
      </button>
      {result && (
        <div className="flex flex-col gap-4 mt-6">
          <div className="shadow p-4 border rounded-lg">
            <div>
              <strong>Social Security Tax:</strong>{" "}
              <span className="">${result.socialSecurityTax.toFixed(2)}</span>
            </div>
            <div>
              <strong>Medicare Tax:</strong>{" "}
              <span className="">${result.medicareTax.toFixed(2)}</span>
            </div>
            <div>
              <strong>State Unemployment Tax:</strong>{" "}
              <span className="">
                ${result.stateUnemploymentTax.toFixed(2)}
              </span>
            </div>
            <div>
              <strong>Federal Unemployment Tax:</strong>{" "}
              <span className="">
                ${result.federalUnemploymentTax.toFixed(2)}
              </span>
            </div>
            <div className="mt-2 pt-2 border-t">
              <strong>Total Employer Payroll Taxes:</strong>{" "}
              <span className="text-lg">
                ${result.employerTaxes.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
