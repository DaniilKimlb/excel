import { ExcelComponent } from '@core/ExcelComponent';
import { $ } from '../../core/dom';
import { createHeader } from './header.template';
import * as actionsCreator from '../../../redux/actions';
import { debounce } from '../../core/utility';
import { ActiveRouter } from '../../core/routes/ActiveRouter';
export class Header extends ExcelComponent {
  static className = 'excel__header';
  constructor($el, options) {
    super($el, {
      name: 'Header',
      listeners: ['input', 'click'],
      ...options,
    });
  }
  prepare() {
    this.onInput = debounce(this.onInput, 100);
  }
  toHTML() {
    return createHeader(this.store.getState());
  }
  onClick(event) {
    const $target = $(event.target);
    if ($target.data.button === 'delete') {
      const del = confirm('Вы действительно хотите удалить таблицу?');
      if (del) {
        localStorage.removeItem('excel:' + ActiveRouter.param);
        ActiveRouter.changeURL('');
      }
    } else if ($target.data.button === 'exit') {
      ActiveRouter.changeURL('');
    }
  }
  onInput(event) {
    const $target = $(event.target);
    this.$dispatch(actionsCreator.changeHeaderTitle($target.text()));
  }
}
