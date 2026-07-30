import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, User } from "lucide-react";
import { Container } from "@/components/shared/container";
import { blogPosts, getPostBySlug, getRelatedPosts } from "@/features/blog/data/posts";
import { formatDate } from "@/lib/utils";
import { JsonLd, buildBreadcrumbSchema } from "@/lib/seo";
import { siteConfig } from "@/config/site.config";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.coverImage }],
      publishedTime: post.publishedAt,
    },
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const paragraphs = post.content.split("\n\n");
  const related = getRelatedPosts(post);

  return (
    <>
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: "Trang chủ", url: "/" },
          { name: "Blog", url: "/blog" },
          { name: post.title, url: `/blog/${post.slug}` },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.excerpt,
          image: `${siteConfig.url}${post.coverImage}`,
          author: { "@type": "Person", name: post.author },
          datePublished: post.publishedAt,
        }}
      />

      <section className="relative flex h-[46vh] min-h-[340px] items-end overflow-hidden bg-bg-dark">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/40 to-bg-dark/60" />
        <Container className="relative z-10 pb-12">
          <span className="text-eyebrow">{post.category}</span>
          <h1 className="text-h1 font-heading mt-4 max-w-3xl text-white">{post.title}</h1>
          <div className="mt-4 flex items-center gap-4 text-sm text-white/60">
            <span className="flex items-center gap-1.5">
              <User size={14} /> {post.author}
            </span>
            <span>{formatDate(post.publishedAt)}</span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} /> {post.readingTime} phút đọc
            </span>
          </div>
        </Container>
      </section>

      <section className="section-padding bg-surface">
        <Container className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_260px]">
          <article className="prose-luxury max-w-2xl">
            {paragraphs.map((p, i) => (
              <p key={i} className="mb-6 text-body-lg leading-relaxed text-text/80">
                {p}
              </p>
            ))}
          </article>

          <aside className="h-fit lg:sticky lg:top-28">
            <h4 className="text-eyebrow mb-4">Mục Lục</h4>
            <ul className="flex flex-col gap-2 border-l border-border pl-4 text-sm text-text/60">
              {paragraphs.map((_, i) => (
                <li key={i}>Đoạn {i + 1}</li>
              ))}
            </ul>

            {related.length > 0 && (
              <div className="mt-10">
                <h4 className="text-eyebrow mb-4">Bài Viết Liên Quan</h4>
                <div className="flex flex-col gap-4">
                  {related.map((r) => (
                    <Link
                      key={r.id}
                      href={`/blog/${r.slug}`}
                      className="group flex items-center gap-3"
                    >
                      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md">
                        <Image
                          src={r.coverImage}
                          alt={r.title}
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      </div>
                      <span className="text-sm text-text/70 group-hover:text-gold">
                        {r.title}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </Container>
      </section>
    </>
  );
}
