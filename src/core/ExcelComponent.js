import { DomListener } from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, optionals = {}) {
    super($root, optionals.listeners || [], optionals.name);
    this.prepare();
    this.emitter = optionals.emitter;
    this.unsubscribe = [];
    this.store = optionals.store;
    this.subscribe = optionals.subscribe || [];
    this.unsubscribeStore = null;
  }
  prepare() {}
  toHTML() {
    return '';
  }
  init() {
    this.initDOMListeners();
  }
  $emit(event, ...args) {
    this.emitter.dispatch(event, ...args);
  }
  $sub(event, fc) {
    const unsub = this.emitter.subscribe(event, fc);
    this.unsubscribe.push(unsub);
  }
  $dispatch(action) {
    this.store.dispatch(action);
  }
  storeChanged() {}
  isWatching(value) {
    return this.subscribe.includes(value);
  }
  destroy() {
    this.removeDOMListeners();
    this.unsubscribe.forEach((listeners) => listeners());
    this.unsubscribeStore.forEach((listeners) => listeners());
  }
}
