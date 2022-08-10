// @ts-check

import { createSlot } from "../helper.mjs";

export class ImagePreview extends HTMLElement {
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
    style.href = "/src/components/ImagePreview.css";

    this.shadowRoot.append(style, wrapper);
  }

  set src(url) {
    this.#img.src = url;
    this.#imgContainer.setAttribute("style", `--src: url(${url})`);
  }

  get src() {
    return this.#src;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "src": {
        this.src = newValue;
      }
    }
  }

  static get observedAttributes() {
    return ["src"];
  }
}

window.customElements.define("image-card", ImagePreview);