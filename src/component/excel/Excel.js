import { $ } from '@core/dom';
import Emitter from '../../core/Emitter';

export class Excel {
  constructor(selector, options) {
    this.$el = $(selector);
    this.components = options.components || [];
  }
  getRoot() {
    const $root = $.create('div', 'excel');
    const emitter = new Emitter();
    this.components = this.components.map((Component) => {
      const $el = $.create('div', Component.className);
      const component = new Component($el, { emitter });
      $el.html(component.toHTML());
      $root.append($el);
      return component;
    });
    return $root;
  }
  render() {
    this.$el.append(this.getRoot());
    this.components.forEach((component) => component.init());
  }
}
