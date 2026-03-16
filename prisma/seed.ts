/**
 * ASO31 Platform — Database Seed
 * Creates realistic demo data for a regional technical services PME
 */

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const db = new PrismaClient();

async function main() {
  console.log("🌱 Seeding ASO31 database...");

  // ─── USERS ───────────────────────────────────────────────
  const hashedPassword = await bcrypt.hash("demo1234", 12);

  const admin = await db.user.upsert({
    where: { email: "admin@aso31.fr" },
    update: {},
    create: {
      email: "admin@aso31.fr",
      name: "Admin ASO31",
      password: hashedPassword,
      role: "ADMIN",
      phone: "05 61 32 45 67",
    },
  });

  const operator = await db.user.upsert({
    where: { email: "operateur@aso31.fr" },
    update: {},
    create: {
      email: "operateur@aso31.fr",
      name: "Stéphanie Bonnet",
      password: hashedPassword,
      role: "OPERATOR",
      phone: "05 61 32 45 67",
    },
  });

  const techMarc = await db.user.upsert({
    where: { email: "marc.delville@aso31.fr" },
    update: {},
    create: {
      email: "marc.delville@aso31.fr",
      name: "Marc Delville",
      password: hashedPassword,
      role: "TECHNICIAN",
      phone: "06 12 34 56 78",
    },
  });

  const techSophie = await db.user.upsert({
    where: { email: "sophie.renard@aso31.fr" },
    update: {},
    create: {
      email: "sophie.renard@aso31.fr",
      name: "Sophie Renard",
      password: hashedPassword,
      role: "TECHNICIAN",
      phone: "06 23 45 67 89",
    },
  });

  const techPierre = await db.user.upsert({
    where: { email: "pierre.fontaine@aso31.fr" },
    update: {},
    create: {
      email: "pierre.fontaine@aso31.fr",
      name: "Pierre Fontaine",
      password: hashedPassword,
      role: "TECHNICIAN",
      phone: "06 34 56 78 90",
    },
  });

  const clientUser = await db.user.upsert({
    where: { email: "client@demo.fr" },
    update: {},
    create: {
      email: "client@demo.fr",
      name: "Pierre Bourdeau",
      password: hashedPassword,
      role: "CLIENT",
      phone: "06 45 67 89 01",
    },
  });

  // ─── TECHNICIAN PROFILES ─────────────────────────────────
  await db.technicianProfile.upsert({
    where: { userId: techMarc.id },
    update: {},
    create: {
      userId: techMarc.id,
      specialties: ["AUTOMATION"],
      zones: ["Portet-sur-Garonne", "Muret", "Toulouse Sud"],
      vehiclePlate: "AA-123-BB",
    },
  });

  await db.technicianProfile.upsert({
    where: { userId: techSophie.id },
    update: {},
    create: {
      userId: techSophie.id,
      specialties: ["AUTOMATIC_DOORS"],
      zones: ["Toulouse Centre", "Toulouse Nord"],
      vehiclePlate: "CC-456-DD",
    },
  });

  await db.technicianProfile.upsert({
    where: { userId: techPierre.id },
    update: {},
    create: {
      userId: techPierre.id,
      specialties: ["CLIMATISATION"],
      zones: ["Toulouse", "Blagnac", "Colomiers"],
      vehiclePlate: "EE-789-FF",
    },
  });

  // ─── CLIENT PROFILE ──────────────────────────────────────
  const clientProfile = await db.clientProfile.upsert({
    where: { userId: clientUser.id },
    update: {},
    create: {
      userId: clientUser.id,
      clientType: "BUSINESS",
      companyName: "Pharmacie des Minimes",
      address: "8 place des Minimes",
      city: "Toulouse",
      postalCode: "31000",
    },
  });

  // ─── CLIENT SITE ─────────────────────────────────────────
  const pharmacieSite = await db.clientSite.create({
    data: {
      clientId: clientProfile.id,
      name: "Pharmacie des Minimes",
      address: "8 place des Minimes",
      city: "Toulouse",
      postalCode: "31000",
      siteType: "Commerce de santé",
      accessNotes: "Accès de 8h à 20h en semaine. Interlocuteur : M. Bourdeau.",
    },
  });

  // ─── EQUIPMENT TYPES ─────────────────────────────────────
  const portailType = await db.equipmentType.create({
    data: {
      name: "Portail coulissant motorisé",
      category: "AUTOMATION",
      commonIssues: ["Fin de course", "Cellule photoélectrique", "Carte électronique", "Point dur mécanique"],
    },
  });

  const porteAutoType = await db.equipmentType.create({
    data: {
      name: "Porte automatique coulissante piétonne",
      category: "AUTOMATIC_DOORS",
      commonIssues: ["Radar désensibilisé", "Cellule de sécurité", "Centrale de commande"],
    },
  });

  // ─── EQUIPMENT ───────────────────────────────────────────
  const portePharmacie = await db.equipment.create({
    data: {
      siteId: pharmacieSite.id,
      typeId: porteAutoType.id,
      name: "Porte automatique entrée principale",
      brand: "Geze",
      model: "Slimdrive SL",
      installDate: new Date("2021-05-18"),
      lastMaintenance: new Date("2024-01-20"),
      status: "DEGRADED",
    },
  });

  // ─── KNOWLEDGE ARTICLES ──────────────────────────────────
  await db.knowledgeArticle.createMany({
    data: [
      {
        title: "Portail motorisé ne répondant plus — check initial",
        slug: "portail-motorise-check-initial",
        category: "AUTOMATION",
        summary: "Procédure de diagnostic premier niveau pour un portail motorisé sans réponse aux commandes.",
        symptoms: ["Aucune réaction aux télécommandes", "Voyant d'alimentation absent"],
        probableCauses: ["Coupure alimentation", "Fusible déclenché", "Récepteur radio défaillant"],
        initialChecks: ["Vérifier le disjoncteur", "Contrôler l'alimentation 230V", "Tester avec une autre télécommande"],
        safetyRisks: ["Ne jamais forcer mécaniquement sans débrayage préalable"],
        escalationNotes: "Alimentation présente + moteur silencieux = suspicion carte de commande",
        content: "Procédure de diagnostic complète pour portail motorisé...",
        tags: ["portail", "automatisme", "diagnostic"],
        isPublic: false,
      },
      {
        title: "Split mural sans froid — diagnostic premier niveau",
        slug: "split-mural-sans-froid",
        category: "CLIMATISATION",
        summary: "Arbre de décision pour un système de climatisation qui souffle mais ne refroidit pas.",
        symptoms: ["Souffle sans effet thermique", "Unité extérieure peu active"],
        probableCauses: ["Filtre encrassé", "Pression fluide insuffisante", "Sonde NTC défaillante"],
        initialChecks: ["Vérifier le mode sélectionné", "Nettoyer les filtres", "Vérifier unité extérieure"],
        safetyRisks: ["Recharge fluide réservée aux techniciens certifiés CERFA"],
        escalationNotes: "Filtres propres + mode correct = intervention frigoriste obligatoire",
        content: "Procédure diagnostic climatisation...",
        tags: ["climatisation", "split", "pas de froid"],
        isPublic: false,
      },
    ],
    skipDuplicates: true,
  });

  // ─── PARTS ───────────────────────────────────────────────
  await db.part.createMany({
    data: [
      { name: "Cellule photoélectrique", category: "Capteur", compatibleCategories: ["AUTOMATION", "AUTOMATIC_DOORS"], criticality: "HIGH", estimatedDeliveryDays: 2, stockIndicator: "EN_STOCK" },
      { name: "Fin de course magnétique", category: "Mécanique", compatibleCategories: ["AUTOMATION"], criticality: "NORMAL", estimatedDeliveryDays: 3, stockIndicator: "EN_STOCK" },
      { name: "Carte de commande FAAC 844", category: "Électronique", compatibleCategories: ["AUTOMATION"], criticality: "HIGH", estimatedDeliveryDays: 5, stockIndicator: "FAIBLE" },
      { name: "Galet de guidage portail coulissant", category: "Mécanique", compatibleCategories: ["AUTOMATION"], criticality: "NORMAL", estimatedDeliveryDays: 3, stockIndicator: "EN_STOCK" },
      { name: "Batterie de secours 12V 7Ah", category: "Alimentation", compatibleCategories: ["ALARM_SECURITY"], criticality: "NORMAL", estimatedDeliveryDays: 1, stockIndicator: "EN_STOCK" },
      { name: "Fluide frigorigène R32", category: "Frigoriste", compatibleCategories: ["CLIMATISATION"], criticality: "HIGH", estimatedDeliveryDays: 1, stockIndicator: "EN_STOCK" },
      { name: "Radar présence porte automatique", category: "Détection", compatibleCategories: ["AUTOMATIC_DOORS"], criticality: "HIGH", estimatedDeliveryDays: 4, stockIndicator: "EN_STOCK" },
      { name: "Amortisseur bras barrière levante", category: "Mécanique", compatibleCategories: ["AUTOMATION"], criticality: "NORMAL", estimatedDeliveryDays: 7, stockIndicator: "FAIBLE" },
    ],
    skipDuplicates: true,
  });

  // ─── TICKETS ─────────────────────────────────────────────
  const ticket1 = await db.ticket.create({
    data: {
      reference: "T2503-0141",
      title: "Porte automatique piétonne — ouverture sans sollicitation",
      description: "La porte coulissante automatique de l'entrée principale s'ouvre seule plusieurs fois par heure.",
      category: "AUTOMATIC_DOORS",
      status: "IN_PROGRESS",
      priority: "HIGH",
      urgency: "INCONVENIENT",
      source: "PORTAL",
      clientId: clientProfile.id,
      siteId: pharmacieSite.id,
      equipmentId: portePharmacie.id,
      creatorId: clientUser.id,
      assigneeId: techSophie.id,
      symptoms: ["Ouverture sans présence humaine", "Détection intempestive", "Fréquence aléatoire"],
    },
  });

  // AI Diagnostic for ticket
  await db.aIDiagnosticSuggestion.create({
    data: {
      ticketId: ticket1.id,
      probableEquipmentCategory: "AUTOMATIC_DOORS",
      probableIssue: "Sensibilité radar de présence trop élevée — peut aussi être causée par des reflets lumineux.",
      urgencyLevel: "INCONVENIENT",
      likelyParts: ["Radar détecteur de présence"],
      recommendedTools: ["Testeur de présence", "Tournevis réglage"],
      safetyRisks: [],
      requiresHumanValidation: true,
      confidenceScore: 0.68,
      confidenceLevel: "MEDIUM",
      nextBestAction: "Réglage de la sensibilité du radar en premier lieu. Si insuffisant, remplacement.",
    },
  });

  // ─── INTERVENTIONS ───────────────────────────────────────
  await db.intervention.create({
    data: {
      reference: "INT-2503-017",
      ticketId: ticket1.id,
      siteId: pharmacieSite.id,
      equipmentId: portePharmacie.id,
      technicianId: techSophie.id,
      status: "ON_SITE",
      scheduledAt: new Date(),
    },
  });

  // ─── NOTIFICATIONS ───────────────────────────────────────
  await db.notification.create({
    data: {
      userId: clientUser.id,
      type: "ticket_update",
      title: "Technicien sur place",
      message: "Sophie Renard est arrivée sur site pour votre demande T2503-0141.",
      link: "/app/client",
    },
  });

  console.log("✅ Seed completed successfully");
  console.log("👤 Demo accounts:");
  console.log("   admin@aso31.fr / demo1234 (Admin)");
  console.log("   operateur@aso31.fr / demo1234 (Opérateur)");
  console.log("   marc.delville@aso31.fr / demo1234 (Technicien)");
  console.log("   client@demo.fr / demo1234 (Client)");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
