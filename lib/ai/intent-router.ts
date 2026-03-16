// ASO31 Intent Router — Classifies user messages into business intents

export type Intent =
  | "REQUEST_REPAIR"
  | "REQUEST_QUOTE"
  | "REQUEST_APPOINTMENT"
  | "ASK_FAQ"
  | "REPORT_URGENCY"
  | "CHECK_STATUS"
  | "GENERAL_INFO"
  | "UNKNOWN";

export type IntentResult = {
  intent: Intent;
  confidence: number;
  extractedData: {
    category?: string;
    symptom?: string;
    urgency?: string;
    location?: string;
  };
  suggestedResponse: string;
  suggestedAction?: string;
};

const INTENT_PATTERNS: Record<Intent, RegExp[]> = {
  REQUEST_REPAIR: [
    /\b(panne|bloqué|en panne|ne fonctionne plus|cassé|défaillant|problème|ne marche plus|broken|bugge)\b/i,
    /\b(dépannage|réparer|intervention urgente|dépanner)\b/i,
  ],
  REQUEST_QUOTE: [
    /\b(devis|prix|tarif|coût|combien|chiffrage|estimation)\b/i,
    /\b(installation|installer|mettre en place|équiper|nouveau)\b/i,
  ],
  REQUEST_APPOINTMENT: [
    /\b(rendez-vous|RDV|visite|passage|venir|intervenir|planifier)\b/i,
    /\b(quand|disponible|disponibilité|agenda|créneau)\b/i,
  ],
  ASK_FAQ: [
    /\b(comment|pourquoi|quoi|quel|quelle|est-ce que|peut-on|faut-il)\b/i,
    /\b(contrat|maintenance|entretien|garantie|zone|délai|horaire)\b/i,
  ],
  REPORT_URGENCY: [
    /\b(urgent|urgence|tout de suite|immédiatement|critique|sécurité|bloqué complètement|danger)\b/i,
  ],
  CHECK_STATUS: [
    /\b(statut|où en est|avancement|suivi|ticket|ma demande|mon dossier)\b/i,
  ],
  GENERAL_INFO: [
    /\b(bonjour|bonsoir|salut|aide|informations|renseignements|services)\b/i,
  ],
  UNKNOWN: [],
};

export function detectIntent(message: string): IntentResult {
  const scores: Record<Intent, number> = {
    REQUEST_REPAIR: 0,
    REQUEST_QUOTE: 0,
    REQUEST_APPOINTMENT: 0,
    ASK_FAQ: 0,
    REPORT_URGENCY: 0,
    CHECK_STATUS: 0,
    GENERAL_INFO: 0,
    UNKNOWN: 0,
  };

  for (const [intent, patterns] of Object.entries(INTENT_PATTERNS) as [Intent, RegExp[]][]) {
    for (const pattern of patterns) {
      if (pattern.test(message)) {
        scores[intent] += 1;
      }
    }
  }

  // Check urgency first (highest priority)
  if (scores.REPORT_URGENCY > 0) {
    return {
      intent: "REPORT_URGENCY",
      confidence: 0.9,
      extractedData: { urgency: "CRITICAL_SAFETY" },
      suggestedResponse: "Je détecte une situation urgente. Pour une intervention immédiate, appelez notre ligne d'urgence au **05 61 32 45 68**. Je reste disponible pour qualifier votre demande pendant ce temps.",
      suggestedAction: "SHOW_EMERGENCY_CONTACT",
    };
  }

  const topIntent = Object.entries(scores).reduce((a, b) => (a[1] > b[1] ? a : b)) as [Intent, number];
  const [intent, score] = topIntent;

  if (score === 0) {
    return {
      intent: "UNKNOWN",
      confidence: 0.3,
      extractedData: {},
      suggestedResponse: "Je suis votre assistant ASO31. Puis-je vous aider pour un dépannage, un devis, ou des informations sur nos services ?",
      suggestedAction: "SHOW_QUICK_ACTIONS",
    };
  }

  const responses: Record<Intent, string> = {
    REQUEST_REPAIR: "Je comprends que vous rencontrez un problème technique. Pour vous aider au mieux, pouvez-vous me préciser : quel équipement est concerné, et décrire le symptôme observé ?",
    REQUEST_QUOTE: "Je vais vous aider à préparer votre demande de devis. De quel type d'équipement ou service avez-vous besoin ?",
    REQUEST_APPOINTMENT: "Je peux vous aider à prendre un rendez-vous. Quel est l'objet de l'intervention souhaitée ?",
    ASK_FAQ: "Bonne question. Je vais vous apporter une réponse précise. Pouvez-vous préciser votre question ?",
    REPORT_URGENCY: "Situation urgente détectée. Contactez le 05 61 32 45 68.",
    CHECK_STATUS: "Pour suivre l'avancement de votre demande, connectez-vous à votre espace client ou indiquez-moi votre référence de ticket.",
    GENERAL_INFO: "Bonjour ! Je suis l'assistant ASO31. Je peux vous aider pour un dépannage, un devis, prendre rendez-vous ou répondre à vos questions. Que puis-je faire pour vous ?",
    UNKNOWN: "Comment puis-je vous aider ?",
  };

  return {
    intent,
    confidence: Math.min(0.5 + score * 0.15, 0.95),
    extractedData: extractData(message),
    suggestedResponse: responses[intent],
    suggestedAction: getAction(intent),
  };
}

function extractData(message: string): IntentResult["extractedData"] {
  const data: IntentResult["extractedData"] = {};

  // Equipment category detection
  if (/portail|barrière|automatisme/i.test(message)) data.category = "AUTOMATION";
  else if (/clim|climatisation|froid|chaud/i.test(message)) data.category = "CLIMATISATION";
  else if (/alarme|sécurité|intrusion|badge|accès/i.test(message)) data.category = "ALARM_SECURITY";
  else if (/porte automatique|rideau|sectionnelle/i.test(message)) data.category = "AUTOMATIC_DOORS";

  // Urgency
  if (/urgent|urgence|immédiat/i.test(message)) data.urgency = "BLOCKING";
  else if (/bloqué|complètement|ne s'ouvre plus|ne se ferme plus/i.test(message)) data.urgency = "BLOCKING";

  return data;
}

function getAction(intent: Intent): string | undefined {
  const actions: Partial<Record<Intent, string>> = {
    REQUEST_REPAIR: "OPEN_DEPANNAGE_FORM",
    REQUEST_QUOTE: "OPEN_DEVIS_FORM",
    REQUEST_APPOINTMENT: "OPEN_APPOINTMENT_FORM",
    CHECK_STATUS: "REDIRECT_PORTAL",
  };
  return actions[intent];
}
