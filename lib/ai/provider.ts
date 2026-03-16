// ASO31 AI Provider — Abstraction layer over LLM providers
// Allows swapping OpenAI <-> Anthropic <-> local without touching business logic

import OpenAI from "openai";

let _client: OpenAI | null = null;

function getClient(): OpenAI {
  if (!_client) {
    _client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY ?? "sk-placeholder",
    });
  }
  return _client;
}

export const AI_MODEL = process.env.OPENAI_MODEL ?? "gpt-4o";
export const AI_TEMPERATURE = 0.2; // Low temperature for consistent, factual responses

export type AIMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

export type AICompletionOptions = {
  messages: AIMessage[];
  model?: string;
  temperature?: number;
  maxTokens?: number;
  jsonMode?: boolean;
};

export type AICompletionResult = {
  content: string;
  usage?: { promptTokens: number; completionTokens: number; totalTokens: number };
};

export async function getCompletion(options: AICompletionOptions): Promise<AICompletionResult> {
  const {
    messages,
    model = AI_MODEL,
    temperature = AI_TEMPERATURE,
    maxTokens = 2000,
    jsonMode = false,
  } = options;

  // If no valid API key, return mock response
  if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === "sk-placeholder") {
    return getMockCompletion(messages);
  }

  try {
    const client = getClient();
    const response = await client.chat.completions.create({
      model,
      messages,
      temperature,
      max_tokens: maxTokens,
      response_format: jsonMode ? { type: "json_object" } : undefined,
    });

    return {
      content: response.choices[0]?.message?.content ?? "",
      usage: response.usage
        ? {
            promptTokens: response.usage.prompt_tokens,
            completionTokens: response.usage.completion_tokens,
            totalTokens: response.usage.total_tokens,
          }
        : undefined,
    };
  } catch (error) {
    console.error("[AI Provider] Completion failed:", error);
    return getMockCompletion(messages);
  }
}

// Mock completions for development / no API key
function getMockCompletion(messages: AIMessage[]): AICompletionResult {
  const lastUserMessage = messages.filter(m => m.role === "user").at(-1)?.content ?? "";
  const isJson = messages.some(m => m.content.includes("JSON") || m.content.includes("json"));

  if (isJson) {
    return {
      content: JSON.stringify({
        response: "Je comprends votre demande. Pouvez-vous me décrire plus précisément le problème observé ?",
        intent: "TRIAGE",
        confidence: 0.7,
        suggestedAction: "GATHER_INFO",
      }),
    };
  }

  // Context-aware mock responses
  if (lastUserMessage.toLowerCase().includes("portail")) {
    return {
      content: "Concernant votre portail, plusieurs causes peuvent expliquer ce comportement. Avant toute chose, vérifiez que la télécommande fonctionne (pile, portée), et observez si le moteur tente de démarrer. Si vous entendez un déclic mais sans mouvement, cela peut indiquer un obstacle mécanique ou un fin de course décalé. Pouvez-vous préciser si le portail est totalement bloqué ou s'il effectue une partie du cycle ?",
    };
  }

  if (lastUserMessage.toLowerCase().includes("climatisation") || lastUserMessage.toLowerCase().includes("clim")) {
    return {
      content: "Pour la climatisation, la première vérification à effectuer est le filtre (souvent encrassé, ce qui réduit les performances). Ensuite, vérifiez la température de consigne et le mode sélectionné. Si l'appareil souffle mais ne refroidit pas, cela peut indiquer une pression de fluide faible ou une sonde défaillante. Une intervention technique est recommandée dans ce cas.",
    };
  }

  return {
    content: "Je prends note de votre situation. Pour mieux vous orienter, pouvez-vous me préciser : l'équipement est-il totalement hors service ou partiellement fonctionnel ? Y a-t-il eu un événement récent (coupure de courant, choc, intempérie) avant l'apparition du problème ?",
  };
}
