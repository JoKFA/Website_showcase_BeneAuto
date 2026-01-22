"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Badge, ButtonLink, Card } from "@/components/ui";
import { cardItem, fadeUp, staggerContainer } from "@/lib/motion";
import { MapPin, ShieldCheck, Snowflake, Sparkles } from "lucide-react";

const stats = [
  { label: "Vehicles in fleet", value: "35+" },
  { label: "Average Google rating", value: "4.8" },
  { label: "Local years in service", value: "6" },
];

const values = [
  {
    title: "Local expertise",
    description:
      "We are Toronto-based and know the best routes, seasons, and rental tips.",
    icon: MapPin,
  },
  {
    title: "Transparent pricing",
    description:
      "Clear rates, optional coverage, and no surprise fees at pickup.",
    icon: ShieldCheck,
  },
  {
    title: "Winter-ready fleet",
    description:
      "Every vehicle is equipped with winter tires Oct 15 - Apr 15.",
    icon: Snowflake,
  },
  {
    title: "Personal service",
    description:
      "You will work directly with our team for flexible, friendly support.",
    icon: Sparkles,
  },
];

export default function AboutPage() {
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
            <Badge variant="secondary">About Bene Auto</Badge>
            <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">
              Local rental experts focused on trust, clarity, and care.
            </h1>
            <p className="mt-4 text-lg text-white/80">
              Bene Auto Rentals is a locally owned Toronto company offering a
              winter-ready fleet, transparent pricing, and flexible rental
              options for business travelers, visitors, and local residents.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <ButtonLink variant="secondary" size="lg" href="/fleet">
                Explore the Fleet
              </ButtonLink>
              <ButtonLink
                variant="outline"
                size="lg"
                href="/contact"
                className="border-white/40 text-white hover:bg-white/10"
              >
                Contact Us
              </ButtonLink>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <motion.div {...sectionMotionProps}>
              <h2 className="text-3xl font-semibold text-primary-900 sm:text-4xl">
                Built on local knowledge and straightforward service.
              </h2>
              <p className="mt-5 text-lg text-neutral-600">
                We started Bene Auto Rentals to create a rental experience that
                feels personal, not corporate. Our team is hands-on with every
                booking, ensuring you get the right vehicle for your Toronto
                plans - from airport pickups to weekend escapes.
              </p>
              <p className="mt-4 text-base text-neutral-600">
                Our fleet is meticulously maintained and winter-prepped, and our
                pricing is always transparent. We believe renting a vehicle should
                be simple, reliable, and stress-free.
              </p>
            </motion.div>
            <motion.div {...gridMotionProps} className="grid gap-4">
              {stats.map((stat) => (
                <motion.div key={stat.label} variants={cardItem}>
                  <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
                    <p className="text-3xl font-semibold text-primary-900">
                      {stat.value}
                    </p>
                    <p className="mt-2 text-sm text-neutral-600">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-neutral-50 py-24">
        <div className="container mx-auto px-4">
          <motion.div {...sectionMotionProps} className="max-w-2xl">
            <Badge variant="secondary">Our Values</Badge>
            <h2 className="mt-4 text-3xl font-semibold text-primary-900 sm:text-4xl">
              Professional service with a Toronto-first mindset.
            </h2>
          </motion.div>

          <motion.div {...gridMotionProps} className="mt-12 grid gap-6 md:grid-cols-2">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <motion.div key={value.title} variants={cardItem}>
                  <Card className="h-full">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-500/10 text-primary-600">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-6 text-xl font-semibold text-primary-900">
                      {value.title}
                    </h3>
                    <p className="mt-3 text-sm text-neutral-600">
                      {value.description}
                    </p>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
    </main>
  );
}
