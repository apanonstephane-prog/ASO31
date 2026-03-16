"use client";

import { useState } from "react";
import { DashboardTopbar } from "@/components/layout/dashboard-topbar";
import { MOCK_TICKETS } from "@/lib/data/mock-tickets";
import { TICKET_STATUSES, PRIORITIES, URGENCIES, SERVICE_CATEGORIES } from "@/lib/constants";
import { TicketStatusBadge, PriorityBadge, UrgencyBadge } from "@/components/ui/status-badge";
import { formatRelativeTime } from "@/lib/utils";
import { Search, SlidersHorizontal, Plus, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const STATUS_OPTIONS = [
  { value: "ALL", label: "Tous les statuts" },
  ...Object.entries(TICKET_STATUSES).map(([value, config]) => ({
    value,
    label: config.label,
  })),
];

const CATEGORY_OPTIONS = [
  { value: "ALL", label: "Toutes catégories" },
  ...Object.entries(SERVICE_CATEGORIES).map(([value, config]) => ({
    value,
    label: config.shortLabel,
  })),
];

export default function TicketsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [categoryFilter, setCategoryFilter] = useState("ALL");

  const filtered = MOCK_TICKETS.filter((ticket) => {
    const matchSearch =
      !search ||
      ticket.title.toLowerCase().includes(search.toLowerCase()) ||
      ticket.reference.toLowerCase().includes(search.toLowerCase()) ||
      ticket.client.toLowerCase().includes(search.toLowerCase());

    const matchStatus =
      statusFilter === "ALL" || ticket.status === statusFilter;

    const matchCategory =
      categoryFilter === "ALL" || ticket.category === categoryFilter;

    return matchSearch && matchStatus && matchCategory;
  });

  return (
    <div className="flex-1 overflow-y-auto">
      <DashboardTopbar
        title="Tickets SAV"
        subtitle={`${MOCK_TICKETS.length} tickets actifs`}
        actions={
          <Button size="sm" leftIcon={<Plus className="w-3.5 h-3.5" />}>
            Nouveau ticket
          </Button>
        }
      />

      <div className="p-6">
        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-4">
          <div className="relative flex-1 min-w-48">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-steel-400" />
            <input
              type="text"
              placeholder="Rechercher un ticket, client..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 h-9 text-sm border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-9 px-3 text-sm border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="h-9 px-3 text-sm border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            {CATEGORY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>

          <button className="h-9 px-3 flex items-center gap-1.5 text-sm border border-border rounded-lg bg-white hover:bg-surface-subtle transition-colors text-steel-600">
            <SlidersHorizontal className="w-4 h-4" />
            Filtres avancés
          </button>
        </div>

        {/* Table */}
        <div className="bg-white border border-border rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-surface-subtle">
                <th className="text-left px-4 py-3 text-xs font-semibold text-steel-500 uppercase tracking-wide">Référence</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-steel-500 uppercase tracking-wide">Ticket</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-steel-500 uppercase tracking-wide hidden md:table-cell">Client</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-steel-500 uppercase tracking-wide hidden lg:table-cell">Statut</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-steel-500 uppercase tracking-wide hidden xl:table-cell">Priorité</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-steel-500 uppercase tracking-wide hidden xl:table-cell">Assigné</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-steel-500 uppercase tracking-wide">Date</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((ticket) => {
                const catConfig = SERVICE_CATEGORIES[ticket.category as keyof typeof SERVICE_CATEGORIES];
                return (
                  <tr key={ticket.id} className="hover:bg-surface-subtle transition-colors group">
                    <td className="px-4 py-3">
                      <span className="font-mono text-xs text-steel-400">{ticket.reference}</span>
                    </td>
                    <td className="px-4 py-3 max-w-xs">
                      <p className="font-medium text-steel-900 truncate">{ticket.title}</p>
                      <p className="text-xs text-steel-400 mt-0.5">{catConfig?.shortLabel}</p>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <p className="text-steel-700">{ticket.client}</p>
                      <p className="text-xs text-steel-400">{ticket.city}</p>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <TicketStatusBadge status={ticket.status as never} />
                    </td>
                    <td className="px-4 py-3 hidden xl:table-cell">
                      <PriorityBadge priority={ticket.priority as never} />
                    </td>
                    <td className="px-4 py-3 hidden xl:table-cell">
                      <span className="text-steel-600">{ticket.assignee ?? "—"}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs text-steel-400">{formatRelativeTime(ticket.createdAt)}</span>
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/app/tickets/${ticket.id}`}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <ArrowRight className="w-4 h-4 text-steel-400" />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div className="text-center py-12 text-steel-400 text-sm">
              Aucun ticket ne correspond à vos critères.
            </div>
          )}
        </div>

        <p className="text-xs text-steel-400 mt-3">{filtered.length} ticket{filtered.length !== 1 ? "s" : ""} affiché{filtered.length !== 1 ? "s" : ""}</p>
      </div>
    </div>
  );
}
