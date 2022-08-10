// @ts-check

import { createSlot } from "../helper.mjs";

/**
 * A card with an image and space for a title, description and addendum about the image.
 * Use the title, description and addendum slots for content
 */
export class ImageCard extends HTMLElement {
  #src = '';
  #img;
  #imgContainer;

  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    const wrapper = document.createElement("div");
    wrapper.classList.add("image-card");

    // Create the image
    const src = this.getAttribute("src");
    this.#imgContainer = document.createElement("div");
    this.#imgContainer.classList.add("image-card-img");
    this.#imgContainer.setAttribute("style", `--src: url(${src})`);
    wrapper.append(this.#imgContainer);

    this.#img = document.createElement("img");
    this.#img.src = src;
    this.#imgContainer.append(this.#img);

    // Create the description under the image
    const infoArea = document.createElement("div");
    infoArea.classList.add("image-card-desc");
    wrapper.append(infoArea);

    createSlot(infoArea, "title").classList.add("title");
    createSlot(infoArea, "description").classList.add("description");
    createSlot(infoArea, "addendum").classList.add("addendum");

    // Create local style
    const style = document.createElement("link");
    style.rel = "stylesheet";
    style.href = "/src/components/ImageCard.css";

    this.shadowRoot.append(style, wrapper);
  }

  /**
   * Sets the source for the img
   */
  set src(url) {
    this.#img.src = url;
    this.#imgContainer.setAttribute("style", `--src: url(${url})`);
  }

  /**
   * Gtes the source of the image
   */
  get src() {
    return this.#src;
  }

  /**
   * Sets the alt text of the image
   */
  set alt(text) {
    this.#img.alt = text;
  }

  /**
   * Gets the alt text of the image
   */
  get alt() {
    return this.#img.alt;
  }

  /**
   * Called whenever an attribute changes that we're watching
   * @param {string} name The name of the attrobute
   * @param {string} oldValue The old value
   * @param {string} newValue The new value
   */
  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "src": {
        this.src = newValue;
      }
      case "alt": {
        this.alt = newValue;
      }
    }
  }

  /**
   * Returns a list of attributes to watch for changes
   */
  static get observedAttributes() {
    return ["src", "alt"];
  }
}

window.customElements.define("image-card", ImageCard);