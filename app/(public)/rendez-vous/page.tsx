import type { Metadata } from "next";
import { Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "Prendre rendez-vous — ASO31 Toulouse",
  description: "Planifiez une visite de diagnostic ou un entretien avec nos techniciens ASO31.",
};

export default function RendezVousPage() {
  return (
    <div className="min-h-screen bg-surface-subtle">
      <div className="bg-steel-950 text-white py-12">
        <div className="container-page">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 bg-brand-600 rounded-xl flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <span className="text-steel-400 text-sm font-medium">Rendez-vous</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Planifier une visite
          </h1>
          <p className="text-steel-300 max-w-xl">
            Visite de diagnostic, entretien annuel, devis sur site. Indiquez votre disponibilité,
            nous confirmons sous 24h.
          </p>
        </div>
      </div>

      <div className="container-page py-12 max-w-2xl">
        <div className="bg-white border border-border rounded-2xl p-8 shadow-soft text-center">
          <Calendar className="w-12 h-12 text-brand-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-steel-900 mb-2">Prise de rendez-vous en ligne</h2>
          <p className="text-steel-500 text-sm mb-6">
            La prise de rendez-vous en ligne est en cours d&apos;intégration. En attendant, contactez-nous par téléphone ou email.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="tel:0561324567" className="px-4 py-2.5 bg-brand-600 text-white rounded-lg text-sm font-medium hover:bg-brand-700 transition-colors">
              📞 05 61 32 45 67
            </a>
            <a href="mailto:contact@aso31.fr" className="px-4 py-2.5 border border-border text-steel-700 rounded-lg text-sm font-medium hover:bg-surface-subtle transition-colors">
              ✉️ contact@aso31.fr
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
