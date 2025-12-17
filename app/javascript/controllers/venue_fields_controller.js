import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="venue-fields"
export default class extends Controller {
  static targets = [
    "id",
    "name",
    "address",
    "zipcode",
    "city",
    "resultsList",
    "noResult",
    "template",
    "dropdown",
    "clearInputBtn",
    "searchBtn",
    "addressDropdown",
    "addressesList",
    "addressTemplate",
  ]

  static values = {
    mode: { type: String, default: "search" }, // in: "search", "manual", "found"
  }

  connect() {
    if (this.modeValue === "found") this.setVenue(this.idTarget.value);
    else if (this.modeValue === "manual") this.toManualMode();
    else this.setInputsForSearch();
  }

  setVenue(id) {
    const basePath = document.head.querySelector('meta[name="base-path"]').content;
    const url = `${basePath}/api/venues/${id}`;
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
    if(this.hasIdTarget) this.idTarget.value = "";
    this.hide(this.dropdownTarget);
    this.emptyResultsList();
    this.setInputsForManual();
  }

  setInputsForSearch() {
    this.setAddressAndCityInputsForSearch();
    if (this.nameTarget.value) this.show(this.clearInputBtnTarget)
  }

  setInputsForFound() {
    this.show(this.clearInputBtnTarget);
    this.hide(this.searchBtnTarget);
    this.nameTarget.disabled = true;
    this.nameTarget.value = this.venue.name;
    this.addressTarget.disabled = true;
    this.addressTarget.value = this.venue.address;
    this.zipcodeTarget.disabled = true;
    this.zipcodeTarget.value = this.venue.zipcode;
    this.cityTarget.disabled = true;
    this.cityTarget.value = this.venue.city;
  }

  setInputsForManual() {
    this.hide(this.clearInputBtnTarget);
    this.show(this.searchBtnTarget);
    this.addressTarget.disabled = false;
    this.zipcodeTarget.disabled = false;
    this.cityTarget.disabled = false;
  }

  setAddressAndCityInputsForSearch() {
    this.hide(this.searchBtnTarget);
    this.addressTarget.disabled = true;
    this.addressTarget.value = "";
    this.zipcodeTarget.disabled = true;
    this.zipcodeTarget.value = "";
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
    const basePath = document.head.querySelector('meta[name="base-path"]').content;
    const url = `${basePath}/api/venues?q=${this.nameTarget.value}&limit=5`;
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
    li.classList.toggle("bg-yellow-faded", !venue.verified);
    if (venue.verified) clone.querySelector("a")?.remove();
    clone.querySelector(".venue-name-selector").innerText = venue.name;
    clone.querySelector(".venue-address-selector").innerText = `${venue.address} (${venue.city})`;
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

    this.showDropdown();
  }

  showDropdown() {
    this.dropdownTarget.classList.toggle("z-100", true);
    this.show(this.dropdownTarget);
  }

  onAddressInput(_) {
    const input = this.addressTarget.value;
    if (input.length < 3) return;

    // documentation for french gov address autocomplete API:
    // https://geoservices.ign.fr/documentation/services/services-geoplateforme/autocompletion
    const limit = 10;
    const regions = "22,29,35,44,56";
    const queryString = `type=StreetAddress&text=${input}&terr=${regions}&maximumResponses=${limit}`;
    const url = `https://data.geopf.fr/geocodage/completion/?${queryString}`;
    this.#fetchAddressAutocompleteAPI(url);
  }

  #fetchAddressAutocompleteAPI(url) {
    fetch(url).then(response => response.json()).then(data => {
      if (!data.results) return;

      this.#renderAddresses(data.results)
    })
  }

  #renderAddresses(addresses) {
    this.toggleHidden(this.addressDropdownTarget, !addresses.length)
    this.addressesListTarget.innerHTML = '';
    addresses.forEach(address => this.#renderAddress(address));
  }

  #renderAddress(address) {
    const clone = this.addressTemplateTarget.content.cloneNode(true);
    const li = clone.firstChild;
    li.dataset.address = address.fulltext.replace(/,[^,]*$/, "");
    li.dataset.city = address.city;
    li.dataset.zipcode = address.zipcode;
    li.querySelector(".address-first").innerText = li.dataset.address;
    li.querySelector(".address-last").innerText = `${address.city} ${address.zipcode}`;
    this.addressesListTarget.appendChild(clone);
  }

  onAddressSelect(event) {
    const data = event.currentTarget.dataset;
    this.addressTarget.value = data.address;
    this.zipcodeTarget.value = data.zipcode;
    this.cityTarget.value = data.city;
    this.hide(this.addressDropdownTarget);
  }

  hide(element) { element.classList.toggle("hidden", true) }

  show(element) { element.classList.toggle("hidden", false) }

  toggleHidden(element, bool) { element.classList.toggle("hidden", bool) }
}
