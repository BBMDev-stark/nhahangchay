import Link from "next/link";
import Image from "next/image";
import { Clock } from "lucide-react";
import { SectionTitle } from "@/components/shared/section-title";
import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { blogPosts } from "@/features/blog/data/posts";
import { formatDate } from "@/lib/utils";

export function BlogPreview() {
  const posts = blogPosts.slice(0, 3);

  return (
    <section className="section-padding bg-surface">
      <Container>
        <SectionTitle
          eyebrow="Blog"
          title="Câu Chuyện & Cảm Hứng"
          className="mb-14"
        />
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group flex flex-col"
            >
              <div className="relative h-56 w-full overflow-hidden rounded-lg">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <span className="mt-4 text-xs uppercase tracking-wider text-gold">
                {post.category}
              </span>
              <h3 className="mt-2 font-heading text-xl text-text group-hover:text-gold">
                {post.title}
              </h3>
              <p className="mt-2 line-clamp-2 text-sm text-text/60">{post.excerpt}</p>
              <div className="mt-4 flex items-center gap-3 text-xs text-text/40">
                <span>{formatDate(post.publishedAt)}</span>
                <span className="flex items-center gap-1">
                  <Clock size={12} /> {post.readingTime} phút đọc
                </span>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link href="/blog">
            <Button variant="outline">Xem Tất Cả Bài Viết</Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
