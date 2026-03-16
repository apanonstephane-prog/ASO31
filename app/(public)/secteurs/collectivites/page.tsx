import type { Metadata } from "next";
import { CTASection } from "@/components/marketing/cta-section";
export const metadata: Metadata = { title: "Secteur — ASO31" };
export default function SectorPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-steel-950 text-white py-16">
        <div className="container-page">
          <h1 className="text-3xl font-bold text-white mb-3">Nos solutions pour votre profil</h1>
          <p className="text-steel-300 max-w-xl">Découvrez nos services adaptés à votre contexte.</p>
        </div>
      </div>
      <CTASection />
    </div>
  );
}
