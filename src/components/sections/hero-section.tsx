"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Badge, Button } from "@/components/ui";
import { BookingWidget } from "@/components/domain/booking";
import { vehicles } from "@/lib/data/vehicles";
import { fadeUp, fadeUpBlur, slideInRight } from "@/lib/motion";
import { SITE_CONFIG } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";

const popularSearches = [
  { label: "Economy cars", href: "/fleet?category=economy" },
  { label: "SUVs & crossovers", href: "/fleet?category=suv" },
  { label: "Premium sedans", href: "/fleet?category=premium" },
];

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion();
  const scrollBehavior = shouldReduceMotion ? "auto" : "smooth";
  const featuredVehicle = vehicles.find((vehicle) => vehicle.featured) ?? vehicles[0];
  const secondaryVehicle =
    vehicles.find((vehicle) => vehicle.id !== featuredVehicle?.id) ?? vehicles[1];

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
      {featuredVehicle && (
        <div className="absolute right-[-10%] top-0 hidden h-full w-[55%] lg:block">
          <div className="relative h-full w-full opacity-30">
            <Image
              src={featuredVehicle.images.primary}
              alt={`${featuredVehicle.make} ${featuredVehicle.model}`}
              fill
              sizes="55vw"
              className="object-cover"
              priority
              style={{ objectPosition: featuredVehicle.imageFocus ?? "50% 50%" }}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-l from-primary-900/10 via-primary-900/40 to-primary-900" />
        </div>
      )}

      <div className="relative z-10">
        <div className="container mx-auto px-4 pt-16 pb-12 lg:pb-20">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
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
                Book the right car in minutes. The local marketplace for Toronto rentals.
              </motion.h1>

              <motion.p
                {...textMotionProps}
                className="mt-6 text-lg text-white/80 sm:text-xl"
              >
                {SITE_CONFIG.description} Compare vehicles, see transparent pricing,
                and lock in pickup on Yonge Street.
              </motion.p>

              <motion.div {...textMotionProps} className="mt-7 flex flex-wrap gap-3">
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
              className="relative"
            >
              <div id="booking-widget">
                <BookingWidget />
              </div>

              <div className="mt-6 hidden gap-4 lg:grid lg:grid-cols-2">
                {[featuredVehicle, secondaryVehicle].filter(Boolean).map((vehicle) => (
                  <div
                    key={vehicle?.id}
                    className="group overflow-hidden rounded-2xl border border-white/15 bg-white/10 shadow-lg"
                  >
                    <div className="relative aspect-[4/3]">
                      {vehicle && (
                        <Image
                          src={vehicle.images.primary}
                          alt={`${vehicle.make} ${vehicle.model}`}
                          fill
                          sizes="220px"
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          style={{ objectPosition: vehicle.imageFocus ?? "50% 50%" }}
                        />
                      )}
                    </div>
                    <div className="bg-white/90 px-4 py-3 text-primary-900">
                      <p className="text-xs text-neutral-500">From</p>
                      <p className="text-sm font-semibold">
                        {vehicle ? `${vehicle.make} ${vehicle.model}` : "Vehicle"}
                      </p>
                      {vehicle && (
                        <p className="text-xs text-neutral-500">
                          {formatCurrency(vehicle.pricePerDay)}/day
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
