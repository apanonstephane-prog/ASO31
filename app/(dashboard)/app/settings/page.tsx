import { DashboardTopbar } from "@/components/layout/dashboard-topbar";

export default function SettingsPage() {
  return (
    <div className="flex-1 overflow-y-auto">
      <DashboardTopbar title="Paramètres" subtitle="Configuration de la plateforme" />

      <div className="p-6 space-y-4">
        {[
          { section: "Entreprise", fields: [{ label: "Nom de l'entreprise", value: "ASO31" }, { label: "Téléphone", value: "05 61 32 45 67" }, { label: "Email", value: "contact@aso31.fr" }] },
          { section: "IA & Qualification", fields: [{ label: "Modèle IA", value: "GPT-4o (mocké)" }, { label: "Seuil confiance minimal", value: "65%" }] },
          { section: "Notifications", fields: [{ label: "Alertes tickets critiques", value: "Activé" }, { label: "Rapport quotidien", value: "8h00" }] },
        ].map((group) => (
          <div key={group.section} className="bg-white border border-border rounded-xl p-5">
            <h3 className="font-semibold text-steel-900 text-sm mb-4">{group.section}</h3>
            <div className="space-y-3">
              {group.fields.map((field) => (
                <div key={field.label} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <span className="text-sm text-steel-600">{field.label}</span>
                  <span className="text-sm font-medium text-steel-900">{field.value}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
