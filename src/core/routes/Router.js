import { $ } from '../dom';
import { ActiveRouter } from './ActiveRouter';
import Loader from '../../component/Loader';

export class Router {
  constructor(selector, routes) {
    if (!selector) {
      throw new Error('no selector specified');
    }
    this.$placeholder = $(selector);
    this.routes = routes;
    this.loader = new Loader();
    this.changePageHandler = this.changePageHandler.bind(this);
    this.init();
    this.page = null;
  }
  init() {
    window.addEventListener('hashchange', this.changePageHandler);
    this.changePageHandler();
  }
  async changePageHandler() {
    if (this.page) {
      this.page.destroy();
    }
    this.$placeholder.clear().append(this.loader);
    const Page = ActiveRouter.path.includes('excel')
      ? this.routes.excel
      : this.routes.dashboard;
    this.page = await new Page(ActiveRouter.param);
    const root = await this.page.getRoot();
    this.$placeholder.clear().append(root);
    this.page.afterRender();
  }
  destroy() {
    window.removeEventListener('hashchange', this.changePageHandler);
  }
}
