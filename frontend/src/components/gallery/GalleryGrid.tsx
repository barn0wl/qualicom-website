// src/components/gallery/GalleryGrid.tsx
import { useState } from "react";
import { GalleryImage } from "@/types/client";
import { cn } from "@/lib/utils";

interface GalleryGridProps {
  images: GalleryImage[];
  className?: string;
}

const GalleryGrid = ({ images, className }: GalleryGridProps) => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  if (images.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        Aucune image disponible.
      </div>
    );
  }

  return (
    <>
      <div className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4", className)}>
        {images.map((image) => (
          <div
            key={image.id}
            className="group relative aspect-[4/3] overflow-hidden rounded-lg cursor-pointer"
            onClick={() => setSelectedImage(image)}
          >
            <img
              src={image.url}
              alt={image.caption}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <p className="text-sm font-medium line-clamp-2">{image.caption}</p>
              {image.category && (
                <span className="text-xs text-gray-300 mt-1 inline-block">
                  {image.category}
                </span>
              )}
              {image.date && (
                <span className="text-xs text-gray-300 ml-2">
                  • {image.date}
                </span>
              )}
            </div>
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-xs bg-black/60 text-white px-2 py-1 rounded-full">
                Agrandir
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-4xl w-full max-h-[90vh] bg-black rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 transition-colors text-2xl"
              aria-label="Fermer"
            >
              ✕
            </button>
            <img
              src={selectedImage.url}
              alt={selectedImage.caption}
              className="w-full h-auto max-h-[80vh] object-contain"
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <p className="text-white text-lg font-medium">{selectedImage.caption}</p>
              <div className="flex items-center gap-4 mt-1">
                {selectedImage.category && (
                  <span className="text-sm text-gray-300">{selectedImage.category}</span>
                )}
                {selectedImage.date && (
                  <span className="text-sm text-gray-300">• {selectedImage.date}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GalleryGrid;
