// src/pages/About.tsx
import { Building2, Check, ArrowRight, Target, Calendar, ClipboardList, Wrench, ThumbsUp } from "lucide-react";
import { Link } from "react-router-dom";
import Container from "@/components/common/Container";
import SectionHeader from "@/components/common/SectionHeader";
import CTAButton from "@/components/common/CTAButton";
import { COMPANY } from "@/config/company";

// Updated process steps to match Qualicom's documentation
const ABOUT_PROCESS = [
  {
    id: 1,
    title: "Démarrage & Cadrage",
    description: "Définition et cadrage des nouvelles étapes ou jalons du projet global.",
    icon: <Target className="h-8 w-8 text-primary-600" />,
  },
  {
    id: 2,
    title: "Planification & Lancement",
    description: "Planification détaillée et regroupement des ressources nécessaires à l'exécution.",
    icon: <Calendar className="h-8 w-8 text-primary-600" />,
  },
  {
    id: 3,
    title: "Exécution",
    description: "Réalisation des sous-tâches liées au jalon ou à l'étape courante.",
    icon: <Wrench className="h-8 w-8 text-primary-600" />,
  },
  {
    id: 4,
    title: "Contrôle & Validation",
    description: "Contrôle et validation des livrables par le client avant de passer à l'étape suivante.",
    icon: <ThumbsUp className="h-8 w-8 text-primary-600" />,
  },
];

const ABOUT_FEATURES = [
  "Expertise depuis 2012",
  "Présence en Côte d'Ivoire, au Mali et au Burkina Faso",
  "Personnel hautement qualifié",
  "Solutions sur mesure",
  "Service client premium",
  "Innovation continue",
];

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 z-10" />
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1483058712412-4245e9b90334"
            alt="QUALICOM Bureau"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
              À propos de {COMPANY.name}
            </h1>
            <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
              Votre partenaire en solutions <strong>INFORMATIQUE, TÉLÉCOMS et BTP</strong> depuis {COMPANY.founded}
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Construisons ensemble votre succès
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Fondée en {COMPANY.founded}, {COMPANY.name} est une entreprise de services
                spécialisée dans les domaines de l' <strong>INFORMATIQUE</strong>, des
                <strong> TÉLÉCOMMUNICATIONS</strong> et du <strong>BTP</strong>.
              </p>
              <p>
                <strong>QUALICOM</strong> existe aussi au Mali et au Burkina Faso, sous les dénominations
                de QUALICOM-Mali SARL et QUALICOM-BF SARL. Ce sont respectivement des sociétés 
                à Responsabilité Limitée (SARL) de droit Malien et Burkinabé, au capital social de 1.000.000 FCFA.
              </p>
              <ul className="grid grid-cols-2 gap-4">
                {ABOUT_FEATURES.map((feature) => (
                  <li key={feature} className="flex items-center text-gray-700">
                    <Check className="h-5 w-5 text-primary-600 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1581092795360-fd1ca04f0952"
                alt="Notre équipe"
                className="rounded-xl shadow-xl"
                loading="lazy"
              />
              <div className="absolute inset-0 border-2 border-primary-600 rounded-xl transform translate-x-4 translate-y-4 -z-10" />
            </div>
          </div>
        </Container>
      </section>

      {/* Company Structure */}
      <section className="py-24 bg-gray-50">
        <Container>
          <SectionHeader
            title="Notre Structure"
            subtitle="Une présence régionale forte avec trois entités complémentaires"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Côte d'Ivoire */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <Building2 className="h-12 w-12 text-primary-600 mb-6" />
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {COMPANY.name} – Côte d'Ivoire SARL
              </h3>
              <p className="text-gray-600 mb-4">
                Société à Responsabilité Limitée opérant en Côte d'Ivoire avec un
                capital social de {COMPANY.capital}.
              </p>
            </div>

            {/* Mali */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <Building2 className="h-12 w-12 text-primary-600 mb-6" />
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                QUALICOM-ML SARL
              </h3>
              <p className="text-gray-600 mb-4">
                Société à Responsabilité Limitée de droit malien avec un
                capital social de 1.000.000 FCFA.
              </p>
            </div>

            {/* Burkina Faso */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <Building2 className="h-12 w-12 text-primary-600 mb-6" />
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                QUALICOM-BF SARL
              </h3>
              <p className="text-gray-600 mb-4">
                Société à Responsabilité Limitée de droit burkinabé avec un
                capital social de 1.000.000 FCFA.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Process Section - UPDATED */}
      <section className="py-24 bg-white">
        <Container>
          <SectionHeader
            title="Notre Processus"
            subtitle="Une approche fonctionnelle structurée en quatre étapes"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {ABOUT_PROCESS.map((step) => (
              <div key={step.id} className="relative">
                <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-border/50">
                  <div className="mb-6">{step.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                {step.id < ABOUT_PROCESS.length && (
                  <ArrowRight className="hidden lg:block absolute top-1/2 -right-6 transform -translate-y-1/2 h-6 w-6 text-primary-600" />
                )}
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 py-24">
        <Container className="text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Prêt à démarrer votre projet ?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Contactez-nous dès aujourd'hui pour discuter de vos besoins et
            découvrir comment nous pouvons vous aider.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <CTAButton
              to="/contact"
              variant="outline"
              className="min-w-[200px]"
            >
              Nous contacter
            </CTAButton>
            <CTAButton
              to="/services"
              variant="ghost"
              className="min-w-[200px]"
            >
              Nos services
            </CTAButton>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default About;
