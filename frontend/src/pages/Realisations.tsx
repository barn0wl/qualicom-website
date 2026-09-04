// src/pages/Realisations.tsx
import { useState, useMemo, lazy, Suspense } from "react";
import { Image as ImageIcon } from "lucide-react";
import Container from "@/components/common/Container";
import GalleryFilter from "@/components/gallery/GalleryFilter";
import { getGalleryImages } from "@/data/gallery";

const GalleryGrid = lazy(() => import("@/components/gallery/GalleryGrid"));

const Realisations = () => {
  const [galleryCategory, setGalleryCategory] = useState<string | null>(null);
  const allGalleryImages = useMemo(() => getGalleryImages(), []);

  const filteredGallery = useMemo(() => {
    if (!galleryCategory) return allGalleryImages;
    return allGalleryImages.filter(img => img.category === galleryCategory);
  }, [allGalleryImages, galleryCategory]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white border-b border-border py-16">
        <Container>
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4 flex items-center justify-center gap-3">
              <ImageIcon className="h-8 w-8 text-primary" />
              Nos Réalisations
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Un aperçu de nos projets et chantiers en images à travers la Côte d'Ivoire, le Mali et le Burkina Faso.
            </p>
          </div>
        </Container>
      </section>

      {/* Gallery Section */}
      <section className="py-12">
        <Container>
          {/* Gallery Filter */}
          <div className="mb-6">
            <GalleryFilter
              selectedCategory={galleryCategory}
              onCategoryChange={setGalleryCategory}
            />
          </div>

          {/* Results count */}
          <div className="text-sm text-muted-foreground mb-4">
            {filteredGallery.length} image{filteredGallery.length > 1 ? "s" : ""} trouvé
            {filteredGallery.length > 1 ? "s" : ""}
          </div>

          {/* Gallery Grid */}
          <Suspense fallback={
            <div className="flex items-center justify-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
          }>
            <GalleryGrid images={filteredGallery} />
          </Suspense>
        </Container>
      </section>
    </div>
  );
};

export default Realisations;
