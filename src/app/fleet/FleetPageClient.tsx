"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { Badge, Button, ButtonLink, Card, Input, Select } from "@/components/ui";
import { FleetGrid } from "@/components/domain/fleet";
import { vehicles } from "@/lib/data/vehicles";
import { vehicleCategories } from "@/lib/data/categories";
import { CONTACT_INFO } from "@/lib/constants";
import { fadeUp } from "@/lib/motion";

const categoryOptions = [
  { value: "all", label: "All categories" },
  ...vehicleCategories.map((category) => ({
    value: category.id,
    label: category.name,
  })),
];

const transmissionOptions = [
  { value: "all", label: "All transmissions" },
  { value: "automatic", label: "Automatic" },
  { value: "manual", label: "Manual" },
];

const sortOptions = [
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "popularity", label: "Most Popular" },
];

const validCategories = new Set(["all", ...vehicleCategories.map((category) => category.id)]);
const validTransmissions = new Set(["all", "automatic", "manual"]);
const validSorts = new Set(sortOptions.map((option) => option.value));

const normalizeCategory = (value: string | null) =>
  value && validCategories.has(value) ? value : "all";

const normalizeTransmission = (value: string | null) =>
  value && validTransmissions.has(value) ? value : "all";

const normalizeSort = (value: string | null) =>
  value && validSorts.has(value) ? value : "price-low";

const normalizePrice = (value: string | null) => {
  if (!value) return "";
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 0) return "";
  return String(parsed);
};

export function FleetPageClient() {
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

  const searchParams = useSearchParams();
  const paramsSignature = useMemo(() => searchParams.toString(), [searchParams]);
  const [category, setCategory] = useState("all");
  const [transmission, setTransmission] = useState("all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("price-low");

  useEffect(() => {
    setCategory(normalizeCategory(searchParams.get("category")));
    setTransmission(normalizeTransmission(searchParams.get("transmission")));
    setMinPrice(normalizePrice(searchParams.get("minPrice")));
    setMaxPrice(normalizePrice(searchParams.get("maxPrice")));
    setSortBy(normalizeSort(searchParams.get("sort")));
  }, [paramsSignature, searchParams]);

  const filteredVehicles = useMemo(() => {
    let result = vehicles.filter((vehicle) => {
      if (category !== "all" && vehicle.category !== category) return false;
      if (transmission !== "all" && vehicle.transmission !== transmission) return false;
      if (minPrice && vehicle.pricePerDay < Number(minPrice)) return false;
      if (maxPrice && vehicle.pricePerDay > Number(maxPrice)) return false;
      return true;
    });

    result = [...result].sort((a, b) => {
      if (sortBy === "price-high") return b.pricePerDay - a.pricePerDay;
      if (sortBy === "popularity") return b.popularityScore - a.popularityScore;
      return a.pricePerDay - b.pricePerDay;
    });

    return result;
  }, [category, transmission, minPrice, maxPrice, sortBy]);

  const handleReset = () => {
    setCategory("all");
    setTransmission("all");
    setMinPrice("");
    setMaxPrice("");
    setSortBy("price-low");
  };

  return (
    <main className="bg-neutral-50">
      <section className="relative overflow-hidden bg-primary-900 text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(212,168,83,0.18),_transparent_55%)]" />
        <div className="container relative mx-auto px-4 py-20">
          <motion.div {...heroMotionProps} className="max-w-2xl">
            <Badge variant="secondary">Our Fleet</Badge>
            <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">
              Vehicles tailored for Toronto streets and beyond.
            </h1>
            <p className="mt-4 text-lg text-white/80">
              Choose from compact city cars, premium sedans, SUVs, and vans. Every
              vehicle is winter-ready and professionally maintained.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="container mx-auto px-4">
          <motion.div {...sectionMotionProps} className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
            <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr_1fr_1fr_1fr]">
              <Select
                label="Category"
                options={categoryOptions}
                value={category}
                onChange={(event) => setCategory(event.target.value)}
              />
              <Select
                label="Transmission"
                options={transmissionOptions}
                value={transmission}
                onChange={(event) => setTransmission(event.target.value)}
              />
              <Input
                label="Min price"
                type="number"
                value={minPrice}
                onChange={(event) => setMinPrice(event.target.value)}
                placeholder="45"
                min={0}
              />
              <Input
                label="Max price"
                type="number"
                value={maxPrice}
                onChange={(event) => setMaxPrice(event.target.value)}
                placeholder="150"
                min={0}
              />
              <Select
                label="Sort by"
                options={sortOptions}
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
              />
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm text-neutral-600">
              <span>{filteredVehicles.length} vehicles available</span>
              <Button variant="ghost" size="sm" onClick={handleReset}>
                Reset filters
              </Button>
            </div>
          </motion.div>

          <div className="mt-12">
            {filteredVehicles.length ? (
              <FleetGrid vehicles={filteredVehicles} highlightFeatured={false} />
            ) : (
              <Card className="flex flex-col items-start gap-4 border-neutral-200 bg-neutral-50">
                <h2 className="text-xl font-semibold text-primary-900">
                  No vehicles match those filters yet.
                </h2>
                <p className="text-sm text-neutral-600">
                  Try adjusting the category or price range. We can also help you
                  find a similar option.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button onClick={handleReset}>Reset filters</Button>
                  <ButtonLink href={`tel:${CONTACT_INFO.phone}`} variant="outline">
                    Call for availability
                  </ButtonLink>
                </div>
              </Card>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
