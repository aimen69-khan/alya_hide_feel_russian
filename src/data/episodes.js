// ─────────────────────────────────────────────────────────────
//  EPISODE DATA
//  No episode titles or summaries have been invented.
//  Fill in `title`, `summary` and (optionally) `thumbnail` once verified.
//  While `title`/`summary` are null the UI shows
//  "Episode information coming soon."
//  Add another season by adding another object to `seasons`.
//  NOTE: the number of slots below is a placeholder. Adjust it to match
//  the real episode count.
// ─────────────────────────────────────────────────────────────
const slots = (count) =>
  Array.from({ length: count }, (_, i) => ({
    number: i + 1,
    title: null,
    summary: null,
    thumbnail: null,
  }));

export const seasons = [
  {
    id: "s1",
    label: "Season 1",
    episodes: slots(12),
  },
];
