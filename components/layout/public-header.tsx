"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu, X, Phone, ChevronDown,
  Shield, Settings2, DoorOpen, Wind, Wrench,
  ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { COMPANY, PAGES } from "@/lib/constants";
import { Button } from "@/components/ui/button";

const NAV_SERVICES = [
  { label: "Alarme & Sécurité", href: PAGES.public.alarmeSecurity, icon: Shield },
  { label: "Automatismes", href: PAGES.public.automatismes, icon: Settings2 },
  { label: "Portes Automatiques", href: PAGES.public.portesAutomatiques, icon: DoorOpen },
  { label: "Climatisation", href: PAGES.public.climatisation, icon: Wind },
  { label: "Maintenance & Dépannage", href: PAGES.public.maintenance, icon: Wrench },
];

const NAV_LINKS = [
  { label: "Services", href: PAGES.public.services, hasDropdown: true },
  { label: "Secteurs", href: PAGES.public.secteurs },
  { label: "Zones desservies", href: PAGES.public.zones },
  { label: "À propos", href: PAGES.public.apropos },
];

export function PublicHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/95 backdrop-blur-sm border-b border-border shadow-soft"
          : "bg-white/90 backdrop-blur-sm"
      )}
    >
      <div className="container-page">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href={PAGES.public.home}
            className="flex items-center gap-2.5 shrink-0 group"
            aria-label="ASO31 — Accueil"
          >
            <div className="w-8 h-8 bg-brand-700 rounded-lg flex items-center justify-center group-hover:bg-brand-800 transition-colors">
              <span className="text-white text-xs font-bold tracking-tight">A31</span>
            </div>
            <span className="font-bold text-steel-900 text-lg tracking-tight hidden sm:block">
              ASO<span className="text-brand-600">31</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Navigation principale">
            {NAV_LINKS.map((item) =>
              item.hasDropdown ? (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <button
                    className={cn(
                      "flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                      "hover:bg-surface-subtle hover:text-steel-900",
                      pathname.startsWith("/services")
                        ? "text-brand-700 bg-brand-50"
                        : "text-steel-600"
                    )}
                    aria-expanded={servicesOpen}
                    aria-haspopup="true"
                  >
                    {item.label}
                    <ChevronDown
                      className={cn("w-3.5 h-3.5 transition-transform", servicesOpen && "rotate-180")}
                    />
                  </button>

                  <AnimatePresence>
                    {servicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 mt-1 w-64 bg-white border border-border rounded-xl shadow-elevated p-2"
                      >
                        {NAV_SERVICES.map((service) => (
                          <Link
                            key={service.href}
                            href={service.href}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-surface-subtle transition-colors group"
                          >
                            <div className="w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center shrink-0 group-hover:bg-brand-100 transition-colors">
                              <service.icon className="w-4 h-4 text-brand-600" />
                            </div>
                            <span className="text-sm font-medium text-steel-700 group-hover:text-steel-900">
                              {service.label}
                            </span>
                          </Link>
                        ))}
                        <div className="border-t border-border mt-1 pt-1">
                          <Link
                            href={PAGES.public.services}
                            className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-surface-subtle transition-colors text-sm text-brand-600 font-medium"
                          >
                            Tous les services
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    "hover:bg-surface-subtle hover:text-steel-900",
                    pathname === item.href
                      ? "text-brand-700 bg-brand-50"
                      : "text-steel-600"
                  )}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">
            <a
              href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}
              className="flex items-center gap-2 text-sm text-steel-600 hover:text-steel-900 transition-colors px-3 py-2 rounded-lg hover:bg-surface-subtle"
            >
              <Phone className="w-4 h-4 text-brand-600" />
              <span className="font-medium">{COMPANY.phone}</span>
            </a>
            <Button asChild size="sm">
              <Link href={PAGES.public.depannage}>Dépannage urgent</Link>
            </Button>
          </div>

          {/* Mobile burger */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-surface-subtle transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-5 h-5 text-steel-700" /> : <Menu className="w-5 h-5 text-steel-700" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden border-t border-border bg-white overflow-hidden"
          >
            <div className="container-page py-4 space-y-1">
              {/* Services */}
              <div className="py-2">
                <p className="text-xs font-semibold text-steel-400 uppercase tracking-wide px-3 mb-2">
                  Nos services
                </p>
                {NAV_SERVICES.map((service) => (
                  <Link
                    key={service.href}
                    href={service.href}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-surface-subtle transition-colors"
                  >
                    <service.icon className="w-4 h-4 text-brand-600 shrink-0" />
                    <span className="text-sm font-medium text-steel-700">{service.label}</span>
                  </Link>
                ))}
              </div>

              <div className="border-t border-border pt-2">
                {NAV_LINKS.filter((l) => !l.hasDropdown).map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-3 py-2.5 rounded-lg text-sm font-medium text-steel-700 hover:bg-surface-subtle"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              {/* CTA mobile */}
              <div className="border-t border-border pt-4 space-y-2">
                <Button asChild className="w-full" size="lg">
                  <Link href={PAGES.public.depannage}>Demander un dépannage</Link>
                </Button>
                <Button asChild variant="outline" className="w-full" size="lg">
                  <Link href={PAGES.public.devis}>Demander un devis</Link>
                </Button>
                <a
                  href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}
                  className="flex items-center justify-center gap-2 w-full py-3 text-sm text-steel-600"
                >
                  <Phone className="w-4 h-4 text-brand-600" />
                  <span>{COMPANY.phone}</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
