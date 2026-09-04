// src/data/process.ts
import { Search, FileText, Wrench } from "lucide-react";

export const PROCESS_STEPS = [
  {
    icon: Search,
    step: "01",
    title: "Analyse du besoin",
    description:
      "Nous écoutons, auditons et cadrons précisément vos enjeux pour proposer la meilleure réponse.",
  },
  {
    icon: FileText,
    step: "02",
    title: "Proposition technique",
    description:
      "Une recommandation claire, chiffrée et adaptée à votre budget, sans jargon inutile.",
  },
  {
    icon: Wrench,
    step: "03",
    title: "Réalisation & suivi",
    description:
      "Mise en œuvre par nos équipes, contrôle qualité et accompagnement dans la durée.",
  },
] as const;
