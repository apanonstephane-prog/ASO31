import Link from "next/link";
import Image from "next/image";
import {
  LucideIcon,
  ArrowRight,
  CheckCircle2,
  Phone,
  AlertTriangle,
  Sparkles,
  Zap,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CTASection } from "./cta-section";
import { COMPANY, PAGES } from "@/lib/constants";

interface FAQ {
  question: string;
  answer: string;
}

interface ServicePageProps {
  icon: LucideIcon;
  category: string;
  headline: string;
  subheadline: string;
  description: string;
  scope: string[];
  symptoms?: string[];
  contexts?: string[];
  benefits: Array<{ title: string; description: string }>;
  faqs: FAQ[];
  depannageHref: string;
  devisHref: string;
  heroPhoto?: string;
  heroPhotoAlt?: string;
}

export function ServicePageTemplate({
  icon: Icon,
  category,
  headline,
  subheadline,
  description,
  scope,
  symptoms,
  contexts,
  benefits,
  faqs,
  depannageHref,
  devisHref,
  heroPhoto,
  heroPhotoAlt,
}: ServicePageProps) {
  return (
    <div>
      {/* Hero */}
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
            <div className="absolute inset-0 bg-gradient-to-r from-steel-950/95 via-steel-950/75 to-steel-950/40" />
          </div>
        )}
        <div className="container-page relative">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center">
              <Icon className="w-5 h-5 text-white" />
            </div>
            <span className="text-steel-400 text-sm font-medium">{category}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 max-w-3xl leading-tight">
            {headline}
          </h1>
          <p className="text-xl text-steel-300 max-w-2xl leading-relaxed mb-8">
            {subheadline}
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href={depannageHref}>
                <Zap className="w-4 h-4" />
                Demander un dépannage
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10"
            >
              <Link href={devisHref}>
                <FileText className="w-4 h-4" />
                Demander un devis
              </Link>
            </Button>
            <a
              href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}
              className="inline-flex items-center gap-2 px-4 py-3 text-steel-300 hover:text-white transition-colors text-sm"
            >
              <Phone className="w-4 h-4" />
              {COMPANY.phone}
            </a>
          </div>
        </div>
      </section>

      {/* Symptoms — if provided */}
      {symptoms && symptoms.length > 0 && (
        <section className="py-8 bg-amber-50 border-b border-amber-100">
          <div className="container-page">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 shrink-0">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span className="text-sm font-semibold text-amber-800">
                  Symptômes fréquents :
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {symptoms.map((s) => (
                  <Link
                    key={s}
                    href={depannageHref}
                    className="text-xs px-3 py-1.5 bg-white border border-amber-200 text-amber-800 rounded-full hover:bg-amber-100 hover:border-amber-300 transition-colors font-medium"
                  >
                    → {s}
                  </Link>
                ))}
              </div>
              <Link
                href={PAGES.public.assistant}
                className="ml-auto flex items-center gap-1.5 text-xs text-brand-600 hover:text-brand-700 font-medium shrink-0 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Diagnostiquer avec l&apos;IA
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Description + scope + sidebar */}
      <section className="section-py bg-white">
        <div className="container-page">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <p className="text-sm font-semibold text-brand-600 uppercase tracking-wide mb-3">
                Notre intervention
              </p>
              <h2 className="text-2xl font-bold text-steel-950 mb-4">
                Ce que nous traitons
              </h2>
              <p className="text-steel-600 leading-relaxed text-base mb-6">
                {description}
              </p>

              {/* Contexts */}
              {contexts && contexts.length > 0 && (
                <div className="mt-6">
                  <p className="text-xs font-semibold text-steel-500 uppercase tracking-wide mb-3">
                    Contextes d&apos;intervention
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {contexts.map((c) => (
                      <span
                        key={c}
                        className="text-xs px-3 py-1.5 bg-steel-50 border border-steel-200 text-steel-700 rounded-full"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {/* Scope */}
              <div className="bg-surface-subtle border border-border rounded-xl p-6">
                <h3 className="font-semibold text-steel-900 mb-4 text-sm uppercase tracking-wide">
                  Équipements concernés
                </h3>
                <ul className="space-y-2.5">
                  {scope.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2.5 text-sm text-steel-600"
                    >
                      <CheckCircle2 className="w-4 h-4 text-brand-500 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 pt-4 border-t border-border">
                  <Button asChild className="w-full" size="sm">
                    <Link href={depannageHref}>
                      Signaler une panne
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </div>

              {/* AI assistant teaser */}
              <div className="bg-brand-50 border border-brand-100 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-brand-600" />
                  <p className="text-sm font-semibold text-brand-800">
                    Vous ne savez pas quelle panne ?
                  </p>
                </div>
                <p className="text-xs text-brand-700 mb-3 leading-relaxed">
                  Notre assistant IA identifie l&apos;équipement, les causes
                  probables et prépare votre ticket en quelques secondes.
                </p>
                <Link
                  href={PAGES.public.assistant}
                  className="text-xs font-semibold text-brand-700 hover:text-brand-800 transition-colors inline-flex items-center gap-1"
                >
                  Essayer l&apos;assistant
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Phone */}
              <div className="bg-steel-950 rounded-xl p-4 text-center">
                <p className="text-xs text-steel-400 mb-1">Urgence ? Appelez directement</p>
                <a
                  href={`tel:${COMPANY.phoneUrgency.replace(/\s/g, "")}`}
                  className="text-white font-bold text-base hover:text-brand-300 transition-colors"
                >
                  {COMPANY.phoneUrgency}
                </a>
                <p className="text-xs text-steel-500 mt-1">
                  Astreinte pour les contrats actifs
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-py bg-surface-subtle border-y border-border">
        <div className="container-page">
          <p className="text-sm font-semibold text-brand-600 uppercase tracking-wide mb-3">
            Bénéfices clients
          </p>
          <h2 className="text-2xl font-bold text-steel-950 mb-8">
            Pourquoi faire appel à nous
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="bg-white border border-border rounded-xl p-5"
              >
                <h3 className="font-semibold text-steel-900 mb-2 text-sm">
                  {b.title}
                </h3>
                <p className="text-sm text-steel-500 leading-relaxed">
                  {b.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-py bg-white">
        <div className="container-narrow">
          <p className="text-sm font-semibold text-brand-600 uppercase tracking-wide mb-3">
            Questions fréquentes
          </p>
          <h2 className="text-2xl font-bold text-steel-950 mb-8">FAQ</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="border border-border rounded-xl p-5"
              >
                <h3 className="font-semibold text-steel-900 mb-2 text-sm">
                  {faq.question}
                </h3>
                <p className="text-sm text-steel-500 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Une question ou une intervention à planifier ?"
        description="Nos équipes sont disponibles pour qualifier votre besoin et organiser la prochaine étape."
        primaryLabel="Demander un dépannage"
        primaryHref={depannageHref}
        secondaryLabel="Demander un devis"
        secondaryHref={devisHref}
      />
    </div>
  );
}
