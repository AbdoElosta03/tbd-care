import { PhoneScreens } from "@/components/home/phone-screens";
import { Container } from "@/components/layout/container";
import { getDictionary } from "@/i18n/get-dictionary";

/** App download block: store badges, rating, and phone mockups. */

function StoreBadgeIcon({ store }: { store: "apple" | "google" }) {
  if (store === "apple") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M1.337.924a1.486 1.486 0 0 0-.112.568v21.017c0 .217.045.419.124.6l11.155-11.087L1.337.924z" />
      <path fill="#34A853" d="M12.207 10.065l3.258-3.238L3.45.195a1.466 1.466 0 0 0-.946-.179l11.04 10.973z" />
      <path fill="#FBBC04" d="M12.207 12.132l-11 10.933c.298.036.612-.016.906-.183l13.324-7.54-3.23-3.21z" />
      <path fill="#EA4335" d="M22.018 13.298l-3.919 2.218-3.515-3.493 3.543-3.521 3.891 2.202a1.49 1.49 0 0 1 0 2.594z" />
    </svg>
  );
}

function RatingStars() {
  return (
    <span className="app-download-rating__stars" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, index) => (
        <svg key={index} viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 1.5l2.45 4.96 5.48.8-3.97 3.87.94 5.46L10 13.77l-4.9 2.82.94-5.46-3.97-3.87 5.48-.8L10 1.5z" />
        </svg>
      ))}
    </span>
  );
}

export async function AppSection() {
  const dict = await getDictionary();
  const { promo } = dict.app;

  return (
    <section id="app" className="story-app story-app--static app-download" aria-labelledby="app-title">
      <Container className="app-download__container">
        <div className="app-download__layout">
          <div className="app-download__copy">
            <h2 id="app-title">{promo.title}</h2>
            <p className="app-download__lede">
              {promo.descriptionBefore}
              <span className="app-download__highlight">{promo.descriptionHighlight}</span>
              {promo.descriptionAfter}
            </p>

            <div className="app-download-actions">
              <a
                className="app-download-badge"
                href={dict.app.storeLinks.appStore.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="app-download-badge__icon">
                  <StoreBadgeIcon store="apple" />
                </span>
                <span className="app-download-badge__text">
                  <span className="app-download-badge__eyebrow">{dict.app.storeLinks.appStore.eyebrow}</span>
                  <span className="app-download-badge__title">{dict.app.storeLinks.appStore.title}</span>
                </span>
              </a>
              <a
                className="app-download-badge"
                href={dict.app.storeLinks.playStore.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="app-download-badge__icon app-download-badge__icon--play">
                  <StoreBadgeIcon store="google" />
                </span>
                <span className="app-download-badge__text">
                  <span className="app-download-badge__eyebrow">{dict.app.storeLinks.playStore.eyebrow}</span>
                  <span className="app-download-badge__title">{dict.app.storeLinks.playStore.title}</span>
                </span>
              </a>
            </div>

            <p className="app-download-rating">
              <RatingStars />
              <span>
                <strong>{promo.ratingValue}</strong> {promo.ratingLabel}
              </span>
            </p>

            <ol className="app-a11y-features">
              {dict.app.features.map((feature) => (
                <li key={feature.id}>
                  <strong>{feature.title}</strong>: {feature.description}
                </li>
              ))}
            </ol>
          </div>

          <div className="app-download__visual">
            <PhoneScreens />
          </div>
        </div>
      </Container>
    </section>
  );
}
