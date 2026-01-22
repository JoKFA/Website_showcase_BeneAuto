"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Badge, Button } from "@/components/ui";
import { BookingWidget } from "@/components/domain/booking";
import { fadeUp, fadeUpBlur, slideInRight } from "@/lib/motion";
import { SITE_CONFIG } from "@/lib/constants";

const heroImagePrimary =
  "https://cdn.pixabay.com/photo/2016/03/27/19/22/city-1283801_1280.jpg";

const popularSearches = [
  { label: "Economy cars", href: "/fleet?category=economy" },
  { label: "SUVs & crossovers", href: "/fleet?category=suv" },
  { label: "Premium sedans", href: "/fleet?category=premium" },
];

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion();
  const scrollBehavior = shouldReduceMotion ? "auto" : "smooth";

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
        <div className="container mx-auto px-4 pt-20 pb-12 lg:pb-16">
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
                Book the right car in minutes. A trusted marketplace for Toronto rentals.
              </motion.h1>

              <motion.p
                {...textMotionProps}
                className="mt-6 text-lg text-white/80 sm:text-xl"
              >
                {SITE_CONFIG.description} Compare vehicles, see transparent pricing,
                and lock in pickup on Yonge Street.
              </motion.p>

              <motion.div {...textMotionProps} className="mt-8 flex flex-wrap gap-3">
                {popularSearches.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white/90 transition-colors duration-200 hover:border-secondary-300 hover:bg-white/20 cursor-pointer"
                  >
                    {item.label}
                  </Link>
                ))}
              </motion.div>

              <motion.div
                {...textMotionProps}
                className="mt-8 flex flex-col gap-4 sm:flex-row"
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
              className="relative"
            >
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={heroImagePrimary}
                    alt="Nighttime city drive"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/70 via-primary-900/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-white/90 px-4 py-3 text-primary-900">
                  <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
                    Featured routes
                  </p>
                  <p className="mt-1 text-base font-semibold">
                    Downtown nights, Niagara weekends, business commutes
                  </p>
                </div>
              </div>
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
            className="mt-10 lg:-mb-20"
            id="booking-widget"
          >
            <BookingWidget />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
