"use client";

import { Briefcase, Fuel, Settings2, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface VehicleSpecsProps {
  seats: number;
  luggage: number;
  transmission: string;
  fuelType: string;
  className?: string;
}

const formatLabel = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);

export function VehicleSpecs({
  seats,
  luggage,
  transmission,
  fuelType,
  className,
}: VehicleSpecsProps) {
  return (
    <div className={cn("grid grid-cols-2 gap-3 text-xs text-neutral-600", className)}>
      <div className="flex items-center gap-2">
        <Users className="h-4 w-4 text-neutral-400" />
        {seats} seats
      </div>
      <div className="flex items-center gap-2">
        <Briefcase className="h-4 w-4 text-neutral-400" />
        {luggage} bags
      </div>
      <div className="flex items-center gap-2">
        <Settings2 className="h-4 w-4 text-neutral-400" />
        {formatLabel(transmission)}
      </div>
      <div className="flex items-center gap-2">
        <Fuel className="h-4 w-4 text-neutral-400" />
        {formatLabel(fuelType)}
      </div>
    </div>
  );
}
