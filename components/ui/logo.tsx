import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "full" | "mark";
  className?: string;
  /** "dark" = logo sur fond sombre (filtre inversion), "light" = logo sur fond clair */
  theme?: "light" | "dark";
}

export function Logo({ variant = "full", className, theme = "light" }: LogoProps) {
  if (variant === "mark") {
    return (
      <Image
        src="/images/logo/logo-aso31.png"
        alt="ASO31"
        width={40}
        height={40}
        className={cn(
          "object-contain w-10 h-10",
          theme === "dark" && "brightness-0 invert",
          className
        )}
      />
    );
  }

  return (
    <Image
      src="/images/logo/logo-aso31.png"
      alt="ASO31 — Automatisme & Sécurité Occitanie"
      width={180}
      height={52}
      className={cn(
        "object-contain h-10 w-auto",
        theme === "dark" && "brightness-0 invert",
        className
      )}
    />
  );
}
