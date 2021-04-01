export class Page {
  constructor(param) {
    this.param = param || Date.now().toString();
  }
  getRoot() {
    throw new Error('root is not assigned');
  }
  afterRender() {}
  destroy() {}
}
