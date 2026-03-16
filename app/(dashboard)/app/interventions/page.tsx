import { DashboardTopbar } from "@/components/layout/dashboard-topbar";
import { InterventionStatusBadge } from "@/components/ui/status-badge";
import { formatDate } from "@/lib/utils";
import { Clock } from "lucide-react";

const MOCK_INTERVENTIONS = [
  {
    id: "INT-2503-018",
    reference: "INT-2503-018",
    description: "Diagnostic portail coulissant bloqué — inspection rail + galets",
    technician: "Marc Delville",
    site: "Entrepôt Portet SAS",
    category: "AUTOMATION",
    status: "EN_ROUTE",
    scheduledAt: new Date(Date.now() + 60 * 60 * 1000),
    duration: null,
    report: null,
  },
  {
    id: "INT-2503-017",
    reference: "INT-2503-017",
    description: "Remplacement cellule photoélectrique porte piétonne",
    technician: "Sophie Renard",
    site: "Pharmacie des Minimes",
    category: "AUTOMATIC_DOORS",
    status: "ON_SITE",
    scheduledAt: new Date(Date.now() - 30 * 60 * 1000),
    duration: null,
    report: null,
  },
  {
    id: "INT-2503-016",
    reference: "INT-2503-016",
    description: "Diagnostic clim split mural Daikin — contrôle pressions",
    technician: "Pierre Fontaine",
    site: "Cabinet Conseil Galia",
    category: "CLIMATISATION",
    status: "PLANNED",
    scheduledAt: new Date(Date.now() + 2 * 60 * 60 * 1000),
    duration: null,
    report: null,
  },
  {
    id: "INT-2503-010",
    reference: "INT-2503-010",
    description: "Entretien annuel centrale alarme Ajax Hub 2",
    technician: "Kevin Lamothe",
    site: "Pharmacie des Minimes",
    category: "ALARM_SECURITY",
    status: "COMPLETED",
    scheduledAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    duration: 90,
    report: "Entretien effectué : test complet des zones, remplacement batterie de secours, mise à jour firmware. Système opérationnel. Prochain entretien dans 12 mois.",
  },
  {
    id: "INT-2503-008",
    reference: "INT-2503-008",
    description: "Réglage fin de course barrière levante Nice WA5",
    technician: "Marc Delville",
    site: "Résidence Le Clos des Pins",
    category: "AUTOMATION",
    status: "TO_RESCHEDULE",
    scheduledAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    duration: 45,
    report: "Fin de course réajusté — récurrence observée. Suspicion amortisseur bras. Pièce commandée. Reprogrammer pour remplacement.",
  },
];

const CAT_LABELS: Record<string, string> = {
  AUTOMATION: "Automatismes",
  AUTOMATIC_DOORS: "Portes Auto",
  ALARM_SECURITY: "Alarme",
  CLIMATISATION: "Climatisation",
  MAINTENANCE_REPAIR: "Maintenance",
};

export default function InterventionsPage() {
  return (
    <div className="flex-1 overflow-y-auto">
      <DashboardTopbar title="Interventions" subtitle="Suivi des interventions techniciens" />

      <div className="p-6 space-y-3">
        {MOCK_INTERVENTIONS.map((intv) => (
          <div key={intv.id} className="bg-white border border-border rounded-xl p-5">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs text-steel-400">{intv.reference}</span>
                  <span className="text-xs text-brand-600 font-medium">{CAT_LABELS[intv.category]}</span>
                </div>
                <h3 className="font-semibold text-steel-900 text-sm">{intv.description}</h3>
                <p className="text-xs text-steel-400 mt-0.5">
                  {intv.technician} · {intv.site}
                </p>
              </div>
              <InterventionStatusBadge status={intv.status as never} />
            </div>

            <div className="flex flex-wrap gap-4 text-xs text-steel-500">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {formatDate(intv.scheduledAt)}
              </span>
              {intv.duration && (
                <span className="flex items-center gap-1">
                  Durée : {intv.duration} min
                </span>
              )}
            </div>

            {intv.report && (
              <div className="mt-3 pt-3 border-t border-border">
                <p className="text-xs font-semibold text-steel-500 uppercase tracking-wide mb-1">Compte rendu</p>
                <p className="text-sm text-steel-600 leading-relaxed">{intv.report}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
