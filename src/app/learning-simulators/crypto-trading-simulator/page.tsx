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
import { MOCK_CRYPTOS } from "@/lib/constants/data/cryptoData";
import { Portfolio, Stock } from "@/lib/interfaces/stock";
import { formatNumberToCurrency } from "@/lib/utils/format";
import { useEffect, useState } from "react";

const INITIAL_CASH = 100000;

export default function CryptoTradingSimulatorPage() {
  const [cryptos, setCryptos] = useState<Stock[]>(MOCK_CRYPTOS);
  const [portfolio, setPortfolio] = useState<Portfolio>({
    cash: INITIAL_CASH,
    holdings: [],
    transactions: [],
  });
  const [selectedCrypto, setSelectedCrypto] = useState<Stock | null>(null);
  const [quantity, setQuantity] = useState<number>(0);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const interval = setInterval(() => {
      setCryptos((prevCryptos) => updatePrices(prevCryptos));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const portfolioValue = portfolio.holdings.reduce((total, h) => {
    const crypto = cryptos.find((c) => c.symbol === h.symbol);
    return total + (crypto ? crypto.price * h.quantity : 0);
  }, portfolio.cash);

  function updatePrices(currentCryptos: Stock[]): Stock[] {
    return currentCryptos.map((crypto) => {
      // Random price change between -2% and +2% for more volatility
      const changePercent = (Math.random() * 4 - 2) / 100;
      let newPrice = crypto.price * (1 + changePercent);
      if (newPrice < 0.01) newPrice = 0.01; // prevent price going below $0.01
      return { ...crypto, price: parseFloat(newPrice.toFixed(2)) };
    });
  }

  const handleBuy = () => {
    if (!selectedCrypto || quantity <= 0) return;
    const result = buyStock(portfolio, selectedCrypto, quantity);
    if (typeof result === "string") setMessage(result);
    else {
      setPortfolio(result);
      setMessage(`Bought ${quantity} of ${selectedCrypto.symbol}`);
    }
  };

  const handleSell = () => {
    if (!selectedCrypto || quantity <= 0) return;
    const result = sellStock(portfolio, selectedCrypto, quantity);
    if (typeof result === "string") setMessage(result);
    else {
      setPortfolio(result);
      setMessage(`Sold ${quantity} of ${selectedCrypto.symbol}`);
    }
  };

  const handleSellAll = (symbol: string) => {
    const crypto = cryptos.find((c) => c.symbol === symbol);
    const holding = portfolio.holdings.find((h) => h.symbol === symbol);
    if (crypto && holding && holding.quantity > 0) {
      const result = sellStock(portfolio, crypto, holding.quantity);
      if (typeof result === "string") setMessage(result);
      else {
        setPortfolio(result);
        setMessage(`Sold all of ${symbol}`);
      }
    }
  };

  const handleSelectCrypto = (symbol: string) => {
    const crypto = cryptos.find((c) => c.symbol === symbol);
    if (crypto) setSelectedCrypto(crypto);
  };

  return (
    <div className="mx-auto px-4 py-8 max-w-7xl container">
      {/* Header Section */}
      <div className="mb-8">
        <h1>Crypto Trading Simulator</h1>
        <div className="mb-6">
          <p className="mb-3">
            Welcome to the Crypto Trading Simulator! Practice buying and selling
            cryptocurrencies in a risk-free environment to learn about crypto
            markets.
          </p>
          <p className="text-sm">
            <strong>Notice:</strong> Crypto prices are highly volatile and
            simulated. This is for educational purposes only. Real
            cryptocurrency trading involves significant risks.
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
            <p className="font-bold text-2xl text-orange-600">
              {formatNumberToCurrency(portfolioValue, 2, 2)}
            </p>
          </div>
          <div className="bg-card p-4 border rounded-lg">
            <h4>Crypto Holdings</h4>
            <p className="font-bold text-2xl">
              {portfolio.holdings.length} coins
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
        <h2>Trade Cryptocurrencies</h2>
        <div className="bg-card p-6 border rounded-lg">
          <p className="mb-6 text-muted-foreground">
            Crypto prices update every 3 seconds with higher volatility than
            traditional stocks. Select a cryptocurrency and quantity to buy or
            sell. Prices are simulated for educational purposes.
          </p>

          <div className="gap-6 items-center grid grid-cols-1 md:grid-cols-2 mb-6">
            <div>
              <Label
                htmlFor="crypto-select"
                className="block mb-2 font-medium text-sm"
              >
                Select Cryptocurrency
              </Label>
              <select
                id="crypto-select"
                className="bg-background px-3 py-2 border border-input focus:ring-2 focus:ring-ring rounded-md w-full focus:outline-none"
                value={selectedCrypto?.symbol || ""}
                onChange={(e) => {
                  const crypto = MOCK_CRYPTOS.find(
                    (c) => c.symbol === e.target.value
                  );
                  setSelectedCrypto(crypto || null);
                }}
              >
                <option value="">-- Select a cryptocurrency --</option>
                {cryptos.map((crypto) => (
                  <option key={crypto.symbol} value={crypto.symbol}>
                    {crypto.symbol} - {crypto.name} (
                    {formatNumberToCurrency(crypto.price, 2, 2)})
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
                  min={0.01}
                  step={0.01}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="flex-1"
                />
                <Button
                  variant="outline"
                  disabled={!selectedCrypto}
                  onClick={() => {
                    if (selectedCrypto) {
                      const max =
                        Math.floor(
                          (portfolio.cash / selectedCrypto.price) * 100
                        ) / 100;
                      setQuantity(max > 0 ? max : 0);
                    }
                  }}
                >
                  Max
                </Button>
              </div>
              {selectedCrypto && (
                <p className="mt-1 text-muted-foreground text-sm">
                  Max affordable:{" "}
                  {(
                    Math.floor((portfolio.cash / selectedCrypto.price) * 100) /
                    100
                  ).toFixed(2)}{" "}
                  coins
                </p>
              )}
            </div>
          </div>

          <div className="flex gap-4">
            <Button
              onClick={handleBuy}
              disabled={!selectedCrypto || quantity <= 0}
              className="bg-green-600 hover:bg-green-700"
            >
              Buy Crypto
            </Button>
            <Button
              variant="destructive"
              onClick={handleSell}
              disabled={!selectedCrypto || quantity <= 0}
            >
              Sell Crypto
            </Button>
          </div>
        </div>
      </div>

      {/* Current Crypto Prices */}
      <div className="mb-8">
        <h2>Current Cryptocurrency Prices</h2>
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Symbol</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Current Price</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cryptos.map((crypto) => (
                <TableRow key={crypto.symbol}>
                  <TableCell className="font-mono">{crypto.symbol}</TableCell>
                  <TableCell>{crypto.name}</TableCell>
                  <TableCell className="">
                    {formatNumberToCurrency(crypto.price, 2, 2)}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      className="-ml-2"
                      onClick={() => setSelectedCrypto(crypto)}
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
        <h2>Your Crypto Portfolio</h2>
        <PortfolioTable
          portfolio={portfolio}
          stocks={cryptos}
          onSelectStock={handleSelectCrypto}
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
                <TableHead>Price per Unit</TableHead>
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
                    No transactions yet. Start trading cryptocurrencies to see
                    your transaction history!
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
