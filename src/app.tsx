import React from "react";
import { ImageSearchForm } from "./modules/image-search-form";
import { GiphyImageService } from "./services/image-search";

import "./app.css";

const giphySearchFactory = () => new GiphyImageService();

export const App: React.FC = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", maxWidth: "650px", margin: "auto" }}>
      <header>
        <h2>{"Giphy search"}</h2>
      </header>
      <ImageSearchForm getSearchService={giphySearchFactory} />
    </div>
  );
};
