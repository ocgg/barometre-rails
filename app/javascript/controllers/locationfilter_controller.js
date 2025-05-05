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
    this.active ? this.updateButtonText() : this.resetButtonText();
    this.updateElementSize();
  }

  get active() { return !this.radiusInputTarget.disabled; }

  get isLocalized() { return !!this.latInputTarget.value; }

  get visible() { return !this.rangeContainerTarget.classList.contains("hidden"); }

  set visible(bool) {
    this.rangeContainerTarget.classList.toggle("hidden", !bool);
    this.mainContainerTarget.classList.toggle("max-md:translate-x-[-25%]", bool);
    this.mainContainerTarget.classList.toggle("bg-card-bg", bool);
    if (!bool) this.updateElementSize();
  }

  activate() {
    this.enableInputs();
    this.updateButtonText();
  }

  enableInputs() {
    this.radiusInputTarget.disabled = false;
    this.latInputTarget.disabled = false;
    this.longInputTarget.disabled = false;
  }

  desactivate() {
    this.disableInputs();
    this.resetButtonText();
    this.hide();
  }

  disableInputs() {
    this.radiusInputTarget.disabled = true;
    this.latInputTarget.disabled = true;
    this.longInputTarget.disabled = true;
  }

  hide() {
    this.visible = false;
    this.updateElementSize();
  }

  onRadiusInput() {
    this.updateButtonText();
  }

  updateButtonText() {
    this.buttonTarget.innerText = `Rayon: ${this.radiusInputTarget.value} km`;
    this.clearInputBtnTarget.classList.toggle("hidden", false);
  }

  resetButtonText() {
    this.buttonTarget.innerText = "Autour de moi";
    this.clearInputBtnTarget.classList.toggle("hidden", true);
  }

  updateElementSize() {
    const size = this.mainContainerTarget.getBoundingClientRect();
    this.element.style.width = `${Math.floor(size.width)}px`;
    this.element.style.height = `${Math.floor(size.height)}px`;
  }

  onButtonClick() {
    if (this.active) this.show();
    else if (this.isLocalized) { this.activate(); this.show(); }
    else this.checkGeolocation();
  }

  show() {
    this.visible = true
  }

  checkGeolocation() {
    if (navigator.geolocation) this.requestLocation();
    else this.showNotCompatibleMessage();
  }

  showNotCompatibleMessage() {
    alert("Il semble que votre navigateur ne soit pas compatible avec la géolocalisation.");
  }

  requestLocation() {
    this.showSpinner();
    navigator.geolocation.getCurrentPosition(
      this.onLocalizationSuccess.bind(this),
      this.onLocalizationError.bind(this)
    );
  }

  onLocalizationSuccess(position) {
    this.hideSpinner();
    this.latInputTarget.value = position.coords.latitude;
    this.longInputTarget.value = position.coords.longitude;
    this.activate();
    this.show();
  }

  onLocalizationError() {
    this.hideSpinner();
    alert("La localisation a échoué. Essayez d'activer la géolocalisation sur votre appareil")
  }

  showSpinner() { this.spinnerTarget.classList.remove("hidden"); }

  hideSpinner() { this.spinnerTarget.classList.add("hidden"); }

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
