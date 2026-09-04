// src/data/services.ts
import {
  ShoppingBag,
  Wrench,
  Settings,
  Monitor,
  Wifi,
  Building2
} from "lucide-react";

// Service Types
export const SERVICE_TYPES = [
  {
    id: "services",
    label: "Services",
    icon: Settings,
    description: "Installation, configuration et mise en œuvre"
  },
  {
    id: "maintenance",
    label: "Maintenance",
    icon: Wrench,
    description: "Entretien et réparation de vos installations"
  },
  {
    id: "fourniture",
    label: "Fourniture",
    icon: ShoppingBag,
    description: "Équipements et matériels de toutes catégories"
  }
] as const;

// Domains
export const DOMAINS = [
  {
    id: "informatique",
    label: "Informatique",
    icon: Monitor,
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    serviceTypes: {
      services: [
        "Conception d'architectures systèmes et réseaux",
        "Installation et configuration de réseaux",
        "Sécurisation des infrastructures IT",
        "Virtualisation et migration cloud",
        "Intégration de solutions logicielles",
        "Solutions d'intelligence artificielle et d'analyse de données",
        "Cybersécurité: protection des données et des systèmes",
        "Infrastructures cloud privé, public et hybride"
      ],
      maintenance: [
        "Maintenance préventive et corrective du parc informatique",
        "Gestion des serveurs et bases de données",
        "Support technique et assistance utilisateurs"
      ],
      fourniture: [
        "Matériel informatique (serveurs, postes de travail, périphériques)",
        "Équipements réseau (switchs, routeurs, pare-feu)",
        "Solutions de stockage et de sauvegarde"
      ]
    }
  },
  {
    id: "telecoms",
    label: "Télécommunications",
    icon: Wifi,
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    serviceTypes: {
      services: [
        "Ingénierie télécom GSM",
        "Déploiement d'infrastructures sites GSM",
        "Installation de réseaux fibre optique",
        "Énergie: ateliers d'énergies, groupes électrogènes, panneaux solaires",
        "Conception et mise en œuvre de solutions télécoms"
      ],
      maintenance: [
        "Maintenance de sites GSM (gestion d'énergie, groupes électrogènes)",
        "Maintenance d'infrastructures fibre optique",
        "Réhabilitation de pylônes et réseau de terre"
      ],
      fourniture: [
        "Équipements GSM (antennes, BTS)",
        "Matériels fibre optique (câbles, connecteurs, boîtiers)",
        "Groupes électrogènes, panneaux solaires et baies d'énergie",
        "Matériels de télécommunication"
      ]
    }
  },
  {
    id: "btp",
    label: "Bâtiment & Travaux Publics",
    icon: Building2,
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625",
    serviceTypes: {
      services: [
        "Construction de bâtiments (gros œuvre et second œuvre)",
        "Travaux publics",
        "Installation électrique (courant fort, courant faible)",
        "Aménagement intérieur et finitions"
      ],
      maintenance: [
        "Maintenance des infrastructures bâtimentaires",
        "Rénovation et réhabilitation de bâtiments",
        "Maintenance des systèmes électriques"
      ],
      fourniture: [
        "Matériaux de construction",
        "Équipements électriques et climatisation"
      ]
    }
  }
] as const;

export type Domain = typeof DOMAINS[number];
export type ServiceType = typeof SERVICE_TYPES[number];
