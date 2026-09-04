// src/data/stats.ts
import { Briefcase, Clock, Users, Globe2 } from "lucide-react";

export const STATS = [
  { icon: Briefcase, value: "150+", label: "Projets accompagnés" },
  { icon: Clock, value: "12+", label: "Années d'expérience" },
  { icon: Users, value: "100+", label: "Clients satisfaits" },
  { icon: Globe2, value: "3", label: "Pays d'intervention" },
] as const;
