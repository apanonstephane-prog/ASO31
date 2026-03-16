"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  User, Building2, MapPin, Settings2, MessageSquare,
  AlertTriangle, Upload, CheckCircle2, ChevronRight, ChevronLeft,
  Shield, DoorOpen, Wind, Wrench
} from "lucide-react";
import { toast } from "sonner";
import { depannageSchema, type DepannageInput } from "@/lib/validation/forms";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

const STEPS = [
  { id: 1, label: "Profil", icon: User },
  { id: 2, label: "Site", icon: MapPin },
  { id: 3, label: "Panne", icon: Settings2 },
  { id: 4, label: "Urgence", icon: AlertTriangle },
  { id: 5, label: "Confirmation", icon: CheckCircle2 },
];

const CLIENT_TYPES = [
  { value: "INDIVIDUAL", label: "Particulier", icon: User },
  { value: "BUSINESS", label: "Entreprise / Commerce", icon: Building2 },
  { value: "SYNDIC", label: "Syndic / Copropriété", icon: Building2 },
  { value: "COLLECTIVITY", label: "Collectivité", icon: Building2 },
];

const CATEGORIES = [
  { value: "ALARM_SECURITY", label: "Alarme & Sécurité", icon: Shield },
  { value: "AUTOMATION", label: "Automatisme / Portail", icon: Settings2 },
  { value: "AUTOMATIC_DOORS", label: "Porte Automatique", icon: DoorOpen },
  { value: "CLIMATISATION", label: "Climatisation", icon: Wind },
  { value: "MAINTENANCE_REPAIR", label: "Autre / Ne sait pas", icon: Wrench },
];

const URGENCIES = [
  {
    value: "NON_BLOCKING",
    label: "Non bloquant",
    description: "L'équipement fonctionne partiellement ou la panne est ancienne.",
  },
  {
    value: "INCONVENIENT",
    label: "Gênant",
    description: "La panne génère une gêne quotidienne mais n'est pas critique.",
  },
  {
    value: "BLOCKING",
    label: "Bloquant",
    description: "L'équipement est hors service et impacte l'activité ou l'accès.",
  },
  {
    value: "CRITICAL_SAFETY",
    label: "Critique / Sécurité",
    description: "La panne représente un risque de sécurité ou un accès impossible.",
  },
];

const COMMON_SYMPTOMS: Record<string, string[]> = {
  AUTOMATION: [
    "Ne répond plus aux télécommandes",
    "S'ouvre mais ne se ferme plus",
    "Se ferme mais ne s'ouvre plus",
    "Fait un bruit anormal",
    "Cycle incomplet (s'arrête à mi-course)",
    "Moteur démarre mais portail ne bouge pas",
    "Bloqué mécaniquement",
  ],
  ALARM_SECURITY: [
    "Déclenchements intempestifs",
    "Sirène ne se déclenche pas",
    "Clavier ne répond plus",
    "Perte de communication centrale",
    "Badge ou digicode non reconnu",
    "Caméra hors service",
    "Batterie de secours faible",
  ],
  AUTOMATIC_DOORS: [
    "Porte ne s'ouvre pas au déclenchement",
    "S'ouvre seule sans sollicitation",
    "Bloquée en position fermée",
    "Bloquée en position ouverte",
    "Bruit anormal en fonctionnement",
    "Rideau bloqué en montée ou descente",
    "Mouvement saccadé ou irrégulier",
  ],
  CLIMATISATION: [
    "Ne refroidit plus / ne chauffe plus",
    "Souffle mais sans effet thermique",
    "Bruit anormal (sifflement, vibration)",
    "Fuite d'eau intérieure",
    "Groupe extérieur ne démarre pas",
    "Affichage d'un code erreur",
    "Gel de l'unité intérieure",
  ],
  MAINTENANCE_REPAIR: [
    "Panne non identifiée",
    "Équipement vieillissant",
    "Révision ou entretien",
    "Bruit anormal",
    "Baisse de performance",
  ],
};

interface DepannageFormProps {
  prefilledCategory?: string;
}

export function DepannageForm({ prefilledCategory }: DepannageFormProps) {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<DepannageInput>({
    resolver: zodResolver(depannageSchema),
    defaultValues: {
      clientType: "INDIVIDUAL",
      category: (prefilledCategory as DepannageInput["category"]) ?? "AUTOMATION",
      urgency: "INCONVENIENT",
      isFullyDown: false,
      symptoms: [],
      photos: [],
    },
  });

  const watchedCategory = watch("category");
  const watchedClientType = watch("clientType");

  const progress = ((step - 1) / (STEPS.length - 1)) * 100;

  const STEP_FIELDS: Record<number, (keyof DepannageInput)[]> = {
    1: ["clientType", "firstName", "lastName", "email", "phone"],
    2: ["siteAddress", "siteCity", "sitePostal"],
    3: ["category", "equipmentDescription", "symptomDescription"],
    4: ["urgency"],
  };

  const handleNext = async () => {
    const fields = STEP_FIELDS[step];
    if (fields) {
      const valid = await trigger(fields);
      if (!valid) return;
    }
    setStep((s) => Math.min(s + 1, STEPS.length));
  };

  const handlePrev = () => setStep((s) => Math.max(s - 1, 1));

  const toggleSymptom = (symptom: string) => {
    const next = selectedSymptoms.includes(symptom)
      ? selectedSymptoms.filter((s) => s !== symptom)
      : [...selectedSymptoms, symptom];
    setSelectedSymptoms(next);
    setValue("symptoms", next);
  };

  const onSubmit = async (data: DepannageInput) => {
    setIsSubmitting(true);
    try {
      // In production: call server action
      await new Promise((r) => setTimeout(r, 1200));
      setSubmitted(true);
      toast.success("Demande enregistrée avec succès");
    } catch {
      toast.error("Erreur lors de l'envoi. Réessayez ou appelez-nous directement.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-16 px-4">
        <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 text-success-600" />
        </div>
        <h2 className="text-2xl font-bold text-steel-900 mb-2">Demande enregistrée</h2>
        <p className="text-steel-500 max-w-md mx-auto leading-relaxed">
          Votre demande de dépannage a bien été transmise à notre équipe.
          Nous vous contactons sous peu pour confirmer le créneau d&apos;intervention.
        </p>
        <p className="text-sm text-steel-400 mt-3">
          Besoin d&apos;une réponse immédiate ? Appelez le{" "}
          <a href="tel:0561324567" className="text-brand-600 font-medium">05 61 32 45 67</a>
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          {STEPS.map((s, i) => (
            <div
              key={s.id}
              className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${
                step === s.id
                  ? "text-brand-700"
                  : step > s.id
                  ? "text-success-600"
                  : "text-steel-400"
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  step > s.id
                    ? "bg-success-500 text-white"
                    : step === s.id
                    ? "bg-brand-700 text-white"
                    : "bg-steel-100 text-steel-400"
                }`}
              >
                {step > s.id ? <CheckCircle2 className="w-3.5 h-3.5" /> : s.id}
              </div>
              <span className="hidden sm:block">{s.label}</span>
            </div>
          ))}
        </div>
        <Progress value={progress} className="h-1.5" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {/* Step 1: Profile */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-steel-900 mb-1">Qui êtes-vous ?</h2>
                  <p className="text-steel-500 text-sm">Ces informations permettent d&apos;orienter et prioriser votre demande.</p>
                </div>

                <div>
                  <Label className="mb-2 block">Type de client</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {CLIENT_TYPES.map((type) => (
                      <button
                        key={type.value}
                        type="button"
                        onClick={() => setValue("clientType", type.value as DepannageInput["clientType"])}
                        className={`flex items-center gap-2.5 p-3 rounded-xl border text-left transition-all ${
                          watchedClientType === type.value
                            ? "border-brand-500 bg-brand-50 text-brand-700"
                            : "border-border hover:border-steel-300"
                        }`}
                      >
                        <type.icon className="w-4 h-4 shrink-0" />
                        <span className="text-sm font-medium">{type.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {(watchedClientType === "BUSINESS" || watchedClientType === "SYNDIC" || watchedClientType === "COLLECTIVITY") && (
                  <div>
                    <Label htmlFor="companyName">Nom de la société / résidence</Label>
                    <Input
                      id="companyName"
                      placeholder="Nom de votre société ou résidence"
                      className="mt-1.5"
                      {...register("companyName")}
                    />
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="firstName" required>Prénom</Label>
                    <Input
                      id="firstName"
                      placeholder="Votre prénom"
                      className="mt-1.5"
                      error={!!errors.firstName}
                      {...register("firstName")}
                    />
                    {errors.firstName && <p className="form-field-hint text-critical-600">{errors.firstName.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="lastName" required>Nom</Label>
                    <Input
                      id="lastName"
                      placeholder="Votre nom"
                      className="mt-1.5"
                      error={!!errors.lastName}
                      {...register("lastName")}
                    />
                    {errors.lastName && <p className="form-field-hint text-critical-600">{errors.lastName.message}</p>}
                  </div>
                </div>

                <div>
                  <Label htmlFor="email" required>Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="votre@email.fr"
                    className="mt-1.5"
                    error={!!errors.email}
                    {...register("email")}
                  />
                  {errors.email && <p className="form-field-hint text-critical-600">{errors.email.message}</p>}
                </div>

                <div>
                  <Label htmlFor="phone" required>Téléphone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="06 XX XX XX XX"
                    className="mt-1.5"
                    error={!!errors.phone}
                    {...register("phone")}
                  />
                  <p className="form-field-hint">Nous vous appelons pour confirmer le créneau d&apos;intervention.</p>
                  {errors.phone && <p className="form-field-hint text-critical-600">{errors.phone.message}</p>}
                </div>
              </div>
            )}

            {/* Step 2: Site */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-steel-900 mb-1">Adresse du site</h2>
                  <p className="text-steel-500 text-sm">Où se trouve l&apos;équipement en panne ?</p>
                </div>

                <div>
                  <Label htmlFor="siteAddress" required>Adresse</Label>
                  <Input
                    id="siteAddress"
                    placeholder="Numéro et nom de la rue"
                    className="mt-1.5"
                    error={!!errors.siteAddress}
                    {...register("siteAddress")}
                  />
                  {errors.siteAddress && <p className="form-field-hint text-critical-600">{errors.siteAddress.message}</p>}
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-1">
                    <Label htmlFor="sitePostal" required>Code postal</Label>
                    <Input
                      id="sitePostal"
                      placeholder="31000"
                      className="mt-1.5"
                      error={!!errors.sitePostal}
                      {...register("sitePostal")}
                    />
                    {errors.sitePostal && <p className="form-field-hint text-critical-600">{errors.sitePostal.message}</p>}
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="siteCity" required>Ville</Label>
                    <Input
                      id="siteCity"
                      placeholder="Toulouse"
                      className="mt-1.5"
                      error={!!errors.siteCity}
                      {...register("siteCity")}
                    />
                    {errors.siteCity && <p className="form-field-hint text-critical-600">{errors.siteCity.message}</p>}
                  </div>
                </div>

                <div>
                  <Label htmlFor="accessNotes">Contraintes d&apos;accès</Label>
                  <Textarea
                    id="accessNotes"
                    placeholder="Code d'entrée, parking, contact sur place, horaires d'accès..."
                    className="mt-1.5"
                    rows={3}
                    {...register("accessNotes")}
                  />
                  <p className="form-field-hint">Ces informations aident le technicien à arriver préparé.</p>
                </div>
              </div>
            )}

            {/* Step 3: Equipment & Symptoms */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-steel-900 mb-1">L&apos;équipement et la panne</h2>
                  <p className="text-steel-500 text-sm">Plus vous êtes précis, mieux nous préparons l&apos;intervention.</p>
                </div>

                <div>
                  <Label className="mb-2 block">Catégorie d&apos;équipement</Label>
                  <div className="grid grid-cols-1 gap-2">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat.value}
                        type="button"
                        onClick={() => {
                          setValue("category", cat.value as DepannageInput["category"]);
                          setSelectedSymptoms([]);
                          setValue("symptoms", []);
                        }}
                        className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                          watchedCategory === cat.value
                            ? "border-brand-500 bg-brand-50"
                            : "border-border hover:border-steel-300"
                        }`}
                      >
                        <cat.icon className={`w-4 h-4 shrink-0 ${watchedCategory === cat.value ? "text-brand-600" : "text-steel-400"}`} />
                        <span className={`text-sm font-medium ${watchedCategory === cat.value ? "text-brand-700" : "text-steel-700"}`}>
                          {cat.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="equipmentDescription" required>
                    Description de l&apos;équipement
                  </Label>
                  <Input
                    id="equipmentDescription"
                    placeholder="Ex : portail coulissant Somfy, rideau métallique intérieur, split mural Daikin..."
                    className="mt-1.5"
                    error={!!errors.equipmentDescription}
                    {...register("equipmentDescription")}
                  />
                  {errors.equipmentDescription && (
                    <p className="form-field-hint text-critical-600">{errors.equipmentDescription.message}</p>
                  )}
                </div>

                {COMMON_SYMPTOMS[watchedCategory] && (
                  <div>
                    <Label className="mb-2 block">Symptômes observés (sélectionnez tout ce qui s&apos;applique)</Label>
                    <div className="flex flex-wrap gap-2">
                      {COMMON_SYMPTOMS[watchedCategory].map((symptom) => (
                        <button
                          key={symptom}
                          type="button"
                          onClick={() => toggleSymptom(symptom)}
                          className={`text-sm px-3 py-1.5 rounded-lg border transition-all ${
                            selectedSymptoms.includes(symptom)
                              ? "border-brand-400 bg-brand-50 text-brand-700"
                              : "border-border text-steel-600 hover:border-steel-300"
                          }`}
                        >
                          {symptom}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <Label htmlFor="symptomDescription" required>
                    Description libre de la panne
                  </Label>
                  <Textarea
                    id="symptomDescription"
                    placeholder="Décrivez ce que vous observez, quand le problème a commencé, si un événement particulier a précédé la panne (coupure de courant, choc, intempérie)..."
                    className="mt-1.5"
                    rows={4}
                    error={!!errors.symptomDescription}
                    {...register("symptomDescription")}
                  />
                  <p className="form-field-hint">
                    Indiquez si l&apos;équipement est totalement hors service ou partiellement fonctionnel.
                  </p>
                  {errors.symptomDescription && (
                    <p className="form-field-hint text-critical-600">{errors.symptomDescription.message}</p>
                  )}
                </div>

                <div className="p-4 bg-surface-subtle border border-border rounded-xl">
                  <div className="flex items-center gap-2 text-sm text-steel-600">
                    <Upload className="w-4 h-4 text-brand-600 shrink-0" />
                    <span>
                      Vous pouvez envoyer des photos via l&apos;assistant IA ou par email à{" "}
                      <a href="mailto:sav@aso31.fr" className="text-brand-600 font-medium">sav@aso31.fr</a>{" "}
                      en mentionnant votre nom.
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Urgency */}
            {step === 4 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-steel-900 mb-1">Niveau d&apos;urgence</h2>
                  <p className="text-steel-500 text-sm">
                    Cette information détermine la priorité d&apos;affectation de votre ticket.
                  </p>
                </div>

                <div className="space-y-2">
                  {URGENCIES.map((u) => (
                    <button
                      key={u.value}
                      type="button"
                      onClick={() => setValue("urgency", u.value as DepannageInput["urgency"])}
                      className={`w-full flex flex-col gap-1 p-4 rounded-xl border text-left transition-all ${
                        watch("urgency") === u.value
                          ? u.value === "CRITICAL_SAFETY"
                            ? "border-critical-400 bg-critical-50"
                            : "border-brand-400 bg-brand-50"
                          : "border-border hover:border-steel-300"
                      }`}
                    >
                      <span
                        className={`font-semibold text-sm ${
                          watch("urgency") === u.value
                            ? u.value === "CRITICAL_SAFETY"
                              ? "text-critical-700"
                              : "text-brand-700"
                            : "text-steel-800"
                        }`}
                      >
                        {u.label}
                      </span>
                      <span className="text-sm text-steel-500">{u.description}</span>
                    </button>
                  ))}
                </div>

                {watch("urgency") === "CRITICAL_SAFETY" && (
                  <div className="p-4 bg-critical-50 border border-critical-200 rounded-xl">
                    <div className="flex gap-2.5">
                      <AlertTriangle className="w-5 h-5 text-critical-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-critical-700 text-sm mb-1">
                          Situation urgente détectée
                        </p>
                        <p className="text-sm text-critical-600">
                          Pour une intervention immédiate, appelez notre ligne directement :{" "}
                          <a href="tel:0561324568" className="font-semibold underline">05 61 32 45 68</a>.
                          Votre demande est également transmise en haute priorité.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <Label htmlFor="impactDescription">Impact de la panne (optionnel)</Label>
                  <Textarea
                    id="impactDescription"
                    placeholder="Décrivez l'impact opérationnel : accès impossible, sécurité compromise, activité interrompue..."
                    className="mt-1.5"
                    rows={3}
                    {...register("impactDescription")}
                  />
                </div>
              </div>
            )}

            {/* Step 5: Summary */}
            {step === 5 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-steel-900 mb-1">Récapitulatif</h2>
                  <p className="text-steel-500 text-sm">Vérifiez votre demande avant envoi.</p>
                </div>

                <div className="space-y-3">
                  {[
                    {
                      label: "Contact",
                      value: `${watch("firstName")} ${watch("lastName")} — ${watch("email")} — ${watch("phone")}`,
                    },
                    {
                      label: "Site",
                      value: `${watch("siteAddress")}, ${watch("sitePostal")} ${watch("siteCity")}`,
                    },
                    {
                      label: "Équipement",
                      value: `${CATEGORIES.find((c) => c.value === watchedCategory)?.label} — ${watch("equipmentDescription")}`,
                    },
                    {
                      label: "Urgence",
                      value: URGENCIES.find((u) => u.value === watch("urgency"))?.label ?? "",
                    },
                  ].map((row) => (
                    <div key={row.label} className="flex gap-3 text-sm">
                      <span className="font-medium text-steel-900 w-24 shrink-0">{row.label}</span>
                      <span className="text-steel-600">{row.value}</span>
                    </div>
                  ))}

                  {selectedSymptoms.length > 0 && (
                    <div className="flex gap-3 text-sm">
                      <span className="font-medium text-steel-900 w-24 shrink-0">Symptômes</span>
                      <div className="flex flex-wrap gap-1">
                        {selectedSymptoms.map((s) => (
                          <span key={s} className="px-2 py-0.5 bg-surface-subtle border border-border rounded text-xs text-steel-600">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-4 bg-surface-subtle border border-border rounded-xl text-sm text-steel-600">
                  En envoyant cette demande, vous acceptez que vos informations soient utilisées pour
                  traiter votre demande d&apos;intervention.
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
          <Button
            type="button"
            variant="ghost"
            onClick={handlePrev}
            disabled={step === 1}
            leftIcon={<ChevronLeft className="w-4 h-4" />}
          >
            Précédent
          </Button>

          {step < STEPS.length ? (
            <Button type="button" onClick={handleNext} rightIcon={<ChevronRight className="w-4 h-4" />}>
              Suivant
            </Button>
          ) : (
            <Button type="submit" loading={isSubmitting}>
              Envoyer la demande
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
