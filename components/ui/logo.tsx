import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "full" | "mark";
  className?: string;
  /** "dark" = logo on dark background (white oval), "light" = logo on light background (white oval) */
  theme?: "light" | "dark";
}

/**
 * ASO31 Logo — reproduction fidèle du logo A.S.O
 * Ovale noir + texte A.S.O + virgule rouge
 */
export function Logo({ variant = "full", className, theme = "light" }: LogoProps) {
  const fill = theme === "dark" ? "#111111" : "#ffffff";
  const stroke = theme === "dark" ? "#ffffff" : "#111111";
  const text = theme === "dark" ? "#ffffff" : "#111111";

  if (variant === "mark") {
    return (
      <svg
        viewBox="0 0 44 44"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("w-9 h-9", className)}
        aria-label="ASO31 logo"
      >
        <ellipse cx="22" cy="22" rx="19" ry="19" fill={fill} stroke={stroke} strokeWidth="2.5" />
        <text
          x="22"
          y="27"
          textAnchor="middle"
          fontFamily="Georgia, serif"
          fontWeight="bold"
          fontSize="11"
          fill={text}
          letterSpacing="1"
        >
          A.S.O
        </text>
        <path
          d="M 3 30 C 14 8 34 6 42 14"
          stroke="#CC0000"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 180 110"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-12 w-auto", className)}
      aria-label="ASO31 — Automatisme & Sécurité Occitanie"
    >
      {/* Red swoosh — derrière l'ovale */}
      <path
        d="M 8 85 C 55 25 120 18 175 32"
        stroke="#CC0000"
        strokeWidth="8"
        fill="none"
        strokeLinecap="round"
      />
      {/* Ovale — fond blanc pour masquer la virgule à l'intérieur */}
      <ellipse
        cx="88"
        cy="58"
        rx="76"
        ry="44"
        fill={fill}
        stroke={stroke}
        strokeWidth="4"
      />
      {/* Texte A.S.O */}
      <text
        x="88"
        y="68"
        textAnchor="middle"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontWeight="bold"
        fontSize="34"
        fill={text}
        letterSpacing="3"
      >
        A.S.O
      </text>
    </svg>
  );
}
