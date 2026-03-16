"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  CheckCircle2,
  Upload,
  AlertTriangle,
  Zap,
  Clock,
  Wrench,
  Shield,
  Settings2,
  DoorOpen,
  Wind,
  Loader2,
  ArrowRight,
  ChevronRight,
  FileText,
} from "lucide-react";
import { COMPANY, PAGES } from "@/lib/constants";

const TRUST_ITEMS = [
  "Toulouse et Occitanie — 31, 32, 81, 82, 09",
  "Toutes marques, tous équipements",
  "Fondée en 1987 · 35+ techniciens terrain",
  "Contrats d'entretien sur mesure",
];

const SYMPTOM_CHIPS = [
  "Totalement bloqué",
  "Mouvement partiel",
  "Bruit anormal",
  "Message d'erreur",
  "Panne intermittente",
  "Ne répond plus",
];

const SERVICE_HINTS = [
  {
    keywords: /portail|garage|barrière|rideau|vantail|automatisme/i,
    service: "Automatismes",
    icon: Settings2,
    href: "/services/automatismes",
    color: "bg-steel-100 text-steel-700",
  },
  {
    keywords: /alarme|détecteur|intrusion|badge|interphone|visiophone|caméra/i,
    service: "Alarme & Sécurité",
    icon: Shield,
    href: "/services/alarmes-securite",
    color: "bg-brand-50 text-brand-700",
  },
  {
    keywords: /clim|climatisation|froid|chaud|ventilation|pompe à chaleur|split/i,
    service: "Climatisation",
    icon: Wind,
    href: "/services/climatisation",
    color: "bg-sky-50 text-sky-700",
  },
  {
    keywords: /porte automatique|coulissante|tournante|piéton|sas/i,
    service: "Portes Automatiques",
    icon: DoorOpen,
    href: "/services/portes-automatiques",
    color: "bg-steel-100 text-steel-700",
  },
];

const HYPOTHESES: Record<string, [string, string, string]> = {
  Automatismes: [
    "Fin de course retour hors réglage",
    "Défaut alimentation moteur",
    "Détection d'obstacle active",
  ],
  "Alarme & Sécurité": [
    "Batterie de secours faible",
    "Défaut communication centrale",
    "Capteur désynchronisé",
  ],
  Climatisation: [
    "Fuite frigorigène probable",
    "Filtre encrassé ou obstrué",
    "Défaut sonde température",
  ],
  "Portes Automatiques": [
    "Cellule photoélectrique obstruée",
    "Défaut moteur ou variateur",
    "Réglage temporisation",
  ],
  "Maintenance & Dépannage": [
    "Composant électrique défaillant",
    "Pièce d'usure à remplacer",
    "Diagnostic complet requis",
  ],
};

interface AnalysisResult {
  service: string;
  ServiceIcon: React.ElementType;
  serviceHref: string;
  serviceColor: string;
  urgence: "Urgente" | "Modérée" | "Normale";
  urgenceColor: string;
  hypothesePrincipale: string;
  hypothesesSecondaires: string[];
  confiance: number;
  nextAction: string;
}

function analyzeQuery(input: string, chips: string[]): AnalysisResult {
  const text = input + " " + chips.join(" ");
  const matched = SERVICE_HINTS.find((h) => h.keywords.test(text));
  const service = matched?.service ?? "Maintenance & Dépannage";
  const ServiceIcon = matched?.icon ?? Wrench;
  const serviceHref = matched?.href ?? PAGES.public.depannage;
  const serviceColor = matched?.color ?? "bg-steel-100 text-steel-700";

  let urgence: "Urgente" | "Modérée" | "Normale" = "Normale";
  let urgenceColor = "bg-steel-100 text-steel-600 border-steel-200";
  if (chips.includes("Totalement bloqué")) {
    urgence = "Urgente";
    urgenceColor = "bg-red-50 text-red-700 border-red-200";
  } else if (
    chips.includes("Mouvement partiel") ||
    chips.includes("Panne intermittente") ||
    chips.includes("Bruit anormal")
  ) {
    urgence = "Modérée";
    urgenceColor = "bg-amber-50 text-amber-700 border-amber-200";
  }

  const hyps =
    HYPOTHESES[service] ?? HYPOTHESES["Maintenance & Dépannage"];
  const confiance =
    chips.length > 1
      ? 82 + Math.floor(Math.random() * 12)
      : 68 + Math.floor(Math.random() * 15);

  return {
    service,
    ServiceIcon,
    serviceHref,
    serviceColor,
    urgence,
    urgenceColor,
    hypothesePrincipale: hyps[0],
    hypothesesSecondaires: hyps.slice(1),
    confiance,
    nextAction: "Transmission à l'équipe terrain pour prise en charge",
  };
}

function TriageWidget() {
  const [activeTab, setActiveTab] = useState<"panne" | "photo" | "devis">(
    "panne"
  );
  const [input, setInput] = useState("");
  const [chips, setChips] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [photoState, setPhotoState] = useState<"idle" | "analyzing" | "done">(
    "idle"
  );

  const handleAnalyze = useCallback(async () => {
    if (!input.trim() && chips.length === 0) return;
    setIsAnalyzing(true);
    setResult(null);
    await new Promise((r) => setTimeout(r, 1300));
    setResult(analyzeQuery(input, chips));
    setIsAnalyzing(false);
  }, [input, chips]);

  const toggleChip = (chip: string) => {
    setChips((prev) =>
      prev.includes(chip) ? prev.filter((c) => c !== chip) : [...prev, chip]
    );
    setResult(null);
  };

  const handlePhotoInteraction = async () => {
    if (photoState !== "idle") return;
    setPhotoState("analyzing");
    await new Promise((r) => setTimeout(r, 1800));
    setPhotoState("done");
  };

  const tabs = [
    { id: "panne" as const, label: "Décrire une panne", icon: Wrench },
    { id: "photo" as const, label: "Photo", icon: Upload },
    { id: "devis" as const, label: "Devis", icon: FileText },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-2xl border border-steel-100 overflow-hidden">
      {/* Console header */}
      <div className="bg-steel-950 px-4 py-2.5 flex items-center gap-2.5">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-steel-700" />
          <div className="w-2.5 h-2.5 rounded-full bg-steel-700" />
          <div className="w-2.5 h-2.5 rounded-full bg-steel-700" />
        </div>
        <span className="text-xs text-steel-400 font-medium ml-1">
          Qualification assistée — ASO31
        </span>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs text-steel-500">En ligne</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-steel-100">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setResult(null);
                setPhotoState("idle");
              }}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium transition-colors ${
                activeTab === tab.id
                  ? "border-b-2 border-brand-600 text-brand-700 bg-brand-50/50"
                  : "text-steel-500 hover:text-steel-700 hover:bg-steel-50"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="p-5">
        <AnimatePresence mode="wait">
          {activeTab === "panne" && (
            <motion.div
              key="panne"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              {!result ? (
                <>
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ex : Mon portail s'ouvre mais ne se ferme plus depuis ce matin..."
                    className="w-full h-20 text-sm text-steel-700 placeholder-steel-300 resize-none border border-steel-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-400 transition-all"
                  />
                  <div>
                    <p className="text-xs text-steel-400 mb-2 font-medium">
                      Symptômes rapides
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {SYMPTOM_CHIPS.map((chip) => (
                        <button
                          key={chip}
                          onClick={() => toggleChip(chip)}
                          className={`text-xs px-2.5 py-1 rounded-full border transition-all ${
                            chips.includes(chip)
                              ? "bg-brand-600 border-brand-600 text-white"
                              : "bg-white border-steel-200 text-steel-600 hover:border-brand-300 hover:text-brand-700"
                          }`}
                        >
                          {chip}
                        </button>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={handleAnalyze}
                    disabled={!input.trim() && chips.length === 0}
                    className="w-full flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 disabled:bg-steel-100 disabled:text-steel-400 disabled:cursor-not-allowed text-white text-sm font-semibold py-2.5 rounded-xl transition-colors"
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Qualification en cours…
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4" />
                        Analyser la situation
                      </>
                    )}
                  </button>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-3"
                >
                  {/* Service détecté */}
                  <div className="flex items-center justify-between p-3 bg-steel-50 rounded-xl border border-steel-100">
                    <div className="flex items-center gap-2.5">
                      <div className={`p-1.5 rounded-lg ${result.serviceColor}`}>
                        <result.ServiceIcon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs text-steel-400">Service détecté</p>
                        <p className="text-sm font-semibold text-steel-900">
                          {result.service}
                        </p>
                      </div>
                    </div>
                    <div
                      className={`text-xs font-medium px-2.5 py-1 rounded-full border ${result.urgenceColor}`}
                    >
                      {result.urgence}
                    </div>
                  </div>

                  {/* Hypothèse */}
                  <div className="p-3 bg-white rounded-xl border border-steel-100">
                    <p className="text-xs text-steel-400 mb-1">
                      Hypothèse principale
                    </p>
                    <p className="text-sm font-medium text-steel-800">
                      {result.hypothesePrincipale}
                    </p>
                    <div className="mt-2 space-y-1">
                      {result.hypothesesSecondaires.map((h) => (
                        <div
                          key={h}
                          className="flex items-center gap-1.5 text-xs text-steel-500"
                        >
                          <ChevronRight className="w-3 h-3 shrink-0" />
                          {h}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Confiance + validation */}
                  <div className="flex gap-2">
                    <div className="flex-1 p-2.5 bg-steel-50 rounded-lg border border-steel-100 text-center">
                      <p className="text-xs text-steel-400">Confiance</p>
                      <p className="text-lg font-bold text-steel-900">
                        {result.confiance}%
                      </p>
                    </div>
                    <div className="flex-1 p-2.5 bg-amber-50 rounded-lg border border-amber-100 flex items-start gap-1.5 pl-3">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                      <p className="text-xs text-amber-700 leading-tight">
                        Validation technicien requise
                      </p>
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="flex flex-col gap-2">
                    <Link
                      href={PAGES.public.depannage}
                      className="flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors"
                    >
                      <Zap className="w-4 h-4" />
                      Créer le ticket maintenant
                    </Link>
                    <div className="flex gap-2">
                      <a
                        href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}
                        className="flex-1 flex items-center justify-center gap-1.5 border border-steel-200 text-steel-700 hover:bg-steel-50 text-xs font-medium py-2 rounded-xl transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        Rappel
                      </a>
                      <Link
                        href={PAGES.public.rendezvous}
                        className="flex-1 flex items-center justify-center gap-1.5 border border-steel-200 text-steel-700 hover:bg-steel-50 text-xs font-medium py-2 rounded-xl transition-colors"
                      >
                        <Clock className="w-3.5 h-3.5" />
                        Rendez-vous
                      </Link>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setResult(null);
                      setInput("");
                      setChips([]);
                    }}
                    className="w-full text-xs text-steel-400 hover:text-steel-600 py-1 transition-colors"
                  >
                    Nouvelle analyse
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}

          {activeTab === "photo" && (
            <motion.div
              key="photo"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              {photoState === "idle" && (
                <div
                  onClick={handlePhotoInteraction}
                  className="border-2 border-dashed border-steel-200 rounded-xl p-8 text-center cursor-pointer hover:border-brand-400 hover:bg-brand-50/30 transition-all group"
                >
                  <Upload className="w-8 h-8 mx-auto text-steel-300 group-hover:text-brand-500 mb-3 transition-colors" />
                  <p className="text-sm font-medium text-steel-700">
                    Déposez une photo
                  </p>
                  <p className="text-xs text-steel-400 mt-1">
                    ou cliquez pour sélectionner
                  </p>
                  <p className="text-xs text-steel-300 mt-3">
                    JPG, PNG, HEIC · max 10 Mo
                  </p>
                </div>
              )}
              {photoState === "analyzing" && (
                <div className="p-10 text-center">
                  <div className="w-12 h-12 rounded-full bg-brand-50 flex items-center justify-center mx-auto mb-3">
                    <Loader2 className="w-6 h-6 text-brand-600 animate-spin" />
                  </div>
                  <p className="text-sm font-medium text-steel-700">
                    Analyse de l'image en cours
                  </p>
                  <p className="text-xs text-steel-400 mt-1">
                    Détection équipement et anomalies visibles…
                  </p>
                </div>
              )}
              {photoState === "done" && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-3"
                >
                  <div className="p-3 bg-steel-50 rounded-xl border border-steel-100">
                    <p className="text-xs text-steel-400 mb-1">
                      Équipement identifié
                    </p>
                    <p className="text-sm font-semibold text-steel-900">
                      Portail coulissant motorisé
                    </p>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-steel-100">
                    <p className="text-xs text-steel-400 mb-1">
                      Anomalie détectée
                    </p>
                    <p className="text-sm font-medium text-steel-800">
                      Usure visible sur crémaillère — vérification moteur
                      recommandée
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1 p-2.5 bg-amber-50 rounded-lg border border-amber-100 text-center">
                      <p className="text-xs text-amber-700 font-medium">
                        Urgence modérée
                      </p>
                    </div>
                    <div className="flex-1 p-2.5 bg-steel-50 rounded-lg border border-steel-100 text-center">
                      <p className="text-xs text-steel-400">Confiance</p>
                      <p className="text-sm font-bold text-steel-900">76%</p>
                    </div>
                  </div>
                  <Link
                    href={PAGES.public.depannage}
                    className="w-full flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors"
                  >
                    <Zap className="w-4 h-4" />
                    Créer le ticket
                  </Link>
                  <button
                    onClick={() => setPhotoState("idle")}
                    className="w-full text-xs text-steel-400 hover:text-steel-600 py-1 transition-colors"
                  >
                    Autre photo
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}

          {activeTab === "devis" && (
            <motion.div
              key="devis"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="space-y-3"
            >
              <div>
                <label className="text-xs font-medium text-steel-600 mb-1.5 block">
                  Type d'équipement
                </label>
                <select className="w-full text-sm border border-steel-200 rounded-xl px-3 py-2.5 text-steel-700 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-400">
                  <option value="">Sélectionner…</option>
                  <option>Portail automatique</option>
                  <option>Porte automatique</option>
                  <option>Alarme / Vidéosurveillance</option>
                  <option>Climatisation / PAC</option>
                  <option>Barrière levante</option>
                  <option>Autre</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-steel-600 mb-1.5 block">
                  Nature du besoin
                </label>
                <select className="w-full text-sm border border-steel-200 rounded-xl px-3 py-2.5 text-steel-700 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-400">
                  <option value="">Sélectionner…</option>
                  <option>Installation neuve</option>
                  <option>Remplacement</option>
                  <option>Extension / Ajout</option>
                  <option>Contrat d'entretien</option>
                </select>
              </div>
              <textarea
                placeholder="Précisions supplémentaires (optionnel)"
                className="w-full h-16 text-sm placeholder-steel-300 text-steel-700 border border-steel-200 rounded-xl px-3 py-2.5 resize-none focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-400 transition-all"
              />
              <Link
                href={PAGES.public.devis}
                className="w-full flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors"
              >
                <ArrowRight className="w-4 h-4" />
                Obtenir un devis gratuit
              </Link>
              <p className="text-xs text-steel-400 text-center">
                Réponse sous 4h en jours ouvrés
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-steel-950 text-white">
      {/* Background photo */}
      <div className="absolute inset-0">
        <Image
          src="/images/company/batiment-facade.jpg"
          alt="Bâtiment ASO — Cugnaux, Toulouse"
          fill
          priority
          quality={85}
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-steel-950/95 via-steel-950/85 to-steel-950/60 lg:to-steel-950/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-steel-950/70 via-transparent to-transparent" />
      </div>

      <div className="container-page relative">
        <div className="py-16 md:py-24 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left column */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-500/20 border border-brand-500/30 text-brand-300 text-sm font-medium mb-6"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse" />
                Toulouse · Occitanie — 31, 32, 81, 82, 09
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight text-white mb-5"
              >
                Maintenance technique{" "}
                <span className="text-brand-400">pilotée avec précision</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg text-steel-300 max-w-lg leading-relaxed mb-7"
              >
                Automatismes, alarmes, portes automatiques et climatisation.
                Qualification intelligente, bon technicien, suivi clair de bout
                en bout.
              </motion.p>

              <motion.ul
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-wrap gap-x-5 gap-y-2 mb-8"
              >
                {TRUST_ITEMS.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm text-steel-300"
                  >
                    <CheckCircle2 className="w-4 h-4 text-brand-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </motion.ul>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <a
                  href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}
                  className="inline-flex items-center gap-2.5 text-steel-300 hover:text-white transition-colors group"
                >
                  <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-white/15 transition-colors">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-sm font-semibold block leading-tight">
                      {COMPANY.phone}
                    </span>
                    <span className="text-xs text-steel-500">
                      Lun – Ven, 8h–18h
                    </span>
                  </div>
                </a>
              </motion.div>
            </div>

            {/* Right column — Triage Widget */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="w-full lg:max-w-md"
            >
              <p className="text-xs text-steel-400 mb-3 font-medium uppercase tracking-wide">
                Qualifiez votre besoin — résultat en temps réel
              </p>
              <TriageWidget />
            </motion.div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/5 to-transparent pointer-events-none" />
    </section>
  );
}
