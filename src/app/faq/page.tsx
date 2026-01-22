"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Badge } from "@/components/ui";
import { faqs } from "@/lib/data/faqs";
import { cardItem, fadeUp, staggerContainer } from "@/lib/motion";

export default function FaqPage() {
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
      <section className="relative overflow-hidden bg-primary-900 text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(212,168,83,0.18),_transparent_55%)]" />
        <div className="container relative mx-auto px-4 py-20">
          <motion.div {...heroMotionProps} className="max-w-2xl">
            <Badge variant="secondary">FAQ</Badge>
            <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">
              Answers to common rental questions.
            </h1>
            <p className="mt-4 text-lg text-white/80">
              Everything you need to know about booking, pickup, and insurance.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="container mx-auto px-4">
          <motion.div {...gridMotionProps} className="mx-auto max-w-3xl space-y-4">
            {faqs.map((faq) => (
              <motion.div key={faq.question} variants={cardItem}>
                <details className="group rounded-2xl border border-neutral-200 bg-neutral-50 px-6 py-4 transition-shadow duration-200 hover:shadow-sm">
                  <summary className="cursor-pointer list-none text-lg font-semibold text-primary-900">
                    {faq.question}
                  </summary>
                  <p className="mt-3 text-sm text-neutral-600">
                    {faq.answer}
                  </p>
                </details>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  );
}
