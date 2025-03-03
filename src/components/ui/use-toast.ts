import { useState, useRef, useCallback, useEffect } from "react";

// Toast Notification Type
interface Toast {
  id: string;
  title: string;
  description: string;
  variant: "default" | "destructive";
}

export const useToast = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const timers = useRef<Record<string, NodeJS.Timeout | undefined>>({}); // ✅ Explicitly typed

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
    if (timers.current[id]) {
      clearTimeout(timers.current[id]);
      delete timers.current[id];
    }
  }, []);

  const toast = useCallback(
    ({ title, description, variant = "default" }: Omit<Toast, "id">) => {
      const id = Date.now().toString();
      setToasts((prev) => [...prev, { id, title, description, variant }]);

      // Auto-dismiss after 3 seconds
      timers.current[id] = setTimeout(() => dismissToast(id), 3000);
    },
    [dismissToast]
  );

  // Cleanup all timers when component unmounts
  useEffect(() => {
    const timerValues = Object.values(timers.current); // Get all timeout IDs
  
    return () => {
      timerValues.forEach((timer) => {
        if (timer) clearTimeout(timer);
      });
    };
  }, []);

  return { toasts, toast, dismissToast };
};
