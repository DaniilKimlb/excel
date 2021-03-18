export class TableSelection {
  static className = 'selected';
  constructor() {
    this.group = [];
    this.current = null;
  }
  select($el) {
    this.clear();
    this.group.push($el);
    $el.focus().addCn(TableSelection.className);
    this.current = $el;
  }

  selectGroup(group = []) {
    this.clear();
    this.group = group;
    this.group.forEach(($el) => {
      $el.addCn(TableSelection.className);
    });
  }
  clear() {
    this.group.forEach(($el) => $el.removeCn(TableSelection.className));
    this.group = [];
  }
  styleSelect(styles) {
    this.group.forEach(($el) => {
      $el.css(styles);
    });
  }
  get getIds() {
    return this.group.map(($el) => $el.id());
  }
}
