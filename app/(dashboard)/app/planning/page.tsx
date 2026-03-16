"use client";

import { DashboardTopbar } from "@/components/layout/dashboard-topbar";
import { TODAY_INTERVENTIONS } from "@/lib/data/mock-dashboard";
import { INTERVENTION_STATUSES, SERVICE_CATEGORIES } from "@/lib/constants";
import { InterventionStatusBadge } from "@/components/ui/status-badge";
import { formatDate } from "@/lib/utils";
import { Calendar, MapPin, User } from "lucide-react";

const TECHNICIANS = [
  { name: "Marc Delville", initials: "MD", specialty: "Automatismes", interventions: 3 },
  { name: "Sophie Renard", initials: "SR", specialty: "Portes automatiques", interventions: 2 },
  { name: "Pierre Fontaine", initials: "PF", specialty: "Climatisation", interventions: 2 },
  { name: "Kevin Lamothe", initials: "KL", specialty: "Alarme & Sécurité", interventions: 1 },
];

export default function PlanningPage() {
  return (
    <div className="flex-1 overflow-y-auto">
      <DashboardTopbar title="Planning" subtitle="Gestion des interventions" />

      <div className="p-6 space-y-6">
        {/* Technician overview */}
        <div>
          <h2 className="text-sm font-semibold text-steel-700 mb-3">Techniciens — Aujourd&apos;hui</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {TECHNICIANS.map((tech) => (
              <div key={tech.name} className="bg-white border border-border rounded-xl p-4">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center">
                    <span className="text-xs font-bold text-brand-700">{tech.initials}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-steel-900">{tech.name}</p>
                    <p className="text-xs text-steel-400">{tech.specialty}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-steel-500">{tech.interventions} intervention{tech.interventions > 1 ? "s" : ""}</span>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div
                        key={i}
                        className={`h-1.5 w-4 rounded-full ${i < tech.interventions ? "bg-brand-500" : "bg-steel-100"}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Today's schedule */}
        <div>
          <h2 className="text-sm font-semibold text-steel-700 mb-3">Interventions du jour</h2>
          <div className="space-y-3">
            {TODAY_INTERVENTIONS.map((intervention) => {
              const statusConfig = INTERVENTION_STATUSES[intervention.status as keyof typeof INTERVENTION_STATUSES];
              return (
                <div key={intervention.id} className="bg-white border border-border rounded-xl p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-full bg-brand-100 flex items-center justify-center shrink-0">
                        <span className="text-sm font-bold text-brand-700">{intervention.technicianInitials}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-steel-900 text-sm">{intervention.description}</p>
                        <div className="flex flex-wrap gap-3 mt-1.5 text-xs text-steel-400">
                          <span className="flex items-center gap-1">
                            <User className="w-3.5 h-3.5" />
                            {intervention.technicianName}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5" />
                            {intervention.address}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {formatDate(intervention.scheduledAt)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <InterventionStatusBadge status={intervention.status as never} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
