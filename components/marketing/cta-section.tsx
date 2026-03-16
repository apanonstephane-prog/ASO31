import Link from "next/link";
import { Phone, ArrowRight } from "lucide-react";
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
}

export function CTASection({
  title = "Un équipement en panne ? Une installation à prévoir ?",
  description = "Décrivez votre besoin en 2 minutes. On qualifie, on planifie, on intervient.",
  primaryLabel = "Demander un dépannage",
  primaryHref = PAGES.public.depannage,
  secondaryLabel = "Demander un devis",
  secondaryHref = PAGES.public.devis,
  variant = "dark",
}: CTASectionProps) {
  const isDark = variant === "dark";

  return (
    <section
      className={`section-py-sm ${isDark ? "bg-steel-950" : "bg-brand-700"}`}
    >
      <div className="container-page">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">{title}</h2>
            <p className="text-steel-300">{description}</p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <Button asChild size="lg" variant="default" className="bg-white text-brand-700 hover:bg-brand-50 shadow-md">
              <Link href={primaryHref}>
                {primaryLabel}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 hover:border-white/50">
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
