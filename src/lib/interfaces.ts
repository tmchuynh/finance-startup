export interface ChecklistItem {
  id: string;
  label: string;
}

export interface ChecklistCategory {
  id: string;
  title: string;
  items: ChecklistItem[];
}

export type FilingStatus = "single" | "married" | "headOfHousehold";

export interface TaxBracket {
  rate: number; // Tax rate (decimal)
  threshold: number; // Income threshold for this bracket
}

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
  type: 'BUY' | 'SELL';
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

export type Category = {
  id: string;
  title: string;
  description: string;
  introduction?: string;
  usage?: string;
  list?: ListDetails[];
};

export type Calculator = {
  id: string;
  title: string;
  description: string;
  category: string;
  list?: ListDetails[];
};

export interface ListDetails {
  title: string;
  description: string;
  items?: ListDetails[];
}