// src/components/clients/ClientCard.tsx
import { useState } from "react";
import { MapPin, ChevronDown, ChevronUp, Building2 } from "lucide-react";
import { Client } from "@/types/client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ClientCardProps {
  client: Client;
  className?: string;
}

const ClientCard = ({ client, className }: ClientCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const hasReferences = client.references && client.references.length > 0;
  const totalItems = client.references?.reduce((acc, ref) => acc + (ref.items?.length || 0), 0) || 0;
  // Determine if we should show the expand button
  const showExpandButton = hasReferences && totalItems > 3;

  // Check if logo exists and is not empty
  const hasLogo = client.logo && client.logo.trim() !== "";

  return (
    <Card className={cn(
      "overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full",
      className
    )}>
      {/* Logo */}
      <div className="relative h-40 bg-gray-50 flex items-center justify-center p-6 border-b">
        {hasLogo ? (
          <img
            src={client.logo}
            alt={client.name}
            className="max-h-full max-w-full object-contain"
            loading="lazy"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-muted-foreground">
            <Building2 className="h-16 w-16 opacity-30" />
          </div>
        )}
      </div>
      {/* Content */}
      <CardHeader>
        <CardTitle className="text-xl">{client.name}</CardTitle>
        {client.location && (
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-1" />
            {client.location}
          </div>
        )}
        {/* Only show category tag if it has a value */}
        {client.category && (
          <div className="mt-1">
            <span className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded-full">
              {client.category}
            </span>
          </div>
        )}
      </CardHeader>
      <CardContent className="flex-grow flex flex-col">
        {/* Description */}
        <p className="text-sm text-muted-foreground mb-4">
          {client.description}
        </p>
        {/* References (bullet list) */}
        {hasReferences && (
          <div className="mt-2">
            <h4 className="text-sm font-semibold text-foreground mb-2">
              Réalisations :
            </h4>
            <ul className="space-y-2">
              {(expanded ? client.references : client.references?.slice(0, 2)).map((ref) => (
                <li key={ref.id}>
                  <p className="text-sm font-medium text-foreground">{ref.title}</p>
                  {ref.items && ref.items.length > 0 && (
                    <ul className="ml-4 mt-1 space-y-1">
                      {(expanded ? ref.items : ref.items.slice(0, 2)).map((item, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground list-disc">
                          {item}
                        </li>
                      ))}
                      {!expanded && ref.items.length > 2 && (
                        <li className="text-sm text-muted-foreground list-disc">
                          +{ref.items.length - 2} autre{ref.items.length - 2 > 1 ? "s" : ""}
                        </li>
                      )}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
            {showExpandButton && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setExpanded(!expanded)}
                className="mt-3"
              >
                {expanded ? (
                  <>
                    <ChevronUp className="h-4 w-4 mr-1" />
                    Voir moins
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-4 w-4 mr-1" />
                    Voir plus ({totalItems} réalisations)
                  </>
                )}
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ClientCard;
