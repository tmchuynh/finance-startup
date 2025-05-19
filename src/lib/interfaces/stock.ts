// Stock data
export interface Stock {
  symbol: string;
  name: string;
  price: number;
}

// Portfolio holding
export interface Holding {
  symbol: string;
  quantity: number;
  averagePrice: number;
}

// Transaction record
export interface Transaction {
  id: string;
  symbol: string;
  type: "BUY" | "SELL";
  quantity: number;
  price: number;
  date: Date;
}

// User portfolio state
export interface Portfolio {
  cash: number;
  holdings: Holding[];
  transactions: Transaction[];
}
