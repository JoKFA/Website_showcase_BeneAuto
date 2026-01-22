"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Badge, Card } from "@/components/ui";
import { ContactForm, BusinessHours, LocationMap } from "@/components/domain/contact";
import { CONTACT_INFO } from "@/lib/constants";
import { cardItem, fadeUp, staggerContainer } from "@/lib/motion";
import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
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
            <Badge variant="secondary">Contact</Badge>
            <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">
              We are ready to help you plan the perfect rental.
            </h1>
            <p className="mt-4 text-lg text-white/80">
              Reach out for booking assistance, fleet questions, or tailored
              recommendations for your Toronto itinerary.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <motion.div {...sectionMotionProps}>
              <ContactForm />
            </motion.div>
            <motion.div {...gridMotionProps} className="space-y-6">
              <motion.div variants={cardItem}>
                <Card className="space-y-4" padding="lg">
                  <h3 className="text-lg font-semibold text-primary-900">Contact Info</h3>
                  <div className="space-y-3 text-sm text-neutral-600">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-primary-500" />
                      <span>{CONTACT_INFO.address}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-primary-500" />
                      <a href={`tel:${CONTACT_INFO.phone}`} className="hover:text-primary-600">
                        {CONTACT_INFO.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-primary-500" />
                      <a
                        href={`mailto:${CONTACT_INFO.email}`}
                        className="hover:text-primary-600"
                      >
                        {CONTACT_INFO.email}
                      </a>
                    </div>
                  </div>
                </Card>
              </motion.div>

              <motion.div variants={cardItem}>
                <BusinessHours />
              </motion.div>

              <motion.div variants={cardItem}>
                <LocationMap />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
