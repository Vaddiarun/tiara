export const SITE_NAME = "Tiara Spa";
export const BUSINESS_PHONE = "+91 6363595881";
export const BUSINESS_PHONE_E164 = "+916363595881";
export const BUSINESS_ADDRESS = "Near Indian Oil Petrol Pump, Sector 3, HSR Layout, Bengaluru 560102";

export const pageSeo = {
  "/": {
    title: "Tiara Spa | Doorstep Massage & Spa Services in Bangalore",
    description:
      "Book Tiara Spa doorstep massage services in Bangalore. Aromatherapy, Swedish, deep tissue, Thai, jet lag therapy and signature massage by certified therapists.",
  },
  "/about": {
    title: "About Tiara Spa | Doorstep Wellness in Bangalore",
    description:
      "Learn about Tiara Spa, a Bangalore doorstep wellness service offering professional massage therapy with certified therapists and private in-home spa care.",
  },
  "/contact": {
    title: "Contact Tiara Spa | Book Doorstep Massage in Bangalore",
    description:
      "Contact Tiara Spa for doorstep massage bookings in Bangalore. Call or WhatsApp +91 6363595881 for appointments, callbacks and service questions.",
  },
  "/course": {
    title: "Tiara Training Program | Massage Training Course in Bangalore",
    description:
      "Join the Tiara Spa training program in Bangalore. Learn massage techniques across 5 focused sessions with certificate and pre-placement consideration.",
  },
  "/hiring": {
    title: "Tiara Spa Hiring | Apply for Spa Therapist Jobs in Bangalore",
    description:
      "Apply for spa therapist opportunities with Tiara Spa in Bangalore. Submit your details for hiring and doorstep wellness roles.",
  },
};

export function getSeoForPath(pathname) {
  return pageSeo[pathname] || pageSeo["/"];
}

export function localBusinessSchema(origin = "") {
  const baseUrl = origin || "";

  return {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    "@id": `${baseUrl}/#business`,
    name: SITE_NAME,
    url: baseUrl || "/",
    image: `${baseUrl}/web-app-manifest-512x512.png`,
    telephone: BUSINESS_PHONE_E164,
    priceRange: "₹₹",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Near Indian Oil Petrol Pump, Sector 3, HSR Layout",
      addressLocality: "Bengaluru",
      addressRegion: "Karnataka",
      postalCode: "560102",
      addressCountry: "IN",
    },
    areaServed: ["Bengaluru", "HSR Layout", "Bangalore"],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "09:00",
        closes: "21:00",
      },
    ],
    sameAs: [
      "https://www.instagram.com/tiara_doorstep_massage_/",
      "https://www.facebook.com/people/Tiara-Spa/100082829139771/",
      "https://g.co/kgs/Y4Lf5qQ",
    ],
    makesOffer: [
      "Aromatherapy massage",
      "Swedish massage",
      "Deep tissue massage",
      "Thai massage",
      "Jet lag therapy",
      "Tiara signature massage",
      "Massage training program",
    ].map((name) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name,
        areaServed: "Bengaluru",
      },
    })),
  };
}
