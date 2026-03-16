import { cn } from "@/lib/utils";
import { TICKET_STATUSES, PRIORITIES, URGENCIES, INTERVENTION_STATUSES } from "@/lib/constants";
import type { TicketStatus, Priority, Urgency, InterventionStatus } from "@prisma/client";

export function TicketStatusBadge({ status }: { status: TicketStatus }) {
  const config = TICKET_STATUSES[status];
  return (
    <span className={cn("badge-status", config.bg)}>
      {config.label}
    </span>
  );
}

export function PriorityBadge({ priority }: { priority: Priority }) {
  const config = PRIORITIES[priority];
  return (
    <span className={cn("badge-status", config.color)}>
      <span className={cn("w-1.5 h-1.5 rounded-full", config.dot)} aria-hidden="true" />
      {config.label}
    </span>
  );
}

export function UrgencyBadge({ urgency }: { urgency: Urgency }) {
  const config = URGENCIES[urgency];
  return (
    <span className={cn("badge-status", config.color)}>
      {config.label}
    </span>
  );
}

export function InterventionStatusBadge({ status }: { status: InterventionStatus }) {
  const config = INTERVENTION_STATUSES[status];
  return (
    <span className={cn("badge-status", config.color)}>
      {config.label}
    </span>
  );
}
