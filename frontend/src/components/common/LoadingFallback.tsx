// src/components/common/LoadingFallback.tsx
import { cn } from "@/lib/utils";

interface LoadingFallbackProps {
  className?: string;
  message?: string;
}

const LoadingFallback = ({ className, message = "Chargement..." }: LoadingFallbackProps) => {
  return (
    <div className={cn("min-h-screen flex items-center justify-center", className)}>
      <div className="text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        <p className="mt-4 text-muted-foreground">{message}</p>
      </div>
    </div>
  );
};

export default LoadingFallback;
