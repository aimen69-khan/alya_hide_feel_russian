import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import SmartImage from "./SmartImage";
import { characters } from "../data/characters";
import { scrollToId } from "../utils/scroll";

const alya = characters[0];

export default function Hero() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const artY = useTransform(scrollY, [0, 700], [0, 70]);
  const glowY = useTransform(scrollY, [0, 700], [0, -40]);

  return (
    <section id="home" className="hero">
      <div className="hero__bg" aria-hidden="true">
        <motion.div className="hero__orb" style={reduce ? undefined : { y: glowY }} />
        {Array.from({ length: 9 }, (_, i) => (
          <span key={i} className={`hero__spark hero__spark--${i + 1}`} />
        ))}
      </div>

      <div className="hero__inner container">
        <div className="hero__text">
          <motion.p
            className="hero__ru"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span lang="ru">Секреты сердца</span>
            <span className="hero__ru-sep" aria-hidden="true" />
            <span>Secrets of the Heart</span>
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="hero__title-main">Alya</span>{" "}
            <span className="hero__title-sub">Sometimes Hides Her Feelings in Russian</span>
          </motion.h1>

          <motion.p
            className="hero__subtitle"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            An icy beauty, a secret language, and a love she can't quite say out loud.
          </motion.p>

          <motion.p
            className="hero__desc"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Meet Alisa Mikhailovna Kujou, the silver-haired student who keeps her feelings hidden behind a cool
            expression — except when her Russian whispers reveal what is really in her heart.
          </motion.p>

          <motion.div
            className="hero__actions"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <button type="button" className="btn btn--primary" onClick={() => scrollToId("characters")}>
              Explore Characters
            </button>
            <button type="button" className="btn btn--ghost" onClick={() => scrollToId("story")}>
              Discover the Story
            </button>
          </motion.div>
        </div>

        <motion.div
          className="hero__art"
          style={reduce ? undefined : { y: artY }}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <div className="hero__frame">
            <SmartImage
              src={alya.image}
              fallback={alya.art}
              alt="Placeholder illustration of Alya, a silver-haired student in a navy school uniform"
              eager
            />
            <div className="hero__frame-shade" aria-hidden="true" />
          </div>
          <p className="hero__caption" lang="en">
            “{alya.caption}”
          </p>
        </motion.div>
      </div>
    </section>
  );
}
