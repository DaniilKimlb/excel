import { ExcelComponent } from '@core/ExcelComponent';
import { shouldResize } from './table.functions';
import { tableResize } from './table.resize';
import { createTable } from './template';

export class Table extends ExcelComponent {
  static className = 'excel__table';
  constructor($el) {
    super($el, {
      name: 'Table',
      listeners: ['mousedown'],
    });
  }
  toHTML() {
    return createTable();
  }
  onMousedown(event) {
    if (shouldResize(event)) {
      tableResize(this.$root, event);
    }
  }
}
