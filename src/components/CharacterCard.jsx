import SmartImage from "./SmartImage";

export default function CharacterCard({ character, onView }) {
  const { name, nickname, role, roleType, summary, tags, theme, image, art, placeholder } = character;
  return (
    <article
      className={`char-card ${placeholder ? "char-card--placeholder" : ""}`}
      style={{ "--accent": theme.accent, "--card-bg": theme.bg }}
    >
      <div className="char-card__art">
        <SmartImage
          src={image}
          fallback={art}
          alt={`Placeholder illustration for ${nickname || name}`}
        />
        <span className="char-card__badge">{roleType}</span>
      </div>
      <div className="char-card__body">
        <h3>{name}</h3>
        {nickname && <p className="char-card__nick">“{nickname}”</p>}
        <p className="char-card__role">{role}</p>
        <p className="char-card__summary">{summary}</p>
        <ul className="tag-list" aria-label="Personality tags">
          {tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
        <button
          type="button"
          className="btn btn--accent"
          onClick={() => onView(character)}
          aria-haspopup="dialog"
        >
          {placeholder ? "View Details" : "View Character"}
        </button>
      </div>
    </article>
  );
}
