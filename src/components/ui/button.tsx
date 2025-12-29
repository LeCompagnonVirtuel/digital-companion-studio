import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold ring-offset-background transition-all duration-300 ease-out-expo focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-sm hover:shadow-glow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-border bg-background hover:bg-secondary hover:border-primary/30 hover:shadow-sm",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-secondary hover:text-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        // Premium Hero Variants
        hero: "bg-primary text-primary-foreground shadow-lg hover:shadow-premium hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-700",
        heroOutline: "border-2 border-primary/20 bg-card/50 backdrop-blur-sm text-foreground hover:border-primary/40 hover:bg-card hover:shadow-card",
        heroGhost: "text-foreground hover:text-primary hover:bg-primary/5",
        // Premium Accent Variants
        accent: "bg-accent text-accent-foreground shadow-sm hover:shadow-glow-accent hover:bg-accent/90",
        accentOutline: "border-2 border-accent/20 text-accent hover:border-accent/40 hover:bg-accent/5",
        // Glass Variant
        glass: "bg-card/60 backdrop-blur-xl border border-border/50 text-foreground hover:bg-card/80 hover:border-primary/30 hover:shadow-card",
        glassDark: "bg-foreground/80 backdrop-blur-xl border border-white/10 text-background hover:bg-foreground/90",
        // Gold Premium
        gold: "bg-gradient-to-r from-gold to-amber-500 text-gold-foreground shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]",
      },
      size: {
        default: "h-11 px-6 py-2.5",
        sm: "h-9 rounded-lg px-4 text-xs",
        lg: "h-12 rounded-xl px-8 text-base",
        xl: "h-14 rounded-2xl px-10 text-base font-bold tracking-tight",
        "2xl": "h-16 rounded-2xl px-12 text-lg font-bold tracking-tight",
        icon: "h-11 w-11",
        "icon-sm": "h-9 w-9",
        "icon-lg": "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };