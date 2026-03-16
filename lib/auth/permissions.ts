import type { UserRole } from "@prisma/client";

// Role hierarchy: higher index = more permissions
const ROLE_HIERARCHY: UserRole[] = [
  "VISITOR",
  "CLIENT",
  "TECHNICIAN",
  "OPERATOR",
  "MANAGER",
  "ADMIN",
];

export function hasRole(userRole: UserRole, requiredRole: UserRole): boolean {
  return ROLE_HIERARCHY.indexOf(userRole) >= ROLE_HIERARCHY.indexOf(requiredRole);
}

export function isAtLeast(userRole: UserRole, minRole: UserRole): boolean {
  return hasRole(userRole, minRole);
}

// Permission definitions
export const PERMISSIONS = {
  // Dashboard access
  canViewDashboard: (role: UserRole) =>
    isAtLeast(role, "CLIENT"),
  canViewAnalytics: (role: UserRole) =>
    isAtLeast(role, "MANAGER"),

  // Tickets
  canCreateTicket: (role: UserRole) =>
    isAtLeast(role, "CLIENT"),
  canViewAllTickets: (role: UserRole) =>
    isAtLeast(role, "OPERATOR"),
  canQualifyTicket: (role: UserRole) =>
    isAtLeast(role, "OPERATOR"),
  canAssignTicket: (role: UserRole) =>
    isAtLeast(role, "OPERATOR"),
  canCloseTicket: (role: UserRole) =>
    isAtLeast(role, "OPERATOR"),
  canDeleteTicket: (role: UserRole) =>
    isAtLeast(role, "ADMIN"),

  // Clients
  canViewClients: (role: UserRole) =>
    isAtLeast(role, "OPERATOR"),
  canManageClients: (role: UserRole) =>
    isAtLeast(role, "OPERATOR"),
  canDeleteClient: (role: UserRole) =>
    isAtLeast(role, "ADMIN"),

  // Interventions
  canViewInterventions: (role: UserRole) =>
    isAtLeast(role, "TECHNICIAN"),
  canManageInterventions: (role: UserRole) =>
    isAtLeast(role, "OPERATOR"),
  canCloseIntervention: (role: UserRole) =>
    isAtLeast(role, "TECHNICIAN"),

  // Planning
  canViewPlanning: (role: UserRole) =>
    isAtLeast(role, "TECHNICIAN"),
  canManagePlanning: (role: UserRole) =>
    isAtLeast(role, "OPERATOR"),

  // Knowledge
  canViewKnowledge: (role: UserRole) =>
    isAtLeast(role, "TECHNICIAN"),
  canManageKnowledge: (role: UserRole) =>
    isAtLeast(role, "OPERATOR"),

  // Users
  canManageUsers: (role: UserRole) =>
    isAtLeast(role, "ADMIN"),
  canManageTechnicians: (role: UserRole) =>
    isAtLeast(role, "MANAGER"),

  // Settings
  canAccessSettings: (role: UserRole) =>
    isAtLeast(role, "MANAGER"),

  // Client portal
  canViewClientPortal: (role: UserRole) =>
    isAtLeast(role, "CLIENT"),
} as const;

// Route-based protection
export const PROTECTED_ROUTES: Record<string, UserRole> = {
  "/app": "CLIENT",
  "/app/client": "CLIENT",
  "/app/tickets": "OPERATOR",
  "/app/planning": "OPERATOR",
  "/app/clients": "OPERATOR",
  "/app/equipements": "OPERATOR",
  "/app/interventions": "TECHNICIAN",
  "/app/techniciens": "MANAGER",
  "/app/knowledge": "TECHNICIAN",
  "/app/analytics": "MANAGER",
  "/app/settings": "MANAGER",
};

export function canAccessRoute(userRole: UserRole, route: string): boolean {
  const requiredRole = PROTECTED_ROUTES[route] ?? "VISITOR";
  return isAtLeast(userRole, requiredRole);
}
