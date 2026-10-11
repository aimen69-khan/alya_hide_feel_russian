import { motion } from "framer-motion";
import { X } from "lucide-react";
import SmartImage from "./SmartImage";
import { useModal } from "../hooks/useModal";

const TODO = "To be added. Edit this entry in src/data/characters.js.";

function ListBlock({ title, items }) {
  return (
    <section className="modal__block">
      <h4>{title}</h4>
      {items && items.length ? (
        <ul>
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : (
        <p className="modal__todo">{TODO}</p>
      )}
    </section>
  );
}

export default function CharacterModal({ character, onClose }) {
  const ref = useModal(onClose);
  const { name, nickname, role, caption, background, appearance, personality, relationships, theme, image, art } =
    character;

  return (
    <motion.div
      className="modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        ref={ref}
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="char-modal-title"
        tabIndex={-1}
        style={{ "--accent": theme.accent, "--card-bg": theme.bg }}
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ duration: 0.3 }}
      >
        <button type="button" className="modal__close" onClick={onClose} aria-label="Close character details">
          <X size={22} />
        </button>

        <div className="modal__art">
          <SmartImage src={image} fallback={art} alt={`Placeholder illustration for ${nickname || name}`} />
        </div>

        <div className="modal__content">
          <h3 id="char-modal-title">{name}</h3>
          {nickname && <p className="modal__nick">Known as “{nickname}”</p>}
          <p className="modal__role">{role}</p>
          {caption && <p className="modal__caption">“{caption}”</p>}

          <section className="modal__block">
            <h4>Background</h4>
            <p>{background || <span className="modal__todo">{TODO}</span>}</p>
          </section>
          <ListBlock title="Appearance" items={appearance} />
          <ListBlock title="Personality" items={personality} />

          <section className="modal__block">
            <h4>Relationships</h4>
            {relationships && relationships.length ? (
              <ul className="modal__rels">
                {relationships.map((r) => (
                  <li key={r.with}>
                    <strong>{r.with}</strong>
                    <span>{r.text}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="modal__todo">{TODO}</p>
            )}
          </section>
        </div>
      </motion.div>
    </motion.div>
  );
}
