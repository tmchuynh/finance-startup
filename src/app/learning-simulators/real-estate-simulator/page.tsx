"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MOCK_PROPERTIES } from "@/lib/constants/data/realEstateData";
import {
  INITIAL_CASH,
  OwnedProperty,
  Property,
  Transaction,
} from "@/lib/interfaces/real-estate";
import {
  getRandomBuyers,
  getRandomRenters,
  randomConditionDowngrade,
} from "@/lib/utils/real-estate/renting";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

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
      // Only update cash and transactions for rent payments here
      setOwned((prev) => {
        let cashToAdd = 0;
        const rentTransactions: Transaction[] = [];
        // Only add one rent transaction per property per interval
        const updated = prev.map((p) => {
          const change = 1 + (Math.random() * 4 - 2) / 100;
          const newPrice = Math.max(50000, Math.round(p.price * change));
          let newCondition = p.condition;
          if (Math.random() < 0.05) {
            newCondition = randomConditionDowngrade(p.condition);
          }
          if (p.rentedTo && p.rentAmount) {
            cashToAdd += p.rentAmount!;
            rentTransactions.push({
              id: uuidv4(),
              type: "RENT_PAYMENT",
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
        if (cashToAdd > 0) {
          setCash((c) => c + cashToAdd);
        }
        // Only add rent payment transactions (not lease events) here
        if (rentTransactions.length > 0) {
          setTransactions((prevT) => [...rentTransactions, ...prevT]);
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
        // Only add transaction once here
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
        // Only add a transaction for the lease event, not for recurring rent payments
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
    <div className="mx-auto px-4 py-8 max-w-7xl container">
      {/* Header Section */}
      <div className="mb-8">
        <h1>Real Estate Investment Simulator</h1>
        <p className="mb-4 text-lg text-muted-foreground">
          Simulate buying, repairing, renting, and selling properties. Watch
          price trends, make repairs, and select buyers or renters to maximize
          your returns!
        </p>

        {/* Stats Dashboard */}
        <div className="gap-4 grid grid-cols-1 md:grid-cols-3 mb-6">
          <div className="bg-card p-4 border rounded-lg">
            <h4>Cash Balance</h4>
            <p className="font-bold text-2xl">${cash.toLocaleString()}</p>
          </div>
          <div className="bg-card p-4 border rounded-lg">
            <h4>Properties Owned</h4>
            <p className="font-bold text-2xl">{owned.length}</p>
          </div>
          <div className="bg-card p-4 border rounded-lg">
            <h4>Simulation Date</h4>
            <p className="text-lg">{simDate.toLocaleDateString()}</p>
          </div>
        </div>

        {message && (
          <div className="mb-4 p-4 border rounded-lg">
            <p className="">{message}</p>
          </div>
        )}
      </div>

      {/* Available Properties Section */}
      <div className="mb-8">
        <h2>Available Properties</h2>
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <h6>Name</h6>
                </TableHead>
                <TableHead>
                  <h6>Location</h6>
                </TableHead>
                <TableHead>
                  <h6>Current Price</h6>
                </TableHead>
                <TableHead>
                  <h6>Condition</h6>
                </TableHead>
                <TableHead>
                  <h6>Price Trend</h6>
                </TableHead>
                <TableHead>
                  <h6>Actions</h6>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {properties.filter((p) => !p.owned).length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="py-8 text-center text-muted-foreground"
                  >
                    No properties available for purchase.
                  </TableCell>
                </TableRow>
              ) : (
                properties
                  .filter((p) => !p.owned)
                  .map((p) => (
                    <TableRow key={p.id}>
                      <TableCell>{p.name}</TableCell>
                      <TableCell>{p.location}</TableCell>
                      <TableCell className="">
                        ${p.price.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`rounded-full text-xs font-medium w-1/2`}
                          variant={`${
                            p.condition === "Excellent"
                              ? "chart1"
                              : p.condition === "Good"
                              ? "chart4"
                              : p.condition === "Fair"
                              ? "chart3"
                              : "chart2"
                          }`}
                        >
                          {p.condition}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1 text-xs">
                          {p.trend.slice(-2).map((v, i) => (
                            <p key={i} className="px-1 rounded">
                              ${(v / 1000).toFixed(0)}k
                            </p>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          onClick={() => handleBuy(p)}
                          disabled={cash < p.price}
                        >
                          Buy
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Your Properties Section */}
      <div className="mb-8">
        <h2>Your Properties</h2>
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Current Value</TableHead>
                <TableHead>Condition</TableHead>
                <TableHead>Repairs Spent</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {owned.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="py-8 text-center text-muted-foreground"
                  >
                    You don't own any properties yet. Purchase some from the
                    available properties above!
                  </TableCell>
                </TableRow>
              ) : (
                owned.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell>{p.name}</TableCell>
                    <TableCell>{p.location}</TableCell>
                    <TableCell className="">
                      ${p.price.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={`${
                          p.condition === "Excellent"
                            ? "chart1"
                            : p.condition === "Good"
                            ? "chart4"
                            : p.condition === "Fair"
                            ? "chart3"
                            : "chart2"
                        }`}
                        className={`rounded-full text-xs font-medium`}
                      >
                        {p.condition}
                      </Badge>
                    </TableCell>
                    <TableCell>${p.repairs.toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        {p.rentedTo && (
                          <span className="bg-purple-100 rounded text-xs">
                            Rented: ${p.rentAmount?.toLocaleString()}/mo
                          </span>
                        )}
                        {p.forRent && !p.rentedTo && (
                          <span className="bg-yellow-100 rounded text-xs">
                            For Rent
                          </span>
                        )}
                        {p.forSale && (
                          <span className="bg-blue-100 rounded text-xs">
                            For Sale
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-2">
                        {p.condition !== "Excellent" && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleRepair(p.id)}
                          >
                            Repair
                          </Button>
                        )}
                        {!p.forSale && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleListForSale(p.id)}
                          >
                            List for Sale
                          </Button>
                        )}
                        {!p.forRent && !p.rentedTo && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleOpenRentModal(p.id)}
                          >
                            List for Rent
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Rent Modal */}
      {rentModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-card mx-4 p-6 border rounded-lg max-w-md w-full">
            <h3>Set Rent Range</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="min-rent">Minimum Rent ($/month)</Label>
                <input
                  id="min-rent"
                  type="number"
                  className="mt-1 px-3 py-2 border border-input focus:ring-2 focus:ring-ring rounded-md w-full focus:outline-none"
                  min={100}
                  value={rentModal.min}
                  onChange={(e) =>
                    handleSetRentRange(Number(e.target.value), rentModal.max)
                  }
                />
              </div>
              <div>
                <Label htmlFor="max-rent">Maximum Rent ($/month)</Label>
                <input
                  id="max-rent"
                  type="number"
                  className="mt-1 px-3 py-2 border border-input focus:ring-2 focus:ring-ring rounded-md w-full focus:outline-none"
                  min={rentModal.min}
                  value={rentModal.max}
                  onChange={(e) =>
                    handleSetRentRange(rentModal.min, Number(e.target.value))
                  }
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <Button onClick={handleListForRent} className="flex-1">
                List for Rent
              </Button>
              <Button
                variant="outline"
                onClick={() =>
                  setRentModal({
                    open: false,
                    propertyId: null,
                    min: 1000,
                    max: 2000,
                  })
                }
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Interested Buyers Section */}
      {owned.some((p) => p.forSale && p.interestedBuyers.length > 0) && (
        <div className="mb-8">
          <h2>Interested Buyers</h2>
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Property</TableHead>
                  <TableHead>Buyer</TableHead>
                  <TableHead>Offer</TableHead>
                  <TableHead>Notes</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {owned
                  .filter((p) => p.forSale && p.interestedBuyers.length > 0)
                  .flatMap((p) =>
                    p.interestedBuyers.map((b, idx) => (
                      <TableRow key={p.id + b.id}>
                        {idx === 0 && (
                          <TableCell rowSpan={p.interestedBuyers.length}>
                            <div>
                              <div className="font-medium">{p.name}</div>
                              <Button
                                variant="outline"
                                size="sm"
                                className="mt-2"
                                disabled={p.buyerRefreshes === 0}
                                onClick={() => handleRefreshBuyers(p.id)}
                              >
                                Refresh Buyers ({p.buyerRefreshes ?? 0} left)
                              </Button>
                            </div>
                          </TableCell>
                        )}
                        <TableCell>{b.name}</TableCell>
                        <TableCell className="">
                          ${b.offer.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm">
                          {b.notes}
                        </TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            onClick={() => handleSell(p.id, b.id)}
                          >
                            Accept Offer
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
              </TableBody>
            </Table>
          </div>
        </div>
      )}

      {/* Interested Renters Section */}
      {owned.some(
        (p) =>
          p.forRent && p.interestedRenters && p.interestedRenters.length > 0
      ) && (
        <div className="mb-8">
          <h2>Interested Renters</h2>
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Property</TableHead>
                  <TableHead>Renter</TableHead>
                  <TableHead>Offer</TableHead>
                  <TableHead>Notes</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {owned
                  .filter(
                    (p) =>
                      p.forRent &&
                      p.interestedRenters &&
                      p.interestedRenters.length > 0
                  )
                  .flatMap((p) =>
                    p.interestedRenters!.map((r, idx) => (
                      <TableRow key={p.id + r.id}>
                        {idx === 0 && (
                          <TableCell rowSpan={p.interestedRenters!.length}>
                            <div>
                              <div className="font-medium">{p.name}</div>
                              <Button
                                variant="outline"
                                size="sm"
                                className="mt-2"
                                disabled={p.renterRefreshes === 0}
                                onClick={() => handleRefreshRenters(p.id)}
                              >
                                Refresh Renters ({p.renterRefreshes ?? 0} left)
                              </Button>
                            </div>
                          </TableCell>
                        )}
                        <TableCell>{r.name}</TableCell>
                        <TableCell className="">
                          ${r.offer.toLocaleString()}/mo
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm">
                          {r.notes}
                        </TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            onClick={() => handleLease(p.id, r.id)}
                          >
                            Accept Offer
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
              </TableBody>
            </Table>
          </div>
        </div>
      )}

      {/* Transaction History Section */}
      <div className="mb-8">
        <h2>Transaction History</h2>
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Property</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Notes</TableHead>
                <TableHead>Gain/Loss</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="py-8 text-center text-muted-foreground"
                  >
                    No transactions yet. Start by purchasing a property!
                  </TableCell>
                </TableRow>
              ) : (
                transactions.map((tx) => {
                  const isMoneyIn =
                    tx.type === "SELL" ||
                    tx.type === "RENT" ||
                    tx.type === "RENT_PAYMENT";
                  const isMoneyOut = tx.type === "BUY" || tx.type === "REPAIR";

                  return (
                    <TableRow key={tx.id}>
                      <TableCell>{tx.date.toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge
                          variant={`${
                            tx.type === "BUY"
                              ? "chart4"
                              : tx.type === "SELL"
                              ? "chart5"
                              : tx.type === "REPAIR"
                              ? "chart2"
                              : tx.type === "RENT"
                              ? "chart1"
                              : "chart3"
                          }`}
                          className={`rounded-full text-xs font-medium`}
                        >
                          {tx.type.replace("_", " ")}
                        </Badge>
                      </TableCell>
                      <TableCell>{tx.propertyName}</TableCell>
                      <TableCell
                        className={` ${
                          isMoneyIn ? "" : isMoneyOut ? "text-red-600" : ""
                        }`}
                      >
                        {isMoneyIn ? "+" : isMoneyOut ? "-" : ""}$
                        {tx.amount.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {tx.notes || "—"}
                      </TableCell>
                      <TableCell>
                        {(tx.type === "SELL" || tx.type === "RENT") &&
                        typeof tx.gainLoss === "number" ? (
                          <span
                            className={` ${
                              tx.gainLoss >= 0 ? "" : "text-red-600"
                            }`}
                          >
                            {tx.gainLoss >= 0 ? "+" : ""}$
                            {tx.gainLoss.toLocaleString()}
                          </span>
                        ) : (
                          "—"
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Reset Game Section */}
      {owned.length === 0 && properties.every((p) => p.owned) && (
        <div className="text-center">
          <div className="mb-4 p-6 border rounded-lg">
            <h3>No Properties Available</h3>
            <p className="">
              All properties have been purchased. Start over to continue
              playing!
            </p>
          </div>
          <Button size="lg" onClick={handleRestart} className="px-8">
            Start New Game
          </Button>
        </div>
      )}
    </div>
  );
}
