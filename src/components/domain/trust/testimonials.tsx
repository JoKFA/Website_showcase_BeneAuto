"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Quote } from "lucide-react";
import { Badge, Card } from "@/components/ui";
import { testimonials } from "@/lib/data/testimonials";
import { cardItem, staggerContainer } from "@/lib/motion";

export function Testimonials() {
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
    <section className="bg-neutral-50 py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 max-w-2xl">
          <Badge variant="secondary">Customer Stories</Badge>
          <h2 className="mt-4 text-3xl font-semibold text-primary-900 sm:text-4xl">
            Why Toronto travelers choose Bene Auto Rentals.
          </h2>
          <p className="mt-3 text-base text-neutral-600 sm:text-lg">
            Real feedback from business travelers, weekend explorers, and locals
            who rely on our fleet.
          </p>
        </div>
        <motion.div
          {...motionProps}
          className="grid gap-6 lg:grid-cols-3"
        >
          {testimonials.map((testimonial) => (
            <motion.div key={testimonial.name} variants={cardItem}>
              <Card className="h-full">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary-500/10 text-secondary-500">
                  <Quote className="h-5 w-5" />
                </div>
                <p className="mt-6 text-sm leading-relaxed text-neutral-600">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="mt-6">
                  <p className="font-semibold text-primary-900">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-neutral-500">{testimonial.title}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
