import type { Metadata } from "next";
import Link from "next/link";
import { AIAssistant } from "@/components/ai/ai-assistant";
import {
  Sparkles,
  AlertTriangle,
  Shield,
  Settings2,
  DoorOpen,
  Wind,
  Wrench,
  ArrowRight,
} from "lucide-react";
import { PAGES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Assistant IA — Décrivez votre panne | ASO31",
  description:
    "Décrivez votre problème technique à notre assistant IA métier. Il qualifie la panne, identifie les causes probables et prépare votre ticket d'intervention.",
};

const QUICK_CASES = [
  { label: "Portail bloqué", icon: Settings2 },
  { label: "Alarme intempestive", icon: Shield },
  { label: "Clim sans effet", icon: Wind },
  { label: "Porte auto bloquée", icon: DoorOpen },
  { label: "Panne inconnue", icon: Wrench },
];

export default function AssistantPage() {
  return (
    <div className="min-h-screen bg-surface-subtle">
      {/* Header enrichi */}
      <div className="bg-steel-950 text-white py-14">
        <div className="container-page">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-500/20 border border-brand-500/30 text-brand-300 text-sm font-medium mb-5">
            <Sparkles className="w-4 h-4" />
            Qualification assistée par IA
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 max-w-2xl">
            Décrivez votre panne.
            <br />
            On prépare l&apos;intervention.
          </h1>
          <p className="text-steel-300 max-w-xl leading-relaxed mb-6">
            Notre assistant analyse vos symptômes, identifie les causes probables
            et structure un ticket qualifié pour notre équipe. Moins
            d&apos;allers-retours, plus de réussite au premier passage.
          </p>

          {/* Quick case shortcuts */}
          <div className="flex flex-wrap gap-2">
            {QUICK_CASES.map((c) => {
              const Icon = c.icon;
              return (
                <span
                  key={c.label}
                  className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-steel-300"
                >
                  <Icon className="w-3 h-3" />
                  {c.label}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-amber-50 border-b border-amber-100">
        <div className="container-page py-3 flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-700 leading-relaxed">
            L&apos;assistant IA est un outil d&apos;aide à la qualification —
            il ne remplace pas le diagnostic d&apos;un technicien. Les résultats
            affichent un niveau de confiance et indiquent quand une validation
            humaine est requise.
          </p>
        </div>
      </div>

      {/* Assistant component */}
      <div className="container-page py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <AIAssistant />
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="bg-white border border-border rounded-xl p-5">
              <h3 className="font-semibold text-steel-900 text-sm mb-3">
                Après le diagnostic…
              </h3>
              <div className="space-y-2">
                {[
                  { label: "Créer un ticket de dépannage", href: PAGES.public.depannage },
                  { label: "Demander un devis", href: PAGES.public.devis },
                  { label: "Prendre rendez-vous", href: PAGES.public.rendezvous },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center justify-between px-3 py-2.5 rounded-lg border border-steel-100 hover:border-brand-300 hover:bg-brand-50 transition-all text-sm text-steel-700 hover:text-brand-700 group"
                  >
                    {item.label}
                    <ArrowRight className="w-4 h-4 text-steel-400 group-hover:text-brand-600 transition-colors" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-steel-950 rounded-xl p-5 text-center">
              <p className="text-xs text-steel-400 mb-1">
                Urgence critique ? Appelez directement
              </p>
              <a
                href="tel:0562132030"
                className="text-white font-bold text-base hover:text-brand-300 transition-colors block"
              >
                05 62 13 20 30
              </a>
              <p className="text-xs text-steel-500 mt-1">
                Astreinte pour les contrats actifs
              </p>
            </div>

            <div className="bg-surface-subtle border border-border rounded-xl p-5">
              <p className="text-xs font-semibold text-steel-500 uppercase tracking-wide mb-3">
                Nos domaines
              </p>
              {[
                { label: "Automatismes", href: PAGES.public.automatismes },
                { label: "Alarme & Sécurité", href: PAGES.public.alarmeSecurity },
                { label: "Portes Automatiques", href: PAGES.public.portesAutomatiques },
                { label: "Climatisation", href: PAGES.public.climatisation },
                { label: "Maintenance", href: PAGES.public.maintenance },
              ].map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className="block text-sm text-steel-500 hover:text-brand-600 py-1 transition-colors"
                >
                  → {s.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
