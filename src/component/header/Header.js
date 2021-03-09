import { ExcelComponent } from '@core/ExcelComponent';

export class Header extends ExcelComponent {
  static className = 'excel__header';
  constructor($el, options) {
    super($el, {
      name: 'Header',
      ...options,
    });
  }
  toHTML() {
    return `
    <input type="text" class="input" value="Название таблицы" />
          <div>
            <div class="button">
              <i class="material-icons"> delete </i>
            </div>
            <div class="button">
              <i class="material-icons"> exit_to_app </i>
            </div>
          </div>
          `;
  }
}
