import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm hover:shadow-md",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm",
        outline: "border border-border bg-transparent text-foreground hover:bg-muted/50 hover:border-border/80",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-sm",
        ghost: "text-foreground hover:bg-muted/50 hover:text-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        hero: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl text-base px-8 py-6 rounded-xl font-bold",
        heroOutline: "border-2 border-white/30 bg-white/10 text-white hover:bg-white/20 hover:border-white/50 text-base px-8 py-6 rounded-xl font-bold backdrop-blur-sm",
        cream: "bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold shadow-sm",
        finease: "bg-primary text-white text-center font-bold text-base leading-6 rounded-xl px-6 py-3 shadow-[0_4px_14px_hsl(168_72%_40%/0.25)] hover:shadow-[0_6px_20px_hsl(168_72%_40%/0.35)] hover:-translate-y-0.5 transition-all",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-9 rounded-lg px-4 text-xs",
        lg: "h-12 rounded-xl px-8 text-base",
        xl: "h-14 rounded-xl px-10 text-lg",
        icon: "h-10 w-10",
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