"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Badge, Card } from "@/components/ui";
import { cardItem, fadeUp, staggerContainer } from "@/lib/motion";

const sections = [
  {
    title: "Information we collect",
    body: [
      "We collect contact and booking details you provide when requesting a rental.",
      "We may collect usage data to improve the site experience.",
    ],
  },
  {
    title: "How we use information",
    body: [
      "To confirm bookings, communicate rental details, and provide support.",
      "To comply with legal obligations and protect our business.",
    ],
  },
  {
    title: "Data protection",
    body: [
      "We use reasonable security safeguards and do not sell personal data.",
      "Contact us if you need access or correction of your personal information.",
    ],
  },
];

export default function PrivacyPage() {
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
              <Badge variant="secondary">Privacy Policy</Badge>
              <h1 className="mt-4 text-4xl font-semibold text-primary-900">
                Your privacy matters to us.
              </h1>
              <p className="mt-4 text-base text-neutral-600">
                This summary explains how Bene Auto Rentals collects and uses
                personal information.
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
