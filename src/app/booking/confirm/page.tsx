import { Badge, ButtonLink, Card } from "@/components/ui";
import { CONTACT_INFO } from "@/lib/constants";
import { CheckCircle2 } from "lucide-react";

export default function BookingConfirmPage() {
  return (
    <main className="bg-neutral-50">
      <section className="py-24">
        <div className="container mx-auto px-4">
          <Card padding="lg" className="mx-auto max-w-2xl text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-success/10 text-success">
              <CheckCircle2 className="h-7 w-7" />
            </div>
            <Badge variant="secondary" className="mt-6">
              Booking Confirmed
            </Badge>
            <h1 className="mt-4 text-3xl font-semibold text-primary-900">
              Your reservation is locked in.
            </h1>
            <p className="mt-3 text-base text-neutral-600">
              We have emailed your confirmation and pickup details. If you need
              to make changes, contact our team anytime.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <ButtonLink href="/fleet" variant="primary" size="md">
                Browse More Vehicles
              </ButtonLink>
              <ButtonLink href="/contact" variant="outline" size="md">
                Contact Support
              </ButtonLink>
            </div>
            <p className="mt-6 text-xs text-neutral-500">
              Need immediate help? Call us at {CONTACT_INFO.phone}.
            </p>
          </Card>
        </div>
      </section>
    </main>
  );
}
