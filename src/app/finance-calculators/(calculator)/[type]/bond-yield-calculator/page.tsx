"use client";
import { useState } from "react";

export default function BondYieldCalculator() {
  const [faceValue, setFaceValue] = useState<string>("");
  const [purchasePrice, setPurchasePrice] = useState<string>("");
  const [couponRate, setCouponRate] = useState<string>("5");
  const [yearsToMaturity, setYearsToMaturity] = useState<string>("10");
  const [result, setResult] = useState<{
    annualCoupon: number;
    currentYield: number;
    yieldToMaturity: number;
  } | null>(null);

  // Calculate Yield to Maturity (YTM) using an approximation formula
  function calculateYTM(
    face: number,
    price: number,
    coupon: number,
    years: number
  ) {
    // Approximate YTM formula
    // YTM ≈ [C + (F - P) / N] / [(F + P) / 2]
    // C = annual coupon, F = face value, P = price, N = years
    const annualCoupon = face * (coupon / 100);
    return (
      ((annualCoupon + (face - price) / years) / ((face + price) / 2)) * 100
    );
  }

  const handleCalculate = () => {
    const face = parseFloat(faceValue);
    const price = parseFloat(purchasePrice);
    const coupon = parseFloat(couponRate);
    const years = parseFloat(yearsToMaturity);

    if (
      !isNaN(face) &&
      !isNaN(price) &&
      !isNaN(coupon) &&
      !isNaN(years) &&
      face > 0 &&
      price > 0 &&
      coupon >= 0 &&
      years > 0
    ) {
      const annualCoupon = face * (coupon / 100);
      const currentYield = (annualCoupon / price) * 100;
      const yieldToMaturity = calculateYTM(face, price, coupon, years);
      setResult({
        annualCoupon,
        currentYield,
        yieldToMaturity,
      });
    } else {
      setResult(null);
    }
  };

  return (
    <div className="mt-8 md:mt-12 mx-auto h-full w-10/12 md:w-11/12">
      <h1>Bond Yield Calculator</h1>
      <p className="mb-4">
        <strong>
          Calculate the current yield and yield to maturity (YTM) for a bond
          based on its price, coupon rate, and years to maturity.
        </strong>
      </p>
      <section className="mb-8">
        <h2>How Does This Calculator Work?</h2>
        <p>
          Enter the bond's face value, purchase price, coupon rate, and years to
          maturity. The calculator will estimate the bond's annual coupon,
          current yield, and yield to maturity (YTM).
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
                <td className="px-3 py-2 border">Face Value ($)</td>
                <td className="px-3 py-2 border">$1,000</td>
                <td className="px-3 py-2 border">Standard for most bonds</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Purchase Price ($)</td>
                <td className="px-3 py-2 border">$950 - $1,050</td>
                <td className="px-3 py-2 border">Market price you pay</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Coupon Rate (%)</td>
                <td className="px-3 py-2 border">3% - 6%</td>
                <td className="px-3 py-2 border">Annual interest paid</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Years to Maturity</td>
                <td className="px-3 py-2 border">5 - 30</td>
                <td className="px-3 py-2 border">Time until bond matures</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mb-6">
          <h3>Bond Yield Details</h3>
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
                <td className="px-3 py-2 border">Face Value</td>
                <td className="px-3 py-2 border">Amount paid at maturity</td>
                <td className="px-3 py-2 border">$1,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Purchase Price</td>
                <td className="px-3 py-2 border">Price you pay for the bond</td>
                <td className="px-3 py-2 border">$980</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Coupon Rate</td>
                <td className="px-3 py-2 border">
                  Annual interest as % of face value
                </td>
                <td className="px-3 py-2 border">5%</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Annual Coupon</td>
                <td className="px-3 py-2 border">Yearly interest payment</td>
                <td className="px-3 py-2 border">$50</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Current Yield</td>
                <td className="px-3 py-2 border">Coupon ÷ purchase price</td>
                <td className="px-3 py-2 border">5.1%</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Yield to Maturity (YTM)</td>
                <td className="px-3 py-2 border">
                  Total return if held to maturity
                </td>
                <td className="px-3 py-2 border">5.4%</td>
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
                <td className="px-3 py-2 border">Face Value</td>
                <td className="px-3 py-2 border">$1,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Purchase Price</td>
                <td className="px-3 py-2 border">$980</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Coupon Rate</td>
                <td className="px-3 py-2 border">5%</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Years to Maturity</td>
                <td className="px-3 py-2 border">10</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Annual Coupon</td>
                <td className="px-3 py-2 border">$50</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Current Yield</td>
                <td className="px-3 py-2 border">5.10%</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Yield to Maturity</td>
                <td className="px-3 py-2 border">5.34%</td>
              </tr>
            </tbody>
          </table>
          <p className="text-sm">
            <strong>Source:</strong> U.S. Treasury, FINRA, 2024 averages.
          </p>
        </div>
        <div className="mb-6">
          <h3>Tips for Beginners</h3>
          <ul className="list-disc list-inside">
            <li>
              Current yield shows income now; YTM shows total return if held to
              maturity.
            </li>
            <li>Bond prices move opposite to interest rates.</li>
            <li>Taxes and fees are not included in these calculations.</li>
            <li>Check if your bond is callable (can be redeemed early).</li>
            <li>
              Consult a financial advisor for personalized bond strategies.
            </li>
          </ul>
        </div>
      </section>
      <div className="gap-4 grid md:grid-cols-2">
        <div className="mb-2">
          <label className="block mb-1 font-medium">Face Value ($):</label>
          <input
            type="number"
            className="px-2 py-1 border rounded w-full"
            value={faceValue}
            onChange={(e) => setFaceValue(e.target.value)}
            placeholder="e.g., 1000"
            min="0"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1 font-medium">Purchase Price ($):</label>
          <input
            type="number"
            className="px-2 py-1 border rounded w-full"
            value={purchasePrice}
            onChange={(e) => setPurchasePrice(e.target.value)}
            placeholder="e.g., 980"
            min="0"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1 font-medium">Coupon Rate (%):</label>
          <input
            type="number"
            className="px-2 py-1 border rounded w-full"
            value={couponRate}
            onChange={(e) => setCouponRate(e.target.value)}
            placeholder="e.g., 5"
            min="0"
            max="100"
            step="0.01"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1 font-medium">Years to Maturity:</label>
          <input
            type="number"
            className="px-2 py-1 border rounded w-full"
            value={yearsToMaturity}
            onChange={(e) => setYearsToMaturity(e.target.value)}
            placeholder="e.g., 10"
            min="1"
          />
        </div>
      </div>
      <button
        className="bg-blue-600 mt-2 px-4 py-2 rounded"
        onClick={handleCalculate}
      >
        Calculate Bond Yield
      </button>
      {result && (
        <div className="flex flex-col gap-4 mt-6">
          <div className="shadow p-4 border rounded-lg">
            <h3 className="mb-2 font-semibold">Results</h3>
            <table className="border border-gray-300 min-w-full text-sm">
              <tbody>
                <tr>
                  <td className="px-3 py-2 border font-medium">
                    Annual Coupon
                  </td>
                  <td className="px-3 py-2 border">
                    $
                    {result.annualCoupon.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2 border font-medium">
                    Current Yield
                  </td>
                  <td className="px-3 py-2 border">
                    {result.currentYield.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                    %
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2 border font-medium">
                    Yield to Maturity (YTM)
                  </td>
                  <td className="px-3 py-2 border">
                    {result.yieldToMaturity.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                    %
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="mt-2 text-sm">
              <strong>Note:</strong> This calculator uses an approximation for
              YTM. For callable or complex bonds, consult a financial advisor.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
