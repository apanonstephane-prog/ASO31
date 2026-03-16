import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "https://aso31.fr"),
  title: {
    default: `${COMPANY.name} — Automatisme, Sécurité & Maintenance à Toulouse`,
    template: `%s | ${COMPANY.name}`,
  },
  description:
    "Spécialiste en automatismes, alarmes, portes automatiques, climatisation et maintenance technique sur Toulouse et l'Occitanie. Devis gratuit, dépannage rapide, contrats d'entretien.",
  keywords: [
    "automatisme portail",
    "alarme intrusion",
    "porte automatique",
    "climatisation",
    "dépannage Toulouse",
    "maintenance technique",
    "sécurité électronique",
    "ASO31",
    "Haute-Garonne",
  ],
  authors: [{ name: COMPANY.name, url: "https://aso31.fr" }],
  creator: COMPANY.name,
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://aso31.fr",
    siteName: COMPANY.name,
    title: `${COMPANY.name} — Expertise technique, réactivité terrain`,
    description:
      "Automatismes, sécurité, portes automatiques, climatisation et maintenance sur Toulouse et agglomération.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f2840" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body>
        {children}
        <Toaster
          richColors
          position="top-right"
          toastOptions={{
            style: { fontFamily: "Inter, system-ui, sans-serif" },
          }}
        />
      </body>
    </html>
  );
}
