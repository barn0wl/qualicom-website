// src/types/client.ts

export interface ClientReference {
  id: string;
  title: string;
  items?: string[]; // Bullet list of what Qualicom did for this client
}

export interface Client {
  id: string;
  name: string;
  logo: string; // URL to logo image
  description: string; // Description of the partnership
  category: string; // For filtering (domain of activity: Télécoms, Informatique, BTP, Énergie)
  location?: string;
  references?: ClientReference[]; // Bullet list of works done
}

export interface GalleryImage {
  id: string;
  url: string;
  caption: string; // Description of what's shown in the image
  category?: string; // Optional category for filtering
  date?: string; // Optional date
}

export const GALLERY_CATEGORIES = [
  "Réseaux & Télécoms",
  "Informatique",
  "BTP",
  "Énergie",
] as const;

export type GalleryCategory = typeof GALLERY_CATEGORIES[number];

export const CLIENT_CATEGORIES = [
  "Télécoms",
  "Informatique",
  "BTP",
  "Énergie",
] as const;

export type ClientCategory = typeof CLIENT_CATEGORIES[number];
