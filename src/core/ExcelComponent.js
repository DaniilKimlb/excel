import { DomListener } from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, optionals = {}) {
    super($root, optionals.listeners || [], optionals.name);
  }
  toHTML() {
    return '';
  }
  init() {
    this.initDOMListeners();
  }
  destroy() {
    this.removeDOMListeners();
  }
}
