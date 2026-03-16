import { DashboardTopbar } from "@/components/layout/dashboard-topbar";
import { CheckCircle2, Circle } from "lucide-react";

const MOCK_TECHNICIENS = [
  {
    id: "T001",
    name: "Marc Delville",
    initials: "MD",
    specialties: ["AUTOMATION"],
    zones: ["Portet-sur-Garonne", "Muret", "Toulouse Sud"],
    interventionsThisMonth: 18,
    firstPassRate: 82,
    isAvailable: true,
    todayInterventions: 3,
  },
  {
    id: "T002",
    name: "Sophie Renard",
    initials: "SR",
    specialties: ["AUTOMATIC_DOORS"],
    zones: ["Toulouse Centre", "Toulouse Nord"],
    interventionsThisMonth: 14,
    firstPassRate: 79,
    isAvailable: true,
    todayInterventions: 2,
  },
  {
    id: "T003",
    name: "Pierre Fontaine",
    initials: "PF",
    specialties: ["CLIMATISATION"],
    zones: ["Toulouse", "Blagnac", "Colomiers"],
    interventionsThisMonth: 16,
    firstPassRate: 75,
    isAvailable: true,
    todayInterventions: 2,
  },
  {
    id: "T004",
    name: "Kevin Lamothe",
    initials: "KL",
    specialties: ["ALARM_SECURITY"],
    zones: ["Toulouse", "Balma", "Ramonville"],
    interventionsThisMonth: 11,
    firstPassRate: 88,
    isAvailable: false,
    todayInterventions: 1,
  },
];

const SPECIALTY_LABELS: Record<string, string> = {
  AUTOMATION: "Automatismes",
  AUTOMATIC_DOORS: "Portes automatiques",
  ALARM_SECURITY: "Alarme & Sécurité",
  CLIMATISATION: "Climatisation",
  MAINTENANCE_REPAIR: "Maintenance",
};

export default function TechniciensPage() {
  return (
    <div className="flex-1 overflow-y-auto">
      <DashboardTopbar title="Techniciens" subtitle="Gestion et performance de l'équipe terrain" />

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {MOCK_TECHNICIENS.map((tech) => (
            <div key={tech.id} className="bg-white border border-border rounded-xl p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center">
                    <span className="font-bold text-brand-700 text-sm">{tech.initials}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-steel-900">{tech.name}</p>
                    <div className="flex flex-wrap gap-1 mt-0.5">
                      {tech.specialties.map((s) => (
                        <span key={s} className="text-[10px] px-1.5 py-0.5 bg-brand-50 text-brand-600 rounded font-medium">
                          {SPECIALTY_LABELS[s]}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className={`flex items-center gap-1.5 text-xs font-medium ${tech.isAvailable ? "text-success-600" : "text-warning-600"}`}>
                  {tech.isAvailable ? (
                    <><CheckCircle2 className="w-3.5 h-3.5" /> Disponible</>
                  ) : (
                    <><Circle className="w-3.5 h-3.5" /> En intervention</>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center">
                <div>
                  <p className="text-lg font-bold text-steel-900">{tech.todayInterventions}</p>
                  <p className="text-[10px] text-steel-400">Aujourd&apos;hui</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-steel-900">{tech.interventionsThisMonth}</p>
                  <p className="text-[10px] text-steel-400">Ce mois</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-success-600">{tech.firstPassRate}%</p>
                  <p className="text-[10px] text-steel-400">1er passage</p>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-border">
                <p className="text-xs text-steel-400">
                  Zones : {tech.zones.join(", ")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
