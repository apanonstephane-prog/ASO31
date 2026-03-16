import type { Metadata } from "next";
import { FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Demande de Devis — ASO31 Toulouse",
  description:
    "Demandez un devis gratuit pour une installation ou remplacement d'équipement technique sur Toulouse.",
};

export default function DevisPage() {
  return (
    <div className="min-h-screen bg-surface-subtle">
      <div className="bg-steel-950 text-white py-12">
        <div className="container-page">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 bg-brand-600 rounded-xl flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="text-steel-400 text-sm font-medium">Devis</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Demander un devis
          </h1>
          <p className="text-steel-300 max-w-xl">
            Installation, remplacement ou extension d&apos;équipement. Décrivez votre projet,
            nous vous contactons sous 24h avec une proposition.
          </p>
        </div>
      </div>

      <div className="container-page py-12">
        <div className="max-w-2xl mx-auto bg-white border border-border rounded-2xl p-8 shadow-soft">
          <p className="text-steel-500 text-sm mb-6">
            Formulaire de devis en cours de mise en ligne. En attendant, contactez-nous directement :
          </p>
          <div className="space-y-3">
            <a href="tel:0561324567" className="flex items-center gap-2 text-brand-700 font-medium">
              📞 05 61 32 45 67
            </a>
            <a href="mailto:contact@aso31.fr" className="flex items-center gap-2 text-brand-700 font-medium">
              ✉️ contact@aso31.fr
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
