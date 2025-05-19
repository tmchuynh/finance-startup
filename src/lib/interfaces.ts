export interface ChecklistItem {
  id: string;
  label: string;
  items?: ChecklistItem[];
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
  max: number;
}

export type Category = {
  id: string;
  title: string;
  description: string;
  introduction?: string;
  usage?: string;
  list?: ListDetails[];
};

export interface ListDetails {
  id: string;
  title: string;
  description: string;
  items?: ListDetails[];
}

export interface Tiers {
  id: string;
  name: string;
  href: string;
  featured: boolean;
  description: string;
  price: number;
  highlights: string[];
}

export interface Features {
  name: string;
  features: {
    name: string;
    tiers: { [key: string]: boolean | string };
  }[];
}

export interface Pricing {
  frequencies: {
    value: string;
    label: string;
  }[];
  tiers: Tiers[];
  sections: Features[];
}