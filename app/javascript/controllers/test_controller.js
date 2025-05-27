import { Controller } from "@hotwired/stimulus"
import Datepicker from "datepicker/datepicker"

// Connects to data-controller="test"
export default class extends Controller {
  connect() {
    const opts = {range: false}
    new Datepicker(this.element, opts);
  }
}
