// src/data/navigation.ts

export const NAV_LINKS = [
  { name: "Accueil", path: "/" },
  { name: "Qualicom", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Références", path: "/clients" },
  { name: "Réalisations", path: "/realisations" },
  { name: "Actualités", path: "/actualites" },
  { name: "Contact", path: "/contact" },
] as const;

export type NavLink = typeof NAV_LINKS[number];