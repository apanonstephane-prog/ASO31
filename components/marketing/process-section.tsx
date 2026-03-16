"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  Cpu,
  CheckSquare,
  UserCheck,
  CalendarDays,
  Hammer,
  FileCheck,
  Clock,
  ArrowRight,
} from "lucide-react";

const WORKFLOW_STEPS = [
  {
    id: 1,
    icon: MessageSquare,
    label: "Demande reçue",
    code: "01",
    description:
      "Vous décrivez votre situation via l'assistant IA, le formulaire ou par téléphone.",
    detail:
      "La demande est horodatée, géolocalisée et associée à votre profil client automatiquement.",
    duration: "< 2 min",
    actor: "Client",
    actorColor: "bg-brand-100 text-brand-700",
  },
  {
    id: 2,
    icon: Cpu,
    label: "Qualification IA",
    code: "02",
    description:
      "Le système analyse la demande, détecte le service concerné et structure un ticket.",
    detail:
      "Niveau de confiance calculé. Hypothèses de panne formulées. Pièces potentiellement concernées identifiées.",
    duration: "< 5 min",
    actor: "Système IA",
    actorColor: "bg-sky-100 text-sky-700",
  },
  {
    id: 3,
    icon: CheckSquare,
    label: "Validation opérateur",
    code: "03",
    description:
      "Un opérateur valide le ticket, enrichit l'analyse et confirme la priorité.",
    detail:
      "Contexte client ajouté, historique équipement consulté, prise de contact si nécessaire.",
    duration: "< 1h",
    actor: "Opérateur",
    actorColor: "bg-steel-100 text-steel-700",
  },
  {
    id: 4,
    icon: UserCheck,
    label: "Affectation technicien",
    code: "04",
    description:
      "Le bon technicien est identifié selon sa spécialité, sa zone et sa disponibilité.",
    detail:
      "Match sur 3 critères : métier, secteur géographique, charge planning.",
    duration: "Immédiat",
    actor: "Système",
    actorColor: "bg-steel-100 text-steel-700",
  },
  {
    id: 5,
    icon: CalendarDays,
    label: "Planification",
    code: "05",
    description:
      "Un créneau est proposé et confirmé. Vous recevez la notification par SMS ou e-mail.",
    detail:
      "Créneau adapté à l'urgence. Rappel automatique J-1. Accès au statut en temps réel.",
    duration: "< 4h",
    actor: "Planificateur",
    actorColor: "bg-steel-100 text-steel-700",
  },
  {
    id: 6,
    icon: Hammer,
    label: "Intervention",
    code: "06",
    description:
      "Le technicien intervient sur site et met à jour le ticket en temps réel depuis son mobile.",
    detail:
      "Photos, notes, pièces utilisées, durée. Suivi en direct si commande de pièce requise.",
    duration: "Variable",
    actor: "Technicien",
    actorColor: "bg-green-100 text-green-700",
  },
  {
    id: 7,
    icon: FileCheck,
    label: "Clôture",
    code: "07",
    description:
      "Compte rendu généré et transmis. Dossier mis à jour. Suivi déclenché si pièce à commander.",
    detail:
      "Rapport signé électroniquement. Archivage automatique. Prochaine maintenance suggérée.",
    duration: "< 24h",
    actor: "Système",
    actorColor: "bg-steel-100 text-steel-700",
  },
];

export function ProcessSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % WORKFLOW_STEPS.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [paused]);

  const step = WORKFLOW_STEPS[activeStep];
  const StepIcon = step.icon;

  return (
    <section className="section-py bg-steel-950 text-white overflow-hidden">
      <div className="container-page">
        <div className="mb-12">
          <p className="text-sm font-semibold text-brand-400 uppercase tracking-wide mb-2">
            Processus
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            De la demande à la résolution
          </h2>
          <p className="text-steel-400 max-w-xl leading-relaxed">
            Chaque demande suit un flux structuré — qualification automatique,
            bon technicien, suivi en temps réel.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Left: Steps list */}
          <div className="space-y-1">
            {WORKFLOW_STEPS.map((s, i) => {
              const Icon = s.icon;
              const isActive = i === activeStep;
              const isDone = i < activeStep;
              return (
                <button
                  key={s.id}
                  onClick={() => {
                    setActiveStep(i);
                    setPaused(true);
                  }}
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-left transition-all duration-300 ${
                    isActive
                      ? "bg-white/10 border border-white/15"
                      : "hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all ${
                      isActive
                        ? "bg-brand-600"
                        : isDone
                          ? "bg-white/15"
                          : "bg-white/8"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-steel-600 font-mono">
                        {s.code}
                      </span>
                      <span
                        className={`text-sm font-medium transition-colors ${
                          isActive
                            ? "text-white"
                            : isDone
                              ? "text-steel-400"
                              : "text-steel-300"
                        }`}
                      >
                        {s.label}
                      </span>
                    </div>
                    {isActive && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="text-xs text-steel-400 mt-1 leading-relaxed"
                      >
                        {s.description}
                      </motion.p>
                    )}
                  </div>
                  <div className="shrink-0">
                    {isActive ? (
                      <span className="w-2 h-2 rounded-full bg-brand-400 block animate-pulse" />
                    ) : isDone ? (
                      <span className="w-2 h-2 rounded-full bg-white/20 block" />
                    ) : (
                      <ArrowRight className="w-4 h-4 text-steel-700" />
                    )}
                  </div>
                </button>
              );
            })}

            {paused && (
              <button
                onClick={() => setPaused(false)}
                className="mt-2 text-xs text-steel-600 hover:text-steel-300 transition-colors pl-2"
              >
                ↺ Reprendre l&apos;animation automatique
              </button>
            )}
          </div>

          {/* Right: Detail panel */}
          <div className="lg:sticky lg:top-24">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3 }}
                className="bg-white/8 border border-white/10 rounded-2xl p-7 space-y-6"
              >
                {/* Step header */}
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-brand-600 flex items-center justify-center shrink-0">
                    <StepIcon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-steel-500 font-mono mb-1">
                      Étape {step.id}&nbsp;/&nbsp;{WORKFLOW_STEPS.length}
                    </div>
                    <h3 className="text-xl font-bold text-white">
                      {step.label}
                    </h3>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-3">
                  <p className="text-steel-300 leading-relaxed">
                    {step.description}
                  </p>
                  <p className="text-sm text-steel-400 leading-relaxed pl-4 border-l border-white/10">
                    {step.detail}
                  </p>
                </div>

                {/* Meta */}
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-steel-500" />
                    <span className="text-steel-400">Durée :</span>
                    <span className="text-white font-medium">
                      {step.duration}
                    </span>
                  </div>
                  <span
                    className={`text-xs px-2.5 py-1 rounded-full font-medium ${step.actorColor}`}
                  >
                    {step.actor}
                  </span>
                </div>

                {/* Progress */}
                <div>
                  <div className="flex justify-between text-xs text-steel-600 mb-1.5">
                    <span>Avancement du flux</span>
                    <span>
                      {activeStep + 1}&nbsp;/&nbsp;{WORKFLOW_STEPS.length}
                    </span>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-brand-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{
                        width: `${((activeStep + 1) / WORKFLOW_STEPS.length) * 100}%`,
                      }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
