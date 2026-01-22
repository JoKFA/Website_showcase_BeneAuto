import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, differenceInDays } from "date-fns";

/**
 * Merge Tailwind classes with clsx
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format currency in CAD
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format date for display
 */
export function formatDate(date: Date, formatString: string = "MMM d, yyyy"): string {
  return format(date, formatString);
}

/**
 * Calculate rental days between two dates
 */
export function calculateRentalDays(pickup: Date, returnDate: Date): number {
  const days = differenceInDays(returnDate, pickup);
  return Math.max(1, days);
}

/**
 * Calculate rental price with weekly discount
 */
export function calculateRentalPrice(
  dailyRate: number,
  weeklyRate: number,
  days: number
): number {
  const weeks = Math.floor(days / 7);
  const remainingDays = days % 7;
  return weeks * weeklyRate + remainingDays * dailyRate;
}

/**
 * Check if date is within winter tire season (Oct 15 - Apr 15)
 */
export function isWinterTireSeason(date: Date = new Date()): boolean {
  const month = date.getMonth();
  const day = date.getDate();

  // Oct 15 - Dec 31
  if (month >= 9 && (month > 9 || day >= 15)) return true;
  // Jan 1 - Apr 15
  if (month <= 3 && (month < 3 || day <= 15)) return true;

  return false;
}

/**
 * Get HST amount (13% in Ontario)
 */
export function calculateHST(amount: number): number {
  return amount * 0.13;
}
