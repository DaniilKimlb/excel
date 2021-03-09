import { DomListener } from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, optionals = {}) {
    super($root, optionals.listeners || [], optionals.name);
    this.prepare();
    this.emitter = optionals.emitter;
    this.unsubscribe = [];
  }
  prepare() {}
  toHTML() {
    return '';
  }
  init() {
    this.initDOMListeners();
  }
  $dispatch(event, ...args) {
    this.emitter.dispatch(event, ...args);
  }
  $sub(event, fc) {
    const unsub = this.emitter.subscribe(event, fc);
    this.unsubscribe.push(unsub);
  }
  destroy() {
    this.removeDOMListeners();
    this.unsubscribe.forEach((listeners) => listeners());
  }
}
