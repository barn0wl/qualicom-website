// src/services/blogService.ts
import { BlogPost, BlogPostInput, DEFAULT_POST_IMAGE } from "@/types/blog";

const STORAGE_KEY = "qualicom_blog_posts";

// Generate a slug from a title
const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove accents
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

// Generate a unique ID
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
};

// Get all posts from localStorage
export const getPosts = (): BlogPost[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading posts from localStorage:", error);
    return [];
  }
};

// Get a single post by slug
export const getPostBySlug = (slug: string): BlogPost | undefined => {
  const posts = getPosts();
  return posts.find((post) => post.slug === slug);
};

// Get published posts (sorted by date, newest first)
export const getPublishedPosts = (): BlogPost[] => {
  const posts = getPosts();
  return posts
    .filter((post) => post.status === "published")
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
};

// Get featured posts
export const getFeaturedPosts = (limit: number = 3): BlogPost[] => {
  const published = getPublishedPosts();
  return published.filter((post) => post.featured).slice(0, limit);
};

// Get latest posts (for home page banner)
export const getLatestPosts = (limit: number = 5): BlogPost[] => {
  const published = getPublishedPosts();
  return published.slice(0, limit);
};

// Create a new post
export const createPost = (input: BlogPostInput): BlogPost => {
  const posts = getPosts();
  const slug = generateSlug(input.title);
  
  // Ensure unique slug
  let uniqueSlug = slug;
  let counter = 1;
  while (posts.some((p) => p.slug === uniqueSlug)) {
    uniqueSlug = `${slug}-${counter}`;
    counter++;
  }

  const newPost: BlogPost = {
    id: generateId(),
    ...input,
    slug: uniqueSlug,
    publishedAt: input.status === "published" ? new Date().toISOString() : "",
    updatedAt: undefined,
    image: input.image || DEFAULT_POST_IMAGE,
  };

  const updatedPosts = [newPost, ...posts];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPosts));
  return newPost;
};

// Update an existing post
export const updatePost = (id: string, input: Partial<BlogPostInput>): BlogPost | undefined => {
  const posts = getPosts();
  const index = posts.findIndex((p) => p.id === id);
  if (index === -1) return undefined;

  const existing = posts[index];
  const updated: BlogPost = {
    ...existing,
    ...input,
    updatedAt: new Date().toISOString(),
    publishedAt: input.status === "published" && existing.status === "draft" 
      ? new Date().toISOString() 
      : existing.publishedAt,
    image: input.image || existing.image,
  };

  // Update slug if title changed
  if (input.title && input.title !== existing.title) {
    const newSlug = generateSlug(input.title);
    let uniqueSlug = newSlug;
    let counter = 1;
    while (posts.some((p) => p.slug === uniqueSlug && p.id !== id)) {
      uniqueSlug = `${newSlug}-${counter}`;
      counter++;
    }
    updated.slug = uniqueSlug;
  }

  posts[index] = updated;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  return updated;
};

// Delete a post
export const deletePost = (id: string): boolean => {
  const posts = getPosts();
  const filtered = posts.filter((p) => p.id !== id);
  if (filtered.length === posts.length) return false;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  return true;
};

// Seed initial posts (for demo purposes)
export const seedInitialPosts = (): void => {
  const existing = getPosts();
  if (existing.length > 0) return;

  const initialPosts: BlogPostInput[] = [
    {
      title: "Qualicom renforce son équipe avec de nouveaux experts en cybersécurité",
      excerpt:
        "L'entreprise continue de se développer et accueille trois nouveaux experts pour renforcer son pôle sécurité informatique.",
      content: `
        <p>Qualicom est ravie d'annoncer l'arrivée de trois nouveaux experts en cybersécurité au sein de son équipe.</p>
        <p>Ces recrutements s'inscrivent dans la stratégie de l'entreprise de renforcer ses compétences en sécurité informatique pour mieux protéger ses clients.</p>
        <h3>Des profils d'exception</h3>
        <p>Les nouveaux arrivants apportent une expertise complémentaire dans les domaines de la sécurité des réseaux, de l'audit de sécurité et de la réponse aux incidents.</p>
      `,
      author: "Direction Technique",
      category: "Informatique",
      tags: ["Cybersécurité", "Recrutement", "Innovation"],
      featured: true,
      status: "published",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b",
    },
    {
      title: "Nouveau partenariat avec un opérateur télécoms majeur",
      excerpt:
        "Qualicom signe un accord stratégique pour le déploiement de réseaux fibre optique à travers la Côte d'Ivoire.",
      content: `
        <p>Qualicom a signé un partenariat stratégique avec un opérateur télécoms majeur pour le déploiement de réseaux fibre optique.</p>
        <p>Ce projet d'envergure nationale permettra d'améliorer la connectivité dans plusieurs régions de Côte d'Ivoire.</p>
        <p>Les travaux débuteront dès le mois prochain et s'étaleront sur une période de 18 mois.</p>
      `,
      author: "Direction Commerciale",
      category: "Télécoms",
      tags: ["Partenariat", "Fibre Optique", "Connectivité"],
      featured: true,
      status: "published",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    },
    {
      title: "Qualicom participe au Salon de l'Innovation Numérique 2026",
      excerpt:
        "L'entreprise sera présente pour présenter ses dernières solutions en matière d'infrastructures réseau et de sécurité.",
      content: `
        <p>Qualicom sera présent au Salon de l'Innovation Numérique qui se tiendra à Abidjan en juin 2026.</p>
        <p>Cette participation permettra à l'entreprise de présenter ses dernières innovations en matière d'infrastructures réseau, de sécurité et de solutions cloud.</p>
        <p>Les visiteurs pourront découvrir des démonstrations en direct et échanger avec nos experts.</p>
      `,
      author: "Direction Marketing",
      category: "Événement",
      tags: ["Événement", "Innovation", "Salon"],
      featured: false,
      status: "published",
      image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678",
    },
    {
      title: "Les travaux de construction du nouveau centre de données avancent bien",
      excerpt:
        "Le futur datacenter de Qualicom à Abidjan devrait être opérationnel d'ici la fin de l'année.",
      content: `
        <p>Les travaux de construction du nouveau centre de données de Qualicom avancent à un rythme soutenu.</p>
        <p>Situé à Abidjan, ce datacenter de dernière génération offrira des services d'hébergement et de cloud computing de haute performance.</p>
        <p>L'ouverture est prévue pour le dernier trimestre 2026.</p>
      `,
      author: "Direction Technique",
      category: "BTP",
      tags: ["Datacenter", "Construction", "Cloud"],
      featured: false,
      status: "published",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    },
    {
      title: "Qualicom célèbre ses 14 ans d'excellence",
      excerpt:
        "L'entreprise fête ses 14 ans d'existence avec des résultats records et une croissance continue.",
      content: `
        <p>Qualicom célèbre cette année ses 14 ans d'existence.</p>
        <p>Depuis sa création en 2012, l'entreprise n'a cessé de croître et de se diversifier pour devenir un acteur majeur des secteurs de l'informatique, des télécoms et du BTP en Afrique de l'Ouest.</p>
        <p>Cette année a été marquée par des résultats records et une expansion sur de nouveaux marchés.</p>
      `,
      author: "Direction Générale",
      category: "Entreprise",
      tags: ["Anniversaire", "Croissance", "Succès"],
      featured: true,
      status: "published",
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865",
    },
  ];

  initialPosts.forEach((post) => createPost(post));
};
