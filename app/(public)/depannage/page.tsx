import type { Metadata } from "next";
import { DepannageForm } from "@/components/forms/depannage-form";
import { Zap, Clock, Phone } from "lucide-react";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Demande de Dépannage — ASO31 Toulouse",
  description:
    "Signalez votre panne en 2 minutes. Qualifié, planifié, résolu. Dépannage automatisme, alarme, porte automatique et climatisation sur Toulouse.",
};

export default function DepannagePage() {
  return (
    <div className="min-h-screen bg-surface-subtle">
      {/* Page header */}
      <div className="bg-steel-950 text-white py-12">
        <div className="container-page">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 bg-accent-500 rounded-xl flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-steel-400 text-sm font-medium">Dépannage</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Signaler une panne
          </h1>
          <p className="text-steel-300 max-w-xl">
            Décrivez la situation en quelques étapes. Votre demande est qualifiée et transmise
            à notre équipe sous la prochaine heure ouvrée.
          </p>

          {/* Guarantees */}
          <div className="flex flex-wrap gap-4 mt-6">
            {[
              { icon: Clock, text: "Prise en charge sous 1h en heures ouvrées" },
              { icon: Phone, text: "Confirmation par téléphone ou email" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2 text-sm text-steel-400">
                <item.icon className="w-4 h-4 text-brand-400 shrink-0" />
                {item.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form area */}
      <div className="container-page py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-border rounded-2xl p-6 md:p-8 shadow-soft">
              <DepannageForm />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Urgent call */}
            <div className="bg-critical-50 border border-critical-200 rounded-xl p-5">
              <h3 className="font-semibold text-critical-700 mb-1.5 text-sm">Urgence critique ?</h3>
              <p className="text-sm text-critical-600 mb-3">
                Si la situation représente un risque de sécurité ou bloque totalement votre activité, appelez directement.
              </p>
              <a
                href={`tel:${COMPANY.phoneUrgency.replace(/\s/g, "")}`}
                className="inline-flex items-center gap-2 font-semibold text-critical-700 text-sm"
              >
                <Phone className="w-4 h-4" />
                {COMPANY.phoneUrgency}
              </a>
            </div>

            {/* Hours */}
            <div className="bg-white border border-border rounded-xl p-5">
              <h3 className="font-semibold text-steel-900 mb-3 text-sm">Délais d&apos;intervention</h3>
              <ul className="space-y-2 text-sm text-steel-600">
                <li className="flex justify-between">
                  <span>Critique / Sécurité</span>
                  <span className="font-medium text-critical-600">Le jour même</span>
                </li>
                <li className="flex justify-between">
                  <span>Bloquant</span>
                  <span className="font-medium text-amber-600">24 à 48h</span>
                </li>
                <li className="flex justify-between">
                  <span>Gênant</span>
                  <span className="font-medium text-steel-700">48 à 72h</span>
                </li>
                <li className="flex justify-between">
                  <span>Non bloquant</span>
                  <span className="font-medium text-steel-500">Selon agenda</span>
                </li>
              </ul>
              <p className="text-xs text-steel-400 mt-3 pt-3 border-t border-border">
                Les délais indiqués sont en heures ouvrées. Pour les contrats avec SLA, les engagements définis au contrat s&apos;appliquent.
              </p>
            </div>

            {/* AI assistant */}
            <div className="bg-brand-50 border border-brand-100 rounded-xl p-5">
              <h3 className="font-semibold text-brand-700 mb-1.5 text-sm">Vous ne savez pas quelle catégorie ?</h3>
              <p className="text-sm text-brand-600 mb-3">
                Notre assistant IA peut vous aider à identifier l&apos;équipement et préparer votre demande.
              </p>
              <a
                href="/assistant"
                className="text-sm font-semibold text-brand-700 hover:text-brand-800 transition-colors"
              >
                Utiliser l&apos;assistant →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
