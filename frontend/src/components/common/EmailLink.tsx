// src/components/common/EmailLink.tsx
import { Mail } from "lucide-react";
import { COMPANY } from "@/config/company";
import { mailLink } from "@/utils/links";
import { cn } from "@/lib/utils";

interface EmailLinkProps {
  className?: string;
  showIcon?: boolean;
  iconClassName?: string;
  variant?: "inline" | "footer";
  children?: React.ReactNode;
}

const EmailLink = ({
  className,
  showIcon = true,
  iconClassName,
  variant = "inline",
  children,
}: EmailLinkProps) => {
  const variantClasses = {
    inline: "text-foreground hover:text-primary transition-colors",
    footer: "flex items-center text-gray-400 hover:text-white transition-colors",
  };

  return (
    <a
      href={mailLink()}
      className={cn(variantClasses[variant], className)}
      aria-label="Envoyer un email"
    >
      {showIcon && <Mail className={cn("h-4 w-4", iconClassName)} />}
      {children || COMPANY.email}
    </a>
  );
};

export default EmailLink;
