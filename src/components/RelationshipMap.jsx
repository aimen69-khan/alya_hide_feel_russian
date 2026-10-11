import { useState } from "react";
import SmartImage from "./SmartImage";
import Reveal from "./Reveal";
import { characters, relationships } from "../data/characters";

// Node positions as percentages of the map box.
const POS = {
  alya: [18, 22],
  masachika: [82, 22],
  masha: [18, 78],
  yuki: [82, 78],
};

const byId = Object.fromEntries(characters.map((c) => [c.id, c]));
const nodeIds = Object.keys(POS);

const pointOn = (edge) => {
  const [x1, y1] = POS[edge.from];
  const [x2, y2] = POS[edge.to];
  return [x1 + (x2 - x1) * edge.t, y1 + (y2 - y1) * edge.t];
};

export default function RelationshipMap() {
  const [activeId, setActiveId] = useState(relationships[0].id);
  const active = relationships.find((r) => r.id === activeId);

  return (
    <section id="relationships" className="section rel" aria-labelledby="rel-title">
      <div className="container">
        <Reveal className="section-head">
          <h2 id="rel-title">Behind Every Secret, There's a Connection</h2>
          <p>Hover, focus or tap a glowing dot to read how two characters are linked.</p>
        </Reveal>

        {/* Desktop / tablet: connected map */}
        <div className="rel__map">
          <svg className="rel__lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            {relationships.map((edge) => {
              const [x1, y1] = POS[edge.from];
              const [x2, y2] = POS[edge.to];
              return (
                <line
                  key={edge.id}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  className={`rel__line ${activeId === edge.id ? "is-active" : ""}`}
                  vectorEffect="non-scaling-stroke"
                />
              );
            })}
          </svg>

          {nodeIds.map((id) => {
            const c = byId[id];
            return (
              <div
                key={id}
                className="rel__node"
                style={{ left: `${POS[id][0]}%`, top: `${POS[id][1]}%`, "--accent": c.theme.accent }}
              >
                <SmartImage src={c.image} fallback={c.art} alt={`Placeholder illustration for ${c.nickname || c.name}`} />
                <span>{c.nickname || c.name}</span>
              </div>
            );
          })}

          {relationships.map((edge) => {
            const [x, y] = pointOn(edge);
            return (
              <button
                key={edge.id}
                type="button"
                className={`rel__dot ${activeId === edge.id ? "is-active" : ""}`}
                style={{ left: `${x}%`, top: `${y}%` }}
                onMouseEnter={() => setActiveId(edge.id)}
                onFocus={() => setActiveId(edge.id)}
                onClick={() => setActiveId(edge.id)}
                aria-label={`${edge.title}: ${edge.label}`}
                aria-pressed={activeId === edge.id}
              >
                <span className="rel__dot-label">{edge.label}</span>
              </button>
            );
          })}
        </div>

        <div className="rel__panel" role="status" aria-live="polite">
          <h3>{active.title}</h3>
          <p>{active.text}</p>
        </div>

        {/* Small screens: stacked cards */}
        <ul className="rel__stack">
          {relationships.map((edge) => (
            <li key={edge.id} className="rel__card">
              <h3>{edge.title}</h3>
              <p className="rel__card-label">{edge.label}</p>
              <p>{edge.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
