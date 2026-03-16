import Image from "next/image";
import { Clock, Users, CheckCircle, MapPin, Zap, Shield } from "lucide-react";

const STRENGTHS = [
  {
    icon: Zap,
    title: "Qualification en moins d'une heure",
    description:
      "Chaque demande est analysée par notre système de qualification assisté par IA, puis vérifiée par un opérateur. Vous savez en combien de temps un technicien peut intervenir.",
  },
  {
    icon: Users,
    title: "Techniciens spécialisés par métier",
    description:
      "Un expert en automatisme n'interviendra pas sur votre climatisation. Chaque technicien maîtrise son domaine. Résultat : moins d'allers-retours, plus de réussite au premier passage.",
  },
  {
    icon: CheckCircle,
    title: "Transparence totale sur votre dossier",
    description:
      "Votre espace client vous montre l'état de votre demande en temps réel : qualification, planification, statut technicien, compte rendu. Zéro appel pour savoir où en est votre ticket.",
  },
  {
    icon: MapPin,
    title: "Présence locale en Haute-Garonne",
    description:
      "Nos équipes interviennent sur Toulouse et l'ensemble de l'agglomération. La connaissance du terrain réduit les temps de déplacement et améliore la réactivité.",
  },
  {
    icon: Clock,
    title: "Maintenance préventive planifiée",
    description:
      "Un contrat d'entretien annuel permet de détecter les signes faibles avant qu'ils ne deviennent des pannes. Moins d'urgences, plus de disponibilité pour les vraies urgences.",
  },
  {
    icon: Shield,
    title: "Toutes marques, tous équipements",
    description:
      "Portails Somfy, Nice, Came, FAAC — alarmes Ajax, Texecom, DSC — climatiseurs Daikin, Mitsubishi, Atlantic. Pas de barrière de marque pour intervenir ou entretenir.",
  },
];

export function WhyUs() {
  return (
    <section className="section-py bg-surface-subtle border-y border-border">
      <div className="container-page">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          {/* Left — texte + grille */}
          <div className="lg:col-span-3">
            <p className="text-sm font-semibold text-brand-600 uppercase tracking-wide mb-2">
              Pourquoi choisir ASO31
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-steel-950 mb-4">
              Ce qui change réellement
            </h2>
            <p className="text-lg text-steel-500 max-w-xl mb-10">
              Pas de promesses vides. Voici concrètement ce que vous pouvez attendre d'une entreprise
              organisée pour être utile — pas seulement joignable.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {STRENGTHS.map((item) => (
                <div key={item.title} className="flex gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-brand-100 flex items-center justify-center shrink-0 mt-0.5">
                    <item.icon className="w-4 h-4 text-brand-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-steel-900 mb-1 text-sm">{item.title}</h3>
                    <p className="text-xs text-steel-500 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — photo technicien terrain */}
          <div className="lg:col-span-2 lg:sticky lg:top-24">
            <div className="relative rounded-2xl overflow-hidden shadow-elevated aspect-[3/4]">
              <Image
                src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=900&q=85&auto=format&fit=crop"
                alt="Technicien ASO31 en intervention sur équipement industriel"
                fill
                quality={85}
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              {/* Caption overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-steel-950/90 to-transparent p-5">
                <p className="text-white font-semibold text-sm">Intervention terrain</p>
                <p className="text-steel-300 text-xs mt-0.5">Toulouse & Haute-Garonne</p>
              </div>
            </div>
            {/* Stats sous la photo */}
            <div className="grid grid-cols-3 gap-3 mt-3">
              {[
                { value: "8 ans", label: "d'expertise" },
                { value: "500+", label: "clients actifs" },
                { value: "98%", label: "satisfaction" },
              ].map((s) => (
                <div key={s.label} className="bg-white border border-border rounded-xl p-3 text-center">
                  <p className="font-bold text-steel-900 text-lg leading-tight">{s.value}</p>
                  <p className="text-xs text-steel-400 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
