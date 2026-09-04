// src/pages/Index.tsx
import {
  ArrowRight,
  ChevronDown,
  ShieldCheck,
  MapPin,
  Award,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import Reveal from "@/components/Reveal";
import HeroNetwork from "@/components/HeroNetwork";
import Container from "@/components/common/Container";
import SectionHeader from "@/components/common/SectionHeader";
import CTAButton from "@/components/common/CTAButton";

import { DOMAINS } from "@/data/services";
import { STATS } from "@/data/stats";
import { PROCESS_STEPS } from "@/data/process";
import { FEATURES } from "@/data/features";

import BlogCarousel from "@/components/blog/BlogCarousel";
import { useBlog } from "@/context/BlogContext";

const Index = () => {
  const { latestPosts } = useBlog();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[88vh] md:min-h-[92vh] flex items-center overflow-hidden bg-background">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7"
            alt="QUALICOM Hero"
            className="w-full h-full object-cover opacity-25"
            loading="lazy"
          />
        </div>

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/90 to-primary/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--primary)/0.25),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,hsl(var(--primary)/0.18),transparent_55%)]" />

        {/* Decorative shapes */}
        <div className="pointer-events-none absolute -top-24 -right-24 w-[28rem] h-[28rem] rounded-full bg-primary/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-20 w-[26rem] h-[26rem] rounded-full bg-primary/15 blur-3xl" />
        <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] rounded-full border border-primary/10" />
        <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 w-[28rem] h-[28rem] rounded-full border border-primary/10" />

        {/* Grid texture */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Network animation */}
        <div className="pointer-events-none absolute inset-0 z-10 hidden md:block opacity-70">
          <HeroNetwork />
        </div>

        {/* Mobile fallback */}
        <div className="pointer-events-none absolute inset-0 z-10 md:hidden opacity-50">
          <div
            className="absolute inset-0 animate-pulse"
            style={{
              backgroundImage:
                "radial-gradient(hsl(var(--primary) / 0.35) 1px, transparent 1.5px)",
              backgroundSize: "28px 28px",
            }}
          />
        </div>

        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full border border-primary/20 bg-background/60 backdrop-blur-md shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-medium tracking-wider uppercase text-foreground/80">
                Intégrateur de solutions depuis 2012
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6 leading-[1.05]">
              Bâtir l'infrastructure de{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-primary via-primary to-primary/70 bg-clip-text text-transparent">
                  votre réussite
                </span>
                <span className="absolute -bottom-1 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-primary/60 to-transparent rounded-full" />
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              <strong>INFORMATIQUE, TÉLÉCOMS et BTP</strong> — nous fournissons, installons et entretenons
              vos équipements pour garantir la performance et la fiabilité de vos infrastructures.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center mb-10">
              <CTAButton to="/contact" variant="primary">
                Nous contacter
              </CTAButton>
              <CTAButton to="/services" variant="secondary">
                Voir nos services
              </CTAButton>
            </div>

            <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Expertise locale</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-primary" />
                <span>Qualité garantie</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-primary" />
                <span>Accompagnement professionnel</span>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden md:flex absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex-col items-center gap-1.5 text-muted-foreground/70">
          <span className="text-[10px] tracking-[0.2em] uppercase">Scroll</span>
          <ChevronDown className="h-4 w-4 animate-bounce" />
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,hsl(var(--primary-foreground)/0.12),transparent_60%)]" />
        <Container className="relative py-14 md:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {STATS.map((s, i) => {
              const Icon = s.icon;
              return (
                <Reveal key={s.label} delay={i * 0.08} className="text-center md:text-left">
                  <Icon className="h-6 w-6 mb-3 mx-auto md:mx-0 opacity-80" />
                  <div className="text-3xl md:text-4xl font-bold tracking-tight">
                    {s.value}
                  </div>
                  <div className="text-sm md:text-base opacity-80 mt-1">
                    {s.label}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* News Banner - Only show if there are posts */}
      {latestPosts.length > 0 && (
        <section className="py-16 bg-white border-y border-border">
          <Container>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Dernières actualités</h2>
                <p className="text-muted-foreground">Restez informé des dernières nouvelles de Qualicom</p>
              </div>
              <Link
                to="/actualites"
                className="inline-flex items-center text-primary hover:text-primary/80 font-medium transition-colors"
              >
                Voir toutes les actualités
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            <BlogCarousel posts={latestPosts.slice(0, 6)} />
          </Container>
        </section>
      )}

      {/* Services Section */}
      <section className="py-24 bg-secondary/40">
        <Container>
          <SectionHeader
            title="Nos services"
            subtitle="Trois domaines d'expertise pour accompagner tous vos projets"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {DOMAINS.map((domain, i) => {
              const Icon = domain.icon;
              return (
                <Reveal key={domain.id} delay={i * 0.08}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="h-full bg-card p-8 rounded-xl border border-border shadow-sm hover:shadow-lg hover:border-primary/30 transition-shadow"
                  >
                    <Icon className="h-8 w-8 text-primary mb-3" />
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {domain.label}
                    </h3>
                    <Link
                      to={`/services#${domain.id}`}
                      className="inline-flex items-center text-primary hover:text-primary/80 font-medium group"
                    >
                      En savoir plus
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </motion.div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-background">
        <Container>
          <SectionHeader
            tag="Notre méthode"
            title="Un processus simple et rigoureux"
            subtitle="De la première analyse à la maintenance continue, nous vous accompagnons à chaque étape."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 relative">
            {PROCESS_STEPS.map((p, i) => {
              const Icon = p.icon;
              return (
                <Reveal key={p.step} delay={i * 0.12}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="relative h-full bg-card rounded-2xl p-8 border border-border hover:border-primary/40 hover:shadow-lg transition-shadow"
                  >
                    <div className="absolute -top-3 -left-3 h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold glow-primary-soft">
                      {p.step}
                    </div>
                    <div className="h-12 w-12 rounded-xl bg-primary text-primary-foreground flex items-center justify-center mb-5">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {p.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {p.description}
                    </p>
                  </motion.div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-secondary/40">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-primary text-primary-foreground text-xs font-medium uppercase tracking-wider">
                Pourquoi QUALICOM
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-5">
                Un partenaire fiable pour vos projets
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Depuis plus de 12 ans, nous accompagnons les entreprises et institutions
                de la sous-région avec des solutions concrètes — de la fourniture d'équipements
                à la maintenance de vos infrastructures.
              </p>
              <ul className="space-y-5">
                {FEATURES.map((f, i) => {
                  const Icon = f.icon;
                  return (
                    <Reveal
                      key={f.title}
                      delay={0.1 + i * 0.08}
                      as="li"
                      className="flex gap-4"
                    >
                      <span className="flex-shrink-0 h-10 w-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div>
                        <h3 className="font-semibold text-foreground mb-0.5">
                          {f.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {f.description}
                        </p>
                      </div>
                    </Reveal>
                  );
                })}
              </ul>
            </Reveal>
            <Reveal delay={0.15} className="relative">
              <img
                src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e"
                alt="QUALICOM Features"
                className="rounded-xl shadow-xl relative z-10 glow-primary-soft"
                loading="lazy"
              />
              <div className="absolute inset-0 border-2 border-primary rounded-xl transform translate-x-4 translate-y-4" />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="relative bg-primary py-20 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary-foreground)/0.12),transparent_60%)]" />
        <Container className="relative text-center">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-5">
              Prêt à démarrer votre projet ?
            </h2>
            <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Contactez-nous dès aujourd'hui pour discuter de vos besoins et
              obtenir un devis personnalisé.
            </p>
            <CTAButton to="/contact" variant="outline" className="px-8 py-4 text-base md:text-lg">
              Demander un devis
            </CTAButton>
          </Reveal>
        </Container>
      </section>
    </div>
  );
};

export default Index;
