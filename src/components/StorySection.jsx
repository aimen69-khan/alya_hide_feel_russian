import { Crown, Languages, Users } from "lucide-react";
import SmartImage from "./SmartImage";
import Reveal from "./Reveal";
import { makeArt } from "../utils/art";
import { scrollToId } from "../utils/scroll";


const panels = [
  {
    icon: Crown,
    title: "The Icy Princess",
    text: "Alya's cool demeanor hides a softer side.",
    image: "./alya.png",
    alt: "Alya standing alone in the snow",
    art: makeArt({
      w: 800,
      h: 640,
      scale: 2.4,
      c1: "#3A6DB8",
      c2: "#101A36",
      label: "The Icy Princess · placeholder",
      people: [{ x: 0.5, hair: "#E9EEF8", uniform: "#1A2650", eye: "#4F9BE0" }],
    }),
  },
  {
    icon: Languages,
    title: "The Secret Language",
    text: "Her Russian whispers reveal feelings she struggles to express.",
    image: "/g6.png",
    alt: "Alya and Masachika seated side by side",
    art: makeArt({
      w: 800,
      h: 640,
      scale: 2.2,
      c1: "#5A4FB0",
      c2: "#161236",
      label: "The Secret Language · placeholder",
      people: [
        { x: 0.36, hair: "#E9EEF8", uniform: "#1A2650", eye: "#4F9BE0" },
        { x: 0.64, hair: "#1E2438", uniform: "#27345C", eye: "#8FA3D6", long: false },
      ],
    }),
  },
  {
    icon: Users,
    title: "The Student Council",
    text: "Ambition, competition, friendship, and family expectations complicate their lives.",
    image: "/g9.png",
    alt: "Students gathered in front of the school",
    art: makeArt({
      w: 800,
      h: 640,
      scale: 1.7,
      scene: true,
      c1: "#25376E",
      c2: "#0B1328",
      label: "The Student Council · placeholder",
      people: [
        { x: 0.25, hair: "#E9EEF8", uniform: "#1A2650", eye: "#4F9BE0" },
        { x: 0.5, hair: "#2A1F4A", uniform: "#3A2570", eye: "#B79BFF" },
        { x: 0.75, hair: "#1E2438", uniform: "#27345C", eye: "#8FA3D6", long: false },
      ],
    }),
  },
];

export default function StorySection() {
  return (
    <section id="story" className="section story" aria-labelledby="story-title">
      <div className="container">
        <Reveal className="story__intro">
          <h2 id="story-title">A Secret Spoken in Russian</h2>
          <p>
            Alya is a talented student known for her beauty, intelligence, and icy attitude. Sitting beside her is
            Masachika Kuze, a seemingly unmotivated classmate who understands far more than she suspects. When Alya
            quietly expresses her affection in Russian, she believes her words are safe. What she doesn't know is
            that Masachika understands every word.
          </p>
        </Reveal>

        <div className="story__panels">
          {panels.map(({ icon: Icon, title, text, alt, art, image }, i) => (
            <Reveal key={title} delay={i * 0.12} className="panel" y={40}>
              <div className="panel__art">
                <SmartImage src={image} fallback={art} alt={alt} />
                <span className="panel__icon">
                  <Icon size={22} aria-hidden="true" />
                </span>
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
            </Reveal>
          ))}
        </div>

        <div className="story__cta">
          <button type="button" className="btn btn--primary" onClick={() => scrollToId("characters")}>
            Meet the Characters
          </button>
        </div>
      </div>
    </section>
  );
}