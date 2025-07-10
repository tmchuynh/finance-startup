"use client";

import { buyStock } from "@/components/stocks/buyStock";
import { PortfolioTable } from "@/components/stocks/PortfolioTable";
import { sellStock } from "@/components/stocks/sellStock";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
    <div className="mx-auto px-4 py-8 max-w-7xl container">
      {/* Header Section */}
      <div className="mb-8">
        <h1>Stock Market Learning Simulator</h1>
        <div>
          <p className="mb-3">
            Welcome to the Stock Market Learning Simulator! Practice buying and
            selling stocks in a risk-free environment to build your investment
            skills.
          </p>
          <p className="text-sm">
            <strong>Disclaimer:</strong> This simulator provides estimates for
            educational purposes only. Actual prices, transactions, and costs
            may vary. Consult a financial professional before making real
            investment decisions.
          </p>
        </div>

        {/* Stats Dashboard */}
        <div className="gap-4 grid grid-cols-1 md:grid-cols-3 mb-6">
          <div className="bg-card p-4 border rounded-lg">
            <h4>Available Cash</h4>
            <p className="font-bold text-2xl">
              {formatNumberToCurrency(portfolio.cash, 2, 2)}
            </p>
          </div>
          <div className="bg-card p-4 border rounded-lg">
            <h4>Total Portfolio Value</h4>
            <p className="font-bold text-2xl">
              {formatNumberToCurrency(portfolioValue, 2, 2)}
            </p>
          </div>
          <div className="bg-card p-4 border rounded-lg">
            <h4>Holdings</h4>
            <p className="font-bold text-2xl">
              {portfolio.holdings.length} stocks
            </p>
          </div>
        </div>

        {message && (
          <div className="mb-4 p-4 border rounded-lg">
            <p className="">{message}</p>
          </div>
        )}
      </div>

      {/* Trading Section */}
      <div className="mb-8">
        <h2>Trade Stocks</h2>
        <div className="bg-card p-6 border rounded-lg">
          <p className="mb-6 text-muted-foreground">
            Stock prices update every 3 seconds. Select a stock and quantity to
            buy or sell. Note: Prices are simulated and for educational purposes
            only.
          </p>

          <div className="gap-6 grid grid-cols-1 md:grid-cols-2 mb-6">
            <div>
              <Label
                htmlFor="stock-select"
                className="block mb-2 font-medium text-sm"
              >
                Select Stock
              </Label>
              <select
                id="stock-select"
                className="bg-background px-3 py-2 border border-input focus:ring-2 focus:ring-ring rounded-md w-full focus:outline-none"
                value={selectedStock?.symbol || ""}
                onChange={(e) => {
                  const stock = MOCK_STOCKS.find(
                    (s) => s.symbol === e.target.value
                  );
                  setSelectedStock(stock || null);
                }}
              >
                <option value="">-- Select a stock --</option>
                {stocks.map((stock) => (
                  <option key={stock.symbol} value={stock.symbol}>
                    {stock.symbol} - {stock.name} (
                    {formatNumberToCurrency(stock.price, 2, 2)})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label
                htmlFor="quantity"
                className="block mb-2 font-medium text-sm"
              >
                Quantity
              </Label>
              <div className="flex gap-2">
                <Input
                  id="quantity"
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="flex-1"
                />
                <Button
                  variant="outline"
                  size="sm"
                  disabled={!selectedStock}
                  onClick={() => {
                    if (selectedStock) {
                      const max = Math.floor(
                        portfolio.cash / selectedStock.price
                      );
                      setQuantity(max > 0 ? max : 0);
                    }
                  }}
                >
                  Max
                </Button>
              </div>
              {selectedStock && (
                <p className="mt-1 text-muted-foreground text-sm">
                  Max affordable:{" "}
                  {Math.floor(portfolio.cash / selectedStock.price)} shares
                </p>
              )}
            </div>
          </div>

          <div className="flex gap-4">
            <Button
              onClick={handleBuy}
              disabled={!selectedStock || quantity <= 0}
              className="bg-green-600 hover:bg-green-700"
            >
              Buy Shares
            </Button>
            <Button
              variant="destructive"
              onClick={handleSell}
              disabled={!selectedStock || quantity <= 0}
            >
              Sell Shares
            </Button>
          </div>
        </div>
      </div>

      {/* Current Stock Prices */}
      <div className="mb-8">
        <h2>Current Stock Prices</h2>
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Symbol</TableHead>
                <TableHead>Company Name</TableHead>
                <TableHead>Current Price</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stocks.map((stock) => (
                <TableRow key={stock.symbol}>
                  <TableCell className="font-mono">{stock.symbol}</TableCell>
                  <TableCell>{stock.name}</TableCell>
                  <TableCell className="">
                    {formatNumberToCurrency(stock.price, 2, 2)}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedStock(stock)}
                    >
                      Select
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Portfolio Section */}
      <div className="mb-8">
        <h2>Your Portfolio</h2>
        <PortfolioTable
          portfolio={portfolio}
          stocks={stocks}
          onSelectStock={handleSelectStock}
          onSellAll={handleSellAll}
        />
      </div>

      {/* Transaction History Section */}
      <div className="mb-8">
        <h2>Transaction History</h2>
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Symbol</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Price per Share</TableHead>
                <TableHead>Total Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {portfolio.transactions.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="py-8 text-center text-muted-foreground"
                  >
                    No transactions yet. Start trading to see your transaction
                    history!
                  </TableCell>
                </TableRow>
              ) : (
                portfolio.transactions.map((tx) => {
                  const isMoneyIn = tx.type === "SELL";
                  const isMoneyOut = tx.type === "BUY";
                  const totalValue = tx.price * tx.quantity;

                  return (
                    <TableRow key={tx.id}>
                      <TableCell>{tx.date.toLocaleDateString()}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            tx.type === "BUY"
                              ? "bg-red-100 text-red-800"
                              : "bg-green-100 "
                          }`}
                        >
                          {tx.type}
                        </span>
                      </TableCell>
                      <TableCell className="font-mono">{tx.symbol}</TableCell>
                      <TableCell>{tx.quantity.toLocaleString()}</TableCell>
                      <TableCell className="">${tx.price.toFixed(2)}</TableCell>
                      <TableCell
                        className={` ${
                          isMoneyIn ? "" : isMoneyOut ? "text-red-600" : ""
                        }`}
                      >
                        {isMoneyIn ? "+" : isMoneyOut ? "-" : ""}$
                        {totalValue.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
