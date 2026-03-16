import type { Metadata } from "next";
import { ServicesGrid } from "@/components/marketing/services-grid";
import { CTASection } from "@/components/marketing/cta-section";

export const metadata: Metadata = {
  title: "Nos Services — Automatismes, Sécurité, Climatisation | ASO31",
  description:
    "Découvrez l'ensemble des services ASO31 : alarmes, automatismes, portes automatiques, climatisation et maintenance. Toulouse et Haute-Garonne.",
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-steel-950 text-white py-16">
        <div className="container-page">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Nos services</h1>
          <p className="text-steel-300 max-w-2xl">
            Cinq domaines d&apos;expertise, une équipe de techniciens spécialisés, un seul interlocuteur.
            Choisissez le service concerné pour découvrir notre approche.
          </p>
        </div>
      </div>
      <ServicesGrid />
      <CTASection />
    </div>
  );
}
