class Dom {
  constructor(selector) {
    this.$el =
      typeof selector === 'string'
        ? document.querySelector(selector)
        : selector;
  }
  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html;
      return this;
    } else {
      return this.$el.outerHTML.trim();
    }
  }
  clear() {
    this.html('');
    return this;
  }
  set text(text) {
    this.$el.textContent = text;
  }
  get text() {
    if (this.$el.tagName.toLowerCase() === 'input') {
      return this.$el.value.trim();
    }
    return this.$el.textContent.trim();
  }
  append(node) {
    if (node instanceof Dom) {
      node = node.$el;
    }
    if (Element.prototype.append) {
      this.$el.append(node);
    } else {
      this.$el.appendChild(node);
    }
    return this;
  }
  on(eventListeners, callback) {
    this.$el.addEventListener(eventListeners, callback);
  }
  off(eventListeners, callback) {
    this.$el.removeEventListener(eventListeners, callback);
  }
  closest(closest) {
    return $(this.$el.closest(closest));
  }
  getCoords() {
    return this.$el.getBoundingClientRect();
  }
  get data() {
    return this.$el.dataset;
  }
  addCn(className) {
    this.$el.classList.add(className);
    return this;
  }
  removeCn(className) {
    this.$el.classList.remove(className);
    return this;
  }
  find(selected) {
    return $(this.$el.querySelector(selected));
  }
  findAll(selected) {
    return $(this.$el.querySelectorAll(selected));
  }
  css(styles = {}) {
    Object.keys(styles).forEach((keys) => {
      this.$el.style[keys] = styles[keys];
    });
    return this;
  }
  focus() {
    this.$el.focus();
    return this;
  }
  id(parse) {
    if (parse) {
      const parsed = this.id().split(':');
      return {
        row: +parsed[0],
        col: +parsed[1],
      };
    }
    return this.data.id;
  }
}
export function $(selector) {
  return new Dom(selector);
}

$.create = (nameTag, className = '') => {
  const $el = document.createElement(nameTag);
  if (className) {
    $el.classList.add(className);
  }
  return $($el);
};
