import { DashboardTopbar } from "@/components/layout/dashboard-topbar";
import { KPICard } from "@/components/dashboard/kpi-card";
import {
  DASHBOARD_KPIS, RECENT_TICKETS, TODAY_INTERVENTIONS
} from "@/lib/data/mock-dashboard";
import {
  TICKET_STATUSES, PRIORITIES, INTERVENTION_STATUSES, SERVICE_CATEGORIES
} from "@/lib/constants";
import { formatRelativeTime, formatDate } from "@/lib/utils";
import { TicketStatusBadge, PriorityBadge, InterventionStatusBadge } from "@/components/ui/status-badge";
import Link from "next/link";
import { ArrowRight, AlertTriangle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const urgentTickets = RECENT_TICKETS.filter(
    (t) => t.priority === "CRITICAL" || t.urgency === "BLOCKING" || t.urgency === "CRITICAL_SAFETY"
  );

  return (
    <div className="flex-1 overflow-y-auto">
      <DashboardTopbar title="Dashboard" subtitle="Vue d'ensemble temps réel" />

      <div className="p-6 space-y-6">
        {/* KPI Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
          {DASHBOARD_KPIS.map((kpi) => (
            <KPICard key={kpi.label} {...kpi} />
          ))}
        </div>

        {/* Urgent alert */}
        {urgentTickets.length > 0 && (
          <div className="bg-critical-50 border border-critical-200 rounded-xl p-4">
            <div className="flex items-center gap-2.5 mb-3">
              <AlertTriangle className="w-4 h-4 text-critical-600" />
              <span className="text-sm font-semibold text-critical-700">
                {urgentTickets.length} ticket{urgentTickets.length > 1 ? "s" : ""} prioritaire{urgentTickets.length > 1 ? "s" : ""} en attente
              </span>
            </div>
            <div className="space-y-2">
              {urgentTickets.slice(0, 2).map((ticket) => (
                <Link
                  key={ticket.id}
                  href={`/app/tickets/${ticket.id}`}
                  className="flex items-center justify-between p-3 bg-white rounded-lg border border-critical-100 hover:border-critical-200 transition-colors group"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-steel-900 truncate">{ticket.title}</p>
                    <p className="text-xs text-steel-400">{ticket.client} — {ticket.city}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 ml-3">
                    <PriorityBadge priority={ticket.priority as never} />
                    <ArrowRight className="w-4 h-4 text-steel-300 group-hover:text-steel-500 transition-colors" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Recent tickets */}
          <div className="xl:col-span-2 bg-white border border-border rounded-xl">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <h2 className="font-semibold text-steel-900 text-sm">Tickets récents</h2>
              <Button asChild variant="ghost" size="sm">
                <Link href="/app/tickets">Voir tous <ArrowRight className="w-3.5 h-3.5" /></Link>
              </Button>
            </div>
            <div className="divide-y divide-border">
              {RECENT_TICKETS.map((ticket) => {
                const catConfig = SERVICE_CATEGORIES[ticket.category as keyof typeof SERVICE_CATEGORIES];
                return (
                  <Link
                    key={ticket.id}
                    href={`/app/tickets/${ticket.id}`}
                    className="flex items-center gap-4 px-5 py-3.5 hover:bg-surface-subtle transition-colors group"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[10px] font-mono text-steel-400">{ticket.reference}</span>
                        <span className="text-xs text-steel-400">{catConfig?.shortLabel}</span>
                      </div>
                      <p className="text-sm font-medium text-steel-900 truncate">{ticket.title}</p>
                      <p className="text-xs text-steel-400 mt-0.5">
                        {ticket.client} — {ticket.city}
                        {ticket.assignee ? ` · ${ticket.assignee}` : " · Non assigné"}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1.5 shrink-0">
                      <TicketStatusBadge status={ticket.status as never} />
                      <span className="text-xs text-steel-400">{formatRelativeTime(ticket.createdAt)}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Today's interventions */}
          <div className="bg-white border border-border rounded-xl">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <h2 className="font-semibold text-steel-900 text-sm">Interventions du jour</h2>
              <Button asChild variant="ghost" size="sm">
                <Link href="/app/planning">Planning <ArrowRight className="w-3.5 h-3.5" /></Link>
              </Button>
            </div>
            <div className="p-3 space-y-2">
              {TODAY_INTERVENTIONS.map((intervention) => {
                const statusConfig = INTERVENTION_STATUSES[intervention.status as keyof typeof INTERVENTION_STATUSES];
                return (
                  <div
                    key={intervention.id}
                    className="p-3 rounded-lg border border-border hover:border-steel-300 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center shrink-0">
                          <span className="text-[10px] font-bold text-brand-700">
                            {intervention.technicianInitials}
                          </span>
                        </div>
                        <span className="text-xs font-medium text-steel-700">
                          {intervention.technicianName}
                        </span>
                      </div>
                      <span className={`badge-status ${statusConfig.color} shrink-0`}>
                        {statusConfig.label}
                      </span>
                    </div>
                    <p className="text-xs text-steel-700 font-medium mb-0.5 truncate">
                      {intervention.description}
                    </p>
                    <p className="text-[11px] text-steel-400 truncate">{intervention.address}</p>
                    <p className="text-[11px] text-steel-400 mt-0.5">
                      {formatDate(intervention.scheduledAt)}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* AI activity summary */}
        <div className="bg-white border border-border rounded-xl p-5">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-7 h-7 rounded-lg bg-brand-50 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-brand-600" />
            </div>
            <h2 className="font-semibold text-steel-900 text-sm">Activité assistant IA</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Conversations aujourd'hui", value: "12" },
              { label: "Tickets qualifiés par IA", value: "8" },
              { label: "Diagnostics générés", value: "5" },
              { label: "Escalades humaines", value: "3" },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <p className="text-xl font-bold text-steel-900">{item.value}</p>
                <p className="text-xs text-steel-400 mt-0.5">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
