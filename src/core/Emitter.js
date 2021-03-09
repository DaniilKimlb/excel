export default class Emitter {
  constructor() {
    this.listener = {};
  }
  dispatch(event, ...args) {
    if (!Array.isArray(this.listener[event])) {
      return false;
    }
    this.listener[event].forEach((listener) => listener(...args));
    return true;
  }
  subscribe(event, fc) {
    this.listener[event] = this.listener[event] || [];
    this.listener[event].push(fc);
    return () => {
      this.listener[event] = this.listener[event].filter(
        (listener) => listener !== fc
      );
    };
  }
}
