import { Suspense } from "react";
import { FleetPageClient } from "./FleetPageClient";

function FleetPageFallback() {
  return (
    <main className="bg-neutral-50">
      <section className="relative overflow-hidden bg-primary-900 text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700" />
        <div className="container relative mx-auto px-4 py-20">
          <div className="max-w-2xl">
            <div className="h-6 w-32 rounded-full bg-white/20" />
            <div className="mt-4 h-10 w-full max-w-xl rounded-2xl bg-white/15" />
            <div className="mt-4 h-5 w-3/4 rounded-2xl bg-white/10" />
          </div>
        </div>
      </section>
      <section className="bg-white py-24">
        <div className="container mx-auto px-4">
          <div className="h-40 rounded-2xl border border-neutral-200 bg-neutral-50" />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={`skeleton-${index}`}
                className="h-64 rounded-2xl border border-neutral-200 bg-neutral-50"
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default function FleetPage() {
  return (
    <Suspense fallback={<FleetPageFallback />}>
      <FleetPageClient />
    </Suspense>
  );
}
