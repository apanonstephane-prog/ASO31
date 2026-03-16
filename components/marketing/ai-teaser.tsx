"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, MessageSquare, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PAGES } from "@/lib/constants";

const EXAMPLE_CONVERSATIONS = [
  {
    user: "Mon portail coulissant s'ouvre mais ne se ferme plus depuis ce matin.",
    ai: "Symptôme fréquent sur portail coulissant : cela peut indiquer un problème de cellule photoélectrique (obstruée ou désalignée) ou un fin de course mal positionné. L'équipement est-il totalement bloqué ou effectue-t-il une partie du mouvement avant de s'arrêter ?",
  },
  {
    user: "La climatisation souffle mais ne refroidit plus.",
    ai: "Ce symptôme oriente vers deux causes principales : filtre encrassé (action possible côté client) ou pression de fluide insuffisante (intervention technicien nécessaire). Commencez par nettoyer les filtres — si le problème persiste après 24h, une visite est recommandée.",
  },
  {
    user: "L'alarme se déclenche sans raison la nuit.",
    ai: "Un déclenchement nocturne sans intrusion peut venir d'un détecteur IR sensible (animaux, lumières), d'une batterie de secours faible ou d'un défaut de zone. Je vous recommande de consulter le journal d'événements de la centrale. Voulez-vous qu'on crée un ticket pour une vérification ?",
  },
];

export function AITeaser() {
  const [activeConv, setActiveConv] = useState(0);
  const conv = EXAMPLE_CONVERSATIONS[activeConv];

  return (
    <section className="section-py bg-white">
      <div className="container-page">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
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
              Notre assistant analyse vos symptômes, identifie les causes probables et prépare
              un ticket structuré pour nos techniciens. Moins d&apos;allers-retours, plus de
              précision au premier passage.
            </p>

            <ul className="space-y-3 mb-8">
              {[
                "Questions adaptées à chaque type d'équipement",
                "Détection de l'urgence et orientation vers le bon service",
                "Hypothèses de panne avec niveau de confiance affiché",
                "Transmission directe à l'équipe technique",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-steel-600">
                  <CheckCircle2 className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>

            <Button asChild size="lg">
              <Link href={PAGES.public.assistant}>
                Essayer l&apos;assistant
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          {/* Right: Demo UI */}
          <div className="relative">
            <div className="bg-surface-subtle border border-border rounded-2xl p-6 space-y-4">
              {/* Header */}
              <div className="flex items-center gap-3 pb-4 border-b border-border">
                <div className="w-8 h-8 rounded-full bg-brand-600 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-steel-900 text-sm">Assistant ASO31</p>
                  <p className="text-xs text-success-600 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-success-500 inline-block" />
                    En ligne
                  </p>
                </div>
              </div>

              {/* Conversation */}
              <div className="space-y-3">
                <div className="flex justify-end">
                  <div className="bg-brand-600 text-white text-sm px-4 py-2.5 rounded-2xl rounded-tr-sm max-w-xs">
                    {conv.user}
                  </div>
                </div>
                <div className="flex gap-2 items-end">
                  <div className="w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center shrink-0">
                    <MessageSquare className="w-3 h-3 text-brand-600" />
                  </div>
                  <div className="bg-white border border-border text-steel-700 text-sm px-4 py-2.5 rounded-2xl rounded-tl-sm max-w-xs">
                    {conv.ai}
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex gap-2 pt-2">
                {EXAMPLE_CONVERSATIONS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveConv(i)}
                    className={`h-1.5 rounded-full transition-all ${
                      i === activeConv
                        ? "bg-brand-600 w-6"
                        : "bg-steel-200 w-3 hover:bg-steel-300"
                    }`}
                    aria-label={`Exemple ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Decorative label */}
            <div className="absolute -top-3 -right-3 bg-accent-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm">
              Qualification en temps réel
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
