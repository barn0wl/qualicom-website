// src/data/gallery.ts
import { GalleryImage } from "@/types/client";

export const GALLERY_IMAGES: GalleryImage[] = [
  {
    id: "g-1",
    url: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    caption: "Installation du réseau fibre optique chez un opérateur majeur",
    category: "Réseaux & Télécoms",
    date: "2025",
  },
  {
    id: "g-2",
    url: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    caption: "Mise en place d'une salle serveur et infrastructure IT",
    category: "Informatique",
    date: "2025",
  },
  {
    id: "g-3",
    url: "https://images.unsplash.com/photo-1487958449943-2429e8be8625",
    caption: "Construction et aménagement d'un centre commercial",
    category: "BTP",
    date: "2024",
  },
  {
    id: "g-4",
    url: "https://images.unsplash.com/photo-1473177104440-ffee2f376098",
    caption: "Aménagement intérieur et second œuvre pour espaces de bureaux",
    category: "BTP",
    date: "2024",
  },
  {
    id: "g-5",
    url: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    caption: "Installation électrique et câblage structuré",
    category: "Énergie",
    date: "2025",
  },
  {
    id: "g-6",
    url: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678",
    caption: "Présentation de nos solutions lors d'un salon professionnel",
    category: "Réseaux & Télécoms",
    date: "2025",
  },
  {
    id: "g-7",
    url: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952",
    caption: "Déploiement d'infrastructure réseau pour une institution",
    category: "Réseaux & Télécoms",
    date: "2025",
  },
  {
    id: "g-8",
    url: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
    caption: "Installation de systèmes de sécurité et de surveillance",
    category: "Énergie",
    date: "2024",
  },
  {
    id: "g-9",
    url: "https://images.unsplash.com/photo-1483058712412-4245e9b90334",
    caption: "Travaux de génie civil pour un projet d'envergure",
    category: "BTP",
    date: "2025",
  },
];

export const getGalleryImages = () => GALLERY_IMAGES;
export const getGalleryByCategory = (category: string) =>
  GALLERY_IMAGES.filter(img => img.category === category);
