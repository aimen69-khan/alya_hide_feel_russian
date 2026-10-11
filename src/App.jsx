import { MotionConfig } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AnimeInfo from "./components/AnimeInfo";
import CharacterSection from "./components/CharacterSection";
import RelationshipMap from "./components/RelationshipMap";
import StorySection from "./components/StorySection";
import EpisodesSection from "./components/EpisodesSection";
import Gallery from "./components/Gallery";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import Snowfall from "./components/Snowfall";

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="starfield" aria-hidden="true" />
      <Snowfall />
      <Navbar />
      <main id="main" className="page">
        <Hero />
        <AnimeInfo />
        <CharacterSection />
        <RelationshipMap />
        <StorySection />
        <EpisodesSection />
        <Gallery />
      </main>
      <Footer />
      <BackToTop />
    </MotionConfig>
  );
}
