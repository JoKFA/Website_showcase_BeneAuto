"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Badge, Card } from "@/components/ui";
import { cardItem, fadeUp, staggerContainer } from "@/lib/motion";
import { Clock, ShieldCheck, Sparkles } from "lucide-react";

const features = [
  {
    title: "Local expertise",
    description:
      "Toronto-based team that knows the best routes, seasons, and rental tips.",
    icon: Sparkles,
  },
  {
    title: "Transparent pricing",
    description:
      "Clear rates, optional coverage, and no surprise fees at pickup.",
    icon: ShieldCheck,
  },
  {
    title: "Flexible terms",
    description:
      "Daily, weekly, and monthly rentals with easy extensions.",
    icon: Clock,
  },
];

export function WhyChooseUsSection() {
  const shouldReduceMotion = useReducedMotion();
  const headingMotionProps = shouldReduceMotion
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
    <section className="bg-white py-24">
      <div className="container mx-auto px-4">
        <motion.div {...headingMotionProps} className="max-w-2xl">
          <Badge variant="secondary">Why Choose Bene</Badge>
          <h2 className="mt-4 text-3xl font-semibold text-primary-900 sm:text-4xl">
            A premium rental experience without corporate complexity.
          </h2>
          <p className="mt-4 text-base text-neutral-600 sm:text-lg">
            We combine professional service with local flexibility so you can
            focus on the road ahead.
          </p>
        </motion.div>

        <motion.div
          {...gridMotionProps}
          className="mt-12 grid gap-6 lg:grid-cols-3"
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div key={feature.title} variants={cardItem}>
                <Card hoverable className="h-full">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-500/10 text-primary-600">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-primary-900">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-sm text-neutral-600">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
