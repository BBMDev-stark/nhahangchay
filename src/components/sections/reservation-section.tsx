import { SectionTitle } from "@/components/shared/section-title";
import { Container } from "@/components/shared/container";
import { siteConfig } from "@/config/site.config";
import {
  Clock3,
  ExternalLink,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";

const zaloUrl = "https://zalo.me/0909277888";

export function ReservationSection() {
  return (
    <section id="reservation" className="section-padding scroll-mt-24 bg-bg-primary">
      <Container className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
        <div className="overflow-hidden rounded-lg border border-border bg-white shadow-sm">
          <iframe
            src={siteConfig.contact.mapEmbedUrl}
            title="Google Maps - Nhà hàng chay Hương Sen"
            className="h-[420px] w-full border-0 lg:h-[560px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
          <div className="flex flex-col gap-4 border-t border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-start gap-3">
              <MapPin className="mt-0.5 shrink-0 text-gold" size={20} aria-hidden="true" />
              <div>
                <p className="font-heading text-base font-semibold text-text">
                  Nhà hàng chay Hương Sen
                </p>
                <p className="mt-1 text-sm leading-relaxed text-text/60">
                  {siteConfig.contact.address.street}, {siteConfig.contact.address.district}, {siteConfig.contact.address.city}
                </p>
              </div>
            </div>
            <a
              href={siteConfig.contact.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-green-primary transition-colors hover:text-gold"
            >
              Chỉ đường
              <ExternalLink size={15} aria-hidden="true" />
            </a>
          </div>
        </div>
        <div>
          <SectionTitle
            align="left"
            eyebrow="Ghé Thăm Hương Sen"
            title="Một Không Gian Thanh Tịnh Đang Chờ Bạn"
            description="Hương Sen mang đến những món chay Việt chỉn chu trong không gian ấm cúng, phù hợp cho gia đình, bạn bè và những dịp gặp gỡ đặc biệt."
            className="mb-8"
          />

          <div className="divide-y divide-border border-y border-border">
            <div className="flex gap-4 py-5">
              <MapPin className="mt-0.5 shrink-0 text-gold" size={21} aria-hidden="true" />
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-text/55">Địa chỉ</p>
                <p className="mt-2 text-sm leading-6 text-text/80">
                  {siteConfig.contact.address.street}, {siteConfig.contact.address.district}, {siteConfig.contact.address.city}
                </p>
              </div>
            </div>

            <div className="flex gap-4 py-5">
              <Clock3 className="mt-0.5 shrink-0 text-gold" size={21} aria-hidden="true" />
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-text/55">Giờ mở cửa</p>
                <div className="mt-2 space-y-1 text-sm leading-6 text-text/80">
                  {siteConfig.openingHours.map((item) => (
                    <p key={item.days}>
                      <span className="inline-block min-w-28">{item.days}</span>
                      <span>{item.hours}</span>
                    </p>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-4 py-5">
              <Phone className="mt-0.5 shrink-0 text-gold" size={21} aria-hidden="true" />
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-text/55">Hotline đặt bàn</p>
                <a
                  href={`tel:${siteConfig.contact.phoneHref}`}
                  className="mt-2 inline-block font-heading text-xl font-semibold text-text transition-colors hover:text-gold"
                >
                  {siteConfig.contact.phone}
                </a>
                <p className="mt-1 text-sm text-text/55">Zalo hỗ trợ: {siteConfig.contact.phone}</p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={`tel:${siteConfig.contact.phoneHref}`}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-sm bg-gold px-7 py-3 text-sm font-medium text-bg-dark transition-all duration-300 hover:bg-white"
            >
              <Phone size={17} aria-hidden="true" />
              Gọi Đặt Bàn
            </a>
            <a
              href={zaloUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-sm border border-green-primary/50 px-7 py-3 text-sm font-medium text-green-primary transition-all duration-300 hover:bg-green-primary hover:text-white"
            >
              <MessageCircle size={18} aria-hidden="true" />
              Nhắn Zalo
            </a>
            <a
              href={siteConfig.contact.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-sm px-4 py-3 text-sm font-medium text-text/70 transition-colors hover:text-gold"
            >
              <ExternalLink size={16} aria-hidden="true" />
              Xem Chỉ Đường
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
