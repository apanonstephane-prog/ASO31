"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Ticket, Calendar, Users, Cpu, Wrench,
  UserCheck, BookOpen, BarChart3, Settings, User, Home,
  ChevronLeft, ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const NAV_ITEMS = [
  {
    section: "Vue d'ensemble",
    items: [
      { label: "Dashboard", href: "/app", icon: LayoutDashboard, exact: true },
    ],
  },
  {
    section: "Opérations",
    items: [
      { label: "Tickets SAV", href: "/app/tickets", icon: Ticket },
      { label: "Planning", href: "/app/planning", icon: Calendar },
      { label: "Interventions", href: "/app/interventions", icon: Wrench },
    ],
  },
  {
    section: "Ressources",
    items: [
      { label: "Clients", href: "/app/clients", icon: Users },
      { label: "Équipements", href: "/app/equipements", icon: Cpu },
      { label: "Techniciens", href: "/app/techniciens", icon: UserCheck },
    ],
  },
  {
    section: "Savoir & Pilotage",
    items: [
      { label: "Knowledge Base", href: "/app/knowledge", icon: BookOpen },
      { label: "Analytics", href: "/app/analytics", icon: BarChart3 },
      { label: "Paramètres", href: "/app/settings", icon: Settings },
    ],
  },
  {
    section: "Portail client",
    items: [
      { label: "Espace client", href: "/app/client", icon: User },
      { label: "Site public", href: "/", icon: Home, isExternal: true },
    ],
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (href: string, exact = false) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <aside
      className={cn(
        "flex flex-col bg-white border-r border-border h-screen sticky top-0 transition-all duration-300 shrink-0",
        collapsed ? "w-16" : "w-60"
      )}
    >
      {/* Logo */}
      <div className="flex items-center h-14 px-4 border-b border-border">
        <Link href="/app" className="flex items-center gap-2.5 min-w-0">
          <div className="w-7 h-7 bg-brand-700 rounded-lg flex items-center justify-center shrink-0">
            <span className="text-white text-xs font-bold">A31</span>
          </div>
          {!collapsed && (
            <span className="font-bold text-steel-900 text-base tracking-tight truncate">
              ASO<span className="text-brand-600">31</span>
            </span>
          )}
        </Link>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto p-1.5 rounded-md hover:bg-surface-subtle transition-colors text-steel-400 hover:text-steel-600 shrink-0"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-5">
        {NAV_ITEMS.map((section) => (
          <div key={section.section}>
            {!collapsed && (
              <p className="text-[10px] font-semibold text-steel-400 uppercase tracking-wider px-2 mb-1.5">
                {section.section}
              </p>
            )}
            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const active = isActive(item.href, "exact" in item ? item.exact : false);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      target={"isExternal" in item && item.isExternal ? "_blank" : undefined}
                      className={cn(
                        "flex items-center gap-2.5 px-2 py-2 rounded-lg text-sm font-medium transition-all duration-150",
                        active
                          ? "bg-brand-50 text-brand-700"
                          : "text-steel-600 hover:bg-surface-subtle hover:text-steel-900"
                      )}
                      title={collapsed ? item.label : undefined}
                    >
                      <item.icon className={cn("w-4 h-4 shrink-0", active ? "text-brand-600" : "text-steel-400")} />
                      {!collapsed && <span className="truncate">{item.label}</span>}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* User info */}
      <div className="border-t border-border p-3">
        <div className={cn("flex items-center gap-2.5", collapsed && "justify-center")}>
          <div className="w-7 h-7 rounded-full bg-brand-100 flex items-center justify-center shrink-0">
            <span className="text-xs font-semibold text-brand-700">A</span>
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <p className="text-xs font-semibold text-steel-900 truncate">Admin ASO31</p>
              <p className="text-[10px] text-steel-400">Administrateur</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
