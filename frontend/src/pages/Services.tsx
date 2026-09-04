// src/pages/Services.tsx
import { useState, useEffect } from "react";
import { Check } from "lucide-react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import Container from "@/components/common/Container";
import CTAButton from "@/components/common/CTAButton";
import { DOMAINS, SERVICE_TYPES } from "@/data/services";

const Services = () => {
  const location = useLocation();
  const [activeDomain, setActiveDomain] = useState<string>("informatique");

  const currentDomain = DOMAINS.find(d => d.id === activeDomain);

  // Check URL hash on load and when it changes
  useEffect(() => {
    const hash = location.hash.replace("#", "");
    if (hash && DOMAINS.some(d => d.id === hash)) {
      setActiveDomain(hash);
    }
  }, [location.hash]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white border-b border-border py-16">
        <Container>
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">Nos Services</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Trois domaines d'expertise, trois types de prestations — une approche sur mesure pour chaque projet.
            </p>
          </div>
        </Container>
      </section>

      {/* Domain Selection */}
      <section className="py-8 bg-white border-b border-border">
        <Container>
          <div className="flex flex-wrap justify-center gap-3">
            {DOMAINS.map((domain) => {
              const Icon = domain.icon;
              const isActive = activeDomain === domain.id;
              return (
                <button
                  key={domain.id}
                  onClick={() => setActiveDomain(domain.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-accent text-accent-foreground hover:bg-accent/80"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {domain.label}
                </button>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Service Details */}
      <section className="py-16">
        <Container maxWidth="full">
          <div className="max-w-6xl mx-auto">
            <AnimatePresence mode="wait">
              {currentDomain && (
                <motion.div
                  key={currentDomain.id}
                  id={currentDomain.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    <div>
                      <div className="flex items-center gap-3 mb-6">
                        <currentDomain.icon className="h-8 w-8 text-primary" />
                        <h2 className="text-3xl font-bold text-foreground">{currentDomain.label}</h2>
                      </div>

                      {/* Service Types - Single Column */}
                      <div className="space-y-6">
                        {SERVICE_TYPES.map((type) => {
                          const TypeIcon = type.icon;
                          const items = currentDomain.serviceTypes[
                            type.id as keyof typeof currentDomain.serviceTypes
                          ] as readonly string[] | undefined;

                          if (!items || items.length === 0) return null;

                          return (
                            <div key={type.id} className="bg-white rounded-xl border border-border p-6 shadow-sm">
                              <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                  <TypeIcon className="h-5 w-5" />
                                </div>
                                <div>
                                  <h3 className="font-semibold text-foreground">{type.label}</h3>
                                  <p className="text-sm text-muted-foreground">{type.description}</p>
                                </div>
                              </div>
                              <ul className="grid grid-cols-1 gap-2 mt-3">
                                {items.map((item, idx) => (
                                  <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                                    <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          );
                        })}
                      </div>

                      <CTAButton to="/contact" variant="primary" className="mt-8">
                        Demander un devis
                      </CTAButton>
                    </div>

                    {/* Image */}
                    <div className="relative lg:sticky lg:top-24">
                      <div className="relative">
                        <img
                          src={currentDomain.image}
                          alt={currentDomain.label}
                          className="rounded-xl shadow-xl w-full h-[500px] lg:h-[600px] object-cover"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 border-2 border-primary rounded-xl transform translate-x-4 translate-y-4 -z-10" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Container>
      </section>

      {/* Service Types Summary */}
      <section className="py-16 bg-white border-y border-border">
        <Container>
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-foreground">Comment nous intervenons</h2>
            <p className="text-muted-foreground mt-1">Trois types de prestations pour répondre à tous vos besoins</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SERVICE_TYPES.map((type) => {
              const Icon = type.icon;
              return (
                <div key={type.id} className="bg-gray-50 rounded-xl p-8 text-center border border-border">
                  <div className="p-3 rounded-full bg-primary/10 text-primary w-fit mx-auto mb-4">
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{type.label}</h3>
                  <p className="text-muted-foreground">{type.description}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-20">
        <Container className="text-center">
          <h2 className="text-3xl font-bold text-primary-foreground mb-4">
            Un projet sur mesure ?
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Nos experts sont à votre disposition pour étudier vos besoins et vous proposer les meilleures solutions.
          </p>
          <CTAButton
            to="/contact"
            variant="outline"
            className="bg-white text-primary hover:bg-primary-50 border-2 border-white"
          >
            Contactez-nous
          </CTAButton>
        </Container>
      </section>
    </div>
  );
};

export default Services;
