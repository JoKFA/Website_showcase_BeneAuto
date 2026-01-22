import { CONTACT_INFO } from "@/lib/constants";

export function LocationMap() {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    CONTACT_INFO.address
  )}&output=embed`;

  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
      <iframe
        title="Bene Auto Rentals location"
        src={mapSrc}
        className="h-72 w-full"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
