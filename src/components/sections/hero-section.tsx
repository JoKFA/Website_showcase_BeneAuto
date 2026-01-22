"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Badge, Button } from "@/components/ui";
import { BookingWidget } from "@/components/domain/booking";
import { fadeUp, fadeUpBlur, slideInRight } from "@/lib/motion";
import { BUSINESS_HOURS, CONTACT_INFO, SITE_CONFIG } from "@/lib/constants";

const popularSearches = [
  { label: "Economy cars", href: "/fleet?category=economy" },
  { label: "SUVs & crossovers", href: "/fleet?category=suv" },
  { label: "Premium sedans", href: "/fleet?category=premium" },
];

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion();
  const scrollBehavior = shouldReduceMotion ? "auto" : "smooth";
  const hoursSummary = BUSINESS_HOURS.map((item) => item.hours).join(" · ");

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;
    element.scrollIntoView({ behavior: scrollBehavior, block: "start" });
  };

  const textMotionProps = shouldReduceMotion
    ? {}
    : {
        variants: fadeUp,
        initial: "hidden",
        animate: "visible",
      };

  return (
    <section className="relative overflow-hidden bg-primary-900 text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(212,168,83,0.2),_transparent_55%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(120deg,_rgba(255,255,255,0.06),_transparent_40%)]" />

      <div className="relative z-10">
        <div className="container mx-auto px-4 pt-16 pb-12 lg:pb-16">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="max-w-2xl">
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="secondary">Toronto car rentals</Badge>
                <Badge variant="outline" className="border-white/30 text-white/80">
                  Winter-ready fleet
                </Badge>
              </div>

              <motion.h1
                {...(shouldReduceMotion
                  ? {}
                  : {
                      variants: fadeUpBlur,
                      initial: "hidden",
                      animate: "visible",
                    })}
                className="mt-6 text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
              >
                Book the right car in minutes. Built for Toronto trips.
              </motion.h1>

              <motion.p
                {...textMotionProps}
                className="mt-6 text-lg text-white/80 sm:text-xl"
              >
                {SITE_CONFIG.description} Compare vehicles, see transparent pricing,
                and lock in pickup on Yonge Street.
              </motion.p>

              <motion.div {...textMotionProps} className="mt-6 flex flex-wrap gap-3">
                {popularSearches.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs text-white/90 transition-colors duration-200 hover:border-secondary-300 hover:bg-white/20 cursor-pointer"
                  >
                    {item.label}
                  </Link>
                ))}
              </motion.div>

              <motion.div
                {...textMotionProps}
                className="mt-6 flex flex-col gap-4 sm:flex-row"
              >
                <Button
                  size="lg"
                  variant="secondary"
                  onClick={() => handleScroll("fleet-section")}
                >
                  Search Available Vehicles
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/40 text-white hover:bg-white/10"
                  onClick={() => handleScroll("fleet-section")}
                >
                  View Our Fleet
                </Button>
              </motion.div>
            </div>

            <motion.div
              {...(shouldReduceMotion
                ? {}
                : {
                    variants: slideInRight,
                    initial: "hidden",
                    animate: "visible",
                  })}
              className="space-y-4"
            >
              <div className="rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur">
                <p className="text-xs uppercase tracking-[0.2em] text-white/70">
                  Pickup location
                </p>
                <p className="mt-2 text-lg font-semibold">{CONTACT_INFO.address}</p>
                <p className="mt-2 text-sm text-white/70">
                  {hoursSummary}
                </p>
                <div className="mt-4 flex flex-wrap gap-3 text-sm text-white/80">
                  <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1">
                    Winter tires included
                  </span>
                  <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1">
                    No hidden fees
                  </span>
                </div>
                <a
                  href={`tel:${CONTACT_INFO.phone}`}
                  className="mt-4 inline-flex text-sm font-semibold text-secondary-300 hover:text-secondary-200"
                >
                  Call {CONTACT_INFO.phone}
                </a>
              </div>
            </motion.div>
          </div>

          <motion.div
            {...textMotionProps}
            className="mt-10"
            id="booking-widget"
          >
            <BookingWidget />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
