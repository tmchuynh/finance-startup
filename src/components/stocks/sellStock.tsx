"use client";
import { Portfolio, Stock } from "@/lib/interfaces";
import { v4 as uuidv4 } from "uuid";

export function sellStock(
  portfolio: Portfolio,
  stock: Stock,
  quantity: number
): Portfolio | string {
  const existing = portfolio.holdings.find((h) => h.symbol === stock.symbol);
  if (!existing || existing.quantity < quantity)
    return "Insufficient stock quantity";

  const revenue = stock.price * quantity;

  // Update holdings
  existing.quantity -= quantity;
  if (existing.quantity === 0) {
    portfolio.holdings = portfolio.holdings.filter(
      (h) => h.symbol !== stock.symbol
    );
  }

  // Add cash
  portfolio.cash += revenue;

  // Record transaction
  portfolio.transactions.push({
    id: uuidv4(),
    symbol: stock.symbol,
    type: "SELL",
    quantity,
    price: stock.price,
    date: new Date(),
  });

  return { ...portfolio };
}
