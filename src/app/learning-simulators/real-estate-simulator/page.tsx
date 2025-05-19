"use client";

import {
  buyers,
  MOCK_PROPERTIES,
  renters,
} from "@/lib/constants/data/realEstateData";
import {
  Buyer,
  INITIAL_CASH,
  OwnedProperty,
  Property,
  Renter,
  Transaction,
} from "@/lib/interfaces/real-estate";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

function randomConditionDowngrade(condition: Property["condition"]) {
  if (condition === "Excellent") return "Good";
  if (condition === "Good") return "Fair";
  if (condition === "Fair") return "Needs Repair";
  return "Needs Repair";
}

function getRandomBuyers(property: Property): Buyer[] {
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

function getRandomRenters(min: number, max: number): Renter[] {
  return Array.from({ length: Math.floor(Math.random() * 3) + 1 }, () => {
    const renter = renters[Math.floor(Math.random() * renters.length)];
    return {
      id: uuidv4(),
      name: renter.name,
      offer: Math.round((min + Math.random() * (max - min)) / 10) * 10,
      notes: renter.notes,
    };
  });
}

export default function RealEstateSimulatorPage() {
  const [cash, setCash] = useState(INITIAL_CASH);
  const [properties, setProperties] = useState<Property[]>(MOCK_PROPERTIES);
  const [owned, setOwned] = useState<OwnedProperty[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [message, setMessage] = useState<string>("");
  const [rentModal, setRentModal] = useState<{
    open: boolean;
    propertyId: string | null;
    min: number;
    max: number;
  }>({ open: false, propertyId: null, min: 1000, max: 2000 });
  const [simDate, setSimDate] = useState<Date>(new Date());

  // Simulate price trends, random condition changes, and advance date
  useEffect(() => {
    const interval = setInterval(() => {
      setSimDate((prev) => {
        const next = new Date(prev);
        next.setDate(prev.getDate() + 30); // Advance by 30 days per tick
        return next;
      });
      setProperties((prev) =>
        prev.map((p) => {
          const change = 1 + (Math.random() * 4 - 2) / 100;
          const newPrice = Math.max(50000, Math.round(p.price * change));
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
      setOwned((prev) => {
        const newTransactions: Transaction[] = [];
        const updated = prev.map((p) => {
          const change = 1 + (Math.random() * 4 - 2) / 100;
          const newPrice = Math.max(50000, Math.round(p.price * change));
          let newCondition = p.condition;
          if (Math.random() < 0.05) {
            newCondition = randomConditionDowngrade(p.condition);
          }
          if (p.rentedTo && p.rentAmount) {
            setCash((c) => c + p.rentAmount!);
            newTransactions.push({
              id: uuidv4(),
              type: "RENT",
              propertyName: p.name,
              amount: p.rentAmount!,
              date: new Date(simDate.getTime() + 30 * 24 * 60 * 60 * 1000),
              notes: `Monthly rent received from ${p.rentedTo?.name}`,
            });
          }
          return {
            ...p,
            price: newPrice,
            trend: [...p.trend.slice(-19), newPrice],
            condition: newCondition,
          };
        });
        if (newTransactions.length > 0) {
          setTransactions((prevT) => [...newTransactions, ...prevT]);
        }
        return updated;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [simDate]);

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
        purchaseDate: new Date(simDate),
        repairs: 0,
        forSale: false,
        interestedBuyers: [],
      },
    ]);
    setTransactions((prev) => [
      {
        id: uuidv4(),
        type: "BUY",
        propertyName: property.name,
        amount: property.price,
        date: new Date(simDate),
      },
      ...prev,
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
          {
            id: uuidv4(),
            type: "REPAIR",
            propertyName: p.name,
            amount: repairCost,
            date: new Date(simDate),
            notes: `Upgraded to ${newCondition}`,
          },
          ...prevT,
        ]);
        setMessage(
          `Repaired ${
            p.name
          } for $${repairCost.toLocaleString()} (now ${newCondition})`
        );

        // If property is for rent or rented, increase rent by 15%
        const updated = {
          ...p,
          condition: newCondition,
          repairs: p.repairs + repairCost,
        };
        if ((p.forRent || p.rentedTo) && p.rentAmount) {
          updated.rentAmount = Math.round(p.rentAmount * 1.15);
        }
        return updated;
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
              buyerRefreshes: 3,
            }
          : p
      )
    );
    setMessage("Property listed for sale. Buyers are making offers!");
  };

  const handleRefreshBuyers = (propertyId: string) => {
    setOwned((prev) =>
      prev.map((p) =>
        p.id === propertyId && p.forSale && (p.buyerRefreshes ?? 0) > 0
          ? {
              ...p,
              interestedBuyers: getRandomBuyers(p),
              buyerRefreshes: (p.buyerRefreshes ?? 1) - 1,
            }
          : p
      )
    );
  };

  const handleSell = (propertyId: string, buyerId: string) => {
    const property = owned.find((p) => p.id === propertyId);
    if (!property) return;
    const buyer = property.interestedBuyers.find((b) => b.id === buyerId);
    if (!buyer) return;
    setCash((c) => c + buyer.offer);
    setOwned((prev) => prev.filter((p) => p.id !== propertyId));
    setTransactions((prevT) => [
      {
        id: uuidv4(),
        type: "SELL",
        propertyName: property.name,
        amount: buyer.offer,
        date: new Date(simDate),
        notes: `Sold to ${buyer.name}`,
        gainLoss: buyer.offer - property.purchasePrice - property.repairs,
      },
      ...prevT,
    ]);
    setMessage(
      `Sold ${property.name} to ${
        buyer.name
      } for $${buyer.offer.toLocaleString()}`
    );
  };

  const handleOpenRentModal = (propertyId: string) => {
    setRentModal({ open: true, propertyId, min: 1000, max: 2000 });
  };

  const handleSetRentRange = (min: number, max: number) => {
    setRentModal((prev) => ({ ...prev, min, max }));
  };

  const handleListForRent = () => {
    if (!rentModal.propertyId) return;
    setOwned((prev) =>
      prev.map((p) =>
        p.id === rentModal.propertyId
          ? {
              ...p,
              forRent: true,
              rentRange: [rentModal.min, rentModal.max],
              interestedRenters: getRandomRenters(rentModal.min, rentModal.max),
              renterRefreshes: 5,
            }
          : p
      )
    );
    setRentModal({ open: false, propertyId: null, min: 1000, max: 2000 });
    setMessage("Property listed for rent. Renters are making offers!");
  };

  const handleRefreshRenters = (propertyId: string) => {
    setOwned((prev) =>
      prev.map((p) =>
        p.id === propertyId &&
        p.forRent &&
        (p.renterRefreshes ?? 0) > 0 &&
        p.rentRange
          ? {
              ...p,
              interestedRenters: getRandomRenters(
                p.rentRange[0],
                p.rentRange[1]
              ),
              renterRefreshes: (p.renterRefreshes ?? 1) - 1,
            }
          : p
      )
    );
  };

  const handleLease = (propertyId: string, renterId: string) => {
    setOwned((prev) =>
      prev.map((p) => {
        if (p.id !== propertyId) return p;
        const renter = p.interestedRenters?.find((r) => r.id === renterId);
        if (!renter) return p;
        setTransactions((prevT) => [
          {
            id: uuidv4(),
            type: "RENT",
            propertyName: p.name,
            amount: renter.offer,
            date: new Date(simDate),
            notes: `Leased to ${renter.name} for $${renter.offer}/mo`,
          },
          ...prevT,
        ]);
        setMessage(
          `Leased ${p.name} to ${
            renter.name
          } for $${renter.offer.toLocaleString()}/month`
        );
        return {
          ...p,
          forRent: false,
          interestedRenters: [],
          rentedTo: renter,
          rentAmount: renter.offer,
        };
      })
    );
  };

  const handleRestart = () => {
    setCash(INITIAL_CASH);
    setProperties(
      MOCK_PROPERTIES.map((p) => ({
        ...p,
        owned: false,
        trend: [p.price],
        repairs: 0,
      }))
    );
    setOwned([]);
    setTransactions([]);
    setMessage("");
  };

  return (
    <div className="mx-auto pt-6 sm:pt-12 lg:pt-16 pb-24 lg:pb-32 w-10/12 md:w-11/12">
      <h1>Real Estate Investment Simulator</h1>
      <p className="mb-4">
        Simulate buying, repairing, renting, and selling properties. Watch price
        trends, make repairs, and select buyers or renters to maximize your
        returns!
      </p>
      <p className="mb-4">
        Cash Balance: <strong>${cash.toLocaleString()}</strong>
      </p>
      {message && <p className="mb-4 text-secondary">{message}</p>}

      <h2 className="mt-8 mb-2 font-semibold text-2xl">Available Properties</h2>
      <table className="mb-8 border border-collapse border-gray-300 w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border border-gray-300">Name</th>
            <th className="p-2 border border-gray-300">Location</th>
            <th className="p-2 border border-gray-300">Current Price</th>
            <th className="p-2 border border-gray-300">Condition</th>
            <th className="p-2 border border-gray-300">Trend</th>
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
                  {p.trend.slice(-2).map((v, i) => (
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
            <th className="p-2 border border-gray-300">Trend</th>
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
                {p.trend.slice(-2).map((v, i) => (
                  <span key={i} style={{ marginRight: 4 }}>
                    ${v.toLocaleString()}
                  </span>
                ))}
              </td>
              <td className="flex flex-col gap-2 p-2 border border-gray-300">
                {/* Only show Repair button if property is not Excellent */}
                {p.condition !== "Excellent" ? (
                  <button
                    className="bg-yellow-500 hover:bg-yellow-600 mb-1 px-3 py-1 rounded text-white"
                    onClick={() => handleRepair(p.id)}
                  >
                    Repair
                  </button>
                ) : (
                  <button
                    className="bg-gray-300 mb-1 px-3 py-1 rounded text-gray-500"
                    disabled
                  >
                    No Repairs Needed
                  </button>
                )}
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
                {!p.forRent && !p.rentedTo ? (
                  <button
                    className="bg-purple-600 hover:bg-purple-700 mt-1 px-3 py-1 rounded text-white"
                    onClick={() => handleOpenRentModal(p.id)}
                  >
                    List for Rent
                  </button>
                ) : p.rentedTo ? (
                  <span className="font-semibold text-purple-700">
                    Rented (${p.rentAmount?.toLocaleString()}/mo)
                  </span>
                ) : (
                  <span className="font-semibold text-purple-700">
                    For Rent
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Rent Modal */}
      {rentModal.open && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div className="bg-white shadow-lg p-6 rounded w-80">
            <h3 className="mb-2 font-semibold text-lg">Set Rent Range</h3>
            <div className="mb-2">
              <label className="block mb-1">Min ($/month)</label>
              <input
                type="number"
                className="p-1 border rounded w-full"
                min={100}
                value={rentModal.min}
                onChange={(e) =>
                  handleSetRentRange(Number(e.target.value), rentModal.max)
                }
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Max ($/month)</label>
              <input
                type="number"
                className="p-1 border rounded w-full"
                min={rentModal.min}
                value={rentModal.max}
                onChange={(e) =>
                  handleSetRentRange(rentModal.min, Number(e.target.value))
                }
              />
            </div>
            <div className="flex gap-2">
              <button
                className="bg-purple-600 hover:bg-purple-700 px-3 py-1 rounded text-white"
                onClick={handleListForRent}
              >
                List for Rent
              </button>
              <button
                className="bg-gray-300 px-3 py-1 rounded"
                onClick={() =>
                  setRentModal({
                    open: false,
                    propertyId: null,
                    min: 1000,
                    max: 2000,
                  })
                }
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Show restart button if user owns no properties and all properties are not owned */}
      {owned.length === 0 && properties.every((p) => p.owned) && (
        <div className="flex justify-center mb-8">
          <button
            className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded font-semibold text-white"
            onClick={handleRestart}
          >
            Start Over
          </button>
        </div>
      )}

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
              p.interestedBuyers.map((b, idx) => (
                <tr key={p.id + b.id}>
                  {idx === 0 && (
                    <td
                      className="p-2 border border-gray-300"
                      rowSpan={p.interestedBuyers.length}
                    >
                      {p.name}
                      <div className="mt-2">
                        <button
                          className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded text-xs"
                          disabled={p.buyerRefreshes === 0}
                          onClick={() => handleRefreshBuyers(p.id)}
                        >
                          Refresh Buyers ({p.buyerRefreshes ?? 0} left)
                        </button>
                      </div>
                    </td>
                  )}
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

      <h2 className="mt-8 mb-2 font-semibold text-2xl">Interested Renters</h2>
      <table className="mb-8 border border-collapse border-gray-300 w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border border-gray-300">Property</th>
            <th className="p-2 border border-gray-300">Renter</th>
            <th className="p-2 border border-gray-300">Offer</th>
            <th className="p-2 border border-gray-300">Notes</th>
          </tr>
        </thead>
        <tbody>
          {owned
            .filter(
              (p) =>
                p.forRent &&
                p.interestedRenters &&
                p.interestedRenters.length > 0
            )
            .flatMap((p) =>
              p.interestedRenters!.map((r, idx) => (
                <tr key={p.id + r.id}>
                  {idx === 0 && (
                    <td
                      className="p-2 border border-gray-300"
                      rowSpan={p.interestedRenters!.length}
                    >
                      {p.name}
                      <div className="mt-2">
                        <button
                          className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded text-xs"
                          disabled={p.renterRefreshes === 0}
                          onClick={() => handleRefreshRenters(p.id)}
                        >
                          Refresh Renters ({p.renterRefreshes ?? 0} left)
                        </button>
                      </div>
                    </td>
                  )}
                  <td className="p-2 border border-gray-300">{r.name}</td>
                  <td className="p-2 border border-gray-300">
                    ${r.offer.toLocaleString()}
                  </td>
                  <td className="p-2 border border-gray-300">{r.notes}</td>
                  <td className="p-2 border border-gray-300">
                    <button
                      className="bg-purple-600 hover:bg-purple-700 px-3 py-1 rounded text-white"
                      onClick={() => handleLease(p.id, r.id)}
                    >
                      Accept Offer
                    </button>
                  </td>
                </tr>
              ))
            )}
          {owned.filter(
            (p) =>
              p.forRent &&
              (!p.interestedRenters || p.interestedRenters.length === 0)
          ).length === 0 &&
            owned.filter((p) => p.forRent).length === 0 && (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-500">
                  No interested renters yet.
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
          {transactions.map((tx) => {
            // Highlight money in (SELL, RENT, RENT_PAYMENT) as green, money out (BUY/REPAIR) as red
            const isMoneyIn = tx.type === "SELL" || tx.type === "RENT";
            const isMoneyOut = tx.type === "BUY" || tx.type === "REPAIR";
            return (
              <tr key={tx.id}>
                <td className="p-2 border border-gray-300">
                  {tx.date.toLocaleDateString()}
                </td>
                <td className="p-2 border border-gray-300">{tx.type}</td>
                <td className="p-2 border border-gray-300">
                  {tx.propertyName}
                </td>
                <td
                  className="p-2 border border-gray-300"
                  style={{
                    color: isMoneyIn ? "green" : isMoneyOut ? "red" : undefined,
                    fontWeight: isMoneyIn || isMoneyOut ? 600 : undefined,
                  }}
                >
                  ${tx.amount.toLocaleString()}
                </td>
                <td className="p-2 border border-gray-300">{tx.notes || ""}</td>
                <td className="p-2 border border-gray-300">
                  {(tx.type === "SELL" || tx.type === "RENT") &&
                  typeof tx.gainLoss === "number" ? (
                    <span style={{ color: tx.gainLoss >= 0 ? "green" : "red" }}>
                      {tx.gainLoss >= 0 ? "+" : ""}$
                      {tx.gainLoss.toLocaleString()}
                    </span>
                  ) : (
                    ""
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
