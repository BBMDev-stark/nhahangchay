import Image from "next/image";
import { Container } from "@/components/shared/container";

export function PageHeader({
  eyebrow,
  title,
  description,
  image,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  image: string;
}) {
  return (
    <section className="relative flex h-[50vh] min-h-[380px] items-center justify-center overflow-hidden bg-bg-dark">
      <Image
        src={image}
        alt={title}
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/50 to-bg-dark/60" />
      <Container className="relative z-10 text-center">
        <span className="text-eyebrow">{eyebrow}</span>
        <h1 className="text-h1 font-heading mt-4 text-white">{title}</h1>
        {description && (
          <p className="mx-auto mt-4 max-w-xl text-body-lg text-white/70">{description}</p>
        )}
      </Container>
    </section>
  );
}
