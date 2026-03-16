// ASO31 Platform — Shared Types

export type {
  User,
  ClientProfile,
  ClientSite,
  Contact,
  Equipment,
  EquipmentType,
  Part,
  Contract,
  Ticket,
  TicketMessage,
  Intervention,
  InterventionPhoto,
  InterventionPart,
  TechnicianProfile,
  KnowledgeArticle,
  AIConversation,
  AIDiagnosticSuggestion,
  QuoteRequest,
  AppointmentRequest,
  Notification,
} from "@prisma/client";

export type {
  UserRole,
  TicketStatus,
  Priority,
  Urgency,
  InterventionStatus,
  ServiceCategory,
  EquipmentStatus,
  ContractStatus,
  ClientType,
  AIConfidenceLevel,
  RequestSource,
} from "@prisma/client";

// Extended types with relations
export type TicketWithRelations = import("@prisma/client").Ticket & {
  client?: (import("@prisma/client").ClientProfile & {
    user: import("@prisma/client").User;
  }) | null;
  site?: import("@prisma/client").ClientSite | null;
  equipment?: import("@prisma/client").Equipment | null;
  assignee?: import("@prisma/client").User | null;
  creator?: import("@prisma/client").User | null;
  messages?: import("@prisma/client").TicketMessage[];
  interventions?: import("@prisma/client").Intervention[];
  aiDiagnostics?: import("@prisma/client").AIDiagnosticSuggestion[];
};

export type InterventionWithRelations = import("@prisma/client").Intervention & {
  technician: import("@prisma/client").User;
  site?: import("@prisma/client").ClientSite | null;
  equipment?: import("@prisma/client").Equipment | null;
  ticket?: import("@prisma/client").Ticket | null;
  partsUsed?: (import("@prisma/client").InterventionPart & {
    part: import("@prisma/client").Part;
  })[];
  photos?: import("@prisma/client").InterventionPhoto[];
};

export type UserWithProfile = import("@prisma/client").User & {
  clientProfile?: import("@prisma/client").ClientProfile | null;
  technicianProfile?: import("@prisma/client").TechnicianProfile | null;
};

// UI specific types
export type NavItem = {
  label: string;
  href: string;
  icon?: string;
  children?: NavItem[];
  badge?: string;
  isExternal?: boolean;
};

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export type SelectOption = {
  value: string;
  label: string;
  description?: string;
};

export type TableColumn<T> = {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  render?: (value: unknown, row: T) => React.ReactNode;
};

export type ActionResult<T = void> =
  | { success: true; data?: T; message?: string }
  | { success: false; error: string; fieldErrors?: Record<string, string[]> };

// AI Types
export type DiagnosticResult = {
  probableEquipmentCategory: string;
  probableIssue: string;
  urgencyLevel: string;
  likelyParts: string[];
  recommendedTools: string[];
  safetyRisks: string[];
  requiresHumanValidation: boolean;
  confidenceScore: number;
  confidenceLevel: string;
  nextBestAction: string;
  technicianNotes?: string;
};

export type ChatMessage = {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
  metadata?: {
    intent?: string;
    confidence?: number;
    suggestedAction?: string;
  };
};

export type DashboardKPI = {
  label: string;
  value: string | number;
  delta?: string;
  deltaType?: "increase" | "decrease" | "neutral";
  icon?: string;
  description?: string;
};
