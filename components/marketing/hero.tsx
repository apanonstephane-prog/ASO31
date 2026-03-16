"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Phone, Zap, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { COMPANY, PAGES } from "@/lib/constants";

const QUICK_ACTIONS = [
  {
    label: "Dépannage urgent",
    description: "Équipement en panne ? Décrivez la situation.",
    href: PAGES.public.depannage,
    variant: "default" as const,
    icon: Zap,
    highlighted: true,
  },
  {
    label: "Demander un devis",
    description: "Installation neuve ou remplacement.",
    href: PAGES.public.devis,
    variant: "outline" as const,
  },
  {
    label: "Prendre rendez-vous",
    description: "Visite de diagnostic ou entretien.",
    href: PAGES.public.rendezvous,
    variant: "outline" as const,
  },
  {
    label: "Assistant IA",
    description: "Décrivez votre panne, on qualifie.",
    href: PAGES.public.assistant,
    variant: "outline" as const,
  },
];

const TRUST_ITEMS = [
  "Interventions sur Toulouse et agglomération",
  "Toutes marques, tous équipements",
  "Contrats d'entretien sur mesure",
  "Qualification des demandes en moins d'1 heure",
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-steel-950 via-brand-900 to-steel-950 text-white">
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="container-page relative">
        <div className="py-20 md:py-32 lg:py-36">
          <div className="max-w-4xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-500/20 border border-brand-500/30 text-brand-300 text-sm font-medium mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse" />
              Interventions sur Toulouse et Haute-Garonne
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight text-white mb-6"
            >
              Maintenance technique{" "}
              <span className="text-brand-400">pilotée avec précision</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-steel-300 max-w-2xl leading-relaxed mb-8"
            >
              Automatismes, alarmes, portes automatiques et climatisation.
              Une équipe de techniciens expérimentés, une qualification intelligente des demandes,
              un suivi clair de bout en bout.
            </motion.p>

            {/* Trust items */}
            <motion.ul
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-x-5 gap-y-2 mb-10"
            >
              {TRUST_ITEMS.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-steel-300">
                  <CheckCircle2 className="w-4 h-4 text-brand-400 shrink-0" />
                  {item}
                </li>
              ))}
            </motion.ul>

            {/* Quick actions */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-10"
            >
              {QUICK_ACTIONS.map((action) => (
                <Link
                  key={action.href}
                  href={action.href}
                  className={`group flex flex-col gap-1 p-4 rounded-xl border transition-all duration-200 ${
                    action.highlighted
                      ? "bg-brand-600 border-brand-500 hover:bg-brand-700 text-white"
                      : "bg-white/8 border-white/15 hover:bg-white/12 hover:border-white/25 text-white"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm">{action.label}</span>
                    <ArrowRight className="w-4 h-4 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <span className={`text-xs leading-relaxed ${action.highlighted ? "text-brand-100" : "text-steel-400"}`}>
                    {action.description}
                  </span>
                </Link>
              ))}
            </motion.div>

            {/* Phone CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.45 }}
            >
              <a
                href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}
                className="inline-flex items-center gap-2.5 text-steel-300 hover:text-white transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-white/15 transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-sm block leading-tight">{COMPANY.phone}</span>
                  <span className="text-xs text-steel-500">Lun – Ven, 8h–18h</span>
                </div>
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white/5 to-transparent pointer-events-none" />
    </section>
  );
}
