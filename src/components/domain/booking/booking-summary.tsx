"use client";

import { useMemo, useState } from "react";
import { Badge, Button, ButtonLink, Card, Select } from "@/components/ui";
import { calculateRentalPrice, formatCurrency } from "@/lib/utils";

interface BookingSummaryProps {
  dailyRate: number;
  weeklyRate: number;
  deposit: number;
  minimumAge: number;
  reserveHref?: string;
  reserveLabel?: string;
  onReserve?: () => void;
}

export function BookingSummary({
  dailyRate,
  weeklyRate,
  deposit,
  minimumAge,
  reserveHref,
  reserveLabel = "Reserve This Vehicle",
  onReserve,
}: BookingSummaryProps) {
  const [days, setDays] = useState("3");

  const total = useMemo(() => {
    const parsedDays = Number(days) || 1;
    return calculateRentalPrice(dailyRate, weeklyRate, parsedDays);
  }, [days, dailyRate, weeklyRate]);

  const dayOptions = Array.from({ length: 14 }, (_, index) => {
    const value = String(index + 1);
    return { value, label: `${value} day${index === 0 ? "" : "s"}` };
  });

  return (
    <Card className="sticky top-28" padding="lg">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-primary-900">Booking Summary</h3>
        <Badge variant="secondary">From {formatCurrency(dailyRate)}/day</Badge>
      </div>

      <div className="mt-6 space-y-4">
        <Select
          label="Estimated rental length"
          value={days}
          onChange={(event) => setDays(event.target.value)}
          options={dayOptions}
        />

        <div className="space-y-3 text-sm text-neutral-600">
          <div className="flex items-center justify-between">
            <span>Estimated total</span>
            <span className="text-base font-semibold text-primary-900">
              {formatCurrency(total)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span>Weekly rate</span>
            <span>{formatCurrency(weeklyRate)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Deposit</span>
            <span>{formatCurrency(deposit)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Minimum age</span>
            <span>{minimumAge}+</span>
          </div>
        </div>

        {reserveHref ? (
          <ButtonLink href={reserveHref} size="lg" className="w-full justify-center">
            {reserveLabel}
          </ButtonLink>
        ) : (
          <Button size="lg" className="w-full" onClick={onReserve}>
            {reserveLabel}
          </Button>
        )}

        <p className="text-xs text-neutral-500">
          Pricing includes winter tires during the season. Taxes and insurance are
          calculated at checkout.
        </p>
      </div>
    </Card>
  );
}
