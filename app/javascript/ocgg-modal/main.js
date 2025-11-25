export default class Modal {
  constructor(config = {}) {
    this.userConfig = config;
    this.#setConfig(this.userConfig);
    this.#buildModal();
    document.body.appendChild(this.dialog);
  }

  // CONFIG /////////////////////////////////////

  #setConfig() {
    const defaultConfig = {
      icon: "success",
      mainText: "Lorem ipsum dolor sit amet",
      subText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      notice: "Cliquez n'importe où pour fermer",
      confirmable: true,
      cssClasses: {
        icon: ["h-8", "fill-blue", "group-has-hover:fill-yellow"],
        dialog: [
          "m-auto", "z-1001", "group", "backdrop:bg-[black]/40", "bg-transparent",
          "md:w-fit", "md:max-w-3xl"
        ],
      },
    }
    this.config = this.#deepMerge(defaultConfig, this.userConfig)
  }

  // Helper to merge 2 objects, merging all nested objects but not nested arrays
  #deepMerge(target, source) {
    const isObject = (val) => val && typeof val === "object" && !Array.isArray(val);

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

  fire() {
    this.dialog.showModal();
  }

  // BUILDER ////////////////////////////////////

  #buildModal() {
    this.dialog = document.createElement("dialog");
    this.dialog.classList.add(...this.config.cssClasses.dialog);
    this.dialog.closedBy = "any";

    const form = document.createElement("form");
    form.method = "dialog";

    const button = document.createElement("button");
    button.classList.add("flex", "flex-col", "gap-4", "px-4", "py-4", "md:px-8", "bg-white", "rounded-xl", "outline-none")

    const mainText = document.createElement("h3");
    mainText.classList.add("text-blue", "text-lg");
    mainText.innerText = this.config.mainText;

    const subText = document.createElement("p");
    subText.classList.add("text-blue", "font-paragraph");
    subText.innerText = this.config.subText;

    const notice = document.createElement("p");
    notice.classList.add("text-sm", "italic", "text-blue-faded", "font-paragraph");
    notice.innerText = this.config.notice;

    if (this.config.icon && this.config.icon !== "none") {
      const icon = this.#buildIcon();
      button.appendChild(icon);
    }
    button.appendChild(mainText);
    button.appendChild(subText);
    button.appendChild(notice);
    form.appendChild(button);
    this.dialog.appendChild(form);
  }

  #buildIcon() {
    const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    icon.classList.add(...this.config.cssClasses.icon);
    icon.setAttributeNS(null, "viewBox", "0 0 640 640");
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttributeNS(null, "d", this.#getIconPath())
    icon.appendChild(path);
    return icon;
  }

  #getIconPath() {
    switch (this.config.icon) {
      case "success":
        return "M320 112C434.9 112 528 205.1 528 320C528 434.9 434.9 528 320 528C205.1 528 112 434.9 112 320C112 205.1 205.1 112 320 112zM320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576zM404.4 276.7C411.4 265.5 408 250.7 396.8 243.6C385.6 236.5 370.8 240 363.7 251.2L302.3 349.5L275.3 313.5C267.3 302.9 252.3 300.7 241.7 308.7C231.1 316.7 228.9 331.7 236.9 342.3L284.9 406.3C289.6 412.6 297.2 416.2 305.1 415.9C313 415.6 320.2 411.4 324.4 404.6L404.4 276.6z";
        break;
      case "danger":
        return "M320 64C334.7 64 348.2 72.1 355.2 85L571.2 485C577.9 497.4 577.6 512.4 570.4 524.5C563.2 536.6 550.1 544 536 544L104 544C89.9 544 76.8 536.6 69.6 524.5C62.4 512.4 62.1 497.4 68.8 485L284.8 85C291.8 72.1 305.3 64 320 64zM320 416C302.3 416 288 430.3 288 448C288 465.7 302.3 480 320 480C337.7 480 352 465.7 352 448C352 430.3 337.7 416 320 416zM320 224C301.8 224 287.3 239.5 288.6 257.7L296 361.7C296.9 374.2 307.4 384 319.9 384C332.5 384 342.9 374.3 343.8 361.7L351.2 257.7C352.5 239.5 338.1 224 319.8 224z";
        break;
      default:
        throw new RangeError(`Not a valid icon name: ${this.config.icon} (ocgg-modal)`)
    }
  }
}
