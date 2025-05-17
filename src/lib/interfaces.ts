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
