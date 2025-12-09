export default class Modal {
  constructor(element, config = {}) {
    this.element = element;
    this.userConfig = config;
    this.#setConfig(this.userConfig);
    this.#buildModal();
    if (this.config.autofire) this.fire();
  }

  // CONFIG /////////////////////////////////////

  /*
   * All these values are modifiable through config object in constructor.
   * You can also set custom callbacks for onConfirm and onCancel with:
   * modal.onConfirm = yourFunction
  */
  #setConfig() {
    const defaultConfig = {
      autofire: false,
      clickAnywhereToClose: true,
      icon: "none",
      confirm: null,
      cancel: null,
    }
    this.config = this.#deepMerge(defaultConfig, this.userConfig)
  }

  // Helper to merge 2 objects, merging all nested objects but not nested arrays
  // TODO: useful when config is more complex, not for now. Keep for scalability?
  #deepMerge(target, source) {
    const isObject = (v) => v && typeof v === "object" && !Array.isArray(v);

    for (const key of Object.keys(source)) {
      const a = target[key];
      const b = source[key];
      if (isObject(a) && isObject(b)) {
        this.#deepMerge(a, b);
        continue;
      }
      target[key] = b;
    }
    return target;
  }

  // LOGIC //////////////////////////////////////

  fire = () => document.body.appendChild(this.mainElement);

  onConfirm = () => this.#close();

  onCancel = () => this.#close();

  afterClose = null;

  #close = () => {
    this.mainElement.remove();
    if (this.afterClose) this.afterClose();
  }

  // BUILDER ////////////////////////////////////

  #buildModal() {
    this.mainElement = document.createElement("div");
    this.mainElement.classList.add("fixed", "top-0", "right-0", "bottom-0", "left-0", "z-2000",
      "bg-overlay", "flex", "justify-center", "items-center");

    if (this.config.clickAnywhereToClose) {
      this.mainElement.addEventListener("click", () => this.#close())
    }

    const dialog = document.createElement("div");
    dialog.classList.add("m-4", "md:w-fit", "md:max-w-3xl");

    const container = document.createElement("div");
    container.classList.add("flex", "flex-col", "gap-4", "p-4", "md:px-8", "bg-white", "rounded-xl", "outline-none");

    const content = this.element.content.cloneNode(true);
    container.appendChild(content);

    if (this.config.confirm || this.config.cancel) {
      const buttonsContainer = document.createElement("div");
      buttonsContainer.classList.add("flex", "justify-center", "gap-2", "flex-wrap");

      if (this.config.confirm) {
        const confirm = document.createElement("button");
        confirm.classList.add("btn", "btn-plain", "text-white", "min-w-32");
        confirm.innerText = this.config.confirm;
        confirm.addEventListener("click", (e) => this.onConfirm(e));
        buttonsContainer.appendChild(confirm);
      }

      if (this.config.cancel) {
        const cancel = document.createElement("button");
        cancel.classList.add("btn", "min-w-32");
        cancel.innerText = this.config.cancel;
        cancel.addEventListener("click", (e) => this.onCancel(e));
        buttonsContainer.appendChild(cancel);
      }

      container.appendChild(buttonsContainer);
    }

    dialog.appendChild(container);
    this.mainElement.appendChild(dialog);
  }
}
