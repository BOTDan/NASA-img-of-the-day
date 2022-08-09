class Grid extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    const wrapper = document.createElement("div");
    wrapper.classList.add("grid");

    const slot = document.createElement("slot");
    wrapper.append(slot);

    // Create local style
    const style = document.createElement("link");
    style.rel = "stylesheet";
    style.href = "/src/components/Grid.css";

    this.shadowRoot.append(style, wrapper);
  }
}

window.customElements.define("grid-layout", Grid);