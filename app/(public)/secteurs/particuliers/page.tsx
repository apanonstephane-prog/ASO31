import type { Metadata } from "next";
import { Home, ShieldCheck, Settings2, DoorOpen, Wind, Wrench } from "lucide-react";
import { SectorPageTemplate } from "@/components/marketing/sector-page-template";

export const metadata: Metadata = {
  title: "Solutions Sécurité & Confort pour Particuliers — ASO31",
  description:
    "ASO sécurise et équipe votre maison ou appartement : alarme intrusion, portail motorisé, porte de garage, climatisation. Intervention rapide sur Toulouse et Occitanie.",
};

export default function ParticuliersPage() {
  return (
    <SectorPageTemplate
      icon={<Home className="w-5 h-5 text-white" />}
      category="Particuliers"
      headline="Votre maison, sécurisée et confortable"
      subheadline="Alarme, portail motorisé, porte de garage, climatisation — ASO installe, entretient et dépanne tous vos équipements depuis 1987."
      description="Que vous soyez propriétaire ou locataire, en maison individuelle ou en appartement, ASO vous propose des solutions adaptées à votre budget et à votre style de vie. Nos techniciens interviennent sur Toulouse et toute l'Occitanie (31, 32, 81, 82, 09) pour installer, entretenir et dépanner vos systèmes de sécurité, vos automatismes et votre climatisation. Chaque intervention est réalisée par un technicien qualifié, avec du matériel fiable et des contrats d'entretien sans mauvaise surprise."
      services={[
        {
          label: "Alarme & Vidéosurveillance",
          description: "Système d'alarme intrusion, détecteurs, sirènes et caméras pour sécuriser votre domicile 24h/24.",
          href: "/services/alarmes-securite",
          icon: <ShieldCheck className="w-4 h-4 text-brand-600" />,
        },
        {
          label: "Portail & Automatismes",
          description: "Motorisation de portail battant ou coulissant, télécommande, badge et interphone.",
          href: "/services/automatismes",
          icon: <Settings2 className="w-4 h-4 text-brand-600" />,
        },
        {
          label: "Porte de Garage Automatique",
          description: "Installation et dépannage de portes sectionnelles, basculantes ou à enroulement.",
          href: "/services/portes-automatiques",
          icon: <DoorOpen className="w-4 h-4 text-brand-600" />,
        },
        {
          label: "Climatisation Réversible",
          description: "Climatiseur split, multi-split ou gainable pour chauffer et rafraîchir votre logement.",
          href: "/services/climatisation",
          icon: <Wind className="w-4 h-4 text-brand-600" />,
        },
        {
          label: "Contrat d'Entretien",
          description: "Maintenance annuelle de vos équipements avec priorité d'intervention en cas de panne.",
          href: "/services/maintenance-depannage",
          icon: <Wrench className="w-4 h-4 text-brand-600" />,
        },
      ]}
      challenges={[
        {
          title: "Réactivité en cas de panne",
          description: "Un portail bloqué ou une alarme qui sonne la nuit, c'est urgent. Nos techniciens interviennent rapidement, y compris en SAV d'urgence.",
        },
        {
          title: "Solutions sans prise de tête",
          description: "Vous voulez un équipement fiable, pas des complications. On vous conseille, installe et entretient tout, clé en main.",
        },
        {
          title: "Respect de votre budget",
          description: "Devis gratuit et détaillé, financement possible, contrats d'entretien à tarif fixe annuel sans surprise.",
        },
        {
          title: "Conformité et assurance",
          description: "Nos installations sont certifiées et reconnues par les assureurs, ce qui peut réduire votre prime d'assurance habitation.",
        },
      ]}
      benefits={[
        {
          title: "Plus de 35 ans d'expérience",
          description: "Fondée en 1987, ASO connaît chaque marque et chaque génération d'équipement installée en Occitanie.",
        },
        {
          title: "Techniciens certifiés",
          description: "Tous nos techniciens sont qualifiés et formés en continu sur les dernières technologies de sécurité et de confort.",
        },
        {
          title: "Intervention toutes marques",
          description: "On dépanne et entretient tous les équipements, qu'ils aient été installés par ASO ou par un autre prestataire.",
        },
        {
          title: "Devis gratuit sous 48h",
          description: "Un technicien se déplace pour évaluer vos besoins et vous remet un devis clair, sans engagement.",
        },
        {
          title: "Couverture Occitanie",
          description: "Nos équipes couvrent les départements 31, 32, 81, 82 et 09, avec un délai d'intervention maîtrisé.",
        },
        {
          title: "Contrat d'entretien annuel",
          description: "Optez pour un contrat de maintenance et bénéficiez de la priorité d'intervention et d'un tarif main-d'œuvre préférentiel.",
        },
      ]}
      faqs={[
        {
          question: "Dois-je avoir un contrat d'entretien pour bénéficier du dépannage ?",
          answer: "Non. ASO intervient en dépannage pour tous les particuliers, avec ou sans contrat. Le contrat d'entretien annuel vous garantit simplement une priorité de passage et un tarif horaire préférentiel.",
        },
        {
          question: "ASO peut-il entretenir un équipement qu'il n'a pas installé ?",
          answer: "Oui. Nous intervenons sur toutes marques et tous types d'équipements, qu'ils aient été posés par ASO, par votre constructeur ou par un autre installateur.",
        },
        {
          question: "Mon assurance habitation exige-t-elle une alarme certifiée ?",
          answer: "Certaines compagnies exigent une installation NF A2P ou certifiée. Nos systèmes d'alarme répondent à ces exigences. Nous vous fournissons l'attestation d'installation pour votre assureur.",
        },
        {
          question: "Combien de temps dure une installation de portail motorisé ?",
          answer: "En général, une demi-journée suffit pour une motorisation sur portail existant. Pour une installation complète (portail + motorisation + interphone), comptez une journée.",
        },
        {
          question: "Proposez-vous des solutions de financement ?",
          answer: "Oui, nous travaillons avec des partenaires financement pour vous permettre d'étaler le coût de vos équipements. Renseignez-vous lors de votre devis.",
        },
      ]}
      ctaTitle="Un projet ou une panne à gérer ?"
      ctaDescription="Nos techniciens interviennent rapidement sur Toulouse et toute l'Occitanie. Devis gratuit, sans engagement."
      ctaPrimaryLabel="Demander un devis gratuit"
      ctaSecondaryLabel="Appeler le SAV"
      devisHref="/devis"
      depannageHref="/depannage"
      heroPhoto="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1600&q=85&auto=format&fit=crop"
      heroPhotoAlt="Maison individuelle résidentielle avec portail motorisé"
    />
  );
}
