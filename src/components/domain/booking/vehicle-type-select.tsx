"use client";

import { Select } from "@/components/ui";
import { vehicleCategories } from "@/lib/data/categories";

interface VehicleTypeSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export function VehicleTypeSelect({ value, onChange }: VehicleTypeSelectProps) {
  const options = [
    { value: "all", label: "All Vehicles" },
    ...vehicleCategories.map((category) => ({
      value: category.id,
      label: category.name,
    })),
  ];

  return (
    <Select
      label="Vehicle Type"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      options={options}
    />
  );
}
