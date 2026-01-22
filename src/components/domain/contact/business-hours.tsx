import { BUSINESS_HOURS } from "@/lib/constants";

export function BusinessHours() {
  return (
    <div className="space-y-3 rounded-2xl border border-neutral-200 bg-white p-6">
      <h3 className="text-lg font-semibold text-primary-900">Business Hours</h3>
      <div className="space-y-2 text-sm text-neutral-600">
        {BUSINESS_HOURS.map((hours) => (
          <div key={hours.day} className="flex items-center justify-between">
            <span className="font-medium text-neutral-700">{hours.day}</span>
            <span>{hours.hours}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
