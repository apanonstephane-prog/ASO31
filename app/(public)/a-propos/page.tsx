import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { CTASection } from "@/components/marketing/cta-section";

export const metadata: Metadata = {
  title: "À propos — ASO31, expertise technique depuis 1998",
  description:
    "ASO31 est une entreprise toulousaine spécialisée en automatismes, sécurité, portes automatiques et climatisation depuis plus de 25 ans.",
};

export default function AProposPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-steel-950 text-white py-16">
        <div className="container-page max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Une entreprise technique ancrée dans le territoire
          </h1>
          <p className="text-steel-300 text-lg leading-relaxed">
            Présents sur Toulouse et la Haute-Garonne depuis plus de vingt-cinq ans, nous avons
            construit notre réputation sur une seule base : faire ce que l&apos;on dit, et le faire bien.
          </p>
        </div>
      </div>

      <section className="section-py bg-white">
        <div className="container-page max-w-3xl">
          <div className="prose prose-steel max-w-none">
            <h2 className="text-2xl font-bold text-steel-950 mb-4">Notre histoire</h2>
            <p className="text-steel-600 leading-relaxed mb-4">
              ASO31 a été fondée à Toulouse pour répondre aux besoins croissants des particuliers
              et des entreprises en matière d&apos;automatismes et de systèmes de sécurité. En vingt-cinq
              ans, nous avons élargi notre champ d&apos;intervention à l&apos;ensemble des équipements techniques
              du bâtiment : portes automatiques, climatisation, maintenance multi-équipements.
            </p>
            <p className="text-steel-600 leading-relaxed mb-8">
              Notre positionnement n&apos;a pas changé : être une entreprise locale, réactive et fiable.
              Pas une franchise, pas un centre d&apos;appels à l&apos;autre bout de la France — des techniciens
              basés à Toulouse, qui connaissent le territoire et ses contraintes.
            </p>

            <h2 className="text-2xl font-bold text-steel-950 mb-4">Ce que nous faisons différemment</h2>
            <ul className="space-y-3 mb-8">
              {[
                "Chaque demande est qualifiée avant d'être planifiée — pas d'intervention à l'aveugle",
                "Chaque technicien est spécialisé dans son métier — pas de généraliste sur tout",
                "Chaque intervention est documentée et accessible depuis votre espace client",
                "Chaque contrat d'entretien est suivi et respecté dans les délais définis",
                "L'IA est un outil d'aide, pas un substitut au jugement humain",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-steel-600">
                  <CheckCircle2 className="w-5 h-5 text-brand-500 mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
