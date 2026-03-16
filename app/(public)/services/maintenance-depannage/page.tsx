import type { Metadata } from "next";
import { Wrench } from "lucide-react";
import { ServicePageTemplate } from "@/components/marketing/service-page-template";

export const metadata: Metadata = {
  title: "Maintenance & Dépannage Toulouse — Contrats d'entretien multi-équipements",
  description:
    "Contrats d'entretien annuels et dépannage toutes marques sur Toulouse. Automatismes, alarmes, climatisation, portes automatiques.",
};

export default function MaintenanceDepannagePage() {
  return (
    <ServicePageTemplate
      icon={Wrench}
      category="Maintenance & Dépannage"
      headline="Contrats d'entretien et dépannage toutes marques"
      subheadline="Maintenance préventive planifiée, contrats multi-équipements et dépannage rapide sur Toulouse et agglomération. Un seul interlocuteur pour tous vos équipements techniques."
      description="La maintenance préventive réduit les pannes, prolonge la durée de vie des équipements et maîtrise les coûts de SAV. Nos contrats d'entretien couvrent l'ensemble de vos équipements techniques — automatismes, alarmes, portes automatiques, climatisation — avec un seul contrat, un seul interlocuteur et une gestion centralisée. Pour les clients multi-sites (syndics, collectivités, parc immobilier), nous organisons la planification sur l'année et garantissons les délais d'intervention définis au contrat."
      scope={[
        "Contrat mono ou multi-équipements",
        "Contrat multi-sites",
        "Visites préventives planifiées",
        "Maintenance corrective (pannes)",
        "Fourniture de pièces incluse ou en option",
        "Rapport de visite signé",
        "Accès au portail de suivi",
        "Garantie de délai d'intervention (SLA)",
        "Coordination en site occupé",
      ]}
      benefits={[
        {
          title: "Un seul contrat pour tous vos équipements",
          description:
            "Portails, alarmes, climatisation, portes automatiques — un seul contrat, une seule facture, un seul interlocuteur. Simplifie la gestion et améliore la coordination.",
        },
        {
          title: "SLA définis et respectés",
          description:
            "Chaque contrat spécifie des engagements de délai : temps de prise en charge, délai d'intervention selon l'urgence. Ces engagements sont suivis et mesurés.",
        },
        {
          title: "Prévention des pannes",
          description:
            "Les visites préventives permettent de détecter les signes faibles (usure, corrosion, vibration anormale) avant qu'ils génèrent une panne. Moins d'urgences, plus de maîtrise.",
        },
        {
          title: "Historique complet par équipement",
          description:
            "Chaque équipement dispose de son historique complet dans notre système : interventions, pièces, observations, recommandations. Accessible depuis votre espace client.",
        },
        {
          title: "Coordination avec vos contraintes",
          description:
            "Copropriété en travaux, commerce ouvert, site industriel en production — nous adaptons les créneaux et les méthodes aux réalités de votre site.",
        },
        {
          title: "Devis comparatif sous 48h",
          description:
            "Sur description de votre parc, nous vous soumettons un devis clair avec détail des équipements couverts, fréquence des visites et conditions d'intervention.",
        },
      ]}
      faqs={[
        {
          question: "Quelle est la différence entre maintenance préventive et corrective ?",
          answer:
            "La maintenance préventive est planifiée et réalisée selon un calendrier : vérification des équipements, lubrification, tests. Elle vise à éviter les pannes. La maintenance corrective intervient en réaction à une panne ou un dysfonctionnement. Nos contrats peuvent couvrir l'une, l'autre ou les deux.",
        },
        {
          question: "Est-il possible de faire un contrat uniquement pour le dépannage ?",
          answer:
            "Oui. Nous proposons des contrats de type 'assistance corrective' qui couvrent les interventions de dépannage avec des conditions tarifaires et des délais garantis, sans visite préventive systématique. Cette formule convient aux équipements récents ou peu sollicités.",
        },
        {
          question: "Combien de sites peut couvrir un seul contrat ?",
          answer:
            "Un contrat peut couvrir un nombre illimité de sites. Pour les gestionnaires de patrimoine immobilier (syndics, bailleurs, collectivités), nous construisons des contrats de service cadre avec des prix unitaires et des conditions communes.",
        },
        {
          question: "Intervenez-vous sur des équipements que vous n'avez pas installés ?",
          answer:
            "Oui, c'est même notre cas le plus fréquent. Nous reprenons des équipements existants, quelle que soit leur origine, après un audit initial permettant de connaître l'état du parc.",
        },
        {
          question: "Que se passe-t-il si une pièce doit être commandée et prend du temps ?",
          answer:
            "Nous sécurisons l'équipement si possible en attendant la pièce. Si l'équipement ne peut pas fonctionner de manière sûre, nous proposons une solution temporaire et nous vous tenons informé du délai de livraison via votre espace client.",
        },
      ]}
      depannageHref="/depannage"
      devisHref="/devis?category=MAINTENANCE_REPAIR"
    />
  );
}
