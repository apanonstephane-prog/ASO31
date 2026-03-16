import type { Metadata } from "next";
import { Hero } from "@/components/marketing/hero";
import { ServicesGrid } from "@/components/marketing/services-grid";
import { WhyUs } from "@/components/marketing/why-us";
import { ProcessSection } from "@/components/marketing/process-section";
import { AITeaser } from "@/components/marketing/ai-teaser";
import { Testimonials } from "@/components/marketing/testimonials";
import { CTASection } from "@/components/marketing/cta-section";

export const metadata: Metadata = {
  title: "ASO31 — Automatisme, Sécurité & Maintenance Toulouse",
  description:
    "Spécialiste en automatismes, alarmes, portes automatiques, climatisation et maintenance technique. Dépannage rapide, devis gratuit, contrats d'entretien sur Toulouse et Haute-Garonne.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesGrid />
      <WhyUs />
      <ProcessSection />
      <AITeaser />
      <Testimonials />
      <CTASection />
    </>
  );
}
