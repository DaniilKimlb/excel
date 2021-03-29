export class Page {
  constructor(param) {
    this.param = param;
  }
  getRoot() {
    throw new Error('root is not assigned');
  }
  afterRender() {}
  destroy() {}
}
