import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import SmartImage from "./SmartImage";
import Reveal from "./Reveal";
import { useModal } from "../hooks/useModal";
import { galleryItems } from "../data/gallery";

function Lightbox({ index, onClose, onChange }) {
  const ref = useModal(onClose);
  const total = galleryItems.length;
  const item = galleryItems[index];

  const prev = useCallback(() => onChange((index - 1 + total) % total), [index, total, onChange]);
  const next = useCallback(() => onChange((index + 1) % total), [index, total, onChange]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [prev, next]);

  return (
    <motion.div
      className="modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div ref={ref} className="lightbox" role="dialog" aria-modal="true" aria-label="Image viewer" tabIndex={-1}>
        <button type="button" className="lightbox__close" onClick={onClose} aria-label="Close image viewer">
          <X size={24} />
        </button>
        <button type="button" className="lightbox__nav lightbox__nav--prev" onClick={prev} aria-label="Previous image">
          <ChevronLeft size={28} />
        </button>
        <figure className="lightbox__figure">
          <SmartImage key={item.id} src={item.src} fallback={item.art} alt={item.alt} eager className="lightbox__img" />
          <figcaption>
            <strong>{item.title}</strong>
            <span>
              {item.category} · {item.credit}
            </span>
            <span aria-live="polite">
              Image {index + 1} of {total}
            </span>
          </figcaption>
        </figure>
        <button type="button" className="lightbox__nav lightbox__nav--next" onClick={next} aria-label="Next image">
          <ChevronRight size={28} />
        </button>
      </div>
    </motion.div>
  );
}

export default function Gallery() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="gallery" className="section gallery" aria-labelledby="gallery-title">
      <div className="container">
        <Reveal className="section-head">
          <h2 id="gallery-title">Gallery</h2>
        </Reveal>

        <ul className="gallery__grid">
          {galleryItems.map((item, i) => (
            <li key={item.id} className={`gallery__item gallery__item--${item.size}`}>
              <button
                type="button"
                onClick={() => setOpenIndex(i)}
                aria-label={`Open image: ${item.title}`}
                aria-haspopup="dialog"
              >
                <SmartImage src={item.src} fallback={item.art} alt={item.alt} />
                <span className="gallery__cap">
                  <strong>{item.title}</strong>
                  <em>{item.category}</em>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <AnimatePresence>
        {openIndex !== null && (
          <Lightbox index={openIndex} onClose={() => setOpenIndex(null)} onChange={setOpenIndex} />
        )}
      </AnimatePresence>
    </section>
  );
}
