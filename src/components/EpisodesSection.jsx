import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import SmartImage from "./SmartImage";
import Reveal from "./Reveal";
import { seasons } from "../data/episodes";

const COMING_SOON = "Episode information coming soon.";

function EpisodeCard({ episode, open, onToggle }) {
  const panelId = `episode-panel-${episode.number}`;
  return (
    <article className={`episode ${open ? "is-open" : ""}`}>
      <div className="episode__row">
        <span className="episode__num" aria-hidden="true">
          {String(episode.number).padStart(2, "0")}
        </span>
        <div className="episode__main">
          <h3>
            <span className="sr-only">Episode {episode.number}: </span>
            {episode.title || `Episode ${episode.number}`}
          </h3>
          <p>{episode.summary || COMING_SOON}</p>
        </div>
        <button
          type="button"
          className="btn btn--small"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
        >
          Details
          <ChevronDown size={16} aria-hidden="true" className="episode__chev" />
        </button>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            className="episode__details"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="episode__details-inner">
              {episode.thumbnail && (
                <SmartImage
                  src={episode.thumbnail}
                  alt={`Thumbnail for episode ${episode.number}`}
                  className="episode__thumb"
                />
              )}
              <div>
                <p className="episode__label">Episode {episode.number}</p>
                <p>{episode.summary || COMING_SOON}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}

export default function EpisodesSection() {
  const [seasonId, setSeasonId] = useState(seasons[0].id);
  const [openNumber, setOpenNumber] = useState(null);
  const season = seasons.find((s) => s.id === seasonId);

  const pickSeason = (id) => {
    setSeasonId(id);
    setOpenNumber(null);
  };

  return (
    <section id="episodes" className="section episodes" aria-labelledby="episodes-title">
      <div className="container">
        <Reveal className="section-head">
          <h2 id="episodes-title">Episodes</h2>
          <p>
            Titles and summaries are added only once they are verified, so you won't see guesses here. This site does
            not host or embed any video.
          </p>
        </Reveal>

        <div className="episodes__seasons" role="group" aria-label="Choose a season">
          {seasons.map((s) => (
            <button
              key={s.id}
              type="button"
              className={`chip ${seasonId === s.id ? "is-active" : ""}`}
              aria-pressed={seasonId === s.id}
              onClick={() => pickSeason(s.id)}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className="episodes__list">
          {season.episodes.map((ep) => (
            <EpisodeCard
              key={`${season.id}-${ep.number}`}
              episode={ep}
              open={openNumber === ep.number}
              onToggle={() => setOpenNumber(openNumber === ep.number ? null : ep.number)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
