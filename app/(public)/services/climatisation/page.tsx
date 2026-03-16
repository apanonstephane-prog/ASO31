import type { Metadata } from "next";
import { Wind } from "lucide-react";
import { ServicePageTemplate } from "@/components/marketing/service-page-template";

export const metadata: Metadata = {
  title: "Climatisation Toulouse — Installation, Entretien, Dépannage",
  description:
    "Installation et entretien de climatisation résidentielle et tertiaire sur Toulouse. Split mural, gainable, PAC. Intervention rapide.",
};

export default function ClimatisationPage() {
  return (
    <ServicePageTemplate
      icon={Wind}
      category="Climatisation"
      headline="Climatisation résidentielle et tertiaire"
      subheadline="Installation, entretien réglementaire et dépannage de systèmes de climatisation split mural, gainable et PAC air/air sur Toulouse et Haute-Garonne."
      description="La climatisation est devenue un équipement essentiel, aussi bien dans les logements que dans les locaux tertiaires, commerces et bureaux. Une panne en plein été ou un système qui ne tient plus ses performances a des conséquences directes sur le confort et la productivité. Nos techniciens interviennent sur les systèmes mono et multi-split, les unités gainables et les pompes à chaleur air/air. Nous sommes certifiés pour la manipulation des fluides frigorigènes (attestation CERFA). Marques courantes : Daikin, Mitsubishi Electric, Atlantic, Hitachi, Samsung, LG."
      scope={[
        "Split mural monobloc et multi-split",
        "Climatisation gainable",
        "Pompe à chaleur air/air",
        "Système VRV/VRF (tertiaire)",
        "Groupe extérieur (condenseur)",
        "Cassette de plafond",
        "Unité console",
        "Thermostat et regulation",
      ]}
      benefits={[
        {
          title: "Entretien annuel réglementaire",
          description:
            "Pour les systèmes de plus de 2 kW de puissance frigorifique, l'entretien périodique est obligatoire. Notre contrat couvre nettoyage, contrôle des pressions et vérification d'étanchéité.",
        },
        {
          title: "Certification fluides frigorigènes",
          description:
            "Nos techniciens sont certifiés pour la manipulation des fluides frigorigènes (R32, R410A, R22). Intervention conforme à la réglementation F-Gaz.",
        },
        {
          title: "Diagnostic précis avant réparation",
          description:
            "Nous utilisons des instruments de mesure (manomètres, thermomètre infrarouge, analyseur frigoriste) pour identifier la cause réelle avant toute intervention.",
        },
        {
          title: "Optimisation des performances",
          description:
            "Un filtre encrassé ou un condenseur sale peut réduire les performances de 20 à 30%. L'entretien régulier maintient le COP de l'appareil et réduit la consommation.",
        },
        {
          title: "Aide au dimensionnement",
          description:
            "Pour une nouvelle installation, nous calculons la puissance nécessaire selon le volume, l'isolation et l'exposition. Ni sous-dimensionné (inefficace), ni surdimensionné (coûteux).",
        },
        {
          title: "Commande fluide rapide",
          description:
            "En cas de fuite ou de charge nécessaire, nous commandons le fluide frigorigène via nos fournisseurs agréés avec des délais maîtrisés.",
        },
      ]}
      faqs={[
        {
          question: "Ma climatisation souffle mais ne refroidit plus — que vérifier ?",
          answer:
            "Commencez par nettoyer les filtres de l'unité intérieure — un filtre encrassé est la cause la plus fréquente de baisse de performance. Vérifiez également que le mode est bien sur 'froid' et que la consigne est inférieure à la température ambiante. Si après ces vérifications le problème persiste, une intervention est nécessaire (pression de fluide, sonde, carte).",
        },
        {
          question: "L'entretien annuel est-il obligatoire ?",
          answer:
            "Pour tout système de climatisation ou de pompe à chaleur de puissance frigorifique supérieure à 2 kW, l'arrêté du 16 avril 2010 impose une vérification périodique de l'étanchéité et un entretien régulier. Pour les sites tertiaires et collectifs, le registre de maintenance doit être tenu à jour.",
        },
        {
          question: "Proposez-vous des contrats d'entretien pour la climatisation ?",
          answer:
            "Oui. Nos contrats annuels couvrent une visite d'entretien complète (nettoyage filtres et échangeurs, contrôle des pressions, vérification d'étanchéité, test des capteurs), la main d'œuvre et les petites fournitures. Options : inclure la prise en charge des pannes.",
        },
        {
          question: "Intervenez-vous en urgence si la climatisation tombe en panne en été ?",
          answer:
            "Oui, les pannes de climatisation en période de forte chaleur sont traitées en priorité. Décrivez la panne via notre formulaire et indiquez le niveau d'urgence. Selon la disponibilité et la zone, une intervention peut être organisée le jour même.",
        },
        {
          question: "Peut-on ajouter une unité à un système multi-split existant ?",
          answer:
            "Oui dans certains cas, selon la puissance du groupe extérieur existant et le nombre de départs disponibles. Un diagnostic préalable de l'installation est nécessaire avant toute extension.",
        },
      ]}
      depannageHref="/depannage?category=CLIMATISATION"
      devisHref="/devis?category=CLIMATISATION"
      heroPhoto="https://images.pexels.com/photos/27134985/pexels-photo-27134985.jpeg?auto=compress&cs=tinysrgb&w=1600" heroPhotoAlt="Unité de climatisation extérieure sur bâtiment"
    />
  );
}

