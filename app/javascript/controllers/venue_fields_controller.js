import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="venue-fields"
export default class extends Controller {
  static targets = [
    "id",
    "name",
    "address",
    "city",
    "resultsList",
    "noResult",
    "template",
    "dropdown",
    "clearInputBtn",
    "searchBtn",
  ]

  static values = {
    mode: String, // in: "search", "manual", "found"
  }

  connect() {
    if (this.idTarget.value) this.setVenue(this.idTarget.value)
  }

  setVenue(id) {
    const url = `/venues/${id}`;
    const opts = { headers: { "Accept": "application/json" } };
    fetch(url, opts)
      .then(response => response.json())
      .then(venue => this.toFoundMode(venue));
  }

  toSearchMode() {
    this.idTarget.value = "";
    this.setInputsForSearch();
    this.onVenueInput();
  }

  toFoundMode(venue) {
    this.venue = venue;
    this.idTarget.value = venue.id;
    this.hide(this.dropdownTarget);
    this.setInputsForFound();
  }

  toManualMode() {
    this.idTarget.value = "";
    this.hide(this.dropdownTarget);
    this.resultsListTarget.innerHTML = '';
    this.setInputsForManual();
  }

  setInputsForSearch() {
    this.setAddressAndCityInputsForSearch();
  }

  setInputsForFound() {
    this.show(this.clearInputBtnTarget);
    this.hide(this.searchBtnTarget);
    this.nameTarget.disabled = true;
    this.nameTarget.value = this.venue.name;
    this.addressTarget.value = this.venue.address;
    this.cityTarget.value = this.venue.city;
  }

  setInputsForManual() {
    this.hide(this.clearInputBtnTarget);
    this.show(this.searchBtnTarget);
    this.addressTarget.disabled = false;
    this.addressTarget.value = "";
    this.cityTarget.disabled = false;
    this.cityTarget.value = "";
  }

  setAddressAndCityInputsForSearch() {
    this.hide(this.searchBtnTarget);
    this.addressTarget.disabled = true;
    this.addressTarget.value = "";
    this.cityTarget.disabled = true;
    this.cityTarget.value = "";
  }

  clearInputs() {
    this.hide(this.clearInputBtnTarget);
    this.nameTarget.disabled = false;
    this.nameTarget.value = "";
    this.setAddressAndCityInputsForSearch();
  }

  fetchVenues() {
    const url = `/venues?q=${this.nameTarget.value}`;
    const opts = { headers: { "Accept": "application/json" } };
    fetch(url, opts)
      .then(response => response.json())
      .then(venues => this.setAndRenderVenues(venues));
  }

  setAndRenderVenues(venues) {
    this.renderVenues(venues);
    this.toggleHidden(this.noResultTarget, !(venues.length === 0))
    this.toggleHidden(this.dropdownTarget, !this.nameTarget.value.length);
  }

  renderVenues(venues) {
    this.resultsListTarget.innerHTML = '';
    venues.forEach(venue => this.renderVenue(venue));
  }

  renderVenue(venue) {
    const clone = this.templateTarget.content.cloneNode(true);
    const li = clone.querySelector("li");
    li.dataset.id = venue.id;
    li.dataset.name = venue.name;
    clone.querySelector(".venue-name").innerText = venue.name;
    clone.querySelector(".venue-address").innerText = `${venue.address} (${venue.city})`;
    this.resultsListTarget.appendChild(clone);
  }

  onClearBtnClick(_) {
    this.clearInputs();
    this.toSearchMode();
    this.nameTarget.focus();
  }

  onSearchBtnClick(event) {
    event.stopPropagation();
    this.toSearchMode();
    this.nameTarget.focus();
  }

  onAddManually(event) {
    event.stopPropagation();
    this.toManualMode();
    this.nameTarget.focus();
  }

  onVenueSelect(event) {
    this.setVenue(event.currentTarget.dataset.id);
  }

  onVenueInput(_) {
    if (this.modeValue !== "search") return;

    this.toggleHidden(this.clearInputBtnTarget, !this.nameTarget.value.length);
    this.fetchVenues();
  }

  hide(element) { element.classList.toggle("hidden", true) }

  show(element) { element.classList.toggle("hidden", false) }

  toggleHidden(element, bool) { element.classList.toggle("hidden", bool) }
}
