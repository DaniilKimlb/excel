import { $ } from '@core/dom';
import { updateDate } from '../../../redux/actions';
import { StoreSubscriber } from '../../../redux/StoreSubscriber';
import Emitter from '../../core/Emitter';
import { preventDefault } from '../../core/utility';

export class Excel {
  constructor(options) {
    this.components = options.components || [];
    this.store = options.store;
    this.emitter = new Emitter();
    this.subscriber = new StoreSubscriber(this.store);
  }
  getRoot() {
    const $root = $.create('div', 'excel');
    this.components = this.components.map((Component) => {
      const $el = $.create('div', Component.className);
      const component = new Component($el, {
        emitter: this.emitter,
        store: this.store,
      });
      $el.html(component.toHTML());
      $root.append($el);
      return component;
    });
    return $root;
  }
  init() {
    if (process.env.NODE_ENV === 'production') {
      document.addEventListener('contextmenu', preventDefault);
    }
    this.store.dispatch(updateDate());
    this.subscriber.subscriberComponent(this.components);
    this.components.forEach((component) => component.init());
  }
  destroy() {
    this.subscriber.unsubscribeFromStore();
    this.components.forEach((component) => component.destroy());
  }
}
