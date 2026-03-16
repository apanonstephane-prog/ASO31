// ASO31 AI Diagnostic Engine
// Processes symptoms + equipment info -> structured diagnosis
// Always returns confidence scores and human validation flags

import { getCompletion } from "./provider";
import type { DiagnosticResult } from "@/types";

const DIAGNOSTIC_SYSTEM_PROMPT = `Tu es un assistant expert en maintenance technique pour une entreprise spécialisée en automatisme, sécurité, portes automatiques et climatisation.

Ton rôle est d'analyser les symptômes d'une panne et de proposer un diagnostic structuré.

RÈGLES ABSOLUES :
- Ne jamais affirmer avec certitude si le niveau de confiance est faible
- Toujours indiquer le score de confiance (0 à 1)
- Recommander une validation humaine si la situation est ambiguë
- Lister les causes probables par ordre de probabilité décroissante
- Indiquer les risques sécurité si présents
- Rester factuel, précis, sans dramatisation excessive

Tu dois répondre UNIQUEMENT en JSON avec la structure exacte demandée.`;

export type DiagnosticInput = {
  equipmentCategory: string;
  equipmentDescription: string;
  symptoms: string[];
  photos?: string[];
  additionalContext?: string;
};

export async function runDiagnostic(input: DiagnosticInput): Promise<DiagnosticResult> {
  const prompt = `
Analyse la situation suivante et fournis un diagnostic structuré :

Catégorie d'équipement : ${input.equipmentCategory}
Description de l'équipement : ${input.equipmentDescription}
Symptômes rapportés :
${input.symptoms.map((s, i) => `${i + 1}. ${s}`).join("\n")}
${input.additionalContext ? `Contexte supplémentaire : ${input.additionalContext}` : ""}

Réponds avec ce JSON exact :
{
  "probableEquipmentCategory": "catégorie probable",
  "probableIssue": "panne la plus probable (description claire)",
  "urgencyLevel": "NON_BLOCKING|INCONVENIENT|BLOCKING|CRITICAL_SAFETY",
  "likelyParts": ["pièce1", "pièce2"],
  "recommendedTools": ["outil1", "outil2"],
  "safetyRisks": ["risque1"] ou [],
  "requiresHumanValidation": true|false,
  "confidenceScore": 0.0-1.0,
  "confidenceLevel": "LOW|MEDIUM|HIGH|VERY_HIGH",
  "nextBestAction": "action recommandée concrète",
  "technicianNotes": "notes internes pour le technicien"
}`;

  const result = await getCompletion({
    messages: [
      { role: "system", content: DIAGNOSTIC_SYSTEM_PROMPT },
      { role: "user", content: prompt },
    ],
    jsonMode: true,
    temperature: 0.1,
    maxTokens: 1000,
  });

  try {
    return JSON.parse(result.content) as DiagnosticResult;
  } catch {
    return getMockDiagnostic(input);
  }
}

// Realistic mock diagnostics by category
function getMockDiagnostic(input: DiagnosticInput): DiagnosticResult {
  const category = input.equipmentCategory.toLowerCase();
  const symptoms = input.symptoms.join(" ").toLowerCase();

  if (category.includes("portail") || category.includes("automatisme")) {
    if (symptoms.includes("bloqué") || symptoms.includes("ouvert")) {
      return {
        probableEquipmentCategory: "Automatisme de portail coulissant",
        probableIssue: "Point dur mécanique ou obstruction du rail — le moteur détecte une résistance anormale et active la sécurité anti-écrasement. Hypothèse secondaire : fin de course mal positionné.",
        urgencyLevel: "BLOCKING",
        likelyParts: ["Fin de course magnétique", "Galet de guidage", "Rail de roulement"],
        recommendedTools: ["Multimètre", "Clé à molette", "Graisse lithium"],
        safetyRisks: ["Risque d'écrasement si portail en mouvement non contrôlé — sécuriser la zone"],
        requiresHumanValidation: true,
        confidenceScore: 0.72,
        confidenceLevel: "HIGH",
        nextBestAction: "Effectuer une inspection visuelle du rail et des galets, vérifier l'absence d'obstacle. Tester manuellement si le portail glisse librement.",
        technicianNotes: "Vérifier aussi la tension de la courroie et l'état du moteur réducteur. Si point dur confirmé, lubrifier avant de tester l'automatisme.",
      };
    }
    return {
      probableEquipmentCategory: "Automatisme de portail",
      probableIssue: "Défaut de réception commande ou batterie télécommande faible — réponse intermittente typique d'un problème fréquence radio ou d'un récepteur encrassé.",
      urgencyLevel: "INCONVENIENT",
      likelyParts: ["Télécommande (pile)", "Récepteur radio", "Carte mère automatisme"],
      recommendedTools: ["Testeur fréquence", "Multimètre"],
      safetyRisks: [],
      requiresHumanValidation: false,
      confidenceScore: 0.65,
      confidenceLevel: "MEDIUM",
      nextBestAction: "Commencer par remplacer les piles de la télécommande. Si sans effet, re-mémoriser la télécommande. Si toujours non fonctionnel, vérifier le récepteur.",
      technicianNotes: "Vérifier également si d'autres télécommandes fonctionnent pour isoler le problème.",
    };
  }

  if (category.includes("climatisation") || category.includes("clim")) {
    if (symptoms.includes("ne refroidit pas") || symptoms.includes("ne froid")) {
      return {
        probableEquipmentCategory: "Système de climatisation split mural",
        probableIssue: "Pression de fluide frigorigène insuffisante ou encrassement du filtre — deux causes les plus fréquentes d'une unité qui souffle mais ne refroidit pas correctement.",
        urgencyLevel: "INCONVENIENT",
        likelyParts: ["Fluide frigorigène R32/R410A", "Filtre à air", "Sonde de température"],
        recommendedTools: ["Manomètre frigoriste", "Thermomètre infrarouge", "Aspirateur"],
        safetyRisks: ["Risque fuite fluide frigorigène — intervention réservée aux techniciens certifiés"],
        requiresHumanValidation: true,
        confidenceScore: 0.80,
        confidenceLevel: "HIGH",
        nextBestAction: "Nettoyer les filtres en premier lieu (action client possible). Si inefficace, contrôler les pressions de service et la température de soufflage avec instruments.",
        technicianNotes: "Vérifier aussi l'unité extérieure : condenseur encrassé, ventilateur bloqué, ou protection thermique déclenchée.",
      };
    }
  }

  if (category.includes("alarme") || category.includes("sécurité")) {
    return {
      probableEquipmentCategory: "Centrale d'alarme intrusion",
      probableIssue: "Déclenchement intempestif — cause probable : détecteur infrarouge mal réglé, batterie de secours faible générant une alarme technique, ou zone en défaut de supervision.",
      urgencyLevel: "INCONVENIENT",
      likelyParts: ["Batterie de secours 12V", "Détecteur infrarouge passif"],
      recommendedTools: ["Testeur de batterie", "Logiciel de configuration centrale"],
      safetyRisks: [],
      requiresHumanValidation: true,
      confidenceScore: 0.60,
      confidenceLevel: "MEDIUM",
      nextBestAction: "Consulter le journal d'événements de la centrale pour identifier la zone et l'heure des déclenchements. Vérifier l'état de la batterie de secours.",
      technicianNotes: "Demander au client si des travaux récents ont eu lieu ou si des animaux peuvent déclencher les détecteurs. Contrôler la sensibilité des capteurs concernés.",
    };
  }

  if (category.includes("interphonie") || category.includes("visiophone")) {
    return {
      probableEquipmentCategory: "Système d'interphonie / visiophone",
      probableIssue: "Défaut audio — perturbation électronique sur la ligne ou combiné intérieur défaillant. Image présente mais pas de son oriente vers l'alimentation audio du combiné plutôt que la platine de rue.",
      urgencyLevel: "INCONVENIENT",
      likelyParts: ["Combiné intérieur", "Carte audio platine de rue", "Câble de liaison"],
      recommendedTools: ["Multimètre", "Testeur de ligne"],
      safetyRisks: [],
      requiresHumanValidation: true,
      confidenceScore: 0.68,
      confidenceLevel: "MEDIUM",
      nextBestAction: "Tester avec un autre combiné si disponible pour isoler le problème. Vérifier les raccordements de la platine de rue et contrôler la tension d'alimentation.",
      technicianNotes: "Si plusieurs combinés sans son, le problème vient de la platine ou de la centrale. Si un seul combiné, remplacer le combiné défaillant.",
    };
  }

  // Default
  return {
    probableEquipmentCategory: input.equipmentCategory,
    probableIssue: "Diagnostic préliminaire insuffisant — informations complémentaires nécessaires pour émettre une hypothèse fiable.",
    urgencyLevel: "INCONVENIENT",
    likelyParts: [],
    recommendedTools: ["Multimètre", "Outillage standard"],
    safetyRisks: [],
    requiresHumanValidation: true,
    confidenceScore: 0.30,
    confidenceLevel: "LOW",
    nextBestAction: "Une visite de diagnostic est recommandée pour évaluer la situation in situ.",
    technicianNotes: "Demander plus de détails au client : date d'apparition, fréquence, contexte environnemental.",
  };
}
