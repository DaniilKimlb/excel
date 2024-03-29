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
    this.$formula = this.$root.find('#formula');
    this.$sub('table:selection', ($el) => {
      this.$formula.text($el.data.value || $el.text());
    });
    this.$sub('table:input', ($el) => {
      this.$formula.text($el);
    });
  }
  onInput(event) {
    this.$emit('formula:text', $(event.target).text());
  }
  onKeydown(event) {
    const { code } = event;
    const keys = ['Tab', 'Enter'];
    if (keys.includes(code)) {
      this.$emit('formula:isDone', true);
      event.preventDefault();
    }
  }
}
