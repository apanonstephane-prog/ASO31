import type { Metadata } from "next";
import { Landmark, ShieldCheck, Settings2, DoorOpen, Wrench } from "lucide-react";
import { SectorPageTemplate } from "@/components/marketing/sector-page-template";

export const metadata: Metadata = {
  title: "Solutions pour Collectivités & Établissements Publics — ASO31",
  description:
    "ASO équipe écoles, mairies, hôpitaux et établissements publics : alarme intrusion, contrôle d'accès, portes automatiques, automatismes. Conformité ERP, marchés publics, Occitanie.",
};

export default function CollectivitesPage() {
  return (
    <SectorPageTemplate
      icon={Landmark}
      category="Collectivités"
      headline="Des installations conformes pour vos établissements publics"
      subheadline="Écoles, mairies, centres culturels, hôpitaux — ASO installe et maintient vos équipements en conformité avec les normes ERP et les exigences de la commande publique."
      description="Les collectivités et établissements publics sont soumis à des obligations réglementaires strictes : conformité ERP, accessibilité PMR, traçabilité des interventions et mise en concurrence. ASO intervient sur l'ensemble des équipements de sécurité et de gestion des accès pour les mairies, écoles, collèges, lycées, hôpitaux, centres sportifs et culturels d'Occitanie. Nous répondons aux appels d'offres et marchés publics, et assurons la maintenance réglementaire avec la documentation nécessaire aux contrôles."
      services={[
        {
          label: "Alarme & Sécurité ERP",
          description: "Systèmes d'alarme intrusion et incendie, contrôle d'accès et vidéosurveillance conformes aux normes ERP de catégorie 1 à 5.",
          href: "/services/alarmes-securite",
          icon: ShieldCheck,
        },
        {
          label: "Automatismes & Portails",
          description: "Portails d'entrée motorisés, barrières de parking, bollards escamotables pour sécuriser les accès aux établissements.",
          href: "/services/automatismes",
          icon: Settings2,
        },
        {
          label: "Portes Automatiques PMR",
          description: "Portes automatiques coulissantes et battantes conformes à la réglementation accessibilité PMR (loi du 11 février 2005).",
          href: "/services/portes-automatiques",
          icon: DoorOpen,
        },
        {
          label: "Maintenance Réglementaire",
          description: "Contrats de maintenance avec rapports de visite, registre de sécurité et attestations de conformité pour vos contrôles périodiques.",
          href: "/services/maintenance-depannage",
          icon: Wrench,
        },
      ]}
      challenges={[
        {
          title: "Conformité réglementaire ERP",
          description: "Vos installations doivent respecter le règlement de sécurité contre l'incendie, les normes d'accessibilité et les prescriptions des commissions de sécurité.",
        },
        {
          title: "Traçabilité et registre de sécurité",
          description: "Chaque intervention doit être consignée dans le registre de sécurité. Nous fournissons tous les documents nécessaires à votre obligation de traçabilité.",
        },
        {
          title: "Réponse aux marchés publics",
          description: "Nos devis sont structurés pour répondre aux exigences des consultations et marchés publics, avec CCTP technique détaillé si nécessaire.",
        },
        {
          title: "Continuité du service public",
          description: "Une école ou un hôtel de ville ne peut pas rester fermé. Nos contrats garantissent des délais d'intervention adaptés au caractère critique de vos équipements.",
        },
      ]}
      benefits={[
        {
          title: "Référencement marchés publics",
          description: "ASO répond aux appels d'offres et marchés publics. Nous pouvons vous accompagner dans la rédaction du CCTP technique.",
        },
        {
          title: "Conformité normes NF & EN",
          description: "Nos installations respectent les normes NF et EN applicables (alarme intrusion, contrôle d'accès, portes automatiques, accessibilité).",
        },
        {
          title: "Documentation réglementaire complète",
          description: "Attestations d'installation, DOE (Dossier des Ouvrages Exécutés), rapports de visite et certificats de conformité fournis systématiquement.",
        },
        {
          title: "Interlocuteur technique dédié",
          description: "Un technicien référent connaît vos sites et assure la continuité du suivi technique d'une année sur l'autre.",
        },
        {
          title: "Couverture Haute-Garonne et Occitanie",
          description: "Nous intervenons sur tous les départements de la région (31, 32, 81, 82, 09), y compris en zones rurales.",
        },
        {
          title: "Expérience établissements publics",
          description: "Plus de 35 ans d'expérience en Occitanie, avec de nombreuses références dans l'enseignement, la santé et les équipements municipaux.",
        },
      ]}
      faqs={[
        {
          question: "ASO peut-il répondre à un appel d'offres pour une collectivité ?",
          answer: "Oui. Nous répondons régulièrement aux consultations des collectivités et pouvons fournir un mémoire technique détaillé, des références et les certifications requises.",
        },
        {
          question: "Quelles certifications possédez-vous pour les établissements ERP ?",
          answer: "Nos techniciens sont qualifiés pour l'installation et la maintenance de systèmes de sécurité en ERP. Nous fournissons les attestations de conformité requises par les commissions de sécurité.",
        },
        {
          question: "Fournissez-vous les documents pour le registre de sécurité ?",
          answer: "Oui. Chaque visite de maintenance donne lieu à un rapport détaillé, conforme aux exigences du registre de sécurité des ERP. Ces documents sont remis en format papier et numérique.",
        },
        {
          question: "Intervenez-vous pendant les vacances scolaires pour limiter les perturbations ?",
          answer: "Nous planifions prioritairement nos interventions lourdes pendant les congés scolaires pour les écoles et établissements d'enseignement. Dites-nous vos contraintes lors du devis.",
        },
        {
          question: "Pouvez-vous intervenir sur des bâtiments classés ou protégés ?",
          answer: "Oui, sous réserve des autorisations nécessaires (ABF, etc.). Nous avons l'expérience des contraintes liées aux bâtiments patrimoniaux et adaptons nos méthodes d'installation en conséquence.",
        },
      ]}
      ctaTitle="Un projet pour votre collectivité ?"
      ctaDescription="Réponse aux marchés publics, devis téchnique détaillé, documentation réglementaire complète. Contactez-nous."
      ctaPrimaryLabel="Demander un devis"
      ctaSecondaryLabel="Nous contacter"
      devisHref="/devis"
      heroPhoto="https://images.unsplash.com/photo-1577495508048-b635879837f1?w=1600&q=85&auto=format&fit=crop"
      heroPhotoAlt="Bâtiment public — mairie, école ou équipement collectif"
    />
  );
}
