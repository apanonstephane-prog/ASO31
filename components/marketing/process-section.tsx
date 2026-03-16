const STEPS = [
  {
    step: "01",
    title: "Vous décrivez la situation",
    description:
      "Via notre formulaire, l'assistant IA ou par téléphone. Vous pouvez envoyer des photos directement pour aider à préparer l'intervention.",
  },
  {
    step: "02",
    title: "On qualifie votre demande",
    description:
      "Notre système analyse les symptômes et les informations fournies. Un opérateur valide et affecte la demande au bon technicien selon la spécialité et la zone.",
  },
  {
    step: "03",
    title: "L'intervention est planifiée",
    description:
      "Vous êtes informé du créneau prévu. Le technicien dispose de l'historique de l'équipement et du contexte avant même d'arriver sur site.",
  },
  {
    step: "04",
    title: "Compte rendu et clôture",
    description:
      "À l'issue de l'intervention, vous recevez un compte rendu détaillé. Si une pièce est nécessaire, une seconde intervention est automatiquement programmée.",
  },
];

export function ProcessSection() {
  return (
    <section className="section-py bg-white">
      <div className="container-page">
        <div className="mb-12">
          <p className="text-sm font-semibold text-brand-600 uppercase tracking-wide mb-2">
            Comment ça fonctionne
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-steel-950 mb-4">
            De la demande à la résolution
          </h2>
          <p className="text-lg text-steel-500 max-w-2xl">
            Un processus structuré pour que chaque intervention soit préparée, traçable et clôturée
            dans les règles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step, i) => (
            <div key={step.step} className="relative">
              {/* Connector line */}
              {i < STEPS.length - 1 && (
                <div className="hidden lg:block absolute top-5 left-[calc(50%+20px)] right-[-50%] h-px bg-border" />
              )}

              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-700 text-white flex items-center justify-center text-sm font-bold shrink-0">
                    {step.step}
                  </div>
                </div>
                <h3 className="font-semibold text-steel-900">{step.title}</h3>
                <p className="text-sm text-steel-500 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
