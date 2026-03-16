import type { Metadata } from "next";
import { AIAssistant } from "@/components/ai/ai-assistant";

export const metadata: Metadata = {
  title: "Assistant IA — Décrivez votre panne | ASO31",
  description:
    "Décrivez votre problème technique à notre assistant IA métier. Il qualifie la panne, identifie les causes probables et prépare votre ticket d'intervention.",
};

export default function AssistantPage() {
  return (
    <div className="min-h-screen bg-surface-subtle">
      <div className="bg-steel-950 text-white py-12">
        <div className="container-page">
          <h1 className="text-3xl font-bold text-white mb-2">Assistant technique</h1>
          <p className="text-steel-300 max-w-xl">
            Décrivez votre panne ou votre besoin. Notre assistant analyse la situation,
            pose les bonnes questions et prépare une demande qualifiée pour notre équipe.
          </p>
        </div>
      </div>
      <div className="container-page py-8">
        <AIAssistant />
      </div>
    </div>
  );
}
