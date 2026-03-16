"use client";

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles, Send, ArrowRight, AlertTriangle, Loader2,
  Shield, Settings2, DoorOpen, Wind, Wrench, MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PAGES } from "@/lib/constants";
import { detectIntent } from "@/lib/ai/intent-router";
import type { ChatMessage } from "@/types";

const QUICK_ACTIONS = [
  { label: "Mon portail est bloqué", icon: Settings2 },
  { label: "Ma clim ne refroidit plus", icon: Wind },
  { label: "Mon alarme déclenche sans raison", icon: Shield },
  { label: "Ma porte automatique s'ouvre seule", icon: DoorOpen },
  { label: "Je veux un devis", icon: Wrench },
];

const INITIAL_MESSAGE: ChatMessage = {
  id: "init",
  role: "assistant",
  content:
    "Bonjour, je suis l'assistant ASO31. Décrivez-moi votre problème technique ou votre besoin, et je vous aide à qualifier votre demande pour que notre équipe intervienne dans les meilleures conditions.\n\nQue puis-je faire pour vous ?",
  timestamp: new Date(),
};

interface AIAssistantProps {
  embedded?: boolean;
}

export function AIAssistant({ embedded = false }: AIAssistantProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [isTyping, setIsTyping] = useState(false);
  const [suggestedAction, setSuggestedAction] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { register, handleSubmit, reset, watch } = useForm<{ message: string }>();

  const inputValue = watch("message");

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: "user",
      content: content.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    reset();
    setIsTyping(true);

    // Detect intent
    const intent = detectIntent(content);
    if (intent.suggestedAction) setSuggestedAction(intent.suggestedAction);

    // Simulate AI response delay
    await new Promise((r) => setTimeout(r, 800 + Math.random() * 600));

    const aiMsg: ChatMessage = {
      id: `a-${Date.now()}`,
      role: "assistant",
      content: intent.suggestedResponse,
      timestamp: new Date(),
      metadata: {
        intent: intent.intent,
        confidence: intent.confidence,
        suggestedAction: intent.suggestedAction,
      },
    };

    setMessages((prev) => [...prev, aiMsg]);
    setIsTyping(false);
  };

  const onSubmit = handleSubmit((data) => sendMessage(data.message));

  const containerClass = embedded
    ? "flex flex-col h-full"
    : "flex flex-col max-w-2xl mx-auto";

  return (
    <div className={containerClass}>
      <div className={embedded ? "flex-1 overflow-hidden" : ""}>
        {/* Chat area */}
        <div
          className={`bg-white border border-border rounded-2xl overflow-hidden flex flex-col ${
            embedded ? "h-full" : "min-h-[500px]"
          }`}
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
            <div className="w-8 h-8 rounded-full bg-brand-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="font-semibold text-steel-900 text-sm">Assistant ASO31</p>
              <p className="text-xs text-success-600 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-success-500 inline-block" />
                Disponible
              </p>
            </div>
            <div className="ml-auto text-xs text-steel-400">
              IA métier · Qualification assistée
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-64">
            <AnimatePresence>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "assistant" && (
                    <div className="w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center shrink-0 mt-1">
                      <MessageSquare className="w-3.5 h-3.5 text-brand-600" />
                    </div>
                  )}
                  <div
                    className={`max-w-sm rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-brand-600 text-white rounded-tr-sm"
                        : "bg-surface-subtle border border-border text-steel-700 rounded-tl-sm"
                    }`}
                  >
                    {msg.content.split("\n").map((line, i) => (
                      <span key={i}>
                        {line}
                        {i < msg.content.split("\n").length - 1 && <br />}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-2 items-center"
              >
                <div className="w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center">
                  <Loader2 className="w-3.5 h-3.5 text-brand-600 animate-spin" />
                </div>
                <div className="bg-surface-subtle border border-border rounded-2xl rounded-tl-sm px-4 py-3">
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-steel-300 animate-bounce"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick actions (initial state) */}
          {messages.length === 1 && (
            <div className="px-4 pb-3">
              <p className="text-xs text-steel-400 mb-2">Suggestions rapides</p>
              <div className="flex flex-wrap gap-2">
                {QUICK_ACTIONS.map((action) => (
                  <button
                    key={action.label}
                    onClick={() => sendMessage(action.label)}
                    className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-border bg-white hover:bg-surface-subtle hover:border-steel-300 transition-all text-steel-600"
                  >
                    <action.icon className="w-3.5 h-3.5 text-brand-500" />
                    {action.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Suggested action */}
          <AnimatePresence>
            {suggestedAction && !isTyping && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="px-4 pb-3"
              >
                {suggestedAction === "OPEN_DEPANNAGE_FORM" && (
                  <div className="flex items-center justify-between p-3 bg-brand-50 border border-brand-200 rounded-xl text-sm">
                    <span className="text-brand-700 font-medium">Créer une demande de dépannage</span>
                    <Button asChild size="sm">
                      <a href={PAGES.public.depannage}>
                        Continuer <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </Button>
                  </div>
                )}
                {suggestedAction === "OPEN_DEVIS_FORM" && (
                  <div className="flex items-center justify-between p-3 bg-brand-50 border border-brand-200 rounded-xl text-sm">
                    <span className="text-brand-700 font-medium">Demander un devis</span>
                    <Button asChild size="sm">
                      <a href={PAGES.public.devis}>
                        Continuer <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </Button>
                  </div>
                )}
                {suggestedAction === "SHOW_EMERGENCY_CONTACT" && (
                  <div className="flex items-center gap-3 p-3 bg-critical-50 border border-critical-200 rounded-xl text-sm">
                    <AlertTriangle className="w-4 h-4 text-critical-600 shrink-0" />
                    <div className="flex-1">
                      <span className="text-critical-700 font-medium">Urgence : appelez directement</span>
                    </div>
                    <a
                      href="tel:0561324568"
                      className="text-critical-700 font-semibold text-sm"
                    >
                      05 61 32 45 68
                    </a>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Input */}
          <div className="px-4 pb-4">
            <form onSubmit={onSubmit} className="flex gap-2">
              <input
                {...register("message")}
                placeholder="Décrivez votre panne ou posez une question..."
                className="flex-1 px-4 py-2.5 text-sm border border-border rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                autoComplete="off"
              />
              <Button
                type="submit"
                size="icon"
                disabled={!inputValue?.trim() || isTyping}
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
            <p className="text-[10px] text-steel-400 mt-1.5 text-center">
              Assistant IA d&apos;aide à la qualification — ne remplace pas un diagnostic technicien
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
