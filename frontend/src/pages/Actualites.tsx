// src/pages/Actualites.tsx
import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, X } from "lucide-react";
import { motion } from "framer-motion";

import Container from "@/components/common/Container";
import BlogCard from "@/components/blog/BlogCard";
import BlogSidebar from "@/components/blog/BlogSidebar";
import { useBlog } from "@/context/BlogContext";

const Actualites = () => {
  const { publishedPosts, loading } = useBlog();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    searchParams.get("category") || null
  );
  const [selectedTag, setSelectedTag] = useState<string | null>(
    searchParams.get("tag") || null
  );

  // Filter posts
  const filteredPosts = useMemo(() => {
    let posts = publishedPosts;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      posts = posts.filter(
        (p) =>
          p.title.toLowerCase().includes(term) ||
          p.excerpt.toLowerCase().includes(term) ||
          p.content.toLowerCase().includes(term)
      );
    }

    if (selectedCategory) {
      posts = posts.filter((p) => p.category === selectedCategory);
    }

    if (selectedTag) {
      posts = posts.filter((p) => p.tags.includes(selectedTag));
    }

    return posts;
  }, [publishedPosts, searchTerm, selectedCategory, selectedTag]);

  // Clear filters
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory(null);
    setSelectedTag(null);
    setSearchParams({});
  };

  // Update URL when filters change
  useEffect(() => {
    const params: Record<string, string> = {};
    if (selectedCategory) params.category = selectedCategory;
    if (selectedTag) params.tag = selectedTag;
    setSearchParams(params);
  }, [selectedCategory, selectedTag, setSearchParams]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="mt-4 text-muted-foreground">Chargement des actualités...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white border-b border-border py-16">
        <Container>
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">Actualités</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Restez informé des dernières nouvelles, projets et innovations de Qualicom
            </p>
          </div>
        </Container>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Search Bar */}
              <div className="bg-white rounded-xl shadow-sm border border-border/50 p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Rechercher un article..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-colors"
                    />
                  </div>
                  {(selectedCategory || selectedTag || searchTerm) && (
                    <button
                      onClick={clearFilters}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
                    >
                      <X className="h-4 w-4" />
                      Effacer les filtres
                    </button>
                  )}
                </div>
              </div>

              {/* Results Count */}
              <div className="text-sm text-muted-foreground">
                {filteredPosts.length} article{filteredPosts.length > 1 ? "s" : ""} trouvé
                {filteredPosts.length > 1 ? "s" : ""}
              </div>

              {/* Posts Grid */}
              {filteredPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredPosts.map((post, index) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <BlogCard post={post} variant="compact" />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-xl border border-border/50">
                  <p className="text-muted-foreground">Aucun article ne correspond à vos critères.</p>
                  <button
                    onClick={clearFilters}
                    className="mt-4 text-primary hover:text-primary/80 transition-colors"
                  >
                    Effacer les filtres
                  </button>
                </div>
              )}
            </div>

            {/* Sidebar - Now with working filters */}
            <div className="lg:col-span-1">
              <BlogSidebar 
                recentPosts={publishedPosts}
                selectedCategory={selectedCategory}
                selectedTag={selectedTag}
                onCategoryChange={setSelectedCategory}
                onTagChange={setSelectedTag}
              />
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default Actualites;
