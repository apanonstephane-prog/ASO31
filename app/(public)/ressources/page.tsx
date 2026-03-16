import type { Metadata } from "next";
export const metadata: Metadata = { title: "Ressources & Guides — ASO31" };
export default function RessourcesPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-steel-950 text-white py-16">
        <div className="container-page">
          <h1 className="text-3xl font-bold text-white mb-3">Ressources & Guides</h1>
          <p className="text-steel-300">Articles, conseils et guides de maintenance.</p>
        </div>
      </div>
      <div className="container-page py-16 text-center text-steel-500">
        Section en cours de publication.
      </div>
    </div>
  );
}
