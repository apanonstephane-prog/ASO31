// ASO31 Triage Service — Qualifies tickets before human assignment

import { getCompletion } from "./provider";
import type { Priority, Urgency, ServiceCategory } from "@prisma/client";

export type TriageResult = {
  category: ServiceCategory;
  priority: Priority;
  urgency: Urgency;
  estimatedDuration: number; // minutes
  requiresSpecialist: boolean;
  suggestedTechnicianSkills: string[];
  qualificationNotes: string;
  confidenceScore: number;
};

const QUICK_TRIAGE_RULES: Array<{
  keywords: RegExp;
  urgency: Urgency;
  priority: Priority;
  category: ServiceCategory;
}> = [
  {
    keywords: /sécurité|danger|incendie|effraction|alarme déclenchée/i,
    urgency: "CRITICAL_SAFETY",
    priority: "CRITICAL",
    category: "ALARM_SECURITY",
  },
  {
    keywords: /bloqué.*entrée|ne peut pas entrer|accès impossible|portail coincé/i,
    urgency: "BLOCKING",
    priority: "HIGH",
    category: "AUTOMATION",
  },
  {
    keywords: /rideau bloqué.*commerce|porte bloquée.*ouverture/i,
    urgency: "BLOCKING",
    priority: "CRITICAL",
    category: "AUTOMATIC_DOORS",
  },
  {
    keywords: /clim.*bureau|chaleur.*open space/i,
    urgency: "INCONVENIENT",
    priority: "HIGH",
    category: "CLIMATISATION",
  },
];

export async function triageTicket(description: string, symptoms: string[]): Promise<TriageResult> {
  const fullText = `${description} ${symptoms.join(" ")}`;

  // Fast rule-based pre-triage
  for (const rule of QUICK_TRIAGE_RULES) {
    if (rule.keywords.test(fullText)) {
      return {
        category: rule.category,
        priority: rule.priority,
        urgency: rule.urgency,
        estimatedDuration: rule.priority === "CRITICAL" ? 90 : 120,
        requiresSpecialist: rule.urgency === "CRITICAL_SAFETY",
        suggestedTechnicianSkills: [rule.category],
        qualificationNotes: "Qualification automatique basée sur mots-clés critiques.",
        confidenceScore: 0.85,
      };
    }
  }

  const prompt = `
Analyse cette demande de dépannage et fournis une qualification structurée :

Description : ${description}
Symptômes : ${symptoms.join(", ")}

Réponds en JSON :
{
  "category": "ALARM_SECURITY|AUTOMATION|AUTOMATIC_DOORS|CLIMATISATION|MAINTENANCE_REPAIR",
  "priority": "LOW|NORMAL|HIGH|CRITICAL",
  "urgency": "NON_BLOCKING|INCONVENIENT|BLOCKING|CRITICAL_SAFETY",
  "estimatedDuration": <minutes>,
  "requiresSpecialist": true|false,
  "suggestedTechnicianSkills": ["skill1"],
  "qualificationNotes": "notes pour l'opérateur",
  "confidenceScore": 0.0-1.0
}`;

  const result = await getCompletion({
    messages: [
      {
        role: "system",
        content: "Tu es un système de qualification de tickets SAV pour une entreprise technique. Analyse et classe les demandes avec rigueur.",
      },
      { role: "user", content: prompt },
    ],
    jsonMode: true,
    temperature: 0.1,
  });

  try {
    return JSON.parse(result.content) as TriageResult;
  } catch {
    return {
      category: "MAINTENANCE_REPAIR",
      priority: "NORMAL",
      urgency: "INCONVENIENT",
      estimatedDuration: 120,
      requiresSpecialist: false,
      suggestedTechnicianSkills: ["MAINTENANCE_REPAIR"],
      qualificationNotes: "Qualification automatique non concluante — vérification manuelle recommandée.",
      confidenceScore: 0.4,
    };
  }
}
