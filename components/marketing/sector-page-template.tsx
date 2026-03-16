"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  LucideIcon,
  ArrowRight,
  CheckCircle2,
  Phone,
  ChevronRight,
  Sparkles,
  Zap,
  FileText,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CTASection } from "./cta-section";
import { COMPANY, PAGES } from "@/lib/constants";

// ─── Animation variants ──────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

// ─── Types ───────────────────────────────────────────────────────────────────

interface ServiceLink {
  label: string;
  description: string;
  href: string;
  icon: LucideIcon;
}

interface Challenge {
  title: string;
  description: string;
}

interface FAQ {
  question: string;
  answer: string;
}

interface SectorPageProps {
  icon: LucideIcon;
  category: string;
  headline: string;
  subheadline: string;
  description: string;
  services: ServiceLink[];
  challenges: Challenge[];
  benefits: Array<{ title: string; description: string }>;
  faqs: FAQ[];
  ctaTitle: string;
  ctaDescription: string;
  ctaPrimaryLabel: string;
  ctaSecondaryLabel?: string;
  devisHref: string;
  depannageHref?: string;
  heroPhoto?: string;
  heroPhotoAlt?: string;
}

// ─── Component ───────────────────────────────────────────────────────────────

export function SectorPageTemplate({
  icon: Icon,
  category,
  headline,
  subheadline,
  description,
  services,
  challenges,
  benefits,
  faqs,
  ctaTitle,
  ctaDescription,
  ctaPrimaryLabel,
  ctaSecondaryLabel,
  devisHref,
  depannageHref,
  heroPhoto,
  heroPhotoAlt,
}: SectorPageProps) {
  return (
    <div>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative bg-steel-950 text-white py-20 md:py-28 overflow-hidden">
        {heroPhoto && (
          <div className="absolute inset-0">
            <Image
              src={heroPhoto}
              alt={heroPhotoAlt ?? category}
              fill
              priority
              quality={85}
              className="object-cover object-center"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-steel-950/95 via-steel-950/80 to-steel-950/50" />
          </div>
        )}
        <div className="container-page relative">
          {/* Breadcrumb */}
          <motion.nav
            className="flex items-center gap-2 text-steel-400 text-sm mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
          >
            <Link href="/" className="hover:text-white transition-colors">
              Accueil
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/secteurs" className="hover:text-white transition-colors">
              Secteurs
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-steel-300">{category}</span>
          </motion.nav>

          {/* Badge */}
          <motion.div
            className="flex items-center gap-3 mb-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15 }}
          >
            <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center">
              <Icon className="w-5 h-5 text-white" />
            </div>
            <span className="text-steel-400 text-sm font-medium uppercase tracking-wide">
              Secteur — {category}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-white mb-4 max-w-3xl leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            {headline}
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            className="text-xl text-steel-300 max-w-2xl leading-relaxed mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            {subheadline}
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
          >
            <Button asChild size="lg">
              <Link href={devisHref}>
                <FileText className="w-4 h-4" />
                Demander un devis gratuit
              </Link>
            </Button>
            {depannageHref && (
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10"
              >
                <Link href={depannageHref}>
                  <Zap className="w-4 h-4" />
                  Signaler une panne
                </Link>
              </Button>
            )}
            <a
              href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}
              className="inline-flex items-center gap-2 px-4 py-3 text-steel-300 hover:text-white transition-colors text-sm"
            >
              <Phone className="w-4 h-4" />
              {COMPANY.phone}
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── Quick value strip ────────────────────────────────────────────── */}
      <section className="py-5 bg-surface-subtle border-b border-border">
        <div className="container-page">
          <div className="flex flex-wrap gap-x-8 gap-y-2 justify-center sm:justify-start">
            {[
              { icon: Clock, label: "Qualification sous 1h" },
              { icon: CheckCircle2, label: "Technicien spécialisé par métier" },
              { icon: Sparkles, label: "Assistant IA disponible 24h/7j" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-2 text-sm text-steel-600"
              >
                <item.icon className="w-4 h-4 text-brand-500 shrink-0" />
                {item.label}
              </div>
            ))}
            <Link
              href={PAGES.public.assistant}
              className="flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors ml-auto"
            >
              <Sparkles className="w-4 h-4" />
              Diagnostiquer avec l&apos;IA
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Description ─────────────────────────────────────────────────── */}
      <section className="section-py bg-white">
        <div className="container-page">
          <motion.div
            className="max-w-3xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
          >
            <p className="text-sm font-semibold text-brand-600 uppercase tracking-wide mb-3">
              Votre profil
            </p>
            <h2 className="text-2xl font-bold text-steel-950 mb-4">
              Des solutions taillées pour vous
            </h2>
            <p className="text-steel-600 leading-relaxed text-base">{description}</p>
          </motion.div>
        </div>
      </section>

      {/* ── Services ────────────────────────────────────────────────────── */}
      <section className="section-py bg-surface-subtle border-y border-border">
        <div className="container-page">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="mb-8"
          >
            <p className="text-sm font-semibold text-brand-600 uppercase tracking-wide mb-3">
              Nos prestations
            </p>
            <h2 className="text-2xl font-bold text-steel-950">
              Ce que nous faisons pour vous
            </h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
          >
            {services.map((service) => {
              const ServiceIcon = service.icon;
              return (
                <motion.div key={service.href} variants={fadeUp}>
                  <Link
                    href={service.href}
                    className="group bg-white border border-border rounded-xl p-5 hover:border-brand-400 hover:shadow-sm transition-all flex flex-col h-full"
                  >
                    <div className="w-9 h-9 rounded-lg bg-brand-50 flex items-center justify-center mb-3 group-hover:bg-brand-100 transition-colors">
                      <ServiceIcon className="w-4 h-4 text-brand-600" />
                    </div>
                    <h3 className="font-semibold text-steel-900 mb-1.5 text-sm group-hover:text-brand-700 transition-colors">
                      {service.label}
                    </h3>
                    <p className="text-xs text-steel-500 leading-relaxed mb-3 flex-1">
                      {service.description}
                    </p>
                    <span className="inline-flex items-center gap-1 text-xs text-brand-600 font-medium group-hover:gap-2 transition-all">
                      En savoir plus <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── Challenges ──────────────────────────────────────────────────── */}
      <section className="section-py bg-white">
        <div className="container-page">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="mb-8"
          >
            <p className="text-sm font-semibold text-brand-600 uppercase tracking-wide mb-3">
              Vos enjeux
            </p>
            <h2 className="text-2xl font-bold text-steel-950">
              Ce que vous attendez de nous
            </h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
          >
            {challenges.map((c) => (
              <motion.div
                key={c.title}
                variants={fadeUp}
                className="flex gap-4 p-5 border border-border rounded-xl bg-surface-subtle"
              >
                <CheckCircle2 className="w-5 h-5 text-brand-500 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-steel-900 mb-1 text-sm">
                    {c.title}
                  </h3>
                  <p className="text-sm text-steel-500 leading-relaxed">
                    {c.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Benefits ────────────────────────────────────────────────────── */}
      <section className="section-py bg-steel-950 text-white">
        <div className="container-page">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="mb-8"
          >
            <p className="text-sm font-semibold text-brand-400 uppercase tracking-wide mb-3">
              Pourquoi ASO
            </p>
            <h2 className="text-2xl font-bold text-white">
              Nos atouts pour votre secteur
            </h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
          >
            {benefits.map((b) => (
              <motion.div
                key={b.title}
                variants={fadeUp}
                className="bg-steel-900 border border-steel-800 rounded-xl p-5"
              >
                <h3 className="font-semibold text-white mb-2 text-sm">{b.title}</h3>
                <p className="text-sm text-steel-400 leading-relaxed">
                  {b.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────────────── */}
      <section className="section-py bg-white">
        <div className="container-narrow">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="mb-8"
          >
            <p className="text-sm font-semibold text-brand-600 uppercase tracking-wide mb-3">
              Questions fréquentes
            </p>
            <h2 className="text-2xl font-bold text-steel-950">FAQ — {category}</h2>
          </motion.div>

          <motion.div
            className="space-y-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
          >
            {faqs.map((faq) => (
              <motion.div
                key={faq.question}
                variants={fadeUp}
                className="border border-border rounded-xl p-5"
              >
                <h3 className="font-semibold text-steel-900 mb-2 text-sm">
                  {faq.question}
                </h3>
                <p className="text-sm text-steel-500 leading-relaxed">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <CTASection
        title={ctaTitle}
        description={ctaDescription}
        primaryLabel={ctaPrimaryLabel}
        primaryHref={devisHref}
        secondaryLabel={ctaSecondaryLabel ?? "Nous contacter"}
        secondaryHref="/contact"
      />
    </div>
  );
}
