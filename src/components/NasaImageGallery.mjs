// @ts-check

import { getPictureOfTheDay } from "../api/nasa.mjs";
import { createSlotContent } from "../helper.mjs";
import "./ImageCard.mjs";
import "./LoadingButton.mjs";
import "./ErrorCard.mjs";

/**
 * An image gallery displaying NASA pictures of the day
 */
class NasaImageGallery extends HTMLElement {
  #grid;
  #error;
  #errorDesc;
  #loadMore;

  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    const wrapper = document.createElement("div");
    wrapper.classList.add("nasa-image-gallery");

    this.#grid = document.createElement("div");
    this.#grid.classList.add("grid");
    wrapper.append(this.#grid);

    this.#error = document.createElement("error-card");
    this.#error.setAttribute("hidden", "true");
    wrapper.append(this.#error);

    createSlotContent(this.#error, "title", "p", "There was an error loading images");
    this.#errorDesc = createSlotContent(this.#error, "description", "p");

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

  /**
   * Loads a new set of images from the API and appends them to the list
   * @param {number} [count] The amount of image to load
   */
  async loadImages(count=10) {
    this.setError(false);
    this.#loadMore.setAttribute("loading", "true");
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
      this.setError(e);
    }
    this.#loadMore.removeAttribute("loading");
  }

  /**
   * Sets if there's an error on this component
   * @param {any} [error] The error
   */
  setError(error) {
    if (!error) {
      this.#error.setAttribute("hidden", "true");
    } else {
      this.#error.removeAttribute("hidden");
      this.#errorDesc.textContent = `${error}`;
    }
  }
}

window.customElements.define("nasa-image-gallery", NasaImageGallery);