"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import type { KeyboardEvent } from "react";
import { motion } from "framer-motion";
import { Snowflake } from "lucide-react";
import { Badge, Button, Card } from "@/components/ui";
import { cardItem } from "@/lib/motion";
import { formatCurrency, cn } from "@/lib/utils";
import { categoryLabels } from "@/lib/data/categories";
import { Car } from "@/types";
import { VehicleSpecs } from "./vehicle-specs";

interface VehicleCardProps {
  vehicle: Car;
  featured?: boolean;
  ctaLabel?: string;
  onSelect?: () => void;
}

export function VehicleCard({
  vehicle,
  featured = false,
  ctaLabel = "View Details",
  onSelect,
}: VehicleCardProps) {
  const router = useRouter();
  const handleSelect = () => {
    if (onSelect) {
      onSelect();
      return;
    }
    router.push(`/fleet/${vehicle.slug}`);
  };
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleSelect();
    }
  };

  return (
    <motion.div
      variants={cardItem}
      className={cn("flex", featured && "lg:col-span-2")}
    >
      <Card
        hoverable
        padding="md"
        className="group flex h-full w-full flex-col gap-4"
        onClick={handleSelect}
        onKeyDown={handleKeyDown}
        role="link"
        tabIndex={0}
        aria-label={`${vehicle.make} ${vehicle.model} details`}
      >
        <div
          className={cn(
            "relative overflow-hidden rounded-xl",
            featured ? "h-64 lg:h-72" : "h-52"
          )}
        >
          <Image
            src={vehicle.images.primary}
            alt={`${vehicle.make} ${vehicle.model}`}
            fill
            sizes={featured ? "(max-width: 1024px) 100vw, 60vw" : "(max-width: 1024px) 100vw, 33vw"}
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            style={{ objectPosition: vehicle.imageFocus ?? "50% 50%" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-900/40 to-transparent" />
          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            <Badge variant="secondary" size="sm">
              {categoryLabels[vehicle.category] ?? "Vehicle"}
            </Badge>
            {vehicle.winterTiresIncluded && (
              <Badge variant="default" size="sm" className="bg-white/80 text-primary-900">
                <Snowflake className="h-3 w-3" />
                Winter Ready
              </Badge>
            )}
            <Badge
              variant={vehicle.isAvailable ? "success" : "warning"}
              size="sm"
              className="backdrop-blur-sm"
            >
              {vehicle.isAvailable ? "Available" : "Reserved"}
            </Badge>
          </div>
        </div>

        <div className="flex-1">
          <h3 className="text-xl font-semibold text-primary-900">
            {vehicle.make} {vehicle.model}
          </h3>
          <p className="text-sm text-neutral-500">{vehicle.year}</p>

          <VehicleSpecs
            seats={vehicle.seats}
            luggage={vehicle.luggage}
            transmission={vehicle.transmission}
            fuelType={vehicle.fuelType}
            className="mt-4"
          />
        </div>

        <div className="flex items-center justify-between border-t border-neutral-100 pt-4">
          <div>
            <p className="text-xs text-neutral-500">Starting at</p>
            <p className="text-lg font-semibold text-primary-900 font-[var(--font-dm-sans)]">
              {formatCurrency(vehicle.pricePerDay)}
              <span className="text-xs font-normal text-neutral-500">/day</span>
            </p>
          </div>
          <Button
            size="sm"
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              handleSelect();
            }}
          >
            {ctaLabel}
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
