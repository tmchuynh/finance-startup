"use client";

import { buyStock } from "@/components/stocks/buyStock";
import { PortfolioTable } from "@/components/stocks/PortfolioTable";
import { sellStock } from "@/components/stocks/sellStock";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MOCK_STOCKS } from "@/lib/constants/data/stockData";
import { Portfolio, Stock } from "@/lib/interfaces";
import { useEffect, useState } from "react";

const INITIAL_CASH = 100000;

export default function StockMarketLearningSimulatorPage() {
  const [stocks, setStocks] = useState<Stock[]>(MOCK_STOCKS);
  const [portfolio, setPortfolio] = useState<Portfolio>({
    cash: INITIAL_CASH,
    holdings: [],
    transactions: [],
  });
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [quantity, setQuantity] = useState<number>(0);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const interval = setInterval(() => {
      setStocks((prevStocks) => updatePrices(prevStocks));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const portfolioValue = portfolio.holdings.reduce((total, h) => {
    const stock = stocks.find((s) => s.symbol === h.symbol);
    return total + (stock ? stock.price * h.quantity : 0);
  }, portfolio.cash);

  function updatePrices(currentStocks: Stock[]): Stock[] {
    return currentStocks.map((stock) => {
      // Random price change between -1% and +1%
      const changePercent = (Math.random() * 2 - 1) / 100;
      let newPrice = stock.price * (1 + changePercent);
      if (newPrice < 1) newPrice = 1; // prevent price going below $1
      return { ...stock, price: parseFloat(newPrice.toFixed(2)) };
    });
  }

  const handleBuy = () => {
    if (!selectedStock || quantity <= 0) return;
    const result = buyStock(portfolio, selectedStock, quantity);
    if (typeof result === "string") setMessage(result);
    else {
      setPortfolio(result);
      setMessage(`Bought ${quantity} shares of ${selectedStock.symbol}`);
    }
  };

  const handleSell = () => {
    if (!selectedStock || quantity <= 0) return;
    const result = sellStock(portfolio, selectedStock, quantity);
    if (typeof result === "string") setMessage(result);
    else {
      setPortfolio(result);
      setMessage(`Sold ${quantity} shares of ${selectedStock.symbol}`);
    }
  };

  return (
    <div className="mx-auto p-6 max-w-4xl">
      <h1 className="mb-6 font-bold text-3xl">
        Stock Market Learning Simulator
      </h1>

      <div className="mb-4">
        <Label className="block mb-1 font-semibold">Select Stock</Label>
        <select
          className="p-2 border rounded w-full"
          value={selectedStock?.symbol || ""}
          onChange={(e) => {
            const stock = MOCK_STOCKS.find((s) => s.symbol === e.target.value);
            setSelectedStock(stock || null);
          }}
        >
          <option value="">-- Select --</option>
          {stocks.map((stock) => (
            <option key={stock.symbol} value={stock.symbol}>
              {stock.symbol} - {stock.name} (${stock.price.toFixed(2)})
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <Label className="block mb-1 font-semibold">Quantity</Label>
        <Input
          type="number"
          className="p-2 border rounded w-full"
          min={1}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
      </div>

      <div className="flex gap-4 mb-6">
        <button
          className="bg-green-600 hover:bg-green-700 disabled:opacity-50 px-4 py-2 rounded text-white"
          onClick={handleBuy}
          disabled={!selectedStock || quantity <= 0}
        >
          Buy
        </button>
        <button
          className="bg-red-600 hover:bg-red-700 disabled:opacity-50 px-4 py-2 rounded text-white"
          onClick={handleSell}
          disabled={!selectedStock || quantity <= 0}
        >
          Sell
        </button>
      </div>

      {message && <p className="mb-4 text-blue-600">{message}</p>}

      <h2 className="mb-2 font-semibold text-2xl">Portfolio</h2>
      <p className="mb-2">Cash Balance: ${portfolio.cash.toFixed(2)}</p>
      <p className="mb-4 font-semibold">
        Total Portfolio Value: ${portfolioValue.toFixed(2)}
      </p>

      <PortfolioTable portfolio={portfolio} stocks={stocks} />

      <h2 className="mt-8 mb-2 font-semibold text-2xl">Transaction History</h2>
      <table className="border border-collapse border-gray-300 w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border border-gray-300 text-left">Date</th>
            <th className="p-2 border border-gray-300 text-left">Type</th>
            <th className="p-2 border border-gray-300 text-left">Symbol</th>
            <th className="p-2 border border-gray-300 text-left">Quantity</th>
            <th className="p-2 border border-gray-300 text-left">Price</th>
          </tr>
        </thead>
        <tbody>
          {portfolio.transactions.length === 0 && (
            <tr>
              <td colSpan={5} className="p-4 text-center text-gray-500">
                No transactions yet.
              </td>
            </tr>
          )}
          {portfolio.transactions.map((tx) => (
            <tr key={tx.id}>
              <td className="p-2 border border-gray-300">
                {tx.date.toLocaleDateString()}
              </td>
              <td className="p-2 border border-gray-300">{tx.type}</td>
              <td className="p-2 border border-gray-300">{tx.symbol}</td>
              <td className="p-2 border border-gray-300">{tx.quantity}</td>
              <td className="p-2 border border-gray-300">
                ${tx.price.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
