import { DashboardTopbar } from "@/components/layout/dashboard-topbar";
import { KPICard } from "@/components/dashboard/kpi-card";
import { ANALYTICS_MINI } from "@/lib/data/mock-dashboard";
import { BarChart2, TrendingUp, Clock, CheckCircle2 } from "lucide-react";

const KPIS = [
  { label: "Tickets ce mois", value: "87", delta: "+12 vs mois préc.", deltaType: "increase" as const, description: "" },
  { label: "Délai moyen prise en charge", value: "2.8h", delta: "-0.4h", deltaType: "decrease" as const, description: "Heures ouvrées" },
  { label: "Taux 1er passage", value: "78%", delta: "+3%", deltaType: "increase" as const, description: "Résolution immédiate" },
  { label: "Délai moyen clôture", value: "3.2j", delta: "+0.1j", deltaType: "increase" as const, description: "Jours ouvrés" },
  { label: "Tickets récurrents", value: "9%", delta: "Mêmes équipements", deltaType: "neutral" as const, description: "" },
  { label: "Contrats actifs", value: "34", delta: "2 à renouveler", deltaType: "neutral" as const, description: "Ce trimestre" },
];

const TOP_ISSUES = [
  { issue: "Fin de course portail mal positionné", count: 8, category: "Automatismes" },
  { issue: "Filtre climatisation encrassé", count: 6, category: "Climatisation" },
  { issue: "Télécommande / pile / récepteur radio", count: 5, category: "Automatismes" },
  { issue: "Déclenchement intempestif alarme", count: 4, category: "Alarme" },
  { issue: "Cellule photoélectrique désalignée", count: 4, category: "Portes Auto" },
  { issue: "Batterie de secours à remplacer", count: 3, category: "Alarme" },
];

export default function AnalyticsPage() {
  return (
    <div className="flex-1 overflow-y-auto">
      <DashboardTopbar title="Analytics" subtitle="Pilotage performance SAV" />

      <div className="p-6 space-y-6">
        {/* KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
          {KPIS.map((kpi) => (
            <KPICard key={kpi.label} {...kpi} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Volume par catégorie */}
          <div className="bg-white border border-border rounded-xl p-5">
            <h3 className="font-semibold text-steel-900 text-sm mb-4">
              Répartition tickets par service — Ce mois
            </h3>
            <div className="space-y-3">
              {ANALYTICS_MINI.ticketsByCategory.map((item) => {
                const maxCount = Math.max(...ANALYTICS_MINI.ticketsByCategory.map((i) => i.count));
                const pct = (item.count / maxCount) * 100;
                return (
                  <div key={item.category} className="flex items-center gap-3">
                    <span className="text-sm text-steel-600 w-32 shrink-0">{item.category}</span>
                    <div className="flex-1 bg-steel-100 rounded-full h-2">
                      <div
                        className="h-2 rounded-full transition-all duration-500"
                        style={{ width: `${pct}%`, backgroundColor: item.color }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-steel-700 w-6 shrink-0 text-right">{item.count}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Top pannes */}
          <div className="bg-white border border-border rounded-xl p-5">
            <h3 className="font-semibold text-steel-900 text-sm mb-4">
              Top pannes récurrentes
            </h3>
            <div className="space-y-2">
              {TOP_ISSUES.map((issue, i) => (
                <div key={issue.issue} className="flex items-center gap-3 py-1.5 border-b border-border last:border-0">
                  <span className="text-xs font-bold text-steel-300 w-4">{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-steel-700 truncate">{issue.issue}</p>
                    <p className="text-xs text-steel-400">{issue.category}</p>
                  </div>
                  <span className="text-sm font-semibold text-steel-600 shrink-0">{issue.count}x</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Volume hebdomadaire */}
        <div className="bg-white border border-border rounded-xl p-5">
          <h3 className="font-semibold text-steel-900 text-sm mb-4">Volume tickets — 6 derniers jours</h3>
          <div className="flex items-end gap-3 h-24">
            {ANALYTICS_MINI.weeklyVolume.map((day) => {
              const maxVal = Math.max(...ANALYTICS_MINI.weeklyVolume.map((d) => d.tickets));
              const heightPct = (day.tickets / maxVal) * 100;
              return (
                <div key={day.day} className="flex flex-col items-center gap-1.5 flex-1">
                  <span className="text-xs font-semibold text-steel-700">{day.tickets}</span>
                  <div
                    className="w-full bg-brand-500 rounded-t-sm transition-all duration-500"
                    style={{ height: `${heightPct}%` }}
                  />
                  <span className="text-xs text-steel-400">{day.day}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
