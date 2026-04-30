import { cn } from "@/lib/utils";
import { default as motion } from "motion/react";
import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "neon";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", asChild = false, ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-full font-medium transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-fuchsia-600 text-white hover:bg-fuchsia-500 shadow-[0_0_15px_rgba(192,38,211,0.5)] hover:shadow-[0_0_25px_rgba(192,38,211,0.7)]": variant === "primary",
            "bg-cyan-500 text-zinc-950 hover:bg-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.5)] hover:shadow-[0_0_25px_rgba(6,182,212,0.7)]": variant === "secondary",
            "bg-transparent border-2 border-white/20 text-white hover:bg-white/10 hover:border-white/40": variant === "outline",
            "bg-transparent text-white/70 hover:text-white hover:bg-white/10": variant === "ghost",
            "bg-zinc-950 text-fuchsia-400 border border-fuchsia-500/50 hover:bg-fuchsia-950/30 hover:border-fuchsia-400 shadow-[0_0_10px_rgba(192,38,211,0.2)] inset-shadow-sm inset-shadow-fuchsia-500/20": variant === "neon",
            "h-9 px-4 text-sm": size === "sm",
            "h-11 px-6 text-base": size === "md",
            "h-14 px-8 text-lg": size === "lg",
          },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
