import type { Metadata } from "next";
import { Shield } from "lucide-react";
import { ServicePageTemplate } from "@/components/marketing/service-page-template";

export const metadata: Metadata = {
  title: "Alarme & Sécurité Toulouse — Installation, Maintenance, Dépannage",
  description:
    "Installation et maintenance de systèmes d'alarme intrusion, contrôle d'accès, vidéosurveillance et interphonie sur Toulouse et Haute-Garonne.",
};

export default function AlarmesSecuritePage() {
  return (
    <ServicePageTemplate
      icon={Shield}
      category="Alarme & Sécurité"
      headline="Systèmes d'alarme et sécurité électronique"
      subheadline="Installation, maintenance et dépannage de systèmes d'alarme intrusion, contrôle d'accès, vidéosurveillance et interphonie pour particuliers et professionnels."
      description="Nos techniciens interviennent sur l'ensemble des systèmes de sécurité électronique : alarmes intrusion filaires et sans fil, centrales grades 2 et 3, détection périmétrique, vidéosurveillance IP et analogique, contrôle d'accès par badge ou digicode, et interphonie. Nous travaillons sur des marques reconnues : Ajax, Texecom, Dahua, Hikvision, Comelit, Urmet, 2N. Pour les particuliers comme pour les sites tertiaires, collectivités et commerces, nous adaptons la solution à la réalité du site."
      scope={[
        "Centrale d'alarme intrusion (filaire / sans fil)",
        "Détecteurs infrarouges, bris de vitre, ouvertures",
        "Sirènes intérieures et extérieures",
        "Claviers et lecteurs de badge",
        "Vidéosurveillance IP et analogique",
        "Contrôle d'accès par badge, digicode ou biométrie",
        "Interphonie audio et vidéo (platine de rue)",
        "Visiophone particulier et collectif",
        "Télésurveillance (raccordement stations)",
      ]}
      benefits={[
        {
          title: "Toutes marques, tous grades",
          description:
            "Nous intervenons sur les marques les plus courantes et les équipements existants, quelle que soit leur origine. Pas de remplacement systématique si la réparation est possible.",
        },
        {
          title: "Diagnostic rapide",
          description:
            "Avant l'intervention, nos techniciens accèdent à l'historique de votre équipement et aux symptômes transmis. Moins de temps perdu sur site pour chercher la cause.",
        },
        {
          title: "Maintenance préventive annuelle",
          description:
            "Un contrat d'entretien couvre les visites réglementaires, le test de l'ensemble du système et la mise à jour de votre documentation technique.",
        },
        {
          title: "Intervention en site occupé",
          description:
            "Commerce ouvert, immeuble de bureaux, résidence — nous nous adaptons aux contraintes d'accès et de bruit. Intervention hors heures si nécessaire.",
        },
        {
          title: "Traçabilité des interventions",
          description:
            "Chaque visite est documentée dans votre espace client : compte rendu, photos, pièces utilisées, et recommandations pour la suite.",
        },
        {
          title: "Raccordement à la télésurveillance",
          description:
            "Nous pouvons raccorder votre centrale à une station de télésurveillance agréée. Levée de doute, intervention gardiennage, signalement forces de l'ordre.",
        },
      ]}
      faqs={[
        {
          question: "En combien de temps pouvez-vous intervenir sur une alarme déclenchée ?",
          answer:
            "Pour les urgences contractuelles (alarme déclenchée, panne de centrale), notre temps de prise en charge est de moins d'1h en heures ouvrables. Pour les clients sous contrat d'entretien, nous disposons d'une astreinte en dehors des heures normales.",
        },
        {
          question: "Intervenez-vous sur des alarmes que vous n'avez pas installées ?",
          answer:
            "Oui, nous intervenons sur la quasi-totalité des marques du marché. Un diagnostic initial est nécessaire pour certains systèmes propriétaires, mais nous travaillons quotidiennement sur Ajax, Texecom, DSC, Paradox, Risco, et bien d'autres.",
        },
        {
          question: "Que faire si mon alarme déclenche sans raison apparente ?",
          answer:
            "Ne désactivez pas définitivement votre système. Un déclenchement intempestif a toujours une cause : détecteur trop sensible, batterie faible, zone en défaut, ou perturbation électromagnétique. Transmettez-nous les heures et zones concernées — nous pouvons souvent orienter le diagnostic à distance avant la visite.",
        },
        {
          question: "Proposez-vous des contrats d'entretien pour l'alarme ?",
          answer:
            "Oui. Nos contrats couvrent une visite annuelle de vérification complète (détecteurs, centrale, batterie de secours, sirènes, télésurveillance), la main d'œuvre en cas de panne et les mises à jour recommandées. Tarif selon le type et la taille du système.",
        },
        {
          question: "Est-il obligatoire de faire entretenir son système d'alarme ?",
          answer:
            "Pour les particuliers, l'entretien n'est pas légalement obligatoire mais recommandé. Pour certains établissements soumis au règlement de sécurité incendie ou ERP, une maintenance documentée peut être exigée. Nous vous conseillons sur votre situation spécifique.",
        },
      ]}
      depannageHref="/depannage?category=ALARM_SECURITY"
      devisHref="/devis?category=ALARM_SECURITY"
    />
  );
}
