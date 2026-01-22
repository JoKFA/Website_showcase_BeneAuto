"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui";
import { CONTACT_INFO } from "@/lib/constants";
import { fadeUp } from "@/lib/motion";

export function CtaSection() {
  const shouldReduceMotion = useReducedMotion();
  const scrollBehavior = shouldReduceMotion ? "auto" : "smooth";
  const motionProps = shouldReduceMotion
    ? {}
    : {
        variants: fadeUp,
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true, amount: 0.2 },
      };

  return (
    <section className="relative overflow-hidden bg-primary-900 py-20 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(212,168,83,0.2),_transparent_55%)]" />
      <div className="container relative mx-auto px-4">
        <motion.div
          {...motionProps}
          className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between"
        >
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold leading-tight sm:text-4xl">
              Ready to hit the road? Let us match you with the perfect ride.
            </h2>
            <p className="mt-4 text-base text-white/80 sm:text-lg">
              Book online in minutes or call our team for tailored recommendations.
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button
              variant="secondary"
              size="lg"
              onClick={() => {
                const element = document.getElementById("booking-widget");
                element?.scrollIntoView({ behavior: scrollBehavior });
              }}
            >
              Book Your Ride
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white/40 text-white hover:bg-white/10"
              onClick={() => {
                window.location.href = `tel:${CONTACT_INFO.phone}`;
              }}
            >
              <Phone className="h-4 w-4" />
              {CONTACT_INFO.phone}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
