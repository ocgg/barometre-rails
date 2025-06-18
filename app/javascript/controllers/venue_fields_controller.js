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
    mode: { type: String, default: "search" }, // in: "search", "manual", "found"
  }

  connect() {
    if (this.modeValue === "found") this.setVenue(this.idTarget.value);
    else if (this.modeValue === "manual") this.toManualMode();
  }

  setVenue(id) {
    const url = `/api/venues/${id}`;
    const opts = { headers: { "Accept": "application/json" } };
    fetch(url, opts)
      .then(response => response.json())
      .then(venue => this.toFoundMode(venue));
  }

  toSearchMode() {
    this.modeValue = "search";
    this.idTarget.value = "";
    this.setInputsForSearch();
    this.onVenueInput();
  }

  toFoundMode(venue) {
    this.modeValue = "found";
    this.venue = venue;
    this.idTarget.value = venue.id;
    this.hide(this.dropdownTarget);
    this.setInputsForFound();
  }

  toManualMode() {
    this.modeValue = "manual";
    this.idTarget.value = "";
    this.hide(this.dropdownTarget);
    this.emptyResultsList();
    this.setInputsForManual();
  }

  setInputsForSearch() {
    this.setAddressAndCityInputsForSearch();
  }

  setInputsForFound() {
    this.show(this.clearInputBtnTarget);
    this.hide(this.searchBtnTarget);
    this.nameTarget.disabled = true;
    this.addressTarget.disabled = true;
    this.cityTarget.disabled = true;
    this.nameTarget.value = this.venue.name;
    this.addressTarget.value = this.venue.address;
    this.cityTarget.value = this.venue.city;
  }

  setInputsForManual() {
    this.hide(this.clearInputBtnTarget);
    this.show(this.searchBtnTarget);
    this.addressTarget.disabled = false;
    this.cityTarget.disabled = false;
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
    const url = `/api/venues?q=${this.nameTarget.value}&limit=5`;
    const opts = { headers: { "Accept": "application/json" } };
    fetch(url, opts)
      .then(response => response.json())
      .then(venues => this.setAndRenderVenues(venues));
  }

  setAndRenderVenues(venues) {
    this.renderVenues(venues);
    this.toggleHidden(this.noResultTarget, venues.length)
  }

  renderVenues(venues) {
    this.emptyResultsList();
    venues.forEach(venue => this.renderVenue(venue));
  }

  renderVenue(venue) {
    const clone = this.templateTarget.content.cloneNode(true);
    const li = clone.querySelector("li");
    li.dataset.id = venue.id;
    li.dataset.name = venue.name;
    li.classList.toggle("bg-baro-yellow-faded", !venue.verified);
    if (venue.verified) clone.querySelector("a")?.remove();
    clone.querySelector(".venue-name").innerText = venue.name;
    clone.querySelector(".venue-address").innerText = `${venue.address} (${venue.city})`;
    this.resultsListTarget.appendChild(clone);
  }

  emptyResultsList() {
    this.resultsListTarget.innerHTML = '';
    this.show(this.noResultTarget);
  }

  onClearBtnClick(_) {
    this.clearInputs();
    if (this.modeValue !== "search") this.toSearchMode();
    this.emptyResultsList();
    this.nameTarget.focus();
  }

  onSearchBtnClick(event) {
    event.stopPropagation();
    this.toSearchMode();
    this.nameTarget.focus();
    const length = this.nameTarget.value.length;
    this.nameTarget.setSelectionRange(length, length);
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

    if (!this.nameTarget.value.length) {
      this.hide(this.clearInputBtnTarget);
      this.emptyResultsList();
    }
    else {
      this.show(this.clearInputBtnTarget);
      this.fetchVenues();
    }
  }

  onFocus(_) {
    if (this.modeValue !== "search") return;

    this.show(this.dropdownTarget);
  }

  hide(element) { element.classList.toggle("hidden", true) }

  show(element) { element.classList.toggle("hidden", false) }

  toggleHidden(element, bool) { element.classList.toggle("hidden", bool) }
}
