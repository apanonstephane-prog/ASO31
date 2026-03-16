import Link from "next/link";
import { LucideIcon, ArrowRight, CheckCircle2, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CTASection } from "./cta-section";
import { COMPANY } from "@/lib/constants";

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
  benefits: Array<{ title: string; description: string }>;
  faqs: FAQ[];
  depannageHref: string;
  devisHref: string;
}

export function ServicePageTemplate({
  icon: Icon,
  category,
  headline,
  subheadline,
  description,
  scope,
  benefits,
  faqs,
  depannageHref,
  devisHref,
}: ServicePageProps) {
  return (
    <div>
      {/* Hero */}
      <section className="bg-steel-950 text-white py-20 md:py-28">
        <div className="container-page">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center">
              <Icon className="w-5 h-5 text-white" />
            </div>
            <span className="text-steel-400 text-sm font-medium">{category}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 max-w-3xl leading-tight">
            {headline}
          </h1>
          <p className="text-xl text-steel-300 max-w-2xl leading-relaxed mb-8">{subheadline}</p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href={depannageHref}>Demander un dépannage</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
              <Link href={devisHref}>Demander un devis</Link>
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

      {/* Description + scope */}
      <section className="section-py bg-white">
        <div className="container-page">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <p className="text-sm font-semibold text-brand-600 uppercase tracking-wide mb-3">Notre intervention</p>
              <h2 className="text-2xl font-bold text-steel-950 mb-4">Ce que nous traitons</h2>
              <p className="text-steel-600 leading-relaxed text-base mb-6">{description}</p>
            </div>
            <div className="bg-surface-subtle border border-border rounded-xl p-6">
              <h3 className="font-semibold text-steel-900 mb-4 text-sm uppercase tracking-wide">Équipements concernés</h3>
              <ul className="space-y-2.5">
                {scope.map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-steel-600">
                    <CheckCircle2 className="w-4 h-4 text-brand-500 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-4 border-t border-border">
                <Button asChild className="w-full" size="sm">
                  <Link href={depannageHref}>
                    Signaler une panne
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-py bg-surface-subtle border-y border-border">
        <div className="container-page">
          <p className="text-sm font-semibold text-brand-600 uppercase tracking-wide mb-3">Bénéfices clients</p>
          <h2 className="text-2xl font-bold text-steel-950 mb-8">Pourquoi faire appel à nous</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b) => (
              <div key={b.title} className="bg-white border border-border rounded-xl p-5">
                <h3 className="font-semibold text-steel-900 mb-2 text-sm">{b.title}</h3>
                <p className="text-sm text-steel-500 leading-relaxed">{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-py bg-white">
        <div className="container-narrow">
          <p className="text-sm font-semibold text-brand-600 uppercase tracking-wide mb-3">Questions fréquentes</p>
          <h2 className="text-2xl font-bold text-steel-950 mb-8">FAQ</h2>
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
        title="Une question ou une intervention à planifier ?"
        description="Nos équipes sont disponibles pour vous répondre et organiser la prochaine étape."
        primaryLabel="Demander un dépannage"
        primaryHref={depannageHref}
        secondaryLabel="Demander un devis"
        secondaryHref={devisHref}
      />
    </div>
  );
}
