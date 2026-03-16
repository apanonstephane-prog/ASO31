"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  Settings2,
  Wind,
  Shield,
  Zap,
} from "lucide-react";
import { PAGES } from "@/lib/constants";

interface DemoScenario {
  id: string;
  label: string;
  sector: string;
  input: string;
  chips: string[];
  result: {
    service: string;
    ServiceIcon: React.ElementType;
    serviceColor: string;
    urgence: string;
    urgenceColor: string;
    hypothesePrincipale: string;
    hypothesesSecondaires: string[];
    piecesIdentifiees: string[];
    confiance: number;
    nextAction: string;
  };
}

const DEMO_SCENARIOS: DemoScenario[] = [
  {
    id: "portail",
    label: "Portail bloqué",
    sector: "Logistique · Portet",
    input:
      "Mon portail coulissant s'ouvre mais ne se ferme plus depuis ce matin.",
    chips: ["Mouvement partiel"],
    result: {
      service: "Automatismes",
      ServiceIcon: Settings2,
      serviceColor: "bg-steel-100 text-steel-700",
      urgence: "Modérée",
      urgenceColor: "bg-amber-50 text-amber-700 border-amber-200",
      hypothesePrincipale: "Fin de course retour hors réglage",
      hypothesesSecondaires: [
        "Défaut alimentation moteur",
        "Obstacle détecté en zone retour",
      ],
      piecesIdentifiees: ["Kit fin de course CAME", "Crémaillère (contrôle)"],
      confiance: 84,
      nextAction: "Technicien automatisme disponible J+1",
    },
  },
  {
    id: "clim",
    label: "Clim sans effet",
    sector: "Pharmacie · Toulouse",
    input: "La climatisation souffle de l'air tiède. Elle tourne mais ne refroidit plus.",
    chips: ["Panne intermittente"],
    result: {
      service: "Climatisation",
      ServiceIcon: Wind,
      serviceColor: "bg-sky-50 text-sky-700",
      urgence: "Normale",
      urgenceColor: "bg-steel-100 text-steel-600 border-steel-200",
      hypothesePrincipale: "Fuite frigorigène probable",
      hypothesesSecondaires: [
        "Filtre encrassé ou obstrué",
        "Défaut sonde température",
      ],
      piecesIdentifiees: ["Fluide R32 ou R410A (diagnostic requis)", "Filtre"],
      confiance: 79,
      nextAction: "Technicien certifié fluides frigorigènes requis",
    },
  },
  {
    id: "alarme",
    label: "Alarme intempestive",
    sector: "Syndic · Toulouse Sud",
    input:
      "Notre alarme se déclenche seule la nuit sans raison apparente. Troisième fois cette semaine.",
    chips: ["Panne intermittente", "Bruit anormal"],
    result: {
      service: "Alarme & Sécurité",
      ServiceIcon: Shield,
      serviceColor: "bg-brand-50 text-brand-700",
      urgence: "Urgente",
      urgenceColor: "bg-red-50 text-red-700 border-red-200",
      hypothesePrincipale: "Batterie de secours faible — seuil critique",
      hypothesesSecondaires: [
        "Capteur IR sensible (animaux, luminosité)",
        "Défaut communication centrale",
      ],
      piecesIdentifiees: ["Batterie 12V centrale", "Capteur IR (contrôle)"],
      confiance: 88,
      nextAction: "Intervention prioritaire — journal d'événements à extraire",
    },
  },
];

export function AITeaser() {
  const [activeScenario, setActiveScenario] = useState(0);
  const scenario = DEMO_SCENARIOS[activeScenario];

  return (
    <section className="section-py bg-white">
      <div className="container-page">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: pitch */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 border border-brand-100 text-brand-700 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Assistant IA métier
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-steel-950 mb-4">
              Décrivez votre panne.
              <br />
              On prépare l&apos;intervention.
            </h2>
            <p className="text-lg text-steel-500 leading-relaxed mb-6">
              Notre assistant analyse vos symptômes, identifie les causes
              probables et structure un ticket complet pour nos techniciens.
              Moins d&apos;allers-retours, plus de réussite au premier passage.
            </p>

            <ul className="space-y-3 mb-8">
              {[
                "Questions adaptées à chaque type d'équipement",
                "Urgence détectée, service concerné identifié",
                "Hypothèses de panne avec niveau de confiance affiché",
                "Ticket structuré transmis directement à l'équipe",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm text-steel-600"
                >
                  <CheckCircle2 className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>

            <Link
              href={PAGES.public.assistant}
              className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold px-5 py-3 rounded-xl transition-colors text-sm"
            >
              Essayer l&apos;assistant
              <ArrowRight className="w-4 h-4" />
            </Link>

            <p className="text-xs text-steel-400 mt-3">
              Gratuit · Sans inscription · Résultat en quelques secondes
            </p>
          </div>

          {/* Right: diagnostic console */}
          <div>
            {/* Scenario selector */}
            <div className="flex gap-2 mb-4">
              {DEMO_SCENARIOS.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => setActiveScenario(i)}
                  className={`flex-1 text-xs font-medium py-2 px-3 rounded-lg border transition-all ${
                    i === activeScenario
                      ? "bg-steel-950 text-white border-steel-950"
                      : "bg-white text-steel-600 border-steel-200 hover:border-steel-400"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>

            {/* Console card */}
            <div className="bg-white border border-steel-200 rounded-2xl overflow-hidden shadow-card">
              {/* Console header */}
              <div className="bg-steel-950 px-4 py-2.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-brand-400" />
                  <span className="text-xs text-steel-400 font-medium">
                    Diagnostic ASO31
                  </span>
                </div>
                <span className="text-xs text-steel-500 italic">
                  {scenario.sector}
                </span>
              </div>

              <div className="p-5 space-y-4">
                {/* Input */}
                <div>
                  <p className="text-xs text-steel-400 mb-2 font-medium">
                    Situation décrite
                  </p>
                  <div className="bg-brand-600 text-white text-sm px-4 py-3 rounded-xl rounded-tr-sm leading-relaxed">
                    {scenario.input}
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {scenario.chips.map((chip) => (
                      <span
                        key={chip}
                        className="text-xs bg-brand-50 border border-brand-200 text-brand-700 px-2.5 py-1 rounded-full"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Result */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeScenario}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-3"
                  >
                    {/* Service + urgence */}
                    <div className="flex items-center justify-between p-3 bg-steel-50 rounded-xl border border-steel-100">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`p-1.5 rounded-lg ${scenario.result.serviceColor}`}
                        >
                          <scenario.result.ServiceIcon className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs text-steel-400">
                            Service identifié
                          </p>
                          <p className="text-sm font-semibold text-steel-900">
                            {scenario.result.service}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`text-xs font-medium px-2.5 py-1 rounded-full border ${scenario.result.urgenceColor}`}
                      >
                        {scenario.result.urgence}
                      </span>
                    </div>

                    {/* Hypothèse */}
                    <div className="p-3 bg-white rounded-xl border border-steel-100">
                      <p className="text-xs text-steel-400 mb-1">
                        Hypothèse principale
                      </p>
                      <p className="text-sm font-medium text-steel-800">
                        {scenario.result.hypothesePrincipale}
                      </p>
                      <div className="mt-2 space-y-1">
                        {scenario.result.hypothesesSecondaires.map((h) => (
                          <div
                            key={h}
                            className="flex items-center gap-1.5 text-xs text-steel-500"
                          >
                            <ChevronRight className="w-3 h-3 shrink-0" />
                            {h}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Pièces + confiance */}
                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-3 bg-steel-50 rounded-xl border border-steel-100">
                        <p className="text-xs text-steel-400 mb-1.5">
                          Pièces possibles
                        </p>
                        {scenario.result.piecesIdentifiees.map((p) => (
                          <p
                            key={p}
                            className="text-xs text-steel-700 leading-relaxed"
                          >
                            · {p}
                          </p>
                        ))}
                      </div>
                      <div className="p-3 bg-steel-50 rounded-xl border border-steel-100 flex flex-col justify-between">
                        <p className="text-xs text-steel-400">Confiance IA</p>
                        <p className="text-2xl font-bold text-steel-900">
                          {scenario.result.confiance}%
                        </p>
                      </div>
                    </div>

                    {/* Validation + next action */}
                    <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-100 rounded-xl">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-medium text-amber-800">
                          Validation technicien requise
                        </p>
                        <p className="text-xs text-amber-700 mt-0.5">
                          {scenario.result.nextAction}
                        </p>
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="flex gap-2 pt-1">
                      <Link
                        href={PAGES.public.depannage}
                        className="flex-1 flex items-center justify-center gap-1.5 bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold py-2.5 rounded-xl transition-colors"
                      >
                        <Zap className="w-3.5 h-3.5" />
                        Créer le ticket
                      </Link>
                      <Link
                        href={PAGES.public.assistant}
                        className="flex-1 flex items-center justify-center gap-1.5 border border-steel-200 text-steel-700 hover:bg-steel-50 text-xs font-medium py-2.5 rounded-xl transition-colors"
                      >
                        Décrire ma panne
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
