import type { Metadata } from "next";
import Link from "next/link";
import { User, Building2, Home, Landmark, ArrowRight } from "lucide-react";
import { CTASection } from "@/components/marketing/cta-section";

export const metadata: Metadata = {
  title: "Secteurs — Particuliers, Entreprises, Syndics | ASO31",
  description: "ASO31 intervient pour les particuliers, entreprises, syndics et collectivités sur Toulouse.",
};

const SECTORS = [
  {
    icon: Home,
    label: "Particuliers",
    description: "Portail, interphone, alarme, climatisation. Des solutions adaptées à votre logement et à votre budget.",
    href: "/secteurs/particuliers",
    count: "Maisons & appartements",
  },
  {
    icon: Building2,
    label: "Entreprises & Commerces",
    description: "Contrôle d'accès, automatismes, sécurité, climatisation tertiaire. Continuité d'activité garantie.",
    href: "/secteurs/entreprises",
    count: "Commerce & tertiaire",
  },
  {
    icon: Building2,
    label: "Syndics & Copropriétés",
    description: "Portails collectifs, interphonie, barrières de parking, entretien pluriannuel multi-sites.",
    href: "/secteurs/syndics",
    count: "Résidences collectives",
  },
  {
    icon: Landmark,
    label: "Collectivités",
    description: "Établissements publics, écoles, mairies. Conformité réglementaire et traçabilité documentaire.",
    href: "/secteurs/collectivites",
    count: "Établissements publics",
  },
];

export default function SecteursPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-steel-950 text-white py-16">
        <div className="container-page">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Nos secteurs d&apos;activité</h1>
          <p className="text-steel-300 max-w-2xl">
            Nous adaptons notre approche à chaque type de client et de contexte d&apos;intervention.
          </p>
        </div>
      </div>

      <section className="section-py bg-white">
        <div className="container-page">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SECTORS.map((sector) => (
              <Link
                key={sector.href}
                href={sector.href}
                className="group flex flex-col gap-4 p-6 bg-white border border-border rounded-2xl hover:shadow-card hover:border-brand-200 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center">
                    <sector.icon className="w-5 h-5 text-brand-600" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-steel-900">{sector.label}</h2>
                    <p className="text-xs text-steel-400">{sector.count}</p>
                  </div>
                </div>
                <p className="text-steel-500 text-sm leading-relaxed">{sector.description}</p>
                <div className="flex items-center gap-1.5 text-sm font-medium text-brand-600 group-hover:gap-2.5 transition-all">
                  En savoir plus <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
