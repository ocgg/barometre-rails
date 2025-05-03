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
    this.updateRadiusInput();
  }

  get active() {
    return !this.radiusInputTarget.disabled;
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

  activate() {
    this.activateInputs();
    this.updateRadiusInput();
  }

  activateInputs() {
    this.radiusInputTarget.disabled = false;
    this.latInputTarget.disabled = false;
    this.longInputTarget.disabled = false;
  }

  desactivate() {
    this.desactivateInputs();
    this.hide();
    this.updateRadiusInput();
  }

  desactivateInputs() {
    this.radiusInputTarget.disabled = true;
    this.latInputTarget.disabled = true;
    this.longInputTarget.disabled = true;
  }

  hide() {
    this.visible = false;
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
    if (this.active) this.show();
    else if (navigator.geolocation) this.requestLocation();
    else {
      alert("Il semble que votre navigateur ne soit pas compatible avec la géolocalisation.");
    }
  }

  show() {
    this.visible = true
  }

  requestLocation() {
    this.spinnerTarget.classList.remove("hidden");

    navigator.geolocation.getCurrentPosition(
      this.onLocalizationSuccess.bind(this),
      this.onLocalizationError.bind(this)
    );
  }

  onLocalizationSuccess(position) {
    this.spinnerTarget.classList.add("hidden");
    this.latInputTarget.value = position.coords.latitude;
    this.longInputTarget.value = position.coords.longitud;
    this.activate();
    this.show();
  }

  onLocalizationError() {
    alert("La localisation a échoué. Essayez d'activer la géolocalisation sur votre appareil")
  }

  handleFocusOut(event) {
    if (!this.visible) return;
    if (this.mainContainerTarget.contains(event.target)) return;

    this.hide();
  }

  clearInput(event) {
    event.stopPropagation();
    this.desactivate();
  }
}
