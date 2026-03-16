import type { Metadata } from "next";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { CTASection } from "@/components/marketing/cta-section";

export const metadata: Metadata = {
  title: "À propos — ASO31, expertise technique en Haute-Garonne",
  description:
    "ASO31 est une entreprise de Cugnaux spécialisée en automatismes, sécurité, portes automatiques et climatisation. Techniciens locaux, réactivité terrain.",
};

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
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Une entreprise technique ancrée dans le territoire
          </h1>
          <p className="text-steel-300 text-lg leading-relaxed">
            Présents sur Toulouse et la Haute-Garonne, basés à Cugnaux, nous avons
            construit notre réputation sur une seule base : faire ce que l&apos;on dit, et le faire bien.
          </p>
        </div>
      </div>

      {/* Histoire + photo */}
      <section className="section-py bg-white">
        <div className="container-page">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div>
              <h2 className="text-2xl font-bold text-steel-950 mb-4">Notre histoire</h2>
              <p className="text-steel-600 leading-relaxed mb-4">
                ASO31 a été fondée à Toulouse pour répondre aux besoins croissants des particuliers
                et des entreprises en matière d&apos;automatismes et de systèmes de sécurité. Nous avons
                élargi notre champ d&apos;intervention à l&apos;ensemble des équipements techniques du bâtiment :
                portes automatiques, climatisation, maintenance multi-équipements.
              </p>
              <p className="text-steel-600 leading-relaxed mb-8">
                Notre positionnement n&apos;a pas changé : être une entreprise locale, réactive et fiable.
                Pas une franchise, pas un centre d&apos;appels à l&apos;autre bout de la France — des techniciens
                basés à Cugnaux, qui connaissent le territoire et ses contraintes.
              </p>

              <h2 className="text-2xl font-bold text-steel-950 mb-4">Ce que nous faisons différemment</h2>
              <ul className="space-y-3">
                {VALEURS.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-steel-600 text-sm leading-relaxed">
                    <CheckCircle2 className="w-5 h-5 text-brand-500 mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Photos */}
            <div className="space-y-4">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-elevated">
                <Image
                  src="https://images.unsplash.com/photo-1581092334651-ddf19d89e28f?w=900&q=85&auto=format&fit=crop"
                  alt="Technicien ASO31 en intervention sur équipement"
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
              {/* Adresse */}
              <div className="bg-surface-subtle border border-border rounded-xl p-4">
                <p className="text-xs font-semibold text-steel-500 uppercase tracking-wide mb-1">Siège social</p>
                <p className="font-semibold text-steel-900">7 rue Alfred Sauvy</p>
                <p className="text-steel-600 text-sm">31270 Cugnaux — Haute-Garonne</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
