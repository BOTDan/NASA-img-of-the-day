// @ts-check

import { createSlot } from "../helper.mjs";

/**
 * A card for displaying errors to the user
 * Use the title and description slots for displaying the error
 */
export class ErrorCard extends HTMLElement {
  #hidden = false;
  #wrapper;

  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    this.#wrapper = document.createElement("div");
    this.#wrapper.classList.add("error-card");

    createSlot(this.#wrapper, "title").classList.add("title");
    createSlot(this.#wrapper, "description").classList.add("description");

    // Create local style
    const style = document.createElement("link");
    style.rel = "stylesheet";
    style.href = "/src/components/ErrorCard.css";

    this.shadowRoot.append(style, this.#wrapper);
  }

  /**
   * Sets if this card should be hidden or not
   */
  set hidden(isHidden) {
    this.#hidden = isHidden;
    if (isHidden) {
      this.#wrapper.classList.add("hidden");
    } else {
      this.#wrapper.classList.remove("hidden");
    }
  }

  /**
   * Returns if this card is hidden
   */
  get hidden() {
    return this.#hidden;
  }

  /**
   * Called whenever an attribute changes that we're watching
   * @param {string} name The name of the attrobute
   * @param {string} oldValue The old value
   * @param {string} newValue The new value
   */
  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "hidden": {
        this.hidden = (newValue && newValue !== "" && newValue !== "false");
      }
    }
  }

  /**
   * Returns a list of attributes to watch for changes
   */
  static get observedAttributes() {
    return ["hidden"];
  }
}

window.customElements.define("error-card", ErrorCard);