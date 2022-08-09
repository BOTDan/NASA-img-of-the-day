// @ts-check

import { createSlot } from "../helper.mjs";

export class ImagePreview extends HTMLElement {
  #img;

  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    const wrapper = document.createElement("div");
    wrapper.classList.add("image-preview");

    // Create the image
    this.#img = document.createElement("img");
    this.#img.src = this.getAttribute("src");
    wrapper.append(this.#img);

    // Create the description under the image
    const infoArea = document.createElement("div");
    infoArea.classList.add("image-preview-desc");
    wrapper.append(infoArea);

    createSlot(infoArea, "title").classList.add("title");
    createSlot(infoArea, "description").classList.add("description");
    createSlot(infoArea, "addendum").classList.add("addendum");

    // Create local style
    const style = document.createElement("link");
    style.rel = "stylesheet";
    style.href = "/src/components/ImagePreview.css";

    this.shadowRoot.append(style, wrapper);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "src": {
        this.#img.src = newValue;
      }
    }
  }

  static get observedAttributes() {
    return ["src"];
  }
}

window.customElements.define("image-preview", ImagePreview);