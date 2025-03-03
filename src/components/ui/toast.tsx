import * as ToastPrimitives from "@radix-ui/react-toast";
import { cva, type VariantProps } from "class-variance-authority";
import { X, CheckCircle, XCircle } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils"; // Ensure this utility exists

const ToastProvider = ToastPrimitives.Provider;
const ToastViewport = ToastPrimitives.Viewport;

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full max-w-xs sm:max-w-sm md:max-w-md items-center justify-between space-x-4 overflow-hidden rounded-lg border p-4 pr-8 shadow-lg transition-all",
  {
    variants: {
      variant: {
        default: "border bg-green-500 text-white", // Success toast
        destructive: "border bg-red-500 text-white", // Error toast
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface ToastProps
  extends React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root>,
    VariantProps<typeof toastVariants> {
  title?: string;
  description?: string;
  onDismiss?: () => void;
}

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  ToastProps
>(({ className, variant, title, description, onDismiss, ...props }, ref) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
      className="fixed bottom-5 right-5 z-50"
    >
      <ToastPrimitives.Root
        ref={ref}
        className={cn(toastVariants({ variant }), className)}
        {...props}
      >
        <div className="flex items-center gap-3">
          {/* Icons based on variant */}
          {variant === "default" ? (
            <CheckCircle className="h-5 w-5 text-white" />
          ) : (
            <XCircle className="h-5 w-5 text-white" />
          )}
          <div>
            {title && <h3 className="font-semibold text-white">{title}</h3>}
            {description && (
              <p className="text-sm text-gray-200">{description}</p>
            )}
          </div>
        </div>
        {/* Dismiss button */}
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="absolute top-2 right-2 p-1 rounded-full hover:bg-white/20 transition-colors"
          >
            <X className="h-4 w-4 text-white" />
          </button>
        )}
      </ToastPrimitives.Root>
    </motion.div>
  );
});

Toast.displayName = "Toast";

export { ToastProvider, ToastViewport, Toast };
