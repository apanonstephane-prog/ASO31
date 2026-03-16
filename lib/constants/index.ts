// ASO31 Platform — Business Constants

export const COMPANY = {
  name: "ASO31",
  fullName: "ASO — Alarme Sécurité Occitane",
  tagline: "Expertise technique, réactivité terrain, pilotage intelligent.",
  phone: "05 61 07 66 07",
  phoneSAV: "05 62 13 20 30",
  phoneUrgency: "05 62 13 20 30",
  email: "info@aso31.fr",
  emailSAV: "info@aso31.fr",
  address: "7 rue Alfred Sauvy, 31270 Cugnaux",
  city: "Cugnaux",
  region: "Occitanie",
  postalCode: "31270",
  siret: "341 702 397 00025",
  founded: 1987,
  hours: {
    weekdays: "Lun–Jeu 8h–13h / 14h–18h",
    friday: "Ven 8h–13h / 14h–17h",
    saturday: "Fermé",
    emergency: "Dépannage SAV : 05 62 13 20 30",
  },
  zones: ["31", "32", "81", "82", "09"],
  social: {
    linkedin: "https://fr.linkedin.com/company/alarme-securite-occitane",
  },
} as const;

export const SERVICE_CATEGORIES = {
  ALARM_SECURITY: {
    label: "Alarme & Sécurité",
    shortLabel: "Alarme",
    description: "Installation, maintenance et dépannage de systèmes d'alarme intrusion, vidéosurveillance et contrôle d'accès.",
    href: "/services/alarmes-securite",
    icon: "shield-check",
    color: "brand",
  },
  AUTOMATION: {
    label: "Automatismes",
    shortLabel: "Automatismes",
    description: "Portails motorisés, barrières levantes, automatismes industriels et systèmes de commande.",
    href: "/services/automatismes",
    icon: "settings-2",
    color: "steel",
  },
  AUTOMATIC_DOORS: {
    label: "Portes Automatiques",
    shortLabel: "Portes Auto",
    description: "Portes automatiques coulissantes, battantes, sectionnelles et rideaux métalliques.",
    href: "/services/portes-automatiques",
    icon: "door-open",
    color: "steel",
  },
  CLIMATISATION: {
    label: "Climatisation",
    shortLabel: "Climatisation",
    description: "Installation et entretien de systèmes de climatisation résidentielle et tertiaire.",
    href: "/services/climatisation",
    icon: "wind",
    color: "brand",
  },
  MAINTENANCE_REPAIR: {
    label: "Maintenance & Dépannage",
    shortLabel: "Maintenance",
    description: "Contrats d'entretien pluriannuels et interventions de dépannage toutes marques.",
    href: "/services/maintenance-depannage",
    icon: "wrench",
    color: "accent",
  },
} as const;

export const CLIENT_TYPES = {
  INDIVIDUAL: { label: "Particulier", icon: "home" },
  BUSINESS: { label: "Entreprise", icon: "building-2" },
  SYNDIC: { label: "Syndic / Copropriété", icon: "building" },
  COLLECTIVITY: { label: "Collectivité", icon: "landmark" },
  INDUSTRY: { label: "Site industriel / logistique", icon: "factory" },
} as const;

export const TICKET_STATUSES = {
  NEW: { label: "Nouveau", color: "brand", bg: "bg-brand-100 text-brand-700" },
  TO_QUALIFY: { label: "À qualifier", color: "warning", bg: "bg-warning-100 text-warning-700" },
  PLANNED: { label: "Planifié", color: "brand", bg: "bg-blue-100 text-blue-700" },
  ASSIGNED: { label: "Assigné", color: "brand", bg: "bg-indigo-100 text-indigo-700" },
  IN_PROGRESS: { label: "En cours", color: "accent", bg: "bg-accent-100 text-accent-700" },
  WAITING_PART: { label: "Attente pièce", color: "warning", bg: "bg-amber-100 text-amber-700" },
  WAITING_CLIENT: { label: "Attente client", color: "steel", bg: "bg-gray-100 text-gray-700" },
  RESOLVED: { label: "Résolu", color: "success", bg: "bg-success-100 text-success-700" },
  CLOSED: { label: "Clôturé", color: "steel", bg: "bg-gray-100 text-gray-600" },
} as const;

export const PRIORITIES = {
  LOW: { label: "Faible", color: "bg-gray-100 text-gray-600", dot: "bg-gray-400" },
  NORMAL: { label: "Normale", color: "bg-blue-100 text-blue-700", dot: "bg-blue-500" },
  HIGH: { label: "Haute", color: "bg-amber-100 text-amber-700", dot: "bg-amber-500" },
  CRITICAL: { label: "Critique", color: "bg-red-100 text-red-700", dot: "bg-red-500" },
} as const;

export const URGENCIES = {
  NON_BLOCKING: { label: "Non bloquant", color: "bg-gray-100 text-gray-600" },
  INCONVENIENT: { label: "Gênant", color: "bg-amber-100 text-amber-700" },
  BLOCKING: { label: "Bloquant", color: "bg-orange-100 text-orange-700" },
  CRITICAL_SAFETY: { label: "Critique sécurité", color: "bg-red-100 text-red-700" },
} as const;

export const INTERVENTION_STATUSES = {
  PLANNED: { label: "Planifiée", color: "bg-blue-100 text-blue-700" },
  EN_ROUTE: { label: "En route", color: "bg-brand-100 text-brand-700" },
  ON_SITE: { label: "Sur site", color: "bg-accent-100 text-accent-700" },
  SUSPENDED: { label: "Suspendue", color: "bg-amber-100 text-amber-700" },
  COMPLETED: { label: "Terminée", color: "bg-success-100 text-success-700" },
  TO_RESCHEDULE: { label: "À reprogrammer", color: "bg-gray-100 text-gray-600" },
} as const;

export const ZONES = [
  "Toulouse Centre", "Toulouse Nord", "Toulouse Sud", "Toulouse Est", "Toulouse Ouest",
  "Blagnac", "Colomiers", "Tournefeuille", "Balma", "Ramonville",
  "Muret", "Castanet-Tolosan", "Labège", "Saint-Orens", "Cugnaux",
  "L'Union", "Roques", "Portet-sur-Garonne", "Pins-Justaret", "Vigoulet-Auzil",
  "Pibrac", "Léguevin", "Cornebarrieu", "Beauzelle", "Fenouillet",
] as const;

export const PAGES = {
  public: {
    home: "/",
    services: "/services",
    alarmeSecurity: "/services/alarmes-securite",
    automatismes: "/services/automatismes",
    portesAutomatiques: "/services/portes-automatiques",
    climatisation: "/services/climatisation",
    maintenance: "/services/maintenance-depannage",
    secteurs: "/secteurs",
    particuliers: "/secteurs/particuliers",
    entreprises: "/secteurs/entreprises",
    syndics: "/secteurs/syndics",
    collectivites: "/secteurs/collectivites",
    devis: "/devis",
    depannage: "/depannage",
    rendezvous: "/rendez-vous",
    assistant: "/assistant",
    apropos: "/a-propos",
    contact: "/contact",
    zones: "/zones-desservies",
    ressources: "/ressources",
  },
  auth: {
    login: "/login",
  },
  app: {
    dashboard: "/app",
    client: "/app/client",
    tickets: "/app/tickets",
    planning: "/app/planning",
    clients: "/app/clients",
    equipements: "/app/equipements",
    interventions: "/app/interventions",
    techniciens: "/app/techniciens",
    knowledge: "/app/knowledge",
    analytics: "/app/analytics",
    settings: "/app/settings",
  },
} as const;

export const EMPTY_STATES = {
  tickets: {
    title: "Aucun ticket pour le moment",
    description: "Les demandes d'intervention et de dépannage apparaîtront ici une fois créées.",
  },
  interventions: {
    title: "Aucune intervention planifiée",
    description: "Les interventions assignées et planifiées s'afficheront dans cette vue.",
  },
  clients: {
    title: "Aucun client enregistré",
    description: "Ajoutez vos premiers clients pour commencer à gérer leur parc d'équipements.",
  },
  equipements: {
    title: "Aucun équipement référencé",
    description: "Les équipements installés chez vos clients apparaîtront ici.",
  },
  knowledge: {
    title: "Base de connaissances vide",
    description: "Créez des fiches techniques et des procédures pour outiller vos techniciens.",
  },
  search: {
    title: "Aucun résultat",
    description: "Ajustez vos critères de recherche ou de filtrage pour afficher des résultats.",
  },
} as const;

export const SUCCESS_MESSAGES = {
  ticketCreated: "Votre demande a bien été enregistrée. Notre équipe revient vers vous rapidement.",
  quoteRequested: "Votre demande de devis a été transmise. Nous vous contacterons sous 24h.",
  appointmentBooked: "Votre demande de rendez-vous a été prise en compte. Confirmation par email ou téléphone.",
  interventionClosed: "L'intervention a été clôturée avec succès.",
  savedDraft: "Votre saisie a été sauvegardée automatiquement.",
  profileUpdated: "Vos informations ont été mises à jour.",
} as const;

export const ERROR_MESSAGES = {
  unauthorized: "Vous n'avez pas les droits nécessaires pour effectuer cette action.",
  notFound: "Cette ressource est introuvable ou a été supprimée.",
  uploadFailed: "L'envoi du fichier a échoué. Vérifiez le format et la taille (max 10 Mo).",
  serverError: "Une erreur technique est survenue. Veuillez réessayer ou nous contacter.",
  sessionExpired: "Votre session a expiré. Veuillez vous reconnecter.",
} as const;
