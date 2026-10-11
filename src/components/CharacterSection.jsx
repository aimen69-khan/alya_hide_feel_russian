import { useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import CharacterCard from "./CharacterCard";
import CharacterModal from "./CharacterModal";
import Reveal from "./Reveal";
import { characters, ROLE_FILTERS } from "../data/characters";

export default function CharacterSection() {
  const [query, setQuery] = useState("");
  const [role, setRole] = useState("All");
  const [selected, setSelected] = useState(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return characters.filter((c) => {
      const roleOk = role === "All" || c.roleType === role;
      if (!roleOk) return false;
      if (!q) return true;
      const haystack = [c.name, c.nickname, c.role, ...(c.tags || [])].filter(Boolean).join(" ").toLowerCase();
      return haystack.includes(q);
    });
  }, [query, role]);

  const reset = () => {
    setQuery("");
    setRole("All");
  };

  return (
    <section id="characters" className="section characters" aria-labelledby="characters-title">
      <div className="container">
        <Reveal className="section-head">
          <h2 id="characters-title">The people behind the secrets</h2>
          <p>Search by name or filter by role, then open a card for the full profile.</p>
        </Reveal>

        <div className="char-tools">
          <label className="char-search">
            <Search size={18} aria-hidden="true" />
            <span className="sr-only">Search characters by name</span>
            <input
              type="search"
              placeholder="Search characters by name"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
          <div className="char-filters" role="group" aria-label="Filter characters by role">
            {ROLE_FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                className={`chip ${role === f ? "is-active" : ""}`}
                aria-pressed={role === f}
                onClick={() => setRole(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <p className="sr-only" role="status" aria-live="polite">
          {results.length} {results.length === 1 ? "character" : "characters"} shown
        </p>

        {results.length ? (
          <div className="char-grid">
            {results.map((c) => (
              <CharacterCard key={c.id} character={c} onView={setSelected} />
            ))}
          </div>
        ) : (
          <div className="empty">
            <p>No characters match “{query}” in this role.</p>
            <button type="button" className="btn btn--ghost" onClick={reset}>
              Clear search and filters
            </button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selected && <CharacterModal key={selected.id} character={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}
