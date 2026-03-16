import { Star, Clock, CheckCircle2, Building2 } from "lucide-react";

interface CaseStudy {
  author: string;
  role: string;
  company: string;
  sector: string;
  rating: number;
  problem: string;
  context: string;
  action: string;
  result: string;
  quote: string;
  isCase: true;
}

interface SimpleTestimonial {
  author: string;
  role: string;
  company: string;
  sector: string;
  rating: number;
  quote: string;
  isCase?: false;
}

type Testimonial = CaseStudy | SimpleTestimonial;

const TESTIMONIALS: Testimonial[] = [
  {
    author: "Arnaud Tissier",
    role: "Responsable logistique",
    company: "Entrepôt Portet-sur-Garonne",
    sector: "Logistique",
    rating: 5,
    problem: "Portail coulissant en panne un vendredi soir",
    context:
      "Nos camions ne pouvaient plus sortir — blocage complet de l'activité.",
    action:
      "Ticket créé via l'assistant, astreinte jointe, diagnostic transmis avec photos. Pièce commandée le soir même.",
    result: "Intervention le lendemain matin — activité reprise sans perte.",
    quote:
      "Pour la première fois, le prestataire est arrivé avec la bonne pièce dès le premier passage.",
    isCase: true,
  },
  {
    author: "M. Bourdeau",
    role: "Gérant",
    company: "Pharmacie des Minimes",
    sector: "Santé · Commerce",
    rating: 5,
    problem: "Porte automatique bloquée un lundi matin",
    context: "Accueil impossible, patients bloqués dès l'ouverture.",
    action:
      "Ticket prioritaire, technicien dispatché depuis le planning en ligne.",
    result:
      "Intervention dans la matinée, panne résolue avant l'affluence de midi.",
    quote:
      "Réactifs, préparés. La qualité du suivi via l'espace client est vraiment appréciable.",
    isCase: true,
  },
  {
    author: "Sophie Maurel",
    role: "Gestionnaire",
    company: "Syndic Immo Toulouse Sud",
    sector: "Syndic · Copropriété",
    rating: 5,
    quote:
      "Nous gérons une quarantaine de copropriétés. ASO31 gère nos contrats depuis trois ans. Le suivi est structuré, les rapports sont clairs, les techniciens sont compétents.",
    isCase: false,
  },
  {
    author: "Céline Farnier",
    role: "Particulier",
    company: "Balma",
    sector: "Résidentiel",
    rating: 4,
    quote:
      "J'ai utilisé l'assistant pour décrire la panne de mon portail. La réponse était claire, le technicien est venu préparé. Première fois qu'un prestataire arrive avec la pièce dès la première visite.",
    isCase: false,
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < count ? "text-amber-400 fill-amber-400" : "text-steel-200"}`}
        />
      ))}
    </div>
  );
}

function CaseStudyCard({ t }: { t: CaseStudy }) {
  return (
    <div className="bg-white border border-border rounded-xl overflow-hidden flex flex-col">
      {/* Header */}
      <div className="bg-steel-950 px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Building2 className="w-3.5 h-3.5 text-steel-400" />
          <span className="text-xs text-steel-400 font-medium">{t.sector}</span>
        </div>
        <StarRating count={t.rating} />
      </div>

      <div className="p-5 flex flex-col flex-1 gap-4">
        {/* Case details */}
        <div className="space-y-2">
          <div className="flex items-start gap-2.5">
            <div className="w-6 h-6 rounded-lg bg-red-50 flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-red-600 text-xs font-bold">!</span>
            </div>
            <div>
              <p className="text-xs font-semibold text-steel-500 uppercase tracking-wide mb-0.5">
                Problème
              </p>
              <p className="text-sm font-medium text-steel-900">{t.problem}</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <div className="w-6 h-6 rounded-lg bg-steel-100 flex items-center justify-center shrink-0 mt-0.5">
              <Clock className="w-3 h-3 text-steel-600" />
            </div>
            <div>
              <p className="text-xs font-semibold text-steel-500 uppercase tracking-wide mb-0.5">
                Contexte
              </p>
              <p className="text-sm text-steel-600">{t.context}</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <div className="w-6 h-6 rounded-lg bg-brand-50 flex items-center justify-center shrink-0 mt-0.5">
              <CheckCircle2 className="w-3 h-3 text-brand-600" />
            </div>
            <div>
              <p className="text-xs font-semibold text-steel-500 uppercase tracking-wide mb-0.5">
                Résultat
              </p>
              <p className="text-sm font-medium text-steel-900">{t.result}</p>
            </div>
          </div>
        </div>

        {/* Quote */}
        <blockquote className="border-l-2 border-brand-200 pl-4 mt-auto">
          <p className="text-sm text-steel-600 italic leading-relaxed">
            &ldquo;{t.quote}&rdquo;
          </p>
          <footer className="mt-2">
            <p className="text-xs font-semibold text-steel-900">{t.author}</p>
            <p className="text-xs text-steel-400">
              {t.role} — {t.company}
            </p>
          </footer>
        </blockquote>
      </div>
    </div>
  );
}

function SimpleCard({ t }: { t: SimpleTestimonial }) {
  return (
    <blockquote className="bg-white border border-border rounded-xl p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <StarRating count={t.rating} />
        <span className="text-xs text-steel-400 bg-steel-50 border border-steel-100 px-2 py-0.5 rounded-full">
          {t.sector}
        </span>
      </div>
      <p className="text-steel-700 leading-relaxed text-sm flex-1">
        &ldquo;{t.quote}&rdquo;
      </p>
      <footer className="pt-3 border-t border-border">
        <p className="font-semibold text-steel-900 text-sm">{t.author}</p>
        <p className="text-steel-400 text-xs mt-0.5">
          {t.role} — {t.company}
        </p>
      </footer>
    </blockquote>
  );
}

export function Testimonials() {
  return (
    <section className="section-py bg-surface-subtle border-y border-border">
      <div className="container-page">
        <div className="mb-10">
          <p className="text-sm font-semibold text-brand-600 uppercase tracking-wide mb-2">
            Retours clients
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-steel-950 mb-3">
            Ce que disent nos clients
          </h2>
          <p className="text-steel-500 max-w-xl">
            Des situations réelles, des délais concrets, des résultats
            opérationnels.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {TESTIMONIALS.map((t) =>
            t.isCase ? (
              <CaseStudyCard key={t.author} t={t} />
            ) : (
              <SimpleCard key={t.author} t={t as SimpleTestimonial} />
            )
          )}
        </div>
      </div>
    </section>
  );
}
