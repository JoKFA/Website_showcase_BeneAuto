"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import {
  Badge,
  ButtonLink,
  Card,
} from "@/components/ui";
import { BookingSummary } from "@/components/domain/booking";
import { VehicleGallery } from "./vehicle-gallery";
import { VehicleSpecs } from "./vehicle-specs";
import { categoryLabels } from "@/lib/data/categories";
import { CONTACT_INFO } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";
import { cardItem, fadeUp, staggerContainer } from "@/lib/motion";
import type { Car } from "@/types";
import {
  CheckCircle2,
  MapPin,
  ShieldCheck,
  Snowflake,
  Smartphone,
  Usb,
  Camera,
} from "lucide-react";

interface VehicleDetailViewProps {
  vehicle: Car;
}

export function VehicleDetailView({ vehicle }: VehicleDetailViewProps) {
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

  const galleryImages = [
    vehicle.images.primary,
    ...vehicle.images.gallery,
  ].filter(Boolean);

  const featureList = [
    { label: "Air conditioning", available: vehicle.hasAC, icon: Snowflake },
    { label: "Bluetooth audio", available: vehicle.hasBluetooth, icon: Smartphone },
    { label: "USB charging", available: vehicle.hasUSB, icon: Usb },
    { label: "Backup camera", available: vehicle.hasBackupCamera, icon: Camera },
  ];

  return (
    <main className="bg-neutral-50">
      <section className="relative overflow-hidden bg-primary-900 text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(212,168,83,0.18),_transparent_55%)]" />
        <div className="container relative mx-auto px-4 pb-16 pt-24">
          <motion.div {...heroMotionProps}>
            <Link
              href="/fleet"
              className="text-sm font-medium text-white/80 hover:text-white transition-colors"
            >
              &larr; Back to fleet
            </Link>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Badge variant="secondary">
                {categoryLabels[vehicle.category] ?? "Vehicle"}
              </Badge>
              {vehicle.winterTiresIncluded && (
                <Badge variant="default" className="bg-white/80 text-primary-900">
                  Winter tires included
                </Badge>
              )}
              <Badge variant={vehicle.isAvailable ? "success" : "warning"}>
                {vehicle.isAvailable ? "Available today" : "Currently reserved"}
              </Badge>
            </div>

            <div className="mt-4 max-w-3xl">
              <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
                {vehicle.year} {vehicle.make} {vehicle.model}
              </h1>
              <p className="mt-4 text-lg text-white/80">
                From {formatCurrency(vehicle.pricePerDay)}/day | {vehicle.seats} seats |
                {vehicle.transmission} | {vehicle.fuelType}
              </p>
              <p className="mt-4 text-sm text-white/70">
                Professionally maintained and winter-ready for Toronto driving. Perfect for
                business trips, weekend escapes, and family travel.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-[1.4fr_0.6fr] lg:items-start">
            <div className="space-y-10">
              <motion.div {...sectionMotionProps}>
                <VehicleGallery
                  images={galleryImages}
                  alt={`${vehicle.make} ${vehicle.model}`}
                  focus={vehicle.imageFocus}
                />
              </motion.div>

              <motion.div
                {...gridMotionProps}
                className="grid gap-6 lg:grid-cols-2"
              >
                <motion.div variants={cardItem}>
                  <Card padding="lg">
                    <h2 className="text-xl font-semibold text-primary-900">
                      Vehicle overview
                    </h2>
                    <VehicleSpecs
                      seats={vehicle.seats}
                      luggage={vehicle.luggage}
                      transmission={vehicle.transmission}
                      fuelType={vehicle.fuelType}
                      className="mt-4 text-sm"
                    />
                    <div className="mt-5 grid grid-cols-2 gap-3 text-sm text-neutral-600">
                      <span>{vehicle.doors} doors</span>
                      <span>Minimum age {vehicle.minimumAge}+</span>
                      <span>{formatCurrency(vehicle.deposit)} deposit</span>
                      <span>{formatCurrency(vehicle.pricePerWeek)} weekly</span>
                    </div>
                  </Card>
                </motion.div>

                <motion.div variants={cardItem}>
                  <Card padding="lg">
                    <h2 className="text-xl font-semibold text-primary-900">
                      Included features
                    </h2>
                    <div className="mt-4 space-y-3 text-sm text-neutral-600">
                      {featureList.map((feature) => {
                        const Icon = feature.icon;
                        return (
                          <div key={feature.label} className="flex items-center gap-3">
                            <span
                              className={`flex h-8 w-8 items-center justify-center rounded-full ${
                                feature.available
                                  ? "bg-success/10 text-success"
                                  : "bg-neutral-200 text-neutral-500"
                              }`}
                            >
                              <Icon className="h-4 w-4" />
                            </span>
                            <span>{feature.label}</span>
                          </div>
                        );
                      })}
                      <div className="flex items-center gap-3">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary-500/10 text-secondary-500">
                          <ShieldCheck className="h-4 w-4" />
                        </span>
                        <span>Transparent pricing and flexible coverage options</span>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </motion.div>

              <motion.div {...sectionMotionProps}>
                <Card padding="lg" className="border-neutral-200">
                  <h2 className="text-xl font-semibold text-primary-900">
                    Rental details
                  </h2>
                  <div className="mt-4 grid gap-4 md:grid-cols-2 text-sm text-neutral-600">
                    <div className="flex items-start gap-3">
                      <MapPin className="mt-0.5 h-4 w-4 text-secondary-500" />
                      <div>
                        <p className="font-medium text-primary-900">Pickup location</p>
                        <p>{CONTACT_INFO.address}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-success" />
                      <div>
                        <p className="font-medium text-primary-900">What's included</p>
                        <p>
                          Winter tires Oct-Apr, roadside assistance, and flexible swaps.
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>

            <motion.div {...sectionMotionProps} className="space-y-6">
              <BookingSummary
                dailyRate={vehicle.pricePerDay}
                weeklyRate={vehicle.pricePerWeek}
                deposit={vehicle.deposit}
                minimumAge={vehicle.minimumAge}
                reserveHref="/booking"
                reserveLabel="Reserve this vehicle"
              />

              <Card padding="lg" className="bg-neutral-50">
                <h3 className="text-lg font-semibold text-primary-900">Need help?</h3>
                <p className="mt-3 text-sm text-neutral-600">
                  Call our team for same-day availability or custom requests. We can
                  recommend the right vehicle for your trip.
                </p>
                <ButtonLink
                  href="/contact"
                  variant="outline"
                  className="mt-4 w-full justify-center"
                >
                  Contact our team
                </ButtonLink>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
