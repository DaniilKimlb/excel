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
