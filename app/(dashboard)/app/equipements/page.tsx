import { DashboardTopbar } from "@/components/layout/dashboard-topbar";

const MOCK_EQUIPEMENTS = [
  { id: "EQ001", name: "Portail coulissant FAAC 844", brand: "FAAC", model: "844", type: "Portail coulissant", site: "Entrepôt Portet SAS", city: "Portet-sur-Garonne", status: "FAULTY", lastMaintenance: "2024-06-15", installDate: "2019-03-10" },
  { id: "EQ002", name: "Porte automatique Geze", brand: "Geze", model: "Slimdrive SL", type: "Porte coulissante piétonne", site: "Pharmacie des Minimes", city: "Toulouse", status: "DEGRADED", lastMaintenance: "2024-01-20", installDate: "2021-05-18" },
  { id: "EQ003", name: "Split mural Daikin 5kW", brand: "Daikin", model: "FTXC50C", type: "Climatisation split mural", site: "Cabinet Conseil Galia", city: "Toulouse", status: "FAULTY", lastMaintenance: "2023-12-10", installDate: "2020-08-22" },
  { id: "EQ004", name: "Interphonie Urmet câblée", brand: "Urmet", model: "7537", type: "Interphonie collective", site: "Résidence Les Erables", city: "Ramonville", status: "DEGRADED", lastMaintenance: "2024-03-05", installDate: "2018-11-30" },
  { id: "EQ005", name: "Barrière levante Nice WA5", brand: "Nice", model: "WA5", type: "Barrière levante", site: "Résidence Le Clos des Pins", city: "Balma", status: "UNDER_MAINTENANCE", lastMaintenance: "2025-03-10", installDate: "2022-02-14" },
  { id: "EQ006", name: "Centrale alarme Ajax Hub 2", brand: "Ajax", model: "Hub 2", type: "Centrale alarme intrusion", site: "Pharmacie des Minimes", city: "Toulouse", status: "OPERATIONAL", lastMaintenance: "2025-01-15", installDate: "2023-06-01" },
];

const STATUS_CONFIG: Record<string, { label: string; color: string }> = {
  OPERATIONAL: { label: "Opérationnel", color: "bg-success-100 text-success-600" },
  DEGRADED: { label: "Dégradé", color: "bg-warning-100 text-warning-700" },
  FAULTY: { label: "En panne", color: "bg-critical-100 text-critical-700" },
  UNDER_MAINTENANCE: { label: "En maintenance", color: "bg-blue-100 text-blue-700" },
  DECOMMISSIONED: { label: "Hors service", color: "bg-steel-100 text-steel-600" },
};

export default function EquipementsPage() {
  return (
    <div className="flex-1 overflow-y-auto">
      <DashboardTopbar title="Équipements" subtitle={`${MOCK_EQUIPEMENTS.length} équipements référencés`} />

      <div className="p-6">
        <div className="bg-white border border-border rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-surface-subtle">
                <th className="text-left px-4 py-3 text-xs font-semibold text-steel-500 uppercase tracking-wide">Équipement</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-steel-500 uppercase tracking-wide hidden md:table-cell">Site</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-steel-500 uppercase tracking-wide hidden lg:table-cell">Dernier entretien</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-steel-500 uppercase tracking-wide">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {MOCK_EQUIPEMENTS.map((eq) => {
                const status = STATUS_CONFIG[eq.status];
                return (
                  <tr key={eq.id} className="hover:bg-surface-subtle transition-colors cursor-pointer">
                    <td className="px-4 py-3">
                      <p className="font-medium text-steel-900">{eq.name}</p>
                      <p className="text-xs text-steel-400">{eq.type} · {eq.brand} {eq.model}</p>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <p className="text-steel-700">{eq.site}</p>
                      <p className="text-xs text-steel-400">{eq.city}</p>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell text-steel-500 text-xs">
                      {eq.lastMaintenance}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`badge-status ${status.color}`}>{status.label}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
