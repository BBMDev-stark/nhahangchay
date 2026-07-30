import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock, Car } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Container } from "@/components/shared/container";
import { ContactForm } from "@/components/forms/contact-form";
import { siteConfig } from "@/config/site.config";
import { JsonLd, buildBreadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Liên Hệ",
  description: `Thông tin liên hệ, bản đồ và giờ mở cửa của ${siteConfig.name}.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: "Trang chủ", url: "/" },
          { name: "Liên hệ", url: "/contact" },
        ])}
      />
      <PageHeader
        eyebrow="Liên Hệ"
        title="Get In Touch"
        description="Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn."
        image="/images/hero/contact-header.jpg"
      />
      <section className="section-padding bg-surface">
        <Container className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          <div>
            <h2 className="text-h2 font-heading mb-8 text-text">Gửi Tin Nhắn</h2>
            <ContactForm />
          </div>

          <div className="flex flex-col gap-8">
            <div className="overflow-hidden rounded-lg border border-border">
              <iframe
                className="luxury-map"
                src={siteConfig.contact.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ minHeight: 300, border: 0 }}
                loading="lazy"
                title="Bản đồ Lotus & Earth"
              />
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <InfoItem icon={<MapPin size={18} />} label="Địa Chỉ">
                {siteConfig.contact.address.street}, {siteConfig.contact.address.district},{" "}
                {siteConfig.contact.address.city}
              </InfoItem>
              <InfoItem icon={<Phone size={18} />} label="Điện Thoại">
                {siteConfig.contact.phone}
              </InfoItem>
              <InfoItem icon={<Mail size={18} />} label="Email">
                {siteConfig.contact.email}
              </InfoItem>
              <InfoItem icon={<Clock size={18} />} label="Giờ Mở Cửa">
                {siteConfig.openingHours.map((oh) => (
                  <span key={oh.days} className="block">
                    {oh.days}: {oh.hours}
                  </span>
                ))}
              </InfoItem>
              <InfoItem icon={<Car size={18} />} label="Bãi Đậu Xe">
                Miễn phí cho ô tô và xe máy tại khuôn viên nhà hàng.
              </InfoItem>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

function InfoItem({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 text-gold">{icon}</span>
      <div>
        <p className="font-heading text-base text-text">{label}</p>
        <div className="text-sm text-text/60">{children}</div>
      </div>
    </div>
  );
}
