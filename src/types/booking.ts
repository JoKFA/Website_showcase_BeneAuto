import { VehicleCategory } from "./car";

export interface BookingState {
  pickupDate: Date | null;
  returnDate: Date | null;
  vehicleCategory: VehicleCategory | "all";
  sameLocationReturn: boolean;
  calculatedDays: number;
}

export interface Booking {
  id: string;

  // Customer
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;

  // Vehicle
  carId: string;

  // Dates
  pickupDate: Date;
  returnDate: Date;
  totalDays: number;

  // Location
  pickupLocation: string;
  returnLocation: string;
  differentDropOff: boolean;

  // Pricing (CAD)
  dailyRate: number;
  subtotal: number;
  taxes: number; // 13% HST in Ontario
  fees: number;
  totalAmount: number;
  depositAmount: number;

  // Status
  status: "pending" | "confirmed" | "active" | "completed" | "cancelled";

  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  createdAt: Date;
}
