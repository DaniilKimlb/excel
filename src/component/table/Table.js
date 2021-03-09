import { ExcelComponent } from '@core/ExcelComponent';
import { $ } from '../../core/dom';
import { nextSelected } from '../../core/utility';
import { isCeil, matrix, shouldResize } from './table.functions';
import { tableResize } from './table.resize';
import { createTable } from './table.template';
import { TableSelection } from './TableSelection';

export class Table extends ExcelComponent {
  static className = 'excel__table';
  constructor($el, options) {
    super($el, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options,
    });
  }
  toHTML() {
    return createTable();
  }
  prepare() {
    this.selection = new TableSelection();
  }
  init() {
    super.init();
    this.dispatchSelection(this.$root.find(`[data-id="0:0"]`));
    this.$sub('formula:text', (text) => {
      this.selection.current.text = text;
    });
    this.$sub('formula:isDone', (e) => {
      if (e) {
        const current = this.selection.current;
        current.focus(current.text.length);
      }
    });
  }
  onMousedown(event) {
    if (shouldResize(event)) {
      tableResize(this.$root, event);
    } else if (isCeil(event)) {
      const $target = $(event.target);
      this.$dispatch('table:selection', $target.text);
      if (event.shiftKey) {
        const $ceils = matrix($target, this.selection.current).map((id) =>
          this.$root.find(`[data-id="${id}"]`)
        );
        this.selection.selectGroup($ceils);
      } else {
        this.selection.select($target);
      }
    }
  }
  onKeydown(event) {
    const keys = [
      'Tab',
      'Enter',
      'ArrowRight',
      'ArrowLeft',
      'ArrowDown',
      'ArrowUp',
    ];
    const { code } = event;
    if (keys.includes(code) && !event.shiftKey) {
      event.preventDefault();
      const current = this.selection.current.id(true);
      this.dispatchSelection(
        this.$root.find(`[data-id="${nextSelected(code, current)}"]`)
      );
    }
  }
  dispatchSelection($el) {
    this.selection.select($el);
    this.$dispatch('table:selection', $el.text);
  }
  onInput(event) {
    this.$dispatch('table:selection', $(event.target).text);
  }
}
