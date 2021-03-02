import { capitalize } from './utility';

export class DomListener {
  constructor($root, listeners, name) {
    if (!$root) {
      throw new Error('No $root provider for DomListener!');
    }
    this.$root = $root;
    this.listeners = listeners;
    this.name = name;
  }
  initDOMListeners() {
    this.listeners.forEach((listener) => {
      const method = getNameMethod(capitalize(listener));
      if (!this[method]) {
        throw new Error(`method ${method} not at ${this.name || ''} Component`);
      }
      this[method] = this[method].bind(this);
      this.$root.on(listener, this[method]);
    });
  }
  removeDOMListeners() {
    this.listeners.forEach((listener) => {
      const method = getNameMethod(capitalize(listener));
      this.$root.off(listener, this[method]);
    });
  }
}
function getNameMethod(method) {
  return 'on' + method;
}
