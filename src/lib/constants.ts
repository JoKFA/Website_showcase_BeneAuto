export const SITE_CONFIG = {
  name: "Bene Auto Rentals",
  tagline: "Drive Toronto. Your Way.",
  description:
    "Quality car rentals in Toronto with transparent pricing and winter-ready fleet.",
  url: "https://beneauto.ca",
} as const;

export const CONTACT_INFO = {
  phone: "+1 (416) 555-0123",
  email: "rentals@beneauto.ca",
  address: "1600-2300 Yonge St, Toronto, ON M4P 1E4",
  mapUrl: "https://maps.google.com/?q=2300+Yonge+St+Toronto",
} as const;

export const BUSINESS_HOURS = [
  { day: "Monday - Friday", hours: "8:00 AM - 7:00 PM" },
  { day: "Saturday", hours: "9:00 AM - 5:00 PM" },
  { day: "Sunday", hours: "10:00 AM - 4:00 PM" },
] as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/fleet", label: "Our Fleet" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
  { href: "/faq", label: "FAQ" },
] as const;

export const FOOTER_LINKS = {
  quickLinks: [
    { href: "/", label: "Home" },
    { href: "/fleet", label: "Our Fleet" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
    { href: "/faq", label: "FAQ" },
  ],
  vehicles: [
    { href: "/fleet?category=economy", label: "Economy Cars" },
    { href: "/fleet?category=suv", label: "SUVs & Crossovers" },
    { href: "/fleet?category=premium", label: "Premium Vehicles" },
    { href: "/fleet?category=van", label: "Vans & Minivans" },
  ],
  legal: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/rental-agreement", label: "Rental Agreement" },
  ],
} as const;

export const SOCIAL_LINKS = [
  { platform: "facebook", url: "https://facebook.com/beneautorentals", label: "Facebook" },
  { platform: "instagram", url: "https://instagram.com/beneautorentals", label: "Instagram" },
  { platform: "google", url: "https://g.page/beneautorentals", label: "Google Business" },
] as const;

export const RENTAL_RULES = {
  minRentalDays: 1,
  maxRentalDays: 90,
  advanceBookingDays: 180,
  sameDayCutoffHour: 16, // 4 PM
  winterTireStartMonth: 9, // October (0-indexed)
  winterTireStartDay: 15,
  winterTireEndMonth: 3, // April
  winterTireEndDay: 15,
  minAge: 21,
  premiumMinAge: 25,
  differentDropOffFee: 25,
  hstRate: 0.13,
} as const;

export const TRUST_SIGNALS = [
  {
    icon: "Snowflake",
    title: "Winter Tires Included",
    description: "All vehicles equipped Oct-Apr at no extra cost",
  },
  {
    icon: "Check",
    title: "No Hidden Fees",
    description: "Transparent pricing with all costs upfront",
  },
  {
    icon: "MapPin",
    title: "Prime Location",
    description: "Convenient Yonge St pickup in Toronto",
  },
  {
    icon: "CreditCard",
    title: "Flexible Payment",
    description: "Multiple payment options available",
  },
] as const;
