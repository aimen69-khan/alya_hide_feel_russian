import { makeArt } from "../utils/art";

const portrait = (opts, label) => makeArt({ w: 800, h: 1000, label, ...opts });
const landscape = (opts, label) => makeArt({ w: 900, h: 600, scale: 2.3, label, ...opts });

const ALYA = { hair: "#E9EEF8", uniform: "#1A2650", eye: "#4F9BE0" };
const MASHA = { hair: "#F4B9D0", uniform: "#4B2B63", eye: "#D9789F" };
const MASA = { hair: "#1E2438", uniform: "#27345C", eye: "#8FA3D6", long: false };
const YUKI = { hair: "#2A1F4A", uniform: "#3A2570", eye: "#B79BFF" };

export const galleryItems = [
  {
    id: "g1",
    title: "Alya, cool and composed",
    category: "Alya",
    size: "tall",
    credit: "Placeholder illustration",
    alt: "Placeholder illustration of a silver-haired girl in a navy school uniform against a snowy blue sky",
    src: './g1.png',
    art: portrait({ c1: "#3A6DB8", c2: "#101A36", people: [{ x: 0.5, ...ALYA }] }, "Alya · placeholder"),
  },
  {
    id: "g2",
    title: "Alya and Masachika",
    category: "Together",
    size: "wide",
    credit: "Placeholder illustration",
    alt: "Placeholder illustration of a silver-haired girl standing beside a dark-haired boy in school uniforms",
    src: './g2.png',
    art: landscape({ c1: "#3F6AA8", c2: "#101A36", people: [{ x: 0.36, ...ALYA }, { x: 0.64, ...MASA }] }, "Alya & Masachika · placeholder"),
  },
  {
    id: "g3",
    title: "Masha's gentle smile",
    category: "Masha",
    size: "std",
    credit: "Placeholder illustration",
    alt: "Placeholder illustration of a pink-haired girl in a purple school uniform",
    src: './g3.png',
    art: landscape({ c1: "#B8709E", c2: "#2A1A45", scale: 2.5, people: [{ x: 0.5, ...MASHA }] }, "Masha · placeholder"),
  },
  {
    id: "g4",
    title: "Yuki, mischief afoot",
    category: "Yuki",
    size: "tall",
    credit: "Placeholder illustration",
    alt: "Placeholder illustration of a dark-haired girl with violet eyes in an elegant uniform",
    src: './g4.png',
    art: portrait({ c1: "#6A48B8", c2: "#161236", people: [{ x: 0.5, ...YUKI }] }, "Yuki · placeholder"),
  },
  {
    id: "g5",
    title: "A student council gathering",
    category: "Student council",
    size: "wide",
    credit: "Placeholder illustration",
    alt: "Placeholder illustration of four students in school uniforms standing together",
    src: './g5.png',
    art: landscape(
      { c1: "#34508F", c2: "#101A36", scale: 1.7, people: [{ x: 0.2, ...ALYA }, { x: 0.4, ...MASA }, { x: 0.6, ...YUKI }, { x: 0.8, ...MASHA }] },
      "Student council · placeholder"
    ),
  },
  {
    id: "g6",
    title: "School at dusk",
    category: "Backgrounds",
    size: "std",
    credit: "Placeholder illustration",
    alt: "Placeholder illustration of a school building with lit windows under a pale moon",
    src: './g6.png',
    art: landscape({ c1: "#25376E", c2: "#0B1328", scene: true, people: [] }, "School · placeholder"),
  },
  {
    id: "g7",
    title: "Snowy walk home",
    category: "Romance",
    size: "std",
    credit: "Placeholder illustration",
    alt: "Placeholder illustration of two students side by side in falling snow",
    src: './alya.png',
    art: landscape({ c1: "#5A6FB5", c2: "#161236", people: [{ x: 0.42, ...ALYA }, { x: 0.58, ...MASA }] }, "Winter walk · placeholder"),
  },
  {
    id: "g8",
    title: "Classroom comedy",
    category: "Comedy",
    size: "std",
    credit: "Placeholder illustration",
    alt: "Placeholder illustration of a dark-haired boy and a violet-eyed girl in a school scene",
    src: './g8.png',
    art: landscape({ c1: "#4B3A98", c2: "#101A36", scene: true, scale: 2, people: [{ x: 0.35, ...MASA }, { x: 0.65, ...YUKI }] }, "Comedy · placeholder"),
  },
];
