// Generates original placeholder illustrations as SVG data URIs.
// These are NOT official artwork. Replace them by setting `image` / `src`
// in src/data/*.js to your own licensed images (e.g. "/assets/alya.jpg").

const person = ({ x, hair, uniform, eye, long = true, skin = "#FBEFF3" }, w, h, scale) => {
  const cx = w * x;
  return `
  <g transform="translate(${cx} ${h}) scale(${scale})">
    <ellipse cx="0" cy="-180" rx="62" ry="66" fill="${hair}"/>
    ${
      long
        ? `<path d="M-62 -180 C-82 -100 -64 -40 -72 0 L72 0 C64 -40 82 -100 62 -180Z" fill="${hair}"/>`
        : ""
    }
    <rect x="-14" y="-125" width="28" height="44" fill="#F1D9E2"/>
    <path d="M-112 0 C-112 -70 -50 -92 0 -92 C50 -92 112 -70 112 0Z" fill="${uniform}"/>
    <path d="M-20 -92 L0 -60 L20 -92Z" fill="#F7FAFF" opacity=".92"/>
    <ellipse cx="0" cy="-163" rx="42" ry="50" fill="${skin}"/>
    <path d="M-47 -168 C-42 -224 42 -224 47 -168 C30 -190 10 -197 -6 -184 C-20 -195 -36 -187 -47 -168Z" fill="${hair}"/>
    <ellipse cx="-16" cy="-158" rx="6" ry="9" fill="${eye}"/>
    <ellipse cx="16" cy="-158" rx="6" ry="9" fill="${eye}"/>
    <path d="M-8 -134 Q0 -128 8 -134" stroke="#D98FA8" stroke-width="3" fill="none" stroke-linecap="round"/>
  </g>`;
};

const skyline = (w, h) => `
  <circle cx="${w * 0.8}" cy="${h * 0.2}" r="${w * 0.07}" fill="#F7FAFF" opacity=".85"/>
  <rect x="${w * 0.05}" y="${h * 0.42}" width="${w * 0.3}" height="${h * 0.6}" fill="#0B1328" opacity=".85"/>
  <rect x="${w * 0.3}" y="${h * 0.3}" width="${w * 0.4}" height="${h * 0.75}" fill="#0F1A38" opacity=".92"/>
  <rect x="${w * 0.66}" y="${h * 0.5}" width="${w * 0.3}" height="${h * 0.55}" fill="#0B1328" opacity=".85"/>
  ${Array.from({ length: 24 }, (_, i) => {
    const col = i % 6;
    const row = Math.floor(i / 6);
    return `<rect x="${w * 0.34 + col * w * 0.055}" y="${h * 0.36 + row * h * 0.09}" width="${w * 0.03}" height="${h * 0.045}" fill="#B9E5FF" opacity="${
      (i * 7) % 5 === 0 ? 0.15 : 0.6
    }"/>`;
  }).join("")}`;

export function makeArt({
  w = 800,
  h = 1000,
  c1 = "#2B4F8F",
  c2 = "#101A36",
  people = [],
  scale = 3.2,
  scene = false,
  label = "Artwork placeholder",
}) {
  let seed = 11;
  const rnd = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280);
  const flakes = Array.from({ length: 36 }, () => {
    const r = rnd() * 3 + 1;
    return `<circle cx="${(rnd() * w).toFixed(0)}" cy="${(rnd() * h).toFixed(0)}" r="${r.toFixed(1)}" fill="#DFF1FF" opacity="${(rnd() * 0.5 + 0.25).toFixed(2)}"/>`;
  }).join("");

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/>
    </linearGradient>
    <radialGradient id="glow" cx=".5" cy=".28" r=".6">
      <stop offset="0" stop-color="#B9E5FF" stop-opacity=".5"/><stop offset="1" stop-color="#B9E5FF" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#bg)"/>
  <rect width="${w}" height="${h}" fill="url(#glow)"/>
  ${flakes}
  ${scene ? skyline(w, h) : ""}
  ${people.map((p) => person(p, w, h, scale)).join("")}
  <rect x="${w / 2 - 130}" y="26" width="260" height="34" rx="17" fill="#101A36" opacity=".55"/>
  <text x="${w / 2}" y="49" text-anchor="middle" font-family="sans-serif" font-size="17" fill="#DFF1FF">${label}</text>
</svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}
