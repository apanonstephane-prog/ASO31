import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    author: "M. Bourdeau",
    company: "Gérant — Pharmacie des Minimes, Toulouse",
    rating: 5,
    content:
      "La porte automatique de l'officine s'est bloquée un lundi matin. Intervention dans la matinée, panne résolue avant l'affluence de midi. La qualité du suivi via l'espace client est vraiment appréciable.",
  },
  {
    author: "Sophie Maurel",
    company: "Gestionnaire — Syndic Immo Toulouse Sud",
    rating: 5,
    content:
      "Nous gérons une quarantaine de copropriétés avec différents équipements de sécurité et d'accès. ASO31 gère nos contrats d'entretien depuis trois ans. Le suivi est structuré, les rapports sont clairs, les techniciens sont compétents.",
  },
  {
    author: "Arnaud Tissier",
    company: "Responsable logistique — Entrepôt Portet-sur-Garonne",
    rating: 5,
    content:
      "Portail coulissant en panne un vendredi soir — nos camions ne pouvaient plus sortir. Astreinte jointe rapidement, diagnostic envoyé avec photos. La pièce était commandée le soir, intervention le lendemain matin.",
  },
  {
    author: "Céline Farnier",
    company: "Particulier — Balma",
    rating: 4,
    content:
      "J'ai utilisé l'assistant pour décrire la panne de mon portail. La réponse était claire et structurée, le technicien est venu préparé. Pour la première fois, un prestataire est venu avec la pièce dès la première visite.",
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

export function Testimonials() {
  return (
    <section className="section-py bg-surface-subtle border-y border-border">
      <div className="container-page">
        <div className="mb-12">
          <p className="text-sm font-semibold text-brand-600 uppercase tracking-wide mb-2">
            Retours clients
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-steel-950 mb-4">
            Ce que disent nos clients
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {TESTIMONIALS.map((t) => (
            <blockquote
              key={t.author}
              className="bg-white border border-border rounded-xl p-6 flex flex-col gap-4"
            >
              <StarRating count={t.rating} />
              <p className="text-steel-700 leading-relaxed text-sm">
                &ldquo;{t.content}&rdquo;
              </p>
              <footer className="pt-2 border-t border-border">
                <p className="font-semibold text-steel-900 text-sm">{t.author}</p>
                <p className="text-steel-400 text-xs mt-0.5">{t.company}</p>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
