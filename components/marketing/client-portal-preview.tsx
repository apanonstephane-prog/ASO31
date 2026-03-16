import Link from "next/link";
import {
  CheckCircle2,
  Clock,
  User,
  ArrowRight,
  FileText,
  AlertTriangle,
  MapPin,
} from "lucide-react";
import { PAGES } from "@/lib/constants";

const TIMELINE_EVENTS = [
  {
    time: "09:15",
    label: "Demande reçue",
    detail: "Via assistant IA — Porte automatique coulissante",
    done: true,
    active: false,
  },
  {
    time: "09:23",
    label: "Qualification IA",
    detail: "Service : Portes Auto — Urgence : Haute — Confiance : 87%",
    done: true,
    active: false,
  },
  {
    time: "09:31",
    label: "Validation opérateur",
    detail: "Ticket enrichi et confirmé (M. Dupont)",
    done: true,
    active: false,
  },
  {
    time: "10:45",
    label: "Technicien affecté",
    detail: "Sébastien R. — Spécialité : Portes automatiques",
    done: true,
    active: false,
  },
  {
    time: "12:15",
    label: "Intervention en cours",
    detail: "Sur site — Mise à jour en temps réel",
    done: false,
    active: true,
  },
  {
    time: "–",
    label: "Compte rendu",
    detail: "Attendu avant 16h00",
    done: false,
    active: false,
  },
];

export function ClientPortalPreview() {
  return (
    <section className="section-py bg-white border-b border-border">
      <div className="container-page">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: pitch */}
          <div>
            <p className="text-sm font-semibold text-brand-600 uppercase tracking-wide mb-2">
              Espace client
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-steel-950 mb-4">
              La transparence n&apos;est pas une promesse. C&apos;est une
              interface.
            </h2>
            <p className="text-lg text-steel-500 leading-relaxed mb-6">
              Votre espace client vous montre l&apos;état de chaque demande en
              temps réel. Qualification, technicien affecté, créneau, compte
              rendu — tout est visible, sans avoir besoin d&apos;appeler.
            </p>

            <ul className="space-y-3 mb-8">
              {[
                "Suivi ticket en temps réel — statut, technicien, créneau",
                "Historique équipement consultable à tout moment",
                "Comptes rendus d'intervention accessibles en ligne",
                "Multi-sites pour syndics et gestionnaires",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm text-steel-600"
                >
                  <CheckCircle2 className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>

            <Link
              href={PAGES.auth.login}
              className="inline-flex items-center gap-2 border border-steel-200 text-steel-700 hover:bg-steel-50 font-medium px-5 py-3 rounded-xl transition-colors text-sm"
            >
              Accéder à l&apos;espace client
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Right: mock portal */}
          <div>
            <div className="bg-white border border-steel-200 rounded-2xl overflow-hidden shadow-elevated">
              {/* App header */}
              <div className="bg-steel-950 px-5 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-steel-700" />
                    <div className="w-2.5 h-2.5 rounded-full bg-steel-700" />
                    <div className="w-2.5 h-2.5 rounded-full bg-steel-700" />
                  </div>
                  <span className="text-xs text-steel-400 font-medium">
                    Espace client — ASO31
                  </span>
                </div>
                <span className="flex items-center gap-1.5 text-xs text-green-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  En cours
                </span>
              </div>

              <div className="p-5 space-y-4">
                {/* Ticket header */}
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-steel-400 font-mono mb-0.5">
                      Ticket #2024-1847
                    </p>
                    <p className="text-base font-semibold text-steel-900">
                      Porte automatique coulissante
                    </p>
                    <p className="text-xs text-steel-500 mt-0.5">
                      SCI Immo Toulouse 3 — 7 rue de Cugnaux, 31270
                    </p>
                  </div>
                  <span className="text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-1 rounded-full shrink-0">
                    Urgente
                  </span>
                </div>

                {/* Technicien card */}
                <div className="flex items-center gap-3 p-3 bg-steel-50 rounded-xl border border-steel-100">
                  <div className="w-10 h-10 rounded-full bg-steel-200 flex items-center justify-center shrink-0">
                    <User className="w-5 h-5 text-steel-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-steel-900">
                      Sébastien R.
                    </p>
                    <p className="text-xs text-steel-500">
                      Portes automatiques · Toulouse Nord
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-brand-500" />
                    <span className="text-xs text-brand-600 font-medium">
                      Sur site
                    </span>
                  </div>
                </div>

                {/* Timeline */}
                <div>
                  <p className="text-xs font-semibold text-steel-500 uppercase tracking-wide mb-3">
                    Fil de suivi
                  </p>
                  <div className="space-y-2.5">
                    {TIMELINE_EVENTS.map((event, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <div className="flex flex-col items-center shrink-0">
                          <div
                            className={`w-4 h-4 rounded-full flex items-center justify-center mt-0.5 ${
                              event.active
                                ? "bg-brand-600 animate-pulse"
                                : event.done
                                  ? "bg-green-500"
                                  : "bg-steel-100 border border-steel-200"
                            }`}
                          >
                            {event.done && !event.active && (
                              <svg
                                className="w-2.5 h-2.5 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={3}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            )}
                          </div>
                          {i < TIMELINE_EVENTS.length - 1 && (
                            <div
                              className={`w-px flex-1 mt-1 mb-0 min-h-3 ${
                                event.done ? "bg-green-200" : "bg-steel-100"
                              }`}
                            />
                          )}
                        </div>
                        <div className="flex-1 min-w-0 pb-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xs text-steel-400 font-mono">
                              {event.time}
                            </span>
                            <span
                              className={`text-xs font-medium ${
                                event.active
                                  ? "text-steel-900"
                                  : event.done
                                    ? "text-steel-700"
                                    : "text-steel-400"
                              }`}
                            >
                              {event.label}
                            </span>
                          </div>
                          <p className="text-xs text-steel-400 mt-0.5 leading-tight">
                            {event.detail}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Next step banner */}
                <div className="flex items-start gap-2.5 p-3 bg-amber-50 border border-amber-100 rounded-xl">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-medium text-amber-800">
                      Prochaine étape
                    </p>
                    <p className="text-xs text-amber-700 mt-0.5">
                      Compte rendu d&apos;intervention attendu avant 16h00.
                      Notification par e-mail à la clôture.
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Link
                    href={PAGES.auth.login}
                    className="flex-1 flex items-center justify-center gap-1.5 border border-steel-200 text-steel-700 hover:bg-steel-50 text-xs font-medium py-2.5 rounded-xl transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    Voir le dossier complet
                  </Link>
                  <a
                    href="tel:0562132030"
                    className="flex-1 flex items-center justify-center gap-1.5 border border-steel-200 text-steel-700 hover:bg-steel-50 text-xs font-medium py-2.5 rounded-xl transition-colors"
                  >
                    <Clock className="w-3.5 h-3.5" />
                    Contacter l&apos;équipe
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
