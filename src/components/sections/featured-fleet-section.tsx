"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Badge, Button } from "@/components/ui";
import { FleetGrid } from "@/components/domain/fleet";
import { vehicles } from "@/lib/data/vehicles";
import { fadeUp } from "@/lib/motion";

export function FeaturedFleetSection() {
  const shouldReduceMotion = useReducedMotion();
  const premiumVehicles = vehicles.filter((vehicle) => vehicle.category === "premium");
  const rankedVehicles = (premiumVehicles.length ? premiumVehicles : vehicles)
    .slice()
    .sort((a, b) => b.pricePerDay - a.pricePerDay || b.year - a.year);
  const displayVehicles = rankedVehicles.slice(0, 5).map((vehicle, index) => ({
    ...vehicle,
    featured: index === 0,
  }));
  const scrollBehavior = shouldReduceMotion ? "auto" : "smooth";

  const headingMotionProps = shouldReduceMotion
    ? {}
    : {
        variants: fadeUp,
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true, amount: 0.2 },
      };

  return (
    <section id="fleet-section" className="bg-neutral-50 py-24 scroll-mt-28">
      <div className="container mx-auto px-4">
        <motion.div {...headingMotionProps} className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <Badge variant="secondary">Our Fleet</Badge>
            <h2 className="mt-4 text-3xl font-semibold text-primary-900 sm:text-4xl">
              Modern luxury vehicles ready for Toronto.
            </h2>
            <p className="mt-4 text-base text-neutral-600 sm:text-lg">
              The latest luxury sedans and SUVs for business travel, special
              occasions, or premium weekend escapes.
            </p>
          </div>
          <Button
            variant="outline"
            className="self-start lg:self-auto"
            onClick={() => {
              const element = document.getElementById("booking-widget");
              element?.scrollIntoView({ behavior: scrollBehavior });
            }}
          >
            Start Booking
            <ArrowRight className="h-4 w-4" />
          </Button>
        </motion.div>

        <div className="mt-12">
          <FleetGrid vehicles={displayVehicles} />
        </div>
      </div>
    </section>
  );
}
