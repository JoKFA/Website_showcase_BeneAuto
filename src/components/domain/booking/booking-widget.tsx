"use client";

import { useMemo, useState } from "react";
import { CalendarClock, CheckCircle2, MapPin } from "lucide-react";
import { format, addDays } from "date-fns";
import { Button, Card, Badge } from "@/components/ui";
import { DateRangePicker } from "./date-range-picker";
import { VehicleTypeSelect } from "./vehicle-type-select";
import {
  calculateRentalDays,
  calculateRentalPrice,
  formatCurrency,
} from "@/lib/utils";
import { RENTAL_RULES } from "@/lib/constants";
import { vehicles } from "@/lib/data/vehicles";

const parseDateInput = (value: string): Date | null => {
  if (!value) return null;
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return null;
  return new Date(year, month - 1, day);
};

const formatDateInput = (date: Date): string => format(date, "yyyy-MM-dd");

const baseDailyRate = vehicles.length
  ? Math.min(...vehicles.map((vehicle) => vehicle.pricePerDay))
  : 0;
const baseWeeklyRate = vehicles.length
  ? Math.min(...vehicles.map((vehicle) => vehicle.pricePerWeek))
  : 0;

export function BookingWidget() {
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [vehicleCategory, setVehicleCategory] = useState("all");
  const [sameLocationReturn, setSameLocationReturn] = useState(true);

  const today = new Date();
  const minPickup = formatDateInput(today);
  const maxPickup = formatDateInput(addDays(today, RENTAL_RULES.advanceBookingDays));

  const minReturn = useMemo(() => {
    if (!pickupDate) return "";
    const parsedPickup = parseDateInput(pickupDate);
    if (!parsedPickup) return "";
    return formatDateInput(addDays(parsedPickup, 1));
  }, [pickupDate]);

  const maxReturn = useMemo(() => {
    if (!pickupDate) return "";
    const parsedPickup = parseDateInput(pickupDate);
    if (!parsedPickup) return "";
    return formatDateInput(addDays(parsedPickup, RENTAL_RULES.maxRentalDays));
  }, [pickupDate]);

  const { rentalDays, dateError } = useMemo(() => {
    if (!pickupDate || !returnDate) {
      return { rentalDays: 0, dateError: "" };
    }

    const parsedPickup = parseDateInput(pickupDate);
    const parsedReturn = parseDateInput(returnDate);

    if (!parsedPickup || !parsedReturn) {
      return { rentalDays: 0, dateError: "Please select valid dates." };
    }

    if (parsedReturn <= parsedPickup) {
      return { rentalDays: 0, dateError: "Return date must be after pickup date." };
    }

    const days = calculateRentalDays(parsedPickup, parsedReturn);
    if (days > RENTAL_RULES.maxRentalDays) {
      return {
        rentalDays: 0,
        dateError: "Please contact us for rentals longer than 90 days.",
      };
    }

    return { rentalDays: days, dateError: "" };
  }, [pickupDate, returnDate]);

  const estimatedTotal = useMemo(() => {
    if (!rentalDays || !baseDailyRate) return 0;
    const baseTotal = calculateRentalPrice(baseDailyRate, baseWeeklyRate, rentalDays);
    const dropOffFee = sameLocationReturn ? 0 : RENTAL_RULES.differentDropOffFee;
    return baseTotal + dropOffFee;
  }, [rentalDays, sameLocationReturn]);

  return (
    <Card
      className="shadow-2xl border-neutral-200/80 bg-white/95 backdrop-blur-sm"
      padding="lg"
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-neutral-500">Book your ride</p>
          <h3 className="text-2xl font-semibold text-primary-900">Book Your Ride</h3>
        </div>
        <Badge variant="secondary" className="font-[var(--font-dm-sans)]">
          {baseDailyRate ? `From ${formatCurrency(baseDailyRate)}/day` : "Custom quote"}
        </Badge>
      </div>

      <div className="mt-6 space-y-5">
        <DateRangePicker
          pickupDate={pickupDate}
          returnDate={returnDate}
          minPickup={minPickup}
          minReturn={minReturn}
          maxPickup={maxPickup}
          maxReturn={maxReturn}
          onPickupChange={setPickupDate}
          onReturnChange={setReturnDate}
          error={dateError}
        />

        <VehicleTypeSelect value={vehicleCategory} onChange={setVehicleCategory} />

        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-600">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={sameLocationReturn}
              onChange={(event) => setSameLocationReturn(event.target.checked)}
              className="h-4 w-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
            />
            Same location return
          </label>
          <span className="text-xs text-neutral-500">Different drop-off +$25</span>
        </div>

        {rentalDays > 0 && !dateError && baseDailyRate > 0 && (
          <div className="rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm">
            <div className="flex items-center justify-between text-neutral-600">
              <span>{rentalDays} day rental</span>
              <span className="font-medium text-primary-900">
                Est. {formatCurrency(estimatedTotal)}
              </span>
            </div>
            <p className="mt-1 text-xs text-neutral-500">
              Final price depends on vehicle selection and insurance options.
            </p>
          </div>
        )}

        <Button size="lg" className="w-full">
          Search Available Vehicles
        </Button>

        <div className="grid gap-3 text-xs text-neutral-500 sm:grid-cols-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-success" />
            Winter tires included Oct-Apr
          </div>
          <div className="flex items-center gap-2">
            <CalendarClock className="h-4 w-4 text-accent-500" />
            Same-day booking before 4 PM
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-accent-500" />
            Yonge St pickup location
          </div>
          <div className="flex items-center gap-2">
            Minimum {RENTAL_RULES.minRentalDays} day rental
          </div>
        </div>
      </div>
    </Card>
  );
}
