"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Badge, Button } from "@/components/ui";
import { FleetGrid } from "@/components/domain/fleet";
import { vehicles } from "@/lib/data/vehicles";
import { fadeUp } from "@/lib/motion";

export function FeaturedFleetSection() {
  const shouldReduceMotion = useReducedMotion();
  const displayVehicles = vehicles.slice(0, 6);
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
              Choose the right vehicle for every Toronto journey.
            </h2>
            <p className="mt-4 text-base text-neutral-600 sm:text-lg">
              From efficient city cars to premium sedans and spacious SUVs, our
              fleet is curated for comfort, safety, and value.
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
