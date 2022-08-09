// @ts-check

class ImagePreview extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    const wrapper = document.createElement("div");
    wrapper.classList.add("image-preview");

    // Create the image
    const img = document.createElement("img");
    img.src = this.getAttribute("src");
    wrapper.append(img);

    // Create the description under the image
    const description = document.createElement("div");
    description.classList.add("image-preview-desc");
    wrapper.append(description);

    const p = document.createElement("p");
    description.append(p);

    const slot = document.createElement("slot");
    p.append(slot);

    // Create local style
    const style = document.createElement("link");
    style.rel = "stylesheet";
    style.href = "/src/components/ImagePreview.css";

    this.shadowRoot.append(style, wrapper);
  }
}

window.customElements.define("image-preview", ImagePreview);