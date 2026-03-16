import Link from "next/link";
import { Phone, Mail, MapPin, Clock, ArrowRight } from "lucide-react";
import { COMPANY, PAGES, SERVICE_CATEGORIES } from "@/lib/constants";
import { Logo } from "@/components/ui/logo";

export function PublicFooter() {
  return (
    <footer className="bg-steel-950 text-steel-300">
      {/* Main footer */}
      <div className="container-page py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href={PAGES.public.home} className="inline-flex mb-4">
              <Logo variant="full" theme="dark" className="h-10 w-auto" />
            </Link>
            <p className="text-sm text-steel-400 leading-relaxed mb-6">
              Automatisme, sécurité, portes automatiques, climatisation et maintenance technique
              sur Toulouse et l&apos;Occitanie.
            </p>
            <div className="space-y-2.5">
              <a
                href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-2.5 text-sm hover:text-white transition-colors group"
              >
                <Phone className="w-4 h-4 text-brand-500 shrink-0" />
                <span>{COMPANY.phone}</span>
              </a>
              <a
                href={`mailto:${COMPANY.email}`}
                className="flex items-center gap-2.5 text-sm hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-brand-500 shrink-0" />
                <span>{COMPANY.email}</span>
              </a>
              <div className="flex items-start gap-2.5 text-sm">
                <MapPin className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
                <span className="text-steel-400">{COMPANY.address}</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-white text-sm mb-4">Nos services</h3>
            <ul className="space-y-2.5">
              {Object.values(SERVICE_CATEGORIES).map((service) => (
                <li key={service.href}>
                  <Link
                    href={service.href}
                    className="text-sm text-steel-400 hover:text-white transition-colors flex items-center gap-1.5 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Clients */}
          <div>
            <h3 className="font-semibold text-white text-sm mb-4">Secteurs d&apos;activité</h3>
            <ul className="space-y-2.5">
              {[
                { label: "Particuliers", href: PAGES.public.particuliers },
                { label: "Entreprises & Commerces", href: PAGES.public.entreprises },
                { label: "Syndics & Copropriétés", href: PAGES.public.syndics },
                { label: "Collectivités", href: PAGES.public.collectivites },
                { label: "Zones desservies", href: PAGES.public.zones },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-steel-400 hover:text-white transition-colors flex items-center gap-1.5 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="font-semibold text-white text-sm mb-4 mt-6">Demandes rapides</h3>
            <ul className="space-y-2.5">
              {[
                { label: "Demander un dépannage", href: PAGES.public.depannage },
                { label: "Demander un devis", href: PAGES.public.devis },
                { label: "Prendre rendez-vous", href: PAGES.public.rendezvous },
                { label: "Assistant IA", href: PAGES.public.assistant },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-steel-400 hover:text-white transition-colors flex items-center gap-1.5 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Horaires */}
          <div>
            <h3 className="font-semibold text-white text-sm mb-4">Horaires & urgences</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-brand-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm text-white font-medium">Lundi – Vendredi</p>
                  <p className="text-sm text-steel-400">{COMPANY.hours.weekdays}</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-brand-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm text-white font-medium">Samedi</p>
                  <p className="text-sm text-steel-400">{COMPANY.hours.saturday}</p>
                </div>
              </div>
              <div className="bg-brand-900/50 border border-brand-700/50 rounded-lg p-3 mt-4">
                <p className="text-xs font-semibold text-brand-300 uppercase tracking-wide mb-1">
                  Urgences contractuelles
                </p>
                <p className="text-sm text-steel-300">{COMPANY.hours.emergency}</p>
                <a
                  href={`tel:${COMPANY.phoneUrgency.replace(/\s/g, "")}`}
                  className="text-brand-400 font-semibold text-sm mt-1 block hover:text-brand-300 transition-colors"
                >
                  {COMPANY.phoneUrgency}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-steel-800">
        <div className="container-page py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-steel-500">
            © {new Date().getFullYear()} {COMPANY.fullName}. Tous droits réservés.
          </p>
          <div className="flex items-center gap-4 text-xs text-steel-500">
            <Link href="/mentions-legales" className="hover:text-steel-300 transition-colors">
              Mentions légales
            </Link>
            <Link href="/politique-confidentialite" className="hover:text-steel-300 transition-colors">
              Confidentialité
            </Link>
            <Link href={PAGES.auth.login} className="hover:text-steel-300 transition-colors">
              Espace client
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
