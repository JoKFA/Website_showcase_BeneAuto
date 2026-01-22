"use client";

import { CalendarDays, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui";

interface DateRangePickerProps {
  pickupDate: string;
  returnDate: string;
  minPickup?: string;
  minReturn?: string;
  maxPickup?: string;
  maxReturn?: string;
  onPickupChange: (value: string) => void;
  onReturnChange: (value: string) => void;
  error?: string;
}

export function DateRangePicker({
  pickupDate,
  returnDate,
  minPickup,
  minReturn,
  maxPickup,
  maxReturn,
  onPickupChange,
  onReturnChange,
  error,
}: DateRangePickerProps) {
  return (
    <div className="space-y-2">
      <div className="grid gap-4 md:grid-cols-2">
        <Input
          label="Pickup Date"
          type="date"
          value={pickupDate}
          min={minPickup}
          max={maxPickup}
          onChange={(event) => onPickupChange(event.target.value)}
          leftIcon={<CalendarDays className="h-4 w-4" />}
        />
        <Input
          label="Return Date"
          type="date"
          value={returnDate}
          min={minReturn}
          max={maxReturn}
          onChange={(event) => onReturnChange(event.target.value)}
          leftIcon={<CalendarDays className="h-4 w-4" />}
        />
      </div>
      {error && (
        <div className="flex items-center gap-2 text-sm text-error">
          <AlertCircle className="h-4 w-4" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
