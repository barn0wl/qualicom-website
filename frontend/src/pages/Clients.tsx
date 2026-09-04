// src/pages/Clients.tsx
import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import Container from "@/components/common/Container";
import ClientCard from "@/components/clients/ClientCard";
import { getReferences, getPartners } from "@/data/clients";
import { CLIENT_CATEGORIES } from "@/types/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Clients = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const allReferences = useMemo(() => getReferences(), []);
  const allPartners = useMemo(() => getPartners(), []);

  // Filter references
  const filteredReferences = useMemo(() => {
    return allReferences.filter(client => {
      const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           client.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !selectedCategory || client.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [allReferences, searchTerm, selectedCategory]);

  // Filter partners (fournisseurs)
  const filteredPartners = useMemo(() => {
    return allPartners.filter(client => {
      const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           client.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !selectedCategory || client.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [allPartners, searchTerm, selectedCategory]);

  const totalResults = filteredReferences.length + filteredPartners.length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white border-b border-border py-16">
        <Container>
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">Nos Références</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Découvrez les entreprises et institutions qui nous font confiance,
              ainsi que les partenaires technologiques qui nous accompagnent.
            </p>
          </div>
        </Container>
      </section>

      {/* Search & Filter */}
      <section className="py-6 bg-white border-b border-border">
        <Container>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher un client ou fournisseur..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={!selectedCategory ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(null)}
              >
                Tous
              </Button>
              {CLIENT_CATEGORIES.map((cat) => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Results */}
      <section className="py-12">
        <Container>
          {/* Results count */}
          <div className="text-sm text-muted-foreground mb-6">
            {totalResults} résultat{totalResults > 1 ? "s" : ""} trouvé
            {totalResults > 1 ? "s" : ""}
          </div>

          {/* References Section - Clients with bullet lists */}
          {filteredReferences.length > 0 && (
            <div className="mb-12">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-foreground">Références</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Des entreprises et institutions avec lesquelles nous avons collaboré sur des projets concrets.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredReferences.map((client) => (
                  <ClientCard key={client.id} client={client} />
                ))}
              </div>
            </div>
          )}

          {/* Partners Section - Fournisseurs (no bullet lists) */}
          {filteredPartners.length > 0 && (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-foreground">Fournisseurs & Partenaires Technologiques</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Les fabricants et fournisseurs de solutions avec lesquels nous collaborons au quotidien.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredPartners.map((client) => (
                  <ClientCard key={client.id} client={client} />
                ))}
              </div>
            </div>
          )}

          {/* No results */}
          {totalResults === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              Aucun résultat trouvé.
            </div>
          )}
        </Container>
      </section>
    </div>
  );
};

export default Clients;
