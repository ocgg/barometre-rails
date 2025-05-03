import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="locationfilter"
export default class extends Controller {
  static targets = [
    "mainContainer",
    "button",
    "rangeContainer",
    "radiusInput",
    "latInput",
    "longInput",
    "clearInputBtn",
    "spinner"
  ]

  connect() {
    this.active = !this.radiusInputTarget.disabled;
    this.localized = this.active;

    if (this.active) {
      this.lat = this.latInput.value;
      this.long = this.longInput.value;
    }

    this.updateRadiusInput();
  }

  get active() {
    return !this.radiusInputTarget.disabled;
  }

  set active(bool) {
    if (bool) {
      this.radiusInputTarget.disabled = false;
      this.radius = this.radiusInputTarget.value;
      this.updateRadiusInput();
    }
    else {
      this.radiusInputTarget.disabled = true;
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

  updateRadiusInput() {
    if (this.active) {
      this.buttonTarget.innerText = `Rayon: ${this.radiusInputTarget.value} km`;
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
    if (this.localized) {
      this.show();
    }
    else if (navigator.geolocation) {
      this.spinnerTarget.classList.remove("hidden");
      this.localize();
    }
    else {
      alert("Il semble que votre navigateur ne soit pas compatible avec la géolocalisation.");
    }
  }

  show() {
    this.visible = !this.visible;
    if (this.visible) this.active = true;
  }

  localize() {
    navigator.geolocation.getCurrentPosition(
      this.onLocalizationSuccess.bind(this),
      this.onLocalizationError.bind(this)
    );
  }

  onLocalizationSuccess(position) {
    this.spinnerTarget.classList.add("hidden");
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    this.latInputTarget.value = lat;
    this.longInputTarget.value = long;
    this.localized = true;
    this.show();
  }

  onLocalizationError() {
    alert("La localisation a échoué. Essayez d'activer la géolocalisation sur votre appareil")
  }

  handleFocusOut(event) {
    if (!this.visible) return;
    if (this.mainContainerTarget.contains(event.target)) return;

    this.visible = false;
  }

  clearInput(event) {
    event.stopPropagation();

    this.radiusInputTarget.disabled = true;
    this.visible = false;
    this.updateRadiusInput();
  }
}
