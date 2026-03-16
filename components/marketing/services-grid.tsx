import Link from "next/link";
import Image from "next/image";
import { Shield, Settings2, DoorOpen, Wind, Wrench, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const SERVICES = [
  {
    icon: Shield,
    label: "Alarme & Sécurité",
    description:
      "Installation et maintenance de systèmes d'alarme intrusion, vidéosurveillance, contrôle d'accès et interphonie.",
    href: "/services/alarmes-securite",
    highlights: ["Alarme intrusion", "Contrôle d'accès", "Vidéosurveillance", "Interphonie"],
    photo: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80&auto=format&fit=crop",
    photoAlt: "Caméra de surveillance professionnelle",
    accentClass: "bg-brand-50 border-brand-100 group-hover:border-brand-200",
    iconClass: "bg-brand-100 text-brand-700",
  },
  {
    icon: Settings2,
    label: "Automatismes",
    description:
      "Portails motorisés coulissants et battants, barrières levantes, bras articulés. Installation, dépannage et entretien toutes marques.",
    href: "/services/automatismes",
    highlights: ["Portail coulissant", "Portail battant", "Barrière levante", "Colonne de commande"],
    photo: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80&auto=format&fit=crop",
    photoAlt: "Portail industriel motorisé",
    accentClass: "bg-steel-50 border-steel-100 group-hover:border-steel-200",
    iconClass: "bg-steel-100 text-steel-700",
  },
  {
    icon: DoorOpen,
    label: "Portes Automatiques",
    description:
      "Portes coulissantes, battantes et à tambour pour commerces, établissements de santé, copropriétés et sites tertiaires.",
    href: "/services/portes-automatiques",
    highlights: ["Porte coulissante", "Porte sectionnelle", "Rideau métallique", "Porte de garage"],
    photo: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&q=80&auto=format&fit=crop",
    photoAlt: "Entrée automatique vitrine commerciale",
    accentClass: "bg-steel-50 border-steel-100 group-hover:border-steel-200",
    iconClass: "bg-steel-100 text-steel-700",
  },
  {
    icon: Wind,
    label: "Climatisation",
    description:
      "Systèmes split muraux et gainables, entretien obligatoire, dépannage et mise en service pour particuliers et tertiaire.",
    href: "/services/climatisation",
    highlights: ["Split mural", "Gainable", "Entretien réglementaire", "Audit thermique"],
    photo: "https://images.unsplash.com/photo-1591769225440-811ad7d6eab3?w=800&q=80&auto=format&fit=crop",
    photoAlt: "Unité extérieure de climatisation",
    accentClass: "bg-brand-50 border-brand-100 group-hover:border-brand-200",
    iconClass: "bg-brand-100 text-brand-700",
  },
  {
    icon: Wrench,
    label: "Maintenance & Dépannage",
    description:
      "Contrats d'entretien annuels ou pluriannuels. Dépannage toutes marques. Visites préventives planifiées. Gestion multi-sites.",
    href: "/services/maintenance-depannage",
    highlights: ["Contrat d'entretien", "Multi-équipements", "Devis gratuit", "Toutes marques"],
    photo: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80&auto=format&fit=crop",
    photoAlt: "Technicien travaillant sur tableau électrique",
    accentClass: "bg-accent-50 border-accent-100 group-hover:border-accent-200",
    iconClass: "bg-accent-100 text-accent-700",
  },
];

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
            Chaque intervention est confiée à un technicien spécialisé dans le métier concerné.
            Pas de généraliste qui bricole — des experts qui diagnostiquent.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.map((service, i) => (
            <Link
              key={service.href}
              href={service.href}
              className={cn(
                "group relative flex flex-col rounded-2xl border overflow-hidden transition-all duration-200 hover:shadow-card",
                service.accentClass,
                i === 4 && "md:col-span-2 lg:col-span-1"
              )}
            >
              {/* Photo */}
              <div className="relative h-44 overflow-hidden">
                <Image
                  src={service.photo}
                  alt={service.photoAlt}
                  fill
                  quality={80}
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className={cn("absolute bottom-3 left-3 w-9 h-9 rounded-xl flex items-center justify-center shadow-lg", service.iconClass)}>
                  <service.icon className="w-4 h-4" />
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-semibold text-steel-900 text-base mb-2">{service.label}</h3>
                <p className="text-sm text-steel-500 leading-relaxed mb-4 flex-1">{service.description}</p>

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

                <div className="flex items-center gap-1.5 text-sm font-medium text-brand-600 group-hover:gap-2.5 transition-all">
                  En savoir plus
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
