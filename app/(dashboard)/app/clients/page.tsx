import { DashboardTopbar } from "@/components/layout/dashboard-topbar";
import { Building2, User, Home, MapPin } from "lucide-react";

const MOCK_CLIENTS = [
  { id: "C001", name: "Entrepôt Portet SAS", type: "INDUSTRY", city: "Portet-sur-Garonne", contacts: 2, sites: 1, contracts: 1, openTickets: 2 },
  { id: "C002", name: "Pharmacie des Minimes", type: "BUSINESS", city: "Toulouse", contacts: 1, sites: 1, contracts: 1, openTickets: 1 },
  { id: "C003", name: "Syndic Toulouse Sud Gestion", type: "SYNDIC", city: "Ramonville", contacts: 2, sites: 12, contracts: 3, openTickets: 3 },
  { id: "C004", name: "Cabinet Conseil Galia", type: "BUSINESS", city: "Toulouse Centre", contacts: 1, sites: 1, contracts: 0, openTickets: 1 },
  { id: "C005", name: "Résidence Le Clos des Pins", type: "SYNDIC", city: "Balma", contacts: 1, sites: 1, contracts: 1, openTickets: 1 },
  { id: "C006", name: "M. et Mme Bourdeau", type: "INDIVIDUAL", city: "Toulouse", contacts: 1, sites: 1, contracts: 0, openTickets: 0 },
  { id: "C007", name: "École Primaire Bonnefoy", type: "COLLECTIVITY", city: "Toulouse", contacts: 2, sites: 1, contracts: 1, openTickets: 0 },
  { id: "C008", name: "Restaurant Le Capitoul", type: "BUSINESS", city: "Toulouse Centre", contacts: 1, sites: 1, contracts: 0, openTickets: 0 },
];

const TYPE_LABELS: Record<string, { label: string; icon: typeof Building2 }> = {
  INDUSTRY: { label: "Industriel", icon: Building2 },
  BUSINESS: { label: "Entreprise", icon: Building2 },
  SYNDIC: { label: "Syndic", icon: Building2 },
  INDIVIDUAL: { label: "Particulier", icon: User },
  COLLECTIVITY: { label: "Collectivité", icon: Home },
};

export default function ClientsPage() {
  return (
    <div className="flex-1 overflow-y-auto">
      <DashboardTopbar title="Clients" subtitle={`${MOCK_CLIENTS.length} clients actifs`} />

      <div className="p-6">
        <div className="bg-white border border-border rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-surface-subtle">
                <th className="text-left px-4 py-3 text-xs font-semibold text-steel-500 uppercase tracking-wide">Client</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-steel-500 uppercase tracking-wide hidden md:table-cell">Type</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-steel-500 uppercase tracking-wide hidden lg:table-cell">Ville</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-steel-500 uppercase tracking-wide hidden xl:table-cell">Sites</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-steel-500 uppercase tracking-wide hidden xl:table-cell">Contrats</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-steel-500 uppercase tracking-wide">Tickets ouverts</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {MOCK_CLIENTS.map((client) => {
                const typeConfig = TYPE_LABELS[client.type];
                return (
                  <tr key={client.id} className="hover:bg-surface-subtle transition-colors cursor-pointer">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center shrink-0">
                          <typeConfig.icon className="w-4 h-4 text-brand-600" />
                        </div>
                        <div>
                          <p className="font-medium text-steel-900">{client.name}</p>
                          <p className="text-xs text-steel-400 font-mono">{client.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <span className="text-xs px-2 py-0.5 bg-steel-100 text-steel-600 rounded-full">
                        {typeConfig.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <div className="flex items-center gap-1.5 text-steel-600">
                        <MapPin className="w-3.5 h-3.5 text-steel-400 shrink-0" />
                        {client.city}
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden xl:table-cell text-center">
                      <span className="text-steel-700">{client.sites}</span>
                    </td>
                    <td className="px-4 py-3 hidden xl:table-cell text-center">
                      {client.contracts > 0 ? (
                        <span className="text-success-600 font-medium">{client.contracts}</span>
                      ) : (
                        <span className="text-steel-300">0</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {client.openTickets > 0 ? (
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-accent-100 text-accent-700 text-xs font-bold">
                          {client.openTickets}
                        </span>
                      ) : (
                        <span className="text-steel-300">0</span>
                      )}
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
