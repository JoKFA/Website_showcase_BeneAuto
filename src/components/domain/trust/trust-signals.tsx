"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, CreditCard, MapPin, Snowflake } from "lucide-react";
import { Badge, Card } from "@/components/ui";
import { TRUST_SIGNALS } from "@/lib/constants";
import { cardItem, staggerContainer } from "@/lib/motion";

const iconMap = {
  Snowflake,
  Check: CheckCircle2,
  MapPin,
  CreditCard,
} as const;

export function TrustSignals() {
  const shouldReduceMotion = useReducedMotion();
  const motionProps = shouldReduceMotion
    ? {}
    : {
        variants: staggerContainer,
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true, amount: 0.2 },
      };

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="mb-10 max-w-2xl">
          <Badge variant="secondary">Trust & Transparency</Badge>
          <h2 className="mt-4 text-3xl font-semibold text-primary-900 sm:text-4xl">
            The local rental experience Toronto drivers count on.
          </h2>
          <p className="mt-3 text-base text-neutral-600 sm:text-lg">
            Every booking includes winter readiness, clear pricing, and a team
            that knows the city.
          </p>
        </div>
        <motion.div
          {...motionProps}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {TRUST_SIGNALS.map((signal) => {
            const Icon = iconMap[signal.icon as keyof typeof iconMap] || Snowflake;
            return (
              <motion.div key={signal.title} variants={cardItem}>
                <Card className="h-full border-neutral-100" padding="md" hoverable>
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary-500/10 text-secondary-500">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-primary-900">
                        {signal.title}
                      </h3>
                      <p className="mt-1 text-sm text-neutral-600">
                        {signal.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
