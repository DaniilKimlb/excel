import { ExcelComponent } from '@core/ExcelComponent';
import { $ } from '../../core/dom';

export class Formula extends ExcelComponent {
  static className = 'excel__formula';
  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      ...options,
    });
  }
  toHTML() {
    return `
    <div class="info">fx</div>
    <div id = "formula" class="input" contenteditable  spellcheck="false"></div>
    `;
  }

  init() {
    super.init();
    const $formula = this.$root.find('#formula');
    this.$sub('table:selection', ($el) => {
      $formula.text = $el;
    });
  }
  onInput(event) {
    this.$dispatch('formula:text', $(event.target).text);
  }
  onKeydown(event) {
    const { code } = event;
    const keys = ['Tab', 'Enter'];
    if (keys.includes(code)) {
      this.$dispatch('formula:isDone', true);
      event.preventDefault();
    }
  }
}
