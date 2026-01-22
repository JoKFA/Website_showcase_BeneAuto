"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Badge, Card } from "@/components/ui";
import { cardItem, fadeUp, staggerContainer } from "@/lib/motion";

const sections = [
  {
    title: "Pickup requirements",
    body: [
      "Provide your driver's license, credit card, and booking confirmation.",
      "Inspect the vehicle with our team before departure.",
    ],
  },
  {
    title: "Return conditions",
    body: [
      "Return the vehicle with the same fuel level as pickup.",
      "Late returns may incur additional charges unless pre-approved.",
    ],
  },
  {
    title: "Insurance and liability",
    body: [
      "Optional coverage is available at pickup.",
      "Renters are responsible for any damages not covered by insurance.",
    ],
  },
];

export default function RentalAgreementPage() {
  const shouldReduceMotion = useReducedMotion();
  const heroMotionProps = shouldReduceMotion
    ? {}
    : {
        variants: fadeUp,
        initial: "hidden",
        animate: "visible",
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
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <motion.div {...heroMotionProps}>
              <Badge variant="secondary">Rental Agreement</Badge>
              <h1 className="mt-4 text-4xl font-semibold text-primary-900">
                A clear outline of rental responsibilities.
              </h1>
              <p className="mt-4 text-base text-neutral-600">
                Review the key policies that keep our rentals safe and reliable.
              </p>
            </motion.div>

            <motion.div {...gridMotionProps} className="mt-10 space-y-6">
              {sections.map((section) => (
                <motion.div key={section.title} variants={cardItem}>
                  <Card padding="lg">
                    <h2 className="text-xl font-semibold text-primary-900">
                      {section.title}
                    </h2>
                    <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-neutral-600">
                      {section.body.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
