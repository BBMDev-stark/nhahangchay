import { SectionTitle } from "@/components/shared/section-title";
import { Container } from "@/components/shared/container";
import { ImageReveal } from "@/components/shared/image-reveal";
import { ingredients } from "@/features/menu/data/ingredients";

export function OrganicIngredients() {
  const items = ingredients.slice(0, 4);

  return (
    <section className="section-padding bg-surface">
      <Container>
        <SectionTitle
          eyebrow="Nguyên Liệu Tươi"
          title="Từ Nông Trại Đến Bàn Ăn"
          description="Rau củ, nấm và thảo mộc được lựa chọn kỹ để giữ vị thanh tự nhiên trong từng món chay."
          className="mb-14"
        />
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {items.map((ing) => (
            <div key={ing.id} className="group">
              <ImageReveal
                src={ing.image}
                alt={ing.name}
                className="h-56 w-full rounded-lg"
                sizes="(max-width: 1023px) 50vw, 25vw"
              />
              <h3 className="mt-4 font-heading text-lg text-text">{ing.name}</h3>
              <p className="text-xs uppercase tracking-wider text-gold">{ing.origin}</p>
              <p className="mt-2 text-sm leading-relaxed text-text/60">{ing.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
