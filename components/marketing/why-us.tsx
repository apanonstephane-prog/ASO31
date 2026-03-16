import { Clock, Users, CheckCircle, MapPin, Zap, Shield } from "lucide-react";

const STRENGTHS = [
  {
    icon: Zap,
    title: "Qualification en moins d'une heure",
    description:
      "Chaque demande est analysée par notre système assisté par IA, puis vérifiée par un opérateur. Vous savez en combien de temps un technicien peut intervenir.",
  },
  {
    icon: Users,
    title: "Techniciens spécialisés par métier",
    description:
      "Un expert en automatisme n'interviendra pas sur votre climatisation. Résultat : moins d'allers-retours, plus de réussite au premier passage.",
  },
  {
    icon: CheckCircle,
    title: "Transparence totale sur votre dossier",
    description:
      "Votre espace client montre l'état de votre demande en temps réel : qualification, planification, statut technicien, compte rendu.",
  },
  {
    icon: MapPin,
    title: "Présence régionale — 5 départements",
    description:
      "Nos équipes interviennent sur Toulouse et les départements 31, 32, 81, 82 et 09. 35 véhicules pour réduire les délais.",
  },
  {
    icon: Clock,
    title: "Maintenance préventive planifiée",
    description:
      "Un contrat d'entretien permet de détecter les signes faibles avant qu'ils deviennent des pannes. Moins d'urgences subies.",
  },
  {
    icon: Shield,
    title: "Certifications & agréments reconnus",
    description:
      "Qualibat 3511, 5422, 5361 — Installateur Expert Daikin — Membre Premium CAME — Partenaire EDF — CSTB — Autorisation fluides frigorigènes.",
  },
];

const METRICS = [
  { value: "1987", label: "fondée en", sub: "38 ans d'expertise" },
  { value: "35+", label: "véhicules", sub: "terrain Occitanie" },
  { value: "5 dép.", label: "couverts", sub: "31 · 32 · 81 · 82 · 09" },
  { value: "< 1h", label: "qualification", sub: "délai moyen" },
];

export function WhyUs() {
  return (
    <section className="section-py bg-surface-subtle border-y border-border">
      <div className="container-page">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          {/* Left — texte + grille arguments */}
          <div className="lg:col-span-3">
            <p className="text-sm font-semibold text-brand-600 uppercase tracking-wide mb-2">
              Pourquoi choisir ASO31
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-steel-950 mb-4">
              Ce qui change réellement
            </h2>
            <p className="text-lg text-steel-500 max-w-xl mb-10">
              Fondée en 1987, ASO intervient sur Toulouse et les départements 31,
              32, 81, 82 et 09. Des techniciens spécialisés, un suivi clair, des
              engagements tenus.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {STRENGTHS.map((item) => (
                <div key={item.title} className="flex gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-brand-100 flex items-center justify-center shrink-0 mt-0.5">
                    <item.icon className="w-4 h-4 text-brand-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-steel-900 mb-1 text-sm">
                      {item.title}
                    </h3>
                    <p className="text-xs text-steel-500 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — mock ticket timeline + métriques */}
          <div className="lg:col-span-2 lg:sticky lg:top-24 space-y-4">
            {/* Mock espace client */}
            <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-card">
              {/* Header */}
              <div className="bg-steel-950 px-4 py-2.5 flex items-center justify-between">
                <span className="text-xs text-steel-400 font-medium">
                  Suivi en temps réel — Ticket #2024-1847
                </span>
                <span className="flex items-center gap-1.5 text-xs text-green-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  En cours
                </span>
              </div>

              <div className="p-4 space-y-3">
                {/* Ticket info */}
                <div className="flex items-center justify-between text-xs">
                  <span className="text-steel-500">Porte automatique coulissante</span>
                  <span className="bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full font-medium">
                    Urgente
                  </span>
                </div>

                {/* Timeline */}
                <div className="space-y-2.5">
                  {[
                    {
                      time: "09:15",
                      label: "Demande reçue",
                      done: true,
                    },
                    {
                      time: "09:23",
                      label: "Qualification IA — Portes Auto, Urgence : Haute",
                      done: true,
                    },
                    {
                      time: "09:31",
                      label: "Validé par opérateur (M. Dupont)",
                      done: true,
                    },
                    {
                      time: "10:45",
                      label: "Technicien affecté — Sébastien R.",
                      done: true,
                    },
                    {
                      time: "12:15",
                      label: "Intervention en cours — sur site",
                      done: false,
                      active: true,
                    },
                  ].map((item) => (
                    <div key={item.time} className="flex items-start gap-2.5">
                      <div className="flex flex-col items-center shrink-0 mt-0.5">
                        <div
                          className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                            item.active
                              ? "bg-brand-600 animate-pulse"
                              : item.done
                                ? "bg-green-500"
                                : "bg-steel-200"
                          }`}
                        >
                          {item.done && !item.active && (
                            <svg
                              className="w-2.5 h-2.5 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={3}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-xs text-steel-400 font-mono mr-2">
                          {item.time}
                        </span>
                        <span
                          className={`text-xs ${
                            item.active
                              ? "text-steel-900 font-medium"
                              : "text-steel-600"
                          }`}
                        >
                          {item.label}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Next step */}
                <div className="pt-2 border-t border-border">
                  <p className="text-xs text-steel-400">
                    Compte rendu attendu avant 16h00
                  </p>
                </div>
              </div>
            </div>

            {/* Métriques */}
            <div className="grid grid-cols-2 gap-2">
              {METRICS.map((m) => (
                <div
                  key={m.label}
                  className="bg-white border border-border rounded-xl p-3 text-center"
                >
                  <p className="font-bold text-steel-900 text-xl leading-tight">
                    {m.value}
                  </p>
                  <p className="text-xs text-steel-600 mt-0.5 font-medium">
                    {m.label}
                  </p>
                  <p className="text-xs text-steel-400 mt-0.5">{m.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
