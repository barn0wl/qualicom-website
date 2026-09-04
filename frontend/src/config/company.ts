// src/config/company.ts

export const COMPANY = {
  name: "QUALICOM-CI",
  nameFull: "QUALICOM Côte d'Ivoire",
  tagline: "Intégrateur de solutions informatiques, télécoms et second œuvre",
  founded: 2012,
  capital: "2.000.000 FCFA",

  // Contact
  phone: import.meta.env.VITE_COMPANY_PHONE || "+225 07 59 99 60 00",
  phoneRaw: import.meta.env.VITE_COMPANY_PHONE_RAW || "+22507599960000",
  whatsapp: import.meta.env.VITE_COMPANY_WHATSAPP || "22507599960000",
  email: import.meta.env.VITE_COMPANY_EMAIL || "infos@qualicom-ci.com", // UPDATED
  emailFallback: import.meta.env.VITE_COMPANY_EMAIL_FALLBACK || "infos@qualicom-ci.com", // UPDATED

  // Addresses
  addresses: {
    ivoryCoast: import.meta.env.VITE_COMPANY_ADDRESS || "Abidjan, Côte d'Ivoire",
    mali: import.meta.env.VITE_COMPANY_ADDRESS_MALI || "Bamako, Mali",
    burkina: import.meta.env.VITE_COMPANY_ADDRESS_BURKINA || "Ouagadougou, Burkina Faso",
  },

  // Operating Hours
  hours: {
    weekdays: "Lundi - Vendredi : 8h00 - 18h00",
    saturday: "Samedi : 8h00 - 12h00",
    sunday: "Dimanche : Fermé",
  },
} as const;

export const MAPBOX_CONFIG = {
  token: import.meta.env.VITE_MAPBOX_TOKEN || "",
  style: "mapbox://styles/mapbox/light-v11",
  center: [-4.0082, 8.0000] as [number, number],
  zoom: 5,
} as const;

export const EMAILJS_CONFIG = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || "",
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "",
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "",
} as const;

export const LOCATIONS: Array<{
  name: string;
  coordinates: [number, number];
  country: string;
}> = [
  { name: "Abidjan", coordinates: [-4.0082, 5.3596], country: "Côte d'Ivoire" },
  { name: "Yamoussoukro", coordinates: [-5.2769, 6.8276], country: "Côte d'Ivoire" },
  { name: "Bouaké", coordinates: [-5.0338, 7.6906], country: "Côte d'Ivoire" },
  { name: "San Pedro", coordinates: [-6.6363, 4.7485], country: "Côte d'Ivoire" },
  { name: "Bamako", coordinates: [-8.0029, 12.6392], country: "Mali" },
  { name: "Ouagadougou", coordinates: [-1.5197, 12.3714], country: "Burkina Faso" },
];
