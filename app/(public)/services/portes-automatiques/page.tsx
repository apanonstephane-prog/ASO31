import type { Metadata } from "next";
import { DoorOpen } from "lucide-react";
import { ServicePageTemplate } from "@/components/marketing/service-page-template";

export const metadata: Metadata = {
  title: "Portes Automatiques Toulouse — Dépannage Porte, Rideau Métallique",
  description:
    "Dépannage et maintenance de portes automatiques coulissantes, rideaux métalliques, portes sectionnelles et portes de garage sur Toulouse.",
};

export default function PortesAutomatiquesPage() {
  return (
    <ServicePageTemplate
      icon={DoorOpen}
      category="Portes Automatiques"
      headline="Portes automatiques et fermetures industrielles"
      subheadline="Dépannage, installation et entretien de portes automatiques coulissantes, rideaux métalliques, portes sectionnelles et portes de garage sur Toulouse et agglomération."
      description="Les portes automatiques conditionnent l'accessibilité et la sécurité des locaux commerciaux, tertiaires et industriels. Une panne de rideau métallique le matin d'ouverture ou d'une porte sectionnelle d'entrepôt a des conséquences opérationnelles immédiates. Notre équipe intervient sur l'ensemble des équipements de fermeture automatique : portes coulissantes piétonnes, portes sectionnelles industrielles, rideaux métalliques, portes rapides et volets roulants motorisés. Nous assurons également la conformité aux normes de sécurité en vigueur."
      scope={[
        "Porte coulissante automatique piétonne",
        "Porte battante automatique",
        "Rideau métallique (lames, enroulement)",
        "Porte sectionnelle (garage, entrepôt)",
        "Porte rapide souple",
        "Portillon automatique",
        "Volet roulant motorisé",
        "Porte de garage résidentielle",
        "Tourniquet de contrôle d'accès",
      ]}
      benefits={[
        {
          title: "Dépannage en urgence",
          description:
            "Rideau bloqué en position fermée la veille d'ouverture, porte sectionnelle coincée — nous intervenons en urgence pour débloquer et sécuriser avant toute réparation définitive.",
        },
        {
          title: "Conformité NF EN 16005",
          description:
            "Pour les portes automatiques piétonnes, la norme EN 16005 impose une maintenance régulière et des contrôles de sécurité. Nos interventions sont documentées et conformes.",
        },
        {
          title: "Remplacement de ressorts et câbles",
          description:
            "Les ressorts de torsion et les câbles de levage des portes sectionnelles sont des pièces de sécurité. Leur remplacement est rapide et évite la casse complète du mécanisme.",
        },
        {
          title: "Sites occupés et commerce ouvert",
          description:
            "Nous intervenons sans perturber l'activité. Pour les commerces, nous privilégions les créneaux tôt le matin ou en fermeture pour les travaux importants.",
        },
        {
          title: "Contrats multi-équipements",
          description:
            "Si vous disposez de plusieurs fermetures automatiques sur un ou plusieurs sites, un contrat global simplifie la gestion et réduit le coût unitaire.",
        },
        {
          title: "Conseil sur l'évolution du parc",
          description:
            "Équipement vieillissant, pièces indisponibles, consommation excessive — nous vous conseillons sur le bon moment pour renouveler sans sur-vendre.",
        },
      ]}
      faqs={[
        {
          question: "Mon rideau métallique est bloqué à l'ouverture — peut-on intervenir le matin même ?",
          answer:
            "Oui, c'est notre priorité. Les blocages de rideau métallique avant ouverture de commerce sont traités en urgence selon disponibilité. Appelez-nous dès 8h ou déposez une demande urgente via le formulaire — notre équipe vous contacte sous 30 minutes.",
        },
        {
          question: "Faut-il un contrat d'entretien pour une porte automatique piétonne ?",
          answer:
            "Oui, la norme EN 16005 impose une maintenance régulière pour les portes automatiques piétonnes dans les lieux accessibles au public. La fréquence dépend du trafic. En plus de la conformité, l'entretien prévient les blocages et prolonge la durée de vie du système.",
        },
        {
          question: "Ma porte sectionnelle descend mais ne remonte plus — est-ce grave ?",
          answer:
            "Cela peut indiquer un problème de ressort (cassé ou détendu), de câble ou d'encodeur. C'est un problème courant et généralement réparable rapidement avec les pièces adéquates. Si un ressort est cassé, n'essayez pas de forcer manuellement — le mécanisme peut être déséquilibré.",
        },
        {
          question: "Intervenez-vous sur des portes automatiques de marques spécifiques ?",
          answer:
            "Nous travaillons sur les marques courantes : Hormann, Sommer, Marantec, Chamberlain, BFT, Ditec. Pour les systèmes industriels, nous intervenons sur la plupart des équipements en contactant le support technique du fabricant si nécessaire.",
        },
      ]}
      depannageHref="/depannage?category=AUTOMATIC_DOORS"
      devisHref="/devis?category=AUTOMATIC_DOORS"
    />
  );
}
