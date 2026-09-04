// src/context/BlogContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { BlogPost, BlogPostInput } from "@/types/blog";
import {
  getPosts,
  getPublishedPosts,
  getFeaturedPosts,
  getLatestPosts,
  getPostBySlug,
  createPost as createPostService,
  updatePost as updatePostService,
  deletePost as deletePostService,
  seedInitialPosts,
} from "@/services/blogService";

interface BlogContextType {
  posts: BlogPost[];
  publishedPosts: BlogPost[];
  featuredPosts: BlogPost[];
  latestPosts: BlogPost[];
  loading: boolean;
  getPost: (slug: string) => BlogPost | undefined;
  createPost: (input: BlogPostInput) => BlogPost;
  updatePost: (id: string, input: Partial<BlogPostInput>) => BlogPost | undefined;
  deletePost: (id: string) => boolean;
  refresh: () => void;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error("useBlog must be used within a BlogProvider");
  }
  return context;
};

interface BlogProviderProps {
  children: ReactNode;
}

export const BlogProvider: React.FC<BlogProviderProps> = ({ children }) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [publishedPosts, setPublishedPosts] = useState<BlogPost[]>([]);
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([]);
  const [latestPosts, setLatestPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = () => {
    setLoading(true);
    try {
      // Seed initial posts if empty
      seedInitialPosts();

      const allPosts = getPosts();
      const published = getPublishedPosts();
      const featured = getFeaturedPosts(3);
      const latest = getLatestPosts(5);

      setPosts(allPosts);
      setPublishedPosts(published);
      setFeaturedPosts(featured);
      setLatestPosts(latest);
    } catch (error) {
      console.error("Error refreshing blog data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getPost = (slug: string) => getPostBySlug(slug);

  const createPost = (input: BlogPostInput) => {
    const newPost = createPostService(input);
    refresh();
    return newPost;
  };

  const updatePost = (id: string, input: Partial<BlogPostInput>) => {
    const updated = updatePostService(id, input);
    refresh();
    return updated;
  };

  const deletePost = (id: string) => {
    const result = deletePostService(id);
    refresh();
    return result;
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <BlogContext.Provider
      value={{
        posts,
        publishedPosts,
        featuredPosts,
        latestPosts,
        loading,
        getPost,
        createPost,
        updatePost,
        deletePost,
        refresh,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};
