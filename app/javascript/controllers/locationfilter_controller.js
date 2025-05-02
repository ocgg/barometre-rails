import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="locationfilter"
export default class extends Controller {
  static targets = [
    "mainContainer",
    "button",
    "rangeContainer",
    "input",
    "clearInputBtn"
  ]

  connect() {
    this.active = !this.inputTarget.disabled;
    this.updateButtonText();
  }

  get active() {
    return !this.inputTarget.disabled;
  }

  set active(bool) {
    if (bool) {
      this.inputTarget.disabled = false;
      this.radius = this.inputTarget.value;
      this.updateButtonText();
    }
    else {
      this.inputTarget.disabled = true;
      this.radius = null;
      this.isVisible = false;
    }
  }

  get visible() {
    return !this.rangeContainerTarget.classList.contains("hidden");
  }

  set visible(bool) {
    this.rangeContainerTarget.classList.toggle("hidden", !bool);
    this.mainContainerTarget.classList.toggle("max-md:translate-x-[-25%]", bool);
    this.mainContainerTarget.classList.toggle("bg-card-bg", bool);
    if (!bool) this.updateElementSize();
  }

  updateButtonText() {
    if (this.active) {
      this.buttonTarget.innerText = `Rayon: ${this.inputTarget.value} km`;
      this.clearInputBtnTarget.classList.toggle("hidden", false);
    }
    else {
      this.buttonTarget.innerText = "Autour de moi";
      this.clearInputBtnTarget.classList.toggle("hidden", true);
    }
    if (!this.visible) this.updateElementSize();
  }

  updateElementSize() {
    const size = this.mainContainerTarget.getBoundingClientRect();
    this.element.style.width = `${Math.floor(size.width)}px`;
    this.element.style.height = `${Math.floor(size.height)}px`;
  }

  toggle() {
    this.visible = !this.visible;
    if (this.visible) this.active = true;
  }

  handleFocusOut(event) {
    if (!this.visible) return;
    if (this.mainContainerTarget.contains(event.target)) return;

    this.visible = false;
  }

  clearInput(event) {
    event.stopPropagation();

    this.inputTarget.disabled = true;
    this.visible = false;
    this.updateButtonText();
  }
}
