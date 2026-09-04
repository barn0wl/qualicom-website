// src/components/FloatingContact.tsx
import { useState } from "react";
import { Phone, MessageCircle, Plus, X } from "lucide-react";
import { COMPANY } from "@/config/company";
import { phoneLink, whatsappLink } from "@/utils/links";

const FloatingContact = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
      <div
        className={`flex flex-col items-end gap-3 transition-all duration-300 ${
          open
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-2 pointer-events-none"
        }`}
      >
        <a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
          className="flex items-center gap-2 rounded-full bg-background/95 backdrop-blur border border-border shadow-lg px-4 py-2.5 text-sm font-medium text-foreground"
        >
          <MessageCircle className="h-4 w-4 text-primary" />
          WhatsApp
        </a>
        <a
          href={phoneLink()}
          aria-label="Appeler"
          className="flex items-center gap-2 rounded-full bg-background/95 backdrop-blur border border-border shadow-lg px-4 py-2.5 text-sm font-medium text-foreground"
        >
          <Phone className="h-4 w-4 text-primary" />
          Appeler
        </a>
      </div>

      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? "Fermer" : "Nous contacter"}
        className="h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-xl ring-4 ring-primary/15 flex items-center justify-center transition-transform active:scale-95"
      >
        {open ? <X className="h-6 w-6" /> : <Plus className="h-6 w-6" />}
      </button>
    </div>
  );
};

export default FloatingContact;
