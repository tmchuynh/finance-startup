import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Portfolio, Stock } from "@/lib/interfaces/stock";
import { formatNumberToCurrency } from "@/lib/utils/format";
import React from "react";

interface PortfolioTableProps {
  portfolio: Portfolio;
  stocks: Stock[];
  onSelectStock?: (symbol: string) => void;
  onSellAll?: (symbol: string) => void;
}

export const PortfolioTable: React.FC<PortfolioTableProps> = ({
  portfolio,
  stocks,
  onSelectStock,
  onSellAll,
}) => {
  if (portfolio.holdings.length === 0) {
    return (
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Symbol</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Avg. Price</TableHead>
              <TableHead>Current Price</TableHead>
              <TableHead>Total Value</TableHead>
              <TableHead>Change ($)</TableHead>
              <TableHead>Change (%)</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell
                colSpan={8}
                className="py-8 text-center text-muted-foreground"
              >
                No holdings yet. Start buying stocks to build your portfolio!
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    );
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Symbol</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Avg. Price</TableHead>
            <TableHead>Current Price</TableHead>
            <TableHead>Total Value</TableHead>
            <TableHead>Change ($)</TableHead>
            <TableHead>Change (%)</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {portfolio.holdings.map((h) => {
            const stock = stocks.find((s) => s.symbol === h.symbol);
            const currentPrice = stock ? stock.price : 0;
            const totalValue = h.quantity * currentPrice;
            const costBasis = h.quantity * h.averagePrice;
            const change = totalValue - costBasis;
            const changePct = costBasis > 0 ? (change / costBasis) * 100 : 0;

            return (
              <TableRow key={h.symbol}>
                <TableCell>
                  {onSelectStock ? (
                    <Button
                      variant="link"
                      className="p-0 h-auto font-mono font-semibold"
                      onClick={() => onSelectStock(h.symbol)}
                      title="Select this stock for trading"
                    >
                      {h.symbol}
                    </Button>
                  ) : (
                    <span className="font-mono font-semibold">{h.symbol}</span>
                  )}
                </TableCell>
                <TableCell className="font-medium">
                  {h.quantity.toLocaleString()}
                </TableCell>
                <TableCell className="font-semibold">
                  {formatNumberToCurrency(h.averagePrice, 2, 2)}
                </TableCell>
                <TableCell className="font-semibold">
                  {formatNumberToCurrency(currentPrice, 2, 2)}
                </TableCell>
                <TableCell className="font-semibold">
                  {formatNumberToCurrency(totalValue, 2, 2)}
                </TableCell>
                <TableCell
                  className={`font-semibold ${
                    change >= 0 ? "" : "text-red-600"
                  }`}
                >
                  {change >= 0 ? "+" : ""}
                  {formatNumberToCurrency(change, 2, 2)}
                </TableCell>
                <TableCell
                  className={`font-semibold ${
                    changePct >= 0 ? "" : "text-red-600"
                  }`}
                >
                  {changePct >= 0 ? "+" : ""}
                  {changePct.toFixed(2)}%
                </TableCell>
                <TableCell>
                  {onSellAll && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => onSellAll(h.symbol)}
                      title="Sell all shares of this stock"
                    >
                      Sell All
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
