import type { Metadata } from "next";
import { Building2, ShieldCheck, Settings2, DoorOpen, Wind, Wrench } from "lucide-react";
import { SectorPageTemplate } from "@/components/marketing/sector-page-template";

export const metadata: Metadata = {
  title: "Solutions Sécurité & Automatismes pour Entreprises — ASO31",
  description:
    "ASO équipe les entreprises, commerces et sites industriels : contrôle d'accès, alarme, portails, rideaux métalliques, climatisation. Contrats de maintenance sur mesure en Occitanie.",
};

export default function EntreprisesPage() {
  return (
    <SectorPageTemplate
      icon={Building2}
      category="Entreprises & Commerces"
      headline="La sécurité de votre site, sans compromis"
      subheadline="Contrôle d'accès, alarme intrusion, portails industriels, rideaux métalliques, climatisation tertiaire — ASO accompagne les entreprises depuis 1987."
      description="Locaux commerciaux, entrepôts, bureaux, sites de production : chaque entreprise a des contraintes spécifiques en matière de sécurité, d'accès et de confort. ASO déploie des solutions professionnelles dimensionnées à votre activité, avec des contrats de maintenance qui garantissent la continuité de vos équipements. Nos techniciens interviennent en horaires étendus pour s'adapter aux contraintes de votre exploitation, et vous disposez d'un interlocuteur dédié pour le suivi de vos installations."
      services={[
        {
          label: "Alarme & Contrôle d'accès",
          description: "Système d'alarme intrusion, badges, lecteurs biométriques, vidéosurveillance et gestion des droits d'accès par zone.",
          href: "/services/alarmes-securite",
          icon: ShieldCheck,
        },
        {
          label: "Portails & Barrières Levantes",
          description: "Portails coulissants motorisés, barrières de parking, bornes escamotables pour sécuriser vos accès véhicules.",
          href: "/services/automatismes",
          icon: Settings2,
        },
        {
          label: "Portes Automatiques & Rideaux",
          description: "Portes automatiques coulissantes, rideaux métalliques, portes sectionnelles industrielles et issues de secours motorisées.",
          href: "/services/portes-automatiques",
          icon: DoorOpen,
        },
        {
          label: "Climatisation Tertiaire",
          description: "Systèmes de climatisation pour bureaux, salles informatiques, commerces et espaces de production.",
          href: "/services/climatisation",
          icon: Wind,
        },
        {
          label: "Contrat de Maintenance",
          description: "Contrats pluriannuels adaptés à vos obligations réglementaires, avec rapports d'intervention et traçabilité complète.",
          href: "/services/maintenance-depannage",
          icon: Wrench,
        },
      ]}
      challenges={[
        {
          title: "Continuité d'exploitation",
          description: "Un rideau bloqué ou une alarme défaillante peut bloquer votre activité. Nos contrats de maintenance prévoient des interventions prioritaires pour minimiser l'impact.",
        },
        {
          title: "Gestion des accès multi-zones",
          description: "Contrôler qui entre, où et quand : nos systèmes de contrôle d'accès permettent une gestion fine des droits par badge, code ou biométrie.",
        },
        {
          title: "Conformité réglementaire",
          description: "ERP, ICPE, règlement intérieur : nous vous aidons à maintenir vos installations en conformité avec les normes en vigueur et les exigences de votre assureur.",
        },
        {
          title: "Interlocuteur unique",
          description: "Alarme, automatismes, climatisation — un seul contrat, un seul numéro d'appel, un seul technicien référent qui connaît vos installations.",
        },
      ]}
      benefits={[
        {
          title: "Réactivité SAV garantie",
          description: "Délais d'intervention définis contractuellement selon le niveau de criticité de la panne et votre contrat.",
        },
        {
          title: "Techniciens habilités",
          description: "Nos équipes sont habilitées pour intervenir sur des sites sensibles, avec les certifications requises (Qualifelec, etc.).",
        },
        {
          title: "Rapport d'intervention systématique",
          description: "Chaque visite donne lieu à un rapport détaillé, consultable via votre espace client, pour la traçabilité et vos audits.",
        },
        {
          title: "Maintenance préventive",
          description: "Nos contrats incluent des visites préventives programmées pour détecter les défauts avant la panne.",
        },
        {
          title: "Devis multi-sites",
          description: "Vous gérez plusieurs sites en Occitanie ? On établit un contrat cadre unique avec des conditions tarifaires dégroupées.",
        },
        {
          title: "Disponibilité étendue",
          description: "Interventions en dehors des horaires de bureau sur demande, pour ne pas perturber votre activité.",
        },
      ]}
      faqs={[
        {
          question: "ASO peut-il gérer l'ensemble de nos équipements sous un contrat unique ?",
          answer: "Oui. Nous proposons des contrats multi-prestations couvrant l'alarme, les automatismes, les portes automatiques et la climatisation, avec un seul interlocuteur et une facturation consolidée.",
        },
        {
          question: "Quelle est la durée minimale d'un contrat de maintenance entreprise ?",
          answer: "Nos contrats sont en général annuels ou pluriannuels (1 à 3 ans). La durée est négociée selon la taille du site et le nombre d'équipements couverts.",
        },
        {
          question: "Intervenez-vous sur des sites en activité pendant les heures de travail ?",
          answer: "Oui, nos techniciens sont habitués à travailler en milieu occupé en prenant les précautions nécessaires. Pour les interventions lourdes, nous pouvons les planifier en soirée ou le week-end.",
        },
        {
          question: "Fournissez-vous des rapports d'intervention pour les audits de sécurité ?",
          answer: "Absolument. Chaque intervention (préventive ou corrective) donne lieu à un rapport signé, avec la description des travaux, les pièces remplacées et l'état de l'installation.",
        },
        {
          question: "Pouvez-vous reprendre en maintenance des installations que vous n'avez pas posées ?",
          answer: "Oui, sous réserve d'un état des lieux préalable. Nous réalisons un audit technique de l'installation existante avant de proposer un contrat de maintenance adapté.",
        },
      ]}
      ctaTitle="Parlons de vos installations"
      ctaDescription="Audit gratuit, devis sous 48h, contrat adapté à votre activité. Nos équipes se déplacent sur tous vos sites en Occitanie."
      ctaPrimaryLabel="Demander un audit gratuit"
      ctaSecondaryLabel="Contacter un commercial"
      devisHref="/devis"
      depannageHref="/depannage"
    />
  );
}
