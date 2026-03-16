"use client";

import { useState } from "react";
import { DashboardTopbar } from "@/components/layout/dashboard-topbar";
import { KNOWLEDGE_ARTICLES } from "@/lib/data/mock-knowledge";
import { SERVICE_CATEGORIES } from "@/lib/constants";
import {
  Search, BookOpen, AlertTriangle, CheckCircle2, ChevronDown, ChevronRight, Tag
} from "lucide-react";

export default function KnowledgePage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("ALL");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = KNOWLEDGE_ARTICLES.filter((article) => {
    const matchSearch =
      !search ||
      article.title.toLowerCase().includes(search.toLowerCase()) ||
      article.summary.toLowerCase().includes(search.toLowerCase()) ||
      article.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));

    const matchCategory = category === "ALL" || article.category === category;

    return matchSearch && matchCategory;
  });

  return (
    <div className="flex-1 overflow-y-auto">
      <DashboardTopbar title="Base de connaissances" subtitle="Fiches techniques & procédures" />

      <div className="p-6 space-y-4">
        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-48">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-steel-400" />
            <input
              type="text"
              placeholder="Rechercher une fiche, symptôme, tag..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 h-9 text-sm border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="h-9 px-3 text-sm border border-border rounded-lg bg-white focus:outline-none"
          >
            <option value="ALL">Toutes catégories</option>
            {Object.entries(SERVICE_CATEGORIES).map(([value, config]) => (
              <option key={value} value={value}>{config.label}</option>
            ))}
          </select>
        </div>

        {/* Articles */}
        <div className="space-y-3">
          {filtered.map((article) => {
            const catConfig = SERVICE_CATEGORIES[article.category as keyof typeof SERVICE_CATEGORIES];
            const isExpanded = expandedId === article.id;

            return (
              <div key={article.id} className="bg-white border border-border rounded-xl overflow-hidden">
                <button
                  className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-surface-subtle transition-colors"
                  onClick={() => setExpandedId(isExpanded ? null : article.id)}
                >
                  <div className="w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center shrink-0">
                    <BookOpen className="w-4 h-4 text-brand-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[10px] font-mono text-steel-400">{article.id}</span>
                      <span className="text-xs text-brand-600 font-medium">{catConfig?.shortLabel}</span>
                    </div>
                    <p className="font-semibold text-steel-900 text-sm">{article.title}</p>
                    <p className="text-xs text-steel-500 mt-0.5 truncate">{article.summary}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <div className="flex flex-wrap gap-1 hidden md:flex">
                      {article.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="text-[10px] px-2 py-0.5 bg-surface-subtle border border-border rounded text-steel-500">
                          {tag}
                        </span>
                      ))}
                    </div>
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4 text-steel-400" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-steel-400" />
                    )}
                  </div>
                </button>

                {isExpanded && (
                  <div className="border-t border-border px-5 py-5 space-y-4">
                    {/* Symptoms */}
                    {article.symptoms.length > 0 && (
                      <div>
                        <h4 className="text-xs font-semibold text-steel-500 uppercase tracking-wide mb-2">
                          Symptômes associés
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {article.symptoms.map((s) => (
                            <span key={s} className="text-xs px-2.5 py-1 bg-amber-50 border border-amber-200 text-amber-700 rounded-lg">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Probable causes */}
                    {article.probableCauses.length > 0 && (
                      <div>
                        <h4 className="text-xs font-semibold text-steel-500 uppercase tracking-wide mb-2">
                          Causes probables
                        </h4>
                        <ul className="space-y-1.5">
                          {article.probableCauses.map((cause, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-steel-700">
                              <span className="text-xs font-bold text-steel-300 mt-0.5 shrink-0">{i + 1}.</span>
                              {cause}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Initial checks */}
                    <div>
                      <h4 className="text-xs font-semibold text-steel-500 uppercase tracking-wide mb-2">
                        Vérifications initiales
                      </h4>
                      <ul className="space-y-1.5">
                        {article.initialChecks.map((check, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-steel-700">
                            <CheckCircle2 className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
                            {check}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Safety risks */}
                    {article.safetyRisks.length > 0 && (
                      <div className="bg-critical-50 border border-critical-200 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertTriangle className="w-4 h-4 text-critical-600" />
                          <h4 className="text-xs font-semibold text-critical-700 uppercase tracking-wide">
                            Risques sécurité
                          </h4>
                        </div>
                        <ul className="space-y-1">
                          {article.safetyRisks.map((risk, i) => (
                            <li key={i} className="text-sm text-critical-700">{risk}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Escalation */}
                    {article.escalationNotes && (
                      <div className="bg-brand-50 border border-brand-100 rounded-lg p-3">
                        <h4 className="text-xs font-semibold text-brand-700 uppercase tracking-wide mb-1">
                          Note d&apos;escalade
                        </h4>
                        <p className="text-sm text-brand-700">{article.escalationNotes}</p>
                      </div>
                    )}

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border">
                      <Tag className="w-3.5 h-3.5 text-steel-400" />
                      {article.tags.map((tag) => (
                        <span key={tag} className="text-xs px-2 py-0.5 bg-surface-subtle border border-border text-steel-500 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div className="text-center py-12 text-steel-400 text-sm">
              Aucune fiche ne correspond à votre recherche.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
