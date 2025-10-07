import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { getPostBySlug } from "@/lib/blog";

export default function BlogPost() {
  const { slug = "" } = useParams();
  const post = useMemo(() => getPostBySlug(slug), [slug]);
  if (!post) {
    return (
      <div className="container py-14">
        <h1 className="font-heading text-2xl font-bold">Article introuvable</h1>
        <Link to="/blog" className="text-primary hover:underline">← Retour au blog</Link>
      </div>
    );
  }
  return (
    <div className="container py-14">
      <nav className="text-sm text-muted-foreground"><Link to="/blog" className="hover:underline">Blog</Link> / <span>{post.title}</span></nav>
      <h1 className="mt-2 font-heading text-3xl md:text-4xl font-bold">{post.title}</h1>
      <div className="mt-1 text-xs text-muted-foreground">{new Date(post.date).toLocaleDateString("fr-FR")} • {post.cat}</div>
      <article className="prose prose-neutral dark:prose-invert mt-6 max-w-none">
        <p>{post.content}</p>
      </article>
    </div>
  );
}
