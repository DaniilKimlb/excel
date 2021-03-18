export function capitalize(string) {
  if (typeof string !== 'string') {
    return '';
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
}
export function range(min, max) {
  if (min > max) [max, min] = [min, max];
  return new Array(max - min + 1).fill('').map((_, index) => min + index);
}
export function nextSelected(keys, { row, col }) {
  const MIN_VALUE = 0;
  switch (keys) {
    case 'Tab':
    case 'ArrowRight':
      col++;
      break;
    case 'Enter':
    case 'ArrowDown':
      row++;
      break;
    case 'ArrowUp':
      row === MIN_VALUE ? MIN_VALUE : (row -= 1);
      break;
    case 'ArrowLeft':
      col === MIN_VALUE ? MIN_VALUE : (col -= 1);
      break;
  }
  return `${row}:${col}`;
}
export function storage(name, data = null) {
  if (!data) {
    return JSON.parse(localStorage.getItem(name));
  }
  return localStorage.setItem(name, JSON.stringify(data));
}
export function isEject(a, b) {
  if (typeof a === 'object' && typeof b === 'object') {
    return JSON.stringify(a) === JSON.stringify(b);
  }
  return a === b;
}
export function camelCaseToDash(str) {
  return str.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`);
}
export function toInlineStyles(styles = {}) {
  return Object.keys(styles)
    .map((s) => {
      return `${[camelCaseToDash(s)]} : ${styles[s]}`;
    })
    .join(';');
}
export function debounce(fn, wait) {
  let timeout;
  return function (...args) {
    const later = () => {
      clearTimeout(timeout);
      // eslint-disable-next-line no-invalid-this
      fn.apply(this, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
