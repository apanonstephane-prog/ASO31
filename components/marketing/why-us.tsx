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
        <div className="mb-12">
          <p className="text-sm font-semibold text-brand-600 uppercase tracking-wide mb-2">
            Pourquoi choisir ASO31
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-steel-950 mb-4">
            Ce qui change réellement
          </h2>
          <p className="text-lg text-steel-500 max-w-2xl">
            Pas de promesses vides. Voici concrètement ce que vous pouvez attendre d'une entreprise
            organisée pour être utile — pas seulement joignable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {STRENGTHS.map((item) => (
            <div key={item.title} className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-brand-100 flex items-center justify-center shrink-0 mt-0.5">
                <item.icon className="w-5 h-5 text-brand-700" />
              </div>
              <div>
                <h3 className="font-semibold text-steel-900 mb-1.5">{item.title}</h3>
                <p className="text-sm text-steel-500 leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
