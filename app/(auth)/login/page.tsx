import type { Metadata } from "next";
import Link from "next/link";
import { LogIn } from "lucide-react";

export const metadata: Metadata = {
  title: "Connexion — ASO31",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-surface-subtle flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <div className="w-9 h-9 bg-brand-700 rounded-xl flex items-center justify-center">
              <span className="text-white text-sm font-bold">A31</span>
            </div>
            <span className="font-bold text-steel-900 text-xl">
              ASO<span className="text-brand-600">31</span>
            </span>
          </Link>
          <p className="text-steel-500 text-sm mt-2">Accédez à votre espace</p>
        </div>

        {/* Form */}
        <div className="bg-white border border-border rounded-2xl p-6 shadow-soft">
          <h1 className="text-lg font-bold text-steel-900 mb-5 text-center">Connexion</h1>

          <form className="space-y-4" action="/app" method="get">
            <div>
              <label className="block text-sm font-medium text-steel-700 mb-1.5" htmlFor="email">
                Adresse email
              </label>
              <input
                id="email"
                type="email"
                placeholder="votre@email.fr"
                className="w-full h-10 px-3 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                defaultValue="admin@aso31.fr"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-medium text-steel-700" htmlFor="password">
                  Mot de passe
                </label>
                <a href="#" className="text-xs text-brand-600 hover:text-brand-700">
                  Mot de passe oublié ?
                </a>
              </div>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className="w-full h-10 px-3 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                defaultValue="demo1234"
              />
            </div>

            <button
              type="submit"
              className="w-full h-10 bg-brand-600 text-white rounded-lg text-sm font-medium hover:bg-brand-700 transition-colors flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              Se connecter
            </button>
          </form>

          {/* Demo accounts */}
          <div className="mt-5 pt-5 border-t border-border">
            <p className="text-xs font-semibold text-steel-400 uppercase tracking-wide mb-3">
              Comptes de démonstration
            </p>
            <div className="space-y-2 text-xs text-steel-500">
              {[
                { role: "Admin", email: "admin@aso31.fr" },
                { role: "Opérateur", email: "operateur@aso31.fr" },
                { role: "Technicien", email: "technicien@aso31.fr" },
                { role: "Client", email: "client@demo.fr" },
              ].map((account) => (
                <div key={account.email} className="flex justify-between">
                  <span className="font-medium text-steel-600">{account.role}</span>
                  <span className="font-mono">{account.email}</span>
                </div>
              ))}
              <p className="text-steel-400 mt-2">Mot de passe : <code className="font-mono bg-surface-subtle px-1 rounded">demo1234</code></p>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-steel-400 mt-4">
          <Link href="/" className="hover:text-steel-600 transition-colors">
            ← Retour au site
          </Link>
        </p>
      </div>
    </div>
  );
}
