// src/data/features.ts
import { BadgeCheck, Globe2, Headphones, Sparkles } from "lucide-react";

export const FEATURES = [
  {
    icon: BadgeCheck,
    title: "Expertise multi-métiers",
    description:
      "IT, télécoms et second œuvre réunis sous un seul interlocuteur de confiance.",
  },
  {
    icon: Globe2,
    title: "Présence régionale",
    description:
      "Implantés en Côte d'Ivoire, au Mali et au Burkina Faso pour intervenir au plus près.",
  },
  {
    icon: Headphones,
    title: "Support réactif",
    description:
      "Une équipe disponible et des délais d'intervention courts pour limiter vos imprévus.",
  },
  {
    icon: Sparkles,
    title: "Qualité garantie",
    description:
      "Des standards exigeants, des matériaux fiables et un suivi post-livraison rigoureux.",
  },
] as const;
