import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact — ASO31 Toulouse",
  description:
    "Contactez ASO31 pour un dépannage, un devis ou des informations. Toulouse et Haute-Garonne.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-surface-subtle">
      <div className="bg-steel-950 text-white py-12">
        <div className="container-page">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Nous contacter</h1>
          <p className="text-steel-300 max-w-xl">
            Notre équipe est disponible du lundi au vendredi de 8h à 18h. Pour les urgences contractuelles, une astreinte est disponible 24h/24.
          </p>
        </div>
      </div>

      <div className="container-page py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            {[
              {
                icon: Phone,
                title: "Téléphone",
                lines: [
                  { label: "Standard", value: COMPANY.phone, href: `tel:${COMPANY.phone.replace(/\s/g, "")}` },
                  { label: "Urgences", value: COMPANY.phoneUrgency, href: `tel:${COMPANY.phoneUrgency.replace(/\s/g, "")}` },
                ],
              },
              {
                icon: Mail,
                title: "Email",
                lines: [
                  { label: "Contact général", value: COMPANY.email, href: `mailto:${COMPANY.email}` },
                  { label: "SAV / Dépannage", value: COMPANY.emailSAV, href: `mailto:${COMPANY.emailSAV}` },
                ],
              },
              {
                icon: MapPin,
                title: "Adresse",
                lines: [
                  { label: "Siège", value: COMPANY.address },
                ],
              },
              {
                icon: Clock,
                title: "Horaires",
                lines: [
                  { label: "Lun – Ven", value: COMPANY.hours.weekdays },
                  { label: "Samedi", value: COMPANY.hours.saturday },
                  { label: "Urgences", value: COMPANY.hours.emergency },
                ],
              },
            ].map((item) => (
              <div key={item.title} className="bg-white border border-border rounded-xl p-5">
                <div className="flex items-center gap-2.5 mb-3">
                  <item.icon className="w-5 h-5 text-brand-600" />
                  <h3 className="font-semibold text-steel-900">{item.title}</h3>
                </div>
                <div className="space-y-1.5">
                  {item.lines.map((line) => (
                    <div key={line.label} className="flex items-center gap-3 text-sm">
                      <span className="text-steel-400 w-24">{line.label}</span>
                      {"href" in line && line.href ? (
                        <a href={line.href} className="text-brand-600 font-medium hover:text-brand-700">
                          {line.value}
                        </a>
                      ) : (
                        <span className="text-steel-700">{line.value}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white border border-border rounded-xl p-6">
            <h2 className="font-semibold text-steel-900 mb-4">Zone d&apos;intervention</h2>
            <p className="text-steel-500 text-sm leading-relaxed mb-4">
              Nous intervenons principalement sur Toulouse et l&apos;agglomération toulousaine (Haute-Garonne),
              couvrant notamment : Blagnac, Colomiers, Tournefeuille, Muret, Balma, Castanet, Ramonville,
              Labège, Saint-Orens, L&apos;Union et les communes alentours.
            </p>
            <p className="text-sm text-brand-600 font-medium">
              <a href="/zones-desservies">Voir toutes les zones →</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
