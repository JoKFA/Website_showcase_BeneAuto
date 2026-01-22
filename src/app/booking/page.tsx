"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Badge, Card } from "@/components/ui";
import { BookingWidget } from "@/components/domain/booking";
import { CONTACT_INFO } from "@/lib/constants";
import { cardItem, fadeUp, staggerContainer } from "@/lib/motion";
import { CheckCircle2, CreditCard, MapPin } from "lucide-react";

const steps = [
  {
    title: "Choose your dates",
    description: "Pick pickup and return dates that fit your schedule.",
    icon: CheckCircle2,
  },
  {
    title: "Select a vehicle",
    description: "Filter by category, price, or features to find the right car.",
    icon: MapPin,
  },
  {
    title: "Confirm and pay",
    description: "Finalize your booking with transparent pricing and options.",
    icon: CreditCard,
  },
];

export default function BookingPage() {
  const shouldReduceMotion = useReducedMotion();
  const heroMotionProps = shouldReduceMotion
    ? {}
    : {
        variants: fadeUp,
        initial: "hidden",
        animate: "visible",
      };
  const sectionMotionProps = shouldReduceMotion
    ? {}
    : {
        variants: fadeUp,
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true, amount: 0.2 },
      };
  const gridMotionProps = shouldReduceMotion
    ? {}
    : {
        variants: staggerContainer,
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true, amount: 0.2 },
      };

  return (
    <main className="bg-neutral-50">
      <section className="relative overflow-hidden bg-primary-900 text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(212,168,83,0.18),_transparent_55%)]" />
        <div className="container relative mx-auto px-4 py-20">
          <motion.div {...heroMotionProps} className="max-w-2xl">
            <Badge variant="secondary">Book Online</Badge>
            <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">
              Reserve your ride in minutes.
            </h1>
            <p className="mt-4 text-lg text-white/80">
              Simple, transparent booking for Toronto rentals. Same-day pickups
              available before 4 PM.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <motion.div {...sectionMotionProps}>
              <BookingWidget />
            </motion.div>
            <motion.div {...gridMotionProps} className="space-y-6">
              <motion.div variants={cardItem}>
                <Card padding="lg">
                  <h2 className="text-2xl font-semibold text-primary-900">How it works</h2>
                  <div className="mt-6 space-y-5">
                    {steps.map((step) => {
                      const Icon = step.icon;
                      return (
                        <div key={step.title} className="flex gap-4">
                          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary-500/10 text-secondary-500">
                            <Icon className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="text-base font-semibold text-primary-900">
                              {step.title}
                            </h3>
                            <p className="mt-1 text-sm text-neutral-600">
                              {step.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Card>
              </motion.div>

              <motion.div variants={cardItem}>
                <Card padding="lg" className="bg-neutral-50">
                  <h3 className="text-lg font-semibold text-primary-900">Need help?</h3>
                  <p className="mt-3 text-sm text-neutral-600">
                    Call our team for same-day availability or custom requests. We
                    respond quickly and can recommend the right vehicle for your
                    trip.
                  </p>
                  <p className="mt-4 text-sm font-semibold text-primary-900">
                    {CONTACT_INFO.phone}
                  </p>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
