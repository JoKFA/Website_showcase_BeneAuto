export type VehicleCategory =
  | "economy"
  | "compact"
  | "midsize"
  | "suv"
  | "premium"
  | "van";

export type TransmissionType = "automatic" | "manual";

export type FuelType = "gas" | "diesel" | "hybrid" | "electric";

export interface Car {
  id: string;
  slug: string;

  // Basic Info
  make: string;
  model: string;
  year: number;
  category: VehicleCategory;

  // Specifications
  seats: number;
  doors: number;
  luggage: number;
  transmission: TransmissionType;
  fuelType: FuelType;

  // Features
  hasAC: boolean;
  hasBluetooth: boolean;
  hasUSB: boolean;
  hasBackupCamera: boolean;
  winterTiresIncluded: boolean;

  // Pricing (CAD)
  pricePerDay: number;
  pricePerWeek: number;
  deposit: number;

  // Media
  images: {
    primary: string;
    gallery: string[];
  };
  imageFocus?: string;

  // Availability
  isAvailable: boolean;
  minimumAge: number;

  // Meta
  popularityScore: number;
  featured?: boolean;
}

export interface VehicleCategoryInfo {
  id: VehicleCategory;
  name: string;
  description: string;
  icon: string;
}
