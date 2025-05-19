"use client";

import { Portfolio, Stock } from "@/lib/interfaces/stock";
import { v4 as uuidv4 } from "uuid";

export function buyStock(
  portfolio: Portfolio,
  stock: Stock,
  quantity: number
): Portfolio | string {
  const cost = stock.price * quantity;
  if (cost > portfolio.cash) return "Insufficient cash balance";

  // Update holdings
  const existing = portfolio.holdings.find((h) => h.symbol === stock.symbol);
  if (existing) {
    const totalCost = existing.averagePrice * existing.quantity + cost;
    const newQuantity = existing.quantity + quantity;
    existing.averagePrice = totalCost / newQuantity;
    existing.quantity = newQuantity;
  } else {
    portfolio.holdings.push({
      symbol: stock.symbol,
      quantity,
      averagePrice: stock.price,
    });
  }

  // Deduct cash
  portfolio.cash -= cost;

  // Record transaction
  portfolio.transactions.push({
    id: uuidv4(),
    symbol: stock.symbol,
    type: "BUY",
    quantity,
    price: stock.price,
    date: new Date(),
  });

  return { ...portfolio };
}
