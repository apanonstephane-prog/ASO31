import type { Metadata } from "next";
import { Building, Settings2, DoorOpen, ShieldCheck, Wrench } from "lucide-react";
import { SectorPageTemplate } from "@/components/marketing/sector-page-template";

export const metadata: Metadata = {
  title: "Solutions pour Syndics & Copropriétés — ASO31",
  description:
    "ASO équipe et maintient les parties communes : portails, interphonie, portes de parking, contrôle d'accès et barrières levantes. Contrats collectifs en Occitanie.",
};

export default function SyndicsPage() {
  return (
    <SectorPageTemplate
      icon={<Building className="w-5 h-5 text-white" />}
      category="Syndics & Copropriétés"
      headline="La gestion des accès collectifs, simplifiée"
      subheadline="Portails de résidence, interphonie, portes de parking, barrières et contrôle d'accès — ASO accompagne les syndics et gestionnaires de copropriété depuis 1987."
      description="La gestion des équipements en copropriété implique des contraintes particulières : décisions en assemblée générale, budgets partagés, diversité des résidents et exigences de fiabilité 24h/24. ASO propose des contrats d'entretien collectifs adaptés aux syndics et gestionnaires, avec des interlocuteurs dédiés, une traçabilité complète des interventions et une réactivité SAV adaptée aux impératifs de la vie en copropriété."
      services={[
        {
          label: "Portails & Automatismes de Résidence",
          description: "Portails coulissants motorisés, télécommandes, badges résidents, gestion des codes d'accès visiteurs.",
          href: "/services/automatismes",
          icon: <Settings2 className="w-4 h-4 text-brand-600" />,
        },
        {
          label: "Portes de Parking & Barrières",
          description: "Portes sectionnelles de sous-sol, barrières levantes de parking, contrôle d'accès véhicules par badge ou télécommande.",
          href: "/services/portes-automatiques",
          icon: <DoorOpen className="w-4 h-4 text-brand-600" />,
        },
        {
          label: "Interphonie & Contrôle d'Accès",
          description: "Parlophonie, visiophonie, gestion des accès piétons, ouverture à distance depuis smartphone.",
          href: "/services/alarmes-securite",
          icon: <ShieldCheck className="w-4 h-4 text-brand-600" />,
        },
        {
          label: "Contrat d'Entretien Collectif",
          description: "Maintenance préventive et corrective sur l'ensemble des équipements de la résidence, avec rapport annuel pour l'AG.",
          href: "/services/maintenance-depannage",
          icon: <Wrench className="w-4 h-4 text-brand-600" />,
        },
      ]}
      challenges={[
        {
          title: "Disponibilité 24h/24 pour les résidents",
          description: "Un portail bloqué la nuit ou une porte de parking défaillante, c'est une urgence pour les résidents. Notre SAV répond rapidement.",
        },
        {
          title: "Gestion des badges et accès résidents",
          description: "Entrées, sorties de locataires, changement de propriétaire : nos systèmes permettent une gestion souple et sécurisée des droits d'accès.",
        },
        {
          title: "Reporting pour les assemblées générales",
          description: "Nous vous fournissons un bilan annuel des interventions, des pièces remplacées et de l'état des équipements, utile pour vos AG et vos budgets.",
        },
        {
          title: "Conformité et responsabilité",
          description: "Les équipements de copropriété sont soumis à des obligations réglementaires. Nous assurons leur conformité et vous déchargeons de la responsabilité technique.",
        },
      ]}
      benefits={[
        {
          title: "Contrat global résidence",
          description: "Un seul contrat couvre l'ensemble des équipements de la résidence : portail, parking, interphonie, accès piétons.",
        },
        {
          title: "Interlocuteur dédié syndic",
          description: "Votre gestionnaire dispose d'un contact direct chez ASO pour les urgences, les demandes de devis et le suivi des interventions.",
        },
        {
          title: "Traçabilité complète",
          description: "Chaque intervention est consignée dans un rapport accessible, pour une transparence totale vis-à-vis des copropriétaires.",
        },
        {
          title: "Réactivité SAV prioritaire",
          description: "Les pannes bloquantes (portail, parking) sont traitées en priorité avec un délai d'intervention garanti contractuellement.",
        },
        {
          title: "Gestion du parc de badges",
          description: "Nous gérons les badges résidents : création, suppression, remplacement, avec un registre actualisé à tout moment.",
        },
        {
          title: "Devis adaptés au vote en AG",
          description: "Nos devis sont structurés pour être présentés en assemblée générale, avec détail des travaux, coûts et planning d'intervention.",
        },
      ]}
      faqs={[
        {
          question: "Comment fonctionne un contrat de maintenance pour une copropriété ?",
          answer: "Le contrat couvre les visites préventives annuelles et les interventions correctives sur les équipements définis. Un rapport d'intervention est fourni à chaque visite, et un bilan annuel est remis au syndic.",
        },
        {
          question: "Peut-on ajouter de nouveaux équipements en cours de contrat ?",
          answer: "Oui. Le contrat peut être amendé pour intégrer de nouveaux équipements (ex : remplacement d'un portail vétuste, ajout d'un interphone). Un avenant tarifaire est établi.",
        },
        {
          question: "Comment gérer les badges des résidents qui partent ou arrivent ?",
          answer: "Nous mettons à jour le registre des badges sur simple demande du syndic par email ou téléphone. Les badges perdus ou volés peuvent être invalidés à distance immédiatement.",
        },
        {
          question: "Intervenez-vous en urgence le week-end et les jours fériés ?",
          answer: "Oui, notre numéro SAV est disponible pour les urgences bloquantes (portail, parking). Selon votre contrat, des délais d'intervention garantis peuvent être définis.",
        },
        {
          question: "Pouvez-vous préparer un rapport pour notre assemblée générale ?",
          answer: "Absolument. Nous préparons un bilan annuel synthétique des interventions et de l'état des équipements, présenté dans un format adapté aux AG de copropriété.",
        },
      ]}
      ctaTitle="Un projet pour votre résidence ?"
      ctaDescription="Devis gratuit, rapport d'intervention systématique et contrat adapté aux exigences des syndics. Contactez-nous."
      ctaPrimaryLabel="Demander un devis"
      ctaSecondaryLabel="Contacter un référent syndic"
      devisHref="/devis"
      depannageHref="/depannage"
      heroPhoto="https://images.unsplash.com/photo-1460317442991-0ec209397118?w=1600&q=85&auto=format&fit=crop"
      heroPhotoAlt="Immeuble résidentiel en copropriété avec portail d'accès"
    />
  );
}
