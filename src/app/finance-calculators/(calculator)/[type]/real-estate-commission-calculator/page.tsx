"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function RealEstateCommissionCalculator() {
  const [salePrice, setSalePrice] = useState<string>("");
  const [commissionRate, setCommissionRate] = useState<string>("6");
  const [brokerSplit, setBrokerSplit] = useState<string>("50");
  const [result, setResult] = useState<{
    totalCommission: number;
    sellerAgent: number;
    buyerAgent: number;
    sellerBroker: number;
    buyerBroker: number;
  } | null>(null);

  const handleCalculate = () => {
    const price = parseFloat(salePrice);
    const rate = parseFloat(commissionRate) / 100;
    const split = parseFloat(brokerSplit) / 100;
    if (
      !isNaN(price) &&
      !isNaN(rate) &&
      !isNaN(split) &&
      price > 0 &&
      rate > 0 &&
      split >= 0 &&
      split <= 1
    ) {
      const totalCommission = price * rate;
      const sellerAgent = totalCommission / 2;
      const buyerAgent = totalCommission / 2;
      const sellerBroker = sellerAgent * split;
      const sellerAgentNet = sellerAgent * (1 - split);
      const buyerBroker = buyerAgent * split;
      const buyerAgentNet = buyerAgent * (1 - split);
      setResult({
        totalCommission,
        sellerAgent: sellerAgentNet,
        buyerAgent: buyerAgentNet,
        sellerBroker,
        buyerBroker,
      });
    } else {
      setResult(null);
    }
  };

  return (
    <div className="mt-8 md:mt-12 mx-auto h-full w-10/12 md:w-11/12">
      <h1>Real Estate Commission Calculator</h1>
      <p className="mb-4">
        <strong>
          Estimate the total real estate commission and how it is split between
          agents and brokers when selling a home.
        </strong>
      </p>
      <section className="mb-4">
        <h2>How Does This Calculator Work?</h2>
        <p>
          Enter your home's sale price, the total commission rate, and the
          broker/agent split. The calculator will show the total commission and
          how it is typically divided.
        </p>
      </section>
      <div className="flex flex-col gap-5">
        <section>
          <h3>Commission Structure Explained</h3>
          <table className="mb-4 border border-gray-300 min-w-full text-sm">
            <thead>
              <tr className="">
                <th className="px-3 py-2 border text-left">Detail</th>
                <th className="px-3 py-2 border text-left">Typical Value</th>
                <th className="px-3 py-2 border text-left">Explanation</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-3 py-2 border">Total Commission</td>
                <td className="px-3 py-2 border">5% - 6% of sale price</td>
                <td className="px-3 py-2 border">
                  Paid by the seller, covers both buyer's and seller's agents
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Split Between Agents</td>
                <td className="px-3 py-2 border">50% / 50%</td>
                <td className="px-3 py-2 border">
                  Half to listing agent, half to buyer's agent
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Broker Commission</td>
                <td className="px-3 py-2 border">30% - 50% of agent's share</td>
                <td className="px-3 py-2 border">
                  Broker takes a portion of agent's commission
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Agent Net Commission</td>
                <td className="px-3 py-2 border">50% - 70% of agent's share</td>
                <td className="px-3 py-2 border">
                  What the agent keeps after broker split
                </td>
              </tr>
            </tbody>
          </table>
          <p className="text-sm">
            <strong>Note:</strong> Commission rates and splits can be negotiated
            and may vary by region, brokerage, and agent experience.
          </p>
        </section>
        <section>
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
                <td className="px-3 py-2 border">Sale Price ($)</td>
                <td className="px-3 py-2 border">$300,000 - $600,000</td>
                <td className="px-3 py-2 border">
                  Typical U.S. home price (2024)
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Commission Rate (%)</td>
                <td className="px-3 py-2 border">5% - 6%</td>
                <td className="px-3 py-2 border">
                  National average is 5.5% - 6%
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Broker Split (%)</td>
                <td className="px-3 py-2 border">50%</td>
                <td className="px-3 py-2 border">
                  Common split between agent and broker
                </td>
              </tr>
            </tbody>
          </table>
        </section>
        <section>
          <div className="gap-4 grid md:grid-cols-3">
            <div className="mb-2">
              <label className="block mb-1 font-medium">
                Home Sale Price ($):
              </label>
              <input
                type="number"
                className="px-2 py-1 border rounded w-full"
                value={salePrice}
                onChange={(e) => setSalePrice(e.target.value)}
                placeholder="Enter home sale price"
                min="0"
              />
            </div>
            <div className="mb-2">
              <label className="block mb-1 font-medium">
                Commission Rate (%):
              </label>
              <input
                type="number"
                className="px-2 py-1 border rounded w-full"
                value={commissionRate}
                onChange={(e) => setCommissionRate(e.target.value)}
                placeholder="e.g., 6"
                min="0"
                max="100"
                step="0.01"
              />
            </div>
            <div className="mb-2">
              <label className="block mb-1 font-medium">
                Broker Split (%):
              </label>
              <input
                type="number"
                className="px-2 py-1 border rounded w-full"
                value={brokerSplit}
                onChange={(e) => setBrokerSplit(e.target.value)}
                placeholder="e.g., 50"
                min="0"
                max="100"
                step="0.01"
              />
            </div>
          </div>
          <Button className="mt-2 px-4 py-2 rounded" onClick={handleCalculate}>
            Calculate Commission
          </Button>
          {result && (
            <div className="flex flex-col gap-4 mt-6">
              <div className="shadow p-4 border rounded-lg">
                <h3 className="mb-2 font-semibold">Results</h3>
                <table className="border border-gray-300 min-w-full text-sm">
                  <tbody>
                    <tr>
                      <td className="px-3 py-2 border font-medium">
                        Total Commission
                      </td>
                      <td className="px-3 py-2 border">
                        $
                        {result.totalCommission.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 border font-medium">
                        Seller's Agent (net)
                      </td>
                      <td className="px-3 py-2 border">
                        $
                        {result.sellerAgent.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 border font-medium">
                        Seller's Broker
                      </td>
                      <td className="px-3 py-2 border">
                        $
                        {result.sellerBroker.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 border font-medium">
                        Buyer's Agent (net)
                      </td>
                      <td className="px-3 py-2 border">
                        $
                        {result.buyerAgent.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 border font-medium">
                        Buyer's Broker
                      </td>
                      <td className="px-3 py-2 border">
                        $
                        {result.buyerBroker.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="mt-2 text-sm">
                  <strong>Note:</strong> Actual commission rates and splits may
                  vary. Always confirm with your agent or broker.
                </div>
              </div>
            </div>
          )}
        </section>
        <section>
          <h3>Key Terms Explained</h3>
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
                <td className="px-3 py-2 border">Sale Price</td>
                <td className="px-3 py-2 border">
                  The price your home sells for
                </td>
                <td className="px-3 py-2 border">$400,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Commission Rate</td>
                <td className="px-3 py-2 border">
                  Percent of sale price paid as commission
                </td>
                <td className="px-3 py-2 border">6%</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Broker Split</td>
                <td className="px-3 py-2 border">
                  Percent of agent's commission paid to broker
                </td>
                <td className="px-3 py-2 border">50%</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Seller's Agent</td>
                <td className="px-3 py-2 border">
                  Agent representing the seller
                </td>
                <td className="px-3 py-2 border">
                  $6,000 (net after broker split)
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Buyer's Agent</td>
                <td className="px-3 py-2 border">
                  Agent representing the buyer
                </td>
                <td className="px-3 py-2 border">
                  $6,000 (net after broker split)
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Seller's Broker</td>
                <td className="px-3 py-2 border">
                  Broker for the seller's agent
                </td>
                <td className="px-3 py-2 border">$6,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Buyer's Broker</td>
                <td className="px-3 py-2 border">
                  Broker for the buyer's agent
                </td>
                <td className="px-3 py-2 border">$6,000</td>
              </tr>
            </tbody>
          </table>
        </section>
        <section>
          <h3>Real Data Example (2024)</h3>
          <table className="mb-4 border border-gray-300 min-w-full text-sm">
            <thead>
              <tr className="">
                <th className="px-3 py-2 border text-left">Scenario</th>
                <th className="px-3 py-2 border text-left">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-3 py-2 border">Home Sale Price</td>
                <td className="px-3 py-2 border">$400,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Total Commission (6%)</td>
                <td className="px-3 py-2 border">$24,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">
                  Seller's Agent (net, 50% split)
                </td>
                <td className="px-3 py-2 border">$6,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">
                  Seller's Broker (50% split)
                </td>
                <td className="px-3 py-2 border">$6,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">
                  Buyer's Agent (net, 50% split)
                </td>
                <td className="px-3 py-2 border">$6,000</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Buyer's Broker (50% split)</td>
                <td className="px-3 py-2 border">$6,000</td>
              </tr>
            </tbody>
          </table>
          <p className="text-sm">
            <strong>Source:</strong> National Association of Realtors, 2024
            averages.
          </p>
        </section>
        <section>
          <h3>Tips for Beginners</h3>
          <ul className="list-disc list-inside">
            <li>
              Commission rates are negotiable—ask your agent if you can get a
              lower rate.
            </li>
            <li>Some discount brokerages offer lower rates or flat fees.</li>
            <li>
              Understand how the commission is split between agents and brokers.
            </li>
            <li>
              Ask for a breakdown of all costs before signing a listing
              agreement.
            </li>
            <li>Consult a real estate professional for personalized advice.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
