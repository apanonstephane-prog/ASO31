-- ============================================================
-- ASO31 Platform — Supabase Setup SQL
-- Paste this in: Supabase > SQL Editor > New query > Run
-- ============================================================

-- ─────────────────────────────────────────────
-- ENUMS
-- ─────────────────────────────────────────────

CREATE TYPE "UserRole" AS ENUM ('VISITOR','CLIENT','TECHNICIAN','OPERATOR','MANAGER','ADMIN');
CREATE TYPE "TicketStatus" AS ENUM ('NEW','TO_QUALIFY','PLANNED','ASSIGNED','IN_PROGRESS','WAITING_PART','WAITING_CLIENT','RESOLVED','CLOSED');
CREATE TYPE "Priority" AS ENUM ('LOW','NORMAL','HIGH','CRITICAL');
CREATE TYPE "Urgency" AS ENUM ('NON_BLOCKING','INCONVENIENT','BLOCKING','CRITICAL_SAFETY');
CREATE TYPE "InterventionStatus" AS ENUM ('PLANNED','EN_ROUTE','ON_SITE','SUSPENDED','COMPLETED','TO_RESCHEDULE');
CREATE TYPE "ServiceCategory" AS ENUM ('ALARM_SECURITY','AUTOMATION','AUTOMATIC_DOORS','CLIMATISATION','MAINTENANCE_REPAIR');
CREATE TYPE "EquipmentStatus" AS ENUM ('OPERATIONAL','DEGRADED','FAULTY','DECOMMISSIONED','UNDER_MAINTENANCE');
CREATE TYPE "ContractStatus" AS ENUM ('ACTIVE','EXPIRED','PENDING_RENEWAL','SUSPENDED','CANCELLED');
CREATE TYPE "ClientType" AS ENUM ('INDIVIDUAL','BUSINESS','SYNDIC','COLLECTIVITY','INDUSTRY');
CREATE TYPE "AIConfidenceLevel" AS ENUM ('LOW','MEDIUM','HIGH','VERY_HIGH');
CREATE TYPE "RequestSource" AS ENUM ('PHONE','PORTAL','AI_ASSISTANT','EMAIL','FIELD');

-- ─────────────────────────────────────────────
-- TABLES
-- ─────────────────────────────────────────────

CREATE TABLE "users" (
  "id"          TEXT PRIMARY KEY,
  "email"       TEXT UNIQUE NOT NULL,
  "name"        TEXT,
  "password"    TEXT,
  "role"        "UserRole" NOT NULL DEFAULT 'VISITOR',
  "avatar"      TEXT,
  "phone"       TEXT,
  "isActive"    BOOLEAN NOT NULL DEFAULT TRUE,
  "createdAt"   TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt"   TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "client_profiles" (
  "id"          TEXT PRIMARY KEY,
  "userId"      TEXT UNIQUE NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "clientType"  "ClientType" NOT NULL DEFAULT 'INDIVIDUAL',
  "companyName" TEXT,
  "siret"       TEXT,
  "address"     TEXT,
  "city"        TEXT,
  "postalCode"  TEXT,
  "notes"       TEXT,
  "isVip"       BOOLEAN NOT NULL DEFAULT FALSE,
  "createdAt"   TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt"   TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "client_sites" (
  "id"            TEXT PRIMARY KEY,
  "clientId"      TEXT NOT NULL REFERENCES "client_profiles"("id") ON DELETE CASCADE,
  "name"          TEXT NOT NULL,
  "address"       TEXT NOT NULL,
  "city"          TEXT NOT NULL,
  "postalCode"    TEXT NOT NULL,
  "siteType"      TEXT NOT NULL,
  "accessNotes"   TEXT,
  "contactOnSite" TEXT,
  "phoneOnSite"   TEXT,
  "lat"           DOUBLE PRECISION,
  "lng"           DOUBLE PRECISION,
  "createdAt"     TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt"     TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "contacts" (
  "id"        TEXT PRIMARY KEY,
  "clientId"  TEXT NOT NULL REFERENCES "client_profiles"("id") ON DELETE CASCADE,
  "firstName" TEXT NOT NULL,
  "lastName"  TEXT NOT NULL,
  "role"      TEXT,
  "email"     TEXT,
  "phone"     TEXT,
  "mobile"    TEXT,
  "isPrimary" BOOLEAN NOT NULL DEFAULT FALSE,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "equipment_types" (
  "id"              TEXT PRIMARY KEY,
  "name"            TEXT NOT NULL,
  "category"        "ServiceCategory" NOT NULL,
  "description"     TEXT,
  "commonIssues"    TEXT[] NOT NULL DEFAULT '{}',
  "maintenanceTips" TEXT[] NOT NULL DEFAULT '{}',
  "createdAt"       TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "equipments" (
  "id"              TEXT PRIMARY KEY,
  "siteId"          TEXT NOT NULL REFERENCES "client_sites"("id") ON DELETE CASCADE,
  "typeId"          TEXT NOT NULL REFERENCES "equipment_types"("id"),
  "name"            TEXT NOT NULL,
  "brand"           TEXT,
  "model"           TEXT,
  "serialNumber"    TEXT,
  "installDate"     TIMESTAMP(3),
  "lastMaintenance" TIMESTAMP(3),
  "warrantyUntil"   TIMESTAMP(3),
  "status"          "EquipmentStatus" NOT NULL DEFAULT 'OPERATIONAL',
  "notes"           TEXT,
  "photos"          TEXT[] NOT NULL DEFAULT '{}',
  "createdAt"       TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt"       TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "equipment_issues" (
  "id"          TEXT PRIMARY KEY,
  "equipmentId" TEXT NOT NULL REFERENCES "equipments"("id") ON DELETE CASCADE,
  "title"       TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "resolvedAt"  TIMESTAMP(3),
  "createdAt"   TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "parts" (
  "id"                    TEXT PRIMARY KEY,
  "name"                  TEXT NOT NULL,
  "reference"             TEXT UNIQUE,
  "category"              TEXT NOT NULL,
  "compatibleCategories"  "ServiceCategory"[] NOT NULL DEFAULT '{}',
  "description"           TEXT,
  "criticality"           "Priority" NOT NULL DEFAULT 'NORMAL',
  "estimatedDeliveryDays" INTEGER,
  "stockIndicator"        TEXT NOT NULL DEFAULT 'EN_STOCK',
  "unitPrice"             DOUBLE PRECISION,
  "createdAt"             TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "contracts" (
  "id"           TEXT PRIMARY KEY,
  "clientId"     TEXT NOT NULL REFERENCES "client_profiles"("id"),
  "siteId"       TEXT REFERENCES "client_sites"("id"),
  "reference"    TEXT UNIQUE NOT NULL,
  "type"         TEXT NOT NULL,
  "description"  TEXT,
  "startDate"    TIMESTAMP(3) NOT NULL,
  "endDate"      TIMESTAMP(3) NOT NULL,
  "status"       "ContractStatus" NOT NULL DEFAULT 'ACTIVE',
  "annualValue"  DOUBLE PRECISION,
  "visitPerYear" INTEGER NOT NULL DEFAULT 1,
  "services"     "ServiceCategory"[] NOT NULL DEFAULT '{}',
  "notes"        TEXT,
  "createdAt"    TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt"    TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "tickets" (
  "id"            TEXT PRIMARY KEY,
  "reference"     TEXT UNIQUE NOT NULL,
  "title"         TEXT NOT NULL,
  "description"   TEXT NOT NULL,
  "category"      "ServiceCategory" NOT NULL,
  "status"        "TicketStatus" NOT NULL DEFAULT 'NEW',
  "priority"      "Priority" NOT NULL DEFAULT 'NORMAL',
  "urgency"       "Urgency" NOT NULL DEFAULT 'NON_BLOCKING',
  "source"        "RequestSource" NOT NULL DEFAULT 'PORTAL',
  "clientId"      TEXT REFERENCES "client_profiles"("id"),
  "siteId"        TEXT REFERENCES "client_sites"("id"),
  "equipmentId"   TEXT REFERENCES "equipments"("id"),
  "creatorId"     TEXT REFERENCES "users"("id"),
  "assigneeId"    TEXT REFERENCES "users"("id"),
  "symptoms"      TEXT[] NOT NULL DEFAULT '{}',
  "photos"        TEXT[] NOT NULL DEFAULT '{}',
  "estimatedTime" INTEGER,
  "resolvedAt"    TIMESTAMP(3),
  "closedAt"      TIMESTAMP(3),
  "scheduledAt"   TIMESTAMP(3),
  "createdAt"     TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt"     TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "ticket_messages" (
  "id"          TEXT PRIMARY KEY,
  "ticketId"    TEXT NOT NULL REFERENCES "tickets"("id") ON DELETE CASCADE,
  "userId"      TEXT REFERENCES "users"("id"),
  "authorName"  TEXT NOT NULL,
  "content"     TEXT NOT NULL,
  "isInternal"  BOOLEAN NOT NULL DEFAULT FALSE,
  "attachments" TEXT[] NOT NULL DEFAULT '{}',
  "createdAt"   TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "technician_profiles" (
  "id"           TEXT PRIMARY KEY,
  "userId"       TEXT UNIQUE NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "employeeId"   TEXT,
  "specialties"  "ServiceCategory"[] NOT NULL DEFAULT '{}',
  "zones"        TEXT[] NOT NULL DEFAULT '{}',
  "vehiclePlate" TEXT,
  "notes"        TEXT,
  "isAvailable"  BOOLEAN NOT NULL DEFAULT TRUE,
  "createdAt"    TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt"    TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "interventions" (
  "id"              TEXT PRIMARY KEY,
  "reference"       TEXT UNIQUE NOT NULL,
  "ticketId"        TEXT REFERENCES "tickets"("id"),
  "siteId"          TEXT REFERENCES "client_sites"("id"),
  "equipmentId"     TEXT REFERENCES "equipments"("id"),
  "technicianId"    TEXT NOT NULL REFERENCES "users"("id"),
  "status"          "InterventionStatus" NOT NULL DEFAULT 'PLANNED',
  "scheduledAt"     TIMESTAMP(3) NOT NULL,
  "startedAt"       TIMESTAMP(3),
  "completedAt"     TIMESTAMP(3),
  "duration"        INTEGER,
  "report"          TEXT,
  "checklist"       JSONB,
  "clientSignature" TEXT,
  "internalNotes"   TEXT,
  "createdAt"       TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt"       TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "intervention_photos" (
  "id"             TEXT PRIMARY KEY,
  "interventionId" TEXT NOT NULL REFERENCES "interventions"("id") ON DELETE CASCADE,
  "url"            TEXT NOT NULL,
  "caption"        TEXT,
  "isBefore"       BOOLEAN NOT NULL DEFAULT TRUE,
  "createdAt"      TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "intervention_parts" (
  "id"             TEXT PRIMARY KEY,
  "interventionId" TEXT NOT NULL REFERENCES "interventions"("id") ON DELETE CASCADE,
  "partId"         TEXT NOT NULL REFERENCES "parts"("id"),
  "quantity"       INTEGER NOT NULL DEFAULT 1,
  "unitPrice"      DOUBLE PRECISION
);

CREATE TABLE "knowledge_articles" (
  "id"              TEXT PRIMARY KEY,
  "title"           TEXT NOT NULL,
  "slug"            TEXT UNIQUE NOT NULL,
  "category"        "ServiceCategory" NOT NULL,
  "equipmentTypeId" TEXT REFERENCES "equipment_types"("id"),
  "summary"         TEXT NOT NULL,
  "symptoms"        TEXT[] NOT NULL DEFAULT '{}',
  "probableCauses"  TEXT[] NOT NULL DEFAULT '{}',
  "initialChecks"   TEXT[] NOT NULL DEFAULT '{}',
  "safetyRisks"     TEXT[] NOT NULL DEFAULT '{}',
  "escalationNotes" TEXT,
  "content"         TEXT NOT NULL,
  "tags"            TEXT[] NOT NULL DEFAULT '{}',
  "isPublic"        BOOLEAN NOT NULL DEFAULT FALSE,
  "viewCount"       INTEGER NOT NULL DEFAULT 0,
  "createdAt"       TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt"       TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "ai_conversations" (
  "id"        TEXT PRIMARY KEY,
  "userId"    TEXT REFERENCES "users"("id"),
  "sessionId" TEXT NOT NULL,
  "messages"  JSONB NOT NULL,
  "context"   JSONB,
  "ticketId"  TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "ai_diagnostic_suggestions" (
  "id"                        TEXT PRIMARY KEY,
  "ticketId"                  TEXT REFERENCES "tickets"("id"),
  "conversationId"            TEXT REFERENCES "ai_conversations"("id"),
  "probableEquipmentCategory" "ServiceCategory",
  "probableIssue"             TEXT NOT NULL,
  "urgencyLevel"              "Urgency" NOT NULL,
  "likelyParts"               TEXT[] NOT NULL DEFAULT '{}',
  "recommendedTools"          TEXT[] NOT NULL DEFAULT '{}',
  "safetyRisks"               TEXT[] NOT NULL DEFAULT '{}',
  "requiresHumanValidation"   BOOLEAN NOT NULL DEFAULT TRUE,
  "confidenceScore"           DOUBLE PRECISION NOT NULL,
  "confidenceLevel"           "AIConfidenceLevel" NOT NULL,
  "nextBestAction"            TEXT NOT NULL,
  "technicianNotes"           TEXT,
  "createdAt"                 TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "quote_requests" (
  "id"           TEXT PRIMARY KEY,
  "userId"       TEXT REFERENCES "users"("id"),
  "firstName"    TEXT NOT NULL,
  "lastName"     TEXT NOT NULL,
  "email"        TEXT NOT NULL,
  "phone"        TEXT NOT NULL,
  "clientType"   "ClientType" NOT NULL,
  "companyName"  TEXT,
  "address"      TEXT,
  "city"         TEXT,
  "category"     "ServiceCategory" NOT NULL,
  "description"  TEXT NOT NULL,
  "budget"       TEXT,
  "desiredDelay" TEXT,
  "attachments"  TEXT[] NOT NULL DEFAULT '{}',
  "status"       TEXT NOT NULL DEFAULT 'pending',
  "notes"        TEXT,
  "createdAt"    TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt"    TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "appointment_requests" (
  "id"            TEXT PRIMARY KEY,
  "userId"        TEXT REFERENCES "users"("id"),
  "firstName"     TEXT NOT NULL,
  "lastName"      TEXT NOT NULL,
  "email"         TEXT NOT NULL,
  "phone"         TEXT NOT NULL,
  "category"      "ServiceCategory" NOT NULL,
  "description"   TEXT NOT NULL,
  "preferredDate" TIMESTAMP(3),
  "preferredSlot" TEXT,
  "address"       TEXT NOT NULL,
  "city"          TEXT NOT NULL,
  "isUrgent"      BOOLEAN NOT NULL DEFAULT FALSE,
  "attachments"   TEXT[] NOT NULL DEFAULT '{}',
  "status"        TEXT NOT NULL DEFAULT 'pending',
  "createdAt"     TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "notifications" (
  "id"        TEXT PRIMARY KEY,
  "userId"    TEXT NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "type"      TEXT NOT NULL,
  "title"     TEXT NOT NULL,
  "message"   TEXT NOT NULL,
  "link"      TEXT,
  "isRead"    BOOLEAN NOT NULL DEFAULT FALSE,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ─────────────────────────────────────────────
-- SEED DATA
-- Password hash = "demo1234" (bcrypt cost 12)
-- ─────────────────────────────────────────────

-- Users
INSERT INTO "users" ("id","email","name","password","role","phone","createdAt","updatedAt") VALUES
  ('usr_admin',   'admin@aso31.fr',            'Admin ASO31',      '$2a$12$H2.PvflMWE4Corj3VyU85el5kVVy71sdHZgp4/bd1N6uH8oGPKF4G', 'ADMIN',      '05 61 32 45 67', NOW(), NOW()),
  ('usr_op',      'operateur@aso31.fr',        'Stéphanie Bonnet', '$2a$12$H2.PvflMWE4Corj3VyU85el5kVVy71sdHZgp4/bd1N6uH8oGPKF4G', 'OPERATOR',   '05 61 32 45 68', NOW(), NOW()),
  ('usr_marc',    'marc.delville@aso31.fr',    'Marc Delville',    '$2a$12$H2.PvflMWE4Corj3VyU85el5kVVy71sdHZgp4/bd1N6uH8oGPKF4G', 'TECHNICIAN', '06 12 34 56 78', NOW(), NOW()),
  ('usr_sophie',  'sophie.renard@aso31.fr',    'Sophie Renard',    '$2a$12$H2.PvflMWE4Corj3VyU85el5kVVy71sdHZgp4/bd1N6uH8oGPKF4G', 'TECHNICIAN', '06 23 45 67 89', NOW(), NOW()),
  ('usr_pierre',  'pierre.fontaine@aso31.fr',  'Pierre Fontaine',  '$2a$12$H2.PvflMWE4Corj3VyU85el5kVVy71sdHZgp4/bd1N6uH8oGPKF4G', 'TECHNICIAN', '06 34 56 78 90', NOW(), NOW()),
  ('usr_client',  'client@demo.fr',            'Pierre Bourdeau',  '$2a$12$H2.PvflMWE4Corj3VyU85el5kVVy71sdHZgp4/bd1N6uH8oGPKF4G', 'CLIENT',     '06 45 67 89 01', NOW(), NOW());

-- Technician profiles
INSERT INTO "technician_profiles" ("id","userId","specialties","zones","vehiclePlate","createdAt","updatedAt") VALUES
  ('tp_marc',   'usr_marc',   ARRAY['AUTOMATION']::"ServiceCategory"[],      ARRAY['Portet-sur-Garonne','Muret','Toulouse Sud'],    'AA-123-BB', NOW(), NOW()),
  ('tp_sophie', 'usr_sophie', ARRAY['AUTOMATIC_DOORS']::"ServiceCategory"[], ARRAY['Toulouse Centre','Toulouse Nord'],               'CC-456-DD', NOW(), NOW()),
  ('tp_pierre', 'usr_pierre', ARRAY['CLIMATISATION']::"ServiceCategory"[],   ARRAY['Toulouse','Blagnac','Colomiers'],                'EE-789-FF', NOW(), NOW());

-- Client profile
INSERT INTO "client_profiles" ("id","userId","clientType","companyName","address","city","postalCode","createdAt","updatedAt") VALUES
  ('cp_bourdeau', 'usr_client', 'BUSINESS', 'Pharmacie des Minimes', '8 place des Minimes', 'Toulouse', '31000', NOW(), NOW());

-- Client site
INSERT INTO "client_sites" ("id","clientId","name","address","city","postalCode","siteType","accessNotes","createdAt","updatedAt") VALUES
  ('cs_pharma', 'cp_bourdeau', 'Pharmacie des Minimes', '8 place des Minimes', 'Toulouse', '31000', 'Commerce de santé', 'Accès de 8h à 20h en semaine. Interlocuteur : M. Bourdeau.', NOW(), NOW());

-- Equipment types
INSERT INTO "equipment_types" ("id","name","category","commonIssues","createdAt") VALUES
  ('et_portail',  'Portail coulissant motorisé',              'AUTOMATION',       ARRAY['Fin de course','Cellule photoélectrique','Carte électronique','Point dur mécanique'], NOW()),
  ('et_porte',    'Porte automatique coulissante piétonne',   'AUTOMATIC_DOORS',  ARRAY['Radar désensibilisé','Cellule de sécurité','Centrale de commande'], NOW()),
  ('et_clim',     'Climatisation split mural',                'CLIMATISATION',    ARRAY['Filtre encrassé','Pression fluide basse','Sonde NTC'], NOW()),
  ('et_alarme',   'Centrale alarme intrusion',                'ALARM_SECURITY',   ARRAY['Batterie déchargée','Détecteur défaillant','Sabotage'], NOW()),
  ('et_barriere', 'Barrière levante motorisée',               'AUTOMATION',       ARRAY['Amortisseur','Fin de course','Boucle inductance'], NOW());

-- Equipments
INSERT INTO "equipments" ("id","siteId","typeId","name","brand","model","installDate","lastMaintenance","status","createdAt","updatedAt") VALUES
  ('eq_porte_pharma', 'cs_pharma', 'et_porte', 'Porte automatique entrée principale', 'Geze', 'Slimdrive SL', '2021-05-18', '2024-01-20', 'DEGRADED', NOW(), NOW());

-- Parts
INSERT INTO "parts" ("id","name","category","compatibleCategories","criticality","estimatedDeliveryDays","stockIndicator","createdAt") VALUES
  ('p1', 'Cellule photoélectrique',         'Capteur',       ARRAY['AUTOMATION','AUTOMATIC_DOORS']::"ServiceCategory"[], 'HIGH',   2, 'EN_STOCK', NOW()),
  ('p2', 'Fin de course magnétique',        'Mécanique',     ARRAY['AUTOMATION']::"ServiceCategory"[],                   'NORMAL', 3, 'EN_STOCK', NOW()),
  ('p3', 'Carte de commande FAAC 844',      'Électronique',  ARRAY['AUTOMATION']::"ServiceCategory"[],                   'HIGH',   5, 'FAIBLE',   NOW()),
  ('p4', 'Galet de guidage portail',        'Mécanique',     ARRAY['AUTOMATION']::"ServiceCategory"[],                   'NORMAL', 3, 'EN_STOCK', NOW()),
  ('p5', 'Batterie de secours 12V 7Ah',     'Alimentation',  ARRAY['ALARM_SECURITY']::"ServiceCategory"[],               'NORMAL', 1, 'EN_STOCK', NOW()),
  ('p6', 'Fluide frigorigène R32',          'Frigoriste',    ARRAY['CLIMATISATION']::"ServiceCategory"[],                 'HIGH',   1, 'EN_STOCK', NOW()),
  ('p7', 'Radar présence porte automatique','Détection',     ARRAY['AUTOMATIC_DOORS']::"ServiceCategory"[],              'HIGH',   4, 'EN_STOCK', NOW()),
  ('p8', 'Amortisseur bras barrière',       'Mécanique',     ARRAY['AUTOMATION']::"ServiceCategory"[],                   'NORMAL', 7, 'FAIBLE',   NOW());

-- Knowledge articles
INSERT INTO "knowledge_articles" ("id","title","slug","category","summary","symptoms","probableCauses","initialChecks","safetyRisks","escalationNotes","content","tags","isPublic","createdAt","updatedAt") VALUES
  ('ka1','Portail motorisé ne répondant plus — check initial','portail-motorise-check-initial','AUTOMATION',
   'Procédure de diagnostic premier niveau pour un portail motorisé sans réponse aux commandes.',
   ARRAY['Aucune réaction aux télécommandes','Voyant alimentation absent'],
   ARRAY['Coupure alimentation','Fusible déclenché','Récepteur radio défaillant'],
   ARRAY['Vérifier disjoncteur','Contrôler alimentation 230V','Tester autre télécommande'],
   ARRAY['Ne jamais forcer mécaniquement sans débrayage préalable'],
   'Alimentation présente + moteur silencieux = suspicion carte de commande',
   'Procédure de diagnostic complète pour portail motorisé. Commencer par l''alimentation, puis contrôle radio, puis mécanique.',
   ARRAY['portail','automatisme','diagnostic'], FALSE, NOW(), NOW()),

  ('ka2','Split mural sans froid — diagnostic premier niveau','split-mural-sans-froid','CLIMATISATION',
   'Arbre de décision pour un système de climatisation qui souffle mais ne refroidit pas.',
   ARRAY['Souffle sans effet thermique','Unité extérieure peu active'],
   ARRAY['Filtre encrassé','Pression fluide insuffisante','Sonde NTC défaillante'],
   ARRAY['Vérifier mode sélectionné','Nettoyer filtres','Vérifier unité extérieure'],
   ARRAY['Recharge fluide réservée aux techniciens certifiés CERFA'],
   'Filtres propres + mode correct = intervention frigoriste obligatoire',
   'Procédure diagnostic climatisation split mural.',
   ARRAY['climatisation','split','pas de froid'], FALSE, NOW(), NOW()),

  ('ka3','Porte automatique piétonne — arbre de décision','porte-auto-arbre-decision','AUTOMATIC_DOORS',
   'Diagnostic systématique pour porte coulissante automatique défaillante (ouverture intermittente ou blocage).',
   ARRAY['Ouverture sans sollicitation','Non-détection piétons','Blocage en position ouverte'],
   ARRAY['Radar désensibilisé ou encrassé','Cellule de sécurité mal alignée','Centrale de commande'],
   ARRAY['Nettoyer optique du radar','Vérifier alignement cellules','Tester en mode manuel'],
   ARRAY['Ne jamais laisser la porte hors service sans condamnation visible'],
   'Radar propre + alignement correct = remplacement centrale probable',
   'Arbre de décision complet porte automatique coulissante.',
   ARRAY['porte automatique','radar','coulissante'], FALSE, NOW(), NOW()),

  ('ka4','Interphonie collective — absence audio','interphonie-absence-audio','ALARM_SECURITY',
   'Procédure de diagnostic pour interphonie câblée sans retour audio (un ou plusieurs logements).',
   ARRAY['Pas de son côté locataire','Pas de son côté visiteur','Grésillements'],
   ARRAY['Câble bus endommagé','Poste défaillant','Centrale platine défectueuse'],
   ARRAY['Tester tous les postes','Vérifier tension bus','Isoler le poste défaillant'],
   ARRAY['Coupure alimentation avant intervention câblage'],
   'Si 1 poste = remplacement. Si plusieurs = bus ou platine.',
   'Diagnostic interphonie collective câblée.',
   ARRAY['interphonie','audio','bus'], FALSE, NOW(), NOW()),

  ('ka5','Barrière levante — cycle incomplet','barriere-levante-cycle-incomplet','AUTOMATION',
   'La barrière s''ouvre mais ne redescend pas (ou inversement). Procédure de diagnostic.',
   ARRAY['Bras reste en position haute','Descente trop lente','Fin de course non atteinte'],
   ARRAY['Amortisseur usé','Fin de course mal réglé','Boucle inductance défaillante'],
   ARRAY['Vérifier réglage fin de course','Contrôler état amortisseur','Tester boucle inductance'],
   ARRAY['Ne jamais forcer le bras à la main moteur en marche'],
   'Si boucle inductance HS = véhicule reste bloqué, urgence.',
   'Diagnostic barrière levante cycle incomplet.',
   ARRAY['barrière','levante','cycle'], FALSE, NOW(), NOW()),

  ('ka6','Carte électronique vs panne mécanique — critères de distinction','carte-elec-vs-mecanique','MAINTENANCE_REPAIR',
   'Comment distinguer une panne d''origine électronique d''une panne mécanique sur automatisme.',
   ARRAY['Comportement erratique','Bruit inhabituel','LED de diagnostic allumée'],
   ARRAY['Carte de commande défaillante','Condensateur claqué','Point dur mécanique'],
   ARRAY['Lire les codes LED','Test en mode manuel','Écouter démarrage moteur'],
   ARRAY['Décharger condensateurs avant manipulation carte'],
   'LED clignotante = code erreur à déchiffrer dans documentation constructeur.',
   'Critères de distinction panne électronique vs mécanique.',
   ARRAY['carte électronique','mécanique','diagnostic'], FALSE, NOW(), NOW());

-- Ticket
INSERT INTO "tickets" ("id","reference","title","description","category","status","priority","urgency","source","clientId","siteId","equipmentId","creatorId","assigneeId","symptoms","createdAt","updatedAt") VALUES
  ('tck1','T2503-0141',
   'Porte automatique piétonne — ouverture sans sollicitation',
   'La porte coulissante automatique de l''entrée principale s''ouvre seule plusieurs fois par heure, sans détection de présence humaine.',
   'AUTOMATIC_DOORS','IN_PROGRESS','HIGH','INCONVENIENT','PORTAL',
   'cp_bourdeau','cs_pharma','eq_porte_pharma','usr_client','usr_sophie',
   ARRAY['Ouverture sans présence humaine','Détection intempestive','Fréquence aléatoire'],
   NOW(), NOW());

-- AI diagnostic
INSERT INTO "ai_diagnostic_suggestions" ("id","ticketId","probableEquipmentCategory","probableIssue","urgencyLevel","likelyParts","recommendedTools","safetyRisks","requiresHumanValidation","confidenceScore","confidenceLevel","nextBestAction","createdAt") VALUES
  ('diag1','tck1','AUTOMATIC_DOORS',
   'Sensibilité radar de présence trop élevée — peut être causée par des reflets lumineux ou vibrations.',
   'INCONVENIENT',
   ARRAY['Radar détecteur de présence'],
   ARRAY['Testeur de présence','Tournevis réglage'],
   ARRAY[]::TEXT[],
   TRUE, 0.68, 'MEDIUM',
   'Réglage de la sensibilité du radar en premier lieu. Si insuffisant, remplacement.',
   NOW());

-- Ticket message
INSERT INTO "ticket_messages" ("id","ticketId","userId","authorName","content","isInternal","createdAt") VALUES
  ('msg1','tck1','usr_client','Pierre Bourdeau',
   'Bonjour, la porte s''ouvre seule depuis ce matin, plusieurs fois par heure. Cela perturbe la régulation thermique de l''officine.',
   FALSE, NOW()),
  ('msg2','tck1','usr_op','Stéphanie Bonnet',
   'Ticket pris en charge. Diagnostic IA : radar de présence probablement trop sensible. Technicienne Sophie Renard planifiée.',
   TRUE, NOW());

-- Intervention
INSERT INTO "interventions" ("id","reference","ticketId","siteId","equipmentId","technicianId","status","scheduledAt","createdAt","updatedAt") VALUES
  ('int1','INT-2503-017','tck1','cs_pharma','eq_porte_pharma','usr_sophie','ON_SITE', NOW(), NOW(), NOW());

-- Notification
INSERT INTO "notifications" ("id","userId","type","title","message","link","createdAt") VALUES
  ('notif1','usr_client','ticket_update',
   'Technicien sur place',
   'Sophie Renard est arrivée sur site pour votre demande T2503-0141.',
   '/app/client', NOW());

-- ─────────────────────────────────────────────
-- Done !
-- Comptes de démo (mot de passe : demo1234)
-- admin@aso31.fr         → Admin
-- operateur@aso31.fr     → Opérateur
-- marc.delville@aso31.fr → Technicien
-- client@demo.fr         → Client
-- ─────────────────────────────────────────────
