import { $ } from '../dom';
import { ActiveRouter } from './ActiveRouter';

export class Router {
  constructor(selector, routes) {
    if (!selector) {
      throw new Error('no selector specified');
    }
    this.$placeholder = $(selector);
    this.routes = routes;
    this.changePageHandler = this.changePageHandler.bind(this);
    this.init();
    this.page = null;
  }
  init() {
    window.addEventListener('hashchange', this.changePageHandler);
    this.changePageHandler();
  }
  changePageHandler() {
    if (this.page) {
      this.page.destroy();
    }
    this.$placeholder.clear();
    const Page = ActiveRouter.path.includes('excel')
      ? this.routes.excel
      : this.routes.dashboard;
    this.page = new Page(ActiveRouter.param);
    this.$placeholder.append(this.page.getRoot());
    this.page.afterRender();
  }
  destroy() {
    window.removeEventListener('hashchange', this.changePageHandler);
  }
}
