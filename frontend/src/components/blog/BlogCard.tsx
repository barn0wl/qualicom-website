// src/components/blog/BlogCard.tsx
import { Link } from "react-router-dom";
import { Calendar, User } from "lucide-react";
import { BlogPost } from "@/types/blog";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface BlogCardProps {
  post: BlogPost;
  variant?: "default" | "compact";
  className?: string;
}

const BlogCard = ({ post, variant = "default", className }: BlogCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  if (variant === "compact") {
    return (
      <Link to={`/actualites/${post.slug}`} className="block group">
        <Card className={cn("overflow-hidden hover:shadow-md transition-shadow", className)}>
          <div className="relative h-48 overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
            {post.featured && (
              <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
                À la une
              </span>
            )}
          </div>
          <CardHeader className="p-4 pb-2">
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {formatDate(post.publishedAt)}
              </span>
              <span className="flex items-center gap-1">
                <User className="h-3 w-3" />
                {post.author}
              </span>
            </div>
            <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
              {post.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <p className="text-sm text-muted-foreground line-clamp-2">
              {post.excerpt}
            </p>
          </CardContent>
        </Card>
      </Link>
    );
  }

  return (
    <Link to={`/actualites/${post.slug}`} className="block group">
      <Card className={cn("overflow-hidden hover:shadow-md transition-shadow", className)}>
        <div className="relative h-56 md:h-64 overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
            <span className="text-xs font-medium text-white bg-primary/80 px-3 py-1 rounded-full">
              {post.category}
            </span>
          </div>
          {post.featured && (
            <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
              À la une
            </span>
          )}
        </div>
        <CardHeader>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {formatDate(post.publishedAt)}
            </span>
            <span className="flex items-center gap-1">
              <User className="h-4 w-4" />
              {post.author}
            </span>
          </div>
          <CardTitle className="text-xl group-hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground line-clamp-2">{post.excerpt}</p>
          <div className="flex flex-wrap gap-2 mt-4">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        </CardContent>
        <CardFooter className="pt-0">
          <span className="inline-flex items-center text-primary font-medium group-hover:text-primary/80 transition-colors">
            Lire la suite
            <svg
              className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default BlogCard;
