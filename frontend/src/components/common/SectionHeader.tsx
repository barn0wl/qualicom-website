// src/components/common/SectionHeader.tsx
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import Reveal from "@/components/Reveal";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  tag?: string;
  className?: string;
  align?: "left" | "center" | "right";
  children?: ReactNode;
}

const SectionHeader = ({
  title,
  subtitle,
  tag,
  className,
  align = "center",
  children,
}: SectionHeaderProps) => {
  const alignClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  const subtitleAlignClasses = {
    left: "mx-0",
    center: "mx-auto",
    right: "ml-auto",
  };

  return (
    <Reveal className={cn("mb-16", alignClasses[align], className)}>
      {tag && (
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-accent text-accent-foreground text-xs font-medium uppercase tracking-wider">
          {tag}
        </div>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "text-lg text-muted-foreground max-w-2xl",
            subtitleAlignClasses[align]
          )}
        >
          {subtitle}
        </p>
      )}
      {children}
    </Reveal>
  );
};

export default SectionHeader;
