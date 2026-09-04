// src/components/common/PhoneLink.tsx
import { Phone } from "lucide-react";
import { COMPANY } from "@/config/company";
import { phoneLink } from "@/utils/links";
import { cn } from "@/lib/utils";

interface PhoneLinkProps {
  className?: string;
  showIcon?: boolean;
  iconClassName?: string;
  variant?: "inline" | "button" | "footer";
  children?: React.ReactNode;
}

const PhoneLink = ({
  className,
  showIcon = true,
  iconClassName,
  variant = "inline",
  children,
}: PhoneLinkProps) => {
  const variantClasses = {
    inline: "text-foreground hover:text-primary transition-colors",
    button:
      "inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors",
    footer: "flex items-center text-gray-400 hover:text-white transition-colors",
  };

  return (
    <a
      href={phoneLink()}
      className={cn(variantClasses[variant], className)}
      aria-label="Appeler"
    >
      {showIcon && <Phone className={cn("h-4 w-4", iconClassName)} />}
      {children || COMPANY.phone}
    </a>
  );
};

export default PhoneLink;
