# Alya Fan Site (unofficial)

A React + Vite fan site for *Alya Sometimes Hides Her Feelings in Russian*:
hero, series info, character gallery with search/filter/modal, relationship map,
story, episodes, lightbox gallery and a configurable "Watch the Anime" footer.

## Run it

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).
Build for production with `npm run build` and preview with `npm run preview`.

## Add your streaming link

Open `src/config.js` and set:

```js
export const WATCH_ANIME_URL = "https://your-streaming-link";
```

- Valid http(s) URL: the footer shows **▶ Watch the Anime**, opening in a new tab with `rel="noopener noreferrer"`.
- Empty: the footer shows "Anime link coming soon — check back later!"

The "Watch Anime" navbar item scrolls to this footer section.

## Replace the placeholder art

All images are original generated placeholders, not official artwork.
Put your own licensed images in `public/` (e.g. `public/alya.jpg`) and reference them:

- Characters: set `image: "/alya.jpg"` in `src/data/characters.js`
- Gallery: set `src: "/gallery-1.jpg"` in `src/data/gallery.js`
- Episodes: set `thumbnail` in `src/data/episodes.js`

If an image fails to load, the placeholder is shown automatically.

## Fill in episodes

`src/data/episodes.js` contains empty slots. No titles or summaries were invented.
Add verified `title` and `summary` values per episode; until then the UI says
"Episode information coming soon." The slot count (12) is a placeholder, so
set it to the real episode count. Add more seasons as extra objects in `seasons`.

## Add characters

Copy an object in `src/data/characters.js`. Cards, search, filters and the modal
update automatically. The "Takeshi Maruyama & supporting classmates" entry is a
deliberate placeholder with `null` fields, so no biography is made up.

## Structure

```
src/
  components/   Navbar, Hero, AnimeInfo, CharacterSection/Card/Modal,
                RelationshipMap, StorySection, EpisodesSection, Gallery,
                Footer, BackToTop (+ SmartImage, Reveal, Snowfall)
  data/         characters.js, episodes.js, gallery.js
  hooks/        useModal.js (focus trap, Escape, scroll lock)
  utils/        scroll.js, art.js (placeholder art generator)
  styles/       global + per-section CSS
  config.js     WATCH_ANIME_URL and nav items
```

## Accessibility and motion

Keyboard-operable menu, filters, modals and lightbox (Esc to close, arrow keys in the
lightbox), visible focus rings, skip link, and `prefers-reduced-motion` support
(snowfall off, animations minimised).

## Disclaimer

Unofficial fan-made site for informational and entertainment purposes. All rights to the
anime, characters and original materials belong to their respective copyright holders.
