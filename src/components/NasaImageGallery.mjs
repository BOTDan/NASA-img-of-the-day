// @ts-check

import { getPictureOfTheDay } from "../api/nasa.mjs";
import { createSlotContent } from "../helper.mjs";
import { ImagePreview } from "./ImagePreview.mjs";

class NasaImageGallery extends HTMLElement {
  #grid;

  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    this.#grid = document.createElement("div");
    this.#grid.classList.add("nasa-image-gallery");

    // Create local style
    const style = document.createElement("link");
    style.rel = "stylesheet";
    style.href = "/src/components/NasaImageGallery.css";

    this.shadowRoot.append(style, this.#grid);

    this.loadImages();
  }

  async loadImages(count=10) {
    try {
      const pictures = await getPictureOfTheDay(count);
      pictures.forEach((picture) => {
        const imagePreview = document.createElement("image-preview");
        imagePreview.setAttribute("src", picture.url);
        createSlotContent(imagePreview, "title", "p", picture.title);
        createSlotContent(imagePreview, "description", "p", picture.explanation);
        if (picture.copyright) {
          createSlotContent(imagePreview, "addendum", "p", picture.copyright);
        }

        this.#grid.append(imagePreview);
      })
    } catch (e) {
      // Error loading images
      console.error("There was an error loading images");
    }
  }
}

window.customElements.define("nasa-image-gallery", NasaImageGallery);