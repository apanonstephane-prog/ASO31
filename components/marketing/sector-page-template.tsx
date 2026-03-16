import Link from "next/link";
import Image from "next/image";
import { LucideIcon, ArrowRight, CheckCircle2, Phone, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CTASection } from "./cta-section";
import { COMPANY } from "@/lib/constants";

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
            <div className="absolute inset-0 bg-gradient-to-r from-steel-950/95 via-steel-950/80 to-steel-950/50" />
          </div>
        )}
        <div className="container-page relative">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-steel-400 text-sm mb-8">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/secteurs" className="hover:text-white transition-colors">Secteurs</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-steel-300">{category}</span>
          </nav>

          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center">
              <Icon className="w-5 h-5 text-white" />
            </div>
            <span className="text-steel-400 text-sm font-medium uppercase tracking-wide">Secteur — {category}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 max-w-3xl leading-tight">
            {headline}
          </h1>
          <p className="text-xl text-steel-300 max-w-2xl leading-relaxed mb-8">{subheadline}</p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href={devisHref}>Demander un devis gratuit</Link>
            </Button>
            {depannageHref && (
              <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                <Link href={depannageHref}>Signaler une panne</Link>
              </Button>
            )}
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

      {/* Description */}
      <section className="section-py bg-white">
        <div className="container-page">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-brand-600 uppercase tracking-wide mb-3">Votre profil</p>
            <h2 className="text-2xl font-bold text-steel-950 mb-4">Des solutions taillées pour vous</h2>
            <p className="text-steel-600 leading-relaxed text-base">{description}</p>
          </div>
        </div>
      </section>

      {/* Services for this sector */}
      <section className="section-py bg-surface-subtle border-y border-border">
        <div className="container-page">
          <p className="text-sm font-semibold text-brand-600 uppercase tracking-wide mb-3">Nos prestations</p>
          <h2 className="text-2xl font-bold text-steel-950 mb-8">Ce que nous faisons pour vous</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((service) => {
              const ServiceIcon = service.icon;
              return (
                <Link
                  key={service.href}
                  href={service.href}
                  className="group bg-white border border-border rounded-xl p-5 hover:border-brand-400 hover:shadow-sm transition-all"
                >
                  <div className="w-9 h-9 rounded-lg bg-brand-50 flex items-center justify-center mb-3 group-hover:bg-brand-100 transition-colors">
                    <ServiceIcon className="w-4.5 h-4.5 text-brand-600" />
                  </div>
                  <h3 className="font-semibold text-steel-900 mb-1.5 text-sm group-hover:text-brand-700 transition-colors">
                    {service.label}
                  </h3>
                  <p className="text-xs text-steel-500 leading-relaxed mb-3">{service.description}</p>
                  <span className="inline-flex items-center gap-1 text-xs text-brand-600 font-medium group-hover:gap-2 transition-all">
                    En savoir plus <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Challenges */}
      <section className="section-py bg-white">
        <div className="container-page">
          <p className="text-sm font-semibold text-brand-600 uppercase tracking-wide mb-3">Vos enjeux</p>
          <h2 className="text-2xl font-bold text-steel-950 mb-8">Ce que vous attendez de nous</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {challenges.map((c) => (
              <div key={c.title} className="flex gap-4 p-5 border border-border rounded-xl bg-surface-subtle">
                <CheckCircle2 className="w-5 h-5 text-brand-500 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-steel-900 mb-1 text-sm">{c.title}</h3>
                  <p className="text-sm text-steel-500 leading-relaxed">{c.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-py bg-steel-950 text-white">
        <div className="container-page">
          <p className="text-sm font-semibold text-brand-400 uppercase tracking-wide mb-3">Pourquoi ASO</p>
          <h2 className="text-2xl font-bold text-white mb-8">Nos atouts pour votre secteur</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {benefits.map((b) => (
              <div key={b.title} className="bg-steel-900 border border-steel-800 rounded-xl p-5">
                <h3 className="font-semibold text-white mb-2 text-sm">{b.title}</h3>
                <p className="text-sm text-steel-400 leading-relaxed">{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-py bg-white">
        <div className="container-narrow">
          <p className="text-sm font-semibold text-brand-600 uppercase tracking-wide mb-3">Questions fréquentes</p>
          <h2 className="text-2xl font-bold text-steel-950 mb-8">FAQ — {category}</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.question} className="border border-border rounded-xl p-5">
                <h3 className="font-semibold text-steel-900 mb-2 text-sm">{faq.question}</h3>
                <p className="text-sm text-steel-500 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
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
