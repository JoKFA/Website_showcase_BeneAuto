import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { VehicleDetailView } from "@/components/domain/fleet/vehicle-detail-view";
import { getVehicleBySlug, vehicles } from "@/lib/data/vehicles";
import { formatCurrency } from "@/lib/utils";

interface VehicleDetailPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = true;

export function generateStaticParams() {
  return vehicles.map((vehicle) => ({ slug: vehicle.slug }));
}

export async function generateMetadata(
  { params }: VehicleDetailPageProps
): Promise<Metadata> {
  const { slug } = await params;
  const vehicle = getVehicleBySlug(slug);

  if (!vehicle) {
    return {
      title: "Vehicle not found | Bene Auto Rentals",
    };
  }

  const title = `${vehicle.year} ${vehicle.make} ${vehicle.model} | Bene Auto Rentals`;
  const description = `Rent the ${vehicle.year} ${vehicle.make} ${vehicle.model} in Toronto. From ${formatCurrency(
    vehicle.pricePerDay
  )}/day with winter tires included.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [vehicle.images.primary],
    },
  };
}

export default async function VehicleDetailPage({ params }: VehicleDetailPageProps) {
  const { slug } = await params;
  const vehicle = getVehicleBySlug(decodeURIComponent(slug).toLowerCase());

  if (!vehicle) {
    notFound();
  }

  return <VehicleDetailView vehicle={vehicle} />;
}
