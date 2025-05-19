export type Property = {
  id: string;
  name: string;
  location: string;
  price: number;
  trend: number[]; // price history
  condition: "Excellent" | "Good" | "Fair" | "Needs Repair";
  owned: boolean;
  repairs: number; // total spent on repairs
};

export type OwnedProperty = Property & {
  purchasePrice: number;
  purchaseDate: Date;
  repairs: number;
  forSale: boolean;
  interestedBuyers: Buyer[];
  buyerRefreshes?: number;
  forRent?: boolean;
  rentRange?: [number, number];
  interestedRenters?: Renter[];
  renterRefreshes?: number;
  rentedTo?: Renter | null;
  rentAmount?: number;
};

export type Buyer = {
  id: string;
  name: string;
  offer: number;
  notes?: string;
};

export type Renter = {
  id: string;
  name: string;
  offer: number;
  notes?: string;
};

export type Transaction = {
  id: string;
  type: "BUY" | "SELL" | "REPAIR" | "RENT" | "RENT_PAYMENT";
  propertyName: string;
  amount: number;
  date: Date;
  notes?: string;
  gainLoss?: number;
};

export const INITIAL_CASH = 50000000;
