import { VehicleCategoryInfo } from "@/types";

export const vehicleCategories: VehicleCategoryInfo[] = [
  {
    id: "economy",
    name: "Economy",
    description: "Fuel-efficient and budget-friendly",
    icon: "Fuel",
  },
  {
    id: "compact",
    name: "Compact",
    description: "Perfect balance of comfort and efficiency",
    icon: "Car",
  },
  {
    id: "midsize",
    name: "Midsize",
    description: "Spacious interior with great features",
    icon: "CarFront",
  },
  {
    id: "suv",
    name: "SUV",
    description: "Versatile for any adventure",
    icon: "Truck",
  },
  {
    id: "premium",
    name: "Premium",
    description: "Luxury and performance combined",
    icon: "Gem",
  },
  {
    id: "van",
    name: "Van",
    description: "Maximum space for groups and cargo",
    icon: "Bus",
  },
];

export const categoryLabels: Record<string, string> = {
  all: "All Vehicles",
  economy: "Economy",
  compact: "Compact",
  midsize: "Midsize",
  suv: "SUV",
  premium: "Premium",
  van: "Van",
};
