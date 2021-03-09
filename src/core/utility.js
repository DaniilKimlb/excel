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
