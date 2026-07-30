import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "text-button inline-flex items-center justify-center gap-2 rounded-sm transition-all duration-300 ease-out disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-gold text-bg-dark hover:bg-white px-8 py-4 shadow-[0_12px_30px_rgba(199,166,106,0.12)]",
        outline:
          "border border-gold/60 text-gold hover:bg-gold hover:text-bg-dark px-8 py-4",
        gold: "bg-gold text-white hover:opacity-90 px-8 py-4",
        ghost: "text-text hover:text-gold px-2 py-2",
        dark: "bg-bg-dark text-white hover:bg-black px-8 py-4",
      },
      size: {
        sm: "text-xs px-5 py-3",
        md: "text-sm px-8 py-4",
        lg: "text-sm px-10 py-5",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
