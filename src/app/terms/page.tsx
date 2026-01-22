"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Badge, Card } from "@/components/ui";
import { cardItem, fadeUp, staggerContainer } from "@/lib/motion";

const sections = [
  {
    title: "Rental eligibility",
    body: [
      "Drivers must be 21+ for standard vehicles and 25+ for premium vehicles.",
      "A valid driver's license and credit card are required at pickup.",
    ],
  },
  {
    title: "Payment and deposits",
    body: [
      "Daily and weekly rates are quoted before taxes and optional coverage.",
      "Security deposits vary by vehicle category and are refunded after return.",
    ],
  },
  {
    title: "Vehicle care",
    body: [
      "Renters are responsible for fuel refills and reasonable vehicle care.",
      "Please notify us immediately of any incidents or damages.",
    ],
  },
];

export default function TermsPage() {
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
              <Badge variant="secondary">Terms of Service</Badge>
              <h1 className="mt-4 text-4xl font-semibold text-primary-900">
                Rental terms designed for clarity.
              </h1>
              <p className="mt-4 text-base text-neutral-600">
                Please review these terms before confirming a reservation.
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
