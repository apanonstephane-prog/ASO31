import { DashboardTopbar } from "@/components/layout/dashboard-topbar";
import { TicketStatusBadge } from "@/components/ui/status-badge";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { FileText, Calendar, CheckCircle2, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CLIENT_TICKETS = [
  {
    id: "T2503-0141",
    reference: "T2503-0141",
    title: "Porte automatique — ouverture intermittente",
    status: "IN_PROGRESS",
    scheduledAt: new Date(Date.now() - 30 * 60 * 1000),
    lastUpdate: "Technicien sur site en cours d'intervention.",
  },
  {
    id: "T2503-0128",
    reference: "T2503-0128",
    title: "Entretien annuel centrale alarme",
    status: "CLOSED",
    scheduledAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    lastUpdate: "Intervention terminée. Rapport disponible.",
  },
];

export default function ClientPortalPage() {
  return (
    <div className="flex-1 overflow-y-auto">
      <DashboardTopbar title="Espace client" subtitle="Pharmacie des Minimes" />

      <div className="p-6 space-y-6">
        {/* Welcome */}
        <div className="bg-white border border-border rounded-xl p-5">
          <h2 className="font-semibold text-steel-900 mb-1">Bonjour, M. Bourdeau</h2>
          <p className="text-sm text-steel-500">
            Bienvenue dans votre espace client. Suivez vos demandes, consultez vos documents et prenez rendez-vous depuis cette interface.
          </p>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { label: "Signaler une panne", href: "/depannage", icon: Clock, variant: "default" as const },
            { label: "Demander un devis", href: "/devis", icon: FileText, variant: "outline" as const },
            { label: "Prendre rendez-vous", href: "/rendez-vous", icon: Calendar, variant: "outline" as const },
          ].map((action) => (
            <Button key={action.label} asChild variant={action.variant} size="lg" className="w-full">
              <Link href={action.href}>
                <action.icon className="w-4 h-4" />
                {action.label}
              </Link>
            </Button>
          ))}
        </div>

        {/* My tickets */}
        <div className="bg-white border border-border rounded-xl">
          <div className="px-5 py-4 border-b border-border flex items-center justify-between">
            <h3 className="font-semibold text-steel-900 text-sm">Mes demandes</h3>
          </div>
          <div className="divide-y divide-border">
            {CLIENT_TICKETS.map((ticket) => (
              <div key={ticket.id} className="px-5 py-4 flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-mono text-xs text-steel-400">{ticket.reference}</span>
                  </div>
                  <p className="font-medium text-steel-900 text-sm truncate">{ticket.title}</p>
                  <p className="text-xs text-steel-500 mt-0.5">{ticket.lastUpdate}</p>
                  <p className="text-xs text-steel-400">{formatDate(ticket.scheduledAt)}</p>
                </div>
                <TicketStatusBadge status={ticket.status as never} />
              </div>
            ))}
          </div>
        </div>

        {/* Contract summary */}
        <div className="bg-white border border-border rounded-xl p-5">
          <h3 className="font-semibold text-steel-900 text-sm mb-3">Contrat actif</h3>
          <div className="flex items-center gap-4 p-3 bg-success-50 border border-success-200 rounded-lg">
            <CheckCircle2 className="w-5 h-5 text-success-600 shrink-0" />
            <div>
              <p className="text-sm font-medium text-success-800">Contrat annuel — Porte automatique + Alarme</p>
              <p className="text-xs text-success-700">Validité : 01/03/2025 – 28/02/2026 · 2 visites incluses · 1 effectuée</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
