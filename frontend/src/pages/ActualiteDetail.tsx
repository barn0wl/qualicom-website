// src/pages/ActualiteDetail.tsx
import { useParams, Link, useNavigate } from "react-router-dom";
import { Calendar, User, Tag, ArrowLeft, Share2 } from "lucide-react";
import { motion } from "framer-motion";

import Container from "@/components/common/Container";
import BlogSidebar from "@/components/blog/BlogSidebar";
import { useBlog } from "@/context/BlogContext";

const ActualiteDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { getPost, publishedPosts, latestPosts, loading } = useBlog();

  const post = slug ? getPost(slug) : undefined;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // Handle share
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post?.title || "Qualicom - Actualité",
        text: post?.excerpt || "",
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Lien copié dans le presse-papier !");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Article non trouvé</h1>
          <p className="text-muted-foreground mb-6">L'article que vous recherchez n'existe pas ou a été supprimé.</p>
          <Link
            to="/actualites"
            className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour aux actualités
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-300 mb-4">
                <Link
                  to="/actualites"
                  className="flex items-center hover:text-white transition-colors"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Retour
                </Link>
                <span className="text-gray-600">•</span>
                <span className="bg-primary/80 text-white text-xs font-medium px-3 py-1 rounded-full">
                  {post.category}
                </span>
                {post.featured && (
                  <span className="bg-yellow-500/80 text-white text-xs font-medium px-3 py-1 rounded-full">
                    À la une
                  </span>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {formatDate(post.publishedAt)}
                </span>
                <span className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {post.author}
                </span>
                {post.updatedAt && (
                  <span className="text-gray-400 text-xs">
                    Mis à jour le {formatDate(post.updatedAt)}
                  </span>
                )}
              </div>
            </motion.div>
          </Container>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2"
            >
              <div className="bg-white rounded-xl shadow-sm border border-border/50 p-6 md:p-8">
                {/* Article content */}
                <div
                  className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary prose-strong:text-foreground"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Tags */}
                {post.tags.length > 0 && (
                  <div className="mt-8 pt-6 border-t border-border">
                    <div className="flex flex-wrap items-center gap-3">
                      <Tag className="h-4 w-4 text-muted-foreground" />
                      {post.tags.map((tag) => (
                        <Link
                          key={tag}
                          to={`/actualites?tag=${encodeURIComponent(tag)}`}
                          className="text-sm bg-accent text-accent-foreground px-3 py-1 rounded-full hover:bg-accent/80 transition-colors"
                        >
                          #{tag}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Share */}
                <div className="mt-6 pt-6 border-t border-border flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Partager cet article</span>
                  <button
                    onClick={handleShare}
                    className="flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/80 transition-colors"
                  >
                    <Share2 className="h-4 w-4" />
                    Partager
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <BlogSidebar recentPosts={publishedPosts} />
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default ActualiteDetail;
