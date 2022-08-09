import { createEl } from "../helper.mjs";

/**
 * A button that displays a loading indicator when clicked.
 * Pass in an async function to the onclick to make use of.
 */
export class LoadingButton extends HTMLElement {
  #button;
  #loading = false;
  /** @type {(event: MouseEvent) => void} */
  #onClick = () => {};

  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    // Create the button
    this.#button = createEl("button", this.shadowRoot, "loading-button");
    this.#button.textContent = "Load More...";

    // Create local style
    const style = document.createElement("link");
    style.rel = "stylesheet";
    style.href = "/src/components/LoadingButton.css";

    this.shadowRoot.append(style);

    this.handleOnClick = this.handleOnClick.bind(this);
  }

  /**
   * Called when the component is displayed
   */
  connectedCallback() {
    this.#button.addEventListener("click", this.handleOnClick);
  }

  /**
   * Called when the component is destroyed
   */
  disconnectedCallback() {
    this.#button.removeEventListener("click", this.handleOnClick);
  }

  /**
   * Sets if this button is currently loading or not
   */
  set loading(isLoading) {
    this.#loading = isLoading;
    if (isLoading) {
      this.#button.classList.add("loading");
      // this.#button.setAttribute("disabled", "");
      this.#button.disabled = true;
      this.#button.ariaDisabled = "true";
    } else {
      this.#button.classList.remove("loading");
      this.#button.removeAttribute("disabled");
      this.#button.ariaDisabled = "false";
    }
  }

  /**
   * Is this button loading?
   */
  get loading() {
    return this.#loading;
  }

  /**
   * Sets the onclick function internally
   */
  set onclick(func) {
    this.#onClick = func;
  }

  /**
   * Returns the handled onClick function
   */
  get onclick() {
    return this.handleOnClick;
  }

  /**
   * Handles when the button is clicked
   * @private
   * @param {MouseEvent} event The mouse eevent
   */
  async handleOnClick(event) {
    console.log("Handling")
    this.loading = true;
    await this.#onClick(event);
    this.loading = false;
  }

  /**
   * Called whenever an attribute changes that we're listening for
   * @param {string} name The name of the attribute
   * @param {any} oldValue The old value
   * @param {any} newValue The new value
   */
  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "onclick": {
        this.#onClick = newValue;
      }
    }
  }

  /**
   * Returns a list of attributes to watch for changes
   */
  static get observedAttributes() {
    return ["onclick"];
  }
}

window.customElements.define("loading-button", LoadingButton);