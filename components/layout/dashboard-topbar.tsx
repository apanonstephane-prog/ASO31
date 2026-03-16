"use client";

import { Bell, Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface DashboardTopbarProps {
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export function DashboardTopbar({ title, subtitle, actions }: DashboardTopbarProps) {
  return (
    <div className="flex items-center justify-between h-14 px-6 border-b border-border bg-white shrink-0">
      <div>
        {title && <h1 className="font-semibold text-steel-900 text-sm">{title}</h1>}
        {subtitle && <p className="text-xs text-steel-400">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-2">
        <button className="p-2 rounded-lg hover:bg-surface-subtle text-steel-500 hover:text-steel-700 transition-colors">
          <Search className="w-4 h-4" />
        </button>
        <button className="relative p-2 rounded-lg hover:bg-surface-subtle text-steel-500 hover:text-steel-700 transition-colors">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-accent-500" />
        </button>
        {actions || (
          <Button asChild size="sm" leftIcon={<Plus className="w-3.5 h-3.5" />}>
            <Link href="/app/tickets">Nouveau ticket</Link>
          </Button>
        )}
      </div>
    </div>
  );
}
