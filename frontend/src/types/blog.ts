// src/types/blog.ts

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  publishedAt: string; // ISO date string
  updatedAt?: string; // ISO date string
  category: string;
  tags: string[];
  featured: boolean;
  status: "draft" | "published";
}

export interface BlogPostInput {
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  category: string;
  tags: string[];
  featured: boolean;
  status: "draft" | "published";
}

export const DEFAULT_POST_IMAGE =
  "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7";

export const CATEGORIES = [
  "Informatique",
  "Télécoms",
  "BTP",
  "Entreprise",
  "Événement",
] as const;

export type Category = typeof CATEGORIES[number];
