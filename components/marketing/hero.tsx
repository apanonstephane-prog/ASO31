"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
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
  "Toulouse et Occitanie — 31, 32, 81, 82, 09",
  "Toutes marques, tous équipements",
  "Contrats d'entretien sur mesure",
  "Fondée en 1987 · 35+ techniciens terrain",
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-steel-950 text-white">
      {/* Background photo */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1920&q=85&auto=format&fit=crop"
          alt="Technicien en intervention industrielle"
          fill
          priority
          quality={85}
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Dark gradient overlay — garde la lisibilité du texte */}
        <div className="absolute inset-0 bg-gradient-to-r from-steel-950/95 via-steel-950/80 to-steel-950/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-steel-950/60 via-transparent to-transparent" />
      </div>

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
              Toulouse · Occitanie — 31, 32, 81, 82, 09
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
