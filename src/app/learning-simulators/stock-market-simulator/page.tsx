"use client";

import { buyStock } from "@/components/stocks/buyStock";
import { PortfolioTable } from "@/components/stocks/PortfolioTable";
import { sellStock } from "@/components/stocks/sellStock";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MOCK_STOCKS } from "@/lib/constants/data/stockData";
import { Portfolio, Stock } from "@/lib/interfaces/stock";
import { formatNumberToCurrency } from "@/lib/utils/format";
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

  const handleSellAll = (symbol: string) => {
    const stock = stocks.find((s) => s.symbol === symbol);
    const holding = portfolio.holdings.find((h) => h.symbol === symbol);
    if (stock && holding && holding.quantity > 0) {
      const result = sellStock(portfolio, stock, holding.quantity);
      if (typeof result === "string") setMessage(result);
      else {
        setPortfolio(result);
        setMessage(`Sold all shares of ${symbol}`);
      }
    }
  };

  const handleSelectStock = (symbol: string) => {
    const stock = stocks.find((s) => s.symbol === symbol);
    if (stock) setSelectedStock(stock);
  };

  return (
    <div className="mx-auto pt-6 sm:pt-12 lg:pt-16 pb-24 lg:pb-32 w-10/12 md:w-11/12">
      <div className="mb-12">
        <h1>Stock Market Learning Simulator</h1>
        <p>
          Welcome to the Stock Market Learning Simulator! Here, you can practice
          buying and selling stocks in a risk-free environment. Use the form
          below to select a stock and enter the quantity you want to buy or
          sell. Your portfolio will be updated accordingly.
        </p>
        <p className="mt-4">
          This simulator provides estimates for informational purposes only.
          Actual prices, transactions, and costs may vary. Consult a financial
          professional before making decisions.
        </p>
        <h2 className="mt-7">Trade Stocks</h2>
        <p className="mb-2">
          Select a stock from the list below and enter the quantity you want to
          buy or sell. Your portfolio will be updated accordingly. Current Stock
          Prices are updated every 3 seconds. You can buy or sell stocks using
          the buttons below. Your portfolio will be updated accordingly.
        </p>
        <p className="mb-2">
          Please note that the stock prices are simulated and do not reflect
          real market conditions. This simulator is for educational purposes
          only.
        </p>
        <p className="mb-2">
          Your current cash balance is{" "}
          <strong> {formatNumberToCurrency(portfolio.cash, 2, 2)}</strong>. You
          can buy stocks as long as you have sufficient cash. If you sell
          stocks, the proceeds will be added to your cash balance. Your
          portfolio value is the sum of your cash balance and the value of your
          stock holdings. The total portfolio value is displayed below.
        </p>
        <p className="mb-2">
          The transaction history is displayed at the bottom of the page. It
          shows the date, type (buy/sell), symbol, quantity, and price of each
          transaction. You can use this information to track your trading
          activity.
        </p>
        <p className="mb-2">
          If you have any questions or need assistance, please contact our
          support team. We're here to help you learn and succeed in the stock
          market!
        </p>
      </div>

      <div className="flex md:flex-row flex-col justify-between gap-6 w-full">
        <div className="mb-4 w-full">
          <Label className="block mb-1 font-semibold">Select Stock</Label>
          <select
            className="p-2 border rounded w-full"
            value={selectedStock?.symbol || ""}
            onChange={(e) => {
              const stock = MOCK_STOCKS.find(
                (s) => s.symbol === e.target.value
              );
              setSelectedStock(stock || null);
            }}
          >
            <option value="">-- Select --</option>
            {stocks.map((stock) => (
              <option key={stock.symbol} value={stock.symbol}>
                {stock.symbol} - {stock.name} (
                {formatNumberToCurrency(stock.price, 2, 2)})
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <Label className="block mb-1 font-semibold">Quantity</Label>
          <div className="flex gap-2">
            <Input
              type="number"
              className="p-2 border rounded w-full"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
            <button
              type="button"
              className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded font-semibold text-sm"
              disabled={!selectedStock}
              onClick={() => {
                if (selectedStock) {
                  const max = Math.floor(portfolio.cash / selectedStock.price);
                  setQuantity(max > 0 ? max : 0);
                }
              }}
            >
              Max
            </button>
          </div>
        </div>
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

      <h2>Portfolio</h2>
      <p className="mb-2">
        Cash Balance: {formatNumberToCurrency(portfolio.cash, 2, 2)}
      </p>
      <p className="mb-4 font-semibold">
        Total Portfolio Value: {formatNumberToCurrency(portfolioValue, 2, 2)}
      </p>

      <PortfolioTable
        portfolio={portfolio}
        stocks={stocks}
        onSelectStock={handleSelectStock}
        onSellAll={handleSellAll}
      />

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
          {portfolio.transactions.map((tx) => {
            const isMoneyIn = tx.type === "SELL";
            const isMoneyOut = tx.type === "BUY";
            return (
              <tr key={tx.id}>
                <td className="p-2 border border-gray-300">
                  {tx.date.toLocaleDateString()}
                </td>
                <td className="p-2 border border-gray-300">{tx.type}</td>
                <td className="p-2 border border-gray-300">{tx.symbol}</td>
                <td className="p-2 border border-gray-300">{tx.quantity}</td>
                <td
                  className="p-2 border border-gray-300"
                  style={{
                    color: isMoneyIn ? "green" : isMoneyOut ? "red" : undefined,
                    fontWeight: isMoneyIn || isMoneyOut ? 600 : undefined,
                  }}
                >
                  ${tx.price.toFixed(2)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
