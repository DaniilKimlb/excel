import { ExcelComponent } from '@core/ExcelComponent';
import * as actionsCreator from '../../../redux/actions';
import { defaultStyles } from '../../constants';
import { $ } from '../../core/dom';
import { parse } from '../../core/parse';
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
    return createTable(20, this.store.getState());
  }
  prepare() {
    this.selection = new TableSelection();
  }
  init() {
    super.init();
    this.selectCeil(this.$root.find(`[data-id="0:0"]`));
    this.$sub('formula:text', (text) => {
      this.selection.current.attr('data-value', text);
      this.selection.current.text(parse(text));
      this.updateTextCeil(text);
    });
    this.$sub('formula:isDone', (e) => {
      if (e) {
        const current = this.selection.current;
        current.focus();
      }
    });
    this.$sub('toolbar:applyStyles', (value) => {
      this.selection.styleSelect(value);
      this.$dispatch(
        actionsCreator.applyStyles({
          value,
          ids: this.selection.getIds,
        })
      );
    });
  }
  async tableResize(event) {
    const resizeCol = await tableResize(this.$root, event);
    this.$dispatch(actionsCreator.resizeTableCol(resizeCol));
  }
  onMousedown(event) {
    if (shouldResize(event)) {
      this.tableResize(event);
    } else if (isCeil(event)) {
      const $target = $(event.target);
      if (event.shiftKey) {
        const $ceils = matrix($target, this.selection.current).map((id) =>
          this.$root.find(`[data-id="${id}"]`)
        );
        this.selection.selectGroup($ceils);
      } else {
        this.selectCeil($target);
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
      this.selectCeil(
        this.$root.find(`[data-id="${nextSelected(code, current)}"]`)
      );
    }
  }
  selectCeil($el) {
    this.selection.select($el);
    this.$emit('table:selection', $el);
    this.getStyleSelect($el);
  }
  updateTextCeil(value) {
    this.$emit('table:input', value);
    this.$dispatch(
      actionsCreator.ceilTextContent({
        id: this.selection.current.id(),
        value,
      })
    );
    this.getStyleSelect(this.selection.current);
  }
  getStyleSelect(value) {
    const styles = value.getStyles(Object.keys(defaultStyles));
    this.$dispatch(actionsCreator.changeStyles(styles));
  }
  onInput(event) {
    this.updateTextCeil($(event.target).text());
  }
}
