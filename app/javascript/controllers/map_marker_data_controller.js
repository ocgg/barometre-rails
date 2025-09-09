import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="map-marker-data"
export default class extends Controller {
  static values = {
    venues: {type: Array, default: undefined},
  }

  connect() {
    const otherController = this.application.getControllerForElementAndIdentifier(this.otherTarget, 'other')
    otherController.otherMethod()
  }

  venuesValueChanged(current, old) {
    if (!old) return;

    this.dispatch();
  }
}
