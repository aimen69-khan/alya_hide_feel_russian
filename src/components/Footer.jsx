import { Play } from "lucide-react";
import { ANIME_TITLE, NAV_ITEMS, WATCH_ANIME_URL } from "../config";
import { scrollToId, scrollToTop } from "../utils/scroll";

// Only real http(s) links are accepted, so a typo can never become a script URL.
const isValidUrl = (value) => {
  try {
    const u = new URL(value);
    return u.protocol === "https:" || u.protocol === "http:";
  } catch {
    return false;
  }
};

export default function Footer() {
  const hasLink = Boolean(WATCH_ANIME_URL) && isValidUrl(WATCH_ANIME_URL);
  const year = new Date().getFullYear();

  return (
    <footer id="watch" className="footer">
      <div className="footer__stars" aria-hidden="true" />
      <div className="container footer__inner">
        <div className="footer__cta">
          <h2>Ready to Enter Alya's World?</h2>
          <p>
            Want to watch {ANIME_TITLE}? Discover the story of Alya, Masachika, and their unforgettable school life.
          </p>
          {hasLink ? (
            <a className="btn btn--primary btn--large" href={WATCH_ANIME_URL} target="_blank" rel="noopener noreferrer">
              <Play size={20} aria-hidden="true" /> Watch the Anime
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          ) : (
            <p className="footer__soon" role="status">
              Anime link coming soon — check back later!
            </p>
          )}
        </div>

        <div className="footer__grid">
          <div className="footer__brand">
            <p className="footer__logo">
              ALYA <span aria-hidden="true">❄</span>
            </p>
            <p className="footer__title">{ANIME_TITLE}</p>
            <p className="footer__ru" lang="ru">
              Секреты сердца
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <ul className="footer__links">
              {NAV_ITEMS.filter((n) => n.id !== "watch").map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToId(item.id);
                    }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#home"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToTop();
                  }}
                >
                  Back to Top
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="footer__legal">
          <p>
            This is an unofficial fan-made website created for informational and entertainment purposes. All rights to
            the anime, characters, and original materials belong to their respective copyright holders.
          </p>
          <p>
            Character names, anime titles, and related intellectual property belong to their respective owners. © {year}{" "}
            Unofficial fan site. Not affiliated with the creators, publishers, or studio.
          </p>
        </div>
      </div>
    </footer>
  );
}
