import type { Metadata } from "next";
import { Settings2 } from "lucide-react";
import { ServicePageTemplate } from "@/components/marketing/service-page-template";

export const metadata: Metadata = {
  title: "Automatismes Portail & Barrière Toulouse — Dépannage et Installation",
  description:
    "Installation, dépannage et entretien de portails motorisés, barrières levantes et automatismes toutes marques sur Toulouse et agglomération.",
};

export default function AutomatismesPage() {
  return (
    <ServicePageTemplate
      icon={Settings2}
      category="Automatismes"
      headline="Portails motorisés et barrières levantes"
      subheadline="Installation, dépannage et entretien de portails coulissants, battants, barrières levantes et automatismes industriels. Intervention rapide, toutes marques."
      description="L'automatisme de portail ou de barrière est un équipement sollicité plusieurs fois par jour. Quand il tombe en panne, les conséquences sont immédiates : accès bloqué, site ouvert, flux logistique interrompu. Nos techniciens spécialisés interviennent sur portails coulissants, battants simples et doubles battants, barrières levantes, bras articulés et colonnes de commande. Nous traitons les marques Somfy, Nice, FAAC, Came, BFT, Roger Technology et la majorité des équipements du marché."
      scope={[
        "Portail coulissant motorisé",
        "Portail battant simple et double vantail",
        "Barrière levante (parking, accès contrôlé)",
        "Bras articulé",
        "Motoréducteur enterré",
        "Colonne de commande et télécommande",
        "Cellule photoélectrique de sécurité",
        "Boucle magnétique de détection",
        "Interphonie liée à l'automatisme",
      ]}
      benefits={[
        {
          title: "Diagnostic photo possible",
          description:
            "Envoyez une photo ou une vidéo de la panne via l'assistant IA ou le formulaire. Notre équipe peut souvent préqualifier la cause et envoyer le technicien avec la pièce probable.",
        },
        {
          title: "Réparation avant remplacement",
          description:
            "Nous réparons quand c'est possible. Un fin de course, un récepteur radio ou une carte défaillante ne justifient pas le remplacement de tout le motoréducteur.",
        },
        {
          title: "Conformité et sécurité",
          description:
            "Chaque installation ou réhabilitation respecte les normes EN 13241 et EN 12453 relatives aux équipements motorisés. Contrôle des dispositifs anti-écrasement inclus.",
        },
        {
          title: "Sécurisation temporaire",
          description:
            "En cas de panne avec portail ouvert ou bloqué en position non sécurisée, nous intervenons en priorité pour sécuriser le site, même si la réparation définitive nécessite une pièce.",
        },
        {
          title: "Contrat d'entretien annuel",
          description:
            "Lubrification, contrôle des fins de course, test des cellules, vérification de la boucle magnétique et des arrêts d'urgence. Un entretien annuel multiplie la durée de vie de l'équipement.",
        },
        {
          title: "Intervention le jour même si disponible",
          description:
            "Selon la charge de planning et la zone géographique, nous pouvons intervenir en urgence le jour même pour les situations bloquantes.",
        },
      ]}
      faqs={[
        {
          question: "Mon portail s'ouvre mais ne se ferme plus — que faire ?",
          answer:
            "Ce comportement oriente souvent vers une cellule photoélectrique obstruée ou désalignée : vérifiez si un objet est posé entre les deux capteurs. Si les cellules sont dégagées, le problème peut venir du fin de course de fermeture ou d'un défaut de programmation. Un technicien peut confirmer le diagnostic à distance si vous pouvez envoyer une vidéo.",
        },
        {
          question: "La télécommande ne fonctionne plus — est-ce grave ?",
          answer:
            "Commencez par changer la pile. Si le problème persiste, essayez une autre télécommande si vous en avez une. Si aucune télécommande ne fonctionne, le récepteur radio ou le module de commande peut être en cause — une intervention est nécessaire. Si une seule télécommande ne fonctionne pas, elle doit simplement être re-mémorisée.",
        },
        {
          question: "Intervenez-vous sur des marques que vous n'avez pas installées ?",
          answer:
            "Oui. Nous intervenons sur les marques les plus répandues : Somfy, Nice, Came, FAAC, BFT, Roger Technology. Pour les marques plus exotiques ou les équipements très anciens, un diagnostic préalable peut être nécessaire.",
        },
        {
          question: "Combien coûte l'entretien annuel d'un portail ?",
          answer:
            "Le coût dépend du type d'automatisme (coulissant, battant, barrière) et du nombre d'équipements. Un entretien annuel standard se situe entre 80€ et 180€ HT pour un portail simple. Nous établissons un devis précis sur demande.",
        },
        {
          question: "Faut-il remplacer tout le moteur ou peut-on réparer ?",
          answer:
            "Dans la majorité des cas, on peut réparer sans remplacer l'ensemble. Les pannes courantes (carte électronique, récepteur radio, condensateur, fin de course) se réparent avec une pièce à moins de 100€ HT. Si le motoréducteur est hors d'âge ou trop endommagé, nous vous proposons un devis de remplacement comparatif.",
        },
      ]}
      depannageHref="/depannage?category=AUTOMATION"
      devisHref="/devis?category=AUTOMATION"
    />
  );
}
