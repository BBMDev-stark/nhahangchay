import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/shared/container";
import { siteConfig } from "@/config/site.config";
import { footerNav } from "@/config/nav.config";
import { FacebookIcon } from "@/components/shared/social-icons";

export function Footer() {
  return (
    <footer className="bg-bg-dark text-white/80">
      <Container className="section-padding">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <span className="inline-flex rounded-lg bg-white p-2">
              <Image src={siteConfig.logoImage} alt="Nhà hàng chay Hương Sen" width={210} height={98} className="h-[82px] w-auto object-contain" />
            </span>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
              {siteConfig.description}
            </p>
            <div className="mt-6 flex gap-4">
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

        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/40 md:flex-row">
          <span>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </span>
          <span>Thanh vị từ tâm · An lành trong từng bữa ăn.</span>
        </div>
      </Container>
    </footer>
  );
}
