import { BookOpen, Clapperboard, Heart, Languages, Palette, Tags, Tv } from "lucide-react";
import Reveal from "./Reveal";
import { ANIME_TITLE } from "../config";

const details = [
  { icon: Tv, label: "Title", value: ANIME_TITLE },
  { icon: Languages, label: "Japanese title", value: "Tokidoki Bosotto Russia-go de Dereru Tonari no Alya-san" },
  { icon: Tags, label: "Genre", value: "Romantic Comedy, School, Slice of Life" },
  { icon: Heart, label: "Main theme", value: "Secret affection, student council politics, friendship, family, and romance" },
];

export default function AnimeInfo() {
  return (
    <section id="about" className="section info" aria-labelledby="info-title">
      <div className="container">
        <Reveal className="section-head">
          <h2 id="info-title">About the series</h2>
          <p>The story began on the page. The anime is a separate adaptation of it.</p>
        </Reveal>

        <div className="info__grid">
          {details.map(({ icon: Icon, label, value }, i) => (
            <Reveal key={label} delay={i * 0.06} className="info-card">
              <Icon size={22} aria-hidden="true" />
              <div>
                <h3>{label}</h3>
                <p>{value}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="info__split">
          <Reveal className="origin origin--novel">
            <BookOpen size={26} aria-hidden="true" />
            <h3>The original light novel</h3>
            <dl>
              <dt>Original work</dt>
              <dd>Light novel series by Sunsunsun</dd>
              <dt>Illustrations</dt>
              <dd>Momoco</dd>
            </dl>
          </Reveal>
          <Reveal className="origin origin--anime" delay={0.08}>
            <Clapperboard size={26} aria-hidden="true" />
            <h3>The anime adaptation</h3>
            <dl>
              <dt>Format</dt>
              <dd>Television anime</dd>
              <dt>Produced by</dt>
              <dd>Doga Kobo</dd>
            </dl>
          </Reveal>
        </div>
        <p className="info__note">
          <Palette size={16} aria-hidden="true" /> Release dates, awards and further credits are left out until they
          can be verified.
        </p>
      </div>
    </section>
  );
}
