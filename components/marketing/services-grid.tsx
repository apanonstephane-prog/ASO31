"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Shield,
  Settings2,
  DoorOpen,
  Wind,
  Wrench,
  ArrowRight,
  Zap,
  FileText,
  AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PAGES } from "@/lib/constants";

const SERVICES = [
  {
    icon: Shield,
    label: "Alarme & Sécurité",
    description:
      "Installation et maintenance de systèmes d'alarme intrusion, vidéosurveillance, contrôle d'accès et interphonie.",
    href: "/services/alarmes-securite",
    highlights: ["Alarme intrusion", "Contrôle d'accès", "Vidéo", "Interphonie"],
    symptoms: [
      "Alarme se déclenche sans raison",
      "Badge / digicode ne répond plus",
      "Caméra hors ligne",
    ],
    contexts: ["Commerces", "Copropriétés", "Entrepôts", "Résidentiel"],
    photo:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80&auto=format&fit=crop",
    photoAlt: "Système de vidéosurveillance professionnel",
    accentClass: "bg-brand-50 border-brand-100 group-hover:border-brand-200",
    iconClass: "bg-brand-100 text-brand-700",
    urgencyLevel: "Urgence possible",
    urgencyColor: "text-amber-600",
  },
  {
    icon: Settings2,
    label: "Automatismes",
    description:
      "Portails motorisés coulissants et battants, barrières levantes, bras articulés. Toutes marques.",
    href: "/services/automatismes",
    highlights: ["Portail coulissant", "Portail battant", "Barrière levante", "Colonne"],
    symptoms: [
      "Portail ne se ferme plus",
      "Télécommande sans effet",
      "Mouvement saccadé ou bruyant",
    ],
    contexts: ["Particuliers", "Entreprises", "Logistique", "Syndics"],
    photo:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80&auto=format&fit=crop",
    photoAlt: "Portail industriel motorisé",
    accentClass: "bg-steel-50 border-steel-100 group-hover:border-steel-200",
    iconClass: "bg-steel-100 text-steel-700",
    urgencyLevel: "Fréquent",
    urgencyColor: "text-steel-500",
  },
  {
    icon: DoorOpen,
    label: "Portes Automatiques",
    description:
      "Portes coulissantes, battantes et à tambour pour commerces, établissements de santé et tertiaire.",
    href: "/services/portes-automatiques",
    highlights: ["Porte coulissante", "Porte sectionnelle", "Rideau métallique", "Garage"],
    symptoms: [
      "Porte bloquée — accueil impossible",
      "Porte s'ouvre mais ne se referme pas",
      "Détecteur de présence inactif",
    ],
    contexts: ["Commerces", "Santé", "Hôtellerie", "Bureaux"],
    photo:
      "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&q=80&auto=format&fit=crop",
    photoAlt: "Entrée automatique vitrine commerciale",
    accentClass: "bg-steel-50 border-steel-100 group-hover:border-steel-200",
    iconClass: "bg-steel-100 text-steel-700",
    urgencyLevel: "Urgence fréquente",
    urgencyColor: "text-red-500",
  },
  {
    icon: Wind,
    label: "Climatisation",
    description:
      "Systèmes split muraux et gainables, entretien obligatoire, dépannage et mise en service.",
    href: "/services/climatisation",
    highlights: ["Split mural", "Gainable", "Entretien réglementaire", "Audit"],
    symptoms: [
      "Ne refroidit / ne chauffe plus",
      "Fuites d'eau ou de gaz",
      "Unité bruyante",
    ],
    contexts: ["Bureaux", "Pharmacies", "Résidentiel", "Restaurants"],
    photo:
      "https://images.pexels.com/photos/16848596/pexels-photo-16848596.jpeg?auto=compress&cs=tinysrgb&w=800",
    photoAlt: "Unité extérieure de climatisation",
    accentClass: "bg-brand-50 border-brand-100 group-hover:border-brand-200",
    iconClass: "bg-brand-100 text-brand-700",
    urgencyLevel: "Saisonnier",
    urgencyColor: "text-sky-600",
  },
  {
    icon: Wrench,
    label: "Maintenance & Dépannage",
    description:
      "Contrats d'entretien annuels. Dépannage toutes marques. Visites préventives. Gestion multi-sites.",
    href: "/services/maintenance-depannage",
    highlights: ["Contrat d'entretien", "Multi-équipements", "Devis gratuit", "Toutes marques"],
    symptoms: [
      "Panne inconnue à diagnostiquer",
      "Équipement vieillissant",
      "Besoin d'un contrat multi-sites",
    ],
    contexts: ["Tous secteurs", "Multi-sites", "Collectivités", "Industries"],
    photo:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80&auto=format&fit=crop",
    photoAlt: "Technicien sur tableau électrique",
    accentClass: "bg-accent-50 border-accent-100 group-hover:border-accent-200",
    iconClass: "bg-accent-100 text-accent-700",
    urgencyLevel: "Préventif",
    urgencyColor: "text-green-600",
  },
];

function ServiceCard({
  service,
  index,
}: {
  service: (typeof SERVICES)[0];
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={cn(
        "group relative flex flex-col rounded-2xl border overflow-hidden transition-all duration-300",
        service.accentClass,
        expanded ? "shadow-elevated" : "hover:shadow-card",
        index === 4 && "md:col-span-2 lg:col-span-1"
      )}
    >
      {/* Photo */}
      <div className="relative h-44 overflow-hidden shrink-0">
        <Image
          src={service.photo}
          alt={service.photoAlt}
          fill
          quality={80}
          className={`object-cover transition-transform duration-500 ${expanded ? "scale-105" : "group-hover:scale-102"}`}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

        {/* Icon */}
        <div
          className={cn(
            "absolute bottom-3 left-3 w-9 h-9 rounded-xl flex items-center justify-center shadow-lg",
            service.iconClass
          )}
        >
          <service.icon className="w-4 h-4" />
        </div>

        {/* Urgency badge */}
        <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1">
          <span className={`text-xs font-medium ${service.urgencyColor}`}>
            {service.urgencyLevel}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-semibold text-steel-900 text-base mb-2">
          {service.label}
        </h3>
        <p className="text-sm text-steel-500 leading-relaxed mb-3 flex-1">
          {service.description}
        </p>

        {/* Highlights */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {service.highlights.map((h) => (
            <span
              key={h}
              className="text-xs px-2 py-0.5 rounded-md bg-white/70 border border-white/80 text-steel-600"
            >
              {h}
            </span>
          ))}
        </div>

        {/* Expandable symptoms */}
        {expanded && (
          <div className="mb-4 space-y-3 border-t border-black/5 pt-4">
            <div>
              <p className="text-xs font-semibold text-steel-500 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                <AlertTriangle className="w-3 h-3" />
                Symptômes fréquents
              </p>
              <ul className="space-y-1.5">
                {service.symptoms.map((s) => (
                  <li
                    key={s}
                    className="text-xs text-steel-600 flex items-start gap-1.5"
                  >
                    <span className="w-1 h-1 rounded-full bg-brand-500 mt-1.5 shrink-0" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold text-steel-500 uppercase tracking-wide mb-2">
                Contextes
              </p>
              <div className="flex flex-wrap gap-1">
                {service.contexts.map((c) => (
                  <span
                    key={c}
                    className="text-xs px-2 py-0.5 rounded-md bg-white border border-steel-200 text-steel-600"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick action buttons */}
            <div className="flex gap-2 pt-1">
              <Link
                href={PAGES.public.depannage}
                onClick={(e) => e.stopPropagation()}
                className="flex-1 flex items-center justify-center gap-1 bg-brand-600 hover:bg-brand-700 text-white text-xs font-medium py-2 rounded-lg transition-colors"
              >
                <Zap className="w-3 h-3" />
                Dépannage
              </Link>
              <Link
                href={PAGES.public.devis}
                onClick={(e) => e.stopPropagation()}
                className="flex-1 flex items-center justify-center gap-1 border border-steel-300 text-steel-700 hover:bg-white text-xs font-medium py-2 rounded-lg transition-colors"
              >
                <FileText className="w-3 h-3" />
                Devis
              </Link>
            </div>
          </div>
        )}

        {/* Footer actions */}
        <div className="flex items-center justify-between mt-auto">
          <Link
            href={service.href}
            className="flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:gap-2.5 transition-all"
          >
            En savoir plus
            <ArrowRight className="w-4 h-4" />
          </Link>
          <button
            onClick={() => setExpanded((v) => !v)}
            className="text-xs text-steel-400 hover:text-steel-600 transition-colors underline underline-offset-2"
          >
            {expanded ? "Réduire" : "Voir les pannes fréquentes"}
          </button>
        </div>
      </div>
    </div>
  );
}

export function ServicesGrid() {
  return (
    <section className="section-py bg-white">
      <div className="container-page">
        <div className="mb-12">
          <p className="text-sm font-semibold text-brand-600 uppercase tracking-wide mb-2">
            Nos domaines d&apos;expertise
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-steel-950 mb-4">
            Cinq métiers, une seule équipe
          </h2>
          <p className="text-lg text-steel-500 max-w-2xl">
            Chaque intervention est confiée à un technicien spécialisé dans le
            métier concerné. Pas de généraliste — des experts qui diagnostiquent.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.href} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
