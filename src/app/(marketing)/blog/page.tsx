import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Container } from "@/components/shared/container";
import { blogPosts } from "@/features/blog/data/posts";
import { formatDate } from "@/lib/utils";
import { JsonLd, buildBreadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Blog",
  description: "Câu chuyện, cảm hứng và kiến thức ẩm thực chay từ đội ngũ Lotus & Earth.",
  alternates: { canonical: "/blog" },
};

export default function BlogListPage() {
  return (
    <>
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: "Trang chủ", url: "/" },
          { name: "Blog", url: "/blog" },
        ])}
      />
      <PageHeader
        eyebrow="Blog"
        title="Câu Chuyện & Cảm Hứng"
        description="Những bài viết về triết lý ẩm thực, nguyên liệu và văn hóa fine dining chay."
        image="/images/hero/blog-header.jpg"
      />
      <section className="section-padding bg-surface">
        <Container>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="group flex flex-col">
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
                <h2 className="mt-2 font-heading text-xl text-text group-hover:text-gold">
                  {post.title}
                </h2>
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
        </Container>
      </section>
    </>
  );
}
