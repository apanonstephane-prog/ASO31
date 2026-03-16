import Link from "next/link";
import { Phone, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { COMPANY, PAGES } from "@/lib/constants";

interface CTASectionProps {
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  variant?: "dark" | "light";
  showAssistant?: boolean;
}

export function CTASection({
  title = "Un équipement en panne ? Une installation à prévoir ?",
  description = "Décrivez votre besoin en 2 minutes. On qualifie, on planifie, on intervient.",
  primaryLabel = "Demander un dépannage",
  primaryHref = PAGES.public.depannage,
  secondaryLabel = "Demander un devis",
  secondaryHref = PAGES.public.devis,
  variant = "dark",
  showAssistant = true,
}: CTASectionProps) {
  const isDark = variant === "dark";

  return (
    <section className={`section-py-sm ${isDark ? "bg-steel-950" : "bg-brand-700"}`}>
      <div className="container-page">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">{title}</h2>
            <p className="text-steel-300">{description}</p>
            {showAssistant && (
              <Link
                href={PAGES.public.assistant}
                className="inline-flex items-center gap-1.5 text-sm text-steel-400 hover:text-white transition-colors mt-3"
              >
                <Sparkles className="w-3.5 h-3.5 text-brand-400" />
                Vous hésitez ? L&apos;assistant IA qualifie votre besoin en quelques secondes
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <Button
              asChild
              size="lg"
              variant="default"
              className="bg-white text-brand-700 hover:bg-brand-50 shadow-md"
            >
              <Link href={primaryHref}>
                {primaryLabel}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 hover:border-white/50"
            >
              <Link href={secondaryHref}>{secondaryLabel}</Link>
            </Button>
            <a
              href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}
              className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm"
            >
              <Phone className="w-4 h-4" />
              <span>{COMPANY.phone}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
