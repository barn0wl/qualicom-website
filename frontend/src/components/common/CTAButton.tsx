// src/components/common/CTAButton.tsx
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { motion } from "framer-motion";

interface CTAButtonProps {
  to: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  className?: string;
  showArrow?: boolean;
  external?: boolean;
}

const CTAButton = ({
  to,
  children,
  variant = "primary",
  className,
  showArrow = true,
  external = false,
}: CTAButtonProps) => {
  const variantClasses = {
    primary:
      "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
    secondary:
      "bg-background/60 backdrop-blur-md text-foreground border border-border hover:border-primary/50 hover:bg-background",
    outline:
      "bg-white text-primary-600 hover:bg-primary-50 border-2 border-white",
    ghost:
      "bg-transparent text-white border-2 border-white hover:bg-white/10",
  };

  const buttonContent = (
    <>
      {children}
      {showArrow && (
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      )}
    </>
  );

  const buttonClasses = cn(
    "group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-base font-medium transition-colors",
    variantClasses[variant],
    className
  );

  if (external) {
    return (
      <motion.a
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
        href={to}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClasses}
      >
        {buttonContent}
      </motion.a>
    );
  }

  return (
    <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
      <Link to={to} className={buttonClasses}>
        {buttonContent}
      </Link>
    </motion.div>
  );
};

export default CTAButton;
