import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Container } from "@/components/shared/container";
import { siteConfig } from "@/config/site.config";
import { footerNav } from "@/config/nav.config";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { InstagramIcon, FacebookIcon } from "@/components/shared/social-icons";

export function Footer() {
  return (
    <footer className="bg-bg-dark text-white/80">
      <Container className="section-padding">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <h3 className="font-heading text-2xl tracking-[0.15em] text-white">
              {siteConfig.shortName.toUpperCase()}
            </h3>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
              {siteConfig.description}
            </p>
            <div className="mt-6 flex gap-4">
              <a href={siteConfig.social.instagram} aria-label="Instagram" className="transition hover:text-gold">
                <InstagramIcon width={18} height={18} />
              </a>
              <a href={siteConfig.social.facebook} aria-label="Facebook" className="transition hover:text-gold">
                <FacebookIcon width={18} height={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-eyebrow mb-4">Khám Phá</h4>
            <ul className="flex flex-col gap-3 text-sm">
              {footerNav.explore.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition hover:text-gold">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-eyebrow mb-4">Thực Khách</h4>
            <ul className="flex flex-col gap-3 text-sm">
              {footerNav.guest.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition hover:text-gold">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-eyebrow mb-4">Liên Hệ</h4>
            <ul className="flex flex-col gap-3 text-sm text-white/60">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 shrink-0" />
                <span>
                  {siteConfig.contact.address.street}, {siteConfig.contact.address.district},{" "}
                  {siteConfig.contact.address.city}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="shrink-0" />
                <span>{siteConfig.contact.phone}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="shrink-0" />
                <span>{siteConfig.contact.email}</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock size={16} className="mt-0.5 shrink-0" />
                <span>
                  {siteConfig.openingHours.map((oh) => (
                    <span key={oh.days} className="block">
                      {oh.days}: {oh.hours}
                    </span>
                  ))}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-white/10 pt-8">
          <NewsletterForm />
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/40 md:flex-row">
          <span>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </span>
          <span>Crafted with care for a mindful dining experience.</span>
        </div>
      </Container>
    </footer>
  );
}
