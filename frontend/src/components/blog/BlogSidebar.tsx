// src/components/blog/BlogSidebar.tsx
import { Link } from "react-router-dom";
import { Calendar, User, Tag, ArrowRight, X } from "lucide-react";
import { BlogPost } from "@/types/blog";
import { CATEGORIES } from "@/types/blog";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface BlogSidebarProps {
  recentPosts: BlogPost[];
  categories?: string[];
  selectedCategory?: string | null;
  selectedTag?: string | null;
  onCategoryChange?: (category: string | null) => void;
  onTagChange?: (tag: string | null) => void;
}

const BlogSidebar = ({
  recentPosts,
  categories = CATEGORIES as unknown as string[],
  selectedCategory = null,
  selectedTag = null,
  onCategoryChange,
  onTagChange,
}: BlogSidebarProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // Get all unique tags from posts
  const allTags = Array.from(
    new Set(recentPosts.flatMap((p) => p.tags))
  );

  return (
    <aside className="space-y-6">
      {/* Categories - Now Interactive */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Catégories</CardTitle>
          {selectedCategory && onCategoryChange && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onCategoryChange(null)}
              className="h-6 px-2 text-xs"
            >
              <X className="h-3 w-3 mr-1" />
              Effacer
            </Button>
          )}
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {categories.map((category) => {
              const isActive = selectedCategory === category;
              const postCount = recentPosts.filter(p => p.category === category).length;
              
              return (
                <li key={category}>
                  <button
                    onClick={() => onCategoryChange?.(isActive ? null : category)}
                    className={`w-full flex items-center justify-between text-sm transition-colors ${
                      isActive 
                        ? "text-primary font-medium" 
                        : "text-muted-foreground hover:text-primary"
                    }`}
                  >
                    <span>{category}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">{postCount}</span>
                      {isActive && (
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      )}
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </CardContent>
      </Card>

      {/* Recent Posts */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Articles récents</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {recentPosts.slice(0, 4).map((post) => (
              <li key={post.id}>
                <Link
                  to={`/actualites/${post.slug}`}
                  className="group block"
                >
                  <h4 className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h4>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(post.publishedAt)}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {post.author}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Tags - Now Interactive */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Tags populaires</CardTitle>
          {selectedTag && onTagChange && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onTagChange(null)}
              className="h-6 px-2 text-xs"
            >
              <X className="h-3 w-3 mr-1" />
              Effacer
            </Button>
          )}
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {allTags.slice(0, 12).map((tag) => {
              const isActive = selectedTag === tag;
              const postCount = recentPosts.filter(p => p.tags.includes(tag)).length;
              
              return (
                <button
                  key={tag}
                  onClick={() => onTagChange?.(isActive ? null : tag)}
                  className={`inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-full transition-colors ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "bg-accent text-accent-foreground hover:bg-accent/80"
                  }`}
                >
                  <Tag className="h-3 w-3" />
                  {tag}
                  <span className="text-[10px] opacity-60">({postCount})</span>
                </button>
              );
            })}
          </div>
          {allTags.length === 0 && (
            <p className="text-sm text-muted-foreground">Aucun tag disponible.</p>
          )}
        </CardContent>
      </Card>
    </aside>
  );
};

export default BlogSidebar;
