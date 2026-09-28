import { Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/layout/container";
import { SiteNav } from "@/components/layout/site-nav";
import { TbdCareLogo } from "@/components/layout/tbd-care-logo";
import type { Dictionary } from "@/i18n/types";

/** Site footer: brand, nav, contact, and social links. */

type NavLink = {
  label: string;
  href: string;
};

type SocialId = Dictionary["footerContact"]["social"][number]["id"];

type SiteFooterProps = {
  siteName: string;
  siteDescription: string;
  footerNav: NavLink[];
  footerNavTitle: string;
  contact: Dictionary["footerContact"];
};

function FooterSocialIcon({ id }: { id: SocialId }) {
  const common = {
    className: "site-footer-social-icon",
    "aria-hidden": true as const,
  };

  if (id === "facebook") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" {...common}>
        <path d="M13.5 22v-8.2h2.75l.42-3.2H13.5V9.02c0-.93.26-1.56 1.58-1.56h1.72V4.28c-.3-.04-1.32-.13-2.51-.13-2.48 0-4.18 1.52-4.18 4.3v2.35H7.5v3.2h2.61V22h3.39z" />
      </svg>
    );
  }

  if (id === "instagram") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...common}>
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
        <circle cx="12" cy="12" r="4.2" />
        <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  if (id === "linkedin") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" {...common}>
        <path d="M6.5 9.5H3.8V21h2.7V9.5zM5.15 3a1.56 1.56 0 1 0 0 3.12 1.56 1.56 0 0 0 0-3.12zM9.2 9.5H11.8v1.56h.04c.36-.68 1.24-1.4 2.55-1.4 2.73 0 3.23 1.8 3.23 4.14V21h-2.7v-5.72c0-1.36-.02-3.1-1.89-3.1-1.89 0-2.18 1.48-2.18 3v5.82H9.2V9.5z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...common}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function SiteFooter({
  siteName,
  siteDescription,
  footerNav,
  footerNavTitle,
  contact,
}: SiteFooterProps) {
  return (
    <footer className="site-footer">
      <Container className="site-footer-inner">
        <div className="site-footer-brand">
          <TbdCareLogo className="site-footer-logo" title={siteName} />
          <p className="site-footer-lede">{siteDescription}</p>
        </div>
        <div className="site-footer-nav">
          <p className="site-footer-label">{footerNavTitle}</p>
          <SiteNav
            ariaLabel="Footer navigation"
            items={footerNav}
            listClassName="site-footer-links"
          />
        </div>
        <div className="site-footer-contact">
          <p className="site-footer-label">{contact.title}</p>
          <ul className="site-footer-contact-list">
            <li>
              <a href={contact.phoneHref} className="site-footer-contact-link">
                <Phone strokeWidth={2} className="site-footer-contact-icon" aria-hidden="true" />
                <span>{contact.phone}</span>
              </a>
            </li>
            <li>
              <a href={contact.emailHref} className="site-footer-contact-link">
                <Mail strokeWidth={2} className="site-footer-contact-icon" aria-hidden="true" />
                <span>{contact.email}</span>
              </a>
            </li>
            <li>
              <p className="site-footer-contact-link">
                <MapPin strokeWidth={2} className="site-footer-contact-icon" aria-hidden="true" />
                <span>{contact.address}</span>
              </p>
            </li>
          </ul>
          <p className="site-footer-label site-footer-label--social">{contact.socialLabel}</p>
          <ul className="site-footer-social">
            {contact.social.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  className="site-footer-social-link"
                  aria-label={item.label}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noreferrer noopener" : undefined}
                >
                  <FooterSocialIcon id={item.id} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
