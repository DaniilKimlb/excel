import { ExcelComponent } from '@core/ExcelComponent';
import { $ } from '../../core/dom';
import { createHeader } from './header.template';
import * as actionsCreator from '../../../redux/actions';
import { debounce } from '../../core/utility';
export class Header extends ExcelComponent {
  static className = 'excel__header';
  constructor($el, options) {
    super($el, {
      name: 'Header',
      listeners: ['input'],
      ...options,
    });
  }
  prepare() {
    this.onInput = debounce(this.onInput, 500);
  }
  toHTML() {
    return createHeader(this.store.getState());
  }
  onInput(event) {
    const $target = $(event.target);
    this.$dispatch(actionsCreator.changeHeaderTitle($target.text()));
  }
}
