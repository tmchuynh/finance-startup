import { Portfolio, Stock } from "@/lib/interfaces";
import React from "react";

interface PortfolioTableProps {
  portfolio: Portfolio;
  stocks: Stock[];
  onSelectStock?: (symbol: string) => void;
}

export const PortfolioTable: React.FC<PortfolioTableProps> = ({
  portfolio,
  stocks,
  onSelectStock,
}) => (
  <table className="border border-collapse border-gray-300 w-full">
    <thead>
      <tr className="bg-gray-100">
        <th className="p-2 border border-gray-300 text-left">Symbol</th>
        <th className="p-2 border border-gray-300 text-left">Quantity</th>
        <th className="p-2 border border-gray-300 text-left">Avg. Price</th>
        <th className="p-2 border border-gray-300 text-left">Current Price</th>
        <th className="p-2 border border-gray-300 text-left">Total Value</th>
        <th className="p-2 border border-gray-300 text-left">Change ($)</th>
        <th className="p-2 border border-gray-300 text-left">Change (%)</th>
      </tr>
    </thead>
    <tbody>
      {portfolio.holdings.map((h) => {
        const stock = stocks.find((s) => s.symbol === h.symbol);
        const currentPrice = stock ? stock.price : 0;
        const totalValue = h.quantity * currentPrice;
        const costBasis = h.quantity * h.averagePrice;
        const change = totalValue - costBasis;
        const changePct = costBasis > 0 ? (change / costBasis) * 100 : 0;
        return (
          <tr key={h.symbol}>
            <td className="p-2 border border-gray-300">
              {onSelectStock ? (
                <button
                  style={{
                    background: "none",
                    border: "none",
                    color: "#2563eb",
                    textDecoration: "underline",
                    cursor: "pointer",
                    padding: 0,
                  }}
                  onClick={() => onSelectStock(h.symbol)}
                  title="Select this stock"
                >
                  {h.symbol}
                </button>
              ) : (
                h.symbol
              )}
            </td>
            <td className="p-2 border border-gray-300">{h.quantity}</td>
            <td className="p-2 border border-gray-300">
              ${h.averagePrice.toFixed(2)}
            </td>
            <td className="p-2 border border-gray-300">
              ${currentPrice.toFixed(2)}
            </td>
            <td className="p-2 border border-gray-300">
              ${totalValue.toFixed(2)}
            </td>
            <td
              className="p-2 border border-gray-300"
              style={{ color: change >= 0 ? "green" : "red" }}
            >
              {change >= 0 ? "+" : ""}${change.toFixed(2)}
            </td>
            <td
              className="p-2 border border-gray-300"
              style={{ color: changePct >= 0 ? "green" : "red" }}
            >
              {changePct >= 0 ? "+" : ""}
              {changePct.toFixed(2)}%
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);
