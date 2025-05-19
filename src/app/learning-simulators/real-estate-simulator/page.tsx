"use client";

import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

type Property = {
  id: string;
  name: string;
  location: string;
  price: number;
  trend: number[]; // price history
  condition: "Excellent" | "Good" | "Fair" | "Needs Repair";
  owned: boolean;
  repairs: number; // total spent on repairs
};

type OwnedProperty = Property & {
  purchasePrice: number;
  purchaseDate: Date;
  repairs: number;
  forSale: boolean;
  interestedBuyers: Buyer[];
};

type Buyer = {
  id: string;
  name: string;
  offer: number;
  notes?: string;
};

type Transaction = {
  id: string;
  type: "BUY" | "SELL" | "REPAIR";
  propertyName: string;
  amount: number;
  date: Date;
  notes?: string;
  gainLoss?: number; // <-- add this field
};

const INITIAL_CASH = 500000;

const MOCK_PROPERTIES: Property[] = [
  {
    id: uuidv4(),
    name: "Sunnyvale Family Home",
    location: "Sunnyvale, CA",
    price: 350000,
    trend: [350000],
    condition: "Good",
    owned: false,
    repairs: 0,
  },
  {
    id: uuidv4(),
    name: "Downtown Loft",
    location: "San Francisco, CA",
    price: 450000,
    trend: [450000],
    condition: "Fair",
    owned: false,
    repairs: 0,
  },
  {
    id: uuidv4(),
    name: "Suburban Ranch",
    location: "Austin, TX",
    price: 250000,
    trend: [250000],
    condition: "Excellent",
    owned: false,
    repairs: 0,
  },
];

function randomConditionUpgrade(condition: Property["condition"]) {
  if (condition === "Needs Repair") return "Fair";
  if (condition === "Fair") return "Good";
  if (condition === "Good") return "Excellent";
  return "Excellent";
}

function randomConditionDowngrade(condition: Property["condition"]) {
  if (condition === "Excellent") return "Good";
  if (condition === "Good") return "Fair";
  if (condition === "Fair") return "Needs Repair";
  return "Needs Repair";
}

function getRandomBuyers(property: Property): Buyer[] {
  const buyers = [
    { name: "Alice", notes: "Wants quick close" },
    { name: "Bob", notes: "Needs inspection" },
    { name: "Carol", notes: "Investor, all cash" },
    { name: "Dave", notes: "First-time buyer" },
  ];
  return Array.from({ length: Math.floor(Math.random() * 3) + 1 }, () => {
    const buyer = buyers[Math.floor(Math.random() * buyers.length)];
    return {
      id: uuidv4(),
      name: buyer.name,
      offer:
        Math.round((property.price * (0.97 + Math.random() * 0.08)) / 1000) *
        1000,
      notes: buyer.notes,
    };
  });
}

export default function RealEstateSimulatorPage() {
  const [cash, setCash] = useState(INITIAL_CASH);
  const [properties, setProperties] = useState<Property[]>(MOCK_PROPERTIES);
  const [owned, setOwned] = useState<OwnedProperty[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [message, setMessage] = useState<string>("");

  // Simulate price trends and random condition changes
  useEffect(() => {
    const interval = setInterval(() => {
      setProperties((prev) =>
        prev.map((p) => {
          // Simulate price change: -2% to +2%
          const change = 1 + (Math.random() * 4 - 2) / 100;
          const newPrice = Math.max(50000, Math.round(p.price * change));
          // Simulate random condition downgrade
          let newCondition = p.condition;
          if (Math.random() < 0.05) {
            newCondition = randomConditionDowngrade(p.condition);
          }
          return {
            ...p,
            price: newPrice,
            trend: [...p.trend.slice(-19), newPrice],
            condition: newCondition,
          };
        })
      );
      setOwned((prev) =>
        prev.map((p) => {
          // Simulate price change: -2% to +2%
          const change = 1 + (Math.random() * 4 - 2) / 100;
          const newPrice = Math.max(50000, Math.round(p.price * change));
          // Simulate random condition downgrade
          let newCondition = p.condition;
          if (Math.random() < 0.05) {
            newCondition = randomConditionDowngrade(p.condition);
          }
          return {
            ...p,
            price: newPrice,
            trend: [...p.trend.slice(-19), newPrice],
            condition: newCondition,
          };
        })
      );
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleBuy = (property: Property) => {
    if (cash < property.price) {
      setMessage("Insufficient cash to buy this property.");
      return;
    }
    setCash((c) => c - property.price);
    setProperties((prev) =>
      prev.map((p) => (p.id === property.id ? { ...p, owned: true } : p))
    );
    setOwned((prev) => [
      ...prev,
      {
        ...property,
        owned: true,
        purchasePrice: property.price,
        purchaseDate: new Date(),
        repairs: 0,
        forSale: false,
        interestedBuyers: [],
      },
    ]);
    setTransactions((prev) => [
      ...prev,
      {
        id: uuidv4(),
        type: "BUY",
        propertyName: property.name,
        amount: property.price,
        date: new Date(),
      },
    ]);
    setMessage(
      `Purchased ${property.name} for $${property.price.toLocaleString()}`
    );
  };

  const handleRepair = (propertyId: string) => {
    setOwned((prev) =>
      prev.map((p) => {
        if (p.id !== propertyId) return p;
        let repairCost = 0;
        let newCondition = p.condition;
        if (p.condition === "Needs Repair") {
          repairCost = 20000;
          newCondition = "Fair";
        } else if (p.condition === "Fair") {
          repairCost = 15000;
          newCondition = "Good";
        } else if (p.condition === "Good") {
          repairCost = 10000;
          newCondition = "Excellent";
        } else {
          setMessage("No repairs needed.");
          return p;
        }
        if (cash < repairCost) {
          setMessage("Insufficient cash for repairs.");
          return p;
        }
        setCash((c) => c - repairCost);
        setTransactions((prevT) => [
          ...prevT,
          {
            id: uuidv4(),
            type: "REPAIR",
            propertyName: p.name,
            amount: repairCost,
            date: new Date(),
            notes: `Upgraded to ${newCondition}`,
          },
        ]);
        setMessage(
          `Repaired ${
            p.name
          } for $${repairCost.toLocaleString()} (now ${newCondition})`
        );
        return {
          ...p,
          condition: newCondition,
          repairs: p.repairs + repairCost,
        };
      })
    );
  };

  const handleListForSale = (propertyId: string) => {
    setOwned((prev) =>
      prev.map((p) =>
        p.id === propertyId
          ? {
              ...p,
              forSale: true,
              interestedBuyers: getRandomBuyers(p),
            }
          : p
      )
    );
    setMessage("Property listed for sale. Buyers are making offers!");
  };

  const handleSell = (propertyId: string, buyerId: string) => {
    const property = owned.find((p) => p.id === propertyId);
    if (!property) return;
    const buyer = property.interestedBuyers.find((b) => b.id === buyerId);
    if (!buyer) return;
    setCash((c) => c + buyer.offer);
    setOwned((prev) => prev.filter((p) => p.id !== propertyId));
    setTransactions((prevT) => [
      ...prevT,
      {
        id: uuidv4(),
        type: "SELL",
        propertyName: property.name,
        amount: buyer.offer,
        date: new Date(),
        notes: `Sold to ${buyer.name}`,
        gainLoss: buyer.offer - property.purchasePrice - property.repairs,
      },
    ]);
    setMessage(
      `Sold ${property.name} to ${
        buyer.name
      } for $${buyer.offer.toLocaleString()}`
    );
  };

  return (
    <div className="mx-auto pt-6 sm:pt-12 lg:pt-16 pb-24 lg:pb-32 w-10/12 md:w-11/12">
      <h1 className="mb-6 font-bold text-3xl">
        Real Estate Investment Simulator
      </h1>
      <p className="mb-4">
        Simulate buying, repairing, and selling properties. Watch price trends,
        make repairs, and select buyers to maximize your returns!
      </p>
      <p className="mb-4">
        Cash Balance: <strong>${cash.toLocaleString()}</strong>
      </p>
      {message && <p className="mb-4 text-blue-600">{message}</p>}

      <h2 className="mt-8 mb-2 font-semibold text-2xl">Available Properties</h2>
      <table className="mb-8 border border-collapse border-gray-300 w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border border-gray-300">Name</th>
            <th className="p-2 border border-gray-300">Location</th>
            <th className="p-2 border border-gray-300">Current Price</th>
            <th className="p-2 border border-gray-300">Condition</th>
            <th className="p-2 border border-gray-300">Trend (Last 5)</th>
          </tr>
        </thead>
        <tbody>
          {properties
            .filter((p) => !p.owned)
            .map((p) => (
              <tr key={p.id}>
                <td className="p-2 border border-gray-300">{p.name}</td>
                <td className="p-2 border border-gray-300">{p.location}</td>
                <td className="p-2 border border-gray-300">
                  ${p.price.toLocaleString()}
                </td>
                <td className="p-2 border border-gray-300">{p.condition}</td>
                <td className="p-2 border border-gray-300">
                  {p.trend.slice(-5).map((v, i) => (
                    <span key={i} style={{ marginRight: 4 }}>
                      ${v.toLocaleString()}
                    </span>
                  ))}
                </td>
                <td className="p-2 border border-gray-300">
                  <button
                    className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-white"
                    onClick={() => handleBuy(p)}
                  >
                    Buy
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <h2 className="mt-8 mb-2 font-semibold text-2xl">Your Properties</h2>
      <table className="mb-8 border border-collapse border-gray-300 w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border border-gray-300">Name</th>
            <th className="p-2 border border-gray-300">Location</th>
            <th className="p-2 border border-gray-300">Current Price</th>
            <th className="p-2 border border-gray-300">Condition</th>
            <th className="p-2 border border-gray-300">Repairs</th>
            <th className="p-2 border border-gray-300">Trend (Last 5)</th>
            <th className="p-2 border border-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {owned.length === 0 && (
            <tr>
              <td colSpan={7} className="p-4 text-center text-gray-500">
                You don't own any properties yet.
              </td>
            </tr>
          )}
          {owned.map((p) => (
            <tr key={p.id}>
              <td className="p-2 border border-gray-300">{p.name}</td>
              <td className="p-2 border border-gray-300">{p.location}</td>
              <td className="p-2 border border-gray-300">
                ${p.price.toLocaleString()}
              </td>
              <td className="p-2 border border-gray-300">{p.condition}</td>
              <td className="p-2 border border-gray-300">
                ${p.repairs.toLocaleString()}
              </td>
              <td className="p-2 border border-gray-300">
                {p.trend.slice(-5).map((v, i) => (
                  <span key={i} style={{ marginRight: 4 }}>
                    ${v.toLocaleString()}
                  </span>
                ))}
              </td>
              <td className="flex flex-col gap-2 p-2 border border-gray-300">
                <button
                  className="bg-yellow-500 hover:bg-yellow-600 mb-1 px-3 py-1 rounded text-white"
                  onClick={() => handleRepair(p.id)}
                >
                  Repair
                </button>
                {!p.forSale ? (
                  <button
                    className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-white"
                    onClick={() => handleListForSale(p.id)}
                  >
                    List for Sale
                  </button>
                ) : (
                  <span className="font-semibold text-green-700">Listed</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="mt-8 mb-2 font-semibold text-2xl">Interested Buyers</h2>
      <table className="mb-8 border border-collapse border-gray-300 w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border border-gray-300">Property</th>
            <th className="p-2 border border-gray-300">Buyer</th>
            <th className="p-2 border border-gray-300">Offer</th>
            <th className="p-2 border border-gray-300">Notes</th>
          </tr>
        </thead>
        <tbody>
          {owned
            .filter((p) => p.forSale && p.interestedBuyers.length > 0)
            .flatMap((p) =>
              p.interestedBuyers.map((b) => (
                <tr key={p.id + b.id}>
                  <td className="p-2 border border-gray-300">{p.name}</td>
                  <td className="p-2 border border-gray-300">{b.name}</td>
                  <td className="p-2 border border-gray-300">
                    ${b.offer.toLocaleString()}
                  </td>
                  <td className="p-2 border border-gray-300">{b.notes}</td>
                  <td className="p-2 border border-gray-300">
                    <button
                      className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-white"
                      onClick={() => handleSell(p.id, b.id)}
                    >
                      Accept Offer
                    </button>
                  </td>
                </tr>
              ))
            )}
          {owned.filter((p) => p.forSale && p.interestedBuyers.length === 0)
            .length === 0 &&
            owned.filter((p) => p.forSale).length === 0 && (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-500">
                  No interested buyers yet.
                </td>
              </tr>
            )}
        </tbody>
      </table>

      <h2 className="mt-8 mb-2 font-semibold text-2xl">Transaction History</h2>
      <table className="border border-collapse border-gray-300 w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border border-gray-300">Date</th>
            <th className="p-2 border border-gray-300">Type</th>
            <th className="p-2 border border-gray-300">Property</th>
            <th className="p-2 border border-gray-300">Amount</th>
            <th className="p-2 border border-gray-300">Notes</th>
            <th className="p-2 border border-gray-300">Gain/Loss</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length === 0 && (
            <tr>
              <td colSpan={6} className="p-4 text-center text-gray-500">
                No transactions yet.
              </td>
            </tr>
          )}
          {transactions.map((tx) => (
            <tr key={tx.id}>
              <td className="p-2 border border-gray-300">
                {tx.date.toLocaleDateString()}
              </td>
              <td className="p-2 border border-gray-300">{tx.type}</td>
              <td className="p-2 border border-gray-300">{tx.propertyName}</td>
              <td className="p-2 border border-gray-300">
                ${tx.amount.toLocaleString()}
              </td>
              <td className="p-2 border border-gray-300">{tx.notes || ""}</td>
              <td className="p-2 border border-gray-300">
                {tx.type === "SELL" && typeof tx.gainLoss === "number" ? (
                  <span style={{ color: tx.gainLoss >= 0 ? "green" : "red" }}>
                    {tx.gainLoss >= 0 ? "+" : ""}${tx.gainLoss.toLocaleString()}
                  </span>
                ) : (
                  ""
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
