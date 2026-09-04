// src/components/gallery/GalleryFilter.tsx
import { Button } from "@/components/ui/button";
import { GALLERY_CATEGORIES } from "@/types/client";

interface GalleryFilterProps {
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

const GalleryFilter = ({ selectedCategory, onCategoryChange }: GalleryFilterProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant={!selectedCategory ? "default" : "outline"}
        size="sm"
        onClick={() => onCategoryChange(null)}
      >
        Toutes
      </Button>
      {GALLERY_CATEGORIES.map((cat) => (
        <Button
          key={cat}
          variant={selectedCategory === cat ? "default" : "outline"}
          size="sm"
          onClick={() => onCategoryChange(selectedCategory === cat ? null : cat)}
        >
          {cat}
        </Button>
      ))}
    </div>
  );
};

export default GalleryFilter;
