import { cn } from "@/lib/utils";

import logoFull from "@/assets/brand/tacktech-logo.png.asset.json";
import logoReverse from "@/assets/brand/tacktech-logo-reverse.png.asset.json";
import iconFull from "@/assets/brand/tacktech-icon.png.asset.json";
import iconReverse from "@/assets/brand/tacktech-icon-reverse.png.asset.json";

export type LogoVariant = "full" | "full-reverse" | "icon" | "icon-reverse";

const sources: Record<LogoVariant, { url: string }> = {
  full: logoFull,
  "full-reverse": logoReverse,
  icon: iconFull,
  "icon-reverse": iconReverse,
};

type LogoProps = {
  variant?: LogoVariant;
  className?: string;
};

/**
 * TackTech logo. The artwork is never recoloured, distorted or cropped —
 * pick the variant that matches the background you are placing it on.
 */
export function Logo({ variant = "full", className }: LogoProps) {
  return (
    <img
      src={sources[variant].url}
      alt="TackTech: Technology with Purpose."
      className={cn("h-10 w-auto", className)}
    />
  );
}
