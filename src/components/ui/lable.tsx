"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

// Define label variants for size and color customization
const labelVariants = cva(
  "font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 transition-colors",
  {
    variants: {
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
      color: {
        default: "text-gray-300",
        primary: "text-[#009970] focus-within:text-[#00b894]", // Darker green for better contrast
        error: "text-red-500",
      },
    },
    defaultVariants: {
      size: "md",
      color: "default",
    },
  }
);

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & VariantProps<typeof labelVariants>
>(({ className, size, color, ...props }, ref) => (
  <LabelPrimitive.Root ref={ref} className={cn(labelVariants({ size, color }), className)} {...props} />
));

Label.displayName = "Label";

export { Label };
