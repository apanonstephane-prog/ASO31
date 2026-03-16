import { z } from "zod";

export const depannageSchema = z.object({
  // Step 1: Client
  clientType: z.enum(["INDIVIDUAL", "BUSINESS", "SYNDIC", "COLLECTIVITY", "INDUSTRY"]),
  companyName: z.string().optional(),
  firstName: z.string().min(2, "Prénom requis"),
  lastName: z.string().min(2, "Nom requis"),
  email: z.string().email("Email invalide"),
  phone: z.string().min(10, "Numéro de téléphone invalide"),

  // Step 2: Site
  siteAddress: z.string().min(5, "Adresse requise"),
  siteCity: z.string().min(2, "Ville requise"),
  sitePostal: z.string().length(5, "Code postal invalide"),
  accessNotes: z.string().optional(),

  // Step 3: Equipment & Symptom
  category: z.enum([
    "ALARM_SECURITY",
    "AUTOMATION",
    "AUTOMATIC_DOORS",
    "CLIMATISATION",
    "MAINTENANCE_REPAIR",
  ]),
  equipmentDescription: z.string().min(5, "Décrivez l'équipement concerné"),
  symptomDescription: z
    .string()
    .min(20, "Décrivez le symptôme en au moins 20 caractères"),
  isFullyDown: z.boolean().default(false),
  symptoms: z.array(z.string()).default([]),

  // Step 4: Urgency
  urgency: z.enum(["NON_BLOCKING", "INCONVENIENT", "BLOCKING", "CRITICAL_SAFETY"]),
  impactDescription: z.string().optional(),
  photos: z.array(z.string()).default([]),
});

export const devisSchema = z.object({
  // Step 1: Profile
  clientType: z.enum(["INDIVIDUAL", "BUSINESS", "SYNDIC", "COLLECTIVITY", "INDUSTRY"]),
  companyName: z.string().optional(),
  firstName: z.string().min(2, "Prénom requis"),
  lastName: z.string().min(2, "Nom requis"),
  email: z.string().email("Email invalide"),
  phone: z.string().min(10, "Numéro invalide"),

  // Step 2: Besoin
  category: z.enum([
    "ALARM_SECURITY",
    "AUTOMATION",
    "AUTOMATIC_DOORS",
    "CLIMATISATION",
    "MAINTENANCE_REPAIR",
  ]),
  projectDescription: z.string().min(20, "Description requise"),
  isNewInstallation: z.boolean().default(true),

  // Step 3: Site
  address: z.string().min(5, "Adresse requise"),
  city: z.string().min(2, "Ville requise"),
  postalCode: z.string().length(5, "Code postal invalide"),
  siteType: z.string().min(2, "Type de site requis"),

  // Step 4: Budget & Délai
  budget: z.string().optional(),
  desiredDelay: z.string().optional(),
  attachments: z.array(z.string()).default([]),
});

export const appointmentSchema = z.object({
  firstName: z.string().min(2, "Prénom requis"),
  lastName: z.string().min(2, "Nom requis"),
  email: z.string().email("Email invalide"),
  phone: z.string().min(10, "Numéro invalide"),
  category: z.enum([
    "ALARM_SECURITY",
    "AUTOMATION",
    "AUTOMATIC_DOORS",
    "CLIMATISATION",
    "MAINTENANCE_REPAIR",
  ]),
  description: z.string().min(10, "Description requise"),
  preferredDate: z.string().optional(),
  preferredSlot: z.enum(["matin", "après-midi", "toute la journée"]).optional(),
  address: z.string().min(5, "Adresse requise"),
  city: z.string().min(2, "Ville requise"),
  isUrgent: z.boolean().default(false),
});

export const contactSchema = z.object({
  firstName: z.string().min(2, "Prénom requis"),
  lastName: z.string().min(2, "Nom requis"),
  email: z.string().email("Email invalide"),
  phone: z.string().optional(),
  subject: z.string().min(5, "Objet requis"),
  message: z.string().min(20, "Message trop court (20 caractères minimum)"),
  clientType: z.string().optional(),
});

export type DepannageInput = z.infer<typeof depannageSchema>;
export type DevisInput = z.infer<typeof devisSchema>;
export type AppointmentInput = z.infer<typeof appointmentSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
