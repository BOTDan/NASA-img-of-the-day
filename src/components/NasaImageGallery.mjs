// @ts-check

import { getPictureOfTheDay } from "../api/nasa.mjs";
import { createSlotContent } from "../helper.mjs";
import "./ImageCard.mjs";
import "./LoadingButton.mjs";

class NasaImageGallery extends HTMLElement {
  #grid;
  #loadMore;

  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    const wrapper = document.createElement("div");
    wrapper.classList.add("nasa-image-gallery");

    this.#grid = document.createElement("div");
    this.#grid.classList.add("nasa-image-gallery");
    wrapper.append(this.#grid);

    this.#loadMore = document.createElement("loading-button");
    this.#loadMore.onclick = async () => {
      await this.loadImages(10);
    }
    wrapper.append(this.#loadMore);

    // Create local style
    const style = document.createElement("link");
    style.rel = "stylesheet";
    style.href = "/src/components/NasaImageGallery.css";

    this.shadowRoot.append(style, wrapper);

    this.loadImages();
  }

  async loadImages(count=10) {
    this.#loadMore.setAttribute("disabled", "true");
    try {
      const pictures = await getPictureOfTheDay(count);
      pictures.forEach((picture) => {
        const imagePreview = document.createElement("image-card");
        imagePreview.setAttribute("src", picture.url);
        imagePreview.setAttribute("alt", picture.title);
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
    this.#loadMore.removeAttribute("disabled");
  }
}

window.customElements.define("nasa-image-gallery", NasaImageGallery);