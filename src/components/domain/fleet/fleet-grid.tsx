"use client";

import { motion, useReducedMotion } from "framer-motion";
import { vehicles as allVehicles } from "@/lib/data/vehicles";
import { staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { Car } from "@/types";
import { VehicleCard } from "./vehicle-card";

interface FleetGridProps {
  vehicles?: Car[];
  className?: string;
  highlightFeatured?: boolean;
}

export function FleetGrid({
  vehicles = allVehicles,
  className,
  highlightFeatured = true,
}: FleetGridProps) {
  const shouldReduceMotion = useReducedMotion();
  const featuredId = highlightFeatured
    ? vehicles.find((vehicle) => vehicle.featured)?.id
    : undefined;

  const motionProps = shouldReduceMotion
    ? {}
    : {
        variants: staggerContainer,
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true, amount: 0.2 },
      };

  return (
    <motion.div
      {...motionProps}
      className={cn("grid gap-6 md:grid-cols-2 lg:grid-cols-3", className)}
    >
      {vehicles.map((vehicle) => (
        <VehicleCard
          key={vehicle.id}
          vehicle={vehicle}
          featured={featuredId === vehicle.id}
        />
      ))}
    </motion.div>
  );
}
