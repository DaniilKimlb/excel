import { defaultStyles } from '../../constants';
import { $ } from '../../core/dom';
import { ExcelStateComponent } from '../../core/ExcelStateComponent';
import { createToolbar } from './toolbar.template';

export class Toolbar extends ExcelStateComponent {
  constructor($el, options) {
    super($el, {
      name: 'Toolbar',
      listeners: ['click'],
      subscribe: ['changeStyles'],
      ...options,
    });
  }
  static className = 'excel__toolbar';
  prepare() {
    this.initState(defaultStyles);
  }
  get template() {
    return createToolbar(this.state);
  }
  toHTML() {
    return this.template;
  }
  storeChanged(changes) {
    this.setState(changes.changeStyles);
  }
  onClick(event) {
    const $target = $(event.target);
    if ($target.data.type === 'button') {
      const value = JSON.parse($target.data.value);
      this.$emit('toolbar:applyStyles', value);
    }
  }
}
