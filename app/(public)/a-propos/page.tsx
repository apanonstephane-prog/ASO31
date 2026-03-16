import type { Metadata } from "next";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { CTASection } from "@/components/marketing/cta-section";

export const metadata: Metadata = {
  title: "À propos — ASO, Alarme Sécurité Occitane depuis 1987",
  description:
    "ASO (Alarme Sécurité Occitane) est une entreprise fondée en 1987, spécialisée en alarmes, automatismes, portes automatiques et climatisation sur Toulouse et Occitanie (31, 32, 81, 82, 09).",
};

const HISTORIQUE = [
  {
    year: "1987",
    title: "Création de la société",
    text: "Fondation d'Alarme Sécurité Occitane (ASO) avec 3 salariés. L'entreprise fabrique ses propres systèmes d'alarme.",
  },
  {
    year: "1988",
    title: "Installateur d'alarmes",
    text: "ASO devient installateur et double ses effectifs pour assurer la pose et la mise en service des systèmes d'alarme.",
  },
  {
    year: "1989",
    title: "Extension aux automatismes",
    text: "L'activité s'élargit aux portes de garage, barrières et automatismes. L'équipe passe à 9 salariés.",
  },
  {
    year: "1991",
    title: "Portes piétonnes & tertiaire",
    text: "ASO intègre les portes piétonnes automatiques pour commerces, hôpitaux et maisons de retraite. 17 salariés.",
  },
  {
    year: "1998",
    title: "Agrandissement des locaux",
    text: "Suite à une forte croissance, ASO recrute et agrandit ses locaux pour accompagner la demande.",
  },
  {
    year: "2002",
    title: "Département Génie Climatique",
    text: "Création du département Génie Climatique Industriel. ASO compte désormais 35 salariés et un parc de 35 véhicules.",
  },
];

const VALEURS = [
  "Chaque demande est qualifiée avant d'être planifiée — pas d'intervention à l'aveugle",
  "Chaque technicien est spécialisé dans son métier — pas de généraliste sur tout",
  "Chaque intervention est documentée et accessible depuis votre espace client",
  "Chaque contrat d'entretien est suivi et respecté dans les délais définis",
  "L'IA est un outil d'aide, pas un substitut au jugement humain",
];

export default function AProposPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative bg-steel-950 text-white py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1600&q=85&auto=format&fit=crop"
            alt="Atelier technique industriel"
            fill
            priority
            quality={85}
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-steel-950/95 via-steel-950/80 to-steel-950/60" />
        </div>
        <div className="container-page max-w-3xl relative">
          <p className="text-brand-400 text-sm font-semibold uppercase tracking-wide mb-3">
            Fondée en 1987 · Toulouse, Occitanie
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            ASO — Alarme Sécurité Occitane
          </h1>
          <p className="text-steel-300 text-lg leading-relaxed">
            Depuis 1987, les équipes ASO installent, maintiennent et dépannent
            les équipements techniques du bâtiment sur Toulouse et les départements 31, 32, 81, 82 et 09.
          </p>
        </div>
      </div>

      {/* Historique */}
      <section className="section-py bg-white">
        <div className="container-page">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div>
              <p className="text-sm font-semibold text-brand-600 uppercase tracking-wide mb-2">Notre histoire</p>
              <h2 className="text-2xl font-bold text-steel-950 mb-8">38 ans d'expertise terrain</h2>

              <div className="space-y-6">
                {HISTORIQUE.map((item) => (
                  <div key={item.year} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <span className="inline-block w-12 h-12 rounded-xl bg-brand-100 text-brand-700 font-bold text-sm flex items-center justify-center leading-tight text-center">
                        {item.year}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-steel-900 text-sm mb-1">{item.title}</p>
                      <p className="text-sm text-steel-500 leading-relaxed">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Photos + infos */}
            <div className="space-y-4">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-elevated">
                <Image
                  src="https://images.unsplash.com/photo-1581092334651-ddf19d89e28f?w=900&q=85&auto=format&fit=crop"
                  alt="Technicien ASO en intervention"
                  fill
                  quality={85}
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative rounded-xl overflow-hidden aspect-square shadow-card">
                  <Image
                    src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&q=80&auto=format&fit=crop"
                    alt="Intervention sur tableau électrique"
                    fill
                    quality={80}
                    className="object-cover"
                    sizes="25vw"
                  />
                </div>
                <div className="relative rounded-xl overflow-hidden aspect-square shadow-card">
                  <Image
                    src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80&auto=format&fit=crop"
                    alt="Portail automatique installé"
                    fill
                    quality={80}
                    className="object-cover"
                    sizes="25vw"
                  />
                </div>
              </div>
              {/* Coordonnées */}
              <div className="bg-surface-subtle border border-border rounded-xl p-4 space-y-1.5">
                <p className="text-xs font-semibold text-steel-500 uppercase tracking-wide mb-2">Siège social</p>
                <p className="font-semibold text-steel-900">7 rue Alfred Sauvy — 31270 Cugnaux</p>
                <p className="text-steel-600 text-sm">05 61 07 66 07 · info@aso31.fr</p>
                <p className="text-steel-500 text-xs">Lun–Jeu 8h–13h / 14h–18h &nbsp;·&nbsp; Ven 8h–13h / 14h–17h</p>
                <p className="text-steel-500 text-xs">SIRET : 341 702 397 00025</p>
              </div>

              {/* Ce que nous faisons différemment */}
              <div className="pt-4">
                <h2 className="text-lg font-bold text-steel-950 mb-3">Ce que nous faisons différemment</h2>
                <ul className="space-y-2.5">
                  {VALEURS.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-steel-600 text-sm leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-brand-500 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="section-py bg-surface-subtle border-t border-border">
        <div className="container-page">
          <p className="text-sm font-semibold text-brand-600 uppercase tracking-wide mb-2">Agréments & certifications</p>
          <h2 className="text-2xl font-bold text-steel-950 mb-8">Des qualifications qui engagent</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                label: "Qualibat 3511",
                detail: "Fermetures et menuiseries extérieures — Mention Efficacité Énergétique",
              },
              {
                label: "Qualibat 5422",
                detail: "Climatiseurs autonomes — qualification technique reconnue",
              },
              {
                label: "Qualibat 5361",
                detail: "Rénovation d'installations de chauffage",
              },
              {
                label: "Installateur Expert Confort Daikin",
                detail: "Sélectionné par Daikin pour le savoir-faire et la fiabilité",
              },
              {
                label: "Membre Premium CAME",
                detail: "Accès aux dernières nouveautés automatismes et tarifs exclusifs",
              },
              {
                label: "Partenaire Bleu Ciel EDF",
                detail: "Membre Synerciel — contrôles qualité EDF sur les installations",
              },
              {
                label: "Marquage CE — Portails",
                detail: "Depuis 2005, essais validés par le C.S.T.B. — auto-certification fermetures automatiques",
              },
              {
                label: "Autorisation préfectorale fluides frigorigènes",
                detail: "Obligatoire depuis 1993 pour la manipulation des équipements frigorifiques",
              },
            ].map((cert) => (
              <div key={cert.label} className="bg-white border border-border rounded-xl p-4">
                <p className="font-semibold text-steel-900 text-sm mb-1">{cert.label}</p>
                <p className="text-xs text-steel-500 leading-relaxed">{cert.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
