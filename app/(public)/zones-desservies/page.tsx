import type { Metadata } from "next";
import { MapPin, CheckCircle2 } from "lucide-react";
import { CTASection } from "@/components/marketing/cta-section";
import { OccitanieMap } from "@/components/marketing/occitanie-map";

export const metadata: Metadata = {
  title: "Zones desservies — ASO31 Toulouse et Haute-Garonne",
  description:
    "ASO31 intervient sur Toulouse et l'ensemble de l'agglomération toulousaine. Automatismes, alarmes, climatisation, portes automatiques.",
};

const ZONES_PRIMARY = [
  "Toulouse (tous secteurs)",
  "Blagnac",
  "Colomiers",
  "Tournefeuille",
  "Muret",
  "Balma",
  "Castanet-Tolosan",
  "Labège",
  "Saint-Orens-de-Gameville",
  "L'Union",
];

const ZONES_SECONDARY = [
  "Ramonville-Saint-Agne",
  "Portet-sur-Garonne",
  "Cugnaux",
  "Roques",
  "Pins-Justaret",
  "Pibrac",
  "Léguevin",
  "Cornebarrieu",
  "Beauzelle",
  "Fenouillet",
  "Aucamville",
  "Saint-Alban",
];

export default function ZonesDesserviesPage() {
  return (
    <div className="min-h-screen">
      {/* ── Hero with Occitanie map ──────────────────────────────────────── */}
      <div className="bg-steel-950 text-white py-16 overflow-hidden">
        <div className="container-page">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Text */}
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <MapPin className="w-5 h-5 text-brand-400" />
                <span className="text-steel-400 text-sm">Zone d&apos;intervention</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Toulouse et agglomération
              </h1>
              <p className="text-steel-300 max-w-xl leading-relaxed mb-6">
                Basés à Toulouse, nos équipes interviennent sur l&apos;ensemble de la
                Haute-Garonne avec une priorité sur l&apos;agglomération toulousaine. La
                proximité géographique réduit les délais et améliore la réactivité pour
                les situations urgentes.
              </p>

              {/* Department coverage badges */}
              <div className="flex flex-wrap gap-2">
                {[
                  { num: "31", label: "Haute-Garonne" },
                  { num: "32", label: "Gers" },
                  { num: "81", label: "Tarn" },
                  { num: "82", label: "Tarn-et-Garonne" },
                  { num: "09", label: "Ariège" },
                ].map((d) => (
                  <span
                    key={d.num}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-600/20 border border-brand-500/30 text-brand-300 text-xs font-medium"
                  >
                    <span className="font-bold">{d.num}</span>
                    {d.label}
                  </span>
                ))}
              </div>
            </div>

            {/* Map */}
            <div className="flex justify-center lg:justify-end">
              <OccitanieMap className="w-full max-w-sm lg:max-w-md opacity-90" />
            </div>
          </div>
        </div>
      </div>

      {/* ── Zone lists ──────────────────────────────────────────────────── */}
      <section className="section-py bg-white">
        <div className="container-page">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-steel-950 mb-2">Zone principale</h2>
              <p className="text-steel-500 mb-6 text-sm">
                Intervention possible le jour même pour les urgences selon disponibilité.
              </p>
              <div className="grid grid-cols-2 gap-2">
                {ZONES_PRIMARY.map((zone) => (
                  <div key={zone} className="flex items-center gap-2 text-sm text-steel-700">
                    <CheckCircle2 className="w-4 h-4 text-brand-500 shrink-0" />
                    {zone}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-steel-950 mb-2">Zone étendue</h2>
              <p className="text-steel-500 mb-6 text-sm">
                Interventions planifiées selon la nature de la demande et la disponibilité.
              </p>
              <div className="grid grid-cols-2 gap-2">
                {ZONES_SECONDARY.map((zone) => (
                  <div key={zone} className="flex items-center gap-2 text-sm text-steel-500">
                    <CheckCircle2 className="w-4 h-4 text-steel-300 shrink-0" />
                    {zone}
                  </div>
                ))}
              </div>
              <p className="text-sm text-steel-400 mt-4">
                Vous êtes en dehors de ces zones ? Contactez-nous — nous évaluerons la
                faisabilité selon votre besoin.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Vous êtes dans notre zone d'intervention ?"
        description="Décrivez votre besoin pour recevoir une réponse rapide de notre équipe."
        primaryLabel="Demander un dépannage"
        primaryHref="/depannage"
        secondaryLabel="Demander un devis"
        secondaryHref="/devis"
      />
    </div>
  );
}
