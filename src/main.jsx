import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/global.css";
import "./styles/navbar.css";
import "./styles/hero.css";
import "./styles/info.css";
import "./styles/characters.css";
import "./styles/relationships.css";
import "./styles/story.css";
import "./styles/episodes.css";
import "./styles/gallery.css";
import "./styles/footer.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
