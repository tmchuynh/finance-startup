import { buyers, renters } from "@/lib/constants/data/realEstateData";
import { Buyer, Property, Renter } from "@/lib/interfaces/real-estate";
import { v4 as uuidv4 } from "uuid";

export function getRandomBuyers(property: Property): Buyer[] {
  return Array.from({ length: Math.floor(Math.random() * 3) + 1 }, () => {
    const buyer = buyers[Math.floor(Math.random() * buyers.length)];
    return {
      id: uuidv4(),
      name: buyer.name,
      offer:
        Math.round((property.price * (0.97 + Math.random() * 0.08)) / 1000) *
        1000,
      notes: buyer.notes,
    };
  });
}

export function getRandomRenters(min: number, max: number): Renter[] {
  return Array.from({ length: Math.floor(Math.random() * 3) + 1 }, () => {
    const renter = renters[Math.floor(Math.random() * renters.length)];
    return {
      id: uuidv4(),
      name: renter.name,
      offer: Math.round((min + Math.random() * (max - min)) / 10) * 10,
      notes: renter.notes,
    };
  });
}

export function randomConditionDowngrade(condition: Property["condition"]) {
  if (condition === "Excellent") return "Good";
  if (condition === "Good") return "Fair";
  if (condition === "Fair") return "Needs Repair";
  return "Needs Repair";
}
