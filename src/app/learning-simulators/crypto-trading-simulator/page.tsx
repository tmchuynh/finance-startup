"use client";

import { buyStock } from "@/components/stocks/buyStock";
import { PortfolioTable } from "@/components/stocks/PortfolioTable";
import { sellStock } from "@/components/stocks/sellStock";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MOCK_CRYPTOS } from "@/lib/constants/data/cryptoData";
import { Stock, Portfolio } from "@/lib/interfaces/stock";
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
    <div className="mx-auto pt-6 sm:pt-12 lg:pt-16 pb-24 lg:pb-32 w-10/12 md:w-11/12">
      <div className="mb-12">
        <h1>Crypto Trading Simulator</h1>
        <p>
          Welcome to the Crypto Trading Simulator! Practice buying and selling
          cryptocurrencies in a risk-free environment.
        </p>
        <p className="mt-4">
          Prices are simulated and update every 3 seconds. This is for
          educational purposes only.
        </p>
        <p className="mb-2">
          Your current cash balance is{" "}
          <strong>{formatNumberToCurrency(portfolio.cash, 2, 2)}</strong>.
        </p>
        <p className="mb-2">
          The total portfolio value is displayed below. Transaction history is
          at the bottom.
        </p>
      </div>

      <div className="flex md:flex-row flex-col justify-between gap-6 w-full">
        <div className="mb-4 w-full">
          <Label className="block mb-1 font-semibold">Select Crypto</Label>
          <select
            className="p-2 border rounded w-full"
            value={selectedCrypto?.symbol || ""}
            onChange={(e) => {
              const crypto = MOCK_CRYPTOS.find(
                (c) => c.symbol === e.target.value
              );
              setSelectedCrypto(crypto || null);
            }}
          >
            <option value="">-- Select --</option>
            {cryptos.map((crypto) => (
              <option key={crypto.symbol} value={crypto.symbol}>
                {crypto.symbol} - {crypto.name} (
                {formatNumberToCurrency(crypto.price, 2, 2)})
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
              disabled={!selectedCrypto}
              onClick={() => {
                if (selectedCrypto) {
                  const max = Math.floor(portfolio.cash / selectedCrypto.price);
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
          disabled={!selectedCrypto || quantity <= 0}
        >
          Buy
        </button>
        <button
          className="bg-red-600 hover:bg-red-700 disabled:opacity-50 px-4 py-2 rounded text-white"
          onClick={handleSell}
          disabled={!selectedCrypto || quantity <= 0}
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
        stocks={cryptos}
        onSelectStock={handleSelectCrypto}
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
