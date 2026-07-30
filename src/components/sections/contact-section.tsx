import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { SectionTitle } from "@/components/shared/section-title";
import { Container } from "@/components/shared/container";
import { siteConfig } from "@/config/site.config";

export function ContactSection() {
  return (
    <section id="contact" className="section-padding bg-surface">
      <Container>
        <SectionTitle eyebrow="Liên Hệ" title="Ghé Thăm Chúng Tôi" className="mb-14" />
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div className="overflow-hidden rounded-lg border border-border">
            <iframe
              className="luxury-map"
              src={siteConfig.contact.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ minHeight: 420, border: 0 }}
              loading="lazy"
              title="Bản đồ Lotus & Earth"
            />
          </div>
          <div className="flex flex-col justify-center gap-6">
            <div className="flex items-start gap-4">
              <MapPin className="mt-1 shrink-0 text-gold" size={20} />
              <div>
                <p className="font-heading text-lg text-text">Địa Chỉ</p>
                <p className="text-sm text-text/60">
                  {siteConfig.contact.address.street}, {siteConfig.contact.address.district},{" "}
                  {siteConfig.contact.address.city}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Phone className="mt-1 shrink-0 text-gold" size={20} />
              <div>
                <p className="font-heading text-lg text-text">Điện Thoại</p>
                <p className="text-sm text-text/60">{siteConfig.contact.phone}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Mail className="mt-1 shrink-0 text-gold" size={20} />
              <div>
                <p className="font-heading text-lg text-text">Email</p>
                <p className="text-sm text-text/60">{siteConfig.contact.email}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Clock className="mt-1 shrink-0 text-gold" size={20} />
              <div>
                <p className="font-heading text-lg text-text">Giờ Mở Cửa</p>
                {siteConfig.openingHours.map((oh) => (
                  <p key={oh.days} className="text-sm text-text/60">
                    {oh.days}: {oh.hours}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
