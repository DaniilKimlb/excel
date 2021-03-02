import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from './table.tempate';

export class Table extends ExcelComponent {
  static className = 'excel__table';
  toHTML() {
    return createTable();
  }
}
